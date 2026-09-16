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

  console.log("========================================");
  console.log("DAILY UPDATE DEBUG");
  console.log("USER:", context.user?.id);
  console.log("ROLE:", context.profile?.role);
  console.log("PROFILE STORE ID:", context.profile?.store_id);
  console.log("ACTIVE STORE:", activeStore);
  console.log("========================================");

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

  /*
   * ======================================================
   * LOAD STORE + BOTH EMPLOYEE TYPES
   * ======================================================
   */

  const [
    profileEmployeesResult,
    trackedEmployeesResult,

    storeGoalResult,
    storeStatsResult,

    profileStatsResult,
    profileGoalsResult,

    trackedStatsResult,
    trackedGoalsResult,
  ] = await Promise.all([
    /*
     * LOGIN EMPLOYEES
     */

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

    /*
     * NON-LOGIN / TRACKED EMPLOYEES
     */

    supabase
      .from(
        "tracked_employees"
      )
      .select(
        "id,full_name,designation,status,store_id"
      )
      .eq(
        "store_id",
        activeStore.id
      )
      .eq(
        "status",
        "active"
      )
      .eq(
        "designation",
        "ME"
      )
      .order("full_name"),

    /*
     * STORE GOAL
     */

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

    /*
     * LATEST STORE MTD
     */

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

    /*
     * LOGIN EMPLOYEE MTD
     */

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

    /*
     * LOGIN EMPLOYEE GOALS
     */

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

    /*
     * TRACKED EMPLOYEE MTD
     */

    supabase
      .from(
        "tracked_employee_daily_stats"
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

    /*
     * TRACKED EMPLOYEE GOALS
     */

    supabase
      .from(
        "tracked_employee_goals"
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

  /*
   * ======================================================
   * SURFACE DATABASE ERRORS
   * ======================================================
   */

  const databaseError =
    profileEmployeesResult.error ||
    trackedEmployeesResult.error ||
    storeGoalResult.error ||
    storeStatsResult.error ||
    profileStatsResult.error ||
    profileGoalsResult.error ||
    trackedStatsResult.error ||
    trackedGoalsResult.error;

  if (databaseError) {
    console.error(
      "DAILY UPDATE LOAD ERROR:",
      databaseError
    );

    return (
      <DashboardLayout>
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
          <h1 className="text-2xl font-black text-red-900">
            Unable to Load Daily Update
          </h1>

          <p className="mt-2 text-red-700">
            {databaseError.message}
          </p>
        </div>
      </DashboardLayout>
    );
  }

  /*
   * ======================================================
   * LOGIN EMPLOYEE STATS
   * ======================================================
   */

  const latestProfileStats =
    new Map<string, any>();

  for (
    const row
    of profileStatsResult.data ||
    []
  ) {
    if (
      !latestProfileStats.has(
        row.employee_id
      )
    ) {
      latestProfileStats.set(
        row.employee_id,
        row
      );
    }
  }

  const profileGoals =
    new Map<string, any>();

  for (
    const goal
    of profileGoalsResult.data ||
    []
  ) {
    profileGoals.set(
      goal.employee_id,
      goal
    );
  }

  /*
   * ======================================================
   * TRACKED EMPLOYEE STATS
   * ======================================================
   */

  const latestTrackedStats =
    new Map<string, any>();

  for (
    const row
    of trackedStatsResult.data ||
    []
  ) {
    if (
      !latestTrackedStats.has(
        row.employee_id
      )
    ) {
      latestTrackedStats.set(
        row.employee_id,
        row
      );
    }
  }

  const trackedGoals =
    new Map<string, any>();

  for (
    const goal
    of trackedGoalsResult.data ||
    []
  ) {
    trackedGoals.set(
      goal.employee_id,
      goal
    );
  }

  /*
   * ======================================================
   * NORMAL LOGIN EMPLOYEES
   * ======================================================
   */

  const profileEmployeeData =
    (
      profileEmployeesResult.data ||
      []
    ).map(
      (employee: any) => ({
        id: employee.id,

        full_name:
          employee.full_name,

        role:
          employee.role,

        employeeType:
          "profile" as const,

        stats:
          latestProfileStats.get(
            employee.id
          ) ||
          emptyProgressStats(),

        goals:
          profileGoals.get(
            employee.id
          ) || null,
      })
    );

  /*
   * ======================================================
   * TRACKED / NON-LOGIN EMPLOYEES
   * ======================================================
   */

  const trackedEmployeeData =
    (
      trackedEmployeesResult.data ||
      []
    ).map(
      (employee: any) => ({
        id: employee.id,

        full_name:
          employee.full_name,

        role:
          "employee",

        employeeType:
          "tracked" as const,

        stats:
          latestTrackedStats.get(
            employee.id
          ) ||
          emptyProgressStats(),

        goals:
          trackedGoals.get(
            employee.id
          ) || null,
      })
    );

  /*
   * ======================================================
   * COMBINE + SORT
   * ======================================================
   */

  const employeeData = [
    ...profileEmployeeData,
    ...trackedEmployeeData,
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
