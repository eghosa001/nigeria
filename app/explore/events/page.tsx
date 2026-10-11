import type { Metadata } from "next";
import Link from "next/link";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { exploreGuides } from "@/lib/explore";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nigeria Festivals 2026 & Announced 2027 Events",
  description: "Explore Nigerian events for 2026, from Felabration to Lagos culture festivals, plus early 2027 announcements such as the Lagos International Chess Festival. Verified dates and venues only.",
  alternates: { canonical: "/explore/events" },
};

const eventSlugs = ["felabration-2026", "design-week-lagos-2026", "lagos-fashion-week-2026", "beneficial-ownership-asset-recovery-conference-2026", "detty-december-lagos-2026", "calabar-carnival-2026"];

export default function EventsPage() {
  const featured = eventSlugs
    .map((slug) => exploreGuides.find((guide) => guide.slug === slug))
    .filter((guide): guide is NonNullable<typeof guide> => Boolean(guide));
  const featuredSlugs = new Set(featured.map((guide) => guide.slug));
  const events = [
    ...featured,
    ...exploreGuides
      .filter((guide) => guide.kind === "event" && !featuredSlugs.has(guide.slug))
      .sort((a, b) => a.shortTitle.localeCompare(b.shortTitle)),
  ];
  const base = getSiteUrl();
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Nigeria events and festivals 2026",
    url: base + "/explore/events",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: events.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: event.title,
        url: base + "/explore/" + event.slug,
      })),
    },
  };
  return (
    <>
      <JsonLd data={ld} />
      <section className="section page-top">
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Explore Nigeria", href: "/explore" }, { label: "Events & festivals" }]} />
          <span className="eyebrow">2026 event calendar</span>
          <h1>Nigeria events and festivals worth planning around</h1>
          <p className="page-intro">Current planning guides for Nigerian events and festivals, with official sources, practical movement advice and clear warnings where dates or access still need confirmation.</p>
          <AnswerFirst
            title="What is coming up?"
            summary="October starts with Felabration, Design Week Lagos and Lagos Fashion Week; November brings the CAC-led Beneficial Ownership & Asset Recovery conference in Ikeja; December planning is open for Detty December and Calabar Carnival."
            facts={[
              { label: "October", value: "Felabration · DWL · Lagos Fashion Week" },
              { label: "November", value: "BO & Asset Recovery Conference" },
              { label: "December", value: "Detty December · Calabar Carnival" },
              { label: "Planning rule", value: "Confirm live schedule before travel" },
              { label: "Guides", value: String(events.length) },
            ]}
            links={[
              { href: "/explore/lagos", label: "Lagos travel guide" },
              { href: "/explore/detty-december-lagos-2026", label: "Detty December", primary: true },
            ]}
            note="Dates may be announced before the final daily programme. Each event guide distinguishes fixed information from details you should re-check."
          />
          <section className="top-gap" aria-labelledby="lagos-lifestyle-fair-2026">
            <span className="eyebrow">Lagos SME culture and shopping · 24–25 October 2026</span>
            <h2 id="lagos-lifestyle-fair-2026">Leadway Lifestyle Fair — verified event behind the social hashtag</h2>
            <p>
              Leadway Group announces a Lagos Lifestyle Fair on <strong>24 and 25 October 2026</strong>,
              bringing Nigerian SMEs, shoppers and families together. Its organiser page places the
              event in Victoria Island, while an organiser-labelled Eventbrite listing names the
              venue as <strong>SystemSpecs HQ, Chief Yesufu Abiodun Oniru Road</strong>.
              Check the organiser's latest details before making travel arrangements.
              The organiser's SME exhibitor-registration page currently says applications have closed;
              this does not mean visitor registration is closed.
            </p>
            <div className="minimal-inline-links">
              <a href="https://www.leadway.com/leadway-media-dash/" target="_blank" rel="noopener noreferrer">Leadway official visitor information ↗</a>
              <a href="https://www.eventbrite.com/e/leadway-lifestyle-fair-tickets-2002921744856" target="_blank" rel="noopener noreferrer">Organiser's venue listing ↗</a>
              <Link href="/explore/lagos">Plan travel around Lagos →</Link>
            </div>
          </section>

          <section className="top-gap" aria-labelledby="announced-next-year">
            <span className="eyebrow">Recently announced · 11 October 2026</span>
            <h2 id="announced-next-year">Looking ahead: Lagos International Chess Festival 2027</h2>
            <p>
              Nigerian chess advocate Tunde Onakoya unveiled a Lagos International Chess Festival
              planned for <strong>October 2027</strong>. The proposed programme combines a children's
              chess tournament, elite matches, exhibitions, fashion and cultural activities.
              As of 11 October 2026, a precise festival date, confirmed venue, booking
              instructions and ticket prices have not been established. Do not purchase tickets
              or book non-refundable travel based on the announcement alone.
            </p>
            <div className="minimal-inline-links">
              <a href="https://lifestyle.thecable.ng/tunde-onakoya-launches-lagos-international-chess-festival/" target="_blank" rel="noopener noreferrer">11 October announcement · TheCable ↗</a>
              <a href="https://www.arise.tv/tunde-onakoya-unveils-lagos-international-chess-festival-targets-global-chess-community/" target="_blank" rel="noopener noreferrer">Independent coverage · Arise ↗</a>
              <Link href="/explore/lagos">Explore verified Lagos attractions →</Link>
            </div>
            <p className="job-muted">This is a future announcement, not part of the confirmed 2026 festival calendar below.</p>
          </section>
          <div className="home-category-grid compact-category-grid">
            {events.map((event) => (
              <Link className="home-category-card" href={"/explore/" + event.slug} key={event.slug}>
                <span>{event.region}</span><strong>{event.shortTitle}</strong><small>{event.summary}</small><i>Plan event →</i>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
