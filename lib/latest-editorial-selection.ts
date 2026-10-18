/**
 * A "recently checked" shelf is not a sorted alphabetical catalogue.
 * Prioritise genuinely recent source checks, diversify across issuers/regions,
 * omit future-dated or malformed evidence, and never duplicate a destination.
 *
 * There is no randomness, so server responses and crawlers see a stable order.
 */
export function selectRecentAcrossGroups<T>(
  records: readonly T[],
  options: {
    date: (item: T) => string;
    key: (item: T) => string;
    group: (item: T) => string;
    today: string;
    limit?: number;
    fill?: boolean;
  },
): T[] {
  const { date, key, group, today, limit = 8, fill = false } = options;
  const validDate = /^\d{4}-\d{2}-\d{2}$/;
  const ordered = records
    .filter((item) => validDate.test(date(item)) && date(item) <= today)
    .sort((a, b) => date(b).localeCompare(date(a)) || key(a).localeCompare(key(b)));
  const result: T[] = [];
  const usedGroups = new Set<string>();
  const usedKeys = new Set<string>();

  for (const item of ordered) {
    const identity = key(item).trim().toLowerCase();
    const groupKey = group(item).trim().replace(/\s+/g, " ").toLowerCase() || identity;
    if (!identity || usedKeys.has(identity) || usedGroups.has(groupKey)) continue;
    result.push(item);
    usedKeys.add(identity);
    usedGroups.add(groupKey);
    if (result.length >= limit) return result;
  }

  // For catalogues such as Services, the latest work can all be from a
  // small set of agencies. Add additional distinct guides only if requested.
  if (fill) for (const item of ordered) {
    const identity = key(item).trim().toLowerCase();
    if (!identity || usedKeys.has(identity)) continue;
    result.push(item);
    usedKeys.add(identity);
    if (result.length >= limit) break;
  }
  return result;
}
