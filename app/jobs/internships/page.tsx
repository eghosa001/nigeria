import type { Metadata } from "next";
import { withStaticSocialMetadata } from "@/lib/seo-social";
import Link from "next/link";
import { JobCollection } from "@/components/job-collection";
import { jobOpportunities } from "@/lib/jobs";
import { isCurrentInternshipOpportunity } from "@/lib/job-internships";

export const metadata: Metadata = withStaticSocialMetadata({
  title: { absolute: "Internships & SIWES Nigeria | MyNigeriaGuide" },
  description: "Find Nigerian internship and SIWES requirements, verified individual intakes where available, and official employer pathways. Check which applications are actually open.",
  alternates: { canonical: "/jobs/internships" }
});

export default function InternshipJobsPage() {
  const items = jobOpportunities.filter((item) => isCurrentInternshipOpportunity(item));
  // The following are permanent issuer-sourced programme guides, NOT
  // assertions of an open internship vacancy or an accepting application form.
  const pathwaySlugs = ["shell-nigeria-siwes", "airtel-nigeria-careers", "kpmg-nigeria-careers"];
  const pathways = pathwaySlugs
    .map((slug) => jobOpportunities.find((item) => item.slug === slug))
    .filter((item) => item?.status === "career-page");

  return (
    <>
      <section className="section page-top jobs-section-top">
        <div className="container">
          <Link href="/jobs" className="back-link">← Jobs & Careers</Link>
          <span className="eyebrow">Students & internships</span>
          <h1>Internships and SIWES in Nigeria: find the right route.</h1>
          <p className="page-intro">Check whether an internship intake is open before applying. Compare SIWES, student placements and graduate internships using the employer’s published requirements.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="minimal-section-heading"><div><span className="eyebrow">Eligibility first</span><h2>Student internships, graduate internships and SIWES are different.</h2></div></div>
          <div className="home-updates-grid">
            <article className="home-update-card"><h3>Internships for Nigerian undergraduates</h3><p>Check that the host accepts students at your academic stage and whether your institution must provide an industrial-training or SIWES letter. Some roles specify departments, semester windows, course requirements and location. A broad careers portal may not list an active student placement; open the actual internship notice before applying.</p></article>
            <article className="home-update-card"><h3>Paid and remote internships</h3><p>Do not assume every internship offers a salary, allowance or fully remote arrangement. Verify the employer's actual offer, place of work, time zone and working hours. Never pay a recruiter to 'reserve' a genuine position. If a salary or accommodation allowance is absent from the official notice, it remains unknown until confirmed.</p></article>
            <article className="home-update-card"><h3>Internships after graduation</h3><p>Some programmes accept recent graduates while others require current university enrolment. Separate these groups before applying so you do not waste time on an ineligible role. <Link href="/jobs/guides/graduate-job-application-checklist">Prepare your application evidence →</Link> or <Link href="/jobs/graduate">compare graduate programmes →</Link>.</p></article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="minimal-section-heading">
            <div><span className="eyebrow">Current opportunities</span><h2>Specific internship intakes</h2></div>
          </div>
          {items.length ? (
            <JobCollection opportunities={items} />
          ) : (
            <p className="page-intro">No individual internship intake in our reviewed records is confirmed open or upcoming. This is not a claim that every employer has stopped recruiting: check the official programme routes below for the latest application window.</p>
          )}
          <div className="minimal-section-heading top-gap">
            <div><span className="eyebrow">Official programme guidance</span><h2>Where to check SIWES and internship applications</h2></div>
          </div>
          <p>These are employer-published routes and eligibility guides, not live vacancy announcements. An employer's general careers page does not confirm that its internship form is accepting applications today.</p>
          <div className="home-updates-grid">
            {pathways.map((item) => item ? (
              <article className="home-update-card" key={item.slug}>
                <h3>{item.organization}</h3>
                <p>{item.slug === "shell-nigeria-siwes"
                  ? "Shell’s student industrial-training guidance explains its university/polytechnic and school-authorisation requirements."
                  : item.slug === "airtel-nigeria-careers"
                    ? "Airtel distinguishes undergraduate and graduate internships from other job openings. Confirm the current intake dates."
                    : "KPMG explains separate undergraduate, pre-NYSC and graduate internships with different eligibility rules."}</p>
                <Link href={"/jobs/" + item.slug}>Eligibility and official source →</Link>
              </article>
            ) : null)}
          </div>
          <p className="top-gap">Looking for general graduate employment rather than an internship? <Link href="/jobs/graduate">View graduate and trainee programmes →</Link></p>
        </div>
      </section>
    </>
  );
}

// Use the live Nigeria-calendar status rather than yesterday\u0027s prerendered snapshot.
export const dynamic = "force-dynamic";
