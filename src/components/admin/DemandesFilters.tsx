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

export function DemandesFilters({
  status,
  src,
  q,
  counts,
}: {
  status: string;
  src: string;
  q: string;
  counts: Record<string, number>;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(q);

  function push(next: { status?: string; src?: string; q?: string }) {
    const p = new URLSearchParams();
    const s = next.status ?? status;
    const sr = next.src ?? src;
    const qq = next.q ?? query;
    if (s) p.set("status", s);
    if (sr) p.set("src", sr);
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
          <option value="form">Formulaire</option>
          <option value="cart">Panier</option>
          <option value="contact">Contact</option>
        </select>
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
