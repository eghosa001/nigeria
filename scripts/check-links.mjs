import fs from "node:fs/promises";

const files = ["data/services.json", "data/services-private-extended.json", "lib/offices.ts", "lib/official-links.ts", "data/updates.ts"];
const urls = new Set();

for (const file of files) {
  const content = await fs.readFile(new URL("../" + file, import.meta.url), "utf8");
  for (const match of content.matchAll(/https:\/\/[^"'\s)]+/g)) {
    urls.add(match[0].replace(/[;,]+$/, ""));
  }
}

const definitiveFailures = [];
const warnings = [];
const queue = [...urls];
const concurrency = 6;

async function check(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "User-Agent": "MyNigeriaGuide-LinkAudit/1.0" },
      signal: AbortSignal.timeout(15000),
    });

    if (response.status === 404 || response.status === 410) {
      definitiveFailures.push(url + " -> HTTP " + response.status);
      return;
    }

    if (response.status >= 400) {
      warnings.push(url + " -> HTTP " + response.status);
      return;
    }

    console.log("OK", response.status, url);
  } catch (error) {
    warnings.push(url + " -> " + (error instanceof Error ? error.message : String(error)));
  }
}

async function worker() {
  while (queue.length) {
    const url = queue.shift();
    if (url) await check(url);
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));

console.log("\nChecked " + urls.size + " unique official/source URLs.");

if (warnings.length) {
  console.warn("\nWarnings requiring human review:");
  for (const warning of warnings) console.warn("- " + warning);
}

if (definitiveFailures.length) {
  console.error("\nDefinitively broken links:");
  for (const failure of definitiveFailures) console.error("- " + failure);
  process.exit(1);
}
