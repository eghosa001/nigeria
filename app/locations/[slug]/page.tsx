import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { getServiceLocationCity, serviceLocationCities } from "@/data/service-locations";
import { getPublicService } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceLocationCities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const city = getServiceLocationCity(slug);
  if (!city) return {};

  return {
    title: { absolute: city.title + " | MyNigeriaGuide" },
    description: city.description,
    alternates: { canonical: "/locations/" + city.slug },
    openGraph: {
      title: city.title,
      description: city.description,
      type: "website",
      url: "/locations/" + city.slug,
    },
  };
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = getServiceLocationCity(slug);
  if (!city) notFound();

  const base = getSiteUrl();
  const pageUrl = base + "/locations/" + city.slug;
  const relatedSlugs = [...new Set(city.entries.flatMap((entry) => entry.relatedServiceSlugs))];
  const relatedServices = relatedSlugs
    .map(getPublicService)
    .filter((service) => service !== undefined)
    .slice(0, 8);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Locations", item: base + "/locations" },
      { "@type": "ListItem", position: 3, name: city.city, item: pageUrl },
    ],
  };

  const placeLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: city.city,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.city,
      addressRegion: city.state,
      addressCountry: "NG",
    },
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: city.title,
    numberOfItems: city.entries.length,
    itemListElement: city.entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.agency + " — " + entry.service,
      url: entry.officialUrl,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbLd, placeLd, itemListLd]} />
      <section className="section page-top">
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Locations", href: "/locations" }, { label: city.city }]} />
          <span className="eyebrow">Verified service locations</span>
          <h1>{city.title}</h1>
          <p className="page-intro">{city.description}</p>
          <p className="checked-date">Official sources checked {city.lastVerified}</p>

          <AnswerFirst
            title={"Find the right official service point in " + city.city}
            summary={city.description}
            facts={[
              { label: "Published service points", value: String(city.entries.length) },
              { label: "State", value: city.state },
              { label: "Services covered", value: city.entries.slice(0, 3).map((entry) => entry.service).join(", ") },
              { label: "Verified", value: city.lastVerified },
            ]}
            links={[
              { href: "#offices", label: "See service points", primary: true },
              ...(relatedServices[0] ? [{ href: "/services/" + relatedServices[0].slug, label: "Open a service guide" }] : []),
            ]}
            note="Check the exact service guide before travelling; appointment and centre arrangements can change."
          />

          <div className="service-grid" id="offices">
            {city.entries.map((entry) => (
              <article className="sidebar-card" key={entry.agency + entry.service}>
                <span>{entry.agency}</span>
                <h2>{entry.service}</h2>
                {entry.address ? <p><strong>Published address:</strong> {entry.address}</p> : null}
                <p>{entry.detail}</p>
                <a href={entry.officialUrl} target="_blank" rel="noreferrer">
                  {entry.sourceLabel} ↗
                </a>
                <small>Checked {entry.checked}</small>
              </article>
            ))}
          </div>

          {relatedServices.length ? (
            <section className="service-topic-links" aria-labelledby="location-related-guides">
              <span className="eyebrow">Before you visit</span>
              <h2 id="location-related-guides">Open the exact service guide first</h2>
              <div className="related-links">
                {relatedServices.map((service) => (
                  <Link key={service.slug} href={"/services/" + service.slug}>
                    {service.shortTitle} <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <div className="info-box office-note">
            Office arrangements can change. If the linked agency provides an appointment, state/LGA selector or live centre finder, use that live result as the final instruction before travelling.
          </div>
        </div>
      </section>
    </>
  );
}
