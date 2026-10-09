import { getEffectiveJobStatus, getEffectiveStatusLabel } from "@/lib/job-runtime";
import type { Metadata } from "next";
import Link from "next/link";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { jobOpportunities } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "NYSC Jobs & PPA Opportunities in Nigeria 2026",
  description: "Find NYSC-friendly career routes, graduate jobs, engineering opportunities and verified employer pages for corps members in Abuja, Lagos and across Nigeria.",
  alternates: { canonical: "/jobs/nysc" },
};

export default function NyscJobsPage() {
  const relevant = jobOpportunities.filter((item) => {
    const text = [item.title, item.summary, ...item.audiences, ...item.fields].join(" ").toLowerCase();
    return text.includes("graduate") || text.includes("nysc") || text.includes("engineering") || text.includes("trainee") || text.includes("intern");
  }).slice(0, 12);

  return (
    <section className="section page-top">
      <div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Jobs", href: "/jobs" }, { label: "NYSC jobs" }]} />
        <span className="eyebrow">Corps member career guide</span>
        <h1>NYSC jobs and PPA opportunities in Nigeria</h1>
        <p className="page-intro">Use verified employer routes to find graduate, trainee, internship and engineering opportunities that can fit NYSC or immediate post-service planning.</p>
        <AnswerFirst
          title="Looking for an NYSC PPA or graduate job?"
          summary="Start with roles whose eligibility actually matches you, then confirm directly with the employer whether it accepts serving corps members, provides a PPA placement or requires completed NYSC."
          facts={[
            { label: "Abuja search", value: "Use employer location + NYSC/PPA" },
            { label: "Engineering", value: "Open Engineering & Technical Careers" },
            { label: "Graduate roles", value: "Check NYSC completion requirement" },
            { label: "Safety", value: "Never pay for a PPA slot" },
          ]}
          links={[
            { href: "/jobs/engineering", label: "Engineering jobs" },
            { href: "/jobs/graduate", label: "Graduate trainee jobs" },
            { href: "/jobs/open-now", label: "Open now", primary: true },
          ]}
          note="A career page is not automatically an NYSC PPA. MyNigeriaGuide only calls an opportunity open when the official source supports that status."
        />
        <div className="minimal-section-heading"><div><span className="eyebrow">Verified routes</span><h2>Graduate, trainee and engineering opportunities to check.</h2></div></div>
        <div className="home-category-grid compact-category-grid">
          {relevant.map((item) => (
            <Link className="home-category-card" href={"/jobs/" + item.slug} key={item.slug}>
              <span>{item.location}</span><strong>{item.organization}</strong><small>{item.title}</small><i>{getEffectiveStatusLabel(item)} →</i>
            </Link>
          ))}
        </div>
        <div className="topic-copy">
          <h2>NYSC PPA jobs in Abuja</h2>
          <p>For Abuja, search the verified directory by employer, location and discipline, then ask the employer directly whether the role can be used as a Place of Primary Assignment. Do not assume every Abuja vacancy accepts serving corps members.</p>
          <h2>NYSC jobs for engineers</h2>
          <p>The Engineering & Technical Careers hub groups roles and employer career pages relevant to mechanical, electrical, civil, software and other technical applicants. Check each page for whether NYSC must already be completed.</p>
          <h2>Entry-level and graduate jobs</h2>
          <p>Graduate-trainee programmes often have strict graduation-year, degree-class and NYSC rules. The Reckitt Trailblazers 5.0 page, for example, requires NYSC completion by December 2026, so the detail page makes that requirement visible before you apply.</p>
        </div>
      </div>
    </section>
  );
}

// Use the live Nigeria-calendar status rather than yesterday\u0027s prerendered snapshot.
export const dynamic = "force-dynamic";
