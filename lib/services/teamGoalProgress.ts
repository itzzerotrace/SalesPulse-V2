import { createClient } from "@/lib/supabase/server";
import { getActiveStore } from "@/lib/stores/activeStore";
import {
  getCaliforniaDate,
  getMonthInfo,
} from "@/lib/progress/date";

function percent(current: number, goal: number) {
  if (!goal || goal <= 0) {
    return 0;
  }

  return Number(((current / goal) * 100).toFixed(1));
}

export async function getTeamGoalProgress() {
  const supabase = await createClient();
  const activeStore = await getActiveStore();

  if (!activeStore?.id) {
    console.error("MANAGER TEAM: NO ACTIVE STORE");
    return [];
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
      full_name,
      designation,
      status,
      store_id
    `)
    .in("store_id", storeIds)
    .eq("status", "active")
    .eq("designation", "ME")
    .order("full_name");

  if (trackedError) {
    console.error(
      "MANAGER TEAM TRACKED ERROR:",
      trackedError
    );
    return [];
  }

  console.log(
    "MANAGER TEAM ACTIVE STORE:",
    activeStore.name,
    activeStore.id
  );

  console.log(
    "MANAGER TEAM TRACKED EMPLOYEES:",
    tracked?.length || 0
  );

  const employees = tracked || [];

  if (employees.length === 0) {
    return [];
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
      .select("*")
      .in("employee_id", trackedIds)
      .eq("month", month.monthName)
      .eq("year", month.year),

    supabase
      .from("tracked_employee_daily_stats")
      .select("*")
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
      "MANAGER TEAM GOALS ERROR:",
      goalsResult.error
    );
  }

  if (statsResult.error) {
    console.error(
      "MANAGER TEAM STATS ERROR:",
      statsResult.error
    );
  }

  console.log(
    "MANAGER TEAM GOALS:",
    goalsResult.data?.length || 0
  );

  console.log(
    "MANAGER TEAM STATS:",
    statsResult.data?.length || 0
  );

  const goalMap = new Map<string, any>();

  for (const goal of goalsResult.data || []) {
    goalMap.set(goal.employee_id, goal);
  }

  const statsMap = new Map<string, any>();

  /*
   * Stats are ordered newest first.
   * Only keep the newest MTD snapshot
   * for each employee.
   */
  for (const stat of statsResult.data || []) {
    if (!statsMap.has(stat.employee_id)) {
      statsMap.set(
        stat.employee_id,
        stat
      );
    }
  }

  return employees.map((employee: any) => {
    const goal =
      goalMap.get(employee.id) || {};

    const stats =
      statsMap.get(employee.id) || {};

    return {
      employee: {
        id: employee.id,
        full_name: employee.full_name,
        store_id: employee.store_id,
      },

      gp: Number(stats.gp || 0),

      goals: {
        gp: percent(
          Number(stats.gp || 0),
          Number(goal.gp_goal || 0)
        ),

        voice: percent(
          Number(stats.voice || 0),
          Number(goal.voice_goal || 0)
        ),

        mim: percent(
          Number(stats.mim || 0),
          Number(goal.mim_goal || 0)
        ),

        upgrade: percent(
          Number(stats.upgrade || 0),
          Number(goal.upgrade_goal || 0)
        ),

        hsi: percent(
          Number(stats.hsi || 0),
          Number(goal.hsi_goal || 0)
        ),

        bts: percent(
          Number(stats.bts || 0),
          Number(goal.bts_goal || 0)
        ),

        accessories: percent(
          Number(stats.accessories || 0),
          Number(goal.accessory_goal || 0)
        ),

        features: percent(
          Number(stats.features || 0),
          Number(goal.features_goal || 0)
        ),
      },
    };
  });
}
