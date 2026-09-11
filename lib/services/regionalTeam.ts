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
      const goalValue =
        Number(
          goals?.[goal] || 0
        );

      if (goalValue <= 0) {
        return null;
      }

      const currentValue =
        Number(
          stats?.[metric] || 0
        );

      return (
        currentValue /
        goalValue
      ) * 100;
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
  } = await supabase
    .from("manager_stores")
    .select("store_id")
    .eq(
      "manager_id",
      context.user.id
    );

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
    } = await supabase
      .from("stores")
      .select("id")
      .eq(
        "region_id",
        context.profile.region_id
      );

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
  } = await supabase
    .from("stores")
    .select(
      "id,name"
    )
    .in(
      "id",
      storeIds
    )
    .order("name");

  const {
    data: employees,
    error: employeeError,
  } = await supabase
    .from("profiles")
    .select(
      `
      id,
      full_name,
      role,
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
    .eq(
      "role",
      "employee"
    )
    .order("full_name");

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
        "REGIONAL TEAM GOALS ERROR:",
        goalResult.error
      );
    }

    if (statsResult.error) {
      console.error(
        "REGIONAL TEAM STATS ERROR:",
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
    storeMap.set(
      store.id,
      store.name
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
        const goal =
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

          goals:
            goal,

          stats:
            stats,

          score:
            calculateScore(
              stats || {},
              goal || {}
            ),
        };
      }
    );

  const rankings =
    [...enrichedEmployees]
      .sort(
        (a, b) =>
          b.score -
          a.score
      );

  const scoredEmployees =
    rankings.filter(
      (employee) =>
        employee.goals
    );

  const averageScore =
    scoredEmployees.length > 0
      ? Number(
          (
            scoredEmployees.reduce(
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
            scoredEmployees.length
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
