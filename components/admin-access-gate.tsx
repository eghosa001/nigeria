"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminAccessGate({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSubmitting(true);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    try {
      const response = await fetch("/api/admin/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: form.get("password") }),
      });
      const body = await response.json() as { error?: string };
      if (!response.ok) {
        setMessage(body.error ?? "Access denied.");
        return;
      }
      formElement.reset();
      router.refresh();
    } catch {
      setMessage("Unable to verify admin access.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="admin-gate-shell">
      <section className="admin-gate-card" aria-labelledby="admin-access-title">
        <span className="admin-gate-mark" aria-hidden="true">M</span>
        <span className="eyebrow">Private administration</span>
        <h1 id="admin-access-title">{configured ? "Admin access required" : "Admin access unavailable"}</h1>
        <p>
          {configured
            ? "Enter the private MyNigeriaGuide admin passphrase. The dashboard, guide library, sources, visits and editing tools stay hidden until this session is unlocked."
            : "The private admin passphrase is not configured on the server. No admin content is available from this browser."}
        </p>

        {configured ? (
          <form className="admin-gate-form" onSubmit={unlock}>
            <label>
              <span>Admin passphrase</span>
              <input name="password" type="password" autoComplete="current-password" required autoFocus />
            </label>
            <button type="submit" disabled={submitting}>{submitting ? "Checking…" : "Unlock admin"}</button>
          </form>
        ) : null}

        {message ? <p className="form-message error" role="alert">{message}</p> : null}
        <Link className="text-link" href="/">← Return to public site</Link>
      </section>
    </main>
  );
}
