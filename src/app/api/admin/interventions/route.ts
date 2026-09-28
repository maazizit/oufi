import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import * as demo from "@/lib/data/demo-store";
import { syncDemoFromCookies, overlaySetCookieHeader } from "@/lib/data/demo-sync";

export async function POST(req: Request) {
  const body = await req.json();
  const ref = String(body.ref || "");
  if (!ref) return NextResponse.json({ error: "missing_ref" }, { status: 400 });

  if (!isSupabaseConfigured()) {
    await syncDemoFromCookies();
    const iv = demo.demoPlanIntervention(ref);
    const res = NextResponse.json({ ok: true, intervention: iv });
    const c = overlaySetCookieHeader(demo.demoExportOverlay());
    res.cookies.set(c.name, c.value, c.options);
    return res;
  }

  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "no_db" }, { status: 500 });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { data: r } = await supabase.from("requests").select("*").eq("ref", ref).single();
  if (!r) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const when = new Date();
  when.setHours(when.getHours() + 1, 0, 0, 0);
  const id = `TCK-${Date.now().toString().slice(-4)}`;
  await supabase.from("interventions").insert({
    id,
    request_ref: ref,
    client: r.name + (r.company ? ` — ${r.company}` : ""),
    city: r.city,
    obj_fr: `${r.type} — ${r.city}`,
    obj_ar: `${r.type} — ${r.city}`,
    when_at: when.toISOString(),
    tech_id: r.tech_id || "t2",
    by_id: "t1",
    state: "sched",
  });

  if (r.status === "new" || r.status === "contacted") {
    const tl = Array.isArray(r.timeline) ? [...r.timeline] : [];
    tl.push({ at: new Date().toISOString(), k: "status", v: "visit" });
    await supabase.from("requests").update({ status: "visit", timeline: tl }).eq("ref", ref);
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const id = String(body.id || "");
  if (!id) return NextResponse.json({ error: "missing_id" }, { status: 400 });

  if (!isSupabaseConfigured()) {
    demo.demoSetIntervDone(id);
    return NextResponse.json({ ok: true });
  }

  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "no_db" }, { status: 500 });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  await supabase.from("interventions").update({ state: "done" }).eq("id", id);
  return NextResponse.json({ ok: true });
}
