import type { Service } from "@/lib/types";

const stopWords = new Set([
  "a","an","and","are","can","do","for","how","i","in","is","it","me","my","of","on","please","the","to","what","where","with",
]);

const aliases: Record<string, string[]> = {
  expired: ["renew", "renewal"],
  renew: ["renewal", "expired"],
  renewal: ["renew", "expired"],
  replace: ["replacement", "lost", "reissue"],
  replacement: ["replace", "lost", "reissue"],
  lost: ["replace", "replacement", "reissue"],
  change: ["modify", "modification", "correction", "correct"],
  modify: ["change", "modification", "correction"],
  correction: ["change", "modify", "modification", "correct"],
  register: ["registration", "enrol", "enrollment", "enrolment"],
  registration: ["register", "enrol", "enrollment", "enrolment"],
  enrol: ["enrolment", "enrollment", "register", "registration"],
  check: ["verify", "verification", "status", "result"],
  verify: ["check", "verification", "status"],
  business: ["cac", "company"],
  company: ["cac", "business"],
  passport: ["immigration", "nis"],
  nin: ["nimc", "identity"],
  licence: ["license", "frsc", "driving"],
  license: ["licence", "frsc", "driving"],
  jamb: ["utme", "admission", "caps"],
  waec: ["wassce", "result", "certificate"],
  neco: ["result", "certificate"],
  nysc: ["youth", "service", "mobilisation", "mobilization"],
  birth: ["npc", "certificate", "attestation"],
  tax: ["nrs", "taxpayer"],
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9₦]+/g, " ")
    .trim();
}

function queryTokens(query: string) {
  const base = normalize(query).split(/\s+/).filter(Boolean).filter((token) => !stopWords.has(token));
  const expanded = new Set(base);
  for (const token of base) {
    for (const alias of aliases[token] ?? []) expanded.add(alias);
  }
  return [...expanded];
}

function countMatches(text: string, tokens: string[]) {
  const normalized = normalize(text);
  return tokens.reduce((score, token) => score + (normalized.includes(token) ? 1 : 0), 0);
}

export function scoreService(service: Service, query: string) {
  const normalizedQuery = normalize(query);
  const tokens = queryTokens(query);
  if (!normalizedQuery || !tokens.length) return 0;

  let score = 0;
  const title = normalize(service.title);
  const shortTitle = normalize(service.shortTitle);
  const terms = normalize(service.searchTerms.join(" "));
  const summary = normalize(service.summary);
  const category = normalize(service.category);
  const requirements = normalize(service.requirements.join(" "));
  const steps = normalize(service.steps.join(" "));

  if (title.includes(normalizedQuery) || shortTitle.includes(normalizedQuery)) score += 40;
  score += countMatches(title, tokens) * 9;
  score += countMatches(shortTitle, tokens) * 10;
  score += countMatches(terms, tokens) * 7;
  score += countMatches(category, tokens) * 5;
  score += countMatches(summary, tokens) * 3;
  score += countMatches(requirements, tokens) * 2;
  score += countMatches(steps, tokens);

  const originalTokens = normalize(query).split(/\s+/).filter((token) => token && !stopWords.has(token));
  const coverage = originalTokens.filter((token) =>
    [title, shortTitle, terms, summary, category, requirements, steps].some((field) => field.includes(token)),
  ).length;

  if (originalTokens.length && coverage === originalTokens.length) score += 15;
  if (service.status === "verified") score += 1;

  return score;
}

export function searchServices(services: Service[], query: string, limit = 8) {
  const clean = query.trim();
  if (!clean) return services.slice(0, limit).map((service) => ({ service, score: 0 }));

  return services
    .map((service) => ({ service, score: scoreService(service, clean) }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.service.shortTitle.localeCompare(b.service.shortTitle))
    .slice(0, limit);
}
