-- GovGuide Nigeria schema for a NEW, dedicated Supabase project.
-- Do not run this against the user's existing education project.

create extension if not exists pgcrypto;

create table if not exists public.govguide_agencies (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  short_name text not null,
  website text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.govguide_services (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references public.govguide_agencies(id) on delete restrict,
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

create table if not exists public.govguide_sources (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.govguide_services(id) on delete cascade,
  label text not null,
  source_url text not null,
  agency_name text not null,
  published_at date,
  last_checked_at timestamptz not null,
  source_hash text,
  is_official boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.govguide_verification_events (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.govguide_services(id) on delete cascade,
  source_id uuid references public.govguide_sources(id) on delete set null,
  event_type text not null check (event_type in ('checked','change_detected','conflict_detected','approved','rejected')),
  previous_value jsonb,
  observed_value jsonb,
  reviewer_note text,
  created_at timestamptz not null default now()
);

create table if not exists public.govguide_user_reports (
  id uuid primary key default gen_random_uuid(),
  service_slug text not null,
  report_type text not null check (report_type in ('incorrect_fee','outdated_requirement','broken_link','other')),
  message text not null check (char_length(message) between 10 and 4000),
  contact_email text,
  status text not null default 'open' check (status in ('open','reviewing','resolved','dismissed')),
  created_at timestamptz not null default now()
);

create index if not exists govguide_services_agency_idx on public.govguide_services(agency_id);
create index if not exists govguide_services_status_idx on public.govguide_services(status);
create index if not exists govguide_sources_service_idx on public.govguide_sources(service_id);
create index if not exists govguide_reports_status_idx on public.govguide_user_reports(status, created_at desc);

alter table public.govguide_agencies enable row level security;
alter table public.govguide_services enable row level security;
alter table public.govguide_sources enable row level security;
alter table public.govguide_verification_events enable row level security;
alter table public.govguide_user_reports enable row level security;

revoke all on public.govguide_agencies from anon, authenticated;
revoke all on public.govguide_services from anon, authenticated;
revoke all on public.govguide_sources from anon, authenticated;
revoke all on public.govguide_verification_events from anon, authenticated;
revoke all on public.govguide_user_reports from anon, authenticated;

grant select on public.govguide_agencies to anon, authenticated;
grant select on public.govguide_services to anon, authenticated;
grant select on public.govguide_sources to anon, authenticated;
grant insert on public.govguide_user_reports to anon, authenticated;

create policy "govguide public agencies readable"
  on public.govguide_agencies for select
  to anon, authenticated
  using (true);

create policy "govguide published services readable"
  on public.govguide_services for select
  to anon, authenticated
  using (published_at is not null and status in ('verified','conflict'));

create policy "govguide published sources readable"
  on public.govguide_sources for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.govguide_services service
      where service.id = service_id
        and service.published_at is not null
        and service.status in ('verified','conflict')
    )
  );

create policy "govguide public correction reports insertable"
  on public.govguide_user_reports for insert
  to anon, authenticated
  with check (
    char_length(service_slug) between 1 and 120
    and char_length(message) between 10 and 4000
    and (contact_email is null or char_length(contact_email) <= 254)
  );

comment on table public.govguide_verification_events is
  'Private editorial audit trail. Do not grant public read access.';
