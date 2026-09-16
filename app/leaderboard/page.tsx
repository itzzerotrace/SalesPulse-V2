import DashboardLayout from "@/components/layout/DashboardLayout";

import { createClient } from "@/lib/supabase/server";
import { getUserContext } from "@/lib/auth/userContext";
import { getActiveStore } from "@/lib/stores/activeStore";

import {
  getCaliforniaDate,
  getMonthInfo,
} from "@/lib/progress/date";

import {
  getRegionalTeamData,
} from "@/lib/services/regionalTeam";

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
  const values =
    metricMap
      .map(
        ({
          metric,
          goal,
        }) => {
          const target =
            Number(
              goals?.[
                goal
              ] || 0
            );

          if (
            target <= 0
          ) {
            return null;
          }

          return (
            Number(
              stats?.[
                metric
              ] || 0
            ) /
            target
          ) * 100;
        }
      )
      .filter(
        (
          value
        ): value is number =>
          value !== null
      );

  if (
    values.length === 0
  ) {
    return 0;
  }

  return Number(
    (
      values.reduce(
        (
          total,
          value
        ) =>
          total + value,
        0
      ) /
      values.length
    ).toFixed(1)
  );
}

function normalizeStoreName(
  name: unknown
) {
  const value =
    String(
      name || ""
    ).trim();

  if (
    value.toLowerCase() ===
    "marconi"
  ) {
    return "Marconi Ave";
  }

  return value;
}

function RankingRow({
  rank,
  name,
  store,
  score,
}: {
  rank: number;
  name: string;
  store: string;
  score: number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-lg font-black text-purple-700">
        {rank}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-black text-slate-900 sm:text-lg">
          {name}
        </p>

        <p className="text-sm font-bold text-slate-500">
          {store}
        </p>
      </div>

      <div className="text-right">
        <p className="text-xl font-black text-slate-900">
          {score.toFixed(
            1
          )}
          %
        </p>

        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
          Goal Score
        </p>
      </div>
    </div>
  );
}

