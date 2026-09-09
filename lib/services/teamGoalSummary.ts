import { createClient } from "@/lib/supabase/server";
import { getActiveStore } from "@/lib/stores/activeStore";
import {
  getCaliforniaDate,
  getMonthInfo,
} from "@/lib/progress/date";

export async function getTeamGoalSummary() {
  const supabase =
    await createClient();

  const activeStore =
    await getActiveStore();

  if (!activeStore?.id) {
    return 0;
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
    .select("id")
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
    );

  if (employeeError) {
    console.error(
      "TEAM SUMMARY EMPLOYEE ERROR:",
      employeeError
    );
    return 0;
  }

  let totalCurrent = 0;
  let totalGoal = 0;

  for (
    const employee of employees ||
    []
  ) {
    const [
      goalResult,
      statsResult,
    ] = await Promise.all([
      supabase
        .from(
          "employee_goals"
        )
        .select("gp_goal")
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
        .select(
          "gp,stat_date"
        )
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

    if (goalResult.error) {
      console.error(
        "TEAM SUMMARY GOAL ERROR:",
        goalResult.error
      );
    }

    if (statsResult.error) {
      console.error(
        "TEAM SUMMARY STATS ERROR:",
        statsResult.error
      );
    }

    totalCurrent +=
      Number(
        statsResult.data?.gp ||
          0
      );

    totalGoal +=
      Number(
        goalResult.data
          ?.gp_goal || 0
      );
  }

  if (!totalGoal) {
    return 0;
  }

  return Number(
    (
      (totalCurrent /
        totalGoal) *
      100
    ).toFixed(1)
  );
}
