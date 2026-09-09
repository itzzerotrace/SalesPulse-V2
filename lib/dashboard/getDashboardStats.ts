import { createClient } from "@/lib/supabase/server";
import { getUserContext } from "@/lib/auth/userContext";
import { getActiveStore } from "@/lib/stores/activeStore";
import {
  getCaliforniaDate,
  getMonthInfo,
} from "@/lib/progress/date";

function emptyStats() {
  return {
    gp: 0,
    voice: 0,
    mim: 0,
    upgrade: 0,
    hsi: 0,
    bts: 0,
    accessories: 0,
    features: 0,
  };
}

function percent(
  current: number,
  goal: number
) {
  if (!goal || goal <= 0) {
    return 0;
  }

  return Number(
    (
      (current / goal) *
      100
    ).toFixed(1)
  );
}

function buildGoals(
  current: any,
  goal: any
) {
  return {
    gp: {
      current: Number(
        current.gp || 0
      ),
      goal: Number(
        goal?.gp_goal || 0
      ),
      percent: percent(
        Number(
          current.gp || 0
        ),
        Number(
          goal?.gp_goal || 0
        )
      ),
    },

    voice: {
      current: Number(
        current.voice || 0
      ),
      goal: Number(
        goal?.voice_goal || 0
      ),
      percent: percent(
        Number(
          current.voice || 0
        ),
        Number(
          goal?.voice_goal || 0
        )
      ),
    },

    mim: {
      current: Number(
        current.mim || 0
      ),
      goal: Number(
        goal?.mim_goal || 0
      ),
      percent: percent(
        Number(
          current.mim || 0
        ),
        Number(
          goal?.mim_goal || 0
        )
      ),
    },

    upgrade: {
      current: Number(
        current.upgrade || 0
      ),
      goal: Number(
        goal?.upgrade_goal || 0
      ),
      percent: percent(
        Number(
          current.upgrade || 0
        ),
        Number(
          goal?.upgrade_goal || 0
        )
      ),
    },

    hsi: {
      current: Number(
        current.hsi || 0
      ),
      goal: Number(
        goal?.hsi_goal || 0
      ),
      percent: percent(
        Number(
          current.hsi || 0
        ),
        Number(
          goal?.hsi_goal || 0
        )
      ),
    },

    bts: {
      current: Number(
        current.bts || 0
      ),
      goal: Number(
        goal?.bts_goal || 0
      ),
      percent: percent(
        Number(
          current.bts || 0
        ),
        Number(
          goal?.bts_goal || 0
        )
      ),
    },

    accessories: {
      current: Number(
        current.accessories || 0
      ),
      goal: Number(
        goal?.accessory_goal || 0
      ),
      percent: percent(
        Number(
          current.accessories || 0
        ),
        Number(
          goal?.accessory_goal || 0
        )
      ),
    },

    features: {
      current: Number(
        current.features || 0
      ),
      goal: Number(
        goal?.features_goal || 0
      ),
      percent: percent(
        Number(
          current.features || 0
        ),
        Number(
          goal?.features_goal || 0
        )
      ),
    },
  };
}

export async function getDashboardStats() {
  const supabase =
    await createClient();

  const context =
    await getUserContext();

  if (
    !context?.user ||
    !context.profile
  ) {
    return null;
  }

  const role =
    context.profile.role;

  const date =
    getCaliforniaDate();

  const {
    monthName,
    year,
    monthStart,
  } = getMonthInfo(date);

  if (role === "manager") {
    const activeStore =
      await getActiveStore();

    const empty =
      emptyStats();

    if (!activeStore?.id) {
      return {
        month: empty,
        today: empty,
        total: empty,
        goals:
          buildGoals(
            empty,
            null
          ),
      };
    }

    const [
      statsResult,
      goalResult,
    ] = await Promise.all([
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
          date
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
    ]);

    if (statsResult.error) {
      console.error(
        "STORE DASHBOARD STATS ERROR:",
        statsResult.error
      );
    }

    if (goalResult.error) {
      console.error(
        "STORE DASHBOARD GOAL ERROR:",
        goalResult.error
      );
    }

    const snapshot = {
      ...empty,
      ...(statsResult.data || {}),
    };

    return {
      month: snapshot,
      today: snapshot,
      total: snapshot,
      goals:
        buildGoals(
          snapshot,
          goalResult.data
        ),
    };
  }

  if (role === "employee") {
    const [
      statsResult,
      goalResult,
    ] = await Promise.all([
      supabase
        .from(
          "employee_daily_stats"
        )
        .select("*")
        .eq(
          "employee_id",
          context.user.id
        )
        .gte(
          "stat_date",
          monthStart
        )
        .lte(
          "stat_date",
          date
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
          "employee_goals"
        )
        .select("*")
        .eq(
          "employee_id",
          context.user.id
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
    ]);

    if (statsResult.error) {
      console.error(
        "EMPLOYEE DASHBOARD STATS ERROR:",
        statsResult.error
      );
    }

    if (goalResult.error) {
      console.error(
        "EMPLOYEE DASHBOARD GOAL ERROR:",
        goalResult.error
      );
    }

    const snapshot = {
      ...emptyStats(),
      ...(statsResult.data || {}),
    };

    return {
      month: snapshot,
      today: snapshot,
      total: snapshot,
      goals:
        buildGoals(
          snapshot,
          goalResult.data
        ),
    };
  }

  const empty =
    emptyStats();

  return {
    month: empty,
    today: empty,
    total: empty,
    goals:
      buildGoals(
        empty,
        null
      ),
  };
}
