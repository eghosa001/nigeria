import type { Metadata } from "next";
import Link from "next/link";
import { JobCollection } from "@/components/job-collection";
import { jobOpportunities } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Graduate Jobs in Nigeria 2026: Trainee & Entry-Level Programmes",
  description: "Verified graduate trainee programmes, entry-level careers and graduate job routes in Nigeria with qualifications, NYSC requirements and official links.",
  alternates: { canonical: "/jobs/graduate" }
};

export default function GraduateJobsPage() {
  const items = jobOpportunities.filter((item) =>
    [...item.audiences, item.employmentType, ...item.qualifications]
      .join(" ")
      .toLowerCase()
      .match(/graduate|entry.level|nysc/)
  );

  return (
    <>
      <section className="section page-top jobs-section-top">
        <div className="container">
          <Link href="/jobs" className="back-link">← Jobs & Careers</Link>
          <span className="eyebrow">Graduate careers</span>
          <h1>Graduate jobs and trainee programmes in Nigeria.</h1>
          <p className="page-intro">Compare degree class, NYSC, age and application requirements before opening the employer's official recruitment system.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="minimal-section-heading"><div><span className="eyebrow">Before applying</span><h2>Choose the right graduate pathway.</h2></div></div>
          <div className="home-updates-grid">
            <article className="home-update-card"><h3>Fresh graduate jobs with no experience</h3><p>Use the vacancy's actual education and experience requirements. Some graduate trainee programmes assess projects and potential; other entry-level posts still require direct work experience. Highlight SIWES, internship, NYSC or project evidence honestly instead of inventing a company history. <Link href="/jobs/guides/cv-format-nigeria">See the no-experience CV guide →</Link></p></article>
            <article className="home-update-card"><h3>Graduate trainee or graduate assistant?</h3><p>A corporate trainee programme, university graduate assistant position and employer careers page are different opportunities with different eligibility. Check the specific intake, degree class, location, required NYSC record, contract and closing date. A permanent careers portal does not mean a trainee vacancy is open now.</p></article>
            <article className="home-update-card"><h3>What should you prepare for applications?</h3><p>Have accurately named academic documents and a role-specific CV ready, but provide identity records only through a verified employer application route. Save a copy of the original advert and prepare for possible tests, interviews or background checks if that employer actually uses them. <Link href="/jobs/guides/graduate-job-application-checklist">Open the graduate application checklist →</Link></p></article>
          </div>
        </div>
      </section>
      <section className="section"><div className="container"><JobCollection opportunities={items} /></div></section>
    </>
  );
}

// Use the live Nigeria-calendar status rather than yesterday\u0027s prerendered snapshot.
export const dynamic = "force-dynamic";
