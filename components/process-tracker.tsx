"use client";

import { useEffect, useMemo, useState } from "react";
import type { Service } from "@/lib/types";
import { trackEvent } from "@/lib/client-analytics";

type Progress = { started: boolean; requirements: boolean[]; steps: boolean[] };

function empty(service: Service): Progress {
  return { started: false, requirements: service.requirements.map(() => false), steps: service.steps.map(() => false) };
}

export function ProcessTracker({ service }: { service: Service }) {
  const key = "mynigeriaguide:process:" + service.slug;
  const [progress, setProgress] = useState<Progress>(() => empty(service));
  const completionKey = key + ":completion-tracked";

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) ?? "null");
      if (saved && Array.isArray(saved.requirements) && Array.isArray(saved.steps)) {
        setProgress({
          started: Boolean(saved.started),
          requirements: service.requirements.map((_, i) => Boolean(saved.requirements[i])),
          steps: service.steps.map((_, i) => Boolean(saved.steps[i])),
        });
      }
    } catch {}
  }, [key, service.requirements, service.steps]);

  useEffect(() => {
    if (!progress.started) return;
    localStorage.setItem(key, JSON.stringify(progress));
  }, [key, progress]);

  const total = progress.requirements.length + progress.steps.length;
  const done = [...progress.requirements, ...progress.steps].filter(Boolean).length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  const nextRequirement = service.requirements.find((_, i) => !progress.requirements[i]);
  const nextStep = service.steps.find((_, i) => !progress.steps[i]);
  const next = nextRequirement ? "Prepare: " + nextRequirement : nextStep ?? "All checklist items are complete.";

  const requirementRows = useMemo(() => service.requirements.map((label, index) => ({ label, index })), [service.requirements]);
  const stepRows = useMemo(() => service.steps.map((label, index) => ({ label, index })), [service.steps]);

  if (!progress.started) {
    return (
      <section className="process-tracker process-tracker-start">
        <div>
          <span className="eyebrow">My Process</span>
          <h2>Turn this guide into your personal checklist.</h2>
          <p>Track documents and steps on this device. No account is needed and your progress stays in this browser.</p>
        </div>
        <button type="button" onClick={() => { setProgress({ ...empty(service), started: true }); trackEvent("process_start", { service_slug: service.slug }); }}>Start this process →</button>
      </section>
    );
  }

  function recordCompletion(next: Progress) {
    const complete = [...next.requirements, ...next.steps].every(Boolean);
    if (!complete || localStorage.getItem(completionKey)) return;
    localStorage.setItem(completionKey, "1");
    trackEvent("process_complete", { service_slug: service.slug });
  }

  function toggleRequirement(index: number) {
    setProgress((current) => {
      const next = { ...current, requirements: current.requirements.map((value, i) => i === index ? !value : value) };
      recordCompletion(next);
      return next;
    });
  }
  function toggleStep(index: number) {
    setProgress((current) => {
      const next = { ...current, steps: current.steps.map((value, i) => i === index ? !value : value) };
      recordCompletion(next);
      return next;
    });
  }

  return (
    <section className="process-tracker">
      <div className="process-tracker-head">
        <div>
          <span className="eyebrow">My Process</span>
          <h2>{done} of {total} items completed</h2>
          <p><strong>Next:</strong> {next}</p>
        </div>
        <strong className="process-percent">{percent}%</strong>
      </div>
      <div className="process-bar" aria-label={percent + "% complete"}><span style={{ width: percent + "%" }} /></div>
      <div className="process-columns">
        <div>
          <h3>Prepare first</h3>
          {requirementRows.map(({ label, index }) => (
            <label className="process-check" key={label}>
              <input type="checkbox" checked={progress.requirements[index]} onChange={() => toggleRequirement(index)} />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <div>
          <h3>Process steps</h3>
          {stepRows.map(({ label, index }) => (
            <label className="process-check" key={label}>
              <input type="checkbox" checked={progress.steps[index]} onChange={() => toggleStep(index)} />
              <span>{index + 1}. {label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="process-actions">
        <button type="button" onClick={() => window.print()}>Print checklist</button>
        <button type="button" className="quiet" onClick={() => { localStorage.removeItem(key); localStorage.removeItem(completionKey); setProgress(empty(service)); }}>Reset progress</button>
      </div>
    </section>
  );
}
