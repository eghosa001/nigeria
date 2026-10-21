import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

test("Vite patch version is pinned across direct and override resolution", () => {
  const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  assert.equal(pkg.devDependencies.vite, "8.3.4");
  assert.equal(pkg.overrides.vite, "8.3.4");
});
