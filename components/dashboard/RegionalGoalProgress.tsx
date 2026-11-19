import {
  CircleDollarSign,
  Headphones,
  HouseWifi,
  Phone,
  RefreshCw,
  Star,
  Tablet,
  TrendingUp,
  Building2,
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
;

const metrics: Array<{
  key: MetricKey;
  label: string;
  icon: React.ReactNode;
}> = [
  {
    key: "gp",
    label: "GP",
    icon: <CircleDollarSign size={15} />,
  },
  {
    key: "voice",
    label: "Voice",
    icon: <Phone size={15} />,
  },
  {
    key: "mim",
    label: "MiM",
    icon: <RefreshCw size={15} />,
  },
  {
    key: "upgrade",
    label: "Upgrades",
    icon: <TrendingUp size={15} />,
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
  const values =
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
    values.length === 0
  ) {
    return 0;
  }

  return (
    values.reduce(
      (sum, value) =>
        sum + value,
      0
    ) / values.length
  );
}

function getGoalStatus(
  percent: number
) {
  if (Math.round(percent) >= 90) {
    return {
      label: "Goal Achieved",
      color: "#4ADE80",
      text:
        "text-green-400",
      bg:
        "bg-green-950/40",
      border:
        "border-green-500/40",
      bar:
        "bg-green-400",
    };
  }

  if (Math.round(percent) >= 51) {
    return {
      label: "On the Way",
      color: "#FACC15",
      text:
        "text-yellow-300",
      bg:
        "bg-yellow-950/40",
      border:
        "border-yellow-500/40",
      bar:
        "bg-yellow-400",
    };
  }

  return {
    label: "Needs Focus",
    color: "#F87171",
    text:
      "text-red-400",
    bg:
      "bg-red-950/40",
    border:
      "border-red-500/40",
    bar:
      "bg-red-400",
  };
}

function PerformanceRing({
  score,
}: {
  score: number;
}) {
  const status =
    getGoalStatus(score);

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
      className="relative flex h-[78px] w-[78px] shrink-0 items-center justify-center rounded-full shadow-[0_0_28px_rgba(168,85,247,0.18)]"
      style={{
        background: `conic-gradient(${status.color} ${progress * 3.6}deg, rgba(255,255,255,.22) 0deg)`,
      }}
    >
      <div className="absolute inset-[6px] rounded-full bg-[#160D26]" />

      <span
        className={`relative text-[13px] font-black ${status.text}`}
      >
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
      <div className="rounded-[24px] border border-slate-200 bg-white p-12 text-center shadow-sm">
        <Building2
          size={30}
          className="mx-auto text-[#8B00FF]"
        />

        <h3 className="mt-4 text-xl font-black text-white">
          No stores available
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Assigned stores will appear here once available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {stores.map(
        (store: any) => {
          const storeAverage =
            getStoreAverage(
              store
            );

          const storeStatus =
            getGoalStatus(
              storeAverage
            );

          return (
            <article
              key={store.id}
              className="group overflow-hidden rounded-[30px] border border-violet-300/20 bg-[#160D27] shadow-[0_20px_55px_rgba(5,2,15,0.32)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/40 hover:shadow-[0_25px_65px_rgba(126,34,206,0.22)]"
            >
              {/* METRO STORE HEADER */}

              <div className="relative overflow-hidden border-b border-violet-300/15 bg-gradient-to-br from-[#352052] via-[#241538] to-[#180E2B] px-6 py-6">
                <div className="flex items-center justify-between gap-5">
                  <div className="flex min-w-0 items-center gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-300/30 bg-violet-400/15 text-violet-200 shadow-[0_6px_24px_rgba(168,85,247,0.2)]">
                      <Building2 size={21} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-300">
                        Store Performance
                      </p>

                      <h3 className="mt-1 truncate text-[22px] font-black tracking-[-0.025em] text-white">
                        {store.store}
                      </h3>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3.5">
                    <PerformanceRing
                      score={storeAverage}
                    />

                    <div className="hidden min-w-[105px] sm:block">
                      <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                        Overall
                      </p>

                      <p className="mt-1 text-[11px] font-bold text-[#E9D5FF]">
                        Performance
                      </p>

                      <span
                        className={`mt-2 inline-flex rounded-full border px-3 py-1.5 text-[9px] font-black uppercase ${storeStatus.bg} ${storeStatus.border} ${storeStatus.text}`}
                      >
                        {storeStatus.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* WHITE METRIC CARDS */}

              <div className="grid gap-3 p-4 sm:grid-cols-2">
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

                    const status =
                      getGoalStatus(
                        percent
                      );

                    const barWidth =
                      Math.max(
                        0,
                        Math.min(
                          100,
                          percent
                        )
                      );

                    return (
                      <div
                        key={
                          metric.key
                        }
                        className="rounded-[20px] border border-violet-300/15 bg-gradient-to-br from-[#2B1B42] to-[#1C112D] p-4 shadow-[0_8px_25px_rgba(0,0,0,0.18)] transition-all duration-200 hover:border-violet-300/40 hover:from-[#33204E]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-[13px] border border-violet-300/20 bg-gradient-to-br from-[#7C20D4] to-[#A21CAF] text-white shadow-[0_6px_20px_rgba(139,0,255,0.25)]">
                              {
                                metric.icon
                              }
                            </div>

                            <p className="text-sm font-black tracking-tight text-white">
                              {
                                metric.label
                              }
                            </p>
                          </div>

                          <span
                            className={`rounded-full border px-3 py-1.5 text-base font-black tabular-nums ${status.bg} ${status.border} ${status.text}`}
                          >
                            {percent.toFixed(
                              1
                            )}
                            %
                          </span>
                        </div>

                        <div className="mt-5 flex items-end justify-between gap-4">
                          <div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-violet-200/60">
                              Current
                            </p>

                            <p className="mt-1 text-[22px] font-black tracking-[-0.035em] text-white sm:text-[24px]">
                              {formatValue(
                                metric.key,
                                current
                              )}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-violet-200/60">
                              Goal
                            </p>

                            <p className="mt-1 text-[22px] font-black tracking-[-0.035em] text-white sm:text-[24px]">
                              {formatValue(
                                metric.key,
                                goal
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 h-[8px] overflow-hidden rounded-full bg-[#49375C] ring-1 ring-white/5">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${status.bar}`}
                            style={{
                              width:
                                `${barWidth}%`,
                            }}
                          />
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[8px] font-bold text-slate-400">
                            Progress to goal
                          </span>

                          <span
                            className={`text-[8px] font-black uppercase ${status.text}`}
                          >
                            {
                              status.label
                            }
                          </span>
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
