import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AnswerFirst } from "@/components/answer-first";
import { AdSlot } from "@/components/ad-slot";
import { AD_SLOTS } from "@/lib/adsense-config";
import { JsonLd } from "@/components/json-ld";
import { exploreGuides, getExploreGuide } from "@/lib/explore";
import { explorePlaceKindLabel, getExplorePlacesForGuide, googleMapsUrl } from "@/lib/explore-places";
import { getSiteUrl } from "@/lib/site";
import { SavePageButton } from "@/components/personal-library";

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
  if (guide.slug === "nigeria-landmarks-places-to-visit") return "Landmarks & Places to Visit in Nigeria " + year;
  if (guide.kind === "city") return truncateSeo(guide.shortTitle + " Travel Guide " + year + ": Things to Do & Places to Visit", 60);
  if (guide.kind === "itinerary") return truncateSeo(guide.title + " " + year + ": Itinerary & Things to Do", 60);
  if (guide.kind === "event") return truncateSeo(guide.shortTitle + " " + year + ": Festival Guide & Planning", 60);
  return truncateSeo(guide.title + " " + year + ": Things to Do & Trip Planning", 60);
}

function getExploreQuestions(guide: NonNullable<ReturnType<typeof getExploreGuide>>) {
  const stops = guide.highlights.slice(0, 3).map((item) => item.name);
  const advice = guide.planning[0]?.detail;
  return [
    {
      question: "What should I see in " + guide.shortTitle + "?",
      answer: stops.length
        ? "Begin with " + stops.join(", ") + ". See the guide for details on each stop."
        : guide.summary,
    },
    ...(guide.kind === "city" ? [{
      question: "Where is " + guide.shortTitle + "?",
      answer: guide.shortTitle + " is in " + guide.region + ", Nigeria.",
    }] : []),
    {
      question: "What should I check before visiting " + guide.shortTitle + "?",
      answer: advice ?? "Confirm access, opening times and local conditions with the responsible operator before travelling.",
    },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getExploreGuide(slug);
  if (!guide) return {};

  const title = getExploreSeoTitle(guide);
  const description = truncateSeo(guide.summary + " Things to do, places to visit and practical planning guidance reviewed " + guide.lastReviewed + ".", 155);

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
  const related = exploreGuides
    .filter((item) => item.slug !== guide.slug)
    .map((item) => ({
      item,
      score:
        (item.region === guide.region ? 5 : 0) +
        (item.kind === guide.kind ? 2 : 0) +
        item.bestFor.filter((value) => guide.bestFor.includes(value)).length,
    }))
    .sort((a, b) => b.score - a.score || a.item.shortTitle.localeCompare(b.item.shortTitle))
    .slice(0, 4)
    .map((entry) => entry.item);
  const places = getExplorePlacesForGuide(guide.slug);
  const questions = getExploreQuestions(guide);

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

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

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
      <JsonLd data={[breadcrumbLd, webpageLd, guideLd, placesLd, faqLd]} />
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
          <AnswerFirst
            title={"Plan your visit to " + guide.shortTitle}
            summary={questions[0]?.answer ?? guide.summary}
            facts={[
              { label: "Applies to", value: guide.region + ", Nigeria" },
              { label: "Guide type", value: guide.kind === "event" ? "Event guide" : guide.kind === "city" ? "City guide" : guide.kind === "itinerary" ? "Itinerary" : "Travel guide" },
              { label: "Best for", value: guide.bestFor.slice(0, 3).join(", ") },
              { label: "Information reviewed", value: guide.lastReviewed },
            ]}
            links={[
              { href: "#places", label: "See places" },
              { href: "#planning", label: "Before you go" },
            ]}
            note="Check current opening hours, access and travel conditions before leaving."
          />
          <div className="topic-copy explore-intro-copy">
            {guide.intro.slice(0, 1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {guide.intro.length > 1 ? (
              <details className="compact-disclosure explore-context-disclosure">
                <summary>More context</summary>
                <div>{guide.intro.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              </details>
            ) : null}
          </div>
          <p className="hero-note">Reviewed {guide.lastReviewed}. Confirm live opening hours, ticketing, road access, weather, security conditions and event schedules directly before travelling.</p>
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

      <section className="proof-strip" aria-label={"Best reasons to visit " + guide.shortTitle}>
        <div className="container proof-grid">
          {guide.bestFor.slice(0, 4).map((item, index) => (
            <div key={item}><span aria-hidden="true">0{index + 1}</span><strong>{item}</strong></div>
          ))}
        </div>
      </section>

      <section className="section explore-guide-highlights">
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
              <h2>{guide.kind === "event" ? "Venues and nearby planning stops for " + guide.shortTitle : guide.shortTitle + ": places to visit, eat & stay"}</h2>
              <p>Prices are marked as current estimates or variable instead of being presented as permanent facts.</p>
            </div>
          </div>
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
                  <a href={googleMapsUrl(place)} target="_blank" rel="noreferrer">Open in Google Maps ↗</a>
                  {place.website ? <a href={place.website} target="_blank" rel="noreferrer">Official website ↗</a> : null}
                  {place.source ? <a href={place.source.href} target="_blank" rel="noreferrer">{place.source.label} ↗</a> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Common trip questions</span>
              <h2>Planning {guide.shortTitle}</h2>
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
      </section>

      <section className="section premium-dark-section" id="planning">
        <div className="container">
          <div className="section-heading section-heading-light"><div><span className="eyebrow">Before you go</span><h2>Before you visit {guide.shortTitle}</h2></div></div>
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
        <div className="container agency-strip">
          <div>
            <span className="eyebrow">Source &amp; verification</span>
            <h2>Sources and live checks for {guide.shortTitle}</h2>
            <p>This {guide.kind} guide was reviewed on {guide.lastReviewed}. MyNigeriaGuide does not treat old prices, social posts or copied travel lists as permanent facts; confirm dynamic details close to your travel date.</p>
            {guide.source ? (
              <div className="related-links">
                <a href={guide.source.href} target="_blank" rel="noreferrer">{guide.source.label} ↗</a>
              </div>
            ) : null}
          </div>
          <div>
            <span className="eyebrow">Keep exploring</span>
            <h2>Related {guide.kind === "city" ? "cities" : guide.kind === "event" ? "events & trip guides" : "trip guides"}</h2>
            <div className="related-links">
              {related.map((item) => <Link href={"/explore/" + item.slug} key={item.slug}>{item.shortTitle} →</Link>)}
              <Link href="/explore">All Explore Nigeria guides →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
