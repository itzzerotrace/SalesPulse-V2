import Link from "next/link";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { createClient } from "@/lib/supabase/server";
import { getUserContext } from "@/lib/auth/userContext";
import { getActiveStore } from "@/lib/stores/activeStore";
import { getMonthInfo } from "@/lib/progress/date";

import {
  getRegionalTeamData,
} from "@/lib/services/regionalTeam";

function EmployeeCard({
  employee,
  showStore = false,
}: {
  employee: any;
  showStore?: boolean;
}) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-lg font-black text-slate-900">
            {employee.full_name ||
              "Team Member"}
          </p>

          {showStore &&
            employee.store_name && (
              <p className="mt-1 text-sm font-bold text-purple-600">
                {employee.store_name}
              </p>
            )}
        </div>

        {typeof employee.score !==
          "undefined" && (
          <div className="shrink-0 rounded-xl bg-white px-3 py-2 text-sm font-black text-slate-900 shadow-sm">
            {Number(
              employee.score || 0
            ).toFixed(1)}
            %
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
        <span className="rounded-full bg-white px-3 py-1.5 text-slate-600">
          {employee.goals
            ? "Goals Set"
            : "No Goals"}
        </span>

        {typeof employee.stats !==
          "undefined" && (
          <span className="rounded-full bg-white px-3 py-1.5 text-slate-600">
            {employee.stats
              ? "MTD Updated"
              : "No MTD"}
          </span>
        )}

        {employee.employeeType ===
          "tracked" && (
          <span className="rounded-full bg-purple-100 px-3 py-1.5 text-purple-700">
            Tracked Employee
          </span>
        )}
      </div>
    </>
  );

  const className =
    "rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-purple-300 hover:bg-purple-50";

  /*
   * Tracked employees do not have an auth/profile
   * record, so /goals/[id] does not apply to them.
   */
  if (
    employee.employeeType ===
    "tracked"
  ) {
    return (
      <div className={className}>
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/goals/${employee.id}`}
      className={className}
    >
      {content}
    </Link>
  );
}

export default async function TeamPage() {
  const supabase =
    await createClient();

  const context =
    await getUserContext();

  const role =
    context?.profile?.role;

  /*
   * ======================================================
   * REGIONAL MANAGER
   * ======================================================
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
                Employees from all assigned stores.
              </p>
            </div>

            {data.employees.length >
            0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {data.employees.map(
                  (
                    employee: any
                  ) => (
                    <EmployeeCard
                      key={`${employee.employeeType}-${employee.id}`}
                      employee={
                        employee
                      }
                      showStore
                    />
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
   * ======================================================
   * NORMAL STORE MANAGER
   * ======================================================
   */

  const activeStore =
    await getActiveStore();

  const storeId =
    activeStore?.id;

  const monthInfo =
    getMonthInfo();

  let profileEmployees: any[] =
    [];

  let trackedEmployees: any[] =
    [];

  if (storeId) {
    const [
      profileResult,
      trackedResult,
    ] = await Promise.all([
      supabase
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
        ),

      supabase
        .from(
          "tracked_employees"
        )
        .select(
          `
          id,
          full_name,
          designation,
          status,
          store_id
          `
        )
        .eq(
          "store_id",
          storeId
        )
        .eq(
          "status",
          "active"
        )
        .eq(
          "designation",
          "ME"
        )
        .order(
          "full_name"
        ),
    ]);

    if (profileResult.error) {
      console.error(
        "TEAM PROFILE EMPLOYEE ERROR:",
        profileResult.error
      );
    }

    if (trackedResult.error) {
      console.error(
        "TEAM TRACKED EMPLOYEE ERROR:",
        trackedResult.error
      );
    }

    profileEmployees =
      profileResult.data || [];

    trackedEmployees =
      trackedResult.data || [];
  }

  /*
   * ======================================================
   * LOAD GOALS FOR BOTH TYPES
   * ======================================================
   */

  const profileIds =
    profileEmployees.map(
      (employee: any) =>
        employee.id
    );

  const trackedIds =
    trackedEmployees.map(
      (employee: any) =>
        employee.id
    );

  let profileGoals: any[] =
    [];

  let trackedGoals: any[] =
    [];

  const goalRequests: Promise<any>[] =
    [];

  if (profileIds.length > 0) {
    goalRequests.push(
      Promise.resolve(
        supabase
          .from(
            "employee_goals"
          )
          .select("*")
          .in(
            "employee_id",
            profileIds
          )
          .eq(
            "month",
            monthInfo.monthName
          )
          .eq(
            "year",
            monthInfo.year
          )
      )
    );
  }

  if (trackedIds.length > 0) {
    goalRequests.push(
      Promise.resolve(
        supabase
          .from(
            "tracked_employee_goals"
          )
          .select("*")
          .in(
            "employee_id",
            trackedIds
          )
          .eq(
            "month",
            monthInfo.monthName
          )
          .eq(
            "year",
            monthInfo.year
          )
      )
    );
  }

  if (goalRequests.length > 0) {
    const results =
      await Promise.all(
        goalRequests
      );

    let resultIndex = 0;

    if (profileIds.length > 0) {
      const result =
        results[resultIndex++];

      if (result.error) {
        console.error(
          "TEAM PROFILE GOALS ERROR:",
          result.error
        );
      }

      profileGoals =
        result.data || [];
    }

    if (trackedIds.length > 0) {
      const result =
        results[resultIndex++];

      if (result.error) {
        console.error(
          "TEAM TRACKED GOALS ERROR:",
          result.error
        );
      }

      trackedGoals =
        result.data || [];
    }
  }

  const profileGoalMap =
    new Map<string, any>();

  for (
    const goal
    of profileGoals
  ) {
    profileGoalMap.set(
      goal.employee_id,
      goal
    );
  }

  const trackedGoalMap =
    new Map<string, any>();

  for (
    const goal
    of trackedGoals
  ) {
    trackedGoalMap.set(
      goal.employee_id,
      goal
    );
  }

  /*
   * ======================================================
   * MERGE BOTH TYPES
   * ======================================================
   */

  const employeesWithGoals = [
    ...profileEmployees.map(
      (employee: any) => ({
        ...employee,

        employeeType:
          "profile" as const,

        goals:
          profileGoalMap.get(
            employee.id
          ) || null,
      })
    ),

    ...trackedEmployees.map(
      (employee: any) => ({
        ...employee,

        role:
          "employee",

        employeeType:
          "tracked" as const,

        goals:
          trackedGoalMap.get(
            employee.id
          ) || null,
      })
    ),
  ].sort(
    (a: any, b: any) =>
      String(
        a.full_name || ""
      ).localeCompare(
        String(
          b.full_name || ""
        )
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
                  <EmployeeCard
                    key={`${employee.employeeType}-${employee.id}`}
                    employee={
                      employee
                    }
                  />
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
