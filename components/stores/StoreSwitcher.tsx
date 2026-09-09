"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Store {
  id: string;
  name: string;
}

interface Props {
  stores: Store[];
  activeStoreId?: string;
}

export default function StoreSwitcher({
  stores,
  activeStoreId,
}: Props) {
  const router = useRouter();

  const [value, setValue] = useState(
    activeStoreId || stores[0]?.id || ""
  );

  const [switching, setSwitching] =
    useState(false);

  if (stores.length <= 1) {
    return null;
  }

  async function handleChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const nextStoreId = e.target.value;

    setValue(nextStoreId);
    setSwitching(true);

    try {
      const response = await fetch(
        "/api/stores/select",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            storeId: nextStoreId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Unable to switch stores."
        );
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      setValue(
        activeStoreId ||
          stores[0]?.id ||
          ""
      );
    } finally {
      setSwitching(false);
    }
  }

  return (
    <div className="w-full sm:w-auto">
      <label
        htmlFor="salespulse-store-switcher"
        className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-500"
      >
        Viewing Store
      </label>

      <div className="relative">
        <select
          id="salespulse-store-switcher"
          value={value}
          disabled={switching}
          onChange={handleChange}
          className="w-full min-w-[180px] appearance-none rounded-xl border border-slate-300 bg-white px-4 py-2.5 pr-10 text-sm font-black text-slate-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 disabled:opacity-60 sm:w-auto"
        >
          {stores.map((store) => (
            <option
              key={store.id}
              value={store.id}
            >
              {store.name}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
          ▼
        </span>
      </div>
    </div>
  );
}
