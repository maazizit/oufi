import { getSettings } from "@/lib/data/repository";
import { ContactClient } from "@/components/site/ContactClient";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact AMANPLANET — Casablanca",
  description:
    "Contactez AMANPLANET : téléphone, WhatsApp, e-mail et adresse à Casablanca. Pour un devis, utilisez le formulaire dédié.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSettings();
  return <ContactClient settings={settings} />;
}
