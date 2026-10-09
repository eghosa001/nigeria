// One-shot, polite Google Autocomplete research for MyNigeriaGuide's existing four pillars.
// This collects real suggestions; it does not assign search volumes or publish pages.
const seeds = {
  services: [
    "how to register business name in nigeria", "cac registration", "how to renew nigerian passport",
    "how to check nin", "jamb caps admission", "how to check waec result",
    "nysc registration", "nigerian police clearance certificate", "how to correct bvn",
    "how to replace lost pvc", "how to get ecowas travel certificate",
  ],
  tour: [
    "places to visit in nigeria", "things to do in lagos", "things to do in abuja",
    "places to visit in benin city", "tourist attractions in calabar",
    "olumo rock", "obudu mountain resort", "waterfalls in nigeria",
    "best beaches in nigeria", "national parks in nigeria",
  ],
  jobs: [
    "how to write cv in nigeria", "how to write a cover letter for a job",
    "job interview questions and answers in nigeria", "graduate jobs in nigeria",
    "remote jobs in nigeria", "jobs for nysc corps members", "internships in nigeria",
    "how to apply for federal government jobs", "how to find legitimate jobs in nigeria",
  ],
  entertainment: [
    "best nollywood movies of all time", "classic nollywood movies",
    "nigerian movies on netflix", "old nollywood movies", "best nigerian comedy movies",
    "family nollywood movies", "yoruba movies to watch", "best nigerian movies on youtube",
    "nigerian movie actors", "award winning nigerian movies",
  ],
};
const probes = Object.entries(seeds).flatMap(([pillar, list]) =>
  list.map(seed => ({ pillar, seed, q: seed })));
for (const [pillar, seed] of [
  ["services", "cac registration"], ["services", "nysc registration"],
  ["services", "how to renew nigerian passport"], ["services", "how to check waec result"],
  ["tour", "places to visit in nigeria"], ["tour", "things to do in lagos"],
  ["tour", "national parks in nigeria"], ["jobs", "how to write cv in nigeria"],
  ["jobs", "remote jobs in nigeria"], ["jobs", "graduate jobs in nigeria"],
  ["entertainment", "best nollywood movies"], ["entertainment", "nigerian movies on netflix"],
]) for (const suffix of ["for", "without", "requirements"]) {
  probes.push({ pillar, seed, q: seed + " " + suffix });
}
const results = [];
const failures = [];
for (const [i, item] of probes.entries()) {
  const endpoint = new URL("https://suggestqueries.google.com/complete/search");
  endpoint.search = new URLSearchParams({
    client: "firefox", hl: "en", gl: "ng", q: item.q,
  }).toString();
  try {
    const response = await fetch(endpoint, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; EditorialKeywordResearch/1.0)" },
      signal: AbortSignal.timeout(7000),
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const json = await response.json();
    if (!Array.isArray(json) || !Array.isArray(json[1])) throw new Error("Unexpected response structure");
    const suggestions = [...new Set(json[1].filter(value => typeof value === "string").map(value => value.trim()).filter(Boolean))];
    results.push({ pillar: item.pillar, seed: item.seed, query: item.q, suggestions });
    console.log("SUGGEST " + item.pillar + " \"" + item.q + "\": " + JSON.stringify(suggestions));
  } catch (error) {
    failures.push({ query: item.q, message: String(error) });
    console.warn("FAILED " + item.q + ": " + String(error));
  }
  if (i < probes.length - 1) await new Promise(resolve => setTimeout(resolve, 220));
}
const byPillar = Object.fromEntries(Object.keys(seeds).map(pillar => [
  pillar, [...new Set(results.filter(row => row.pillar === pillar).flatMap(row => row.suggestions))]
]));
console.log("GOOGLE_SUGGEST_SUMMARY " + JSON.stringify({
  researchedAt: new Date().toISOString(), locale: "en-NG", source: "Google Autocomplete unofficial endpoint",
  requests: probes.length, successful: results.length, failed: failures.length,
  unique: Object.fromEntries(Object.entries(byPillar).map(([pillar, words]) => [pillar, words.length])),
}));
if (results.length < Math.round(probes.length / 2)) {
  console.error("Google Suggest unavailable or blocked: not enough real predictions; do not claim sampled autocomplete.");
  process.exitCode = 1;
}
