import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";\nimport { CategoryFaqs } from "@/components/category-faqs";
import { JsonLd } from "@/components/json-ld";
import { ServiceCard } from "@/components/service-card";
import { getCategoryFaqs } from "@/data/category-faqs";\nimport { categorySlug } from "@/lib/category";
import { categories, publicServices } from "@/lib/data";
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
  const agencies = [...new Set(services.map((service) => service.agencySlug.toUpperCase()))];
  const base = getSiteUrl();\n  const faqs = getCategoryFaqs(category.name);

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

  return (
    <>
      <JsonLd data={itemList} />
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

          <div className="category-summary">
            <div><strong>{services.length}</strong><span>published guides</span></div>
            <div><strong>{agencies.length}</strong><span>agency group{agencies.length === 1 ? "" : "s"}</span></div>
            <div><strong>{services.filter((service) => service.status === "conflict").length}</strong><span>official-source conflicts</span></div>
          </div>

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
            {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
          </div>
        </div>
      </section>
    </>
  );
}
