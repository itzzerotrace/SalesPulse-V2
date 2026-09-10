import Link from "next/link";

import {
  ArrowRight,
  BarChart3,
  Building2,
  Gauge,
  Map,
  Sparkles,
  Store,
  Target,
  Trophy,
  UserRound,
  Users,
  Zap,
} from "lucide-react";

const roles = [
  {
    title:
      "Sales Representatives",
    description:
      "See personal goals, current progress, and exactly where you stand.",
    icon: UserRound,
  },
  {
    title:
      "Store Managers",
    description:
      "Keep the team aligned, update performance, and coach from real progress.",
    icon: Store,
  },
  {
    title:
      "Regional Leaders",
    description:
      "Understand performance across locations with a clearer view of the field.",
    icon: Map,
  },
];

const features = [
  {
    title:
      "Performance Tracking",
    description:
      "Track the core metrics driving your store every month.",
    icon: BarChart3,
  },
  {
    title:
      "Goal Pacing",
    description:
      "See progress, remaining targets, and the pace needed to finish strong.",
    icon: Gauge,
  },
  {
    title:
      "Employee Goals",
    description:
      "Keep each team member focused on clear monthly objectives.",
    icon: Target,
  },
  {
    title:
      "Team Rankings",
    description:
      "Turn goal progress into visible, motivating competition.",
    icon: Trophy,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#120B27] text-white">
      <div className="pointer-events-none absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-purple-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-0 h-[460px] w-[460px] rounded-full bg-pink-500/15 blur-3xl" />

      <header className="relative z-10 border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <div className="salespulse-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-black shadow-lg shadow-pink-500/20">
              S
            </div>

            <div className="min-w-0">
              <p className="truncate text-lg font-black tracking-tight">
                SalesPulse
              </p>

              <p className="hidden text-[9px] font-black uppercase tracking-[0.18em] text-white/35 sm:block">
                Retail Performance
                Platform
              </p>
            </div>
          </div>

          <div className="flex shrink-0 gap-2">
            <Link
              href="/login"
              className="rounded-xl border border-white/15 px-4 py-2.5 text-xs font-black transition hover:bg-white/10 sm:px-5 sm:text-sm"
            >
              Sign In
            </Link>

            <Link
              href="/login"
              className="salespulse-gradient hidden rounded-xl px-5 py-2.5 text-sm font-black shadow-lg shadow-purple-500/20 sm:inline-flex"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <section className="relative z-[1] mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-pink-300">
            <Sparkles
              size={13}
            />
            Performance with
            purpose
          </span>

          <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
            Know the goal.
            <span className="block text-pink-400">
              Own the pace.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base font-medium leading-7 text-white/55 sm:text-lg">
            SalesPulse gives retail
            teams one place to
            update performance,
            track monthly goals,
            measure pace, and see
            who&apos;s leading.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="salespulse-gradient flex min-h-13 items-center justify-center gap-2 rounded-2xl px-7 py-3.5 font-black shadow-lg shadow-purple-500/20 transition hover:scale-[1.01]"
            >
              Open SalesPulse
              <ArrowRight
                size={18}
              />
            </Link>

            <Link
              href="/register"
              className="flex min-h-13 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.05] px-7 py-3.5 font-black transition hover:bg-white/10"
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="salespulse-glow rounded-[32px] border border-white/10 bg-white/[0.06] p-4 backdrop-blur sm:p-6">
            <div className="rounded-[26px] bg-white p-5 text-[#17102F] shadow-2xl sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-purple-600">
                    Performance
                    Pulse
                  </p>

                  <h2 className="mt-1 text-2xl font-black tracking-tight">
                    Stay on pace.
                  </h2>
                </div>

                <div className="salespulse-gradient flex h-12 w-12 items-center justify-center rounded-2xl text-white">
                  <Zap
                    size={22}
                  />
                </div>
              </div>

              <div className="mt-7 space-y-5">
                {[
                  {
                    label:
                      "Store Goal Progress",
                    value: 82,
                  },
                  {
                    label:
                      "Team Momentum",
                    value: 74,
                  },
                  {
                    label:
                      "Monthly Pace",
                    value: 91,
                  },
                ].map(
                  (item) => (
                    <div
                      key={
                        item.label
                      }
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-black text-slate-500">
                          {
                            item.label
                          }
                        </span>

                        <span className="text-sm font-black text-purple-700">
                          {
                            item.value
                          }
                          %
                        </span>
                      </div>

                      <div className="mt-2 h-3 overflow-hidden rounded-full bg-[#ECEAF3]">
                        <div
                          className="salespulse-gradient h-full rounded-full"
                          style={{
                            width: `${item.value}%`,
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="mt-7 grid grid-cols-3 gap-2">
                {[
                  {
                    icon:
                      Building2,
                    label:
                      "Stores",
                  },
                  {
                    icon: Users,
                    label:
                      "Teams",
                  },
                  {
                    icon: Trophy,
                    label:
                      "Rankings",
                  },
                ].map(
                  (item) => {
                    const Icon =
                      item.icon;

                    return (
                      <div
                        key={
                          item.label
                        }
                        className="rounded-2xl bg-[#F8F7FC] p-3 text-center"
                      >
                        <Icon
                          size={18}
                          className="mx-auto text-purple-600"
                        />

                        <p className="mt-2 text-[9px] font-black uppercase tracking-wide text-slate-400">
                          {
                            item.label
                          }
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-[1] border-y border-white/10 bg-white/[0.035]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-400">
              One Platform
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
              Built for every level
              of the team.
            </h2>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {roles.map(
              (role) => {
                const Icon =
                  role.icon;

                return (
                  <article
                    key={
                      role.title
                    }
                    className="rounded-[28px] border border-white/10 bg-white/[0.055] p-6 transition hover:bg-white/[0.08]"
                  >
                    <div className="salespulse-gradient flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg shadow-purple-500/15">
                      <Icon
                        size={21}
                      />
                    </div>

                    <h3 className="mt-5 text-xl font-black">
                      {
                        role.title
                      }
                    </h3>

                    <p className="mt-3 text-sm font-medium leading-6 text-white/45">
                      {
                        role.description
                      }
                    </p>
                  </article>
                );
              }
            )}
          </div>
        </div>
      </section>

      <section className="relative z-[1] mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-300">
            Stay Focused
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
            Everything needed to
            keep performance moving.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(
            (feature) => {
              const Icon =
                feature.icon;

              return (
                <article
                  key={
                    feature.title
                  }
                  className="rounded-[26px] border border-white/10 bg-white/[0.05] p-5"
                >
                  <Icon
                    size={25}
                    className="text-pink-400"
                  />

                  <h3 className="mt-5 text-lg font-black">
                    {
                      feature.title
                    }
                  </h3>

                  <p className="mt-2 text-sm font-medium leading-6 text-white/45">
                    {
                      feature.description
                    }
                  </p>
                </article>
              );
            }
          )}
        </div>

        <div className="mt-16 rounded-[32px] border border-purple-400/15 bg-gradient-to-r from-purple-600/20 to-pink-500/10 px-5 py-9 text-center sm:px-8 sm:py-12">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Ready to move the
            numbers?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-6 text-white/50 sm:text-base">
            Sign in and see exactly
            where your team stands
            today.
          </p>

          <Link
            href="/login"
            className="salespulse-gradient mt-7 inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl px-7 py-3.5 font-black shadow-lg shadow-purple-500/20"
          >
            Sign In
            <ArrowRight
              size={18}
            />
          </Link>
        </div>
      </section>

      <footer className="relative z-[1] border-t border-white/10 px-4 py-7 text-center text-xs font-bold text-white/25">
        SalesPulse • Retail
        performance, simplified.
      </footer>
    </main>
  );
}
