import { AdminCompteClient } from "@/components/admin/AdminCompteClient";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { getAdminSession } from "@/lib/admin/session";
import { redirect } from "next/navigation";

export default async function AdminComptePage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <>
      <AdminTopbar titleKey="adm_page_compte" />
      <div className="content">
        <AdminCompteClient session={session} />
      </div>
    </>
  );
}
