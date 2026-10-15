"use client";

import Image from "next/image";

const FEEDS = [
  { id: "cam-01", label: "CAM-01 · HALL", live: true, img: "/brand/hero-install.jpg" },
  { id: "cam-02", label: "CAM-02 · EXT", live: true, img: "/products/p2.webp" },
  { id: "cam-03", label: "CAM-03 · STOCK", live: true, img: "/products/p3.webp" },
  { id: "cam-04", label: "CAM-04 · ACCÈS", live: false, img: "/products/p1.webp" },
  { id: "cam-05", label: "CAM-05 · PARKING", live: true, img: "/products/p11.webp" },
  { id: "cam-06", label: "CAM-06 · BUREAU", live: true, img: "/products/p9.webp" },
] as const;

export function CameraWall() {
  return (
    <div className="cam-wall" aria-hidden="true">
      {FEEDS.map((f, i) => (
        <div key={f.id} className={`cam-feed${i === 0 ? " cam-feed-main" : ""}`}>
          <Image
            src={f.img}
            alt=""
            fill
            priority={i === 0}
            sizes={i === 0 ? "(max-width: 900px) 100vw, 55vw" : "20vw"}
            className="cam-feed-img"
          />
          <div className="cam-feed-veil" />
          <div className="cam-feed-meta">
            <span className={`cam-rec${f.live ? " is-live" : ""}`}>
              {f.live ? "REC" : "OFF"}
            </span>
            <span className="cam-label">{f.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
