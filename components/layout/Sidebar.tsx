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
      title: "Daily Update",
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
    {
      title: "Rankings",
      href: "/leaderboard",
      icon: Trophy,
      show: isManagement,
    },
    {
      title: "Team",
      href: "/team",
      icon: Users,
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

  const visibleItems = items.filter((item) => item.show);

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b border-slate-200 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white">
            <Zap size={21} />
          </div>

          <div>
            <p className="text-lg font-black tracking-tight text-slate-900">
              SalesPulse
            </p>

            <p className="text-xs font-semibold text-slate-500">
              Performance Hub
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {visibleItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                active
                  ? "bg-purple-50 text-purple-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={19} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
