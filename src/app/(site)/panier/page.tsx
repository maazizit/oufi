import { getProducts } from "@/lib/data/repository";
import { CartPageClient } from "@/components/site/CartPageClient";

export const metadata = { title: "Panier" };

export default async function PanierPage() {
  const products = await getProducts(true);
  return <CartPageClient products={products} />;
}
