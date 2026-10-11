import type { SearchConsoleApiIssue } from "@/lib/search-console-hourly";

const googleCloudApiLibrary = "https://console.cloud.google.com/apis/library/searchconsole.googleapis.com";

/** Links only to Google's own API library. No credentials or project secrets. */
export function SearchConsoleConnectionHelp({ issue }: { issue?: SearchConsoleApiIssue }) {
  if (!issue) return null;

  if (issue.code === "api-disabled") {
    const project = issue.projectNumber && /^\d{5,20}$/.test(issue.projectNumber)
      ? issue.projectNumber : null;
    const link = googleCloudApiLibrary + (project ? "?project=" + project : "");
    return (
      <div className="admin-empty" role="status">
        <strong>Action required in Google Cloud: enable the Search Console API</strong>
        <p>
          Google has confirmed that the API is disabled for the project authenticating this website.
          The dashboard cannot retrieve impressions until Google enables that API.
          {project ? <> Google Cloud project: <code>{project}</code>.</> : null}
        </p>
        <p>
          <a href={link} target="_blank" rel="noopener noreferrer" className="admin-refresh-button">
            Open Google Cloud · Enable Search Console API ↗
          </a>
        </p>
        <p>
          Sign in to the Google account that owns that Cloud project, select the
          {project ? " project shown above" : " project that owns your reporting service account"},
          {" "}press <strong>Enable</strong>, wait a few minutes, then use <strong>Check Google now</strong>.
          Enabling the API does not create a paid SEO subscription.
        </p>
        <p>
          If the next error says the service account lacks property permission,
          grant its email read access to <code>sc-domain:mynigeriaguide.com</code> in
          Google Search Console → Settings → Users and permissions.
        </p>
      </div>
    );
  }

  if (issue.code === "property-permission") {
    return (
      <div className="admin-empty" role="status">
        <strong>Action required: Google Search Console property access</strong>
        <p>
          The API responded, but the server service account is not allowed to read
          <code> sc-domain:mynigeriaguide.com</code>. In
          {" "}<a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
            Google Search Console ↗
          </a>, open Settings → Users and permissions and add the service-account email
          configured in Cloudflare as <code>GSC_SERVICE_ACCOUNT_EMAIL</code> or
          {" "}<code>GA4_SERVICE_ACCOUNT_EMAIL</code>.
        </p>
        <p>No new SEO subscription or data import is necessary.</p>
      </div>
    );
  }

  return null;
}
