import { redirect } from "next/navigation";
import { ADMIN_NAV, canAccessPage, type AdminPageKey } from "./permissions";
import { getAdminSession } from "./session";

export async function ensureAdminPage(page: AdminPageKey) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  if (!canAccessPage(session, page)) {
    const first = ADMIN_NAV.find((n) => canAccessPage(session, n.page));
    redirect(first?.href || "/admin/compte");
  }
  return session;
}

export async function ensureSuperAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  if (session.role !== "super_admin") redirect("/admin/compte");
  return session;
}
