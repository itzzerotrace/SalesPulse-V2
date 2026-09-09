"use client";

import Link from "next/link";

import {
  Home,
  ClipboardPenLine,
  Target,
  Trophy,
  Users,
  Settings,
} from "lucide-react";

export default function Sidebar({
  profile,
}: {
  profile: any;
}) {
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
    role === "regional_manager" ||
    role === "admin"
  ) {
    navigation.push({
      title: "Daily Update",
      href: "/daily-update",
      icon: ClipboardPenLine,
    });
  }

  navigation.push(
    {
      title: "Goals",
      href: "/goals",
      icon: Target,
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

  return (
    <aside className="hidden min-h-screen w-72 flex-col bg-[#0B0924] p-6 text-white lg:flex">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-xl font-black">
          S
        </div>

        <div>
          <h1 className="text-xl font-black">
            SalesPulse
          </h1>

          <p className="text-xs text-slate-400">
            Performance Tracker
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navigation.map(
          (item) => {
            const Icon =
              item.icon;

            return (
              <Link
                key={
                  item.title
                }
                href={
                  item.href
                }
                className="flex items-center gap-4 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-purple-600 hover:text-white"
              >
                <Icon
                  size={20}
                />

                <span className="font-semibold">
                  {
                    item.title
                  }
                </span>
              </Link>
            );
          }
        )}
      </nav>

      <div className="rounded-2xl bg-white/10 p-4">
        <p className="font-bold">
          {profile?.store
            ?.name ||
            "No Store"}
        </p>

        <p className="text-xs text-slate-400">
          {profile?.store
            ?.city || ""}
        </p>
      </div>
    </aside>
  );
}
