"use client";

import Link from "next/link";
import { useLang } from "./LangProvider";
import type { Settings } from "@/lib/types";

export function SiteFooter({ settings }: { settings: Settings }) {
  const { t, L } = useLang();
  return (
    <footer className="footer">
      <div className="wrap">
        <div>
          <h4>{settings.company}</h4>
          <p className="sm" style={{ opacity: 0.9, maxWidth: "36ch" }}>
            {L(settings.tagline)}
          </p>
        </div>
        <div>
          <h4>{t("ft_nav")}</h4>
          {(
            [
              ["/services", "nav_services"],
              ["/catalogue", "nav_products"],
              ["/devis", "nav_quote"],
              ["/suivi", "nav_track"],
            ] as const
          ).map(([href, key]) => (
            <Link key={href} className="li" href={href}>
              {t(key)}
            </Link>
          ))}
        </div>
        <div>
          <h4>{t("ft_svc")}</h4>
          <Link className="li" href="/services">
            {t("s_cam_t")}
          </Link>
          <Link className="li" href="/services">
            {t("s_net_t")}
          </Link>
          <Link className="li" href="/services">
            {t("s_it_t")}
          </Link>
          <Link className="li" href="/services">
            {t("s_acc_t")}
          </Link>
        </div>
        <div>
          <h4>{t("ft_ct")}</h4>
          <p className="sm mono">{settings.phone}</p>
          <p className="sm mono">{settings.email}</p>
          <p className="sm" style={{ marginTop: 6 }}>
            {L(settings.address)}
          </p>
        </div>
      </div>
      <div className="copy">
        © {new Date().getFullYear()} {settings.company}
      </div>
    </footer>
  );
}
