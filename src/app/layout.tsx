import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Oufi Sécurité — Vidéosurveillance & réseaux",
    template: "%s · Oufi Sécurité",
  },
  description:
    "Installation et maintenance de caméras, réseau et informatique à Casablanca et région. Devis sur site, sans paiement en ligne.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
