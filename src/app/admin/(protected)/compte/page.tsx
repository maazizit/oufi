import { AdminCompteClient } from "@/components/admin/AdminCompteClient";
import { getAdminSession } from "@/lib/admin/session";
import { redirect } from "next/navigation";

export default async function AdminComptePage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <>
      <div className="topbar">
        <h2>Mon compte</h2>
      </div>
      <div className="content">
        <AdminCompteClient session={session} />
      </div>
    </>
  );
}
