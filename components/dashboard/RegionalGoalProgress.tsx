import {
  ArrowUpRight,
  Banknote,
  Building2,
  Headphones,
  HouseWifi,
  MessageSquareMore,
  Phone,
  RefreshCw,
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

function safeNumber(value: unknown) {
  const parsed = Number(value);

  return Number.isFinite(parsed)
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
          store[metric.key];

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

function getPerformance(
  score: number
) {
  if (score >= 100) {
    return {
      label: "Goal Pace",
      pill:
        "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
      ring:
        "#34d399",
    };
  }

  if (score >= 75) {
    return {
      label: "Strong Pace",
      pill:
        "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
      ring:
        "#22d3ee",
    };
  }

  if (score >= 50) {
    return {
      label: "Building",
      pill:
        "border-amber-400/30 bg-amber-400/10 text-amber-300",
      ring:
        "#facc15",
    };
  }

  return {
    label: "Needs Focus",
    pill:
      "border-orange-400/30 bg-orange-400/10 text-orange-300",
    ring:
      "#fb923c",
  };
}

function PerformanceRing({
  score,
  color,
}: {
  score: number;
  color: string;
}) {
  const progress =
    Math.max(
      0,
      Math.min(
        100,
        score
      )
    );

  return (
    <div
      className="relative flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full"
      style={{
        background: `conic-gradient(${color} ${progress * 3.6}deg, rgba(148,163,184,.18) 0deg)`,
      }}
    >
      <div className="absolute inset-[5px] rounded-full bg-[#101A33]" />

      <span className="relative text-[13px] font-black text-white">
        {score.toFixed(1)}%
      </span>
    </div>
  );
}

export default async function RegionalGoalProgress() {
  const stores =
    await getRegionalGoalProgress();

  if (
    !stores ||
    stores.length === 0
  ) {
    return (
      <div className="rounded-[24px] border border-dashed border-purple-300/30 bg-[#101A33] px-6 py-14 text-center text-white">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/10 text-purple-300">
          <Building2 size={22} />
        </div>

        <h3 className="mt-4 text-xl font-black">
          No stores available
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Assigned stores will appear here once available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {stores.map(
        (store: any) => {
          const storeAverage =
            getStoreAverage(
              store
            );

          const performance =
            getPerformance(
              storeAverage
            );

          return (
            <article
              key={store.id}
              className="group relative overflow-hidden rounded-[24px] border border-purple-400/20 bg-[#0D1730] shadow-[0_18px_50px_rgba(15,10,40,0.22)] transition duration-300 hover:-translate-y-0.5 hover:border-purple-400/40 hover:shadow-[0_24px_70px_rgba(76,29,149,0.24)]"
            >
              <div className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-purple-600/15 blur-[80px]" />

              <div className="pointer-events-none absolute -left-28 bottom-0 h-56 w-56 rounded-full bg-fuchsia-600/10 blur-[80px]" />

              {/* HEADER */}

              <div className="relative border-b border-white/[0.07] bg-gradient-to-r from-[#101A36] via-[#111832] to-[#21103B] px-5 py-4 sm:px-5">
                <div className="flex items-center justify-between gap-4">

                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-300/20 bg-purple-400/10 text-purple-300 shadow-inner">
                      <Building2 size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-purple-300">
                        Store Performance
                      </p>

                      <h3 className="mt-1 truncate text-[21px] font-black tracking-[-0.025em] text-white">
                        {store.store}
                      </h3>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <PerformanceRing
                      score={
                        storeAverage
                      }
                      color={
                        performance.ring
                      }
                    />

                    <div className="hidden min-w-[86px] sm:block">
                      <p className="text-[8px] font-black uppercase tracking-[0.17em] text-slate-500">
                        Overall
                      </p>

                      <p className="mt-0.5 text-[10px] font-bold text-slate-300">
                        Performance
                      </p>

                      <span
                        className={`mt-1.5 inline-flex rounded-full border px-2 py-1 text-[8px] font-black uppercase tracking-[0.08em] ${performance.pill}`}
                      >
                        {
                          performance.label
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* METRIC GRID */}

              <div className="relative grid grid-cols-1 gap-2.5 p-3 sm:grid-cols-2 sm:p-4">
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
                        className="rounded-[15px] border border-white/[0.08] bg-white/[0.045] px-3.5 py-3 shadow-inner transition duration-200 hover:border-purple-400/20 hover:bg-white/[0.065]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <div
                              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                                atGoal
                                  ? "bg-emerald-400/10 text-emerald-300"
                                  : "bg-purple-400/10 text-purple-300"
                              }`}
                            >
                              {
                                metric.icon
                              }
                            </div>

                            <p className="truncate text-[12px] font-black text-white">
                              {
                                metric.label
                              }
                            </p>
                          </div>

                          <div
                            className={`flex shrink-0 items-center gap-1 text-[10px] font-black ${
                              atGoal
                                ? "text-emerald-300"
                                : "text-purple-300"
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

                        <div className="mt-2.5 flex items-end justify-between gap-3">
                          <p className="text-[13px] font-black tracking-[-0.01em] text-white">
                            {formatValue(
                              metric.key,
                              current
                            )}

                            <span className="mx-1 text-slate-600">
                              /
                            </span>

                            <span className="text-[11px] font-bold text-slate-400">
                              {formatValue(
                                metric.key,
                                goal
                              )}
                            </span>
                          </p>
                        </div>

                        <div className="mt-2.5 h-[5px] overflow-hidden rounded-full bg-slate-700/70">
                          <div
                            className={`h-full rounded-full ${
                              atGoal
                                ? "bg-gradient-to-r from-emerald-500 to-teal-300"
                                : "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
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
            </article>
          );
        }
      )}
    </div>
  );
}
