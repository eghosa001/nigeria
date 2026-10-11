import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const script = new URL('../scripts/write-wrangler-deploy-config.mjs', import.meta.url);
const source = JSON.parse(fs.readFileSync(new URL('../wrangler.jsonc', import.meta.url), 'utf8'));

test('deploy pointer is written only when generated D1 identity matches source', () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'mng-deploy-config-'));
  try {
    fs.mkdirSync(path.join(cwd, 'dist/server'), { recursive: true });
    fs.writeFileSync(path.join(cwd, 'wrangler.jsonc'), JSON.stringify(source));
    const binding = source.d1_databases[0];
    const cases = [undefined, [], [{ ...binding, database_id: '47fdffad-9513-484f-94be-4b176662cc71' }],
      [{ ...binding, binding: 'DB' }], [{ ...binding, database_name: 'wrong' }], [binding, binding]];
    for (const d1_databases of cases) {
      fs.writeFileSync(path.join(cwd, 'dist/server/wrangler.json'), JSON.stringify({ d1_databases }));
      const run = spawnSync(process.execPath, [fileURLToPath(script)], { cwd, encoding: 'utf8' });
      assert.notEqual(run.status, 0, JSON.stringify(d1_databases));
      assert.match(run.stderr, /D1 binding/);
      assert.equal(fs.existsSync(path.join(cwd, '.wrangler/deploy/config.json')), false);
    }
    fs.writeFileSync(path.join(cwd, 'dist/server/wrangler.json'), JSON.stringify({ d1_databases: [binding] }));
    const run = spawnSync(process.execPath, [fileURLToPath(script)], { cwd, encoding: 'utf8' });
    assert.equal(run.status, 0, run.stderr);
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(cwd, '.wrangler/deploy/config.json'), 'utf8')),
      { configPath: '../../dist/server/wrangler.json' });
  } finally { fs.rmSync(cwd, { recursive: true, force: true }); }
});

test('production-only CI scope rejects unrelated files, config edits and cutover', () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'mng-production-scope-'));
  const scope = fileURLToPath(new URL('../scripts/youtube-d1-production-scope.mjs', import.meta.url));
  try {
    fs.mkdirSync(path.join(cwd, 'lib'));
    const store = path.join(cwd, 'lib/youtube-server-store.ts');
    fs.writeFileSync(store, "export const youtubeServerStore = createYouTubeServerStore({ mode: 'static' });");
    fs.writeFileSync(path.join(cwd, 'wrangler.jsonc'), JSON.stringify(source));
    const run = changed => spawnSync(process.execPath, [scope, changed], { cwd }).status;
    assert.equal(run('wrangler.jsonc\nscripts/youtube-d1-staging-runner.mjs'), 0);
    assert.equal(run('.github/workflows/live-qa.yml\nscripts/youtube-d1-production-scope.mjs\ntests/wrangler-deploy-config.test.mjs'), 0);
    assert.notEqual(run('wrangler.jsonc\napp/layout.tsx'), 0);
    assert.notEqual(run(''), 0);
    fs.writeFileSync(path.join(cwd, 'wrangler.jsonc'), JSON.stringify({ ...source, name: 'other-worker' }));
    assert.notEqual(run('wrangler.jsonc'), 0);
    fs.writeFileSync(path.join(cwd, 'wrangler.jsonc'), JSON.stringify(source));
    fs.writeFileSync(store, "export const youtubeServerStore = createYouTubeServerStore({ mode: 'd1', db });");
    assert.notEqual(run('wrangler.jsonc'), 0);
  } finally { fs.rmSync(cwd, { recursive: true, force: true }); }
});
