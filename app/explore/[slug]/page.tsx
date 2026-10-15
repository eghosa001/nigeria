import type { Metadata } from "next";
import Link from "next/link";
import { PageOutline } from "@/components/page-outline";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AdSlot } from "@/components/ad-slot";
import { AD_SLOTS } from "@/lib/adsense-config";
import { JsonLd } from "@/components/json-ld";
import { exploreGuides, getExploreGuide } from "@/lib/explore";
import { getRelatedExploreGuides } from "@/lib/explore-discovery";
import { explorePlaceKindLabel, getExplorePlacesForGuide, googleMapsUrl } from "@/lib/explore-places";
import { getSiteUrl } from "@/lib/site";
import { SavePageButton } from "@/components/personal-library";
import { destinationPhotos, destinationPhotoUrls } from "@/lib/destination-photos";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return exploreGuides.map((guide) => ({ slug: guide.slug }));
}

function truncateSeo(value: string, limit: number) {
  if (value.length <= limit) return value;
  const shortened = value.slice(0, limit - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return (lastSpace > Math.floor(limit * 0.7) ? shortened.slice(0, lastSpace) : shortened).trimEnd() + "…";
}

function getExploreSeoTitle(guide: NonNullable<ReturnType<typeof getExploreGuide>>) {
  const year = guide.lastReviewed.slice(0, 4);
  if (guide.slug === "nigeria-landmarks-places-to-visit") return "Famous Nigerian Landmarks: Locations & Visitor Guide";
  if (guide.slug === "calabar-carnival-2026") return "Calabar Carnival 2026: Parade Dates & Trip Guide";
  if (guide.slug === "moonshot-techcabal-lagos-2026") return "Moonshot by TechCabal 2026: Dates & Venue";
  if (guide.slug === "kainji-dam-guide") return "Kainji Dam Nigeria: Location, History & Power Facts";
  if (guide.slug === "mambilla-plateau-guide") return "Mambilla Plateau Nigeria: Location, Gembu & Trip Tips";
  if (guide.slug === "dufuna-canoe-heritage-guide") return "Dufuna Canoe: Age, Yobe Discovery & Visitor Advice";
  if (guide.slug === "gashaka-gumti-national-park") return "Gashaka-Gumti National Park: Access & Trip Planning";
  if (guide.slug === "ojukwu-bunker-guide") return "Ojukwu Bunker Umuahia: History & Visitor Access";
  if (guide.slug === "sokoto-state-travel-guide") return "Sokoto State Nigeria: Caliphate, Culture & Places to Visit";
  if (guide.kind === "city") return truncateSeo(guide.shortTitle + ": " + getExplorePlacesForGuide(guide.slug).length + " Places to Visit & Things to Do (" + year + ")", 60);
  if (guide.kind === "itinerary") return truncateSeo(guide.title + " " + year + ": Itinerary & Things to Do", 60);
  if (guide.kind === "event") return truncateSeo(guide.shortTitle + (guide.shortTitle.includes(year) ? "" : " " + year) + ": Festival Guide & Planning", 60);
  return truncateSeo(guide.title + " " + year + ": Things to Do & Trip Planning", 60);
}

// Search Console, 14 September–10 October 2026: these existing canonical
// guides earned impressions on precise landmark queries but no recorded clicks.
// Match search intent without suggesting unrestricted access or inventing fees.
const exploreDescriptionOverrides: Record<string, string> = {
  "nigeria-landmarks-places-to-visit": "Explore famous landmarks in Nigeria, their locations and historical significance. Compare heritage sites, waterfalls and parks with practical access advice.",
  "moonshot-techcabal-lagos-2026": "Moonshot by TechCabal is 28–29 October 2026 at National Theatre, Lagos. Compare official tickets, the programme, transport and side-event access.",
  "dufuna-canoe-heritage-guide": "Dufuna Canoe, found in Yobe State, is more than 8,000 years old. Read its archaeological history and check exhibition access before planning a visit.",
  "mambilla-plateau-guide": "Mambilla Plateau is in Sardauna LGA, Taraba State. Plan a Gembu-based highland trip with weather, road and tea-estate access checks before travelling.",
  "ojukwu-bunker-guide": "Explore the history of Ojukwu Bunker in Umuahia, Abia State. Check the latest restoration and visitor-access status before visiting the Civil War landmark.",
  "sokoto-state-travel-guide": "Discover Sokoto State's caliphate history, Sultanate traditions and Durbar culture. Find heritage stops and check palace and museum access before a trip.",
};

const evergreenTripAnswers: Record<string, Array<{ question: string; answer: string }>> = {
  "mambilla-plateau-guide": [
    { question: "Where is the Mambilla Plateau in Nigeria?", answer: "Mambilla Plateau lies in Sardauna Local Government Area of Taraba State, near the Cameroon border. Gembu is the main highland town and a practical base for planning a visit." },
    { question: "How do I plan a trip to Mambilla Plateau and Gembu?", answer: "Treat Mambilla as a multi-day highland trip rather than a quick stop. Confirm current access and security, the steep and winding road conditions, local transport, overnight accommodation and weather immediately before departure." },
    { question: "Can I visit tea estates on Mambilla Plateau?", answer: "Tea-growing landscapes form part of the area's character, but access to farms, processing sites or private viewpoints is not automatically public. Arrange permission directly and avoid assuming opening hours or a universal entry charge." },
  ],
  "dufuna-canoe-heritage-guide": [
    { question: "Where was the Dufuna Canoe discovered?", answer: "The Dufuna Canoe was discovered in Yobe State. It is an archaeological watercraft find, not a boat tour or publicly accessible canoe-launching site." },
    { question: "How old is the Dufuna Canoe?", answer: "Nigeria's National Commission for Museums and Monuments identifies the Dufuna Canoe as an artefact more than 8,000 years old. Archaeological dating concerns the canoe, not a verified date for any modern public exhibition." },
    { question: "Can tourists view the original Dufuna Canoe today?", answer: "Exhibition details and safe access must be checked with the relevant museum or heritage authority first. A recorded discovery location does not automatically confirm that the original object is currently on display, bookable or open to visitors." },
  ],
  "kainji-dam-guide": [
    { question: "Where is Kainji Dam located in Nigeria?", answer: "Kainji Dam is on the River Niger near New Bussa, in Borgu Local Government Area of Niger State. It is different from Jebba Dam and from Kainji Lake National Park." },
    { question: "When was Kainji Dam built and how much power does it generate?", answer: "The Kainji hydropower plant was commissioned in 1968. Official records give 760 MW installed capacity, which is not a current live electricity-generation figure." },
    { question: "Can tourists enter Kainji Dam?", answer: "Do not assume public entry. Kainji Dam is active power infrastructure with potentially controlled access; check current permission and visit arrangements with the operator before travelling. No general admission fee or public visiting timetable was verified for this guide." },
  ],
  "ojukwu-bunker-guide": [
    { question: "Where is Ojukwu Bunker located?", answer: "Ojukwu Bunker is a Nigerian Civil War heritage site in Umuahia, Abia State. It is distinct from the National War Museum; both help visitors understand the period from different perspectives." },
    { question: "Is Ojukwu Bunker open for visitors during restoration?", answer: "A Federal Ministry of Information report dated 15 September 2026 described rehabilitation work at Ojukwu Bunker and the National War Museum. That report does not establish today's public opening hours or admission rules. Confirm current access with the responsible heritage authority before travelling." },
  ],
  "sokoto-state-travel-guide": [
    { question: "What is Sokoto State known for?", answer: "Sokoto State is associated with the historic Sokoto Caliphate, the Sultanate and Islamic scholarship. Sokoto city is a practical starting point for understanding its cultural institutions and old-city heritage." },
    { question: "Can visitors enter the Sultan's Palace or attend a Durbar in Sokoto?", answer: "Neither palace access nor Durbar performances should be assumed to be daily public attractions. Seek current permission and schedules from local organisers, respect prayer times and local dress expectations, and ask before taking photographs." },
  ],
  "benin-city": [
    { question: "What places should I visit in Benin City, Edo State?", answer: "For a first heritage visit, start with the Benin City National Museum for context, then consider the Igun Street bronze-casting area and publicly accessible parts of the palace surroundings. The royal and workshop spaces have their own access and photography expectations; ask before entering." },
    { question: "Is Okomu National Park inside Benin City?", answer: "No. Okomu is an Edo State nature destination outside central Benin City. Arrange it as a separate trip with park guidance, road time and safety checks rather than treating it as another city-centre stop." },
  ],
  "abeokuta": [
    { question: "Where is Olumo Rock located in Nigeria?", answer: "Olumo Rock is in Abeokuta, Ogun State. A heritage day can pair the rock with the Itoku adire textile area and the Ake palace surroundings, but confirm access and photo rules for each stop." },
    { question: "What is the Olumo Rock entrance fee?", answer: "An official, reliable current universal gate price has not been verified for this guide. Ask the site or the Ogun tourism operator for the live ticket, guiding and facility charges before travel; avoid paying someone who merely forwards an old price screenshot." },
  ],
  "obudu-mountain-resort": [
    { question: "Where is Obudu Mountain Resort in Nigeria?", answer: "Obudu Mountain Resort is in Cross River State's Obanliku highland area. It is not a quick walk or short hop from Calabar; plan road transfers, fuel, daylight and overnight arrangements before committing to a trip." },
    { question: "How much does Obudu Mountain Resort cost per person?", answer: "There is no safely verified single current price covering accommodation, travel and every activity. Cross River State has announced facility rehabilitation; obtain a current room and attraction quote directly from the responsible operator and confirm which facilities are actually working." },
  ],
  "nigeria-landmarks-places-to-visit": [
    { question: "Which waterfalls can I visit in Nigeria, and where are they?", answer: "Erin-Ijesha Waterfall is in Osun State, while Gurara Falls is in Niger State. They suit different regional routes. Check weather, local access and trail safety before planning a long transfer specifically for waterfall photography." },
    { question: "Are all Nigeria national parks open for tourism?", answer: "Do not treat a headline list of national parks as a promise that each park accepts visitors. Confirm the exact park's current access, ranger/guide requirements, transport and security conditions directly with its responsible authority before travelling." },
  ],
  "calabar": [
    { question: "What are the main tourist attractions in Calabar, Nigeria?", answer: "The Marina Resort waterfront, Slave History Museum and historic Old Residency circuit offer a mixture of leisure and heritage. Check each operator's opening and exhibit access; Cross River's remote mountain and wildlife destinations need separate travel days." },
    { question: "Is visiting Calabar the same as attending Carnival Calabar?", answer: "No. Calabar has year-round history, culture and waterfront attractions, while Carnival Calabar is a seasonal programme. If travelling in December, consult the specific official schedule; for another month, focus on the enduring city attractions." },
  ],
  "lagos": [
    { question: "Where can I find things to do in Lagos with kids or as a couple?", answer: "Use the dedicated Lagos things-to-do guide for family suitability, neighbourhood choices and an achievable one- or two-day plan. Pair attractions by area rather than trying to travel from the Mainland to the Island and Lekki repeatedly." },
  ],
  "abuja": [
    { question: "Where can I find family-friendly places to visit in Abuja?", answer: "The dedicated Abuja things-to-do guide separates easy parks, lakeside plans, landmark etiquette and practical options for children or couples. Confirm current activities, access and age restrictions with each operator." },
  ],
};

function getExploreQuestions(guide: NonNullable<ReturnType<typeof getExploreGuide>>) {
  // Only independently researched, destination-specific Q&A belongs here.
  // Never manufacture generic questions by copying highlights or the planning list.
  return evergreenTripAnswers[guide.slug] ?? [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getExploreGuide(slug);
  if (!guide) return {};

  const title = getExploreSeoTitle(guide);
  const cityPlaces = guide.kind === "city" ? getExplorePlacesForGuide(guide.slug) : [];
  // Dam infrastructure is a history/location query, not a walk-in attraction.
  // Keep its search snippet useful without implying that entry is open.
  const description = exploreDescriptionOverrides[guide.slug] ?? (guide.slug === "kainji-dam-guide"
    ? "Kainji Dam is near New Bussa, Niger State. See its River Niger location, 1968 hydropower history, 760 MW installed capacity and visitor-access advice."
    : guide.kind === "city"
      ? truncateSeo("Discover " + cityPlaces.length + " places to visit in " + guide.shortTitle + ", including " + cityPlaces.slice(0, 3).map((place) => place.name).join(", ") + ". Maps, local tips and access guidance.", 155)
      : truncateSeo(guide.summary + " Things to do, places to visit and practical planning guidance reviewed " + guide.lastReviewed + ".", 155));

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: "/explore/" + guide.slug },
    openGraph: {
      title,
      description,
      type: "website",
      url: "/explore/" + guide.slug,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.summary,
    },
  };
}

