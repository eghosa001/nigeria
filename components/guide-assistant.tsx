"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import type { PublicServiceListing } from "@/lib/data";

type ServiceDirectoryResponse = { items?: PublicServiceListing[] };

export function GuideAssistant() {
  const [draft, setDraft] = useState("");
  const [question, setQuestion] = useState("");
  const [results, setResults] = useState<PublicServiceListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const clean = draft.trim();
    if (!clean) return;

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

  return (
    <div className="assistant-card">
      <div className="assistant-intro">
        <span className="assistant-symbol" aria-hidden="true">✦</span>
        <div>
          <span className="eyebrow">Verified guide finder</span>
          <h1>Tell us what you need to get done.</h1>
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

      {question ? (
        <div className="assistant-results" aria-live="polite">
          {loading ? (
            <p>Finding the closest verified guides…</p>
          ) : failed ? (
            <p>Search is temporarily unavailable. Please try again.</p>
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
            <p>No verified guide is close enough yet. Try a shorter description or browse all services.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
