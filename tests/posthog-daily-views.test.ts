import assert from "node:assert/strict";
import test from "node:test";
import { parsePostHogDailyRows } from "../lib/posthog-daily-views";

test("the PostHog daily parser restores historically recorded views on GA4 gap dates", () => {
  assert.deepEqual(parsePostHogDailyRows({ results: [{ days: ["2026-10-12", "2026-10-13", "2026-10-14"], data: [159, "127", 184] }] }), [
    { date: "2026-10-12", views: 159 }, { date: "2026-10-13", views: 127 }, { date: "2026-10-14", views: 184 },
  ]);
});

test("malformed daily trends do not invent missing page views", () => {
  assert.throws(() => parsePostHogDailyRows({ results: [] }), /no usable/);
  assert.deepEqual(parsePostHogDailyRows({ results: [{ days: ["invalid", "2026-10-13"], data: [99, null] }] }), []);
});
