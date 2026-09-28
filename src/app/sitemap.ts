import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/data/repository";
import { productSlug, SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts(true);
  const staticPaths = [
    "",
    "/services",
    "/catalogue",
    "/devis",
    "/panier",
    "/suivi",
    "/contact",
    "/mentions-legales",
    "/confidentialite",
    "/conditions",
  ];
  const now = new Date();
  return [
    ...staticPaths.map((path) => ({
      url: `${SITE_URL}${path || "/"}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...products.map((p) => ({
      url: `${SITE_URL}/catalogue/${productSlug(p)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
