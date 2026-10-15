import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { entertainmentTitles } from "@/lib/entertainment";
import { entertainmentPeople, getEntertainmentPerson } from "@/lib/entertainment-extras";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return entertainmentPeople.map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const person = getEntertainmentPerson(slug);
  if (!person) return {};
  return {
    title: person.name + " Movies, Cast Credits & Nigerian Film Profile",
    description: person.summary + " See Nigerian movies featuring " + person.name + " and linked film credits.",
    alternates: { canonical: "/entertainment/people/" + person.slug },
    // A name alone is not a useful searchable filmography. Keep incomplete
    // profiles navigable internally but out of search until a credit exists.
    robots: entertainmentTitles.some((title) =>
      person.knownForSlugs.includes(title.slug) ||
      title.cast.includes(person.name) ||
      title.directors?.includes(person.name),
    ) ? undefined : { index: false, follow: true },
  };
}

export default async function EntertainmentPersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = getEntertainmentPerson(slug);
  if (!person) notFound();

  const seeded = new Set(person.knownForSlugs);
  const credits = entertainmentTitles
    .filter((title) =>
      seeded.has(title.slug) ||
      title.cast.includes(person.name) ||
      title.directors?.includes(person.name),
    )
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));

  const genres = [...new Set(credits.flatMap((title) => title.genres.filter((genre) => genre !== "Nollywood")))].slice(0, 6);
  const sourceLinks = [...new Map<string, { href: string; label: string; film: string; lastChecked: string }>(
    credits.flatMap((title) => (title.references ?? []).map((source) => ({
      href: source.href,
      label: source.label,
      film: title.title,
      lastChecked: source.lastChecked,
    }))).filter((entry) => entry.href.startsWith("https://"))
      .map((entry) => [entry.href, entry] as const),
  ).values()].slice(0, 12);
  const base = getSiteUrl();
  const pageUrl = base + "/entertainment/people/" + person.slug;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: pageUrl,
    jobTitle: person.roles,
    description: person.summary,
    knowsAbout: genres,
    subjectOf: credits.map((title) => ({
      "@type": "Movie",
      name: title.title,
      url: base + "/entertainment/movies/" + title.slug,
      dateCreated: String(title.year),
    })),
  };

  return (
    <section className="section page-top">
      <div className="container">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Entertainment", href: "/entertainment" }, { label: "People", href: "/entertainment/people" }, { label: person.name }]} />
        <span className="eyebrow">{person.roles.join(" · ")}</span>
        <h1>{person.name}</h1>

        <AnswerFirst
          eyebrow="Quick profile"
          title={"Who is " + person.name + "?"}
          summary={person.summary}
          facts={[
            { label: "Known for here", value: credits.slice(0, 3).map((title) => title.title).join(", ") || "No linked titles yet" },
            { label: "Roles", value: person.roles.join(", ") },
            { label: "Genres", value: genres.join(", ") || "See linked credits" },
            { label: "Linked titles", value: String(credits.length) },
          ]}
          links={[
            ...(credits[0] ? [{ href: "/entertainment/movies/" + credits[0].slug, label: "Open latest linked title", primary: true }] : []),
            { href: "#credits", label: "See all linked credits" },
            ...(credits.length ? [{ href: "#credit-sources", label: "Credit sources" }] : []),
          ]}
          note="Use the profile summary first, then open individual movie pages for cast, story and official watch links."
        />

<div className="section-heading top-gap" id="credits"><div><span className="eyebrow">Movies</span><h2>Titles featuring {person.name}.</h2></div></div>
        {credits.length ? (
          <div className="service-grid">
            {credits.map((title) => {
              const roles = [
                title.cast.includes(person.name) ? "Cast" : null,
                title.directors?.includes(person.name) ? "Director" : null,
              ].filter(Boolean);
              return (
                <article className="service-card" key={title.slug}>
                  <div className="card-topline"><span>{title.year}</span><span>{roles.length ? roles.join(" · ") : "Related title · role not independently confirmed"}</span></div>
                  <h3><Link href={"/entertainment/movies/" + title.slug}>{title.title}</Link></h3>
                  <p>{title.synopsis}</p>
                  <div className="service-meta"><strong>{[...new Set(title.watchLinks.map((link) => link.platform))].join(" · ")}</strong><Link href={"/entertainment/movies/" + title.slug}>Open title →</Link></div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="info-box"><p>No linked film credits are currently confirmed in our editorial catalogue. This is a directory profile, not a complete verified filmography.</p></div>
        )}
        {credits.length ? (
          <section className="section profile-credit-sources" id="credit-sources">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Evidence and limitations</span>
                <h2>How these linked titles are checked</h2>
                <p>This selection reflects films in MyNigeriaGuide's verified catalogue, not every production in the person's career. Cast and director labels appear only when those roles are recorded in the individual film record. Open a title for specific credits, release details and current legal viewing options; a distributor's listing alone does not prove a particular cast role.</p>
              </div>
            </div>
            {sourceLinks.length ? (
              <div className="source-list">
                {sourceLinks.map((source) => (
                  <a href={source.href} key={source.href} target="_blank" rel="noreferrer">
                    <span><strong>{source.label}</strong><small>Film: {source.film}</small></span>
                    <span>Checked {source.lastChecked} ↗</span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="job-muted">No independently linked credit reference is available for this profile yet. Read individual film guides for their listed sources; do not treat an associated title as a verified character credit.</p>
            )}
          </section>
        ) : null}
      </div>
    </section>
  );
}
