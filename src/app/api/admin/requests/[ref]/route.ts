import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import * as demo from "@/lib/data/demo-store";
import { syncDemoFromCookies, overlaySetCookieHeader } from "@/lib/data/demo-sync";

async function assertAdmin() {
  if (!isSupabaseConfigured()) {
    return true;
  }
  const supabase = await createClient();
  if (!supabase) return false;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return Boolean(user);
}

function withOverlay(res: NextResponse) {
  if (!isSupabaseConfigured()) {
    const c = overlaySetCookieHeader(demo.demoExportOverlay());
    res.cookies.set(c.name, c.value, c.options);
  }
  return res;
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ ref: string }> },
) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { ref } = await ctx.params;
  const body = await req.json();

  if (!isSupabaseConfigured()) {
    await syncDemoFromCookies();
    if (body.status) demo.demoUpdateRequestStatus(ref, body.status);
    if (body.tech != null) demo.demoAssignTech(ref, body.tech);
    if (body.note) demo.demoAddNote(ref, body.note);
    return withOverlay(
      NextResponse.json({ ok: true, request: demo.demoGetRequest(ref) }),
    );
  }

  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "no_db" }, { status: 500 });

  const { data: current } = await supabase.from("requests").select("*").eq("ref", ref).single();
  if (!current) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const patch: Record<string, unknown> = {};
  if (body.status && body.status !== current.status) {
    patch.status = body.status;
    const tl = Array.isArray(current.timeline) ? [...current.timeline] : [];
    tl.push({ at: new Date().toISOString(), k: "status", v: body.status });
    patch.timeline = tl;
  }
  if (body.tech != null) patch.tech_id = body.tech || null;
  if (body.note) {
    const notes = Array.isArray(current.notes) ? [...current.notes] : [];
    notes.push({ at: new Date().toISOString(), txt: body.note });
    patch.notes = notes;
  }

  const { error } = await supabase.from("requests").update(patch).eq("ref", ref);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
