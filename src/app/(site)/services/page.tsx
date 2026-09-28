import { getSettings } from "@/lib/data/repository";
import { SVCS } from "@/lib/data/constants";
import { ServicesClient } from "@/components/site/ServicesClient";

export const metadata = { title: "Services" };

export default async function ServicesPage() {
  const settings = await getSettings();
  return <ServicesClient settings={settings} services={SVCS} />;
}
