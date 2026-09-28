"use client";

import { useMemo, useState } from "react";
import type { Product, Settings } from "@/lib/types";
import { CATS } from "@/lib/data/constants";
import { money } from "@/lib/data/i18n";
import { catOf, specLabel, stockLabel } from "@/lib/utils";
import { Icon, ProductArt } from "@/components/ui/Icon";
import { ProductCard } from "./ProductCard";
import { useCart } from "./CartProvider";
import { useLang } from "./LangProvider";
import { useSearchParams } from "next/navigation";

export function CatalogueClient({
  products,
  settings,
}: {
  products: Product[];
  settings: Settings;
}) {
  const { lang, t, L } = useLang();
  const { add } = useCart();
  const sp = useSearchParams();
  const openId = sp.get("prod");

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand))).sort(),
    [products],
  );

  const [cat, setCat] = useState("");
  const [brand, setBrand] = useState("");
  const [max, setMax] = useState(5000);
  const [inonly, setInonly] = useState(false);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("pop");
  const [detail, setDetail] = useState<string | null>(openId);
  const [modInst, setModInst] = useState(false);

  const list = useMemo(() => {
    let out = products.slice();
    if (cat) out = out.filter((p) => p.cat === cat);
    if (brand) out = out.filter((p) => p.brand === brand);
    if (inonly) out = out.filter((p) => p.stock > 0);
    out = out.filter((p) => p.price <= max);
    if (q) {
      const qq = q.toLowerCase();
      out = out.filter(
        (p) =>
          (L(p.name) + " " + p.ref + " " + p.brand).toLowerCase().includes(qq),
      );
    }
    if (sort === "asc") out.sort((a, b) => a.price - b.price);
    else if (sort === "desc") out.sort((a, b) => b.price - a.price);
    else out.sort((a, b) => b.pop - a.pop);
    return out;
  }, [products, cat, brand, max, inonly, q, sort, L]);

  const open = products.find((p) => p.id === detail);

  return (
    <section className="sec wrap">
      <div className="sec-h rise">
        <h1>{t("cat_title")}</h1>
        <p className="ink2">{t("cat_lead")}</p>
      </div>
      <div className="catalog">
        <aside className="filters">
          <div className="fbox">
            <h4>{t("f_cat")}</h4>
            <div className="frow">
              <button type="button" className="chip" aria-pressed={!cat} onClick={() => setCat("")}>
                {t("f_all2")}
              </button>
              {CATS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="chip"
                  aria-pressed={cat === c.id}
                  onClick={() => setCat(c.id)}
                >
                  {L(c)}
                </button>
              ))}
            </div>
          </div>
          <div className="fbox">
            <h4>{t("f_brand")}</h4>
            <div className="frow">
              <button type="button" className="chip" aria-pressed={!brand} onClick={() => setBrand("")}>
                {t("f_all2")}
              </button>
              {brands.map((b) => (
                <button
                  key={b}
                  type="button"
                  className="chip"
                  aria-pressed={brand === b}
                  onClick={() => setBrand(b)}
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
              onChange={(e) => setMax(+e.target.value)}
            />
          </div>
          <div className="fbox">
            <label className="opt" data-on={inonly ? 1 : 0}>
              <input type="checkbox" checked={inonly} onChange={(e) => setInonly(e.target.checked)} />
              <span className="t">{t("f_instock")}</span>
            </label>
            <button
              type="button"
              className="btn btn-sm btn-out"
              style={{ marginTop: 10 }}
              onClick={() => {
                setCat("");
                setBrand("");
                setMax(5000);
                setInonly(false);
                setQ("");
                setSort("pop");
              }}
            >
              {t("f_clear")}
            </button>
          </div>
        </aside>
        <div>
          <div className="toolbar" style={{ marginBottom: 14 }}>
            <input
              className="input search"
              placeholder={t("f_search")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <select className="select" style={{ width: "auto" }} value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="pop">{t("sort_new")}</option>
              <option value="asc">{t("sort_asc")}</option>
              <option value="desc">{t("sort_desc")}</option>
            </select>
          </div>
          <p className="sm muted" style={{ marginBottom: 12 }}>
            {t("n_found", { n: list.length })}
          </p>
          {list.length === 0 ? (
            <p className="muted">{t("none_found")}</p>
          ) : (
            <div className="pgrid">
              {list.map((p) => (
                <div key={p.id} onClick={(e) => {
                  if ((e.target as HTMLElement).closest("button,a")) return;
                }}>
                  <div onClick={() => setDetail(p.id)} style={{ cursor: "pointer" }}>
                    <ProductCard product={p} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {open ? (
        <div
          className="scrim"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(8,20,35,.45)",
            zIndex: 60,
            display: "grid",
            placeItems: "center",
            padding: 16,
          }}
          onClick={() => setDetail(null)}
        >
          <div
            className="card"
            style={{ maxWidth: 640, width: "100%", maxHeight: "90vh", overflow: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid var(--line)" }}>
              <h3 style={{ flex: 1 }}>{L(open.name)}</h3>
              <button type="button" className="btn btn-sm btn-out" onClick={() => setDetail(null)}>
                ×
              </button>
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 }}>
                <div className="art" style={{ aspectRatio: "4/3", background: "var(--surface-2)", display: "grid", placeItems: "center", borderRadius: 10 }}>
                  <ProductArt cat={open.cat} size={160} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span className="xs muted" style={{ letterSpacing: ".08em", textTransform: "uppercase" }}>
                    {open.brand} · {L(catOf(open.cat))}
                  </span>
                  <span className="mono sm muted">
                    {t("ref")} {open.ref}
                  </span>
                  <span className={`pill ${stockLabel(lang, open).cls}`}>{stockLabel(lang, open).text}</span>
                  <b className="num" style={{ fontSize: 26 }}>
                    {money(lang, open.price)}
                  </b>
                </div>
              </div>
              <div>
                <h4 className="lab" style={{ marginBottom: 8 }}>
                  {t("specs")}
                </h4>
                <div className="tw">
                  <table>
                    <tbody>
                      {open.specs.map(([k, v]) => (
                        <tr key={k}>
                          <td style={{ color: "var(--muted)", width: "45%" }}>{specLabel(lang, k)}</td>
                          <td>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <label className="opt" data-on={modInst ? 1 : 0}>
                <input type="checkbox" checked={modInst} onChange={(e) => setModInst(e.target.checked)} />
                <span>
                  <span className="t">{t("withinstall")}</span>
                  <br />
                  <span className="hint">{t("withinstall_h")}</span>
                </span>
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                <button type="button" className="btn btn-out" onClick={() => setDetail(null)}>
                  {t("a_close")}
                </button>
                <button
                  type="button"
                  className="btn btn-pri"
                  style={{ flex: 1 }}
                  onClick={() => {
                    add(open.id, modInst);
                    setDetail(null);
                  }}
                >
                  <Icon name="cart" size={17} /> {t("addcart")}
                </button>
              </div>
              <p className="xs muted">{settings.company} · {t("cart_note")}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
