import DashboardLayout from "@/components/layout/DashboardLayout";

import { createClient } from "@/lib/supabase/server";

import {
  getCaliforniaDate,
  getMonthInfo,
} from "@/lib/progress/date";

type MetricKey =
  | "gp"
  | "voice"
  | "mim"
  | "upgrade"
  | "hsi"
  | "bts"
  | "accessories"
  | "features";

type GoalKey =
  | "gp_goal"
  | "voice_goal"
  | "mim_goal"
  | "upgrade_goal"
  | "hsi_goal"
  | "bts_goal"
  | "accessory_goal"
  | "features_goal";

const metricMap: Array<{
  metric: MetricKey;
  goal: GoalKey;
}> = [
  {
    metric: "gp",
    goal: "gp_goal",
  },
  {
    metric: "voice",
    goal: "voice_goal",
  },
  {
    metric: "mim",
    goal: "mim_goal",
  },
  {
    metric: "upgrade",
    goal: "upgrade_goal",
  },
  {
    metric: "hsi",
    goal: "hsi_goal",
  },
  {
    metric: "bts",
    goal: "bts_goal",
  },
  {
    metric: "accessories",
    goal: "accessory_goal",
  },
  {
    metric: "features",
    goal: "features_goal",
  },
];

function calculateScore(
  stats: Record<string, any>,
  goals: Record<string, any>
) {
  const values =
    metricMap
      .map(
        ({
          metric,
          goal,
        }) => {
          const target =
            Number(
              goals?.[
                goal
              ] || 0
            );

          if (
            target <= 0
          ) {
            return null;
          }

          return (
            Number(
              stats?.[
                metric
              ] || 0
            ) /
            target
          ) * 100;
        }
      )
      .filter(
        (
          value
        ): value is number =>
          value !== null
      );

  if (
    values.length === 0
  ) {
    return 0;
  }

  return Number(
    (
      values.reduce(
        (
          total,
          value
        ) =>
          total + value,
        0
      ) /
      values.length
    ).toFixed(1)
  );
}

function normalizeStoreName(
  name: unknown
) {
  const value =
    String(
      name || ""
    ).trim();

  if (
    value.toLowerCase() ===
    "marconi"
  ) {
    return "Marconi Ave";
  }

  return value;
}

function RankingRow({
  rank,
  name,
  store,
  score,
}: {
  rank: number;
  name: string;
  store: string;
  score: number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-lg font-black text-purple-700">
        {rank}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-black text-slate-900 sm:text-lg">
          {name}
        </p>

        <p className="text-sm font-bold text-slate-500">
          {store}
        </p>
      </div>

      <div className="text-right">
        <p className="text-xl font-black text-slate-900">
          {score.toFixed(
            1
          )}
          %
        </p>

        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
          Goal Score
        </p>
      </div>
    </div>
  );
}

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const today = getCaliforniaDate();
  const { monthName, year, monthStart } = getMonthInfo(today);

  // Rankings are district-wide and do not depend on the selected store.
  // Only active Mobile Experts (ME) are included.
  const [employeesResult, storesResult] = await Promise.all([
    supabase.from("tracked_employees")
      .select("id,full_name,store_id")
      .eq("status", "active")
      .eq("designation", "ME")
      .order("full_name"),
    supabase.from("stores").select("id,name"),
  ]);

  if (employeesResult.error || storesResult.error) {
    console.error("LEADERBOARD LOAD ERROR", employeesResult.error || storesResult.error);
    return <DashboardLayout><div className="rounded-3xl border border-red-200 bg-white p-8 text-red-700">Unable to load employee rankings.</div></DashboardLayout>;
  }

  const employees = employeesResult.data || [];
  const storeNames = new Map((storesResult.data || []).map(store => [store.id, store.name]));
  const employeeIds = employees.map(employee => employee.id);
  const goals: any[] = [];
  const stats: any[] = [];

  // Batch IDs to stay within PostgREST URL limits.
  for (let offset = 0; offset < employeeIds.length; offset += 100) {
    const ids = employeeIds.slice(offset, offset + 100);
    const [goalResult, statsResult] = await Promise.all([
      supabase.from("tracked_employee_goals").select("*")
        .in("employee_id", ids).eq("month", monthName).eq("year", year),
      supabase.from("tracked_employee_daily_stats").select("*")
        .in("employee_id", ids).gte("stat_date", monthStart)
        .lte("stat_date", today)
        .order("stat_date", { ascending: false }),
    ]);
    if (goalResult.error || statsResult.error) {
      console.error("LEADERBOARD STATS ERROR", goalResult.error || statsResult.error);
      return <DashboardLayout><div className="rounded-3xl border border-red-200 bg-white p-8 text-red-700">Unable to load employee rankings.</div></DashboardLayout>;
    }
    goals.push(...(goalResult.data || []));
    stats.push(...(statsResult.data || []));
  }

  const goalMap = new Map(goals.map(goal => [goal.employee_id, goal]));
  const statsMap = new Map<string, any>();
  for (const row of stats) {
    if (!statsMap.has(row.employee_id)) statsMap.set(row.employee_id, row);
  }

  const rankings = employees.map(employee => ({
    id: employee.id,
    name: employee.full_name || "Team Member",
    store: normalizeStoreName(storeNames.get(employee.store_id) || "Unknown Store"),
    score: calculateScore(statsMap.get(employee.id) || {}, goalMap.get(employee.id) || {}),
  })).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-purple-600">Employee Rankings</p>
          <h1 className="mt-1 text-3xl font-black text-slate-900 sm:text-4xl">All ME Rankings</h1>
          <p className="mt-2 text-sm font-semibold text-slate-500">All active Mobile Experts · Ranked highest to lowest by MTD goal score</p>
        </div>
        <section className="space-y-3">
          {rankings.length ? rankings.map((employee, index) => (
            <RankingRow key={employee.id} rank={index + 1} name={employee.name}
              store={employee.store} score={employee.score} />
          )) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="font-black text-slate-900">No active Mobile Experts found.</p>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
