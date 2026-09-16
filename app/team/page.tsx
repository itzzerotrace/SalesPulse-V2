import Link from "next/link";

import DashboardLayout from "@/components/layout/DashboardLayout";

import { createClient } from "@/lib/supabase/server";
import { getActiveStore } from "@/lib/stores/activeStore";
import { getMonthInfo } from "@/lib/progress/date";

function EmployeeCard({
  employee,
}: {
  employee: any;
}) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-lg font-black text-slate-900">
            {employee.full_name ||
              "Team Member"}
          </p>
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
   * Tracked employees do not have
   * profile/auth accounts, so the
   * existing /goals/[id] route does
   * not apply to them.
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

  /*
   * Team is ALWAYS store-specific.
   *
   * This applies to managers and
   * regional managers.
   *
   * Regional managers use the
   * Viewing Store selector to choose
   * which store's team is displayed.
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

  /*
   * ======================================================
   * LOAD EMPLOYEES FOR SELECTED STORE
   * ======================================================
   */

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
   * LOAD GOALS FOR BOTH EMPLOYEE TYPES
   * ======================================================
   */

  const profileIds =
    profileEmployees
      .map(
        (employee: any) =>
          employee.id
      )
      .filter(Boolean);

  const trackedIds =
    trackedEmployees
      .map(
        (employee: any) =>
          employee.id
      )
      .filter(Boolean);

  let profileGoals: any[] =
    [];

  let trackedGoals: any[] =
    [];

  if (
    profileIds.length > 0
  ) {
    const {
      data,
      error,
    } = await supabase
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
      );

    if (error) {
      console.error(
        "TEAM PROFILE GOALS ERROR:",
        error
      );
    }

    profileGoals =
      data || [];
  }

  if (
    trackedIds.length > 0
  ) {
    const {
      data,
      error,
    } = await supabase
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
      );

    if (error) {
      console.error(
        "TEAM TRACKED GOALS ERROR:",
        error
      );
    }

    trackedGoals =
      data || [];
  }

  /*
   * ======================================================
   * GOAL LOOKUP MAPS
   * ======================================================
   */

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
   * COMBINE BOTH EMPLOYEE TYPES
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

  /*
   * ======================================================
   * PAGE
   * ======================================================
   */

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
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                {activeStore?.name ||
                  "Selected Store"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {
                  employeesWithGoals.length
                }{" "}
                {employeesWithGoals.length ===
                1
                  ? "employee"
                  : "employees"}
              </p>
            </div>
          </div>

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
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
              <p className="font-black text-slate-900">
                No employees found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                No employees are assigned
                to{" "}
                {activeStore?.name ||
                  "this store"}.
              </p>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
