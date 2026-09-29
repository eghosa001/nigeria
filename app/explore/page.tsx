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
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="hero-kicker-dot" aria-hidden="true" />Explore Nigeria</div>
            <h1>Plan the trip, not just the <span>destination.</span></h1>
            <p className="hero-lead">Start with city guides, standout destinations and realistic planning notes for transport, weather, access and timing.</p>
            <div className="related-links">
              <a href="#cities">Browse city guides →</a>
              <a href="#destinations">Major destinations →</a>
            </div>
            <p className="hero-note">Opening hours, prices, road conditions and venue access can change. Each guide tells you what to verify before you travel.</p>
          </div>

          <aside className="trust-panel" aria-label="Explore Nigeria guide principles">
            <div className="trust-panel-top">
              <span className="trust-kicker">Travel guide approach</span>
              <span className="trust-live"><i aria-hidden="true" />Growing</span>
            </div>
            <strong>{exploreGuides.length} focused guides · {explorePlaces.length} mapped places</strong>
            <p>Useful first-party planning pages with addresses, map links and price notes instead of hundreds of thin destination listings.</p>
            <div className="trust-row"><span>✓</span><div><strong>Practical before pretty</strong><small>Transport, timing and access come before hype.</small></div></div>
            <div className="trust-row"><span>✓</span><div><strong>Current checks matter</strong><small>Volatile details are flagged for direct confirmation.</small></div></div>
            <div className="trust-row"><span>✓</span><div><strong>Built to expand cleanly</strong><small>Hotels, food, events and itineraries can plug into the same structure.</small></div></div>
          </aside>
        </div>
      </section>

      <section className="section" id="cities">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">City guides</span><h2>Start with the city you are visiting.</h2></div>
          </div>
          <div className="home-category-grid">
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
          <div className="section-heading">
            <div>
              <span className="eyebrow">Places directory</span>
              <h2>Find somewhere to visit, eat or stay.</h2>
              <p>Addresses and Google Maps links are kept separate from volatile prices. Restaurant cost notes show the source/verification date on the destination page.</p>
            </div>
          </div>
          <ExplorePlaceDirectory
            places={explorePlaces}
            guides={exploreGuides.map((guide) => ({ slug: guide.slug, shortTitle: guide.shortTitle }))}
          />
        </div>
      </section>

      <section className="section premium-dark-section" id="destinations">
        <div className="container">
          <div className="section-heading section-heading-light">
            <div><span className="eyebrow">Major destinations</span><h2>Trips worth planning around.</h2></div>
          </div>
          <div className="home-updates-grid">
            {destinations.map((guide) => (
              <article className="home-update-card" key={guide.slug}>
                <div><span>{guide.region}</span><time dateTime={guide.lastReviewed}>Reviewed {guide.lastReviewed}</time></div>
                <h3>{guide.shortTitle}</h3>
                <p>{guide.summary}</p>
                <Link href={"/explore/" + guide.slug}>Plan this trip →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">Short-trip ideas</span><h2>Build around the time you actually have.</h2></div>
          </div>
          <div className="home-category-grid">
            {itineraries.map((guide) => (
              <Link className="home-category-card" href={"/explore/" + guide.slug} key={guide.slug}>
                <span>{guide.region}</span>
                <strong>{guide.shortTitle}</strong>
                <small>{guide.summary}</small>
                <i>See trip ideas →</i>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
