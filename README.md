# GovGuide Nigeria

Independent Nigerian government-service navigation website.

GovGuide turns official government information into clear, source-linked guides showing fees, requirements, steps and official portals. It is **not** a government website and it never collects government application fees.

## Current product

- 76 public source-linked guides across 14 federal, state and FCT agencies/services
- 1 additional guide held in the editorial review queue because its current official fee evidence is not strong enough
- Plain-language searchable public service directory with category/status filters and sorting
- Agency/category navigation plus official office/centre finder links
- Dynamic service-guide pages with breadcrumbs, FAQs, sharing, WhatsApp and local saved-guide watchlist
- Verified/conflict/review editorial states
- Review-pending content is automatically excluded from public search, agency pages and the XML sitemap
- Official-source links and last-checked dates on every public guide
- Read-only `/admin` verification dashboard
- Google Analytics and Search Console hooks
- Weekly source-integrity GitHub Action
- GitHub CI for TypeScript/production builds plus Playwright desktop/mobile browser QA
- Automated WCAG A/AA serious/critical accessibility checks
- Weekly full official-link audit in addition to key fee/process marker monitoring
- Production security headers and installable web-app manifest
- Conditional `ads.txt` endpoint that stays disabled until AdSense is configured
- Verified-guide assistant that matches plain-language tasks to published source-linked guides
- Privacy, terms, editorial, corrections and contact pages
- Favicon/social preview assets and environment-gated AdSense plumbing

## No database subscription required

GovGuide's public website runs from checked-in verified content and does **not** require Supabase, PostgreSQL, or any paid monthly database.

Core features that work without a database:

- all public service guides
- search and filters
- GovGuide Assistant
- agency and office finders
- saved/watch guides on the user's device
- WhatsApp/native sharing
- SEO/sitemaps
- analytics hooks
- source monitoring
- CI/browser QA

Persistent correction reports and verification history are optional extras.

## Optional Cloudflare D1 persistence

If persistent correction reports are needed later, the repository includes:

- `cloudflare/d1/schema.sql`
- `cloudflare/worker-example.ts`

The Next.js API remains backend-neutral. Configure only:

```env
GOVGUIDE_REPORT_ENDPOINT=
GOVGUIDE_REPORT_TOKEN=
```

The endpoint can be a small Cloudflare Worker backed by D1. If these variables are absent, GovGuide still builds and the full public site continues to work.

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

- `GOVGUIDE_REPORT_ENDPOINT`: optional correction-report endpoint
- `GOVGUIDE_REPORT_TOKEN`: optional server-side shared token for that endpoint
- `NEXT_PUBLIC_SITE_URL`: production origin/custom domain
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: optional Google Analytics measurement ID
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: optional Search Console verification token
- `NEXT_PUBLIC_ADSENSE_CLIENT`: optional AdSense publisher client
- `NEXT_PUBLIC_ADSENSE_SLOT_GUIDE`: optional service-guide ad slot

## Editorial rule

Never silently resolve conflicting official information. Record the conflict, show the official sources, and require review before publishing a changed value.

A guide with status `review` must never be publicly indexable.

## Source monitoring

`data/source-monitors.json` tracks high-value official source markers such as major passport, licence, JAMB, WAEC, NPC, CAC, NIMC and NRS information.

The weekly GitHub workflow runs `scripts/check-sources.mjs`. If a critical marker disappears, the workflow fails so the source can be manually re-verified before the public guide is changed.
