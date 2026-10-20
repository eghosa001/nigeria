import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ServiceCard } from "@/components/service-card";
import { ServiceTaskComparison } from "@/components/service-task-comparison";
import { getPublicService } from "@/lib/data";
import { getGrowthHub, growthHubs } from "@/lib/growth-hubs";
import { getDistinctTopicTaskLinks } from "@/lib/topic-task-links";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return growthHubs.map((hub) => ({ slug: hub.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hub = getGrowthHub(slug);
  if (!hub) return {};

  return {
    title: { absolute: hub.title },
    description: hub.description,
    alternates: { canonical: "/topics/" + hub.slug },
    openGraph: {
      title: hub.title,
      description: hub.description,
      type: "website",
      url: "/topics/" + hub.slug,
    },
    twitter: {
      card: "summary_large_image",
      title: hub.title,
      description: hub.description,
    },
  };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hub = getGrowthHub(slug);
  if (!hub) notFound();

  const services = hub.serviceSlugs.map(getPublicService).filter((service) => service !== undefined);
  // Search routes may intentionally point to a connected service outside the
  // hub's featured cards. Keep every existing valid destination reachable,
  // but show it only once, rather than dropping useful contextual guidance.
  const searchServices = [...new Set(hub.searches.map((search) => search.serviceSlug))]
    .map(getPublicService)
    .filter((service) => service !== undefined);
  const taskLinks = getDistinctTopicTaskLinks(hub.searches, searchServices);
  const base = getSiteUrl();
  const pageUrl = base + "/topics/" + hub.slug;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: hub.shortTitle, item: pageUrl },
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: hub.title,
    description: hub.description,
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: "MyNigeriaGuide", url: base },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: services.length,
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.shortTitle,
        url: base + "/services/" + service.slug,
      })),
    },
  };

  return (
    <>
      <JsonLd data={[breadcrumbLd, collectionLd]} />
      <section className="section page-top topic-page">
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: hub.shortTitle }]} />
          <span className="eyebrow">Popular task hub</span>
          <h1>{hub.title}</h1>
          <p className="page-intro">{hub.description}</p>

          <AnswerFirst
            title="Choose the service that matches your situation"
            summary={hub.intro[0] ?? hub.description}
            facts={[]}
            links={[
              ...(taskLinks[0] ? [{ href: "/services/" + taskLinks[0].slug, label: taskLinks[0].label }] : []),
              { href: "#task-choices", label: "Compare the available tasks", primary: true },
            ]}
          />

          {hub.slug === "cac-business" ? (
            <nav className="minimal-inline-links" aria-label="Choose a CAC registration type">
              <Link href="/services/cac-business-name-registration">Register a business name</Link>
              <Link href="/services/cac-company-registration">Incorporate a company</Link>
              <Link href="/services/cac-public-search">Search an existing registration</Link>
            </nav>
          ) : null}

          <div className="topic-copy">
            {hub.intro.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <ServiceTaskComparison services={services} heading={"Compare " + hub.shortTitle + " tasks"} limit={8} />

          {taskLinks.length ? (
            <section className="topic-search-section" id="task-choices" aria-labelledby="topic-task-heading">
              <span className="eyebrow">Different services, different steps</span>
              <h2 id="topic-task-heading">Choose what you need to do</h2>
              <nav className="related-links topic-searches" aria-label="Distinct service tasks">
                {taskLinks.map((task) => <Link key={task.slug} href={"/services/" + task.slug}>{task.label} <span aria-hidden="true">→</span></Link>)}
              </nav>
            </section>
          ) : null}

          <div className="section-heading topic-services-heading">
            <div>
              <span className="eyebrow">Verified guidance</span>
              <h2>Choose what you need to do</h2>
            </div>
            <Link href="/services">Browse all services →</Link>
          </div>

          <div className="service-grid">
            {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>

          <div className="topic-trust-note">
            <strong>Why these pages are grouped here</strong>
            <p>Each service keeps its own official sources, last-checked date, fee/status and application route. This hub only helps you reach the correct guide faster; it does not replace the responsible agency.</p>
          </div>
        </div>
      </section>
    </>
  );
}
