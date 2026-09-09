import { redirect } from "next/navigation";

import { getUserContext } from "@/lib/auth/userContext";
import { getDashboardRoute } from "@/lib/auth/dashboardRoute";

export default async function NewSalePage() {
  const context =
    await getUserContext();

  if (!context?.profile) {
    redirect("/login");
  }

  redirect(
    getDashboardRoute(
      context.profile.role
    )
  );
}
