import { getSettings } from "@/lib/data/repository";
import { SettingsClient } from "@/components/admin/SettingsClient";

export default async function ReglagesPage() {
  const settings = await getSettings();
  return (
    <>
      <div className="topbar">
        <h2>Réglages</h2>
      </div>
      <div className="content">
        <SettingsClient settings={settings} />
      </div>
    </>
  );
}
