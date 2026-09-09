interface Props {
  title: string;
  current: string;
  target: string;
  percent: number;
  icon: React.ReactNode;
}

export default function GoalCard({
  title,
  current,
  target,
  percent,
  icon,
}: Props) {
  const safePercent =
    Number.isFinite(
      Number(percent)
    )
      ? Math.max(
          0,
          Number(percent)
        )
      : 0;

  const displayPercent =
    Math.round(
      safePercent
    );

  const progressWidth =
    Math.min(
      100,
      safePercent
    );

  const status =
    safePercent >= 100
      ? "Goal Reached"
      : safePercent >= 75
        ? "Almost There"
        : safePercent >= 50
          ? "On The Way"
          : safePercent > 0
            ? "Keep Pushing"
            : "Not Started";

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white p-5 shadow-[0_14px_40px_rgba(31,21,60,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(109,40,217,0.12)] sm:p-6">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-purple-100/60 blur-2xl transition group-hover:bg-pink-100/70" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="salespulse-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg shadow-purple-500/20">
            {icon}
          </div>

          <div className="text-right">
            <p className="text-2xl font-black tracking-tight text-[#17102F]">
              {displayPercent}%
            </p>

            <p className="text-[9px] font-black uppercase tracking-[0.16em] text-purple-600">
              To Goal
            </p>
          </div>
        </div>

        <h3 className="mt-5 text-lg font-black text-[#17102F]">
          {title}
        </h3>

        <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
          <span className="text-sm font-black text-slate-700">
            {current}
          </span>

          <span className="text-xs font-bold text-slate-400">
            of
          </span>

          <span className="text-sm font-bold text-slate-500">
            {target}
          </span>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#ECEAF3]">
          <div
            className="salespulse-gradient h-full rounded-full shadow-[0_0_14px_rgba(247,37,133,0.2)] transition-all duration-700"
            style={{
              width: `${progressWidth}%`,
            }}
          />
        </div>

        <p className="mt-3 text-[11px] font-black uppercase tracking-wide text-slate-400">
          {status}
        </p>
      </div>
    </div>
  );
}
