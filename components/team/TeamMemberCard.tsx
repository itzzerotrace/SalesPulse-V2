import Link from "next/link";

import DeleteEmployeeButton from "@/components/team/DeleteEmployeeButton";

import {
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Headphones,
  RadioTower,
  RefreshCcw,
  Smartphone,
  Star,
  Target,
  TrendingUp,
  UserRound,
  Wifi,
} from "lucide-react";

interface Props {
  id: string;
  name: string;
  role: string;
  viewerRole?: string;
  goals?: any;
  registered?: boolean;
}

function goalValue(
  value: unknown,
  money = false
) {
  const amount =
    Number(value || 0);

  if (money) {
    return `$${amount.toLocaleString(
      undefined,
      {
        maximumFractionDigits: 2,
      }
    )}`;
  }

  return amount.toLocaleString();
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
    viewerRole ===
      "regional_manager";

  const canDeleteEmployee =
    viewerRole === "manager" ||
    viewerRole === "admin" ||
    viewerRole ===
      "regional_manager";

  const goalItems = [
    {
      label: "GP",
      value: goalValue(
        goals?.gp_goal,
        true
      ),
      icon: (
        <CircleDollarSign
          size={14}
        />
      ),
    },
    {
      label: "Voice",
      value: goalValue(
        goals?.voice_goal
      ),
      icon: (
        <Smartphone
          size={14}
        />
      ),
    },
    {
      label: "MiM",
      value: goalValue(
        goals?.mim_goal
      ),
      icon: (
        <RefreshCcw
          size={14}
        />
      ),
    },
    {
      label: "UP",
      value: goalValue(
        goals?.upgrade_goal
      ),
      icon: (
        <TrendingUp
          size={14}
        />
      ),
    },
    {
      label: "HSI",
      value: goalValue(
        goals?.hsi_goal
      ),
      icon: (
        <Wifi
          size={14}
        />
      ),
    },
    {
      label: "BTS",
      value: goalValue(
        goals?.bts_goal
      ),
      icon: (
        <RadioTower
          size={14}
        />
      ),
    },
    {
      label: "ACC",
      value: goalValue(
        goals?.accessory_goal,
        true
      ),
      icon: (
        <Headphones
          size={14}
        />
      ),
    },
    {
      label: "Features",
      value: goalValue(
        goals?.features_goal,
        true
      ),
      icon: (
        <Star
          size={14}
        />
      ),
    },
  ];

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_14px_40px_rgba(31,21,60,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(109,40,217,0.12)]">
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-purple-100/60 blur-2xl transition group-hover:bg-pink-100/70" />

      <div className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="salespulse-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white shadow-lg shadow-purple-500/20">
              {name
                ?.charAt(0)
                ?.toUpperCase() ||
                "?"}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-black text-[#17102F] sm:text-xl">
                {name}
              </h2>

              <p className="mt-0.5 flex items-center gap-1.5 text-xs font-bold capitalize text-slate-400">
                <UserRound
                  size={13}
                />
                {role}
              </p>
            </div>
          </div>

          {registered ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-emerald-700">
              <CheckCircle2
                size={11}
              />
              Active
            </span>
          ) : (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-amber-700">
              <Clock3
                size={11}
              />
              Pending
            </span>
          )}
        </div>

        {registered ? (
          <>
            <div className="mt-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-purple-600">
                  Monthly Goals
                </p>

                <p className="mt-1 text-xs font-bold text-slate-400">
                  Current target setup
                </p>
              </div>

              <Target
                size={18}
                className="text-purple-500"
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {goalItems.map(
                (item) => (
                  <div
                    key={
                      item.label
                    }
                    className="rounded-xl bg-[#F7F6FB] p-2.5"
                  >
                    <div className="flex items-center gap-1.5 text-purple-600">
                      {item.icon}

                      <span className="text-[9px] font-black uppercase tracking-wide text-slate-400">
                        {
                          item.label
                        }
                      </span>
                    </div>

                    <p className="mt-1.5 truncate text-sm font-black text-[#17102F]">
                      {
                        item.value
                      }
                    </p>
                  </div>
                )
              )}
            </div>

            {canEditGoals && (
              <Link
                href={`/goals/${id}`}
                className="mt-5 flex min-h-11 items-center justify-between rounded-2xl bg-purple-50 px-4 py-3 text-sm font-black text-purple-700 transition hover:bg-purple-100"
              >
                Manage Goals

                <ArrowRight
                  size={17}
                />
              </Link>
            )}

            {canDeleteEmployee && (
              <DeleteEmployeeButton
                employeeId={id}
                employeeName={name}
                registered={registered}
              />
            )}
          </>
        ) : (
          <>
            <div className="mt-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-purple-600">
                  Monthly Goals
                </p>

                <p className="mt-1 text-xs font-bold text-slate-400">
                  Set goals before registration
                </p>
              </div>

              <Target
                size={18}
                className="text-purple-500"
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {goalItems.map(
                (item) => (
                  <div
                    key={
                      item.label
                    }
                    className="rounded-xl bg-[#F7F6FB] p-2.5"
                  >
                    <div className="flex items-center gap-1.5 text-purple-600">
                      {item.icon}

                      <span className="text-[9px] font-black uppercase tracking-wide text-slate-400">
                        {
                          item.label
                        }
                      </span>
                    </div>

                    <p className="mt-1.5 truncate text-sm font-black text-[#17102F]">
                      {
                        item.value
                      }
                    </p>
                  </div>
                )
              )}
            </div>

            {canEditGoals && (
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <Link
                  href={`/goals/${id}`}
                  className="flex min-h-11 items-center justify-between rounded-2xl bg-purple-50 px-4 py-3 text-sm font-black text-purple-700 transition hover:bg-purple-100"
                >
                  Manage Goals

                  <ArrowRight
                    size={17}
                  />
                </Link>

                <Link
                  href={`/progress/${id}`}
                  className="salespulse-gradient flex min-h-11 items-center justify-between rounded-2xl px-4 py-3 text-sm font-black text-white shadow-lg shadow-purple-500/20 transition hover:scale-[1.01]"
                >
                  Manage Progress

                  <ArrowRight
                    size={17}
                  />
                </Link>
              </div>
            )}

            <div className="mt-3 rounded-2xl border border-dashed border-amber-200 bg-amber-50/60 p-4">
              <p className="text-sm font-black text-amber-800">
                Waiting for registration
              </p>

              <p className="mt-1 text-xs font-medium leading-5 text-amber-700/70">
                Goals can be set now. The employee does not need a SalesPulse account yet.
              </p>
            </div>
          </>
        )}

        {!registered &&
          canDeleteEmployee && (
            <DeleteEmployeeButton
              employeeId={id}
              employeeName={name}
              registered={registered}
            />
          )}
      </div>
    </article>
  );
}
