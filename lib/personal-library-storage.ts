/** Shared, browser-only personal library storage contract. No React/UI dependency. */
export type Kind = "movie" | "travel" | "job";
export type Entry = { href: string; title: string; kind: Kind; visitedAt: number };
export const savedKey = "mynigeriaguide:saved-pages:v1";
export const recentKey = "mynigeriaguide:recent-pages:v1";
export const changed = "mynigeriaguide:personal-library-changed";

export function validHref(href: unknown): href is string {
  return typeof href === "string" && /^\/(?:entertainment\/movies|explore|jobs)\/[a-z0-9][a-z0-9-]*$/.test(href);
}

export function read(key: string): Entry[] {
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

export function write(key: string, values: Entry[]) {
  try {
    localStorage.setItem(key, JSON.stringify(values));
    window.dispatchEvent(new Event(changed));
  } catch {
    // Browsing remains functional when local storage is unavailable.
  }
}

export function kindFor(path: string): Kind | null {
  if (/^\/entertainment\/movies\/[a-z0-9-]+$/.test(path)) return "movie";
  if (/^\/explore\/[a-z0-9-]+$/.test(path)) return "travel";
  if (/^\/jobs\/[a-z0-9-]+$/.test(path)) return "job";
  return null;
}

