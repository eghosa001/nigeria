# MyNigeriaGuide — Cloudflare production launch

MyNigeriaGuide is Cloudflare-first. The public website does not require a database, KV namespace, or paid monthly backend.

Cloudflare's current recommended deployment path for an existing Next.js 16 app is vinext on Cloudflare Workers. This repository is already configured for that path.

## Architecture

- GitHub: source code and CI
- Cloudflare Workers: Next.js application runtime
- Cloudflare static assets: built application assets
- Cloudflare custom domain/CDN: production delivery
- GitHub Actions: source monitoring, link auditing, browser QA
- Cloudflare D1: optional later, only for features that truly require persistence
- Cloudflare KV: **not used**

There is deliberately no KV binding in `wrangler.jsonc`.

## Local commands

Normal Next.js development remains available:

```bash
npm install
npm run dev
```

Cloudflare/vinext compatibility:

```bash
npm run check:cloudflare
npm run build
npm run start:vinext
```

The default production build is the Cloudflare/vinext build:

```bash
npm run build
```

The original Next.js production build remains available for independent QA:

```bash
npm run build:next
```

## First Cloudflare deployment

In Cloudflare Dashboard:

1. Open **Workers & Pages** / **Workers Builds**.
2. Create a new Worker from a Git repository.
3. Connect GitHub repository `eghosa001/nigeria`.
4. Use the repository root.
5. Keep this as its own Worker named `mynigeriaguide`.
6. Do not attach KV, D1, R2, or other bindings for the initial launch.

The repository already contains:

- `vite.config.ts`
- `wrangler.jsonc`
- vinext Cloudflare dependencies
- Cloudflare build scripts

For Workers Builds, the simplest deployment command is:

```bash
npm run deploy:cloudflare
```

If Cloudflare asks for a separate build command, use:

```bash
npm run build
```

and deploy the generated Workers config with:

```bash
npm run deploy:cloudflare
```

For Cloudflare Workers Builds, use `npm run build` as the Build command and `npm run deploy:cloudflare` as the Deploy command. The Worker created in the Cloudflare dashboard must be named exactly `mynigeriaguide` so it matches `wrangler.jsonc`.

## Environment variables

For the first production deployment, set:

```env
NEXT_PUBLIC_SITE_URL=https://<final-domain>
```

Leave these unset until the corresponding service is actually configured:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_ADSENSE_CLIENT=
NEXT_PUBLIC_ADSENSE_SLOT_GUIDE=
MYNIGERIAGUIDE_REPORT_ENDPOINT=
MYNIGERIAGUIDE_REPORT_TOKEN=
```

To enable the private `/admin/visits` dashboard, also configure these values on the deployed Worker:

```env
GA4_PROPERTY_ID=
GA4_SERVICE_ACCOUNT_EMAIL=
GA4_SERVICE_ACCOUNT_PRIVATE_KEY=
MYNIGERIAGUIDE_ADMIN_ANALYTICS_KEY=
MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN=
```

Keep the private key, admin passphrase and GitHub token server-side. The GitHub token is used only by protected guide editing and must be a fine-grained token limited to `eghosa001/nigeria` with **Contents: read/write** and **Pull requests: read/write**. The service account must have read access to the selected GA4 property.

MyNigeriaGuide's public guides work without these private values. The Visits dashboard intentionally reports setup as incomplete until its analytics values are present; guide editing remains locked/setup-only until the admin passphrase and GitHub token are configured.

## Protected guide editing

The admin guide editor is deliberately review-only:

1. open a guide under `/admin/services/<slug>`;
2. unlock editing with `MYNIGERIAGUIDE_ADMIN_ANALYTICS_KEY`;
3. edit the structured guide fields;
4. choose **Create review change**;
5. the Worker creates a dedicated GitHub branch and pull request;
6. production remains unchanged until that pull request is reviewed, its checks are green, and it is merged.

The browser never receives `MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN`. Public visitors continue to read the checked-in `data/services.json` catalog and do not generate GitHub, KV, D1 or database reads.

If GitHub proposal creation fails, the editor must show an error and must not claim that production changed.

## KV rule

Do **not** add a Workers KV namespace merely for normal page rendering, search, service guides, saved guides, SEO, or source monitoring.

The current site does not need KV.

If persistent application data is needed later:

1. prefer D1 for structured records such as correction reports;
2. add it only to the feature that needs it;
3. keep public content in the repository;
4. do not put every page request through a KV lookup.

This is specifically intended to prevent a high-read architecture where ordinary traffic consumes the free KV quota.

## Optional D1

D1 is not required for launch.

The repository contains an optional schema and Worker example under:

```
cloudflare/d1/schema.sql
cloudflare/worker-example.ts
```

Use that only when persistent correction reports or similar server-side records are needed.

## Pre-deploy gate

Deploy only a green `main` branch.

Required checks:

- TypeScript
- Next.js production build
- vinext compatibility check
- vinext Cloudflare production build
- Playwright desktop QA
- Playwright mobile QA
- WCAG serious/critical checks
- source-integrity monitor
- official-link audit

## Post-deploy smoke checks

Check:

- `/`
- `/services`
- `/fees`
- `/updates`
- `/updates.xml`
- `/categories/education`
- `/services/passport-renewal`
- `/offices`
- `/assistant`
- `/sitemap.xml`
- `/robots.txt`
- `/manifest.webmanifest`
- `/api/health`

Also test:

- plain-language search
- category filters
- mobile navigation
- WhatsApp sharing
- saved guides
- service-specific social preview cards

## Custom domain

Production domain: `https://mynigeriaguide.com`.

