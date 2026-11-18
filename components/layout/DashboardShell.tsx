"use client";

import Link from "next/link";
import { Home, Target, ClipboardPenLine, Trophy, Settings, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileMenu from "./MobileMenu";

import StoreSwitcher from "@/components/stores/StoreSwitcher";

export default function DashboardShell({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile?: any;
}) {
  const pathname = usePathname();

  const role =
    profile?.role || "";

  const stores =
    profile?.stores || [];

  const activeStoreId =
    profile?.store?.id;

  const dashboardHref =
    role === "admin"
      ? "/admin/dashboard"
      : role === "manager"
        ? "/dashboard/manager"
        : role === "regional_manager"
          ? "/dashboard/regional"
          : "/dashboard/employee";

  const isManagement = role === "admin" || role === "manager" || role === "regional_manager";
  const mobileTabs = [
    { title: "Home", href: dashboardHref, icon: Home },
    { title: "Daily", href: "/daily-update", icon: ClipboardPenLine },
    ...(isManagement ? [{ title: "Goals", href: "/goals", icon: Target }, { title: "Ranker", href: "/leaderboard", icon: Trophy }] : []),
    { title: "Settings", href: "/settings", icon: Settings },
  ];
  const mobilePageName = pathname.startsWith("/dashboard") ? "Overview" :
    pathname.startsWith("/daily-update") ? "Need Per Day" :
    pathname.startsWith("/goals") ? "Store Goals" :
    pathname.startsWith("/leaderboard") ? "Rep Ranker" :
    pathname.startsWith("/team-overview") ? "Team Overview" :
    pathname.startsWith("/all-employees") ? "All Employees" :
    pathname.startsWith("/settings") ? "Settings" : "SalesPulse";

  return (
    <div className="salespulse-app min-h-screen lg:flex">
      <Sidebar
        profile={profile}
      />

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 border-b border-violet-300/15 bg-[#10091F]/95 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] text-white shadow-[0_8px_30px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:hidden">
          <div className="flex min-h-12 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <MobileMenu
                profile={profile}
              />

              <Link
                href={dashboardHref}
                aria-label="Go to dashboard"
                className="min-w-0 rounded-xl transition active:scale-[0.98]"
              >
                <div className="flex items-center gap-2">
                  <div className="salespulse-gradient flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white shadow-lg shadow-purple-500/20">
                    S
                  </div>

                  <span className="truncate text-lg font-black tracking-tight">
                    SalesPulse
                  </span>
                </div>
              </Link>
            </div>

            <div className="min-w-0 text-right">
              <p className="max-w-[130px] truncate text-[11px] font-bold text-violet-200">{profile?.full_name || "Welcome"}</p>
              <p className="text-[10px] font-semibold text-violet-400">{role === "regional_manager" ? "District Manager" : role === "manager" ? "Store Manager" : role === "employee" ? "Sales Rep" : "SalesPulse"}</p>
            </div>
          </div>

          {(role === "manager" ||
              role === "regional_manager") &&
            stores.length > 1 &&
            pathname !== "/leaderboard" &&
            pathname !== "/all-employees" && (
              <div className="mt-3 border-t border-white/10 pt-3">
                <StoreSwitcher
                  stores={
                    stores
                  }
                  activeStoreId={
                    activeStoreId
                  }
                />
              </div>
            )}
          <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3 text-xs font-semibold text-violet-300">
            <span className="text-violet-400">Workspace</span>
            <ChevronRight size={13} />
            <span className="text-white">{mobilePageName}</span>
          </div>
        </header>

        <Topbar
          profile={profile}
        />

        <main className="mx-auto w-full max-w-[1600px] min-w-0 px-3 pb-28 pt-4 sm:px-6 sm:pb-12 sm:pt-7 lg:px-8 lg:py-8 xl:px-10">
          {children}
        </main>
        <nav aria-label="Mobile primary navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-violet-300/20 bg-[#10091F]/95 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:hidden">
          <div className="mx-auto flex max-w-lg items-stretch justify-around gap-1">
            {mobileTabs.map(({ title, href, icon: Icon }) => {
              const active = pathname === href || (href !== dashboardHref && pathname.startsWith(href + "/")) || (href === dashboardHref && pathname.startsWith("/dashboard"));
              return (
                <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`flex min-h-[54px] min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[10px] font-bold transition-colors ${active ? "bg-violet-500/20 text-white" : "text-violet-300/75 active:bg-violet-500/15"}`}>
                  <Icon size={21} strokeWidth={active ? 2.7 : 2} className={active ? "text-[#C38BFF]" : ""} />
                  <span className="truncate">{title}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
