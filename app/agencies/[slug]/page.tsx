import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ServiceCard } from "@/components/service-card";
import { agencies, getAgency, getServicesByAgency } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return agencies.map((agency) => ({ slug: agency.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const agency = getAgency(slug);
  if (!agency) return {};
  return {
    title: agency.shortName + " services",
    description: agency.description,
    alternates: { canonical: "/agencies/" + agency.slug },
  };
}

export default async function AgencyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agency = getAgency(slug);
  if (!agency) notFound();

  const agencyServices = getServicesByAgency(slug);
  const base = getSiteUrl();
  const pageUrl = base + "/agencies/" + agency.slug;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Services", item: base + "/services" },
      { "@type": "ListItem", position: 3, name: agency.shortName, item: pageUrl },
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: agency.name + " services",
    description: agency.description,
    url: pageUrl,
    about: {
      "@type": "Organization",
      name: agency.name,
      sameAs: agency.website,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: agencyServices.length,
      itemListElement: agencyServices.map((service, index) => ({
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
      <section className="section page-top">
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: agency.shortName }]} />
          <span className="eyebrow">Official agency</span>
          <h1>{agency.name}</h1>
          <p className="page-intro">{agency.description}</p>
          <a className="text-link" href={agency.website} target="_blank" rel="noreferrer">Visit official website ↗</a>

          {slug === "netherlands-mfa" ? (
            <div className="info-box top-gap">
              <strong>Looking for the Nigerian Embassy in the Netherlands or “Nigeria embassy in Holland”?</strong>
              <p>
                This page covers the Netherlands authority used for Dutch visa guidance. The Embassy of Nigeria in the Netherlands is a different office in The Hague.
              </p>
              <a href="/services/nigeria-embassy-netherlands-contact">
                Open the Nigeria Embassy Netherlands guide →
              </a>
            </div>
          ) : null}

          <div className="service-grid top-gap">
            {agencyServices.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </div>
      </section>
    </>
  );
}
