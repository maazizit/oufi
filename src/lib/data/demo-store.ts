import type {
  CartItem,
  Intervention,
  Notif,
  Product,
  Request,
  RequestStatus,
  Settings,
  TeamMember,
} from "../types";
import { SEED_PRODUCTS, SEED_SETTINGS } from "./constants";

/** In-memory demo store when Supabase env vars are missing (local / preview without DB). */
type DemoDb = {
  products: Product[];
  requests: Request[];
  interv: Intervention[];
  notifs: Notif[];
  settings: Settings;
  seq: number;
};

const g = globalThis as unknown as { __oufiDemo?: DemoDb };

function db(): DemoDb {
  if (!g.__oufiDemo) {
    g.__oufiDemo = {
      products: structuredClone(SEED_PRODUCTS),
      requests: [
        {
          ref: "DEV-2026-0142",
          src: "form",
          type: "install",
          svc: "cam",
          status: "visit",
          created: "2026-09-26T09:12:00",
          name: "Karim Belhaj",
          company: "Épicerie Al Baraka",
          city: "Casablanca",
          addr: "Bd Moulay Youssef, imm. 44, rdc — face à la pharmacie",
          local: "shop",
          surface: "90",
          rooms: "3",
          cams: "6",
          place: "both",
          net: "yes",
          exist: "no",
          delay: "week",
          budget: "10 000 – 15 000 DH",
          chan: "wa",
          phone: "06 61 24 90 12",
          email: "",
          slot: "pm",
          fee: 200,
          desc: "Magasin sur deux niveaux. Je veux couvrir la caisse, l'entrée et la réserve à l'étage.",
          svcother: "",
          tech: "t2",
          items: [],
          notes: [
            {
              at: "2026-09-26T11:40:00",
              txt: "Appelé, très intéressé. Visite calée jeudi 14 h, il sera sur place.",
            },
          ],
          tl: [
            { at: "2026-09-26T09:12:00", k: "created" },
            { at: "2026-09-26T11:40:00", k: "status", v: "contacted" },
            { at: "2026-09-26T11:45:00", k: "status", v: "visit" },
          ],
        },
      ],
      interv: [
        {
          id: "TCK-0451",
          ref: "DEV-2026-0142",
          client: "Karim Belhaj — Épicerie Al Baraka",
          city: "Casablanca",
          obj: { fr: "État des lieux — 6 caméras", ar: "معاينة — 6 كاميرات" },
          when: new Date().toISOString().slice(0, 10) + "T14:00:00",
          tech: "t2",
          by: "t1",
          state: "sched",
        },
      ],
      notifs: [],
      settings: structuredClone(SEED_SETTINGS),
      seq: 143,
    };
  }
  return g.__oufiDemo;
}

export function demoGetSettings(): Settings {
  return structuredClone(db().settings);
}

export function demoGetProducts(activeOnly = true): Product[] {
  const list = db().products;
  return structuredClone(activeOnly ? list.filter((p) => p.active) : list);
}

export function demoGetTeam(activeOnly = true): TeamMember[] {
  const list = db().settings.team;
  return structuredClone(activeOnly ? list.filter((m) => m.active) : list);
}

export function demoGetRequests(): Request[] {
  return structuredClone(
    db().requests.slice().sort((a, b) => b.created.localeCompare(a.created)),
  );
}

export function demoGetRequest(ref: string): Request | null {
  return structuredClone(db().requests.find((r) => r.ref === ref) || null);
}

export function demoTrack(q: string): Request | null {
  const n = q.toLowerCase().replace(/[\s().-]/g, "");
  const r = db().requests.find(
    (x) =>
      x.ref.toLowerCase() === q.toLowerCase() ||
      (x.phone && x.phone.replace(/[\s().-]/g, "") === n),
  );
  return r ? structuredClone(r) : null;
}

