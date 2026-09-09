import DashboardLayout from "@/components/layout/DashboardLayout";

import GoalCard from "@/components/goals/GoalCard";
import GoalScore from "@/components/goals/GoalScore";

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
      <div className="space-y-6 sm:space-y-8">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-purple-600">
            {storeName}
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
            {employeeName}
          </h1>

          <p className="mt-2 text-slate-500">
            Your month-to-date goal progress.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
          <GoalScore
            score={score}
          />

          <GoalCard
            title="Gross Profit"
            current={`$${Number(
              goals.gp.current ||
                0
            ).toLocaleString()}`}
            target={`$${Number(
              goals.gp.goal ||
                0
            ).toLocaleString()}`}
            percent={
              goals.gp.percent
            }
            icon="💰"
          />

          <GoalCard
            title="Voice"
            current={String(
              goals.voice
                .current || 0
            )}
            target={String(
              goals.voice.goal ||
                0
            )}
            percent={
              goals.voice.percent
            }
            icon="📱"
          />
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <GoalCard
            title="MiM"
            current={String(
              goals.mim.current ||
                0
            )}
            target={String(
              goals.mim.goal ||
                0
            )}
            percent={
              goals.mim.percent
            }
            icon="🔄"
          />

          <GoalCard
            title="Upgrade"
            current={String(
              goals.upgrade
                .current || 0
            )}
            target={String(
              goals.upgrade.goal ||
                0
            )}
            percent={
              goals.upgrade
                .percent
            }
            icon="⬆️"
          />

          <GoalCard
            title="HSI"
            current={String(
              goals.hsi.current ||
                0
            )}
            target={String(
              goals.hsi.goal ||
                0
            )}
            percent={
              goals.hsi.percent
            }
            icon="🌐"
          />

          <GoalCard
            title="BTS"
            current={String(
              goals.bts.current ||
                0
            )}
            target={String(
              goals.bts.goal ||
                0
            )}
            percent={
              goals.bts.percent
            }
            icon="📡"
          />

          <GoalCard
            title="Accessories"
            current={`$${Number(
              goals.accessories
                .current || 0
            ).toLocaleString()}`}
            target={`$${Number(
              goals.accessories
                .goal || 0
            ).toLocaleString()}`}
            percent={
              goals.accessories
                .percent
            }
            icon="🎧"
          />

          <GoalCard
            title="Features"
            current={`$${Number(
              goals.features
                .current || 0
            ).toLocaleString(
              undefined,
              {
                maximumFractionDigits: 2,
              }
            )}`}
            target={`$${Number(
              goals.features.goal ||
                0
            ).toLocaleString(
              undefined,
              {
                maximumFractionDigits: 2,
              }
            )}`}
            percent={
              goals.features
                .percent
            }
            icon="⭐"
          />
        </section>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7">
          <p className="text-sm font-black uppercase tracking-wide text-purple-600">
            Performance Tracking
          </p>

          <h2 className="mt-2 text-xl font-black text-slate-900 sm:text-2xl">
            Stay focused on your goals
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Your dashboard is based on your latest month-to-date performance update and assigned goals.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
