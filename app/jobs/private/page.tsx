import type { Metadata } from "next";
import Link from "next/link";
import { privateOpportunities } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Verified Private-Sector Jobs, Graduate Programmes & Internships in Nigeria",
  description: "Official career routes for reputable Nigerian employers, including graduate programmes, SIWES, internships and professional vacancies.",
  alternates: { canonical: "/jobs/private" }
};

export default function PrivateJobsPage() {
  const live = privateOpportunities.filter((item) => item.status === "open");
  const pathways = privateOpportunities.filter((item) => item.status !== "open");

  return (
    <>
      <section className="section page-top jobs-section-top">
        <div className="container">
          <Link href="/jobs" className="back-link">← Jobs & Careers</Link>
          <span className="eyebrow">Private institutions</span>
          <h1>Reputable employer career pathways</h1>
          <p className="page-intro">Start with the employer's own careers system. We explain who the route is for, what to prepare and where the official application lives.</p>
        </div>
      </section>
      {live.length ? (
        <section className="section jobs-open-section">
          <div className="container">
            <div className="minimal-section-heading">
              <div><span className="eyebrow">Live vacancies</span><h2>Employers hiring now.</h2><p>These official career systems currently expose active Nigeria vacancies.</p></div>
            </div>
            <div className="jobs-private-grid">
              {live.map((item) => (
                <article className="job-card job-card-open" key={item.slug}>
                  <div className="job-card-top"><span className={"job-status job-status-" + item.status}>{item.statusLabel}</span><span>{item.employmentType}</span></div>
                  <div className="job-card-body">
                    <p className="job-organisation">{item.organization}</p>
                    <h2><Link href={"/jobs/" + item.slug}>{item.title}</Link></h2>
                    <p>{item.summary}</p>
                    <div className="job-tags">{item.fields.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                  <div className="job-card-footer"><span>Checked {item.verifiedAt}</span><Link href={"/jobs/" + item.slug}>View live route →</Link></div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container">
          <div className="minimal-section-heading">
            <div><span className="eyebrow">Career programmes</span><h2>Graduate, internship and professional pathways.</h2></div>
          </div>
          <div className="jobs-private-grid">
            {pathways.map((item) => (
              <article className="job-card" key={item.slug}>
                <div className="job-card-top"><span className={"job-status job-status-" + item.status}>{item.statusLabel}</span><span>{item.employmentType}</span></div>
                <div className="job-card-body">
                  <p className="job-organisation">{item.organization}</p>
                  <h2><Link href={"/jobs/" + item.slug}>{item.title}</Link></h2>
                  <p>{item.summary}</p>
                  <div className="job-tags">{item.audiences.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <div className="job-card-footer"><span>Checked {item.verifiedAt}</span><Link href={"/jobs/" + item.slug}>View guide →</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
