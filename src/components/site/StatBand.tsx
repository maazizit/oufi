"use client";

import { useLang } from "./LangProvider";

const STATS = [
  { value: "180+", labelKey: "st_1" as const },
  { valueKey: "st_2_val" as const, labelKey: "st_2" as const },
  { value: "48 h", labelKey: "st_3" as const },
  { value: "12", labelKey: "st_4" as const },
];

export function StatBand() {
  const { t } = useLang();
  return (
    <section className="stat-band" aria-label="Indicateurs">
      <div className="wrap stat-band-in">
        {STATS.map((s) => (
          <div key={s.labelKey} className="stat-band-item">
            <span className="stat-band-v num">
              {"valueKey" in s && s.valueKey ? t(s.valueKey) : s.value}
            </span>
            <span className="stat-band-l">{t(s.labelKey)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
