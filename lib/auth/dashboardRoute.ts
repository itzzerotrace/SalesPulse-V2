export function getDashboardRoute(
  role?: string | null
) {
  if (role === "admin") {
    return "/admin/dashboard";
  }

  if (role === "manager") {
    return "/dashboard/manager";
  }

  if (
    role ===
    "regional_manager"
  ) {
    return "/dashboard/regional";
  }

  return "/dashboard/employee";
}
