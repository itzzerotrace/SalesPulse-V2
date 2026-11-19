import Link from "next/link";

import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Crown,
  Gauge,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import RegionalGoalProgress from "@/components/dashboard/RegionalGoalProgress";

import {
  getRegionalTeamData,
} from "@/lib/services/regionalTeam";

import {
  getRegionalGoalProgress,
} from "@/lib/services/regionalGoals";

export default async function RegionalDashboard() {
  const [
    team,
    storeProgress,
  ] = await Promise.all([
    getRegionalTeamData(),
    getRegionalGoalProgress(),
  ]);

  const topStores =
    team.rankings.slice(
      0,
      5
    );

  const overview =
    team.overview;

  const metricKeys = [
    "gp",
    "voice",
    "mim",
    "upgrade",
    "hsi",
    "bts",
    "accessories",
  ] as const;

  const storeScores =
    storeProgress.map(
      (store: any) => {
        const percentages =
          metricKeys
            .map((key) => {
              const metric =
                store[key];

              const goal =
                Number(
                  metric?.goal ||
                    0
                );

              if (goal <= 0) {
                return null;
              }

              const percent =
                Number(
                  metric?.percent ||
                    0
                );

              return Number.isFinite(
                percent
              )
                ? percent
                : 0;
            })
            .filter(
              (
                value
              ): value is number =>
                value !== null
            );

        if (
          percentages.length ===
          0
        ) {
          return 0;
        }

        return (
          percentages.reduce(
            (sum, value) =>
              sum + value,
            0
          ) /
          percentages.length
        );
      }
    );

  const averageStoreScore =
    storeScores.length > 0
      ? storeScores.reduce(
          (sum, score) =>
            sum + score,
          0
        ) /
        storeScores.length
      : 0;


  const rankedStores =
    storeProgress
      .map(
        (
          store: any,
          index: number
        ) => ({
          ...store,
          overallScore:
            Number(
              storeScores[index] ||
                0
            ),
        })
      )
      .sort(
        (
          a: any,
          b: any
        ) =>
          b.overallScore -
          a.overallScore
      );

  const topFiveStores =
    rankedStores.slice(0, 5);

  const bottomFiveStores =
    [...rankedStores]
      .sort(
        (
          a: any,
          b: any
        ) =>
          a.overallScore -
          b.overallScore
      )
      .slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
<section className="relative isolate overflow-hidden rounded-[32px] border border-violet-300/20 bg-[#130B25] px-6 py-8 shadow-[0_24px_90px_rgba(7,3,22,0.45)] sm:px-9 sm:py-10">
<div className="pointer-events-none absolute -right-20 -top-44 h-[380px] w-[380px] rounded-full bg-fuchsia-600/20 blur-[95px]" />
<div className="pointer-events-none absolute -bottom-40 left-1/3 h-[320px] w-[320px] rounded-full bg-violet-600/20 blur-[95px]" />
<div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
<div className="max-w-xl">
<div className="inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-300/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-violet-200"><Sparkles size={13} /> SalesPulse / District Command</div>
<h1 className="mt-5 text-4xl font-black tracking-[-0.055em] text-white sm:text-5xl">Performance <span className="bg-gradient-to-r from-[#E9D5FF] via-[#C084FC] to-[#F0ABFC] bg-clip-text text-transparent">at a glance.</span></h1>
<p className="mt-3 max-w-lg text-sm leading-6 text-violet-100/65">Your district, every store, every target. See the momentum and where to focus next.</p>
</div>
<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
<div className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-xl"><p className="text-[10px] font-bold uppercase tracking-widest text-violet-200/65">Active stores</p><p className="mt-2 text-3xl font-black tracking-tight text-white">{overview.stores}</p></div>
<div className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-xl"><p className="text-[10px] font-bold uppercase tracking-widest text-violet-200/65">Avg. to goal</p><p className="mt-2 text-3xl font-black tracking-tight text-white">{averageStoreScore.toFixed(1)}%</p></div>
<div className="col-span-2 rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-600/25 to-fuchsia-600/10 px-5 py-4 backdrop-blur-xl sm:col-span-1"><p className="text-[10px] font-bold uppercase tracking-widest text-violet-200/65">Leading store</p><p className="mt-2 truncate text-lg font-black text-white">{topFiveStores[0]?.store || "—"}</p><p className="mt-1 text-xs font-bold text-violet-200">{topFiveStores.length ? topFiveStores[0].overallScore.toFixed(1) + "% to goal" : "No ranking data"}</p></div>
</div></div></section>

        {/* DISTRICT STORE RANKINGS */}

        <div className="grid gap-6 xl:grid-cols-2">

          {/* TOP 5 STORES */}

          <section className="overflow-hidden rounded-[28px] border border-violet-300/20 bg-[#170D29] shadow-[0_18px_55px_rgba(5,2,15,0.3)]">
            <div className="flex items-center justify-between border-b border-violet-300/15 bg-gradient-to-r from-violet-700/20 to-transparent px-5 py-6 sm:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <Trophy
                    size={14}
                    className="text-violet-300"
                  />

                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-300">
                    District Rankings
                  </p>
                </div>

                <h2 className="mt-1.5 text-2xl font-black tracking-[-0.03em] text-white">
                  Top 5 Stores
                </h2>
              </div>

              
            </div>

            <div className="space-y-2 p-4">
              {topFiveStores.map(
                (
                  store: any,
                  index: number
                ) => (
                  <div
                    key={
                      store.store_id ||
                      store.id ||
                      store.store
                    }
                    className={`group flex items-center gap-3 rounded-[18px] border p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-300/50 hover:shadow-[0_10px_28px_rgba(168,85,247,0.16)] ${
                      index === 0
                        ? "border-purple-300/55 bg-gradient-to-r from-[#3C2058] to-[#241333] shadow-[0_5px_22px_rgba(168,85,247,0.13)]"
                        : "border-purple-400/25 bg-gradient-to-r from-[#241333] to-[#1B1029] shadow-[0_5px_18px_rgba(0,0,0,0.12)]"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] font-black ${
                        index === 0
                          ? "bg-gradient-to-br from-[#7C20D4] to-[#EC168C] text-white shadow-[0_5px_14px_rgba(139,0,255,0.18)]"
                          : "border border-purple-300/25 bg-[#3A2153] text-white shadow-[0_3px_12px_rgba(168,85,247,0.15)]"
                      }`}
                    >
                      {index === 0 ? (
                        <Crown size={17} />
                      ) : (
                        index + 1
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-black text-white">
                        {store.store ||
                          store.store_name ||
                          store.name ||
                          "Store"}
                      </p>

                      <p className="mt-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
                        District Rank #{index + 1}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-black text-white">
                        {Number(
                          store.overallScore ||
                            0
                        ).toFixed(1)}
                        %
                      </p>

                      <p className="text-[9px] font-black uppercase tracking-[0.14em] text-purple-200">
                        Store Score
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          {/* BOTTOM 5 STORES */}

          <section className="overflow-hidden rounded-[28px] border border-violet-300/20 bg-[#170D29] shadow-[0_18px_55px_rgba(5,2,15,0.3)]">
            <div className="flex items-center justify-between border-b border-violet-300/15 bg-gradient-to-r from-violet-700/20 to-transparent px-5 py-6 sm:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <Gauge
                    size={14}
                    className="text-violet-300"
                  />

                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-300">
                    Opportunity Stores
                  </p>
                </div>

                <h2 className="mt-1.5 text-2xl font-black tracking-[-0.03em] text-white">
                  Bottom 5 Stores
                </h2>
              </div>

              
            </div>

            <div className="space-y-2 p-4">
              {bottomFiveStores.map(
                (
                  store: any,
                  index: number
                ) => {
                  const districtRank =
                    rankedStores.findIndex(
                      (ranked: any) =>
                        (
                          ranked.store_id ||
                          ranked.id ||
                          ranked.store
                        ) ===
                        (
                          store.store_id ||
                          store.id ||
                          store.store
                        )
                    ) + 1;

                  return (
                    <div
                      key={
                        store.store_id ||
                        store.id ||
                        store.store
                      }
                      className="group flex items-center gap-3 rounded-[18px] border border-purple-400/25 bg-gradient-to-r from-[#241333] to-[#1B1029] p-3.5 shadow-[0_5px_18px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-300/50 hover:shadow-[0_10px_28px_rgba(168,85,247,0.16)]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-purple-300/25 bg-[#3A2153] font-black text-white shadow-[0_3px_12px_rgba(168,85,247,0.15)]">
                        {districtRank}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[15px] font-black text-white">
                          {store.store ||
                            store.store_name ||
                            store.name ||
                            "Store"}
                        </p>

                        <p className="mt-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-slate-400">
                          District Rank #{districtRank}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-black text-white">
                          {Number(
                            store.overallScore ||
                              0
                          ).toFixed(1)}
                          %
                        </p>

                        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-purple-200">
                          Store Score
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </section>
        </div>

        {/* STORE PERFORMANCE */}

        <section>
          <div className="mb-4 flex flex-col gap-3 px-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/15 text-violet-200">
                  <Zap size={15} />
                </div>

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-300">
                  District Performance
                </p>
              </div>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white sm:text-[28px]">
                Store Goal Performance
              </h2>

              <p className="mt-2 text-xs font-semibold text-violet-200/65 sm:text-sm">
                Current month-to-date performance compared with monthly goals.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-4 py-2.5 text-[11px] font-black text-white">
              <Building2
                size={13}
                className="text-purple-600"
              />

              {overview.stores} Active Stores
            </div>
          </div>

          <RegionalGoalProgress />
        </section>

      </div>
    </DashboardLayout>
  );
}
