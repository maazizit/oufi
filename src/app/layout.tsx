import type { Metadata } from "next";
import "./globals.css";
import { SITE, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — ${SITE.cisShort}`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "AMANPLANET C.I.S. — caméras, routeurs, domotique et alarmes. Vente, installation et maintenance à Marrakech et dans tout le Maroc. Rappel sous 24 h ; devis sous 48 h après visite.",
  alternates: {
    canonical: "/",
    languages: {
      "fr-MA": "/",
      "ar-MA": "/ar",
      "x-default": "/",
    },
  },
  openGraph: {
    title: `${SITE.name} — ${SITE.cisShort}`,
    description:
      "Caméras, réseau et contrôle d’accès à Marrakech et au Maroc. Rappel sous 24 h ; devis sous 48 h après visite.",
    url: SITE_URL,
    siteName: SITE.name,
    locale: "fr_MA",
    type: "website",
    images: [
      {
        url: "/brand/hero-install.jpg",
        width: 2000,
        height: 1333,
        alt: "AMANPLANET installation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.cisShort}`,
    description: "Caméras, réseau et contrôle d’accès — Marrakech & tout le Maroc.",
    images: ["/brand/hero-install.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-theme="light" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
