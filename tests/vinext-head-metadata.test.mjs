import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { patchVinextMetadata } from "../scripts/patch-vinext-head-metadata.mjs";

function fixture(source, callback) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "mng-vinext-"));
  const file = path.join(dir, "streaming-metadata.js");
  fs.writeFileSync(file, source);
  try { callback(file); } finally { fs.rmSync(dir, { recursive: true, force: true }); }
}

test("patches Vinext beta.11 empty-User-Agent branch without changing crawler matching", () => {
  fixture('function shouldServeStreamingMetadata(userAgent, htmlLimitedBots) {\n  if (!userAgent) return true;\n  return !getHtmlLimitedBotRegex(htmlLimitedBots).test(userAgent);\n}', (file) => {
    assert.equal(patchVinextMetadata(file), "patched");
    const patched = fs.readFileSync(file, "utf8");
    assert.match(patched, /if \(!userAgent\) return false;/);
    assert.match(patched, /return !getHtmlLimitedBotRegex\(htmlLimitedBots\).test\(userAgent\)/);
    assert.equal(patchVinextMetadata(file), "already-patched");
  });
});

test("refuses unknown Vinext implementations instead of silently disabling SEO protection", () => {
  fixture("export const newMetadataPipeline = true;", (file) => {
    assert.throws(() => patchVinextMetadata(file), /implementation changed/);
  });
});
