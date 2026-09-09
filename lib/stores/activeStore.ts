import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { getUserContext } from "@/lib/auth/userContext";

export const ACTIVE_STORE_COOKIE = "salespulse_active_store";

export async function getManagerStores() {
  const supabase = await createClient();
  const context = await getUserContext();

  if (!context?.user || !context.profile) {
    return [];
  }

  if (context.profile.role !== "manager") {
    return context.profile.store
      ? [context.profile.store]
      : [];
  }

  const { data: assignments, error } = await supabase
    .from("manager_stores")
    .select("store_id")
    .eq("manager_id", context.user.id);

  if (error) {
    console.error("MANAGER STORES ERROR:", error);
    return context.profile.store
      ? [context.profile.store]
      : [];
  }

  const storeIds = (assignments || [])
    .map((item: any) => item.store_id)
    .filter(Boolean);

  if (storeIds.length === 0) {
    return context.profile.store
      ? [context.profile.store]
      : [];
  }

  const { data: stores, error: storeError } = await supabase
    .from("stores")
    .select("id,name,city,region_id")
    .in("id", storeIds)
    .order("name");

  if (storeError) {
    console.error("MANAGED STORE FETCH ERROR:", storeError);
    return [];
  }

  return stores || [];
}

export async function getActiveStore() {
  const context = await getUserContext();

  if (!context?.user || !context.profile) {
    return null;
  }

  if (context.profile.role !== "manager") {
    return context.profile.store || null;
  }

  const stores = await getManagerStores();

  if (stores.length === 0) {
    return context.profile.store || null;
  }

  const cookieStore = await cookies();
  const selectedStoreId =
    cookieStore.get(ACTIVE_STORE_COOKIE)?.value;

  if (selectedStoreId) {
    const selectedStore = stores.find(
      (store: any) => store.id === selectedStoreId
    );

    if (selectedStore) {
      return selectedStore;
    }
  }

  const defaultStore = stores.find(
    (store: any) =>
      store.id === context.profile.store_id
  );

  return defaultStore || stores[0];
}
