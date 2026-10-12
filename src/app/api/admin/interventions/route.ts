import { NextResponse } from "next/server";
import { adminApiGuard } from "@/lib/admin/api";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import * as demo from "@/lib/data/demo-store";
import { syncDemoFromCookies, overlaySetCookieHeader } from "@/lib/data/demo-sync";
import type { IntervState } from "@/lib/types";

const STATES: IntervState[] = ["sched", "prog", "done"];

export async function POST(req: Request) {
  const guard = await adminApiGuard("interventions");
  if (!guard.ok) return guard.response;
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
  const guard = await adminApiGuard("interventions");
  if (!guard.ok) return guard.response;
  const body = await req.json();
  const id = String(body.id || "");
  if (!id) return NextResponse.json({ error: "missing_id" }, { status: 400 });

  const state = body.state != null ? String(body.state) : null;
  if (state && !STATES.includes(state as IntervState)) {
    return NextResponse.json({ error: "invalid_state" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    if (body.action === "done" && !body.client && !body.when) {
      demo.demoSetIntervDone(id);
      return NextResponse.json({ ok: true });
    }
    const updated = demo.demoUpdateIntervention(id, {
      client: body.client != null ? String(body.client) : undefined,
      city: body.city != null ? String(body.city) : undefined,
      when: body.when != null ? String(body.when) : undefined,
      tech: body.tech != null ? String(body.tech) : undefined,
      by: body.by != null ? String(body.by) : undefined,
      state: state as IntervState | undefined,
      obj:
        body.obj_fr != null || body.obj_ar != null
          ? { fr: String(body.obj_fr || ""), ar: String(body.obj_ar || "") }
          : undefined,
    });
    if (!updated) return NextResponse.json({ error: "not_found" }, { status: 404 });
    return NextResponse.json({ ok: true, intervention: updated });
  }

  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "no_db" }, { status: 500 });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const patch: Record<string, unknown> = {};
  if (state) patch.state = state;
  if (body.when) patch.when_at = body.when;
  if (body.client != null) patch.client = String(body.client);
  if (body.city != null) patch.city = String(body.city);
  if (body.obj_fr != null) patch.obj_fr = String(body.obj_fr);
  if (body.obj_ar != null) patch.obj_ar = String(body.obj_ar);
  if (body.tech != null) patch.tech_id = String(body.tech);
  if (body.by != null) patch.by_id = String(body.by);

  if (Object.keys(patch).length === 0) {
    patch.state = "done";
  }

  const { error } = await supabase.from("interventions").update(patch).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const guard = await adminApiGuard("interventions");
  if (!guard.ok) return guard.response;
  const body = await req.json();
  const id = String(body.id || "");
  if (!id) return NextResponse.json({ error: "missing_id" }, { status: 400 });

  if (!isSupabaseConfigured()) {
    const ok = demo.demoDeleteIntervention(id);
    if (!ok) return NextResponse.json({ error: "not_found" }, { status: 404 });
    return NextResponse.json({ ok: true });
  }

  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "no_db" }, { status: 500 });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { error } = await supabase.from("interventions").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
