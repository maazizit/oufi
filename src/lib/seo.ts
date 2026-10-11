import type { Metadata } from "next";
import type { Localized, Product, Settings } from "./types";
import { L } from "./data/i18n";
import { SITE, SITE_URL as CONFIG_SITE_URL } from "./site-config";
import { alternateUrls, stripLocalePrefix } from "./locale";

export const SITE_URL = CONFIG_SITE_URL;

export function productSlug(p: Pick<Product, "ref" | "id">) {
  return (p.ref || p.id)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function pageMeta({
  title,
  description,
  path = "/",
  lang = "fr",
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  lang?: "fr" | "ar";
  noIndex?: boolean;
}): Metadata {
  const bare = stripLocalePrefix(path);
  const alts = alternateUrls(bare, SITE_URL);
  const canonical = lang === "ar" ? alts.ar : alts.fr;
  const shortTitle = title.length > 60 ? `${title.slice(0, 57)}…` : title;
  const shortDesc =
    description.length > 155 ? `${description.slice(0, 152)}…` : description;

  return {
    title: shortTitle,
    description: shortDesc,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical,
      languages: {
        "fr-MA": alts["fr-MA"],
        "ar-MA": alts["ar-MA"],
        "x-default": alts["x-default"],
      },
    },
    openGraph: {
      title: shortTitle,
      description: shortDesc,
      url: canonical,
      siteName: SITE.name,
      locale: lang === "ar" ? "ar_MA" : "fr_MA",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/brand/hero-install.jpg`,
          width: 2000,
          height: 1333,
          alt: `${SITE.name} installation`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shortTitle,
      description: shortDesc,
      images: [`${SITE_URL}/brand/hero-install.jpg`],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/amanplanet-logo.png`,
    email: SITE.email,
    telephone: SITE.phoneDisplay,
    sameAs: [],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE_URL,
    inLanguage: ["fr-MA", "ar-MA"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/catalogue?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function localBusinessJsonLd(settings: Settings) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: settings.company || SITE.name,
    description: `${SITE.cis} — caméras, réseau, domotique, alarmes. Siège Marrakech, interventions dans tout le Maroc.`,
    url: SITE_URL,
    telephone: settings.phone || SITE.phoneDisplay,
    email: settings.email || SITE.email,
    image: `${SITE_URL}/brand/amanplanet-logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.locality,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    areaServed: {
      "@type": "Country",
      name: "Morocco",
    },
    openingHours: "Mo-Fr 09:00-18:30, Sa 09:00-13:00",
    priceRange: "$$",
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  priceFrom?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    provider: { "@type": "Organization", name: SITE.name, url: SITE_URL },
    areaServed: { "@type": "Country", name: "Morocco" },
    url: `${SITE_URL}${opts.path}`,
    ...(opts.priceFrom
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "MAD",
            price: opts.priceFrom,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function faqJsonLd(
  items: { q: string; a: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function breadcrumbJsonLd(
  crumbs: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

export function productJsonLd(product: Product, lang: "fr" | "ar" = "fr") {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: L(lang, product.name),
    sku: product.ref,
    brand: { "@type": "Brand", name: product.brand },
    description: `${L(lang, product.name)} — ${product.brand}. Prix indicatif ${product.price} MAD TTC, hors pose. Livraison / installation au Maroc via AMANPLANET.`,
    offers: {
      "@type": "Offer",
      priceCurrency: "MAD",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      url: `${SITE_URL}/catalogue/${productSlug(product)}`,
      seller: { "@type": "Organization", name: SITE.name },
    },
  };
}

export function loc(o: Localized, lang: "fr" | "ar" = "fr") {
  return L(lang, o);
}
