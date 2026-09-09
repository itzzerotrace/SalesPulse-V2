type Props = {
  title: string;
  percent: number;
  icon: string;
  hasGoal?: boolean;
};

export default function MetricProgressCard({
  title,
  percent,
  icon,
  hasGoal = true,
}: Props) {
  const safePercent =
    Number.isFinite(percent)
      ? Math.max(0, percent)
      : 0;

  const roundedPercent =
    Math.round(safePercent);

  const barWidth =
    Math.min(100, safePercent);

  let status = "Getting Started";

  if (!hasGoal) {
    status = "Goal Not Set";
  } else if (safePercent >= 100) {
    status = "Goal Reached";
  } else if (safePercent >= 80) {
    status = "Almost There";
  } else if (safePercent >= 50) {
    status = "On the Way";
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-xl sm:h-12 sm:w-12 sm:rounded-2xl sm:text-2xl">
          {icon}
        </div>

        <div className="text-right">
          <p className="text-2xl font-black text-slate-900 sm:text-3xl">
            {hasGoal
              ? `${roundedPercent}%`
              : "—"}
          </p>

          <p className="mt-0.5 text-[11px] font-black uppercase tracking-wide text-purple-600">
            To Goal
          </p>
        </div>
      </div>

      <h3 className="mt-5 text-base font-black text-slate-900 sm:text-lg">
        {title}
      </h3>

      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500"
          style={{
            width: `${barWidth}%`,
          }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs font-bold text-slate-500">
          {status}
        </p>

        {hasGoal && safePercent > 100 && (
          <p className="text-xs font-black text-emerald-600">
            +{Math.round(
              safePercent - 100
            )}
            % over
          </p>
        )}
      </div>
    </div>
  );
}
