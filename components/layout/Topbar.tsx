"use client";

import { createClient } from "@/lib/supabase/client";
import {
  usePathname,
  useRouter,
} from "next/navigation";
import {
  LogOut,
} from "lucide-react";

import StoreSwitcher from "@/components/stores/StoreSwitcher";

export default function Topbar({
  profile,
}: {
  profile?: any;
}) {
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    const supabase =
      createClient();

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  }

  const name =
    profile?.full_name ||
    profile?.name ||
    profile?.email?.split("@")[0] ||
    "User";

  const role =
    profile?.role || "";

  const stores =
    profile?.stores || [];

  const activeStoreId =
    profile?.store?.id;

  const isRegionalDashboard =
    pathname === "/dashboard/regional";

  const hideStoreSwitcher =
    pathname === "/leaderboard" || pathname === "/all-employees";

  const showStoreSwitcher =
    !hideStoreSwitcher &&
    stores.length > 1 &&
    (
      role === "manager" ||
      (
        role === "regional_manager" &&
        !isRegionalDashboard
      )
    );

  const roleLabel =
    role === "regional_manager"
      ? "District Manager"
      : role === "manager"
        ? "Store Manager"
        : role
          ? role
              .replaceAll("_", " ")
              .replace(/\b\w/g, (char: string) =>
                char.toUpperCase()
              )
          : "";

  const initial =
    name
      .charAt(0)
      .toUpperCase();

  return (
    <header className="hidden border-b border-purple-400/20 bg-[#10091F]/95 px-6 py-3 backdrop-blur-xl lg:block">
      <div className="flex min-h-[58px] items-center justify-between gap-6">
        {/* LEFT */}

        <div className="flex min-w-0 items-center gap-4">
          {showStoreSwitcher && (
            <>
              <div className="flex items-center">
                <span className="text-[16px] font-black uppercase tracking-[0.10em] text-[#D8B4FE]">
                  Viewing Store
                </span>
              </div>

              <div className="h-8 w-px bg-purple-300/25" />

              <StoreSwitcher
                stores={stores}
                activeStoreId={activeStoreId}
              />
            </>
          )}
        </div>

        {/* RIGHT */}

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden text-right md:block">
            <p className="text-[13px] font-black leading-tight text-white">
              {name}
            </p>

            <div className="mt-1 flex items-center justify-end gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />

              <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#C4A6E6]">
                {roleLabel}
              </p>
            </div>
          </div>

          <div className="ml-1 flex h-10 w-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-[#7B22D9] to-[#C38BFF] text-[14px] font-black text-white shadow-[0_6px_18px_rgba(139,0,255,0.22)]">
            {initial}
          </div>

          <button
            type="button"
            onClick={logout}
            aria-label="Sign out"
            title="Sign out"
            className="group flex h-10 w-10 items-center justify-center rounded-[13px] border border-purple-400/30 bg-[#1A102B] text-[#D8B4FE] transition-all duration-200 hover:border-purple-300 hover:bg-purple-500/20 hover:text-white"
          >
            <LogOut
              size={17}
              strokeWidth={2.2}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
