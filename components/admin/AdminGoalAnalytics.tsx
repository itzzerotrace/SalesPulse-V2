import { getAdminGoalAnalytics } from "@/lib/services/adminGoals";

export default async function AdminGoalAnalytics() {
  const regions =
    await getAdminGoalAnalytics();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
          Company Progress
        </p>

        <h2 className="mt-1 text-2xl font-black text-slate-900">
          Region GP Progress
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Latest month-to-date GP progress
          against current store goals.
        </p>
      </div>

      {regions.length > 0 ? (
        <div className="mt-6 space-y-4">
          {regions.map(
            (region: any) => {
              const width = Math.min(
                Math.max(
                  region.gp,
                  0
                ),
                100
              );

              return (
                <div
                  key={
                    region.region
                  }
                  className="rounded-2xl bg-slate-50 p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-black text-slate-900">
                      {
                        region.region
                      }
                    </span>

                    <span className="text-lg font-black text-purple-600">
                      {region.gp}%
                    </span>
                  </div>

                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-purple-600"
                      style={{
                        width: `${width}%`,
                      }}
                    />
                  </div>
                </div>
              );
            }
          )}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
          No regional goal data is
          available yet.
        </div>
      )}
    </section>
  );
}
