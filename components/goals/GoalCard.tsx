interface Props {
  title: string;
  current: string;
  target: string;
  percent: number;
  icon: React.ReactNode;
}

export default function GoalCard({ title, current, target, percent, icon }: Props) {
  const safePercent = Number.isFinite(Number(percent))
    ? Math.max(0, Number(percent))
    : 0;
  const displayPercent = Math.round(safePercent);
  const progressWidth = Math.min(100, safePercent);
  const tone = displayPercent >= 90
    ? {
        text: "text-emerald-300",
        bar: "bg-emerald-400",
        badge: "border-emerald-400/30 bg-emerald-400/10",
        label: "Strong Performance",
      }
    : displayPercent >= 51
      ? {
          text: "text-amber-300",
          bar: "bg-amber-400",
          badge: "border-amber-400/30 bg-amber-400/10",
          label: "Building Momentum",
        }
      : {
          text: "text-red-300",
          bar: "bg-red-400",
          badge: "border-red-400/30 bg-red-400/10",
          label: "Needs Focus",
        };

  return (
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-violet-300/20 bg-gradient-to-br from-[#251638] via-[#1D112D] to-[#170D25] p-4 shadow-[0_12px_32px_rgba(5,2,15,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300/45 sm:p-5">
      <div className="pointer-events-none absolute -right-12 -top-16 h-36 w-36 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-300/25 bg-violet-500/20 text-violet-100 shadow-[0_4px_16px_rgba(168,85,247,0.14)]">
            {icon}
          </div>
          <h3 className="truncate text-base font-black tracking-tight text-white sm:text-lg">{title}</h3>
        </div>
        <div className="shrink-0 text-right">
          <p className={`text-[27px] font-black leading-none tracking-[-0.04em] sm:text-[30px] ${tone.text}`}>{displayPercent}%</p>
          <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-violet-100/65">To Goal</p>
        </div>
      </div>

      <div className="relative mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-lg font-black tracking-tight text-white sm:text-xl">{current}</span>
        <span className="text-xs font-semibold text-violet-200/60">/</span>
        <span className="text-base font-bold text-violet-100/80 sm:text-lg">{target}</span>
      </div>

      <div className="relative mt-3 h-2.5 overflow-hidden rounded-full bg-white/10">
        <div className={`h-full rounded-full transition-all duration-700 ${tone.bar}`} style={{ width: `${progressWidth}%` }} />
      </div>
      <div className={`relative mt-3 inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] ${tone.badge} ${tone.text}`}>
        {tone.label}
      </div>
    </article>
  );
}
