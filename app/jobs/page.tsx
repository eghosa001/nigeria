import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { JobsDirectory } from "@/components/jobs-directory";
import { OnDemandLiveJobs } from "@/components/on-demand-live-jobs";
import { governmentOpportunities, internationalOpportunities, jobOpportunities, privateOpportunities } from "@/lib/jobs";
import { jobTopics } from "@/lib/job-topics";
import { careerGuides } from "@/lib/career-guides";
import { jobLocationFacets, jobProfessionFacets } from "@/lib/job-facets";
import { indexableJobEmployers } from "@/lib/job-employers";
import { getEffectiveJobStatus, getEffectiveStatusLabel, isEffectivelyOpen } from "@/lib/job-runtime";
import { queryJobDirectory } from "@/lib/job-query";
import { getSiteUrl } from "@/lib/site";
import { jobMarketSources } from "@/data/job-market-sources";

export const metadata: Metadata = {
  title: "Jobs in Nigeria: Open Roles & Recruitment",
  description: "Verified Nigerian government recruitment, graduate jobs, SIWES, internships and career portals with requirements, application steps, status and official links.",
  alternates: { canonical: "/jobs" }
};

// Deadline-sensitive status must be evaluated on every request, not frozen at build time.
export const dynamic = "force-dynamic";

