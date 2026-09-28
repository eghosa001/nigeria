# GovGuide Nigeria

Independent Nigerian government-service navigation website.

GovGuide turns official government information into clear, source-linked guides showing fees, requirements, steps and official portals. It is **not** a government website and it never collects government application fees.

## Current product

- 65 public source-linked guides across 14 federal, state and FCT agencies/services
- 12 additional guides held in the editorial review queue
- Plain-language searchable public service directory with category/status filters and sorting
- Agency/category navigation plus official office/centre finder links
- Dynamic service-guide pages with breadcrumbs, FAQs, sharing, WhatsApp and local saved-guide watchlist
- Verified/conflict/review editorial states
- Review-pending content is automatically excluded from public search, agency pages and the XML sitemap
- Official-source links and last-checked dates on every public guide
- Correction-reporting UI (activates after the new dedicated Supabase project is connected)
- Read-only `/admin` verification dashboard
- Google Analytics and Search Console verification hooks via environment variables
- Weekly source-integrity GitHub Action
- Supabase schema prepared for a **new, dedicated GovGuide project**
- GitHub CI for TypeScript/production builds plus Playwright desktop/mobile browser QA
- Verified-guide assistant that matches plain-language tasks to published source-linked guides
- Privacy, terms, editorial, corrections and contact pages
- Favicon/social preview assets and environment-gated AdSense plumbing

## Important Supabase rule

Do **not** run `supabase/schema.sql` against the existing education Supabase project.

Create/connect a new Supabase account/project for GovGuide, then use:

```env
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
```

The schema uses `govguide_*` table names, enables RLS, publishes only verified/conflict service records, keeps verification events private, and allows anonymous correction-report inserts without public read access.

## Local development

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run typecheck
npm run build
npm run check:sources
npm run test:e2e
```

## Environment

Copy `.env.example` to `.env.local`.

- `SUPABASE_URL`: new GovGuide Supabase project URL
- `SUPABASE_PUBLISHABLE_KEY`: publishable key for that new project
- `NEXT_PUBLIC_SITE_URL`: production origin/custom domain
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: optional Google Analytics measurement ID
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: optional Search Console verification token
- `NEXT_PUBLIC_ADSENSE_CLIENT`: optional AdSense publisher client (ads remain disabled without it)
- `NEXT_PUBLIC_ADSENSE_SLOT_GUIDE`: optional service-guide ad slot

The public website remains functional if Supabase is not configured.

## Editorial rule

Never silently resolve conflicting official information. Record the conflict, show the official sources, and require review before publishing a changed value.

A guide with status `review` must never be publicly indexable.

## Source monitoring

`data/source-monitors.json` tracks high-value official source markers such as major passport, licence, JAMB, WAEC, NPC, CAC, NIMC and NRS information.

The weekly GitHub workflow runs `scripts/check-sources.mjs`. If a critical marker disappears, the workflow fails so the source can be manually re-verified before the public guide is changed.

## Next database phase

Once a new GovGuide Supabase project is connected:

1. Apply `supabase/schema.sql`.
2. Seed the checked-in verified guides into `govguide_agencies`, `govguide_services` and `govguide_sources`.
3. Add authenticated editor/admin policies.
4. Move correction-report review and verification history into the dashboard.
5. Keep checked-in seed content as a safe public fallback during database outages.
