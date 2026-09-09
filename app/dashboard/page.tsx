import { redirect } from "next/navigation";

import { getUserContext } from "@/lib/auth/userContext";

export default async function DashboardPage() {
  const context =
    await getUserContext();

  if (!context?.profile) {
    redirect("/login");
  }

  const role =
    context.profile.role;

  if (role === "admin") {
    redirect("/admin/dashboard");
  }

  if (role === "manager") {
    redirect("/dashboard/manager");
  }

  if (
    role ===
    "regional_manager"
  ) {
    redirect("/dashboard/regional");
  }

  redirect("/dashboard/employee");
}
