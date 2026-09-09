import { redirect } from "next/navigation";
import { getDashboardRoute } from "@/lib/auth/dashboardRoute";

export default async function ReportsPage() {
  redirect(await getDashboardRoute());
}
