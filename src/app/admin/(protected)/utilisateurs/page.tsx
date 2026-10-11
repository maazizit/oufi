import { AdminUsersClient } from "@/components/admin/AdminUsersClient";
import { ensureSuperAdmin } from "@/lib/admin/guard";
import { listAdminUsersForSuper } from "@/lib/admin/session";

export default async function AdminUsersPage() {
  await ensureSuperAdmin();
  const users = await listAdminUsersForSuper();

  return (
    <>
      <div className="topbar">
        <h2>Utilisateurs &amp; accès</h2>
      </div>
      <div className="content">
        <AdminUsersClient initial={users} />
      </div>
    </>
  );
}
