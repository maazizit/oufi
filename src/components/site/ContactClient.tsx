"use client";

import { useState } from "react";
import Link from "next/link";
import type { Settings } from "@/lib/types";
import { SITE } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { FeesTable } from "./FeesTable";
import { useLang } from "./LangProvider";

export function ContactClient({ settings }: { settings: Settings }) {
  const { t, L } = useLang();
  const [copied, setCopied] = useState("");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", msg: "" });
  const fees = (settings.fees?.length ? settings.fees : SITE.fees) as [string, number][];

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

  const row = (
    ic: "pin" | "phone" | "mail" | "cal",
    lab: string,
    val: string,
    key: string,
    ltr = false,
    linkHref?: string,
  ) => (
    <div className="contact-row">
      <span className="contact-row-ic">
        <Icon name={ic} size={18} />
      </span>
      <div className="contact-row-body">
        <div className="lab">{lab}</div>
        <div className="mono" style={{ wordBreak: "break-word" }} dir={ltr ? "ltr" : undefined}>
          {linkHref ? (
            <a href={linkHref}>{val}</a>
          ) : (
            val
          )}
        </div>
      </div>
      <button type="button" className="btn btn-sm btn-out" onClick={() => copy(val, key)}>
        {copied === key ? t("ct_copied") : t("ct_copy")}
      </button>
    </div>
  );

  return (
    <>
      <section className="page-band">
        <div className="wrap page-band-in rise">
          <p className="page-band-k mono">
            C.I.S · {SITE.hqCity.toUpperCase()} · CONTACT
          </p>
          <h1>{t("ct_t")}</h1>
          <p className="page-band-lead">{t("ct_lead")}</p>
          <div className="page-band-cta">
            <a className="btn btn-pri" href={SITE.telHref} dir="ltr">
              <Icon name="phone" size={16} /> {SITE.phoneDisplay}
            </a>
            <a
              className="btn btn-ghost"
              href={SITE.waHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="wa" size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="sec wrap">
        <div className="contact-grid">
          <div className="contact-panel">
            {row("pin", t("ct_addr"), L(SITE.address), "a")}
            {row("phone", t("ch_phone"), SITE.phoneDisplay, "p", true, SITE.telHref)}
            {row("mail", t("ch_mail"), SITE.email, "m", true, SITE.mailHref)}
            {row("cal", t("ct_hours"), L(settings.hours), "h")}
            <div>
              <div className="lab">{t("ct_zone")}</div>
              <div className="frow" style={{ marginTop: 8 }}>
                {fees.map(([c]) => (
                  <span key={c} className="tag-soft">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="contact-panel">
            <h2 className="contact-panel-t">{t("ct_msg")}</h2>
            {sent ? <div className="ok-box">{t("cf_t")}</div> : null}
            <div className="field">
              <label htmlFor="cm_n">{t("q_name")}</label>
              <input
                className="input"
                id="cm_n"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="field">
              <label htmlFor="cm_c">
                {t("q_phone")} / {t("q_mail")}
              </label>
              <input
                className="input"
                id="cm_c"
                dir="ltr"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
              />
            </div>
            <div className="field">
              <label htmlFor="cm_m">{t("ct_msg")}</label>
              <textarea
                className="textarea"
                id="cm_m"
                value={form.msg}
                onChange={(e) => setForm({ ...form, msg: e.target.value })}
              />
            </div>
            <div className="contact-actions">
              <button type="button" className="btn btn-pri" onClick={send}>
                {t("ct_send")}
              </button>
              <Link href="/devis" className="btn btn-out">
                {t("ct_quote")}
              </Link>
            </div>
          </div>
        </div>

        <div className="fees-block" style={{ marginTop: 28 }}>
          <h3 className="fees-block-t">{t("ct_fees")}</h3>
          <p className="ink2 sm" style={{ marginBottom: 14 }}>
            {t("ct_feesd")}
          </p>
          <FeesTable fees={fees} />
        </div>
      </section>
    </>
  );
}
