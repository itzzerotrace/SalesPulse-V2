interface Props {
  title: string;
  current: string;
  target: string;
  percent: number;
  icon: string;
}

export default function GoalCard({
  title,
  current,
  target,
  percent,
  icon,
}: Props) {
  const displayPercent = Math.max(0, Math.round(percent));
  const progressWidth = Math.min(100, Math.max(0, percent));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-xl sm:h-12 sm:w-12 sm:rounded-2xl sm:text-2xl">
          {icon}
        </div>

        <span className="text-base font-black text-purple-600 sm:text-lg">
          {displayPercent}%
        </span>
      </div>

      <h3 className="mt-4 text-lg font-black text-slate-900 sm:mt-5 sm:text-xl">
        {title}
      </h3>

      <p className="mt-1.5 text-sm font-medium text-slate-600 sm:mt-2">
        {current} / {target}
      </p>

      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 sm:mt-5 sm:h-3">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"
          style={{
            width: `${progressWidth}%`,
          }}
        />
      </div>
    </div>
  );
}
