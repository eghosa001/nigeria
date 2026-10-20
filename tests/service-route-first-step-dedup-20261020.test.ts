import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { publicServices } from "../lib/data";
import { getDetailedServiceGuidance } from "../lib/service-guidance";

test("generic service cards no longer restate the first numbered application instruction", () => {
  const genericDuplicates = publicServices.filter(item => {
    const guidance = getDetailedServiceGuidance(item);
    return guidance.route.startDetail.trim().replace(/\s+/g, " ") ===
      (item.steps[0] ?? "").trim().replace(/\s+/g, " ");
  });
  assert.ok(genericDuplicates.length > 0, "the catalog contains duplicated first-step guidance");
  const source = readFileSync(new URL("../components/service-journey.tsx", import.meta.url), "utf8");
  assert.match(source, /const repeatsFirstStep = normalize\(guidance\.route\.startDetail\) === normalize\(service\.steps\[0\]/);
  assert.match(source, /!repeatsFirstStep \? <p>\{guidance\.route\.startDetail\}<\/p> : null/);
});

test("reviewed, nonduplicative first-route explanation remains visible", () => {
  const passport = publicServices.find(item => item.slug === "passport-application-tracking");
  assert.ok(passport);
  const route = getDetailedServiceGuidance(passport);
  assert.notEqual(route.route.startDetail.trim(), passport.steps[0]?.trim());
  assert.match(route.route.startDetail, /Application Number and Reference Number/i);
});
