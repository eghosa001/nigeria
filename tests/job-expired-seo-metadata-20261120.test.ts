import test from "node:test";
import assert from "node:assert/strict";
import { generateMetadata } from "../app/jobs/[slug]/page";

test("expired Army recruitment overrides use the real closed application status", async () => {
  const metadata = await generateMetadata({
    params: Promise.resolve({ slug: "nigerian-army-92rri-2026" }),
  });
  const title = typeof metadata.title === "object" && metadata.title && "absolute" in metadata.title
    ? metadata.title.absolute ?? ""
    : String(metadata.title ?? "");
  assert.match(title, /Application Status/);
  assert.doesNotMatch(title, /Apply\s*&\s*Ages/);
  assert.match(String(metadata.description), /deadline was 2026-10-21/);
  assert.equal(metadata.openGraph?.title, title);
  assert.equal(metadata.twitter?.title, title);
});

test("evergreen careers portal keeps its source-specific metadata override", async () => {
  const metadata = await generateMetadata({
    params: Promise.resolve({ slug: "who-careers-nigeria" }),
  });
  const title = typeof metadata.title === "object" && metadata.title && "absolute" in metadata.title
    ? metadata.title.absolute ?? ""
    : String(metadata.title ?? "");
  assert.equal(title, "WHO Careers Nigeria: Official Recruitment Portal");
});
