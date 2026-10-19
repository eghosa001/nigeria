import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { getDistinctTopicTaskLinks } from "../lib/topic-task-links";
import { getGrowthHub, growthHubs } from "../lib/growth-hubs";
import { getPublicService } from "../lib/data";
import type { Service } from "../lib/types";

test("duplicate search phrases lead to one canonical service task, not repeated keyword anchors", () => {
  const tasks = [
    { slug: "regular", shortTitle: "Open an RSA", title: "Register an RSA" },
    { slug: "micro", shortTitle: "Micro Pension", title: "Micro pension guide" },
    { slug: "same", shortTitle: "Micro Pension", title: "Employer Micro Pension" },
  ] as Service[];
  const links = getDistinctTopicTaskLinks([
    { query: "register pension", serviceSlug: "regular" },
    { query: "open pension online", serviceSlug: "regular" },
    { query: "micro pension", serviceSlug: "micro" },
    { query: "micro pension link", serviceSlug: "micro" },
    { query: "another employer route", serviceSlug: "same" },
    { query: "broken service", serviceSlug: "missing" },
  ], tasks);
  assert.deepEqual(links, [
    { slug: "regular", label: "Open an RSA" },
    { slug: "micro", label: "Micro pension guide" },
    { slug: "same", label: "Employer Micro Pension" },
  ]);
});

test("every topic hub now lists existing unique canonical tasks in authored order", () => {
  for (const hub of growthHubs) {
    const services = hub.serviceSlugs.map(getPublicService).filter((s) => s !== undefined);
    const result = getDistinctTopicTaskLinks(hub.searches, services);
    assert.equal(new Set(result.map((item) => item.slug)).size, result.length, hub.slug);
    assert.ok(result.every((item) => services.some((service) => service.slug === item.slug)), hub.slug);
    assert.ok(result.every((item) => item.label.trim().length > 0), hub.slug);
    assert.ok(result.length <= hub.searches.length, hub.slug);
  }
  const pension = getGrowthHub("pension-services-nigeria");
  assert.ok(pension);
  const services = pension.serviceSlugs.map(getPublicService).filter((s) => s !== undefined);
  const links = getDistinctTopicTaskLinks(pension.searches, services);
  assert.ok(pension.searches.length > links.length, "RSA keyword variants should merge into one reader route");
  assert.ok(links.some((item) => item.slug === "pencom-open-rsa"));
  assert.ok(links.some((item) => item.slug === "pencom-micro-pension-registration"));
  assert.ok(links.some((item) => item.slug === "pencom-transfer-rsa"));
});

test("topic pages show helpful options rather than a repeated keyword-count dashboard", () => {
  const topic = readFileSync(new URL("../app/topics/[slug]/page.tsx", import.meta.url), "utf8");
  const answer = readFileSync(new URL("../components/answer-first.tsx", import.meta.url), "utf8");
  assert.match(topic, /getDistinctTopicTaskLinks\(hub\.searches, services\)/);
  assert.match(topic, /hub\.intro\.slice\(1\)/);
  assert.doesNotMatch(topic, /Common searches", value: String\(hub\.searches\.length\)/);
  assert.match(topic, /taskLinks\.map\(\(task\)/);
  assert.match(answer, /visibleFacts\.length > 0/);
});
