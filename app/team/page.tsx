import {
  Clock3,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import TeamMemberCard from "@/components/team/TeamMemberCard";
import AddEmployeeForm from "@/components/team/AddEmployeeForm";

import { getUserContext } from "@/lib/auth/userContext";
import { createClient } from "@/lib/supabase/server";
import { getActiveStore } from "@/lib/stores/activeStore";
import {
  getCaliforniaDate,
  getMonthInfo,
} from "@/lib/progress/date";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
    viewerRole ===
      "manager" ||
    viewerRole ===
      "admin" ||
    viewerRole ===
      "regional_manager";

  let employees: any[] =
    [];

  let pendingEmployees: any[] =
    [];

  if (storeId) {
    const {
      data:
        employeeData,
      error:
        employeeError,
    } = await supabase
      .from("profiles")
      .select(
        "id,first_name,last_name,role"
      )
      .eq(
        "store_id",
        storeId
      )
      .eq(
        "approved",
        true
      )
      .eq(
        "role",
        "employee"
      )
      .order(
        "first_name"
      );

    if (employeeError) {
      console.error(
        "TEAM EMPLOYEE ERROR:",
        employeeError
      );
    }

    employees =
      employeeData || [];

    if (
      canAddEmployees
    ) {
      const {
        data:
          pendingData,
        error:
          pendingError,
      } = await supabase
        .from(
          "pending_employees"
        )
        .select(
          "id,full_name,email,role,status,created_at,gp_goal,voice_goal,mim_goal,upgrade_goal,hsi_goal,bts_goal,accessory_goal,features_goal"
        )
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

      if (
        pendingError
      ) {
        console.error(
          "PENDING EMPLOYEE ERROR:",
          pendingError
        );
      }

      pendingEmployees =
        pendingData || [];
    }
  }

  const monthInfo =
    getMonthInfo(
      getCaliforniaDate()
    );

  const employeesWithGoals =
    await Promise.all(
      employees.map(
        async (
          employee
        ) => {
          const {
            data: goal,
          } =
            await supabase
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
            registered:
              true,
          };
        }
      )
    );

  const activeCount =
    employeesWithGoals.length;

  const pendingCount =
    pendingEmployees.length;

  const totalEmployees =
    activeCount +
    pendingCount;

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <section className="salespulse-dark-gradient relative overflow-hidden rounded-[30px] px-5 py-6 text-white shadow-[0_24px_70px_rgba(23,16,47,0.18)] sm:px-8 sm:py-8 lg:px-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-pink-500/15 blur-3xl" />

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-pink-300">
                <Sparkles
                  size={13}
                />
                Team Center
              </span>

              <h1 className="mt-5 text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                Build a team that
                <span className="text-pink-400">
                  {" "}
                  performs.
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-white/55 sm:text-base">
                Manage your
                SalesPulse team,
                monthly targets,
                and employee
                registration from
                one place.
              </p>

              <p className="mt-4 text-sm font-black text-purple-200">
                {activeStore?.name ||
                  "Store"}{" "}
                •{" "}
                {
                  monthInfo.monthName
                }{" "}
                {
                  monthInfo.year
                }
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 lg:min-w-[360px]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-3 backdrop-blur sm:p-4">
                <Users
                  size={18}
                  className="text-purple-300"
                />

                <p className="mt-3 text-2xl font-black">
                  {
                    totalEmployees
                  }
                </p>

                <p className="mt-1 text-[8px] font-black uppercase tracking-[0.14em] text-white/40 sm:text-[9px]">
                  Total
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-3 backdrop-blur sm:p-4">
                <UserCheck
                  size={18}
                  className="text-emerald-300"
                />

                <p className="mt-3 text-2xl font-black">
                  {
                    activeCount
                  }
                </p>

                <p className="mt-1 text-[8px] font-black uppercase tracking-[0.14em] text-white/40 sm:text-[9px]">
                  Active
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-3 backdrop-blur sm:p-4">
                <Clock3
                  size={18}
                  className="text-pink-300"
                />

                <p className="mt-3 text-2xl font-black">
                  {
                    pendingCount
                  }
                </p>

                <p className="mt-1 text-[8px] font-black uppercase tracking-[0.14em] text-white/40 sm:text-[9px]">
                  Pending
                </p>
              </div>
            </div>
          </div>
        </section>

        {canAddEmployees && (
          <div className="flex justify-end">
            <AddEmployeeForm />
          </div>
        )}

        <section>
          <div className="mb-5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600">
              Team Roster
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-tight text-[#17102F] sm:text-3xl">
              Store Employees
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {employeesWithGoals.map(
              (employee) => (
                <TeamMemberCard
                  key={`registered-${employee.id}`}
                  id={
                    employee.id
                  }
                  name={
                    [
                      employee.first_name,
                      employee.last_name,
                    ]
                      .filter(Boolean)
                      .join(" ")
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
                  id={
                    employee.id
                  }
                  name={
                    employee.full_name ||
                    "Employee"
                  }
                  role={
                    employee.role
                  }
                  viewerRole={
                    viewerRole
                  }
                  goals={employee}
                  registered={
                    false
                  }
                />
              )
            )}

            {totalEmployees ===
              0 && (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center xl:col-span-2">
                <Users
                  size={32}
                  className="mx-auto text-slate-300"
                />

                <h3 className="mt-3 text-lg font-black text-[#17102F]">
                  No employees
                  yet
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                  {canAddEmployees
                    ? `Add your first employee to ${activeStore?.name || "this store"} to begin building the team.`
                    : "No employees are currently assigned to this store."}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
