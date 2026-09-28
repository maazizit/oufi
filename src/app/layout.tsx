import type { Metadata } from "next";
import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://oufi-three.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "AMANPLANET — Conseil • Installation • Suivi",
    template: "%s · AMANPLANET",
  },
  description:
    "AMANPLANET C.I.S. — caméras, routeurs, domotique et alarmes. Vente, installation et maintenance à Casablanca et région. Rappel sous 24 h ; devis détaillé sous 48 h après visite.",
  alternates: {
    canonical: "/",
    languages: { fr: "/", ar: "/", "x-default": "/" },
  },
  openGraph: {
    title: "AMANPLANET — Conseil • Installation • Suivi",
    description:
      "Caméras, réseau et contrôle d’accès à Casablanca. Rappel sous 24 h ; devis détaillé sous 48 h après visite.",
    url: SITE,
    siteName: "AMANPLANET",
    locale: "fr_MA",
    type: "website",
    images: [{ url: "/brand/hero-install.jpg", width: 2000, height: 1333, alt: "AMANPLANET installation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AMANPLANET — Conseil • Installation • Suivi",
    description: "Caméras, réseau et contrôle d’accès à Casablanca.",
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
