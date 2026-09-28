"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { searchServices } from "@/lib/search";
import type { PublicServiceListing } from "@/lib/data";

export function ServiceSearch({ services }: { services: PublicServiceListing[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => searchServices(services, query, 7), [query, services]);

  return (
    <div className="search-shell">
      <label htmlFor="service-search">What do you want to do?</label>
      <div className="search-input-wrap">
        <span aria-hidden="true">⌕</span>
        <input
          id="service-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="e.g. my passport expired, I lost my JAMB profile code"
          autoComplete="off"
        />
      </div>

      {query.trim() ? (
        <div className="search-results" aria-live="polite">
          {results.length ? (
            results.map(({ service }) => (
              <Link key={service.slug} href={"/services/" + service.slug}>
                <span>
                  <strong>{service.shortTitle}</strong>
                  <small>{service.category} · {service.status === "conflict" ? "official-source conflict" : "verified"}</small>
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            ))
          ) : (
            <div className="search-empty">
              No verified guide matches that yet. Try fewer words or browse the service directory.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
