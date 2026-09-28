"use client";

import { useLang } from "./LangProvider";

export function HeroPlan() {
  const { t, lang } = useLang();
  const P = {
    ent: lang === "ar" ? "المدخل" : "Entrée",
    cash: lang === "ar" ? "الصندوق" : "Caisse",
    sale: lang === "ar" ? "قاعة البيع" : "Surface de vente",
    stock: lang === "ar" ? "المخزن" : "Réserve",
  };

  return (
    <div className="scene plan">
      <div className="scene-h">
        <i />
        {t("hero_scan")}
      </div>
      <svg
        viewBox="0 0 520 290"
        width="100%"
        height="auto"
        style={{ display: "block" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="scanG" x1="0" x2="1">
            <stop offset="0" stopColor="var(--blue)" stopOpacity="0" />
            <stop offset=".5" stopColor="var(--blue)" stopOpacity=".30" />
            <stop offset="1" stopColor="var(--blue)" stopOpacity="0" />
          </linearGradient>
          <clipPath id="scanC">
            <rect x="20" y="20" width="480" height="250" />
          </clipPath>
        </defs>
        <rect x="20" y="20" width="480" height="250" fill="var(--surface-2)" rx="8" />
        <path
          className="sc-wall"
          pathLength={100}
          strokeDasharray={100}
          d="M40 40 H480 V250 H40 Z M40 140 H280 M280 140 V250 M280 90 H480"
          fill="none"
          stroke="var(--navy)"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <g className="sc-fix">
          <path d="M100 40 V70 M180 140 H210" fill="none" stroke="var(--line-2)" strokeWidth="1.4" />
          <text x="90" y="120" fill="var(--muted)" fontSize="11">
            {P.sale}
          </text>
          <text x="300" y="70" fill="var(--ink-2)" fontSize="11.5" fontWeight="600">
            {P.ent}
          </text>
          <text x="60" y="230" fill="var(--ink-2)" fontSize="11.5" fontWeight="600">
            {P.cash}
          </text>
          <text x="340" y="200" fill="var(--muted)" fontSize="11">
            {P.stock}
          </text>
        </g>
        <circle className="sc-cam c1" cx="30" cy="30" r="7" fill="var(--blue)" />
        <path
          className="sc-cone c1"
          d="M30 30 L90 50 L90 110 Z"
          fill="var(--blue)"
          fillOpacity="0.15"
          stroke="var(--blue)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <circle className="sc-cam c2 sc-2" cx="490" cy="30" r="7" fill="var(--blue)" />
        <path
          className="sc-cone c2 sc-2"
          d="M490 30 L430 50 L430 110 Z"
          fill="var(--blue)"
          fillOpacity="0.15"
          stroke="var(--blue)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <circle className="sc-cam c3 sc-3" cx="384" cy="154" r="7" fill="var(--blue)" />
        <path
          className="sc-cone c3 sc-3"
          d="M384 154 L340 200 L420 230 Z"
          fill="var(--blue)"
          fillOpacity="0.15"
          stroke="var(--blue)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <g clipPath="url(#scanC)">
          <rect className="sc-scan" x="0" y="20" width="70" height="250" fill="url(#scanG)" />
        </g>
        <g className="sc-badge">
          <rect x="150" y="248" width="220" height="28" rx="8" fill="var(--navy)" />
          <text
            x="260"
            y="266"
            textAnchor="middle"
            fill="#fff"
            fontSize="11.5"
            fontWeight="600"
          >
            {t("hero_badge")}
          </text>
        </g>
      </svg>
      <p className="xs muted" style={{ padding: "8px 13px 12px" }}>
        {t("h_planlabel")}
      </p>
    </div>
  );
}
