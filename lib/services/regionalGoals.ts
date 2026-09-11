import { createClient } from "@/lib/supabase/server";
import { getUserContext } from "@/lib/auth/userContext";

import {
  getCaliforniaDate,
  getMonthInfo,
} from "@/lib/progress/date";

type StoreGoalRow = {
  gp_goal?: number | string | null;
  voice_goal?: number | string | null;
  mim_goal?: number | string | null;
  upgrade_goal?: number | string | null;
  hsi_goal?: number | string | null;
  bts_goal?: number | string | null;
  accessory_goal?: number | string | null;
  features_goal?: number | string | null;
};

type StoreStatsRow = {
  stat_date?: string | null;
  gp?: number | string | null;
  voice?: number | string | null;
  mim?: number | string | null;
  upgrade?: number | string | null;
  hsi?: number | string | null;
  bts?: number | string | null;
  accessories?: number | string | null;
  features?: number | string | null;
};

function numberValue(value: unknown) {
  const parsed = Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : 0;
}

function metric(
  current: unknown,
  goal: unknown
) {
  const currentValue =
    numberValue(current);

  const goalValue =
    numberValue(goal);

  const percent =
    goalValue > 0
      ? Number(
          (
            (currentValue /
              goalValue) *
            100
          ).toFixed(1)
        )
      : 0;

  return {
    current: currentValue,
    goal: goalValue,
    percent,
  };
}

export async function getRegionalGoalProgress() {
  const supabase =
    await createClient();

  const context =
    await getUserContext();

  if (
    !context?.user ||
    !context?.profile
  ) {
    return [];
  }

  const today =
    getCaliforniaDate();

  const {
    monthName,
    year,
    monthStart,
  } = getMonthInfo(today);

  /*
   * First use manager_stores.
   * Regional managers can be assigned
   * directly to stores even when the
   * stores do not have region_id set.
   */
  const {
    data: assignments,
    error: assignmentError,
  } = await supabase
    .from("manager_stores")
    .select("store_id")
    .eq(
      "manager_id",
      context.user.id
    );

  if (assignmentError) {
    console.error(
      "REGIONAL STORE ASSIGNMENT ERROR:",
      assignmentError
    );
  }

  let storeIds: string[] =
    Array.from(
      new Set(
        (assignments || [])
          .map(
            (row: any) =>
              row.store_id
          )
          .filter(
            (
              id
            ): id is string =>
              Boolean(id)
          )
      )
    );

  /*
   * Fallback to region_id if there
   * are no manager_stores assignments.
   */
  if (
    storeIds.length === 0 &&
    context.profile.region_id
  ) {
    const {
      data: regionStores,
      error: regionError,
    } = await supabase
      .from("stores")
      .select("id")
      .eq(
        "region_id",
        context.profile.region_id
      );

    if (regionError) {
      console.error(
        "REGIONAL STORE LOOKUP ERROR:",
        regionError
      );
    }

    storeIds = (
      regionStores || []
    )
      .map(
        (store: any) =>
          store.id
      )
      .filter(
        (
          id
        ): id is string =>
          Boolean(id)
      );
  }

  if (
    storeIds.length === 0
  ) {
    return [];
  }

  const {
    data: stores,
    error: storesError,
  } = await supabase
    .from("stores")
    .select("id,name")
    .in(
      "id",
      storeIds
    )
    .order("name");

  if (storesError) {
    console.error(
      "REGIONAL STORES ERROR:",
      storesError
    );

    return [];
  }

  const results: any[] = [];

  for (
    const store
    of stores || []
  ) {
    const [
      goalResult,
      statsResult,
    ] = await Promise.all([
      supabase
        .from("store_goals")
        .select(
          `
          gp_goal,
          voice_goal,
          mim_goal,
          upgrade_goal,
          hsi_goal,
          bts_goal,
          accessory_goal,
          features_goal
          `
        )
        .eq(
          "store_id",
          store.id
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
        .select(
          `
          stat_date,
          gp,
          voice,
          mim,
          upgrade,
          hsi,
          bts,
          accessories,
          features
          `
        )
        .eq(
          "store_id",
          store.id
        )
        .gte(
          "stat_date",
          monthStart
        )
        .lte(
          "stat_date",
          today
        )
        .order(
          "stat_date",
          {
            ascending: false,
          }
        )
        .limit(1)
        .maybeSingle(),
    ]);

    if (goalResult.error) {
      console.error(
        `REGIONAL GOAL ERROR - ${store.name}:`,
        goalResult.error
      );
    }

    if (statsResult.error) {
      console.error(
        `REGIONAL STATS ERROR - ${store.name}:`,
        statsResult.error
      );
    }

    const goal =
      (goalResult.data ||
        {}) as StoreGoalRow;

    const stats =
      (statsResult.data ||
        {}) as StoreStatsRow;

    results.push({
      id: store.id,
      storeId: store.id,

      store:
        store.name,

      name:
        store.name,

      gp: metric(
        stats.gp,
        goal.gp_goal
      ),

      voice: metric(
        stats.voice,
        goal.voice_goal
      ),

      mim: metric(
        stats.mim,
        goal.mim_goal
      ),

      upgrade: metric(
        stats.upgrade,
        goal.upgrade_goal
      ),

      hsi: metric(
        stats.hsi,
        goal.hsi_goal
      ),

      bts: metric(
        stats.bts,
        goal.bts_goal
      ),

      accessories: metric(
        stats.accessories,
        goal.accessory_goal
      ),

      features: metric(
        stats.features,
        goal.features_goal
      ),

      statDate:
        stats.stat_date ||
        null,
    });
  }

  return results;
}
