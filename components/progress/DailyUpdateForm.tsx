"use client";

import {
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Save,
  Store,
  UserRound,
} from "lucide-react";

import {
  emptyProgressStats,
  getProgress,
  progressMetrics,
} from "@/lib/progress/progress";

type Employee = {
  id: string;
  full_name: string;
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

  return Number.isFinite(number)
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
        maximumFractionDigits: 2,
      }
    )}`;
  }

  return String(
    Number(value || 0)
  );
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

  const [date, setDate] =
    useState(statDate);

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
  ] = useState<any>(() => {
    const result: any = {};

    for (const employee of employees) {
      result[employee.id] = {
        ...emptyProgressStats(),
        ...employee.stats,
      };
    }

    return result;
  });

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const storeAverage =
    useMemo(() => {
      const percentages =
        progressMetrics
          .map((metric) => {
            const current =
              numericValue(
                storeStats[
                  metric.key
                ]
              );

            const goal =
              numericValue(
                storeGoals[
                  metric.goalKey
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

      return (
        percentages.reduce(
          (sum, value) =>
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

  function updateStoreStat(
    key: string,
    value: string
  ) {
    setStoreStats(
      (current: any) => ({
        ...current,
        [key]:
          numericValue(value),
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
          numericValue(value),
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
            numericValue(value),
        },
      })
    );
  }

  async function saveUpdate() {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response =
        await fetch(
          "/api/daily-update",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              statDate: date,
              storeStats,
              storeGoals,
              employees:
                employees.map(
                  (employee) => ({
                    employeeId:
                      employee.id,
                    stats:
                      employeeStats[
                        employee.id
                      ] ||
                      emptyProgressStats(),
                  })
                ),
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Unable to save update."
        );
      }

      setMessage(
        `${storeName} progress saved successfully.`
      );

      router.refresh();
    } catch (saveError: any) {
      setError(
        saveError?.message ||
          "Unable to save update."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 to-indigo-700 text-white shadow-sm">
        <div className="p-5 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-purple-100">
                <Store size={18} />
                Daily Progress Update
              </div>

              <h1 className="mt-2 text-3xl font-black sm:text-4xl">
                {storeName}
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-purple-100 sm:text-base">
                Enter the current month-to-date totals. SalesPulse will track progress against goal and calculate the pace needed for the rest of the month.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex">
              <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-wide text-purple-100">
                  Days Remaining
                </p>
                <p className="mt-1 text-2xl font-black">
                  {daysRemaining}
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-wide text-purple-100">
                  Overall
                </p>
                <p className="mt-1 text-2xl font-black">
                  {Math.round(
                    storeAverage
                  )}
                  %
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 max-w-xs">
            <label className="mb-2 block text-xs font-black uppercase tracking-wide text-purple-100">
              Snapshot Date
            </label>

            <input
              type="date"
              value={date}
              onChange={(event) =>
                setDate(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 font-bold text-slate-900 outline-none"
            />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-purple-600">
            Store Performance
          </p>

          <h2 className="mt-1 text-2xl font-black text-slate-900">
            {storeName} MTD
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            The goal normally stays the same all month. Update the MTD number each morning.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
                    metric.goalKey
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
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-black text-slate-900">
                      {
                        metric.label
                      }
                    </h3>

                    <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-black text-purple-700">
                      {Math.round(
                        progress.percent
                      )}
                      %
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <label className="text-xs font-bold text-slate-500">
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
                            metric.key
                          ] ?? 0
                        }
                        onChange={(
                          event
                        ) =>
                          updateStoreStat(
                            metric.key,
                            event.target
                              .value
                          )
                        }
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base font-black text-slate-900 outline-none focus:border-purple-500"
                      />
                    </label>

                    <label className="text-xs font-bold text-slate-500">
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
                            metric.goalKey
                          ] ?? 0
                        }
                        onChange={(
                          event
                        ) =>
                          updateStoreGoal(
                            metric.goalKey,
                            event.target
                              .value
                          )
                        }
                        className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base font-black text-slate-900 outline-none focus:border-purple-500"
                      />
                    </label>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"
                      style={{
                        width: `${width}%`,
                      }}
                    />
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-slate-500">
                        Remaining
                      </p>
                      <p className="mt-0.5 font-black text-slate-900">
                        {formatValue(
                          progress.remaining,
                          metric.type
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-500">
                        Need / Day
                      </p>
                      <p className="mt-0.5 font-black text-slate-900">
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
              );
            }
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-purple-600">
            Employee Performance
          </p>

          <h2 className="mt-1 text-2xl font-black text-slate-900">
            Team MTD Updates
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter each employee&apos;s current month-to-date totals.
          </p>
        </div>

        {employees.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-600">
            No registered employees are assigned to this store yet.
          </div>
        )}

        {employees.map(
          (employee) => (
            <div
              key={employee.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
                  <UserRound
                    size={21}
                  />
                </div>

                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {
                      employee.full_name
                    }
                  </h3>

                  <p className="text-xs font-semibold text-slate-500">
                    Current month progress
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {progressMetrics.map(
                  (metric) => {
                    const current =
                      numericValue(
                        employeeStats[
                          employee.id
                        ]?.[
                          metric.key
                        ]
                      );

                    const goal =
                      numericValue(
                        employee.goals?.[
                          metric.goalKey
                        ]
                      );

                    const progress =
                      getProgress(
                        current,
                        goal,
                        daysRemaining,
                        metric.key
                      );

                    return (
                      <div
                        key={
                          metric.key
                        }
                        className="rounded-2xl bg-slate-50 p-4"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-black text-slate-900">
                            {
                              metric.shortLabel
                            }
                          </p>

                          <span className="text-xs font-black text-purple-700">
                            {goal
                              ? `${Math.round(
                                  progress.percent
                                )}%`
                              : "No goal"}
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
                              employee.id
                            ]?.[
                              metric.key
                            ] ?? 0
                          }
                          onChange={(
                            event
                          ) =>
                            updateEmployeeStat(
                              employee.id,
                              metric.key,
                              event.target
                                .value
                            )
                          }
                          className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base font-black text-slate-900 outline-none focus:border-purple-500"
                        />

                        <div className="mt-2 flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">
                            Goal{" "}
                            {formatValue(
                              goal,
                              metric.type
                            )}
                          </span>

                          <span className="font-bold text-slate-700">
                            {progress.neededPerDay ===
                            null
                              ? ""
                              : `Need ${formatValue(
                                  progress.neededPerDay,
                                  metric.type
                                )}/day`}
                          </span>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )
        )}
      </section>

      {(message || error) && (
        <div
          className={`flex items-center gap-3 rounded-2xl border p-4 font-bold ${
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {!error && (
            <CheckCircle2
              size={20}
            />
          )}

          {error || message}
        </div>
      )}

      <div className="sticky bottom-4 z-20 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur sm:flex sm:justify-end">
        <button
          type="button"
          onClick={saveUpdate}
          disabled={saving}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3.5 font-black text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <Save size={19} />

          {saving
            ? "Saving..."
            : "Save Daily Update"}
        </button>
      </div>
    </div>
  );
}
