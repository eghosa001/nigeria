"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { searchServices } from "@/lib/search";
import type { PublicServiceListing } from "@/lib/data";

export function GuideAssistant({ services }: { services: PublicServiceListing[] }) {
  const [draft, setDraft] = useState("");
  const [question, setQuestion] = useState("");

  const results = useMemo(() => question ? searchServices(services, question, 4) : [], [question, services]);

  function submit(event: FormEvent) {
    event.preventDefault();
    setQuestion(draft.trim());
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
          <button type="submit">Find my guide <span aria-hidden="true">→</span></button>
        </div>
      </form>

      {question ? (
        <div className="assistant-results" aria-live="polite">
          {results.length ? (
            <>
              <small>Best matches for “{question}”</small>
              {results.map(({ service }, index) => (
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
