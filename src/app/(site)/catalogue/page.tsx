import { Suspense } from "react";
import { getProducts, getSettings } from "@/lib/data/repository";
import { CatalogueClient } from "@/components/site/CatalogueClient";
import { ProductCard } from "@/components/site/ProductCard";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Catalogue — caméras, routeurs, alarmes",
  description:
    "Catalogue AMANPLANET : caméras, enregistreurs, routeurs, contrôle d’accès, domotique et alarmes. Prix indicatifs TTC, sélection pour devis sans paiement en ligne.",
  path: "/catalogue",
});

export default async function CataloguePage() {
  const [settings, products] = await Promise.all([getSettings(), getProducts(true)]);
  const preview = products.slice().sort((a, b) => b.pop - a.pop).slice(0, 8);

  return (
    <>
      <noscript>
        <section className="sec wrap">
          <h1>Catalogue</h1>
          <div className="pgrid">
            {preview.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </noscript>
      <Suspense
        fallback={
          <section className="sec wrap">
            <h1>Catalogue</h1>
            <div className="pgrid">
              {preview.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        }
      >
        <CatalogueClient products={products} settings={settings} />
      </Suspense>
    </>
  );
}
