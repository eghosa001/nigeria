import type { Metadata } from "next";
import Link from "next/link";
import { getContentHealth } from "@/lib/content-health";

export const metadata: Metadata = { title: "Content health" };

const PAGE_SIZE = 24;

export default async function AdminContentHealthPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page: requested } = await searchParams;
  const health = getContentHealth();
  const grouped = new Map<string, { issue: (typeof health.issues)[number]; checks: number }>();
  for (const entry of health.issues) {
    const key = entry.href + "|" + entry.label;
    const previous = grouped.get(key);
    if (previous) previous.checks += 1;
    else grouped.set(key, { issue: entry, checks: 1 });
  }
  const records = [...grouped.values()];
  const pages = Math.max(1, Math.ceil(records.length / PAGE_SIZE));
  const number = Number(requested ?? "1");
  const page = Number.isSafeInteger(number) ? Math.min(pages, Math.max(1, number)) : 1;
  const visible = records.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
          <div><strong>{records.length}</strong><span>Records to review</span></div>
        </div>

        <section className="admin-panel">
          <div className="section-heading">
            <div><span className="eyebrow">Priority queue</span><h2>Records needing review</h2></div>
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
              {page > 1 ? <Link href={"/admin/health?page=" + (page - 1)}>← Previous</Link> : <span />}
              <span>Page {page} of {pages}</span>
              {page < pages ? <Link href={"/admin/health?page=" + (page + 1)}>Next →</Link> : <span />}
            </nav>
          ) : null}
        </section>
      </div>
    </section>
  );
}
