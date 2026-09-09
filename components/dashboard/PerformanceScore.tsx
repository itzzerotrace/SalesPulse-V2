export default function PerformanceScore({
  score = 0,
}: {
  score?: number;
}) {
  const safeScore =
    Math.max(
      0,
      Number(score) || 0
    );

  const barWidth =
    Math.min(
      100,
      safeScore
    );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-black uppercase tracking-wide text-purple-600">
        Performance Score
      </p>

      <div className="mt-4 flex items-end gap-2">
        <p className="text-4xl font-black text-slate-900">
          {Math.round(
            safeScore
          )}
          %
        </p>

        <p className="pb-1 text-sm font-semibold text-slate-500">
          to goal
        </p>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-600"
          style={{
            width: `${barWidth}%`,
          }}
        />
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">
        Based on month-to-date goal completion.
      </p>
    </div>
  );
}
