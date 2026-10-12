import { ensureAdminPage } from "@/lib/admin/guard";
import { getInterventions, getSettings } from "@/lib/data/repository";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminInterventionsClient } from "@/components/admin/AdminInterventionsClient";

export default async function InterventionsPage() {
  await ensureAdminPage("interventions");
  const [list, settings] = await Promise.all([getInterventions(), getSettings()]);

  return (
    <>
      <AdminTopbar titleKey="adm_page_interventions" />
      <div className="content">
        <AdminInterventionsClient
          interventions={list}
          team={settings.team}
          managerName={settings.manager}
        />
      </div>
    </>
  );
}
