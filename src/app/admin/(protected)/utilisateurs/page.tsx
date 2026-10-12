import { AdminUsersClient } from "@/components/admin/AdminUsersClient";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ensureSuperAdmin } from "@/lib/admin/guard";
import { listAdminUsersForSuper } from "@/lib/admin/session";

export default async function AdminUsersPage() {
  await ensureSuperAdmin();
  const users = await listAdminUsersForSuper();

  return (
    <>
      <AdminTopbar titleKey="adm_page_users" />
      <div className="content">
        <AdminUsersClient initial={users} />
      </div>
    </>
  );
}
