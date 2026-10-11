"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { money } from "@/lib/data/i18n";
import { SITE } from "@/lib/site-config";
import { productCopy } from "@/lib/seo/product-copy";
import { productSlug, specLabel, stockLabel } from "@/lib/utils";
import { Icon, ProductArt } from "@/components/ui/Icon";
import { useCart } from "./CartProvider";
import { useLang } from "./LangProvider";
import { useToast } from "./ToastProvider";

export function ProductDetailClient({ product }: { product: Product }) {
  const { lang, t, L } = useLang();
  const { add } = useCart();
  const { show } = useToast();
  const stock = stockLabel(lang, product);
  const copy = productCopy(product.id, L(product.name), product.brand);
  const slug = productSlug(product);

  return (
    <>
      <section className="page-band page-band-sm">
        <div className="wrap page-band-in">
          <p className="page-band-k mono">
            C.I.S · CATALOGUE · {product.ref}
          </p>
          <p className="sm" style={{ margin: 0 }}>
            <Link href="/catalogue" className="page-band-crumb">
              {t("back_cat")}
            </Link>
            <span aria-hidden="true"> · </span>
            <span>{product.brand}</span>
          </p>
        </div>
      </section>

      <section className="sec wrap">
        <div className="prod-detail">
          <div className="art prod-detail-art">
            <span className="prod-detail-code mono">{product.cat.toUpperCase()}</span>
            <ProductArt cat={product.cat} size={180} />
          </div>
          <div className="prod-detail-body">
            <p className="eyebrow mono">{product.brand}</p>
            <h1>
              {product.brand} {L(product.name)}
            </h1>
            <p className="mono sm muted" style={{ marginTop: 6 }} dir="ltr">
              {t("ref")} {product.ref}
            </p>
            <p className={`pill ${stock.cls}`} style={{ marginTop: 10, width: "fit-content" }}>
              {stock.text}
            </p>
            <p className="prod-detail-price num" dir="ltr">
              {money(lang, product.price)}
            </p>
            <p className="sm muted">{t("indicative")}</p>
            <p className="prod-detail-copy">{copy[lang] || copy.fr}</p>
            <p className="sm muted" style={{ marginTop: 8 }}>
              Livraison / installation au Maroc — devis pose après visite. {SITE.hqCity}.
            </p>

            <h2 className="prod-detail-h">{t("specs")}</h2>
            <ul className="spec-list">
              {product.specs.map(([k, v]) => (
                <li key={k}>
                  <span>{specLabel(lang, k)}</span>
                  <b dir="ltr">{v}</b>
                </li>
              ))}
              {product.warr > 0 ? (
                <li>
                  <span>Garantie</span>
                  <b dir="ltr">{product.warr} mois</b>
                </li>
              ) : null}
            </ul>

            <div className="prod-detail-actions">
              <button
                type="button"
                className="btn btn-pri btn-lg"
                onClick={() => {
                  add(product.id);
                  show(t("toast_added"));
                }}
              >
                <Icon name="cart" size={17} /> {t("add_to_quote")}
              </button>
              <Link href="/panier" className="btn btn-out btn-lg">
                {t("nav_cart")}
              </Link>
              <Link href="/catalogue" className="btn btn-out btn-lg">
                {t("back_cat")}
              </Link>
            </div>
            <p className="xs muted mono" style={{ marginTop: 14 }}>
              SKU · {slug}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
