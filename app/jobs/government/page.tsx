import type { Metadata } from "next";
import Link from "next/link";
import { governmentOpportunities } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Nigeria Government Jobs & Recruitment Tracker",
  description: "Track verified Nigerian federal government recruitment status, requirements, screening, CBT, shortlist and training stages with official application links.",
  alternates: { canonical: "/jobs/government" }
};

export default function GovernmentJobsPage() {
  return (
    <>
      <section className="section page-top jobs-section-top">
        <div className="container">
          <Link href="/jobs" className="back-link">← Jobs & Careers</Link>
          <span className="eyebrow">Government recruitment</span>
          <h1>Nigeria government recruitment tracker</h1>
          <p className="page-intro">We keep the full recruitment journey visible — application, shortlist, CBT, screening and training — so an old vacancy does not look open when it is not.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="jobs-tracker-list">
            {governmentOpportunities.map((item) => (
              <article key={item.slug} className="jobs-tracker-row">
                <div><span className={"job-status job-status-" + item.status}>{item.statusLabel}</span></div>
                <div><small>{item.organization}</small><h2><Link href={"/jobs/" + item.slug}>{item.title}</Link></h2><p>{item.summary}</p>{item.nextMilestone ? <strong>{item.nextMilestone}</strong> : null}</div>
                <div><span>Last checked</span><b>{item.verifiedAt}</b><Link href={"/jobs/" + item.slug}>Requirements →</Link></div>
              </article>
            ))}
          </div>
          <div className="jobs-editorial-note">
            <strong>Why closed recruitments stay here</strong>
            <p>People continue searching for shortlists, screening dates and next steps after applications close. Keeping one verified page prevents stale “apply now” information from replacing the real current stage.</p>
          </div>
        </div>
      </section>
    </>
  );
}
