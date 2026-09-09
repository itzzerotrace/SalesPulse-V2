import {
  CircleDollarSign,
  Headphones,
  RadioTower,
  RefreshCcw,
  Smartphone,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Wifi,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import GoalScore from "@/components/goals/GoalScore";
import GoalCard from "@/components/goals/GoalCard";

import { getDashboardStats } from "@/lib/dashboard/getDashboardStats";
import { getUserProfile } from "@/lib/auth/userProfile";

export default async function GoalsPage() {
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

  const goalsWithTargets =
    goalMetrics.filter(
      (goal) =>
        Number(
          goal.goal
        ) > 0
    );

  const score =
    goalsWithTargets.length >
    0
      ? Math.round(
          goalsWithTargets.reduce(
            (
              sum,
              goal
            ) =>
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

  const storeName =
    profile?.store?.name ||
    "Store";

  const role =
    profile?.role || "";

  const cards = [
    {
      title:
        "Gross Profit",
      current: `$${Number(
        goals.gp.current ||
          0
      ).toLocaleString()}`,
      target: `$${Number(
        goals.gp.goal ||
          0
      ).toLocaleString()}`,
      percent:
        goals.gp.percent,
      icon: (
        <CircleDollarSign
          size={23}
        />
      ),
    },
    {
      title: "Voice",
      current: String(
        goals.voice
          .current || 0
      ),
      target: String(
        goals.voice.goal ||
          0
      ),
      percent:
        goals.voice.percent,
      icon: (
        <Smartphone
          size={23}
        />
      ),
    },
    {
      title: "MiM",
      current: String(
        goals.mim.current ||
          0
      ),
      target: String(
        goals.mim.goal || 0
      ),
      percent:
        goals.mim.percent,
      icon: (
        <RefreshCcw
          size={22}
        />
      ),
    },
    {
      title: "Upgrades",
      current: String(
        goals.upgrade
          .current || 0
      ),
      target: String(
        goals.upgrade.goal ||
          0
      ),
      percent:
        goals.upgrade
          .percent,
      icon: (
        <TrendingUp
          size={23}
        />
      ),
    },
    {
      title: "HSI",
      current: String(
        goals.hsi.current ||
          0
      ),
      target: String(
        goals.hsi.goal || 0
      ),
      percent:
        goals.hsi.percent,
      icon: (
        <Wifi
          size={23}
        />
      ),
    },
    {
      title: "BTS",
      current: String(
        goals.bts.current ||
          0
      ),
      target: String(
        goals.bts.goal || 0
      ),
      percent:
        goals.bts.percent,
      icon: (
        <RadioTower
          size={23}
        />
      ),
    },
    {
      title:
        "Accessories",
      current: `$${Number(
        goals.accessories
          .current || 0
      ).toLocaleString()}`,
      target: `$${Number(
        goals.accessories
          .goal || 0
      ).toLocaleString()}`,
      percent:
        goals.accessories
          .percent,
      icon: (
        <Headphones
          size={23}
        />
      ),
    },
    {
      title: "Features",
      current: `$${Number(
        goals.features
          .current || 0
      ).toLocaleString(
        undefined,
        {
          maximumFractionDigits: 2,
        }
      )}`,
      target: `$${Number(
        goals.features.goal ||
          0
      ).toLocaleString(
        undefined,
        {
          maximumFractionDigits: 2,
        }
      )}`,
      percent:
        goals.features
          .percent,
      icon: (
        <Star
          size={23}
        />
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <section className="salespulse-dark-gradient relative overflow-hidden rounded-[30px] px-5 py-6 text-white shadow-[0_24px_70px_rgba(23,16,47,0.18)] sm:px-8 sm:py-8">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-pink-500/15 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-pink-300">
                <Sparkles
                  size={13}
                />
                Goal Center
              </span>

              <h1 className="mt-5 text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                Chase the target.
                <span className="text-pink-400">
                  {" "}
                  Beat the goal.
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-white/55 sm:text-base">
                {role ===
                "employee"
                  ? "Your month-to-date performance against your assigned goals."
                  : `${storeName} month-to-date performance against the current store goals.`}
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3">
              <Target
                size={20}
                className="text-pink-400"
              />

              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.17em] text-purple-300">
                  Active Goals
                </p>

                <p className="mt-0.5 text-lg font-black">
                  {
                    goalsWithTargets.length
                  }
                  /8
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <GoalScore
            score={score}
          />

          <div className="lg:col-span-2">
            <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
              {cards
                .slice(0, 2)
                .map(
                  (card) => (
                    <GoalCard
                      key={
                        card.title
                      }
                      {...card}
                    />
                  )
                )}
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-600">
              Monthly Targets
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-tight text-[#17102F] sm:text-3xl">
              Performance Breakdown
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cards
              .slice(2)
              .map(
                (card) => (
                  <GoalCard
                    key={
                      card.title
                    }
                    {...card}
                  />
                )
              )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
