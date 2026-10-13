"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { AdminSession } from "@/lib/admin/permissions";
import { ADMIN_PAGE_LABELS, ADMIN_PAGE_KEYS } from "@/lib/admin/permissions";
import { validateAdminPassword } from "@/lib/admin/password-policy";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { useAdminLang } from "./AdminLangProvider";
import { AdminPasswordRules } from "./AdminPasswordRules";

export function AdminCompteClient({ session }: { session: AdminSession }) {
  const router = useRouter();
  const search = useSearchParams();
  const { t } = useAdminLang();
  const forcedChange = search.get("change") === "1" || session.mustChangePassword;
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [msg, setMsg] = useState("");
  const [msgOk, setMsgOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const configured = isSupabaseConfigured();

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setMsgOk(false);

    const check = validateAdminPassword(password);
    if (!check.ok) {
      setMsg(t("adm_pw_err_weak"));
      return;
    }
    if (password !== password2) {
      setMsg(t("adm_pw_err_mismatch"));
      return;
    }
    if (!configured) {
      setMsg(t("adm_pw_err_demo"));
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.error === "weak_password") {
          setMsg(t("adm_pw_err_weak"));
        } else {
          setMsg(t("adm_pw_err_update"));
        }
        return;
      }
      setPassword("");
      setPassword2("");
      setMsg(t("adm_pw_ok"));
      setMsgOk(true);
      router.replace("/admin/compte");
      router.refresh();
    } catch {
      setMsg(t("adm_pw_err_update"));
    } finally {
      setBusy(false);
    }
  }

  const roleLabel =
    session.role === "super_admin" ? t("adm_role_super") : t("adm_role_manager");

  return (
    <div style={{ maxWidth: 520, display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="card pad">
        <h3 style={{ marginTop: 0 }}>{t("adm_compte_profile")}</h3>
        <p className="sm">
          <span className="muted">{t("adm_compte_email")} · </span>
          <span className="mono">{session.email}</span>
        </p>
        <p className="sm">
          <span className="muted">{t("adm_compte_role")} · </span>
          {roleLabel}
        </p>
        {session.role === "manager" ? (
          <p className="xs muted" style={{ marginTop: 10 }}>
            {t("adm_compte_pages")}{" "}
            {ADMIN_PAGE_KEYS.filter((k) => session.permissions[k])
              .map((k) => ADMIN_PAGE_LABELS[k])
              .join(", ") || "—"}
          </p>
        ) : null}
      </div>

      {forcedChange ? (
        <div className="admin-pw-banner admin-pw-banner-inline card pad" role="status">
          <p className="sm" style={{ margin: 0 }}>{t("adm_pw_banner_required")}</p>
        </div>
      ) : null}

      <form className="card pad" onSubmit={changePassword}>
        <h3 style={{ marginTop: 0 }}>{t("adm_compte_pw_title")}</h3>
        <p className="xs muted" style={{ marginBottom: 12 }}>{t("adm_compte_pw_intro")}</p>
        <div className="field">
          <label htmlFor="pw1">{t("adm_compte_pw_new")}</label>
          <input
            id="pw1"
            type="password"
            className="input"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {password ? <AdminPasswordRules password={password} /> : null}
        <div className="field" style={{ marginTop: 12 }}>
          <label htmlFor="pw2">{t("adm_compte_pw_confirm")}</label>
          <input
            id="pw2"
            type="password"
            className="input"
            autoComplete="new-password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        {msg ? (
          <p className={`sm ${msgOk ? "" : "err"}`} style={msgOk ? { color: "var(--ok, #0a7)" } : undefined}>
            {msg}
          </p>
        ) : null}
        <button
          type="submit"
          className="btn btn-pri"
          disabled={busy || !password || !password2}
        >
          {t("adm_compte_pw_submit")}
        </button>
      </form>
    </div>
  );
}
