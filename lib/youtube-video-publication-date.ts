/** Validate the YouTube upload day before publishing date-dependent VideoObject metadata. */
export function hasValidVideoPublishDate(publishedAt: string): boolean {
  const day = publishedAt.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return false;
  const time = Date.parse(day + "T00:00:00Z");
  if (!Number.isFinite(time) || new Date(time).toISOString().slice(0, 10) !== day) return false;
  // API data can use either a date-only value or an ISO timestamp.
  return publishedAt.length === 10 || /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(publishedAt);
}
