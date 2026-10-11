"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Product, Settings } from "@/lib/types";
import { CHANS, LOCALS, SVCS, TYPES } from "@/lib/data/constants";
import { SITE } from "@/lib/site";
import { feeFor, isMoroccanPhone } from "@/lib/utils";
import { saveLastRequest } from "@/lib/client/demo-client-store";
import { Icon } from "@/components/ui/Icon";
import { Money } from "./Money";
import { useCart } from "./CartProvider";
import { useLang } from "./LangProvider";

export function QuoteForm({
  settings,
  mode,
  products = [],
}: {
  settings: Settings;
  mode: "form" | "cart";
  products?: Product[];
}) {
  const { t, L } = useLang();
  const router = useRouter();
  const sp = useSearchParams();
  const { items, clear } = useCart();
  const typeParam = sp.get("type");
  const initialType =
    mode === "cart"
      ? "prod"
      : typeParam === "maint" || typeParam === "fix" || typeParam === "install" || typeParam === "prod"
        ? typeParam
        : "install";
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [form, setForm] = useState<Record<string, string | boolean>>({
    type: initialType,
    svc: sp.get("svc") || (mode === "cart" ? "cam" : "cam"),
    chan: "phone",
    slot: "any",
    ok: false,
  });

  const catalogForSvc = useMemo(() => {
    const svc = String(form.svc || "");
    const catMap: Record<string, string[]> = {
      cam: ["cam", "nvr"],
      net: ["net", "cbl"],
      it: ["it"],
      acc: ["acc"],
    };
    const cats = catMap[svc] || [];
    return products.filter((p) => p.active && (cats.length === 0 || cats.includes(p.cat))).slice(0, 12);
  }, [products, form.svc]);

  const set = (k: string, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));

  const fv = (k: string) => (form[k] == null ? "" : form[k]);

  const cities = settings.fees.map((f) => f[0]);
  const city = String(form.city || "");
  const fee = city ? feeFor(settings, city) : null;

  const avChans = CHANS.filter((c) => settings.channels[c.id]);

  function validate(s: number | "cart") {
    const e: Record<string, string> = {};
    const need = (k: string) => {
      const v = fv(k);
      if (v === "" || v == null || v === false) e[k] = t("err_req");
    };
    if (s === 1) {
      need("type");
      need("desc");
      if (fv("svc") === "other") need("svcother");
    }
    if (s === 2) {
      need("city");
      need("addr");
    }
    if (s === 3 || s === "cart") {
      need("name");
      need("chan");
      if (s === "cart") need("city");
      if (fv("chan") === "mail") {
        if (!/^[^@\s]+@[^@\s]+\.[A-Za-z]{2,}$/.test(String(fv("email")))) e.email = t("err_mail");
      } else if (fv("chan")) {
        if (!isMoroccanPhone(String(fv("phone")))) e.phone = t("err_phone");
      }
      if (!fv("ok")) e.ok = t("err_req");
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit() {
    setBusy(true);
    try {
      const pickedItems =
        mode === "cart"
          ? items
          : Object.entries(picked)
              .filter(([, q]) => q > 0)
              .map(([id, q]) => ({ id, q, inst: form.type === "install" }));

      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          src: mode === "cart" ? "cart" : "form",
          type: mode === "cart" ? "prod" : form.type,
          svc: form.svc,
          svcother: form.svcother,
          name: form.name,
          company: form.company,
          city: form.city,
          addr: form.addr,
          local: form.local,
          surface: form.surface,
          rooms: form.rooms,
          cams: form.cams,
          place: form.place,
          net: form.net,
          exist: form.exist,
          delay: form.delay,
          budget: form.budget,
          chan: form.chan,
          phone: form.phone,
          email: form.email,
          slot: form.slot,
          fee,
          desc: form.desc,
          items: pickedItems,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ref) throw new Error(data.error || "error");
      if (data.request) {
        saveLastRequest(data.request);
        // Reinforce persistence in this browser (demo mode has no DB)
        void fetch("/api/admin/demo-import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ requests: [data.request] }),
        });
      }
      if (mode === "cart") clear();
      router.push(`/confirmation?ref=${encodeURIComponent(data.ref)}`);
    } catch {
      setErrors({ form: t("err_fix") });
    } finally {
      setBusy(false);
    }
  }

  const field = (k: string, label: string, type = "text", ph = "", hint = "") => (
    <div className="field">
      <label htmlFor={"f_" + k}>{label}</label>
      {type === "textarea" ? (
        <textarea
          className="textarea"
          id={"f_" + k}
          placeholder={ph}
          value={String(fv(k))}
          data-bad={errors[k] ? 1 : undefined}
          onChange={(e) => set(k, e.target.value)}
        />
      ) : (
        <input
          className="input"
          id={"f_" + k}
          type={type}
          placeholder={ph}
          value={String(fv(k))}
          data-bad={errors[k] ? 1 : undefined}
          onChange={(e) => set(k, e.target.value)}
        />
      )}
      {hint ? <span className="hint">{hint}</span> : null}
      {errors[k] ? <span className="err">{errors[k]}</span> : null}
    </div>
  );

  const progressPct = mode === "form" ? Math.round((step / 3) * 100) : 100;

  return (
    <>
      {mode === "form" ? (
        <section className="page-band">
          <div className="wrap page-band-in rise">
            <p className="page-band-k mono">
              C.I.S · {SITE.hqCity.toUpperCase()} · DEVIS
            </p>
            <h1>{t("q_title")}</h1>
            <p className="page-band-lead">{t("q_lead")}</p>
            <p className="sm" style={{ color: "#8d9ab3", margin: 0 }}>
              {t("h_callback")}
            </p>
          </div>
        </section>
      ) : null}

      <section className={`sec wrap quote-sec${mode === "cart" ? " quote-sec-cart" : ""}`}>
        {mode === "cart" ? (
          <div className="sec-h">
            <h1>{t("cart_req")}</h1>
            <p className="ink2">{t("cart_note")}</p>
          </div>
        ) : null}

        {mode === "form" ? (
          <aside className="wa-press">
            <div className="wa-press-body">
              <span className="wa-press-badge mono">PRIORITY · WA</span>
              <h2 className="wa-press-t">{t("q_wa_press_t")}</h2>
              <p className="wa-press-d">{t("q_wa_press_d")}</p>
            </div>
            <a
              className="btn btn-pri wa-press-cta"
              href={SITE.waHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="wa" size={17} /> {t("q_wa_press_cta")}
            </a>
          </aside>
        ) : null}

        {mode === "form" ? (
          <div className="quote-progress" aria-label={t("q_progress", { n: String(step) })}>
            <div className="quote-progress-meta">
              <span className="mono">{t("q_progress", { n: String(step) })}</span>
              <span className="mono num">{progressPct}%</span>
            </div>
            <div className="quote-progress-track" aria-hidden="true">
              <div className="quote-progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="stepper">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="s"
                  data-on={step === n ? 1 : 0}
                  data-done={step > n ? 1 : 0}
                >
                  <b>{n}</b>
                  {t(`q_s${n}`)}
                </div>
              ))}
            </div>
          </div>
        ) : null}

      <div className="quote-panel">
        {mode === "form" && step === 1 ? (
          <>
            <div className="field">
              <span className="lab">{t("q_type")}</span>
              <div className="type-cards">
                {TYPES.map((ty) => (
                  <label
                    key={ty.id}
                    className="type-card"
                    data-on={fv("type") === ty.id ? 1 : 0}
                  >
                    <input
                      type="radio"
                      name="type"
                      checked={fv("type") === ty.id}
                      onChange={() => set("type", ty.id)}
                    />
                    <span className="type-card-k mono">{ty.id.toUpperCase()}</span>
                    <span className="type-card-t">{t(ty.k)}</span>
                    <span className="type-card-d">{t(ty.d)}</span>
                  </label>
                ))}
              </div>
              {errors.type ? <span className="err">{errors.type}</span> : null}
            </div>
            <div className="field">
              <span className="lab">{t("q_svc")}</span>
              <div className="frow">
                {SVCS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className="chip"
                    aria-pressed={fv("svc") === s.id}
                    onClick={() => set("svc", s.id)}
                  >
                    {t(s.k)}
                  </button>
                ))}
                <button
                  type="button"
                  className="chip"
                  aria-pressed={fv("svc") === "other"}
                  onClick={() => set("svc", "other")}
                >
                  {t("s_other_t")}
                </button>
              </div>
            </div>
            {fv("svc") === "other"
              ? field("svcother", t("q_svcother"), "textarea", t("q_svcother_ph"), t("q_svcother_h"))
              : null}
            {field("desc", t("q_desc"), "textarea", t("q_desc_ph"))}
            {mode === "form" &&
            (fv("type") === "install" || fv("type") === "prod") &&
            catalogForSvc.length > 0 ? (
              <div className="field">
                <span className="lab">{t("q_pick")}</span>
                <p className="hint" style={{ marginBottom: 8 }}>
                  {t("q_pick_h")}
                </p>
                <div className="quote-pick">
                  {catalogForSvc.map((p) => {
                    const q = picked[p.id] || 0;
                    return (
                      <div key={p.id} className="quote-pick-row">
                        <div>
                          <b className="sm">{L(p.name)}</b>
                          <div className="xs muted">
                            {p.brand} · <Money amount={p.price} />
                          </div>
                        </div>
                        <div className="quote-pick-qty">
                          <button
                            type="button"
                            className="btn btn-sm btn-out"
                            aria-label="-"
                            disabled={q <= 0}
                            onClick={() =>
                              setPicked((prev) => {
                                const next = { ...prev };
                                const n = (next[p.id] || 0) - 1;
                                if (n <= 0) delete next[p.id];
                                else next[p.id] = n;
                                return next;
                              })
                            }
                          >
                            −
                          </button>
                          <span className="num mono">{q}</span>
                          <button
                            type="button"
                            className="btn btn-sm btn-out"
                            aria-label="+"
                            onClick={() =>
                              setPicked((prev) => ({
                                ...prev,
                                [p.id]: (prev[p.id] || 0) + 1,
                              }))
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
            <div className="quote-nav">
              <button
                type="button"
                className="btn btn-pri"
                onClick={() => {
                  if (validate(1)) setStep(2);
                }}
              >
                {t("q_next")} <Icon name="arrow" size={16} />
              </button>
            </div>
          </>
        ) : null}

        {mode === "form" && step === 2 ? (
          <>
            <div className="field">
              <label htmlFor="f_city">{t("q_city")}</label>
              <select
                className="select"
                id="f_city"
                value={String(fv("city"))}
                data-bad={errors.city ? 1 : undefined}
                onChange={(e) => set("city", e.target.value)}
              >
                <option value="">—</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.city ? <span className="err">{errors.city}</span> : null}
            </div>
            {fv("city") ? (
              <div className="feebar">
                <Icon name="pin" size={18} />
                <span>
                  <b>
                    {t("q_feeline")} — {String(fv("city"))} :{" "}
                    {fee != null ? <Money amount={fee} /> : t("q_feeask")}
                  </b>
                  <br />
                  {t("q_feenote")}
                </span>
              </div>
            ) : null}
            {field("addr", t("q_addr"), "text", t("q_addr_ph"), t("q_addr_h"))}
            <div className="field">
              <label htmlFor="f_local">{t("q_local")}</label>
              <select
                className="select"
                id="f_local"
                value={String(fv("local"))}
                onChange={(e) => set("local", e.target.value)}
              >
                <option value="">—</option>
                {LOCALS.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.fr}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid2">
              {field("surface", t("q_surf"), "number")}
              {field("rooms", t("q_rooms"), "number")}
              {field("cams", t("q_cams"), "number")}
            </div>
            <div className="field">
              <span className="lab">{t("q_place")}</span>
              <div className="frow">
                {(["in", "out", "both"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    className="chip"
                    aria-pressed={fv("place") === p}
                    onClick={() => set("place", p)}
                  >
                    {t(`pl_${p}`)}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid2">
              <div className="field">
                <span className="lab">{t("q_net")}</span>
                <div className="frow">
                  {(["yes", "no", "dunno"] as const).map((v) => (
                    <button key={v} type="button" className="chip" aria-pressed={fv("net") === v} onClick={() => set("net", v)}>
                      {t(v)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field">
                <span className="lab">{t("q_exist")}</span>
                <div className="frow">
                  {(["yes", "no"] as const).map((v) => (
                    <button key={v} type="button" className="chip" aria-pressed={fv("exist") === v} onClick={() => set("exist", v)}>
                      {t(v)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="field">
              <span className="lab">{t("q_delay")}</span>
              <div className="frow">
                {(["urgent", "week", "month", "plan"] as const).map((d) => (
                  <button key={d} type="button" className="chip" aria-pressed={fv("delay") === d} onClick={() => set("delay", d)}>
                    {t(`dl_${d}`)}
                  </button>
                ))}
              </div>
            </div>
            {field("budget", t("q_budget"))}
            <div className="quote-nav">
              <button type="button" className="btn btn-out" onClick={() => setStep(1)}>
                {t("q_back")}
              </button>
              <button
                type="button"
                className="btn btn-pri"
                onClick={() => {
                  if (validate(2)) setStep(3);
                }}
              >
                {t("q_next")} <Icon name="arrow" size={16} />
              </button>
            </div>
          </>
        ) : null}

        {(mode === "cart" || (mode === "form" && step === 3)) ? (
          <>
            {mode === "cart" ? (
              <div className="field">
                <label htmlFor="f_city">{t("q_city")}</label>
                <select
                  className="select"
                  id="f_city"
                  value={String(fv("city"))}
                  data-bad={errors.city ? 1 : undefined}
                  onChange={(e) => set("city", e.target.value)}
                >
                  <option value="">—</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.city ? <span className="err">{errors.city}</span> : null}
              </div>
            ) : null}
            {field("name", t("q_name"))}
            {field("company", t("q_comp"))}
            <div className="field">
              <span className="lab">{t("q_chan")}</span>
              <div className="type-cards type-cards-3">
                {avChans.map((c) => (
                  <label
                    key={c.id}
                    className="type-card type-card-sm"
                    data-on={fv("chan") === c.id ? 1 : 0}
                  >
                    <input
                      type="radio"
                      name="chan"
                      checked={fv("chan") === c.id}
                      onChange={() => set("chan", c.id)}
                    />
                    <span className="type-card-t" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                      <Icon name={c.ic} size={16} /> {t(c.k)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            {fv("chan") === "mail"
              ? field("email", t("q_mail"), "email")
              : field("phone", t("q_phone"), "tel")}
            <div className="field">
              <span className="lab">{t("q_slot")}</span>
              <div className="frow">
                {(["am", "pm", "any"] as const).map((s) => (
                  <button key={s} type="button" className="chip" aria-pressed={fv("slot") === s} onClick={() => set("slot", s)}>
                    {t(`sl_${s}`)}
                  </button>
                ))}
              </div>
            </div>
            <label className="opt" data-on={fv("ok") ? 1 : 0}>
              <input
                type="checkbox"
                checked={Boolean(fv("ok"))}
                onChange={(e) => set("ok", e.target.checked)}
              />
              <span className="t" style={{ fontWeight: 500, fontSize: 13.5 }}>
                {t("q_ok")}
              </span>
            </label>
            {errors.ok ? <span className="err">{errors.ok}</span> : null}
            {errors.form ? <span className="err">{errors.form}</span> : null}
            <div className="quote-nav">
              {mode === "form" ? (
                <button type="button" className="btn btn-out" onClick={() => setStep(2)}>
                  {t("q_back")}
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                className="btn btn-pri"
                disabled={busy}
                onClick={() => {
                  if (validate(mode === "cart" ? "cart" : 3)) submit();
                }}
              >
                {t("q_send")}
              </button>
            </div>
          </>
        ) : null}
      </div>
      </section>
    </>
  );
}
