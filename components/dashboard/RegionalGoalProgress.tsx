import { getRegionalGoalProgress } from "@/lib/services/regionalGoals";

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
  { key: "gp", label: "GP" },
  { key: "voice", label: "Voice" },
  { key: "mim", label: "MiM" },
  { key: "upgrade", label: "Upgrades" },
  { key: "hsi", label: "HSI" },
  { key: "bts", label: "BTS" },
  {
    key: "accessories",
    label: "Accessories",
  },
  {
    key: "features",
    label: "Features",
  },
];

function numberValue(value: unknown) {
  const n = Number(value);

  return Number.isFinite(n)
    ? n
    : 0;
}

function formatValue(
  key: MetricKey,
  value: unknown
) {
  const n = numberValue(value);

  if (key === "features") {
    return `$${n.toLocaleString(
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
      n
    ).toLocaleString()}`;
  }

  return Math.ceil(
    n
  ).toLocaleString();
}

function getMetricData(
  store: any,
  key: MetricKey
) {
  /*
   * Current regional service format:
   *
   * store.gp.current
   * store.gp.goal
   * store.gp.percent
   *
   * Same structure for all other metrics.
   */

  if (
    store?.[key] &&
    typeof store[key] === "object"
  ) {
    const current =
      numberValue(
        store[key].current
      );

    const goal =
      numberValue(
        store[key].goal
      );

    const percent =
      store[key].percent !==
      undefined
        ? numberValue(
            store[key].percent
          )
        : goal > 0
          ? (current / goal) * 100
          : 0;

    return {
      current,
      goal,
      percent,
    };
  }

  /*
   * Fallback support in case the
   * service returns flattened data.
   */

  const current =
    numberValue(
      store?.current?.[key] ??
        store?.stats?.[key] ??
        store?.mtd?.[key] ??
        store?.[`${key}_current`] ??
        0
    );

  const goalKey =
    key === "accessories"
      ? "accessory_goal"
      : `${key}_goal`;

  const goal =
    numberValue(
      store?.goals?.[goalKey] ??
        store?.goal?.[goalKey] ??
        store?.[goalKey] ??
        0
    );

  const percent =
    goal > 0
      ? (current / goal) * 100
      : 0;

  return {
    current,
    goal,
    percent,
  };
}

function getStoreName(
  store: any,
  index: number
) {
  return (
    store?.store ||
    store?.name ||
    store?.store_name ||
    store?.store?.name ||
    `Store ${index + 1}`
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
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-xs font-black uppercase tracking-wider text-purple-600">
          District Progress
        </p>

        <h2 className="mt-1 text-2xl font-black text-slate-900">
          Store Goal Performance
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          No assigned stores are available yet.
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
          (
            store: any,
            index: number
          ) => {
            const storeName =
              getStoreName(
                store,
                index
              );

            return (
              <div
                key={
                  store?.id ||
                  store?.store_id ||
                  `${storeName}-${index}`
                }
                className="rounded-2xl bg-slate-50 p-5 sm:p-6"
              >
                <h3 className="text-xl font-black text-slate-900">
                  {storeName}
                </h3>

                <div className="mt-5 grid gap-x-4 gap-y-5 sm:grid-cols-2">
                  {metrics.map(
                    (metric) => {
                      const data =
                        getMetricData(
                          store,
                          metric.key
                        );

                      const barWidth =
                        Math.min(
                          100,
                          Math.max(
                            0,
                            data.percent
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

                            <p className="shrink-0 text-sm font-black text-slate-900">
                              {data.percent.toFixed(
                                1
                              )}
                              %
                            </p>
                          </div>

                          <div className="mt-1 flex items-center justify-between gap-2">
                            <p className="text-sm font-black text-slate-900">
                              {formatValue(
                                metric.key,
                                data.current
                              )}
                              <span className="mx-1.5 text-slate-400">
                                /
                              </span>
                              {formatValue(
                                metric.key,
                                data.goal
                              )}
                            </p>
                          </div>

                          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 transition-all duration-500"
                              style={{
                                width: `${barWidth}%`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}
