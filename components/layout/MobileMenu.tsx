"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  createPortal,
} from "react-dom";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  ClipboardPenLine,
  BarChart3,
  Home,
  LogOut,
  Menu,
  Settings,
  Target,
  Trophy,
  Users,
  X,
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

  const [
    mounted,
    setMounted,
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

  const links = [
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
      title: "Team Overview",
      href: "/team-overview",
      icon: BarChart3,
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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style
        .overflow;

    document.body.style.overflow =
      "hidden";

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (
        event.key ===
        "Escape"
      ) {
        setOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open]);

  function isActive(
    href: string
  ) {
    if (
      href.includes(
        "/dashboard"
      )
    ) {
      return (
        pathname === href
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
    setOpen(false);

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

  const storeName =
    profile?.store?.name ||
    "SalesPulse";

  const menuDrawer =
    open ? (
      <div
        className="fixed inset-0 z-[100] lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() =>
            setOpen(false)
          }
          className="absolute inset-0 bg-[#080512]/80 backdrop-blur-sm"
        />

        <aside className="salespulse-dark-gradient absolute inset-y-0 left-0 flex h-[100dvh] w-[88vw] max-w-[340px] flex-col overflow-hidden border-r border-white/10 text-white shadow-[24px_0_80px_rgba(0,0,0,0.4)]">
          <div className="shrink-0 border-b border-white/10 px-5 pb-5 pt-[max(1.25rem,env(safe-area-inset-top))]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="salespulse-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-black shadow-lg shadow-pink-500/20">
                  S
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h2 className="truncate text-xl font-black tracking-tight">
                      SalesPulse
                    </h2>

                    <Zap
                      size={14}
                      className="fill-pink-500 text-pink-500"
                    />
                  </div>

                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-purple-300">
                    Performance
                    Platform
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                aria-label="Close navigation"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition active:scale-95"
              >
                <X
                  size={20}
                />
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <p className="truncate text-sm font-black">
                {name}
              </p>

              <p className="mt-1 truncate text-xs font-semibold text-white/45">
                {storeName}
              </p>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5">
            <p className="mb-2 px-3 text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
              Workspace
            </p>

            <nav className="space-y-1.5">
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
                      className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition active:scale-[0.98] ${
                        active
                          ? "bg-white text-[#17102F] shadow-lg"
                          : "text-white/65 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon
                        size={19}
                        className={
                          active
                            ? "text-purple-700"
                            : ""
                        }
                      />

                      <span className="min-w-0 flex-1 truncate">
                        {
                          link.title
                        }
                      </span>

                      {active && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(247,37,133,0.8)]" />
                      )}
                    </Link>
                  );
                }
              )}
            </nav>
          </div>

          <div className="shrink-0 border-t border-white/10 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
            <button
              type="button"
              onClick={logout}
              className="flex min-h-12 w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm font-black text-white transition hover:bg-white/10 active:scale-[0.98]"
            >
              <LogOut
                size={18}
              />
              Sign Out
            </button>
          </div>
        </aside>
      </div>
    ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() =>
          setOpen(true)
        }
        aria-label="Open navigation"
        aria-expanded={open}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white transition active:scale-95"
      >
        <Menu
          size={23}
        />
      </button>

      {mounted &&
        menuDrawer &&
        createPortal(
          menuDrawer,
          document.body
        )}
    </>
  );
}
