import type { Metadata } from "next";
import Link from "next/link";
import { JobCollection } from "@/components/job-collection";
import { jobOpportunities } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Engineering & Technical Jobs in Nigeria",
  description: "Verified engineering, technical, energy, manufacturing and technology career routes in Nigeria with qualifications and official application links.",
  alternates: { canonical: "/jobs/engineering" }
};

export default function EngineeringJobsPage() {
  const items = jobOpportunities.filter((item) =>
    [...item.fields, ...item.qualifications]
      .join(" ")
      .toLowerCase()
      .match(/engineer|technical|technology|manufactur|energy|mechanical|electrical|petroleum|chemical/)
  );

  return (
    <>
      <section className="section page-top jobs-section-top">
        <div className="container">
          <Link href="/jobs" className="back-link">← Jobs & Careers</Link>
          <span className="eyebrow">Engineering & technical</span>
          <h1>Engineering and technical careers in Nigeria.</h1>
          <p className="page-intro">Energy, manufacturing, telecoms, fintech, government technical recruitment and graduate pathways gathered from responsible official sources.</p>
        </div>
      </section>
      <section className="section"><div className="container"><JobCollection opportunities={items} /></div></section>
    </>
  );
}
