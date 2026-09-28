"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { money } from "@/lib/data/i18n";
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
      <section className="sec wrap" style={{ maxWidth: 560 }}>
        <div className="card pad rise" style={{ textAlign: "center" }}>
          <h1>{t("cart_t")}</h1>
          <p className="muted" style={{ margin: "12px 0" }}>
            {t("cart_empty")}
          </p>
          <p className="sm ink2" style={{ marginBottom: 16 }}>
            {t("cart_empty_d")}
          </p>
          <Link href="/catalogue" className="btn btn-pri">
            {t("cart_go")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="sec wrap" style={{ maxWidth: 820 }}>
      <div className="sec-h rise">
        <h1>
          {t("cart_t")} · {count} {t("items")}
        </h1>
        <p className="ink2">{t("cart_note")}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((l) => {
          const p = map[l.id];
          if (!p) return null;
          return (
            <div key={l.id} className="line">
              <span className="art" style={{ width: 56, display: "grid", placeItems: "center" }}>
                <ProductArt cat={p.cat} size={46} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{L(p.name)}</div>
                <div className="xs muted mono">
                  {p.ref} · {p.brand}
                </div>
                <label
                  className="xs"
                  style={{ display: "inline-flex", gap: 6, alignItems: "center", marginTop: 5, color: "var(--ink-2)", cursor: "pointer" }}
                >
                  <input type="checkbox" checked={l.inst} onChange={(e) => toggleInst(l.id, e.target.checked)} />
                  {t("withinstall")}
                </label>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                <span className="num" style={{ fontWeight: 600 }}>
                  {money(lang, p.price * l.q)}
                </span>
                <span className="qty">
                  <button type="button" onClick={() => setQty(l.id, l.q - 1)} aria-label="-">
                    −
                  </button>
                  <span className="num">{l.q}</span>
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
      <div className="card pad" style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div className="lab">{t("cart_sub")}</div>
          <b className="num" style={{ fontSize: 24 }}>
            {money(lang, total)}
          </b>
        </div>
        <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
          <button type="button" className="btn btn-out" onClick={clear}>
            {t("cart_clear")}
          </button>
          <Link href="/panier/demande" className="btn btn-pri btn-lg">
            {t("cart_req")}
          </Link>
        </div>
      </div>
    </section>
  );
}
