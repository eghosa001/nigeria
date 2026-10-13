import type { Metadata } from "next";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JobCollection } from "@/components/job-collection";
import { JsonLd } from "@/components/json-ld";
import { jobOpportunities } from "@/lib/jobs";
import { isEffectivelyOpen } from "@/lib/job-runtime";
import { getSiteUrl } from "@/lib/site";

// Application deadlines follow the current Nigerian calendar day.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Jobs Open Now in Nigeria: Verified Vacancies & Recruitment",
  description: "Check current Nigerian job vacancies and recruitment exercises separately from open training and entrepreneurship programmes.",
  alternates: { canonical: "/jobs/open-now" },
};

export default function OpenJobsPage() {
  const open = jobOpportunities.filter((item) => isEffectivelyOpen(item) && item.kind !== "career-page");
  const vacancies = open.filter((item) => item.kind !== "programme");
  const programmes = open.filter((item) => item.kind === "programme");
  const base = getSiteUrl();
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Jobs open now in Nigeria",
    url: base + "/jobs/open-now",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: open.length,
      itemListElement: open.slice(0, 24).map((item, index) => ({
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
      <section className="section page-top jobs-section-top">
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Jobs", href: "/jobs" }, { label: "Open now" }]} />
          <span className="eyebrow">Current application windows</span>
          <h1>Jobs and recruitment open now in Nigeria</h1>
          <p className="page-intro">Review eligibility, deadlines and the employer's official source before applying. Dates and availability can change after the recorded source check.</p>
          <AnswerFirst
            title="Which opportunities can you apply for?"
            summary={vacancies.length
              ? vacancies.length + " vacancies or recruitment exercises are listed as open, with " + programmes.length + " separate development programmes."
              : "No salaried vacancy or recruitment exercise is currently marked open. Check the employer directory for new postings."}
            facts={[
              { label: "Open vacancies / recruitment", value: String(vacancies.length) },
              { label: "Open development programmes", value: String(programmes.length) },
              { label: "Apply through", value: "The employer or programme organiser" },
              { label: "Fees to MyNigeriaGuide", value: "₦0" },
            ]}
            links={[
              { href: "/jobs/deadlines", label: "Published deadlines" },
              { href: "/jobs/graduate", label: "Graduate careers" },
              { href: "/jobs", label: "Full jobs directory", primary: true },
            ]}
            note="An open status reflects the last documented check, not a guarantee of availability today."
          />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="minimal-section-heading">
            <div><span className="eyebrow">Vacancies & recruitment</span><h2>Open employment applications</h2></div>
          </div>
          <JobCollection opportunities={vacancies} emptyText="No vacancy currently has a verified open application window. Check the main careers directory for employer portals." />
        </div>
      </section>
      {programmes.length ? (
        <section className="section">
          <div className="container">
            <div className="minimal-section-heading">
              <div><span className="eyebrow">Different application type</span><h2>Founder, training & development programmes</h2><p>These are learning and development opportunities, not salaried job vacancies or guaranteed grants.</p></div>
            </div>
            <JobCollection opportunities={programmes} />
          </div>
        </section>
      ) : null}
    </>
  );
}
