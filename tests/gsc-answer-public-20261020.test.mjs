import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const services = JSON.parse(readFileSync("data/services.json", "utf8"));
const scaledServices = JSON.parse(readFileSync("data/services-scale-verified.json", "utf8"));
const jobs = readFileSync("lib/job-topics.ts", "utf8");
const tours = readFileSync("app/explore/[slug]/page.tsx", "utf8");
const movies = readFileSync("app/entertainment/movies/[slug]/page.tsx", "utf8");

test("AEDC and IBEDC refunds retain their individual refund methods and add an official formal-complaint route", () => {
  for (const slug of ["aedc-map-refund", "ibedc-map-refund"]) {
    const record = scaledServices.find((item) => item.slug === slug);
    assert.ok(record, slug);
    assert.match(record.summary, /electricity|energy/i);
    assert.ok(record.steps.some((step) => /Customer Complaints Unit/.test(step)));
    assert.ok(record.sources.some((source) => source.url === "https://nerc.gov.ng/faq/metering/"));
    assert.ok(record.sources.some((source) => source.url === "https://nerc.gov.ng/need-help/services/how-to-file-a-complaint/"));
    assert.ok(!record.steps.some((step) => /instant bank refund|guaranteed cash refund/i.test(step)));
  }
});

test("NIS tracking explains produced versus actually collected without changing the official lookup", () => {
  const record = services.find((item) => item.slug === "passport-application-tracking");
  assert.ok(record);
  assert.equal(record.officialPortal, "https://track.immigration.gov.ng/");
  assert.ok(record.notes.some((note) => note.includes("PASSPORT PRODUCED, READY FOR COLLECTION")));
  assert.ok(record.steps.some((step) => step.includes("selected passport office")));
  assert.ok(record.sources.some((source) => source.url.includes("channelstv.com/2026/01/15/")));
});

test("Jobs public-service guidance asks for the official FCSC advertisement and warns against agent fees", () => {
  assert.match(jobs, /official FCSC announcement before entering personal details/);
  assert.match(jobs, /recruitment links shared only through WhatsApp/);
  assert.match(jobs, /nobody should charge you for shortlisting/);
});

test("Detty December snippet uses venue, announced dates and ticket figure without promising admission", () => {
  assert.match(tours, /Detty December Village Lagos 2026: Dates & Tickets/);
  assert.match(tours, /Detty December Village is at Livespot Entertarium/);
  assert.match(tours, /18–30 December 2026 dates/);
  assert.match(tours, /tickets from ₦50,000/);
});

test("Film snippet matches its distinct 2025 title, credited cast and official distributor", () => {
  assert.match(movies, /Forever Isn’t Long Enough \(2025\): Cast & Watch/);
  assert.match(movies, /Michael Dappa, Inem King, Chioma Nwosu and Oby Titus/);
  assert.match(movies, /official Royal Arts TV video/);
});
