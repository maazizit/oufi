"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Request, TeamMember } from "@/lib/types";
import { STATUSES } from "@/lib/data/constants";
import { fmtDT } from "@/lib/utils";

const statusLabels: Record<string, string> = {
  st_new: "Nouvelle",
  st_contacted: "Contactée",
  st_visit: "Visite planifiée",
  st_sent: "Devis envoyé",
  st_won: "Acceptée",
  st_done: "Terminée",
  st_lost: "Annulée",
};

export function RequestActions({
  request,
  team,
}: {
  request: Request;
  team: TeamMember[];
}) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  async function patch(body: Record<string, unknown>) {
    setBusy(true);
    try {
      await fetch(`/api/admin/requests/${encodeURIComponent(request.ref)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div className="grid2">
        <div className="field">
          <label htmlFor="rst">Changer le statut</label>
          <select
            className="select"
            id="rst"
            defaultValue={request.status}
            disabled={busy}
            onChange={(e) => patch({ status: e.target.value })}
          >
            {STATUSES.map((s) => (
              <option key={s.id} value={s.id}>
                {statusLabels[s.k]}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="rtec">Technicien assigné</label>
          <select
            className="select"
            id="rtec"
            defaultValue={request.tech}
            disabled={busy}
            onChange={(e) => patch({ tech: e.target.value })}
          >
            <option value="">Non assigné</option>
            {team
              .filter((x) => x.active && x.role !== "sales")
              .map((x) => (
                <option key={x.id} value={x.id}>
                  {x.name} — {x.role}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="rnote">Notes internes</label>
        <textarea
          className="textarea"
          id="rnote"
          placeholder="Ce que le client a dit au téléphone…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-sm btn-out"
          style={{ alignSelf: "flex-start" }}
          disabled={busy || !note.trim()}
          onClick={async () => {
            await patch({ note: note.trim() });
            setNote("");
          }}
        >
          Ajouter la note
        </button>
      </div>
      {(request.notes || []).length ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {request.notes
            .slice()
            .reverse()
            .map((n, i) => (
              <div key={i} style={{ background: "var(--surface-2)", borderRadius: 7, padding: "9px 11px" }}>
                <div className="xs muted mono">{fmtDT(n.at)}</div>
                <div className="sm">{n.txt}</div>
              </div>
            ))}
        </div>
      ) : null}
      <button
        type="button"
        className="btn btn-navy"
        style={{ alignSelf: "flex-start" }}
        disabled={busy}
        onClick={async () => {
          await fetch("/api/admin/interventions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ref: request.ref }),
          });
          router.push("/admin/interventions");
          router.refresh();
        }}
      >
        Planifier une intervention
      </button>
    </div>
  );
}
