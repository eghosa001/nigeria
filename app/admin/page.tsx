import type { Metadata } from "next";
import Link from "next/link";
import { agencies, categories, publicServices, services } from "@/lib/data";
import { isReportBackendConfigured } from "@/lib/report-backend";

export const metadata: Metadata = { title: "Dashboard" };

export default function AdminPage() {
  const verified = services.filter((service) => service.status === "verified");
  const conflicts = services.filter((service) => service.status === "conflict");
  const reviews = services.filter((service) => service.status === "review");
  const foreignVisas = publicServices.filter((service) => service.category === "Foreign visas");
  const sourceCount = new Set(services.flatMap((service) => service.sources.map((source) => source.url))).size;
  const backendConnected = isReportBackendConfigured();

  const categoryRows = categories
    .map((category) => ({
      name: category.name,
      count: publicServices.filter((service) => service.category === category.name).length,
    }))
    .filter((row) => row.count > 0)
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return (
    <section className="section page-top admin-page">
      <div className="container">
        <div className="admin-heading">
          <div>
            <span className="eyebrow">Operations</span>
            <h1>Content & verification dashboard</h1>
            <p className="page-intro">Review the whole guide library, foreign visas, official sources and published updates from one place.</p>
          </div>
          <span className={"db-state " + (backendConnected ? "connected" : "offline")}>
            {backendConnected ? "Correction backend connected" : "Read-only operations mode"}
          </span>
        </div>

        <div className="metric-grid">
          <div><strong>{publicServices.length}</strong><span>Public guides</span></div>
          <div><strong>{verified.length}</strong><span>Verified</span></div>
          <div><strong>{conflicts.length}</strong><span>Conflicts</span></div>
          <div><strong>{reviews.length}</strong><span>Review queue</span></div>
          <div><strong>{foreignVisas.length}</strong><span>Foreign visas</span></div>
          <div><strong>{sourceCount}</strong><span>Official source URLs</span></div>
        </div>

        <div className="admin-action-grid">
          <Link href="/admin/services"><span>Content library</span><strong>Browse every guide</strong><small>Search by category, status or keyword and inspect the full content record.</small><i>→</i></Link>
          <Link href="/admin/foreign-visas"><span>International</span><strong>Foreign visa centre</strong><small>Review all destination guides, fees, documents and source coverage together.</small><i>→</i></Link>
          <Link href="/admin/sources"><span>Verification</span><strong>Official sources</strong><small>See source coverage and the URLs under automatic content monitoring.</small><i>→</i></Link>
          <Link href="/admin/updates"><span>Publishing</span><strong>Verified updates</strong><small>Review the fee, process and clarification updates currently surfaced publicly.</small><i>→</i></Link>
        </div>

        <div className="admin-two-column">
          <section className="admin-panel">
            <div className="section-heading">
              <div><span className="eyebrow">Categories</span><h2>Guide coverage</h2></div>
              <Link href="/admin/services">All guides →</Link>
            </div>
            <div className="admin-category-list">
              {categoryRows.map((row) => (
                <Link key={row.name} href={"/services?category=" + encodeURIComponent(row.name)}>
                  <span>{row.name}</span><strong>{row.count}</strong>
                </Link>
              ))}
            </div>
          </section>

          <section className="admin-panel">
            <div className="section-heading">
              <div><span className="eyebrow">Editorial queue</span><h2>Needs attention</h2></div>
            </div>
            {reviews.length || conflicts.length ? (
              <div className="review-table">
                {[...reviews, ...conflicts].slice(0, 12).map((service) => (
                  <Link href={"/admin/services/" + service.slug} key={service.slug}>
                    <span><strong>{service.shortTitle}</strong><small>{service.category} · {service.agencySlug.toUpperCase()}</small></span>
                    <span>{service.status}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="admin-empty"><strong>No unresolved public conflicts.</strong><p>Review-status guides remain unpublished until verified.</p></div>
            )}
          </section>
        </div>

        <section className="admin-panel admin-safety-note">
          <span className="eyebrow">Protected operations</span>
          <h2>Admin access and publishing are separated</h2>
          <p>The whole admin area requires the private passphrase. Guide edits remain review-only: a successful edit creates a GitHub pull request and does not change production until the review checks pass and the change is merged.</p>
        </section>
      </div>
    </section>
  );
}
