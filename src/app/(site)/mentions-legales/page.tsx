import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMeta({
  title: "Mentions légales",
  description: "Mentions légales du site AMANPLANET.",
  path: "/mentions-legales",
});

export default function MentionsPage() {
  return (
    <>
      <section className="page-band page-band-sm">
        <div className="wrap page-band-in">
          <p className="page-band-k mono">C.I.S · LÉGAL</p>
          <h1>Mentions légales</h1>
        </div>
      </section>
      <section className="sec wrap legal">
        <p>
          <strong>{SITE.legalName}</strong>
          <br />
          {SITE.cis}
          <br />
          {SITE.address.fr}
          <br />
          Tél. :{" "}
          <a href={SITE.telHref} dir="ltr">
            {SITE.phoneDisplay}
          </a>
          <br />
          E-mail :{" "}
          <a href={SITE.mailHref} dir="ltr">
            {SITE.email}
          </a>
        </p>
        <p className="sm muted">
          Siège : {SITE.streetAddress}, {SITE.locality}. Zone d’intervention : {SITE.zone.fr}.
        </p>
        <p>
          Le site présente des prix indicatifs hors pose. Aucun paiement en ligne n’est collecté via
          ce site.
        </p>
      </section>
    </>
  );
}
