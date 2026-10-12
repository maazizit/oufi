"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SITE } from "@/lib/site";
import { BrandMark } from "./BrandMark";
import { Num } from "./Num";
import { useCart } from "./CartProvider";
import { useLang } from "./LangProvider";
import { ThemeToggle } from "./ThemeToggle";

const NAV = [
  ["/", "nav_home"],
  ["/#about", "nav_about"],
  ["/services", "nav_services"],
  ["/catalogue", "nav_products"],
  ["/suivi", "nav_track"],
  ["/contact", "nav_contact"],
] as const;

export function SiteHeader({
  company,
}: {
  company: string;
  tagline?: string;
}) {
  const pathname = usePathname();
  const { t, toggle, href: localeHref } = useLang();
  const { count } = useCart();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  const barePath = pathname?.startsWith("/ar")
    ? pathname === "/ar"
      ? "/"
      : pathname.replace(/^\/ar/, "") || "/"
    : pathname || "/";

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const scrollY = window.scrollY;
    const { style } = document.body;
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    style.overflow = "hidden";
    return () => {
      style.position = "";
      style.top = "";
      style.left = "";
      style.right = "";
      style.width = "";
      style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const subtitleNode = (
    <>
      <Num>C.I.S.</Num>
      {" · "}
      {SITE.hqCity.toUpperCase()}
    </>
  );

  const renderNav = (onNavigate?: () => void) =>
    NAV.map(([path, key]) => {
      const current =
        path === "/#about"
          ? false
          : path === "/"
            ? barePath === "/"
            : barePath === path || barePath.startsWith(path + "/");
      const target =
        path === "/#about" ? `${localeHref("/")}#about` : localeHref(path);
      return (
        <Link
          key={path}
          href={target}
          aria-current={current ? "page" : undefined}
          onClick={onNavigate}
        >
          {t(key)}
        </Link>
      );
    });

  return (
    <header className={`hdr${compact ? " is-compact" : ""}`}>
      <div className="hdr-in">
        <Link href={localeHref("/")} className="brand" aria-label={company}>
          <BrandMark size={40} />
          <span>
            <span className="nm brand-word">{company}</span>
            <br />
            <span className="sl">{subtitleNode}</span>
          </span>
        </Link>

        <nav
          className="nav"
          aria-label={t("nav_home") === "الرئيسية" ? "القائمة الرئيسية" : "Navigation principale"}
        >
          {renderNav()}
        </nav>

        <div className="hdr-actions">
          <ThemeToggle />
          <button
            type="button"
            id="lang-switch"
            className="btn btn-out btn-sm lang-switch"
            onClick={(e) => {
              e.preventDefault();
              toggle();
            }}
            aria-label={t("lang_switch")}
          >
            {t("lang_switch")}
          </button>
          <Link
            href={localeHref("/panier")}
            className="hdr-icon-btn cartbtn"
            aria-label={t("nav_cart")}
          >
            <Icon name="cart" size={18} />
            <span className="sr-only">{t("nav_cart")}</span>
            {count > 0 ? (
              <span className="cnt num" aria-label={`${count}`}>
                {count}
              </span>
            ) : null}
          </Link>
          <Link href={localeHref("/devis")} className="btn btn-pri btn-sm hdr-cta hdr-cta-desk">
            {t("nav_quote_free")}
          </Link>
          <button
            type="button"
            className="hdr-icon-btn hdr-burger"
            aria-expanded={open}
            aria-controls="hdr-drawer"
            aria-label={open ? t("menu_close") : t("menu_open")}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={20} />
          </button>
        </div>
      </div>

      {open ? (
        <button
          type="button"
          className="hdr-drawer-backdrop"
          aria-label={t("menu_close")}
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div
        id="hdr-drawer"
        className={`hdr-drawer${open ? " is-open" : ""}`}
        data-open={open ? "1" : "0"}
        aria-hidden={!open}
      >
        <div className="hdr-drawer-top">
          <span className="brand-word">{company}</span>
          <button
            type="button"
            className="hdr-icon-btn"
            aria-label={t("menu_close")}
            onClick={() => setOpen(false)}
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <nav aria-label={t("menu_open")}>{renderNav(() => setOpen(false))}</nav>
        <div className="hdr-drawer-ctas">
          <Link href={localeHref("/devis")} className="btn btn-pri" onClick={() => setOpen(false)}>
            {t("nav_quote_free")}
          </Link>
          <a className="btn btn-out" href={SITE.telHref}>
            <Icon name="phone" size={17} />
            {SITE.phoneDisplay}
          </a>
          <a
            className="btn btn-out"
            href={SITE.waHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="wa" size={17} />
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
