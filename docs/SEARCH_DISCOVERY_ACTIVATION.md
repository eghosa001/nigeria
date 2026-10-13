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

## Google Workload Identity Federation (keyless GitHub OIDC) — preferred

If Google Cloud says **"Organization policy does not allow"** or **"Service account key creation is disabled"**, do NOT weaken the organization policy. Newer Google Cloud organizations enforce `iam.disableServiceAccountKeyCreation` by default. Google and GitHub recommend **Workload Identity Federation** instead: GitHub Actions exchanges a short-lived OIDC token for a Google OAuth access token. No downloaded JSON key is required.

The existing `Google Indexing API - Verified JobPosting Only` workflow is configured to use this **keyless** authentication automatically when two GitHub Actions repository *variables* are populated.

### Setup in Google Cloud

1. Select the Google Cloud project containing the **Indexing API**, and enable **IAM API**, **Security Token Service API**, and **IAM Service Account Credentials API** if prompted. A service account is still required, but **do not create a private key**.
2. Open [Workload Identity Federation](https://console.cloud.google.com/iam-admin/workload-identity-pools) and **Create Pool** with ID `mynigeriaguide-github`.
3. Create a provider in that pool with ID `github-nigeria`, type **OpenID Connect**, issuer `https://token.actions.githubusercontent.com/`, and **default audience**.
4. Set **attribute mappings**:
    - `google.subject = assertion.sub`
    - `attribute.repository = assertion.repository`
5. Set **attribute condition** (this restricts trust to the exact GitHub repository and production branch using non-reassignable GitHub numeric IDs):

   ```text
   assertion.repository_id == '1391565802' && assertion.repository_owner_id == '211810058' && assertion.ref == 'refs/heads/main'
   ```

6. Save the pool/provider. Grant the Google service account **Workload Identity User** to exactly the matching repository identity. In the console, select the pool > **Grant access** > **Service account impersonation**, choose the existing `mynigeriaguide-indexing` service account, and filter `attribute.repository = eghosa001/nigeria`. If the UI cannot express this filter, use the service-account **Permissions/Manage access** panel and grant `roles/iam.workloadIdentityUser` to:

   ```text
   principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/mynigeriaguide-github/attribute.repository/eghosa001/nigeria
   ```

   Replace `PROJECT_NUMBER` with your project's **numeric** project number (not the textual project ID). **Do not grant the pool unrestricted access.**

7. In [Google Search Console](https://search.google.com/search-console), select `sc-domain:mynigeriaguide.com`, then add the **service account email** as an **Owner**. Workload Identity Federation does not remove the Indexing API's independent site-ownership requirement.

### Setup in GitHub (no credentials/secrets)

Open [GitHub repository Actions variables](https://github.com/eghosa001/nigeria/settings/variables/actions) and add **two repository variables**, not secrets:

- `GCP_WORKLOAD_IDENTITY_PROVIDER` — copy the exact provider **resource name** from Google Cloud: `projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/mynigeriaguide-github/providers/github-nigeria`.
- `GCP_INDEXING_SERVICE_ACCOUNT` — the full `mynigeriaguide-indexing@PROJECT_ID.iam.gserviceaccount.com` email address.

These values are identifiers, not private keys. The workflow uses `google-github-actions/auth@v3` and `id-token: write` only on the `main` branch, requests only the `https://www.googleapis.com/auth/indexing` scope, and submits only eligible verified `JobPosting` URLs. Run [the workflow](https://github.com/eghosa001/nigeria/actions/workflows/google-job-indexing.yml) after setup. Google IAM changes may need a few minutes to propagate.

If the organization also blocks creation of service accounts or identity pools/providers, **a Cloud organization administrator must authorize that restricted configuration**. Do not work around a separate policy prohibition.

## Google Indexing API: eligible job postings only

Google's Indexing API is explicitly **not** for ordinary web pages, general career portals, movies, universities, tourism guides or services. It may be used only for actual `JobPosting` and qualifying livestream `BroadcastEvent` pages. Only presently active, indexable, sourced, authorized *vacancy* records generating `JobPosting` JSON-LD are eligible here.

1. In Google Cloud, create/select a project and enable the **Indexing API**.
2. Create a service account. Add its email as an **Owner** of the verified MyNigeriaGuide Search Console property. Follow Google's quota and approval process.
3. Prefer the keyless Workload Identity Federation steps above. Downloaded JSON keys are unnecessary. The older `GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON` secret remains a compatibility fallback only if organizational policy expressly allows service account keys. Never commit JSON or private keys.
4. Run workflow **Google Indexing API - Verified JobPosting Only**, or let its scheduled/diff-triggered run execute. It checks the deployed commit before notifying Google and sends only eligible pages changed since the last successful checkpoint.

Default Google initial quota is 200 publish requests/day/project; the code caps each run at 100 and never uses multiple service accounts to evade limits. Submissions only return Google acceptance, not an indexed result. When a vacancy expires but its page remains accessible, the workflow intentionally does not send false `URL_DELETED` notifications. Google can observe `validThrough` and the page removing structured data.

## Validation and account-blocked status

Without the necessary Bing secret and without either Google OIDC variables or authorized legacy credentials, the workflows do not claim to have registered/submitted anything, and the Cloudflare workflow does not claim enablement. Confirm statuses in Bing Webmaster Tools, Google Search Console/Google Cloud, and Cloudflare respectively.

Use narrow tests only: `node --test scripts/google-job-indexing-plan.test.mjs`, `node --check scripts/search-discovery-bing.mjs`, `node --check scripts/google-indexing-notify.mjs`, and `node --check scripts/cloudflare-crawler-hints.mjs`. No broad E2E suite is required for these changes.