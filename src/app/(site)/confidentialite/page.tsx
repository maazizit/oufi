import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Politique de confidentialité",
  description: "Politique de confidentialité AMANPLANET.",
  path: "/confidentialite",
});

export default function PrivacyPage() {
  return (
    <>
      <section className="page-band page-band-sm">
        <div className="wrap page-band-in">
          <p className="page-band-k mono">C.I.S · LÉGAL</p>
          <h1>Politique de confidentialité</h1>
        </div>
      </section>
      <section className="sec wrap legal">
        <p>
          AMANPLANET —{" "}
          <a href={SITE.mailHref} dir="ltr">
            {SITE.email}
          </a>{" "}
          — Marrakech, Maroc (interventions dans tout le Maroc).
        </p>
        <p>
          Les données collectées via les formulaires (devis, contact, suivi) servent uniquement à
          traiter votre demande et à vous recontacter. Elles ne sont pas vendues à des tiers.
        </p>
        <p>
          Pour toute question ou suppression de données :{" "}
          <a href={SITE.mailHref} dir="ltr">
            {SITE.email}
          </a>
          . Vous pouvez également nous joindre au{" "}
          <a href={SITE.telHref} dir="ltr">
            {SITE.phoneDisplay}
          </a>
          .
        </p>
      </section>
    </>
  );
}
