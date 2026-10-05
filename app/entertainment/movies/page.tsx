import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EntertainmentCatalog } from "@/components/entertainment-catalog";
import { YouTubeMovieCard } from "@/components/youtube-movie-card";
import { entertainmentPlatforms, entertainmentTitles, getEntertainmentGenres } from "@/lib/entertainment";
import { getEntertainmentCatalogPageCount } from "@/lib/entertainment-pagination";
import { trendingYouTubeMovies } from "@/lib/youtube-library";

export const metadata: Metadata = {
  title: "Nigerian Movies — Where to Watch",
  description: "Browse Nigerian movies by title, actor, genre and platform, with links to Netflix, YouTube, Prime Video and other supported platforms.",
  alternates: { canonical: "/entertainment/movies" },
};

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; platform?: string; genre?: string }>;
}) {
  const params = await searchParams;
  const initialPlatform = entertainmentPlatforms.includes(params.platform as (typeof entertainmentPlatforms)[number])
    ? params.platform
    : "all";
  const genres = getEntertainmentGenres();
  const initialGenre = params.genre && genres.includes(params.genre) ? params.genre : "all";
  const freePreview = trendingYouTubeMovies.slice(0, 10);
  const catalogPageCount = getEntertainmentCatalogPageCount();

  return (
    <>
      <section className="movie-browse-hero">
        <div className="container">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Entertainment", href: "/entertainment" },
            { label: "Movies" },
          ]} />
          <div className="movie-browse-heading">
            <div>
              <span className="eyebrow">Movies</span>
              <h1>Find something worth watching.</h1>
              <p className="page-intro">Browse Nigerian movies and open the platform when you are ready to watch.</p>
              <form className="section-quick-search" action="/entertainment/movies#curated-movies" method="get" role="search">
                <label>
                  <span>Search movies</span>
                  <input type="search" name="q" defaultValue={params.q ?? ""} placeholder="Movie, actor, genre or language…" />
                </label>
                <button type="submit">Search movies</button>
              </form>
            </div>
          </div>
          <nav className="movie-browse-tabs" aria-label="Movie browse shortcuts">
            <Link href="/entertainment/trending">Trending now</Link>
            <a href="#free-movies">Free on YouTube</a>
            <a href="#curated-movies">Netflix · Prime · YouTube · Kava</a>
            <Link href="/entertainment/releases">New &amp; upcoming</Link>
            <Link href="/entertainment/cinemas">Cinemas</Link>
          </nav>
        </div>
      </section>

      <section className="movie-shelf-section" id="free-movies">
        <div className="container">
          <div className="movie-section-heading">
            <div>
              <span className="eyebrow">New &amp; trending</span>
              <h2>New Nigerian movies on YouTube.</h2>
            </div>
            <Link href="/entertainment/youtube">Browse all free movies →</Link>
          </div>
          <div className="youtube-movie-grid movie-preview-grid">
            {freePreview.map((movie, index) => (
              <YouTubeMovieCard movie={movie} priority={index < 5} key={movie.videoId} />
            ))}
          </div>
        </div>
      </section>

      <section className="movie-catalog-section" id="curated-movies">
        <div className="container">
          <div className="movie-section-heading">
            <div>
              <span className="eyebrow">Curated across platforms</span>
              <h2>Movies across major platforms.</h2>
            </div>
          </div>
          <EntertainmentCatalog
            titles={entertainmentTitles}
            initialQuery={params.q ?? ""}
            initialPlatform={initialPlatform ?? "all"}
            initialGenre={initialGenre}
          />
          {catalogPageCount > 1 ? (
            <nav className="movie-pagination" aria-label="Curated movie catalog pages">
              <span>Page 1 of {catalogPageCount}</span>
              <Link prefetch={false} href="/entertainment/movies/page/2">Next →</Link>
            </nav>
          ) : null}
        </div>
      </section>
    </>
  );
}
