"use client";

import {
  useState,
} from "react";

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  Menu,
  X,
  LogOut,
  Home,
  ClipboardPenLine,
  Target,
  Trophy,
  Users,
  Settings,
  Zap,
} from "lucide-react";

import {
  createClient,
} from "@/lib/supabase/client";

export default function MobileMenu({
  profile,
}: {
  profile?: any;
}) {
  const [
    open,
    setOpen,
  ] = useState(false);

  const router =
    useRouter();

  const pathname =
    usePathname();

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
      icon: Home,
    },
  ];

  if (
    role === "manager" ||
    role ===
      "regional_manager" ||
    role === "admin"
  ) {
    links.push({
      title: "Daily Update",
      href: "/daily-update",
      icon:
        ClipboardPenLine,
    });
  }

  links.push(
    {
      title: "Goals",
      href: "/goals",
      icon: Target,
    },
    {
      title: "Rankings",
      href: "/leaderboard",
      icon: Trophy,
    },
    {
      title: "Team",
      href: "/team",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    }
  );

  function isActive(
    href: string
  ) {
    if (
      href.includes(
        "/dashboard"
      )
    ) {
      return (
        pathname ===
        href
      );
    }

    return (
      pathname === href ||
      pathname.startsWith(
        `${href}/`
      )
    );
  }

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
    "User";

  return (
    <>
      <button
        onClick={() =>
          setOpen(true)
        }
        aria-label="Open navigation"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white transition active:scale-95"
      >
        <Menu
          size={23}
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-[#080512]/70 backdrop-blur-sm lg:hidden"
          onClick={() =>
            setOpen(false)
          }
        >
          <div
            className="salespulse-dark-gradient absolute bottom-0 left-0 top-0 flex w-[86%] max-w-[330px] flex-col overflow-y-auto border-r border-white/10 p-5 text-white shadow-2xl"
            onClick={(
              event
            ) =>
              event.stopPropagation()
            }
          >
            <div className="mb-7 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="salespulse-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-black shadow-lg shadow-pink-500/20">
                  S
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h2 className="truncate text-xl font-black">
                      SalesPulse
                    </h2>

                    <Zap
                      size={14}
                      className="fill-pink-500 text-pink-500"
                    />
                  </div>

                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-300">
                    Performance
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  setOpen(
                    false
                  )
                }
                aria-label="Close navigation"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white"
              >
                <X
                  size={20}
                />
              </button>
            </div>

            <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <p className="truncate font-black">
                {name}
              </p>

              <p className="mt-1 truncate text-xs font-medium text-white/45">
                {profile?.store
                  ?.name ||
                  "SalesPulse"}
              </p>
            </div>

            <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/35">
              Workspace
            </p>

            <nav className="flex-1 space-y-1.5">
              {links.map(
                (link) => {
                  const Icon =
                    link.icon;

                  const active =
                    isActive(
                      link.href
                    );

                  return (
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
                      className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                        active
                          ? "bg-white text-[#17102F]"
                          : "text-white/65 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon
                        size={
                          19
                        }
                        className={
                          active
                            ? "text-purple-700"
                            : ""
                        }
                      />

                      {
                        link.title
                      }

                      {active && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-pink-500" />
                      )}
                    </Link>
                  );
                }
              )}
            </nav>

            <button
              onClick={
                logout
              }
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 font-bold text-white transition hover:bg-white/15"
            >
              <LogOut
                size={18}
              />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
