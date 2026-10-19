/**
 * Search-result copy is about the page's own answer, not a second branded
 * suffix. Keep whole words where practical. Search engines may still rewrite
 * snippets; this is a display-quality guard, not a ranking guarantee.
 */
export function compactSearchText(value: string, max = 155): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  if (max < 8) return normalized.slice(0, max);
  const candidate = normalized.slice(0, max - 1);
  const boundary = candidate.lastIndexOf(" ");
  const shortened = boundary >= Math.floor(max * 0.65)
    ? candidate.slice(0, boundary)
    : candidate;
  return shortened.replace(/[\s,:;–—-]+$/u, "") + "…";
}
