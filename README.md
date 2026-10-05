# MyNigeriaGuide

Independent Nigerian government-service navigation website.

MyNigeriaGuide turns official government information into clear, source-linked guides showing fees, requirements, steps and official portals. It is **not** a government website and it never collects government application fees.

## Current product

- 106 public source-linked guides across 32 Nigerian and destination-country agency groups
- 1 additional guide held in the editorial review queue until its evidence is strong enough for publication
- Plain-language searchable public service directory with category/status filters and sorting
- Launch runbook under `docs/DEPLOYMENT.md`
- Production error recovery and `/api/health` monitoring endpoint
- Service-specific social preview cards for WhatsApp/social sharing
- Verified fee/process update tracker with a backend-free RSS feed
- Indexable category landing pages and a searchable government fee directory
- Agency/category navigation plus official office/centre finder links
- Dynamic service-guide pages with breadcrumbs, FAQs, sharing, WhatsApp and local saved-guide watchlist
- Verified/conflict/review editorial states
- Review-pending content is automatically excluded from public search, agency pages and the XML sitemap
- Official-source links and last-checked dates on every public guide
- Protected `/admin` verification dashboard plus review-only guide editing that creates GitHub pull requests
- Google Analytics and Search Console hooks
- Daily source-integrity GitHub Action plus six-hour production-health monitoring
- GitHub CI for TypeScript/production builds plus Playwright desktop/mobile browser QA
- Automated WCAG A/AA serious/critical accessibility checks
- Daily full official-link audit in addition to key fee/process marker monitoring
- Production security headers and installable web-app manifest
- Conditional `ads.txt` endpoint that stays disabled until AdSense is configured
- Seven named, individually switchable AdSense placements placed after the answer-first block, never above it
- Verified-guide assistant that matches plain-language tasks to published source-linked guides
- Privacy, terms, editorial, corrections and contact pages
- Favicon/social preview assets; the AdSense loader is withheld from `/admin` and automated browsers

## Scale path

MyNigeriaGuide still runs from checked-in verified content at the current catalog size, but the repository is now explicitly designed for the Million-Search Expansion.

The long-range contract is in `config/scale-targets.json` and `docs/SCALING.md`: 100,000 useful indexable public URLs, a 10 million monthly-pageview design target, and storage/query headroom for at least 1,000,000 underlying content records.

Checked-in content remains valid during the small-catalog phase. High-growth pillars must move to the D1 content-store path before they cross the repository's 5,000-record threshold so catalog growth does not permanently inflate the Worker bundle or browser payloads.

Core features continue to work without a database during this migration period:

- public guides and detail pages
- search and filters
- MyNigeriaGuide Assistant
- agency and office finders
- saved/watch guides on the user's device
- WhatsApp/native sharing
- SEO/sitemaps
- analytics hooks
- source monitoring

## Cloudflare D1 persistence

The repository includes two D1 paths:

- `cloudflare/d1/schema.sql` for correction reports and verification history.
- `cloudflare/d1/content-scale-schema.sql` for the future high-volume four-pillar content store and FTS5 search.
- `cloudflare/worker-example.ts` for the existing lightweight reporting example.

The Next.js API remains backend-neutral. Configure only:

```env
MYNIGERIAGUIDE_REPORT_ENDPOINT=
MYNIGERIAGUIDE_REPORT_TOKEN=
```

The endpoint can be a small Cloudflare Worker backed by D1. If these variables are absent, MyNigeriaGuide still builds and the full public site continues to work.

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

- `MYNIGERIAGUIDE_REPORT_ENDPOINT`: optional correction-report endpoint
- `MYNIGERIAGUIDE_REPORT_TOKEN`: optional server-side shared token for that endpoint
- `NEXT_PUBLIC_SITE_URL`: production origin/custom domain
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: optional Google Analytics measurement ID
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: optional Search Console verification token
- `GA4_PROPERTY_ID`: GA4 property used by the private Visits dashboard
- `GA4_SERVICE_ACCOUNT_EMAIL`: service-account email with read access to that property
- `GA4_SERVICE_ACCOUNT_PRIVATE_KEY`: server-only service-account private key
- `MYNIGERIAGUIDE_ADMIN_ANALYTICS_KEY`: server-only passphrase protecting private analytics and guide editing
- `MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN`: fine-grained server-only GitHub token used only to create review branches/pull requests for guide edits
- `NEXT_PUBLIC_ADSENSE_CLIENT`: optional AdSense publisher client (`ca-pub-...`). Blank keeps all advertising and `/ads.txt` disabled
- `NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_AFTER_ANSWER`: service guide, immediately after the quick answer
- `NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_MID`: service guide, midway through the detailed guide
- `NEXT_PUBLIC_ADSENSE_SLOT_MOVIE_AFTER_CAST`: movie page, after cast and crew
- `NEXT_PUBLIC_ADSENSE_SLOT_MOVIE_AFTER_WATCH`: movie page, after the official availability section
- `NEXT_PUBLIC_ADSENSE_SLOT_JOB_AFTER_FACTS`: job page, after the at-a-glance facts
- `NEXT_PUBLIC_ADSENSE_SLOT_TOUR_AFTER_INTRO`: explore/tour guide, before the places section
- `NEXT_PUBLIC_ADSENSE_SLOT_END_MULTIPLEX`: reserved Multiplex unit for the end of long-form articles

Slot names are mapped in `lib/adsense-config.ts`. Any blank slot renders nothing, so placements can be enabled one at a time.

## Editorial rule

Never silently resolve conflicting official information. Record the conflict, show the official sources, and require review before publishing a changed value.

A guide with status `review` must never be publicly indexable.

## Source monitoring

`data/source-monitors.json` tracks high-value official source markers such as major passport, licence, JAMB, WAEC, NPC, CAC, NIMC and NRS information.

The daily GitHub workflow runs `scripts/check-sources.mjs` and the full official-link audit. If a critical marker disappears or a source is definitively broken, the workflow fails so the guide can be re-verified before publication.

## Production launch

Follow `docs/DEPLOYMENT.md` for the Cloudflare Workers launch sequence, environment variables, post-deploy checks, Search Console setup, AdSense timing and optional D1 reporting.
