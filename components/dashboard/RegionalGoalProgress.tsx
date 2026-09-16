import {
  ArrowUpRight,
  Banknote,
  BarChart3,
  Building2,
  Gauge,
  Headphones,
  HouseWifi,
  MessageSquareMore,
  Phone,
  RefreshCw,
  Sparkles,
  Star,
  Watch,
} from "lucide-react";

import {
  getRegionalGoalProgress,
} from "@/lib/services/regionalGoals";

type MetricKey =
  | "gp"
  | "voice"
  | "mim"
  | "upgrade"
  | "hsi"
  | "bts"
  | "accessories"
  | "features";

const metrics: Array<{
  key: MetricKey;
  label: string;
  icon: React.ReactNode;
}> = [
  {
    key: "gp",
    label: "GP",
    icon: <Banknote size={15} />,
  },
  {
    key: "voice",
    label: "Voice",
    icon: <Phone size={15} />,
  },
  {
    key: "mim",
    label: "MiM",
    icon: <MessageSquareMore size={15} />,
  },
  {
    key: "upgrade",
    label: "Upgrades",
    icon: <RefreshCw size={15} />,
  },
  {
    key: "hsi",
    label: "HSI",
    icon: <HouseWifi size={15} />,
  },
  {
    key: "bts",
    label: "BTS",
    icon: <Watch size={15} />,
  },
  {
    key: "accessories",
    label: "Accessories",
    icon: <Headphones size={15} />,
  },
  {
    key: "features",
    label: "Features",
    icon: <Star size={15} />,
  },
];

function safeNumber(
  value: unknown
) {
  const parsed =
    Number(value);

  return Number.isFinite(
    parsed
  )
    ? parsed
    : 0;
}

function formatValue(
  key: MetricKey,
  value: unknown
) {
  const number =
    safeNumber(value);

  if (key === "features") {
    return `$${number.toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  }

  if (
    key === "gp" ||
    key === "accessories"
  ) {
    return `$${Math.ceil(
      number
    ).toLocaleString()}`;
  }

  return Math.ceil(
    number
  ).toLocaleString();
}

function getStoreAverage(
  store: any
) {
  const activeMetrics =
    metrics
      .map((metric) => {
        const data =
          store[
            metric.key
          ];

        const goal =
          safeNumber(
            data?.goal
          );

        if (goal <= 0) {
          return null;
        }

        return safeNumber(
          data?.percent
        );
      })
      .filter(
        (
          value
        ): value is number =>
          value !== null
      );

  if (
    activeMetrics.length === 0
  ) {
    return 0;
  }

  return (
    activeMetrics.reduce(
      (total, value) =>
        total + value,
      0
    ) /
    activeMetrics.length
  );
}

function getPerformanceLabel(
  score: number
) {
  if (score >= 100) {
    return "Goal Pace";
  }

  if (score >= 75) {
    return "Strong Pace";
  }

  if (score >= 50) {
    return "Building";
  }

  return "Needs Focus";
}

export default async function RegionalGoalProgress() {
  const stores =
    await getRegionalGoalProgress();

  if (
    !stores ||
    stores.length === 0
  ) {
    return (
      <div className="rounded-[26px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
          <Building2
            size={25}
          />
        </div>

        <h3 className="mt-4 text-xl font-black text-[#17102F]">
          No stores available
        </h3>

        <p className="mt-2 text-sm font-medium text-slate-500">
          Assigned stores will appear here once they are available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {stores.map(
        (store: any) => {
          const storeAverage =
            getStoreAverage(
              store
            );

          const performanceLabel =
            getPerformanceLabel(
              storeAverage
            );

          return (
            <article
              key={store.id}
              className="group overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_14px_45px_rgba(31,21,60,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-[0_22px_60px_rgba(91,33,182,0.12)]"
            >
              {/* STORE HEADER */}

              <div className="relative overflow-hidden bg-[#17102F] px-5 py-5 text-white sm:px-6">
                <div className="pointer-events-none absolute -right-12 -top-20 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-24 left-1/3 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />

                <div className="relative flex items-center justify-between gap-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-white/10 text-purple-200 backdrop-blur">
                      <Building2
                        size={20}
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-purple-300">
                          Store Performance
                        </p>

                        <Sparkles
                          size={11}
                          className="text-pink-400"
                        />
                      </div>

                      <h3 className="mt-1 truncate text-xl font-black tracking-[-0.025em] sm:text-2xl">
                        {store.store}
                      </h3>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Gauge
                        size={13}
                        className="text-purple-300"
                      />

                      <p className="text-[9px] font-black uppercase tracking-[0.16em] text-white/40">
                        Overall
                      </p>
                    </div>

                    <p className="mt-1 text-2xl font-black tracking-tight">
                      {storeAverage.toFixed(
                        1
                      )}
                      %
                    </p>

                    <p className="mt-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-purple-300">
                      {performanceLabel}
                    </p>
                  </div>
                </div>

                <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(
                          0,
                          storeAverage
                        )
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* METRICS */}

              <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
                {metrics.map(
                  (metric) => {
                    const data =
                      store[
                        metric.key
                      ] || {
                        current: 0,
                        goal: 0,
                        percent: 0,
                      };

                    const current =
                      safeNumber(
                        data.current
                      );

                    const goal =
                      safeNumber(
                        data.goal
                      );

                    const percent =
                      safeNumber(
                        data.percent
                      );

                    const barWidth =
                      Math.max(
                        0,
                        Math.min(
                          100,
                          percent
                        )
                      );

                    const atGoal =
                      goal > 0 &&
                      percent >= 100;

                    return (
                      <div
                        key={
                          metric.key
                        }
                        className="rounded-[20px] border border-slate-200/80 bg-[#FAFAFD] p-4 transition-colors group-hover:border-slate-200"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-purple-50 text-purple-600">
                              {
                                metric.icon
                              }
                            </div>

                            <p className="text-xs font-black text-[#17102F] sm:text-sm">
                              {
                                metric.label
                              }
                            </p>
                          </div>

                          <div
                            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black ${
                              atGoal
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-purple-50 text-purple-700"
                            }`}
                          >
                            {atGoal && (
                              <ArrowUpRight
                                size={11}
                              />
                            )}

                            {percent.toFixed(
                              1
                            )}
                            %
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-[1fr_auto] items-end gap-3">
                          <div>
                            <p className="text-[8px] font-black uppercase tracking-[0.17em] text-slate-400">
                              Current
                            </p>

                            <p className="mt-1 text-lg font-black tracking-[-0.02em] text-[#17102F]">
                              {formatValue(
                                metric.key,
                                current
                              )}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-[8px] font-black uppercase tracking-[0.17em] text-slate-400">
                              Goal
                            </p>

                            <p className="mt-1 text-sm font-black text-slate-600">
                              {formatValue(
                                metric.key,
                                goal
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200/80">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              atGoal
                                ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                                : "bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500"
                            }`}
                            style={{
                              width:
                                `${barWidth}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {/* CARD FOOTER */}

              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-5 py-3 sm:px-6">
                <div className="flex items-center gap-2">
                  <BarChart3
                    size={13}
                    className="text-purple-600"
                  />

                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                    Monthly Goal Progress
                  </span>
                </div>

                <span className="text-[9px] font-black uppercase tracking-[0.14em] text-purple-600">
                  {performanceLabel}
                </span>
              </div>
            </article>
          );
        }
      )}
    </div>
  );
}
