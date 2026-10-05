import type { Metadata } from "next";
import Link from "next/link";
import { EntertainmentArtwork } from "@/components/entertainment-artwork";
import { YouTubeMovieCard } from "@/components/youtube-movie-card";
import { JsonLd } from "@/components/json-ld";
import { entertainmentTitles, getFeaturedCast } from "@/lib/entertainment";
import { getSiteUrl } from "@/lib/site";
import { trendingYouTubeMovies } from "@/lib/youtube-library";

export const metadata: Metadata = {
  title: "Nigerian Movies & Entertainment",
  description: "Discover Nigerian movies, cinemas, filmmakers and verified official links to watch on Netflix, YouTube, Prime Video and supported platforms.",
  alternates: { canonical: "/entertainment" },
};

const searchMomentumMovieSlugs = [
  "oversabi-aunty",
  "millionaire-until-morning",
  "bowale",
  "the-man-i-never-knew",
  "sister-agatha",
  "all-things-equal",
];

export default function EntertainmentPage() {
  const priorityMovies = searchMomentumMovieSlugs
    .map((slug) => entertainmentTitles.find((title) => title.slug === slug))
    .filter((title): title is NonNullable<typeof title> => Boolean(title));
  const prioritySlugs = new Set(priorityMovies.map((title) => title.slug));
  const featured = [
    ...priorityMovies,
    ...entertainmentTitles.filter((title) => title.featured && !prioritySlugs.has(title.slug)),
  ].slice(0, 6);
  const fresh = trendingYouTubeMovies.slice(0, 6);
  const base = getSiteUrl();

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Nigerian Movies & Entertainment",
    description: "A guide to Nigerian movies, cinemas, filmmakers and official places to watch.",
    url: base + "/entertainment",
    isPartOf: { "@type": "WebSite", name: "MyNigeriaGuide", url: base },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: entertainmentTitles.length,
      itemListElement: entertainmentTitles.map((title, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: title.title,
        url: base + "/entertainment/movies/" + title.slug,
      })),
    },
  };

  return (
    <>
      <JsonLd data={collectionLd} />

      <section className="section page-top minimal-section-hero">
        <div className="container">
          <span className="eyebrow">Movies</span>
          <h1>Find something worth watching.</h1>
          <p className="page-intro">Browse Nigerian films, see the important details, then continue to the official source.</p>
          <div className="minimal-inline-links">
            <Link href="/entertainment/movies">All movies</Link>
            <Link href="/entertainment/series">TV & web series</Link>
            <Link href="/entertainment/youtube">Free on YouTube</Link>
            <Link href="/entertainment/releases">New &amp; upcoming</Link>
            <Link href="/entertainment/cinemas">Cinemas</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="minimal-section-heading">
            <div><span className="eyebrow">New &amp; trending</span><h2>Fresh Nigerian movies.</h2></div>
            <Link href="/entertainment/youtube">Browse all free movies →</Link>
          </div>
          <div className="youtube-movie-grid movie-preview-grid">
            {fresh.map((movie, index) => (
              <YouTubeMovieCard movie={movie} priority={index < 3} key={movie.videoId} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="minimal-section-heading">
            <div><span className="eyebrow">Featured</span><h2>Start here.</h2></div>
            <Link href="/entertainment/movies">Browse all movies →</Link>
          </div>
          <div className="minimal-movie-row">
            {featured.map((title) => (
              <article className="minimal-movie-card movie-card-clickable" key={title.slug}>
                <Link className="movie-card-hitarea" href={"/entertainment/movies/" + title.slug} aria-label={"View details for " + title.title} />
                <Link href={"/entertainment/movies/" + title.slug} aria-label={"Open " + title.title}>
                  <EntertainmentArtwork title={title} showSourceLink={false} />
                </Link>
                <div>
                  <h3><Link href={"/entertainment/movies/" + title.slug}>{title.title}</Link></h3>
                  <p>{title.year} · {getFeaturedCast(title).slice(0, 2).join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section minimal-entertainment-choices">
        <div className="container">
          <div className="home-paths entertainment-paths">
            <Link href="/entertainment/youtube" className="home-path">
              <span>Free</span>
              <strong>YouTube movies</strong>
              <small>Full Nigerian movies on YouTube.</small>
            </Link>
            <Link href="/entertainment/cinemas" className="home-path">
              <span>Go out</span>
              <strong>Cinemas</strong>
              <small>Locations, showtimes and booking links.</small>
            </Link>
            <Link href="/entertainment/series" className="home-path">
              <span>Follow</span>
              <strong>TV & web series</strong>
              <small>Nollywood, Yoruba and Hausa series with verified viewing links.</small>
            </Link>
            <Link href="/entertainment/people" className="home-path">
              <span>Discover</span>
              <strong>Actors &amp; filmmakers</strong>
              <small>Browse actors and filmmakers.</small>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
