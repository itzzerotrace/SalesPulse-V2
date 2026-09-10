import Link from "next/link";

import {
  ArrowRight,
  BarChart3,
  CircleDollarSign,
  Crown,
  Headphones,
  House,
  RadioTower,
  RefreshCcw,
  Rocket,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Trophy,
  Users,
  Wifi,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import MetricProgressCard from "@/components/progress/MetricProgressCard";

import { getDashboardStats } from "@/lib/dashboard/getDashboardStats";
import { getUserProfile } from "@/lib/auth/userProfile";
import { getTeamGoalSummary } from "@/lib/services/teamGoalSummary";
import { getTeamGoalProgress } from "@/lib/services/teamGoalProgress";

function averageGoalProgress(
  goals: any
) {
  const metrics = [
    goals.gp,
    goals.voice,
    goals.mim,
    goals.upgrade,
    goals.hsi,
    goals.bts,
    goals.accessories,
    goals.features,
  ].filter(
    (metric) =>
      Number(metric?.goal || 0) >
      0
  );

  if (!metrics.length) {
    return 0;
  }

  return Math.round(
    metrics.reduce(
      (total, metric) =>
        total +
        Number(
          metric.percent || 0
        ),
      0
    ) / metrics.length
  );
}

function employeeScore(
  goals: any
) {
  const values =
    Object.values(
      goals || {}
    ).map((value) =>
      Number(value || 0)
    );

  if (!values.length) {
    return 0;
  }

  return Math.round(
    values.reduce(
      (total, value) =>
        total + value,
      0
    ) / values.length
  );
}

export default async function ManagerDashboard() {
  const [
    stats,
    profile,
    teamGpProgress,
    teamProgress,
  ] = await Promise.all([
    getDashboardStats(),
    getUserProfile(),
    getTeamGoalSummary(),
    getTeamGoalProgress(),
  ]);

  if (!stats) {
    return null;
  }

  const goals =
    stats.goals;

  const storeName =
    profile?.store?.name ||
    "Store";

  const managerName =
    profile?.full_name ||
    profile?.name ||
    "Manager";

  const firstName =
    managerName
      .trim()
      .split(/\s+/)[0] ||
    "Manager";

  const overallProgress =
    averageGoalProgress(
      goals
    );

  const sortedTeam = [
    ...teamProgress,
  ].sort(
    (a: any, b: any) =>
      employeeScore(
        b.goals
      ) -
      employeeScore(
        a.goals
      )
  );

  const topPerformer =
    sortedTeam[0];

  const metrics = [
    {
      title: "Gross Profit",
      percent:
        goals.gp.percent,
      current:
        goals.gp.current,
      goal:
        goals.gp.goal,
      money: true,
      icon: (
        <CircleDollarSign
          size={24}
        />
      ),
    },
    {
      title: "Voice",
      percent:
        goals.voice.percent,
      current:
        goals.voice.current,
      goal:
        goals.voice.goal,
      icon: (
        <Smartphone
          size={24}
        />
      ),
    },
    {
      title: "MiM",
      percent:
        goals.mim.percent,
      current:
        goals.mim.current,
      goal:
        goals.mim.goal,
      icon: (
        <RefreshCcw
          size={23}
        />
      ),
    },
    {
      title: "Upgrades",
      percent:
        goals.upgrade.percent,
      current:
        goals.upgrade.current,
      goal:
        goals.upgrade.goal,
      icon: (
        <TrendingUp
          size={24}
        />
      ),
    },
    {
      title: "HSI",
      percent:
        goals.hsi.percent,
      current:
        goals.hsi.current,
      goal:
        goals.hsi.goal,
      icon: (
        <Wifi
          size={24}
        />
      ),
    },
    {
      title: "BTS",
      percent:
        goals.bts.percent,
      current:
        goals.bts.current,
      goal:
        goals.bts.goal,
      icon: (
        <RadioTower
          size={24}
        />
      ),
    },
    {
      title: "Accessories",
      percent:
        goals.accessories
          .percent,
      current:
        goals.accessories
          .current,
      goal:
        goals.accessories
          .goal,
      money: true,
      icon: (
        <Headphones
          size={24}
        />
      ),
    },
    {
      title: "Features",
      percent:
        goals.features.percent,
      current:
        goals.features.current,
      goal:
        goals.features.goal,
      money: true,
      icon: (
        <Star
          size={24}
        />
      ),
    },
  ];

  const overallWidth =
    Math.min(
      Math.max(
        overallProgress,
        0
      ),
      100
    );

  const teamGpWidth =
    Math.min(
      Math.max(
        Number(
          teamGpProgress ||
            0
        ),
        0
      ),
      100
    );

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <section className="salespulse-dark-gradient relative overflow-hidden rounded-[30px] px-5 py-6 text-white shadow-[0_24px_70px_rgba(23,16,47,0.18)] sm:px-8 sm:py-8 lg:px-10">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-pink-500/15 blur-3xl" />

          <div className="pointer-events-none absolute bottom-[-100px] left-[28%] h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />

          <div className="relative grid gap-8 xl:grid-cols-[1.45fr_0.55fr] xl:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-pink-300">
                  <Sparkles
                    size={13}
                  />
                  Manager Dashboard
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-purple-200">
                  <House
                    size={12}
                  />
                  {storeName}
                </span>
              </div>

              <h1 className="mt-5 max-w-3xl text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                Keep the pulse moving,
                {" "}
                <span className="text-pink-400">
                  {firstName}.
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-white/55 sm:text-base">
                Track store momentum,
                team progress, and every
                monthly goal from one
                command center.
              </p>

              <div className="mt-7 max-w-2xl">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-300">
                      Overall Store
                      Progress
                    </p>

                    <p className="mt-1 text-3xl font-black sm:text-4xl">
                      {overallProgress}
                      %
                    </p>
                  </div>

                  <p className="text-right text-xs font-bold text-white/45">
                    Average across
                    active goals
                  </p>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="salespulse-gradient h-full rounded-full shadow-[0_0_22px_rgba(247,37,133,0.45)]"
                    style={{
                      width: `${overallWidth}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:max-w-xl xl:max-w-none">
              <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 text-purple-200">
                  <Users
                    size={18}
                  />
                </div>

                <p className="mt-4 text-2xl font-black">
                  {
                    sortedTeam.length
                  }
                </p>

                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.15em] text-white/40">
                  Team Members
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-500/20 text-pink-300">
                  <Trophy
                    size={18}
                  />
                </div>

                <p className="mt-4 truncate text-lg font-black">
                  {topPerformer
                    ?.employee
                    ?.full_name
                    ?.split(" ")[0] ||
                    "—"}
                </p>

                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.15em] text-white/40">
                  Top Progress
                </p>
              </div>

              <Link
                href="/daily-update"
                className="salespulse-gradient col-span-2 flex min-h-14 items-center justify-between rounded-2xl px-5 py-3 font-black text-white shadow-xl shadow-pink-950/20 transition hover:scale-[1.01]"
              >
                Update Today&apos;s
                Progress

                <ArrowRight
                  size={19}
                />
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600">
                Store Performance
              </p>

              <h2 className="mt-1 text-2xl font-black tracking-tight text-[#17102F] sm:text-3xl">
                Goal Progress
              </h2>
            </div>

            <p className="max-w-md text-sm font-medium text-slate-500">
              Current progress toward
              each monthly store goal.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map(
              (metric) => (
                <MetricProgressCard
                  key={
                    metric.title
                  }
                  title={
                    metric.title
                  }
                  percent={
                    metric.percent
                  }
                  current={
                    metric.current
                  }
                  goal={
                    metric.goal
                  }
                  money={
                    metric.money ||
                    false
                  }
                  icon={
                    metric.icon
                  }
                />
              )
            )}
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
          <div className="relative overflow-hidden rounded-[30px] border border-slate-200/80 bg-white p-6 shadow-[0_14px_40px_rgba(31,21,60,0.06)] sm:p-7">
            <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-purple-100 blur-3xl" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600">
                    Team GP
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-[#17102F]">
                    Team Momentum
                  </h2>
                </div>

                <div className="salespulse-gradient flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg shadow-purple-500/20">
                  <Rocket
                    size={22}
                  />
                </div>
              </div>

              <div className="mt-8 flex items-end justify-between gap-4">
                <p className="text-5xl font-black tracking-[-0.05em] text-[#17102F]">
                  {Math.round(
                    Number(
                      teamGpProgress ||
                        0
                    )
                  )}
                  %
                </p>

                <p className="pb-1 text-right text-xs font-bold text-slate-500">
                  GP goal
                  attainment
                </p>
              </div>

              <div className="mt-5 h-4 overflow-hidden rounded-full bg-[#ECEAF3]">
                <div
                  className="salespulse-gradient h-full rounded-full"
                  style={{
                    width: `${teamGpWidth}%`,
                  }}
                />
              </div>

              <Link
                href="/team"
                className="mt-7 flex items-center justify-between rounded-2xl bg-[#F5F3FA] px-4 py-3 text-sm font-black text-purple-700 transition hover:bg-purple-100"
              >
                View Team
                <ArrowRight
                  size={17}
                />
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_14px_40px_rgba(31,21,60,0.06)]">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-7">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-600">
                  Team Pulse
                </p>

                <h2 className="mt-1 text-xl font-black text-[#17102F] sm:text-2xl">
                  Employee Progress
                </h2>
              </div>

              <BarChart3
                className="text-purple-600"
                size={24}
              />
            </div>

            {sortedTeam.length >
            0 ? (
              <div className="divide-y divide-slate-100">
                {sortedTeam
                  .slice(0, 5)
                  .map(
                    (
                      member: any,
                      index: number
                    ) => {
                      const score =
                        employeeScore(
                          member.goals
                        );

                      const width =
                        Math.min(
                          Math.max(
                            score,
                            0
                          ),
                          100
                        );

                      return (
                        <div
                          key={
                            member
                              .employee
                              .id
                          }
                          className="flex items-center gap-4 px-5 py-4 sm:px-7"
                        >
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-black ${
                              index ===
                              0
                                ? "bg-amber-100 text-amber-700"
                                : "bg-purple-50 text-purple-700"
                            }`}
                          >
                            {index ===
                            0 ? (
                              <Crown
                                size={
                                  18
                                }
                              />
                            ) : (
                              index +
                              1
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <p className="truncate text-sm font-black text-[#17102F] sm:text-base">
                                {
                                  member
                                    .employee
                                    .full_name
                                }
                              </p>

                              <span className="shrink-0 text-sm font-black text-purple-700">
                                {
                                  score
                                }
                                %
                              </span>
                            </div>

                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="salespulse-gradient h-full rounded-full"
                                style={{
                                  width: `${width}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <Users
                  size={30}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 font-black text-[#17102F]">
                  No employee
                  progress yet
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Employee progress
                  will appear after
                  daily updates are
                  entered.
                </p>
              </div>
            )}

            <div className="border-t border-slate-100 px-5 py-4 sm:px-7">
              <Link
                href="/leaderboard"
                className="flex items-center justify-center gap-2 rounded-2xl border border-purple-100 bg-purple-50 px-4 py-3 text-sm font-black text-purple-700 transition hover:bg-purple-100"
              >
                Full Rankings
                <ArrowRight
                  size={16}
                />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
