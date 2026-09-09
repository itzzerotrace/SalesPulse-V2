import DashboardLayout from "@/components/layout/DashboardLayout";

import TeamHeader from "@/components/team/TeamHeader";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import AddEmployeeForm from "@/components/team/AddEmployeeForm";

import { getUserContext } from "@/lib/auth/userContext";
import { createClient } from "@/lib/supabase/server";
import { getActiveStore } from "@/lib/stores/activeStore";

export default async function TeamPage() {
  const supabase =
    await createClient();

  const context =
    await getUserContext();

  const activeStore =
    await getActiveStore();

  const storeId =
    activeStore?.id;

  const viewerRole =
    context?.profile?.role;

  const canAddEmployees =
    viewerRole === "manager" ||
    viewerRole === "admin" ||
    viewerRole ===
      "regional_manager";

  let employees: any[] = [];
  let pendingEmployees: any[] =
    [];

  if (storeId) {
    const {
      data: employeeData,
    } = await supabase
      .from("profiles")
      .select(`
        id,
        full_name,
        role
      `)
      .eq(
        "store_id",
        storeId
      )
      .eq(
        "status",
        "approved"
      );

    employees =
      employeeData || [];

    if (canAddEmployees) {
      const {
        data: pendingData,
      } = await supabase
        .from(
          "pending_employees"
        )
        .select(`
          id,
          full_name,
          email,
          role,
          status,
          created_at
        `)
        .eq(
          "store_id",
          storeId
        )
        .eq(
          "status",
          "not_registered"
        )
        .order(
          "created_at",
          {
            ascending: true,
          }
        );

      pendingEmployees =
        pendingData || [];
    }
  }

  const currentDate =
    new Date();

  const currentMonth =
    currentDate.toLocaleString(
      "en-US",
      {
        month: "long",
      }
    );

  const currentYear =
    currentDate.getFullYear();

  const employeesWithGoals =
    await Promise.all(
      employees.map(
        async (employee) => {
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
              currentMonth
            )
            .eq(
              "year",
              currentYear
            )
            .maybeSingle();

          return {
            ...employee,
            goals: goal,
            registered: true,
          };
        }
      )
    );

  const totalEmployees =
    employeesWithGoals.length +
    pendingEmployees.length;

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <TeamHeader />

          {canAddEmployees && (
            <div className="sm:shrink-0">
              <AddEmployeeForm />
            </div>
          )}
        </div>

        <section className="rounded-2xl bg-purple-600 p-5 text-white sm:rounded-3xl sm:p-8">
          <h2 className="break-words text-2xl font-black sm:text-3xl">
            {activeStore?.name ||
              "Store"}
          </h2>

          <p className="mt-1.5 text-sm text-white/80 sm:mt-2 sm:text-base">
            {totalEmployees}{" "}
            {totalEmployees === 1
              ? "Employee"
              : "Employees"}
          </p>

          {pendingEmployees.length >
            0 && (
            <p className="mt-1 text-xs font-semibold text-white/70 sm:text-sm">
              {
                pendingEmployees.length
              }{" "}
              waiting to register
            </p>
          )}
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {employeesWithGoals.map(
            (employee) => (
              <TeamMemberCard
                key={`registered-${employee.id}`}
                id={employee.id}
                name={
                  employee.full_name
                }
                role={
                  employee.role
                }
                viewerRole={
                  viewerRole
                }
                goals={
                  employee.goals
                }
                registered
              />
            )
          )}

          {pendingEmployees.map(
            (employee) => (
              <TeamMemberCard
                key={`pending-${employee.id}`}
                id={employee.id}
                name={
                  employee.full_name
                }
                role={
                  employee.role
                }
                viewerRole={
                  viewerRole
                }
                goals={null}
                registered={false}
              />
            )
          )}

          {totalEmployees === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 sm:rounded-3xl sm:p-8">
              <p className="font-semibold">
                No employees found.
              </p>

              {canAddEmployees && (
                <p className="mt-1 text-sm text-slate-600">
                  Add your first
                  employee to{" "}
                  {activeStore?.name ||
                    "this store"}{" "}
                  using the button
                  above.
                </p>
              )}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
