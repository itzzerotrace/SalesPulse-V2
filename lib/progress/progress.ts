export const progressMetrics = [
  {
    key: "gp",
    label: "Gross Profit",
    shortLabel: "GP",
    type: "money",
    goalKey: "gp_goal",
  },
  {
    key: "voice",
    label: "Voice",
    shortLabel: "Voice",
    type: "count",
    goalKey: "voice_goal",
  },
  {
    key: "mim",
    label: "MiM",
    shortLabel: "MiM",
    type: "count",
    goalKey: "mim_goal",
  },
  {
    key: "upgrade",
    label: "Upgrades",
    shortLabel: "UP",
    type: "count",
    goalKey: "upgrade_goal",
  },
  {
    key: "hsi",
    label: "HSI",
    shortLabel: "HSI",
    type: "count",
    goalKey: "hsi_goal",
  },
  {
    key: "bts",
    label: "BTS",
    shortLabel: "BTS",
    type: "count",
    goalKey: "bts_goal",
  },
  {
    key: "accessories",
    label: "Accessories",
    shortLabel: "ACC",
    type: "money",
    goalKey: "accessory_goal",
  },
  {
    key: "features",
    label: "Features",
    shortLabel: "Features",
    type: "money",
    goalKey: "features_goal",
  },
] as const;

export type ProgressMetricKey =
  (typeof progressMetrics)[number]["key"];

export type ProgressStats = Record<
  ProgressMetricKey,
  number
>;

export function emptyProgressStats(): ProgressStats {
  return {
    gp: 0,
    voice: 0,
    mim: 0,
    upgrade: 0,
    hsi: 0,
    bts: 0,
    accessories: 0,
    features: 0,
  };
}

export function getProgress(
  current: number,
  goal: number,
  daysRemaining: number,
  metricKey?: string
) {
  const safeCurrent = Number(current || 0);
  const safeGoal = Number(goal || 0);

  const remaining =
    Math.max(0, safeGoal - safeCurrent);

  const percent =
    safeGoal > 0
      ? (safeCurrent / safeGoal) * 100
      : 0;

  // Features are intentionally excluded from per-day pacing.
  const neededPerDay =
    metricKey === "features"
      ? null
      : safeGoal > 0
        ? Math.ceil(
            remaining /
              Math.max(1, daysRemaining)
          )
        : 0;

  return {
    current: safeCurrent,
    goal: safeGoal,
    remaining,
    percent,
    neededPerDay,
  };
}
