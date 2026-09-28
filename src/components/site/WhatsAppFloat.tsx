"use client";

import { Icon } from "@/components/ui/Icon";
import { useLang } from "./LangProvider";

const WA = "212661241805";

export function WhatsAppFloat() {
  const { t } = useLang();
  return (
    <a
      className="wa-float"
      href={`https://wa.me/${WA}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("wa_float")}
    >
      <Icon name="wa" size={22} />
      <span className="sr-only">{t("wa_float")}</span>
    </a>
  );
}
