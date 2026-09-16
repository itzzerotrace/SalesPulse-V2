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
    team.rankings.slice(
      0,
      5
    );

  const overview =
    team.overview;

  const averageScore =
    Number(
      overview.averageScore ||
        0
    );

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">

        {/* HERO */}

        <section className="relative overflow-hidden rounded-[28px] border border-purple-400/10 bg-[#130925] px-6 py-6 text-white shadow-[0_24px_70px_rgba(20,9,37,0.24)] sm:px-8 sm:py-7">
          <div className="pointer-events-none absolute -right-20 -top-40 h-[430px] w-[430px] rounded-full bg-fuchsia-600/20 blur-[120px]" />

          <div className="pointer-events-none absolute bottom-[-180px] left-[25%] h-[360px] w-[360px] rounded-full bg-violet-600/15 blur-[110px]" />

          <div className="relative">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

              <div className="max-w-[560px]">
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-300/25 bg-white/[0.06] px-3 py-1.5">
                  <Sparkles
                    size={12}
                    className="text-pink-400"
                  />

                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-200">
                    Regional Dashboard
                  </span>
                </div>

                <h1 className="mt-4 text-[38px] font-black leading-[0.98] tracking-[-0.045em] sm:text-[48px]">
                  Your district.
                  <br />

                  <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    One performance pulse.
                  </span>
                </h1>

                <p className="mt-3 max-w-lg text-sm font-medium leading-5 text-white">
                  Monitor store performance, team execution,
                  monthly goals, and district rankings from one
                  command center.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 xl:w-[500px]">
                <div className="rounded-[18px] border border-white/10 bg-white/[0.055] p-3.5 backdrop-blur">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-400/10 text-purple-300">
                    <Building2 size={16} />
                  </div>

                  <p className="mt-3 text-2xl font-black">
                    {overview.stores}
                  </p>

                  <p className="mt-0.5 text-[8px] font-black uppercase tracking-[0.16em] text-white/30">
                    Stores
                  </p>
                </div>

                <div className="rounded-[18px] border border-white/10 bg-white/[0.055] p-3.5 backdrop-blur">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-fuchsia-400/10 text-fuchsia-300">
                    <Users size={16} />
                  </div>

                  <p className="mt-3 text-2xl font-black">
                    {
                      overview.employees
                    }
                  </p>

                  <p className="mt-0.5 text-[8px] font-black uppercase tracking-[0.16em] text-white/30">
                    Employees
                  </p>
                </div>

                <div className="rounded-[18px] border border-white/10 bg-white/[0.055] p-3.5 backdrop-blur">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-400/10 text-pink-300">
                    <Target size={16} />
                  </div>

                  <p className="mt-3 text-2xl font-black">
                    {
                      overview
                        .employeesWithGoals
                    }
                  </p>

                  <p className="mt-0.5 text-[8px] font-black uppercase tracking-[0.16em] text-white/30">
                    Goals Set
                  </p>
                </div>

                <div className="rounded-[18px] border border-white/10 bg-white/[0.055] p-3.5 backdrop-blur">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/10 text-violet-300">
                    <Gauge size={16} />
                  </div>

                  <p className="mt-3 text-2xl font-black">
                    {averageScore.toFixed(
                      1
                    )}
                    %
                  </p>

                  <p className="mt-0.5 text-[8px] font-black uppercase tracking-[0.16em] text-white/30">
                    Avg Score
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.08] pt-4 text-[10px] font-bold text-white/35">
              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={12}
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

        {/* STORE PERFORMANCE */}

        <section>
          <div className="mb-4 flex flex-col gap-3 px-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                  <Zap size={15} />
                </div>

                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-600">
                  District Performance
                </p>
              </div>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#17102F] sm:text-[28px]">
                Store Goal Performance
              </h2>

              <p className="mt-1 text-xs font-medium text-white sm:text-sm">
                Current month-to-date performance compared with monthly goals.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[10px] font-black text-slate-600 shadow-sm">
              <Building2
                size={13}
                className="text-purple-600"
              />

              {overview.stores} Active Stores
            </div>
          </div>

          <RegionalGoalProgress />
        </section>

        {/* LOWER DASHBOARD */}

        <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">

          <section className="relative overflow-hidden rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_16px_45px_rgba(31,21,60,0.06)] sm:p-6">
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-purple-100/70 blur-3xl" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-600">
                    District Team
                  </p>

                  <h2 className="mt-1.5 text-2xl font-black tracking-[-0.03em] text-[#17102F]">
                    Team Health
                  </h2>
                </div>

                <Link
                  href="/all-employees"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-purple-600 transition hover:bg-purple-50"
                >
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <div className="rounded-[17px] bg-[#F7F5FC] p-4">
                  <p className="text-[8px] font-black uppercase tracking-[0.16em] text-purple-600">
                    Employees
                  </p>

                  <p className="mt-2 text-2xl font-black text-[#17102F]">
                    {overview.employees}
                  </p>
                </div>

                <div className="rounded-[17px] bg-[#F7F5FC] p-4">
                  <p className="text-[8px] font-black uppercase tracking-[0.16em] text-purple-600">
                    Goals Set
                  </p>

                  <p className="mt-2 text-2xl font-black text-[#17102F]">
                    {
                      overview
                        .employeesWithGoals
                    }
                  </p>
                </div>

                <div className="rounded-[17px] bg-[#F7F5FC] p-4">
                  <p className="text-[8px] font-black uppercase tracking-[0.16em] text-purple-600">
                    MTD Updated
                  </p>

                  <p className="mt-2 text-2xl font-black text-[#17102F]">
                    {
                      overview
                        .employeesWithStats
                    }
                  </p>
                </div>

                <div className="rounded-[17px] bg-[#17102F] p-4 text-white">
                  <p className="text-[8px] font-black uppercase tracking-[0.16em] text-purple-300">
                    Avg Score
                  </p>

                  <p className="mt-2 text-2xl font-black">
                    {averageScore.toFixed(
                      1
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_16px_45px_rgba(31,21,60,0.06)]">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <Trophy
                    size={14}
                    className="text-purple-600"
                  />

                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-600">
                    Rankings
                  </p>
                </div>

                <h2 className="mt-1.5 text-2xl font-black tracking-[-0.03em] text-[#17102F]">
                  Top Employees
                </h2>
              </div>

              <Link
                href="/leaderboard"
                className="inline-flex items-center gap-1.5 rounded-xl bg-purple-50 px-3 py-2 text-[10px] font-black text-purple-700"
              >
                View All
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="p-3.5 sm:p-4">
              {topEmployees.length >
              0 ? (
                <div className="space-y-2">
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

                      return (
                        <div
                          key={
                            employee.id
                          }
                          className={`flex items-center gap-3 rounded-[16px] p-3 ${
                            index === 0
                              ? "border border-purple-200 bg-gradient-to-r from-purple-50 to-fuchsia-50"
                              : "bg-[#F8F8FC]"
                          }`}
                        >
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] font-black ${
                              index === 0
                                ? "bg-[#17102F] text-white"
                                : "bg-white text-purple-700 shadow-sm"
                            }`}
                          >
                            {index ===
                            0 ? (
                              <Crown size={16} />
                            ) : (
                              index + 1
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-black text-[#17102F]">
                              {employee.full_name ||
                                "Team Member"}
                            </p>

                            <p className="mt-0.5 truncate text-[10px] font-bold text-white">
                              {
                                employee.store_name
                              }
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-base font-black text-[#17102F]">
                              {score.toFixed(
                                1
                              )}
                              %
                            </p>

                            <p className="text-[7px] font-black uppercase tracking-[0.15em] text-white">
                              Score
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="flex min-h-[180px] flex-col items-center justify-center rounded-[18px] border border-dashed border-slate-200 bg-slate-50 px-5 text-center">
                  <Trophy
                    size={24}
                    className="text-slate-300"
                  />

                  <p className="mt-3 font-black text-[#17102F]">
                    Rankings coming soon
                  </p>

                  <p className="mt-1 text-xs text-white">
                    Rankings will appear when employee goals and performance are available.
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
