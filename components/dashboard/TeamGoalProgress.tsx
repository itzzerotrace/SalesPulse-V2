import { getTeamGoalProgress } from "@/lib/services/teamGoalProgress";

const metrics = [
  ["GP", "gp"],
  ["Voice", "voice"],
  ["MiM", "mim"],
  ["Upgrade", "upgrade"],
  ["HSI", "hsi"],
  ["BTS", "bts"],
  ["ACC", "accessories"],
  ["Features", "features"],
] as const;

export default async function TeamGoalProgress() {
  const employees =
    await getTeamGoalProgress();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div>
        <h2 className="text-xl font-black text-slate-900">
          Employee Goal Progress
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Based on the latest MTD update entered for each employee.
        </p>
      </div>

      <div className="mt-5 space-y-5">
        {employees.length ===
          0 && (
          <div className="rounded-2xl bg-slate-50 p-5 text-sm font-semibold text-slate-500">
            No employee progress has been entered yet.
          </div>
        )}

        {employees.map(
          (item: any) => (
            <div
              key={
                item.employee
                  .id
              }
              className="rounded-2xl bg-slate-50 p-4 sm:p-5"
            >
              <h3 className="text-lg font-black text-slate-900">
                {
                  item.employee
                    .full_name
                }
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
                {metrics.map(
                  ([
                    label,
                    key,
                  ]) => (
                    <div
                      key={
                        key
                      }
                      className="rounded-xl bg-white p-3"
                    >
                      <p className="text-xs font-bold text-slate-500">
                        {
                          label
                        }
                      </p>

                      <p className="mt-1 text-lg font-black text-purple-700">
                        {Math.round(
                          item
                            .goals[
                            key
                          ] || 0
                        )}
                        %
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
