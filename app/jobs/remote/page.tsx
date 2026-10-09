import { getEffectiveJobStatus, getEffectiveStatusLabel } from "@/lib/job-runtime";
import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { jobOpportunities } from "@/lib/jobs";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Remote Jobs in Nigeria 2026: Verified Remote & Hybrid Careers",
  description: "Find remote and hybrid job routes open to Nigerian applicants, with current employer sources, location notes and direct links to official career systems.",
  alternates: { canonical: "/jobs/remote" }
};

const flexibleSources = [
  {
    employer: "Paystack",
    label: "Current Nigeria hybrid openings",
    status: "Hybrid",
    summary: "Paystack's current jobs board labels multiple Nigeria roles as hybrid, including product and quality-engineering positions.",
    url: "https://careers.paystack.com/jobs",
    checked: "2026-10-04"
  },
  {
    employer: "Moniepoint",
    label: "Remote Nigeria roles",
    status: "Remote",
    summary: "Moniepoint publishes roles that explicitly identify Remote, Lagos, Nigeria as the working location when remote work is supported.",
    url: "https://moniepoint.com/careers",
    checked: "2026-10-04"
  }
];

export default function RemoteJobsPage() {
  const base = getSiteUrl();
  const employers = jobOpportunities.filter((item) =>
    ["Paystack", "Moniepoint Nigeria"].some((name) => item.organization.toLowerCase().includes(name.toLowerCase().replace(" nigeria", "")))
  );

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Remote and Hybrid Jobs in Nigeria",
    description: metadata.description,
    url: base + "/jobs/remote",
    isPartOf: { "@type": "WebSite", name: "MyNigeriaGuide", url: base }
  };

  return (
    <>
      <JsonLd data={collectionLd} />
      <section className="section page-top jobs-section-top">
        <div className="container">
          <Link href="/jobs" className="back-link">← Jobs & Careers</Link>
          <span className="eyebrow">Remote & hybrid work</span>
          <h1>Remote jobs in Nigeria, without stale vacancy lists.</h1>
          <p className="page-intro">Start with employers whose official career systems currently identify remote or hybrid work. Always confirm the location on the individual job before applying because a company's work policy can differ by role.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Checked 4 October 2026</span>
              <h2>Current flexible-work sources.</h2>
              <p>These links go to the employer responsible for the vacancy, not to a copied application form.</p>
            </div>
          </div>
          <div className="jobs-open-grid">
            {flexibleSources.map((source) => (
              <article className="job-card job-card-open" key={source.employer}>
                <div className="job-card-top"><span className="job-status job-status-open">{source.status}</span><span>Official source</span></div>
                <div className="job-card-body">
                  <p className="job-organisation">{source.employer}</p>
                  <h3>{source.label}</h3>
                  <p>{source.summary}</p>
                </div>
                <div className="job-card-footer">
                  <span>Checked {source.checked}</span>
                  <a href={source.url} target="_blank" rel="noreferrer">Check current openings ↗</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {employers.length ? (
        <section className="section jobs-government-strip">
          <div className="container">
            <div className="minimal-section-heading">
              <div>
                <span className="eyebrow">Employer guides</span>
                <h2>Understand the employer before you apply.</h2>
                <p>These MyNigeriaGuide pages explain the verified career route and send you back to the official employer system.</p>
              </div>
            </div>
            <div className="jobs-status-row">
              {employers.map((item) => (
                <Link key={item.slug} href={"/jobs/" + item.slug} className="jobs-status-card">
                  <span className={"job-status job-status-" + getEffectiveJobStatus(item)}>{getEffectiveStatusLabel(item)}</span>
                  <strong>{item.organization}</strong>
                  <small>{item.summary}</small>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section jobs-safety-section">
        <div className="container jobs-safety-grid">
          <div><span className="eyebrow">Before applying</span><h2>Remote does not always mean work from anywhere.</h2></div>
          <div className="jobs-safety-list">
            <p><strong>1. Read the location field.</strong> A remote role can still be restricted to Nigeria, Lagos, a time zone or a country where the employer has payroll.</p>
            <p><strong>2. Check the employer domain.</strong> Apply only through the official career system linked from the listing.</p>
            <p><strong>3. Do not pay for an interview or offer.</strong> A legitimate employer should not sell you a shortlist or employment slot.</p>
            <p><strong>4. Recheck before submitting.</strong> Flexible-work status changes faster than evergreen career information, so use the employer page as the final authority.</p>
          </div>
        </div>
      </section>
    </>
  );
}

// Use the live Nigeria-calendar status rather than yesterday\u0027s prerendered snapshot.
export const dynamic = "force-dynamic";
