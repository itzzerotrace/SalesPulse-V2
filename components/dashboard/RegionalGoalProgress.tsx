import { getRegionalGoalProgress } from "@/lib/services/regionalGoals";

function Metric({
  label,
  value,
  goal,
  money = false,
}: {
  label: string;
  value: number;
  goal: number;
  money?: boolean;
}) {
  const width = Math.min(
    Math.max(value, 0),
    100
  );

  const formattedGoal = money
    ? `$${Math.round(goal).toLocaleString()}`
    : Math.round(goal).toLocaleString();

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2 text-sm font-bold">
        <span className="text-slate-600">
          {label}
        </span>

        <span className="text-slate-900">
          {value}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-purple-600"
          style={{
            width: `${width}%`,
          }}
        />
      </div>

      <p className="mt-1 text-xs font-bold text-slate-400">
        Goal: {formattedGoal}
      </p>
    </div>
  );
}

export default async function RegionalGoalProgress() {
  const stores =
    await getRegionalGoalProgress();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
          District Progress
        </p>

        <h2 className="mt-1 text-2xl font-black text-slate-900">
          Store Goal Performance
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Goals and month-to-date progress for
          each assigned store.
        </p>
      </div>

      {stores.length > 0 ? (
        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {stores.map(
            (store: any) => (
              <div
                key={store.store}
                className="rounded-2xl bg-slate-50 p-5"
              >
                <h3 className="text-lg font-black text-slate-900">
                  {store.store}
                </h3>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Metric
                    label="GP"
                    value={store.gp}
                    goal={store.goals.gp}
                    money
                  />

                  <Metric
                    label="Voice"
                    value={store.voice}
                    goal={store.goals.voice}
                  />

                  <Metric
                    label="MiM"
                    value={store.mim}
                    goal={store.goals.mim}
                  />

                  <Metric
                    label="Upgrades"
                    value={store.upgrade}
                    goal={store.goals.upgrade}
                  />

                  <Metric
                    label="HSI"
                    value={store.hsi}
                    goal={store.goals.hsi}
                  />

                  <Metric
                    label="BTS"
                    value={store.bts}
                    goal={store.goals.bts}
                  />

                  <Metric
                    label="Accessories"
                    value={store.accessories}
                    goal={store.goals.accessories}
                    money
                  />

                  <Metric
                    label="Features"
                    value={store.features}
                    goal={store.goals.features}
                    money
                  />
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-8 text-center">
          <p className="font-bold text-slate-900">
            No store goals available
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Assigned stores will appear here
            once monthly goals are entered.
          </p>
        </div>
      )}
    </section>
  );
}
