import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("homepage search does not issue unhelpful one-letter requests", () => {
  const code = read("components/search.tsx");
  assert.match(code, /value\.length < 2/);
  assert.match(code, /Type at least two characters/);
  assert.match(code, /\}, 275\);/);
  assert.match(code, /controller\.abort\(\)/);
  assert.match(code, /fetch\("\/api\/services\?"/);
});

test("directory search debounces remote queries and aborts previous requests", () => {
  for (const path of ["components/service-directory.tsx", "components/entertainment-catalog.tsx"]) {
    const source = read(path);
    assert.match(source, /query \? 275 : 0/);
    assert.match(source, /const controller = new AbortController\(\)/);
    assert.match(source, /controller\.abort\(\)/);
    assert.match(source, /signal: controller\.signal/);
  }
});

test("movies show updating feedback without waiting for network debounce", () => {
  const code = read("components/entertainment-catalog.tsx");
  assert.match(code, /const controller = new AbortController\(\);\s+setLoading\(true\);\s+const timer/);
  assert.match(code, /setResult\(next\)/);
});
