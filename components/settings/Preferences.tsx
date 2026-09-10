"use client";

import {
  Bell,
  BellOff,
} from "lucide-react";

import {
  useState,
} from "react";

export default function Preferences() {
  const [
    notifications,
    setNotifications,
  ] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-[#F8F7FC] p-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
            {notifications ? (
              <Bell
                size={18}
              />
            ) : (
              <BellOff
                size={18}
              />
            )}
          </div>

          <div className="min-w-0">
            <p className="font-black text-[#17102F]">
              Notifications
            </p>

            <p className="mt-0.5 text-xs font-medium text-slate-500">
              Receive SalesPulse
              performance
              notifications.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setNotifications(
              !notifications
            )
          }
          aria-pressed={
            notifications
          }
          className={`relative h-8 w-14 shrink-0 rounded-full transition ${
            notifications
              ? "bg-purple-600"
              : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm transition ${
              notifications
                ? "left-7"
                : "left-1"
            }`}
          />
        </button>
      </div>

      <p className="text-xs font-medium leading-5 text-slate-400">
        Notification
        preferences are
        currently stored for
        this session. Expanded
        notification controls
        can be connected later.
      </p>
    </div>
  );
}
