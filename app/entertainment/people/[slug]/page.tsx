import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { entertainmentTitles } from "@/lib/entertainment";
import { entertainmentPeople, getEntertainmentPerson } from "@/lib/entertainment-extras";

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

  const knownFor = person.knownForSlugs
    .map((knownSlug) => entertainmentTitles.find((title) => title.slug === knownSlug))
    .filter((title): title is (typeof entertainmentTitles)[number] => Boolean(title));

  return (
    <section className="section page-top">
      <div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Entertainment", href: "/entertainment" }, { label: "People", href: "/entertainment/people" }, { label: person.name }]} />
        <span className="eyebrow">{person.roles.join(" · ")}</span>
        <h1>{person.name}</h1>
        <p className="page-intro">{person.summary}</p>

        <div className="section-heading top-gap"><div><span className="eyebrow">Connected titles</span><h2>In the MyNigeriaGuide catalog.</h2></div></div>
        {knownFor.length ? (
          <div className="service-grid">
            {knownFor.map((title) => (
              <article className="service-card" key={title.slug}>
                <div className="card-topline"><span>{title.year}</span><span>{title.genres.slice(0, 2).join(" · ")}</span></div>
                <h3><Link href={"/entertainment/movies/" + title.slug}>{title.title}</Link></h3>
                <p>{title.synopsis}</p>
                <div className="service-meta"><strong>{[...new Set(title.watchLinks.map((link) => link.platform))].join(" · ")}</strong><Link href={"/entertainment/movies/" + title.slug}>Open title →</Link></div>
              </article>
            ))}
          </div>
        ) : (
          <div className="info-box"><strong>Profile seeded.</strong><p>More verified title connections will appear as the movie catalog expands.</p></div>
        )}
      </div>
    </section>
  );
}
