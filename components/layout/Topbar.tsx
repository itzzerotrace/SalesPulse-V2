"use client";

import {
  createClient,
} from "@/lib/supabase/client";

import {
  useRouter,
} from "next/navigation";

import {
  LogOut,
  Sparkles,
} from "lucide-react";

import StoreSwitcher from "@/components/stores/StoreSwitcher";

export default function Topbar({
  profile,
}: {
  profile?: any;
}) {
  const router =
    useRouter();

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

  const roleLabel =
    String(role)
      .replaceAll("_", " ")
      .replace(
        /\b\w/g,
        (letter) =>
          letter.toUpperCase()
      );

  return (
    <header className="sticky top-0 z-20 hidden min-h-[84px] border-b border-slate-200/80 bg-white/90 px-8 backdrop-blur-xl lg:flex lg:items-center lg:justify-between">
      <div className="flex min-w-0 items-center gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles
              size={17}
              className="text-pink-500"
            />

            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-purple-600">
              SalesPulse
            </p>
          </div>

          <p className="mt-1 text-sm font-bold text-slate-500">
            {profile?.store
              ?.name ||
              "Performance Center"}
          </p>
        </div>

        {role ===
          "manager" &&
          stores.length >
            1 && (
            <>
              <div className="h-9 w-px bg-slate-200" />

              <StoreSwitcher
                stores={
                  stores
                }
                activeStoreId={
                  activeStoreId
                }
              />
            </>
          )}
      </div>

      <div className="flex items-center gap-3">
        <div className="mr-1 text-right">
          <p className="max-w-[220px] truncate text-sm font-black text-slate-900">
            {name}
          </p>

          <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {roleLabel}
          </p>
        </div>

        <div className="salespulse-gradient flex h-11 w-11 items-center justify-center rounded-2xl text-base font-black text-white shadow-lg shadow-purple-500/20">
          {name
            .charAt(0)
            .toUpperCase()}
        </div>

        <button
          onClick={logout}
          aria-label="Logout"
          title="Logout"
          className="ml-1 flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600"
        >
          <LogOut
            size={18}
          />
        </button>
      </div>
    </header>
  );
}
