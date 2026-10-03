import type { Metadata } from "next";
import Link from "next/link";
import { JobCollection } from "@/components/job-collection";
import { jobOpportunities } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Graduate Jobs & Trainee Programmes in Nigeria",
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
      <section className="section"><div className="container"><JobCollection opportunities={items} /></div></section>
    </>
  );
}
