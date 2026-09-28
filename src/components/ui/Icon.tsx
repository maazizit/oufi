import type { ReactNode, SVGProps } from "react";

const paths: Record<string, ReactNode> = {
  cam: (
    <>
      <rect x="2.5" y="8.5" width="14" height="7.5" rx="3.7" />
      <circle cx="6.6" cy="12.2" r="1.9" />
      <path d="M12.5 8.5V5.5h7" />
      <path d="M9.5 16v3.5M7 19.5h5" />
    </>
  ),
  router: (
    <>
      <rect x="2.5" y="13" width="19" height="7" rx="1.6" />
      <path d="M6 16.5h.01M9 16.5h.01" />
      <path d="M18 16.5h1.5" />
      <path d="M12 13V9" />
      <path d="M8.6 6.6a4.8 4.8 0 0 1 6.8 0M6 4.2a8.2 8.2 0 0 1 12 0" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.6c0 4.4 3.1 7.7 7.5 9.4 4.4-1.7 7.5-5 7.5-9.4V6z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </>
  ),
  cart: (
    <>
      <circle cx="9.5" cy="19" r="1.4" />
      <circle cx="17.5" cy="19" r="1.4" />
      <path d="M2.5 3.5h2.2l2.6 11h11.1l1.9-7.7H6.2" />
    </>
  ),
  phone: (
    <path d="M6.3 3.5h3l1.5 3.7-1.9 1.3a12 12 0 0 0 5.6 5.6l1.3-1.9 3.7 1.5v3a1.8 1.8 0 0 1-2 1.8A15.8 15.8 0 0 1 4.5 5.5a1.8 1.8 0 0 1 1.8-2z" />
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 6.5 9 6.2 9-6.2" />
    </>
  ),
  wa: (
    <>
      <path d="M3.5 20.5 5 16.3a7.8 7.8 0 1 1 3 2.9z" />
      <path d="M9 9.2c.3 2.4 3.2 5.3 5.6 5.6l1-1.4 1.8.9-.2 1.3c-2.6.8-6.9-2.5-8.3-5.5l1.3-.5z" fill="currentColor" stroke="none" />
    </>
  ),
  check: <path d="m4.5 12.5 4.5 4.5 10.5-11" />,
  chev: <path d="m9 5 7 7-7 7" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  bell: (
    <>
      <path d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9z" />
      <path d="M10 18.5a2 2 0 0 0 4 0" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" />
    </>
  ),
  box: (
    <>
      <path d="M12 3 3.5 7.2v9.6L12 21l8.5-4.2V7.2z" />
      <path d="M3.5 7.2 12 11.5l8.5-4.3M12 11.5V21" />
    </>
  ),
  cal: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M5.6 5.6l1.6 1.6M16.8 16.8l1.6 1.6M5.6 18.4l1.6-1.6M16.8 7.2l1.6-1.6" />
    </>
  ),
  doc: (
    <>
      <path d="M7 3.5h7l4.5 4.5V20a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5z" />
      <path d="M14 3.5V8h4.5M8.5 12h7M8.5 15.5h7" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </>
  ),
  trash: (
    <>
      <path d="M4.5 7.5h15M9.5 7.5V5.5h5v2M8 7.5l.7 12h6.6l.7-12" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19.5c1.8-3.2 4.2-4.8 7-4.8s5.2 1.6 7 4.8" />
    </>
  ),
  pc: (
    <>
      <rect x="3.5" y="4.5" width="17" height="12" rx="1.5" />
      <path d="M8 20.5h8M12 16.5v4" />
    </>
  ),
  badge: (
    <>
      <rect x="4" y="7" width="16" height="11" rx="2" />
      <circle cx="12" cy="12.5" r="2.2" />
      <path d="M9 7V5.5h6V7" />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  ...props
}: { name: keyof typeof paths | string; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.shield}
    </svg>
  );
}

export function ProductArt({ cat, size = 96 }: { cat: string; size?: number }) {
  const map: Record<string, keyof typeof paths> = {
    cam: "cam",
    nvr: "box",
    net: "router",
    acc: "badge",
    it: "pc",
    cbl: "box",
  };
  return (
    <div style={{ color: "var(--navy)" }}>
      <Icon name={map[cat] || "box"} size={size * 0.45} />
    </div>
  );
}
