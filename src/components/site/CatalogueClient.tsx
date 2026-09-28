"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Product, Settings } from "@/lib/types";
import { CATS } from "@/lib/data/constants";
import { money } from "@/lib/data/i18n";
import { ProductCard } from "./ProductCard";
import { useLang } from "./LangProvider";

export function CatalogueClient({
  products,
  settings,
}: {
  products: Product[];
  settings: Settings;
}) {
  const { lang, t, L } = useLang();
  const router = useRouter();
  const sp = useSearchParams();

  const cat = sp.get("cat") || "";
  const brand = sp.get("brand") || "";
  const max = Number(sp.get("max") || 5000);
  const inonly = sp.get("stock") === "1";
  const q = sp.get("q") || "";
  const sort = sp.get("sort") || "pop";

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [products],
  );

  const push = useCallback(
    (patch: Record<string, string | null>) => {
      const next = new URLSearchParams(sp.toString());
      Object.entries(patch).forEach(([k, v]) => {
        if (v == null || v === "" || (k === "max" && v === "5000") || (k === "sort" && v === "pop")) {
          next.delete(k);
        } else {
          next.set(k, v);
        }
      });
      const qs = next.toString();
      router.replace(qs ? `/catalogue?${qs}` : "/catalogue", { scroll: false });
    },
    [router, sp],
  );

  const list = useMemo(() => {
    let out = products.slice();
    if (cat) out = out.filter((p) => p.cat === cat);
    if (brand) out = out.filter((p) => p.brand === brand);
    if (inonly) out = out.filter((p) => p.stock > 0);
    out = out.filter((p) => p.price <= max);
    if (q) {
      const qq = q.toLowerCase();
      out = out.filter((p) => (L(p.name) + " " + p.ref + " " + p.brand).toLowerCase().includes(qq));
    }
    if (sort === "asc") out.sort((a, b) => a.price - b.price);
    else if (sort === "desc") out.sort((a, b) => b.price - a.price);
    else out.sort((a, b) => b.pop - a.pop);
    return out;
  }, [products, cat, brand, max, inonly, q, sort, L]);

  return (
    <section className="sec wrap">
      <div className="sec-h">
        <h1>{t("cat_title")}</h1>
        <p className="ink2">{t("cat_lead")}</p>
      </div>
      <div className="catalog">
        <aside className="filters">
          <div className="fbox">
            <h4>{t("f_cat")}</h4>
            <div className="frow">
              <button type="button" className="chip" aria-pressed={!cat} onClick={() => push({ cat: null })}>
                {t("f_all2")}
              </button>
              {CATS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="chip"
                  aria-pressed={cat === c.id}
                  onClick={() => push({ cat: c.id })}
                >
                  {L(c)}
                </button>
              ))}
            </div>
          </div>
          <div className="fbox">
            <h4>{t("f_brand")}</h4>
            <div className="frow">
              <button type="button" className="chip" aria-pressed={!brand} onClick={() => push({ brand: null })}>
                {t("f_all2")}
              </button>
              {brands.map((b) => (
                <button
                  key={b}
                  type="button"
                  className="chip"
                  aria-pressed={brand === b}
                  onClick={() => push({ brand: b })}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div className="fbox">
            <h4>
              {t("f_price")} — {money(lang, max)}
            </h4>
            <input
              className="input"
              type="range"
              min={300}
              max={5000}
              step={50}
              value={max}
              aria-label={t("f_price")}
              onChange={(e) => push({ max: e.target.value })}
            />
          </div>
          <div className="fbox">
            <label className="chip" style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={inonly}
                onChange={(e) => push({ stock: e.target.checked ? "1" : null })}
              />{" "}
              {t("f_instock")}
            </label>
          </div>
          <div className="fbox">
            <label className="lab" htmlFor="cat-q">
              {t("f_search")}
            </label>
            <input
              id="cat-q"
              className="input"
              value={q}
              placeholder={t("f_search")}
              onChange={(e) => push({ q: e.target.value || null })}
            />
          </div>
          <div className="fbox">
            <label className="lab" htmlFor="cat-sort">
              {t("f_sort")}
            </label>
            <select
              id="cat-sort"
              className="select"
              value={sort}
              onChange={(e) => push({ sort: e.target.value })}
            >
              <option value="pop">{t("sort_new")}</option>
              <option value="asc">{t("sort_asc")}</option>
              <option value="desc">{t("sort_desc")}</option>
            </select>
          </div>
          <button
            type="button"
            className="btn btn-out btn-sm"
            onClick={() => router.replace("/catalogue")}
          >
            {t("f_clear")}
          </button>
          <p className="xs muted" style={{ marginTop: 8 }}>
            {settings.company} — {t("h_callback")}
          </p>
        </aside>
        <div>
          <p className="sm muted" style={{ marginBottom: 12 }}>
            {t("n_found", { n: list.length })}
          </p>
          {list.length === 0 ? (
            <p className="muted">{t("none_found")}</p>
          ) : (
            <div className="pgrid">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
