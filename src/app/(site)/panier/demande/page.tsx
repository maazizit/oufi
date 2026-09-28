import { Suspense } from "react";
import { getSettings } from "@/lib/data/repository";
import { QuoteForm } from "@/components/site/QuoteForm";

export const metadata = { title: "Demande panier" };

export default async function PanierDemandePage() {
  const settings = await getSettings();
  return (
    <Suspense fallback={<section className="sec wrap"><p className="muted">…</p></section>}>
      <QuoteForm settings={settings} mode="cart" />
    </Suspense>
  );
}
