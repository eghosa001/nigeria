import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AnswerFirst } from "@/components/answer-first";
import { AdSlot } from "@/components/ad-slot";
import { AD_SLOTS } from "@/lib/adsense-config";
import { JsonLd } from "@/components/json-ld";
import { JobApplyLink } from "@/components/job-apply-link";
import { getJobOpportunity, isIndexableJobOpportunity, jobOpportunities } from "@/lib/jobs";
import { retiredJobRedirects } from "@/lib/job-scale-wave";
import { getJobTopicsForOpportunity } from "@/lib/job-topics";
import { getEmployerOpportunities, getJobEmployer } from "@/lib/job-employers";
import { buildJobPostingJsonLd, getEffectiveJobStatus, getEffectiveStatusLabel, getJobFreshnessLabel } from "@/lib/job-runtime";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return jobOpportunities.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getJobOpportunity(slug);
  if (!item) return {};
  const isCareerPortal = item.status === "career-page" || item.kind === "career-page";
  return {
    title: isCareerPortal
      ? item.organization + " Careers: Official Portal & How to Apply"
      : item.title + ": Requirements, Status & How to Apply",
    description: item.summary,
    alternates: { canonical: "/jobs/" + item.slug },
    robots: isIndexableJobOpportunity(item) ? undefined : { index: false, follow: true }
  };
}

