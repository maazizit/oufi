import { Suspense } from "react";
import { TrackClient } from "@/components/site/TrackClient";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Suivi de demande — référence AMP",
  description:
    "Suivez votre demande AMANPLANET avec la référence AMP-AAAA-NNNN ou votre numéro de téléphone. États : reçu, visite, devis, installation, terminé.",
  path: "/suivi",
});

export default function SuiviPage() {
  return (
    <Suspense
      fallback={
        <section className="sec wrap">
          <p className="muted">…</p>
        </section>
      }
    >
      <TrackClient />
    </Suspense>
  );
}
