import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { exploreGuides, getExploreGuide } from "@/lib/explore";
import { explorePlaceKindLabel, getExplorePlacesForGuide, googleMapsUrl } from "@/lib/explore-places";
import { getSiteUrl } from "@/lib/site";

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
  if (guide.kind === "city") return truncateSeo(guide.shortTitle + " Travel Guide " + year + ": Things to Do & Places to Visit", 60);
  if (guide.kind === "itinerary") return truncateSeo(guide.title + " " + year + ": Itinerary & Things to Do", 60);
  return truncateSeo(guide.title + " " + year + ": Things to Do & Trip Planning", 60);
}

function getExploreQuestions(guide: NonNullable<ReturnType<typeof getExploreGuide>>) {
  const highlights = guide.highlights.slice(0, 4).map((item) => item.name);
  const firstPlanning = guide.planning[0]?.detail ?? "Group nearby stops together and confirm live access before travelling.";
  return [
    {
      question: "What are the best things to do in " + guide.shortTitle + "?",
      answer: "Start with " + highlights.slice(0, 3).join(", ") + ". The guide below explains how to fit these into a realistic trip.",
    },
    {
      question: "What places should I visit in " + guide.shortTitle + "?",
      answer: highlights.length ? "Useful starting points include " + highlights.join(", ") + "." : guide.summary,
    },
    {
      question: "What is " + guide.shortTitle + " best known for?",
      answer: guide.shortTitle + " is especially useful for travellers interested in " + guide.bestFor.join(", ") + ".",
    },
    {
      question: "How should I plan a trip to " + guide.shortTitle + "?",
      answer: firstPlanning,
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
      : { "@type": "TouristDestination", name: guide.shortTitle },
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
      <section className="section page-top">
        <div className="container">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Explore Nigeria", href: "/explore" },
            { label: guide.shortTitle },
          ]} />
          <span className="eyebrow">{guide.region}</span>
          <h1>{guide.title}</h1>
          <p className="page-intro">{guide.summary}</p>
          <div className="topic-copy">
            {guide.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <p className="hero-note">Reviewed {guide.lastReviewed}. Confirm live opening hours, ticketing, road access, weather, security conditions and event schedules directly before travelling.</p>
        </div>
      </section>

      <section className="proof-strip" aria-label={"Best reasons to visit " + guide.shortTitle}>
        <div className="container proof-grid">
          {guide.bestFor.slice(0, 4).map((item, index) => (
            <div key={item}><span aria-hidden="true">0{index + 1}</span><strong>{item}</strong><small>Build it into your trip only if it fits your time and route.</small></div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">What to build around</span><h2>Highlights worth planning properly.</h2></div></div>
          <div className="home-category-grid">
            {guide.highlights.map((highlight) => (
              <article className="home-category-card" key={highlight.name}>
                <span>Highlight</span>
                <strong>{highlight.name}</strong>
                <small>{highlight.detail}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section explore-guide-places" id="places">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Address, maps & cost</span>
              <h2>Places to visit, eat & stay.</h2>
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
                <dl>
                  <div><dt>Area</dt><dd>{place.area}</dd></div>
                  <div><dt>Address</dt><dd>{place.address}</dd></div>
                  <div><dt>Cost</dt><dd>{place.cost}</dd></div>
                  {place.hours ? <div><dt>Hours</dt><dd>{place.hours}</dd></div> : null}
                  {place.phone ? <div><dt>Phone</dt><dd><a href={"tel:" + place.phone.replace(/[^+\d]/g, "")}>{place.phone}</a></dd></div> : null}
                </dl>
                {place.costNote ? <p className="explore-cost-note">{place.costNote}</p> : null}
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
          <div className="search-answer-grid">
            {questions.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section premium-dark-section">
        <div className="container">
          <div className="section-heading section-heading-light"><div><span className="eyebrow">Before you go</span><h2>Make the practical decisions first.</h2></div></div>
          <div className="home-updates-grid">
            {guide.planning.map((item) => (
              <article className="home-update-card" key={item.label}>
                <div><span>Plan</span></div>
                <h3>{item.label}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container agency-strip">
          <div>
            <span className="eyebrow">Source &amp; verification</span>
            <h2>Use this guide to plan. Confirm live details at the source.</h2>
            <p>MyNigeriaGuide does not treat old prices, social posts or copied travel lists as permanent facts. Dynamic details should be checked close to your travel date.</p>
            {guide.source ? (
              <div className="related-links">
                <a href={guide.source.href} target="_blank" rel="noreferrer">{guide.source.label} ↗</a>
              </div>
            ) : null}
          </div>
          <div>
            <span className="eyebrow">Keep exploring</span>
            <h2>Related {guide.kind === "city" ? "cities" : "trip guides"}</h2>
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
