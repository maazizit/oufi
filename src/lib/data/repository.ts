import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type {
  CartItem,
  ContactChannel,
  Intervention,
  Notif,
  Product,
  Request,
  RequestSource,
  RequestStatus,
  RequestType,
  Settings,
  TeamMember,
} from "@/lib/types";
import * as demo from "./demo-store";

type DbProduct = {
  id: string;
  ref: string;
  cat: string;
  brand: string;
  name_fr: string;
  name_ar: string;
  price: number;
  stock: number;
  warr: number;
  specs: [string, string][] | unknown;
  pop: number;
  active: boolean;
};

type DbRequest = {
  ref: string;
  src: string;
  type: string;
  svc: string;
  status: string;
  created_at: string;
  name: string;
  company: string;
  city: string;
  addr: string;
  local: string;
  surface: string;
  rooms: string;
  cams: string;
  place: string;
  net: string;
  exist: string;
  delay: string;
  budget: string;
  chan: string;
  phone: string;
  email: string;
  slot: string;
  fee: number | null;
  description: string;
  svcother: string;
  tech_id: string | null;
  items: CartItem[];
  notes: { at: string; txt: string }[];
  timeline: { at: string; k: "created" | "status"; v?: RequestStatus }[];
};

function mapProduct(p: DbProduct): Product {
  return {
    id: p.id,
    ref: p.ref,
    cat: p.cat as Product["cat"],
    brand: p.brand,
    name: { fr: p.name_fr, ar: p.name_ar },
    price: Number(p.price),
    stock: p.stock,
    warr: p.warr,
    specs: (p.specs as [string, string][]) || [],
    pop: p.pop,
    active: p.active,
  };
}

function mapRequest(r: DbRequest): Request {
  return {
    ref: r.ref,
    src: r.src as RequestSource,
    type: r.type as RequestType,
    svc: r.svc || "",
    status: r.status as RequestStatus,
    created: r.created_at,
    name: r.name,
    company: r.company || "",
    city: r.city || "",
    addr: r.addr || "",
    local: r.local || "",
    surface: r.surface || "",
    rooms: r.rooms || "",
    cams: r.cams || "",
    place: r.place || "",
    net: r.net || "",
    exist: r.exist || "",
    delay: r.delay || "",
    budget: r.budget || "",
    chan: r.chan as ContactChannel,
    phone: r.phone || "",
    email: r.email || "",
    slot: r.slot || "any",
    fee: r.fee == null ? null : Number(r.fee),
    desc: r.description || "",
    svcother: r.svcother || "",
    tech: r.tech_id || "",
    items: r.items || [],
    notes: r.notes || [],
    tl: r.timeline || [],
  };
}

export async function getSettings(): Promise<Settings> {
  if (!isSupabaseConfigured()) return demo.demoGetSettings();
  const supabase = await createClient();
  if (!supabase) return demo.demoGetSettings();

  const { data: s } = await supabase.from("settings").select("*").eq("id", 1).single();
  const { data: team } = await supabase.from("team_members").select("*").order("name");

  if (!s) return demo.demoGetSettings();

  return {
    company: s.company,
    tagline: { fr: s.tagline_fr, ar: s.tagline_ar },
    phone: s.phone,
    whatsapp: s.whatsapp,
    email: s.email,
    address: { fr: s.address_fr, ar: s.address_ar },
    hours: { fr: s.hours_fr, ar: s.hours_ar },
    sla: s.sla,
    channels: s.channels,
    fees: s.fees as [string, number][],
    manager: s.manager,
    team: (team || []).map((m) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      phone: m.phone,
      active: m.active,
    })),
  };
}

export async function getProducts(activeOnly = true): Promise<Product[]> {
  if (!isSupabaseConfigured()) return demo.demoGetProducts(activeOnly);
  const supabase = await createClient();
  if (!supabase) return demo.demoGetProducts(activeOnly);

  let q = supabase.from("products").select("*").order("pop", { ascending: false });
  if (activeOnly) q = q.eq("active", true);
  const { data } = await q;
  return (data || []).map(mapProduct);
}

export async function getTeam(activeOnly = true): Promise<TeamMember[]> {
  const settings = await getSettings();
  return activeOnly ? settings.team.filter((m) => m.active) : settings.team;
}

export async function getRequests(): Promise<Request[]> {
  if (!isSupabaseConfigured()) return demo.demoGetRequests();
  const supabase = await createClient();
  if (!supabase) return demo.demoGetRequests();
  const { data } = await supabase
    .from("requests")
    .select("*")
    .order("created_at", { ascending: false });
  return (data || []).map(mapRequest);
}

export async function getRequest(ref: string): Promise<Request | null> {
  if (!isSupabaseConfigured()) return demo.demoGetRequest(ref);
  const supabase = await createClient();
  if (!supabase) return demo.demoGetRequest(ref);
  const { data } = await supabase.from("requests").select("*").eq("ref", ref).maybeSingle();
  return data ? mapRequest(data) : null;
}

