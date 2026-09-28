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
import type { CartItem } from "@/lib/types";

type CartCtx = {
  items: CartItem[];
  count: number;
  add: (id: string, inst?: boolean) => void;
  setQty: (id: string, q: number) => void;
  toggleInst: (id: string, inst: boolean) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "oufi-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, ready]);

  const add = useCallback((id: string, inst = false) => {
    setItems((prev) => {
      const ex = prev.find((x) => x.id === id);
      if (ex) return prev.map((x) => (x.id === id ? { ...x, q: x.q + 1, inst: x.inst || inst } : x));
      return [...prev, { id, q: 1, inst }];
    });
  }, []);

  const setQty = useCallback((id: string, q: number) => {
    setItems((prev) =>
      q < 1 ? prev.filter((x) => x.id !== id) : prev.map((x) => (x.id === id ? { ...x, q } : x)),
    );
  }, []);

  const toggleInst = useCallback((id: string, inst: boolean) => {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, inst } : x)));
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((a, l) => a + l.q, 0),
      add,
      setQty,
      toggleInst,
      remove,
      clear,
    }),
    [items, add, setQty, toggleInst, remove, clear],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart outside provider");
  return v;
}
