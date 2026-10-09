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
      <section className="section"><div className="container"><JobCollection opportunities={items} /></div></section>
    </>
  );
}

// Use the live Nigeria-calendar status rather than yesterday\u0027s prerendered snapshot.
export const dynamic = "force-dynamic";
