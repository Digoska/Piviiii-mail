-- ============================================
-- NikodemMail AI — Database Migration
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text not null,
  created_at timestamptz default now() not null
);

-- 2. Emails table
create table if not exists public.emails (
  id uuid primary key default gen_random_uuid(),
  from_id uuid not null references public.profiles(id) on delete cascade,
  to_id uuid not null references public.profiles(id) on delete cascade,
  subject text not null default '',
  body text not null default '',
  is_read boolean not null default false,
  is_starred boolean not null default false,
  is_draft boolean not null default false,
  archived boolean not null default false,
  created_at timestamptz default now() not null
);

-- 3. Indexes
create index if not exists idx_emails_to_id on public.emails(to_id, created_at desc);
create index if not exists idx_emails_from_id on public.emails(from_id, created_at desc);
create index if not exists idx_profiles_username on public.profiles(username);

-- 4. Enable RLS
alter table public.profiles enable row level security;
alter table public.emails enable row level security;

-- 5. Profiles policies
create policy "Users can read any profile"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- 6. Emails policies
create policy "Users can read emails sent to them"
  on public.emails for select
  using (auth.uid() = to_id or auth.uid() = from_id);

create policy "Users can send emails"
  on public.emails for insert
  with check (auth.uid() = from_id);

create policy "Users can update their own received emails (read, star, archive)"
  on public.emails for update
  using (auth.uid() = to_id or auth.uid() = from_id);

-- 7. Function to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'username',
    new.raw_user_meta_data ->> 'display_name'
  );
  return new;
end;
$$;

-- 8. Trigger on auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
