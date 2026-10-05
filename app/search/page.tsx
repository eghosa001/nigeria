import type { Metadata } from "next";
import Link from "next/link";
import { publicServiceListings } from "@/lib/data";
import { exploreGuides } from "@/lib/explore";
import { entertainmentTitles } from "@/lib/entertainment";
import { jobOpportunities } from "@/lib/jobs";
import generatedYouTubeData from "@/data/youtube-movies.generated.json";

const generatedYouTubeMovies = generatedYouTubeData.movies;

export const metadata: Metadata = {
  title: "Search MyNigeriaGuide",
  description: "Search Nigerian service guides, verified jobs and careers, travel destinations, places and Nigerian movies across MyNigeriaGuide.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

function normalise(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function relevance(query: string, title: string, text: string) {
  const q = normalise(query);
  if (!q) return 0;

  const titleText = normalise(title);
  const haystack = normalise(title + " " + text);
  const tokens = q.split(/\s+/).filter(Boolean);

  if (!tokens.every((token) => haystack.includes(token))) return 0;

  let score = 10;
  if (titleText === q) score += 100;
  else if (titleText.startsWith(q)) score += 55;
  else if (titleText.includes(q)) score += 35;
  if (haystack.includes(q)) score += 18;

  for (const token of tokens) {
    if (titleText.split(" ").includes(token)) score += 10;
    else if (titleText.includes(token)) score += 6;
    else score += 2;
  }

  return score;
}

function resultCountLabel(count: number) {
  return count === 1 ? "1 result" : count + " results";
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();

  const serviceResults = query
    ? publicServiceListings
        .map((item) => ({
          item,
          score: relevance(
            query,
            item.title,
            [item.shortTitle, item.summary, item.category, item.agencySlug, item.searchTerms.join(" "), item.searchText].join(" "),
          ),
        }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
        .slice(0, 16)
        .map((entry) => entry.item)
    : [];

  const jobResults = query
    ? jobOpportunities
        .map((item) => ({
          item,
          score: relevance(
            query,
            item.title,
            [item.organization, item.summary, item.sector, item.location, item.employmentType, item.audiences.join(" "), item.fields.join(" "), item.qualifications.join(" ")].join(" "),
          ),
        }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
        .slice(0, 8)
        .map((entry) => entry.item)
    : [];

  const exploreResults = query
    ? exploreGuides
        .map((item) => ({
          item,
          score: relevance(
            query,
            item.title,
            [
              item.shortTitle,
              item.region,
              item.kind,
              item.summary,
              item.bestFor.join(" "),
              item.highlights.map((highlight) => highlight.name + " " + highlight.detail).join(" "),
            ].join(" "),
          ),
        }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
        .slice(0, 8)
        .map((entry) => entry.item)
    : [];

  const movieResults = query
    ? entertainmentTitles
        .map((item) => ({
          item,
          score: relevance(
            query,
            item.title,
            [item.synopsis, item.genres.join(" "), item.languages.join(" "), item.cast.join(" "), item.directors?.join(" ") ?? "", String(item.year)].join(" "),
          ),
        }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score || b.item.year - a.item.year)
        .slice(0, 8)
        .map((entry) => entry.item)
    : [];

  const youtubeResults = query
    ? generatedYouTubeMovies
        .map((item) => ({
          item,
          score: relevance(
            query,
            item.title,
            [item.synopsis, item.cast.join(" "), item.channelName, String(item.year)].join(" "),
          ),
        }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score || b.item.publishedAt.localeCompare(a.item.publishedAt))
        .slice(0, 8)
        .map((entry) => entry.item)
    : [];

  const totalShown = serviceResults.length + jobResults.length + exploreResults.length + movieResults.length + youtubeResults.length;

  return (
    <>
      <section className="global-search-hero">
        <div className="container global-search-hero-inner">
          <span className="eyebrow">Search MyNigeriaGuide</span>
          <h1>One search for services, jobs, places and movies.</h1>
          <p>
            You do not need to know which section something belongs in first. Search a task, employer, career path, city, attraction, actor, movie or publisher.
          </p>

          <form className="global-search-form" method="get" action="/search">
            <label htmlFor="global-search-input">What are you looking for?</label>
            <div>
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.4" /><path d="m16 16 4.2 4.2" /></svg>
              <input
                id="global-search-input"
                name="q"
                defaultValue={query}
                placeholder="Try Customs, engineering, passport, Lagos, Aníkúlápó…"
                autoComplete="off"
              />
              <button type="submit">Search</button>
            </div>
          </form>

          <div className="global-search-suggestions" aria-label="Popular searches">
            <span>Try</span>
            <Link href="/search?q=passport">Passport</Link>
            <Link href="/search?q=Lagos">Lagos</Link>
            <Link href="/search?q=government+recruitment">Government jobs</Link>
            <Link href="/search?q=engineering">Engineering careers</Link>
            <Link href="/search?q=foreign+visa">Foreign visa</Link>
            <Link href="/search?q=Maurice+Sam">Maurice Sam</Link>
            <Link href="/search?q=YouTube+movie">YouTube movies</Link>
          </div>
        </div>
      </section>

      <section className="section global-search-results">
        <div className="container">
          {!query ? (
            <div className="search-start-grid">
              <Link href="/services">
                <span>01</span><strong>Services</strong>
                <p>Processes, requirements, fees, official portals and what happens next.</p>
                <b>Browse services →</b>
              </Link>
              <Link href="/jobs">
                <span>02</span><strong>Jobs & Careers</strong>
                <p>Government recruitment, graduate pathways, internships and reputable employer careers.</p>
                <b>Browse careers →</b>
              </Link>
              <Link href="/explore">
                <span>03</span><strong>Explore Nigeria</strong>
                <p>Cities, destinations, places, addresses, maps and practical trip planning.</p>
                <b>Explore places →</b>
              </Link>
              <Link href="/entertainment/movies">
                <span>04</span><strong>Entertainment</strong>
                <p>Nigerian movies, actors, official streaming routes and free YouTube titles.</p>
                <b>Browse movies →</b>
              </Link>
            </div>
          ) : (
            <>
              <div className="global-search-summary" aria-live="polite">
                <div>
                  <span className="eyebrow">Search results</span>
                  <h2>Results for “{query}”</h2>
                </div>
                <strong>{resultCountLabel(totalShown)} shown</strong>
              </div>

              {totalShown === 0 ? (
                <div className="global-search-empty">
                  <strong>No strong match yet.</strong>
                  <p>Try fewer words, a person’s name, a city, or the task you want to complete.</p>
                  <div>
                    <Link href="/services">Browse services →</Link>
                    <Link href="/jobs">Browse jobs & careers →</Link>
                    <Link href="/explore">Explore Nigeria →</Link>
                    <Link href="/entertainment/movies">Browse movies →</Link>
                  </div>
                </div>
              ) : null}

              {serviceResults.length ? (
                <section className="global-search-group">
                  <div className="global-search-group-heading">
                    <div><span>Services</span><strong>{serviceResults.length} shown</strong></div>
                    <Link href={"/services?q=" + encodeURIComponent(query)}>Search services only →</Link>
                  </div>
                  <div className="global-search-list">
                    {serviceResults.map((item) => (
                      <Link href={"/services/" + item.slug} key={item.slug}>
                        <span className="search-result-type">Service · {item.category}</span>
                        <strong>{item.title}</strong>
                        <p>{item.summary}</p>
                        <small>{item.status === "verified" ? "Verified guide" : "Guide"} · checked {item.lastVerified}</small>
                        <b aria-hidden="true">→</b>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              {jobResults.length ? (
                <section className="global-search-group">
                  <div className="global-search-group-heading">
                    <div><span>Jobs & Careers</span><strong>{jobResults.length} shown</strong></div>
                    <Link href="/jobs">Open careers hub →</Link>
                  </div>
                  <div className="global-search-list">
                    {jobResults.map((item) => (
                      <Link href={"/jobs/" + item.slug} key={item.slug}>
                        <span className="search-result-type">Career · {item.sector} · {item.statusLabel}</span>
                        <strong>{item.title}</strong>
                        <p>{item.summary}</p>
                        <small>{item.organization} · checked {item.verifiedAt}</small>
                        <b aria-hidden="true">→</b>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              {exploreResults.length ? (
                <section className="global-search-group">
                  <div className="global-search-group-heading">
                    <div><span>Explore Nigeria</span><strong>{exploreResults.length} shown</strong></div>
                    <Link href="/explore">Open travel guide →</Link>
                  </div>
                  <div className="global-search-list">
                    {exploreResults.map((item) => (
                      <Link href={"/explore/" + item.slug} key={item.slug}>
                        <span className="search-result-type">Travel · {item.kind}</span>
                        <strong>{item.title}</strong>
                        <p>{item.summary}</p>
                        <small>{item.region} · reviewed {item.lastReviewed}</small>
                        <b aria-hidden="true">→</b>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              {movieResults.length ? (
                <section className="global-search-group">
                  <div className="global-search-group-heading">
                    <div><span>Movies</span><strong>{movieResults.length} shown</strong></div>
                    <Link href={"/entertainment/movies?q=" + encodeURIComponent(query)}>Search curated movies →</Link>
                  </div>
                  <div className="global-search-list">
                    {movieResults.map((item) => (
                      <Link href={"/entertainment/movies/" + item.slug} key={item.slug}>
                        <span className="search-result-type">Movie · {item.year}</span>
                        <strong>{item.title}</strong>
                        <p>{item.synopsis}</p>
                        <small>{item.genres.slice(0, 3).join(" · ")} · {item.cast.slice(0, 3).join(", ")}</small>
                        <b aria-hidden="true">→</b>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              {youtubeResults.length ? (
                <section className="global-search-group">
                  <div className="global-search-group-heading">
                    <div><span>Free on YouTube</span><strong>{youtubeResults.length} shown</strong></div>
                    <Link href={"/entertainment/youtube?q=" + encodeURIComponent(query)}>Search all YouTube movies →</Link>
                  </div>
                  <div className="global-search-list">
                    {youtubeResults.map((item) => (
                      <Link href={"/entertainment/youtube/" + item.videoId} key={item.videoId}>
                        <span className="search-result-type">YouTube movie · {item.year}</span>
                        <strong>{item.title}</strong>
                        <p>{item.synopsis}</p>
                        <small>{item.channelName}{item.featuredCast.length ? " · " + item.featuredCast.join(", ") : ""}</small>
                        <b aria-hidden="true">→</b>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}
            </>
          )}
        </div>
      </section>
    </>
  );
}
