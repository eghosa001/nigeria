import type { Metadata } from "next";
import Link from "next/link";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { exploreGuides } from "@/lib/explore";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nigeria Events & Festivals 2026: Lagos, Calabar & More",
  description: "Plan major Nigeria events and festivals in 2026, including Felabration, Design Week Lagos, Lagos Fashion Week, the CAC beneficial ownership conference, Detty December and Calabar Carnival.",
  alternates: { canonical: "/explore/events" },
};

const eventSlugs = ["felabration-2026", "design-week-lagos-2026", "lagos-fashion-week-2026", "beneficial-ownership-asset-recovery-conference-2026", "detty-december-lagos-2026", "calabar-carnival-2026"];

export default function EventsPage() {
  const events = eventSlugs.map((slug) => exploreGuides.find((guide) => guide.slug === slug)).filter((guide): guide is NonNullable<typeof guide> => Boolean(guide));
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
          <p className="page-intro">Current planning guides for major Lagos and Cross River events, with dates, official sources and practical movement advice.</p>
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
