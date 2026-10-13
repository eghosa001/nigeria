import type { Metadata } from "next";
import Link from "next/link";
import { FeatureShare } from "@/components/feature-share";

export const metadata: Metadata = {
  title: "What You Can Do on MyNigeriaGuide",
  description: "Discover Nigerian movie casts and viewing links, save service guides, follow career searches, plan trips, and share trusted information.",
  alternates: { canonical: "/features" },
};

const pillars = [
  {
    number: "01", label: "Movies & Entertainment", href: "/entertainment/movies",
    title: "Find the film and the people behind it.",
    description: "Search Nigerian films by title, actor, genre or platform. Explore cast profiles, release information and official viewing links.",
    actions: [
      { label: "Find a movie", href: "/entertainment/movies" },
      { label: "Actors & filmographies", href: "/entertainment/people" },
      { label: "Upcoming releases", href: "/entertainment/releases" },
      { label: "Free official YouTube films", href: "/entertainment/youtube" },
    ],
  },
  {
    number: "02", label: "Services", href: "/services",
    title: "Understand the process before you apply.",
    description: "Check requirements, fees, steps and responsible official sources. Watch useful guides to compare their verified details when you revisit.",
    actions: [
      { label: "Search services", href: "/services" },
      { label: "Find official portals", href: "/official-portals" },
      { label: "Saved & watched guides", href: "/saved" },
      { label: "Report a change", href: "/corrections" },
    ],
  },
  {
    number: "03", label: "Tour Nigeria", href: "/explore",
    title: "Make a trip you can afford.",
    description: "Find Nigerian destinations, cities and experiences, build an estimated budget using your own prices and share the plan with your travel group.",
    actions: [
      { label: "Plan a trip budget", href: "/explore/trip-planner" },
      { label: "Browse destinations", href: "/explore" },
      { label: "Events & festivals", href: "/explore/events" },
      { label: "Saved places", href: "/saved" },
    ],
  },
  {
    number: "04", label: "Jobs & Careers", href: "/jobs",
    title: "Follow opportunities that match you.",
    description: "Filter verified job and training pathways by career, location and sector. Save searches to check for fresh matches next time you visit.",
    actions: [
      { label: "Find jobs", href: "/jobs#opportunities" },
      { label: "Check saved job searches", href: "/saved" },
      { label: "Currently open", href: "/jobs/open-now" },
      { label: "Graduate opportunities", href: "/jobs/graduate" },
    ],
  },
] as const;

export default function FeaturesPage() {
  return (
    <div className="feature-guide">
      <section className="section page-top feature-guide-hero">
        <div className="container">
          <span className="eyebrow">Make the most of MyNigeriaGuide</span>
          <h1>More than answers. Useful things you can do.</h1>
          <p className="page-intro">Pick a task, use the guide, then save or share what matters. Everything stays organised around movies, services, places and careers.</p>
          <nav className="feature-guide-jump" aria-label="Explore features by pillar">
            {pillars.map((pillar) => <a href={"#feature-" + pillar.number} key={pillar.number}>{pillar.label}</a>)}
          </nav>
        </div>
      </section>

      <section className="section feature-guide-sections">
        <div className="container feature-guide-list">
          {pillars.map((pillar) => (
            <article className="feature-guide-card" id={"feature-" + pillar.number} key={pillar.number}>
              <div className="feature-guide-topline">
                <span className="eyebrow">{pillar.number} / {pillar.label}</span>
                <Link href={pillar.href}>Browse pillar →</Link>
              </div>
              <h2>{pillar.title}</h2>
              <p>{pillar.description}</p>
              <div className="feature-guide-actions" aria-label={pillar.label + " features"}>
                {pillar.actions.map((action) => <Link key={action.href} href={action.href}>{action.label} <span aria-hidden="true">↗</span></Link>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section feature-guide-share" aria-labelledby="share-mng-title">
        <div className="container">
          <div className="feature-guide-share-shell">
            <div>
              <span className="eyebrow">Help someone find what they need</span>
              <h2 id="share-mng-title">Share a useful starting point.</h2>
              <p>Send an introduction to one of the four pillars. The person receiving it can follow the right guide themselves.</p>
            </div>
            <FeatureShare />
          </div>
          <p className="feature-guide-note">Saved pages, watched service guides and job searches are kept on this device. Checks happen when you return; email or push notifications are not active. Always confirm fees, availability and deadlines with the official source.</p>
        </div>
      </section>
    </div>
  );
}
