import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminGoalAnalytics from "@/components/admin/AdminGoalAnalytics";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase =
    await createClient();

  const [
    usersResult,
    pendingResult,
    storesResult,
    regionsResult,
    storeListResult,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("id", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("profiles")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("status", "pending"),

    supabase
      .from("stores")
      .select("id", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("regions")
      .select("id", {
        count: "exact",
        head: true,
      }),

    supabase
      .from("stores")
      .select("id,name,city")
      .order("name"),
  ]);

  const metrics = [
    {
      label: "Total Users",
      value:
        usersResult.count ?? 0,
      subtitle:
        "Employees and leaders",
    },
    {
      label:
        "Pending Approvals",
      value:
        pendingResult.count ?? 0,
      subtitle: "Needs review",
    },
    {
      label:
        "Active Stores",
      value:
        storesResult.count ?? 0,
      subtitle: "Locations",
    },
    {
      label: "Regions",
      value:
        regionsResult.count ?? 0,
      subtitle:
        "Company coverage",
    },
  ];

  const stores =
    storeListResult.data || [];

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <section>
          <p className="text-sm font-bold text-purple-600">
            ADMIN CENTER
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
            SalesPulse Command Center
          </h1>

          <p className="mt-2 text-slate-500">
            Manage users, stores,
            permissions, and performance.
          </p>
        </section>

        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {metrics.map(
            (metric) => (
              <div
                key={
                  metric.label
                }
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-bold text-slate-500">
                  {metric.label}
                </p>

                <p className="mt-2 text-3xl font-black text-slate-900">
                  {metric.value}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {
                    metric.subtitle
                  }
                </p>
              </div>
            )
          )}
        </section>

        <AdminGoalAnalytics />

        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  User Management
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Review users and account
                  approvals.
                </p>
              </div>

              <Link
                href="/admin/users"
                className="rounded-xl bg-purple-600 px-5 py-3 text-center font-bold text-white"
              >
                Manage Users
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Store Management
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Manage company locations.
                </p>
              </div>

              <Link
                href="/admin/stores"
                className="rounded-xl bg-purple-600 px-5 py-3 text-center font-bold text-white"
              >
                Manage Stores
              </Link>
            </div>

            {stores.length > 0 && (
              <div className="mt-6 space-y-3">
                {stores.map(
                  (store: any) => (
                    <div
                      key={
                        store.id
                      }
                      className="rounded-2xl bg-slate-50 p-4"
                    >
                      <p className="font-black text-slate-900">
                        {
                          store.name
                        }
                      </p>

                      {store.city && (
                        <p className="mt-1 text-sm text-slate-500">
                          {
                            store.city
                          }
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
