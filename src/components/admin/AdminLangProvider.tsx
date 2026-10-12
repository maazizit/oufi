"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "@/lib/types";
import { adminT } from "@/lib/data/admin-i18n";
import { ADMIN_LANG_COOKIE } from "@/lib/admin/lang-cookie";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const AdminLangCtx = createContext<Ctx | null>(null);
const LS_KEY = "oufi-admin-lang";

function applyDom(lang: Lang) {
  document.documentElement.lang = lang === "ar" ? "ar" : "fr";
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

function persist(lang: Lang) {
  try {
    localStorage.setItem(LS_KEY, lang);
  } catch {
    /* ignore */
  }
  document.cookie = `${ADMIN_LANG_COOKIE}=${lang};path=/;max-age=31536000;samesite=lax`;
}

function readInitial(): Lang {
  try {
    if (typeof window !== "undefined") {
      const q = new URLSearchParams(window.location.search).get("lang");
      if (q === "ar" || q === "fr") return q;
      const stored = localStorage.getItem(LS_KEY);
      if (stored === "ar" || stored === "fr") return stored;
      const site = localStorage.getItem("oufi-lang");
      if (site === "ar" || site === "fr") return site;
    }
  } catch {
    /* ignore */
  }
  return "fr";
}

export function AdminLangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const initial = readInitial();
    setLangState(initial);
    applyDom(initial);
    persist(initial);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    persist(next);
    applyDom(next);
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "fr" ? "ar" : "fr";
      persist(next);
      applyDom(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggle,
      t: (key: string, vars?: Record<string, string | number>) => adminT(lang, key, vars),
    }),
    [lang, setLang, toggle],
  );

  return <AdminLangCtx.Provider value={value}>{children}</AdminLangCtx.Provider>;
}

export function useAdminLang() {
  const v = useContext(AdminLangCtx);
  if (!v) throw new Error("useAdminLang outside AdminLangProvider");
  return v;
}
