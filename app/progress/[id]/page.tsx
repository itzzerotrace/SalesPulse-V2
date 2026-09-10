import {
  ArrowLeft,
  CircleDollarSign,
  Headphones,
  RadioTower,
  RefreshCcw,
  Save,
  Smartphone,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Wifi,
} from "lucide-react";

import Link from "next/link";
import { notFound } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { createClient } from "@/lib/supabase/server";
import { getActiveStore } from "@/lib/stores/activeStore";
import {
  getCaliforniaDate,
  getMonthInfo,
} from "@/lib/progress/date";

export const dynamic =
  "force-dynamic";

export const revalidate =
  0;

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

export default async function EmployeeProgressPage({
  params,
  searchParams,
}: {
  params:
    | { id: string }
    | Promise<{
        id: string;
      }>;
  searchParams?:
    | { saved?: string }
    | Promise<{
        saved?: string;
      }>;
}) {
  const resolvedParams =
    await Promise.resolve(
      params
    );

  const resolvedSearchParams =
    await Promise.resolve(
      searchParams || {}
    );

  const employeeId =
    resolvedParams.id;

  const supabase =
    await createClient();

  const activeStore =
    await getActiveStore();

  if (!activeStore?.id) {
    notFound();
  }

  const {
    monthName,
    year,
  } = getMonthInfo(
    getCaliforniaDate()
  );

  const {
    data: employeeData,
    error,
  } = await supabase
    .from(
      "pending_employees"
    )
    .select(`
      id,
      full_name,
      email,
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
    `)
    .eq(
      "id",
      employeeId
    )
    .eq(
      "store_id",
      activeStore.id
    )
    .eq(
      "status",
      "not_registered"
    )
    .maybeSingle();

  if (error) {
    console.error(
      "PENDING PROGRESS LOAD ERROR:",
      error
    );
  }

  if (!employeeData) {
    notFound();
  }

  const employee: Record<string, any> =
    employeeData;

  const fields = [
    {
      key: "gp",
      label:
        "Gross Profit",
      progressKey:
        "gp_progress",
      goalKey:
        "gp_goal",
      money: true,
      step: "0.01",
      icon: (
        <CircleDollarSign
          size={20}
        />
      ),
    },
    {
      key: "voice",
      label: "Voice",
      progressKey:
        "voice_progress",
      goalKey:
        "voice_goal",
      money: false,
      step: "1",
      icon: (
        <Smartphone
          size={20}
        />
      ),
    },
    {
      key: "mim",
      label: "MiM",
      progressKey:
        "mim_progress",
      goalKey:
        "mim_goal",
      money: false,
      step: "1",
      icon: (
        <RefreshCcw
          size={20}
        />
      ),
    },
    {
      key: "upgrade",
      label: "Upgrades",
      progressKey:
        "upgrade_progress",
      goalKey:
        "upgrade_goal",
      money: false,
      step: "1",
      icon: (
        <TrendingUp
          size={20}
        />
      ),
    },
    {
      key: "hsi",
      label: "HSI",
      progressKey:
        "hsi_progress",
      goalKey:
        "hsi_goal",
      money: false,
      step: "1",
      icon: (
        <Wifi
          size={20}
        />
      ),
    },
    {
      key: "bts",
      label: "BTS",
      progressKey:
        "bts_progress",
      goalKey:
        "bts_goal",
      money: false,
      step: "1",
      icon: (
        <RadioTower
          size={20}
        />
      ),
    },
    {
      key: "accessory",
      label:
        "Accessories",
      progressKey:
        "accessory_progress",
      goalKey:
        "accessory_goal",
      money: true,
      step: "0.01",
      icon: (
        <Headphones
          size={20}
        />
      ),
    },
    {
      key: "features",
      label:
        "Features",
      progressKey:
        "features_progress",
      goalKey:
        "features_goal",
      money: true,
      step: "0.01",
      icon: (
        <Star
          size={20}
        />
      ),
    },
  ];

  const percentages =
    fields
      .map(
        (field) => {
          const goal =
            numericValue(
              employee[
                field.goalKey
              ]
            );

          if (goal <= 0) {
            return null;
          }

          const progress =
            numericValue(
              employee[
                field.progressKey
              ]
            );

          return (
            progress /
            goal
          ) * 100;
        }
      )
      .filter(
        (
          value
        ): value is number =>
          value !== null
      );

  const overall =
    percentages.length
      ? percentages.reduce(
          (
            total,
            value
          ) =>
            total + value,
          0
        ) /
        percentages.length
      : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <Link
          href="/team"
          className="inline-flex items-center gap-2 rounded-xl text-sm font-black text-slate-500 transition hover:text-purple-700"
        >
          <ArrowLeft
            size={17}
          />
          Back to Team
        </Link>

        <section className="salespulse-dark-gradient relative overflow-hidden rounded-[30px] px-5 py-6 text-white shadow-[0_24px_70px_rgba(23,16,47,0.18)] sm:px-8 sm:py-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-pink-500/15 blur-3xl" />

          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-pink-300">
                <Sparkles
                  size={13}
                />
                Employee
                Progress
              </span>

              <span className="inline-flex rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-amber-300">
                Pending
                Registration
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
              {
                employee.full_name
              }
            </h1>

            <p className="mt-2 text-sm font-medium text-white/55">
              {monthName}{" "}
              {year} progress
            </p>

            <div className="mt-6 max-w-xl">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-300">
                    Overall
                    Progress
                  </p>

                  <p className="mt-1 text-3xl font-black">
                    {Math.round(
                      overall
                    )}
                    %
                  </p>
                </div>

                <p className="text-xs font-bold text-white/40">
                  {
                    percentages.length
                  }
                  /8 active
                  goals
                </p>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="salespulse-gradient h-full rounded-full shadow-[0_0_20px_rgba(247,37,133,0.45)]"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        overall
                      )
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {resolvedSearchParams.saved ===
          "1" && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-black text-emerald-700">
            Progress
            saved
            successfully.
          </div>
        )}

        <form
          action="/api/progress/update"
          method="POST"
          className="overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_14px_40px_rgba(31,21,60,0.06)]"
        >
          <input
            type="hidden"
            name="employee_id"
            value={
              employeeId
            }
          />

          <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="salespulse-gradient flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg shadow-purple-500/20">
                <Target
                  size={20}
                />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-600">
                  MTD
                  Performance
                </p>

                <h2 className="mt-0.5 text-xl font-black text-[#17102F]">
                  Current
                  Progress
                </h2>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7 xl:grid-cols-4">
            {fields.map(
              (field) => {
                const current =
                  numericValue(
                    employee[
                      field
                        .progressKey
                    ]
                  );

                const goal =
                  numericValue(
                    employee[
                      field
                        .goalKey
                    ]
                  );

                const percent =
                  goal > 0
                    ? (current /
                        goal) *
                      100
                    : 0;

                const width =
                  Math.min(
                    100,
                    Math.max(
                      0,
                      percent
                    )
                  );

                return (
                  <label
                    key={
                      field.key
                    }
                    className="rounded-[22px] border border-slate-200 bg-[#FAFAFD] p-4 transition focus-within:border-purple-300 focus-within:bg-white"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="flex items-center gap-2 text-sm font-black text-[#17102F]">
                        <span className="text-purple-600">
                          {
                            field.icon
                          }
                        </span>

                        {
                          field.label
                        }
                      </span>

                      <span className="text-xs font-black text-purple-600">
                        {goal >
                        0
                          ? `${Math.round(
                              percent
                            )}%`
                          : "—"}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center rounded-xl border border-slate-200 bg-white px-3 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100">
                      {field.money && (
                        <span className="font-black text-slate-400">
                          $
                        </span>
                      )}

                      <input
                        type="number"
                        min="0"
                        step={
                          field.step
                        }
                        name={
                          field.progressKey
                        }
                        defaultValue={
                          current
                        }
                        className="min-w-0 flex-1 bg-transparent px-2 py-3 font-black text-[#17102F] outline-none"
                      />
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-slate-400">
                        <span>
                          MTD{" "}
                          {formatValue(
                            current,
                            field.money
                          )}
                        </span>

                        <span>
                          Goal{" "}
                          {formatValue(
                            goal,
                            field.money
                          )}
                        </span>
                      </div>

                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className="salespulse-gradient h-full rounded-full"
                          style={{
                            width: `${width}%`,
                          }}
                        />
                      </div>
                    </div>
                  </label>
                );
              }
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 bg-[#FAFAFD] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="text-xs font-bold text-slate-500">
              Enter the
              employee&apos;s
              current
              month-to-date
              totals. These
              values stay
              attached while
              registration is
              pending.
            </p>

            <button
              type="submit"
              className="salespulse-gradient flex min-h-12 items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-black text-white shadow-lg shadow-purple-500/20 transition hover:scale-[1.01]"
            >
              <Save
                size={18}
              />
              Save
              Progress
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
