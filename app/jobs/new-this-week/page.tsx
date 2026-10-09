import type { Metadata } from "next";
import Link from "next/link";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JobCollection } from "@/components/job-collection";
import { jobOpportunities } from "@/lib/jobs";
import { getRecentlyPostedJobs } from "@/lib/job-runtime";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const items = getRecentlyPostedJobs(jobOpportunities, 7);
  return {
    title: "New Jobs This Week in Nigeria",
    description: "Recently posted Nigerian vacancies whose original employer posting date is verified, with official application links and requirements.",
    alternates: { canonical: "/jobs/new-this-week" },
    robots: items.length ? undefined : { index: false, follow: true },
  };
}

export default function NewThisWeekPage() {
  const items = getRecentlyPostedJobs(jobOpportunities, 7);
  return (
    <>
      <section className="section page-top jobs-section-top"><div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Jobs & Careers", href: "/jobs" }, { label: "New this week" }]} />
        <span className="eyebrow">Recently posted</span><h1>New jobs posted this week in Nigeria.</h1>
        <p className="page-intro">This page only uses vacancies where the employer's original posting date is available, so a newly verified old listing is not presented as a new job.</p>
        <AnswerFirst title="What counts as new?" summary={items.length ? items.length + " open vacancies have an employer-published date within the last seven days." : "No open vacancy with a verified employer posting date falls within the last seven days."} facts={[{ label: "New this week", value: String(items.length) }, { label: "Date source", value: "Employer posting date" }, { label: "Status", value: "Open only" }, { label: "Application", value: "Official source" }]} links={[{ href: "/jobs/closing-this-week", label: "Closing this week" }, { href: "/jobs/open-now", label: "All open jobs", primary: true }]} />
      </div></section>
      <section className="section"><div className="container"><JobCollection opportunities={items} emptyText="No newly posted vacancy with a verified original posting date is available in this seven-day window." /></div></section>
      <section className="section"><div className="container"><Link href="/jobs">← Full Jobs & Careers directory</Link></div></section>
    </>
  );
}
