import { getProducts } from "@/lib/data/repository";
import { CartPageClient } from "@/components/site/CartPageClient";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Préparer une demande de devis",
  description:
    "Votre sélection matériel AMANPLANET. Aucun paiement en ligne — envoyez la sélection pour un devis. Rappel sous 24 h ouvrées.",
  path: "/panier",
});

export default async function PanierPage() {
  const products = await getProducts(true);
  return <CartPageClient products={products} />;
}
