"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const STATUSES = [
  { id: "", label: "Toutes" },
  { id: "new", label: "Nouvelle" },
  { id: "contacted", label: "Contactée" },
  { id: "visit", label: "Visite planifiée" },
  { id: "sent", label: "Devis envoyé" },
  { id: "won", label: "Acceptée" },
  { id: "done", label: "Terminée" },
  { id: "lost", label: "Annulée" },
];

const TYPES = [
  { id: "", label: "Tous les types" },
  { id: "install", label: "Installation" },
  { id: "prod", label: "Devis matériel / achat" },
  { id: "maint", label: "Maintenance" },
  { id: "fix", label: "Dépannage" },
];

export function DemandesFilters({
  status,
  src,
  type,
  q,
  counts,
  typeCounts,
}: {
  status: string;
  src: string;
  type: string;
  q: string;
  counts: Record<string, number>;
  typeCounts: Record<string, number>;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(q);

  function push(next: { status?: string; src?: string; type?: string; q?: string }) {
    const p = new URLSearchParams();
    const s = next.status ?? status;
    const sr = next.src ?? src;
    const ty = next.type ?? type;
    const qq = next.q ?? query;
    if (s) p.set("status", s);
    if (sr) p.set("src", sr);
    if (ty) p.set("type", ty);
    if (qq) p.set("q", qq);
    router.push(`/admin/demandes?${p.toString()}`);
  }

  return (
    <>
      <div className="toolbar">
        <input
          className="input search"
          placeholder="Réf., client, ville, téléphone…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && push({ q: query })}
        />
        <select
          className="select"
          style={{ width: "auto" }}
          value={src}
          onChange={(e) => push({ src: e.target.value })}
        >
          <option value="">Origine — Toutes</option>
          <option value="form">Formulaire devis</option>
          <option value="cart">Panier / achat articles</option>
          <option value="contact">Contact</option>
        </select>
      </div>
      <div className="admin-type-filters">
        {TYPES.map((ty) => (
          <button
            key={ty.id || "all-types"}
            type="button"
            className="chip"
            aria-pressed={type === ty.id}
            onClick={() => push({ type: ty.id })}
          >
            {ty.label}
            {ty.id ? ` (${typeCounts[ty.id] ?? 0})` : ` (${typeCounts.all ?? 0})`}
          </button>
        ))}
      </div>
      <div className="frow">
        {STATUSES.map((s) => (
          <button
            key={s.id || "all"}
            type="button"
            className="chip"
            aria-pressed={status === s.id}
            onClick={() => push({ status: s.id })}
          >
            {s.label} ({counts[s.id] ?? 0})
          </button>
        ))}
      </div>
    </>
  );
}
