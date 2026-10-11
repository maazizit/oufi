"use client";

import { moneyAmount } from "@/lib/data/i18n";
import { Num } from "./Num";
import { useLang } from "./LangProvider";

/** Prix : nombre isolé LTR + devise hors bidi (ex. « 2 400 درهم »). */
export function Money({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) {
  const { t } = useLang();
  return (
    <span className={className}>
      <Num className="num">{moneyAmount(amount)}</Num>
      {"\u00a0"}
      {t("dh")}
    </span>
  );
}
