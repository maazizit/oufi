import { cookies } from "next/headers";
import type { Lang } from "@/lib/types";
import { ADMIN_LANG_COOKIE } from "./lang-cookie";

export async function getAdminLang(): Promise<Lang> {
  const jar = await cookies();
  const v = jar.get(ADMIN_LANG_COOKIE)?.value;
  if (v === "ar" || v === "fr") return v;
  const site = jar.get("oufi-lang")?.value;
  if (site === "ar" || site === "fr") return site;
  return "fr";
}
