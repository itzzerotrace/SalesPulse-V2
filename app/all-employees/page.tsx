import DashboardLayout from "@/components/layout/DashboardLayout";

import { getUserContext } from "@/lib/auth/userContext";
import { getRegionalTeamData } from "@/lib/services/regionalTeam";

function EmployeeCard({
  employee,
}: {
  employee: any;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-purple-300 hover:bg-purple-50">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-lg font-black text-slate-900">
            {employee.full_name ||
              "Team Member"}
          </p>

          {employee.store_name && (
            <p className="mt-1 text-sm font-bold text-purple-600">
              {employee.store_name}
            </p>
          )}
        </div>

        <div className="shrink-0 rounded-xl bg-white px-3 py-2 text-sm font-black text-slate-900 shadow-sm">
          {Number(
            employee.score || 0
          ).toFixed(1)}
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

        {employee.employeeType ===
          "tracked" && (
          <span className="rounded-full bg-purple-100 px-3 py-1.5 text-purple-700">
            Tracked Employee
          </span>
        )}
      </div>
    </div>
  );
}

export default async function AllEmployeesPage() {
  const context =
    await getUserContext();

  if (
    !context?.profile ||
    context.profile.role !==
      "regional_manager"
  ) {
    return (
      <DashboardLayout>
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <h1 className="text-2xl font-black text-slate-900">
            All Employees
          </h1>

          <p className="mt-2 text-slate-600">
            This page is available to regional management.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const data =
    await getRegionalTeamData();

  /*
   * Group employees by store.
   */
  const storeGroups =
    new Map<string, any[]>();

  for (
    const employee
    of data.employees
  ) {
    const storeName =
      employee.store_name ||
      "Unknown Store";

    const current =
      storeGroups.get(
        storeName
      ) || [];

    current.push(
      employee
    );

    storeGroups.set(
      storeName,
      current
    );
  }

  const groups =
    Array.from(
      storeGroups.entries()
    ).sort(
      ([storeA], [storeB]) =>
        storeA.localeCompare(
          storeB
        )
    );

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-purple-600">
            District Team
          </p>

          <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">
            All Employees
          </h1>

          <p className="mt-2 text-slate-500">
            Employees across all of your assigned stores.
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

        {groups.length > 0 ? (
          <div className="space-y-6">
            {groups.map(
              ([
                storeName,
                employees,
              ]) => (
                <section
                  key={
                    storeName
                  }
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
                >
                  <div className="mb-5 flex items-end justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900">
                        {
                          storeName
                        }
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {
                          employees.length
                        }{" "}
                        {employees.length ===
                        1
                          ? "employee"
                          : "employees"}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {employees.map(
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
                </section>
              )
            )}
          </div>
        ) : (
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
              <p className="font-black text-slate-900">
                No employees found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                No employees were found across your assigned stores.
              </p>
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
