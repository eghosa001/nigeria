import { mkdir, writeFile } from "node:fs/promises";
// One-shot, polite Google Autocomplete research for MyNigeriaGuide's existing four pillars.
// This collects real suggestions; it does not assign search volumes or publish pages.
const seeds = {
  services: [
    "how to register business name in nigeria", "cac registration", "how to renew nigerian passport",
    "how to check nin", "jamb caps admission", "how to check waec result",
    "nysc registration", "nigerian police clearance certificate", "how to correct bvn",
    "how to replace lost pvc", "how to get ecowas travel certificate",
    // October 2026 primary-source discovery: NRS Tax ID and NIS services.
    "nigeria tax id retrieval nin cac", "nigerian passport tracking status",
    "nigeria landing exit card online", "nigerian police character certificate diaspora",
  ],
  tour: [
    "places to visit in nigeria", "things to do in lagos", "things to do in abuja",
    "places to visit in benin city", "tourist attractions in calabar",
    "olumo rock", "obudu mountain resort", "waterfalls in nigeria",
    "best beaches in nigeria", "national parks in nigeria",
    // Organiser-published October/December Lagos event searches, not volume estimates.
    "detty december fest lagos tickets", "wizkid detty december 2026",
    "design week lagos october 2026",
  ],
  jobs: [
    "how to write cv in nigeria", "how to write a cover letter for a job",
    "job interview questions and answers in nigeria", "graduate jobs in nigeria",
    "remote jobs in nigeria", "jobs for nysc corps members", "internships in nigeria",
    "how to apply for federal government jobs", "how to find legitimate jobs in nigeria",
    "nysc ppa opportunities nigeria", "graduate trainee nigeria applications 2026",
    "official civil service recruitment nigeria",
  ],
  entertainment: [
    "best nollywood movies of all time", "classic nollywood movies",
    "nigerian movies on netflix", "old nollywood movies", "best nigerian comedy movies",
    "family nollywood movies", "yoruba movies to watch", "best nigerian movies on youtube",
    "nigerian movie actors", "award winning nigerian movies",
    "october 2026 nollywood cinema movies", "nollywood movie cast 2026",
    "where to watch new nigerian movies legally",
  ],
};
// Additional topical probes are research inputs, NOT verified keyword findings.
// Only suggestions actually returned by localized Google Suggest are written to
// the results. The topic seeds are tied to existing MyNigeriaGuide pillars and
// editorially verifiable subject areas rather than artificial location permutations.
const expansionSeeds = {
  "services": [
    "nin slip printing nigeria",
    "nimc date of birth correction",
    "nin name correction requirements",
    "jamb profile code retrieval",
    "jamb caps admission acceptance",
    "jamb change of institution",
    "jamb admission letter printing",
    "jamb regularization nigeria",
    "waec certificate collection",
    "waec result checker pin",
    "waec verification certificate",
    "neco result checker",
    "neco external examination registration",
    "nysc call up letter printing",
    "nysc relocation requirements",
    "nysc online registration foreign graduates",
    "nelfund loan application status",
    "nelfund student loan requirements",
    "cac business name registration price",
    "cac certificate download",
    "cac annual returns filing",
    "cac status report nigeria",
    "nigerian passport renewal fee",
    "nigerian passport renewal appointment",
    "nigerian passport application tracking",
    "police character certificate nigeria",
    "nigeria tax identification number retrieval",
    "nigerian police clearance for diaspora",
    "frsc driver's licence renewal",
    "bvn data correction nigeria",
    "lost sim replacement nigeria",
    "air peace online check in",
    "western union transfer tracking nigeria",
    "access bank account opening nigeria",
    "aedc map refund status",
    "ibedc map meter refund",
    "electricity meter application nigeria",
    "spotify premium nigeria plans",
    "jamb matriculation list verification",
    "nigeria international passport name correction",
    "how to check visa application status nigeria",
    "nigerian birth certificate reissuance",
    "how to claim unclaimed dividends nigeria",
    "how to check pvc status nigeria",
    "how to file fct tax returns"
  ],
  "tour": [
    "tourist attractions in ibadan",
    "tourist attractions in benin city",
    "things to do in port harcourt",
    "places to visit in kano",
    "places to visit in enugu",
    "places to visit in ondo state",
    "places to visit in ogun state",
    "places to visit in osun state",
    "places to visit in niger state",
    "places to visit in abia state",
    "places to visit in kwara state",
    "places to visit in calabar",
    "family fun places in lagos",
    "free places to visit in lagos",
    "romantic places to visit in abuja",
    "weekend getaway from lagos",
    "weekend getaway from abuja",
    "tourism in edo state",
    "tourism in akure",
    "tourism in kaduna",
    "benin city heritage attractions",
    "owu waterfalls directions",
    "erin ijesha waterfalls entrance fee",
    "gashaka gumti national park",
    "yankari game reserve prices",
    "kainji lake national park visitor guide",
    "kainji dam location",
    "obudu mountain resort access",
    "olumo rock opening hours",
    "badagry slave route tour",
    "osun osogbo sacred grove visit",
    "national museums in nigeria",
    "lagos to ibadan train ticket",
    "abuja to kaduna train booking",
    "road trip lagos to abeokuta",
    "road trip benin city to abuja",
    "cheap hotels in benin city",
    "lagos cultural festivals 2026",
    "calabar carnival 2026 dates",
    "felabration 2026 venue",
    "lagos fashion week 2026 tickets",
    "things to do in lekki with kids",
    "best places for a date in lagos",
    "restaurants in benin city nigeria",
    "abakaliki tourist attractions"
  ],
  "jobs": [
    "federal government recruitment portal nigeria",
    "graduate trainee programmes nigeria",
    "graduate internship nigeria",
    "siwes placement nigeria",
    "nysc ppa companies in abuja",
    "nysc ppa companies in lagos",
    "nysc ppa opportunities benin city",
    "remote jobs nigeria without experience",
    "online jobs for students in nigeria",
    "international remote jobs nigeria",
    "entry level software developer nigeria",
    "junior data analyst jobs nigeria",
    "customer support remote jobs nigeria",
    "video data annotation remote jobs",
    "ai safety evaluator jobs nigeria",
    "game developer jobs nigeria",
    "junior ui ux designer remote nigeria",
    "chess coach jobs online nigeria",
    "graduate mechanical engineering jobs nigeria",
    "graduate dental jobs nigeria",
    "medical internship jobs nigeria",
    "bank graduate trainee 2026 nigeria",
    "telecom graduate trainee nigeria",
    "civil service recruitment nigeria 2026",
    "teaching jobs in nigeria",
    "hospital admin jobs in abuja",
    "recruitment deadlines nigeria",
    "jobs closing this week nigeria",
    "job application cover letter nigeria",
    "cv format for fresh graduates nigeria",
    "how to write nysc cv",
    "nigerian job interview salary questions",
    "how to verify recruitment announcement nigeria",
    "company career portal nigeria",
    "internship opportunities in abuja",
    "part time jobs in benin city",
    "hospitality jobs in lagos",
    "work from home jobs nigeria 2026",
    "remote ai trainer jobs nigeria",
    "data annotation jobs work from home",
    "scholarship internships nigeria",
    "graduate recruitment application status",
    "teaching assistant jobs nigeria",
    "federal ministry jobs nigeria",
    "state government jobs nigeria"
  ],
  "entertainment": [
    "oversabi aunty cast",
    "oversabi aunty where to watch",
    "forever isn't long enough movie cast",
    "forever is not long enough royal arts tv",
    "once upon a village nigerian series cast",
    "once upon a village 3 cast",
    "millionaire until morning cast",
    "bowale movie cast",
    "black market nigerian movie 2026",
    "east west love nigerian movie",
    "onibon oje movie",
    "new nollywood movies october 2026",
    "new yoruba movies 2026",
    "latest nollywood films on youtube",
    "nollywood movies on royal arts tv",
    "ruth kadiri latest movie cast",
    "frederick leonard tv latest movie",
    "uchenna mbunabo tv movies",
    "nigerian movies with english subtitles",
    "family drama nollywood movies",
    "comedy nollywood movies youtube",
    "nigerian romantic comedy movies",
    "faith based nigerian movies",
    "nigerian thriller movies 2026",
    "nigerian cinema releases october 2026",
    "new nollywood movies on netflix nigeria",
    "where to watch nollywood movies legally",
    "nigerian movies on prime video nigeria",
    "movie cast and roles nigeria",
    "nigerian movie directors filmography",
    "popular yoruba movie actresses",
    "nigerian youtube movie publishers",
    "nigerian movie release dates 2026",
    "lagos cinema showtimes",
    "nollywood movies based on true stories",
    "nollywood series episodes youtube",
    "best nigerian family movies",
    "kannywood movie cast",
    "nigerian film trailers youtube",
    "netflix nollywood dramas",
    "nigerian comedy actors",
    "nollywood movie streaming rights",
    "nigerian independent films",
    "new cinema films nigeria 2026",
    "nigerian movie actor profiles"
  ]
};
for (const [pillar, phrases] of Object.entries(expansionSeeds)) {
  const prior = new Set(seeds[pillar].map((phrase) => phrase.toLowerCase()));
  for (const phrase of phrases) if (!prior.has(phrase.toLowerCase())) {
    seeds[pillar].push(phrase);
    prior.add(phrase.toLowerCase());
  }
}
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
await mkdir("artifacts", { recursive: true });
await writeFile("artifacts/google-autocomplete-ng.json", JSON.stringify({
  researchedAt: new Date().toISOString(), locale: "en-NG",
  source: "Google Search Suggest — unofficial non-volume API",
  endpoint: "https://suggestqueries.google.com/complete/search",
  requests: probes.length, successful: results.length, failed: failures.length,
  rows: results, failures,
}, null, 2) + "\n");
console.log("GOOGLE_SUGGEST_SUMMARY " + JSON.stringify({
  researchedAt: new Date().toISOString(), locale: "en-NG", source: "Google Autocomplete unofficial endpoint",
  requests: probes.length, successful: results.length, failed: failures.length,
  unique: Object.fromEntries(Object.entries(byPillar).map(([pillar, words]) => [pillar, words.length])),
}));
if (results.length < Math.round(probes.length / 2)) {
  console.error("Google Suggest unavailable or blocked: not enough real predictions; do not claim sampled autocomplete.");
  process.exitCode = 1;
}
