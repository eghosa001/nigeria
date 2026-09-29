"use client";

import { FormEvent, useState } from "react";

type Availability = "idle" | "checking" | "available" | "unavailable";

export function CorrectionReport({ serviceSlug }: { serviceSlug: string }) {
  const [availability, setAvailability] = useState<Availability>("idle");
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function checkAvailability() {
    setAvailability("checking");
    setMessage("");
    try {
      const response = await fetch("/api/reports", { cache: "no-store" });
      const data = await response.json() as { configured?: boolean };
      setAvailability(response.ok && data.configured ? "available" : "unavailable");
    } catch {
      setAvailability("unavailable");
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setMessage("");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
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
    formElement.reset();
    setState("success");
    setMessage("Thanks. The correction has been queued for verification.");
  }

  if (availability === "idle") {
    return (
      <section className="correction-box">
        <div>
          <span className="eyebrow">Help keep this accurate</span>
          <h2>See something outdated?</h2>
          <p>Correction reporting is checked only when you choose to report an issue, keeping normal guide loads lighter.</p>
          <button className="report-button" type="button" onClick={() => void checkAvailability()}>Report an issue</button>
        </div>
      </section>
    );
  }
  if (availability === "checking") {
    return <section className="correction-box correction-box-loading" aria-live="polite"><span className="eyebrow">Accuracy</span><p>Checking correction-report availability…</p></section>;
  }
  if (availability === "unavailable") {
    return (
      <section className="correction-box">
        <div>
          <span className="eyebrow">Accuracy monitoring</span>
          <h2>See something that looks outdated?</h2>
          <p>Persistent public submissions are not enabled right now, so MyNigeriaGuide will not ask you to fill a form it cannot save. Official source pages are automatically monitored and rechecked periodically.</p>
          <a className="text-link" href="#official-sources">Compare the official sources below →</a>
        </div>
      </section>
    );
  }
  return (
    <section className="correction-box">
      <div><span className="eyebrow">Help keep this accurate</span><h2>See something outdated?</h2><p>Report a fee, requirement or official-link problem. Reports are reviewed against official sources before a guide changes.</p></div>
      <form onSubmit={submit}>
        <label>What is wrong?<select name="report_type" defaultValue="incorrect_fee"><option value="incorrect_fee">Fee or price</option><option value="outdated_requirement">Requirement or process</option><option value="broken_link">Official link</option><option value="other">Something else</option></select></label>
        <label>Details<textarea name="message" minLength={10} maxLength={4000} required placeholder="Tell us what changed and, if possible, where you saw the official update." /></label>
        <label>Email <small>(optional, only if we need clarification)</small><input name="contact_email" type="email" maxLength={254} /></label>
        <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <button className="report-button" type="submit" disabled={state === "sending"}>{state === "sending" ? "Submitting…" : "Submit correction"}</button>
        {message ? <p className={"form-message " + state}>{message}</p> : null}
      </form>
    </section>
  );
}
