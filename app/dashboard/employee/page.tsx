import DashboardLayout from "@/components/layout/DashboardLayout";

import KpiCard from "@/components/dashboard/KpiCard";
import PerformanceScore from "@/components/dashboard/PerformanceScore";
import GoalProgressCard from "@/components/dashboard/GoalProgressCard";
import StoreRanking from "@/components/dashboard/StoreRanking";
import SalesChart from "@/components/dashboard/SalesChart";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import CoachingInsight from "@/components/dashboard/CoachingInsight";

import { getDashboardStats } from "@/lib/dashboard/getDashboardStats";
import { getUserProfile } from "@/lib/auth/userProfile";

export default async function EmployeeDashboard() {
  const [
    stats,
    profile,
  ] = await Promise.all([
    getDashboardStats(),
    getUserProfile(),
  ]);

  if (!stats) {
    return null;
  }

  const month =
    stats.month;

  const goals =
    stats.goals;

  const goalMetrics = [
    goals.gp,
    goals.voice,
    goals.mim,
    goals.upgrade,
    goals.hsi,
    goals.bts,
    goals.accessories,
    goals.features,
  ];

  const activeGoals =
    goalMetrics.filter(
      (goal) =>
        Number(goal.goal) > 0
    );

  const score =
    activeGoals.length > 0
      ? Math.round(
          activeGoals.reduce(
            (sum, goal) =>
              sum +
              Number(
                goal.percent ||
                  0
              ),
            0
          ) /
            activeGoals.length
        )
      : 0;

  const storeName =
    profile?.store?.name ||
    "Store";

  const employeeName =
    profile?.full_name ||
    profile?.name ||
    "Team Member";

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-purple-600">
            {storeName}
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
            Good morning, {employeeName}
          </h1>

          <p className="mt-2 text-slate-500">
            Here is your performance overview.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          <KpiCard
            title="Gross Profit"
            value={`$${Number(
              month.gp || 0
            ).toLocaleString()}`}
            change="MTD"
            icon="💰"
          />

          <KpiCard
            title="Voice"
            value={String(
              month.voice || 0
            )}
            change="MTD"
            icon="📱"
          />

          <KpiCard
            title="MiM"
            value={String(
              month.mim || 0
            )}
            change="MTD"
            icon="🔄"
          />

          <KpiCard
            title="Upgrade"
            value={String(
              month.upgrade || 0
            )}
            change="MTD"
            icon="⬆️"
          />

          <KpiCard
            title="HSI"
            value={String(
              month.hsi || 0
            )}
            change="MTD"
            icon="🌐"
          />

          <KpiCard
            title="BTS"
            value={String(
              month.bts || 0
            )}
            change="MTD"
            icon="📡"
          />

          <KpiCard
            title="Accessories"
            value={`$${Number(
              month.accessories ||
                0
            ).toLocaleString()}`}
            change="MTD"
            icon="🎧"
          />

          <KpiCard
            title="Features"
            value={`$${Number(
              month.features ||
                0
            ).toLocaleString(
              undefined,
              {
                maximumFractionDigits: 2,
              }
            )}`}
            change="MTD"
            icon="⭐"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <PerformanceScore
            score={score}
          />

          <GoalProgressCard
            title="Gross Profit"
            current={`$${Number(
              goals.gp.current ||
                0
            ).toLocaleString()}`}
            goal={`$${Number(
              goals.gp.goal ||
                0
            ).toLocaleString()}`}
            percent={
              goals.gp.percent
            }
          />

          <StoreRanking />
        </div>

        <SalesChart />

        <div className="grid gap-6 lg:grid-cols-2">
          <ActivityFeed />
          <CoachingInsight />
        </div>
      </div>
    </DashboardLayout>
  );
}
