"use client";

import { useState } from "react";
import Link from "next/link";
import type { Settings } from "@/lib/types";
import { money } from "@/lib/data/i18n";
import { Icon } from "@/components/ui/Icon";
import { useLang } from "./LangProvider";

export function ContactClient({ settings }: { settings: Settings }) {
  const { lang, t, L } = useLang();
  const [copied, setCopied] = useState("");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", msg: "" });

  function copy(v: string, k: string) {
    navigator.clipboard?.writeText(v).finally(() => {
      setCopied(k);
      setTimeout(() => setCopied(""), 1600);
    });
  }

  async function send() {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSent(true);
    setForm({ name: "", contact: "", msg: "" });
  }

  const row = (ic: "pin" | "phone" | "mail" | "cal", lab: string, val: string, key: string) => (
    <div style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
      <span style={{ color: "var(--blue-ink)", marginTop: 2 }}>
        <Icon name={ic} size={18} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="lab">{lab}</div>
        <div className="mono" style={{ wordBreak: "break-word" }}>
          {val}
        </div>
      </div>
      <button type="button" className="btn btn-sm btn-out" onClick={() => copy(val, key)}>
        {copied === key ? t("ct_copied") : t("ct_copy")}
      </button>
    </div>
  );

  return (
    <section className="sec wrap">
      <div className="sec-h rise">
        <h1>{t("ct_t")}</h1>
        <p className="ink2">{t("ct_lead")}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
        <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {row("pin", t("ct_addr"), L(settings.address), "a")}
          {row("phone", t("ch_phone"), settings.phone, "p")}
          {row("mail", t("ch_mail"), settings.email, "m")}
          {row("cal", t("ct_hours"), L(settings.hours), "h")}
          <div>
            <div className="lab">{t("ct_zone")}</div>
            <div className="frow" style={{ marginTop: 8 }}>
              {settings.fees.map(([c]) => (
                <span key={c} className="tag-soft">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h3>{t("ct_msg")}</h3>
          {sent ? <div className="ok-box">{t("cf_t")}</div> : null}
          <div className="field">
            <label htmlFor="cm_n">{t("q_name")}</label>
            <input className="input" id="cm_n" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="cm_c">
              {t("q_phone")} / {t("q_mail")}
            </label>
            <input className="input" id="cm_c" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="cm_m">{t("ct_msg")}</label>
            <textarea className="textarea" id="cm_m" value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} />
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button type="button" className="btn btn-pri" onClick={send}>
              {t("ct_send")}
            </button>
            <Link href="/devis" className="btn btn-out">
              {t("ct_quote")}
            </Link>
          </div>
        </div>
      </div>
      <div className="card pad" style={{ marginTop: 18 }}>
        <h3 style={{ marginBottom: 8 }}>{t("ct_fees")}</h3>
        <p className="hint" style={{ marginBottom: 12 }}>
          {t("ct_feesd")}
        </p>
        <div className="tw">
          <table>
            <thead>
              <tr>
                <th>{t("q_city")}</th>
                <th>{t("th_price")}</th>
              </tr>
            </thead>
            <tbody>
              {settings.fees.map(([c, f]) => (
                <tr key={c}>
                  <td>{c}</td>
                  <td className="num mono">{money(lang, f)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
