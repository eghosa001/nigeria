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

// Photographs from the linked Wikimedia Commons file pages. Each carries an
// explicit CC BY-SA 4.0 license; keep the visible attribution with the image.
const destinationPhotos: Record<string, { file: string; credit: string; alt: string }> = {
  "yankari-game-reserve": {
    file: "Yankari_Game_Reserve.jpg",
    credit: "Dotun55",
    alt: "A road through Yankari Game Reserve in Bauchi State",
  },
  "obudu-mountain-resort": {
    file: "Obudu_Mountain_Resort.jpg",
    credit: "Hadassah Photostorie group",
    alt: "The mountain scenery at Obudu Mountain Resort",
  },
  "erin-ijesha-waterfall": {
    file: "Erin_Ijesha_Waterfalls.jpg",
    credit: "Baaadmus",
    alt: "Erin-Ijesha Waterfalls in Osun State",
  },
  "zuma-rock-gurara-falls": {
    file: "ZumaRock.jpg",
    credit: "Akinnaija",
    alt: "Zuma Rock, the prominent formation near Abuja",
  },
};

export const metadata: Metadata = {
  title: "Places to Visit in Nigeria: Things to Do, Cities & Attractions",
  description: "Find places to visit in Nigeria across all 36 states and the FCT, with city guides, attractions, landmarks, hotels, restaurants, events and practical things-to-do planning.",
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
  const featuredDestinations = ["yankari-game-reserve","obudu-mountain-resort","erin-ijesha-waterfall","gashaka-gumti-national-park","anambra-heritage-circuit","zuma-rock-gurara-falls","ekiti-nature-circuit","delta-state-travel-guide"]
    .flatMap((slug) => destinations.filter((guide) => guide.slug === slug));
  const currentEvents = exploreGuides
    .filter((guide) => guide.kind === "event")
    .sort((a, b) => b.lastReviewed.localeCompare(a.lastReviewed) || a.shortTitle.localeCompare(b.shortTitle))
    .slice(0, 4);
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
          <h1>Places to visit in Nigeria.</h1>
          <p className="page-intro">Discover destinations, local experiences and practical travel guides from across Nigeria.</p>
          <form className="section-quick-search" action="/explore#places" method="get" role="search">
            <label>
              <span>Search Tour Nigeria</span>
              <input type="search" name="q" placeholder="City, restaurant, hotel, attraction…" />
            </label>
            <button type="submit">Search places</button>
          </form>
          <div className="minimal-inline-links primary-shortcuts" aria-label="Tour Nigeria shortcuts">
            <a href="#featured-destinations">Featured destinations</a>
            <a href="#places">{explorePlaces.length} mapped places</a>
            <Link href="/explore/nigeria-landmarks-places-to-visit">Top places in Nigeria</Link>
            <a href="#browse-guides">Browse Nigeria</a>
            <Link href="/explore/events">Events & festivals</Link>
          </div>
        </div>
      </section>

      <section className="section tour-featured-section" id="featured-destinations" aria-labelledby="featured-destinations-heading">
        <div className="container">
          <div className="minimal-section-heading">
            <div>
              <span className="eyebrow">Across Nigeria</span>
              <h2 id="featured-destinations-heading">Where will you go next?</h2>
              <p>From mountains to cultural landmarks, start with one of these destinations.</p>
            </div>
            <a href="#browse-guides">Browse all destinations →</a>
          </div>
          <div className="tour-photo-grid">
            {featuredDestinations.filter((guide) => destinationPhotos[guide.slug]).map((guide) => {
              const photo = destinationPhotos[guide.slug];
              const source = "https://commons.wikimedia.org/wiki/File:" + photo.file;
              return (
                <article className="tour-photo-card" key={guide.slug}>
                  <Link href={"/explore/" + guide.slug} className="tour-photo-card-link">
                    <img
                      src={"https://commons.wikimedia.org/wiki/Special:FilePath/" + photo.file + "?width=720"}
                      alt={photo.alt} width={720} height={480} loading="lazy" decoding="async"
                      referrerPolicy="no-referrer"
                    />
                    <span className="tour-photo-card-meta">{guide.region}</span>
                    <strong>{guide.shortTitle}</strong>
                    <span className="tour-photo-card-action">Explore destination →</span>
                  </Link>
                  <p className="tour-photo-credit">Photo: <a href={source} target="_blank" rel="noopener noreferrer">{photo.credit}</a>
                    {" · "}<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>
                    {" · "}Cropped to fit</p>
                </article>
              );
            })}
          </div>
          <nav className="minimal-inline-links tour-more-destinations" aria-label="More places to explore">
            {featuredDestinations.filter((guide) => !destinationPhotos[guide.slug]).map((guide) => (
              <Link href={"/explore/" + guide.slug} key={guide.slug}>{guide.shortTitle} →</Link>
            ))}
          </nav>
        </div>
      </section>

      {currentEvents.length ? (
        <section className="section" aria-labelledby="current-events-heading">
          <div className="container">
            <div className="minimal-section-heading">
              <div>
                <span className="eyebrow">Current events</span>
                <h2 id="current-events-heading">Fresh event guides to check now.</h2>
                <p>See dates, venues and what to check before attending.</p>
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
              <p>Browse {explorePlaces.length} verified mapped places across attractions, nature, landmarks, restaurants, hotels and shopping. Eight places appear initially. Use filters or show more to explore at your own pace.</p>
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
              <h2>Explore by region, city or trip type.</h2>
              <p>Find the right starting point, then open a guide for practical details.</p>
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
