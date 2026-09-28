"use client";

import { useState } from "react";
import type { Request, RequestStatus } from "@/lib/types";
import { statusOf, fmtDT } from "@/lib/utils";
import { useLang } from "./LangProvider";

const FLOW: { id: RequestStatus | "install"; k: string }[] = [
  { id: "new", k: "tr_step_new" },
  { id: "visit", k: "tr_step_visit" },
  { id: "sent", k: "tr_step_sent" },
  { id: "won", k: "tr_step_won" },
  { id: "done", k: "tr_step_done" },
];

function flowIndex(status: RequestStatus) {
  if (status === "new" || status === "contacted") return 0;
  if (status === "visit") return 1;
  if (status === "sent") return 2;
  if (status === "won") return 3;
  if (status === "done") return 4;
  if (status === "lost") return -1;
  return 0;
}

export function TrackClient() {
  const { t } = useLang();
  const [q, setQ] = useState("");
  const [res, setRes] = useState<Request | null | undefined>(undefined);
  const [busy, setBusy] = useState(false);

  async function search() {
    if (!q.trim()) return;
    setBusy(true);
    setRes(undefined);
    try {
      const r = await fetch(`/api/track?q=${encodeURIComponent(q.trim())}`);
      const data = await r.json();
      setRes(data.request ?? null);
    } finally {
      setBusy(false);
    }
  }

  const reached = res ? flowIndex(res.status) : -1;

  return (
    <section className="sec wrap" style={{ maxWidth: 720 }}>
      <div className="sec-h">
        <h1>{t("tr_t")}</h1>
        <p className="ink2">{t("tr_lead")}</p>
      </div>
      <div className="toolbar">
        <label className="sr-only" htmlFor="track-q">
          {t("tr_ph")}
        </label>
        <input
          id="track-q"
          className="input search mono"
          placeholder={t("tr_ph")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()}
        />
        <button type="button" className="btn btn-pri" disabled={busy} onClick={search}>
          {busy ? t("tr_loading") : t("tr_btn")}
        </button>
      </div>
      {busy ? <p className="muted" style={{ marginTop: 18 }}>{t("tr_loading")}</p> : null}
      {!busy && res === null ? (
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
            <ol className="track-flow">
              {FLOW.map((s, i) => (
                <li
                  key={s.id}
                  data-on={i === reached ? 1 : 0}
                  data-done={i < reached ? 1 : 0}
                >
                  <b>{i + 1}</b>
                  <span>{t(s.k)}</span>
                </li>
              ))}
            </ol>
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
                      <span className="t">
                        {e.k === "created" ? t("tr_step_new") : t(statusOf(e.v || "new").k)}
                      </span>
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
