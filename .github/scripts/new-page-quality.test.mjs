import { test } from "node:test";
import assert from "node:assert/strict";
import { checkRecord, checkNewRoute, classify, recordsFromSource } from "./new-page-quality.mjs";

test("new service needs source, action, freshness and related context", () => {
  const good = {
    slug: "passport-help", title: "Passport renewal requirements",
    summary: "Review the Nigerian passport renewal route, eligibility, receipts and the official payment and collection process before applying.",
    lastVerified: "2026-10-08", requirements: ["Valid passport", "Application receipt"],
    steps: ["Check eligibility", "Apply with the official portal", "Save confirmation"],
    notes: ["Check current agency charges"], feeLabel: "Verify on portal",
    related: ["passport-renewal"],
    sources: [{ url: "https://immigration.gov.ng", lastChecked: "2026-10-08" }]
  };
  assert.deepEqual(checkRecord("data/services.json", "service", good.slug, good), []);
  assert.match(checkRecord("data/services.json", "service", good.slug, { ...good, sources: [] }).join(" "), /HTTPS evidence/);
});

test("new TS job record is extracted without confusing nested objects", () => {
  const source = `export const items = [{
    slug: "test-role", title: "Example graduate engineer opening", summary: "A detailed vacancy summary covering role eligibility and verified employer application requirements.",
    organization: "Example", status: "open", location: "Abuja",
    verifiedAt: "2026-10-08",
    applicationSteps: ["Read employer post", "Apply online"],
    officialUrl: "https://example.com/jobs",
    sources: [{ label: "Official", url: "https://example.com/jobs", lastChecked: "2026-10-08" }]
  }];`;
  const records = recordsFromSource(source, "job");
  assert.equal(records.size, 1);
  assert.deepEqual(checkRecord("lib/job-growth-wave-11.ts", "job", "test-role", records.get("test-role")), []);
});

test("new route enforces canonical, metadata, image layout and H1", () => {
  assert.deepEqual(checkNewRoute("app/example/page.tsx", `export const metadata = { title: "Example", description: "Specific answer", alternates: { canonical: "/example" } }; export default function Page(){return <main><h1>Example</h1><img src="/icon.png" alt="Example" width={100} height={100}/></main>}`), []);
  const errors = checkNewRoute("app/poor/page.tsx", 'export default function Page(){return <img src="/x.png" />}');
  assert.match(errors.join(" "), /canonical/);
  assert.match(errors.join(" "), /image missing alt/);
  assert.match(errors.join(" "), /intrinsic width/);
});

test("gate scopes to page-producing content, not unrelated modules", () => {
  assert.equal(classify("lib/analytics.ts"), null);
  assert.equal(classify("data/youtube-detail-shards/0.json"), "youtube");
  assert.equal(classify("data/youtube-movies-review.generated.json"), null);
  assert.equal(classify("lib/explore-growth-wave-9.ts"), "tour");
  assert.equal(classify("app/services/new-guide/page.tsx"), "route");
});

test("real git diff gates only added records and rejects an unsourced publication", async () => {
  const { execFileSync } = await import("node:child_process");
  const { mkdtempSync, mkdirSync, writeFileSync, rmSync } = await import("node:fs");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const { fileURLToPath } = await import("node:url");
  const root = mkdtempSync(join(tmpdir(), "mng-page-gate-"));
  const gate = fileURLToPath(new URL("./new-page-quality.mjs", import.meta.url));
  const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" });
  try {
    mkdirSync(join(root, "data"));
    writeFileSync(join(root, "data/services.json"), "[]");
    git("init", "-q");
    git("config", "user.name", "CI Fixture");
    git("config", "user.email", "fixture@example.com");
    git("add", ".");
    git("commit", "-qm", "base");
    const base = git("rev-parse", "HEAD").trim();
    const record = { slug: "new-verified-page", title: "Verified government service explanation",
      summary: "A source-checked, practical explanation of the full public service application, eligibility and collection process.",
      lastVerified: "2026-10-08", feeLabel: "Check official source",
      requirements: ["Identification", "Application receipt"], steps: ["Open official route", "Complete form", "Save receipt"],
      notes: ["Reconfirm all live fees"], related: ["existing-guide"], sources: [{ url: "https://example.gov.ng", lastChecked: "2026-10-08" }] };
    writeFileSync(join(root, "data/services.json"), JSON.stringify([record]));
    execFileSync(process.execPath, [gate, "--base", base], { cwd: root });
    writeFileSync(join(root, "data/services.json"), JSON.stringify([{ ...record, sources: [] }]));
    assert.throws(() => execFileSync(process.execPath, [gate, "--base", base], { cwd: root, stdio: "pipe" }), /Command failed/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
