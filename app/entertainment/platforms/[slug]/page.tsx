import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnswerFirst } from "@/components/answer-first";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EntertainmentArtwork } from "@/components/entertainment-artwork";
import { JsonLd } from "@/components/json-ld";
import { entertainmentTitles, getFeaturedCast } from "@/lib/entertainment";
import {
  getEntertainmentPlatformHub,
  indexableEntertainmentPlatformHubs,
} from "@/lib/entertainment-platform-hubs";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return indexableEntertainmentPlatformHubs.map((hub) => ({ slug: hub.slug }));
}

function titlesForPlatform(platform: string) {
  return entertainmentTitles
    .filter((title) => title.watchLinks.some((link) => link.platform === platform))
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hub = getEntertainmentPlatformHub(slug);
  if (!hub?.detailPage) return {};
  const titles = titlesForPlatform(hub.platform);

  return {
    title: "Nigerian Movies on " + hub.name + " — Popular Titles & Where to Watch",
    description: "Browse " + titles.length + " Nigerian movie guides linked to " + hub.name + ", with cast, story, runtime where verified and current official source links.",
    alternates: { canonical: "/entertainment/platforms/" + hub.slug },
  };
}

export default async function EntertainmentPlatformPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hub = getEntertainmentPlatformHub(slug);
  if (!hub?.detailPage) notFound();

  const titles = titlesForPlatform(hub.platform);
  const bySlug = new Map(titles.map((title) => [title.slug, title]));
  const popular = hub.popularTitleSlugs
    .map((titleSlug) => bySlug.get(titleSlug))
    .filter((title): title is NonNullable<typeof title> => Boolean(title));
  const popularSlugs = new Set(popular.map((title) => title.slug));
  const moreTitles = titles.filter((title) => !popularSlugs.has(title.slug)).slice(0, 24);
  const base = getSiteUrl();
  const pageUrl = base + "/entertainment/platforms/" + hub.slug;

  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Nigerian movies on " + hub.name,
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: titles.length,
      itemListElement: titles.slice(0, 50).map((title, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: title.title,
        url: base + "/entertainment/movies/" + title.slug,
      })),
    },
  };

  return (
    <>
      <JsonLd data={ld} />
      <section className="section page-top">
        <div className="container">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Entertainment", href: "/entertainment" },
            { label: "Platforms", href: "/entertainment/platforms" },
            { label: hub.name },
          ]} />

          <span className="eyebrow">Where to watch</span>
          <h1>Nigerian movies on {hub.name}</h1>
          <p className="page-intro">{hub.summary}</p>

          <AnswerFirst
            eyebrow="Quick answer"
            title={"Start with verified " + hub.name + " movie links"}
            summary={"MyNigeriaGuide currently has " + titles.length + " movie guides linked to " + hub.name + ". Open a movie page first for cast, story, runtime and source freshness before continuing to the platform."}
            facts={[
              { label: "Verified movie guides", value: String(titles.length) },
              { label: "Platform", value: hub.name },
              { label: "Source status", value: hub.status },
              { label: "Platform checked", value: hub.lastChecked },
            ]}
            links={[
              { href: "#popular", label: "Popular titles", primary: true },
              { href: "/entertainment/movies?platform=" + encodeURIComponent(hub.platform), label: "Filter all movies" },
              { href: hub.officialUrl, label: "Official platform", external: true },
            ]}
            note="Availability can change by account, subscription and territory. Each movie page records the exact source and its latest verification date."
          />

          <div className="section-heading top-gap" id="popular">
            <div>
              <span className="eyebrow">Popular starting points</span>
              <h2>Popular Nigerian titles on {hub.name}.</h2>
            </div>
          </div>

          <div className="movie-grid movie-related-grid">
            {popular.map((title) => (
              <article className="movie-tile movie-card-clickable" key={title.slug}>
                <Link className="movie-card-hitarea" href={"/entertainment/movies/" + title.slug} aria-label={"View details for " + title.title} />
                <EntertainmentArtwork title={title} />
                <div className="movie-tile-meta"><span>{title.year}</span><span>{title.languages[0]}</span></div>
                <h3><Link href={"/entertainment/movies/" + title.slug}>{title.title}</Link></h3>
                <p className="movie-tile-description">{title.synopsis}</p>
                <p className="movie-card-cast"><strong>Featuring:</strong> {getFeaturedCast(title).join(" · ")}</p>
                <div className="movie-tile-footer"><span>{title.genres.slice(0, 2).join(" · ")}</span><Link href={"/entertainment/movies/" + title.slug}>Details →</Link></div>
              </article>
            ))}
          </div>

          {moreTitles.length ? (
            <>
              <div className="section-heading top-gap">
                <div>
                  <span className="eyebrow">More on {hub.name}</span>
                  <h2>More verified movie guides.</h2>
                </div>
                <Link href={"/entertainment/movies?platform=" + encodeURIComponent(hub.platform)}>Browse all {titles.length} →</Link>
              </div>
              <div className="service-grid">
                {moreTitles.map((title) => (
                  <article className="service-card" key={title.slug}>
                    <div className="card-topline"><span>{title.year}</span><span>{title.genres.slice(0, 2).join(" · ")}</span></div>
                    <h3><Link href={"/entertainment/movies/" + title.slug}>{title.title}</Link></h3>
                    <p>{title.synopsis}</p>
                    <div className="service-meta">
                      <strong>{getFeaturedCast(title).slice(0, 2).join(" · ")}</strong>
                      <Link href={"/entertainment/movies/" + title.slug}>Movie guide →</Link>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
}
