"use client";

import { useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

export default function AdminLoginPage() {
  const router = useRouter();
  const [user, setUser] = useState("");
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
          body: JSON.stringify({ user, password }),
        });
        if (!res.ok) {
          setError("Identifiant ou mot de passe incorrect.");
          return;
        }
        router.push("/admin");
        router.refresh();
        return;
      }
      const supabase = createClient();
      if (!supabase) throw new Error("no client");
      const email = user.includes("@") ? user : `${user}@amanplanet.local`;
      const { error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (err) {
        setError("Identifiant ou mot de passe incorrect.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-login">
      <form onSubmit={onSubmit} className="admin-login-card card pad">
        <div className="admin-login-head">
          <span className="admin-login-mark">
            <Icon name="shield" size={20} />
          </span>
          <div>
            <h1>Connexion back-office</h1>
            <p className="xs muted">Réservé à l&apos;équipe AMANPLANET</p>
          </div>
        </div>

        <div className="field">
          <label htmlFor="user">Identifiant</label>
          <input
            className="input"
            id="user"
            name="username"
            type="text"
            autoComplete="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="password">Mot de passe</label>
          <input
            className="input"
            id="password"
            name="password"
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
