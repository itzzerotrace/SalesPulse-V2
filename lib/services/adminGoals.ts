import { createClient } from "@/lib/supabase/server";
import { getMonthInfo } from "@/lib/progress/date";

function percent(current: number, goal: number) {
  if (!goal || goal <= 0) {
    return 0;
  }

  return Number(
    ((current / goal) * 100).toFixed(1)
  );
}

export async function getAdminGoalAnalytics() {
  const supabase = await createClient();
  const monthInfo = getMonthInfo();

  const {
    data: regions,
    error: regionError,
  } = await supabase
    .from("regions")
    .select("id,name")
    .order("name");

  if (regionError) {
    console.error(
      "ADMIN REGIONS ERROR:",
      regionError
    );
    return [];
  }

  const results = [];

  for (const region of regions || []) {
    const {
      data: stores,
      error: storeError,
    } = await supabase
      .from("stores")
      .select("id")
      .eq("region_id", region.id);

    if (storeError) {
      console.error(
        "ADMIN REGION STORES ERROR:",
        storeError
      );
      continue;
    }

    const storeIds = (
      stores || []
    ).map(
      (store: any) => store.id
    );

    if (storeIds.length === 0) {
      results.push({
        region: region.name,
        gp: 0,
      });

      continue;
    }

    const {
      data: goals,
      error: goalError,
    } = await supabase
      .from("store_goals")
      .select(
        "store_id,gp_goal"
      )
      .in("store_id", storeIds)
      .eq("month", monthInfo.monthName)
      .eq("year", monthInfo.year);

    if (goalError) {
      console.error(
        "ADMIN STORE GOALS ERROR:",
        goalError
      );
    }

    const {
      data: snapshots,
      error: snapshotError,
    } = await supabase
      .from("store_daily_stats")
      .select(
        "store_id,stat_date,gp"
      )
      .in("store_id", storeIds)
      .gte(
        "stat_date",
        monthInfo.monthStart
      )
      .order("stat_date", {
        ascending: false,
      });

    if (snapshotError) {
      console.error(
        "ADMIN SNAPSHOTS ERROR:",
        snapshotError
      );
    }

    const latestByStore =
      new Map<string, any>();

    for (
      const snapshot of snapshots || []
    ) {
      if (
        !latestByStore.has(
          snapshot.store_id
        )
      ) {
        latestByStore.set(
          snapshot.store_id,
          snapshot
        );
      }
    }

    let regionCurrent = 0;
    let regionGoal = 0;

    for (const goal of goals || []) {
      regionGoal += Number(
        goal.gp_goal || 0
      );
    }

    for (
      const snapshot of latestByStore.values()
    ) {
      regionCurrent += Number(
        snapshot.gp || 0
      );
    }

    results.push({
      region: region.name,
      gp: percent(
        regionCurrent,
        regionGoal
      ),
    });
  }

  return results;
}
