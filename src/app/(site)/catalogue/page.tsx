import { Suspense } from "react";
import { getProducts, getSettings } from "@/lib/data/repository";
import { CatalogueClient } from "@/components/site/CatalogueClient";

export const metadata = { title: "Catalogue" };

export default async function CataloguePage() {
  const [settings, products] = await Promise.all([getSettings(), getProducts(true)]);
  return (
    <Suspense fallback={<section className="sec wrap"><p className="muted">…</p></section>}>
      <CatalogueClient products={products} settings={settings} />
    </Suspense>
  );
}
