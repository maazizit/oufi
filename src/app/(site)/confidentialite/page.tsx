import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité AMANPLANET — traitement des données personnelles conformément à la loi 09-08 / CNDP.",
  path: "/confidentialite",
});

export default function PrivacyPage() {
  return (
    <section className="sec wrap legal">
      <h1>Politique de confidentialité</h1>
      <p className="ink2">
        Conformément à la loi n° 09-08 relative à la protection des personnes physiques à l’égard du
        traitement des données à caractère personnel, et sous le contrôle de la CNDP.
      </p>
      <h2>Responsable de traitement</h2>
      <p>
        AMANPLANET — <a href="mailto:contact@amanplanet.ma">contact@amanplanet.ma</a> — Casablanca.
      </p>
      <h2>Données collectées via les formulaires</h2>
      <ul>
        <li>Identité et coordonnées (nom, téléphone, e-mail, entreprise)</li>
        <li>Adresse du site d’intervention et détails du besoin</li>
        <li>Contenu de la sélection catalogue / panier (références, quantités)</li>
      </ul>
      <h2>Finalités</h2>
      <p>
        Traiter les demandes de devis, planifier les états des lieux, assurer le suivi commercial et
        le support après installation. Aucune vente de données à des tiers.
      </p>
      <h2>Base légale</h2>
      <p>
        Exécution de mesures précontractuelles à votre demande, et consentement lorsque vous acceptez
        d’être recontacté.
      </p>
      <h2>Durée de conservation</h2>
      <p>
        Les demandes sont conservées le temps nécessaire au suivi commercial, puis archivées ou
        supprimées selon les obligations légales applicables.
      </p>
      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à{" "}
        <a href="mailto:contact@amanplanet.ma">contact@amanplanet.ma</a>. Vous pouvez également
        saisir la CNDP (www.cndp.ma).
      </p>
    </section>
  );
}
