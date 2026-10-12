import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Mentions légales",
  description: "Mentions légales du site AMANPLANET (C.I.S.).",
  path: "/mentions-legales",
});

export default function MentionsPage() {
  return (
    <section className="sec wrap legal">
      <h1>Mentions légales</h1>
      <p className="ink2">Dernière mise à jour : septembre 2026.</p>
      <h2>Éditeur</h2>
      <p>
        AMANPLANET — Conseil • Installation • Suivi<br />
        14, rue Ibn Battouta — Quartier Belvédère, Casablanca, Maroc<br />
        Tél. : <a href="tel:+212661241805">+212 6 61 24 18 05</a><br />
        E-mail : <a href="mailto:contact@amanplanet.ma">contact@amanplanet.ma</a>
      </p>
      <h2>Hébergement</h2>
      <p>Site hébergé par Vercel Inc. Les contenus et données de contact sont gérés par AMANPLANET.</p>
      <h2>Propriété intellectuelle</h2>
      <p>
        Marques, textes, logos et éléments graphiques du site sont protégés. Toute reproduction non
        autorisée est interdite.
      </p>
      <h2>Responsabilité</h2>
      <p>
        Les prix catalogue sont indicatifs et hors pose. Les devis définitifs sont établis après état
        des lieux. AMANPLANET s’efforce d’assurer l’exactitude des informations publiées.
      </p>
    </section>
  );
}
