"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

import StoreSwitcher from "@/components/stores/StoreSwitcher";

export default function Topbar({
  profile,
}: {
  profile?: any;
}) {
  const router = useRouter();

  async function logout() {
    const supabase = createClient();

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
    profile?.role ||
    "";

  const stores =
    profile?.stores ||
    [];

  const activeStoreId =
    profile?.store?.id;

  return (
    <header className="hidden min-h-20 border-b bg-white px-8 lg:flex lg:items-center lg:justify-between">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-black text-slate-900">
          SalesPulse
        </h1>

        {role === "manager" && (
          <StoreSwitcher
            stores={stores}
            activeStoreId={activeStoreId}
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden text-right md:block">
          <p className="font-bold text-slate-900">
            {name}
          </p>

          <p className="text-xs capitalize text-slate-500">
            {role}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-lg font-black text-purple-700">
          {name.charAt(0).toUpperCase()}
        </div>

        <button
          onClick={logout}
          className="rounded-xl bg-slate-900 px-5 py-2 text-sm font-bold text-white hover:bg-slate-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
