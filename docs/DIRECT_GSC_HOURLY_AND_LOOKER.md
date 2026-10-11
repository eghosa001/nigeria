# MyNigeriaGuide: free direct Google Search reporting and Looker Studio

This adds **two independent, free options**; neither requires Ahrefs or GSC Wizard. Neither deletes history.

## Direct preliminary hourly data — in the existing private Visits dashboard

Go to **/admin/visits** and unlock the existing admin/analytics protection. Below the existing Search Console daily totals, the **Latest hourly search impressions** card reads the Google Search Console API directly:

- endpoint: `POST /webmasters/v3/sites/{encoded site}/searchAnalytics/query`
- body: `{ "startDate": "...", "endDate": "...", "type":"web", "dataState":"hourly_all", "dimensions":["hour"], "aggregationType":"byProperty", "rowLimit":150 }`
- reporting day timezone: **America/Los_Angeles**; hourly timestamps contain an offset and are *displayed* in Lagos time
- query window: current Pacific reporting date and 3 previous dates; API results can omit empty hours
- the latest returned hour and its age are shown **separately** from the request end date and the fetch timestamp
- `metadata.first_incomplete_hour` is used only when Google returns it. Never claim an unmarked hour has finalized.
- hourly numbers are preliminary and can be corrected by Google; this is not live visitor tracking
- the 5-minute server report cache helps avoid unnecessary repeat API calls; **Refresh now** bypasses that cache
- if API authorization fails or rows are missing, hourly metrics show **unavailable**, not fabricated zeros or an old snapshot

### Credentials already supported by this repository

The reporting server already uses the following **private** environment variables (no browser secrets):

```env
GSC_SITE_URL=sc-domain:mynigeriaguide.com
GSC_SERVICE_ACCOUNT_EMAIL=
GSC_SERVICE_ACCOUNT_PRIVATE_KEY=
```

If the two GSC credential overrides are absent, the code automatically reuses the server's existing `GA4_SERVICE_ACCOUNT_EMAIL` and `GA4_SERVICE_ACCOUNT_PRIVATE_KEY`. The service account must have read access to the **domain property** inside Google Search Console, and the Search Console API must be enabled for its Google Cloud project. These are independent of PostHog's Google connection. **Do not paste private keys into GitHub, Looker Studio fields, the browser, or chat.**

If access is not granted, the dashboard explicitly shows failure without breaking the GA4/PostHog panels or silently treating old history as current. No background polling or long-term hourly storage is claimed by this change. Google's API retains only a limited hourly window; the existing historical Search Console snapshots remain unchanged.

### Data protection

Existing `/admin/visits` and `/admin/api/analytics` routes have an HttpOnly, server-verified admin passphrase and Cloudflare Access protections. Search Console credentials stay server-side. API responses use `private, no-store` headers. Do not expose this report via an unauthenticated CSV or public endpoint.

## Google Looker Studio — official free Search Console + GA4 dashboard template

Google's [official dashboard template](https://lookerstudio.google.com/reporting/408e669d-07d1-4353-a1dc-94f06bde27ef/page/Hqrp/preview) combines GSC search clicks/CTR and GA4 organic sessions/engagement. To finish authorizing the report **in the account owner’s browser**:

1. Sign into Looker Studio with the Google account that owns MyNigeriaGuide's Search Console property.
2. Open the official template above and select **Use my own data**.
3. Choose the Search Console property `sc-domain:mynigeriaguide.com` and **URL Impression** as the table.
4. Select MyNigeriaGuide's existing GA4 property as the second source. Review the preview, then save the report to the owner's Looker Studio account.
5. If a second property-aggregate view is needed, add a separate **Site Impression** data source; don't sum URL-level rows and call them site-level impressions.

The owner must complete Google's OAuth consent in Looker Studio. **This repository cannot create or authorize a report in someone else's Looker Studio account.** Google provides the native connector for free. Looker Studio's cached/historical dashboard is **not** guaranteed fresher than Google Search Console. For preliminary hourly visibility, use the private Visits view above.

Official documentation:

- [Google Search Analytics API: hourly_all and first_incomplete_hour](https://developers.google.com/webmaster-tools/v1/searchanalytics/query)
- [Google Search Central: free Search Console + Analytics Looker template](https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console)
- [Looker Studio native Search Console connector](https://cloud.google.com/looker/docs/studio/connect-to-search-console)

### Validation

Run only the relevant checks (per the repository's change-scoped validation rule):

```bash
npx tsx --test tests/search-console-hourly.test.ts
npm run typecheck
```

Tests cover timestamp sorting, age based on **actual returned hour**, incomplete-hour flags, missing rows, and malformed data.
