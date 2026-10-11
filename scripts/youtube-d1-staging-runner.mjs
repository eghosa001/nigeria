/**
 * Explicit, staging-only migration of YouTube source-backed movie metadata.
 *
 * CLI modes:
 *   node scripts/youtube-d1-staging-runner.mjs --inspect
 *   CONFIRM_YOUTUBE_D1_IMPORT=IMPORT_STAGING_ONLY node scripts/youtube-d1-staging-runner.mjs --import
 *
 * Imports are NEVER automatic, never touch public Worker routes or wrangler.jsonc,
 * and require a remote database UUID/name match before any SQL write.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { exportYouTubeD1Import } from "./export-youtube-d1.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const stagingConfigPath = path.join(root, "wrangler.d1-staging.jsonc");
const productionConfigPath = path.join(root, "wrangler.jsonc");
const expected = Object.freeze({
  database_id: "47fdffad-9513-484f-94be-4b176662cc71",
  database_name: "mynigeriaguide-content-staging",
  binding: "DB",
});

export function assertStagingConfiguration(staging, production) {
  if (staging.name !== "mynigeriaguide-d1-staging-only" ||
    !Array.isArray(staging.d1_databases) || staging.d1_databases.length !== 1) {
    throw new Error("Not an isolated, single-database staging Wrangler config.");
  }
  for (const [key, value] of Object.entries(expected)) {
    if (staging.d1_databases[0][key] !== value) {
      throw new Error("Staging D1 " + key + " does not match the owner's supplied database.");
    }
  }
  if (Array.isArray(production.d1_databases) && production.d1_databases.length) {
    throw new Error("Production Wrangler configuration unexpectedly contains a D1 binding.");
  }
  if (staging.name === production.name) throw new Error("Staging must not use the production Worker name.");
}

/** D1 CLI already creates implicit transactions; manual BEGIN/COMMIT fail. */
export function makeRemoteImportSql(sql) {
  const lines = sql.split("\n");
  if (lines[0] !== "PRAGMA foreign_keys = ON;" ||
      lines[1] !== "BEGIN TRANSACTION;" ||
      !lines.includes("COMMIT;")) {
    throw new Error("Unexpected SQLite export format. Refusing to create remote D1 import.");
  }
  const control = lines.filter((line) =>
    line === "PRAGMA foreign_keys = ON;" || line === "BEGIN TRANSACTION;" || line === "COMMIT;");
  if (control.length !== 3 || lines[lines.length - 2] !== "COMMIT;") {
    throw new Error("Unexpected transaction controls. Refusing to import.");
  }
  return lines.slice(2, -2).join("\n") + "\n";
}

export function makeRemoteSchemaSql(sql) {
  if (!sql.startsWith("-- MyNigeriaGuide scale content store for Cloudflare D1.")) {
    throw new Error("Unexpected staging schema.");
  }
  if (!sql.includes("PRAGMA foreign_keys = ON;")) throw new Error("Schema foreign key pragma missing.");
  // Foreign keys are already enforced by D1; explicit PRAGMA is rejected by
  // D1's implicit query transaction.
  return sql.replace("PRAGMA foreign_keys = ON;", "-- D1 enforces foreign keys by default.");
}

export function assertRemoteIdentity(entries) {
  if (!Array.isArray(entries)) throw new Error("Wrangler D1 list response was not an array.");
  const match = entries.filter((entry) =>
    entry.name === expected.database_name &&
    (entry.uuid === expected.database_id || entry.id === expected.database_id));
  if (match.length !== 1) throw new Error("Cloudflare account does not contain the exact authorized staging D1 ID/name.");
  return match[0];
}

function wrangler(args) {
  const bin = path.join(root, "node_modules", ".bin", "wrangler");
  if (!fs.existsSync(bin)) throw new Error("Install dependencies before running the staging D1 runner.");
  const run = spawnSync(bin, args, {
    cwd: root, env: process.env, encoding: "utf8",
    timeout: 120000, maxBuffer: 8 * 1024 * 1024,
  });
  if (run.error || run.status !== 0) {
    throw new Error("Wrangler failed (" + args.slice(0, 5).join(" ") + "): " +
      String(run.error?.message ?? run.stderr ?? run.stdout).slice(0, 1200));
  }
  return run.stdout.trim();
}

function readWranglerJson(args) {
  const output = wrangler([...args, "--json", "--config", stagingConfigPath]);
  try { return JSON.parse(output); }
  catch { throw new Error("Could not parse D1 Wrangler JSON response; no database changes were made by this command."); }
}

