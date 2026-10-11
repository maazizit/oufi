import type { Product, ProductCategory } from "@/lib/types";

/**
 * Familles d’installation : produits souvent posés ensemble.
 * Ex. caméra → NVR, HDD, switch PoE.
 */
const COMPANION_IDS: Partial<Record<ProductCategory, string[]>> = {
  cam: ["p5", "p7", "p11"],
  nvr: ["p1", "p2", "p11"],
  net: ["p1", "p5", "p16"],
  acc: ["p11", "p16", "p1"],
  it: ["p8", "p9", "p17"],
  cbl: ["p1", "p5", "p11"],
};

const FALLBACK_CATS: Partial<Record<ProductCategory, ProductCategory[]>> = {
  cam: ["nvr", "net", "cbl"],
  nvr: ["cam", "net", "cbl"],
  net: ["cam", "nvr", "cbl"],
  acc: ["net", "cbl", "cam"],
  it: ["net", "cbl", "acc"],
  cbl: ["cam", "nvr", "net"],
};

export function relatedProducts(
  product: Product,
  catalog: Product[],
  limit = 3,
): Product[] {
  const byId = new Map(catalog.map((p) => [p.id, p]));
  const picked: Product[] = [];
  const seen = new Set<string>([product.id]);

  for (const id of COMPANION_IDS[product.cat] || []) {
    const p = byId.get(id);
    if (p && p.active !== false && !seen.has(p.id)) {
      picked.push(p);
      seen.add(p.id);
    }
    if (picked.length >= limit) return picked;
  }

  for (const cat of FALLBACK_CATS[product.cat] || []) {
    for (const p of catalog) {
      if (p.cat !== cat || seen.has(p.id) || p.active === false) continue;
      picked.push(p);
      seen.add(p.id);
      if (picked.length >= limit) return picked;
    }
  }

  return picked;
}
