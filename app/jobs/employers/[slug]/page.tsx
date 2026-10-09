import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JobCollection } from "@/components/job-collection";
import { JsonLd } from "@/components/json-ld";
import { getEmployerOpportunities, getJobEmployerBySlug, indexableJobEmployers } from "@/lib/job-employers";
import { getEffectiveJobStatus } from "@/lib/job-runtime";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";
export const dynamicParams = false;

export function generateStaticParams() {
  return indexableJobEmployers.map((employer) => ({ slug: employer.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const employer = getJobEmployerBySlug(slug);
  if (!employer) return {};

  return {
    title: employer.name + " Jobs & Careers in Nigeria",
    description:
      "Verified " + employer.name + " jobs, recruitment exercises and official career routes in Nigeria, with current status, requirements, source dates and direct application links.",
    alternates: { canonical: "/jobs/employers/" + employer.slug },
  };
}

export default async function JobEmployerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const employer = getJobEmployerBySlug(slug);
  if (!employer) notFound();

  const items = getEmployerOpportunities(employer.name);
  const openItems = items.filter((item) => getEffectiveJobStatus(item) === "open");
  const base = getSiteUrl();
  const pageUrl = base + "/jobs/employers/" + employer.slug;

  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: employer.name + " jobs and careers",
    description: "Job opportunities and career information for " + employer.name + " in MyNigeriaGuide.",
    url: pageUrl,
    about: { "@type": "Organization", name: employer.name },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
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
      <section className="section page-top jobs-section-top">
        <div className="container">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Jobs & Careers", href: "/jobs" },
            { label: "Employers", href: "/jobs/employers" },
            { label: employer.name },
          ]} />
          <span className="eyebrow">Employer career hub</span>
          <h1>{employer.name} jobs & careers in Nigeria</h1>
          <p className="page-intro">
            Explore {items.length} job listings and career pathways for {employer.name}.
            Open roles, closed exercises and employer-wide career portals remain clearly separated.
          </p>

          <AnswerFirst
            title={"What is currently available from " + employer.name + "?"}
            summary={
              openItems.length
                ? openItems.length + " " + employer.name + " " + (openItems.length === 1 ? "opportunity is" : "opportunities are") + " currently marked open. Check the employer source before applying."
                : "No listed opportunities are currently marked open. Check the employer’s careers website for new vacancies."
            }
            facts={[
              { label: "Listed opportunities", value: String(items.length) },
              { label: "Open now", value: String(openItems.length) },
              { label: "Sector", value: employer.sector },
              { label: "Latest source check", value: employer.latestVerified },
            ]}
            links={[
              ...(openItems[0] ? [{ href: "/jobs/" + openItems[0].slug, label: "View open opportunity", primary: true }] : []),
              { href: "/jobs/open-now", label: "All jobs open now" },
              { href: "/jobs/employers", label: "Browse employers" },
            ]}
            note="An employer careers page does not necessarily mean applications are open. Always check the current vacancy and deadline."
          />
        </div>
      </section>

      <section className="section" id="employer-opportunities">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Job opportunities</span>
              <h2>{employer.name} opportunities and career routes.</h2>
              <p>Review the details and apply only through the official employer or agency link.</p>
            </div>
          </div>
          <JobCollection opportunities={items} />
          <p className="job-muted top-gap"><Link href="/jobs">Search all verified Jobs & Careers →</Link></p>
        </div>
      </section>
    </>
  );
}
