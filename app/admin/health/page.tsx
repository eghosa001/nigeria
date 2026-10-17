import type { Metadata } from "next";
import Link from "next/link";
import { getContentHealth } from "@/lib/content-health";

export const metadata: Metadata = { title: "Content health" };

const PAGE_SIZE = 24;

export default async function AdminContentHealthPage({ searchParams }: { searchParams: Promise<{ page?: string; pillar?: string }> }) {
  const { page: requested, pillar: requestedPillar } = await searchParams;
  const pillar = requestedPillar === "Services" || requestedPillar === "Jobs" || requestedPillar === "Movies" || requestedPillar === "Tour" || requestedPillar === "System" ? requestedPillar : "All";
  const health = getContentHealth();
  const grouped = new Map<string, { issue: (typeof health.issues)[number]; checks: number }>();
  for (const entry of health.issues) {
    const key = entry.href + "|" + entry.label;
    const previous = grouped.get(key);
    if (previous) previous.checks += 1;
    else grouped.set(key, { issue: entry, checks: 1 });
  }
  const allRecords = [...grouped.values()];
  const records = pillar === "All" ? allRecords : allRecords.filter((entry) => entry.issue.pillar === pillar);
  const servicesDue = allRecords.filter((entry) => entry.issue.pillar === "Services" && entry.issue.state === "due").length;
  const servicesStale = allRecords.filter((entry) => entry.issue.pillar === "Services" && entry.issue.state === "stale").length;
  const pages = Math.max(1, Math.ceil(records.length / PAGE_SIZE));
  const number = Number(requested ?? "1");
  const page = Number.isSafeInteger(number) ? Math.min(pages, Math.max(1, number)) : 1;
  const visible = records.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="section page-top admin-page">
      <div className="container">
        <span className="eyebrow">Freshness control</span>
        <h1>Content health</h1>
        <p className="page-intro">A source-review queue, not a list of proven inaccuracies. Keep the recorded review dates unchanged until the actual issuer evidence has been rechecked. Service guides become due after 10 days and older-review after 30 days.</p>
        <p>Services requiring attention: <strong>{servicesDue} due for recheck</strong> and <strong>{servicesStale} with reviews older than 30 days</strong>. A website deployment does not count as a source review.</p>
        <nav className="minimal-inline-links" aria-label="Filter freshness by content pillar">
          <Link href="/admin/health">All pillars</Link>
          <Link href="/admin/health?pillar=Services">Services</Link>
          <Link href="/admin/health?pillar=Jobs">Jobs</Link>
          <Link href="/admin/health?pillar=Movies">Movies</Link>
          <Link href="/admin/health?pillar=Tour">Tour Nigeria</Link>
        </nav>

        <div className="metric-grid">
          <div><strong>{health.stale.length}</strong><span>Stale</span></div>
          <div><strong>{health.due.length}</strong><span>Due soon</span></div>
          <div><strong>{health.unknown.length}</strong><span>Missing dates</span></div>
          <div><strong>{allRecords.length}</strong><span>Records to review</span></div>
        </div>

        <section className="admin-panel">
          <div className="section-heading">
            <div><span className="eyebrow">Priority queue</span><h2>{pillar === "All" ? "Records needing review" : pillar + " awaiting source checks"}</h2></div>
            <Link href="/latest">Public latest hub →</Link>
          </div>
          {records.length ? (
            <div className="review-table">
              {visible.map(({ issue: entry, checks }) => (
                <Link href={entry.href} key={entry.href + "|" + entry.label}>
                  <span>
                    <strong>{entry.label}</strong>
                    <small>{entry.pillar} · {checks > 1 ? checks + " source checks due" : entry.detail}</small>
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
          {pages > 1 ? (
            <nav className="admin-pagination" aria-label="Content review pages">
              {page > 1 ? <Link href={"/admin/health?page=" + (page - 1) + (pillar === "All" ? "" : "&pillar=" + pillar)}>← Previous</Link> : <span />}
              <span>Page {page} of {pages}</span>
              {page < pages ? <Link href={"/admin/health?page=" + (page + 1) + (pillar === "All" ? "" : "&pillar=" + pillar)}>Next →</Link> : <span />}
            </nav>
          ) : null}
        </section>
      </div>
    </section>
  );
}
