import fs from "node:fs";
import path from "node:path";

const distRoot = path.resolve("dist");
const candidates = [];

if (fs.existsSync(distRoot)) {
  for (const entry of fs.readdirSync(distRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const candidate = path.join(distRoot, entry.name, "wrangler.json");
    if (fs.existsSync(candidate)) candidates.push(candidate);
  }
}

const preferred = path.join(distRoot, "server", "wrangler.json");
const generatedConfig = fs.existsSync(preferred) ? preferred : candidates[0];

if (!generatedConfig) {
  throw new Error("No generated Wrangler config found under dist/*/wrangler.json");
}

// Validate the artifact actually deployed, not just the source configuration.
// Never silently deploy without the production database or with staging attached.
const source = JSON.parse(fs.readFileSync(path.resolve("wrangler.jsonc"), "utf8"));
const generated = JSON.parse(fs.readFileSync(generatedConfig, "utf8"));
const expectedBindings = source.d1_databases ?? [];
const actualBindings = generated.d1_databases ?? [];
if (!Array.isArray(expectedBindings) || !Array.isArray(actualBindings) ||
    expectedBindings.length !== actualBindings.length ||
    expectedBindings.some(expected => actualBindings.filter(actual => actual &&
      ["binding", "database_name", "database_id"].every(key => actual[key] === expected[key])).length !== 1)) {
  throw new Error("Generated D1 binding does not match source configuration; refusing deployment pointer.");
}

const deployDir = path.resolve(".wrangler", "deploy");
fs.mkdirSync(deployDir, { recursive: true });

const configPath = path.relative(deployDir, generatedConfig).split(path.sep).join("/");
fs.writeFileSync(
  path.join(deployDir, "config.json"),
  JSON.stringify({ configPath }, null, 2) + "\n",
);

console.log("Wrangler deploy config ->", configPath);
