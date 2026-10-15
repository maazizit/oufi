import type { ProductCategory } from "@/lib/types";

/** Images catalogue (public/) — fallback si Supabase sans image_path. */
const IMAGE_BY_ID: Record<string, string> = {
  p1: "/products/p1.webp",
  p2: "/products/p2.webp",
  p3: "/products/p3.webp",
  p4: "/products/p1.webp",
  p5: "/products/p14.webp",
  p6: "/products/p14.webp",
  p7: "/products/p14.webp",
  p8: "/products/p9.webp",
  p9: "/products/p9.webp",
  p10: "/products/p11.webp",
  p11: "/products/p11.webp",
  p12: "/products/p14.webp",
  p13: "/products/p2.webp",
  p14: "/products/p14.webp",
  p15: "/products/p14.webp",
  p16: "/products/p11.webp",
  p17: "/products/p9.webp",
};

const IMAGE_BY_CAT: Record<ProductCategory, string> = {
  cam: "/products/p2.webp",
  nvr: "/products/p14.webp",
  net: "/products/p11.webp",
  acc: "/products/p2.webp",
  it: "/products/p14.webp",
  cbl: "/products/p9.webp",
};

export function resolveProductImage(
  id: string,
  cat: string,
  imagePath?: string | null,
): string {
  const custom = imagePath?.trim();
  if (custom) return custom;
  if (IMAGE_BY_ID[id]) return IMAGE_BY_ID[id];
  if (cat in IMAGE_BY_CAT) return IMAGE_BY_CAT[cat as ProductCategory];
  return "/brand/hero-install.jpg";
}
