import { Gauge, Sparkles } from "lucide-react";

interface GoalScoreProps {
  score: number;
}

export default function GoalScore({ score }: GoalScoreProps) {
  const safeScore = Number.isFinite(Number(score))
    ? Math.max(0, Number(score))
    : 0;
  const displayScore = Math.round(safeScore);
  const width = Math.min(safeScore, 100);

  // Shared SalesPulse goal thresholds: red 0–50, yellow 51–89, green 90+.
  const isGreen = displayScore >= 90;
  const isYellow = displayScore >= 51 && displayScore < 90;
  const tone = isGreen
    ? {
        label: "Strong Performance",
        text: "text-emerald-700",
        background: "bg-emerald-500",
        icon: "bg-emerald-50 text-emerald-700 ring-emerald-200",
        pill: "bg-emerald-50 text-emerald-800 border-emerald-200",
        glow: "bg-emerald-100",
      }
    : isYellow
      ? {
          label: "Building Momentum",
          text: "text-amber-700",
          background: "bg-amber-400",
          icon: "bg-amber-50 text-amber-700 ring-amber-200",
          pill: "bg-amber-50 text-amber-800 border-amber-200",
          glow: "bg-amber-100",
        }
      : {
          label: "Needs Focus",
          text: "text-red-700",
          background: "bg-red-500",
          icon: "bg-red-50 text-red-700 ring-red-200",
          pill: "bg-red-50 text-red-800 border-red-200",
          glow: "bg-red-100",
        };

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white p-4 text-slate-950 shadow-[0_12px_32px_rgba(15,23,42,0.12)] sm:p-5">
      <div className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-70 blur-3xl ${tone.glow}`} />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 ${tone.icon}`}>
            <Gauge size={24} />
          </div>
          <Sparkles size={20} className="text-slate-400" />
        </div>

        <p className="mt-4 text-[12px] font-extrabold uppercase tracking-[0.16em] text-slate-600">
          Overall Goal Progress
        </p>

        <div className="mt-2 flex items-baseline gap-1">
          <h2 className={`text-5xl font-black tracking-[-0.06em] sm:text-6xl ${tone.text}`}>
            {displayScore}
          </h2>
          <span className={`text-2xl font-black ${tone.text}`}>%</span>
        </div>

        <div className={`mt-4 inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-xs font-extrabold ${tone.pill}`}>
          {tone.label}
        </div>

        <div className="mt-auto pt-4">
          <div className="mb-2 flex items-center justify-between text-xs font-bold text-slate-600">
            <span>Progress to monthly goal</span>
            <span className="text-slate-900">{displayScore}%</span>
          </div>
          <div className="h-3.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-700 ${tone.background}`}
              style={{ width: `${width}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] font-semibold text-slate-500">
            <span><span className="font-black text-red-700">Red</span> 0–50%</span>
            <span><span className="font-black text-amber-700">Yellow</span> 51–89%</span>
            <span><span className="font-black text-emerald-700">Green</span> 90%+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
