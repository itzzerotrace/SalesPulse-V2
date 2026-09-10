"use client";

import {
  useState,
} from "react";

import {
  Trash2,
  X,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

interface Props {
  employeeId: string;
  employeeName: string;
  registered: boolean;
}

export default function DeleteEmployeeButton({
  employeeId,
  employeeName,
  registered,
}: Props) {
  const router =
    useRouter();

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  async function removeEmployee() {
    setLoading(true);
    setError("");

    try {
      const response =
        await fetch(
          "/api/team/remove",
          {
            method: "DELETE",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              employeeId,
              registered,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to remove employee."
        );
      }

      setOpen(false);

      router.refresh();
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to remove employee."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() =>
          setOpen(true)
        }
        className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-black text-red-600 transition hover:border-red-200 hover:bg-red-100"
      >
        <Trash2 size={16} />

        Remove Employee
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#17102F]/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_100px_rgba(23,16,47,0.35)]">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5 sm:p-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-500">
                  Remove Employee
                </p>

                <h2 className="mt-1 text-xl font-black text-[#17102F]">
                  Are you sure?
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setOpen(false)
                }
                disabled={loading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <p className="text-sm font-medium leading-6 text-slate-600">
                <span className="font-black text-[#17102F]">
                  {employeeName}
                </span>{" "}
                will be removed from this
                store&apos;s active team.
              </p>

              {registered ? (
                <p className="mt-3 rounded-2xl bg-amber-50 p-3 text-xs font-bold leading-5 text-amber-700">
                  Their historical goals
                  and performance data
                  will be kept.
                </p>
              ) : (
                <p className="mt-3 rounded-2xl bg-amber-50 p-3 text-xs font-bold leading-5 text-amber-700">
                  This pending employee
                  has not registered yet,
                  so the pending record
                  will be deleted.
                </p>
              )}

              {error && (
                <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-600">
                  {error}
                </p>
              )}

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setOpen(false)
                  }
                  disabled={loading}
                  className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={
                    removeEmployee
                  }
                  disabled={loading}
                  className="min-h-12 rounded-2xl bg-red-600 px-4 py-3 text-sm font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Removing..."
                    : "Remove"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
