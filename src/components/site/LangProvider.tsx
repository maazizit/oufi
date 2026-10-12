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
import { L, t } from "@/lib/data/i18n";

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  L: (o?: { fr: string; ar: string } | string | null) => string;
};

const Ctx = createContext<LangCtx | null>(null);
const KEY = "oufi-lang";

function applyDom(lang: Lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

function persist(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    /* ignore */
  }
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get("lang") !== lang) {
      url.searchParams.set("lang", lang);
      window.history.replaceState({}, "", url.toString());
    }
  } catch {
    /* ignore */
  }
}

function readInitialLang(): Lang {
  if (typeof window === "undefined") return "fr";
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "ar" || q === "fr") return q;
    const stored = localStorage.getItem(KEY);
    if (stored === "ar" || stored === "fr") return stored;
  } catch {
    /* ignore */
  }
  return "fr";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = readInitialLang();
    setLangState(initial);
    applyDom(initial);
    setReady(true);
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

  useEffect(() => {
    if (!ready) return;
    applyDom(lang);
  }, [lang, ready]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggle,
      t: (key: string, vars?: Record<string, string | number>) => t(lang, key, vars),
      L: (o?: { fr: string; ar: string } | string | null) => L(lang, o),
    }),
    [lang, setLang, toggle],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLang outside provider");
  return v;
}
