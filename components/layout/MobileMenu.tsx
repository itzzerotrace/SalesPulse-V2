"use client";

import {
  useState,
} from "react";
import Link from "next/link";
import {
  Menu,
  X,
  LogOut,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function MobileMenu({
  profile,
}: {
  profile?: any;
}) {
  const [open, setOpen] =
    useState(false);

  const router =
    useRouter();

  const role =
    profile?.role;

  const dashboardHref =
    role === "admin"
      ? "/admin/dashboard"
      : role === "manager"
        ? "/dashboard/manager"
        : role ===
            "regional_manager"
          ? "/dashboard/regional"
          : "/dashboard/employee";

  const links: any[] = [
    {
      title: "Dashboard",
      href: dashboardHref,
    },
  ];

  if (
    role === "manager" ||
    role === "regional_manager" ||
    role === "admin"
  ) {
    links.push({
      title:
        "Daily Update",
      href:
        "/daily-update",
    });
  }

  links.push(
    {
      title: "Goals",
      href: "/goals",
    },
    {
      title: "Rankings",
      href:
        "/leaderboard",
    },
    {
      title: "Team",
      href: "/team",
    },
    {
      title: "Reports",
      href: "/reports",
    },
    {
      title: "Settings",
      href: "/settings",
    }
  );

  async function logout() {
    const supabase =
      createClient();

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() =>
          setOpen(true)
        }
        className="rounded-xl p-3 text-slate-900 hover:bg-slate-100 lg:hidden"
      >
        <Menu size={26} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <div className="absolute left-0 top-0 h-full w-72 overflow-y-auto bg-white p-6 shadow-xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  SalesPulse
                </h2>

                <p className="text-xs font-semibold text-slate-500">
                  Performance Tracker
                </p>
              </div>

              <button
                onClick={() =>
                  setOpen(
                    false
                  )
                }
                className="rounded-xl p-2 text-slate-900"
              >
                <X />
              </button>
            </div>

            <div className="space-y-2">
              {links.map(
                (link) => (
                  <Link
                    key={
                      link.title
                    }
                    href={
                      link.href
                    }
                    onClick={() =>
                      setOpen(
                        false
                      )
                    }
                    className="block rounded-xl px-4 py-3 font-bold text-slate-900 hover:bg-purple-100"
                  >
                    {
                      link.title
                    }
                  </Link>
                )
              )}

              <button
                onClick={
                  logout
                }
                className="mt-6 flex w-full items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 font-bold text-white"
              >
                <LogOut
                  size={18}
                />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
