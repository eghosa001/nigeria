import type { Metadata } from "next";
import Link from "next/link";
import { getContentHealth } from "@/lib/content-health";

export const metadata: Metadata = { title: "Content health" };

export default function AdminContentHealthPage() {
  const health = getContentHealth();

  return (
    <section className="section page-top admin-page">
      <div className="container">
        <span className="eyebrow">Freshness control</span>
        <h1>Content health</h1>
        <p className="page-intro">One queue for overdue source checks across services, jobs, movies, Tour Nigeria and the approved YouTube publisher sync.</p>

        <div className="metric-grid">
          <div><strong>{health.stale.length}</strong><span>Stale</span></div>
          <div><strong>{health.due.length}</strong><span>Due soon</span></div>
          <div><strong>{health.unknown.length}</strong><span>Missing dates</span></div>
          <div><strong>{health.issues.length}</strong><span>Total attention items</span></div>
        </div>

        <section className="admin-panel">
          <div className="section-heading">
            <div><span className="eyebrow">Priority queue</span><h2>Records needing review</h2></div>
            <Link href="/latest">Public latest hub →</Link>
          </div>
          {health.issues.length ? (
            <div className="review-table">
              {health.issues.map((entry, index) => (
                <Link href={entry.href} key={entry.pillar + entry.label + entry.checkedAt + index}>
                  <span>
                    <strong>{entry.label}</strong>
                    <small>{entry.pillar} · {entry.detail}</small>
                  </span>
                  <span>{entry.state} · {entry.checkedAt || "no date"}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="admin-empty">
              <strong>All tracked content is within policy.</strong>
              <p>No source or catalog review is currently overdue.</p>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
