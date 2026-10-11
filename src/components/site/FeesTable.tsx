"use client";

import { SITE } from "@/lib/site";
import { Money } from "./Money";
import { useLang } from "./LangProvider";

export function FeesTable({
  fees,
}: {
  fees?: readonly [string, number][];
}) {
  const { t } = useLang();
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
              <td>
                <Money amount={fee} />
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
