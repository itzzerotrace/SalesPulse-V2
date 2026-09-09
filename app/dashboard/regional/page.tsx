import DashboardLayout from "@/components/layout/DashboardLayout";
import RegionalGoalProgress from "@/components/dashboard/RegionalGoalProgress";
import { getUserProfile } from "@/lib/auth/userProfile";

export default async function RegionalDashboard() {
  const profile =
    await getUserProfile();

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <section>
          <p className="text-sm font-bold text-purple-600">
            REGIONAL DASHBOARD
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
            {profile?.region
              ? `${profile.region} Overview`
              : "Regional Overview"}
          </h1>

          <p className="mt-2 text-slate-500">
            Track store performance
            against monthly goals.
          </p>
        </section>

        <RegionalGoalProgress />
      </div>
    </DashboardLayout>
  );
}
