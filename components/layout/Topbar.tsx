"use client";

import { createClient } from "@/lib/supabase/client";
import {
  usePathname,
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

  const showStoreSwitcher =
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
      ? "Regional Manager"
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
    <header className="hidden border-b border-[#EEE9F2] bg-white/95 px-6 py-3 backdrop-blur-xl lg:block">
      <div className="flex min-h-[58px] items-center justify-between gap-6">
        {/* LEFT */}

        <div className="flex min-w-0 items-center gap-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#F3E8FF] text-[#8B00FF]">
              <Sparkles
                size={19}
                strokeWidth={2.5}
              />
            </div>

            <div>
              <h1 className="text-[21px] font-black tracking-[-0.035em] text-[#201722]">
                SalesPulse
              </h1>

              <div className="mt-[2px] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8B00FF]" />

                <span className="text-[8px] font-black uppercase tracking-[0.18em] text-[#8B00FF]">
                  Performance
                </span>
              </div>
            </div>
          </div>

          {showStoreSwitcher && (
            <>
              <div className="h-8 w-px bg-[#ECE5F0]" />

              <StoreSwitcher
                stores={stores}
                activeStoreId={
                  activeStoreId
                }
              />
            </>
          )}
        </div>

        {/* RIGHT */}

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden text-right md:block">
            <p className="text-[13px] font-black leading-tight text-[#201722]">
              {name}
            </p>

            <div className="mt-1 flex items-center justify-end gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B00FF]" />

              <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[#776B7B]">
                {roleLabel}
              </p>
            </div>
          </div>

          <div className="ml-1 flex h-10 w-10 items-center justify-center rounded-[13px] bg-gradient-to-br from-[#8B00FF] to-[#A855F7] text-[14px] font-black text-white shadow-[0_6px_18px_rgba(139,0,255,0.22)]">
            {initial}
          </div>

          <button
            type="button"
            onClick={logout}
            aria-label="Sign out"
            title="Sign out"
            className="group flex h-10 w-10 items-center justify-center rounded-[13px] border border-[#E7DFEA] bg-white text-[#756A79] transition-all duration-200 hover:border-[#D8C5E5] hover:bg-[#F8F2FC] hover:text-[#8B00FF]"
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
