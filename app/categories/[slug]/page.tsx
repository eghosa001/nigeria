import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryFaqs } from "@/components/category-faqs";
import { JsonLd } from "@/components/json-ld";
import { ServiceCard } from "@/components/service-card";
import { getCategoryFaqs } from "@/data/category-faqs";
import { categorySlug } from "@/lib/category";
import { categories, publicServices } from "@/lib/data";
import { growthHubs } from "@/lib/growth-hubs";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ slug: categorySlug(category.name) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => categorySlug(item.name) === slug);
  if (!category) return {};

  return {
    title: category.name + " services in Nigeria",
    description: category.description + " Browse source-linked fees, requirements, official portals and last-checked guidance.",
    alternates: { canonical: "/categories/" + slug },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((item) => categorySlug(item.name) === slug);
  if (!category) notFound();

  const services = publicServices.filter((service) => service.category === category.name);
  const visibleServices = services.slice(0, 24);
  const moreServices = services.slice(24);
  const agencies = [...new Set(services.map((service) => service.agencySlug.toUpperCase()))];
  const base = getSiteUrl();
  const faqs = getCategoryFaqs(category.name);
  const serviceSlugs = new Set(services.map((service) => service.slug));
  const topicHubs = growthHubs.filter((hub) => hub.serviceSlugs.some((serviceSlug) => serviceSlugs.has(serviceSlug)));
  const popularSearches = topicHubs
    .flatMap((hub) => hub.searches)
    .filter((item) => serviceSlugs.has(item.serviceSlug))
    .filter((item, index, items) => items.findIndex((candidate) => candidate.query === item.query) === index)
    .slice(0, 12);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Services", item: base + "/services" },
      { "@type": "ListItem", position: 3, name: category.name, item: base + "/categories/" + slug },
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name + " services in Nigeria",
    description: category.description,
    url: base + "/categories/" + slug,
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name + " government services in Nigeria",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.shortTitle,
      url: base + "/services/" + service.slug,
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbLd, collectionLd, itemList, faqLd]} />
      <section className="section page-top">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: category.name },
            ]}
          />

          <span className="eyebrow">Service category</span>
          <h1>{category.name} services in Nigeria</h1>
          <p className="page-intro">{category.description}</p>

          <AnswerFirst
            title={"Find the right " + category.name.toLowerCase() + " task quickly"}
            summary={"Start with the exact task you need. Each guide below shows the current fee or status, requirements, steps, official links and last-checked date."}
            facts={[
              { label: "Published guides", value: String(services.length) },
              { label: "Agency groups", value: String(agencies.length) },
              { label: "Source conflicts", value: String(services.filter((service) => service.status === "conflict").length) },
              { label: "Common task", value: popularSearches[0]?.query ?? services[0]?.shortTitle ?? "Browse the guides below" },
            ]}
            links={[
              ...(popularSearches[0] ? [{ href: "/services/" + popularSearches[0].serviceSlug, label: popularSearches[0].query }] : []),
              { href: "/services?category=" + encodeURIComponent(category.name), label: "View all in directory", primary: true },
            ]}
          />

          <div className="category-summary">
            <div><strong>{services.length}</strong><span>published guides</span></div>
            <div><strong>{agencies.length}</strong><span>agency group{agencies.length === 1 ? "" : "s"}</span></div>
            <div><strong>{services.filter((service) => service.status === "conflict").length}</strong><span>official-source conflicts</span></div>
          </div>

          {topicHubs.length ? (
            <section className="service-topic-links" aria-labelledby="category-topic-hubs">
              <span className="eyebrow">Explore by topic</span>
              <h2 id="category-topic-hubs">Start with a focused guide collection</h2>
              <div className="related-links">
                {topicHubs.map((hub) => (
                  <Link key={hub.slug} href={"/topics/" + hub.slug}>
                    {hub.title} <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {popularSearches.length ? (
            <section className="service-topic-links" aria-labelledby="category-common-searches">
              <span className="eyebrow">Common searches</span>
              <h2 id="category-common-searches">Popular tasks in {category.name}</h2>
              <div className="related-links topic-searches">
                {popularSearches.map((item) => (
                  <Link key={item.query} href={"/services/" + item.serviceSlug}>
                    {item.query} <span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {category.name === "Foreign visas" ? (
            <section className="visa-country-picker" aria-labelledby="visa-country-picker-title">
              <div>
                <span className="eyebrow">Choose destination</span>
                <h2 id="visa-country-picker-title">Where are you travelling to?</h2>
                <p>Pick a country to go straight to its Nigerian-applicant visa guide.</p>
              </div>
              <div className="visa-country-grid">
                {services.map((service) => (
                  <Link key={service.slug} href={"/services/" + service.slug}>
                    <strong>{service.shortTitle.replace(/ visa.*$/i, "").replace(/ visitor.*$/i, "")}</strong>
                    <span>Requirements, fees & application →</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <div className="section-heading category-page-heading">
            <div>
              <span className="eyebrow">Published guidance</span>
              <h2>{category.name} guides</h2>
            </div>
            <Link href={"/services?category=" + encodeURIComponent(category.name)}>Filter in full directory →</Link>
          </div>

          <div className="service-grid">
            {visibleServices.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>

          {moreServices.length ? (
            <details className="browse-disclosure top-gap">
              <summary>Browse {moreServices.length} more {category.name.toLowerCase()} guides</summary>
              <div className="disclosure-link-grid">
                {moreServices.map((service) => (
                  <Link key={service.slug} href={"/services/" + service.slug}>
                    {service.shortTitle}
                  </Link>
                ))}
              </div>
            </details>
          ) : null}

          <CategoryFaqs category={category.name} />
        </div>
      </section>
    </>
  );
}
