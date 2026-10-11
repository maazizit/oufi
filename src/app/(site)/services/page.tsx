import { getSettings } from "@/lib/data/repository";
import { ServicesClient } from "@/components/site/ServicesClient";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services — caméras, réseau, alarme, domotique",
  description:
    "Services AMANPLANET à Marrakech et au Maroc : vidéosurveillance, domotique, alarme, réseau, maintenance, contrôle d’accès. Devis après visite.",
  path: "/services",
});

export default async function ServicesPage() {
  const settings = await getSettings();
  return <ServicesClient settings={settings} />;
}
