"use client";

import Link from "next/link";
import type { Settings } from "@/lib/types";
import { money } from "@/lib/data/i18n";
import { PILLARS } from "@/lib/data/constants";
import { SERVICE_DETAILS } from "@/lib/data/services-content";
import { SITE } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";
import { FeesTable } from "./FeesTable";
import { SectionHeader } from "./SectionHeader";
import { useLang } from "./LangProvider";

export function ServicesClient({ settings }: { settings: Settings }) {
  const { lang, t, L } = useLang();
  const fees = (settings.fees?.length ? settings.fees : SITE.fees) as [
    string,
    number,
  ][];

  return (
    <>
      <section className="page-band">
        <div className="wrap page-band-in rise">
          <p className="page-band-k mono">
            C.I.S · {SITE.hqCity.toUpperCase()} · SERVICES
          </p>
          <h1>{t("s_page_title")}</h1>
          <p className="page-band-lead">{t("s_page_lead")}</p>
          <div className="page-band-cta">
            <Link href="/devis" className="btn btn-pri">
              {t("s_quote")} <Icon name="arrow" size={16} />
            </Link>
            <a href={SITE.telHref} className="btn btn-ghost" dir="ltr">
              <Icon name="phone" size={16} /> {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="sec wrap pillars-sec">
        <SectionHeader
          eyebrow="C.I.S."
          title={t("pill_title")}
          lead={t("pill_lead")}
        />
        <div className="pillars">
          {PILLARS.map((p, i) => (
            <Link
              key={p.id}
              href={p.href}
              className={`pillar rev r${(i % 4) + 1}`}
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

      <section className="sec wrap">
        <SectionHeader title={t("s_page_title")} lead={t("s_page_lead")} />

        <nav className="svc-anchors" aria-label="Ancres services">
          {SERVICE_DETAILS.map((s, i) => (
            <a key={s.id} className="svc-anchor" href={`#${s.anchor}`}>
              <span className="mono svc-anchor-n">
                {String(i + 1).padStart(2, "0")}
              </span>
              {t(s.k)}
            </a>
          ))}
        </nav>

        {SERVICE_DETAILS.map((s, i) => (
          <article key={s.id} id={s.anchor} className="svc-detail rev">
            <header>
              <span className="ic">
                <Icon name={s.ic} size={22} />
              </span>
              <div className="svc-detail-head">
                <span className="mono svc-code">
                  SVC-{String(i + 1).padStart(2, "0")} · {s.anchor.toUpperCase()}
                </span>
                <h2>{t(s.k)}</h2>
                <p className="muted sm">
                  {t("s_from")}{" "}
                  <b className="num" dir="ltr">
                    {money(lang, s.from)}
                  </b>
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
            <div className="svc-detail-actions">
              <Link href={`/devis?svc=${s.id}`} className="btn btn-pri">
                {t("s_quote")}
              </Link>
              <Link href={`/catalogue`} className="btn btn-out">
                {t("h_cta2")}
              </Link>
            </div>
          </article>
        ))}

        <div className="fees-block" style={{ marginTop: 36 }}>
          <h3 className="fees-block-t">{t("s_fees_t")}</h3>
          <p className="ink2 sm" style={{ marginBottom: 14 }}>
            {t("s_fees_d")}
          </p>
          <FeesTable fees={fees} />
        </div>
      </section>

      <section className="cta-final">
        <div className="wrap cta-final-in">
          <div>
            <p className="cta-final-k mono">
              C.I.S · {SITE.hqCity.toUpperCase()}
            </p>
            <h2>{t("cta_t")}</h2>
            <p>{t("cta_d")}</p>
          </div>
          <div className="cta-final-actions">
            <Link href="/devis" className="btn btn-pri btn-lg">
              {t("h_cta1")}
            </Link>
            <a
              href={SITE.waHref}
              className="btn btn-ghost btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="wa" size={17} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
