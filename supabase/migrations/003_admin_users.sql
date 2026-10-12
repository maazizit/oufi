-- Comptes back-office : super_admin (tout) ou gestionnaire (pages cochées dans permissions).
create table if not exists public.admin_users (
  id bigserial primary key,
  user_id uuid unique,
  email text not null unique,
  role text not null check (role in ('super_admin', 'manager')),
  permissions jsonb not null default '{"dashboard":true,"demandes":true,"catalogue":true,"interventions":false,"reglages":false}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists admin_users_email_idx on public.admin_users (email);
create index if not exists admin_users_active_idx on public.admin_users (active);
