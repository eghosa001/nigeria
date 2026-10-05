import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JobCollection } from "@/components/job-collection";
import { JsonLd } from "@/components/json-ld";
import { getJobFacetOpportunities, getJobProfessionFacet, jobProfessionFacets } from "@/lib/job-facets";
import { isEffectivelyOpen } from "@/lib/job-runtime";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return jobProfessionFacets.map((facet) => ({ slug: facet.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const facet = getJobProfessionFacet(slug);
  if (!facet) return {};
  return { title: facet.title + ": Verified Opportunities", description: facet.description, alternates: { canonical: "/jobs/professions/" + facet.slug } };
}

export default async function JobProfessionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const facet = getJobProfessionFacet(slug);
  if (!facet) notFound();
  const items = getJobFacetOpportunities(facet);
  const open = items.filter((item) => isEffectivelyOpen(item)).length;
  const base = getSiteUrl();
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: facet.title, description: facet.description, url: base + "/jobs/professions/" + facet.slug, mainEntity: { "@type": "ItemList", numberOfItems: items.length, itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, url: base + "/jobs/" + item.slug })) } }} />
      <section className="section page-top jobs-section-top"><div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Jobs & Careers", href: "/jobs" }, { label: facet.shortTitle }]} />
        <span className="eyebrow">Jobs by profession</span><h1>{facet.title}</h1><p className="page-intro">{facet.description}</p>
        <AnswerFirst title={"How many " + facet.shortTitle.toLowerCase() + " pathways are verified?"} summary={items.length + " verified opportunities or employer pathways match this professional area, including " + open + " marked open now."} facts={[{ label: "Verified matches", value: String(items.length) }, { label: "Open now", value: String(open) }, { label: "Application rule", value: "Use the official source" }, { label: "Duplicates", value: "One canonical job page" }]} links={[{ href: "/jobs/open-now", label: "Open jobs" }, { href: "/jobs", label: "Full directory", primary: true }]} />
      </div></section>
      <section className="section"><div className="container"><JobCollection opportunities={items} /></div></section>
      <section className="section"><div className="container"><div className="jobs-topic-links">{jobProfessionFacets.filter((other) => other.slug !== facet.slug).map((other) => <Link key={other.slug} href={"/jobs/professions/" + other.slug}>{other.shortTitle}</Link>)}</div></div></section>
    </>
  );
}
