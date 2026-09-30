import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EntertainmentArtwork } from "@/components/entertainment-artwork";
import { getFeaturedCast } from "@/lib/entertainment";
import { getEntertainmentCatalogPage, getEntertainmentCatalogPageCount } from "@/lib/entertainment-pagination";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from({ length: Math.max(0, getEntertainmentCatalogPageCount() - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const page = Number((await params).page);
  const catalog = getEntertainmentCatalogPage(page);
  if (!catalog || page === 1) return { robots: { index: false, follow: true } };

  return {
    title: "Nigerian Movies — Page " + page,
    description: "Browse page " + page + " of Nigerian movies with verified official viewing links and cast details.",
    alternates: { canonical: "/entertainment/movies/page/" + page },
  };
}

export default async function CuratedMoviesPaginationPage({ params }: { params: Promise<{ page: string }> }) {
  const page = Number((await params).page);
  const catalog = getEntertainmentCatalogPage(page);
  if (!catalog || page === 1) notFound();

  const previousHref = page === 2 ? "/entertainment/movies" : "/entertainment/movies/page/" + (page - 1);
  const nextHref = page < catalog.pageCount ? "/entertainment/movies/page/" + (page + 1) : null;

  return (
    <>
      <section className="movie-browse-hero">
        <div className="container">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Entertainment", href: "/entertainment" },
            { label: "Movies", href: "/entertainment/movies" },
            { label: "Page " + page },
          ]} />
          <div className="movie-browse-heading">
            <div>
              <span className="eyebrow">Nigerian movie discovery</span>
              <h1>Browse more Nigerian movies.</h1>
              <p className="page-intro">Page {page} of the curated catalog, with direct internal links to every movie detail page.</p>
            </div>
          </div>
          <nav className="movie-browse-tabs" aria-label="Movie browse shortcuts">
            <Link href="/entertainment/movies">Search all movies</Link>
            <Link href="/entertainment/youtube">Free on YouTube</Link>
            <Link href="/entertainment/releases">New &amp; upcoming</Link>
            <Link href="/entertainment/cinemas">Cinemas</Link>
          </nav>
        </div>
      </section>

      <section className="movie-catalog-section">
        <div className="container">
          <div className="movie-grid">
            {catalog.titles.map((title) => {
              const platforms = [...new Set(title.watchLinks.map((link) => link.platform))];
              return (
                <article className="movie-tile" key={title.slug}>
                  <EntertainmentArtwork title={title} />
                  <div className="movie-tile-meta">
                    <span>{title.year}</span>
                    <span>{platforms.join(" · ")}</span>
                  </div>
                  <h2><Link href={"/entertainment/movies/" + title.slug} prefetch={false}>{title.title}</Link></h2>
                  <p className="movie-tile-description">{title.synopsis}</p>
                  <div className="movie-tile-facts">
                    {title.runtimeMinutes ? <span>{title.runtimeMinutes} min</span> : null}
                    <span>{title.languages.slice(0, 2).join(" / ")}</span>
                  </div>
                  <p className="movie-card-cast"><strong>Featuring:</strong> {getFeaturedCast(title).join(" · ")}</p>
                  <div className="movie-tile-footer">
                    <span>{title.genres.slice(0, 2).join(" · ")}</span>
                    <Link href={"/entertainment/movies/" + title.slug} prefetch={false}>Details →</Link>
                  </div>
                </article>
              );
            })}
          </div>

          <nav className="movie-pagination" aria-label="Curated movie catalog pages">
            <Link prefetch={false} href={previousHref}>← Previous</Link>
            <span>Page {page} of {catalog.pageCount}</span>
            {nextHref ? <Link prefetch={false} href={nextHref}>Next →</Link> : <span />}
          </nav>
        </div>
      </section>
    </>
  );
}
