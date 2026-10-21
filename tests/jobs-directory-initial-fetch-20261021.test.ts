import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { needsInitialJobsQuery, type InitialJobsQuery } from "../lib/jobs-initial-query";

const defaults: InitialJobsQuery = {
  query: "", sector: "All", status: "all", location: "all",
  profession: "all", page: 1,
};

test("server-rendered unfiltered Jobs page does not need an initial duplicate API call", () => {
  assert.equal(needsInitialJobsQuery(defaults), false);
  assert.equal(needsInitialJobsQuery({ ...defaults, query: "  " }), false);
});

test("direct Jobs search and filter links still fetch their correct results on hydration", () => {
  const cases: InitialJobsQuery[] = [
    { ...defaults, query: "graduate" },
    { ...defaults, sector: "Private" },
    { ...defaults, status: "open" },
    { ...defaults, location: "lagos" },
    { ...defaults, profession: "engineering" },
    { ...defaults, page: 3 },
  ];
  for (const filters of cases) {
    assert.equal(needsInitialJobsQuery(filters), true, JSON.stringify(filters));
  }
});

test("component checks only the first hydrated query and retains interactive refresh", () => {
  const source = readFileSync(new URL("../components/jobs-directory.tsx", import.meta.url), "utf8");
  assert.ok(source.includes("const initialQueryChecked = useRef(false);"));
  assert.ok(source.includes("if (!initialQueryChecked.current) {"));
  assert.ok(source.includes("needsInitialJobsQuery({ query, sector, status, location, profession, page }, initialResult.page)"));
  assert.ok(source.includes('fetch("/api/jobs?" + params.toString(), {'));
  assert.ok(source.includes("setResult(next)"));
});
