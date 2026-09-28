export type Lang = "fr" | "ar";

export type Localized = { fr: string; ar: string };

export type ProductCategory =
  | "cam"
  | "nvr"
  | "net"
  | "acc"
  | "it"
  | "cbl";

export type RequestStatus =
  | "new"
  | "contacted"
  | "visit"
  | "sent"
  | "won"
  | "done"
  | "lost";

export type RequestType = "install" | "prod" | "maint" | "fix";
export type RequestSource = "form" | "cart" | "contact";
export type ContactChannel = "phone" | "wa" | "mail";
export type TeamRole = "manager" | "tech" | "sales";
export type IntervState = "sched" | "prog" | "done";

export type Product = {
  id: string;
  ref: string;
  cat: ProductCategory;
  brand: string;
  name: Localized;
  price: number;
  stock: number;
  warr: number;
  specs: [string, string][];
  pop: number;
  active: boolean;
};

export type CartItem = { id: string; q: number; inst: boolean };

export type TeamMember = {
  id: string;
  name: string;
  role: TeamRole;
  phone: string;
  active: boolean;
};

export type Settings = {
  company: string;
  tagline: Localized;
  phone: string;
  whatsapp: string;
  email: string;
  address: Localized;
  hours: Localized;
  sla: number;
  channels: Record<ContactChannel, boolean>;
  fees: [string, number][];
  manager: string;
  team: TeamMember[];
};

export type RequestNote = { at: string; txt: string };
export type RequestTimeline = {
  at: string;
  k: "created" | "status";
  v?: RequestStatus;
};

export type Request = {
  ref: string;
  src: RequestSource;
  type: RequestType;
  svc: string;
  status: RequestStatus;
  created: string;
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
  chan: ContactChannel;
  phone: string;
  email: string;
  slot: string;
  fee: number | null;
  desc: string;
  svcother: string;
  tech: string;
  items: CartItem[];
  notes: RequestNote[];
  tl: RequestTimeline[];
};

export type Intervention = {
  id: string;
  ref: string;
  client: string;
  city: string;
  obj: Localized;
  when: string;
  tech: string;
  by: string;
  state: IntervState;
};

export type Notif = {
  id: string;
  at: string;
  ref: string;
  txt: Localized;
  read: boolean;
};
