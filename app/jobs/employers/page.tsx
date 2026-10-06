import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { indexableJobEmployers } from "@/lib/job-employers";

export const metadata: Metadata = {
  title: "Nigeria Employers Hiring: Verified Jobs & Career Pages",
  description: "Browse employers with multiple verified MyNigeriaGuide job or career records, then check current vacancies, recruitment status and the official employer source.",
  alternates: { canonical: "/jobs/employers" },
};

export default function JobEmployersPage() {
  const employers = [...indexableJobEmployers].sort((a, b) =>
    b.activeCount - a.activeCount ||
    b.opportunitySlugs.length - a.opportunitySlugs.length ||
    a.name.localeCompare(b.name)
  );

  return (
    <section className="section page-top jobs-section-top">
      <div className="container">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Jobs & Careers", href: "/jobs" },
          { label: "Employers" },
        ]} />
        <span className="eyebrow">Employer directory</span>
        <h1>Nigerian employers with multiple verified career records.</h1>
        <p className="page-intro">
          These employer hubs are created only when the Jobs catalog has at least two distinct verified records for the organisation.
          A career page is not treated as proof that a vacancy is currently open.
        </p>

        <div className="service-grid top-gap">
          {employers.map((employer) => (
            <article className="service-card" key={employer.slug}>
              <div className="card-topline">
                <span>{employer.sector}</span>
                <span>{employer.activeCount} open now</span>
              </div>
              <h2><Link href={"/jobs/employers/" + employer.slug}>{employer.name}</Link></h2>
              <p>
                {employer.opportunitySlugs.length} verified job, recruitment or career records.
                Latest source check: {employer.latestVerified}.
              </p>
              <div className="service-meta">
                <strong>{employer.opportunitySlugs.length} verified records</strong>
                <Link href={"/jobs/employers/" + employer.slug}>Employer hub →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
