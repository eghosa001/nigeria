import { getEffectiveJobStatus, getEffectiveStatusLabel } from "@/lib/job-runtime";
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
          <div className="minimal-section-heading"><div><span className="eyebrow">Apply safely</span><h2>How to apply for government jobs in Nigeria.</h2></div></div>
          <div className="home-updates-grid">
            <article className="home-update-card"><h3>Confirm a federal recruitment is really open</h3><p>Find the responsible agency's own announcement and check its vacancy dates, eligibility, job category and exact application link. An old shortlist notice or a social-media post repeating last year's portal address is not proof that applications have reopened.</p></article>
            <article className="home-update-card"><h3>What happens after an application deadline?</h3><p>Recruitment may progress through shortlist, aptitude test or CBT, document check, medical screening or training, depending on the agency. Those are not interchangeable stages. Keep your application reference and only follow instructions published by the recruiting authority; do not pay an agent for an alleged shortlist spot.</p></article>
            <article className="home-update-card"><h3>How to check genuine federal career requirements</h3><p>Qualification, age, citizenship, location and certificate requirements vary by scheme. Read the actual entry instead of assuming a universal federal-jobs form. <Link href="/jobs/guides/job-scam-red-flags-nigeria">Check recruitment fraud warnings →</Link> and <Link href="/jobs/guides/graduate-job-application-checklist">prepare your documents →</Link>.</p></article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="jobs-tracker-list">
            {governmentOpportunities.map((item) => (
              <article key={item.slug} className="jobs-tracker-row">
                <div><span className={"job-status job-status-" + getEffectiveJobStatus(item)}>{getEffectiveStatusLabel(item)}</span></div>
                <div><small>{item.organization}</small><h2><Link href={"/jobs/" + item.slug}>{item.title}</Link></h2><p>{item.summary}</p>{item.nextMilestone ? <strong>{item.nextMilestone}</strong> : null}</div>
                <div><span>{item.deadline ? "Deadline" : "Last checked"}</span><b>{item.deadline || item.verifiedAt}</b><Link href={"/jobs/" + item.slug}>Requirements →</Link></div>
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

// Use the live Nigeria-calendar status rather than yesterday\u0027s prerendered snapshot.
export const dynamic = "force-dynamic";
