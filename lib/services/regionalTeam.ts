import { createClient } from "@/lib/supabase/server";
import { getUserContext } from "@/lib/auth/userContext";

import {
  getCaliforniaDate,
  getMonthInfo,
} from "@/lib/progress/date";

type MetricKey =
  | "gp"
  | "voice"
  | "mim"
  | "upgrade"
  | "hsi"
  | "bts"
  | "accessories"
  | "features";

type GoalKey =
  | "gp_goal"
  | "voice_goal"
  | "mim_goal"
  | "upgrade_goal"
  | "hsi_goal"
  | "bts_goal"
  | "accessory_goal"
  | "features_goal";

const metricMap: Array<{
  metric: MetricKey;
  goal: GoalKey;
}> = [
  {
    metric: "gp",
    goal: "gp_goal",
  },
  {
    metric: "voice",
    goal: "voice_goal",
  },
  {
    metric: "mim",
    goal: "mim_goal",
  },
  {
    metric: "upgrade",
    goal: "upgrade_goal",
  },
  {
    metric: "hsi",
    goal: "hsi_goal",
  },
  {
    metric: "bts",
    goal: "bts_goal",
  },
  {
    metric: "accessories",
    goal: "accessory_goal",
  },
  {
    metric: "features",
    goal: "features_goal",
  },
];

function calculateScore(
  stats: Record<string, any>,
  goals: Record<string, any>
) {
  const percentages = metricMap
    .map(({ metric, goal }) => {
      const target =
        Number(
          goals?.[goal] || 0
        );

      if (target <= 0) {
        return null;
      }

      const current =
        Number(
          stats?.[metric] || 0
        );

      return (
        (current / target) *
        100
      );
    })
    .filter(
      (
        value
      ): value is number =>
        value !== null
    );

  if (
    percentages.length === 0
  ) {
    return 0;
  }

  return Number(
    (
      percentages.reduce(
        (
          sum,
          value
        ) =>
          sum + value,
        0
      ) /
      percentages.length
    ).toFixed(1)
  );
}

function normalizeStoreName(
  name: unknown
) {
  const value =
    String(name || "").trim();

  if (
    value.toLowerCase() ===
    "marconi"
  ) {
    return "Marconi Ave";
  }

  return value;
}

export async function getRegionalStoreIds() {
  const supabase =
    await createClient();

  const context =
    await getUserContext();

  if (
    !context?.user ||
    !context?.profile
  ) {
    return [];
  }

  const {
    data: assignments,
    error: assignmentError,
  } = await supabase
    .from("manager_stores")
    .select("store_id")
    .eq(
      "manager_id",
      context.user.id
    );

  if (assignmentError) {
    console.error(
      "REGIONAL MANAGER STORE ERROR:",
      assignmentError
    );
  }

  let storeIds: string[] =
    Array.from(
      new Set(
        (assignments || [])
          .map(
            (row: any) =>
              row.store_id
          )
          .filter(Boolean)
      )
    );

  /*
   * Region fallback is retained for
   * accounts that do not have explicit
   * manager_stores assignments.
   */
  if (
    storeIds.length === 0 &&
    context.profile.region_id
  ) {
    const {
      data: regionStores,
      error: regionError,
    } = await supabase
      .from("stores")
      .select("id")
      .eq(
        "region_id",
        context.profile.region_id
      );

    if (regionError) {
      console.error(
        "REGIONAL REGION STORE ERROR:",
        regionError
      );
    }

    storeIds =
      (regionStores || [])
        .map(
          (store: any) =>
            store.id
        )
        .filter(Boolean);
  }

  return storeIds;
}

