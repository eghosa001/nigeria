// Production registration/guard changes do not activate the public D1 adapter.
import fs from 'node:fs';
import { isDeepStrictEqual } from 'node:util';
const allowed = new Set([
  'wrangler.jsonc', 'scripts/youtube-d1-staging-runner.mjs',
  'scripts/write-wrangler-deploy-config.mjs', 'scripts/youtube-d1-production-scope.mjs',
  'tests/youtube-d1-staging-runner.test.mjs', 'tests/wrangler-deploy-config.test.mjs',
  '.github/workflows/ci.yml', '.github/workflows/ui-qa.yml', '.github/workflows/cloudflare-qa.yml',
  'docs/YOUTUBE_D1_PRODUCTION.md',
]);
const changed = (process.argv[2] ?? '').trim().split(/\r?\n/).filter(Boolean);
const config = JSON.parse(fs.readFileSync('wrangler.jsonc', 'utf8'));
const expected = {
  $schema: './node_modules/wrangler/config-schema.json', name: 'mynigeriaguide',
  main: 'vinext/server/app-router-entry', compatibility_date: '2026-09-23',
  compatibility_flags: ['nodejs_compat'], cache: { enabled: true },
  assets: { not_found_handling: 'none' }, observability: { enabled: true }, previews: {},
  d1_databases: [{ binding: 'CONTENT_DB', database_name: 'mynigeriaguide-content-production',
    database_id: '73b4490a-5242-4c31-be8d-36ba0c327d3c' }],
};
const staticDefault = fs.readFileSync('lib/youtube-server-store.ts', 'utf8')
  .includes("export const youtubeServerStore = createYouTubeServerStore({ mode: 'static' });");
process.exit(changed.length && changed.every(p => allowed.has(p)) &&
  changed.some(p => p === 'wrangler.jsonc' || p.startsWith('scripts/') || p.startsWith('tests/')) &&
  staticDefault && isDeepStrictEqual(config, expected) ? 0 : 1);
