import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JobCollection } from "@/components/job-collection";
import { JsonLd } from "@/components/json-ld";
import { getJobFacetOpportunities, getJobLocationFacet, jobLocationFacets } from "@/lib/job-facets";
import { isEffectivelyOpen } from "@/lib/job-runtime";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return jobLocationFacets.map((facet) => ({ slug: facet.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const facet = getJobLocationFacet(slug);
  if (!facet) return {};
  return { title: facet.title + ": Verified Vacancies & Career Routes", description: facet.description, alternates: { canonical: "/jobs/locations/" + facet.slug } };
}

export default async function JobLocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const facet = getJobLocationFacet(slug);
  if (!facet) notFound();
  const items = getJobFacetOpportunities(facet);
  const open = items.filter((item) => isEffectivelyOpen(item)).length;
  const base = getSiteUrl();
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: facet.title, description: facet.description, url: base + "/jobs/locations/" + facet.slug, mainEntity: { "@type": "ItemList", numberOfItems: items.length, itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, url: base + "/jobs/" + item.slug })) } }} />
      <section className="section page-top jobs-section-top"><div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Jobs & Careers", href: "/jobs" }, { label: facet.shortTitle }]} />
        <span className="eyebrow">Jobs by location</span><h1>{facet.title}</h1><p className="page-intro">{facet.description}</p>
        <AnswerFirst title={"What is available in " + facet.shortTitle + "?"} summary={items.length + " verified job or career pathways currently match this location, including " + open + " marked open now."} facts={[{ label: "Verified matches", value: String(items.length) }, { label: "Open now", value: String(open) }, { label: "Source rule", value: "Official employer or agency" }, { label: "Status", value: "Deadline-aware" }]} links={[{ href: "/jobs/open-now", label: "All open jobs" }, { href: "/jobs", label: "Full directory", primary: true }]} />
      </div></section>
      <section className="section"><div className="container"><JobCollection opportunities={items} /></div></section>
      <section className="section"><div className="container"><div className="jobs-topic-links">{jobLocationFacets.filter((other) => other.slug !== facet.slug).map((other) => <Link key={other.slug} href={"/jobs/locations/" + other.slug}>{other.shortTitle}</Link>)}</div></div></section>
    </>
  );
}
