import {
  CircleDollarSign,
  Gauge,
  Headphones,
  RadioTower,
  RefreshCcw,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wifi,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { createClient } from "@/lib/supabase/server";
import { getUserContext } from "@/lib/auth/userContext";
import { getActiveStore } from "@/lib/stores/activeStore";

import {
  getCaliforniaDate,
  getMonthInfo,
} from "@/lib/progress/date";

export const dynamic =
  "force-dynamic";

export const revalidate = 0;

type Metric = {
  key: string;
  label: string;
  goalKey: string;
  pendingProgressKey: string;
  registeredProgressKey: string;
  money?: boolean;
  icon: React.ReactNode;
};

function num(value: unknown) {
  const n =
    Number(value);

  return Number.isFinite(n)
    ? n
    : 0;
}

function formatValue(
  value: number,
  money = false
) {
  if (money) {
    return `$${value.toLocaleString(
      undefined,
      {
        maximumFractionDigits:
          2,
      }
    )}`;
  }

  return value.toLocaleString();
}

function percent(
  current: number,
  goal: number
) {
  if (goal <= 0) {
    return 0;
  }

  return (
    (current / goal) *
    100
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

const metrics: Metric[] = [
  {
    key: "gp",
    label: "GP",
    goalKey: "gp_goal",
    pendingProgressKey:
      "gp_progress",
    registeredProgressKey:
      "gp",
    money: true,
    icon: (
      <CircleDollarSign
        size={17}
      />
    ),
  },
  {
    key: "voice",
    label: "Voice",
    goalKey: "voice_goal",
    pendingProgressKey:
      "voice_progress",
    registeredProgressKey:
      "voice",
    icon: (
      <Smartphone size={17} />
    ),
  },
  {
    key: "mim",
    label: "MiM",
    goalKey: "mim_goal",
    pendingProgressKey:
      "mim_progress",
    registeredProgressKey:
      "mim",
    icon: (
      <RefreshCcw size={17} />
    ),
  },
  {
    key: "upgrade",
    label: "Upgrades",
    goalKey: "upgrade_goal",
    pendingProgressKey:
      "upgrade_progress",
    registeredProgressKey:
      "upgrade",
    icon: (
      <TrendingUp size={17} />
    ),
  },
  {
    key: "hsi",
    label: "HSI",
    goalKey: "hsi_goal",
    pendingProgressKey:
      "hsi_progress",
    registeredProgressKey:
      "hsi",
    icon: <Wifi size={17} />,
  },
  {
    key: "bts",
    label: "BTS",
    goalKey: "bts_goal",
    pendingProgressKey:
      "bts_progress",
    registeredProgressKey:
      "bts",
    icon: (
      <RadioTower size={17} />
    ),
  },
  {
    key: "accessories",
    label: "Accessories",
    goalKey:
      "accessory_goal",
    pendingProgressKey:
      "accessory_progress",
    registeredProgressKey:
      "accessories",
    money: true,
    icon: (
      <Headphones size={17} />
    ),
  },
  {
    key: "features",
    label: "Features",
    goalKey:
      "features_goal",
    pendingProgressKey:
      "features_progress",
    registeredProgressKey:
      "features",
    money: true,
    icon: <Star size={17} />,
  },
];

export default async function TeamOverviewPage() {
  const supabase =
    await createClient();

  const context =
    await getUserContext();

  const activeStore =
    await getActiveStore();

  const today =
    getCaliforniaDate();

  const month =
    getMonthInfo(today);

  /*
   * ======================================================
   * DETERMINE STORES
   * ======================================================
   */

  const storeIds: string[] =
    activeStore?.id
      ? [activeStore.id]
      : [];

  if (
    storeIds.length === 0
  ) {
    return (
      <DashboardLayout>
        <div className="rounded-[30px] border border-slate-200 bg-white p-8 text-center">
          <Users
            size={32}
            className="mx-auto text-slate-300"
          />

          <h1 className="mt-3 text-2xl font-black text-[#17102F]">
            Team Overview
          </h1>

          <p className="mt-2 text-slate-500">
            Select a store to view team performance.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  /*
   * ======================================================
   * STORES
   * ======================================================
   */

  const {
    data: storeRows,
    error: storeError,
  } = await supabase
    .from("stores")
    .select("id,name")
    .in(
      "id",
      storeIds
    );

  if (storeError) {
    console.error(
      "TEAM OVERVIEW STORE ERROR:",
      storeError
    );
  }

  const storeMap =
    new Map<string, string>();

  for (
    const store
    of storeRows || []
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
   * EMPLOYEE SOURCES
   * ======================================================
   */

  const [
    pendingResult,
    registeredResult,
    trackedResult,
  ] = await Promise.all([
    supabase
      .from(
        "pending_employees"
      )
      .select(
        `
        id,
        full_name,
        role,
        status,
        store_id,
        gp_goal,
        voice_goal,
        mim_goal,
        upgrade_goal,
        hsi_goal,
        bts_goal,
        accessory_goal,
        features_goal,
        gp_progress,
        voice_progress,
        mim_progress,
        upgrade_progress,
        hsi_progress,
        bts_progress,
        accessory_progress,
        features_progress
        `
      )
      .in(
        "store_id",
        storeIds
      )
      .eq(
        "status",
        "not_registered"
      )
      .order(
        "full_name"
      ),

    supabase
      .from("profiles")
      .select(
        `
        id,
        full_name,
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
      ),
  ]);

  if (pendingResult.error) {
    console.error(
      "TEAM OVERVIEW PENDING ERROR:",
      pendingResult.error
    );
  }

  if (
    registeredResult.error
  ) {
    console.error(
      "TEAM OVERVIEW REGISTERED ERROR:",
      registeredResult.error
    );
  }

  if (trackedResult.error) {
    console.error(
      "TEAM OVERVIEW TRACKED ERROR:",
      trackedResult.error
    );
  }

  const registered =
    registeredResult.data ||
    [];

  const tracked =
    trackedResult.data || [];

  const registeredIds =
    registered.map(
      (employee: any) =>
        employee.id
    );

  const trackedIds =
    tracked.map(
      (employee: any) =>
        employee.id
    );

  /*
   * ======================================================
   * REGISTERED GOALS + STATS
   * ======================================================
   */

  let registeredGoals: any[] =
    [];

  let registeredStats: any[] =
    [];

  if (
    registeredIds.length > 0
  ) {
    const [
      goalsResult,
      statsResult,
    ] = await Promise.all([
      supabase
        .from(
          "employee_goals"
        )
        .select("*")
        .in(
          "employee_id",
          registeredIds
        )
        .eq(
          "month",
          month.monthName
        )
        .eq(
          "year",
          month.year
        ),

      supabase
        .from(
          "employee_daily_stats"
        )
        .select("*")
        .in(
          "employee_id",
          registeredIds
        )
        .in(
          "store_id",
          storeIds
        )
        .gte(
          "stat_date",
          month.monthStart
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

    if (goalsResult.error) {
      console.error(
        "TEAM OVERVIEW REGISTERED GOALS ERROR:",
        goalsResult.error
      );
    }

    if (statsResult.error) {
      console.error(
        "TEAM OVERVIEW REGISTERED STATS ERROR:",
        statsResult.error
      );
    }

    registeredGoals =
      goalsResult.data || [];

    registeredStats =
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
      goalsResult,
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
          month.monthName
        )
        .eq(
          "year",
          month.year
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
        .in(
          "store_id",
          storeIds
        )
        .gte(
          "stat_date",
          month.monthStart
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

    if (goalsResult.error) {
      console.error(
        "TEAM OVERVIEW TRACKED GOALS ERROR:",
        goalsResult.error
      );
    }

    if (statsResult.error) {
      console.error(
        "TEAM OVERVIEW TRACKED STATS ERROR:",
        statsResult.error
      );
    }

    trackedGoals =
      goalsResult.data || [];

    trackedStats =
      statsResult.data || [];
  }

  /*
   * ======================================================
   * LOOKUP MAPS
   * ======================================================
   */

  const registeredGoalsMap =
    new Map<string, any>();

  for (
    const row
    of registeredGoals
  ) {
    registeredGoalsMap.set(
      row.employee_id,
      row
    );
  }

  const registeredStatsMap =
    new Map<string, any>();

  for (
    const row
    of registeredStats
  ) {
    if (
      !registeredStatsMap.has(
        row.employee_id
      )
    ) {
      registeredStatsMap.set(
        row.employee_id,
        row
      );
    }
  }

  const trackedGoalsMap =
    new Map<string, any>();

  for (
    const row
    of trackedGoals
  ) {
    trackedGoalsMap.set(
      row.employee_id,
      row
    );
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
   * BUILD TEAM
   * ======================================================
   */

  const team: any[] = [];

  for (
    const employee
    of registered
  ) {
    team.push({
      id:
        employee.id,

      employeeType:
        "profile",

      name:
        employee.full_name ||
        "Employee",

      status:
        "active",

      storeId:
        employee.store_id,

      storeName:
        storeMap.get(
          employee.store_id
        ) ||
        "Unknown Store",

      goals:
        registeredGoalsMap.get(
          employee.id
        ) || {},

      stats:
        registeredStatsMap.get(
          employee.id
        ) || {},

      pending:
        false,
    });
  }

  for (
    const employee
    of tracked
  ) {
    team.push({
      id:
        employee.id,

      employeeType:
        "tracked",

      name:
        employee.full_name ||
        "Employee",

      status:
        "active",

      storeId:
        employee.store_id,

      storeName:
        storeMap.get(
          employee.store_id
        ) ||
        "Unknown Store",

      goals:
        trackedGoalsMap.get(
          employee.id
        ) || {},

      stats:
        trackedStatsMap.get(
          employee.id
        ) || {},

      pending:
        false,
    });
  }

  /*
   * Preserve the existing pending employee
   * behavior. Their goals and progress live
   * directly on pending_employees.
   */

  for (
    const employee
    of pendingResult.data || []
  ) {
    team.push({
      id:
        employee.id,

      employeeType:
        "pending",

      name:
        employee.full_name ||
        "Employee",

      status:
        "pending",

      storeId:
        employee.store_id,

      storeName:
        storeMap.get(
          employee.store_id
        ) ||
        "Unknown Store",

      goals:
        employee,

      stats:
        employee,

      pending:
        true,
    });
  }

  /*
   * ======================================================
   * SCORE TEAM
   * ======================================================
   */

  const scoredTeam =
    team
      .map(
        (employee) => {
          const activePercentages =
            metrics
              .map(
                (metric) => {
                  const goal =
                    num(
                      employee
                        .goals[
                        metric
                          .goalKey
                      ]
                    );

                  if (
                    goal <= 0
                  ) {
                    return null;
                  }

                  const current =
                    num(
                      employee
                        .stats[
                        employee.pending
                          ? metric
                              .pendingProgressKey
                          : metric
                              .registeredProgressKey
                      ]
                    );

                  return percent(
                    current,
                    goal
                  );
                }
              )
              .filter(
                (
                  value
                ): value is number =>
                  value !== null
              );

          const overall =
            activePercentages.length
              ? activePercentages.reduce(
                  (
                    sum,
                    value
                  ) =>
                    sum +
                    value,
                  0
                ) /
                activePercentages.length
              : 0;

          return {
            ...employee,
            overall,
          };
        }
      )
      .sort(
        (a, b) => {

          return String(
            a.name
          ).localeCompare(
            String(
              b.name
            )
          );
        }
      );

  const teamAverage =
    scoredTeam.length
      ? scoredTeam.reduce(
          (
            sum,
            employee
          ) =>
            sum +
            employee.overall,
          0
        ) /
        scoredTeam.length
      : 0;

  const pageStoreLabel =
    normalizeStoreName(
      activeStore?.name ||
        "Selected Store"
    );

  /*
   * ======================================================
   * UI
   * ======================================================
   */

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <section className="salespulse-dark-gradient relative overflow-hidden rounded-[30px] px-5 py-6 text-white shadow-[0_24px_70px_rgba(23,16,47,0.18)] sm:px-8 sm:py-8 lg:px-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-pink-500/15 blur-3xl" />

          <div className="relative grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-pink-300">
                <Sparkles
                  size={13}
                />
                Team Overview
              </span>

              <h1 className="mt-5 text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                See the whole
                <span className="text-pink-400">
                  {" "}
                  team pulse.
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-white/55 sm:text-base">
                Current month-to-date performance compared with each employee&apos;s monthly goals.
              </p>

              <p className="mt-4 text-sm font-black text-purple-200">
                {pageStoreLabel}
                {" • "}
                {month.monthName}
                {" "}
                {month.year}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
                <Users
                  size={20}
                  className="text-purple-300"
                />

                <p className="mt-4 text-3xl font-black">
                  {
                    scoredTeam.length
                  }
                </p>

                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/40">
                  Employees
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
                <Gauge
                  size={20}
                  className="text-pink-300"
                />

                <p className="mt-4 text-3xl font-black">
                  {Math.round(
                    teamAverage
                  )}
                  %
                </p>

                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/40">
                  Team Average
                </p>
              </div>
            </div>
          </div>
        </section>

        {scoredTeam.length ===
        0 ? (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <Users
              size={34}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-3 text-xl font-black text-[#17102F]">
              No team performance yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add employees and enter their goals and current progress to populate this page.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {scoredTeam.map(
              (employee) => (
                <section
                  key={`${employee.employeeType}-${employee.id}`}
                  className="overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_14px_40px_rgba(31,21,60,0.06)]"
                >
                  <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="salespulse-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white shadow-lg shadow-purple-500/20">
                          {employee.name
                            .charAt(
                              0
                            )
                            .toUpperCase()}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-xl font-black text-[#17102F] sm:text-2xl">
                              {
                                employee.name
                              }
                            </h2>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wide ${
                                employee.pending
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-emerald-50 text-emerald-700"
                              }`}
                            >
                              {employee.pending
                                ? "Pending"
                                : "Active"}
                            </span>
                          </div>

                          

                          <p className="mt-1 text-xs font-bold text-slate-400">
                            Overall progress across active goals
                          </p>
                        </div>
                      </div>

                      <div className="min-w-[180px]">
                        <div className="flex items-end justify-between">
                          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-600">
                            Overall
                          </span>

                          <span className="text-2xl font-black text-[#17102F]">
                            {Math.round(
                              employee.overall
                            )}
                            %
                          </span>
                        </div>

                        <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="salespulse-gradient h-full rounded-full"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(
                                  0,
                                  employee.overall
                                )
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7 xl:grid-cols-4">
                    {metrics.map(
                      (metric) => {
                        const goal =
                          num(
                            employee
                              .goals[
                              metric
                                .goalKey
                            ]
                          );

                        const current =
                          num(
                            employee
                              .stats[
                              employee.pending
                                ? metric
                                    .pendingProgressKey
                                : metric
                                    .registeredProgressKey
                            ]
                          );

                        const pct =
                          percent(
                            current,
                            goal
                          );

                        return (
                          <div
                            key={
                              metric.key
                            }
                            className="rounded-[24px] border border-slate-200 bg-[#FAFAFD] p-4"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-purple-600">
                                  {
                                    metric.icon
                                  }
                                </span>

                                <span className="text-sm font-black text-[#17102F]">
                                  {
                                    metric.label
                                  }
                                </span>
                              </div>

                              <span className="text-sm font-black text-purple-600">
                                {goal >
                                0
                                  ? `${Math.round(
                                      pct
                                    )}%`
                                  : "—"}
                              </span>
                            </div>

                            <div className="mt-4 flex items-end justify-between gap-3">
                              <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                  MTD
                                </p>

                                <p className="mt-1 text-xl font-black text-[#17102F]">
                                  {formatValue(
                                    current,
                                    metric.money
                                  )}
                                </p>
                              </div>

                              <div className="text-right">
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                                  Goal
                                </p>

                                <p className="mt-1 text-sm font-black text-slate-600">
                                  {formatValue(
                                    goal,
                                    metric.money
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-200">
                              <div
                                className="salespulse-gradient h-full rounded-full"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    Math.max(
                                      0,
                                      pct
                                    )
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </section>
              )
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
