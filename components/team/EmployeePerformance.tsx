type Metric = {
  label: string;
  value: string | number;
};

export default function EmployeePerformance({
  gp = 0,
  voice = 0,
  mim = 0,
  upgrade = 0,
  hsi = 0,
  bts = 0,
  accessories = 0,
  features = 0,
}: {
  gp?: number;
  voice?: number;
  mim?: number;
  upgrade?: number;
  hsi?: number;
  bts?: number;
  accessories?: number;
  features?: number;
  [key: string]: any;
}) {
  const metrics: Metric[] = [
    {
      label: "Gross Profit",
      value: `$${Number(
        gp || 0
      ).toLocaleString()}`,
    },
    {
      label: "Voice",
      value: voice || 0,
    },
    {
      label: "MiM",
      value: mim || 0,
    },
    {
      label: "Upgrade",
      value: upgrade || 0,
    },
    {
      label: "HSI",
      value: hsi || 0,
    },
    {
      label: "BTS",
      value: bts || 0,
    },
    {
      label: "Accessories",
      value: `$${Number(
        accessories || 0
      ).toLocaleString()}`,
    },
    {
      label: "Features",
      value: `$${Number(
        features || 0
      ).toLocaleString(
        undefined,
        {
          maximumFractionDigits: 2,
        }
      )}`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {metrics.map(
        (metric) => (
          <div
            key={
              metric.label
            }
            className="rounded-xl bg-slate-50 p-3"
          >
            <p className="text-xs font-bold text-slate-500">
              {
                metric.label
              }
            </p>

            <p className="mt-1 text-lg font-black text-slate-900">
              {
                metric.value
              }
            </p>
          </div>
        )
      )}
    </div>
  );
}
