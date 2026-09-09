import { createClient } from "@/lib/supabase/server";
import { getActiveStore } from "@/lib/stores/activeStore";

function percent(
  current: number,
  goal: number
) {
  if (!goal) {
    return 0;
  }

  return (
    current / goal
  ) * 100;
}

export async function getTeamGoalSummary() {
  const supabase =
    await createClient();

  const activeStore =
    await getActiveStore();

  const storeId =
    activeStore?.id;

  if (!storeId) {
    return 0;
  }

  const { data: employees } =
    await supabase
      .from("profiles")
      .select("id")
      .eq(
        "store_id",
        storeId
      )
      .eq(
        "status",
        "approved"
      );

  let totalCurrent = 0;
  let totalGoal = 0;

  const now = new Date();

  const month =
    now.toLocaleString(
      "en-US",
      {
        month: "long",
      }
    );

  const year =
    now.getFullYear();

  for (
    const employee
    of employees || []
  ) {
    const { data: goal } =
      await supabase
        .from("employee_goals")
        .select("*")
        .eq(
          "employee_id",
          employee.id
        )
        .eq("month", month)
        .eq("year", year)
        .maybeSingle();

    const { data: sales } =
      await supabase
        .from("sales")
        .select("gp,created_at")
        .eq(
          "employee_id",
          employee.id
        );

    const monthStart =
      new Date(
        year,
        now.getMonth(),
        1
      );

    const gp = (
      sales || []
    )
      .filter(
        (sale: any) =>
          new Date(
            sale.created_at
          ) >= monthStart
      )
      .reduce(
        (
          sum: number,
          sale: any
        ) =>
          sum +
          Number(
            sale.gp || 0
          ),
        0
      );

    totalCurrent += gp;

    totalGoal +=
      Number(
        goal?.gp_goal || 0
      );
  }

  return percent(
    totalCurrent,
    totalGoal
  );
}
