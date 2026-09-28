"use client";

import Link from "next/link";
import type { Product, Settings, TeamMember, Localized } from "@/lib/types";
import { money } from "@/lib/data/i18n";
import { initials, roleOf } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { HeroPlan } from "./HeroPlan";
import { ProductCard } from "./ProductCard";
import { useLang } from "./LangProvider";

type Svc = {
  id: string;
  k: string;
  ic: "cam" | "router" | "pc" | "badge";
  from: number;
  li: string[];
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
  };
  const field = team.filter((m) => m.active && m.role !== "manager");
  const brandLoop = [...brands, ...brands];

  return (
    <>
      <section className="hero">
        <div className="wrap hero-g">
          <div>
            <p className="eyebrow rise d1">{t("h_eyebrow")}</p>
            <h1 className="rise d2" style={{ marginTop: 10 }}>
              {t("h_title")}
            </h1>
            <p className="lead rise d3" style={{ marginTop: 14 }}>
              {t("h_lead")}
            </p>
            <div className="cta rise d4" style={{ marginTop: 22 }}>
              <Link href="/devis" className="btn btn-pri btn-lg">
                {t("h_cta1")} <Icon name="arrow" size={17} />
              </Link>
              <Link href="/catalogue" className="btn btn-out btn-lg">
                {t("h_cta2")}
              </Link>
            </div>
            <div className="feebar rise d5" style={{ marginTop: 22 }}>
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
          </div>
          <div className="rise d3">
            <HeroPlan />
          </div>
        </div>
      </section>

      <section className="sec wrap">
        <div className="sec-h rev">
          <h2>{t("s_title")}</h2>
          <p className="ink2">{t("s_lead")}</p>
        </div>
        <div className="svc">
          {services.map((s, i) => (
            <div key={s.id} className={`card rev r${(i % 4) + 1}`}>
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
              <Link href={`/devis?svc=${s.id}`} className="btn btn-sm btn-out">
                {t("s_more")}
              </Link>
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
      </section>

      <section className="sec" style={{ background: "var(--surface)", borderBlock: "1px solid var(--line)" }}>
        <div className="wrap">
          <div className="sec-h rev" style={{ flexDirection: "row", alignItems: "end", maxWidth: "none", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 22 }}>
          <div className="rev">
            <p className="ink2" style={{ marginBottom: 12 }}>
              {t("ab_p1", { company: settings.company })}
            </p>
            <p className="ink2">{t("ab_p2")}</p>
            <div className="person" style={{ marginTop: 18 }}>
              <span className="avl">{initials(boss.name)}</span>
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
                <span className="avl" style={{ width: 40, height: 40, fontSize: 13 }}>
                  {initials(m.name)}
                </span>
                <div>
                  <b className="sm">{m.name}</b>
                  <div className="xs muted">{L(roleOf(m.role))}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--surface-2)" }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
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
              <span data-count="180">0</span>+
            </span>
            <span className="l">{t("st_1")}</span>
          </div>
          <div>
            <span className="v num">
              <span data-count="7">0</span>
            </span>
            <span className="l">{t("st_2")}</span>
          </div>
          <div>
            <span className="v num">
              <span data-count="48">0</span> h
            </span>
            <span className="l">{t("st_3")}</span>
          </div>
          <div>
            <span className="v num">
              <span data-count="12">0</span>
            </span>
            <span className="l">{t("st_4")}</span>
          </div>
        </div>
      </section>

      <section className="sec wrap">
        <div
          className="card pad rev"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 18,
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, var(--navy), var(--navy-2))",
            color: "var(--on-navy)",
            border: 0,
          }}
        >
          <div style={{ maxWidth: "48ch" }}>
            <h2 style={{ color: "inherit" }}>{t("cta_t")}</h2>
            <p style={{ opacity: 0.9, marginTop: 8 }}>{t("cta_d")}</p>
          </div>
          <Link href="/devis" className="btn btn-pri btn-lg">
            {t("h_cta1")}
          </Link>
        </div>
      </section>
    </>
  );
}
