import RankBadge from "./RankBadge";
import PerformanceBadge from "./PerformanceBadge";

interface Props {
  rank: number;
  name: string;
  score: number;
}

function getLabel(score: number) {
  if (score >= 100) return "Goal Reached";
  if (score >= 80) return "Top Performer";
  if (score >= 60) return "Strong Progress";
  if (score >= 40) return "On the Way";
  return "Building Progress";
}

export default function EmployeeRankingCard({
  rank,
  name,
  score,
}: Props) {
  const progressWidth = Math.min(
    Math.max(score, 0),
    100
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <RankBadge rank={rank} />

          <div className="min-w-0">
            <h3 className="truncate text-base font-black text-slate-900 sm:text-lg">
              {name}
            </h3>

            <div className="mt-1">
              <PerformanceBadge
                label={getLabel(score)}
              />
            </div>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-2xl font-black text-purple-600 sm:text-3xl">
            {Math.round(score)}%
          </div>

          {score > 100 && (
            <p className="mt-1 text-xs font-bold text-emerald-600">
              +{Math.round(score - 100)}% over
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-purple-600 transition-all"
          style={{
            width: `${progressWidth}%`,
          }}
        />
      </div>
    </div>
  );
}
