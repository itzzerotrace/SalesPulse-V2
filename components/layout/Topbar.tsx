"use client";

import { createClient } from "@/lib/supabase/client";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import StoreSwitcher from "@/components/stores/StoreSwitcher";

export default function Topbar({
  profile,
}: {
  profile?: any;
}) {
  const router =
    useRouter();

  const pathname =
    usePathname();

  async function logout() {
    const supabase =
      createClient();

    await supabase.auth.signOut();

    router.push(
      "/login"
    );

    router.refresh();
  }

  const name =
    profile?.full_name ||
    profile?.name ||
    profile?.email?.split(
      "@"
    )[0] ||
    "User";

  const role =
    profile?.role || "";

  const stores =
    profile?.stores || [];

  const activeStoreId =
    profile?.store?.id;

  /*
   * STORE MANAGERS
   * Show Viewing Store when they have
   * more than one assigned store.
   *
   * REGIONAL MANAGERS
   * Show Viewing Store on EVERY page
   * except the Regional Dashboard.
   */
  const isRegionalDashboard =
    pathname ===
    "/dashboard/regional";

  const showStoreSwitcher =
    stores.length > 1 &&
    (
      role === "manager" ||
      (
        role ===
          "regional_manager" &&
        !isRegionalDashboard
      )
    );

  return (
    <header className="hidden min-h-20 border-b bg-white px-8 lg:flex lg:items-center lg:justify-between">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-black text-slate-900">
          SalesPulse
        </h1>

        {showStoreSwitcher && (
          <StoreSwitcher
            stores={
              stores
            }
            activeStoreId={
              activeStoreId
            }
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden text-right md:block">
          <p className="font-bold text-slate-900">
            {name}
          </p>

          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            {role ===
            "regional_manager"
              ? "Regional Manager"
              : role ===
                  "manager"
                ? "Store Manager"
                : role}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-lg font-black text-white shadow-lg shadow-purple-200">
          {name
            .charAt(0)
            .toUpperCase()}
        </div>

        <button
          onClick={
            logout
          }
          aria-label="Logout"
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-xl font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
        >
          ↪
        </button>
      </div>
    </header>
  );
}
