import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/data/repository";
import { productSlug, SITE_URL } from "@/lib/seo";
import { SERVICE_PAGES } from "@/lib/seo/services";
import { CITY_PAGES } from "@/lib/seo/cities";
import { BLOG_POSTS } from "@/lib/seo/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts(true);
  const now = new Date();

  const staticFr = [
    "",
    "/services",
    "/catalogue",
    "/devis",
    "/contact",
    "/zones-d-intervention",
    "/blog",
    "/mentions-legales",
    "/confidentialite",
    "/conditions",
    ...SERVICE_PAGES.map((s) => `/${s.slug}`),
    ...CITY_PAGES.map((c) => `/villes/${c.slug}`),
    ...BLOG_POSTS.map((p) => `/blog/${p.slug}`),
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticFr) {
    const frUrl = `${SITE_URL}${path || "/"}`;
    const arPath = path === "" ? "/ar" : `/ar${path}`;
    const arUrl = `${SITE_URL}${arPath}`;
    entries.push({
      url: frUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: {
          "fr-MA": frUrl,
          "ar-MA": arUrl,
          "x-default": frUrl,
        },
      },
    });
    entries.push({
      url: arUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: path === "" ? 0.95 : 0.65,
      alternates: {
        languages: {
          "fr-MA": frUrl,
          "ar-MA": arUrl,
          "x-default": frUrl,
        },
      },
    });
  }

  for (const p of products) {
    const path = `/catalogue/${productSlug(p)}`;
    const frUrl = `${SITE_URL}${path}`;
    const arUrl = `${SITE_URL}/ar${path}`;
    entries.push({
      url: frUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
      alternates: {
        languages: { "fr-MA": frUrl, "ar-MA": arUrl, "x-default": frUrl },
      },
    });
  }

  return entries;
}
