"use client";

import Link from "next/link";
import { useLang } from "./LangProvider";
import type { Settings } from "@/lib/types";

export function SiteFooter({ settings }: { settings: Settings }) {
  const { t, L } = useLang();
  const tel = settings.phone.replace(/\s/g, "");
  return (
    <footer className="footer">
      <div className="wrap">
        <div>
          <h4>{settings.company}</h4>
          <p className="sm" style={{ opacity: 0.9, maxWidth: "36ch" }}>
            C.I.S. — {L(settings.tagline)}
          </p>
          <p className="sm" dir="rtl" lang="ar" style={{ opacity: 0.85, marginTop: 6 }}>
            {t("h_ar_line")}
          </p>
        </div>
        <div>
          <h4>{t("ft_nav")}</h4>
          <Link className="li" href="/">
            {t("nav_home")}
          </Link>
          <Link className="li" href="/#about">
            {t("nav_about")}
          </Link>
          <Link className="li" href="/contact">
            {t("nav_contact")}
          </Link>
          <Link className="li" href="/mentions-legales">
            {t("ft_mentions")}
          </Link>
          <Link className="li" href="/confidentialite">
            {t("ft_privacy")}
          </Link>
          <Link className="li" href="/conditions">
            {t("ft_terms")}
          </Link>
        </div>
        <div>
          <h4>{t("ft_svc")}</h4>
          <Link className="li" href="/catalogue">
            {t("pill_shop_t")}
          </Link>
          <Link className="li" href="/services#videosurveillance">
            {t("s_cam_t")}
          </Link>
          <Link className="li" href="/services#reseau">
            {t("s_net_t")}
          </Link>
          <Link className="li" href="/devis?type=maint">
            {t("pill_maint_t")}
          </Link>
        </div>
        <div>
          <h4>{t("ft_ct")}</h4>
          <p className="sm">
            <a className="li" href={`tel:${tel}`}>
              {settings.phone}
            </a>
          </p>
          <p className="sm">
            <a className="li" href={`mailto:${settings.email}`}>
              {settings.email}
            </a>
          </p>
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
