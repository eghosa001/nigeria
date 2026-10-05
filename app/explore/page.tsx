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
  description: "Explore all 36 Nigerian states and the FCT with city guides, attractions, hotels, restaurants, events and practical trip-planning guidance."
  alternates: { canonical: "/explore" },
};

export default function ExplorePage() {
  const cities = exploreGuides.filter((guide) => guide.kind === "city");
  const destinations = exploreGuides
    .filter((guide) => guide.kind === "destination")
    .sort((a, b) => a.shortTitle.localeCompare(b.shortTitle));
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
          <form className="section-quick-search" action="/explore#places" method="get" role="search">
            <label>
              <span>Search Tour Nigeria</span>
              <input type="search" name="q" placeholder="City, restaurant, hotel, attraction…" />
            </label>
            <button type="submit">Search places</button>
          </form>
          <div className="minimal-inline-links">
            <Link href="/explore/events">Events & festivals</Link>
            <a href="#states">36 states + FCT</a>
            <a href="#cities">City guides</a>
            <a href="#places">Places</a>
            <a href="#destinations">Destinations</a>
            <Link href="/explore?q=restaurant#places">Restaurants</Link>
            <Link href="/explore?q=hotel#places">Hotels & stays</Link>
            <Link href="/explore?q=attraction#places">Attractions</Link>
            <Link href="/explore?q=shopping#places">Shopping</Link>
            <Link href="/explore/things-to-do-lagos">Things to do in Lagos</Link>
            <Link href="/explore/things-to-do-abuja">Things to do in Abuja</Link>
          </div>
        </div>
      </section>

      <section className="section" id="states">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Nationwide coverage</span>
              <h2>Explore all 36 states + FCT.</h2>
              <p>Start with a state, then use its guide to find places, routes and practical planning details.</p>
            </div>
          </div>
          <nav className="minimal-inline-links state-index-links" aria-label="Explore Nigeria by state">
            {stateGuideLinks.map(([state, slug]) => (
              <Link href={"/explore/" + slug} key={state}>{state}</Link>
            ))}
          </nav>
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