export default async function ExploreGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getExploreGuide(slug);
  if (!guide) notFound();

  const base = getSiteUrl();
  const pageUrl = base + "/explore/" + guide.slug;
  const related = getRelatedExploreGuides(guide);
  const places = getExplorePlacesForGuide(guide.slug);
  const questions = getExploreQuestions(guide);
  // Source fields, not invented admission prices or directions, determine
  // whether this destination's access information is actually established.
  const visitorEvidence = [...guide.intro, ...guide.planning.map((x) => x.detail),
    ...guide.highlights.map((x) => x.detail)].join(" ");
  const hasArrivalGuidance = /transport|taxi|road|travel|bus|drive|route|walk|access|journey|getting|arriv|train|flight/i.test(visitorEvidence);
  const hasOperatingGuidance = /hour|ticket|fee|admission|cost|price|book|open|season|date|entry|timing/i.test(visitorEvidence);
  const hasIndependentSource = Boolean(guide.sources?.some((source) => source.href !== guide.source?.href));
  const hasDoNotTravelAdvisory = /\bdo not travel\b/i.test([guide.summary, ...guide.intro].join(" "));
  const destinationPhoto = destinationPhotos[guide.slug];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Explore Nigeria", item: base + "/explore" },
      { "@type": "ListItem", position: 3, name: guide.shortTitle, item: pageUrl },
    ],
  };

  const guideLd = guide.kind === "itinerary"
    ? {
        "@context": "https://schema.org",
        "@type": "Trip",
        name: guide.title,
        description: guide.summary,
        url: pageUrl,
      }
    : guide.kind === "event"
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.summary,
          url: pageUrl,
          dateModified: guide.lastReviewed,
          about: { "@type": "Thing", name: guide.shortTitle },
          contentLocation: { "@type": "Place", name: guide.region, address: { "@type": "PostalAddress", addressRegion: guide.region, addressCountry: "NG" } },
        }
      : {
          "@context": "https://schema.org",
          "@type": "TouristDestination",
          name: guide.shortTitle,
          description: guide.summary,
          url: pageUrl,
          address: { "@type": "PostalAddress", addressRegion: guide.region, addressCountry: "NG" },
          touristType: guide.bestFor,
        };

  const webpageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: guide.title,
    description: guide.summary,
    url: pageUrl,
    dateModified: guide.lastReviewed,
    about: guide.kind === "itinerary"
      ? { "@type": "Trip", name: guide.title }
      : guide.kind === "event"
        ? { "@type": "Thing", name: guide.shortTitle }
        : { "@type": "TouristDestination", name: guide.shortTitle },
    spatialCoverage: { "@type": "Place", name: guide.region + ", Nigeria" },
  };

  const faqLd = questions.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  } : null;

  const placesLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: places.length,
    itemListElement: places.map((place, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": place.kind === "restaurant" ? "Restaurant" : place.kind === "hotel" ? "Hotel" : "TouristAttraction",
        name: place.name,
        description: place.summary,
        address: place.address,
        url: pageUrl + "#place-" + place.slug,
      },
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbLd, webpageLd, guideLd, placesLd, ...(faqLd ? [faqLd] : [])]} />
      <section className="section page-top explore-guide-hero">
        <div className="container">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Explore Nigeria", href: "/explore" },
            { label: guide.shortTitle },
          ]} />
          <span className="eyebrow">{guide.region}</span>
          <h1>{guide.title}</h1>
          <p className="page-intro">{guide.summary}</p>
          <div className="guide-save-action"><SavePageButton href={"/explore/" + guide.slug} title={guide.shortTitle} kind="travel" /></div>
          {destinationPhoto ? (
            <figure className="tour-guide-photo">
              <img
                src={destinationPhotoUrls(destinationPhoto).src}
                alt={destinationPhoto.alt}
                width={720} height={480}
                loading="eager" decoding="async" referrerPolicy="no-referrer"
              />
              <figcaption>
                Photo: <a href={destinationPhotoUrls(destinationPhoto).creditUrl} target="_blank" rel="noopener noreferrer">{destinationPhoto.credit}</a>
                {" · "}<a href={destinationPhotoUrls(destinationPhoto).licenseUrl} target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>
                {" · "}Cropped to fit
              </figcaption>
            </figure>
          ) : null}
          <div className="topic-copy explore-intro-copy">
            {guide.intro.slice(0, 1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {guide.intro.length > 1 ? (
              <details className="compact-disclosure explore-context-disclosure">
                <summary>More context</summary>
                <div>{guide.intro.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              </details>
            ) : null}
          </div>
          {guide.slug === "hallelujah-festival-lagos-october-2026" ? (
            <div className="minimal-inline-links">
              <Link href="/entertainment/hallelujah-challenge-october-2026">Join the separate nightly online Hallelujah Challenge →</Link>
              <Link href="/explore/lagos">Plan your Lagos trip →</Link>
            </div>
          ) : null}
          {guide.slug === "lagos" ? <div className="minimal-inline-links"><Link href="/explore/things-to-do-lagos">Things to do in Lagos</Link></div> : null}
          {guide.slug === "abuja" ? <div className="minimal-inline-links"><Link href="/explore/things-to-do-abuja">Things to do in Abuja</Link></div> : null}
          {guide.slug === "calabar" ? (
            <div className="minimal-inline-links">
              <Link href="/explore/carnival-calabar-2026">Carnival Calabar 2026 dates & planning</Link>
              <Link href="/explore/nigeria-landmarks-places-to-visit">More places to visit in Nigeria</Link>
            </div>
          ) : null}
        </div>
      </section>

      <div className="container page-outline-wrap">
        <PageOutline label="Plan this visit" items={[
          { href: "#trip-highlights", label: "Highlights" },
          ...(places.length ? [{ href: "#places" as const, label: "Places, maps & costs" }] : []),
          ...(questions.length ? [{ href: "#trip-questions" as const, label: "Trip questions" }] : []),
          { href: "#planning", label: "Before you go" },
          { href: "#trip-sources", label: "Sources" },
        ]} />
      </div>

      <section className="proof-strip" aria-label={"Best reasons to visit " + guide.shortTitle}>
        <div className="container proof-grid">
          {guide.bestFor.slice(0, 4).map((item, index) => (
            <div key={item}><span aria-hidden="true">0{index + 1}</span><strong>{item}</strong></div>
          ))}
        </div>
      </section>

      <section className="section explore-guide-highlights" id="trip-highlights">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">Highlights</span><h2>What to see in {guide.shortTitle}</h2></div></div>
          <div className="explore-highlight-grid">
            {guide.highlights.map((highlight) => (
              <article className="explore-highlight-card" key={highlight.name}>
                <span>Highlight</span>
                <strong>{highlight.name}</strong>
                <small>{highlight.detail}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
          <AdSlot slot={AD_SLOTS.tourAfterIntro} label="Advertisement" />
        </div>

      <section className="section explore-guide-places" id="places">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Address, maps & cost</span>
              <h2>{places.length
                ? guide.kind === "event" ? "Venues and nearby planning stops for " + guide.shortTitle
                  : guide.kind === "city" ? places.length + " places to visit in " + guide.shortTitle + " — attractions, food & stays"
                    : "Related sites and location references for " + guide.shortTitle
                : guide.shortTitle + ": location and access information"}</h2>
              <p>{places.length
                ? "These are independently referenced locations, not automatically nearby stops or bookable attractions. Verify any public opening, transport, cost and access directly."
                : "No separate address, ticket price or opening-hours record is independently verified for this guide. These details are not invented."}</p>
            </div>
          </div>
          {hasDoNotTravelAdvisory ? (
            <div className="info-box" role="note" aria-label="Travel safety warning">
              <h3>Travel advisory: do not treat these references as a visit recommendation</h3>
              <p>This guide cites a do-not-travel warning for the region as of its last review. Any location or map pin below is for geographical or historical context, not evidence of a safe journey, an operating tourist facility or permission to enter.</p>
            </div>
          ) : null}
          {!places.length ? (
            <div className="info-box">
              <h3>How to verify the correct location before travelling</h3>
              <p>This guide identifies {guide.shortTitle} in {guide.region}, Nigeria, but we do not have a verified, guide-specific entrance address or public admission timetable. A location search is not a confirmed booking, open gate or safe route.</p>
              <div className="related-links">
                {guide.kind !== "event" ? (
                  <a href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(guide.shortTitle + ", " + guide.region + ", Nigeria")}
                    target="_blank" rel="noopener noreferrer">Search for the site on Google Maps (confirm listing with operator) ↗</a>
                ) : null}
                {guide.source ? <a href={guide.source.href} target="_blank" rel="noopener noreferrer">Check source: {guide.source.label} ↗</a> : null}
              </div>
              <p>Before departure, confirm the actual entrance, who grants access, recent conditions and any tickets with the local operator or responsible authority. Do not pay someone using an unverified map pin or forwarded screenshot.</p>
            </div>
          ) : null}
          <div className="explore-place-grid">
            {places.map((place) => (
              <article className="explore-place-card explore-place-card-detail" id={"place-" + place.slug} key={place.slug}>
                <div className="explore-place-topline">
                  <span>{explorePlaceKindLabel[place.kind]}</span>
                  <small>Checked {place.checkedAt}</small>
                </div>
                <h3>{place.name}</h3>
                <p>{place.summary}</p>
                <dl className="explore-place-core-facts">
                  <div><dt>Area</dt><dd>{place.area}</dd></div>
                  <div><dt>Address</dt><dd>{place.address}</dd></div>
                  <div><dt>Cost</dt><dd>{place.cost}</dd></div>
                </dl>
                {(place.hours || place.phone || place.costNote) ? (
                  <details className="compact-disclosure explore-place-more">
                    <summary>Hours &amp; contact details</summary>
                    <div>
                      {place.hours ? <p><strong>Hours:</strong> {place.hours}</p> : null}
                      {place.phone ? <p><strong>Phone:</strong> <a href={"tel:" + place.phone.replace(/[^+\d]/g, "")}>{place.phone}</a></p> : null}
                      {place.costNote ? <p>{place.costNote}</p> : null}
                    </div>
                  </details>
                ) : null}
                <div className="explore-place-actions">
                  <a href={googleMapsUrl(place)} target="_blank" rel="noreferrer">{hasDoNotTravelAdvisory ? "View approximate map reference — not a travel recommendation" : "Open in Google Maps"} ↗</a>
                  {place.website ? <a href={place.website} target="_blank" rel="noreferrer">Official website ↗</a> : null}
                  {place.source ? <a href={place.source.href} target="_blank" rel="noreferrer">{place.source.label} ↗</a> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {questions.length ? <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Common trip questions</span>
              <h2 id="trip-questions">Planning {guide.shortTitle}</h2>
            </div>
          </div>
          <div className="compact-faq-list">
            {questions.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section> : null}

      <section className="section premium-dark-section" id="planning">
        <div className="container">
          <div className="section-heading section-heading-light"><div><span className="eyebrow">Before you go</span><h2>{guide.kind === "itinerary" ? "Before following this route" : guide.kind === "event" ? "Before attending " + guide.shortTitle : "Before visiting " + guide.shortTitle}</h2></div></div>
          {(!hasArrivalGuidance || !hasOperatingGuidance) ? (
            <div className="info-box">
              <h3>Information not yet verified for this visit</h3>
              {!hasArrivalGuidance ? <p><strong>Getting there:</strong> The cited guidance does not establish a specific, current arrival route. Confirm the entrance and local road or transport conditions with the responsible operator before leaving.</p> : null}
              {!hasOperatingGuidance ? <p><strong>Admission and timing:</strong> A reliable current price, operating schedule or season has not been established here. Ask for the official current rules; do not assume it is free, open daily or bookable.</p> : null}
              <p>These unknowns are shown explicitly rather than replaced by generic guesses. Reviewed information: {guide.lastReviewed}.</p>
            </div>
          ) : null}
          <div className="compact-planning-list">
            {guide.planning.map((item) => (
              <details key={item.label}>
                <summary>{item.label}</summary>
                <p>{item.detail}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container agency-strip" id="trip-sources">
          <div>
            <span className="eyebrow">Source &amp; verification</span>
            <h2>Sources and live checks for {guide.shortTitle}</h2>
            <p>This {guide.kind} guide was reviewed on {guide.lastReviewed}. MyNigeriaGuide does not treat old prices, social posts or copied travel lists as permanent facts; confirm dynamic details close to your travel date.</p>
            {!hasIndependentSource ? (
              <p className="job-muted">Source coverage: this guide does not yet cite a second independent visitor or reporting source. The named primary reference supports the published facts, but does not by itself confirm current visitor experiences, opening hours or road access.</p>
            ) : null}
            {(guide.source || guide.sources?.length) ? (
              <div className="related-links">
                {guide.source ? <a href={guide.source.href} target="_blank" rel="noreferrer">{guide.source.label} ↗</a> : null}
                {(guide.sources ?? []).filter((source) => source.href !== guide.source?.href).map((source) => (
                  <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a>
                ))}
              </div>
            ) : null}
          </div>
          <div>
            <span className="eyebrow">Keep exploring</span>
            <h2>Other places and experiences worth exploring</h2>
            <div className="related-links">
              {related.map(({ guide: item, reason }) => <Link href={"/explore/" + item.slug} key={item.slug}><strong>{item.shortTitle}</strong> · {reason} →</Link>)}
              <Link href="/explore">All Explore Nigeria guides →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