export async function trackRequest(q: string): Promise<Request | null> {
  if (!isSupabaseConfigured()) return demo.demoTrack(q);
  const supabase = await createClient();
  if (!supabase) return demo.demoTrack(q);
  const { data } = await supabase.rpc("track_request", { q });
  const row = Array.isArray(data) ? data[0] : data;
  return row ? mapRequest(row) : null;
}

export type CreateRequestInput = {
  src: RequestSource;
  type: RequestType;
  svc?: string;
  svcother?: string;
  name: string;
  company?: string;
  city: string;
  addr?: string;
  local?: string;
  surface?: string;
  rooms?: string;
  cams?: string;
  place?: string;
  net?: string;
  exist?: string;
  delay?: string;
  budget?: string;
  chan: ContactChannel;
  phone?: string;
  email?: string;
  slot?: string;
  fee?: number | null;
  desc?: string;
  items?: CartItem[];
};

export async function createRequest(input: CreateRequestInput): Promise<Request> {
  if (!isSupabaseConfigured()) {
    return demo.demoCreateRequest({
      src: input.src,
      type: input.type,
      svc: input.svc || "",
      svcother: input.svcother || "",
      name: input.name,
      company: input.company || "",
      city: input.city,
      addr: input.addr || "",
      local: input.local || "",
      surface: input.surface || "",
      rooms: input.rooms || "",
      cams: input.cams || "",
      place: input.place || "",
      net: input.net || "",
      exist: input.exist || "",
      delay: input.delay || "",
      budget: input.budget || "",
      chan: input.chan,
      phone: input.phone || "",
      email: input.email || "",
      slot: input.slot || "any",
      fee: input.fee ?? null,
      desc: input.desc || "",
      items: input.items || [],
    });
  }

  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase unavailable");

  const { data: refData } = await supabase.rpc("next_request_ref");
  const ref = (refData as string) || `AMP-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;
  const now = new Date().toISOString();

  const row = {
    ref,
    src: input.src,
    type: input.type,
    svc: input.svc || "",
    status: "new",
    created_at: now,
    name: input.name,
    company: input.company || "",
    city: input.city,
    addr: input.addr || "",
    local: input.local || "",
    surface: input.surface || "",
    rooms: input.rooms || "",
    cams: input.cams || "",
    place: input.place || "",
    net: input.net || "",
    exist: input.exist || "",
    delay: input.delay || "",
    budget: input.budget || "",
    chan: input.chan,
    phone: input.phone || "",
    email: input.email || "",
    slot: input.slot || "any",
    fee: input.fee ?? null,
    description: input.desc || "",
    svcother: input.svcother || "",
    items: input.items || [],
    notes: [],
    timeline: [{ at: now, k: "created" }],
  };

  const { data, error } = await supabase.from("requests").insert(row).select("*").single();
  if (error) throw error;

  await supabase.from("notifications").insert({
    request_ref: ref,
    txt_fr: `Nouvelle demande de ${input.name}`,
    txt_ar: `طلب جديد من ${input.name}`,
  });

  return mapRequest(data);
}

export async function getInterventions(): Promise<Intervention[]> {
  if (!isSupabaseConfigured()) return demo.demoGetInterventions();
  const supabase = await createClient();
  if (!supabase) return demo.demoGetInterventions();
  const { data } = await supabase
    .from("interventions")
    .select("*")
    .order("when_at", { ascending: false });
  return (data || []).map((i) => ({
    id: i.id,
    ref: i.request_ref || "",
    client: i.client,
    city: i.city,
    obj: { fr: i.obj_fr, ar: i.obj_ar },
    when: i.when_at,
    tech: i.tech_id || "",
    by: i.by_id || "",
    state: i.state,
  }));
}

export async function getNotifs(): Promise<Notif[]> {
  if (!isSupabaseConfigured()) return demo.demoGetNotifs();
  const supabase = await createClient();
  if (!supabase) return demo.demoGetNotifs();
  const { data } = await supabase
    .from("notifications")
    .select("*")
    .order("at", { ascending: false })
    .limit(40);
  return (data || []).map((n) => ({
    id: String(n.id),
    at: n.at,
    ref: n.request_ref || "",
    read: Boolean(n.read),
    txt: { fr: n.txt_fr || "", ar: n.txt_ar || "" },
  }));
}

export async function markNotifsRead(ids?: string[]): Promise<void> {
  if (!isSupabaseConfigured()) {
    if (ids?.length) {
      const all = demo.demoGetNotifs();
      // mark selected in demo store via full mark if matching ids
      demo.demoMarkNotifsRead();
      void all;
    } else {
      demo.demoMarkNotifsRead();
    }
    return;
  }
  const supabase = await createClient();
  if (!supabase) {
    demo.demoMarkNotifsRead();
    return;
  }
  let q = supabase.from("notifications").update({ read: true });
  if (ids?.length) q = q.in("id", ids);
  else q = q.eq("read", false);
  await q;
}

export { isSupabaseConfigured };
