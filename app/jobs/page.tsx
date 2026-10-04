import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { JobsDirectory } from "@/components/jobs-directory";
import { governmentOpportunities, jobOpportunities, privateOpportunities } from "@/lib/jobs";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jobs in Nigeria: Government Recruitment & Verified Career Opportunities",
  description: "Verified Nigerian government recruitment, graduate jobs, SIWES, internships and career portals with requirements, application steps, status and official links.",
  alternates: { canonical: "/jobs" }
};

export const dynamic = "force-static";

export default function JobsPage() {
  const base = getSiteUrl();
  const activeGovernment = governmentOpportunities.filter((item) => item.status === "open" || item.status === "screening" || item.status === "training").length;
  const careerPages = jobOpportunities.filter((item) => item.status === "career-page").length;
  const openOpportunities = jobOpportunities.filter((item) => item.status === "open");

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Jobs & Careers in Nigeria",
    description: "Verified government recruitment and reputable private-sector career pathways in Nigeria.",
    url: base + "/jobs",
    isPartOf: { "@type": "WebSite", name: "MyNigeriaGuide", url: base },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: jobOpportunities.length,
      itemListElement: jobOpportunities.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: base + "/jobs/" + item.slug
      }))
    }
  };

  return (
    <>
      <JsonLd data={collectionLd} />

      <section className="jobs-hero">
        <div className="container jobs-hero-grid">
          <div>
            <span className="eyebrow">Jobs & Careers</span>
            <h1>Know what is open. Know what you need. Apply at the source.</h1>
            <p className="page-intro">Government recruitment, graduate opportunities, internships and reputable employer career routes — checked against the organisation responsible for the application.</p>
            <form className="section-quick-search" action="/jobs#opportunities" method="get" role="search">
              <label>
                <span>Search jobs & careers</span>
                <input type="search" name="q" placeholder="Employer, role, qualification or field…" />
              </label>
              <button type="submit">Search jobs</button>
            </form>
            <div className="jobs-hero-actions">
              <a href="#opportunities" className="button inline-button">Browse verified opportunities</a>
              <Link href="/jobs/government" className="jobs-text-action">Government tracker →</Link>
            </div>
          </div>

          <aside className="jobs-trust-panel" aria-label="Jobs verification promise">
            <span>Verification first</span>
            <strong>No copied “apply now” forms.</strong>
            <p>MyNigeriaGuide explains the requirements and sends you to the responsible organisation to apply.</p>
            <div><b>{activeGovernment}</b><small>government recruitments currently open or in an active later stage</small></div>
            <div><b>{careerPages}</b><small>official employer career pathways checked</small></div>
            <div><b>₦0</b><small>fees collected by MyNigeriaGuide</small></div>
          </aside>
        </div>
      </section>

      {openOpportunities.length ? (
        <section className="section jobs-open-section">
          <div className="container">
            <div className="minimal-section-heading">
              <div>
                <span className="eyebrow">Open now</span>
                <h2>Applications you can act on today.</h2>
                <p>Only opportunities whose official source currently shows an open application window appear here.</p>
              </div>
            </div>
            <div className="jobs-open-grid">
              {openOpportunities.map((item) => (
                <article className="job-card job-card-open" key={item.slug}>
                  <div className="job-card-top">
                    <span className={"job-status job-status-" + item.status}>{item.statusLabel}</span>
                    <span>{item.sector}</span>
                  </div>
                  <div className="job-card-body">
                    <p className="job-organisation">{item.organization}</p>
                    <h3><Link href={"/jobs/" + item.slug}>{item.title}</Link></h3>
                    <p>{item.summary}</p>
                    {item.deadline ? <p className="job-deadline"><strong>Deadline:</strong> {new Date(item.deadline + "T00:00:00Z").toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</p> : null}
                  </div>
                  <div className="job-card-footer">
                    <span>Official source checked {item.verifiedAt}</span>
                    <Link href={"/jobs/" + item.slug}>Requirements & apply →</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section jobs-path-section">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Choose a path</span>
              <h2>Start where your application belongs.</h2>
            </div>
          </div>
          <div className="jobs-path-grid">
            <Link href="/jobs/government" className="jobs-path-card">
              <span>Government</span>
              <strong>Recruitment tracker</strong>
              <p>Federal recruitment status, eligibility, documents, deadlines and the next stage after applications.</p>
              <b>{governmentOpportunities.length} verified guides →</b>
            </Link>
            <Link href="/jobs/private" className="jobs-path-card">
              <span>Private institutions</span>
              <strong>Reputable employer careers</strong>
              <p>Graduate programmes, internships, SIWES and professional roles from official employer career systems.</p>
              <b>{privateOpportunities.length} verified guides →</b>
            </Link>
            <Link href="/jobs/deadlines" className="jobs-path-card jobs-path-card-dark">
              <span>Open now</span>
              <strong>Deadline tracker</strong>
              <p>See verified applications with published closing dates and employer systems currently showing live roles.</p>
              <b>View deadlines →</b>
            </Link>
          </div>

          <div className="jobs-topic-links" aria-label="Browse careers by applicant type">
            <Link href="/jobs/graduate">Graduate jobs & trainee programmes</Link>
            <Link href="/jobs/internships">Internships & SIWES</Link>
            <Link href="/jobs/engineering">Engineering & technical careers</Link>
            <Link href="/jobs/remote">Remote & hybrid jobs</Link>
            <a href="#opportunities">Search the full directory</a>
          </div>
        </div>
      </section>

      <section className="section jobs-government-strip">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Government recruitment</span>
              <h2>Status matters as much as the vacancy.</h2>
              <p>Closed applications stay useful: we keep the page and update it to screening, CBT, shortlist or training instead of publishing a misleading old application link.</p>
            </div>
            <Link href="/jobs/government">Full tracker →</Link>
          </div>

          <div className="jobs-status-row">
            {governmentOpportunities.map((item) => (
              <Link key={item.slug} href={"/jobs/" + item.slug} className="jobs-status-card">
                <span className={"job-status job-status-" + item.status}>{item.statusLabel}</span>
                <strong>{item.organization}</strong>
                <small>{item.nextMilestone || item.summary}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="opportunities">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Verified directory</span>
              <h2>Government and respected private institutions.</h2>
              <p>Search by employer, qualification, discipline or applicant type.</p>
            </div>
          </div>
          <JobsDirectory opportunities={jobOpportunities} />
        </div>
      </section>

      <section className="section jobs-safety-section">
        <div className="container jobs-safety-grid">
          <div>
            <span className="eyebrow">Applicant safety</span>
            <h2>Verify before you submit anything.</h2>
          </div>
          <div className="jobs-safety-list">
            <p><strong>1. Check the status.</strong> A genuine recruitment page may be real but already closed.</p>
            <p><strong>2. Follow the responsible organisation.</strong> MyNigeriaGuide links to the government agency or employer rather than collecting applications.</p>
            <p><strong>3. Treat payment requests as a warning.</strong> Never assume a shortlist, training slot or government appointment can be purchased.</p>
            <p><strong>4. Check the date.</strong> Every guide shows when its official source was last reviewed.</p>
          </div>
        </div>
      </section>
    </>
  );
}
