import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
        <p className="page-intro">{person.summary}</p>

<div className="section-heading top-gap"><div><span className="eyebrow">Movies</span><h2>{person.name} movies and film credits</h2></div></div>
        {credits.length ? (
          <div className="service-grid">
            {credits.map((title) => {
              const roles = [
                title.cast.includes(person.name) ? "Cast" : null,
                title.directors?.includes(person.name) ? "Director" : null,
              ].filter(Boolean);
              return (
                <article className="service-card" key={title.slug}>
                  <div className="card-topline"><span>{title.year}</span><span>{roles.length ? roles.join(" · ") : title.genres.slice(0, 2).join(" · ")}</span></div>
                  <h3><Link href={"/entertainment/movies/" + title.slug}>{title.title}</Link></h3>
                  <p>{title.synopsis}</p>
                  <div className="service-meta"><strong>{[...new Set(title.watchLinks.map((link) => link.platform))].join(" · ")}</strong><Link href={"/entertainment/movies/" + title.slug}>Open title →</Link></div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="info-box"><p>No linked titles yet.</p></div>
        )}
      </div>
    </section>
  );
}
