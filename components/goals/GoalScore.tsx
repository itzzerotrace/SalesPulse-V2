import {
  Gauge,
  Sparkles,
} from "lucide-react";

interface GoalScoreProps {
  score: number;
}

export default function GoalScore({
  score,
}: GoalScoreProps) {
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
    Math.round(safeScore);

  const width =
    Math.min(
      safeScore,
      100
    );

  const status =
    safeScore >= 100
      ? "Goal Crusher"
      : safeScore >= 90
        ? "Elite Pace"
        : safeScore >= 75
          ? "On Track"
          : safeScore >= 50
            ? "Building Momentum"
            : "Time To Push";

  return (
    <div className="salespulse-dark-gradient relative overflow-hidden rounded-[30px] p-6 text-white shadow-[0_20px_55px_rgba(23,16,47,0.16)] sm:p-7">
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="salespulse-gradient flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg shadow-pink-950/20">
            <Gauge
              size={23}
            />
          </div>

          <Sparkles
            size={20}
            className="text-pink-400"
          />
        </div>

        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-purple-300">
          Overall Goal Progress
        </p>

        <div className="mt-2 flex items-end gap-2">
          <h2 className="text-5xl font-black tracking-[-0.05em] sm:text-6xl">
            {displayScore}
          </h2>

          <span className="pb-1 text-2xl font-black text-pink-400">
            %
          </span>
        </div>

        <p className="mt-2 font-black text-white/80">
          {status}
        </p>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="salespulse-gradient h-full rounded-full shadow-[0_0_18px_rgba(247,37,133,0.45)]"
            style={{
              width: `${width}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
