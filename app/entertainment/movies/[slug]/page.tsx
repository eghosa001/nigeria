import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { entertainmentTitles, getEntertainmentTitle } from "@/lib/entertainment";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return entertainmentTitles.map((title) => ({ slug: title.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = getEntertainmentTitle(slug);
  if (!title) return {};

  return {
    title: title.title + " — Where to Watch",
    description: title.synopsis,
    alternates: { canonical: "/entertainment/movies/" + title.slug },
    openGraph: {
      type: "video.movie",
      title: title.title,
      description: title.synopsis,
      url: "/entertainment/movies/" + title.slug,
    },
  };
}

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = getEntertainmentTitle(slug);
  if (!title) notFound();

  const base = getSiteUrl();
  const pageUrl = base + "/entertainment/movies/" + title.slug;
  const lastChecked = title.watchLinks.reduce(
    (latest, link) => link.lastChecked > latest ? link.lastChecked : latest,
    "",
  );

  const movieLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: title.title,
    description: title.synopsis,
    url: pageUrl,
    genre: title.genres,
    inLanguage: title.languages,
    actor: title.cast.map((name) => ({ "@type": "Person", name })),
    sameAs: title.watchLinks.map((link) => link.href),
    potentialAction: title.watchLinks.map((link) => ({
      "@type": "WatchAction",
      target: link.href,
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Entertainment", item: base + "/entertainment" },
      { "@type": "ListItem", position: 3, name: "Movies", item: base + "/entertainment/movies" },
      { "@type": "ListItem", position: 4, name: title.title, item: pageUrl },
    ],
  };

  const related = entertainmentTitles
    .filter((item) => item.slug !== title.slug && item.genres.some((genre) => title.genres.includes(genre)))
    .slice(0, 3);

  return (
    <>
      <JsonLd data={[movieLd, breadcrumbLd]} />
      <section className="guide-hero">
        <div className="container guide-hero-grid">
          <div>
            <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "Entertainment", href: "/entertainment" },
              { label: "Movies", href: "/entertainment/movies" },
              { label: title.title },
            ]} />
            <span className="eyebrow">{title.year} Nigerian movie</span>
            <h1>{title.title}</h1>
            <p>{title.synopsis}</p>
            <div className="guide-badges">
              {title.genres.map((genre) => <span className="status-badge status-verified" key={genre}>{genre}</span>)}
            </div>
            <p className="hero-note">Watch links last checked {lastChecked}. Streaming availability can change by country and date.</p>
          </div>

          <aside className="fee-card">
            <span>Where to watch</span>
            <strong>{title.watchLinks.length} official option{title.watchLinks.length === 1 ? "" : "s"}</strong>
            <p>MyNigeriaGuide does not host the film. Use the verified platform link below.</p>
            {title.watchLinks.map((link) => (
              <a className="button" href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                {link.label} ↗
              </a>
            ))}
          </aside>
        </div>
      </section>

      <section className="section guide-main-section">
        <div className="container guide-layout">
          <article className="guide-content">
            <section>
              <h2>Movie details</h2>
              <div className="service-context-grid">
                <article><h3>Year</h3><p>{title.year}</p></article>
                <article><h3>Language</h3><p>{title.languages.join(", ")}</p></article>
                <article><h3>Cast</h3><p>{title.cast.join(", ")}</p></article>
                <article><h3>Genres</h3><p>{title.genres.join(", ")}</p></article>
              </div>
            </section>

            <section>
              <h2>Official watch links</h2>
              <div className="source-list">
                {title.watchLinks.map((link) => (
                  <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                    <span>
                      <strong>{link.platform} — {link.label}</strong>
                      <small>{link.note}</small>
                    </span>
                    <span>Checked {link.lastChecked} ↗</span>
                  </a>
                ))}
              </div>
            </section>

            <section>
              <h2>Availability note</h2>
              <div className="info-box">
                <strong>Platforms can change their catalogs.</strong>
                <p>Use the last-checked date as a freshness signal. If a title is removed, moved or region-restricted, the official platform page is the final authority.</p>
              </div>
            </section>
          </article>

          <aside className="guide-sidebar">
            <div className="sidebar-card">
              <span>Related movies</span>
              <strong>Keep browsing</strong>
              <div className="related-links">
                {related.map((item) => <Link href={"/entertainment/movies/" + item.slug} key={item.slug}>{item.title} →</Link>)}
                <Link href="/entertainment/movies">All movies →</Link>
              </div>
            </div>
            <div className="sidebar-card safety-card">
              <span>Rights &amp; safety</span>
              <strong>Official sources only</strong>
              <p>We do not link to piracy mirrors, file-sharing copies or unofficial re-uploads.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
