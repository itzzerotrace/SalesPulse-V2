import Link from "next/link";

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

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-purple-600">
            Regional Dashboard
          </p>

          <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">
            Regional Overview
          </h1>

          <p className="mt-2 text-slate-500">
            Track store and employee performance across your district.
          </p>
        </div>

        <section>
          <RegionalGoalProgress />
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-purple-600">
                Team Overview
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-900">
                District Team
              </h2>
            </div>

            <Link
              href="/team"
              className="font-black text-purple-600 hover:text-purple-700"
            >
              View Full Team →
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase text-slate-500">
                Stores
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {
                  team.overview
                    .stores
                }
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase text-slate-500">
                Employees
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {
                  team.overview
                    .employees
                }
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase text-slate-500">
                Goals Set
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {
                  team.overview
                    .employeesWithGoals
                }
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase text-slate-500">
                MTD Updated
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {
                  team.overview
                    .employeesWithStats
                }
              </p>
            </div>

            <div className="col-span-2 rounded-2xl bg-slate-50 p-4 sm:col-span-1">
              <p className="text-xs font-bold uppercase text-slate-500">
                Avg Score
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {
                  team.overview
                    .averageScore
                }
                %
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-purple-600">
                Rankings
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-900">
                Top Employees
              </h2>
            </div>

            <Link
              href="/leaderboard"
              className="font-black text-purple-600 hover:text-purple-700"
            >
              View All →
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {topEmployees.length >
            0 ? (
              topEmployees.map(
                (
                  employee: any,
                  index: number
                ) => (
                  <div
                    key={
                      employee.id
                    }
                    className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 font-black text-purple-700">
                      {
                        index + 1
                      }
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-black text-slate-900">
                        {employee.full_name ||
                          "Team Member"}
                      </p>

                      <p className="text-sm font-bold text-slate-500">
                        {
                          employee.store_name
                        }
                      </p>
                    </div>

                    <p className="text-lg font-black text-slate-900">
                      {Number(
                        employee.score ||
                          0
                      ).toFixed(
                        1
                      )}
                      %
                    </p>
                  </div>
                )
              )
            ) : (
              <p className="text-sm text-slate-500">
                No employee rankings available yet.
              </p>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
