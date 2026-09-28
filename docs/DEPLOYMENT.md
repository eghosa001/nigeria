# GovGuide Nigeria — production launch runbook

The application is designed to launch without a database.

## 1. Create a dedicated Vercel project

Import the GitHub repository:

`eghosa001/nigeria`

Use a **new** Vercel project named `govguide-nigeria` (or another unique GovGuide name). Do not attach the repository to the existing `web`, `educationalwebsite`, or `backend` projects.

Framework: Next.js  
Root directory: repository root  
Build command: `npm run build`  
Install command: `npm install`

No database environment variables are required.

## 2. First-deploy environment

Set:

```env
NEXT_PUBLIC_SITE_URL=https://<production-domain>
```

Leave these blank until the corresponding account/configuration is ready:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_ADSENSE_CLIENT=
NEXT_PUBLIC_ADSENSE_SLOT_GUIDE=
GOVGUIDE_REPORT_ENDPOINT=
GOVGUIDE_REPORT_TOKEN=
```

## 3. Pre-deploy gate

The main branch must have green checks for:

- CI: TypeScript
- CI: Next.js production build
- Browser QA: desktop
- Browser QA: mobile
- Browser QA: serious/critical WCAG A/AA checks
- Source integrity monitor
- Official-link audit

Do not deploy a red source-integrity commit unless the failure has been investigated.

## 4. Post-deploy smoke checks

Check these production routes:

- `/`
- `/services`
- `/fees`
- `/updates`
- `/categories/education`
- `/services/passport-renewal`
- `/offices`
- `/assistant`
- `/sitemap.xml`
- `/robots.txt`
- `/manifest.webmanifest`
- `/api/health`

Verify the response headers include:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: SAMEORIGIN`
- HSTS on HTTPS

## 5. Search launch

After the final domain is live:

1. Add the domain to Google Search Console.
2. Put its verification token in `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
3. Redeploy once.
4. Submit `https://<domain>/sitemap.xml`.
5. Request indexing for the home page, fee directory, update tracker and the strongest service/category pages.

## 6. Analytics

Only set `NEXT_PUBLIC_GA_MEASUREMENT_ID` after the analytics property is created.

The site works fully without analytics.

## 7. AdSense

Do not set AdSense variables until:

- the final domain is live;
- policy/trust pages are accessible;
- the content is indexed and has meaningful organic traffic;
- an AdSense account/site has been approved or is ready for review;
- Google privacy/consent requirements applicable to the site's visitors have been configured in AdSense/Google's certified consent tooling.

When ready:

```env
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-...
NEXT_PUBLIC_ADSENSE_SLOT_GUIDE=...
```

The site will then expose a matching `/ads.txt` response. With no AdSense client configured, `/ads.txt` intentionally returns 404.

## 8. Optional correction-report persistence

GovGuide does not require this for launch.

If persistent reports are later wanted, deploy the example Cloudflare Worker and D1 schema under `cloudflare/`, then set:

```env
GOVGUIDE_REPORT_ENDPOINT=
GOVGUIDE_REPORT_TOKEN=
```

## 9. Monitoring

Use `/api/health` for uptime checks.

GitHub Actions independently checks official sources and public government links whenever source data changes and on the weekly schedule.

## 10. Deployment discipline

Because deployment quota is limited:

- build and test in GitHub Actions first;
- deploy only green `main`;
- avoid redeploying for content drafts;
- batch environment-variable changes;
- use a preview only when visual production behavior cannot be validated in CI.
