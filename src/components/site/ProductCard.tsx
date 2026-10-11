"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { money } from "@/lib/data/i18n";
import { productSlug, stockLabel } from "@/lib/utils";
import { Icon, ProductArt } from "@/components/ui/Icon";
import { useCart } from "./CartProvider";
import { useLang } from "./LangProvider";
import { useToast } from "./ToastProvider";

export function ProductCard({ product }: { product: Product }) {
  const { lang, t, L } = useLang();
  const { add } = useCart();
  const { show } = useToast();
  const stock = stockLabel(lang, product);
  const href = `/catalogue/${productSlug(product)}`;

  return (
    <article className="pcard">
      <Link href={href} className="art" aria-label={L(product.name)}>
        <span className="pcard-ref mono">{product.ref}</span>
        <ProductArt cat={product.cat} size={96} />
      </Link>
      <div className="bd">
        <span className="br mono">{product.brand}</span>
        <Link href={href} className="nm">
          {L(product.name)}
        </Link>
        <span className={`pill ${stock.cls}`}>{stock.text}</span>
        <div className="pr num" dir="ltr">
          {money(lang, product.price)}
        </div>
      </div>
      <div className="acts">
        <Link href={href} className="btn btn-sm btn-out">
          {t("details")}
        </Link>
        <button
          type="button"
          className="btn btn-sm btn-pri"
          onClick={() => {
            add(product.id);
            show(t("toast_added"));
          }}
        >
          <Icon name="cart" size={15} />
          {t("add")}
        </button>
      </div>
    </article>
  );
}
