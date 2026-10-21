import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path: string) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("Services result-card navigation stays clickable without bulk speculative detail requests", () => {
  const card = read("components/service-card.tsx");
  assert.ok(card.includes('<Link className="service-card" href={"/services/" + service.slug} prefetch={false}>'));
  assert.ok(card.includes('<h3>{service.shortTitle}</h3>'));
});

test("Jobs result and collection cards avoid viewport-triggered detail prefetch", () => {
  const count = (source: string) =>
    source.split('href={"/jobs/" + item.slug} prefetch={false}>').length - 1;

  const directory = read("components/jobs-directory.tsx");
  const collection = read("components/job-collection.tsx");
  assert.equal(count(directory), 4, "titles and action links for result + recommended cards");
  assert.equal(count(collection), 2, "title and requirements links");
  assert.ok(directory.includes("setResult(next)"), "filter interactions still fetch dynamically");
  assert.ok(collection.includes("PAGE_SIZE"), "collection paging still works");
});
