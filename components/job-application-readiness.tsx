"use client";

import { useState } from "react";

const checks = [
  "I located this exact current vacancy on the employer's official website.",
  "I checked my qualifications against the original employer requirements.",
  "I checked which supporting documents the employer actually asks for.",
  "I reviewed the employer's application instructions and deadline, if published.",
] as const;

/** A private, local readiness prompt; never an eligibility or vacancy guarantee. */
export function JobApplicationReadiness() {
  const [done, setDone] = useState<boolean[]>(() => checks.map(() => false));
  const count = done.filter(Boolean).length;
  return (
    <section id="application-readiness" className="job-readiness" aria-labelledby="job-readiness-title">
      <span className="eyebrow">Application preparation</span>
      <h2 id="job-readiness-title">Check before applying</h2>
      <p>Use this personal checklist alongside the official employer advert. Your selections stay on this page and are not sent to MyNigeriaGuide.</p>
      <div className="job-readiness-list">
        {checks.map((label, index) => (
          <label key={label} className="job-readiness-check">
            <input type="checkbox" checked={done[index]} onChange={(event) => setDone(current => current.map((value, i) => i === index ? event.target.checked : value))} />
            <span>{label}</span>
          </label>
        ))}
      </div>
      <div className="job-readiness-footer" aria-live="polite">
        <strong>{count} of {checks.length} checks completed</strong>
        <span>{count === checks.length ? "Preparation checklist completed. The employer alone decides eligibility and whether applications are still open." : "Confirm all remaining items on the official employer page before proceeding."}</span>
      </div>
      <div className="job-readiness-actions">
        <a href="#official-application">Go to official application source ↑</a>
        <a href="#job-sources">Review evidence sources ↓</a>
        <button type="button" onClick={() => setDone(checks.map(() => false))}>Reset checklist</button>
      </div>
    </section>
  );
}
