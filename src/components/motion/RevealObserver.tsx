"use client";

import { useEffect } from "react";

const FAILSAFE_MS = 900;

function markSeen(el: HTMLElement) {
  if (el.hasAttribute("data-seen")) return;
  el.setAttribute("data-seen", "");
  el.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
    const to = Number(node.getAttribute("data-count") || 0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || node.dataset.animated === "1") {
      node.textContent = String(to);
      return;
    }
    node.dataset.animated = "1";
    node.textContent = "0";
    const t0 = performance.now();
    const dur = 900;
    const step = (n: number) => {
      const k = Math.min(1, (n - t0) / dur);
      node.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/**
 * Reveals `.rev` elements when they enter the viewport.
 * Watches the DOM for late mounts (Suspense / useSearchParams / filter remounts)
 * and force-reveals anything still hidden after a short delay.
 */
export function RevealObserver() {
  useEffect(() => {
    const pending = new Set<HTMLElement>();
    let io: IntersectionObserver | null = null;
    let failsafeTimer: number | undefined;

    const revealAllPending = () => {
      pending.forEach((el) => markSeen(el));
      pending.clear();
    };

    const scheduleFailsafe = () => {
      window.clearTimeout(failsafeTimer);
      if (pending.size === 0) return;
      failsafeTimer = window.setTimeout(revealAllPending, FAILSAFE_MS);
    };

    const observe = (el: HTMLElement) => {
      if (el.hasAttribute("data-seen") || pending.has(el)) return;
      pending.add(el);
      if (!io) {
        markSeen(el);
        pending.delete(el);
        return;
      }
      io.observe(el);
      scheduleFailsafe();
    };

    const scan = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLElement>(".rev:not([data-seen])").forEach(observe);
    };

    if (!("IntersectionObserver" in window)) {
      scan();
      revealAllPending();
      return;
    }

    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          markSeen(el);
          pending.delete(el);
          io?.unobserve(el);
        });
        scheduleFailsafe();
      },
      { rootMargin: "80px 0px", threshold: 0 },
    );

    scan();

    // Elements already on screen should reveal immediately (IO can be late).
    pending.forEach((el) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh + 80 && r.bottom > -80) {
        markSeen(el);
        pending.delete(el);
        io?.unobserve(el);
      }
    });
    scheduleFailsafe();

    const mo =
      "MutationObserver" in window
        ? new MutationObserver((mutations) => {
            for (const m of mutations) {
              m.addedNodes.forEach((node) => {
                if (!(node instanceof HTMLElement)) return;
                if (node.matches(".rev:not([data-seen])")) observe(node);
                else scan(node);
              });
            }
          })
        : null;
    mo?.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(failsafeTimer);
      mo?.disconnect();
      io?.disconnect();
      revealAllPending();
    };
  }, []);

  return null;
}
