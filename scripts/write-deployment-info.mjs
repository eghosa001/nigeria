import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { patchVinextMetadata } from "./patch-vinext-head-metadata.mjs";

// Called by prebuild, prebuild:vinext and prebuild:next before Vinext loads.
// Fail the build if the pinned Vinext implementation cannot be safely patched.
console.log("Vinext head-metadata cache safeguard:", patchVinextMetadata());

function git(...args) {
  try {
    return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return "";
  }
}

const commit = process.env.WORKERS_CI_COMMIT_SHA || process.env.CF_PAGES_COMMIT_SHA || process.env.GITHUB_SHA || process.env.COMMIT_SHA || git("rev-parse", "HEAD") || "unknown";
const branch = process.env.WORKERS_CI_BRANCH || process.env.CF_PAGES_BRANCH || process.env.GITHUB_REF_NAME || git("rev-parse", "--abbrev-ref", "HEAD") || "unknown";
const payload = { commit, shortCommit: commit === "unknown" ? "unknown" : commit.slice(0, 12), branch, builtAt: new Date().toISOString() };

await mkdir("public", { recursive: true });
await writeFile("public/deployment.json", JSON.stringify(payload, null, 2) + "\n", "utf8");
console.log("Deployment marker: " + payload.shortCommit + " (" + payload.branch + ")");
