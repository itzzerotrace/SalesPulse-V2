import { createClient } from "@/lib/supabase/server";
import { getActiveStore } from "@/lib/stores/activeStore";
import {
  getCaliforniaDate,
  getMonthInfo,
} from "@/lib/progress/date";

function percent(
  current: number,
  goal: number
) {
  if (!goal) {
    return 0;
  }

  return Number(
    (
      (current / goal) *
      100
    ).toFixed(1)
  );
}

export async function getTeamGoalProgress() {
  const supabase =
    await createClient();

  const activeStore =
    await getActiveStore();

  if (!activeStore?.id) {
    return [];
  }

  const date =
    getCaliforniaDate();

  const {
    monthName,
    year,
    monthStart,
  } = getMonthInfo(date);

  const {
    data: employees,
    error: employeeError,
  } = await supabase
    .from("profiles")
    .select(
      "id,full_name"
    )
    .eq(
      "store_id",
      activeStore.id
    )
    .eq(
      "status",
      "approved"
    )
    .order("full_name");

  if (employeeError) {
    throw employeeError;
  }

  const results = [];

  for (
    const employee
    of employees || []
  ) {
    const [
      goalResult,
      statsResult,
    ] = await Promise.all([
      supabase
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
          monthName
        )
        .eq(
          "year",
          year
        )
        .maybeSingle(),

      supabase
        .from(
          "employee_daily_stats"
        )
        .select("*")
        .eq(
          "employee_id",
          employee.id
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
    ]);

    const goal =
      goalResult.data;

    const stats =
      statsResult.data || {};

    results.push({
      employee,

      gp:
        Number(
          stats.gp || 0
        ),

      goals: {
        gp: percent(
          Number(
            stats.gp || 0
          ),
          Number(
            goal?.gp_goal || 0
          )
        ),

        voice: percent(
          Number(
            stats.voice || 0
          ),
          Number(
            goal?.voice_goal || 0
          )
        ),

        mim: percent(
          Number(
            stats.mim || 0
          ),
          Number(
            goal?.mim_goal || 0
          )
        ),

        upgrade: percent(
          Number(
            stats.upgrade || 0
          ),
          Number(
            goal?.upgrade_goal || 0
          )
        ),

        hsi: percent(
          Number(
            stats.hsi || 0
          ),
          Number(
            goal?.hsi_goal || 0
          )
        ),

        bts: percent(
          Number(
            stats.bts || 0
          ),
          Number(
            goal?.bts_goal || 0
          )
        ),

        accessories: percent(
          Number(
            stats.accessories || 0
          ),
          Number(
            goal?.accessory_goal ||
              0
          )
        ),

        features: percent(
          Number(
            stats.features || 0
          ),
          Number(
            goal?.features_goal ||
              0
          )
        ),
      },
    });
  }

  return results;
}
