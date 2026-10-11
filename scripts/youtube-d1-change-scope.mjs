// Exact integration-only surface: unrelated changes fall through to normal CI.
import fs from 'node:fs';
const paths = new Set([
  'lib/youtube-d1-repository.ts', 'lib/youtube-server-store.ts', 'lib/youtube-detail.ts',
  'app/entertainment/youtube/page.tsx', 'app/entertainment/youtube/page/[page]/page.tsx',
  'app/entertainment/youtube/[videoId]/page.tsx',
  'tests/youtube-d1-query.test.ts', 'tests/youtube-server-store.test.ts',
  'scripts/verify-youtube-d1-queries.ts', 'scripts/youtube-d1-change-scope.mjs',
  'scripts/check-youtube-d1-types.mjs',
  '.github/workflows/ci.yml', '.github/workflows/ui-qa.yml',
  '.github/workflows/cloudflare-qa.yml', '.github/workflows/live-qa.yml',
  'docs/YOUTUBE_D1_STAGING.md',
]);
const changed = (process.argv[2] ?? '').trim().split(/\r?\n/).filter(Boolean);
const staticDefault = fs.readFileSync('lib/youtube-server-store.ts', 'utf8')
  .includes("export const youtubeServerStore = createYouTubeServerStore({ mode: 'static' });");
process.exit(staticDefault && changed.some(p => /youtube-(d1|server-store)/.test(p)) && changed.every(p => paths.has(p)) ? 0 : 1);
