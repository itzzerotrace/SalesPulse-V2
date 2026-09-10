import {
  Bell,
  LogOut,
  Settings,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import DashboardLayout from "@/components/layout/DashboardLayout";
import LogoutButton from "@/components/auth/LogoutButton";
import SettingsCard from "@/components/settings/SettingsCard";
import ProfileSettings from "@/components/settings/ProfileSettings";
import Preferences from "@/components/settings/Preferences";

import {
  getUserProfile,
} from "@/lib/auth/userProfile";

function formatRole(
  role?: string
) {
  if (!role) {
    return "SalesPulse User";
  }

  return role
    .split("_")
    .map(
      (word) =>
        word
          .charAt(0)
          .toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}

export default async function SettingsPage() {
  const profile =
    await getUserProfile();

  const firstName =
    profile?.name
      ?.split(" ")[0] ||
    "there";

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <section className="salespulse-dark-gradient relative overflow-hidden rounded-[30px] px-5 py-6 text-white shadow-[0_24px_70px_rgba(23,16,47,0.18)] sm:px-8 sm:py-8 lg:px-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-pink-500/15 blur-3xl" />

          <div className="relative grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-pink-300">
                <Sparkles
                  size={13}
                />
                Account
              </span>

              <h1 className="mt-5 text-3xl font-black tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                Your SalesPulse,
                <span className="text-pink-400">
                  {" "}
                  {firstName}.
                </span>
              </h1>

              <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-white/55 sm:text-base">
                Review your
                account, active
                store, role, and
                application
                preferences.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
                <ShieldCheck
                  size={19}
                  className="text-purple-300"
                />

                <p className="mt-4 truncate text-base font-black sm:text-lg">
                  {formatRole(
                    profile?.role
                  )}
                </p>

                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.15em] text-white/40">
                  Account Role
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
                <Settings
                  size={19}
                  className="text-pink-300"
                />

                <p className="mt-4 truncate text-base font-black sm:text-lg">
                  {profile?.store
                    ?.name ||
                    "No Store"}
                </p>

                <p className="mt-1 text-[9px] font-black uppercase tracking-[0.15em] text-white/40">
                  Active Store
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          <SettingsCard
            title="Profile"
            description="Your SalesPulse account information."
            icon={
              <UserRound
                size={20}
              />
            }
          >
            <ProfileSettings
              name={
                profile?.name ||
                "User"
              }
              email={
                profile?.email ||
                ""
              }
              role={
                profile?.role ||
                ""
              }
              store={
                profile?.store
                  ?.name ||
                ""
              }
              city={
                profile?.city ||
                ""
              }
            />
          </SettingsCard>

          <SettingsCard
            title="Preferences"
            description="Control how SalesPulse behaves for you."
            icon={
              <Bell
                size={20}
              />
            }
          >
            <Preferences />
          </SettingsCard>

          <SettingsCard
            title="Account Access"
            description="Manage access to your SalesPulse session."
            icon={
              <LogOut
                size={20}
              />
            }
          >
            <div className="rounded-2xl border border-slate-100 bg-[#F8F7FC] p-4">
              <p className="text-sm font-black text-[#17102F]">
                Sign out of this
                device
              </p>

              <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                You will need to
                sign in again to
                access your
                SalesPulse
                dashboard.
              </p>

              <div className="mt-4">
                <LogoutButton />
              </div>
            </div>
          </SettingsCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
