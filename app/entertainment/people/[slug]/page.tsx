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
    title: person.name + " — Nigerian Entertainment",
    description: person.summary,
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
  const platforms = [...new Set(credits.flatMap((title) => title.watchLinks.map((link) => link.platform)))];
  const years = credits.map((title) => title.year).sort((a, b) => a - b);
  const firstYear = years[0];
  const lastYear = years[years.length - 1];
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

        {credits.length ? (
          <section className="admin-panel top-gap" aria-labelledby="catalog-snapshot">
            <span className="eyebrow">Catalog snapshot</span>
            <h2 id="catalog-snapshot">{credits.length} connected title{credits.length === 1 ? "" : "s"} in MyNigeriaGuide.</h2>
            <p>
              This profile is built from verified movie records in the MyNigeriaGuide catalog rather than an exhaustive career biography.
              {firstYear && lastYear ? " The connected titles currently span " + (firstYear === lastYear ? String(firstYear) : firstYear + "–" + lastYear) + "." : ""}
              {genres.length ? " They include " + genres.slice(0, 4).join(", ") + "." : ""}
              {platforms.length ? " Current legal availability across these records is tracked on " + platforms.join(", ") + "." : ""}
            </p>
            <p>As additional verified movies are added, this page automatically expands with the person's matching cast or directing credits and links back to each title's legal watch sources.</p>
          </section>
        ) : null}

        <div className="section-heading top-gap"><div><span className="eyebrow">Connected titles</span><h2>In the MyNigeriaGuide catalog.</h2></div></div>
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
          <div className="info-box"><strong>Profile seeded.</strong><p>More verified title connections will appear as the movie catalog expands.</p></div>
        )}
      </div>
    </section>
  );
}
