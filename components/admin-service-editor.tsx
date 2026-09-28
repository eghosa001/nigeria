"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Service, Source } from "@/lib/types";

type AccessState = "loading" | "locked" | "ready" | "setup";
type Proposal = { pullRequestUrl: string; pullRequestNumber: number; branch: string };

function lines(value: string[]) {
  return value.join("\n");
}
function fromLines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

export function AdminServiceEditor({ service }: { service: Service }) {
  const [access, setAccess] = useState<AccessState>("loading");
  const [draft, setDraft] = useState<Service>(() => structuredClone(service));
  const [message, setMessage] = useState("");
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function refreshAccess() {
    const response = await fetch("/api/admin/content-access", { cache: "no-store" });
    const body = await response.json() as { configured?: boolean; authenticated?: boolean };
    setAccess(!body.configured ? "setup" : body.authenticated ? "ready" : "locked");
  }

  useEffect(() => { void refreshAccess(); }, []);

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const response = await fetch("/api/admin/content-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: data.get("password") }),
    });
    const body = await response.json() as { error?: string };
    if (!response.ok) {
      setMessage(body.error ?? "Unable to unlock editing.");
      return;
    }
    form.reset();
    setAccess("ready");
  }

  async function lock() {
    await fetch("/api/admin/content-access", { method: "DELETE" });
    setProposal(null);
    setAccess("locked");
  }

  function update<K extends keyof Service>(field: K, value: Service[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
    setProposal(null);
  }

  function updateSource(index: number, field: keyof Source, value: string) {
    const next = draft.sources.map((source, sourceIndex) => {
      if (sourceIndex !== index) return source;
      const changed = { ...source, [field]: value };
      if (field === "published" && !value) delete changed.published;
      return changed;
    });
    update("sources", next);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setProposal(null);
    try {
      const response = await fetch("/api/admin/services/" + encodeURIComponent(service.slug) + "/proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service: draft }),
      });
      const body = await response.json() as Proposal & { error?: string };
      if (!response.ok) {
        setMessage(body.error ?? "Unable to create review change.");
        return;
      }
      setProposal(body);
    } catch {
      setMessage("Unable to create review change.");
    } finally {
      setSubmitting(false);
    }
  }

  if (access === "loading") {
    return <section className="admin-panel admin-editor-state"><strong>Checking editing access…</strong></section>;
  }

  if (access === "setup") {
    return (
      <section className="admin-panel admin-editor-state">
        <span className="eyebrow">Editing</span>
        <h2>Admin editing needs server configuration</h2>
        <p>Configure the private admin passphrase and the server-only GitHub review token before browser editing can be unlocked.</p>
      </section>
    );
  }

  if (access === "locked") {
    return (
      <section className="admin-panel admin-editor-state">
        <span className="eyebrow">Editing</span>
        <h2>Unlock guide editing</h2>
        <p>Use the private admin passphrase. Editing access expires after 12 hours.</p>
        <form className="admin-editor-unlock" onSubmit={unlock}>
          <label><span>Admin passphrase</span><input name="password" type="password" autoComplete="current-password" required /></label>
          <button type="submit">Unlock editing</button>
        </form>
        {message ? <p className="form-message error" role="alert">{message}</p> : null}
      </section>
    );
  }

  return (
    <section className="admin-panel admin-service-editor">
      <div className="admin-editor-heading">
        <div><span className="eyebrow">Protected editing</span><h2>Edit guide</h2><p>Changes create a GitHub review proposal. They do not publish directly.</p></div>
        <button type="button" className="admin-editor-secondary" onClick={lock}>Lock editing</button>
      </div>

      <form onSubmit={submit}>
        <fieldset>
          <legend>Core information</legend>
          <div className="admin-editor-grid">
            <label><span>Guide slug</span><input value={draft.slug} readOnly /></label>
            <label><span>Title</span><input value={draft.title} onChange={(e) => update("title", e.target.value)} required /></label>
            <label><span>Short title</span><input value={draft.shortTitle} onChange={(e) => update("shortTitle", e.target.value)} required /></label>
            <label className="admin-editor-wide"><span>Guide summary</span><textarea value={draft.summary} onChange={(e) => update("summary", e.target.value)} required /></label>
            <label><span>Category</span><input value={draft.category} onChange={(e) => update("category", e.target.value)} required /></label>
            <label><span>Agency slug</span><input value={draft.agencySlug} onChange={(e) => update("agencySlug", e.target.value)} required /></label>
            <label><span>Fee / status label</span><input value={draft.feeLabel} onChange={(e) => update("feeLabel", e.target.value)} required /></label>
            <label><span>Verification status</span><select value={draft.status} onChange={(e) => update("status", e.target.value as Service["status"])}><option value="verified">Verified</option><option value="conflict">Conflict</option><option value="review">Review</option></select></label>
            <label><span>Last verified</span><input value={draft.lastVerified} onChange={(e) => update("lastVerified", e.target.value)} required /></label>
            <label className="admin-editor-wide"><span>Official service portal</span><input type="url" value={draft.officialPortal ?? ""} onChange={(e) => update("officialPortal", e.target.value || undefined)} /></label>
            <label className="admin-editor-wide"><span>Fee note</span><textarea value={draft.feeNote ?? ""} onChange={(e) => update("feeNote", e.target.value || undefined)} /></label>
            <label className="admin-editor-wide"><span>Timeline</span><textarea value={draft.timeline ?? ""} onChange={(e) => update("timeline", e.target.value || undefined)} /></label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Requirements and process</legend>
          <div className="admin-editor-grid">
            <label className="admin-editor-wide"><span>Requirements — one per line</span><textarea value={lines(draft.requirements)} onChange={(e) => update("requirements", fromLines(e.target.value))} required /></label>
            <label className="admin-editor-wide"><span>Steps — one per line</span><textarea value={lines(draft.steps)} onChange={(e) => update("steps", fromLines(e.target.value))} required /></label>
            <label className="admin-editor-wide"><span>Important notes — one per line</span><textarea value={lines(draft.notes)} onChange={(e) => update("notes", fromLines(e.target.value))} required /></label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Sources</legend>
          <div className="admin-source-editor-list">
            {draft.sources.map((source, index) => (
              <div className="admin-source-editor" key={index}>
                <label><span>Source label</span><input value={source.label} onChange={(e) => updateSource(index, "label", e.target.value)} required /></label>
                <label><span>Agency</span><input value={source.agency} onChange={(e) => updateSource(index, "agency", e.target.value)} required /></label>
                <label className="admin-editor-wide"><span>Source URL</span><input type="url" value={source.url} onChange={(e) => updateSource(index, "url", e.target.value)} required /></label>
                <label><span>Last checked</span><input value={source.lastChecked} onChange={(e) => updateSource(index, "lastChecked", e.target.value)} required /></label>
                <label><span>Published</span><input value={source.published ?? ""} onChange={(e) => updateSource(index, "published", e.target.value)} /></label>
                {draft.sources.length > 1 ? <button type="button" className="admin-editor-secondary" onClick={() => update("sources", draft.sources.filter((_, i) => i !== index))}>Remove source</button> : null}
              </div>
            ))}
          </div>
          <button type="button" className="admin-editor-secondary" onClick={() => update("sources", [...draft.sources, { label: "", agency: "", url: "https://", lastChecked: draft.lastVerified }])}>Add source</button>
        </fieldset>

        <fieldset>
          <legend>Search and relationships</legend>
          <div className="admin-editor-grid">
            <label className="admin-editor-wide"><span>Search terms — one per line</span><textarea value={lines(draft.searchTerms)} onChange={(e) => update("searchTerms", fromLines(e.target.value))} required /></label>
            <label className="admin-editor-wide"><span>Related guide slugs — one per line</span><textarea value={lines(draft.related)} onChange={(e) => update("related", fromLines(e.target.value))} /></label>
          </div>
        </fieldset>

        <div className="admin-editor-actions">
          <button type="submit" disabled={submitting}>{submitting ? "Creating review change…" : "Create review change"}</button>
          <button type="button" className="admin-editor-secondary" onClick={() => { setDraft(structuredClone(service)); setMessage(""); setProposal(null); }}>Reset changes</button>
        </div>
        {message ? <p className="form-message error" role="alert">{message}</p> : null}
        {proposal ? (
          <div className="admin-editor-success" role="status">
            <strong>Review change created</strong>
            <p>Production has not changed yet. Review the pull request and merge it only after the checks are green.</p>
            <a href={proposal.pullRequestUrl} target="_blank" rel="noreferrer">Open pull request #{proposal.pullRequestNumber} ↗</a>
          </div>
        ) : null}
      </form>
    </section>
  );
}
