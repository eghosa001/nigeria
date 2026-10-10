import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EntertainmentCatalog } from "@/components/entertainment-catalog";
import { YouTubeMovieCard } from "@/components/youtube-movie-card";
import {
  entertainmentPlatforms,
  getEntertainmentGenres,
} from "@/lib/entertainment";
import {
  queryEntertainmentDirectory,
  type EntertainmentDirectorySort,
} from "@/lib/entertainment-query";
import { trendingYouTubeMovies } from "@/lib/youtube-library";

type PreviewMovie = (typeof trendingYouTubeMovies)[number];

// Search discovery may contain approved publisher copy, but the flagship
// movie shelf should read like a curated publication, not a YouTube feed.
function hasEditorialMoviePreview(movie: PreviewMovie) {
  const title = movie.title.trim();
  const synopsis = movie.synopsis.trim();
  return title.length > 3 && title.length <= 60 &&
    synopsis.length >= 110 &&
    !/[|]/.test(title) &&
    !/\b(?:full\s*movies?|latest\s+(?:nigerian|nollywood)|yoruba\s+movie)\b/i.test(title) &&
    !/\b(?:you(?:'|’)ll\s+(?:love|definitely)|stay\s+glued|can(?:'|’)t\s+afford|must[- ]watch|don't\s+miss|do\s+not\s+miss|subscribe|like\s+and\s+share|this\s+weekend|latest\s+(?:nollywood|nigerian)|20\d{2}\s+latest|full\s+movies?)\b/i.test(synopsis);
}

type BrowsePlatform = (typeof entertainmentPlatforms)[number];

type MovieSearchParams = {
  q?: string;
  platform?: string;
  genre?: string;
  sort?: string;
  page?: string;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<MovieSearchParams>;
}): Promise<Metadata> {
  const params = await searchParams;
  const filtered = Boolean(
    (params.q ?? "").trim() ||
    (params.platform ?? "").trim() ||
    (params.genre ?? "").trim() ||
    (params.sort ?? "").trim() ||
    Number(params.page ?? "1") > 1
  );

  return {
    title: "Nollywood Movies: Classics, Genres & Where to Watch",
    description: "Explore Nollywood by comedy, family drama, Yoruba-language movies, established films and legal Netflix or YouTube links. Browse casts and verify playback.",
    alternates: { canonical: "/entertainment/movies" },
    robots: filtered ? { index: false, follow: true } : undefined,
  };
}

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<MovieSearchParams>;
}) {
  const params = await searchParams;
  const platforms = [...entertainmentPlatforms];
  const genres = getEntertainmentGenres();
  const initialPlatform = platforms.includes(params.platform as BrowsePlatform)
    ? params.platform as BrowsePlatform
    : "all";
  const initialGenre = params.genre && genres.includes(params.genre) ? params.genre : "all";
  const initialSort = ["oldest", "az"].includes(params.sort ?? "")
    ? params.sort as EntertainmentDirectorySort
    : "newest";
  const requestedPage = Math.max(1, Number(params.page ?? "1") || 1);
  const filteredMode = Boolean(
    (params.q ?? "").trim() ||
    initialPlatform !== "all" ||
    initialGenre !== "all" ||
    initialSort !== "newest"
  );

  if (!filteredMode && requestedPage > 1) {
    redirect("/entertainment/movies/page/" + requestedPage);
  }

  const initialResult = queryEntertainmentDirectory({
    q: params.q,
    platform: initialPlatform,
    genre: initialGenre,
    sort: initialSort,
    page: requestedPage,
  });
  const freePreview = trendingYouTubeMovies.filter(hasEditorialMoviePreview).slice(0, 10);

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
            <a href="#evergreen-movies">Browse by genre</a>
            <a href="#free-movies">Free on YouTube</a>
            <a href="#curated-movies">Netflix · Prime · YouTube · Kava</a>
            <Link href="/entertainment/people">Actors &amp; filmmakers</Link>
            <Link href="/entertainment/cinemas">Cinemas</Link>
            <Link href="/entertainment/releases">New &amp; upcoming</Link>
          </nav>
        </div>
      </section>

      <section className="movie-shelf-section" id="evergreen-movies">
        <div className="container">
          <div className="movie-section-heading"><div><span className="eyebrow">Explore Nollywood</span><h2>Choose a story, not just a release date.</h2></div><Link href="/entertainment/people">Actors and filmmakers →</Link></div>
          <p className="movie-long-summary">Nigerian cinema covers generations, languages and genres. Rather than calling a film the "best of all time" without a credible ranking method, start with the type of story you want. Each title page separates cast and plot information from legally verified places to watch.</p>
          <div className="movie-discovery-grid" aria-label="Browse Nigerian films by interest">
            <article className="movie-discovery-card">
              <h3>Essential Nigerian films</h3>
              <p>Start with acclaimed stories about family, power and education.</p>
              <div className="movie-discovery-links">
                <Link href="/entertainment/movies/lionheart">Lionheart <span aria-hidden="true">↗</span></Link>
                <Link href="/entertainment/movies/king-of-boys">King of Boys <span aria-hidden="true">↗</span></Link>
                <Link href="/entertainment/movies/citation">Citation <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
            <article className="movie-discovery-card">
              <h3>Comedy &amp; family drama</h3>
              <p>Explore humour, family expectations and ensemble stories.</p>
              <div className="movie-discovery-links">
                <Link href="/entertainment/movies/chief-daddy">Chief Daddy <span aria-hidden="true">↗</span></Link>
                <Link href="/entertainment/movies/a-tribe-called-judah">A Tribe Called Judah <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
            <article className="movie-discovery-card">
              <h3>Yoruba stories &amp; epics</h3>
              <p>Discover historical action, folklore and Yoruba-language cinema.</p>
              <div className="movie-discovery-links">
                <Link href="/entertainment/movies/jagun-jagun">Jagun Jagun <span aria-hidden="true">↗</span></Link>
                <Link href="/entertainment/movies/anikulapo">Aníkúlápó <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
            <article className="movie-discovery-card">
              <h3>Find a place to watch</h3>
              <p>Browse credited full films or compare legal streaming platforms.</p>
              <div className="movie-discovery-links">
                <Link href="/entertainment/youtube">Free on YouTube <span aria-hidden="true">↗</span></Link>
                <Link href="/entertainment/platforms">Streaming platforms <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          </div>
          <div className="compact-faq-list">
            <details><summary>Where can I find classic or old Nollywood movies?</summary><p>Use verified film detail pages and legal publishers rather than an uncredited download collection. Older films may not have a confirmed current stream; an absence of a watch link is more accurate than inventing an upload. Compare known titles, cast members and available platforms before subscribing.</p></details>
            <details><summary>What Nigerian movies can I watch on Netflix or YouTube?</summary><p>The catalog lets you filter by platform and open a movie's own official source. Netflix access can vary with your account and region. On YouTube, distinguish the film's original or authorised publisher from unofficial copied uploads and confirm that a full film, not merely a trailer, is linked.</p></details>
            <details><summary>Which Nollywood films are suitable for children and families?</summary><p>A story about family is not automatically age-appropriate. Read the synopsis, look for a reliable content classification and consider themes before playing it for children. The collection includes comedy and drama starting points without claiming any film is universally suitable for every age.</p></details>
          </div>
        </div>
      </section>

      <section className="movie-shelf-section" id="free-movies">
        <div className="container">
          <div className="movie-section-heading">
            <div>
              <span className="eyebrow">Free films</span>
              <h2>Featured Nigerian films on YouTube.</h2>
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
              <span className="eyebrow">Browse more</span>
              <h2>Movies across major platforms.</h2>
            </div>
          </div>
          <EntertainmentCatalog
            initialResult={initialResult}
            platforms={platforms}
            genres={genres}
            initialQuery={params.q ?? ""}
            initialPlatform={initialPlatform}
            initialGenre={initialGenre}
            initialSort={initialSort}
          />
        </div>
      </section>
    </>
  );
}
