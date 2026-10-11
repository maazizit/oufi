"use client";

import { useLang } from "./LangProvider";

const STATS = [
  { count: 180, suffix: "+", labelKey: "st_1" as const },
  { valueKey: "st_2_val" as const, labelKey: "st_2" as const },
  { count: 48, suffix: " h", labelKey: "st_3" as const },
  { count: 12, suffix: "", labelKey: "st_4" as const },
];

export function StatBand() {
  const { t } = useLang();
  return (
    <section className="stat-band" aria-label="Indicateurs">
      <div className="wrap stat-band-in">
        {STATS.map((s, i) => (
          <div key={s.labelKey} className={`stat-band-item rev r${(i % 4) + 1}`}>
            <span className="stat-band-v num">
              {"valueKey" in s && s.valueKey ? (
                t(s.valueKey)
              ) : (
                <>
                  <span data-count={s.count}>0</span>
                  {s.suffix}
                </>
              )}
            </span>
            <span className="stat-band-l">{t(s.labelKey)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
