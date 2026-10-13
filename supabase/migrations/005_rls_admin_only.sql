-- Restreindre les écritures « admin » aux comptes listés dans admin_users (plus tout authenticated).

create or replace function public.is_active_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.active = true
      and (
        au.user_id = auth.uid()
        or lower(au.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
      )
  );
$$;

revoke all on function public.is_active_admin() from public;
grant execute on function public.is_active_admin() to anon, authenticated;

alter table public.admin_users enable row level security;

drop policy if exists "settings_admin_all" on public.settings;
drop policy if exists "team_admin_all" on public.team_members;
drop policy if exists "products_admin_all" on public.products;
drop policy if exists "requests_admin_all" on public.requests;
drop policy if exists "interventions_admin_all" on public.interventions;
drop policy if exists "notifications_admin_all" on public.notifications;

create policy "settings_admin_all" on public.settings
  for all to authenticated using (public.is_active_admin()) with check (public.is_active_admin());

create policy "team_admin_all" on public.team_members
  for all to authenticated using (public.is_active_admin()) with check (public.is_active_admin());

create policy "products_admin_all" on public.products
  for all to authenticated using (public.is_active_admin()) with check (public.is_active_admin());

create policy "requests_admin_all" on public.requests
  for all to authenticated using (public.is_active_admin()) with check (public.is_active_admin());

create policy "interventions_admin_all" on public.interventions
  for all to authenticated using (public.is_active_admin()) with check (public.is_active_admin());

create policy "notifications_admin_all" on public.notifications
  for all to authenticated using (public.is_active_admin()) with check (public.is_active_admin());

create policy "admin_users_self_read" on public.admin_users
  for select to authenticated
  using (
    user_id = auth.uid()
    or lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );

create policy "admin_users_admin_all" on public.admin_users
  for all to authenticated
  using (public.is_active_admin())
  with check (public.is_active_admin());
