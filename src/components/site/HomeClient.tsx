"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product, Settings, TeamMember, Localized } from "@/lib/types";
import { money } from "@/lib/data/i18n";
import { PILLARS } from "@/lib/data/constants";
import { SITE } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";
import { CameraWall } from "./CameraWall";
import { FeesTable } from "./FeesTable";
import { ProductCard } from "./ProductCard";
import { SectionHeader } from "./SectionHeader";
import { StatBand } from "./StatBand";
import { useLang } from "./LangProvider";

type Svc = {
  id: string;
  k: string;
  ic: "cam" | "router" | "pc" | "badge";
  from: number;
  li: string[];
  anchor: string;
};

const SVC_ANCHORS: Record<string, string> = {
  cam: "videosurveillance",
  net: "reseau",
  it: "informatique",
  acc: "controle-acces",
};

export function HomeClient({
  settings,
  featured,
  team,
  brands,
  sectors,
  services,
}: {
  settings: Settings;
  featured: Product[];
  team: TeamMember[];
  brands: string[];
  sectors: Localized[];
  services: Svc[];
}) {
  const { lang, t, L } = useLang();
  const boss = team.find((m) => m.role === "manager") || {
    name: settings.manager,
    role: "manager" as const,
    id: "t1",
  };
  const brandLoop = [...brands, ...brands];
  const fees = (settings.fees?.length ? settings.fees : SITE.fees) as [string, number][];

  return (
    <>
      <section className="hero-cr">
        <div className="hero-cr-wall">
          <CameraWall />
        </div>
        <div className="hero-cr-veil" aria-hidden="true" />
        <div className="wrap hero-cr-in">
          <p className="hero-cr-live">
            <span className="hero-cr-dot" />
            LIVE · {SITE.hqCity.toUpperCase()}
          </p>
          <p className="hero-cr-brand">{t("h_brand")}</p>
          <p className="hero-cr-cis">{t("h_cis")}</p>
          <h1 className="hero-cr-title">{t("h_title")}</h1>
          <p className="hero-cr-lead">{t("h_lead")}</p>
          <p className="hero-cr-note">{t("h_callback")}</p>
          <div className="cta hero-cr-cta">
            <Link href="/devis" className="btn btn-pri btn-lg">
              {t("h_cta1")} <Icon name="arrow" size={17} />
            </Link>
            <Link href="/catalogue" className="btn btn-ghost btn-lg">
              {t("h_cta2")}
            </Link>
            <a href={SITE.telHref} className="btn btn-ghost btn-lg" dir="ltr">
              <Icon name="phone" size={16} /> {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <StatBand />

      <section className="sec wrap pillars-sec">
        <SectionHeader title={t("pill_title")} lead={t("pill_lead")} />
        <div className="pillars">
          {PILLARS.map((p) => (
            <Link key={p.id} href={p.href} className="pillar" data-pill={p.id}>
              <span className="pillar-ic">
                <Icon name={p.ic} size={22} />
              </span>
              <span className="pillar-k">C.I.S.</span>
              <h3>{t(p.k)}</h3>
              <p>{t(p.d)}</p>
              <span className="pillar-cta">
                {t(p.cta)} <Icon name="arrow" size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="sec wrap">
        <SectionHeader title={t("s_title")} lead={t("s_lead")} />
        <div className="trades">
          {services.map((s) => (
            <article key={s.id} className="trade">
              <header className="trade-h">
                <span className="trade-ic">
                  <Icon name={s.ic} size={20} />
                </span>
                <h3>{t(s.k)}</h3>
              </header>
              <ul>
                {s.li.map((k) => (
                  <li key={k}>{t(k)}</li>
                ))}
              </ul>
              <div className="trade-from">
                {t("s_from")}{" "}
                <b className="num" dir="ltr">
                  {money(lang, s.from)}
                </b>
              </div>
              <div className="trade-actions">
                <Link
                  href={`/services#${SVC_ANCHORS[s.id] || s.id}`}
                  className="btn btn-sm btn-out"
                >
                  {t("s_more")}
                </Link>
                <Link href={`/devis?svc=${s.id}`} className="btn btn-sm btn-pri">
                  {t("s_quote")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sec wrap">
        <SectionHeader title={t("p_title")} lead={t("p_lead")} />
        <div className="steps">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="step">
              <span className="n mono">{String(n).padStart(2, "0")}</span>
              <h3>{t(`p${n}_t`)}</h3>
              <p>{t(`p${n}_d`)}</p>
            </div>
          ))}
        </div>
        <div className="fees-block">
          <h3 className="fees-block-t">{t("s_fees_t")}</h3>
          <p className="ink2 sm" style={{ marginBottom: 14 }}>
            {t("s_fees_d")}
          </p>
          <FeesTable fees={fees} />
        </div>
      </section>

      <section className="sec catalog-band">
        <div className="wrap">
          <SectionHeader
            title={t("f_title")}
            lead={t("f_lead")}
            action={
              <Link href="/catalogue" className="btn btn-out">
                {t("f_all")} <Icon name="chev" size={16} />
              </Link>
            }
          />
          <div className="pgrid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="sec wrap" style={{ scrollMarginTop: 88 }}>
        <SectionHeader eyebrow={t("ab_eye")} title={t("ab_title")} />
        <div className="about-g">
          <div>
            <p className="ink2" style={{ marginBottom: 12 }}>
              {t("ab_p1", { company: settings.company })}
            </p>
            <p className="ink2">{t("ab_p2")}</p>
            <div className="person" style={{ marginTop: 18 }}>
              <Image
                className="avl-img"
                src={`/team/${"id" in boss ? boss.id : "t1"}.jpg`}
                alt={boss.name}
                width={48}
                height={48}
              />
              <div>
                <b>{boss.name}</b>
                <div className="xs muted">{t("ab_manager")}</div>
              </div>
            </div>
          </div>
          <div className="vals">
            {[1, 2, 3].map((n) => (
              <div key={n} className="val">
                <b>{t(`ab_v${n}_t`)}</b>
                <span>{t(`ab_v${n}_d`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec wrap">
        <SectionHeader title={t("te_title")} lead={t("te_lead")} />
        <div className="quotes">
          {[1, 2, 3].map((n) => (
            <blockquote key={n} className="quote">
              <p>{t(`te${n}`)}</p>
              <div className="who2">{t(`te${n}_a`)}</div>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="sec brands-band">
        <div className="wrap">
          <p className="eyebrow" style={{ textAlign: "center", marginBottom: 14 }}>
            {t("br_title")}
          </p>
          <div className="marq">
            <div className="marq-t">
              {brandLoop.map((b, i) => (
                <span key={b + i}>{b}</span>
              ))}
            </div>
          </div>
          <div className="frow" style={{ marginTop: 28, justifyContent: "center" }}>
            {sectors.map((s) => (
              <span key={s.fr} className="chip" style={{ cursor: "default" }}>
                {L(s)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="wrap cta-final-in">
          <div>
            <p className="cta-final-k mono">C.I.S · {SITE.hqCity.toUpperCase()}</p>
            <h2>{t("cta_t")}</h2>
            <p>{t("cta_d")}</p>
          </div>
          <div className="cta-final-actions">
            <Link href="/devis" className="btn btn-pri btn-lg">
              {t("h_cta1")}
            </Link>
            <a href={SITE.waHref} className="btn btn-ghost btn-lg" target="_blank" rel="noopener noreferrer">
              <Icon name="wa" size={17} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
