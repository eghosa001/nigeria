import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { discoverableYouTubeMovies } from '../lib/youtube-library';
// The exporter is intentionally kept as a dependency-free ESM script.
// @ts-expect-error TypeScript does not load declarations for .mjs scripts here.
import { exportYouTubeD1Import } from './export-youtube-d1.mjs';

const databaseId = '73b4490a-5242-4c31-be8d-36ba0c327d3c';
const databaseName = 'mynigeriaguide-content-production';
if (process.env.CONFIRM_YOUTUBE_D1_PRODUCTION !== 'PUBLISH_EXISTING_STATIC_CATALOG') {
  throw new Error('Refusing production writes without PUBLISH_EXISTING_STATIC_CATALOG confirmation.');
}
if (!process.env.CLOUDFLARE_API_TOKEN || !process.env.CLOUDFLARE_ACCOUNT_ID) {
  throw new Error('Cloudflare credentials are required.');
}
if (discoverableYouTubeMovies.length !== 3209) {
  throw new Error(`Static continuity gate expected 3209 discoverable records, got ${discoverableYouTubeMovies.length}.`);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const wrangler = path.join(root, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'mng-youtube-production-'));
try {
  const exportDir = path.join(temp, 'export');
  const manifest = exportYouTubeD1Import(discoverableYouTubeMovies, exportDir, {
    batchSize: 40, editorialStatus: 'published',
  });
  if (manifest.recordCount !== discoverableYouTubeMovies.length || manifest.editorialStatus !== 'published') {
    throw new Error('Continuity export manifest failed its record/status gate.');
  }
  for (const file of manifest.files) {
    const sqlPath = path.join(exportDir, file.name);
    const remoteSqlPath = path.join(temp, `remote-${file.name}`);
    const remoteSql = fs.readFileSync(sqlPath, 'utf8')
      .replace(/^PRAGMA foreign_keys = ON;\nBEGIN TRANSACTION;\n/, '')
      .replace(/\nCOMMIT;\n$/, '\n');
    fs.writeFileSync(remoteSqlPath, remoteSql);
    const run = spawnSync(process.execPath, [wrangler, ...[
      'd1', 'execute', 'CONTENT_DB', '--remote', '--file', remoteSqlPath,
      '--yes', '--config', path.join(root, 'wrangler.jsonc'),
    ]], { cwd: root, env: process.env, encoding: 'utf8', timeout: 120000, maxBuffer: 8 * 1024 * 1024 });
    if (run.status !== 0) throw new Error(`Production batch failed: ${run.stderr || run.stdout}`);
    console.log(`Applied ${file.name}`);
  }
  const verify = spawnSync(process.execPath, [wrangler, ...[
    'd1', 'execute', 'CONTENT_DB', '--remote', '--command',
    "SELECT COUNT(*) AS total, SUM(editorial_status='published') AS published FROM content_items WHERE pillar='movies_entertainment' AND kind='youtube-movie'",
    '--json', '--config', path.join(root, 'wrangler.jsonc'),
  ]], { cwd: root, env: process.env, encoding: 'utf8', timeout: 120000 });
  if (verify.status !== 0) throw new Error(verify.stderr || verify.stdout);
  const response = JSON.parse(verify.stdout);
  const row = response[0]?.results?.[0];
  if (row?.total !== 3209 || row?.published !== 3209) throw new Error(`Unexpected production counts: ${JSON.stringify(row)}`);
  console.log(JSON.stringify({ databaseId, databaseName, imported: manifest.recordCount, published: row.published }));
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
