import type { Metadata } from "next";
import Link from "next/link";
import { agencies, publicServices, services } from "@/lib/data";
import { isReportBackendConfigured } from "@/lib/report-backend";

export const metadata: Metadata = {
  title: "Verification dashboard",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const verified = services.filter((service) => service.status === "verified");
  const conflicts = services.filter((service) => service.status === "conflict");
  const reviews = services.filter((service) => service.status === "review");
  const sourceCount = new Set(services.flatMap((service) => service.sources.map((source) => source.url))).size;
  const backendConnected = isReportBackendConfigured();

  return (
    <section className="section page-top admin-page">
      <div className="container">
        <div className="admin-heading">
          <div>
            <span className="eyebrow">Operations</span>
            <h1>Verification dashboard</h1>
            <p className="page-intro">Read-only by design. The public site does not require a database; persistent correction reports are optional.</p>
          </div>
          <span className={"db-state " + (backendConnected ? "connected" : "offline")}>
            {backendConnected ? "Report backend connected" : "No report backend required"}
          </span>
        </div>

        <div className="metric-grid">
          <div><strong>{publicServices.length}</strong><span>Public guides</span></div>
          <div><strong>{verified.length}</strong><span>Verified</span></div>
          <div><strong>{conflicts.length}</strong><span>Conflicts</span></div>
          <div><strong>{reviews.length}</strong><span>Review queue</span></div>
          <div><strong>{agencies.length}</strong><span>Agencies</span></div>
          <div><strong>{sourceCount}</strong><span>Official source URLs</span></div>
        </div>

        <section className="admin-panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Editorial queue</span>
              <h2>Guides awaiting verification</h2>
            </div>
          </div>
          <div className="review-table">
            {reviews.map((service) => (
              <div key={service.slug}>
                <span>
                  <strong>{service.shortTitle}</strong>
                  <small>{service.category} · {service.agencySlug.toUpperCase()}</small>
                </span>
                <span>{service.sources.length} source{service.sources.length === 1 ? "" : "s"}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-panel">
          <span className="eyebrow">Publishing rule</span>
          <h2>Review status never publishes</h2>
          <p>Only verified guides and deliberately marked official-source conflicts can appear in public search, agency pages or the XML sitemap.</p>
          <Link className="text-link" href="/services">Inspect public directory →</Link>
        </section>
      </div>
    </section>
  );
}
