import { ensureAdminPage } from "@/lib/admin/guard";
import { getSettings } from "@/lib/data/repository";
import { SettingsClient } from "@/components/admin/SettingsClient";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export default async function ReglagesPage() {
  await ensureAdminPage("reglages");
  const settings = await getSettings();
  return (
    <>
      <AdminTopbar titleKey="adm_page_reglages" />
      <div className="content">
        <SettingsClient settings={settings} />
      </div>
    </>
  );
}
