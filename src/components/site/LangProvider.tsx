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
import { usePathname, useRouter } from "next/navigation";
import type { Lang } from "@/lib/types";
import { L, t } from "@/lib/data/i18n";
import { localeFromPath, withLocale, stripLocalePrefix } from "@/lib/locale";
import { BidiText } from "./Num";

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  /** Comme `t` mais isole les tokens latins/chiffres en AR. */
  tb: (key: string, vars?: Record<string, string | number>) => ReactNode;
  L: (o?: { fr: string; ar: string } | string | null) => string;
  /** Comme `L` avec isolement bidi en AR. */
  Lb: (o?: { fr: string; ar: string } | string | null) => ReactNode;
  /** Préfixe la locale courante (`/ar…`) pour les liens internes. */
  href: (path: string) => string;
};

const Ctx = createContext<LangCtx | null>(null);
const KEY = "oufi-lang";

function applyDom(lang: Lang) {
  document.documentElement.lang = lang === "ar" ? "ar" : "fr";
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

function persist(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    /* ignore */
  }
}

function readInitialLang(pathname: string): Lang {
  try {
    if (pathname === "/ar" || pathname.startsWith("/ar/")) return "ar";
    if (typeof window !== "undefined") {
      const q = new URLSearchParams(window.location.search).get("lang");
      if (q === "ar" || q === "fr") return q;
    }
    if (localeFromPath(pathname) === "ar") return "ar";
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(KEY);
      if (stored === "ar" || stored === "fr") return stored;
    }
  } catch {
    /* ignore */
  }
  return "fr";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>(() =>
    pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "fr",
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = readInitialLang(pathname);
    setLangState(initial);
    applyDom(initial);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- boot once from URL
  }, []);

  /** Sync lang when user lands on /ar… via lien direct. */
  useEffect(() => {
    if (!ready) return;
    const fromPath = localeFromPath(pathname);
    if (fromPath !== lang) {
      setLangState(fromPath);
      persist(fromPath);
      applyDom(fromPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- path-driven only
  }, [pathname, ready]);

  const navigateToLang = useCallback(
    (next: Lang) => {
      const bare = stripLocalePrefix(pathname);
      const target = withLocale(bare, next);
      let qs = "";
      try {
        const params = new URLSearchParams(window.location.search);
        params.delete("lang");
        const s = params.toString();
        if (s) qs = `?${s}`;
      } catch {
        /* ignore */
      }
      router.replace(`${target}${qs}`);
    },
    [pathname, router],
  );

  const setLang = useCallback(
    (next: Lang) => {
      setLangState(next);
      persist(next);
      applyDom(next);
      navigateToLang(next);
    },
    [navigateToLang],
  );

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "fr" ? "ar" : "fr";
      persist(next);
      applyDom(next);
      navigateToLang(next);
      return next;
    });
  }, [navigateToLang]);

  useEffect(() => {
    if (!ready) return;
    applyDom(lang);
  }, [lang, ready]);

  const href = useCallback(
    (path: string) => withLocale(path.startsWith("/") ? path : `/${path}`, lang),
    [lang],
  );

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggle,
      href,
      t: (key: string, vars?: Record<string, string | number>) => t(lang, key, vars),
      tb: (key: string, vars?: Record<string, string | number>) => (
        <BidiText text={t(lang, key, vars)} lang={lang} />
      ),
      L: (o?: { fr: string; ar: string } | string | null) => L(lang, o),
      Lb: (o?: { fr: string; ar: string } | string | null) => (
        <BidiText text={L(lang, o)} lang={lang} />
      ),
    }),
    [lang, setLang, toggle, href],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLang outside provider");
  return v;
}
