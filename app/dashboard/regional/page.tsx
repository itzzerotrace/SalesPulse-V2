import Link from "next/link";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Crown,
  Gauge,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import RegionalGoalProgress from "@/components/dashboard/RegionalGoalProgress";

import {
  getRegionalTeamData,
} from "@/lib/services/regionalTeam";

export default async function RegionalDashboard() {
  const team =
    await getRegionalTeamData();

  const topEmployees =
    team.rankings.slice(0, 5);

  const overview =
    team.overview;

  const averageScore =
    Number(
      overview.averageScore || 0
    );

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10 sm:space-y-8">

        {/* =====================================================
            PREMIUM REGIONAL HERO
        ===================================================== */}

        <section className="relative overflow-hidden rounded-[32px] bg-[#140A2A] px-6 py-7 text-white shadow-[0_30px_80px_rgba(24,10,52,0.24)] sm:px-8 sm:py-9 lg:px-10">
          <div className="pointer-events-none absolute -right-24 -top-32 h-[380px] w-[380px] rounded-full bg-fuchsia-500/20 blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-36 left-[20%] h-[340px] w-[340px] rounded-full bg-purple-600/20 blur-[100px]" />

          <div className="pointer-events-none absolute right-[30%] top-[-100px] h-[260px] w-[260px] rounded-full bg-violet-400/10 blur-[90px]" />

          <div className="relative">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">

              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-300/20 bg-white/[0.07] px-3 py-1.5 backdrop-blur-xl">
                  <Sparkles
                    size={13}
                    className="text-pink-400"
                  />

                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-200">
                    Regional Dashboard
                  </span>
                </div>

                <h1 className="mt-5 text-4xl font-black tracking-[-0.045em] sm:text-5xl lg:text-[56px] lg:leading-[1.02]">
                  Your district.
                  <br />

                  <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    One performance pulse.
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-sm font-medium leading-6 text-white/55 sm:text-base">
                  Monitor store performance, team execution,
                  monthly goals, and district rankings from one
                  command center.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:min-w-[590px]">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-400/15 text-purple-300">
                    <Building2 size={18} />
                  </div>

                  <p className="mt-4 text-3xl font-black">
                    {overview.stores}
                  </p>

                  <p className="mt-1 text-[9px] font-black uppercase tracking-[0.17em] text-white/35">
                    Stores
                  </p>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-400/15 text-pink-300">
                    <Users size={18} />
                  </div>

                  <p className="mt-4 text-3xl font-black">
                    {overview.employees}
                  </p>

                  <p className="mt-1 text-[9px] font-black uppercase tracking-[0.17em] text-white/35">
                    Employees
                  </p>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-400/15 text-fuchsia-300">
                    <Target size={18} />
                  </div>

                  <p className="mt-4 text-3xl font-black">
                    {
                      overview
                        .employeesWithGoals
                    }
                  </p>

                  <p className="mt-1 text-[9px] font-black uppercase tracking-[0.17em] text-white/35">
                    Goals Set
                  </p>
                </div>

                <div className="rounded-[22px] border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/15 text-violet-300">
                    <Gauge size={18} />
                  </div>

                  <p className="mt-4 text-3xl font-black">
                    {averageScore.toFixed(1)}
                    %
                  </p>

                  <p className="mt-1 text-[9px] font-black uppercase tracking-[0.17em] text-white/35">
                    Avg Score
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-xs font-bold text-white/45">
              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={14}
                  className="text-emerald-400"
                />

                {
                  overview
                    .employeesWithStats
                }{" "}
                employees updated MTD
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

              <span>
                Live district performance
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            STORE PERFORMANCE
        ===================================================== */}

        <section className="overflow-hidden rounded-[30px] border border-slate-200/70 bg-white shadow-[0_20px_60px_rgba(31,21,60,0.07)]">
          <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                  <Zap size={17} />
                </div>

                <p className="text-[10px] font-black uppercase tracking-[0.19em] text-purple-600">
                  District Performance
                </p>
              </div>

              <h2 className="mt-3 text-2xl font-black tracking-[-0.025em] text-[#17102F] sm:text-3xl">
                Store Goal Performance
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Current month-to-date performance compared with monthly goals.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-black text-slate-600">
              <Building2
                size={14}
                className="text-purple-600"
              />

              {overview.stores} Active Stores
            </div>
          </div>

          <div className="bg-[#F8F8FC] p-3 sm:p-5">
            <RegionalGoalProgress />
          </div>
        </section>

        {/* =====================================================
            LOWER DASHBOARD
        ===================================================== */}

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">

          {/* DISTRICT TEAM */}

          <section className="relative overflow-hidden rounded-[30px] border border-slate-200/70 bg-white p-6 shadow-[0_18px_50px_rgba(31,21,60,0.06)] sm:p-7">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-100/70 blur-3xl" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.19em] text-purple-600">
                    District Team
                  </p>

                  <h2 className="mt-2 text-2xl font-black tracking-[-0.025em] text-[#17102F]">
                    Team Health
                  </h2>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Coverage and performance across your district.
                  </p>
                </div>

                <Link
                  href="/all-employees"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-purple-600 transition hover:border-purple-200 hover:bg-purple-50"
                >
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-[22px] bg-[#F7F5FC] p-5">
                  <div className="flex items-center gap-2 text-purple-600">
                    <Users size={16} />

                    <p className="text-[9px] font-black uppercase tracking-[0.16em]">
                      Employees
                    </p>
                  </div>

                  <p className="mt-3 text-3xl font-black text-[#17102F]">
                    {overview.employees}
                  </p>
                </div>

                <div className="rounded-[22px] bg-[#F7F5FC] p-5">
                  <div className="flex items-center gap-2 text-purple-600">
                    <Target size={16} />

                    <p className="text-[9px] font-black uppercase tracking-[0.16em]">
                      Goals Set
                    </p>
                  </div>

                  <p className="mt-3 text-3xl font-black text-[#17102F]">
                    {
                      overview
                        .employeesWithGoals
                    }
                  </p>
                </div>

                <div className="rounded-[22px] bg-[#F7F5FC] p-5">
                  <div className="flex items-center gap-2 text-purple-600">
                    <CheckCircle2 size={16} />

                    <p className="text-[9px] font-black uppercase tracking-[0.16em]">
                      MTD Updated
                    </p>
                  </div>

                  <p className="mt-3 text-3xl font-black text-[#17102F]">
                    {
                      overview
                        .employeesWithStats
                    }
                  </p>
                </div>

                <div className="rounded-[22px] bg-[#17102F] p-5 text-white shadow-lg shadow-purple-950/10">
                  <div className="flex items-center gap-2 text-purple-300">
                    <Gauge size={16} />

                    <p className="text-[9px] font-black uppercase tracking-[0.16em]">
                      Avg Score
                    </p>
                  </div>

                  <p className="mt-3 text-3xl font-black">
                    {averageScore.toFixed(1)}
                    %
                  </p>
                </div>
              </div>

              <Link
                href="/all-employees"
                className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3.5 text-sm font-black text-[#17102F] transition hover:border-purple-200 hover:bg-purple-50"
              >
                View all employees

                <ArrowRight
                  size={17}
                  className="text-purple-600"
                />
              </Link>
            </div>
          </section>

          {/* RANKINGS */}

          <section className="overflow-hidden rounded-[30px] border border-slate-200/70 bg-white shadow-[0_18px_50px_rgba(31,21,60,0.06)]">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-6 sm:px-7">
              <div>
                <div className="flex items-center gap-2">
                  <Trophy
                    size={16}
                    className="text-purple-600"
                  />

                  <p className="text-[10px] font-black uppercase tracking-[0.19em] text-purple-600">
                    Rankings
                  </p>
                </div>

                <h2 className="mt-2 text-2xl font-black tracking-[-0.025em] text-[#17102F]">
                  Top Employees
                </h2>
              </div>

              <Link
                href="/leaderboard"
                className="inline-flex items-center gap-2 rounded-xl bg-purple-50 px-3.5 py-2.5 text-xs font-black text-purple-700 transition hover:bg-purple-100"
              >
                View All
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="p-4 sm:p-5">
              {topEmployees.length > 0 ? (
                <div className="space-y-2.5">
                  {topEmployees.map(
                    (
                      employee: any,
                      index: number
                    ) => {
                      const score =
                        Number(
                          employee.score ||
                            0
                        );

                      const first =
                        index === 0;

                      return (
                        <div
                          key={
                            employee.id
                          }
                          className={`group flex items-center gap-4 rounded-[20px] border p-4 transition ${
                            first
                              ? "border-purple-200 bg-gradient-to-r from-purple-50 to-fuchsia-50"
                              : "border-transparent bg-[#F8F8FC] hover:border-purple-100 hover:bg-purple-50/50"
                          }`}
                        >
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-black ${
                              first
                                ? "bg-[#17102F] text-white shadow-lg shadow-purple-950/20"
                                : "bg-white text-purple-700 shadow-sm"
                            }`}
                          >
                            {first ? (
                              <Crown size={19} />
                            ) : (
                              index + 1
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-black text-[#17102F] sm:text-base">
                              {employee.full_name ||
                                "Team Member"}
                            </p>

                            <div className="mt-1 flex items-center gap-1.5">
                              <Building2
                                size={12}
                                className="text-slate-400"
                              />

                              <p className="truncate text-xs font-bold text-slate-500">
                                {
                                  employee.store_name
                                }
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-black text-[#17102F]">
                              {score.toFixed(
                                1
                              )}
                              %
                            </p>

                            <p className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-400">
                              Score
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[22px] border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
                  <Trophy
                    size={28}
                    className="text-slate-300"
                  />

                  <p className="mt-3 font-black text-[#17102F]">
                    Rankings coming soon
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Employee rankings will appear after goals and MTD performance are available.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
