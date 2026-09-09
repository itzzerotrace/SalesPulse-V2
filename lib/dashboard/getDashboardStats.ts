import { createClient } from "@/lib/supabase/server";
import { getUserContext } from "@/lib/auth/userContext";
import { getActiveStore } from "@/lib/stores/activeStore";
import {
  getCaliforniaDate,
  getMonthInfo,
} from "@/lib/progress/date";

function emptySales() {
  return {
    gp: 0,
    voice: 0,
    mim: 0,
    upgrade: 0,
    hsi: 0,
    bts: 0,
    accessories: 0,
    features: 0,
    commission: 0,
  };
}

function calculateSales(
  sales: any[]
) {
  return {
    gp: sales.reduce(
      (sum, sale) =>
        sum +
        Number(
          sale.gp || 0
        ),
      0
    ),

    voice: sales.reduce(
      (sum, sale) =>
        sum +
        Number(
          sale.voice || 0
        ),
      0
    ),

    mim: sales.reduce(
      (sum, sale) =>
        sum +
        Number(
          sale.mim || 0
        ),
      0
    ),

    upgrade: sales.reduce(
      (sum, sale) =>
        sum +
        Number(
          sale.upgrade || 0
        ),
      0
    ),

    hsi: sales.reduce(
      (sum, sale) =>
        sum +
        Number(
          sale.hsi || 0
        ),
      0
    ),

    bts: sales.reduce(
      (sum, sale) =>
        sum +
        Number(
          sale.bts || 0
        ),
      0
    ),

    accessories:
      sales.reduce(
        (sum, sale) =>
          sum +
          Number(
            sale.accessories ||
              0
          ),
        0
      ),

    features: 0,

    commission: 0,
  };
}

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

function buildGoals(
  current: any,
  goal: any
) {
  return {
    gp: {
      current:
        Number(
          current.gp || 0
        ),
      goal:
        Number(
          goal?.gp_goal ||
            0
        ),
      percent: percent(
        Number(
          current.gp || 0
        ),
        Number(
          goal?.gp_goal ||
            0
        )
      ),
    },

    voice: {
      current:
        Number(
          current.voice || 0
        ),
      goal:
        Number(
          goal?.voice_goal ||
            0
        ),
      percent: percent(
        Number(
          current.voice || 0
        ),
        Number(
          goal?.voice_goal ||
            0
        )
      ),
    },

    mim: {
      current:
        Number(
          current.mim || 0
        ),
      goal:
        Number(
          goal?.mim_goal ||
            0
        ),
      percent: percent(
        Number(
          current.mim || 0
        ),
        Number(
          goal?.mim_goal ||
            0
        )
      ),
    },

    upgrade: {
      current:
        Number(
          current.upgrade || 0
        ),
      goal:
        Number(
          goal?.upgrade_goal ||
            0
        ),
      percent: percent(
        Number(
          current.upgrade ||
            0
        ),
        Number(
          goal?.upgrade_goal ||
            0
        )
      ),
    },

    hsi: {
      current:
        Number(
          current.hsi || 0
        ),
      goal:
        Number(
          goal?.hsi_goal ||
            0
        ),
      percent: percent(
        Number(
          current.hsi || 0
        ),
        Number(
          goal?.hsi_goal ||
            0
        )
      ),
    },

    bts: {
      current:
        Number(
          current.bts || 0
        ),
      goal:
        Number(
          goal?.bts_goal ||
            0
        ),
      percent: percent(
        Number(
          current.bts || 0
        ),
        Number(
          goal?.bts_goal ||
            0
        )
      ),
    },

    accessories: {
      current:
        Number(
          current.accessories ||
            0
        ),
      goal:
        Number(
          goal?.accessory_goal ||
            0
        ),
      percent: percent(
        Number(
          current.accessories ||
            0
        ),
        Number(
          goal?.accessory_goal ||
            0
        )
      ),
    },

    features: {
      current:
        Number(
          current.features ||
            0
        ),
      goal:
        Number(
          goal?.features_goal ||
            0
        ),
      percent: percent(
        Number(
          current.features ||
            0
        ),
        Number(
          goal?.features_goal ||
            0
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

    if (!activeStore?.id) {
      const empty =
        emptySales();

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
        .from(
          "store_goals"
        )
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

    const snapshot = {
      ...emptySales(),
      ...(statsResult.data ||
        {}),
      commission: 0,
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

  let sales: any[] = [];

  if (role === "employee") {
    const {
      data,
      error,
    } = await supabase
      .from("sales")
      .select("*")
      .eq(
        "employee_id",
        context.user.id
      );

    if (error) {
      throw error;
    }

    sales = data || [];
  }

  if (
    role ===
    "regional_manager"
  ) {
    const {
      data: stores,
    } = await supabase
      .from("stores")
      .select("id")
      .eq(
        "region_id",
        context.profile
          .region_id
      );

    const ids =
      (stores || []).map(
        (store: any) =>
          store.id
      );

    if (ids.length) {
      const {
        data,
      } = await supabase
        .from("sales")
        .select("*")
        .in(
          "store_id",
          ids
        );

      sales = data || [];
    }
  }

  if (role === "admin") {
    const { data } =
      await supabase
        .from("sales")
        .select("*");

    sales = data || [];
  }

  const monthSales =
    sales.filter(
      (sale: any) =>
        sale.created_at >=
        `${monthStart}T00:00:00`
    );

  const month =
    calculateSales(
      monthSales
    );

  let employeeGoal =
    null;

  if (role === "employee") {
    const {
      data,
    } = await supabase
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
      .maybeSingle();

    employeeGoal =
      data;
  }

  return {
    month,
    today:
      emptySales(),
    total:
      calculateSales(
        sales
      ),
    goals:
      buildGoals(
        month,
        employeeGoal
      ),
  };
}
