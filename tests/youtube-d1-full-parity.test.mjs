import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { test } from "node:test";
import { exportYouTubeD1Import } from "../scripts/export-youtube-d1.mjs";

const root = path.resolve(import.meta.dirname, "..");

test("all authoritative YouTube records survive full offline D1 staging export", () => {
  const sourcePath = path.join(root, "data/youtube-movies.generated.json");
  const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "mng-youtube-d1-parity-"));
  try {
    const manifest = exportYouTubeD1Import(source.movies, path.join(tmp, "export"));
    assert.equal(manifest.recordCount, source.movies.length);
    assert.equal(manifest.batchCount, Math.ceil(source.movies.length / 40));
    const paths = manifest.files.map((file) => path.join(tmp, "export", file.name));
    const out = execFileSync("python3", [
      path.join(root, "scripts/verify-youtube-d1-sqlite.py"),
      path.join(root, "cloudflare/d1/content-scale-schema.sql"),
      sourcePath,
      ...paths,
    ], { encoding: "utf8", timeout: 100000 });
    const report = JSON.parse(out);
    assert.equal(report.validatedMovies, source.movies.length);
    assert.equal(report.publisherSources, source.movies.length);
    assert.equal(report.editorialStatusPreserved, true);
    console.log(JSON.stringify(report));
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
