"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { ExplorePlaceKind } from "@/lib/explore-places";

type GuideSummary = { slug: string; shortTitle: string };
export type ExploreDirectoryPlace = {
  slug: string;
  guideSlug: string;
  name: string;
  kind: ExplorePlaceKind;
  area: string;
  address: string;
  summary: string;
  cost: string;
  mapQuery?: string;
  tags: string[];
};

const kindLabel: Record<ExplorePlaceKind, string> = {
  attraction: "Attraction",
  nature: "Nature",
  restaurant: "Restaurant",
  hotel: "Stay",
  shopping: "Shopping",
  landmark: "Landmark",
};

function googleMapsUrl(place: ExploreDirectoryPlace) {
  const query = place.mapQuery || [place.name, place.address].filter(Boolean).join(" ");
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
}

const PAGE_SIZE = 8;

export function ExplorePlaceDirectory({ places, guides }: { places: ExploreDirectoryPlace[]; guides: GuideSummary[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<ExplorePlaceKind | "all">("all");
  const [guide, setGuide] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setQuery(params.get("q") ?? "");
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const guideNames = useMemo(() => new Map(guides.map((item) => [item.slug, item.shortTitle])), [guides]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return places.filter((place) => {
      if (kind !== "all" && place.kind !== kind) return false;
      if (guide !== "all" && place.guideSlug !== guide) return false;
      if (!needle) return true;
      return [
        place.name,
        place.area,
        place.address,
        place.summary,
        place.tags.join(" "),
        guideNames.get(place.guideSlug) || "",
      ].join(" ").toLowerCase().includes(needle);
    });
  }, [places, kind, guide, query, guideNames]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, kind, guide]);

  const recommended = useMemo(() => {
    if (!query.trim() || filtered.length === 0 || filtered.length > 8) return [];
    const first = filtered[0];
    const tags = new Set(first.tags.map((tag) => tag.toLowerCase()));
    const shown = new Set(filtered.map((place) => place.slug));
    return places
      .filter((place) => !shown.has(place.slug))
      .map((place) => {
        const sameDestination = place.guideSlug === first.guideSlug;
        const commonTags = place.tags.filter((tag) => tags.has(tag.toLowerCase())).length;
        const score = (sameDestination ? 6 : 0) + (place.kind === first.kind ? 2 : 0) + commonTags * 3;
        return { place, score, reason: sameDestination ? "Same destination" : "Related interest" };
      })
      .filter(({ score }) => score >= 6)
      .sort((a, b) => b.score - a.score || a.place.name.localeCompare(b.place.name))
      .slice(0, 4);
  }, [query, filtered, places]);

  const visible = filtered.slice(0, visibleCount);
  const remaining = Math.max(0, filtered.length - visible.length);

  return (
    <div className="explore-directory">
      <div className="explore-directory-controls">
        <label>
          Search places
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Restaurant, museum, park, city..."
            type="search"
          />
        </label>
        <label>
          Type
          <select value={kind} onChange={(event) => setKind(event.target.value as ExplorePlaceKind | "all")}>
            <option value="all">All types</option>
            <option value="attraction">Attractions</option>
            <option value="nature">Nature</option>
            <option value="landmark">Landmarks</option>
            <option value="restaurant">Restaurants</option>
            <option value="hotel">Places to stay</option>
            <option value="shopping">Shopping</option>
          </select>
        </label>
        <label>
          Destination
          <select value={guide} onChange={(event) => setGuide(event.target.value)}>
            <option value="all">All destinations</option>
            {guides.map((item) => <option key={item.slug} value={item.slug}>{item.shortTitle}</option>)}
          </select>
        </label>
      </div>

      <div className="directory-summary">
        <span>
          <strong>{filtered.length}</strong> place{filtered.length === 1 ? "" : "s"} found
          {filtered.length ? " · showing " + visible.length : ""}
        </span>
        {(query || kind !== "all" || guide !== "all") ? (
          <button type="button" onClick={() => { setQuery(""); setKind("all"); setGuide("all"); }}>Clear filters</button>
        ) : null}
      </div>

      {filtered.length ? (
        <div className="explore-place-grid">
          {visible.map((place) => (
            <article className="explore-place-card" key={place.slug}>
              <div className="explore-place-topline">
                <span>{kindLabel[place.kind]}</span>
                <small>{guideNames.get(place.guideSlug)}</small>
              </div>
              <h3>{place.name}</h3>
              <p>{place.summary}</p>
              <dl>
                <div><dt>Address</dt><dd>{place.address}</dd></div>
                <div><dt>Cost</dt><dd>{place.cost}</dd></div>
              </dl>
              <div className="explore-place-actions">
                <a href={googleMapsUrl(place)} target="_blank" rel="noreferrer">Google Maps ↗</a>
                <Link href={"/explore/" + place.guideSlug + "#place-" + place.slug}>Full details →</Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <strong>No places match those filters.</strong>
          <p>Try a city name, another category or clear the filters.</p>
        </div>
      )}

      {recommended.length > 0 ? (
        <section className="explore-place-suggestions" aria-label="Related places">
          <div className="section-heading top-gap">
            <div>
              <span className="eyebrow">Keep exploring</span>
              <h2>Other places to consider</h2>
              <p className="job-muted">These suggestions are connected by destination or interests, not exact search matches.</p>
            </div>
          </div>
          <div className="explore-place-grid">
            {recommended.map(({ place, reason }) => (
              <article className="explore-place-card" key={place.guideSlug + "-" + place.slug}>
                <div className="explore-place-topline"><span>{kindLabel[place.kind]}</span><small>{reason}</small></div>
                <h3>{place.name}</h3>
                <p>{place.summary}</p>
                <div className="explore-place-actions">
                  <Link href={"/explore/" + place.guideSlug + "#place-" + place.slug}>Explore this place →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {remaining > 0 ? (
        <div className="explore-directory-more">
          <button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
            Show {Math.min(PAGE_SIZE, remaining)} more places
          </button>
          <small>{remaining} more available</small>
        </div>
      ) : null}
    </div>
  );
}