export default async function JobOpportunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getJobOpportunity(slug);
  if (!item) {
    const replacement = retiredJobRedirects.get(slug);
    if (replacement) redirect(replacement);
    notFound();
  }

  const isCareerPortal = item.status === "career-page" || item.kind === "career-page";
  const relatedTopics = getJobTopicsForOpportunity(item);
  const employerOpportunities = getEmployerOpportunities(item.organization, item.slug).slice(0, 4);
  const employer = getJobEmployer(item.organization);
  const employerHubHref = employer && employer.opportunitySlugs.length >= 2 ? "/jobs/employers/" + employer.slug : null;
  const employerPay = item.remuneration
    ? new Intl.NumberFormat("en-NG", { style: "currency", currency: item.remuneration.currency, maximumFractionDigits: 2 }).format(item.remuneration.amount)
      + " / " + (item.remuneration.period === "MONTH" ? "month" : item.remuneration.period === "YEAR" ? "year" : "hour")
      + " (" + (item.remuneration.payType === "gross" ? "gross remuneration" : "base salary") + ", employer-published)"
    : null;
  const effectiveStatus = getEffectiveJobStatus(item);
  const effectiveStatusLabel = getEffectiveStatusLabel(item);
  const sectorBrowse =
    item.sector === "Government"
      ? { href: "/jobs/government", label: "Browse more government opportunities" }
      : item.sector === "International"
        ? { href: "/jobs/categories/ngo-development", label: "Browse NGO & international opportunities" }
        : { href: "/jobs/private", label: "Browse more private-sector opportunities" };

  const base = getSiteUrl();
  const pageUrl = base + "/jobs/" + item.slug;
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: item.title,
    description: item.summary,
    url: pageUrl,
    dateModified: item.verifiedAt,
    isPartOf: { "@type": "WebSite", name: "MyNigeriaGuide", url: base },
    about: { "@type": "Organization", name: item.organization },
    spatialCoverage: { "@type": "Place", name: item.location }
  };
  const jobPostingLd = buildJobPostingJsonLd(item, pageUrl);

  return (
    <>
      <JsonLd data={pageLd} />
      {jobPostingLd ? <JsonLd data={jobPostingLd} /> : null}
      <section className="job-detail-hero">
        <div className="container job-detail-hero-grid">
          <div>
            <Link href="/jobs" className="back-link">← Jobs & Careers</Link>
            <div className="job-detail-status-line">
              <span className={"job-status job-status-" + effectiveStatus}>{effectiveStatusLabel}</span>
              <span>{item.sector}</span>
              <span>{getJobFreshnessLabel(item)}</span>
            </div>
            <p className="job-organisation">{item.organization}</p>
            <h1>{item.title}</h1>
            <p className="page-intro">{item.summary}</p>
            {!isIndexableJobOpportunity(item) ? <p className="job-muted">Employer-directory listing: confirm the specific role, requirements and opening dates on the official careers site. This record is not a standalone verified vacancy.</p> : null}
            <p className="job-muted">Applies to {item.location} · Employer: {item.organization} · Verified {item.verifiedAt}</p>
            {item.nextMilestone ? <div className="job-milestone"><strong>Current next step</strong><p>{item.nextMilestone}</p></div> : null}
          </div>

          <aside className="job-apply-card" id="official-application">
            <span>{isCareerPortal ? "Official careers source" : "Official application source"}</span>
            <strong>{item.organization}</strong>
            <p>MyNigeriaGuide does not receive your application, password, NIN or recruitment payment.</p>
            <JobApplyLink className="button" href={item.officialUrl} slug={item.slug} employer={item.organization} status={effectiveStatus}>
              {isCareerPortal ? item.officialUrlLabel : (effectiveStatus === "open" ? item.officialUrlLabel : "Check current official status")} ↗
            </JobApplyLink>
            <small>Verify the destination domain before entering personal information.</small>
          </aside>
        </div>

        <div className="container">
          <AnswerFirst
            title={isCareerPortal ? "How should you use " + item.organization + "'s careers page?" : "Should you apply for " + item.title + "?"}
            summary={item.summary}
            facts={[
              { label: "Verified status", value: effectiveStatusLabel + " · checked " + item.verifiedAt },
              { label: "Applies to", value: item.location },
              ...(employerPay ? [{ label: "Employer-stated pay", value: employerPay }] : []),
              { label: isCareerPortal ? "Current vacancies" : "Deadline / next step", value: isCareerPortal ? "Check the live employer source" : (item.deadline ? new Date(item.deadline + "T00:00:00Z").toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) : (item.nextMilestone ?? "Check the live official page")) },
              { label: "Best fit", value: item.audiences.slice(0, 3).join(", ") },
            ]}
            links={[
              { href: "#requirements", label: isCareerPortal ? "How eligibility works" : "Check requirements" },
              { href: "#apply", label: isCareerPortal ? "How to use the portal" : "How to apply" },
              { href: "#official-application", label: isCareerPortal ? "Open official careers source" : (effectiveStatus === "open" ? "Open official application" : "Check official status"), primary: true },
            ]}
            note={isCareerPortal
              ? "Verified " + item.verifiedAt + ". This is an employer-wide career source, so role-specific eligibility must come from the exact vacancy you choose."
              : "Verified " + item.verifiedAt + ". Check eligibility first; only then open the official application source."}
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
                {employerPay ? <div><small>Published remuneration</small><strong>{employerPay}</strong><a href={item.remuneration?.evidenceUrl} target="_blank" rel="noreferrer">Employer source ↗</a></div> : null}
                <div><small>Opportunity type</small><strong>{item.employmentType}</strong></div>
                {item.deadline ? <div><small>Application deadline</small><strong>{new Date(item.deadline + "T00:00:00Z").toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</strong></div> : null}
                <div><small>Information verified</small><strong>{item.verifiedAt}</strong></div>
              </div>
            </section>

            <AdSlot slot={AD_SLOTS.jobAfterFacts} label="Advertisement" />

            <section>
              <h2>Who {item.title} is for</h2>
              <div className="job-tags job-tags-large">{item.audiences.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <p className="job-muted">Common disciplines or work areas covered by this pathway:</p>
              <div className="job-tags">{item.fields.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </section>

            <section id="requirements">
              <h2>{isCareerPortal ? "How eligibility works for " + item.organization + " careers" : item.title + " qualification requirements"}</h2>
              <ul className="checklist">{item.qualifications.map((text) => <li key={text}>{text}</li>)}</ul>
            </section>

            <section>
              <h2>{isCareerPortal ? "Before using " + item.organization + "'s careers portal" : "Other requirements for " + item.title}</h2>
              <ul className="checklist">{item.requirements.map((text) => <li key={text}>{text}</li>)}</ul>
            </section>

            <section id="documents">
              <h2>Documents to prepare for {item.title}</h2>
              <ul>{item.documents.map((text) => <li key={text}>{text}</li>)}</ul>
            </section>

            <section id="apply">
              <h2>{isCareerPortal ? "How to use " + item.organization + "'s official careers portal" : "How to apply for " + item.title + " or check your status"}</h2>
              <ol className="job-steps">{item.applicationSteps.map((text, index) => <li key={text}><span>{index + 1}</span><p>{text}</p></li>)}</ol>
            </section>

            <section className="job-scam-note">
              <span>Recruitment safety</span>
              <h2>Do not pay for access to a shortlist or appointment.</h2>
              <p>{item.feeNote}</p>
            </section>

            <section>
              <h2>Sources used to verify {item.title}</h2>
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
            <Link href={sectorBrowse.href} className="job-sidebar-link">{sectorBrowse.label} →</Link>
            {employerOpportunities.length ? (
              <div className="job-sidebar-card">
                <strong>More from {item.organization}</strong>
                {employerHubHref ? <p><Link href={employerHubHref}>View {item.organization} employer hub →</Link></p> : null}
                {employerOpportunities.map((related) => (
                  <p key={related.slug}><Link href={"/jobs/" + related.slug}>{related.title} →</Link></p>
                ))}
              </div>
            ) : null}
            {relatedTopics.length ? (
              <div className="job-sidebar-card">
                <strong>Related career areas</strong>
                {relatedTopics.map((topic) => (
                  <p key={topic.slug}><Link href={"/jobs/categories/" + topic.slug}>{topic.shortTitle} →</Link></p>
                ))}
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </>
  );
}
