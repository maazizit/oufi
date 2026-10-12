"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { money } from "@/lib/data/i18n";
import { ProductArt } from "@/components/ui/Icon";
import { useAdminLang } from "@/components/admin/AdminLangProvider";

export function AdminCatalogClient({
  products,
  categories,
}: {
  products: Product[];
  categories: { id: string; label: string }[];
}) {
  const router = useRouter();
  const { t } = useAdminLang();
  const [q, setQ] = useState("");
  const [edit, setEdit] = useState<Product | "new" | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState("");
  const [form, setForm] = useState({
    ref: "",
    cat: "cam",
    brand: "",
    name_fr: "",
    name_ar: "",
    price: "",
    stock: "0",
    warr: "12",
    specs: "",
    active: true,
    img: "",
  });

  const list = useMemo(() => {
    if (!q) return products;
    const qq = q.toLowerCase();
    return products.filter((p) =>
      (p.name.fr + " " + p.ref + " " + p.brand).toLowerCase().includes(qq),
    );
  }, [products, q]);

  function openEdit(p: Product | "new") {
    if (p === "new") {
      setForm({
        ref: "",
        cat: "cam",
        brand: "",
        name_fr: "",
        name_ar: "",
        price: "",
        stock: "0",
        warr: "12",
        specs: "",
        active: true,
        img: "",
      });
    } else {
      setForm({
        ref: p.ref,
        cat: p.cat,
        brand: p.brand,
        name_fr: p.name.fr,
        name_ar: p.name.ar,
        price: String(p.price),
        stock: String(p.stock),
        warr: String(p.warr),
        specs: p.specs.map(([k, v]) => `${k} : ${v}`).join("\n"),
        active: p.active,
        img: p.img || "",
      });
    }
    setEdit(p);
  }

  async function onPickImage(file: File | null) {
    if (!file) return;
    setUploadErr("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("ref", form.ref || form.name_fr || "product");
      const res = await fetch("/api/admin/products/upload", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setUploadErr(t("adm_photo_err"));
        return;
      }
      const url = String(data.url || data.path || "");
      if (url) setForm((f) => ({ ...f, img: url }));
    } catch {
      setUploadErr(t("adm_photo_err"));
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    const id = edit === "new" || !edit ? `p${Date.now()}` : edit.id;
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        warr: Number(form.warr),
        specs: form.specs
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)
          .map((l) => {
            const i = l.indexOf(":");
            return i < 0 ? [l, ""] : [l.slice(0, i).trim(), l.slice(i + 1).trim()];
          }),
      }),
    });
    setEdit(null);
    router.refresh();
  }

  async function updateField(id: string, patch: Record<string, unknown>) {
    await fetch("/api/admin/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    router.refresh();
  }

  async function remove(id: string) {
    if (!confirm("Supprimer cet article ?")) return;
    await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  }

  return (
    <>
      <div className="toolbar">
        <input
          className="input search"
          placeholder="Nom, réf. ou marque…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button type="button" className="btn btn-pri" onClick={() => openEdit("new")}>
          Nouvel article
        </button>
      </div>
      <div className="tw">
        <table>
          <thead>
            <tr>
              <th>Article</th>
              <th>Catégorie</th>
              <th>Marque</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Publié</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 6,
                        overflow: "hidden",
                        display: "grid",
                        placeItems: "center",
                        background: "var(--surface-2)",
                        flexShrink: 0,
                      }}
                    >
                      {p.img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.img} alt="" width={34} height={34} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                      ) : (
                        <ProductArt cat={p.cat} size={34} />
                      )}
                    </span>
                    <span>
                      <b>{p.name.fr}</b>
                      <br />
                      <span className="xs muted mono">{p.ref}</span>
                    </span>
                  </div>
                </td>
                <td>{categories.find((c) => c.id === p.cat)?.label || p.cat}</td>
                <td>{p.brand}</td>
                <td className="num mono">{money("fr", p.price)}</td>
                <td>
                  <input
                    className="input num"
                    style={{ width: 74, padding: "5px 8px" }}
                    type="number"
                    min={0}
                    defaultValue={p.stock}
                    onBlur={(e) => updateField(p.id, { stock: Number(e.target.value) || 0 })}
                  />
                  {p.stock <= 5 ? (
                    <span className="pill pill-warn" style={{ marginInlineStart: 4 }}>
                      Stock bas
                    </span>
                  ) : null}
                </td>
                <td>
                  <label className="sm" style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={p.active}
                      onChange={(e) => updateField(p.id, { active: e.target.checked })}
                    />
                    {p.active ? "Oui" : "Non"}
                  </label>
                </td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button type="button" className="btn btn-sm btn-out" onClick={() => openEdit(p)}>
                      Modifier
                    </button>
                    <button type="button" className="btn btn-sm btn-dan" onClick={() => remove(p.id)}>
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {edit ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(8, 20, 35, 0.45)",
            zIndex: 60,
            display: "grid",
            placeItems: "center",
            padding: 16,
          }}
          onClick={() => setEdit(null)}
        >
          <div
            className="card"
            style={{ width: "100%", maxWidth: 560, maxHeight: "90vh", overflow: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--line)", display: "flex" }}>
              <h3 style={{ flex: 1 }}>{edit === "new" ? "Nouvel article" : "Modifier l'article"}</h3>
              <button type="button" className="btn btn-sm btn-out" onClick={() => setEdit(null)}>
                ×
              </button>
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="grid2">
                <div className="field">
                  <label>Référence</label>
                  <input className="input" value={form.ref} onChange={(e) => setForm({ ...form, ref: e.target.value })} />
                </div>
                <div className="field">
                  <label>Catégorie</label>
                  <select className="select" value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })}>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid2">
                <div className="field">
                  <label>Nom (français)</label>
                  <input className="input" value={form.name_fr} onChange={(e) => setForm({ ...form, name_fr: e.target.value })} />
                </div>
                <div className="field">
                  <label>Nom (arabe)</label>
                  <input className="input" value={form.name_ar} onChange={(e) => setForm({ ...form, name_ar: e.target.value })} />
                </div>
              </div>
              <div className="grid2">
                <div className="field">
                  <label>Marque</label>
                  <input className="input" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
                </div>
                <div className="field">
                  <label>Prix TTC (DH)</label>
                  <input className="input" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
              </div>
              <div className="grid2">
                <div className="field">
                  <label>Stock</label>
                  <input className="input" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                </div>
                <div className="field">
                  <label>Garantie (mois)</label>
                  <input className="input" type="number" value={form.warr} onChange={(e) => setForm({ ...form, warr: e.target.value })} />
                </div>
              </div>
              <div className="field">
                <label>Caractéristiques</label>
                <textarea className="textarea" value={form.specs} onChange={(e) => setForm({ ...form, specs: e.target.value })} />
              </div>
              <div className="field">
                <label>{t("adm_photo_label")}</label>
                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      width: 88,
                      height: 88,
                      borderRadius: 8,
                      overflow: "hidden",
                      display: "grid",
                      placeItems: "center",
                      background: "var(--surface-2)",
                      border: "1px solid var(--line)",
                      flexShrink: 0,
                    }}
                  >
                    {form.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={form.img}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <ProductArt cat={form.cat} size={88} />
                    )}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <label className="btn btn-sm btn-out" style={{ cursor: "pointer" }}>
                      {uploading ? t("adm_photo_uploading") : t("adm_photo_upload")}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/*"
                        hidden
                        disabled={uploading}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          void onPickImage(f || null);
                          e.target.value = "";
                        }}
                      />
                    </label>
                    <p className="xs muted" style={{ maxWidth: 280 }}>{t("adm_photo_hint")}</p>
                    {uploadErr ? <p className="xs err">{uploadErr}</p> : null}
                  </div>
                </div>
                <label className="xs muted">{t("adm_photo_path")}</label>
                <input
                  className="input mono"
                  placeholder={`/products/${form.ref ? form.ref.toLowerCase() : "slug"}.webp`}
                  value={form.img}
                  onChange={(e) => setForm({ ...form, img: e.target.value })}
                />
              </div>
              <label className="opt" data-on={form.active ? 1 : 0}>
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
                <span className="t" style={{ fontWeight: 500 }}>
                  Visible sur le site
                </span>
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                <button type="button" className="btn btn-out" onClick={() => setEdit(null)}>
                  Annuler
                </button>
                <button type="button" className="btn btn-pri" style={{ flex: 1 }} onClick={save}>
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
