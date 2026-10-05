import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerFirst } from "@/components/answer-first";
import { AdSlot } from "@/components/ad-slot";
import { AD_SLOTS } from "@/lib/adsense-config";
import { JsonLd } from "@/components/json-ld";
import { getJobOpportunity, jobOpportunities } from "@/lib/jobs";
import { getSiteUrl } from "@/lib/site";

export function generateStaticParams() {
  return jobOpportunities.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getJobOpportunity(slug);
  if (!item) return {};
  return {
    title: item.title + ": Requirements, Status & How to Apply",
    description: item.summary,
    alternates: { canonical: "/jobs/" + item.slug }
  };
}

export default async function JobOpportunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getJobOpportunity(slug);
  if (!item) notFound();

  const base = getSiteUrl();
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: item.title,
    description: item.summary,
    url: base + "/jobs/" + item.slug,
    dateModified: item.verifiedAt,
    isPartOf: { "@type": "WebSite", name: "MyNigeriaGuide", url: base },
    about: { "@type": "Organization", name: item.organization }
  };

  return (
    <>
      <JsonLd data={pageLd} />
      <section className="job-detail-hero">
        <div className="container job-detail-hero-grid">
          <div>
            <Link href="/jobs" className="back-link">← Jobs & Careers</Link>
            <div className="job-detail-status-line">
              <span className={"job-status job-status-" + item.status}>{item.statusLabel}</span>
              <span>{item.sector}</span>
              <span>Checked {new Date(item.verifiedAt + "T00:00:00Z").toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</span>
            </div>
            <p className="job-organisation">{item.organization}</p>
            <h1>{item.title}</h1>
            <p className="page-intro">{item.summary}</p>
            {item.nextMilestone ? <div className="job-milestone"><strong>Current next step</strong><p>{item.nextMilestone}</p></div> : null}
          </div>

          <aside className="job-apply-card">
            <span>Official application source</span>
            <strong>{item.organization}</strong>
            <p>MyNigeriaGuide does not receive your application, password, NIN or recruitment payment.</p>
            <a className="button" href={item.officialUrl} target="_blank" rel="noreferrer">{item.officialUrlLabel} ↗</a>
            <small>Verify the destination domain before entering personal information.</small>
          </aside>
        </div>

        <div className="container">
          <AnswerFirst
            title={"Should you apply for " + item.title + "?"}
            summary={item.summary}
            facts={[
              { label: "Status", value: item.statusLabel },
              { label: "Location", value: item.location },
              { label: "Deadline / next step", value: item.deadline ? new Date(item.deadline + "T00:00:00Z").toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) : (item.nextMilestone ?? "Check the live official page") },
              { label: "Best fit", value: item.audiences.slice(0, 3).join(", ") },
            ]}
            links={[
              { href: "#requirements", label: "Check requirements" },
              { href: "#apply", label: "How to apply" },
              { href: item.officialUrl, label: item.officialUrlLabel, external: true, primary: true },
            ]}
            note={"Verified " + item.verifiedAt + ". Check eligibility first; only then open the official application source."}
          />
        </div>
      </section>

      <section className="section">
        <div className="container job-detail-layout">
          <article className="job-detail-content">
            <section>
              <span className="eyebrow">At a glance</span>
              <div className="job-facts">
                <div><small>Organisation</small><strong>{item.organization}</strong></div>
                <div><small>Sector</small><strong>{item.sector}</strong></div>
                <div><small>Location</small><strong>{item.location}</strong></div>
                <div><small>Opportunity type</small><strong>{item.employmentType}</strong></div>
                {item.deadline ? <div><small>Application deadline</small><strong>{new Date(item.deadline + "T00:00:00Z").toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</strong></div> : null}
              </div>
            </section>

            <AdSlot slot={AD_SLOTS.jobAfterFacts} label="Advertisement" />

            <section>
              <h2>Who this is for</h2>
              <div className="job-tags job-tags-large">{item.audiences.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <p className="job-muted">Common disciplines or work areas covered by this pathway:</p>
              <div className="job-tags">{item.fields.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </section>

            <section id="requirements">
              <h2>Qualification requirements</h2>
              <ul className="checklist">{item.qualifications.map((text) => <li key={text}>{text}</li>)}</ul>
            </section>

            <section>
              <h2>Other requirements</h2>
              <ul className="checklist">{item.requirements.map((text) => <li key={text}>{text}</li>)}</ul>
            </section>

            <section id="documents">
              <h2>Documents to prepare</h2>
              <ul>{item.documents.map((text) => <li key={text}>{text}</li>)}</ul>
            </section>

            <section id="apply">
              <h2>How to apply or check your status</h2>
              <ol className="job-steps">{item.applicationSteps.map((text, index) => <li key={text}><span>{index + 1}</span><p>{text}</p></li>)}</ol>
            </section>

            <section className="job-scam-note">
              <span>Recruitment safety</span>
              <h2>Do not pay for access to a shortlist or appointment.</h2>
              <p>{item.feeNote}</p>
            </section>

            <section>
              <h2>What we verified</h2>
              <ul>{item.sourceNotes.map((note) => <li key={note}>{note}</li>)}</ul>
              <div className="job-source-list">
                {item.sources.map((source) => (
                  <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                    <strong>{source.label}</strong>
                    <span>Official source · checked {source.lastChecked} ↗</span>
                  </a>
                ))}
              </div>
            </section>
          </article>

          <aside className="job-detail-sidebar">
            <div className="job-sidebar-card">
              <strong>Before you apply</strong>
              <p>Open the official source and confirm that the status still matches this page.</p>
              <p>Requirements can change between recruitment cycles.</p>
              <p>Never send passwords, one-time codes or payment to MyNigeriaGuide.</p>
            </div>
            <Link href={item.sector === "Government" ? "/jobs/government" : "/jobs/private"} className="job-sidebar-link">
              Browse more {item.sector.toLowerCase()} opportunities →
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
