import type { Metadata } from "next";
import Link from "next/link";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JobCollection } from "@/components/job-collection";
import { jobOpportunities } from "@/lib/jobs";
import { getClosingSoonJobs } from "@/lib/job-runtime";

// Deadline-sensitive status must be evaluated on every request, not frozen at build time.
export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const items = getClosingSoonJobs(jobOpportunities, 7);
  return {
    title: "Jobs Closing This Week in Nigeria",
    description: "Verified Nigerian job and recruitment applications with published deadlines in the next seven days.",
    alternates: { canonical: "/jobs/closing-this-week" },
    robots: items.length ? undefined : { index: false, follow: true },
  };
}

export default function ClosingThisWeekPage() {
  const items = getClosingSoonJobs(jobOpportunities, 7);
  return (
    <>
      <section className="section page-top jobs-section-top"><div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Jobs & Careers", href: "/jobs" }, { label: "Closing this week" }]} />
        <span className="eyebrow">Deadline watch</span><h1>Jobs closing this week in Nigeria.</h1>
        <p className="page-intro">Only verified opportunities with a published deadline in the next seven days appear here.</p>
        <AnswerFirst title="What should you prioritise?" summary={items.length ? items.length + " verified opportunities have a published deadline within the next seven days." : "No verified opportunity currently has a published deadline in the next seven days."} facts={[{ label: "Closing soon", value: String(items.length) }, { label: "Window", value: "Next 7 days" }, { label: "Source", value: "Official employer or agency" }, { label: "Rule", value: "Eligibility before speed" }]} links={[{ href: "/jobs/deadlines", label: "All deadlines" }, { href: "/jobs/open-now", label: "All open jobs", primary: true }]} />
      </div></section>
      <section className="section"><div className="container"><JobCollection opportunities={items} emptyText="No verified application with a published deadline is closing in the next seven days." /></div></section>
      <section className="section"><div className="container"><Link href="/jobs">← Full Jobs & Careers directory</Link></div></section>
    </>
  );
}