export function demoCreateRequest(
  input: Omit<Request, "ref" | "status" | "created" | "notes" | "tl" | "tech"> & {
    items?: CartItem[];
  },
): Request {
  const d = db();
  const now = new Date().toISOString();
  const ref = `DEV-${new Date().getFullYear()}-${String(d.seq++).padStart(4, "0")}`;
  const r: Request = {
    ...input,
    ref,
    status: "new",
    created: now,
    tech: "",
    items: input.items || [],
    notes: [],
    tl: [{ at: now, k: "created" }],
  };
  d.requests.unshift(r);
  d.notifs.unshift({
    id: "n" + Date.now(),
    at: now,
    ref,
    read: false,
    txt: {
      fr: `Nouvelle demande de ${r.name}`,
      ar: `طلب جديد من ${r.name}`,
    },
  });
  return structuredClone(r);
}

export function demoUpdateRequestStatus(ref: string, status: RequestStatus) {
  const r = db().requests.find((x) => x.ref === ref);
  if (!r) return null;
  r.status = status;
  r.tl.push({ at: new Date().toISOString(), k: "status", v: status });
  return structuredClone(r);
}

export function demoAssignTech(ref: string, tech: string) {
  const r = db().requests.find((x) => x.ref === ref);
  if (!r) return null;
  r.tech = tech;
  return structuredClone(r);
}

export function demoAddNote(ref: string, txt: string) {
  const r = db().requests.find((x) => x.ref === ref);
  if (!r) return null;
  r.notes.push({ at: new Date().toISOString(), txt });
  return structuredClone(r);
}

export function demoGetInterventions(): Intervention[] {
  return structuredClone(
    db().interv.slice().sort((a, b) => b.when.localeCompare(a.when)),
  );
}

export function demoPlanIntervention(ref: string) {
  const r = db().requests.find((x) => x.ref === ref);
  if (!r) return null;
  const when = new Date();
  when.setHours(when.getHours() + 1, 0, 0, 0);
  const iv: Intervention = {
    id: "TCK-" + String(450 + db().interv.length + 1),
    ref: r.ref,
    client: r.name + (r.company ? " — " + r.company : ""),
    city: r.city,
    obj: {
      fr: `${r.type} — ${r.city}`,
      ar: `${r.type} — ${r.city}`,
    },
    when: when.toISOString(),
    tech: r.tech || "t2",
    by: db().settings.team[0]?.id || "t1",
    state: "sched",
  };
  db().interv.unshift(iv);
  if (r.status === "new" || r.status === "contacted") {
    demoUpdateRequestStatus(ref, "visit");
  }
  return structuredClone(iv);
}

export function demoSetIntervDone(id: string) {
  const i = db().interv.find((x) => x.id === id);
  if (!i) return null;
  i.state = "done";
  return structuredClone(i);
}

export function demoSaveSettings(patch: Partial<Settings>) {
  Object.assign(db().settings, patch);
  return structuredClone(db().settings);
}

export function demoSaveProduct(p: Product) {
  const d = db();
  const i = d.products.findIndex((x) => x.id === p.id);
  if (i >= 0) d.products[i] = p;
  else d.products.unshift(p);
  return structuredClone(p);
}

export function demoDeleteProduct(id: string) {
  db().products = db().products.filter((p) => p.id !== id);
}

export function demoGetNotifs(): Notif[] {
  return structuredClone(db().notifs);
}

export function demoMarkNotifsRead() {
  db().notifs.forEach((n) => {
    n.read = true;
  });
}

export function demoUpsertMember(m: TeamMember) {
  const team = db().settings.team;
  const i = team.findIndex((x) => x.id === m.id);
  if (i >= 0) team[i] = m;
  else team.push(m);
  return structuredClone(m);
}

export function demoRemoveMember(id: string) {
  const team = db().settings.team;
  const m = team.find((x) => x.id === id);
  if (m?.role === "manager" && team.filter((x) => x.role === "manager").length < 2) {
    throw new Error("keep_manager");
  }
  db().settings.team = team.filter((x) => x.id !== id);
}
