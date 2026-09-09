import {
  Crown,
  Medal,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import EmployeeRankingCard from "@/components/leaderboard/EmployeeRankingCard";

import { createClient } from "@/lib/supabase/server";
import { getActiveStore } from "@/lib/stores/activeStore";
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
    metric:
      "accessories",
    goal:
      "accessory_goal",
  },
  {
    metric: "features",
    goal:
      "features_goal",
  },
];

function calculateScore(
  stats: Record<
    string,
    any
  >,
  goals: Record<
    string,
    any
  >
) {
  const percentages =
    metricMap
      .map(
        ({
          metric,
          goal,
        }) => {
          const goalValue =
            Number(
              goals?.[
                goal
              ] || 0
            );

          if (
            goalValue <= 0
          ) {
            return null;
          }

          const currentValue =
            Number(
              stats?.[
                metric
              ] || 0
            );

          return (
            (currentValue /
              goalValue) *
            100
          );
        }
      )
      .filter(
        (
          value
        ): value is number =>
          value !== null
      );

  if (
    percentages.length ===
    0
  ) {
    return 0;
  }

  return (
    percentages.reduce(
      (
        sum,
        value
      ) => sum + value,
      0
    ) /
    percentages.length
  );
}

export default async function LeaderboardPage() {
  const supabase =
    await createClient();

  const activeStore =
    await getActiveStore();

  const monthInfo =
    getMonthInfo(
      getCaliforniaDate()
    );

  if (!activeStore) {
    return (
      <DashboardLayout>
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 text-center shadow-sm">
          <Trophy
            size={32}
            className="mx-auto text-slate-300"
          />

          <h1 className="mt-3 text-2xl font-black text-[#17102F]">
            Rankings
          </h1>

          <p className="mt-2 text-slate-500">
            No active store is
            available.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const {
    data: employees,
    error:
      employeesError,
  } = await supabase
    .from("profiles")
    .select(
      "id,full_name,role"
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
    );

  if (
    employeesError
  ) {
    console.error(
      "LEADERBOARD EMPLOYEES ERROR:",
      employeesError
    );
  }

  const employeeIds =
    (employees || []).map(
      (
        employee: any
      ) => employee.id
    );

  let goals: any[] =
    [];

  let snapshots: any[] =
    [];

  if (
    employeeIds.length >
    0
  ) {
    const {
      data: goalRows,
      error: goalsError,
    } = await supabase
      .from(
        "employee_goals"
      )
      .select(
        "employee_id,gp_goal,voice_goal,mim_goal,upgrade_goal,hsi_goal,bts_goal,accessory_goal,features_goal"
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
      );

    if (
      goalsError
    ) {
      console.error(
        "LEADERBOARD GOALS ERROR:",
        goalsError
      );
    }

    goals =
      goalRows || [];

    const {
      data: statRows,
      error: statsError,
    } = await supabase
      .from(
        "employee_daily_stats"
      )
      .select(
        "employee_id,stat_date,gp,voice,mim,upgrade,hsi,bts,accessories,features"
      )
      .in(
        "employee_id",
        employeeIds
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
        getCaliforniaDate()
      )
      .order(
        "stat_date",
        {
          ascending: false,
        }
      );

    if (
      statsError
    ) {
      console.error(
        "LEADERBOARD STATS ERROR:",
        statsError
      );
    }

    snapshots =
      statRows || [];
  }

  const latestSnapshotByEmployee =
    new Map<
      string,
      any
    >();

  for (
    const row of snapshots
  ) {
    if (
      !latestSnapshotByEmployee.has(
        row.employee_id
      )
    ) {
      latestSnapshotByEmployee.set(
        row.employee_id,
        row
      );
    }
  }

  const goalsByEmployee =
    new Map<
      string,
      any
    >();

  for (
    const goal of goals
  ) {
    goalsByEmployee.set(
      goal.employee_id,
      goal
    );
  }

  const rankings =
    (employees || [])
      .map(
        (
          employee: any
        ) => {
          const stats =
            latestSnapshotByEmployee.get(
              employee.id
            ) || {};

          const employeeGoals =
            goalsByEmployee.get(
              employee.id
            ) || {};

          return {
            id:
              employee.id,
            name:
              employee.full_name ||
              "Team Member",
            score:
              calculateScore(
                stats,
                employeeGoals
              ),
          };
        }
      )
      .sort(
        (a, b) =>
          b.score -
          a.score
      );

  const leader =
    rankings[0];

  const second =
    rankings[1];

  const third =
    rankings[2];

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <section className="salespulse-dark-gradient relative overflow-hidden rounded-[30px] px-5 py-6 text-white shadow-[0_24px_70px_rgba(23,16,47,0.18)] sm:px-8 sm:py-8 lg:px-10">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-pink-500/15 blur-3xl" />

          <div className="relative grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-pink-300">
                <Sparkles
                  size={13}
                />
                Rankings
              </span>

              <h1 className="mt-5 text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                Who&apos;s leading
                the
                <span className="text-pink-400">
                  {" "}
                  pulse?
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-white/55 sm:text-base">
                Team members are
                ranked by average
                progress across
                their active monthly
                goals.
              </p>

              <p className="mt-4 text-sm font-black text-purple-200">
                {
                  activeStore.name
                }{" "}
                •{" "}
                {
                  monthInfo.monthName
                }{" "}
                {
                  monthInfo.year
                }
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
                <Users
                  size={19}
                  className="text-purple-300"
                />

                <p className="mt-4 text-3xl font-black">
                  {
                    rankings.length
                  }
                </p>

                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.15em] text-white/40">
                  Ranked
                  Employees
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
                <Crown
                  size={19}
                  className="text-amber-300"
                />

                <p className="mt-4 truncate text-lg font-black">
                  {leader
                    ?.name
                    ?.split(
                      " "
                    )[0] ||
                    "—"}
                </p>

                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.15em] text-white/40">
                  Current Leader
                </p>
              </div>
            </div>
          </div>
        </section>

        {rankings.length >
          0 && (
          <section>
            <div className="mb-5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600">
                Top Performers
              </p>

              <h2 className="mt-1 text-2xl font-black tracking-tight text-[#17102F] sm:text-3xl">
                The Podium
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="order-1 rounded-[28px] border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 shadow-[0_14px_40px_rgba(31,21,60,0.06)] md:order-2 md:-translate-y-3">
                <Crown
                  size={26}
                  className="text-amber-500"
                />

                <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-amber-600">
                  #1 Leader
                </p>

                <h3 className="mt-1 truncate text-xl font-black text-[#17102F]">
                  {
                    leader?.name
                  }
                </h3>

                <p className="mt-4 text-4xl font-black tracking-tight text-amber-600">
                  {Math.round(
                    leader?.score ||
                      0
                  )}
                  %
                </p>
              </div>

              <div className="order-2 rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(31,21,60,0.06)] md:order-1">
                <Medal
                  size={25}
                  className="text-slate-400"
                />

                <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                  #2
                </p>

                <h3 className="mt-1 truncate text-xl font-black text-[#17102F]">
                  {second?.name ||
                    "—"}
                </h3>

                <p className="mt-4 text-4xl font-black tracking-tight text-slate-500">
                  {second
                    ? `${Math.round(
                        second.score
                      )}%`
                    : "—"}
                </p>
              </div>

              <div className="order-3 rounded-[28px] border border-orange-100 bg-white p-5 shadow-[0_14px_40px_rgba(31,21,60,0.06)]">
                <Medal
                  size={25}
                  className="text-orange-500"
                />

                <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">
                  #3
                </p>

                <h3 className="mt-1 truncate text-xl font-black text-[#17102F]">
                  {third?.name ||
                    "—"}
                </h3>

                <p className="mt-4 text-4xl font-black tracking-tight text-orange-600">
                  {third
                    ? `${Math.round(
                        third.score
                      )}%`
                    : "—"}
                </p>
              </div>
            </div>
          </section>
        )}

        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-600">
                Current Rankings
              </p>

              <h2 className="mt-1 text-2xl font-black tracking-tight text-[#17102F] sm:text-3xl">
                Team Leaderboard
              </h2>
            </div>

            <Trophy
              size={26}
              className="hidden text-purple-500 sm:block"
            />
          </div>

          {rankings.length >
          0 ? (
            <div className="space-y-3">
              {rankings.map(
                (
                  employee,
                  index
                ) => (
                  <EmployeeRankingCard
                    key={
                      employee.id
                    }
                    rank={
                      index + 1
                    }
                    name={
                      employee.name
                    }
                    score={
                      employee.score
                    }
                  />
                )
              )}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <Trophy
                size={32}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-3 text-lg font-black text-[#17102F]">
                No employee
                rankings yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Approved employees
                will appear after
                goals and daily
                progress have been
                entered.
              </p>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
