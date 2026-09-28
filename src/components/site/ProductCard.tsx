"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { money } from "@/lib/data/i18n";
import { stockLabel } from "@/lib/utils";
import { Icon, ProductArt } from "@/components/ui/Icon";
import { useCart } from "./CartProvider";
import { useLang } from "./LangProvider";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const { lang, t, L } = useLang();
  const { add } = useCart();
  const stock = stockLabel(lang, product);
  const [toast, setToast] = useState(false);

  return (
    <article className="pcard">
      <div className="art">
        <ProductArt cat={product.cat} size={110} />
      </div>
      <div className="bd">
        <span className="br">{product.brand}</span>
        <div className="nm">{L(product.name)}</div>
        <span className={`pill ${stock.cls}`}>{stock.text}</span>
        <div className="pr num">{money(lang, product.price)}</div>
      </div>
      <div className="acts">
        <Link href={`/catalogue?prod=${product.id}`} className="btn btn-sm btn-out">
          {t("details")}
        </Link>
        <button
          type="button"
          className="btn btn-sm btn-pri"
          onClick={() => {
            add(product.id);
            setToast(true);
            setTimeout(() => setToast(false), 1400);
          }}
        >
          {toast ? <Icon name="check" size={15} /> : null}
          {t("add")}
        </button>
      </div>
    </article>
  );
}