function sqlQuery(sql) {
  const response = readWranglerJson(["d1", "execute", expected.binding, "--remote", "--command", sql]);
  const results = Array.isArray(response) ? response[0]?.results : response?.results;
  if (!Array.isArray(results)) throw new Error("Unexpected D1 query result format.");
  return results;
}

async function main() {
  const mode = process.argv[2];
  if ((mode !== "--inspect" && mode !== "--import") || process.argv.length !== 3) {
    throw new Error("Use --inspect (read-only) or --import (explicit staged import).");
  }
  if (!process.env.CLOUDFLARE_API_TOKEN || !process.env.CLOUDFLARE_ACCOUNT_ID) {
    throw new Error("GitHub Actions Cloudflare API token and account ID secrets are required.");
  }
  const staging = JSON.parse(fs.readFileSync(stagingConfigPath, "utf8"));
  const production = JSON.parse(fs.readFileSync(productionConfigPath, "utf8"));
  assertStagingConfiguration(staging, production);
  const remote = readWranglerJson(["d1", "list"]);
  assertRemoteIdentity(remote);

  console.log("Authorized staging D1 ID/name verified. Production Worker configuration untouched.");
  if (mode === "--inspect") {
    const tables = sqlQuery("SELECT name FROM sqlite_master WHERE type='table' AND name='content_items';");
    if (tables.length === 0) {
      console.log("Staging D1 is connected, but the content schema has not been imported yet.");
    } else {
      const counts = sqlQuery(
        "SELECT editorial_status AS status, COUNT(*) AS total FROM content_items " +
        "WHERE pillar='movies_entertainment' AND kind='youtube-movie' GROUP BY editorial_status;",
      );
      console.log("Staging-only movie status counts: " + JSON.stringify(counts));
    }
    return;
  }

  if (process.env.CONFIRM_YOUTUBE_D1_IMPORT !== "IMPORT_STAGING_ONLY") {
    throw new Error("Refusing D1 writes without explicit IMPORT_STAGING_ONLY confirmation.");
  }
  const source = JSON.parse(fs.readFileSync(path.join(root, "data/youtube-movies.generated.json"), "utf8"));
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), "mng-youtube-stage-"));
  try {
    const folder = path.join(temp, "export");
    const manifest = exportYouTubeD1Import(source.movies, folder);
    if (manifest.recordCount !== source.movies.length) throw new Error("Export/source count mismatch.");
    const schema = makeRemoteSchemaSql(
      fs.readFileSync(path.join(root, "cloudflare/d1/content-scale-schema.sql"), "utf8"));
    const schemaPath = path.join(temp, "d1-staging-schema.sql");
    fs.writeFileSync(schemaPath, schema);
    console.log("Importing existing content schema into staging only.");
    wrangler(["d1", "execute", expected.binding, "--remote", "--file", schemaPath,
      "--yes", "--config", stagingConfigPath]);

    for (let i = 0; i < manifest.files.length; i++) {
      const file = path.join(folder, manifest.files[i].name);
      const remoteSql = makeRemoteImportSql(fs.readFileSync(file, "utf8"));
      const remotePath = path.join(temp, "d1-staging-part.sql");
      fs.writeFileSync(remotePath, remoteSql);
      wrangler(["d1", "execute", expected.binding, "--remote", "--file", remotePath,
        "--yes", "--config", stagingConfigPath]);
      console.log("Staging batch " + (i + 1) + "/" + manifest.files.length + " applied.");
    }
    const result = sqlQuery(
      "SELECT (SELECT COUNT(*) FROM content_items WHERE pillar='movies_entertainment' AND kind='youtube-movie') AS movie_count, " +
      "(SELECT COUNT(*) FROM content_sources s JOIN content_items i ON i.id=s.content_id " +
      "WHERE i.pillar='movies_entertainment' AND i.kind='youtube-movie') AS publisher_sources, " +
      "(SELECT COUNT(*) FROM content_search) AS search_rows;",
    );
    const row = result[0];
    if (!row || Number(row.movie_count) !== manifest.recordCount ||
      Number(row.publisher_sources) < manifest.recordCount ||
      Number(row.search_rows) < manifest.recordCount) {
      throw new Error("Staging D1 source counts do not match the exported catalog: " + JSON.stringify(row));
    }
    console.log("Staging-only import validated: " + JSON.stringify({
      originalSourceMovies: manifest.recordCount,
      batchCount: manifest.batchCount,
      databaseMovies: Number(row.movie_count),
      publisherSources: Number(row.publisher_sources),
      indexedSearchRows: Number(row.search_rows),
      publicWebsiteSwitched: false,
    }));
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
