import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("navigation does not download every destination until requested", () => {
  const source = read("components/site-header.tsx");
  assert.match(source, /const prefetched = useRef\(new Set<string>\(\)\)/);
  assert.match(source, /router\.prefetch\(path\)/);
  assert.match(source, /onMouseEnter=\{\(\) => warmOnIntent\(item\.href\)\}/);
  assert.match(source, /onFocus=\{\(\) => warmOnIntent\(item\.href\)\}/);
  assert.match(source, /prefetched\.current\.size >= 2/);
  assert.match(source, /connection\?\.saveData/);
  assert.match(source, /\["slow-2g", "2g"\]/);
  assert.match(source, /path === "\/jobs" \|\| path\.startsWith\("\/jobs\/"\)/);
  assert.match(source, /path === "\/search"/);
  assert.match(source, /prefetch=\{false\}/);
  assert.doesNotMatch(source, /prefetch=\{true\}/);
});

test("every navigation destination retains its normal Link and immediate progress", () => {
  const source = read("components/site-header.tsx");
  assert.match(source, /onClick=\{\(\) => indicateNavigation\(item\.href\)\}/);
  assert.match(source, /setPendingHref\(path\)/);
  assert.match(source, /data-navigation-pending=\{pendingHref/);
  assert.match(source, /data-nav-pending=\{pendingHref === item\.href/);
  assert.match(source, /role="status" aria-live="polite"/);
  assert.match(source, /setTimeout\(\(\) => setPendingHref\(null\), 10_000\)/);
  assert.match(source, /prefetched\.current\.clear\(\)/);
  assert.match(source, /mobileNavigation\.map/);
});

test("slow server routes offer one accessible shell without changing SEO or content", () => {
  const fallback = read("app/loading.tsx");
  const stylesheet = read("app/ux-polish.css");
  assert.match(fallback, /role="status" aria-live="polite"/);
  assert.match(fallback, /Opening your guide/);
  assert.doesNotMatch(fallback, /<h1|<script|meta name=|canonical/i);
  assert.match(stylesheet, /\.site-header\[data-navigation-pending="true"\]::after/);
  assert.match(stylesheet, /\.mobile-bottom-nav a\[data-nav-pending="true"\]/);
  assert.match(stylesheet, /prefers-reduced-motion: reduce/);
});
