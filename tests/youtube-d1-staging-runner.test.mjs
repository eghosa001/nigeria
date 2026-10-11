import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  assertStagingConfiguration, assertRemoteIdentity,
  makeRemoteImportSql, makeRemoteSchemaSql,
} from "../scripts/youtube-d1-staging-runner.mjs";
import { prepareYouTubeD1Import } from "../scripts/export-youtube-d1.mjs";

const staging = JSON.parse(readFileSync(new URL("../wrangler.d1-staging.jsonc", import.meta.url), "utf8"));
const production = JSON.parse(readFileSync(new URL("../wrangler.jsonc", import.meta.url), "utf8"));

test("staging binding is exactly the owner-provided D1 and never touches production config", () => {
  assert.doesNotThrow(() => assertStagingConfiguration(staging, production));
  assert.equal(staging.d1_databases[0].binding, "DB");
  assert.equal(production.d1_databases[0].binding, "CONTENT_DB");
  assert.notEqual(production.d1_databases[0].database_id, staging.d1_databases[0].database_id);
  assert.notEqual(staging.name, production.name);
  assert.throws(() =>
    assertStagingConfiguration({ ...staging, name: production.name }, production), /isolated/);
  assert.throws(() =>
    assertStagingConfiguration(staging, { ...production, d1_databases: [{ database_id: "wrong" }] }),
    /Production/);
});

test("production registration permits only the exact isolated owner database", () => {
  for (const key of ["database_id", "database_name", "binding"]) {
    const binding = { ...production.d1_databases[0], [key]: staging.d1_databases[0][key] };
    assert.throws(() => assertStagingConfiguration(staging, { ...production, d1_databases: [binding] }), /Production/);
  }
  assert.throws(() => assertStagingConfiguration(staging, { ...production,
    d1_databases: [...production.d1_databases, ...production.d1_databases] }), /Production/);
  assert.throws(() => assertStagingConfiguration(staging, { ...production, d1_databases: {} }), /Production/);
  assert.doesNotThrow(() => assertStagingConfiguration(staging, { ...production, d1_databases: undefined }));
});

test("remote database identity must match exact ID and account-listed name", () => {
  const correct = { name: staging.d1_databases[0].database_name, uuid: staging.d1_databases[0].database_id };
  assert.deepEqual(assertRemoteIdentity([correct]), correct);
  assert.throws(() => assertRemoteIdentity([{ ...correct, uuid: "wrong-id" }]), /exact authorized/);
  assert.throws(() => assertRemoteIdentity([{ ...correct, name: "production" }]), /exact authorized/);
  assert.throws(() => assertRemoteIdentity([]), /exact authorized/);
});

test("SQLite archive becomes D1-compatible SQL with no manual transactions", () => {
  const movie = {
    videoId: "aBCdefG1234", title: "Film", synopsis: "O'Brien's story",
    channelName: "Publisher", cast: ["Actor"], featuredCast: ["Actor"],
    publishedAt: "2026-10-10T12:00:00Z", lastChecked: "2026-10-11",
    videoUrl: "https://www.youtube.com/watch?v=aBCdefG1234",
  };
  const original = prepareYouTubeD1Import([movie]).batches[0];
  const remote = makeRemoteImportSql(original);
  assert.doesNotMatch(remote, /\bBEGIN TRANSACTION\b|\bCOMMIT\b|PRAGMA foreign_keys/);
  assert.match(remote, /INSERT INTO content_items/);
  assert.match(remote, /INSERT INTO content_sources/);
  assert.match(remote, /O''Brien/);
  assert.throws(() => makeRemoteImportSql("DROP TABLE content_items;"), /Unexpected SQLite/);
  assert.throws(() => makeRemoteImportSql(original + "COMMIT;"), /Unexpected transaction/);
});

test("remote schema relies on D1's enforced foreign keys without modifying source", () => {
  const original = readFileSync(new URL("../cloudflare/d1/content-scale-schema.sql", import.meta.url), "utf8");
  const remote = makeRemoteSchemaSql(original);
  assert.match(original, /PRAGMA foreign_keys = ON/);
  assert.doesNotMatch(remote, /PRAGMA foreign_keys = ON/);
  assert.match(remote, /CREATE TABLE IF NOT EXISTS content_items/);
  assert.match(remote, /CREATE VIRTUAL TABLE IF NOT EXISTS content_search USING fts5/);
});
