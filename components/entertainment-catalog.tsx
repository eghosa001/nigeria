"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { EntertainmentArtwork } from "@/components/entertainment-artwork";
import { getFeaturedCast, type EntertainmentPlatform } from "@/lib/entertainment";
import type {
  EntertainmentDirectoryResult,
  EntertainmentDirectorySort,
} from "@/lib/entertainment-query";

type Props = {
  initialResult: EntertainmentDirectoryResult;
  platforms: EntertainmentPlatform[];
  genres: string[];
  initialQuery?: string;
  initialPlatform?: EntertainmentPlatform | "all";
  initialGenre?: string;
  initialSort?: EntertainmentDirectorySort;
};

export function EntertainmentCatalog({
  initialResult,
  platforms,
  genres,
  initialQuery = "",
  initialPlatform = "all",
  initialGenre = "all",
  initialSort = "newest",
}: Props) {
  const [result, setResult] = useState(initialResult);
  const [query, setQuery] = useState(initialQuery);
  const [platform, setPlatform] = useState<EntertainmentPlatform | "all">(initialPlatform);
  const [genre, setGenre] = useState(initialGenre);
  const [sort, setSort] = useState<EntertainmentDirectorySort>(initialSort);
  const [page, setPage] = useState(initialResult.page);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const skipInitialFetch = useRef(true);

  useEffect(() => {
    setReady(true);

    function syncFromUrl() {
      const params = new URLSearchParams(window.location.search);
      const nextPlatform = params.get("platform") ?? "all";
      const nextGenre = params.get("genre") ?? "all";
      const nextSort = params.get("sort") ?? "newest";

      setQuery(params.get("q") ?? "");
      setPlatform(nextPlatform === "all" || platforms.includes(nextPlatform as EntertainmentPlatform)
        ? nextPlatform as EntertainmentPlatform | "all"
        : "all");
      setGenre(nextGenre === "all" || genres.includes(nextGenre) ? nextGenre : "all");
      setSort(["newest", "oldest", "az"].includes(nextSort) ? nextSort as EntertainmentDirectorySort : "newest");
      setPage(Math.max(1, Number(params.get("page") ?? "1") || 1));
    }

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [platforms, genres]);

  useEffect(() => {
    if (!ready) return;
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (platform !== "all") params.set("platform", platform);
      if (genre !== "all") params.set("genre", genre);
      if (sort !== "newest") params.set("sort", sort);
      if (page > 1) params.set("page", String(page));
      params.set("pageSize", String(initialResult.pageSize));

      const visibleParams = new URLSearchParams(params);
      visibleParams.delete("pageSize");
      const visibleQuery = visibleParams.toString();
      window.history.replaceState(null, "", "/entertainment/movies" + (visibleQuery ? "?" + visibleQuery : "") + "#curated-movies");

      try {
        const response = await fetch("/api/entertainment/movies?" + params.toString(), {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Movie query failed with HTTP " + response.status);
        const next = await response.json() as EntertainmentDirectoryResult;
        setResult(next);
        if (next.page !== page) setPage(next.page);
      } catch (error) {
        if ((error as { name?: string }).name !== "AbortError") console.error(error);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, query ? 200 : 0);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [ready, query, platform, genre, sort, page, initialResult.pageSize]);

  const resetPage = <T,>(setter: (value: T) => void, value: T) => {
    setter(value);
    setPage(1);
  };

  const filtersActive = Boolean(query || platform !== "all" || genre !== "all" || sort !== "newest");

  return (
    <>
      <div className="movie-filter-bar">
        <label className="movie-filter-search">
          <span>Search movies</span>
          <input
            type="search"
            value={query}
            onChange={(event) => resetPage(setQuery, event.target.value)}
            placeholder="Title, actor, genre or language…"
          />
        </label>
        <label>
          <span>Platform</span>
          <select value={platform} onChange={(event) => resetPage(setPlatform, event.target.value as EntertainmentPlatform | "all")}>
            <option value="all">All platforms</option>
            {platforms.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Genre</span>
          <select value={genre} onChange={(event) => resetPage(setGenre, event.target.value)}>
            <option value="all">All genres</option>
            {genres.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Sort</span>
          <select
            value={sort}
            onChange={(event) => resetPage(setSort, event.target.value as EntertainmentDirectorySort)}
            disabled={Boolean(query.trim())}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A–Z</option>
          </select>
        </label>
      </div>

      <div className="movie-directory-summary" aria-live="polite">
        <span><strong>{result.total}</strong> movie{result.total === 1 ? "" : "s"} found{loading ? " · Updating…" : ""}</span>
        {filtersActive ? (
          <button type="button" onClick={() => {
            setQuery("");
            setPlatform("all");
            setGenre("all");
            setSort("newest");
            setPage(1);
          }}>Clear filters</button>
        ) : null}
      </div>

      {result.items.length ? (
        <div className="movie-grid">
          {result.items.map((title) => {
            const platformsForTitle = [...new Set(title.watchLinks.map((link) => link.platform))];
            return (
              <article className="movie-tile movie-card-clickable" key={title.slug}>
                <Link className="movie-card-hitarea" href={"/entertainment/movies/" + title.slug} prefetch={false} aria-label={"View details for " + title.title} />
                <EntertainmentArtwork title={title} />
                <div className="movie-tile-meta">
                  <span>{title.year}</span>
                  <span>{platformsForTitle.length ? platformsForTitle.join(" · ") : "Availability unverified"}</span>
                </div>
                <h3><Link href={"/entertainment/movies/" + title.slug} prefetch={false}>{title.title}</Link></h3>
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
      ) : (
        <div className="movie-empty-state">
          <strong>No matching movie yet.</strong>
          <p>Try another actor, title, platform or genre.</p>
        </div>
      )}

      {result.totalPages > 1 ? (
        filtersActive ? (
          <nav className="movie-pagination" aria-label="Filtered movie result pages">
            <button type="button" disabled={page <= 1 || loading} onClick={() => setPage((value) => Math.max(1, value - 1))}>← Previous</button>
            <span>Page {result.page} of {result.totalPages}</span>
            <button type="button" disabled={page >= result.totalPages || loading} onClick={() => setPage((value) => Math.min(result.totalPages, value + 1))}>Next →</button>
          </nav>
        ) : (
          <nav className="movie-pagination" aria-label="Curated movie catalog pages">
            <span>Page 1 of {result.totalPages}</span>
            <Link prefetch={false} href="/entertainment/movies/page/2">Next →</Link>
          </nav>
        )
      ) : null}
    </>
  );
}
