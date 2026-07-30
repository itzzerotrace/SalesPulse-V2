import {
  BarChart3,
  Users,
  Trophy,
  Store,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      <header className="border-b bg-white px-8 py-5">

        <h1 className="text-2xl font-black text-slate-900">
          SalesPulse Dashboard
        </h1>

        <p className="text-slate-500">
          Performance overview
        </p>

      </header>


      <section className="grid gap-6 p-8 md:grid-cols-4">


        {[
          ["Sales Performance", BarChart3],
          ["Employees", Users],
          ["Rankings", Trophy],
          ["Stores", Store],
        ].map(([title, Icon]) => {

          const Component = Icon as any;

          return (
            <div
              key={title as string}
              className="rounded-3xl border bg-white p-8 shadow-sm"
            >

              <Component className="mb-5 text-purple-600"/>

              <h2 className="font-bold text-lg">
                {title as string}
              </h2>

              <p className="mt-2 text-slate-500">
                Coming soon
              </p>

            </div>
          );

        })}


      </section>


    </main>
  );
}
