import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import * as demo from "@/lib/data/demo-store";
import type { Settings } from "@/lib/types";

export async function PUT(req: Request) {
  const body = (await req.json()) as Settings;

  if (!isSupabaseConfigured()) {
    demo.demoSaveSettings(body);
    return NextResponse.json({ ok: true });
  }

  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "no_db" }, { status: 500 });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  await supabase
    .from("settings")
    .upsert({
      id: 1,
      company: body.company,
      tagline_fr: body.tagline.fr,
      tagline_ar: body.tagline.ar,
      phone: body.phone,
      whatsapp: body.whatsapp,
      email: body.email,
      address_fr: body.address.fr,
      address_ar: body.address.ar,
      hours_fr: body.hours.fr,
      hours_ar: body.hours.ar,
      sla: body.sla,
      channels: body.channels,
      fees: body.fees,
      manager: body.manager,
      updated_at: new Date().toISOString(),
    });

  // Sync team
  const { data: existing } = await supabase.from("team_members").select("id");
  const keep = new Set(body.team.map((m) => m.id));
  for (const row of existing || []) {
    if (!keep.has(row.id)) await supabase.from("team_members").delete().eq("id", row.id);
  }
  for (const m of body.team) {
    await supabase.from("team_members").upsert({
      id: m.id,
      name: m.name,
      role: m.role,
      phone: m.phone,
      active: m.active,
    });
  }

  return NextResponse.json({ ok: true });
}
