"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Request, Settings } from "@/lib/types";
import { buildDevisPdf, downloadBlob, type DevisLine } from "@/lib/pdf/devis";

export function GenerateDevisButton({
  request,
  settings,
  lines,
}: {
  request: Request;
  settings: Settings;
  lines: DevisLine[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onGenerate() {
    setBusy(true);
    setErr("");
    try {
      const blob = await buildDevisPdf({ request, settings, lines });
      downloadBlob(blob, `devis-${request.ref}.pdf`);
      await fetch(`/api/admin/requests/${encodeURIComponent(request.ref)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "sent" }),
      });
      router.refresh();
    } catch {
      setErr("Impossible de générer le PDF. Réessayez.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
      <button
        type="button"
        className="btn btn-pri"
        disabled={busy}
        onClick={onGenerate}
      >
        {busy ? "Génération…" : "Générer devis PDF"}
      </button>
      <span className="xs muted">
        PDF avec logo AMANPLANET — marque le statut « Devis envoyé ».
      </span>
      {err ? <p className="err">{err}</p> : null}
    </div>
  );
}
