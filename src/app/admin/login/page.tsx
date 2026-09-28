"use client";

import { useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const configured = isSupabaseConfigured();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (!configured) {
        const res = await fetch("/api/admin/demo-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        });
        if (!res.ok) {
          setError("Mot de passe démo incorrect (voir ADMIN_DEMO_PASSWORD).");
          return;
        }
        router.push("/admin");
        router.refresh();
        return;
      }
      const supabase = createClient();
      if (!supabase) throw new Error("no client");
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) {
        setError(err.message);
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 16, background: "var(--bg)" }}>
      <form onSubmit={onSubmit} className="card pad" style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ width: 40, height: 40, borderRadius: 10, background: "var(--navy)", color: "#fff", display: "grid", placeItems: "center" }}>
            <Icon name="shield" size={20} />
          </span>
          <div>
            <h1 style={{ fontSize: 20 }}>Connexion back-office</h1>
            <p className="xs muted">Réservé à l&apos;équipe Oufi Sécurité</p>
          </div>
        </div>
        {!configured ? (
          <div className="feebar">
            Mode démo local : utilisez le mot de passe <b className="mono">ADMIN_DEMO_PASSWORD</b> (défaut{" "}
            <span className="mono">oufi-admin</span>). Pour la prod, configurez Supabase Auth.
          </div>
        ) : (
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              className="input"
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}
        <div className="field">
          <label htmlFor="password">Mot de passe</label>
          <input
            className="input"
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error ? <p className="err">{error}</p> : null}
        <button type="submit" className="btn btn-pri" disabled={busy}>
          Se connecter
        </button>
      </form>
    </div>
  );
}
