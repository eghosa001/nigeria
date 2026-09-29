"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { EntertainmentArtwork } from "@/components/entertainment-artwork";
import { getFeaturedCast, type EntertainmentTitle } from "@/lib/entertainment";

const PAGE_SIZE = 30;

export function EntertainmentCatalog({
  titles,
  initialQuery = "",
  initialPlatform = "all",
  initialGenre = "all",
}: {
  titles: EntertainmentTitle[];
  initialQuery?: string;
  initialPlatform?: string;
  initialGenre?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [platform, setPlatform] = useState(initialPlatform);
  const [genre, setGenre] = useState(initialGenre);
  const [sort, setSort] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const platforms = useMemo(
    () => [...new Set(titles.flatMap((title) => title.watchLinks.map((link) => link.platform)))].sort(),
    [titles],
  );
  const genres = useMemo(
    () => [...new Set(titles.flatMap((title) => title.genres))].sort(),
    [titles],
  );

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, platform, genre, sort]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const rows = titles.filter((title) => {
      const searchable = [
        title.title,
        title.synopsis,
        ...title.cast,
        ...title.genres,
        ...title.languages,
      ].join(" ").toLowerCase();

      return (
        (!normalized || searchable.includes(normalized)) &&
        (platform === "all" || title.watchLinks.some((link) => link.platform === platform)) &&
        (genre === "all" || title.genres.includes(genre))
      );
    });

    return [...rows].sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "oldest") return a.year - b.year || a.title.localeCompare(b.title);
      return b.year - a.year || a.title.localeCompare(b.title);
    });
  }, [titles, query, platform, genre, sort]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <div className="movie-filter-bar">
        <label className="movie-filter-search">
          <span>Search movies</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, actor, genre or language…" />
        </label>
        <label>
          <span>Platform</span>
          <select value={platform} onChange={(event) => setPlatform(event.target.value)}>
            <option value="all">All platforms</option>
            {platforms.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Genre</span>
          <select value={genre} onChange={(event) => setGenre(event.target.value)}>
            <option value="all">All genres</option>
            {genres.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A–Z</option>
          </select>
        </label>
      </div>

      {(query || platform !== "all" || genre !== "all") ? (
        <div className="movie-directory-summary">
          <button type="button" onClick={() => {
            setQuery("");
            setPlatform("all");
            setGenre("all");
            setSort("newest");
          }}>Clear filters</button>
        </div>
      ) : null}

      {filtered.length ? (
        <div className="movie-grid">
          {visible.map((title) => {
            const platformsForTitle = [...new Set(title.watchLinks.map((link) => link.platform))];
            return (
              <article className="movie-tile" key={title.slug}>
                <EntertainmentArtwork title={title} />
                <div className="movie-tile-meta">
                  <span>{title.year}</span>
                  <span>{platformsForTitle.join(" · ")}</span>
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

      {visibleCount < filtered.length ? (
        <div className="movie-load-more">
          <button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>Show more movies</button>
        </div>
      ) : null}
    </>
  );
}
