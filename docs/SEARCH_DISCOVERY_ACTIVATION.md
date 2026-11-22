# MyNigeriaGuide search discovery — clean restart (22 November 2026)

## Canonical baseline

- Canonical public host: `https://mynigeriaguide.com`.
- Single authoritative crawl entrypoint in `robots.txt`: `https://mynigeriaguide.com/sitemap-index.xml`.
- The build-time sitemap index, its content-section shards, and valid RSS/video XML remain available. These are generated from published canonical content; no URLs are renamed or removed as part of this reset.
- Public content is allowed to be crawled. Private admin/API routes remain blocked. Existing editorial noindex decisions remain in place; never bulk index thin, duplicate, private, or utility pages.

## Removed old third-party submission machinery

The 22 November reset deletes the GitHub Actions automation **and its submission scripts** for:

1. Incremental IndexNow notifications, including the two previously published root-level IndexNow verification keys.
2. Bing Webmaster API feed submissions.
3. Google Indexing API JobPosting notifications and their identity configuration references from workflows.
4. Cloudflare Crawler Hints activation.
5. Scheduled Google Autocomplete research, plus the now-obsolete external-discovery validation workflow.

No auto-submission, domain verification, Google Workspace/Google Cloud IAM or provider-side account configuration is changed by a GitHub commit alone. Previously received notifications and external registrations are not retracted by this commit.

## What remains intentionally untouched

- Verified **Google Search Console domain ownership** and Google Analytics access. Removing a Search Console property does not reset Google's search index; we preserve official ownership and historical visibility measurements.
- Current page URLs, 301 redirects, canonical metadata, site content, and existing inbound links.
- Site hosting, Cloudflare security/CDN services, and routine availability/crawler parity monitoring.
- Any actual Bing Webmaster, Ahrefs Site Audit, Cloudflare Crawler Hints, or Google Cloud accounts/settings that must be removed *inside those providers*. Their authenticated settings are not accessible through this repository and must not be described as deleted without evidence.

## Rebuilding from here

1. Keep exactly the verified domain property in the monitoring connector, rather than multiple unverified section-prefix properties.
2. Submit only the verified production sitemap index through the official Google Search Console API after checking it responds with valid XML. Additional feeds can be registered separately only if needed.
3. Do not restore third-party auto-submission services without a separate owner instruction and a successful, verified provider-side configuration.
4. Judge progress by Google indexed-page status, Googlebot fetches, and GSC search performance. A successfully submitted sitemap is not proof of indexing or recovered traffic.
