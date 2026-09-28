import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import * as demo from "@/lib/data/demo-store";
import type { Product } from "@/lib/types";

export async function POST(req: Request) {
  const body = await req.json();
  const product: Product = {
    id: body.id,
    ref: body.ref,
    cat: body.cat,
    brand: body.brand || "—",
    name: { fr: body.name_fr, ar: body.name_ar || body.name_fr },
    price: Number(body.price),
    stock: Number(body.stock) || 0,
    warr: Number(body.warr) || 0,
    specs: body.specs || [],
    pop: 50,
    active: Boolean(body.active),
  };

  if (!isSupabaseConfigured()) {
    demo.demoSaveProduct(product);
    return NextResponse.json({ ok: true });
  }

  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "no_db" }, { status: 500 });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const row = {
    id: product.id,
    ref: product.ref,
    cat: product.cat,
    brand: product.brand,
    name_fr: product.name.fr,
    name_ar: product.name.ar,
    price: product.price,
    stock: product.stock,
    warr: product.warr,
    specs: product.specs,
    pop: product.pop,
    active: product.active,
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase.from("products").upsert(row);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  if (!isSupabaseConfigured()) {
    const all = demo.demoGetProducts(false);
    const p = all.find((x) => x.id === body.id);
    if (!p) return NextResponse.json({ error: "not_found" }, { status: 404 });
    demo.demoSaveProduct({
      ...p,
      stock: body.stock != null ? Number(body.stock) : p.stock,
      active: body.active != null ? Boolean(body.active) : p.active,
    });
    return NextResponse.json({ ok: true });
  }

  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "no_db" }, { status: 500 });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.stock != null) patch.stock = Number(body.stock);
  if (body.active != null) patch.active = Boolean(body.active);
  const { error } = await supabase.from("products").update(patch).eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  if (!isSupabaseConfigured()) {
    demo.demoDeleteProduct(body.id);
    return NextResponse.json({ ok: true });
  }
  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "no_db" }, { status: 500 });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await supabase.from("products").delete().eq("id", body.id);
  return NextResponse.json({ ok: true });
}
