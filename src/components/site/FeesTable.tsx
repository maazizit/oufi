"use client";

import { money } from "@/lib/data/i18n";
import { SITE } from "@/lib/site-config";
import { useLang } from "./LangProvider";

export function FeesTable({
  fees,
}: {
  fees?: readonly [string, number][];
}) {
  const { lang, t } = useLang();
  const rows = fees?.length ? fees : SITE.fees;

  return (
    <div className="fees-table tw">
      <table>
        <thead>
          <tr>
            <th>{t("s_city")}</th>
            <th>{t("s_fee")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([city, fee]) => (
            <tr key={city}>
              <td>{city}</td>
              <td className="num" dir="ltr">
                {money(lang, fee)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {SITE.FEE_NEEDS_USER_VALIDATION ? (
        <p className="fees-note muted sm">{t("s_fees_d")}</p>
      ) : null}
    </div>
  );
}
