import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/data";
import { isReportBackendConfigured } from "@/lib/report-backend";

export const metadata: Metadata = { title: "Dashboard" };

export default function AdminPage() {
  // This entry page deliberately avoids importing the Movies/YouTube, Tour,
  // Jobs, analytics or full freshness catalogs. Their dedicated workspaces
  // load only after the editor opens them.
  const needsReview = services.filter((service) => service.status === "review" || service.status === "conflict");
  const recentAttention = needsReview.slice(0, 5);

  return (
    <section className="section page-top admin-page admin-home">
      <div className="container">
        <div className="admin-heading">
          <div>
            <span className="eyebrow">MyNigeriaGuide · Admin</span>
            <h1>Overview</h1>
            <p className="page-intro">Choose a workspace or review something needing attention.</p>
          </div>
          <span className={"db-state " + (isReportBackendConfigured() ? "connected" : "offline")}>
            {isReportBackendConfigured() ? "Corrections connected" : "Corrections read-only"}
          </span>
        </div>

        <section className="admin-panel" aria-labelledby="admin-actions-title">
          <div className="section-heading">
            <div><span className="eyebrow">Quick access</span><h2 id="admin-actions-title">Manage content</h2></div>
          </div>
          <nav className="admin-action-grid admin-home-actions" aria-label="Content workspaces">
            <Link href="/admin/entertainment"><span>Movies</span><strong>Entertainment</strong><small>Films, publishers and release records</small><i>→</i></Link>
            <Link href="/admin/services"><span>Services</span><strong>Guides</strong><small>Records, corrections and sources</small><i>→</i></Link>
            <Link href="/admin/explore"><span>Tour Nigeria</span><strong>Destinations</strong><small>Guides and place records</small><i>→</i></Link>
            <Link href="/jobs"><span>Jobs & Careers</span><strong>Opportunities</strong><small>View the published job catalog</small><i>↗</i></Link>
          </nav>
        </section>

        <section className="admin-panel" aria-labelledby="admin-review-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Editorial attention · {needsReview.length}</span>
              <h2 id="admin-review-title">Guides awaiting resolution</h2>
            </div>
            <Link href="/admin/services">Open all guides →</Link>
          </div>
          {recentAttention.length ? (
            <div className="review-table">
              {recentAttention.map((service) => (
                <Link href={"/admin/services/" + service.slug} key={service.slug}>
                  <span><strong>{service.shortTitle}</strong><small>{service.category}</small></span>
                  <span>{service.status === "conflict" ? "Conflicting sources" : "Needs review"}</span>
                </Link>
              ))}
              {needsReview.length > recentAttention.length ? (
                <p className="analytics-clean-note">{needsReview.length - recentAttention.length} more guides are in the Services workspace.</p>
              ) : null}
            </div>
          ) : <div className="admin-empty">No service guides are currently marked for review or conflict.</div>}
        </section>

        <nav className="minimal-inline-links admin-home-tools" aria-label="Monitoring and operations">
          <Link href="/admin/visits">Visits &amp; discovery</Link>
          <Link href="/admin/health">Freshness queue</Link>
          <Link href="/admin/trends">Trend radar</Link>
          <Link href="/admin/sources">Sources</Link>
          <Link href="/admin/updates">Updates</Link>
          <Link href="/admin/foreign-visas">Foreign visas</Link>
        </nav>
      </div>
    </section>
  );
}
