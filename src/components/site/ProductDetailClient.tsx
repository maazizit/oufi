"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { SITE } from "@/lib/site";
import { productCopy } from "@/lib/seo/product-copy";
import { productSlug, specLabel, stockLabel } from "@/lib/utils";
import { Icon, ProductArt } from "@/components/ui/Icon";
import { Money } from "./Money";
import { Num, BidiText } from "./Num";
import { ProductCard } from "./ProductCard";
import { useCart } from "./CartProvider";
import { useLang } from "./LangProvider";
import { useToast } from "./ToastProvider";

export function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { lang, t, L, Lb, href } = useLang();
  const { add } = useCart();
  const { show } = useToast();
  const stock = stockLabel(lang, product);
  const copy = productCopy(product.id, L(product.name), product.brand);
  const slug = productSlug(product);

  return (
    <>
      <section className="page-band page-band-sm">
        <div className="wrap page-band-in rise">
          <p className="page-band-k mono">
            C.I.S · CATALOGUE · <Num>{product.ref}</Num>
          </p>
          <p className="sm" style={{ margin: 0 }}>
            <Link href={href("/catalogue")} className="page-band-crumb">
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
            {product.img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.img} alt={L(product.name)} className="prod-detail-photo" />
            ) : (
              <ProductArt cat={product.cat} size={180} />
            )}
          </div>
          <div className="prod-detail-body">
            <p className="eyebrow mono">{product.brand}</p>
            <h1>
              {product.brand} {Lb(product.name)}
            </h1>
            <p className="mono sm muted" style={{ marginTop: 6 }}>
              {t("ref")} <Num>{product.ref}</Num>
            </p>
            <p className={`pill ${stock.cls}`} style={{ marginTop: 10, width: "fit-content" }}>
              {stock.text}
            </p>
            <p className="prod-detail-price">
              <Money amount={product.price} />
            </p>
            <p className="sm muted">{t("indicative")}</p>
            <p className="prod-detail-copy">
              <BidiText text={copy[lang] || copy.fr} lang={lang} />
            </p>
            <p className="sm muted" style={{ marginTop: 8 }}>
              Livraison / installation au Maroc — devis pose après visite. {SITE.hqCity}.
            </p>

            <h2 className="prod-detail-h">{t("specs")}</h2>
            <ul className="spec-list">
              {product.specs.map(([k, v]) => (
                <li key={k}>
                  <span>{specLabel(lang, k)}</span>
                  <b>
                    <Num>{v}</Num>
                  </b>
                </li>
              ))}
              <li>
                <span>{t("warr_install")}</span>
                <b>
                  <Num>{SITE.installWarrantyMonths}</Num>
                  {lang === "ar" ? " شهراً" : " mois"}
                </b>
              </li>
              {product.warr > 0 ? (
                <li>
                  <span>{t("warr_mfr")}</span>
                  <b>
                    <Num>{product.warr}</Num>
                    {lang === "ar" ? " شهراً" : " mois"}
                  </b>
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
              <Link href={href("/panier")} className="btn btn-out btn-lg">
                {t("nav_cart")}
              </Link>
              <Link href={href("/catalogue")} className="btn btn-out btn-lg">
                {t("back_cat")}
              </Link>
            </div>
            <p className="xs muted mono" style={{ marginTop: 14 }}>
              SKU · <Num>{slug}</Num>
            </p>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="sec wrap" aria-labelledby="often-installed">
          <h2 id="often-installed" className="prod-detail-h" style={{ marginTop: 0 }}>
            {t("often_installed")}
          </h2>
          <div className="pgrid" style={{ marginTop: 16 }}>
            {related.map((p, i) => (
              <div key={p.id} className={`rev r${(i % 4) + 1}`}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
