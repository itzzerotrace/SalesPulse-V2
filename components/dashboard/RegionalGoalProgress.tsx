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
}> = [
  {
    key: "gp",
    label: "GP",
  },
  {
    key: "voice",
    label: "Voice",
  },
  {
    key: "mim",
    label: "MiM",
  },
  {
    key: "upgrade",
    label: "Upgrades",
  },
  {
    key: "hsi",
    label: "HSI",
  },
  {
    key: "bts",
    label: "BTS",
  },
  {
    key: "accessories",
    label: "Accessories",
  },
  {
    key: "features",
    label: "Features",
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
    key === "features"
  ) {
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

export default async function RegionalGoalProgress() {
  const stores =
    await getRegionalGoalProgress();

  if (
    !stores ||
    stores.length === 0
  ) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-xs font-black uppercase tracking-wider text-purple-600">
          District Progress
        </p>

        <h2 className="mt-1 text-2xl font-black text-slate-900">
          Store Goal Performance
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          No assigned stores are available.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-purple-600">
          District Progress
        </p>

        <h2 className="mt-1 text-2xl font-black text-slate-900">
          Store Goal Performance
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Current month-to-date performance compared to monthly goals.
        </p>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {stores.map(
          (store: any) => (
            <div
              key={store.id}
              className="rounded-2xl bg-slate-50 p-5 sm:p-6"
            >
              <h3 className="text-xl font-black text-slate-900">
                {store.store}
              </h3>

              <div className="mt-5 grid gap-x-4 gap-y-5 sm:grid-cols-2">
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

                    return (
                      <div
                        key={
                          metric.key
                        }
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-black text-slate-700">
                            {
                              metric.label
                            }
                          </p>

                          <p className="text-sm font-black text-slate-900">
                            {percent.toFixed(
                              1
                            )}
                            %
                          </p>
                        </div>

                        <p className="mt-1 text-sm font-black text-slate-900">
                          {formatValue(
                            metric.key,
                            current
                          )}
                          <span className="mx-1.5 text-slate-400">
                            /
                          </span>
                          {formatValue(
                            metric.key,
                            goal
                          )}
                        </p>

                        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 transition-all duration-500"
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
            </div>
          )
        )}
      </div>
    </section>
  );
}
