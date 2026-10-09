import type { Metadata } from "next";
import Link from "next/link";
import { JobCollection } from "@/components/job-collection";
import { jobOpportunities } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Internships & SIWES Opportunities in Nigeria",
  description: "Verified internships, SIWES, industrial training, pre-NYSC and student career programmes in Nigeria with eligibility and official application routes.",
  alternates: { canonical: "/jobs/internships" }
};

export default function InternshipJobsPage() {
  const items = jobOpportunities.filter((item) =>
    [...item.audiences, item.employmentType, ...item.sourceNotes]
      .join(" ")
      .toLowerCase()
      .match(/intern|siwes|student|industrial training|pre-nysc/)
  );

  return (
    <>
      <section className="section page-top jobs-section-top">
        <div className="container">
          <Link href="/jobs" className="back-link">← Jobs & Careers</Link>
          <span className="eyebrow">Students & internships</span>
          <h1>Internships, SIWES and pre-NYSC opportunities.</h1>
          <p className="page-intro">Official student pathways with course, CGPA, school-letter and programme requirements where the employer publishes them.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="minimal-section-heading"><div><span className="eyebrow">Eligibility first</span><h2>Student internships, graduate internships and SIWES are different.</h2></div></div>
          <div className="home-updates-grid">
            <article className="home-update-card"><h3>Internships for Nigerian undergraduates</h3><p>Check that the host accepts students at your academic stage and whether your institution must provide an industrial-training or SIWES letter. Some roles specify departments, semester windows, course requirements and location. A broad careers portal may not list an active student placement; open the actual internship notice before applying.</p></article>
            <article className="home-update-card"><h3>Paid and remote internships</h3><p>Do not assume every internship offers a salary, allowance or fully remote arrangement. Verify the employer's actual offer, place of work, time zone and working hours. Never pay a recruiter to 'reserve' a genuine position. If a salary or accommodation allowance is absent from the official notice, it remains unknown until confirmed.</p></article>
            <article className="home-update-card"><h3>Internships after graduation</h3><p>Some programmes accept recent graduates while others require current university enrolment. Separate these groups before applying so you do not waste time on an ineligible role. <Link href="/jobs/guides/graduate-job-application-checklist">Prepare your application evidence →</Link> or <Link href="/jobs/graduate">compare graduate programmes →</Link>.</p></article>
          </div>
        </div>
      </section>
      <section className="section"><div className="container"><JobCollection opportunities={items} /></div></section>
    </>
  );
}

// Use the live Nigeria-calendar status rather than yesterday\u0027s prerendered snapshot.
export const dynamic = "force-dynamic";
