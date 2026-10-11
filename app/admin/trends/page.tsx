import type { Metadata } from "next";
import Link from "next/link";
import { hasAdminSession } from "@/lib/admin-access";
import { readAdminTrends, X_REVIEW_LINKS } from "@/lib/editorial-trend-reader";
import { AdminTrendReviewBoard } from "@/components/admin-trend-review-board";
import styles from "@/components/admin-trend-review-board.module.css";

export const metadata: Metadata = {
  title: "Editorial Trend Radar",
  description: "Private MyNigeriaGuide editorial dashboard for reviewing Nigeria Google Trends, news research, and source-verification leads across movies, services, tourism and jobs.",
  robots: { index: false, follow: false, nocache: true },
};
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminTrendsPage() {
  // Admin layout renders the access gate, but checking here too avoids
  // making external fetches for an unauthenticated parallel-rendered page.
  if (!await hasAdminSession()) return null;

  const snapshot = await readAdminTrends();

  return (
    <section className="section page-top admin-page">
      <div className="container">
        <div className="admin-heading">
          <div>
            <span className="eyebrow">Editorial intelligence · Nigeria</span>
            <h1>Trend research & review</h1>
            <p className="page-intro">
              Find recent Nigerian stories across Movies, Services, Tour Nigeria and Jobs.
              See which free research sources responded, examine originals and shortlist
              leads for further verification before updating MyNigeriaGuide.
            </p>
          </div>
          <Link href="/admin" className="button inline-button">Back to admin</Link>
        </div>

        <AdminTrendReviewBoard snapshot={snapshot} />

        <section className="admin-panel top-gap" aria-labelledby="twitter-review-links">
          <div className="section-heading">
            <div><span className="eyebrow">Twitter/X priority</span><h2 id="twitter-review-links">Direct public-conversation research</h2></div>
          </div>
          <p>
            X provides its own search interface for current discussions. These links are
            manual research tools, not a free authenticated X API, nationwide rankings
            or proof of how many people saw a post. X may require account sign-in.
          </p>
          <div className={styles.links}>
            {X_REVIEW_LINKS.map((item) => (
              <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer">
                {item.label} on X ↗
              </a>
            ))}
          </div>
          <div className={styles.links} style={{ marginTop: "1rem" }}>
            <a href="https://getdaytrends.com/nigeria/" target="_blank" rel="noopener noreferrer">GetDayTrends Nigeria ↗</a>
            <a href="https://trends24.in/nigeria/" target="_blank" rel="noopener noreferrer">Trends24 Nigeria timeline ↗</a>
          </div>
          <p className={styles.note}>Third-party X history sites are for browsing and manual comparison only. Do not scrape or republish their data without permission.</p>
        </section>

        <section className="admin-panel top-gap" aria-labelledby="trend-workflow-archive">
          <div className="section-heading"><div><span className="eyebrow">Automated research</span><h2 id="trend-workflow-archive">Twice-daily archive & publishing policy</h2></div></div>
          <p>
            The free GitHub Actions research collector runs on a 07:13 and 19:13 WAT
            schedule and saves separate JSON/Markdown artifacts for ten days.
            <strong> The report shown above is a fresh on-demand sample, not an import of
            previous GitHub Actions artifacts.</strong> Open the workflow to inspect
            those dated files and source errors.
          </p>
          <div className={styles.links}>
            <a href="https://github.com/eghosa001/nigeria/actions/workflows/free-nigeria-trend-radar.yml" target="_blank" rel="noopener noreferrer">
              View scheduled research reports on GitHub ↗
            </a>
            <Link href="/admin/health">Content freshness dashboard →</Link>
            <Link href="/admin/explore">Tour destination inventory →</Link>
            <Link href="/admin/services">Verified service library →</Link>
          </div>
          <p className={styles.note}>
            Shortlisting only creates a note in the browser and never approves or publishes a story.
            Before editing a live guide, independently confirm any key dates, eligibility,
            official destination or source; look for an existing canonical page before creating one.
            GitHub PR review and site quality checks remain required.
          </p>
        </section>
      </div>
    </section>
  );
}
