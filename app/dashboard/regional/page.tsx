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
    "features",
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
      <div className="space-y-6 pb-10">

        {/* DISTRICT STORE RANKINGS */}

        <div className="grid gap-5 xl:grid-cols-2">

          {/* TOP 5 STORES */}

          <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_16px_45px_rgba(31,21,60,0.06)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <Trophy
                    size={14}
                    className="text-[#8B00FF]"
                  />

                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#8B00FF]">
                    District Rankings
                  </p>
                </div>

                <h2 className="mt-1.5 text-2xl font-black tracking-[-0.03em] text-[#17102F]">
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
                    className={`flex items-center gap-3 rounded-[16px] border p-3.5 ${
                      index === 0
                        ? "border-[#E3C9FF] bg-[#FAF5FF]"
                        : "border-slate-100 bg-[#F8F8FC]"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] font-black ${
                        index === 0
                          ? "bg-gradient-to-br from-[#7C20D4] to-[#EC168C] text-white shadow-[0_5px_14px_rgba(139,0,255,0.18)]"
                          : "bg-white text-[#8B00FF] shadow-sm"
                      }`}
                    >
                      {index === 0 ? (
                        <Crown size={17} />
                      ) : (
                        index + 1
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-black text-[#17102F]">
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
                      <p className="text-lg font-black text-[#17102F]">
                        {Number(
                          store.overallScore ||
                            0
                        ).toFixed(1)}
                        %
                      </p>

                      <p className="text-[8px] font-black uppercase tracking-[0.14em] text-[#8B00FF]">
                        Store Score
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          {/* BOTTOM 5 STORES */}

          <section className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_16px_45px_rgba(31,21,60,0.06)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
              <div>
                <div className="flex items-center gap-2">
                  <Gauge
                    size={14}
                    className="text-[#8B00FF]"
                  />

                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#8B00FF]">
                    Opportunity Stores
                  </p>
                </div>

                <h2 className="mt-1.5 text-2xl font-black tracking-[-0.03em] text-[#17102F]">
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
                      className="flex items-center gap-3 rounded-[16px] border border-slate-100 bg-[#F8F8FC] p-3.5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-white font-black text-[#8B00FF] shadow-sm">
                        {districtRank}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[15px] font-black text-[#17102F]">
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
                        <p className="text-lg font-black text-[#17102F]">
                          {Number(
                            store.overallScore ||
                              0
                          ).toFixed(1)}
                          %
                        </p>

                        <p className="text-[8px] font-black uppercase tracking-[0.14em] text-[#8B00FF]">
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
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                  <Zap size={15} />
                </div>

                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-600">
                  District Performance
                </p>
              </div>

              <h2 className="mt-2 text-2xl font-black tracking-[-0.03em] text-[#17102F] sm:text-[28px]">
                Store Goal Performance
              </h2>

              <p className="mt-1 text-xs font-medium text-white sm:text-sm">
                Current month-to-date performance compared with monthly goals.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[10px] font-black text-slate-600 shadow-sm">
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
