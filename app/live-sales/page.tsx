import { redirect } from "next/navigation";
import { getDashboardRoute } from "@/lib/auth/dashboardRoute";

export default async function LiveSalesPage() {
  redirect(await getDashboardRoute());
}
