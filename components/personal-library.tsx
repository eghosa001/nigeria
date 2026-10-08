"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/client-analytics";

type Kind = "movie" | "travel" | "job";
type Entry = { href: string; title: string; kind: Kind; visitedAt: number };
const savedKey = "mynigeriaguide:saved-pages:v1";
const recentKey = "mynigeriaguide:recent-pages:v1";
const changed = "mynigeriaguide:personal-library-changed";

function validHref(href: unknown): href is string {
  return typeof href === "string" && /^\/(?:entertainment\/movies|explore|jobs)\/[a-z0-9][a-z0-9-]*$/.test(href);
}

function read(key: string): Entry[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(key) ?? "[]");
    if (!Array.isArray(value)) return [];
    const seen = new Set<string>();
    return value.filter((item): item is Entry => {
      if (!item || typeof item !== "object") return false;
      const record = item as Partial<Entry>;
      if (!validHref(record.href) || typeof record.title !== "string" || !record.title.trim() ||
        !["movie", "travel", "job"].includes(record.kind ?? "") || seen.has(record.href)) return false;
      seen.add(record.href);
      return true;
    }).slice(0, 24);
  } catch {
    return [];
  }
}

function write(key: string, values: Entry[]) {
  try {
    localStorage.setItem(key, JSON.stringify(values));
    window.dispatchEvent(new Event(changed));
  } catch {
    // Browsing remains functional when local storage is unavailable.
  }
}

function kindFor(path: string): Kind | null {
  if (/^\/entertainment\/movies\/[a-z0-9-]+$/.test(path)) return "movie";
  if (/^\/explore\/[a-z0-9-]+$/.test(path)) return "travel";
  if (/^\/jobs\/[a-z0-9-]+$/.test(path)) return "job";
  return null;
}

export function RecentPageTracker() {
  const pathname = usePathname();
  useEffect(() => {
    const kind = kindFor(pathname);
    if (!kind) return;
    const id = window.setTimeout(() => {
      const title = document.querySelector("main h1")?.textContent?.trim();
      if (!title) return;
      const entry: Entry = { href: pathname, title: title.slice(0, 140), kind, visitedAt: Date.now() };
      const rest = read(recentKey).filter((item) => item.href !== pathname);
      write(recentKey, [entry, ...rest].slice(0, 10));
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);
  return null;
}

export function SavePageButton({ href, title, kind }: { href: string; title: string; kind: Kind }) {
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const refresh = () => {
      setSaved(read(savedKey).some((item) => item.href === href));
      setReady(true);
    };
    refresh();
    window.addEventListener(changed, refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener(changed, refresh); window.removeEventListener("storage", refresh); };
  }, [href]);

  function toggle() {
    if (!validHref(href)) return;
    const entries = read(savedKey);
    const present = entries.some((item) => item.href === href);
    const next = present
      ? entries.filter((item) => item.href !== href)
      : [{ href, title, kind, visitedAt: Date.now() }, ...entries].slice(0, 24);
    write(savedKey, next);
    trackEvent(present ? "saved_page_remove" : "saved_page_add", { content_type: kind });
  }

  return (
    <button className="save-page-button" type="button" onClick={toggle} disabled={!ready}
      aria-pressed={saved} aria-label={(saved ? "Remove from saved: " : "Save for later: ") + title}>
      <span aria-hidden="true">{saved ? "✓" : "＋"}</span>
      {saved ? "Saved" : "Save for later"}
    </button>
  );
}

export function PersonalLibrary() {
  const [saved, setSaved] = useState<Entry[]>([]);
  const [recent, setRecent] = useState<Entry[]>([]);
  useEffect(() => {
    const refresh = () => { setSaved(read(savedKey)); setRecent(read(recentKey)); };
    refresh();
    window.addEventListener(changed, refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener(changed, refresh); window.removeEventListener("storage", refresh); };
  }, []);
  const labels: Record<Kind, string> = { movie: "Movie", travel: "Travel", job: "Career" };
  function renderEntries(entries: Entry[], canRemove: boolean) {
    return entries.map((entry) => (
      <li key={entry.href} className="personal-library-item">
        <Link href={entry.href}><small>{labels[entry.kind]}</small><strong>{entry.title}</strong></Link>
        {canRemove ? (
          <button type="button" aria-label={"Remove " + entry.title + " from saved"} onClick={() => {
            write(savedKey, read(savedKey).filter((item) => item.href !== entry.href));
            trackEvent("saved_page_remove", { content_type: entry.kind });
          }}>Remove</button>
        ) : null}
      </li>
    ));
  }
  return (
    <div className="personal-library">
      <section aria-labelledby="saved-across-pillars">
        <div className="personal-library-heading"><h2 id="saved-across-pillars">Saved movies, places & jobs</h2><p>Keep useful pages together on this device.</p></div>
        {saved.length
          ? <ul className="personal-library-list">{renderEntries(saved, true)}</ul>
          : <p className="personal-library-empty">Open a movie, destination or job guide and tap “Save for later”.</p>}
      </section>
      {recent.length ? (
        <section aria-labelledby="recently-visited">
          <div className="personal-library-heading"><h2 id="recently-visited">Recently viewed</h2>
            <button type="button" onClick={() => write(recentKey, [])}>Clear history</button>
          </div>
          <ul className="personal-library-list">{renderEntries(recent.filter((entry) => !saved.some((item) => item.href === entry.href)).slice(0, 6), false)}</ul>
        </section>
      ) : null}
    </div>
  );
}
