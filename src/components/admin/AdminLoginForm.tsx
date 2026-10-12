"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { useAdminLang } from "@/components/admin/AdminLangProvider";
import { AdminLangToggle } from "@/components/admin/AdminLangToggle";

export function AdminLoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const { t } = useAdminLang();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const accessErr = search.get("err") === "access";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });
      if (!res.ok) {
        setError(t("adm_login_err"));
        return;
      }
      const next = new URLSearchParams(window.location.search).get("next");
      router.push(next && next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-login">
      <form onSubmit={onSubmit} className="admin-login-card card pad">
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
          <AdminLangToggle />
        </div>
        <div className="admin-login-head">
          <span className="admin-login-mark">
            <Icon name="shield" size={20} />
          </span>
          <div>
            <h1>{t("adm_login_title")}</h1>
            <p className="xs muted">{t("adm_login_sub")}</p>
          </div>
        </div>

        {accessErr ? <p className="err">{t("adm_access_denied")}</p> : null}

        <div className="field">
          <label htmlFor="user">{t("adm_login_user")}</label>
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
          <label htmlFor="password">{t("adm_login_password")}</label>
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
          {t("adm_login_submit")}
        </button>
      </form>
    </div>
  );
}
