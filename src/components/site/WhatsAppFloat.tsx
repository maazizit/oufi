"use client";

import { Icon } from "@/components/ui/Icon";
import { SITE } from "@/lib/site-config";
import { useLang } from "./LangProvider";

export function WhatsAppFloat() {
  const { t } = useLang();
  return (
    <a
      className="wa-float"
      href={SITE.waHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("wa_float")}
    >
      <Icon name="wa" size={22} />
      <span className="sr-only">{t("wa_float")}</span>
    </a>
  );
}
