import assert from "node:assert/strict";
import test from "node:test";
import { collectVoiceCorpus } from "../lib/editorial-voice-corpus";
import { collectPublicPageVoice } from "../scripts/public-page-voice-corpus";
import { auditEditorialVoice } from "../lib/editorial-voice-audit";
import { publicServices } from "../lib/data";

test("site-wide Humanizer reviews every editorial content family, not just four headline lists", () => {
  const rows = collectVoiceCorpus();
  const kinds = new Set(rows.map(row => row.kind));
  for (const kind of [
    "movie", "series", "person", "film-editorial", "youtube",
    "service", "guide", "place", "opportunity", "career-guide",
  ]) {
    assert.ok(kinds.has(kind), "missing public content family: " + kind);
    assert.ok(rows.some(row => row.kind === kind && row.fields > 0), kind + " missing prose");
  }
  assert.ok(rows.length > 1000, "audit should include the wider catalog, not a handpicked sample");
  assert.equal(new Set(rows.map(row => row.pillar)).size, 4);
  assert.ok(rows.every(row => row.url.startsWith("/") && row.title.trim() && row.fields > 0));
});

test("site-wide Humanizer audit remains read-only and signals do not imply authorship", () => {
  const knownText = "This guide explains the booking process. In this article we will delve into a vibrant tapestry.";
  const signals = auditEditorialVoice(knownText);
  assert.ok(signals.some(signal => signal.id === "self-referential-guide"));
  assert.ok(signals.some(signal => signal.id === "staged-opening"));
  assert.ok(signals.some(signal => signal.id === "stock-inflation"));
  assert.deepEqual(auditEditorialVoice("The exam registration closes on 22 October."), []);
});

test("humanized medical and financial service notes preserve original cautions", () => {
  const privateBooking = publicServices.find(item => item.slug === "reddington-book-appointment");
  const finance = publicServices.find(item => item.slug === "leadway-buy-motor-insurance-online");
  assert.ok(privateBooking);
  assert.ok(finance);
  assert.ok(privateBooking.notes.some(note => /steps cover booking only.*do not recommend a diagnosis, doctor or treatment/i.test(note)));
  assert.ok(finance.notes.some(note => /steps cover the purchase process.*do not recommend one insurance product/i.test(note)));
  assert.ok(privateBooking.sources.some(src => /^https:\/\//.test(src.url)));
  assert.ok(finance.sources.some(src => /^https:\/\//.test(src.url)));
});

test("the full-coverage command supports untruncated JSON and advisory output", async () => {
  const fs = await import("node:fs");
  const script = fs.readFileSync(new URL("../scripts/audit-editorial-voice.ts", import.meta.url), "utf8");
  assert.match(script, /--json/);
  assert.match(script, /--all/);
  assert.match(script, /collectVoiceCorpus\(\)/);
  assert.match(script, /report\.totalRecords/);
  assert.doesNotMatch(script, /writeFile|appendFile|process\.exit\(1\)/);
});

test("shared landing pages and static site copy are included without reading admin pages", () => {
  const pages = collectPublicPageVoice();
  assert.ok(pages.length >= 8, "Sitewide inventory must include more than four content pillars");
  assert.ok(pages.some(row => row.url === "/"), "Homepage copy must be reviewed");
  assert.ok(pages.every(row => !row.url.startsWith("/admin") && !row.url.startsWith("/api")));
  assert.ok(pages.every(row => row.kind === "public-page-static" && row.fields > 0));
});
