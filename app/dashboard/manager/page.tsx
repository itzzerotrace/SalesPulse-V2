import Link from "next/link";

import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/ui/PageHeader";

import StoreScore from "@/components/dashboard/StoreScore";
import EmployeeLeaderboard from "@/components/dashboard/EmployeeLeaderboard";
import TeamGoalCard from "@/components/dashboard/TeamGoalCard";
import CoachingCenter from "@/components/dashboard/CoachingCenter";
import KpiCard from "@/components/dashboard/KpiCard";
import TeamGoalProgress from "@/components/dashboard/TeamGoalProgress";

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

  const month =
    stats?.month || {
      gp: 0,
      voice: 0,
      mim: 0,
      upgrade: 0,
      hsi: 0,
      bts: 0,
      accessories: 0,
      features: 0,
    };

  const storeName =
    activeStore?.name ||
    "Store";

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

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
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
              month.features || 0
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
