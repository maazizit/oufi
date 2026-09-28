"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Request, Settings } from "@/lib/types";
import { chanOf } from "@/lib/utils";
import { money } from "@/lib/data/i18n";
import { readLastRequest } from "@/lib/client/last-request";
import { useLang } from "./LangProvider";

export function ConfirmClient({
  settings,
  request: initial,
  refParam,
}: {
  settings: Settings;
  request: Request | null;
  refParam?: string;
}) {
  const { lang, t } = useLang();
  const [request, setRequest] = useState<Request | null>(initial);

  useEffect(() => {
    if (initial) {
      setRequest(initial);
      return;
    }
    const local = readLastRequest(refParam || undefined);
    if (local) setRequest(local);
  }, [initial, refParam]);

  if (!request) {
    return (
      <section className="sec wrap">
        <div className="card pad">
          <p className="muted">
            {t("tr_none", { q: refParam || "—" })}
          </p>
          <Link href="/devis" className="btn btn-pri" style={{ marginTop: 12, marginInlineEnd: 8 }}>
            {t("q_title")}
          </Link>
          <Link href="/" className="btn btn-out" style={{ marginTop: 12 }}>
            {t("cf_home")}
          </Link>
        </div>
      </section>
    );
  }

  const ch = chanOf(request.chan);
  const contact = request.chan === "mail" ? request.email : request.phone;

  return (
    <section className="sec wrap" style={{ maxWidth: 640 }}>
      <div className="ok-box rise">
        <h1>{t("cf_t")}</h1>
        <div>
          <div className="lab">{t("cf_ref")}</div>
          <b className="mono" style={{ fontSize: 22 }}>
            {request.ref}
          </b>
        </div>
        <p>
          {t("cf_24", {
            chan: t(ch.k),
            contact,
          })}
        </p>
        <p className="sm">{t("cf_keep")}</p>
        {request.fee != null ? (
          <div className="feebar">
            <span>
              <b>
                {t("q_feeline")} : {money(lang, request.fee)}
              </b>
              <br />
              {t("q_feenote")}
            </span>
          </div>
        ) : null}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href={`/suivi?q=${encodeURIComponent(request.ref)}`} className="btn btn-pri">
            {t("cf_track")}
          </Link>
          <Link href="/" className="btn btn-out">
            {t("cf_home")}
          </Link>
        </div>
        <p className="xs muted">
          {settings.company} · {settings.sla} h
        </p>
      </div>
    </section>
  );
}
