-- OUFI Sécurité — schéma initial (Supabase / Postgres)
-- À exécuter dans le SQL Editor du projet Supabase (ou via supabase db push).

create extension if not exists "pgcrypto";

-- ---------- settings (singleton) ----------
create table if not exists public.settings (
  id int primary key default 1 check (id = 1),
  company text not null default 'Oufi Sécurité',
  tagline_fr text not null default 'Vidéosurveillance & réseaux',
  tagline_ar text not null default 'المراقبة والشبكات',
  phone text not null default '+212 6 61 24 18 05',
  whatsapp text not null default '+212 6 61 24 18 05',
  email text not null default 'contact@oufi-securite.ma',
  address_fr text not null default '14, rue Ibn Battouta — Quartier Belvédère, Casablanca',
  address_ar text not null default '14، زنقة ابن بطوطة — حي بلفيدير، الدار البيضاء',
  hours_fr text not null default 'Lundi – vendredi : 9 h – 18 h 30 · Samedi : 9 h – 13 h',
  hours_ar text not null default 'الاثنين – الجمعة: 9:00 – 18:30 · السبت: 9:00 – 13:00',
  sla int not null default 24,
  channels jsonb not null default '{"phone":true,"wa":true,"mail":true}'::jsonb,
  fees jsonb not null default '[["Casablanca",200],["Mohammedia",250],["Bouskoura",250],["Rabat",350],["Marrakech",500],["Tanger",600],["Agadir",700]]'::jsonb,
  manager text not null default 'Ibrahim Oufi',
  updated_at timestamptz not null default now()
);

insert into public.settings (id) values (1) on conflict (id) do nothing;

