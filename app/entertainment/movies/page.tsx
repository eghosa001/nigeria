import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EntertainmentCatalog } from "@/components/entertainment-catalog";
import { entertainmentPlatforms, entertainmentTitles, getEntertainmentGenres } from "@/lib/entertainment";
import { youtubeMovieLibrary, youtubePendingQualityCount } from "@/lib/youtube-library";

export const metadata: Metadata = {
  title: "Nigerian Movies — Where to Watch",
  description: "Browse Nigerian movies by title, actor, genre and platform, with official Netflix and YouTube watch links.",
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

  return (
    <section className="section page-top">
      <div className="container">
        <Breadcrumbs items={[
          { label: "Home", href: "/" },
          { label: "Entertainment", href: "/entertainment" },
          { label: "Movies" },
        ]} />
        <span className="eyebrow">Nigerian movie directory</span>
        <h1>Movies and official places to watch.</h1>
        <p className="page-intro">
          Filter the curated cross-platform catalog without loading video players or giant media files. Open a movie to see its verified official watch links and the date those links were checked.
        </p>

        <div className="category-summary">
          <div><strong>{youtubeMovieLibrary.length.toLocaleString()}</strong><span>full YouTube movies</span></div>
          <div><strong>{entertainmentTitles.length}</strong><span>curated cross-platform titles</span></div>
          <div><strong>{youtubePendingQualityCount}</strong><span>held for metadata review</span></div>
        </div>

        <div className="info-box top-gap">
          <strong>The large YouTube library is already live in this section.</strong>
          <p>
            Browse all {youtubeMovieLibrary.length.toLocaleString()} approved full movies with server-side search and pagination, including actor and publisher filters.
          </p>
          <div className="related-links">
            <Link href="/entertainment/youtube">Browse the full YouTube movie library →</Link>
          </div>
        </div>

        <EntertainmentCatalog
          titles={entertainmentTitles}
          initialQuery={params.q ?? ""}
          initialPlatform={initialPlatform ?? "all"}
          initialGenre={initialGenre}
        />
      </div>
    </section>
  );
}
