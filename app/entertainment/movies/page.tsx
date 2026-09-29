import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EntertainmentCatalog } from "@/components/entertainment-catalog";
import { YouTubeMovieCard } from "@/components/youtube-movie-card";
import { entertainmentPlatforms, entertainmentTitles, getEntertainmentGenres } from "@/lib/entertainment";
import { youtubeMovieLibrary } from "@/lib/youtube-library";

export const metadata: Metadata = {
  title: "Nigerian Movies — Where to Watch",
  description: "Browse Nigerian movies visually by title, actor, genre and platform, with verified Netflix, YouTube, Prime Video and licensed Kava links."
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
  const freePreview = youtubeMovieLibrary.slice(0, 10);

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
              <span className="eyebrow">Nigerian movie discovery</span>
              <h1>Find something worth watching.</h1>
              <p className="page-intro">
                Browse a visual catalog of Nigerian movies, then open the verified official platform when you are ready to watch.
              </p>
            </div>
          </div>
          <nav className="movie-browse-tabs" aria-label="Movie browse shortcuts">
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
              <span className="eyebrow">Watch free</span>
              <h2>Full movies from approved YouTube publishers.</h2>
              <p>Real video thumbnails, compact cards and direct publisher links make it easy to scan several titles at once.</p>
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
              <h2>Netflix, Prime Video and selected YouTube films.</h2>
              <p>Search by movie, actor, genre or platform. Descriptions and featured cast stay compact so the screen remains visual.</p>
            </div>
            <Link href="/entertainment/image-rights">How images are sourced →</Link>
          </div>
          <EntertainmentCatalog
            titles={entertainmentTitles}
            initialQuery={params.q ?? ""}
            initialPlatform={initialPlatform ?? "all"}
            initialGenre={initialGenre}
          />
        </div>
      </section>
    </>
  );
}
