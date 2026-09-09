import Link from "next/link";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";

import StoreScore from "@/components/dashboard/StoreScore";
import EmployeeLeaderboard from "@/components/dashboard/EmployeeLeaderboard";
import TeamGoalCard from "@/components/dashboard/TeamGoalCard";
import CoachingCenter from "@/components/dashboard/CoachingCenter";
import TeamGoalProgress from "@/components/dashboard/TeamGoalProgress";
import MetricProgressCard from "@/components/progress/MetricProgressCard";

import { getDashboardStats } from "@/lib/dashboard/getDashboardStats";
import { getActiveStore } from "@/lib/stores/activeStore";
import { getTeamGoalSummary } from "@/lib/services/teamGoalSummary";

export default async function ManagerDashboard() {
  const stats =
    await getDashboardStats();

  const activeStore =
    await getActiveStore();

  const teamPercent =
    await getTeamGoalSummary();

  const goals =
    stats?.goals || {
      gp: {
        current: 0,
        goal: 0,
        percent: 0,
      },
      voice: {
        current: 0,
        goal: 0,
        percent: 0,
      },
      mim: {
        current: 0,
        goal: 0,
        percent: 0,
      },
      upgrade: {
        current: 0,
        goal: 0,
        percent: 0,
      },
      hsi: {
        current: 0,
        goal: 0,
        percent: 0,
      },
      bts: {
        current: 0,
        goal: 0,
        percent: 0,
      },
      accessories: {
        current: 0,
        goal: 0,
        percent: 0,
      },
      features: {
        current: 0,
        goal: 0,
        percent: 0,
      },
    };

  const storeName =
    activeStore?.name ||
    "Store";

  const metrics = [
    {
      title: "Gross Profit",
      icon: "💰",
      percent:
        goals.gp.percent,
      goal:
        goals.gp.goal,
    },
    {
      title: "Voice",
      icon: "📱",
      percent:
        goals.voice.percent,
      goal:
        goals.voice.goal,
    },
    {
      title: "MiM",
      icon: "🔄",
      percent:
        goals.mim.percent,
      goal:
        goals.mim.goal,
    },
    {
      title: "Upgrade",
      icon: "⬆️",
      percent:
        goals.upgrade.percent,
      goal:
        goals.upgrade.goal,
    },
    {
      title: "HSI",
      icon: "🌐",
      percent:
        goals.hsi.percent,
      goal:
        goals.hsi.goal,
    },
    {
      title: "BTS",
      icon: "📡",
      percent:
        goals.bts.percent,
      goal:
        goals.bts.goal,
    },
    {
      title: "Accessories",
      icon: "🎧",
      percent:
        goals.accessories.percent,
      goal:
        goals.accessories.goal,
    },
    {
      title: "Features",
      icon: "⭐",
      percent:
        goals.features.percent,
      goal:
        goals.features.goal,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-5 sm:space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <PageHeader
            title={storeName}
            subtitle={`${storeName} progress overview`}
          />

          <Link
            href="/daily-update"
            className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-5 py-3 text-sm font-black text-white transition hover:bg-purple-700"
          >
            Update Progress
          </Link>
        </div>

        <section>
          <div className="mb-4">
            <p className="text-sm font-black uppercase tracking-wide text-purple-600">
              Store Goal Progress
            </p>

            <h2 className="mt-1 text-xl font-black text-slate-900 sm:text-2xl">
              Month-to-Date Performance
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {metrics.map(
              (metric) => (
                <MetricProgressCard
                  key={
                    metric.title
                  }
                  title={
                    metric.title
                  }
                  icon={
                    metric.icon
                  }
                  percent={
                    metric.percent
                  }
                  hasGoal={
                    Number(
                      metric.goal
                    ) > 0
                  }
                />
              )
            )}
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-3">
          <StoreScore
            score={
              teamPercent
            }
          />

          <TeamGoalCard
            percent={
              teamPercent
            }
          />

          <CoachingCenter
            metric="Progress Tracker"
            message="Performance is based on the latest MTD numbers entered for the selected store."
          />
        </div>

        <TeamGoalProgress />

        <EmployeeLeaderboard />
      </div>
    </DashboardLayout>
  );
}
