import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Conditions générales — devis et services",
  description:
    "Conditions générales AMANPLANET applicables aux devis, installations et contrats de maintenance.",
  path: "/conditions",
});

export default function TermsPage() {
  return (
    <section className="sec wrap legal">
      <h1>Conditions générales (devis &amp; services)</h1>
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions encadrent les demandes de devis, la vente de matériel, les
        installations et les prestations de maintenance proposées par AMANPLANET.
      </p>
      <h2>2. Demandes de devis</h2>
      <p>
        Une demande en ligne n’engage pas financièrement le client. AMANPLANET rappelle sous 24 h
        ouvrées. Le devis détaillé est remis sous 48 h après la visite sur site lorsque celle-ci est
        nécessaire.
      </p>
      <h2>3. Frais d’état des lieux</h2>
      <p>
        Les frais de déplacement affichés par ville sont dus pour la visite technique. Ils sont
        déduits du devis si les travaux sont confirmés.
      </p>
      <h2>4. Prix et matériel</h2>
      <p>
        Les prix catalogue sont indicatifs TTC et hors pose. La disponibilité est confirmée lors du
        rappel. Aucun paiement n’est encaissé via le site.
      </p>
      <h2>5. Installation et garantie</h2>
      <p>
        Sauf mention contraire, la pose est garantie 12 mois pièces et main-d’œuvre pour les
        installations réalisées par nos techniciens. Le matériel reste la propriété du client ;
        identifiants et configurations lui sont remis.
      </p>
      <h2>6. Maintenance</h2>
      <p>
        Les contrats de suivi et interventions de dépannage font l’objet d’un devis ou d’un
        engagement écrit séparé précisant périodicité et SLA.
      </p>
      <h2>7. Contact</h2>
      <p>
        <a href="tel:+212661241805">+212 6 61 24 18 05</a> ·{" "}
        <a href="mailto:contact@amanplanet.ma">contact@amanplanet.ma</a>
      </p>
    </section>
  );
}
