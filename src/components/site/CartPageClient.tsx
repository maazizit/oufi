"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { money } from "@/lib/data/i18n";
import { SITE } from "@/lib/site-config";
import { ProductArt, Icon } from "@/components/ui/Icon";
import { useCart } from "./CartProvider";
import { useLang } from "./LangProvider";

export function CartPageClient({ products }: { products: Product[] }) {
  const { lang, t, L } = useLang();
  const { items, setQty, toggleInst, remove, clear, count } = useCart();
  const map = Object.fromEntries(products.map((p) => [p.id, p]));
  const total = items.reduce((a, l) => a + (map[l.id]?.price || 0) * l.q, 0);

  if (!items.length) {
    return (
      <>
        <section className="page-band page-band-sm">
          <div className="wrap page-band-in">
            <p className="page-band-k mono">
              C.I.S · {SITE.hqCity.toUpperCase()} · PANIER
            </p>
            <h1>{t("cart_t")}</h1>
          </div>
        </section>
        <section className="sec wrap cart-sec">
          <div className="cart-empty">
            <p className="muted">{t("cart_empty")}</p>
            <p className="sm ink2">{t("cart_empty_d")}</p>
            <Link href="/catalogue" className="btn btn-pri">
              {t("cart_go")}
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="page-band page-band-sm">
        <div className="wrap page-band-in">
          <p className="page-band-k mono">
            C.I.S · {SITE.hqCity.toUpperCase()} · PANIER
          </p>
          <h1>
            {t("cart_t")} · {count} {t("items")}
          </h1>
          <p className="page-band-lead">{t("cart_note")}</p>
        </div>
      </section>

      <section className="sec wrap cart-sec">
        <div className="cart-lines">
          {items.map((l) => {
            const p = map[l.id];
            if (!p) return null;
            return (
              <div key={l.id} className="line">
                <span className="art line-art">
                  <ProductArt cat={p.cat} size={46} />
                </span>
                <div className="line-body">
                  <div className="line-name">{L(p.name)}</div>
                  <div className="xs muted mono" dir="ltr">
                    {p.ref} · {p.brand}
                  </div>
                  <label className="line-inst">
                    <input
                      type="checkbox"
                      checked={l.inst}
                      onChange={(e) => toggleInst(l.id, e.target.checked)}
                    />
                    {t("withinstall")}
                  </label>
                </div>
                <div className="line-side">
                  <span className="num line-price" dir="ltr">
                    {money(lang, p.price * l.q)}
                  </span>
                  <span className="qty">
                    <button type="button" onClick={() => setQty(l.id, l.q - 1)} aria-label="-">
                      −
                    </button>
                    <span className="num" dir="ltr">
                      {l.q}
                    </span>
                    <button type="button" onClick={() => setQty(l.id, l.q + 1)} aria-label="+">
                      +
                    </button>
                  </span>
                  <button type="button" className="btn btn-sm btn-dan" onClick={() => remove(l.id)}>
                    <Icon name="trash" size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-total">
          <div>
            <div className="lab">{t("cart_sub")}</div>
            <b className="num cart-total-v" dir="ltr">
              {money(lang, total)}
            </b>
          </div>
          <div className="cart-total-actions">
            <button type="button" className="btn btn-out" onClick={clear}>
              {t("cart_clear")}
            </button>
            <Link href="/panier/demande" className="btn btn-pri btn-lg">
              {t("cart_req")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
