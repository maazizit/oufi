"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { BrandMark } from "./BrandMark";
import { useCart } from "./CartProvider";
import { useLang } from "./LangProvider";

const NAV = [
  ["/", "nav_home"],
  ["/services", "nav_services"],
  ["/catalogue", "nav_products"],
  ["/devis", "nav_quote"],
  ["/suivi", "nav_track"],
  ["/contact", "nav_contact"],
] as const;

export function SiteHeader({
  company,
  tagline,
}: {
  company: string;
  tagline: string;
}) {
  const pathname = usePathname();
  const { t, toggle } = useLang();
  const { count } = useCart();

  return (
    <header className="hdr">
      <div className="hdr-in">
        <Link href="/" className="brand" aria-label={company}>
          <BrandMark size={42} />
          <span>
            <span className="nm brand-word">{company}</span>
            <br />
            <span className="sl">{tagline}</span>
          </span>
        </Link>
        <nav className="nav">
          {NAV.map(([href, key]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
            >
              {t(key)}
            </Link>
          ))}
        </nav>
        <button type="button" className="btn btn-out btn-sm" onClick={toggle}>
          {t("lang_switch")}
        </button>
        <Link href="/panier" className="btn btn-out btn-sm cartbtn" aria-label={t("nav_cart")}>
          <Icon name="cart" size={17} />
          {count > 0 ? <span className="cnt num">{count}</span> : null}
        </Link>
        <Link href="/devis" className="btn btn-pri btn-sm">
          {t("nav_quote")}
        </Link>
      </div>
    </header>
  );
}
