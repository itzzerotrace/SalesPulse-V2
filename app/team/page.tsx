import DashboardShell from "@/components/layout/DashboardShell";
import TeamHeader from "@/components/team/TeamHeader";
import TeamMemberCard from "@/components/team/TeamMemberCard";

import { getUserContext } from "@/lib/auth/userContext";
import { createClient } from "@/lib/supabase/server";

export default async function TeamPage() {
  const supabase = await createClient();
  const context = await getUserContext();

  const storeId = context?.profile?.store?.id;

  let employees: any[] = [];

  if (storeId) {
    const { data } = await supabase
      .from("profiles")
      .select(`
        id,
        full_name,
        role
      `)
      .eq("store_id", storeId)
      .eq("status", "approved");

    employees = data || [];
  }

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("en-US", {
    month: "long",
  });
  const currentYear = currentDate.getFullYear();

  const employeesWithGoals = await Promise.all(
    employees.map(async (employee) => {
      const { data: goal } = await supabase
        .from("employee_goals")
        .select("*")
        .eq("employee_id", employee.id)
        .eq("month", currentMonth)
        .eq("year", currentYear)
        .maybeSingle();

      return {
        ...employee,
        goals: goal,
      };
    })
  );

  return (
    <DashboardShell>
      <div className="space-y-6 sm:space-y-8">
        <TeamHeader />

        <section className="rounded-2xl bg-purple-600 p-5 text-white sm:rounded-3xl sm:p-8">
          <h2 className="break-words text-2xl font-black sm:text-3xl">
            {context?.profile?.store?.name || "Store"}
          </h2>

          <p className="mt-1.5 text-sm text-white/80 sm:mt-2 sm:text-base">
            {employees.length} Employees
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {employeesWithGoals.map((employee) => (
            <TeamMemberCard
              key={employee.id}
              id={employee.id}
              name={employee.full_name}
              role={employee.role}
              viewerRole={context?.profile?.role}
              goals={employee.goals}
            />
          ))}

          {employeesWithGoals.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 sm:rounded-3xl sm:p-8">
              <p className="font-semibold">No employees found.</p>
            </div>
          )}
        </section>
      </div>
    </DashboardShell>
  );
}
