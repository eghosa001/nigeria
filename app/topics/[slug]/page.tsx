import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ServiceCard } from "@/components/service-card";
import { getPublicService } from "@/lib/data";
import { getGrowthHub, growthHubs } from "@/lib/growth-hubs";
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
    title: hub.title,
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

          <div className="topic-copy">
            {hub.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <section className="topic-search-section" aria-labelledby="common-searches">
            <span className="eyebrow">Common searches</span>
            <h2 id="common-searches">Find the exact task faster</h2>
            <div className="related-links topic-searches">
              {hub.searches.map((search) => <Link key={search.query} href={"/services/" + search.serviceSlug}>{search.query} <span aria-hidden="true">→</span></Link>)}
            </div>
          </section>

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
