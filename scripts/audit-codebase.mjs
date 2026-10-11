/**
 * Read-only repository dependency inventory; it NEVER deletes candidates.
 * Run manually: node scripts/audit-codebase.mjs [--json]
 *
 * Import-graph reachability is evidence for review, not proof of dead code:
 * Next.js conventions, computed imports, worker entrypoints and CLI scripts
 * can reference modules outside the static graph.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const CODE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const MODULE_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".css"];
const SKIP_DIRECTORIES = new Set([
  ".git", ".next", ".vinext", ".wrangler", "node_modules", "dist", "coverage", "test-results", "playwright-report",
]);

function collectFiles(rootDir) {
  const result = [];
  function visit(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!SKIP_DIRECTORIES.has(entry.name)) visit(path.join(dir, entry.name));
      } else if (entry.isFile()) {
        result.push(path.relative(rootDir, path.join(dir, entry.name)).split(path.sep).join("/"));
      }
    }
  }
  visit(rootDir);
  return result.sort();
}

function moduleReferences(source, filename) {
  const kind = filename.endsWith(".tsx") || filename.endsWith(".jsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const file = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, kind);
  const references = [];
  let nonLiteralImports = 0;
  function walk(node) {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier) {
      if (ts.isStringLiteralLike(node.moduleSpecifier)) references.push(node.moduleSpecifier.text);
    }
    if (ts.isCallExpression(node) && (
      node.expression.kind === ts.SyntaxKind.ImportKeyword ||
      (ts.isIdentifier(node.expression) && node.expression.text === "require")
    )) {
      if (node.arguments.length === 1 && ts.isStringLiteralLike(node.arguments[0])) {
        references.push(node.arguments[0].text);
      } else {
        nonLiteralImports++;
      }
    }
    ts.forEachChild(node, walk);
  }
  walk(file);
  return { references, nonLiteralImports };
}

function resolveLocalImport(rootDir, from, specifier, allFiles) {
  if (!specifier.startsWith("@/") && !specifier.startsWith(".")) return null;
  const base = specifier.startsWith("@/")
    ? specifier.slice(2)
    : path.posix.normalize(path.posix.join(path.posix.dirname(from), specifier));
  const attempts = [base, ...MODULE_EXTENSIONS.map((ext) => base + ext),
    ...MODULE_EXTENSIONS.map((ext) => base + "/index" + ext)];
  return attempts.find((candidate) => allFiles.has(candidate)) ?? null;
}

function reachable(roots, graph) {
  const seen = new Set();
  const todo = [...roots];
  while (todo.length) {
    const current = todo.pop();
    if (!current || seen.has(current)) continue;
    seen.add(current);
    for (const dependency of graph.get(current) ?? []) todo.push(dependency);
  }
  return seen;
}

function isNextEntry(file) {
  return file.startsWith("app/") &&
    /(?:^|\/)(?:page|layout|route|template|loading|error|global-error|not-found|default|robots|manifest|icon|opengraph-image|twitter-image|sitemap)\.(?:ts|tsx|js|jsx)$/.test(file);
}

export function auditCodebase(rootDir = process.cwd()) {
  const files = collectFiles(rootDir);
  const allFiles = new Set(files);
  const graph = new Map();
  const unresolved = [];
  const unknownDynamicImports = [];
  const fileSizes = [];

  for (const file of files) {
    const absolute = path.join(rootDir, file);
    const size = fs.statSync(absolute).size;
    fileSizes.push({ file, bytes: size });
    if (!CODE_EXTENSIONS.has(path.extname(file))) continue;
    const source = fs.readFileSync(absolute, "utf8");
    const { references, nonLiteralImports } = moduleReferences(source, file);
    if (nonLiteralImports) unknownDynamicImports.push({ file, count: nonLiteralImports });
    const imports = new Set();
    for (const name of references) {
      if (!name.startsWith("@/") && !name.startsWith(".")) continue;
      const resolved = resolveLocalImport(rootDir, file, name, allFiles);
      if (resolved) imports.add(resolved);
      else unresolved.push({ file, specifier: name });
    }
    graph.set(file, imports);
  }

  const productionRoots = files.filter((file) =>
    isNextEntry(file) || file === "instrumentation-client.ts" || file === "app/globals.css");
  const toolingRoots = files.filter((file) =>
    file.startsWith("scripts/") || file.startsWith("tools/") ||
    file.startsWith(".github/scripts/") || /^(?:next|vite|playwright|wrangler)\.config\./.test(file));
  const testRoots = files.filter((file) => file.startsWith("tests/") && CODE_EXTENSIONS.has(path.extname(file)));
  const production = reachable(productionRoots, graph);
  const tooling = reachable(toolingRoots, graph);
  const tests = reachable(testRoots, graph);

  // Never list route conventions, scripts, assets or generated data as 'dead'.
  const sharedModules = files.filter((file) =>
    (file.startsWith("lib/") || file.startsWith("components/")) &&
    CODE_EXTENSIONS.has(path.extname(file)));
  const reviewCandidates = sharedModules
    .filter((file) => !production.has(file) && !tooling.has(file) && !tests.has(file));
  const toolingOnly = sharedModules
    .filter((file) => !production.has(file) && (tooling.has(file) || tests.has(file)));

  return {
    inventory: {
      files: files.length,
      bytes: fileSizes.reduce((sum, item) => sum + item.bytes, 0),
      codeFiles: [...graph.keys()].length,
      productionEntrypoints: productionRoots.length,
      modulesReachableFromProduction: production.size,
      toolingEntrypoints: toolingRoots.length,
      testEntrypoints: testRoots.length,
    },
    largestFiles: fileSizes.sort((a, b) => b.bytes - a.bytes).slice(0, 20),
    reviewCandidates,
    toolingOnly,
    unresolvedLocalImports: unresolved,
    unknownDynamicImports,
    warning: "Static import-graph results are candidates for manual investigation, never automatic deletions.",
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = auditCodebase();
  if (process.argv.includes("--json")) {
    process.stdout.write(JSON.stringify(report, null, 2) + "\n");
  } else {
    console.log("MyNigeriaGuide read-only codebase inventory:", report.inventory);
    console.log("Largest source files:", report.largestFiles);
    console.log("Modules to investigate (not safe to delete automatically):", report.reviewCandidates);
    console.log("Tooling/test-only modules:", report.toolingOnly);
    console.log("Unresolved local imports:", report.unresolvedLocalImports);
    console.log("Computed imports needing review:", report.unknownDynamicImports);
    console.log(report.warning);
  }
}
