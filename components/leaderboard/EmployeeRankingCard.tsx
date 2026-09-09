import {
  Award,
  Crown,
  Medal,
  TrendingUp,
} from "lucide-react";

interface Props {
  rank: number;
  name: string;
  score: number;
}

export default function EmployeeRankingCard({
  rank,
  name,
  score,
}: Props) {
  const safeScore =
    Number.isFinite(
      Number(score)
    )
      ? Math.max(
          0,
          Number(score)
        )
      : 0;

  const displayScore =
    Math.round(
      safeScore
    );

  const width =
    Math.min(
      safeScore,
      100
    );

  const initial =
    name
      ?.charAt(0)
      ?.toUpperCase() ||
    "?";

  const rankIcon =
    rank === 1 ? (
      <Crown
        size={20}
      />
    ) : rank === 2 ? (
      <Medal
        size={20}
      />
    ) : rank === 3 ? (
      <Award
        size={20}
      />
    ) : (
      <span>
        {rank}
      </span>
    );

  return (
    <article
      className={`relative overflow-hidden rounded-[26px] border bg-white p-4 shadow-[0_12px_35px_rgba(31,21,60,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_45px_rgba(109,40,217,0.1)] sm:p-5 ${
        rank === 1
          ? "border-amber-200"
          : "border-slate-200/80"
      }`}
    >
      {rank === 1 && (
        <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-amber-100/70 blur-2xl" />
      )}

      <div className="relative flex items-center gap-3 sm:gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${
            rank === 1
              ? "bg-amber-100 text-amber-700"
              : rank === 2
                ? "bg-slate-100 text-slate-600"
                : rank === 3
                  ? "bg-orange-50 text-orange-700"
                  : "bg-purple-50 text-purple-700"
          }`}
        >
          {rankIcon}
        </div>

        <div className="salespulse-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-base font-black text-white shadow-md shadow-purple-500/15">
          {initial}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-base font-black text-[#17102F] sm:text-lg">
                {name}
              </p>

              <p className="mt-0.5 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
                Overall Goal
                Progress
              </p>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-xl font-black tracking-tight text-purple-700 sm:text-2xl">
                {displayScore}%
              </p>

              {safeScore >=
                100 && (
                <p className="flex items-center justify-end gap-1 text-[9px] font-black uppercase tracking-wide text-emerald-600">
                  <TrendingUp
                    size={10}
                  />
                  Goal+
                </p>
              )}
            </div>
          </div>

          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#ECEAF3]">
            <div
              className="salespulse-gradient h-full rounded-full shadow-[0_0_12px_rgba(247,37,133,0.18)]"
              style={{
                width: `${width}%`,
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