export default function JobsPage() {
  const base = getSiteUrl();
  const activeGovernment = governmentOpportunities.filter((item) => ["open", "screening", "training"].includes(getEffectiveJobStatus(item))).length;
  const careerPages = jobOpportunities.filter((item) => item.status === "career-page").length;
  const openOpportunities = jobOpportunities
    .filter((item) => isEffectivelyOpen(item))
    .sort((a, b) => {
      const deadlineA = a.deadline ?? "9999-12-31";
      const deadlineB = b.deadline ?? "9999-12-31";
      const byDeadline = deadlineA.localeCompare(deadlineB);
      return byDeadline || b.verifiedAt.localeCompare(a.verifiedAt);
    });
  const openPreview = openOpportunities.slice(0, 3);
  const initialDirectoryResult = queryJobDirectory({ page: 1, pageSize: 12 });

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
      itemListElement: jobOpportunities.slice(0, 24).map((item, index) => ({
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
            <p className="page-intro">Government recruitment, graduate opportunities, internships, NGO/UN pathways and reputable employer career routes — checked against the organisation responsible for the application.</p>
            <form className="section-quick-search" action="/jobs#opportunities" method="get" role="search">
              <label>
                <span>Search jobs & careers</span>
                <input type="search" name="q" placeholder="Employer, role, qualification or field…" />
              </label>
              <button type="submit">Search jobs</button>
            </form>
            <div className="jobs-hero-actions">
              <a href="#opportunities" className="button inline-button">Browse verified opportunities</a>
              <Link href="/jobs/open-now" className="jobs-text-action">Open now →</Link>
              <Link href="/jobs/government" className="jobs-text-action">Government tracker →</Link>
            </div>
          </div>

          <aside className="jobs-trust-panel" aria-label="Jobs verification promise">
            <span>Verification first</span>
            <strong>No copied “apply now” forms.</strong>
            <p>MyNigeriaGuide explains the requirements and sends you to the responsible organisation to apply.</p>
            <div><b>{activeGovernment}</b><small>government recruitments currently open or in an active later stage</small></div>
            <div><b>{careerPages}</b><small>official employer and organisation career pathways checked</small></div>
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
                <p>Only opportunities whose official source currently shows an open application window appear here. Published deadlines are shown first, with the nearest closing dates prioritised.</p>
              </div>
            </div>
            <div className="jobs-open-grid">
              {openPreview.map((item) => (
                <article className="job-card job-card-open" key={item.slug}>
                  <div className="job-card-top">
                    <span className={"job-status job-status-" + getEffectiveJobStatus(item)}>{getEffectiveStatusLabel(item)}</span>
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
            {openOpportunities.length > openPreview.length ? (
              <p className="job-muted"><Link href="/jobs/open-now">View all {openOpportunities.length} currently open opportunities →</Link></p>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="section" id="opportunities">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Verified directory</span>
              <h2>Government and respected private institutions.</h2>
              <p>Search by employer, qualification, discipline or applicant type.</p>
            </div>
          </div>
          <JobsDirectory initialResult={initialDirectoryResult} />
        </div>
      </section>

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
            <Link href="/jobs/open-now">Jobs open now</Link>
            <Link href="/jobs/graduate">Graduate jobs & trainee programmes</Link>
            <Link href="/jobs/nysc">NYSC jobs & PPA opportunities</Link>
            <Link href="/jobs/internships">Internships & SIWES</Link>
            <Link href="/jobs/engineering">Engineering & technical careers</Link>
            <Link href="/jobs/remote">Remote & hybrid jobs</Link>
            <Link href="/jobs/employers">Employers with multiple verified records</Link>
            <Link href="/jobs/new-this-week">New this week</Link>
            <Link href="/jobs/closing-this-week">Closing this week</Link>
            <a href="#opportunities">Search the full directory</a>
          </div>

          <details className="browse-disclosure jobs-browse-more">
            <summary>Browse by industry, location, profession & career tools</summary>
            <div className="jobs-browse-more-content">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Browse by employer</span>
              <h2>Browse employers</h2>
              <p>Compare opportunities from employers with multiple source-checked listings.</p>
            </div>
          </div>
          <div className="jobs-topic-links" aria-label="Browse jobs by employer">
            {indexableJobEmployers.slice(0, 18).map((employer) => (
              <Link href={"/jobs/employers/" + employer.slug} key={employer.slug}>{employer.name}</Link>
            ))}
            <Link href="/jobs/employers">All employer hubs</Link>
          </div>

          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Browse by industry</span>
              <h2>Browse by industry</h2>
              <p>Find opportunities by your preferred type of work.</p>
            </div>
          </div>
          <div className="jobs-topic-links" aria-label="Browse jobs by industry">
            {jobTopics.map((topic) => (
              <Link href={"/jobs/categories/" + topic.slug} key={topic.slug}>{topic.shortTitle}</Link>
            ))}
          </div>

          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Browse by location</span>
              <h2>Browse by location</h2>
              <p>Explore jobs and employers in your preferred location.</p>
            </div>
          </div>
          <div className="jobs-topic-links" aria-label="Browse jobs by location">
            {jobLocationFacets.map((facet) => (
              <Link href={"/jobs/locations/" + facet.slug} key={facet.slug}>{facet.shortTitle}</Link>
            ))}
          </div>

          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Browse by profession</span>
              <h2>Find the work you actually do.</h2>
              <p>Choose a profession to see relevant opportunities.</p>
            </div>
          </div>
          <div className="jobs-topic-links" aria-label="Browse jobs by profession">
            {jobProfessionFacets.map((facet) => (
              <Link href={"/jobs/professions/" + facet.slug} key={facet.slug}>{facet.shortTitle}</Link>
            ))}
          </div>

          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Career tools</span>
              <h2>Prepare before you press Apply.</h2>
              <p>Practical, source-aware guides for the parts of a job search that repeat across employers.</p>
            </div>
          </div>
          <div className="jobs-topic-links" aria-label="Career application guides">
            {careerGuides.map((guide) => (
              <Link href={"/jobs/guides/" + guide.slug} key={guide.slug}>{guide.title}</Link>
            ))}
          </div>


            </div>
          </details>

          {internationalOpportunities.length ? (
            <p className="job-muted">{internationalOpportunities.length} verified international, NGO or UN-system pathways are included in the directory and sector filters.</p>
          ) : null}
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
            {governmentOpportunities.slice(0, 3).map((item) => (
              <Link key={item.slug} href={"/jobs/" + item.slug} className="jobs-status-card">
                <span className={"job-status job-status-" + getEffectiveJobStatus(item)}>{getEffectiveStatusLabel(item)}</span>
                <strong>{item.organization}</strong>
                <small>{item.nextMilestone || item.summary}</small>
              </Link>
            ))}
          </div>
          {governmentOpportunities.length > 3 ? (
            <p className="job-muted"><Link href="/jobs/government">View all {governmentOpportunities.length} government recruitment guides →</Link></p>
          ) : null}
        </div>
      </section>

      <section className="section jobs-live-market-section" aria-labelledby="live-jobs-heading">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Live Nigeria vacancies</span>
              <h2 id="live-jobs-heading">More vacancies from external sources.</h2>
              <p>Browse recent vacancies from external sources, then confirm the requirements and application method with the employer. These are source listings, not independently verified vacancies.</p>
            </div>
          </div>
          <OnDemandLiveJobs />
        </div>
      </section>

      <section className="section jobs-market-section" aria-labelledby="jobs-market-heading">
        <div className="container">
          <details className="browse-disclosure jobs-browse-more">
            <summary>Explore wider Nigeria job-market sources</summary>
            <div className="jobs-browse-more-content">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Nigeria job market</span>
              <h2 id="jobs-market-heading">Compare other reputable job sources.</h2>
              <p>
                Compare vacancies on external job boards with the source-checked opportunities below. Always confirm the employer, location and closing date before applying.
              </p>
            </div>
          </div>
          <div className="jobs-path-grid">
            {jobMarketSources.map((source) => (
              <a className="jobs-path-card" href={source.href} target="_blank" rel="noreferrer" key={source.key}>
                <span>{source.integration === "feed-eligible" ? "Feed-capable source" : "Live market source"}</span>
                <strong>{source.name}</strong>
                <p>{source.note}</p>
                <b>{source.countLabel} · checked {source.checkedAt} ↗</b>
              </a>
            ))}
            <Link href="#opportunities" className="jobs-path-card jobs-path-card-dark">
              <span>MyNigeriaGuide verified</span>
              <strong>{jobOpportunities.length} curated pathways</strong>
              <p>These are the records already checked deeply enough to explain requirements, status and the official route.</p>
              <b>Search the verified directory →</b>
            </Link>
          </div>
          <p className="job-muted">
            Market-source links are discovery aids, not MyNigeriaGuide endorsements of every advert on those platforms. Individual jobs only become MyNigeriaGuide records after source, freshness and duplicate checks.
          </p>
            </div>
          </details>
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
