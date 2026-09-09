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
    profile?.role ||
    "";

  const stores =
    profile?.stores ||
    [];

  const activeStoreId =
    profile?.store?.id;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar profile={profile} />

      <div className="min-w-0 flex-1">
        <header className="border-b bg-white px-4 py-3 lg:hidden">
          <div className="flex items-center">
            <MobileMenu profile={profile} />

            <div className="ml-3 text-xl font-black text-slate-900">
              SalesPulse
            </div>
          </div>

          {role === "manager" && stores.length > 1 && (
            <div className="mt-3">
              <StoreSwitcher
                stores={stores}
                activeStoreId={activeStoreId}
              />
            </div>
          )}
        </header>

        <Topbar profile={profile} />

        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
