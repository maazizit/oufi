import { Suspense } from "react";
import { getProducts, getSettings } from "@/lib/data/repository";
import { QuoteForm } from "@/components/site/QuoteForm";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Demande de devis — rappel sous 24 h",
  description:
    "Demandez un devis AMANPLANET pour installation, matériel ou maintenance. Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.",
  path: "/devis",
});

function DevisShell() {
  return (
    <section className="sec wrap sr-only" aria-hidden="false">
      <h1>Demande de devis</h1>
      <p>
        Formulaire AMANPLANET en trois étapes : besoin, site, contact. Rappel sous 24 h ouvrées ;
        devis détaillé sous 48 h après la visite sur site.
      </p>
    </section>
  );
}

export default async function DevisPage() {
  const [settings, products] = await Promise.all([getSettings(), getProducts(true)]);
  return (
    <>
      <DevisShell />
      <Suspense
        fallback={
          <section className="sec wrap" style={{ maxWidth: 820 }}>
            <p className="muted">Chargement du formulaire…</p>
          </section>
        }
      >
        <QuoteForm settings={settings} mode="form" products={products} />
      </Suspense>
    </>
  );
}
