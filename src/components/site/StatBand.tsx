"use client";

import { Num } from "./Num";
import { useLang } from "./LangProvider";

const STATS = [
  { count: 180, kind: "plus" as const, labelKey: "st_1" as const },
  { valueKey: "st_2_val" as const, labelKey: "st_2" as const },
  { count: 48, kind: "hours" as const, labelKey: "st_3" as const },
  { count: 12, kind: "plain" as const, labelKey: "st_4" as const },
];

export function StatBand() {
  const { lang, t } = useLang();
  return (
    <section className="stat-band" aria-label="Indicateurs">
      <div className="wrap stat-band-in">
        {STATS.map((s, i) => (
          <div key={s.labelKey} className={`stat-band-item rev r${(i % 4) + 1}`}>
            <span className="stat-band-v num">
              {"valueKey" in s && s.valueKey ? (
                t(s.valueKey)
              ) : s.kind === "plus" ? (
                <Num>
                  <span data-count={s.count}>0</span>+
                </Num>
              ) : s.kind === "hours" ? (
                lang === "ar" ? (
                  <>
                    <Num>
                      <span data-count={s.count}>0</span>
                    </Num>
                    <span> ساعة</span>
                  </>
                ) : (
                  <Num>
                    <span data-count={s.count}>0</span>
                    {" h"}
                  </Num>
                )
              ) : (
                <Num>
                  <span data-count={s.count}>0</span>
                </Num>
              )}
            </span>
            <span className="stat-band-l">{t(s.labelKey)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
