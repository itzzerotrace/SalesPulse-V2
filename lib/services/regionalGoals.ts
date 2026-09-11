import { createClient } from "@/lib/supabase/server";
import { getUserContext } from "@/lib/auth/userContext";
import { getMonthInfo } from "@/lib/progress/date";

function percent(current: number, goal: number) {
  if (!goal || goal <= 0) {
    return 0;
  }

  return Number(
    ((current / goal) * 100).toFixed(1)
  );
}

export async function getRegionalGoalProgress() {
  const supabase = await createClient();
  const context = await getUserContext();
  const monthInfo = getMonthInfo();

  if (!context?.user || !context.profile) {
    return [];
  }

  let stores: any[] = [];

  // District Managers / Regional Managers now use
  // explicit manager_stores assignments.
  if (context.profile.role === "regional_manager") {
    const {
      data: assignments,
      error: assignmentError,
    } = await supabase
      .from("manager_stores")
      .select("store_id")
      .eq("manager_id", context.user.id);

    if (assignmentError) {
      console.error(
        "DISTRICT STORE ASSIGNMENT ERROR:",
        assignmentError
      );
      return [];
    }

    const storeIds = (assignments || [])
      .map((assignment: any) => assignment.store_id)
      .filter(Boolean);

    if (storeIds.length === 0) {
      return [];
    }

    const {
      data: assignedStores,
      error: storeError,
    } = await supabase
      .from("stores")
      .select("id,name")
      .in("id", storeIds)
      .order("name");

    if (storeError) {
      console.error(
        "DISTRICT STORES ERROR:",
        storeError
      );
      return [];
    }

    stores = assignedStores || [];
  } else if (context.profile.region_id) {
    const {
      data: regionalStores,
      error: storeError,
    } = await supabase
      .from("stores")
      .select("id,name")
      .eq(
        "region_id",
        context.profile.region_id
      )
      .order("name");

    if (storeError) {
      console.error(
        "REGIONAL STORES ERROR:",
        storeError
      );
      return [];
    }

    stores = regionalStores || [];
  } else {
    return [];
  }

  const results = [];

  for (const store of stores) {
    const {
      data: goal,
      error: goalError,
    } = await supabase
      .from("store_goals")
      .select("*")
      .eq("store_id", store.id)
      .eq("month", monthInfo.monthName)
      .eq("year", monthInfo.year)
      .maybeSingle();

    if (goalError) {
      console.error(
        "DISTRICT STORE GOAL ERROR:",
        goalError
      );
    }

    const {
      data: snapshots,
      error: snapshotError,
    } = await supabase
      .from("store_daily_stats")
      .select("*")
      .eq("store_id", store.id)
      .gte(
        "stat_date",
        monthInfo.monthStart
      )
      .order("stat_date", {
        ascending: false,
      })
      .limit(1);

    if (snapshotError) {
      console.error(
        "DISTRICT SNAPSHOT ERROR:",
        snapshotError
      );
    }

    const stats =
      snapshots?.[0] || {};

    results.push({
      store: store.name,

      goals: {
        gp: Number(goal?.gp_goal || 0),
        voice: Number(goal?.voice_goal || 0),
        mim: Number(goal?.mim_goal || 0),
        upgrade: Number(goal?.upgrade_goal || 0),
        hsi: Number(goal?.hsi_goal || 0),
        bts: Number(goal?.bts_goal || 0),
        accessories: Number(
          goal?.accessory_goal || 0
        ),
        features: Number(
          goal?.features_goal || 0
        ),
      },

      gp: percent(
        Number(stats.gp || 0),
        Number(goal?.gp_goal || 0)
      ),

      voice: percent(
        Number(stats.voice || 0),
        Number(goal?.voice_goal || 0)
      ),

      mim: percent(
        Number(stats.mim || 0),
        Number(goal?.mim_goal || 0)
      ),

      upgrade: percent(
        Number(stats.upgrade || 0),
        Number(goal?.upgrade_goal || 0)
      ),

      hsi: percent(
        Number(stats.hsi || 0),
        Number(goal?.hsi_goal || 0)
      ),

      bts: percent(
        Number(stats.bts || 0),
        Number(goal?.bts_goal || 0)
      ),

      accessories: percent(
        Number(stats.accessories || 0),
        Number(goal?.accessory_goal || 0)
      ),

      features: percent(
        Number(stats.features || 0),
        Number(goal?.features_goal || 0)
      ),
    });
  }

  return results;
}
