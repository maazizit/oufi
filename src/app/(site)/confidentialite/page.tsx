import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site-config";

export const metadata = pageMeta({
  title: "Politique de confidentialité",
  description: "Politique de confidentialité AMANPLANET.",
  path: "/confidentialite",
});

export default function PrivacyPage() {
  return (
    <section className="sec wrap" style={{ maxWidth: 720 }}>
      <h1>Politique de confidentialité</h1>
      <p style={{ marginTop: 16, lineHeight: 1.65 }}>
        AMANPLANET — <a href={SITE.mailHref}>{SITE.email}</a> — Marrakech, Maroc
        (interventions dans tout le Maroc).
      </p>
      <p style={{ marginTop: 12, lineHeight: 1.65 }}>
        Les données collectées via les formulaires (devis, contact, suivi) servent
        uniquement à traiter votre demande et à vous recontacter. Elles ne sont
        pas vendues à des tiers.
      </p>
      <p style={{ marginTop: 12, lineHeight: 1.65 }}>
        Pour toute question ou suppression de données :{" "}
        <a href={SITE.mailHref}>{SITE.email}</a>. Vous pouvez également nous
        joindre au <a href={SITE.telHref}>{SITE.phoneDisplay}</a>.
      </p>
    </section>
  );
}
