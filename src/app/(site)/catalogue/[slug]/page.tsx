import { notFound } from "next/navigation";
import { getProducts } from "@/lib/data/repository";
import { relatedProducts } from "@/lib/related-products";
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
    title: `${product.name.fr} — installation Marrakech | ${product.brand}`,
    description: `${product.name.fr} (${product.ref}). Installation caméra et vidéosurveillance à Marrakech et dans tout le Maroc par AMANPLANET. Prix indicatif ${product.price} DH TTC hors pose — devis pose sur site.`,
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
  const related = relatedProducts(product, products, 3);

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}
