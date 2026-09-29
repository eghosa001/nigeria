"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { EntertainmentTitle } from "@/lib/entertainment";

const PAGE_SIZE = 24;

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
      <div className="directory-controls">
        <label className="directory-search">
          <span>Search movies</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="title, actor, genre or language…"
          />
        </label>
        <label>
          <span>Where to watch</span>
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
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="az">A–Z</option>
          </select>
        </label>
      </div>

      <div className="directory-summary" aria-live="polite">
        <strong>{filtered.length}</strong> movie{filtered.length === 1 ? "" : "s"} shown
        {(query || platform !== "all" || genre !== "all") ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setPlatform("all");
              setGenre("all");
              setSort("newest");
            }}
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {filtered.length ? (
        <div className="service-grid">
          {visible.map((title) => {
            const platformsForTitle = [...new Set(title.watchLinks.map((link) => link.platform))];
            return (
              <article className="service-card" key={title.slug}>
                <div className="card-topline">
                  <span>{title.year}</span>
                  <span>{platformsForTitle.join(" · ")}</span>
                </div>
                <h3><Link href={"/entertainment/movies/" + title.slug}>{title.title}</Link></h3>
                <p>{title.synopsis}</p>
                <div className="service-meta">
                  <strong>{title.genres.slice(0, 2).join(" · ")}</strong>
                  <Link href={"/entertainment/movies/" + title.slug}>Where to watch →</Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <strong>No matching movie yet.</strong>
          <p>Try another actor, title, platform or genre.</p>
        </div>
      )}

      {visibleCount < filtered.length ? (
        <div className="directory-load-more">
          <button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>Show more movies</button>
          <small>Showing {visible.length} of {filtered.length}</small>
        </div>
      ) : null}
    </>
  );
}
