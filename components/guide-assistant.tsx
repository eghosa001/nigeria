"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import type { PublicServiceListing } from "@/lib/data";

type ServiceDirectoryResponse = { items?: PublicServiceListing[] };

const exampleSearches = [
  { label: "Renew a passport", query: "passport renewal" },
  { label: "Correct NIN details", query: "NIN name correction" },
  { label: "Register a business", query: "CAC business name registration" },
] as const;

export function GuideAssistant() {
  const [draft, setDraft] = useState("");
  const [question, setQuestion] = useState("");
  const [results, setResults] = useState<PublicServiceListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  async function findGuides(value: string) {
    const clean = value.trim();
    if (!clean) return;

    setDraft(clean);
    setQuestion(clean);
    setLoading(true);
    setFailed(false);
    setResults([]);

    try {
      const response = await fetch("/api/services?q=" + encodeURIComponent(clean) + "&pageSize=4", {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Service search failed");
      const payload = (await response.json()) as ServiceDirectoryResponse;
      setResults(Array.isArray(payload.items) ? payload.items : []);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void findGuides(draft);
  }

  return (
    <div className="assistant-card">
      <div className="assistant-intro">
        <span className="assistant-symbol" aria-hidden="true">✦</span>
        <div>
          <span className="eyebrow">Verified guide finder</span>
          <h2>Describe the task you need to complete.</h2>
          <p>
            Describe the task naturally. We match you to source-linked MyNigeriaGuide pages instead of inventing an answer.
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="assistant-form">
        <label htmlFor="assistant-question">What are you trying to do?</label>
        <div>
          <input
            id="assistant-question"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="e.g. I changed my surname and need to update my passport"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Finding…" : "Find my guide"} <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>

      <div className="related-links" aria-label="Example guide searches">
        {exampleSearches.map((example) => (
          <button
            key={example.query}
            className="button button-secondary"
            type="button"
            disabled={loading}
            onClick={() => void findGuides(example.query)}
          >
            {example.label} →
          </button>
        ))}
      </div>

      {question ? (
        <div className="assistant-results" aria-live="polite">
          {loading ? (
            <p>Finding the closest verified guides…</p>
          ) : failed ? (
            <p>Search is temporarily unavailable. <Link href="/services">Browse all verified services →</Link></p>
          ) : results.length ? (
            <>
              <small>Best matches for “{question}”</small>
              {results.map((service, index) => (
                <Link key={service.slug} href={"/services/" + service.slug}>
                  <span className="assistant-rank">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <strong>{service.shortTitle}</strong>
                    <small>{service.summary}</small>
                  </span>
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
            </>
          ) : (
            <p>No close match yet. Try a shorter description or <Link href="/services">browse all verified services →</Link></p>
          )}
        </div>
      ) : null}
    </div>
  );
}
