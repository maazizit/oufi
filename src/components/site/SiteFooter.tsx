"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";
import { Num } from "./Num";
import { useLang } from "./LangProvider";
import type { Settings } from "@/lib/types";

export function SiteFooter({ settings }: { settings: Settings }) {
  const { t, L, href: localeHref } = useLang();
  const company = settings.company || SITE.name;
  const phone = SITE.phoneDisplay;
  const email = SITE.email;
  const address = L(SITE.address);

  return (
    <footer className="footer">
      <div className="wrap">
        <div>
          <p className="ft-brand">{company}</p>
          <p className="ft-cis">
            <Num>C.I.S.</Num> · {SITE.hqCity.toUpperCase()}
          </p>
          <p className="sm ft-nap" style={{ maxWidth: "36ch" }}>
            {L(settings.tagline) || SITE.cisShort}
          </p>
          <p className="sm ft-nap" dir="rtl" lang="ar" style={{ marginTop: 8 }}>
            {t("h_ar_line")}
          </p>
        </div>
        <div>
          <h4>{t("ft_nav")}</h4>
          <Link className="li" href={localeHref("/")}>
            {t("nav_home")}
          </Link>
          <Link className="li" href={`${localeHref("/")}#about`}>
            {t("nav_about")}
          </Link>
          <Link className="li" href={localeHref("/services")}>
            {t("nav_services")}
          </Link>
          <Link className="li" href={localeHref("/catalogue")}>
            {t("nav_products")}
          </Link>
          <Link className="li" href={localeHref("/suivi")}>
            {t("nav_track")}
          </Link>
          <Link className="li" href={localeHref("/contact")}>
            {t("nav_contact")}
          </Link>
          <Link className="li" href={localeHref("/mentions-legales")}>
            {t("ft_mentions")}
          </Link>
          <Link className="li" href={localeHref("/confidentialite")}>
            {t("ft_privacy")}
          </Link>
          <Link className="li" href={localeHref("/conditions")}>
            {t("ft_terms")}
          </Link>
        </div>
        <div>
          <h4>{t("ft_svc")}</h4>
          <Link className="li" href={localeHref("/catalogue")}>
            {t("pill_shop_t")}
          </Link>
          <Link className="li" href={localeHref("/installation-camera-surveillance")}>
            {t("s_cam_t")}
          </Link>
          <Link className="li" href={localeHref("/reseau-informatique")}>
            {t("s_net_t")}
          </Link>
          <Link className="li" href={localeHref("/zones-d-intervention")}>
            Zones
          </Link>
          <Link className="li" href={localeHref("/blog")}>
            Blog
          </Link>
          <Link className="li" href={`${localeHref("/devis")}?type=maint`}>
            {t("pill_maint_t")}
          </Link>
        </div>
        <div>
          <h4>{t("ft_ct")}</h4>
          <p className="ft-nap">
            <a href={SITE.telHref} dir="ltr">
              {phone}
            </a>
          </p>
          <p className="ft-nap" style={{ marginTop: 6 }}>
            <a href={SITE.mailHref}>{email}</a>
          </p>
          <p className="ft-nap" style={{ marginTop: 10 }}>
            {address}
          </p>
          <p className="ft-nap" style={{ marginTop: 8 }}>
            <a
              href={SITE.waHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </div>
      <div className="copy">
        © {new Date().getFullYear()} {company} · {SITE.hqCity}
      </div>
    </footer>
  );
}
