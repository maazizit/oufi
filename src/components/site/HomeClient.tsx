"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product, Settings, TeamMember, Localized } from "@/lib/types";
import { money } from "@/lib/data/i18n";
import { PILLARS } from "@/lib/data/constants";
import { roleOf } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { ProductCard } from "./ProductCard";
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
  const city = settings.fees[0]?.[0] || "Casablanca";
  const fee = settings.fees[0]?.[1] ?? 200;
  const boss = team.find((m) => m.role === "manager") || {
    name: settings.manager,
    role: "manager" as const,
    id: "t1",
  };
  const field = team.filter((m) => m.active && m.role !== "manager");
  const brandLoop = [...brands, ...brands];
  const tel = settings.phone.replace(/\s/g, "");

  return (
    <>
      <section className="hero-ap">
        <div className="hero-ap-media" aria-hidden="true">
          <Image
            src="/brand/hero-install.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-ap-img"
          />
          <div className="hero-ap-veil" />
          <div className="hero-ap-grid" />
        </div>
        <div className="wrap hero-ap-in">
          <div className="hero-ap-brand rise d1">
            <p className="hero-ap-cis">{t("h_cis")}</p>
            <p className="hero-ap-ar" dir="rtl" lang="ar">
              {t("h_ar_line")}
            </p>
            <h1 className="hero-ap-title">{t("h_title")}</h1>
          </div>
          <p className="hero-ap-lead rise d2">{t("h_lead")}</p>
          <p className="hero-ap-note rise d2">{t("h_callback")}</p>
          <div className="cta rise d3">
            <Link href="/devis" className="btn btn-pri btn-lg">
              {t("h_cta1")} <Icon name="arrow" size={17} />
            </Link>
            <Link href="/catalogue" className="btn btn-ghost btn-lg">
              {t("h_cta2")}
            </Link>
            <a href={`tel:${tel}`} className="btn btn-ghost btn-lg">
              <Icon name="phone" size={16} /> {settings.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="sec wrap pillars-sec">
        <div className="sec-h rev">
          <h2>{t("pill_title")}</h2>
          <p className="ink2">{t("pill_lead")}</p>
        </div>
        <div className="pillars">
          {PILLARS.map((p, i) => (
            <Link
              key={p.id}
              href={p.href}
              className={`pillar rev r${i + 1}`}
              data-pill={p.id}
            >
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
        <div className="sec-h rev">
          <h2>{t("s_title")}</h2>
          <p className="ink2">{t("s_lead")}</p>
        </div>
        <div className="svc">
          {services.map((s, i) => (
            <div key={s.id} className={`svc-row rev r${(i % 4) + 1}`}>
              <span className="ic">
                <Icon name={s.ic} size={20} />
              </span>
              <h3>{t(s.k)}</h3>
              <ul>
                {s.li.map((k) => (
                  <li key={k}>{t(k)}</li>
                ))}
              </ul>
              <div className="from">
                {t("s_from")} <b className="num">{money(lang, s.from)}</b>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
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
            </div>
          ))}
        </div>
      </section>

      <section className="sec wrap">
        <div className="sec-h rev">
          <h2>{t("p_title")}</h2>
          <p className="ink2">{t("p_lead")}</p>
        </div>
        <div className="steps">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className={`step rev r${n}`}>
              <span className="n">{n}</span>
              <h3>{t(`p${n}_t`)}</h3>
              <p>{t(`p${n}_d`)}</p>
            </div>
          ))}
        </div>
        <div className="feebar rise" style={{ marginTop: 22 }}>
          <Icon name="pin" size={18} />
          <span
            dangerouslySetInnerHTML={{
              __html: t("h_fee", {
                fee: `<b>${money(lang, fee)}</b>`,
                city,
              }),
            }}
          />
        </div>
      </section>

      <section className="sec catalog-band">
        <div className="wrap">
          <div className="sec-h rev sec-h-row">
            <div>
              <h2>{t("f_title")}</h2>
              <p className="ink2">{t("f_lead")}</p>
            </div>
            <Link href="/catalogue" className="btn btn-out">
              {t("f_all")} <Icon name="chev" size={16} />
            </Link>
          </div>
          <div className="pgrid">
            {featured.map((p) => (
              <div key={p.id} className="rev">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec wrap">
        <div className="sec-h rev">
          <p className="eyebrow">{t("ab_eye")}</p>
          <h2>{t("ab_title")}</h2>
        </div>
        <div className="about-g">
          <div className="rev">
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
          <div className="vals rev r2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="val">
                <b>{t(`ab_v${n}_t`)}</b>
                <span>{t(`ab_v${n}_d`)}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 28 }}>
          <h3 className="rev">{t("ab_team_t")}</h3>
          <p className="ink2 sm rev" style={{ marginBottom: 14 }}>
            {t("ab_team_d")}
          </p>
          <div className="people">
            {field.map((m, i) => (
              <div key={m.id} className={`person rev r${(i % 4) + 1}`}>
                <Image
                  className="avl-img"
                  src={`/team/${m.id}.jpg`}
                  alt={m.name}
                  width={40}
                  height={40}
                />
                <div>
                  <b className="sm">{m.name}</b>
                  <div className="xs muted">{L(roleOf(m.role))}</div>
                  <a className="xs" href={`tel:${m.phone.replace(/\s/g, "")}`}>
                    {m.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec brands-band">
        <div className="wrap">
          <p className="eyebrow rev" style={{ textAlign: "center", marginBottom: 14 }}>
            {t("br_title")}
          </p>
          <div className="marq rev">
            <div className="marq-t">
              {brandLoop.map((b, i) => (
                <span key={b + i}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec wrap">
        <div className="sec-h rev">
          <h2>{t("te_title")}</h2>
          <p className="ink2">{t("te_lead")}</p>
        </div>
        <div className="quotes">
          {[1, 2, 3].map((n) => (
            <blockquote key={n} className={`quote rev r${n}`}>
              <span className="qm">“</span>
              <p>{t(`te${n}`)}</p>
              <div className="who2">{t(`te${n}_a`)}</div>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="sec wrap">
        <div className="sec-h rev">
          <h2>{t("sect_title")}</h2>
          <p className="ink2">{t("sect_lead")}</p>
        </div>
        <div className="frow rev" style={{ marginBottom: 28 }}>
          {sectors.map((s) => (
            <span key={s.fr} className="chip" style={{ cursor: "default" }}>
              {L(s)}
            </span>
          ))}
        </div>
        <div className="stat rev">
          <div>
            <span className="v num">
              <span data-count="180">180</span>+
            </span>
            <span className="l">{t("st_1")}</span>
          </div>
          <div>
            <span className="v num">
              <span data-count="7">7</span>
            </span>
            <span className="l">{t("st_2")}</span>
          </div>
          <div>
            <span className="v num">
              <span data-count="48">48</span> h
            </span>
            <span className="l">{t("st_3")}</span>
          </div>
          <div>
            <span className="v num">
              <span data-count="12">12</span>
            </span>
            <span className="l">{t("st_4")}</span>
          </div>
        </div>
      </section>

      <section className="sec wrap">
        <div className="cta-band rev">
          <div>
            <h2>{t("cta_t")}</h2>
            <p>{t("cta_d")}</p>
          </div>
          <Link href="/devis" className="btn btn-pri btn-lg">
            {t("h_cta1")}
          </Link>
        </div>
      </section>
    </>
  );
}
