import Link from "next/link";
import { SITE } from "@/lib/site";

export function SeoCta() {
  return (
    <div className="cta" style={{ marginTop: 28, flexWrap: "wrap", gap: 10 }}>
      <Link href="/devis" className="btn btn-pri btn-lg">
        Demander un devis
      </Link>
      <a href={SITE.waHref} className="btn btn-ghost btn-lg" target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
      <a href={SITE.telHref} className="btn btn-ghost btn-lg">
        {SITE.phoneDisplay}
      </a>
    </div>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <nav aria-label="Fil d'Ariane" className="sm muted" style={{ marginBottom: 16 }}>
      {items.map((it, i) => (
        <span key={it.href}>
          {i > 0 ? " · " : null}
          {i < items.length - 1 ? <Link href={it.href}>{it.label}</Link> : <span>{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}
