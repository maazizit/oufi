import { SiteShell } from "@/components/site/SiteShell";
import { getSettings } from "@/lib/data/repository";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return <SiteShell settings={settings}>{children}</SiteShell>;
}
