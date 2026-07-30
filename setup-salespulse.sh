#!/bin/bash

echo "🚀 Building SalesPulse V2 foundation..."

mkdir -p lib/auth
mkdir -p lib/supabase
mkdir -p lib/utils

mkdir -p app/dashboard/employee
mkdir -p app/dashboard/manager
mkdir -p app/dashboard/regional
mkdir -p app/admin


echo "Creating Supabase client..."

cat > lib/supabase/client.ts <<'FILE'
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
FILE


echo "Creating user roles..."

cat > lib/auth/roles.ts <<'FILE'
export const USER_ROLES = {
  EMPLOYEE: "employee",
  MANAGER: "manager",
  REGIONAL: "regional",
  ADMIN: "admin",
} as const;


export const USER_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  DISABLED: "disabled",
} as const;
FILE


echo "Creating profile types..."

cat > types/profile.ts <<'FILE'
export type UserRole =
  | "employee"
  | "manager"
  | "regional"
  | "admin";


export type UserStatus =
  | "pending"
  | "approved"
  | "disabled";


export interface Profile {

  id: string;

  full_name: string;

  email: string;

  role: UserRole;

  status: UserStatus;

  store_id?: string;

}
FILE


echo "Creating dashboard pages..."

cat > app/dashboard/page.tsx <<'FILE'
import { redirect } from "next/navigation";

export default function Dashboard(){

  redirect("/dashboard/employee");

}
FILE


cat > app/dashboard/employee/page.tsx <<'FILE'
export default function EmployeeDashboard(){

return (

<main className="min-h-screen bg-slate-50 p-8">

<h1 className="text-3xl font-black">
Employee Dashboard
</h1>

<p className="mt-4 text-slate-500">
Personal sales performance will appear here.
</p>

</main>

);

}
FILE


cat > app/dashboard/manager/page.tsx <<'FILE'
export default function ManagerDashboard(){

return (

<main className="min-h-screen bg-slate-50 p-8">

<h1 className="text-3xl font-black">
Store Manager Dashboard
</h1>

<p className="mt-4 text-slate-500">
Team performance will appear here.
</p>

</main>

);

}
FILE


cat > app/dashboard/regional/page.tsx <<'FILE'
export default function RegionalDashboard(){

return (

<main className="min-h-screen bg-slate-50 p-8">

<h1 className="text-3xl font-black">
Regional Dashboard
</h1>

<p className="mt-4 text-slate-500">
Regional store performance will appear here.
</p>

</main>

);

}
FILE


echo "Creating admin panel..."

cat > app/admin/page.tsx <<'FILE'
export default function AdminPage(){

return (

<main className="min-h-screen bg-slate-50 p-8">

<h1 className="text-3xl font-black">
SalesPulse Admin
</h1>

<p className="mt-4 text-slate-500">
Approve users, assign roles, and manage stores.
</p>

</main>

);

}
FILE


echo "SalesPulse foundation complete!"
