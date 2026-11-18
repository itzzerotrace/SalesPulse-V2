"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Home,
  ClipboardPenLine,
  Target,
  Trophy,
  Users,
  Settings,
  Zap,
  UserRoundSearch,
} from "lucide-react";

type SidebarProps = {
  profile: any;
};

export default function Sidebar({ profile }: SidebarProps) {
  const pathname = usePathname();
  const role = profile?.role;

  const isManagement =
    role === "admin" ||
    role === "manager" ||
    role === "regional_manager";

  const isRegionalManager =
    role === "regional_manager";

  const items = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      show: true,
    },
    {
      title: "Need Per Day",
      href: "/daily-update",
      icon: ClipboardPenLine,
      show: isManagement,
    },
    {
      title: "Store Goals",
      href: "/goals",
      icon: Target,
      show: isManagement,
    },
    {
      title: "Team Overview",
      href: "/team-overview",
      icon: BarChart3,
      show: isManagement,
    },
    // Team remains accessible at /team, but is hidden from sidebar navigation.
    {
      title: "Team",
      href: "/team",
      icon: Users,
      show: false,
    },
    {
      title: "Rankings",
      href: "/leaderboard",
      icon: Trophy,
      show: isManagement,
    },
    {
      title: "All Employees",
      href: "/all-employees",
      icon: UserRoundSearch,
      show: isRegionalManager,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      show: true,
    },
  ];

  const visibleItems = items.filter(
    (item) => item.show
  );

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 bg-[#0B0614] text-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7B22D9] to-[#C38BFF] text-white shadow-lg shadow-purple-500/20">
            <Zap size={21} />
          </div>

          <div>
            <p className="text-lg font-black tracking-tight text-white">
              SalesPulse
            </p>

            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-white/70">
              Performance
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-2 pt-6">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
          Workspace
        </p>
      </div>

      <nav className="flex-1 space-y-1.5 px-4 py-2">
        {visibleItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (
              item.href !== "/dashboard" &&
              pathname.startsWith(
                `${item.href}/`
              )
            );

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                active
                  ? "bg-[#A855F7] text-white shadow-lg shadow-purple-500/30"
                  : "text-[#D8B4FE]/75 hover:bg-purple-500/15 hover:text-white"
              }`}
            >
              <Icon
                size={19}
                className={
                  active
                    ? "text-white"
                    : "text-purple-200/70 transition group-hover:text-purple-200"
                }
              />

              <span>{item.title}</span>

              {active && (
                <span className="ml-auto h-2 w-2 rounded-full bg-white" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 pb-6">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
      </div>
    </aside>
  );
}
