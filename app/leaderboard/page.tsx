import DashboardLayout from "@/components/layout/DashboardLayout";
import LeaderboardHeader from "@/components/leaderboard/LeaderboardHeader";
import EmployeeRankingCard from "@/components/leaderboard/EmployeeRankingCard";
import { createClient } from "@/lib/supabase/server";
import { getActiveStore } from "@/lib/stores/activeStore";
import { getMonthInfo } from "@/lib/progress/date";

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
  { metric: "gp", goal: "gp_goal" },
  { metric: "voice", goal: "voice_goal" },
  { metric: "mim", goal: "mim_goal" },
  { metric: "upgrade", goal: "upgrade_goal" },
  { metric: "hsi", goal: "hsi_goal" },
  { metric: "bts", goal: "bts_goal" },
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
  const percentages = metricMap
    .map(({ metric, goal }) => {
      const goalValue = Number(
        goals?.[goal] || 0
      );

      if (goalValue <= 0) {
        return null;
      }

      const currentValue = Number(
        stats?.[metric] || 0
      );

      return (
        (currentValue / goalValue) *
        100
      );
    })
    .filter(
      (value): value is number =>
        value !== null
    );

  if (percentages.length === 0) {
    return 0;
  }

  return (
    percentages.reduce(
      (sum, value) => sum + value,
      0
    ) / percentages.length
  );
}

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const activeStore = await getActiveStore();
  const monthInfo = getMonthInfo();

  if (!activeStore) {
    return (
      <DashboardLayout>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-black text-slate-900">
            Rankings
          </h1>

          <p className="mt-2 text-slate-500">
            No active store is available.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const {
    data: employees,
    error: employeesError,
  } = await supabase
    .from("profiles")
    .select("id,full_name,role")
    .eq("store_id", activeStore.id)
    .eq("status", "approved")
    .not(
      "role",
      "in",
      '("manager","admin","regional_manager")'
    )
    .order("full_name");

  if (employeesError) {
    console.error(
      "LEADERBOARD EMPLOYEES ERROR:",
      employeesError
    );
  }

  const employeeIds = (employees || []).map(
    (employee: any) => employee.id
  );

  let goals: any[] = [];
  let snapshots: any[] = [];

  if (employeeIds.length > 0) {
    const {
      data: goalRows,
      error: goalsError,
    } = await supabase
      .from("employee_goals")
      .select(
        "employee_id,gp_goal,voice_goal,mim_goal,upgrade_goal,hsi_goal,bts_goal,accessory_goal,features_goal"
      )
      .in("employee_id", employeeIds)
      .eq("month", monthInfo.monthName)
      .eq("year", monthInfo.year);

    if (goalsError) {
      console.error(
        "LEADERBOARD GOALS ERROR:",
        goalsError
      );
    }

    goals = goalRows || [];

    const {
      data: statRows,
      error: statsError,
    } = await supabase
      .from("employee_daily_stats")
      .select(
        "employee_id,stat_date,gp,voice,mim,upgrade,hsi,bts,accessories,features"
      )
      .in("employee_id", employeeIds)
      .eq("store_id", activeStore.id)
      .gte(
        "stat_date",
        monthInfo.monthStart
      )
      .order("stat_date", {
        ascending: false,
      });

    if (statsError) {
      console.error(
        "LEADERBOARD STATS ERROR:",
        statsError
      );
    }

    snapshots = statRows || [];
  }

  const latestSnapshotByEmployee =
    new Map<string, any>();

  for (const row of snapshots) {
    if (
      !latestSnapshotByEmployee.has(
        row.employee_id
      )
    ) {
      latestSnapshotByEmployee.set(
        row.employee_id,
        row
      );
    }
  }

  const goalsByEmployee = new Map<
    string,
    any
  >();

  for (const goal of goals) {
    goalsByEmployee.set(
      goal.employee_id,
      goal
    );
  }

  const rankings = (employees || [])
    .map((employee: any) => {
      const stats =
        latestSnapshotByEmployee.get(
          employee.id
        ) || {};

      const employeeGoals =
        goalsByEmployee.get(
          employee.id
        ) || {};

      return {
        id: employee.id,
        name:
          employee.full_name ||
          "Team Member",
        score: calculateScore(
          stats,
          employeeGoals
        ),
      };
    })
    .sort(
      (a, b) => b.score - a.score
    );

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <LeaderboardHeader />

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Current Rankings
          </p>

          <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
            {activeStore.name}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {monthInfo.monthName}{" "}
            {monthInfo.year} • Based on the
            latest MTD progress update
          </p>
        </div>

        {rankings.length > 0 ? (
          <section className="space-y-3 sm:space-y-4">
            {rankings.map(
              (employee, index) => (
                <EmployeeRankingCard
                  key={employee.id}
                  rank={index + 1}
                  name={employee.name}
                  score={employee.score}
                />
              )
            )}
          </section>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <h3 className="text-lg font-black text-slate-900">
              No employee rankings yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Approved employees will
              appear here once goals and
              daily progress have been
              entered.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
