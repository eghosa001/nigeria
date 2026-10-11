import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { auditCodebase } from "../scripts/audit-codebase.mjs";

test("audit flags only unreferenced shared modules and preserves entrypoints", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "mng-audit-"));
  const write = (file, content) => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), content);
  };
  try {
    write("app/page.tsx", 'import { used } from "@/lib/used"; export default function Page() { return used; }');
    write("lib/used.ts", 'export const used = "yes";');
    write("lib/unused.ts", 'export const unused = true;');
    write("scripts/manual.mjs", 'import { cli } from "../lib/cli"; console.log(cli);');
    write("lib/cli.ts", "export const cli = true;");
    write("tests/dummy.test.ts", 'import "@/lib/test-only";');
    write("lib/test-only.ts", "export const isolated = true;");
    write("data/generated.json", '{"keep":true}');

    const report = auditCodebase(root);
    assert.deepEqual(report.reviewCandidates, ["lib/unused.ts"]);
    assert.deepEqual(report.toolingOnly, ["lib/cli.ts", "lib/test-only.ts"]);
    assert.equal(report.unresolvedLocalImports.length, 0);
    assert.equal(report.inventory.productionEntrypoints, 1);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("audit reports computed imports instead of treating them as safe deletions", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "mng-imports-"));
  try {
    fs.mkdirSync(path.join(root, "app"));
    fs.writeFileSync(path.join(root, "app/page.tsx"), 'const path = "foo"; import(path); import("./missing");');
    const report = auditCodebase(root);
    assert.equal(report.unknownDynamicImports[0]?.count, 1);
    assert.deepEqual(report.unresolvedLocalImports, [
      { file: "app/page.tsx", specifier: "./missing" },
    ]);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
