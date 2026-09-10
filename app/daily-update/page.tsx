import DashboardLayout from "@/components/layout/DashboardLayout";
import DailyUpdateForm from "@/components/progress/DailyUpdateForm";

import { createClient } from "@/lib/supabase/server";
import { getUserContext } from "@/lib/auth/userContext";
import { getActiveStore } from "@/lib/stores/activeStore";
import {
  getCaliforniaDate,
  getMonthInfo,
} from "@/lib/progress/date";
import {
  emptyProgressStats,
} from "@/lib/progress/progress";

export default async function DailyUpdatePage() {
  const context =
    await getUserContext();

  if (
    !context?.profile ||
    ![
      "manager",
      "regional_manager",
      "admin",
    ].includes(
      context.profile.role
    )
  ) {
    return (
      <DashboardLayout>
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <h1 className="text-2xl font-black text-slate-900">
            Daily Update
          </h1>

          <p className="mt-2 text-slate-600">
            Daily store updates are currently available to management.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const activeStore =
    await getActiveStore();

  if (!activeStore?.id) {
    return (
      <DashboardLayout>
        <div className="rounded-3xl border border-slate-200 bg-white p-8">
          <h1 className="text-2xl font-black text-slate-900">
            No Store Selected
          </h1>

          <p className="mt-2 text-slate-600">
            Select a store before entering progress.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const supabase =
    await createClient();

  const statDate =
    getCaliforniaDate();

  const {
    monthName,
    year,
    monthStart,
    daysRemaining,
  } = getMonthInfo(
    statDate
  );

  const [
    employeesResult,
    storeGoalResult,
    storeStatsResult,
    employeeStatsResult,
    employeeGoalsResult,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select(
        "id,full_name,role"
      )
      .eq(
        "store_id",
        activeStore.id
      )
      .eq(
        "status",
        "approved"
      )
      .eq(
        "role",
        "employee"
      )
      .order("full_name"),

    supabase
      .from("store_goals")
      .select("*")
      .eq(
        "store_id",
        activeStore.id
      )
      .eq(
        "month",
        monthName
      )
      .eq(
        "year",
        year
      )
      .maybeSingle(),

    supabase
      .from(
        "store_daily_stats"
      )
      .select("*")
      .eq(
        "store_id",
        activeStore.id
      )
      .gte(
        "stat_date",
        monthStart
      )
      .lte(
        "stat_date",
        statDate
      )
      .order(
        "stat_date",
        {
          ascending: false,
        }
      )
      .limit(1)
      .maybeSingle(),

    supabase
      .from(
        "employee_daily_stats"
      )
      .select("*")
      .eq(
        "store_id",
        activeStore.id
      )
      .gte(
        "stat_date",
        monthStart
      )
      .lte(
        "stat_date",
        statDate
      )
      .order(
        "stat_date",
        {
          ascending: false,
        }
      ),

    supabase
      .from(
        "employee_goals"
      )
      .select("*")
      .eq(
        "month",
        monthName
      )
      .eq(
        "year",
        year
      ),
  ]);

  const employees =
    employeesResult.data || [];

  const latestStatsByEmployee =
    new Map<string, any>();

  for (
    const row
    of employeeStatsResult.data ||
    []
  ) {
    if (
      !latestStatsByEmployee.has(
        row.employee_id
      )
    ) {
      latestStatsByEmployee.set(
        row.employee_id,
        row
      );
    }
  }

  const goalsByEmployee =
    new Map<string, any>();

  for (
    const goal
    of employeeGoalsResult.data ||
    []
  ) {
    goalsByEmployee.set(
      goal.employee_id,
      goal
    );
  }

  const employeeData =
    employees.map(
      (employee: any) => ({
        ...employee,
        stats:
          latestStatsByEmployee.get(
            employee.id
          ) ||
          emptyProgressStats(),
        goals:
          goalsByEmployee.get(
            employee.id
          ) || null,
      })
    );

  return (
    <DashboardLayout>
      <DailyUpdateForm
        key={activeStore.id}
        storeName={
          activeStore.name
        }
        statDate={
          statDate
        }
        daysRemaining={
          daysRemaining
        }
        initialStoreStats={
          storeStatsResult.data ||
          emptyProgressStats()
        }
        initialStoreGoals={
          storeGoalResult.data ||
          {}
        }
        employees={
          employeeData
        }
      />
    </DashboardLayout>
  );
}
