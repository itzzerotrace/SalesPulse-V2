"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Mail,
  Plus,
  UserPlus,
  UserRound,
  X,
} from "lucide-react";

export default function AddEmployeeForm() {
  const router =
    useRouter();

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    fullName,
    setFullName,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!fullName.trim()) {
      setMessage(
        "Employee name is required."
      );
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response =
        await fetch(
          "/api/team/pending",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body:
              JSON.stringify({
                fullName:
                  fullName.trim(),
                email:
                  email.trim() ||
                  null,
              }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Unable to add employee."
        );
      }

      setFullName("");
      setEmail("");
      setMessage("");
      setOpen(false);

      router.refresh();
    } catch (
      error: any
    ) {
      setMessage(
        error.message ||
          "Unable to add employee."
      );
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          setMessage("");
          setOpen(true);
        }}
        className="salespulse-gradient flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black text-white shadow-lg shadow-purple-500/20 transition hover:scale-[1.01] sm:w-auto"
      >
        <Plus
          size={18}
        />
        Add Employee
      </button>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-[28px] border border-purple-100 bg-white shadow-[0_18px_55px_rgba(31,21,60,0.1)] sm:min-w-[520px]">
      <div className="salespulse-dark-gradient flex items-start justify-between gap-4 px-5 py-5 text-white sm:px-6">
        <div className="flex gap-3">
          <div className="salespulse-gradient flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
            <UserPlus
              size={20}
            />
          </div>

          <div>
            <h2 className="text-xl font-black">
              Add Employee
            </h2>

            <p className="mt-1 max-w-sm text-xs font-medium leading-5 text-white/50">
              Add someone before
              they create their
              SalesPulse account.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setMessage("");
          }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Close add employee form"
        >
          <X
            size={18}
          />
        </button>
      </div>

      <form
        onSubmit={
          handleSubmit
        }
        className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6"
      >
        <label>
          <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
            <UserRound
              size={14}
              className="text-purple-600"
            />
            Full Name
          </span>

          <input
            type="text"
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
            placeholder="Employee name"
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-[#FAFAFD] px-4 py-3 text-base font-bold text-[#17102F] outline-none transition placeholder:text-slate-400 focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
          />
        </label>

        <label>
          <span className="flex items-center gap-2 text-xs font-black uppercase tracking-wide text-slate-500">
            <Mail
              size={14}
              className="text-purple-600"
            />
            Email
            <span className="normal-case tracking-normal text-slate-400">
              optional
            </span>
          </span>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="employee@email.com"
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-[#FAFAFD] px-4 py-3 text-base font-bold text-[#17102F] outline-none transition placeholder:text-slate-400 focus:border-purple-400 focus:bg-white focus:ring-2 focus:ring-purple-100"
          />
        </label>

        {message && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 sm:col-span-2">
            {message}
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:col-span-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setMessage("");
            }}
            disabled={saving}
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={
              saving ||
              !fullName.trim()
            }
            className="salespulse-gradient flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-white shadow-lg shadow-purple-500/20 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <UserPlus
              size={17}
            />

            {saving
              ? "Adding..."
              : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}
