# Search discovery: account activation and safety

MyNigeriaGuide already has a canonical sitemap index, recently updated RSS feed, video sitemap and automatic incremental IndexNow. Those remain unchanged. Search engine acceptance is not indexing.

## Bing Webmaster

Bing already recognises `https://mynigeriaguide.com/` as a verified property, but the connected Bing feed report previously returned no registered feeds. To register through GitHub, set repository secret `BING_WEBMASTER_API_KEY`, then run **Bing Webmaster Sitemap Registration**. This uses the still-supported `ssl.bing.com/webmaster/api.svc/json/SubmitFeed` REST API, not retired SOAP/POX or anonymous sitemap ping. The workflow adds:

- `https://mynigeriaguide.com/sitemap-index.xml`
- `https://mynigeriaguide.com/recent-pages.xml`
- `https://mynigeriaguide.com/video-sitemap.xml`

Without a GitHub Bing API key the workflow exits without registering anything. Equivalent manual registration is available in [Bing Webmaster > Sitemaps](https://www.bing.com/webmasters/sitemaps). Check the independent Bing feed status afterwards.

## Cloudflare Crawler Hints

Enable at Cloudflare Dashboard > select `mynigeriaguide.com` zone > **Caching > Configuration > Crawler Hints > Enable**. Cloudflare says the free-plan feature uses CDN cache MISS signals to send IndexNow notifications. There is no need to change other caching or indexing settings.

An **optional/manual** `Cloudflare Crawler Hints - Explicit Activation` workflow attempts to read and update only the dedicated zone setting; it requires GitHub Actions secrets `CLOUDFLARE_API_TOKEN` (Zone Read and Zone Settings Write) and `CLOUDFLARE_ZONE_ID`. It verifies the zone's name *before* changing anything and verifies the setting afterwards. If the API does not expose this switch for the zone/token, the workflow fails closed, leaving the dashboard action necessary. No activation should be claimed without a successful setting readback or visual dashboard confirmation.

## Google Indexing API: eligible job postings only

Google's Indexing API is explicitly **not** for ordinary web pages, general career portals, movies, universities, tourism guides or services. It may be used only for actual `JobPosting` and qualifying livestream `BroadcastEvent` pages. Only presently active, indexable, sourced, authorized *vacancy* records generating `JobPosting` JSON-LD are eligible here.

1. In Google Cloud, create/select a project and enable the **Indexing API**.
2. Create a service account. Add its email as an **Owner** of the verified MyNigeriaGuide Search Console property. Follow Google's quota and approval process.
3. Put its complete private service-account JSON into GitHub Actions secret `GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON`. Never commit JSON or private keys.
4. Run workflow **Google Indexing API - Verified JobPosting Only**, or let its scheduled/diff-triggered run execute. It checks the deployed commit before notifying Google and sends only eligible pages changed since the last successful checkpoint.

Default Google initial quota is 200 publish requests/day/project; the code caps each run at 100 and never uses multiple service accounts to evade limits. Submissions only return Google acceptance, not an indexed result. When a vacancy expires but its page remains accessible, the workflow intentionally does not send false `URL_DELETED` notifications. Google can observe `validThrough` and the page removing structured data.

## Validation and account-blocked status

With no GitHub secret, Bing and Google workflows do not claim to have registered/submitted anything, and the Cloudflare workflow does not claim enablement. Confirm statuses in Bing Webmaster Tools, Google Search Console/Google Cloud, and Cloudflare respectively.

Use narrow tests only: `node --test scripts/google-job-indexing-plan.test.mjs`, `node --check scripts/search-discovery-bing.mjs`, `node --check scripts/google-indexing-notify.mjs`, and `node --check scripts/cloudflare-crawler-hints.mjs`. No broad E2E suite is required for these changes.