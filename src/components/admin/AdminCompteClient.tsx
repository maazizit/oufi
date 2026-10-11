"use client";

import { useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import type { AdminSession } from "@/lib/admin/permissions";
import { ADMIN_PAGE_LABELS, ADMIN_PAGE_KEYS } from "@/lib/admin/permissions";

export function AdminCompteClient({ session }: { session: AdminSession }) {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const configured = isSupabaseConfigured();

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    if (password.length < 8) {
      setMsg("Mot de passe : 8 caractères minimum.");
      return;
    }
    if (password !== password2) {
      setMsg("Les mots de passe ne correspondent pas.");
      return;
    }
    if (!configured) {
      setMsg("Mode démo : changez le mot de passe via les variables d'environnement.");
      return;
    }
    setBusy(true);
    try {
      const supabase = createClient();
      if (!supabase) throw new Error("no_client");
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setPassword("");
      setPassword2("");
      setMsg("Mot de passe mis à jour.");
    } catch {
      setMsg("Impossible de mettre à jour le mot de passe.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 480, display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="card pad">
        <h3 style={{ marginTop: 0 }}>Profil</h3>
        <p className="sm">
          <span className="muted">E-mail · </span>
          <span className="mono">{session.email}</span>
        </p>
        <p className="sm">
          <span className="muted">Rôle · </span>
          {session.role === "super_admin" ? "Super administrateur" : "Gestionnaire"}
        </p>
        {session.role === "manager" ? (
          <p className="xs muted" style={{ marginTop: 10 }}>
            Pages autorisées :{" "}
            {ADMIN_PAGE_KEYS.filter((k) => session.permissions[k])
              .map((k) => ADMIN_PAGE_LABELS[k])
              .join(", ") || "aucune"}
          </p>
        ) : null}
      </div>

      <form className="card pad" onSubmit={changePassword}>
        <h3 style={{ marginTop: 0 }}>Mot de passe</h3>
        <p className="xs muted" style={{ marginBottom: 12 }}>
          À mettre à jour si le gestionnaire change ou pour sécuriser le compte.
        </p>
        <div className="field">
          <label htmlFor="pw1">Nouveau mot de passe</label>
          <input
            id="pw1"
            type="password"
            className="input"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="pw2">Confirmer</label>
          <input
            id="pw2"
            type="password"
            className="input"
            autoComplete="new-password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        {msg ? <p className="sm muted">{msg}</p> : null}
        <button type="submit" className="btn btn-pri" disabled={busy}>
          Mettre à jour
        </button>
      </form>
    </div>
  );
}
