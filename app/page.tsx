import Link from "next/link";
import {
  BarChart3,
  Users,
  Target,
  Trophy,
  Store,
  UserRound,
  Map,
} from "lucide-react";

const roles = [
  {
    title: "Sales Representatives",
    description:
      "Track your personal sales, goals, progress, and performance.",
    icon: UserRound,
  },
  {
    title: "Store Managers",
    description:
      "Coach your team, monitor results, and improve store performance.",
    icon: Store,
  },
  {
    title: "Regional Leaders",
    description:
      "Compare locations and understand performance across your region.",
    icon: Map,
  },
];

const features = [
  {
    title: "Sales Performance",
    description:
      "Track GP, Voice, HSI, BTS, accessories, and key metrics.",
    icon: BarChart3,
  },
  {
    title: "Employee Goals",
    description:
      "Keep every team member aligned with clear objectives.",
    icon: Target,
  },
  {
    title: "Team Rankings",
    description:
      "Create visibility and motivate better performance.",
    icon: Trophy,
  },
  {
    title: "Store Insights",
    description:
      "Give leaders visibility across every location.",
    icon: Users,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-600 text-xl font-bold text-white">
              S
            </div>

            <div>
              <h1 className="text-xl font-bold">
                SalesPulse
              </h1>

              <p className="text-sm text-slate-500">
                Wireless Retail Performance Platform
              </p>
            </div>
          </div>


          <div className="flex gap-3">

            <Link
              href="/login"
              className="rounded-xl border border-slate-300 px-6 py-3 font-semibold"
            >
              Sign In
            </Link>

            <Link
              href="/login"
              className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white"
            >
              Get Started
            </Link>

          </div>

        </div>
      </header>



      {/* Hero */}
      <section className="mx-auto max-w-5xl px-8 py-28 text-center">

        <div className="inline-flex rounded-full bg-purple-100 px-5 py-2 text-sm font-semibold text-purple-700">
          Built for Metro by T-Mobile Retail Teams
        </div>


        <h2 className="mt-8 text-6xl font-black tracking-tight">

          One platform.
          <span className="block text-purple-600">
            Every sales team.
          </span>

        </h2>


        <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-600">
          SalesPulse connects sales representatives, store managers,
          and regional leaders with the performance insights they need
          to improve every day.
        </p>


        <div className="mt-10 flex justify-center gap-4">

          <Link
            href="/login"
            className="rounded-xl bg-purple-600 px-8 py-4 font-bold text-white shadow-lg"
          >
            Get Started
          </Link>


          <Link
            href="/login"
            className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-bold"
          >
            Sign In
          </Link>

        </div>

      </section>



      {/* Roles */}
      <section className="mx-auto max-w-7xl px-8 pb-20">

        <h2 className="mb-10 text-center text-4xl font-black">
          Built for every level of retail
        </h2>


        <div className="grid gap-6 md:grid-cols-3">

          {roles.map((role) => {

            const Icon = role.icon;

            return (
              <div
                key={role.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
              >

                <Icon className="mb-5 text-purple-600" size={36}/>

                <h3 className="text-xl font-bold">
                  {role.title}
                </h3>

                <p className="mt-3 text-slate-600">
                  {role.description}
                </p>

              </div>
            );

          })}

        </div>

      </section>




      {/* Features */}
      <section className="mx-auto max-w-7xl px-8 pb-24">

        <h2 className="mb-10 text-center text-4xl font-black">
          Everything teams need to perform
        </h2>


        <div className="grid gap-6 md:grid-cols-4">

          {features.map((feature)=>{

            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-7"
              >

                <Icon
                  className="mb-5 text-purple-600"
                  size={32}
                />

                <h3 className="font-bold text-lg">
                  {feature.title}
                </h3>

                <p className="mt-3 text-slate-600">
                  {feature.description}
                </p>

              </div>
            );

          })}

        </div>

      </section>

    </main>
  );
}