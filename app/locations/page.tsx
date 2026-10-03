import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { serviceLocationCities } from "@/data/service-locations";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Government service offices by city in Nigeria",
  description: "Find source-linked JAMB, passport, NIN, driver's-licence and CAC office routes in major Nigerian cities.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  const base = getSiteUrl();
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Government service office guides by Nigerian city",
    numberOfItems: serviceLocationCities.length,
    itemListElement: serviceLocationCities.map((city, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: city.title,
      url: base + "/locations/" + city.slug,
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <section className="section page-top">
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Locations" }]} />
          <span className="eyebrow">Service locations</span>
          <h1>Government service offices by city</h1>
          <p className="page-intro">
            Find official routes for common government services without depending on old copied address lists. Where an agency has a live finder, the city guide sends you to that finder; where it publishes a current address, the guide shows it.
          </p>

          <div className="related-links">
            {serviceLocationCities.map((city) => (
              <Link key={city.slug} href={"/locations/" + city.slug}>
                <strong>{city.city}</strong> — {city.entries.map((entry) => entry.agency).join(", ")} <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>

          <div className="info-box office-note">
            These pages are navigation guides, not a substitute for the agency. Confirm appointments, opening arrangements and the final service location on the linked official source before travelling.
          </div>
        </div>
      </section>
    </>
  );
}
