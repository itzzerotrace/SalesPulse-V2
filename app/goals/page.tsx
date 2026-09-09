import DashboardLayout from "@/components/layout/DashboardLayout";

import GoalsHeader from "@/components/goals/GoalsHeader";
import GoalScore from "@/components/goals/GoalScore";
import GoalCard from "@/components/goals/GoalCard";

import { getDashboardStats } from "@/lib/dashboard/getDashboardStats";

export default async function GoalsPage() {
  const stats =
    await getDashboardStats();

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

  const goalsWithTargets =
    goalMetrics.filter(
      (goal) =>
        Number(goal.goal) > 0
    );

  const score =
    goalsWithTargets.length > 0
      ? Math.round(
          goalsWithTargets.reduce(
            (sum, goal) =>
              sum +
              Number(
                goal.percent ||
                  0
              ),
            0
          ) /
            goalsWithTargets.length
        )
      : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <GoalsHeader />

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
      </div>
    </DashboardLayout>
  );
}
