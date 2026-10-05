// Jobs-only source audit; used by the focused Jobs Freshness workflow.
import fs from "node:fs/promises";

// This Jobs-specific audit also acts as a scope signal for focused Jobs-only deploy verification.
const files = ["lib/jobs.ts", "lib/job-scale-wave.ts", "lib/career-guides.ts"];
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
const concurrency = 8;

function errorCode(error) {
  if (!error || typeof error !== "object") return "";
  const direct = "code" in error ? String(error.code ?? "") : "";
  const cause = "cause" in error && error.cause && typeof error.cause === "object" && "code" in error.cause
    ? String(error.cause.code ?? "")
    : "";
  return direct || cause;
}

async function request(url) {
  return fetch(url, {
    method: "GET",
    redirect: "follow",
    headers: {
      "User-Agent": "MyNigeriaGuide-JobsLinkAudit/1.0",
      "Accept": "text/html,application/xhtml+xml,application/json;q=0.8,*/*;q=0.5",
      "Range": "bytes=0-4095",
    },
    signal: AbortSignal.timeout(20000),
  });
}

async function check(url) {
  let response;
  let lastError;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      response = await request(url);
      break;
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 800));
    }
  }

  if (!response) {
    const code = errorCode(lastError);
    const message = lastError instanceof Error ? lastError.message : String(lastError);
    if (code === "ENOTFOUND" || code === "EAI_AGAIN") {
      warnings.push(url + " -> DNS lookup failed in runner (" + code + "); verify through an independent public source before changing the URL");
    } else {
      warnings.push(url + " -> " + (code ? code + " " : "") + message);
    }
    return;
  }

  try {
    if (response.status === 404 || response.status === 410) {
      definitiveFailures.push(url + " -> HTTP " + response.status);
      return;
    }

    if (response.status === 401 || response.status === 403 || response.status === 429 || response.status >= 500) {
      warnings.push(url + " -> HTTP " + response.status + " (runner may be blocked or source temporarily unavailable)");
      return;
    }

    if (response.status >= 400) {
      warnings.push(url + " -> HTTP " + response.status);
      return;
    }

    const finalUrl = response.url || url;
    console.log("OK", response.status, url, finalUrl !== url ? "-> " + finalUrl : "");
  } finally {
    try {
      await response.body?.cancel();
    } catch {
      // The audit only needs response status and redirect destination.
    }
  }
}

async function worker() {
  while (queue.length) {
    const url = queue.shift();
    if (url) await check(url);
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));

console.log("\nChecked " + urls.size + " unique Jobs/Careers source URLs.");

if (warnings.length) {
  console.warn("\nWarnings requiring human review:");
  for (const warning of warnings.sort()) console.warn("- " + warning);
}

if (definitiveFailures.length) {
  console.error("\nDefinitively broken Jobs/Careers links:");
  for (const failure of definitiveFailures.sort()) console.error("- " + failure);
  process.exit(1);
}

console.log("\nNo definitive Jobs/Careers source breakages detected.");
