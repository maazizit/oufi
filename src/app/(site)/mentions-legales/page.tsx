import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site-config";

export const metadata = pageMeta({
  title: "Mentions légales",
  description: "Mentions légales du site AMANPLANET.",
  path: "/mentions-legales",
});

export default function MentionsPage() {
  return (
    <section className="sec wrap" style={{ maxWidth: 720 }}>
      <h1>Mentions légales</h1>
      <p style={{ marginTop: 16, lineHeight: 1.65 }}>
        <strong>{SITE.legalName}</strong>
        <br />
        {SITE.cis}
        <br />
        {SITE.address.fr}
        <br />
        Tél. : <a href={SITE.telHref}>{SITE.phoneDisplay}</a>
        <br />
        E-mail : <a href={SITE.mailHref}>{SITE.email}</a>
      </p>
      <p className="sm muted" style={{ marginTop: 16 }}>
        L’adresse complète Marrakech ({SITE.addressPlaceholder}) sera finalisée dès
        validation client. Zone d’intervention : {SITE.zone.fr}.
      </p>
      <p style={{ marginTop: 16, lineHeight: 1.65 }}>
        Le site présente des prix indicatifs hors pose. Aucun paiement en ligne
        n’est collecté via ce site.
      </p>
    </section>
  );
}