-- ---------- team ----------
create table if not exists public.team_members (
  id text primary key,
  name text not null,
  role text not null check (role in ('manager','tech','sales')),
  phone text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- products ----------
create table if not exists public.products (
  id text primary key,
  ref text not null unique,
  cat text not null,
  brand text not null,
  name_fr text not null,
  name_ar text not null,
  price numeric not null check (price >= 0),
  stock int not null default 0,
  warr int not null default 12,
  specs jsonb not null default '[]'::jsonb,
  pop int not null default 50,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_active_idx on public.products (active);
create index if not exists products_cat_idx on public.products (cat);

-- ---------- request sequence ----------
create sequence if not exists public.request_seq start 143;

-- ---------- requests ----------
create table if not exists public.requests (
  ref text primary key,
  src text not null check (src in ('form','cart','contact')),
  type text not null check (type in ('install','prod','maint','fix')),
  svc text not null default '',
  status text not null default 'new'
    check (status in ('new','contacted','visit','sent','won','done','lost')),
  created_at timestamptz not null default now(),
  name text not null,
  company text not null default '',
  city text not null default '',
  addr text not null default '',
  local text not null default '',
  surface text not null default '',
  rooms text not null default '',
  cams text not null default '',
  place text not null default '',
  net text not null default '',
  exist text not null default '',
  delay text not null default '',
  budget text not null default '',
  chan text not null check (chan in ('phone','wa','mail')),
  phone text not null default '',
  email text not null default '',
  slot text not null default 'any',
  fee numeric,
  description text not null default '',
  svcother text not null default '',
  tech_id text references public.team_members(id) on delete set null,
  items jsonb not null default '[]'::jsonb,
  notes jsonb not null default '[]'::jsonb,
  timeline jsonb not null default '[]'::jsonb
);

create index if not exists requests_status_idx on public.requests (status);
create index if not exists requests_created_idx on public.requests (created_at desc);
create index if not exists requests_phone_idx on public.requests (phone);

-- ---------- interventions ----------
create table if not exists public.interventions (
  id text primary key,
  request_ref text references public.requests(ref) on delete set null,
  client text not null,
  city text not null default '',
  obj_fr text not null,
  obj_ar text not null,
  when_at timestamptz not null,
  tech_id text references public.team_members(id) on delete set null,
  by_id text references public.team_members(id) on delete set null,
  state text not null default 'sched' check (state in ('sched','prog','done')),
  created_at timestamptz not null default now()
);

create index if not exists interventions_when_idx on public.interventions (when_at);

-- ---------- notifications ----------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  at timestamptz not null default now(),
  request_ref text references public.requests(ref) on delete cascade,
  txt_fr text not null,
  txt_ar text not null default '',
  read boolean not null default false
);

-- ---------- helpers ----------
create or replace function public.next_request_ref()
returns text
language plpgsql
as $$
declare
  n bigint;
begin
  n := nextval('public.request_seq');
  return 'DEV-' || to_char(now(), 'YYYY') || '-' || lpad(n::text, 4, '0');
end;
$$;

create or replace function public.track_request(q text)
returns setof public.requests
language sql
security definer
set search_path = public
as $$
  select *
  from public.requests r
  where lower(r.ref) = lower(trim(q))
     or regexp_replace(coalesce(r.phone, ''), '[\s().-]', '', 'g')
        = regexp_replace(trim(q), '[\s().-]', '', 'g')
  limit 1;
$$;

revoke all on function public.track_request(text) from public;
grant execute on function public.track_request(text) to anon, authenticated;

-- ---------- RLS ----------
alter table public.settings enable row level security;
alter table public.team_members enable row level security;
alter table public.products enable row level security;
alter table public.requests enable row level security;
alter table public.interventions enable row level security;
alter table public.notifications enable row level security;

-- Public read: settings, active products, active team (for site « qui sommes-nous »)
create policy "settings_public_read" on public.settings
  for select to anon, authenticated using (true);

create policy "products_public_read" on public.products
  for select to anon, authenticated using (active = true or auth.role() = 'authenticated');

create policy "team_public_read" on public.team_members
  for select to anon, authenticated using (active = true or auth.role() = 'authenticated');

-- Public insert requests (devis / panier / contact)
create policy "requests_public_insert" on public.requests
  for insert to anon, authenticated with check (true);

-- Authenticated (admin) full access
create policy "settings_admin_all" on public.settings
  for all to authenticated using (true) with check (true);

create policy "team_admin_all" on public.team_members
  for all to authenticated using (true) with check (true);

create policy "products_admin_all" on public.products
  for all to authenticated using (true) with check (true);

create policy "requests_admin_all" on public.requests
  for all to authenticated using (true) with check (true);

create policy "interventions_admin_all" on public.interventions
  for all to authenticated using (true) with check (true);

create policy "notifications_admin_all" on public.notifications
  for all to authenticated using (true) with check (true);

-- Allow anon to insert notifications when creating a request (via service or trigger)
create policy "notifications_public_insert" on public.notifications
  for insert to anon, authenticated with check (true);

-- ---------- seed team ----------
insert into public.team_members (id, name, role, phone, active) values
  ('t1', 'Ibrahim Oufi', 'manager', '+212 6 61 24 18 05', true),
  ('t2', 'Youssef Bennani', 'tech', '06 61 55 20 14', true),
  ('t3', 'Hamza Tazi', 'tech', '06 62 18 74 03', true),
  ('t4', 'Salma Rachidi', 'tech', '06 70 41 09 88', true),
  ('t5', 'Anas El Idrissi', 'sales', '06 55 33 62 17', true)
on conflict (id) do nothing;

-- ---------- seed products (extrait catalogue maquette) ----------
insert into public.products (id, ref, cat, brand, name_fr, name_ar, price, stock, warr, specs, pop, active) values
('p1','OF-CAM-D4','cam','Hikvision','Caméra dôme IP 4 MP — intérieure','كاميرا قبة IP بدقة 4 ميغابكسل — داخلية',690,24,24,'[["res","4 MP (2560×1440)"],["lens","2,8 mm"],["ir","30 m"],["poe","802.3af"]]',98,true),
('p2','OF-CAM-B4','cam','Hikvision','Caméra bullet IP 4 MP — extérieure','كاميرا بوليت IP بدقة 4 ميغابكسل — خارجية',850,16,24,'[["res","4 MP"],["prot","IP67"],["ir","50 m"],["poe","802.3af"]]',91,true),
('p3','OF-CAM-P25','cam','Dahua','Caméra PTZ motorisée — zoom ×25','كاميرا PTZ متحركة — تقريب ×25',4200,3,24,'[["res","2 MP"],["zoom","×25 optique"],["ir","100 m"],["prot","IP66"]]',44,true),
('p4','OF-CAM-W2','cam','Ezviz','Caméra Wi-Fi intérieure 2 MP','كاميرا واي فاي داخلية بدقة 2 ميغابكسل',390,41,12,'[["res","2 MP"],["wifi","2,4 GHz"],["ir","10 m"],["cap","microSD 256 Go"]]',87,true),
('p5','OF-NVR-8P','nvr','Hikvision','Enregistreur NVR 8 canaux PoE','مسجل NVR بـ 8 قنوات PoE',1950,9,24,'[["ch","8"],["poe","8 ports"],["hdd","2 × 8 To"],["res","jusqu''à 8 MP"]]',76,true),
('p6','OF-XVR-16','nvr','Dahua','Enregistreur XVR 16 canaux','مسجل XVR بـ 16 قناة',2400,4,24,'[["ch","16"],["hdd","2 × 10 To"],["res","5 MP Lite"]]',52,true),
('p7','OF-HDD-2T','nvr','Seagate','Disque dur surveillance 2 To','قرص صلب للمراقبة سعة 2 تيرابايت',780,12,36,'[["cap","2 To"],["aut","24/7"]]',69,true),
('p8','OF-RTR-HEX','net','MikroTik','Routeur hEX RB750Gr3','راوتر hEX RB750Gr3',1150,7,12,'[["ports","5 × Gigabit"],["thr","1 Gb/s"]]',58,true),
('p9','OF-RTR-AX18','net','TP-Link','Routeur Wi-Fi 6 AX1800','راوتر واي فاي 6 بسرعة AX1800',890,15,24,'[["wifi","Wi-Fi 6"],["thr","1 800 Mb/s"],["ports","4 × Gigabit"]]',83,true),
('p10','OF-AP-U6L','net','Ubiquiti','Point d''accès UniFi U6 Lite','نقطة ولوج UniFi U6 Lite',1450,6,24,'[["wifi","Wi-Fi 6"],["users","≈ 150"],["poe","802.3af"]]',61,true),
('p11','OF-SW-8P','net','TP-Link','Switch PoE+ 8 ports — 120 W','سويتش PoE+ بـ 8 منافذ — 120 واط',1090,5,36,'[["ports","8 × PoE+"],["pow","120 W"]]',64,true),
('p12','OF-ACC-BIO','acc','ZKTeco','Pointeuse biométrique empreinte + badge','جهاز بصمة وبطاقة للحضور والانصراف',1690,4,12,'[["users","3 000 empreintes"],["ports","TCP/IP, USB"]]',47,true),
('p13','OF-ACC-INT','acc','Dahua','Interphone vidéo IP — 2 fils','إنتركوم فيديو IP بسلكين',2250,2,24,'[["res","2 MP"],["prot","IP65"]]',33,true),
('p14','OF-PC-I5','it','HP','PC de bureau i5 — 8 Go / SSD 256 Go','حاسوب مكتبي i5 — 8 غيغا / SSD 256 غيغا',4900,3,12,'[["cpu","Intel Core i5"],["ram","8 Go"],["disk","SSD 256 Go"]]',40,true),
('p15','OF-IMP-MF','it','Epson','Imprimante multifonction Wi-Fi','طابعة متعددة الوظائف بالواي فاي',1350,6,12,'[["wifi","Wi-Fi"],["ports","USB, réseau"]]',38,true),
('p16','OF-CBL-C6','cbl','Générique','Câble réseau Cat6 UTP — rouleau 305 m','كابل شبكة Cat6 UTP — بكرة 305 متر',1250,8,0,'[["len","305 m"],["thr","1 Gb/s"]]',55,true),
('p17','OF-UPS-1K','cbl','Eaton','Onduleur 1000 VA','جهاز إمداد بالطاقة 1000 فولت أمبير',950,10,24,'[["pow","1000 VA / 600 W"],["aut","≈ 20 min"]]',49,true)
on conflict (id) do nothing;

-- Sample request for suivi demo
insert into public.requests (
  ref, src, type, svc, status, created_at, name, company, city, addr, local,
  surface, rooms, cams, place, net, exist, delay, budget, chan, phone, email, slot, fee,
  description, tech_id, items, notes, timeline
) values (
  'DEV-2026-0142', 'form', 'install', 'cam', 'visit', '2026-09-26T09:12:00Z',
  'Karim Belhaj', 'Épicerie Al Baraka', 'Casablanca',
  'Bd Moulay Youssef, imm. 44, rdc — face à la pharmacie', 'shop',
  '90', '3', '6', 'both', 'yes', 'no', 'week', '10 000 – 15 000 DH',
  'wa', '06 61 24 90 12', '', 'pm', 200,
  'Magasin sur deux niveaux. Je veux couvrir la caisse, l''entrée et la réserve à l''étage.',
  't2', '[]'::jsonb,
  '[{"at":"2026-09-26T11:40:00","txt":"Appelé, très intéressé. Visite calée jeudi 14 h."}]'::jsonb,
  '[{"at":"2026-09-26T09:12:00","k":"created"},{"at":"2026-09-26T11:40:00","k":"status","v":"contacted"},{"at":"2026-09-26T11:45:00","k":"status","v":"visit"}]'::jsonb
) on conflict (ref) do nothing;

insert into public.interventions (id, request_ref, client, city, obj_fr, obj_ar, when_at, tech_id, by_id, state)
values
('TCK-0451','DEV-2026-0142','Karim Belhaj — Épicerie Al Baraka','Casablanca','État des lieux — 6 caméras','معاينة — 6 كاميرات','2026-09-27T14:00:00Z','t2','t1','sched')
on conflict (id) do nothing;
