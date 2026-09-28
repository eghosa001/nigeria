"use client";

import { FormEvent, useState } from "react";

export function CorrectionReport({ serviceSlug }: { serviceSlug: string }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      service_slug: serviceSlug,
      report_type: form.get("report_type"),
      message: form.get("message"),
      contact_email: form.get("contact_email"),
      website: form.get("website"),
    };

    const response = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setState("error");
      setMessage(data.error ?? "Unable to submit the report.");
      return;
    }

    event.currentTarget.reset();
    setState("success");
    setMessage("Thanks. The correction has been queued for verification.");
  }

  return (
    <section className="correction-box">
      <div>
        <span className="eyebrow">Help keep this accurate</span>
        <h2>See something outdated?</h2>
        <p>Report a fee, requirement or official-link problem. Reports are reviewed before any guide changes.</p>
      </div>

      <form onSubmit={submit}>
        <label>
          What is wrong?
          <select name="report_type" defaultValue="incorrect_fee">
            <option value="incorrect_fee">Fee or price</option>
            <option value="outdated_requirement">Requirement or process</option>
            <option value="broken_link">Official link</option>
            <option value="other">Something else</option>
          </select>
        </label>

        <label>
          Details
          <textarea name="message" minLength={10} maxLength={4000} required placeholder="Tell us what changed and, if possible, where you saw the official update." />
        </label>

        <label>
          Email <small>(optional, only if we need clarification)</small>
          <input name="contact_email" type="email" maxLength={254} />
        </label>

        <label className="honeypot" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <button className="report-button" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Submitting…" : "Report an issue"}
        </button>

        {message ? <p className={"form-message " + state}>{message}</p> : null}
      </form>
    </section>
  );
}
