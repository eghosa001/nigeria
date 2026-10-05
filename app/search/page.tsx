import type { Metadata } from "next";
import Link from "next/link";
import { searchGlobalCatalog } from "@/lib/global-search";

export const metadata: Metadata = {
  title: "Search MyNigeriaGuide",
  description: "Search Nigerian service guides, verified jobs and careers, travel destinations, places and Nigerian movies across MyNigeriaGuide.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true },
};

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

  const {
    serviceResults,
    jobResults,
    exploreResults,
    placeResults,
    movieResults,
    seriesResults,
    peopleResults,
    youtubeResults,
    totalShown,
  } = await searchGlobalCatalog(query);

  return (
    <>
      <section className="global-search-hero">
        <div className="container global-search-hero-inner">
          <span className="eyebrow">Search MyNigeriaGuide</span>
          <h1>One search across all four MyNigeriaGuide pillars.</h1>
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
              <Link href="/entertainment/movies">
                <span>01</span><strong>Movies & Entertainment</strong>
                <p>Nigerian movies, series, actors, cinemas, official streaming routes and free YouTube titles.</p>
                <b>Browse entertainment →</b>
              </Link>
              <Link href="/services">
                <span>02</span><strong>Services Guide</strong>
                <p>Processes, requirements, fees, official portals and what happens next.</p>
                <b>Browse services →</b>
              </Link>
              <Link href="/explore">
                <span>03</span><strong>Tour Nigeria</strong>
                <p>Cities, destinations, hotels, restaurants, attractions, events, addresses and practical trip planning.</p>
                <b>Explore Nigeria →</b>
              </Link>
              <Link href="/jobs">
                <span>04</span><strong>Jobs & Careers</strong>
                <p>Government recruitment, graduate pathways, internships, NYSC opportunities and reputable employer careers.</p>
                <b>Browse careers →</b>
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
                    <Link href="/entertainment/movies">Browse movies & entertainment →</Link>
                    <Link href="/services">Browse services →</Link>
                    <Link href="/explore">Explore Nigeria →</Link>
                    <Link href="/jobs">Browse jobs & careers →</Link>
                  </div>
                </div>
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

              {seriesResults.length ? (
                <section className="global-search-group">
                  <div className="global-search-group-heading">
                    <div><span>Series</span><strong>{seriesResults.length} shown</strong></div>
                    <Link href="/entertainment/series">Browse TV & web series →</Link>
                  </div>
                  <div className="global-search-list">
                    {seriesResults.map((item) => (
                      <Link href={"/entertainment/series/" + item.slug} key={item.slug}>
                        <span className="search-result-type">Series · {item.year} · {item.status}</span>
                        <strong>{item.title}</strong>
                        <p>{item.synopsis}</p>
                        <small>{item.genres.slice(0, 3).join(" · ")} · {item.cast.slice(0, 3).join(", ")}</small>
                        <b aria-hidden="true">→</b>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              {peopleResults.length ? (
                <section className="global-search-group">
                  <div className="global-search-group-heading">
                    <div><span>Actors & filmmakers</span><strong>{peopleResults.length} shown</strong></div>
                    <Link href="/entertainment/people">Browse people →</Link>
                  </div>
                  <div className="global-search-list">
                    {peopleResults.map((item) => (
                      <Link href={"/entertainment/people/" + item.slug} key={item.slug}>
                        <span className="search-result-type">Entertainment person · {item.roles.join(" · ")}</span>
                        <strong>{item.name}</strong>
                        <p>{item.summary}</p>
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

              {exploreResults.length ? (
                <section className="global-search-group">
                  <div className="global-search-group-heading">
                    <div><span>Tour Nigeria guides</span><strong>{exploreResults.length} shown</strong></div>
                    <Link href="/explore">Open Tour Nigeria →</Link>
                  </div>
                  <div className="global-search-list">
                    {exploreResults.map((item) => (
                      <Link href={"/explore/" + item.slug} key={item.slug}>
                        <span className="search-result-type">Tour Nigeria · {item.kind}</span>
                        <strong>{item.title}</strong>
                        <p>{item.summary}</p>
                        <small>{item.region} · reviewed {item.lastReviewed}</small>
                        <b aria-hidden="true">→</b>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              {placeResults.length ? (
                <section className="global-search-group">
                  <div className="global-search-group-heading">
                    <div><span>Tour places</span><strong>{placeResults.length} shown</strong></div>
                    <Link href={"/explore?q=" + encodeURIComponent(query) + "#places"}>Search Tour Nigeria →</Link>
                  </div>
                  <div className="global-search-list">
                    {placeResults.map((item) => (
                      <Link href={"/explore/" + item.guideSlug + "#place-" + item.slug} key={item.slug}>
                        <span className="search-result-type">Tour Nigeria · {item.kind}</span>
                        <strong>{item.name}</strong>
                        <p>{item.summary}</p>
                        <small>{item.area} · checked {item.checkedAt}</small>
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
                    <Link href={"/jobs?q=" + encodeURIComponent(query) + "#opportunities"}>Search careers →</Link>
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

            </>
          )}
        </div>
      </section>
    </>
  );
}
