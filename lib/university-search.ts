import type { Service } from "@/lib/types";

/** Search only existing reviewed university records; don't fabricate institutions. */
export type UniversitySearchProfile = {
  readonly slug: string; readonly name: string; readonly abbreviation: string;
  readonly city: string; readonly state: string;
  readonly academicSession: string; readonly focus: string;
};

function normal(text: string) {
  return text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function queryUniversityDirectory<T extends UniversitySearchProfile>(
  profiles: readonly T[],
  bySlug: ReadonlyMap<string, Pick<Service,"slug"|"title"|"shortTitle"|"summary"|"searchTerms">>,
  query: string,
): T[] {
  const words = normal(query.slice(0,90)).split(" ").filter(Boolean).slice(0,12);
  return profiles.filter(profile => {
    const record = bySlug.get(profile.slug);
    if (!record) return false;
    if (words.length === 0) return true;
    const text = normal([
      profile.name,profile.abbreviation,profile.city,profile.state,profile.academicSession,profile.focus,
      record.title,record.shortTitle,record.summary,...record.searchTerms,
    ].join(" "));
    return words.every(word => text.includes(word));
  });
}

export function universitySearchSuggestions(profiles: readonly UniversitySearchProfile[]) {
  const suggestions = new Set<string>();
  for (const p of profiles) {
    suggestions.add(p.name); suggestions.add(p.abbreviation); suggestions.add(p.city); suggestions.add(p.state);
  }
  return [...suggestions].filter(Boolean).sort((a,b) => a.localeCompare(b)).slice(0,240);
}
