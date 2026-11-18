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
  | "features";

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
      className="relative flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full"
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
    <div className="grid gap-5 xl:grid-cols-2">
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
              className="overflow-hidden rounded-[26px] border border-purple-400/30 bg-[#140B23] shadow-[0_14px_40px_rgba(80,20,55,0.10)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(226,0,116,0.14)]"
            >
              {/* METRO STORE HEADER */}

              <div className="border-b border-purple-400/20 bg-[#201231] px-5 py-5">
                <div className="flex items-center justify-between gap-5">
                  <div className="flex min-w-0 items-center gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#F3E8FF] text-[#8B00FF]">
                      <Building2 size={21} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#8B00FF]">
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
                        className="rounded-[18px] border border-purple-400/25 bg-[#241536] p-4 shadow-[0_4px_14px_rgba(40,20,30,0.05)]"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#7C20D4] to-[#EC168C] text-white shadow-[0_6px_14px_rgba(139,0,255,0.20)]">
                              {
                                metric.icon
                              }
                            </div>

                            <p className="text-[13px] font-black text-white">
                              {
                                metric.label
                              }
                            </p>
                          </div>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-[10px] font-black ${status.bg} ${status.border} ${status.text}`}
                          >
                            {percent.toFixed(
                              1
                            )}
                            %
                          </span>
                        </div>

                        <div className="mt-4 flex items-end justify-between gap-4">
                          <div>
                            <p className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">
                              Current
                            </p>

                            <p className="mt-1 text-[19px] font-black tracking-[-0.02em] text-white">
                              {formatValue(
                                metric.key,
                                current
                              )}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">
                              Goal
                            </p>

                            <p className="mt-1 text-[13px] font-black text-slate-600">
                              {formatValue(
                                metric.key,
                                goal
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 h-[7px] overflow-hidden rounded-full bg-[#49375C]">
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
