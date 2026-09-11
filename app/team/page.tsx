import Link from "next/link";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { createClient } from "@/lib/supabase/server";
import { getUserContext } from "@/lib/auth/userContext";
import { getActiveStore } from "@/lib/stores/activeStore";
import { getMonthInfo } from "@/lib/progress/date";

import {
  getRegionalTeamData,
} from "@/lib/services/regionalTeam";

export default async function TeamPage() {
  const supabase =
    await createClient();

  const context =
    await getUserContext();

  const role =
    context?.profile?.role;

  /*
   * REGIONAL MANAGER
   * Show every employee from every
   * assigned store.
   */
  if (
    role ===
    "regional_manager"
  ) {
    const data =
      await getRegionalTeamData();

    return (
      <DashboardLayout>
        <div className="space-y-6 sm:space-y-8">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-purple-600">
              District Team
            </p>

            <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">
              Team
            </h1>

            <p className="mt-2 text-slate-500">
              All employees across your assigned stores.
            </p>
          </div>

          <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Stores
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {
                  data.overview
                    .stores
                }
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Employees
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {
                  data.overview
                    .employees
                }
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                With Goals
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {
                  data.overview
                    .employeesWithGoals
                }
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                MTD Updated
              </p>

              <p className="mt-2 text-3xl font-black text-slate-900">
                {
                  data.overview
                    .employeesWithStats
                }
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5">
              <h2 className="text-2xl font-black text-slate-900">
                All Employees
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Employees from all stores assigned to Jason.
              </p>
            </div>

            {data.employees.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {data.employees.map(
                  (
                    employee: any
                  ) => (
                    <Link
                      key={
                        employee.id
                      }
                      href={`/goals/${employee.id}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-purple-300 hover:bg-purple-50"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-black text-slate-900">
                            {employee.full_name ||
                              "Team Member"}
                          </p>

                          <p className="mt-1 text-sm font-bold text-purple-600">
                            {
                              employee.store_name
                            }
                          </p>
                        </div>

                        <div className="rounded-xl bg-white px-3 py-2 text-sm font-black text-slate-900 shadow-sm">
                          {Number(
                            employee.score ||
                              0
                          ).toFixed(
                            1
                          )}
                          %
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                        <span className="rounded-full bg-white px-3 py-1.5 text-slate-600">
                          {employee.goals
                            ? "Goals Set"
                            : "No Goals"}
                        </span>

                        <span className="rounded-full bg-white px-3 py-1.5 text-slate-600">
                          {employee.stats
                            ? "MTD Updated"
                            : "No MTD"}
                        </span>
                      </div>
                    </Link>
                  )
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
                <p className="font-black text-slate-900">
                  No employees found
                </p>
              </div>
            )}
          </section>
        </div>
      </DashboardLayout>
    );
  }

  /*
   * NORMAL STORE MANAGER
   * Keep the existing one-store behavior.
   */
  const activeStore =
    await getActiveStore();

  const storeId =
    activeStore?.id;

  let employees: any[] = [];

  if (storeId) {
    const {
      data,
    } = await supabase
      .from("profiles")
      .select(
        `
        id,
        full_name,
        role,
        store_id
        `
      )
      .eq(
        "store_id",
        storeId
      )
      .eq(
        "status",
        "approved"
      )
      .eq(
        "role",
        "employee"
      )
      .order(
        "full_name"
      );

    employees =
      data || [];
  }

  const monthInfo =
    getMonthInfo();

  const employeesWithGoals =
    await Promise.all(
      employees.map(
        async (
          employee
        ) => {
          const {
            data: goal,
          } = await supabase
            .from(
              "employee_goals"
            )
            .select("*")
            .eq(
              "employee_id",
              employee.id
            )
            .eq(
              "month",
              monthInfo.monthName
            )
            .eq(
              "year",
              monthInfo.year
            )
            .maybeSingle();

          return {
            ...employee,
            goals: goal,
          };
        }
      )
    );

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-purple-600">
            Store Team
          </p>

          <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">
            Team
          </h1>

          <p className="mt-2 text-slate-500">
            {activeStore?.name ||
              "Store"}{" "}
            employees.
          </p>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {employeesWithGoals.length >
          0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {employeesWithGoals.map(
                (
                  employee: any
                ) => (
                  <Link
                    key={
                      employee.id
                    }
                    href={`/goals/${employee.id}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-purple-300 hover:bg-purple-50"
                  >
                    <p className="text-lg font-black text-slate-900">
                      {employee.full_name ||
                        "Team Member"}
                    </p>

                    <p className="mt-2 text-sm font-bold text-slate-500">
                      {employee.goals
                        ? "Goals Set"
                        : "No Goals Set"}
                    </p>
                  </Link>
                )
              )}
            </div>
          ) : (
            <p className="text-slate-500">
              No employees found.
            </p>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
