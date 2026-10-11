"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/client-analytics";

/**
 * Curated links to existing canonical hubs (not new keyword landing pages).
 * These are fixed, source-controlled choices, not claims about live search volume.
 */
const destinations = [
  { label: "Nigerian passport", href: "/topics/nigerian-passport", pillar: "Services", aliases: "passport renewal nis immigration application" },
  { label: "JAMB admissions", href: "/topics/jamb-2026", pillar: "Services", aliases: "jamb caps result profile registration" },
  { label: "NYSC", href: "/topics/nysc", pillar: "Services", aliases: "nysc camp call up relocation portal" },
  { label: "NIN correction", href: "/topics/nin-corrections", pillar: "Services", aliases: "nimc identity modification" },
  { label: "WAEC results", href: "/topics/waec", pillar: "Services", aliases: "waec exam result checker certificate" },
  { label: "CAC registration", href: "/topics/cac-business", pillar: "Services", aliases: "business name company corporate affairs" },
  { label: "BVN", href: "/topics/bvn", pillar: "Services", aliases: "bank verification number retrieval" },
  { label: "Open jobs", href: "/jobs/open-now", pillar: "Jobs", aliases: "jobs work recruitment vacancy hiring" },
  { label: "Graduate opportunities", href: "/jobs/graduate", pillar: "Jobs", aliases: "graduate trainee programme entry level" },
  { label: "Internships", href: "/jobs/internships", pillar: "Jobs", aliases: "intern siwes student placement" },
  { label: "Remote jobs", href: "/jobs/remote", pillar: "Jobs", aliases: "remote work from home online jobs" },
  { label: "Engineering jobs", href: "/jobs/engineering", pillar: "Jobs", aliases: "mechanical civil electrical engineering careers" },
  { label: "Jobs deadlines", href: "/jobs/deadlines", pillar: "Jobs", aliases: "application closing recruitment deadline" },
  { label: "Visit Lagos", href: "/explore/lagos", pillar: "Tour", aliases: "lagos city places things to do" },
  { label: "Explore Abuja", href: "/explore/abuja", pillar: "Tour", aliases: "fct abuja city attractions places" },
  { label: "Visit Calabar", href: "/explore/calabar", pillar: "Tour", aliases: "cross river tourism calabar" },
  { label: "Discover Benin City", href: "/explore/benin-city", pillar: "Tour", aliases: "edo benin heritage tourism" },
  { label: "Events and festivals", href: "/explore/events", pillar: "Tour", aliases: "tour nigeria concert carnival events festivals" },
  { label: "Things to do in Lagos", href: "/explore/things-to-do-lagos", pillar: "Tour", aliases: "lagos activities attractions things to do" },
  { label: "Nigerian movies", href: "/entertainment/movies", pillar: "Movies", aliases: "nollywood films watch movies" },
  { label: "Free movies on YouTube", href: "/entertainment/youtube", pillar: "Movies", aliases: "youtube nollywood watch legal full films" },
  { label: "Actors and filmmakers", href: "/entertainment/people", pillar: "Movies", aliases: "cast celebrities nollywood actors" },
  { label: "New movie releases", href: "/entertainment/releases", pillar: "Movies", aliases: "cinema upcoming release latest movie" },
  { label: "Nigerian series", href: "/entertainment/series", pillar: "Movies", aliases: "tv shows web series nigeria" },
] as const;

function normalise(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

export function GlobalSearchForm({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState(initialQuery);
  const [debounced, setDebounced] = useState(initialQuery);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const handle = window.setTimeout(() => setDebounced(query), 180);
    return () => window.clearTimeout(handle);
  }, [query]);

  const matches = useMemo(() => {
    const q = normalise(debounced);
    if (q.length < 2) return [];
    return destinations.map((item) => {
      const label = normalise(item.label);
      const haystack = normalise(item.label + " " + item.aliases + " " + item.pillar);
      const tokens = q.split(/\s+/).filter(Boolean);
      if (!tokens.every((token) => haystack.includes(token))) return null;
      const score = label === q ? 100 : label.startsWith(q) ? 60 : label.includes(q) ? 40 : 20;
      return { ...item, score };
    }).filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => b.score - a.score || a.label.localeCompare(b.label))
      .slice(0, 8);
  }, [debounced]);

  const open = focused && !dismissed && matches.length > 0 && query === debounced;

  function selectItem(item: (typeof destinations)[number]) {
    trackEvent("suggestion_selected", {
      search_area: "sitewide",
      suggestion_type: "curated_canonical",
      destination_pillar: item.pillar.toLowerCase(),
    });
    setDismissed(true);
    router.push(item.href);
  }

  return (
    <form className="global-search-form" method="get" action="/search" role="search" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <label htmlFor="global-search-input">What are you looking for?</label>
      <div className="global-search-field">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.4" /><path d="m16 16 4.2 4.2" /></svg>
        <input
          id="global-search-input"
          type="search"
          name="q"
          maxLength={120}
          value={query}
          placeholder="Try Customs, engineering, passport, Lagos, Aníkúlápó…"
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && activeIndex >= 0 ? listId + "-item-" + activeIndex : undefined}
          onFocus={() => setFocused(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(-1);
            setDismissed(false);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") { setDismissed(true); setActiveIndex(-1); return; }
            if (!open) return;
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActiveIndex((index) => Math.min(index + 1, matches.length - 1));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActiveIndex((index) => Math.max(index - 1, 0));
            } else if (event.key === "Enter" && activeIndex >= 0) {
              event.preventDefault();
              selectItem(matches[activeIndex]);
            }
          }}
        />
        <button type="submit">Search</button>
        {open ? (
          <div id={listId} role="listbox" aria-label="Suggested published pages" className="global-search-typeahead">
            {matches.map((item, index) => (
              <button
                type="button"
                role="option"
                aria-selected={activeIndex === index}
                id={listId + "-item-" + index}
                className="global-search-suggestion"
                key={item.href}
                onClick={() => selectItem(item)}
              >
                <span>{item.label}</span><small>{item.pillar}</small>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </form>
  );
}
