import type { Metadata } from "next";
import Link from "next/link";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { exploreGuides } from "@/lib/explore";
import { groupEventCalendar } from "@/lib/explore-event-calendar";
import { todayIsoNigeria } from "@/lib/job-runtime";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nigeria Festivals 2026 & Announced 2027 Events",
  description: "Plan Nigeria festivals with official schedules and source notes. Distinguish upcoming dates, events needing confirmation, and archived programmes.",
  alternates: { canonical: "/explore/events" },
};

// Event-date sections change on the Nigerian calendar day; do not freeze them during a build.
export const dynamic = "force-dynamic";

const eventSlugs = ["felabration-2026", "design-week-lagos-2026", "lagos-fashion-week-2026", "beneficial-ownership-asset-recovery-conference-2026", "detty-december-lagos-2026", "calabar-carnival-2026"];

export default function EventsPage() {
  const featured = eventSlugs
    .map((slug) => exploreGuides.find((guide) => guide.slug === slug))
    .filter((guide): guide is NonNullable<typeof guide> => Boolean(guide));
  const featuredSlugs = new Set(featured.map((guide) => guide.slug));
  const today = todayIsoNigeria();
  const allEvents = [
    ...featured,
    ...exploreGuides.filter((guide) => guide.kind === "event" && !featuredSlugs.has(guide.slug)),
  ];
  const { dated, past, needsDateCheck } = groupEventCalendar(allEvents, today);
  const events = [...dated, ...needsDateCheck, ...past];
  const base = getSiteUrl();
  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Nigeria events and festivals — upcoming, check dates and past programmes",
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
          <span className="eyebrow">Nigeria festival calendar · {today}</span>
          <h1>Nigeria events and festivals worth planning around</h1>
          <p className="page-intro">Find events with dates still ahead, check schedules that need confirmation, or revisit previous programmes. Confirm admission and exact locations with organisers before travelling.</p>
          <AnswerFirst
            title="What is coming up?"
            summary={dated.length
              ? "These programmes have published end dates on or after today: " + dated.slice(0, 3).map((event) => event.shortTitle).join(", ") + (dated.length > 3 ? " and more below." : ".")
              : "There are no date-confirmed future programmes in this calendar. Explore other guides and check official organisers for new announcements."}
            facts={[
              { label: "Current / ahead", value: String(dated.length) },
              { label: "Check dates", value: String(needsDateCheck.length) },
              { label: "Past programmes", value: String(past.length) },
              { label: "Planning rule", value: "Check live access before travel" },
            ]}
            links={[
              { href: "/explore/lagos", label: "Lagos travel guide" },
              { href: "/explore/detty-december-lagos-2026", label: "Detty December", primary: true },
            ]}
            note="Dates may be announced before the final daily programme. Each event guide distinguishes fixed information from details you should re-check."
          />
          {today <= "2026-10-25" ? <section className="top-gap" aria-labelledby="lagos-lifestyle-fair-2026">
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
          </section> : null}

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
          <section className="top-gap" aria-labelledby="current-event-guides">
            <h2 id="current-event-guides">Events with dates still ahead</h2>
            <p>These guides have recorded event end dates on or after {today}. An end date does not establish ticket availability, today's opening hours or admission rights.</p>
            {dated.length ? <div className="home-category-grid compact-category-grid">
              {dated.map((event) => (
                <Link className="home-category-card" href={"/explore/" + event.slug} key={event.slug}>
                  <span>{event.region}</span><strong>{event.shortTitle}</strong><small>{event.summary}</small><i>Plan event →</i>
                </Link>
              ))}
            </div> : <p>No upcoming dated event guides are currently recorded. Check the other event guides for updates.</p>}
          </section>

          {needsDateCheck.length ? <section className="top-gap" aria-labelledby="check-event-dates">
            <h2 id="check-event-dates">Other events — check the announced dates</h2>
            <p>These guides need a reconciled end date for this calendar. Some describe future plans, while others may have ended; neither category is presented as currently open.</p>
            <details><summary>Browse {needsDateCheck.length} more event guides</summary>
              <div className="home-category-grid compact-category-grid">
                {needsDateCheck.map((event) => (
                  <Link className="home-category-card" href={"/explore/" + event.slug} key={event.slug}>
                    <span>{event.region} · Check dates</span><strong>{event.shortTitle}</strong><small>{event.summary}</small><i>Read planning guide →</i>
                  </Link>
                ))}
              </div>
            </details>
          </section> : null}

          {past.length ? <section className="top-gap" aria-labelledby="past-event-guides">
            <h2 id="past-event-guides">Past programmes and historical guides</h2>
            <p>The recorded event dates have passed. Read for reference or to find the organiser; never treat previous tickets or opening hours as valid for a new edition.</p>
            <details><summary>Browse {past.length} past event guides</summary>
              <div className="home-category-grid compact-category-grid">
                {past.map((event) => (
                  <Link className="home-category-card" href={"/explore/" + event.slug} key={event.slug}>
                    <span>{event.region} · Past event</span><strong>{event.shortTitle}</strong><small>{event.summary}</small><i>See archived guide →</i>
                  </Link>
                ))}
              </div>
            </details>
          </section> : null}
        </div>
      </section>
    </>
  );
}
