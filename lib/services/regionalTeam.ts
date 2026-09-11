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
  { metric: "gp", goal: "gp_goal" },
  { metric: "voice", goal: "voice_goal" },
  { metric: "mim", goal: "mim_goal" },
  { metric: "upgrade", goal: "upgrade_goal" },
  { metric: "hsi", goal: "hsi_goal" },
  { metric: "bts", goal: "bts_goal" },
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
        Number(goals?.[goal] || 0);

      if (target <= 0) {
        return null;
      }

      const current =
        Number(stats?.[metric] || 0);

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
        (sum, value) =>
          sum + value,
        0
      ) /
      percentages.length
    ).toFixed(1)
  );
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

    storeIds = (
      regionStores || []
    )
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

  if (
    !context?.profile
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

  /*
   * IMPORTANT:
   * Match the original Bryce/manager behavior.
   *
   * Do NOT require role === "employee".
   * Include every approved non-management
   * profile under Jason's assigned stores.
   */
  const {
    data: employees,
    error: employeeError,
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
    .not(
      "role",
      "in",
      '("manager","admin","regional_manager")'
    )
    .order(
      "full_name"
    );

  if (employeeError) {
    console.error(
      "REGIONAL TEAM EMPLOYEE ERROR:",
      employeeError
    );
  }

  const employeeRows =
    employees || [];

  const employeeIds =
    employeeRows.map(
      (employee: any) =>
        employee.id
    );

  let goals: any[] = [];
  let statsRows: any[] = [];

  if (
    employeeIds.length > 0
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
          employeeIds
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
          employeeIds
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
        "REGIONAL EMPLOYEE GOAL ERROR:",
        goalResult.error
      );
    }

    if (statsResult.error) {
      console.error(
        "REGIONAL EMPLOYEE STATS ERROR:",
        statsResult.error
      );
    }

    goals =
      goalResult.data || [];

    statsRows =
      statsResult.data || [];
  }

  const storeMap =
    new Map<string, string>();

  for (
    const store
    of stores || []
  ) {
    /*
     * Safety normalization for display.
     * Old Marconi should never display
     * as just "Marconi".
     */
    const displayName =
      String(
        store.name || ""
      )
        .trim()
        .toLowerCase() ===
      "marconi"
        ? "Marconi Ave"
        : store.name;

    storeMap.set(
      store.id,
      displayName
    );
  }

  const goalMap =
    new Map<string, any>();

  for (
    const goal
    of goals
  ) {
    goalMap.set(
      goal.employee_id,
      goal
    );
  }

  const latestStatsMap =
    new Map<string, any>();

  for (
    const row
    of statsRows
  ) {
    if (
      !latestStatsMap.has(
        row.employee_id
      )
    ) {
      latestStatsMap.set(
        row.employee_id,
        row
      );
    }
  }

  const enrichedEmployees =
    employeeRows.map(
      (employee: any) => {
        const goals =
          goalMap.get(
            employee.id
          ) || null;

        const stats =
          latestStatsMap.get(
            employee.id
          ) || null;

        return {
          ...employee,

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

  return {
    stores:
      stores || [],

    employees:
      enrichedEmployees,

    rankings,

    overview: {
      stores:
        (stores || [])
          .length,

      employees:
        enrichedEmployees
          .length,

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
