import { createClient } from "@/lib/supabase/server";
import { getActiveStore } from "@/lib/stores/activeStore";
import {
  getCaliforniaDate,
  getMonthInfo,
} from "@/lib/progress/date";

export async function getTeamGoalSummary() {
  const supabase = await createClient();
  const activeStore = await getActiveStore();

  if (!activeStore?.id) {
    return 0;
  }

  const today = getCaliforniaDate();
  const month = getMonthInfo(today);
  const storeIds = [activeStore.id];

  const {
    data: tracked,
    error: trackedError,
  } = await supabase
    .from("tracked_employees")
    .select(`
      id,
      store_id
    `)
    .in("store_id", storeIds)
    .eq("status", "active")
    .eq("designation", "ME");

  if (trackedError) {
    console.error(
      "MANAGER TEAM SUMMARY TRACKED ERROR:",
      trackedError
    );
    return 0;
  }

  const employees = tracked || [];

  if (employees.length === 0) {
    return 0;
  }

  const trackedIds = employees.map(
    (employee: any) => employee.id
  );

  const [
    goalsResult,
    statsResult,
  ] = await Promise.all([
    supabase
      .from("tracked_employee_goals")
      .select("employee_id,gp_goal")
      .in("employee_id", trackedIds)
      .eq("month", month.monthName)
      .eq("year", month.year),

    supabase
      .from("tracked_employee_daily_stats")
      .select(`
        employee_id,
        store_id,
        stat_date,
        gp
      `)
      .in("employee_id", trackedIds)
      .in("store_id", storeIds)
      .gte("stat_date", month.monthStart)
      .lte("stat_date", today)
      .order("stat_date", {
        ascending: false,
      }),
  ]);

  if (goalsResult.error) {
    console.error(
      "MANAGER TEAM SUMMARY GOALS ERROR:",
      goalsResult.error
    );
  }

  if (statsResult.error) {
    console.error(
      "MANAGER TEAM SUMMARY STATS ERROR:",
      statsResult.error
    );
  }

  const goalMap = new Map<string, number>();

  for (const goal of goalsResult.data || []) {
    goalMap.set(
      goal.employee_id,
      Number(goal.gp_goal || 0)
    );
  }

  const statsMap = new Map<string, number>();

  for (const stat of statsResult.data || []) {
    if (!statsMap.has(stat.employee_id)) {
      statsMap.set(
        stat.employee_id,
        Number(stat.gp || 0)
      );
    }
  }

  let totalCurrent = 0;
  let totalGoal = 0;

  for (const employee of employees) {
    totalCurrent +=
      statsMap.get(employee.id) || 0;

    totalGoal +=
      goalMap.get(employee.id) || 0;
  }

  if (totalGoal <= 0) {
    return 0;
  }

  return Number(
    (
      (totalCurrent / totalGoal) *
      100
    ).toFixed(1)
  );
}
