import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ExplorePlaceDirectory } from "@/components/explore-place-directory";
import { exploreGuides } from "@/lib/explore";
import { explorePlaces } from "@/lib/explore-places";
import { getSiteUrl } from "@/lib/site";

const stateGuideLinks = [
  ["Abia", "abia-state-travel-guide"],
  ["Adamawa", "sukur-cultural-landscape"],
  ["Akwa Ibom", "uyo"],
  ["Anambra", "anambra-heritage-circuit"],
  ["Bauchi", "yankari-game-reserve"],
  ["Bayelsa", "bayelsa-state-travel-guide"],
  ["Benue", "benue-state-travel-guide"],
  ["Borno", "borno-state-travel-guide"],
  ["Cross River", "calabar"],
  ["Delta", "delta-state-travel-guide"],
  ["Ebonyi", "ebonyi-state-travel-guide"],
  ["Edo", "benin-city"],
  ["Ekiti", "ekiti-nature-circuit"],
  ["Enugu", "enugu"],
  ["FCT Abuja", "abuja"],
  ["Gombe", "gombe-state-travel-guide"],
  ["Imo", "imo-state-travel-guide"],
  ["Jigawa", "jigawa-state-travel-guide"],
  ["Kaduna", "kaduna-state-travel-guide"],
  ["Kano", "kano"],
  ["Katsina", "katsina-state-travel-guide"],
  ["Kebbi", "kebbi-state-travel-guide"],
  ["Kogi", "kogi-state-travel-guide"],
  ["Kwara", "kwara-highlights"],
  ["Lagos", "lagos"],
  ["Nasarawa", "nasarawa-state-travel-guide"],
  ["Niger", "zuma-rock-gurara-falls"],
  ["Ogun", "abeokuta"],
  ["Ondo", "ondo-state-highlights"],
  ["Osun", "osogbo"],
  ["Oyo", "ibadan"],
  ["Plateau", "jos"],
  ["Rivers", "port-harcourt"],
  ["Sokoto", "sokoto-state-travel-guide"],
  ["Taraba", "gashaka-gumti-national-park"],
  ["Yobe", "yobe-state-travel-guide"],
  ["Zamfara", "zamfara-state-travel-guide"],
] as const;

export const metadata: Metadata = {
  title: "Explore Nigeria",
  description: "Explore all 36 Nigerian states and the FCT with city guides, attractions, hotels, restaurants, events and practical trip-planning guidance.",
  alternates: { canonical: "/explore" },
};

export default function ExplorePage() {
  const cities = exploreGuides
    .filter((guide) => guide.kind === "city")
    .sort((a, b) => a.shortTitle.localeCompare(b.shortTitle));
  const destinations = exploreGuides
    .filter((guide) => guide.kind === "destination")
    .sort((a, b) => a.shortTitle.localeCompare(b.shortTitle));
  const itineraries = exploreGuides
    .filter((guide) => guide.kind === "itinerary")
    .sort((a, b) => a.shortTitle.localeCompare(b.shortTitle));
  const currentEvents = exploreGuides
    .filter((guide) => guide.kind === "event")
    .sort((a, b) => b.lastReviewed.localeCompare(a.lastReviewed) || a.shortTitle.localeCompare(b.shortTitle))
    .slice(0, 8);
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

      <section className="section page-top minimal-section-hero tour-compact-hero">
        <div className="container">
          <span className="eyebrow">Tour Nigeria</span>
          <h1>Find where to go.</h1>
          <p className="page-intro">Search places directly, or browse Nigeria by state, city, destination or short trip.</p>
          <form className="section-quick-search" action="/explore#places" method="get" role="search">
            <label>
              <span>Search Tour Nigeria</span>
              <input type="search" name="q" placeholder="City, restaurant, hotel, attraction…" />
            </label>
            <button type="submit">Search places</button>
          </form>
          <div className="minimal-inline-links primary-shortcuts" aria-label="Tour Nigeria shortcuts">
            <a href="#places">Places</a>
            <a href="#browse-guides">Browse Nigeria</a>
            <Link href="/explore/events">Events & festivals</Link>
          </div>
        </div>
      </section>

      {currentEvents.length ? (
        <section className="section" aria-labelledby="current-events-heading">
          <div className="container">
            <div className="minimal-section-heading">
              <div>
                <span className="eyebrow">Current events</span>
                <h2 id="current-events-heading">Fresh event guides to check now.</h2>
                <p>Direct links to recently reviewed festivals and events help visitors and search engines reach time-sensitive guides without relying on filters.</p>
              </div>
              <Link href="/explore/events">All events →</Link>
            </div>
            <div className="home-category-grid compact-category-grid">
              {currentEvents.map((guide) => (
                <Link className="home-category-card" href={"/explore/" + guide.slug} key={guide.slug}>
                  <span>{guide.region} · reviewed {guide.lastReviewed}</span>
                  <strong>{guide.shortTitle}</strong>
                  <small>{guide.summary}</small>
                  <i>Open event guide →</i>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section explore-place-section tour-place-section" id="places">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Places</span>
              <h2>Visit, eat or stay.</h2>
              <p>Start with a few verified places. Search or filter to narrow the list, then reveal more only when you need them.</p>
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

      <section className="section tour-browse-section" id="browse-guides">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Browse Nigeria</span>
              <h2>Open only the list you need.</h2>
              <p>All guides remain available without turning the landing page into one long catalogue.</p>
            </div>
          </div>

          <div className="tour-browse-stack">
            <details className="browse-disclosure" id="states">
              <summary>
                <span>States & FCT</span>
                <small>37 entry points</small>
              </summary>
              <nav className="disclosure-link-grid state-index-links" aria-label="Explore Nigeria by state">
                {stateGuideLinks.map(([state, slug]) => (
                  <Link href={"/explore/" + slug} key={state}>{state}</Link>
                ))}
              </nav>
            </details>

            <details className="browse-disclosure" id="cities">
              <summary>
                <span>City guides</span>
                <small>{cities.length} guides</small>
              </summary>
              <nav className="disclosure-link-grid" aria-label="Explore Nigeria city guides">
                {cities.map((guide) => (
                  <Link href={"/explore/" + guide.slug} key={guide.slug}>{guide.shortTitle}</Link>
                ))}
              </nav>
            </details>

            <details className="browse-disclosure" id="destinations">
              <summary>
                <span>Destinations</span>
                <small>{destinations.length} guides</small>
              </summary>
              <nav className="disclosure-link-grid" aria-label="Explore Nigeria destinations">
                {destinations.map((guide) => (
                  <Link href={"/explore/" + guide.slug} key={guide.slug}>{guide.shortTitle}</Link>
                ))}
              </nav>
            </details>

            {itineraries.length ? (
              <details className="browse-disclosure" id="itineraries">
                <summary>
                  <span>Short trips</span>
                  <small>{itineraries.length} ideas</small>
                </summary>
                <nav className="disclosure-link-grid" aria-label="Explore Nigeria short trips">
                  {itineraries.map((guide) => (
                    <Link href={"/explore/" + guide.slug} key={guide.slug}>{guide.shortTitle}</Link>
                  ))}
                </nav>
              </details>
            ) : null}
          </div>

          <div className="minimal-inline-links tour-city-shortcuts" aria-label="Popular city shortcuts">
            <Link href="/explore/things-to-do-lagos">Things to do in Lagos</Link>
            <Link href="/explore/things-to-do-abuja">Things to do in Abuja</Link>
          </div>
        </div>
      </section>
    </>
  );
}
