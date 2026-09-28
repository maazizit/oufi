import { getSettings } from "@/lib/data/repository";
import { ContactClient } from "@/components/site/ContactClient";

export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const settings = await getSettings();
  return <ContactClient settings={settings} />;
}
