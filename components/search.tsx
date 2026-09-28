"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Service } from "@/lib/types";

export function ServiceSearch({ services }: { services: Service[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return services
      .filter((service) =>
        [
          service.title,
          service.shortTitle,
          service.summary,
          service.category,
          ...service.searchTerms,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized),
      )
      .slice(0, 6);
  }, [query, services]);

  return (
    <div className="search-shell">
      <label htmlFor="service-search">What do you want to do?</label>
      <div className="search-input-wrap">
        <span aria-hidden="true">⌕</span>
        <input
          id="service-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="e.g. renew my passport, change NIN date of birth"
          autoComplete="off"
        />
      </div>

      {query.trim() ? (
        <div className="search-results" aria-live="polite">
          {results.length ? (
            results.map((service) => (
              <Link key={service.slug} href={"/services/" + service.slug}>
                <span>
                  <strong>{service.shortTitle}</strong>
                  <small>{service.category}</small>
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            ))
          ) : (
            <div className="search-empty">
              No matching guide yet. We are expanding the verified directory.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
