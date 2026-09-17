"use client";

import {
  useMemo,
  useState,
  } from "react";

import {
  useRouter,
  } from "next/navigation";

import {
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Gauge,
  Headphones,
  Tablet,
  RefreshCcw,

  Phone,
  Sparkles,
  Star,
  Store,
  Target,
  TrendingUp,
  UserRound,
  Users,
  HouseWifi,
  Zap,
  RefreshCw,
  Watch,
} from "lucide-react";

import {
  emptyProgressStats,
  getProgress,
  progressMetrics,
} from "@/lib/progress/progress";

type Employee = {
  id: string;
  full_name: string;
  employeeType: "profile" | "tracked";
  goals: any;
  stats: any;
};

type Props = {
  storeName: string;
  statDate: string;
  daysRemaining: number;
  initialStoreStats: any;
  initialStoreGoals: any;
  employees: Employee[];
};

function numericValue(
  value: unknown
) {
  const number =
    Number(value);

  return Number.isFinite(
    number
  )
    ? number
    : 0;
}

function formatValue(
  value: number,
  type: string
) {
  if (type === "money") {
    return `$${Number(
      value || 0
    ).toLocaleString(
      undefined,
      {
        maximumFractionDigits:
          2,
      }
    )}`;
  }

  return String(
    Number(value || 0)
  );
}

function metricIcon(
  key: string,
  size = 19
) {
  const props = {
    size,
  };

  switch (key) {
    case "gp":
      return (
        <CircleDollarSign
          {...props}
        />
      );

    case "voice":
      return (
        <Phone
          {...props}
        />
      );

    case "mim":
      return (
        <RefreshCcw
          {...props}
        />
      );

    case "upgrade":
      return (
        <TrendingUp
          {...props}
        />
      );

    case "hsi":
      return (
        <HouseWifi
          {...props}
        />
      );

    case "bts":
      return (
        <Watch
          {...props}
        />
      );

    case "accessories":
      return (
        <Headphones
          {...props}
        />
      );

    case "features":
      return (
        <Star
          {...props}
        />
      );

    default:
      return (
        <Target
          {...props}
        />
      );
  }
}

