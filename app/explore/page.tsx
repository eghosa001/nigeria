import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ExplorePlaceDirectory } from "@/components/explore-place-directory";
import { exploreGuides } from "@/lib/explore";
import { explorePlaces } from "@/lib/explore-places";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Explore Nigeria",
  description: "City guides, major Nigerian destinations, weekend ideas and practical trip-planning guidance from MyNigeriaGuide.",
  alternates: { canonical: "/explore" },
};

export default function ExplorePage() {
  const cities = exploreGuides.filter((guide) => guide.kind === "city");
  const destinations = exploreGuides.filter((guide) => guide.kind === "destination");
  const itineraries = exploreGuides.filter((guide) => guide.kind === "itinerary");
  const base = getSiteUrl();

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Explore Nigeria",
    description: "Practical travel guides for Nigerian cities, destinations and short trips.",
    url: base + "/explore",
    isPartOf: { "@type": "WebSite", name: "MyNigeriaGuide", url: base },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: exploreGuides.length,
      itemListElement: exploreGuides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.title,
        url: base + "/explore/" + guide.slug,
      })),
    },
  };

  return (
    <>
      <JsonLd data={collectionLd} />

      <section className="section page-top minimal-section-hero">
        <div className="container">
          <span className="eyebrow">Tour Nigeria</span>
          <h1>Plan the trip, not just the destination.</h1>
          <p className="page-intro">Cities, places, food, stays and practical details for getting around.</p>
          <div className="minimal-inline-links">
            <a href="#cities">City guides</a>
            <a href="#places">Places</a>
            <a href="#destinations">Destinations</a>
          </div>
        </div>
      </section>

      <section className="section" id="cities">
        <div className="container">
          <div className="minimal-section-heading">
            <div><span className="eyebrow">City guides</span><h2>Start with a city.</h2></div>
          </div>
          <div className="home-category-grid compact-category-grid">
            {cities.map((guide) => (
              <Link className="home-category-card" href={"/explore/" + guide.slug} key={guide.slug}>
                <span>{guide.region}</span>
                <strong>{guide.shortTitle}</strong>
                <small>{guide.summary}</small>
                <i>Open guide →</i>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section explore-place-section" id="places">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Places</span>
              <h2>Visit, eat or stay.</h2>
            </div>
          </div>
          <ExplorePlaceDirectory
            places={explorePlaces.map((place) => ({
              slug: place.slug,
              guideSlug: place.guideSlug,
              name: place.name,
              kind: place.kind,
              area: place.area,
              address: place.address,
              summary: place.summary,
              cost: place.cost,
              mapQuery: place.mapQuery,
              tags: place.tags,
            }))}
            guides={exploreGuides.map((guide) => ({ slug: guide.slug, shortTitle: guide.shortTitle }))}
          />
        </div>
      </section>

      <section className="section" id="destinations">
        <div className="container">
          <div className="minimal-section-heading">
            <div><span className="eyebrow">Destinations</span><h2>Trips worth planning around.</h2></div>
          </div>
          <div className="minimal-travel-grid">
            {destinations.map((guide) => (
              <Link className="minimal-travel-card" href={"/explore/" + guide.slug} key={guide.slug}>
                <span>{guide.region}</span>
                <strong>{guide.shortTitle}</strong>
                <small>Plan this trip →</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {itineraries.length ? (
        <section className="section">
          <div className="container">
            <div className="minimal-section-heading">
              <div><span className="eyebrow">Short trips</span><h2>Ideas for the time you have.</h2></div>
            </div>
            <div className="home-category-grid compact-category-grid">
              {itineraries.map((guide) => (
                <Link className="home-category-card" href={"/explore/" + guide.slug} key={guide.slug}>
                  <span>{guide.region}</span>
                  <strong>{guide.shortTitle}</strong>
                  <small>{guide.summary}</small>
                  <i>See trip →</i>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
