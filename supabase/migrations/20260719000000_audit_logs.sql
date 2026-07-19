-- audit_logs: the table the admin panel (/dashboard/admin) reads and that the
-- auth Server Actions write to. This migration replaces the copy-paste SQL that
-- used to live only in the admin UI — now the schema is version-controlled.
--
-- Apply locally with `npm run db:reset` (or `db:push` against a linked project).

-- 1. The audit log table
create table if not exists public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_email text not null,
  action text not null,
  status text not null
);

-- 2. Enable Row Level Security
alter table public.audit_logs enable row level security;

-- 3. RLS policies driven by the user's JWT metadata role claim.

-- Admins (role = 'admin' in user_metadata) get full access.
create policy "Admins have full access"
  on public.audit_logs
  for all
  to authenticated
  using ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin')
  with check ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

-- Standard users may insert only their own actions.
create policy "Users can insert their own actions"
  on public.audit_logs
  for insert
  to authenticated
  with check (auth.jwt() ->> 'email' = user_email);

-- Standard users may read only their own actions.
create policy "Users can view their own actions"
  on public.audit_logs
  for select
  to authenticated
  using (auth.jwt() ->> 'email' = user_email);
