"use client";

import Link from "next/link";
import type { Settings } from "@/lib/types";
import { money } from "@/lib/data/i18n";
import { PILLARS } from "@/lib/data/constants";
import { Icon } from "@/components/ui/Icon";
import { useLang } from "./LangProvider";

type Svc = {
  id: string;
  k: string;
  ic: "cam" | "router" | "pc" | "badge";
  from: number;
  li: string[];
};

export function ServicesClient({
  settings,
  services,
}: {
  settings: Settings;
  services: Svc[];
}) {
  const { lang, t } = useLang();
  return (
    <>
      <section className="sec wrap">
        <div className="sec-h rise">
          <p className="eyebrow">C.I.S.</p>
          <h1>{t("pill_title")}</h1>
          <p className="ink2">{t("pill_lead")}</p>
        </div>
        <div className="pillars">
          {PILLARS.map((p, i) => (
            <Link
              key={p.id}
              href={p.href}
              className={`pillar rise d${i + 1}`}
              data-pill={p.id}
            >
              <span className="pillar-ic">
                <Icon name={p.ic} size={22} />
              </span>
              <span className="pillar-k">C.I.S.</span>
              <h2 style={{ fontSize: 19 }}>{t(p.k)}</h2>
              <p>{t(p.d)}</p>
              <span className="pillar-cta">
                {t(p.cta)} <Icon name="arrow" size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="sec wrap" style={{ paddingTop: 0 }}>
        <div className="sec-h rise">
          <h2>{t("s_title")}</h2>
          <p className="ink2">{t("s_lead")}</p>
        </div>
        <div className="svc">
          {services.map((s, i) => (
            <div key={s.id} className={`svc-row rise d${i + 1}`}>
              <span className="ic">
                <Icon name={s.ic} size={22} />
              </span>
              <h3 style={{ fontSize: 18 }}>{t(s.k)}</h3>
              <ul>
                {s.li.map((k) => (
                  <li key={k}>{t(k)}</li>
                ))}
              </ul>
              <div className="from">
                {t("s_from")} <b className="num">{money(lang, s.from)}</b>
              </div>
              <Link href={`/devis?svc=${s.id}`} className="btn btn-pri btn-sm">
                {t("h_cta1")}
              </Link>
            </div>
          ))}
          <div className="svc-row rise d5">
            <span className="ic">
              <Icon name="doc" size={22} />
            </span>
            <h3 style={{ fontSize: 18 }}>{t("s_other_t")}</h3>
            <p className="ink2 sm">{t("q_svcother_h")}</p>
            <Link href="/devis?svc=other" className="btn btn-out btn-sm" style={{ marginTop: "auto" }}>
              {t("h_cta1")}
            </Link>
          </div>
        </div>
        <div className="feebar" style={{ marginTop: 28 }}>
          <Icon name="pin" size={18} />
          <span>
            <b>
              {t("ct_fees")} — {settings.fees.map(([c, f]) => `${c}: ${money(lang, f)}`).join(" · ")}
            </b>
            <br />
            {t("ct_feesd")}
          </span>
        </div>
      </section>
    </>
  );
}
