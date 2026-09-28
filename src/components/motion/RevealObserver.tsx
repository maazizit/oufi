"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rev:not([data-seen])"));
    const seen = (el: HTMLElement) => {
      el.setAttribute("data-seen", "");
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
        const to = Number(node.getAttribute("data-count") || 0);
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
          node.textContent = String(to);
          return;
        }
        const t0 = performance.now();
        const dur = 900;
        const step = (n: number) => {
          const k = Math.min(1, (n - t0) / dur);
          node.textContent = String(Math.round(to * (1 - Math.pow(1 - k, 3))));
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    };

    if (!("IntersectionObserver" in window)) {
      els.forEach(seen);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            seen(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -70px 0px", threshold: 0.04 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  });

  return null;
}
