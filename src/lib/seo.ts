import type { Metadata } from "next";
import type { Localized, Product, Settings } from "./types";
import { L } from "./data/i18n";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://oufi-three.vercel.app";

export function productSlug(p: Pick<Product, "ref" | "id">) {
  return (p.ref || p.id).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function pageMeta({
  title,
  description,
  path = "/",
  lang = "fr",
}: {
  title: string;
  description: string;
  path?: string;
  lang?: "fr" | "ar";
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: url,
        ar: url,
        "x-default": url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "AMANPLANET",
      locale: lang === "ar" ? "ar_MA" : "fr_MA",
      type: "website",
      images: [{ url: `${SITE_URL}/brand/hero-install.jpg`, width: 2000, height: 1333, alt: "AMANPLANET" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/brand/hero-install.jpg`],
    },
  };
}

export function localBusinessJsonLd(settings: Settings) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.company,
    description: "Conseil, installation et suivi — caméras, réseau, contrôle d'accès, Casablanca et région.",
    url: SITE_URL,
    telephone: settings.phone,
    email: settings.email,
    image: `${SITE_URL}/brand/amanplanet-logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "14, rue Ibn Battouta — Quartier Belvédère",
      addressLocality: "Casablanca",
      addressCountry: "MA",
    },
    areaServed: settings.fees.map(([city]) => ({
      "@type": "City",
      name: city,
    })),
    sameAs: [],
  };
}

export function productJsonLd(product: Product, lang: "fr" | "ar" = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: L(lang, product.name),
    sku: product.ref,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      priceCurrency: "MAD",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      url: `${SITE_URL}/catalogue/${productSlug(product)}`,
    },
  };
}

export function loc(o: Localized, lang: "fr" | "ar" = "fr") {
  return L(lang, o);
}
