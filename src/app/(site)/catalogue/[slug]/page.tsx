import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/data/repository";
import { productJsonLd, productSlug, pageMeta } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";
import { ProductDetailClient } from "@/components/site/ProductDetailClient";

export async function generateStaticParams() {
  const products = await getProducts(true);
  return products.map((p) => ({ slug: productSlug(p) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProducts(true);
  const product = products.find((p) => productSlug(p) === slug);
  if (!product) return { title: "Produit" };
  return pageMeta({
    title: `${product.name.fr} — ${product.brand}`,
    description: `${product.name.fr} (${product.ref}). Prix indicatif ${product.price} DH TTC, hors pose. Ajoutez à votre devis AMANPLANET.`,
    path: `/catalogue/${slug}`,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProducts(true);
  const product = products.find((p) => productSlug(p) === slug);
  if (!product) notFound();

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <section className="sec wrap" style={{ maxWidth: 920 }}>
        <p className="sm muted" style={{ marginBottom: 12 }}>
          <Link href="/catalogue">← Catalogue</Link>
        </p>
        <ProductDetailClient product={product} />
      </section>
    </>
  );
}
