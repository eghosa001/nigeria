import { isEffectivelyOpen } from "@/lib/job-runtime";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JobCollection } from "@/components/job-collection";
import { JsonLd } from "@/components/json-ld";
import { getJobTopic, getJobTopicOpportunities, jobTopics } from "@/lib/job-topics";
import { getSiteUrl } from "@/lib/site";

export function generateStaticParams() {
  return jobTopics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getJobTopic(slug);
  if (!topic) return {};
  return {
    title: topic.title + ": Verified Career Routes",
    description: topic.description,
    alternates: { canonical: "/jobs/categories/" + topic.slug },
  };
}

function latestVerified(items: ReturnType<typeof getJobTopicOpportunities>) {
  return items.reduce((latest, item) => item.verifiedAt > latest ? item.verifiedAt : latest, "");
}

export default async function JobTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getJobTopic(slug);
  if (!topic) notFound();

  const items = getJobTopicOpportunities(topic.slug);
  const checked = latestVerified(items);
  const openCount = items.filter((item) => isEffectivelyOpen(item)).length;
  const base = getSiteUrl();
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: topic.title,
    description: topic.description,
    url: base + "/jobs/categories/" + topic.slug,
    isPartOf: { "@type": "WebSite", name: "MyNigeriaGuide", url: base },
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
            { label: topic.shortTitle },
          ]} />
          <span className="eyebrow">Jobs by industry</span>
          <h1>{topic.title}</h1>
          <p className="page-intro">{topic.description}</p>
          <AnswerFirst
            title={"How to use this " + topic.shortTitle.toLowerCase() + " career hub"}
            summary={topic.answer}
            facts={[
              { label: "Verified pathways", value: String(items.length) },
              { label: "Marked open now", value: String(openCount) },
              { label: "Latest source check", value: checked || "See each guide" },
              { label: "Application rule", value: "Apply at the official source" },
            ]}
            links={[
              { href: "/jobs/open-now", label: "Jobs open now" },
              { href: "/jobs/guides/graduate-job-application-checklist", label: "Application checklist" },
              { href: "#career-routes", label: "Browse this sector", primary: true },
            ]}
            note="A career page is not the same as a live vacancy. Open each guide to see current status and last source check."
          />
        </div>
      </section>

      <section className="section" id="career-routes">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Verified employer routes</span>
              <h2>Start with the employer responsible for the application.</h2>
              <p>Employer career pages, live vacancies and closed recruitment stages stay distinct so an old application link is not presented as current.</p>
            </div>
          </div>
          <JobCollection opportunities={items} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="minimal-section-heading">
            <div><span className="eyebrow">Related sectors</span><h2>Explore related career fields.</h2></div>
          </div>
          <div className="jobs-topic-links">
            {topic.relatedSlugs.map((relatedSlug) => {
              const related = getJobTopic(relatedSlug);
              return related ? <Link href={"/jobs/categories/" + related.slug} key={related.slug}>{related.shortTitle}</Link> : null;
            })}
            <Link href="/jobs">All Jobs & Careers</Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Use the live Nigeria-calendar status rather than yesterday\u0027s prerendered snapshot.
export const dynamic = "force-dynamic";
