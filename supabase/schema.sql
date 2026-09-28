-- GovGuide Nigeria structured content model.
-- The app currently ships with verified seed data in code; this schema is ready
-- for the CMS/database phase.

create extension if not exists pgcrypto;

create table if not exists public.agencies (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  short_name text not null,
  website text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references public.agencies(id) on delete restrict,
  slug text unique not null,
  title text not null,
  short_title text not null,
  summary text not null,
  category text not null,
  status text not null check (status in ('draft','review','verified','conflict','archived')),
  fee_label text,
  fee_note text,
  timeline text,
  official_portal text,
  requirements jsonb not null default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  notes jsonb not null default '[]'::jsonb,
  search_terms jsonb not null default '[]'::jsonb,
  last_verified_at timestamptz,
  published_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.sources (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  label text not null,
  source_url text not null,
  agency_name text not null,
  published_at date,
  last_checked_at timestamptz not null,
  source_hash text,
  is_official boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.verification_events (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  source_id uuid references public.sources(id) on delete set null,
  event_type text not null check (event_type in ('checked','change_detected','conflict_detected','approved','rejected')),
  previous_value jsonb,
  observed_value jsonb,
  reviewer_note text,
  created_at timestamptz not null default now()
);

create table if not exists public.user_reports (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references public.services(id) on delete set null,
  report_type text not null,
  message text not null,
  contact_email text,
  status text not null default 'open' check (status in ('open','reviewing','resolved','dismissed')),
  created_at timestamptz not null default now()
);

alter table public.agencies enable row level security;
alter table public.services enable row level security;
alter table public.sources enable row level security;
alter table public.verification_events enable row level security;
alter table public.user_reports enable row level security;

create policy "public agencies are readable"
  on public.agencies for select using (true);

create policy "published services are readable"
  on public.services for select
  using (published_at is not null and status in ('verified','conflict'));

create policy "sources for published services are readable"
  on public.sources for select
  using (exists (
    select 1 from public.services s
    where s.id = service_id and s.published_at is not null and s.status in ('verified','conflict')
  ));

create policy "public can submit correction reports"
  on public.user_reports for insert
  with check (length(message) between 5 and 4000);
