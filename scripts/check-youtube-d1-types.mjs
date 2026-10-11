import ts from 'typescript';
import path from 'node:path';
import fs from 'node:fs';
const root = process.cwd();
const config = ts.readConfigFile('tsconfig.json', ts.sys.readFile).config;
const parsed = ts.parseJsonConfigFileContent({ ...config, include: [
  'lib/youtube-d1-repository.ts', 'lib/youtube-server-store.ts',
  'tests/youtube-d1-query.test.ts', 'tests/youtube-server-store.test.ts',
  'scripts/verify-youtube-d1-queries.ts',
], compilerOptions: { ...config.compilerOptions, incremental: false, plugins: [],
  types: ['node'], typeRoots: [path.resolve(process.env.D1_TYPE_ROOT ?? 'node_modules/@types')] } }, ts.sys, root);
const program = ts.createProgram(parsed.fileNames, parsed.options);
const diagnostics = ts.getPreEmitDiagnostics(program);
if (diagnostics.length) {
  console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCanonicalFileName: f => f, getCurrentDirectory: () => root, getNewLine: () => '\n',
  }));
  process.exitCode = 1;
}
// Templates only change which asynchronous reader supplies existing JSX. Check
// their syntax without installing/building the entire application in this job.
for (const file of ['app/entertainment/youtube/page.tsx',
  'app/entertainment/youtube/page/[page]/page.tsx', 'app/entertainment/youtube/[videoId]/page.tsx']) {
  const result = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    fileName: file, reportDiagnostics: true, compilerOptions: { jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
  });
  if (result.diagnostics?.length) { console.error(result.diagnostics); process.exitCode = 1; }
}
