import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 sm:text-4xl">
            Reports
          </h1>

          <p className="mt-2 text-slate-500">
            Review store and employee performance.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-black text-slate-900">
            Performance Reports
          </h2>

          <p className="mt-3 text-slate-500">
            Progress reporting tools are coming next.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
