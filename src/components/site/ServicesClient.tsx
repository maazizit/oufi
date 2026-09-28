"use client";

import Link from "next/link";
import type { Settings } from "@/lib/types";
import { money } from "@/lib/data/i18n";
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
    <section className="sec wrap">
      <div className="sec-h rise">
        <h1>{t("s_title")}</h1>
        <p className="ink2">{t("s_lead")}</p>
      </div>
      <div className="svc">
        {services.map((s, i) => (
          <div key={s.id} className={`card rise d${i + 1}`}>
            <span className="ic">
              <Icon name={s.ic} size={22} />
            </span>
            <h2 style={{ fontSize: 18 }}>{t(s.k)}</h2>
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
        <div className="card rise d5">
          <span className="ic">
            <Icon name="doc" size={22} />
          </span>
          <h2 style={{ fontSize: 18 }}>{t("s_other_t")}</h2>
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
  );
}
