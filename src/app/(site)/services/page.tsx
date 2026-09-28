import { getSettings } from "@/lib/data/repository";
import { ServicesClient } from "@/components/site/ServicesClient";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services — vidéosurveillance, réseau, maintenance",
  description:
    "Métiers AMANPLANET : vidéosurveillance, réseau, informatique, contrôle d’accès, alarmes et domotique. Ancres détaillées, FAQ et frais de déplacement.",
  path: "/services",
});

export default async function ServicesPage() {
  const settings = await getSettings();
  return <ServicesClient settings={settings} />;
}
