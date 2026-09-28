"use client";

import Link from "next/link";
import type { Settings } from "@/lib/types";
import { money } from "@/lib/data/i18n";
import { PILLARS } from "@/lib/data/constants";
import { SERVICE_DETAILS } from "@/lib/data/services-content";
import { Icon } from "@/components/ui/Icon";
import { useLang } from "./LangProvider";

export function ServicesClient({ settings }: { settings: Settings }) {
  const { lang, t, L } = useLang();

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
            <Link key={p.id} href={p.href} className={`pillar rise d${i + 1}`} data-pill={p.id}>
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
          <h2>{t("s_page_title")}</h2>
          <p className="ink2">{t("s_page_lead")}</p>
        </div>
        <nav className="svc-anchors rise" aria-label="Ancres services">
          {SERVICE_DETAILS.map((s) => (
            <a key={s.id} className="chip" href={`#${s.anchor}`}>
              {t(s.k)}
            </a>
          ))}
        </nav>

        {SERVICE_DETAILS.map((s, i) => (
          <article
            key={s.id}
            id={s.anchor}
            className={`svc-detail rise d${(i % 4) + 1}`}
          >
            <header>
              <span className="ic">
                <Icon name={s.ic} size={22} />
              </span>
              <div>
                <h2>{t(s.k)}</h2>
                <p className="muted sm">
                  {t("s_from")} <b className="num">{money(lang, s.from)}</b>
                </p>
              </div>
            </header>
            <div className="svc-detail-g">
              <div>
                <h3>{t("s_included")}</h3>
                <ul>
                  {s.included.map((k) => (
                    <li key={k}>{t(k)}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>{t("s_examples")}</h3>
                <ul>
                  {s.examples[lang].map((ex) => (
                    <li key={ex}>{ex}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="svc-faq">
              <h3>{t("s_faq")}</h3>
              {s.faq.map((f) => (
                <details key={L(f.q)}>
                  <summary>{L(f.q)}</summary>
                  <p>{L(f.a)}</p>
                </details>
              ))}
            </div>
            <Link href={`/devis?svc=${s.id}`} className="btn btn-pri">
              {t("s_quote")}
            </Link>
          </article>
        ))}

        <div className="fees-table rise" style={{ marginTop: 36 }}>
          <h2>{t("s_fees_t")}</h2>
          <p className="ink2 sm" style={{ marginBottom: 12 }}>
            {t("s_fees_d")}
          </p>
          <div className="tw">
            <table>
              <thead>
                <tr>
                  <th>{t("s_city")}</th>
                  <th>{t("s_fee")}</th>
                </tr>
              </thead>
              <tbody>
                {settings.fees.map(([city, fee]) => (
                  <tr key={city}>
                    <td>{city}</td>
                    <td className="num">{money(lang, fee)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
