import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { test } from "node:test";
import {
  prepareYouTubeD1Import,
  exportYouTubeD1Import,
  sqlString,
} from "./export-youtube-d1.mjs";

const SCHEMA = new URL("../cloudflare/d1/content-scale-schema.sql", import.meta.url).pathname;

function record(videoId, title) {
  return {
    videoId, title, rawTitle: title, synopsis: "Verified publisher description.",
    cast: ["Actor Example"], featuredCast: ["Actor Example"],
    channelName: "Publisher's Channel",
    channelId: "UC-test", channelUrl: "https://www.youtube.com/@publisher",
    publishedAt: "2026-10-10T11:30:00Z", year: 2026, durationMinutes: 102,
    videoUrl: "https://www.youtube.com/watch?v=" + videoId,
    lastChecked: "2026-10-11",
  };
}

test("generated D1 batches import into the existing content schema, support FTS and remain idempotent", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "mng-youtube-d1-"));
  try {
    const rows = [
      record("aBCdefG1234", "Ruby's Summer Movie"),
      record("oPfGhiJ5678", "Nigerian Family Drama"),
    ];
    rows[0].synopsis = "The movie's reunion'; DROP TABLE content_items; --";
    const folder = path.join(root, "export");
    const manifest = exportYouTubeD1Import(rows, folder, { batchSize: 1 });
    assert.equal(manifest.recordCount, 2);
    assert.equal(manifest.batchCount, 2);
    assert.equal(manifest.editorialStatus, "draft");
    assert.ok(manifest.files.every((file) => /^[a-f0-9]{64}$/.test(file.sha256)));
    assert.throws(() => exportYouTubeD1Import(rows, folder), /Refusing to overwrite/);

    const sqlFiles = manifest.files.map((file) => path.join(folder, file.name));
    const script = [
      "import sqlite3,sys,json",
      "conn=sqlite3.connect(':memory:')",
      "conn.executescript(open(sys.argv[1]).read())",
      "parts=sys.argv[2:]",
      "for p in parts: conn.executescript(open(p).read())",
      "assert conn.execute('SELECT count(*) FROM content_items').fetchone()[0] == 2",
      "assert conn.execute('SELECT count(*) FROM content_sources').fetchone()[0] == 2",
      "assert conn.execute(\"SELECT count(*) FROM content_search WHERE content_search MATCH 'ruby'\").fetchone()[0] == 1",
      "row=conn.execute(\"SELECT canonical_path,editorial_status,payload_json FROM content_items WHERE slug='aBCdefG1234'\").fetchone()",
      "assert row[0] == '/entertainment/youtube/aBCdefG1234'",
      "assert row[1] == 'draft'",
      "assert json.loads(row[2])['synopsis'] == \"The movie's reunion'; DROP TABLE content_items; --\"",
      "conn.execute(\"UPDATE content_items SET editorial_status='published' WHERE slug='aBCdefG1234'\")",
      "for p in parts: conn.executescript(open(p).read())",
      "assert conn.execute('SELECT count(*) FROM content_items').fetchone()[0] == 2",
      "assert conn.execute('SELECT count(*) FROM content_sources').fetchone()[0] == 2",
      "assert conn.execute(\"SELECT editorial_status FROM content_items WHERE slug='aBCdefG1234'\").fetchone()[0] == 'published'",
      "assert conn.execute('SELECT count(*) FROM content_search').fetchone()[0] == 2",
      "print('SQLite D1-compatible schema, FTS, publisher sources and idempotency OK')",
    ].join("\n");
    const output = execFileSync("python3", ["-c", script, SCHEMA, ...sqlFiles], { encoding: "utf8" });
    assert.match(output, /idempotency OK/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("D1 export validates inputs and refuses duplicates or unsafe watch links", () => {
  const movie = record("aBCdefG1234", "Film");
  assert.throws(() => prepareYouTubeD1Import([movie, movie]), /Duplicate YouTube video ID/);
  assert.throws(() => prepareYouTubeD1Import([{ ...movie, videoId: "bad' id" }]), /Invalid YouTube video ID/);
  assert.throws(() => prepareYouTubeD1Import([{ ...movie, videoUrl: "https://example.com/watch?v=" + movie.videoId }]), /not an HTTPS YouTube address/);
  assert.throws(() => prepareYouTubeD1Import([{ ...movie, videoUrl: "https://www.youtube.com/watch?v=other-id" }]), /mismatch/);
  assert.throws(() => prepareYouTubeD1Import([{ ...movie, lastChecked: "" }]), /source-check date/);
  assert.throws(() => prepareYouTubeD1Import([movie], { batchSize: 0 }), /Batch size/);
  assert.throws(() => sqlString("test\0value"), /NUL byte/);
});

test("continuity export can explicitly mark an existing public catalog published", () => {
  const movie = record("aBCdefG1234", "Existing public film");
  const plan = prepareYouTubeD1Import([movie], { editorialStatus: "published" });
  assert.match(plan.batches[0], /'published'/);
  assert.throws(() => prepareYouTubeD1Import([movie], { editorialStatus: "archived" }), /Unsupported editorial status/);
});