The Worker should serve this custom domain as the public origin. Set `NEXT_PUBLIC_SITE_URL=https://mynigeriaguide.com`. The application also falls back to this domain in production if the environment value is missing or still points at the legacy `workers.dev` host.

The legacy `mynigeriaguide.aighewieghosa111.workers.dev` host permanently redirects to the matching path on `https://mynigeriaguide.com` to avoid duplicate public origins. Production monitoring and live QA must target the custom domain.

Keep DNS/proxy management inside Cloudflare.

## Search Console

After the final domain is live:

1. add the domain/property to Google Search Console;
2. set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`;
3. deploy once;
4. submit `/sitemap.xml`;
5. request indexing for the home page, `/fees`, `/updates`, and the strongest category/service pages.

## Analytics

Configure `NEXT_PUBLIC_GA_MEASUREMENT_ID` after creating the GA4 property so public page views are collected. The private Visits dashboard additionally requires `GA4_PROPERTY_ID`, `GA4_SERVICE_ACCOUNT_EMAIL`, `GA4_SERVICE_ACCOUNT_PRIVATE_KEY`, and `MYNIGERIAGUIDE_ADMIN_ANALYTICS_KEY`.

After deployment, `/api/admin/analytics?range=7d` should return **401** while locked. A **503** means one or more analytics configuration groups are missing. `/admin/visits` should show the passphrase form before any traffic data is returned.

## AdSense

Do not enable ads simply because the code supports them.

Wait until:

- the final domain is live;
- trust/policy pages are accessible;
- content is indexed;
- meaningful traffic exists;
- the site is ready for AdSense review;
- applicable consent/privacy requirements are configured.

Then set:

```env
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-...
NEXT_PUBLIC_ADSENSE_SLOT_GUIDE=...
```

MyNigeriaGuide exposes `/ads.txt` only when the AdSense client is configured.

## Monitoring

Use:

```
/api/health
```

for uptime checks.

The repository now has two scheduled GitHub Actions monitors:

- **Production health monitor** runs every six hours against the live Worker and verifies critical public routes, the health payload, sitemap/robots discovery, deployment metadata, and that private analytics remains configured and locked.
- **Source integrity monitor** runs daily and checks monitored government source markers plus the full official/source link registry.

A failed scheduled workflow is the operational alert signal and uses the existing GitHub Actions notification path. These checks add no KV or database reads to normal visitor traffic.

## Deployment discipline

- test in GitHub Actions first;
- deploy only green `main`;
- batch content and environment changes;
- avoid unnecessary preview/production deployments;
- do not add storage products until a concrete feature requires them.
