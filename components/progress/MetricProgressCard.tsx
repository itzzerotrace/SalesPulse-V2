interface Props {
  title: string;
  percent: number;
  icon: React.ReactNode;
}

export default function MetricProgressCard({
  title,
  percent,
  icon,
}: Props) {
  const safePercent =
    Number.isFinite(Number(percent))
      ? Math.max(0, Number(percent))
      : 0;

  const hasGoal =
    safePercent > 0;

  const roundedPercent =
    Math.round(safePercent);

  const barWidth =
    Math.min(
      safePercent,
      100
    );

  let status =
    "Getting Started";

  if (!hasGoal) {
    status = "No Progress Yet";
  } else if (
    safePercent >= 100
  ) {
    status = "Goal Reached";
  } else if (
    safePercent >= 75
  ) {
    status = "Almost There";
  } else if (
    safePercent >= 50
  ) {
    status = "On the Way";
  }

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-[0_14px_40px_rgba(31,21,60,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(109,40,217,0.12)] sm:p-6">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-purple-100/60 blur-2xl transition group-hover:bg-pink-100/70" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="salespulse-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl text-white shadow-lg shadow-purple-500/20 sm:h-14 sm:w-14 sm:text-2xl">
          {icon}
        </div>

        <div className="text-right">
          <p className="text-3xl font-black tracking-tight text-[#17102F] sm:text-[34px]">
            {hasGoal
              ? `${roundedPercent}%`
              : "—"}
          </p>

          <p className="mt-0.5 text-[10px] font-black uppercase tracking-[0.18em] text-purple-600">
            To Goal
          </p>
        </div>
      </div>

      <div className="relative mt-6">
        <h3 className="text-base font-black text-[#17102F] sm:text-lg">
          {title}
        </h3>

        <div className="mt-4 h-3.5 w-full overflow-hidden rounded-full bg-[#ECEAF3]">
          <div
            className="salespulse-gradient h-full rounded-full shadow-[0_0_16px_rgba(247,37,133,0.22)] transition-all duration-700"
            style={{
              width: `${barWidth}%`,
            }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs font-bold text-slate-500">
            {status}
          </p>

          {hasGoal &&
            safePercent >
              100 && (
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-700">
                +
                {Math.round(
                  safePercent -
                    100
                )}
                % Over
              </span>
            )}
        </div>
      </div>
    </div>
  );
}