export async function getRegionalTeamData() {
  const supabase =
    await createClient();

  const context =
    await getUserContext();

  if (!context?.profile) {
    return {
      stores: [],
      employees: [],
      rankings: [],
      overview: {
        stores: 0,
        employees: 0,
        employeesWithGoals: 0,
        employeesWithStats: 0,
        averageScore: 0,
      },
    };
  }

  const storeIds =
    await getRegionalStoreIds();

  if (
    storeIds.length === 0
  ) {
    return {
      stores: [],
      employees: [],
      rankings: [],
      overview: {
        stores: 0,
        employees: 0,
        employeesWithGoals: 0,
        employeesWithStats: 0,
        averageScore: 0,
      },
    };
  }

  const today =
    getCaliforniaDate();

  const monthInfo =
    getMonthInfo(today);

  /*
   * ======================================================
   * STORES
   * ======================================================
   */

  const {
    data: stores,
    error: storeError,
  } = await supabase
    .from("stores")
    .select("id,name")
    .in(
      "id",
      storeIds
    )
    .order("name");

  if (storeError) {
    console.error(
      "REGIONAL TEAM STORES ERROR:",
      storeError
    );
  }

  const storeMap =
    new Map<string, string>();

  for (
    const store
    of stores || []
  ) {
    storeMap.set(
      store.id,
      normalizeStoreName(
        store.name
      )
    );
  }

  /*
   * ======================================================
   * LOGIN / PROFILE EMPLOYEES
   * ======================================================
   */

  const {
    data: profileEmployees,
    error: profileEmployeeError,
  } = await supabase
    .from("profiles")
    .select(
      `
      id,
      full_name,
      email,
      role,
      status,
      store_id
      `
    )
    .in(
      "store_id",
      storeIds
    )
    .eq(
      "status",
      "approved"
    )
    .order(
      "full_name"
    );

  if (profileEmployeeError) {
    console.error(
      "REGIONAL PROFILE EMPLOYEE ERROR:",
      profileEmployeeError
    );
  }

  /*
   * Do this filtering in JavaScript rather
   * than SQL so NULL or unusual employee
   * roles are not accidentally excluded.
   */

  const managementRoles =
    new Set([
      "manager",
      "admin",
      "regional_manager",
    ]);

  const profileEmployeeRows =
    (
      profileEmployees || []
    ).filter(
      (employee: any) =>
        !managementRoles.has(
          employee.role
        )
    );

  const profileEmployeeIds =
    profileEmployeeRows
      .map(
        (employee: any) =>
          employee.id
      )
      .filter(Boolean);

  /*
   * ======================================================
   * TRACKED / NON-LOGIN EMPLOYEES
   * ======================================================
   */

  const {
    data: trackedEmployees,
    error: trackedEmployeeError,
  } = await supabase
    .from(
      "tracked_employees"
    )
    .select(
      `
      id,
      full_name,
      designation,
      status,
      store_id
      `
    )
    .in(
      "store_id",
      storeIds
    )
    .eq(
      "status",
      "active"
    )
    .eq(
      "designation",
      "ME"
    )
    .order(
      "full_name"
    );

  if (trackedEmployeeError) {
    console.error(
      "REGIONAL TRACKED EMPLOYEE ERROR:",
      trackedEmployeeError
    );
  }

  const trackedEmployeeRows =
    trackedEmployees || [];

  const trackedEmployeeIds =
    trackedEmployeeRows
      .map(
        (employee: any) =>
          employee.id
      )
      .filter(Boolean);

  /*
   * ======================================================
   * PROFILE EMPLOYEE GOALS + STATS
   * ======================================================
   */

  let profileGoals: any[] =
    [];

  let profileStats: any[] =
    [];

  if (
    profileEmployeeIds.length >
    0
  ) {
    const [
      goalResult,
      statsResult,
    ] = await Promise.all([
      supabase
        .from(
          "employee_goals"
        )
        .select(
          `
          employee_id,
          gp_goal,
          voice_goal,
          mim_goal,
          upgrade_goal,
          hsi_goal,
          bts_goal,
          accessory_goal,
          features_goal
          `
        )
        .in(
          "employee_id",
          profileEmployeeIds
        )
        .eq(
          "month",
          monthInfo.monthName
        )
        .eq(
          "year",
          monthInfo.year
        ),

      supabase
        .from(
          "employee_daily_stats"
        )
        .select(
          `
          employee_id,
          store_id,
          stat_date,
          gp,
          voice,
          mim,
          upgrade,
          hsi,
          bts,
          accessories,
          features
          `
        )
        .in(
          "employee_id",
          profileEmployeeIds
        )
        .in(
          "store_id",
          storeIds
        )
        .gte(
          "stat_date",
          monthInfo.monthStart
        )
        .lte(
          "stat_date",
          today
        )
        .order(
          "stat_date",
          {
            ascending: false,
          }
        ),
    ]);

    if (goalResult.error) {
      console.error(
        "REGIONAL PROFILE GOAL ERROR:",
        goalResult.error
      );
    }

    if (statsResult.error) {
      console.error(
        "REGIONAL PROFILE STATS ERROR:",
        statsResult.error
      );
    }

    profileGoals =
      goalResult.data || [];

    profileStats =
      statsResult.data || [];
  }

  /*
   * ======================================================
   * TRACKED EMPLOYEE GOALS + STATS
   * ======================================================
   */

  let trackedGoals: any[] =
    [];

  let trackedStats: any[] =
    [];

  if (
    trackedEmployeeIds.length >
    0
  ) {
    const [
      goalResult,
      statsResult,
    ] = await Promise.all([
      supabase
        .from(
          "tracked_employee_goals"
        )
        .select(
          `
          employee_id,
          gp_goal,
          voice_goal,
          mim_goal,
          upgrade_goal,
          hsi_goal,
          bts_goal,
          accessory_goal,
          features_goal
          `
        )
        .in(
          "employee_id",
          trackedEmployeeIds
        )
        .eq(
          "month",
          monthInfo.monthName
        )
        .eq(
          "year",
          monthInfo.year
        ),

      supabase
        .from(
          "tracked_employee_daily_stats"
        )
        .select(
          `
          employee_id,
          store_id,
          stat_date,
          gp,
          voice,
          mim,
          upgrade,
          hsi,
          bts,
          accessories,
          features
          `
        )
        .in(
          "employee_id",
          trackedEmployeeIds
        )
        .in(
          "store_id",
          storeIds
        )
        .gte(
          "stat_date",
          monthInfo.monthStart
        )
        .lte(
          "stat_date",
          today
        )
        .order(
          "stat_date",
          {
            ascending: false,
          }
        ),
    ]);

    if (goalResult.error) {
      console.error(
        "REGIONAL TRACKED GOAL ERROR:",
        goalResult.error
      );
    }

    if (statsResult.error) {
      console.error(
        "REGIONAL TRACKED STATS ERROR:",
        statsResult.error
      );
    }

    trackedGoals =
      goalResult.data || [];

    trackedStats =
      statsResult.data || [];
  }

  /*
   * ======================================================
   * CREATE LOOKUP MAPS
   * ======================================================
   */

  const profileGoalMap =
    new Map<string, any>();

  for (
    const goal
    of profileGoals
  ) {
    profileGoalMap.set(
      goal.employee_id,
      goal
    );
  }

  const trackedGoalMap =
    new Map<string, any>();

  for (
    const goal
    of trackedGoals
  ) {
    trackedGoalMap.set(
      goal.employee_id,
      goal
    );
  }

  const latestProfileStatsMap =
    new Map<string, any>();

  for (
    const row
    of profileStats
  ) {
    if (
      !latestProfileStatsMap.has(
        row.employee_id
      )
    ) {
      latestProfileStatsMap.set(
        row.employee_id,
        row
      );
    }
  }

  const latestTrackedStatsMap =
    new Map<string, any>();

  for (
    const row
    of trackedStats
  ) {
    if (
      !latestTrackedStatsMap.has(
        row.employee_id
      )
    ) {
      latestTrackedStatsMap.set(
        row.employee_id,
        row
      );
    }
  }

  /*
   * ======================================================
   * ENRICH LOGIN EMPLOYEES
   * ======================================================
   */

  const enrichedProfileEmployees =
    profileEmployeeRows.map(
      (employee: any) => {
        const goals =
          profileGoalMap.get(
            employee.id
          ) || null;

        const stats =
          latestProfileStatsMap.get(
            employee.id
          ) || null;

        return {
          ...employee,

          employeeType:
            "profile" as const,

          source:
            "profile" as const,

          store_name:
            storeMap.get(
              employee.store_id
            ) ||
            "Unknown Store",

          goals,

          stats,

          score:
            calculateScore(
              stats || {},
              goals || {}
            ),
        };
      }
    );

  /*
   * ======================================================
   * ENRICH TRACKED EMPLOYEES
   * ======================================================
   */

  const enrichedTrackedEmployees =
    trackedEmployeeRows.map(
      (employee: any) => {
        const goals =
          trackedGoalMap.get(
            employee.id
          ) || null;

        const stats =
          latestTrackedStatsMap.get(
            employee.id
          ) || null;

        return {
          id:
            employee.id,

          full_name:
            employee.full_name,

          email:
            null,

          role:
            "employee",

          status:
            employee.status,

          store_id:
            employee.store_id,

          designation:
            employee.designation,

          employeeType:
            "tracked" as const,

          source:
            "tracked" as const,

          store_name:
            storeMap.get(
              employee.store_id
            ) ||
            "Unknown Store",

          goals,

          stats,

          score:
            calculateScore(
              stats || {},
              goals || {}
            ),
        };
      }
    );

  /*
   * ======================================================
   * COMBINE ALL EMPLOYEES
   * ======================================================
   */

  const enrichedEmployees = [
    ...enrichedProfileEmployees,
    ...enrichedTrackedEmployees,
  ].sort(
    (a: any, b: any) => {
      const storeCompare =
        String(
          a.store_name || ""
        ).localeCompare(
          String(
            b.store_name || ""
          )
        );

      if (storeCompare !== 0) {
        return storeCompare;
      }

      return String(
        a.full_name || ""
      ).localeCompare(
        String(
          b.full_name || ""
        )
      );
    }
  );

  /*
   * ======================================================
   * RANKINGS
   * ======================================================
   */

  const rankings =
    [...enrichedEmployees]
      .sort(
        (a, b) =>
          Number(
            b.score || 0
          ) -
          Number(
            a.score || 0
          )
      );

  /*
   * ======================================================
   * TEAM OVERVIEW
   * ======================================================
   */

  const employeesWithGoals =
    enrichedEmployees.filter(
      (employee) =>
        Boolean(
          employee.goals
        )
    );

  const averageScore =
    employeesWithGoals.length >
    0
      ? Number(
          (
            employeesWithGoals.reduce(
              (
                sum,
                employee
              ) =>
                sum +
                Number(
                  employee.score ||
                    0
                ),
              0
            ) /
            employeesWithGoals.length
          ).toFixed(1)
        )
      : 0;

  /*
   * Normalize store names in the stores
   * collection too, not just employees.
   */

  const normalizedStores =
    (stores || []).map(
      (store: any) => ({
        ...store,

        name:
          normalizeStoreName(
            store.name
          ),
      })
    );

  return {
    stores:
      normalizedStores,

    employees:
      enrichedEmployees,

    rankings,

    overview: {
      stores:
        normalizedStores.length,

      employees:
        enrichedEmployees.length,

      employeesWithGoals:
        enrichedEmployees.filter(
          (employee) =>
            Boolean(
              employee.goals
            )
        ).length,

      employeesWithStats:
        enrichedEmployees.filter(
          (employee) =>
            Boolean(
              employee.stats
            )
        ).length,

      averageScore,
    },
  };
}
