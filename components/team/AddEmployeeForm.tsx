"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEmployeeForm() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!fullName.trim()) {
      setMessage("Employee name is required.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/team/pending", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim() || null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to add employee.");
      }

      setFullName("");
      setEmail("");
      setMessage("");
      setOpen(false);

      router.refresh();
    } catch (error: any) {
      setMessage(error.message || "Unable to add employee.");
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
        className="w-full rounded-xl bg-purple-600 px-5 py-3 text-sm font-black text-white transition hover:bg-purple-700 sm:w-auto"
      >
        + Add Employee
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-purple-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">
            Add Employee
          </h2>

          <p className="mt-1 text-sm font-medium text-slate-600">
            Add someone to your store before they create a SalesPulse account.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setMessage("");
          }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg font-black text-slate-700 transition hover:bg-slate-200"
          aria-label="Close add employee form"
        >
          ×
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <div>
          <label
            htmlFor="employee-name"
            className="mb-1.5 block text-sm font-bold text-slate-700"
          >
            Full Name
          </label>

          <input
            id="employee-name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Employee name"
            autoComplete="name"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        <div>
          <label
            htmlFor="employee-email"
            className="mb-1.5 block text-sm font-bold text-slate-700"
          >
            Email
            <span className="ml-1 font-medium text-slate-500">
              (optional)
            </span>
          </label>

          <input
            id="employee-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="employee@email.com"
            autoComplete="email"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {message && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 sm:col-span-2">
            {message}
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setMessage("");
            }}
            disabled={saving}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving || !fullName.trim()}
            className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-black text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}