export default function DailyUpdateForm({
  storeName,
  statDate,
  daysRemaining,
  initialStoreStats,
  initialStoreGoals,
  employees,
}: Props) {
  const router =
    useRouter();

  const [
    date,
    setDate,
  ] = useState(
    statDate
  );

  const [
    storeStats,
    setStoreStats,
  ] = useState<any>({
    ...emptyProgressStats(),
    ...initialStoreStats,
  });

  const [
    storeGoals,
    setStoreGoals,
  ] = useState<any>({
    ...initialStoreGoals,
  });

  const [
    employeeStats,
    setEmployeeStats,
  ] = useState<any>(
    () => {
      const result: any =
        {};

      for (
        const employee
        of employees
      ) {
        result[
          employee.id
        ] = {
          ...emptyProgressStats(),
          ...employee.stats,
        };
      }

      return result;
    }
  );

const [
    message,
    setMessage,
  ] = useState("");

const storeAverage =
    useMemo(() => {
      const percentages =
        progressMetrics
          .map(
            (metric) => {
              const current =
                numericValue(
                  storeStats[
                    metric.key
                  ]
                );

              const goal =
                numericValue(
                  storeGoals[
                    metric
                      .goalKey
                  ]
                );

              if (!goal) {
                return null;
              }

              return getProgress(
                current,
                goal,
                daysRemaining,
                metric.key
              ).percent;
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
          ) =>
            sum + value,
          0
        ) /
        percentages.length
      );
    }, [
      storeStats,
      storeGoals,
      daysRemaining,
    ]);

  const activeGoals =
    useMemo(
      () =>
        progressMetrics.filter(
          (metric) =>
            numericValue(
              storeGoals[
                metric
                  .goalKey
              ]
            ) > 0
        ).length,
      [storeGoals]
    );

  function updateStoreStat(
    key: string,
    value: string
  ) {
    setStoreStats(
      (current: any) => ({
        ...current,
        [key]:
          numericValue(
            value
          ),
      })
    );
  }

  function updateStoreGoal(
    key: string,
    value: string
  ) {
    setStoreGoals(
      (current: any) => ({
        ...current,
        [key]:
          numericValue(
            value
          ),
      })
    );
  }

  function updateEmployeeStat(
    employeeId: string,
    key: string,
    value: string
  ) {
    setEmployeeStats(
      (current: any) => ({
        ...current,
        [employeeId]: {
          ...current[
            employeeId
          ],
          [key]:
            numericValue(
              value
            ),
        },
      })
    );
  }



  const [saving, setSaving] = useState(false);

  async function saveUpdate() {
    setSaving(true);

    try {
      const response = await fetch("/api/daily-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          statDate: date,
          storeStats,
          storeGoals,
          employees: [],
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error || "Unable to save MTD and goals."
        );
      }

      router.refresh();
      window.alert("MTD and goals updated successfully.");
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to save MTD and goals."
      );
    } finally {
      setSaving(false);
    }
  }

  const overallWidth =
    Math.min(
      100,
      Math.max(
        0,
        storeAverage
      )
    );

  return (
    <div className="space-y-5 sm:space-y-8">
      <section className="salespulse-dark-gradient relative overflow-hidden rounded-[22px] px-4 py-5 text-white sm:rounded-[30px] sm:px-8 sm:py-8 shadow-[0_24px_70px_rgba(23,16,47,0.18)] sm:px-8 sm:py-8 lg:px-10">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-pink-500/15 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 left-[25%] h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative grid gap-5 sm:gap-7 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-pink-300">
              <Zap
                size={13}
                className="fill-pink-400"
              />
              Daily Update
            </span>

            <h1 className="mt-4 text-[28px] font-black leading-[1.05] tracking-[-0.035em] sm:mt-5 sm:text-4xl lg:text-5xl">
              Update the
              <span className="text-pink-400">
                {" "}
                pulse.
              </span>
            </h1>

            <div className="mt-3 flex items-center gap-2 text-sm font-black text-white/80 sm:text-base">
              <Store
                size={17}
                className="text-purple-300"
              />
              {storeName}
            </div>

            <p className="mt-3 max-w-2xl text-[13px] font-medium leading-5 text-white/55 sm:text-base sm:leading-6">
              Enter the current
              month-to-date totals.
              SalesPulse will calculate
              progress, remaining goals,
              and the pace needed for
              the rest of the month.
            </p>

            <div className="mt-5 max-w-xl sm:mt-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-300">
                    Store Progress
                  </p>

                  <p className="mt-1 text-3xl font-black">
                    {Math.round(
                      storeAverage
                    )}
                    %
                  </p>
                </div>

                <p className="text-xs font-bold text-white/40">
                  {activeGoals}
                  /8 active goals
                </p>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="salespulse-gradient h-full rounded-full shadow-[0_0_20px_rgba(247,37,133,0.45)]"
                  style={{
                    width: `${overallWidth}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-3.5 backdrop-blur sm:rounded-3xl sm:p-4">
              <Clock3
                size={20}
                className="text-pink-300"
              />

              <p className="mt-4 text-3xl font-black">
                {daysRemaining}
              </p>

              <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/40">
                Days Remaining
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-3.5 backdrop-blur sm:rounded-3xl sm:p-4">
              <Users
                size={20}
                className="text-purple-300"
              />

              <p className="mt-4 text-3xl font-black">
                {
                  employees.length
                }
              </p>

              <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/40">
                Employees
              </p>
            </div>

            <label className="col-span-2 min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] p-4">
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.17em] text-purple-200">
                <CalendarDays
                  size={14}
                />
                Snapshot Date
              </span>

              <div className="mt-2 min-w-0 max-w-full overflow-hidden rounded-xl">
                <input
                  type="date"
                  value={date}
                  onChange={(
                    event
                  ) =>
                    setDate(
                      event
                        .target
                        .value
                    )
                  }
                  className="block min-w-0 max-w-full w-full box-border rounded-xl border border-white/10 bg-white px-3 py-2.5 text-sm font-black text-[#17102F] outline-none focus:ring-2 focus:ring-pink-300 sm:text-base"
                  style={{
                    WebkitAppearance:
                      "none",
                  }}
                />
              </div>
            </label>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600">
              Store Performance
            </p>

            <div className="mt-1 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <h2 className="text-[22px] font-black tracking-tight text-[#17102F] sm:text-3xl">
                {storeName} MTD
              </h2>

              <button
                type="button"
                onClick={saveUpdate}
                disabled={saving}
                className="salespulse-gradient flex min-h-11 w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-purple-500/20 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-0 sm:w-auto sm:py-2 sm:hover:scale-[1.02]"
              >
                {saving
                  ? "Saving..."
                  : "Save & Update Goals"}
              </button>
            </div>
          </div>

          <p className="max-w-lg text-sm font-medium text-slate-500">
            Update the MTD snapshot
            each morning. Store goals
            can be adjusted here when
            needed.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {progressMetrics.map(
            (metric) => {
              const current =
                numericValue(
                  storeStats[
                    metric.key
                  ]
                );

              const goal =
                numericValue(
                  storeGoals[
                    metric
                      .goalKey
                  ]
                );

              const progress =
                getProgress(
                  current,
                  goal,
                  daysRemaining,
                  metric.key
                );

              const width =
                Math.min(
                  100,
                  Math.max(
                    0,
                    progress.percent
                  )
                );

              return (
                <div
                  key={
                    metric.key
                  }
                  className="group relative overflow-hidden rounded-[22px] border border-slate-200/80 bg-white p-4 sm:rounded-[28px] sm:p-5 shadow-[0_14px_40px_rgba(31,21,60,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(109,40,217,0.11)]"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-purple-100/60 blur-2xl transition group-hover:bg-pink-100/70" />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-3">
                      <div className="salespulse-gradient flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg shadow-purple-500/20">
                        {metricIcon(
                          metric.key
                        )}
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-black tracking-tight text-[#17102F]">
                          {goal
                            ? `${Math.round(
                                progress.percent
                              )}%`
                            : "—"}
                        </p>

                        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-purple-600">
                          To Goal
                        </p>
                      </div>
                    </div>

                    <h3 className="mt-5 text-lg font-black text-[#17102F]">
                      {
                        metric.label
                      }
                    </h3>

                    <div className="mt-4 grid min-w-0 grid-cols-2 gap-2">
                      <label className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                        MTD
                        <input
                          type="number"
                          min="0"
                          step={
                            metric.type ===
                            "money"
                              ? "0.01"
                              : "1"
                          }
                          value={
                            storeStats[
                              metric
                                .key
                            ] ??
                            0
                          }
                          onChange={(
                            event
                          ) =>
                            updateStoreStat(
                              metric.key,
                              event
                                .target
                                .value
                            )
                          }
                          className="mt-1.5 min-w-0 w-full rounded-xl border border-slate-200 bg-[#FAFAFD] px-3 py-3 text-base font-black text-[#17102F] outline-none transition focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
                        />
                      </label>

                      <label className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                        Goal
                        <input
                          type="number"
                          min="0"
                          step={
                            metric.type ===
                            "money"
                              ? "0.01"
                              : "1"
                          }
                          value={
                            storeGoals[
                              metric
                                .goalKey
                            ] ??
                            0
                          }
                          onChange={(
                            event
                          ) =>
                            updateStoreGoal(
                              metric.goalKey,
                              event
                                .target
                                .value
                            )
                          }
                          className="mt-1.5 min-w-0 w-full rounded-xl border border-slate-200 bg-[#FAFAFD] px-3 py-3 text-base font-black text-[#17102F] outline-none transition focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
                        />
                      </label>
                    </div>

                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#ECEAF3]">
                      <div
                        className="salespulse-gradient h-full rounded-full shadow-[0_0_14px_rgba(247,37,133,0.2)]"
                        style={{
                          width: `${width}%`,
                        }}
                      />
                    </div>

                    <div className="mt-4 grid min-w-0 grid-cols-2 gap-2">
                      <div className="rounded-xl bg-[#F7F6FB] p-2.5">
                        <p className="text-[9px] font-black uppercase tracking-wide text-slate-400">
                          Remaining
                        </p>

                        <p className="mt-1 text-sm font-black text-[#17102F]">
                          {formatValue(
                            progress.remaining,
                            metric.type
                          )}
                        </p>
                      </div>

                      <div className="rounded-xl bg-[#F7F6FB] p-2.5">
                        <p className="text-[9px] font-black uppercase tracking-wide text-slate-400">
                          Need / Day
                        </p>

                        <p className="mt-1 text-sm font-black text-[#17102F]">
                          {progress.neededPerDay ===
                          null
                            ? "—"
                            : formatValue(
                                progress.neededPerDay,
                                metric.type
                              )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>

      <section>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-600">
              Team Performance
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-tight text-[#17102F] sm:text-3xl">
              Employee MTD
            </h2>
          </div>

          <p className="max-w-lg text-sm font-medium text-slate-500">
            Enter each
            employee&apos;s current
            month-to-date totals.
          </p>
        </div>

        {employees.length ===
          0 && (
          <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-12 text-center shadow-[0_14px_40px_rgba(31,21,60,0.05)]">
            <Users
              size={30}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 font-black text-[#17102F]">
              No employees yet
            </p>

            <p className="mt-1 text-sm text-slate-500">
              No approved
              employees are assigned
              to this store.
            </p>
          </div>
        )}

        <div className="space-y-5">
          {employees.map(
            (employee) => (
              <div
                key={
                  employee.id
                }
                className="overflow-hidden rounded-[22px] border border-slate-200/80 bg-white sm:rounded-[30px] shadow-[0_14px_40px_rgba(31,21,60,0.06)]"
              >
                <div className="flex flex-col gap-3 border-b border-slate-100 bg-gradient-to-r from-white to-purple-50/40 px-4 py-4 sm:flex-row sm:gap-4 sm:px-7 sm:py-5 sm:items-center sm:justify-between sm:px-7">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="salespulse-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg shadow-purple-500/20">
                      <UserRound
                        size={21}
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-xl font-black text-[#17102F]">
                        {
                          employee.full_name
                        }
                      </h3>

                      <p className="mt-0.5 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                        Month-To-Date
                        Progress
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-purple-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-purple-700">
                    <Gauge
                      size={13}
                    />
                    8 Metrics
                  </div>
                </div>

                <div className="grid gap-3 p-3 sm:grid-cols-2 sm:p-5 xl:grid-cols-4">
                  {progressMetrics.map(
                    (metric) => {
                      const current =
                        numericValue(
                          employeeStats[
                            employee
                              .id
                          ]?.[
                            metric
                              .key
                          ]
                        );

                      const goal =
                        numericValue(
                          employee
                            .goals?.[
                            metric
                              .goalKey
                          ]
                        );

                      const progress =
                        getProgress(
                          current,
                          goal,
                          daysRemaining,
                          metric.key
                        );

                      const width =
                        Math.min(
                          100,
                          Math.max(
                            0,
                            progress.percent
                          )
                        );

                      return (
                        <div
                          key={
                            metric.key
                          }
                          className="rounded-2xl border border-slate-100 bg-[#FAFAFD] p-4 transition focus-within:border-purple-200 focus-within:bg-white"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-purple-600">
                                {metricIcon(
                                  metric.key,
                                  16
                                )}
                              </span>

                              <p className="text-sm font-black text-[#17102F]">
                                {
                                  metric.shortLabel
                                }
                              </p>
                            </div>

                            <span className="text-[11px] font-black text-purple-700">
                              {goal
                                ? `${Math.round(
                                    progress.percent
                                  )}%`
                                : "No Goal"}
                            </span>
                          </div>

                          <input
                            type="number"
                            min="0"
                            step={
                              metric.type ===
                              "money"
                                ? "0.01"
                                : "1"
                            }
                            value={
                              employeeStats[
                                employee
                                  .id
                              ]?.[
                                metric
                                  .key
                              ] ??
                              0
                            }
                            onChange={(
                              event
                            ) =>
                              updateEmployeeStat(
                                employee.id,
                                metric.key,
                                event
                                  .target
                                  .value
                              )
                            }
                            className="mt-3 min-w-0 w-full rounded-xl border border-slate-200 bg-white" px-3 py-3 text-base font-black text-[#17102F] outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                          />

                          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="salespulse-gradient h-full rounded-full"
                              style={{
                                width: `${width}%`,
                              }}
                            />
                          </div>

                          <div className="mt-2 flex items-center justify-between gap-2 text-[10px] font-bold">
                            <span className="text-slate-400">
                              Goal{" "}
                              {formatValue(
                                goal,
                                metric.type
                              )}
                            </span>

                            {progress.neededPerDay !==
                              null &&
                              goal >
                                0 && (
                                <span className="text-slate-600">
                                  Need{" "}
                                  {formatValue(
                                    progress.neededPerDay,
                                    metric.type
                                  )}
                                  /day
                                </span>
                              )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      

    </div>
  );
}
