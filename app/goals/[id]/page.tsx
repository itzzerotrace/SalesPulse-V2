import {
  ArrowLeft,
  CircleDollarSign,
  Headphones,
  RadioTower,
  RefreshCcw,
  Save,
  Smartphone,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Wifi,
} from "lucide-react";

import Link from "next/link";
import { notFound } from "next/navigation";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { createClient } from "@/lib/supabase/server";
import { getActiveStore } from "@/lib/stores/activeStore";
import {
  getCaliforniaDate,
  getMonthInfo,
} from "@/lib/progress/date";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function EmployeeGoalsPage({
  params,
}: {
  params:
    | { id: string }
    | Promise<{ id: string }>;
}) {
  const resolvedParams =
    await Promise.resolve(params);

  const employeeId =
    resolvedParams.id;

  const supabase =
    await createClient();

  const activeStore =
    await getActiveStore();

  if (!activeStore?.id) {
    notFound();
  }

  const date =
    getCaliforniaDate();

  const {
    monthName,
    year,
  } = getMonthInfo(date);

  const [
    registeredResult,
    pendingResult,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select(
        "id,first_name,last_name,role,store_id,approved"
      )
      .eq("id", employeeId)
      .eq("store_id", activeStore.id)
      .eq("role", "employee")
      .eq("approved", true)
      .maybeSingle(),

    supabase
      .from("pending_employees")
      .select(`
        id,
        full_name,
        email,
        role,
        store_id,
        status,
        gp_goal,
        voice_goal,
        mim_goal,
        upgrade_goal,
        hsi_goal,
        bts_goal,
        accessory_goal,
        features_goal
      `)
      .eq("id", employeeId)
      .eq("store_id", activeStore.id)
      .eq("status", "not_registered")
      .maybeSingle(),
  ]);

  if (registeredResult.error) {
    console.error(
      "REGISTERED EMPLOYEE GOAL PROFILE ERROR:",
      registeredResult.error
    );
  }

  if (pendingResult.error) {
    console.error(
      "PENDING EMPLOYEE GOAL PROFILE ERROR:",
      pendingResult.error
    );
  }

  const registeredEmployee =
    registeredResult.data;

  const pendingEmployee =
    pendingResult.data;

  if (
    !registeredEmployee &&
    !pendingEmployee
  ) {
    notFound();
  }

  const registered =
    Boolean(registeredEmployee);

  const employeeName =
    registeredEmployee
      ? [
          registeredEmployee.first_name,
          registeredEmployee.last_name,
        ]
          .filter(Boolean)
          .join(" ")
      : pendingEmployee?.full_name ||
        "Employee";

  let goal: any =
    pendingEmployee || {};

  if (registeredEmployee) {
    const {
      data: goalData,
      error: goalError,
    } = await supabase
      .from("employee_goals")
      .select("*")
      .eq(
        "employee_id",
        employeeId
      )
      .eq(
        "month",
        monthName
      )
      .eq(
        "year",
        year
      )
      .maybeSingle();

    if (goalError) {
      console.error(
        "EMPLOYEE GOAL LOAD ERROR:",
        goalError
      );
    }

    goal = goalData || {};
  }

  const fields = [
    {
      name: "gp_goal",
      label: "Gross Profit",
      value: goal?.gp_goal || 0,
      prefix: "$",
      step: "0.01",
      icon: (
        <CircleDollarSign
          size={20}
        />
      ),
    },
    {
      name: "voice_goal",
      label: "Voice",
      value:
        goal?.voice_goal || 0,
      step: "1",
      icon: (
        <Smartphone
          size={20}
        />
      ),
    },
    {
      name: "mim_goal",
      label: "MiM",
      value:
        goal?.mim_goal || 0,
      step: "1",
      icon: (
        <RefreshCcw
          size={20}
        />
      ),
    },
    {
      name: "upgrade_goal",
      label: "Upgrades",
      value:
        goal?.upgrade_goal || 0,
      step: "1",
      icon: (
        <TrendingUp
          size={20}
        />
      ),
    },
    {
      name: "hsi_goal",
      label: "HSI",
      value:
        goal?.hsi_goal || 0,
      step: "1",
      icon: (
        <Wifi
          size={20}
        />
      ),
    },
    {
      name: "bts_goal",
      label: "BTS",
      value:
        goal?.bts_goal || 0,
      step: "1",
      icon: (
        <RadioTower
          size={20}
        />
      ),
    },
    {
      name: "accessory_goal",
      label: "Accessories",
      value:
        goal?.accessory_goal || 0,
      prefix: "$",
      step: "0.01",
      icon: (
        <Headphones
          size={20}
        />
      ),
    },
    {
      name: "features_goal",
      label: "Features",
      value:
        goal?.features_goal || 0,
      prefix: "$",
      step: "0.01",
      icon: (
        <Star
          size={20}
        />
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 sm:space-y-8">
        <Link
          href="/team"
          className="inline-flex items-center gap-2 rounded-xl text-sm font-black text-slate-500 transition hover:text-purple-700"
        >
          <ArrowLeft
            size={17}
          />
          Back to Team
        </Link>

        <section className="salespulse-dark-gradient relative overflow-hidden rounded-[30px] px-5 py-6 text-white shadow-[0_24px_70px_rgba(23,16,47,0.18)] sm:px-8 sm:py-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-pink-500/15 blur-3xl" />

          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/20 bg-pink-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-pink-300">
                <Sparkles
                  size={13}
                />
                Employee Goals
              </span>

              {!registered && (
                <span className="inline-flex rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-amber-300">
                  Pending Registration
                </span>
              )}
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-[-0.035em] sm:text-4xl">
              {employeeName}
            </h1>

            <p className="mt-2 text-sm font-medium text-white/55">
              {monthName} {year} targets
            </p>

            {!registered && (
              <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-amber-200/80">
                You can set this employee&apos;s goals now. They do not need to register first.
              </p>
            )}
          </div>
        </section>

        <form
          action="/api/goals/update"
          method="POST"
          className="overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_14px_40px_rgba(31,21,60,0.06)]"
        >
          <input
            type="hidden"
            name="employee_id"
            value={employeeId}
          />

          <input
            type="hidden"
            name="registered"
            value={
              registered
                ? "true"
                : "false"
            }
          />

          <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="salespulse-gradient flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg shadow-purple-500/20">
                <Target
                  size={20}
                />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-600">
                  Goal Setup
                </p>

                <h2 className="mt-0.5 text-xl font-black text-[#17102F]">
                  Monthly Targets
                </h2>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7 xl:grid-cols-4">
            {fields.map(
              (field) => (
                <label
                  key={
                    field.name
                  }
                  className="rounded-2xl border border-slate-200 bg-[#FAFAFD] p-4 transition focus-within:border-purple-300 focus-within:bg-white focus-within:shadow-[0_8px_24px_rgba(109,40,217,0.08)]"
                >
                  <span className="flex items-center gap-2 text-sm font-black text-[#17102F]">
                    <span className="text-purple-600">
                      {
                        field.icon
                      }
                    </span>

                    {
                      field.label
                    }
                  </span>

                  <div className="mt-3 flex items-center rounded-xl border border-slate-200 bg-white px-3 focus-within:border-purple-400 focus-within:ring-2 focus-within:ring-purple-100">
                    {field.prefix && (
                      <span className="font-black text-slate-400">
                        {
                          field.prefix
                        }
                      </span>
                    )}

                    <input
                      type="number"
                      min="0"
                      step={
                        field.step
                      }
                      name={
                        field.name
                      }
                      defaultValue={
                        field.value
                      }
                      className="min-w-0 flex-1 bg-transparent px-2 py-3 font-black text-[#17102F] outline-none"
                    />
                  </div>
                </label>
              )
            )}
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 bg-[#FAFAFD] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="text-xs font-bold text-slate-500">
              {registered
                ? `Saving updates ${employeeName}'s ${monthName} goals.`
                : `These goals will stay attached to ${employeeName} while registration is pending.`}
            </p>

            <button className="salespulse-gradient flex min-h-12 items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-black text-white shadow-lg shadow-purple-500/20 transition hover:scale-[1.01]">
              <Save
                size={18}
              />
              Save Goals
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
