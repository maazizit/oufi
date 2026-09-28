"use client";

import { useState } from "react";
import type { Request } from "@/lib/types";
import { statusOf } from "@/lib/utils";
import { fmtDT } from "@/lib/utils";
import { useLang } from "./LangProvider";

export function TrackClient() {
  const { t } = useLang();
  const [q, setQ] = useState("");
  const [res, setRes] = useState<Request | null | undefined>(undefined);
  const [busy, setBusy] = useState(false);

  async function search() {
    setBusy(true);
    try {
      const r = await fetch(`/api/track?q=${encodeURIComponent(q.trim())}`);
      const data = await r.json();
      setRes(data.request ?? null);
    } finally {
      setBusy(false);
    }
  }

  const steps = ["new", "contacted", "visit", "sent", "done"] as const;

  return (
    <section className="sec wrap" style={{ maxWidth: 720 }}>
      <div className="sec-h rise">
        <h1>{t("tr_t")}</h1>
        <p className="ink2">{t("tr_lead")}</p>
      </div>
      <div className="toolbar rise d2">
        <input
          className="input search mono"
          placeholder={t("tr_ph")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
        />
        <button type="button" className="btn btn-pri" disabled={busy} onClick={search}>
          {t("tr_btn")}
        </button>
      </div>
      {res === null ? (
        <p className="muted" style={{ marginTop: 18 }}>
          {t("tr_none", { q })}
        </p>
      ) : null}
      {res ? (
        <div className="card pad" style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <b className="mono">{res.ref}</b>
            <span className={`pill ${statusOf(res.status).p}`}>{t(statusOf(res.status).k)}</span>
          </div>
          <div>
            <div className="lab">{t("tr_state")}</div>
            <div className="stepper" style={{ marginTop: 8 }}>
              {steps.map((s, i) => {
                const reached =
                  steps.indexOf(res.status as (typeof steps)[number]) >= 0
                    ? steps.indexOf(res.status as (typeof steps)[number])
                    : res.status === "won"
                      ? 3
                      : 4;
                return (
                  <div key={s} className="s" data-on={i === reached ? 1 : 0} data-done={i < reached ? 1 : 0}>
                    <b>{i + 1}</b>
                    {t(statusOf(s).k)}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="lab" style={{ marginBottom: 8 }}>
              {t("tr_hist")}
            </div>
            <ul className="tl">
              {(res.tl || [])
                .slice()
                .reverse()
                .map((e, i) => (
                  <li key={i} data-on="1">
                    <span className="dot" />
                    <span>
                      <span className="t">{e.k === "created" ? t("st_new") : t(statusOf(e.v || "new").k)}</span>
                      <span className="m">{fmtDT(e.at)}</span>
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
}
