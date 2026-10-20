import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("Vite patch version is pinned across direct and nested dependency resolution", () => {
  const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  assert.equal(pkg.devDependencies.vite, "8.3.4");
  assert.equal(pkg.overrides.vite, "8.3.4");
  assert.equal(pkg.overrides.sharp, "0.35.5");
});
