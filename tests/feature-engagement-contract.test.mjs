import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("four-pillar tools are visible from the homepage and discoverable", () => {
  const homepage = read("app/page.tsx");
  const features = read("app/features/page.tsx");
  for (const href of ["/features", "/saved", "/explore/trip-planner", "/jobs#opportunities", "/entertainment/people"]) {
    assert.ok(homepage.includes('href="' + href + '"'), href);
  }
  for (const pillar of ["Movies & Entertainment", "Services", "Tour Nigeria", "Jobs & Careers"]) {
    assert.ok(features.includes(pillar), pillar);
  }
});

test("job watches are limited and never promise background alerts", () => {
  const watches = read("components/job-search-watch.tsx");
  assert.match(watches, /const maximum = 5/);
  assert.match(watches, /params\.set\("pageSize", "12"\)/);
  assert.match(watches, /Checks are manual/);
  assert.match(watches, /cache: "no-store"/);
});

test("trip pricing is visitor-entered and share actions tracked", () => {
  const planner = read("components/trip-budget-planner.tsx");
  assert.match(planner, /cost\(values\.intercity\) \* people/);
  assert.match(planner, /cost\(values\.room\) \* nights/);
  assert.match(planner, /const contingency = Math\.round\(subtotal \* buffer \/ 100\)/);
  assert.match(planner, /trackEvent\("trip_plan_share"/);
});
