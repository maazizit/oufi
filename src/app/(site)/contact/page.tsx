import { getSettings } from "@/lib/data/repository";
import { ContactClient } from "@/components/site/ContactClient";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site-config";

export const metadata = pageMeta({
  title: "Contact AMANPLANET — Marrakech & Maroc",
  description: `Contactez AMANPLANET : ${SITE.phoneDisplay}, WhatsApp, ${SITE.email}. Siège Marrakech — interventions tout le Maroc. Pour un devis, utilisez le formulaire dédié.`,
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSettings();
  return <ContactClient settings={settings} />;
}
