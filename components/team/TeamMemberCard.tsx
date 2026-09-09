interface Props {
  id: string;
  name: string;
  role: string;
  viewerRole?: string;
  goals?: any;
  registered?: boolean;
}

export default function TeamMemberCard({
  id,
  name,
  role,
  viewerRole,
  goals,
  registered = true,
}: Props) {
  const canEditGoals =
    viewerRole === "manager" ||
    viewerRole === "admin" ||
    viewerRole === "regional_manager";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 text-lg font-black text-purple-700 sm:h-14 sm:w-14 sm:text-xl">
            {name?.charAt(0)?.toUpperCase() || "?"}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-black text-slate-900 sm:text-xl">
              {name}
            </h2>

            <p className="truncate text-sm font-semibold capitalize text-slate-600">
              {role}
            </p>
          </div>
        </div>

        {canEditGoals && registered && (
          <a
            href={`/goals/${id}`}
            className="shrink-0 rounded-xl bg-purple-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-purple-700 sm:px-4"
          >
            Goals
          </a>
        )}
      </div>

      <div className="mt-4">
        {registered ? (
          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
            Active
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">
            Not Registered
          </span>
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 sm:mt-6 sm:grid-cols-3 sm:gap-3">
        <div>
          <p className="text-xs font-medium text-slate-600">GP Goal</p>
          <p className="mt-0.5 text-lg font-black text-slate-900">
            {goals?.gp_goal || 0}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-600">Voice Goal</p>
          <p className="mt-0.5 text-lg font-black text-slate-900">
            {goals?.voice_goal || 0}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-600">HSI Goal</p>
          <p className="mt-0.5 text-lg font-black text-slate-900">
            {goals?.hsi_goal || 0}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-600">MiM Goal</p>
          <p className="mt-0.5 text-lg font-black text-slate-900">
            {goals?.mim_goal || 0}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-600">Upgrade Goal</p>
          <p className="mt-0.5 text-lg font-black text-slate-900">
            {goals?.upgrade_goal || 0}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-600">BTS Goal</p>
          <p className="mt-0.5 text-lg font-black text-slate-900">
            {goals?.bts_goal || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
