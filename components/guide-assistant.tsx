"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { searchServices } from "@/lib/search";
import type { Service } from "@/lib/types";

export function GuideAssistant({ services }: { services: Service[] }) {
  const [draft, setDraft] = useState("");
  const [question, setQuestion] = useState("");

  const results = useMemo(() => question ? searchServices(services, question, 4) : [], [question, services]);

  function submit(event: FormEvent) {
    event.preventDefault();
    setQuestion(draft.trim());
  }

  return (
    <div className="assistant-card">
      <div>
        <span className="eyebrow">Verified guide finder</span>
        <h2>Describe the government task in your own words</h2>
        <p>
          This assistant does not invent answers. It finds the closest source-linked GovGuide pages so you can use the verified process and official portal.
        </p>
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
          <button type="submit">Find guide</button>
        </div>
      </form>

      {question ? (
        <div className="assistant-results" aria-live="polite">
          {results.length ? (
            <>
              <small>Best matches for “{question}”</small>
              {results.map(({ service }, index) => (
                <Link key={service.slug} href={"/services/" + service.slug}>
                  <span className="assistant-rank">{index + 1}</span>
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
