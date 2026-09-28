import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AMANPLANET — Conseil • Installation • Suivi",
    template: "%s · AMANPLANET",
  },
  description:
    "AMANPLANET C.I.S. — caméras, routeurs, domotique et alarmes. Vente, installation et maintenance pour entreprises, magasins et villas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" data-theme="light" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
