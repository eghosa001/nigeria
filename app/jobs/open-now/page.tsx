import type { Metadata } from "next";
import Link from "next/link";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { jobOpportunities } from "@/lib/jobs";
import { isEffectivelyOpen } from "@/lib/job-runtime";
import { getSiteUrl } from "@/lib/site";

// Deadline-sensitive status must be evaluated on every request, not frozen at build time.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Jobs Open Now in Nigeria October 2026",
  description: "Verified jobs and recruitment opportunities currently open in Nigeria, with eligibility, deadlines, application steps and official employer links.",
  alternates: { canonical: "/jobs/open-now" },
};

export default function OpenJobsPage() {
  const items = jobOpportunities.filter((item) => isEffectivelyOpen(item));
  const base = getSiteUrl();
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Jobs open now in Nigeria",
    url: base + "/jobs/open-now",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: base + "/jobs/" + item.slug,
      })),
    },
  };
  return (
    <>
      <JsonLd data={ld} />
      <section className="section page-top">
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Jobs", href: "/jobs" }, { label: "Open now" }]} />
          <span className="eyebrow">Verified live applications</span>
          <h1>Jobs and recruitment open now in Nigeria</h1>
          <p className="page-intro">Only opportunities whose official source currently shows an open application route are listed here.</p>
          <AnswerFirst
            title="What can you apply for right now?"
            summary={items.length ? items.length + " verified opportunities currently have an open status on MyNigeriaGuide." : "No opportunity is currently marked open. Check the full jobs directory for career pages and upcoming recruitment."}
            facts={[
              { label: "Open now", value: String(items.length) },
              { label: "Includes", value: "Government · graduate · private" },
              { label: "Application rule", value: "Apply on the official source" },
              { label: "Fees to MyNigeriaGuide", value: "₦0" },
            ]}
            links={[
              { href: "/jobs/graduate", label: "Graduate jobs" },
              { href: "/jobs/nysc", label: "NYSC opportunities" },
              { href: "/jobs", label: "Full jobs directory", primary: true },
            ]}
            note="Status can change quickly. Every detail page shows when its official source was last checked."
          />
          <div className="jobs-open-grid">
            {items.map((item) => (
              <article className="job-card job-card-open" key={item.slug}>
                <div className="job-card-top"><span className="job-status job-status-open">{item.statusLabel}</span><span>{item.sector}</span></div>
                <div className="job-card-body">
                  <p className="job-organisation">{item.organization}</p>
                  <h2><Link href={"/jobs/" + item.slug}>{item.title}</Link></h2>
                  <p>{item.summary}</p>
                  {item.deadline ? <p className="job-deadline"><strong>Deadline:</strong> {item.deadline}</p> : <p className="job-deadline"><strong>Deadline:</strong> Check live employer page</p>}
                </div>
                <div className="job-card-footer"><span>Checked {item.verifiedAt}</span><Link href={"/jobs/" + item.slug}>Requirements & apply →</Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
