import type { Metadata } from "next";
import Link from "next/link";
import { JobCollection } from "@/components/job-collection";
import { jobOpportunities } from "@/lib/jobs";
import { isEffectivelyOpen } from "@/lib/job-runtime";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Nigeria Job & Recruitment Deadlines",
  description: "Track verified application deadlines for open Nigerian government recruitment and private-sector opportunities with official source links.",
  alternates: { canonical: "/jobs/deadlines" }
};

export default function JobDeadlinesPage() {
  const open = jobOpportunities.filter((item) => isEffectivelyOpen(item));
  const dated = open.filter((item) => item.deadline).sort((a, b) => (a.deadline || "").localeCompare(b.deadline || ""));
  const ongoing = open.filter((item) => !item.deadline);

  return (
    <>
      <section className="section page-top jobs-section-top">
        <div className="container">
          <Link href="/jobs" className="back-link">← Jobs & Careers</Link>
          <span className="eyebrow">Deadline tracker</span>
          <h1>Applications that are open now.</h1>
          <p className="page-intro">Published closing dates first, followed by official career systems currently showing live vacancies without one shared closing date.</p>
        </div>
      </section>

      <section className="section jobs-open-section">
        <div className="container">
          <div className="minimal-section-heading">
            <div><span className="eyebrow">Closing dates</span><h2>Apply before these deadlines.</h2></div>
          </div>
          <JobCollection opportunities={dated} emptyText="No open opportunity with a published closing date is verified right now." />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="minimal-section-heading">
            <div><span className="eyebrow">Ongoing vacancy systems</span><h2>Live roles without one shared deadline.</h2><p>Check the individual role because each vacancy may close independently.</p></div>
          </div>
          <JobCollection opportunities={ongoing} />
        </div>
      </section>
    </>
  );
}