export default async function LeaderboardPage() {
  const context =
    await getUserContext();

  const role =
    context?.profile?.role;

  /*
   * ======================================================
   * REGIONAL MANAGER
   * ======================================================
   */

  if (
    role ===
    "regional_manager"
  ) {
    const data =
      await getRegionalTeamData();

    return (
      <DashboardLayout>
        <div className="space-y-6 sm:space-y-8">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-purple-600">
              District Rankings
            </p>

            <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">
              Rankings
            </h1>

            <p className="mt-2 text-slate-500">
              Employees ranked across all assigned stores.
            </p>
          </div>

          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Employees
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {
                  data.overview
                    .employees
                }
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Stores
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {
                  data.overview
                    .stores
                }
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Team Average
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {
                  data.overview
                    .averageScore
                }
                %
              </p>
            </div>
          </section>

          <section className="space-y-3">
            {data.rankings.length >
            0 ? (
              data.rankings.map(
                (
                  employee: any,
                  index: number
                ) => (
                  <RankingRow
                    key={`${employee.employeeType}-${employee.id}`}
                    rank={
                      index + 1
                    }
                    name={
                      employee.full_name ||
                      "Team Member"
                    }
                    store={
                      employee.store_name
                    }
                    score={
                      Number(
                        employee.score ||
                          0
                      )
                    }
                  />
                )
              )
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <p className="font-black text-slate-900">
                  No employee rankings yet.
                </p>
              </div>
            )}
          </section>
        </div>
      </DashboardLayout>
    );
  }

  /*
   * ======================================================
   * STORE MANAGER
   * ======================================================
   */

  const supabase =
    await createClient();

  const activeStore =
    await getActiveStore();

  const today =
    getCaliforniaDate();

  const monthInfo =
    getMonthInfo(today);

  if (!activeStore) {
    return (
      <DashboardLayout>
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          No active store selected.
        </div>
      </DashboardLayout>
    );
  }

  /*
   * ======================================================
   * LOAD BOTH EMPLOYEE TYPES
   * ======================================================
   */

  const [
    profileResult,
    trackedResult,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select(
        `
        id,
        full_name,
        store_id
        `
      )
      .eq(
        "store_id",
        activeStore.id
      )
      .eq(
        "status",
        "approved"
      )
      .eq(
        "role",
        "employee"
      )
      .order(
        "full_name"
      ),

    supabase
      .from(
        "tracked_employees"
      )
      .select(
        `
        id,
        full_name,
        store_id,
        designation,
        status
        `
      )
      .eq(
        "store_id",
        activeStore.id
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
      ),
  ]);

  if (profileResult.error) {
    console.error(
      "LEADERBOARD PROFILE EMPLOYEE ERROR:",
      profileResult.error
    );
  }

  if (trackedResult.error) {
    console.error(
      "LEADERBOARD TRACKED EMPLOYEE ERROR:",
      trackedResult.error
    );
  }

  const profileEmployees =
    profileResult.data || [];

  const trackedEmployees =
    trackedResult.data || [];

  const profileIds =
    profileEmployees.map(
      (employee: any) =>
        employee.id
    );

  const trackedIds =
    trackedEmployees.map(
      (employee: any) =>
        employee.id
    );

  /*
   * ======================================================
   * PROFILE GOALS + STATS
   * ======================================================
   */

  let profileGoals: any[] =
    [];

  let profileStats: any[] =
    [];

  if (
    profileIds.length > 0
  ) {
    const [
      goalResult,
      statsResult,
    ] = await Promise.all([
      supabase
        .from(
          "employee_goals"
        )
        .select("*")
        .in(
          "employee_id",
          profileIds
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
        .select("*")
        .in(
          "employee_id",
          profileIds
        )
        .eq(
          "store_id",
          activeStore.id
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
        "LEADERBOARD PROFILE GOAL ERROR:",
        goalResult.error
      );
    }

    if (statsResult.error) {
      console.error(
        "LEADERBOARD PROFILE STATS ERROR:",
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
   * TRACKED GOALS + STATS
   * ======================================================
   */

  let trackedGoals: any[] =
    [];

  let trackedStats: any[] =
    [];

  if (
    trackedIds.length > 0
  ) {
    const [
      goalResult,
      statsResult,
    ] = await Promise.all([
      supabase
        .from(
          "tracked_employee_goals"
        )
        .select("*")
        .in(
          "employee_id",
          trackedIds
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
        .select("*")
        .in(
          "employee_id",
          trackedIds
        )
        .eq(
          "store_id",
          activeStore.id
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
        "LEADERBOARD TRACKED GOAL ERROR:",
        goalResult.error
      );
    }

    if (statsResult.error) {
      console.error(
        "LEADERBOARD TRACKED STATS ERROR:",
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
   * LOOKUP MAPS
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

  const profileStatsMap =
    new Map<string, any>();

  for (
    const row
    of profileStats
  ) {
    if (
      !profileStatsMap.has(
        row.employee_id
      )
    ) {
      profileStatsMap.set(
        row.employee_id,
        row
      );
    }
  }

  const trackedStatsMap =
    new Map<string, any>();

  for (
    const row
    of trackedStats
  ) {
    if (
      !trackedStatsMap.has(
        row.employee_id
      )
    ) {
      trackedStatsMap.set(
        row.employee_id,
        row
      );
    }
  }

  /*
   * ======================================================
   * BUILD RANKINGS
   * ======================================================
   */

  const rankings = [
    ...profileEmployees.map(
      (employee: any) => ({
        id:
          employee.id,

        employeeType:
          "profile" as const,

        name:
          employee.full_name ||
          "Team Member",

        score:
          calculateScore(
            profileStatsMap.get(
              employee.id
            ) || {},
            profileGoalMap.get(
              employee.id
            ) || {}
          ),
      })
    ),

    ...trackedEmployees.map(
      (employee: any) => ({
        id:
          employee.id,

        employeeType:
          "tracked" as const,

        name:
          employee.full_name ||
          "Team Member",

        score:
          calculateScore(
            trackedStatsMap.get(
              employee.id
            ) || {},
            trackedGoalMap.get(
              employee.id
            ) || {}
          ),
      })
    ),
  ].sort(
    (a, b) =>
      b.score -
      a.score
  );

  const displayStoreName =
    normalizeStoreName(
      activeStore.name
    );

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-purple-600">
            Store Rankings
          </p>

          <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">
            Rankings
          </h1>

          <p className="mt-2 text-slate-500">
            {displayStoreName}
          </p>
        </div>

        <section className="space-y-3">
          {rankings.length >
          0 ? (
            rankings.map(
              (
                employee,
                index
              ) => (
                <RankingRow
                  key={`${employee.employeeType}-${employee.id}`}
                  rank={
                    index + 1
                  }
                  name={
                    employee.name
                  }
                  store={
                    displayStoreName
                  }
                  score={
                    employee.score
                  }
                />
              )
            )
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="font-black text-slate-900">
                No employee rankings yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
