import { getUserContext } from "@/lib/auth/userContext";
import {
  getActiveStore,
  getManagerStores,
} from "@/lib/stores/activeStore";

export async function getUserProfile() {
  const context = await getUserContext();

  if (!context?.profile) {
    return null;
  }

  const activeStore =
    context.profile.role === "manager"
      ? await getActiveStore()
      : context.profile.store;

  const managedStores =
    context.profile.role === "manager"
      ? await getManagerStores()
      : [];

  return {
    ...context.profile,

    name:
      context.profile.full_name ||
      "User",

    role:
      context.profile.role ||
      "",

    store: activeStore,

    stores: managedStores,

    region:
      context.profile.region?.name ||
      "",

    city:
      activeStore?.city ||
      "",
  };
}
