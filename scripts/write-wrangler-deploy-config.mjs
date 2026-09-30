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

const deployDir = path.resolve(".wrangler", "deploy");
fs.mkdirSync(deployDir, { recursive: true });

const configPath = path.relative(deployDir, generatedConfig).split(path.sep).join("/");
fs.writeFileSync(
  path.join(deployDir, "config.json"),
  JSON.stringify({ configPath }, null, 2) + "\n",
);

console.log("Wrangler deploy config ->", configPath);
