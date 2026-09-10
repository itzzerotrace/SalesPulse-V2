import Link from "next/link";
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

  return (
    <div className="min-h-screen bg-[#F6F7FB] lg:flex">
      <Sidebar
        profile={profile}
      />

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#120C28]/95 px-4 py-3 text-white shadow-lg shadow-purple-950/10 backdrop-blur-xl lg:hidden">
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
                  <div className="salespulse-gradient flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white shadow-lg shadow-pink-500/20">
                    S
                  </div>

                  <span className="truncate text-xl font-black tracking-tight">
                    SalesPulse
                  </span>
                </div>
              </Link>
            </div>

            <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-pink-500 shadow-[0_0_14px_rgba(247,37,133,0.9)]" />
          </div>

          {role === "manager" &&
            stores.length > 1 && (
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
        </header>

        <Topbar
          profile={profile}
        />

        <main className="mx-auto w-full max-w-[1600px] px-4 pb-10 pt-5 sm:px-6 sm:pb-12 sm:pt-7 lg:px-8 lg:py-8 xl:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
