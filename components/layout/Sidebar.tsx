"use client";

import Link from "next/link";
import {
  usePathname,
} from "next/navigation";

import {
  BarChart3,
  Home,
  ClipboardPenLine,
  Target,
  Trophy,
  Users,
  Settings,
  Zap,
} from "lucide-react";

export default function Sidebar({
  profile,
}: {
  profile: any;
}) {
  const pathname =
    usePathname();

  const role =
    profile?.role;

  const dashboardHref =
    role === "admin"
      ? "/admin/dashboard"
      : role === "manager"
        ? "/dashboard/manager"
        : role ===
            "regional_manager"
          ? "/dashboard/regional"
          : "/dashboard/employee";

  const navigation: any[] = [
    {
      title: "Dashboard",
      href: dashboardHref,
      icon: Home,
    },
  ];

  if (
    role === "manager" ||
    role ===
      "regional_manager" ||
    role === "admin"
  ) {
    navigation.push({
      title: "Daily Update",
      href: "/daily-update",
      icon:
        ClipboardPenLine,
    });
  }

  navigation.push(
    {
      title: "Goals",
      href: "/goals",
      icon: Target,
    },
    {
      title: "Team Overview",
      href: "/team-overview",
      icon: BarChart3,
    },
    {
      title: "Rankings",
      href: "/leaderboard",
      icon: Trophy,
    },
    {
      title: "Team",
      href: "/team",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    }
  );

  function isActive(
    href: string
  ) {
    if (
      href.includes(
        "/dashboard"
      )
    ) {
      return (
        pathname ===
        href
      );
    }

    return (
      pathname === href ||
      pathname.startsWith(
        `${href}/`
      )
    );
  }

  const roleLabel =
    String(role || "")
      .replaceAll("_", " ")
      .replace(
        /\b\w/g,
        (letter) =>
          letter.toUpperCase()
      );

  return (
    <aside className="salespulse-dark-gradient sticky top-0 hidden h-screen w-[286px] shrink-0 flex-col overflow-hidden border-r border-white/5 px-5 py-6 text-white lg:flex">
      <div className="pointer-events-none absolute -left-24 top-40 h-52 w-52 rounded-full bg-purple-600/10 blur-3xl" />

      <Link
        href={dashboardHref}
        aria-label="Go to dashboard"
        className="relative mb-8 flex items-center gap-3 rounded-2xl px-2 py-1 transition hover:bg-white/[0.05]"
      >
        <div className="salespulse-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl font-black shadow-xl shadow-pink-500/20">
          S
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-xl font-black tracking-tight">
              SalesPulse
            </h1>

            <Zap
              size={15}
              className="fill-pink-500 text-pink-500"
            />
          </div>

          <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-purple-300">
            Performance
          </p>
        </div>
      </Link>

      <div className="mb-3 px-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
        Workspace
      </div>

      <nav className="relative flex-1 space-y-1.5">
        {navigation.map(
          (item) => {
            const Icon =
              item.icon;

            const active =
              isActive(
                item.href
              );

            return (
              <Link
                key={
                  item.title
                }
                href={
                  item.href
                }
                className={`group relative flex min-h-12 items-center gap-3.5 overflow-hidden rounded-2xl px-4 py-3 transition-all ${
                  active
                    ? "bg-white text-[#17102F] shadow-xl shadow-black/15"
                    : "text-white/65 hover:bg-white/8 hover:text-white"
                }`}
              >
                {active && (
                  <span className="salespulse-gradient absolute bottom-2 left-0 top-2 w-1 rounded-r-full" />
                )}

                <Icon
                  size={20}
                  strokeWidth={
                    active
                      ? 2.7
                      : 2
                  }
                  className={
                    active
                      ? "text-purple-700"
                      : "transition group-hover:text-pink-300"
                  }
                />

                <span className="text-sm font-bold">
                  {
                    item.title
                  }
                </span>

                {active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-pink-500" />
                )}
              </Link>
            );
          }
        )}
      </nav>

      <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
        <div className="absolute -right-7 -top-8 h-20 w-20 rounded-full bg-pink-500/15 blur-2xl" />

        <div className="relative">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-300">
            Active Store
          </p>

          <p className="mt-2 truncate text-base font-black">
            {profile?.store
              ?.name ||
              "No Store"}
          </p>

          {profile?.store
            ?.city && (
            <p className="mt-1 truncate text-xs font-medium text-white/45">
              {
                profile
                  .store.city
              }
            </p>
          )}

          {roleLabel && (
            <div className="mt-4 inline-flex rounded-full border border-pink-400/20 bg-pink-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-pink-300">
              {roleLabel}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
