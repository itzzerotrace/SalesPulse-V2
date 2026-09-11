import { getUserContext } from "@/lib/auth/userContext";

import {
  getActiveStore,
  getManagerStores,
} from "@/lib/stores/activeStore";

export async function getUserProfile() {
  const context =
    await getUserContext();

  if (!context?.profile) {
    return null;
  }

  const role =
    context.profile.role || "";

  const canManageMultipleStores =
    role === "manager" ||
    role === "regional_manager";

  /*
   * Managers and Regional Managers use
   * the selected active store.
   *
   * Employees/admin fall back to the
   * store attached directly to profile.
   */
  const activeStore =
    canManageMultipleStores
      ? await getActiveStore()
      : context.profile.store;

  /*
   * manager_stores is also used for the
   * Regional Manager's assigned stores.
   * This gives Daily Update the full list
   * Jason is allowed to switch between.
   */
  const managedStores =
    canManageMultipleStores
      ? await getManagerStores()
      : [];

  return {
    ...context.profile,

    name:
      context.profile.full_name ||
      "User",

    role,

    store:
      activeStore ||
      context.profile.store ||
      null,

    stores:
      managedStores,

    region:
      context.profile.region?.name ||
      "",

    city:
      activeStore?.city ||
      context.profile.store?.city ||
      "",
  };
}
