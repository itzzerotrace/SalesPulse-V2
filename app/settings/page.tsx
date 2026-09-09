import DashboardLayout from "@/components/layout/DashboardLayout";
import LogoutButton from "@/components/auth/LogoutButton";
import SettingsCard from "@/components/settings/SettingsCard";
import ProfileSettings from "@/components/settings/ProfileSettings";
import Preferences from "@/components/settings/Preferences";
import { getUserProfile } from "@/lib/auth/userProfile";

export default async function SettingsPage() {
  const profile = await getUserProfile();

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
            Settings
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Manage your SalesPulse profile and preferences.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          <SettingsCard title="Profile">
            <ProfileSettings
              name={profile?.name || "User"}
              email={profile?.email || ""}
              role={profile?.role || ""}
              store={profile?.store?.name || ""}
              city={profile?.city || ""}
            />
          </SettingsCard>

          <SettingsCard title="Preferences">
            <Preferences />
          </SettingsCard>

          <SettingsCard title="Account Access">
            <div className="space-y-4">
              <p className="text-sm text-slate-500 sm:text-base">
                Sign out of your SalesPulse account on this device.
              </p>

              <LogoutButton />
            </div>
          </SettingsCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
