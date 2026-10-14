import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const get = (file) => readFileSync(new URL("../" + file, import.meta.url), "utf8");
const services = JSON.parse(get("data/services.json"));
const service = (slug) => {
  const record = services.find((item) => item.slug === slug);
  assert.ok(record, "Missing service " + slug);
  return record;
};
const recordFrom = (text, slug) => {
  const index = text.indexOf('slug: "' + slug + '"');
  assert.ok(index >= 0, "Missing record " + slug);
  return text.slice(index, index + 2900);
};

test("Nine individually edited Services preserve the actions users need", () => {
  assert.match(service("jamb-profile-code").summary, /NIN 00123456789/);
  assert.match(service("jamb-profile-code").summary, /55019 or 66019/);
  assert.match(service("jamb-retrieve-lost-epin").summary, /UTMEPIN/);
  assert.match(service("waec-collect-certificate").summary, /schools.*Private candidates/i);
  assert.match(service("nysc-lost-exemption-certificate").summary, /Letter of Confirmation/);
  assert.match(service("nysc-lost-exemption-certificate").steps.join(" "), /through your institution/);
  assert.match(service("renew-drivers-licence").summary, /existing licence number/);
  assert.match(service("passport-renewal").summary, /₦100,000.*₦200,000/);
  assert.equal(service("nin-date-of-birth-modification").status, "conflict");
  assert.equal(service("nin-date-of-birth-modification").notes.length, 3);
  assert.match(service("jamb-2026-utme-registration").notes.join(" "), /not proof.*remain open/i);
  assert.match(service("neco-check-result").notes.join(" "), /examination year.*token/i);
});

test("What Love Is and Love On Credit carry publisher and credit evidence, not fictional roles", () => {
  const curated = get("lib/entertainment.ts");
  assert.match(recordFrom(curated, "what-love-is"), /Maurice Sam TV.*original What Love Is/);
  assert.match(recordFrom(curated, "what-love-is"), /publisher: "Maurice Sam TV"/);
  const growth = get("lib/entertainment-growth-wave-12.ts");
  assert.match(recordFrom(growth, "love-on-credit-2026"), /character-by-character plot description/);
  const editorial = get("lib/movie-editorial-profiles-individual-2026-10-14.ts");
  assert.match(editorial, /"love-on-credit-2026": \{/);
  assert.match(editorial, /roles: \[\]/);
  assert.match(editorial, /Uchenna Felix Agu/);
  assert.match(editorial, /Daniel Godwin Egwuatumba/);
  assert.match(get("lib/movie-editorial-profile-registry.ts"), /individualMovieEditorialOctober20261014/);
});

test("Obudu guide separates rehabilitation plans from operational claims", () => {
  const obudu = recordFrom(get("lib/explore.ts"), "obudu-mountain-resort");
  assert.match(obudu, /Obanliku highlands/);
  assert.match(obudu, /rehabilitation, not the reopening/);
  assert.match(obudu, /Bebi Airstrip and Utanga Safari Lodge/);
  const rail = get("lib/explore-rail-travel-2026-10-12.ts");
  assert.match(rail, /Fridays–Saturdays/);
  assert.match(rail, /08:00, 10:50 and 16:30/);
});

test("Two EHA jobs publish specific official advert details without assuming universal salaries", () => {
  const content = get("lib/jobs.ts");
  const dental = recordFrom(content, "eha-dental-assistant-lagos-2026");
  const pharmacy = recordFrom(content, "eha-pharmacist-abuja-2026");
  assert.match(dental, /₦151,550/);
  assert.match(dental, /jobs directory/i);
  assert.match(pharmacy, /₦181,440/);
  assert.match(pharmacy, /at least two years of post-NYSC/i);
  assert.match(pharmacy, /current PCN practice licence/i);
});
