import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { auditEditorialVoice } from "../lib/editorial-voice-audit";
import { movieEditorialProfiles } from "../lib/movie-editorial-profiles";
import { kainjiDamGuide } from "../lib/explore-kainji-dam-2026-10-10";
import { founderDojoImoCohortTwo } from "../lib/job-founder-dojo-imo-2026-10-11";

const source = (file: string) => readFileSync(new URL("../" + file, import.meta.url), "utf8");

test("Humanizer reports stylistic review signals, never diagnoses AI authorship", () => {
  const findings = auditEditorialVoice("In this article we will delve into a vibrant tapestry of wonderful places. These are not just attractions but also learning sites.");
  assert.ok(findings.some(x => x.id === "staged-opening"));
  assert.ok(findings.some(x => x.id === "stock-inflation"));
  assert.ok(findings.some(x => x.id === "empty-contrast"));
  assert.deepEqual(auditEditorialVoice("The application closes on 2 November 2026. Apply through the official portal."), []);
  assert.deepEqual(auditEditorialVoice(""), []);
  assert.doesNotMatch(source("scripts/audit-editorial-voice.ts"), /writeFile|update_file|fetch\(/);
});

test("film copy sounds human while preserving original credited roles and release", () => {
  const sibe = movieEditorialProfiles.sibe;
  assert.equal(sibe.releaseDate, "2026-07-25");
  assert.deepEqual(sibe.roles, [
    { actor: "Bimbo Ademoye", character: "Sibe" },
    { actor: "Uche Montana", character: "Natasha" },
    { actor: "Afeez Oyetoro", character: "The Oracle" },
  ]);
  assert.match(sibe.sections[0].paragraphs[0], /Bimbo Ademoye's Sibe/);
  assert.match(sibe.sections[0].paragraphs[1], /Natasha, played by Uche Montana/);
  assert.ok(sibe.questions.some(item => /25 July 2026/.test(item.answer)));
});

test("visitor guide retains site location, 1968 commissioning and capacity/access restriction", () => {
  assert.equal(kainjiDamGuide.slug, "kainji-dam-guide");
  assert.equal(kainjiDamGuide.kind, "destination");
  assert.equal(kainjiDamGuide.region, "Niger State");
  assert.match(kainjiDamGuide.summary, /Borgu LGA/);
  assert.match(kainjiDamGuide.summary, /1968/);
  assert.match(kainjiDamGuide.summary, /760 MW/);
  assert.match(kainjiDamGuide.summary, /permission/);
  assert.ok(kainjiDamGuide.source || kainjiDamGuide.sources?.length);
});

test("Founder Dojo retains deadlines, free training classification and primary link", () => {
  const item = founderDojoImoCohortTwo[0];
  assert.equal(item.kind, "programme");
  assert.equal(item.deadline, "2026-11-02");
  assert.match(item.summary, /19 October 2026/);
  assert.match(item.summary, /2 November 2026/);
  assert.match(item.summary, /free founder training/);
  assert.match(item.employmentType, /not employment/);
  assert.equal(item.officialUrl, "https://www.imodigitalcity.com/founder-dojo/cohort-2");
  assert.equal(item.verifiedAt, "2026-10-11");
});

test("service edit retains e-Facility payment, biometric and indemnity review steps", () => {
  const text = source("lib/service-candidate-editorial-2026-10-17.ts");
  assert.match(text, /To correct the gender on a JAMB record, start with Correction of Data in e-Facility/);
  assert.match(text, /biometric checks or institution-endorsed indemnity/);
  assert.match(text, /a payment receipt is not JAMB's approval/);
  assert.match(text, /transaction ID, endorsed indemnity form and final profile notification/);
});

test("site-wide Humanizer workflow remains non-destructive and source-preserving", () => {
  const skill = source(".agents/skills/humanizer/SKILL.md");
  const standard = source("docs/PUBLISHING_STANDARD.md");
  const pkg = JSON.parse(source("package.json"));
  assert.match(skill, /not a promise of AI-detector evasion or Google AdSense approval/);
  assert.match(skill, /Never update.*lastVerified.*lastChecked/);
  assert.match(standard, /Humanizer stage/);
  assert.match(pkg.scripts["check:content"], /audit-editorial-voice\.ts --summary/);
  assert.match(pkg.scripts["audit:voice"], /audit-editorial-voice\.ts/);
});
