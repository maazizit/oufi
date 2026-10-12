"use client";

import type { Product } from "@/lib/types";
import { money } from "@/lib/data/i18n";
import { specLabel, stockLabel } from "@/lib/utils";
import { Icon, ProductArt } from "@/components/ui/Icon";
import { useCart } from "./CartProvider";
import { useLang } from "./LangProvider";
import { useToast } from "./ToastProvider";
import Link from "next/link";

export function ProductDetailClient({ product }: { product: Product }) {
  const { lang, t, L } = useLang();
  const { add } = useCart();
  const { show } = useToast();
  const stock = stockLabel(lang, product);

  return (
    <div className="prod-detail">
      <div className="art prod-detail-art">
        <ProductArt cat={product.cat} size={180} />
      </div>
      <div>
        <p className="eyebrow">{product.brand}</p>
        <h1 style={{ marginTop: 6 }}>{L(product.name)}</h1>
        <p className="mono sm muted" style={{ marginTop: 6 }}>
          {t("ref")} {product.ref}
        </p>
        <p className={`pill ${stock.cls}`} style={{ marginTop: 10 }}>
          {stock.text}
        </p>
        <p className="pr num" style={{ fontSize: 28, fontWeight: 700, marginTop: 14 }}>
          {money(lang, product.price)}
        </p>
        <p className="sm muted">{t("indicative")}</p>
        <h2 style={{ fontSize: 16, marginTop: 22 }}>{t("specs")}</h2>
        <ul className="spec-list">
          {product.specs.map(([k, v]) => (
            <li key={k}>
              <span>{specLabel(lang, k)}</span>
              <b>{v}</b>
            </li>
          ))}
          {product.warr > 0 ? (
            <li>
              <span>Garantie</span>
              <b>{product.warr} mois</b>
            </li>
          ) : null}
        </ul>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
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
      </div>
    </div>
  );
}
