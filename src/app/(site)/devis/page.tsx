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

export default async function DevisPage() {
  const [settings, products] = await Promise.all([getSettings(), getProducts(true)]);
  return (
    <Suspense
      fallback={
        <section className="sec wrap quote-sec">
          <p className="muted">Chargement du formulaire…</p>
        </section>
      }
    >
      <QuoteForm settings={settings} mode="form" products={products} />
    </Suspense>
  );
}
