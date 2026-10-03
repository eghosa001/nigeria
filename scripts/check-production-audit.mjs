import { spawnSync } from "node:child_process";

const advisoryUrl = "https://github.com/advisories/GHSA-vfj7-8cjw-p6xm";
const result = spawnSync(
  process.platform === "win32" ? "npm.cmd" : "npm",
  ["audit", "--omit=dev", "--audit-level=high", "--json"],
  { encoding: "utf8" },
);

if (result.error) throw result.error;

let report;
try {
  report = JSON.parse(result.stdout || "{}");
} catch {
  console.error(result.stderr || result.stdout || "npm audit did not return valid JSON.");
  process.exit(result.status || 1);
}

const vulnerabilities = report.vulnerabilities ?? {};

function isOnlyKnownUnpatchedBracesIssue(name, trail = new Set()) {
  if (trail.has(name)) return true;
  const vulnerability = vulnerabilities[name];
  if (!vulnerability) return false;

  const nextTrail = new Set(trail);
  nextTrail.add(name);
  const via = Array.isArray(vulnerability.via) ? vulnerability.via : [];
  if (!via.length) return false;

  return via.every((item) => {
    if (typeof item === "string") return isOnlyKnownUnpatchedBracesIssue(item, nextTrail);
    return item?.url === advisoryUrl && item?.name === "braces";
  });
}

const blocking = Object.entries(vulnerabilities).filter(([name, vulnerability]) => {
  if (!["high", "critical"].includes(vulnerability.severity)) return false;
  return !isOnlyKnownUnpatchedBracesIssue(name);
});

if (blocking.length) {
  console.error("Blocking production dependency vulnerabilities:");
  for (const [name, vulnerability] of blocking) {
    console.error("- " + name + " (" + vulnerability.severity + ")");
  }
  process.exit(1);
}

const allowed = Object.entries(vulnerabilities)
  .filter(([name, vulnerability]) =>
    ["high", "critical"].includes(vulnerability.severity) &&
    isOnlyKnownUnpatchedBracesIssue(name)
  )
  .map(([name]) => name);

if (allowed.length) {
  console.warn(
    "Temporarily allowing only " + advisoryUrl +
    " through its transitive chain because the advisory currently has no patched braces release. A new unrelated high/critical advisory still fails CI."
  );
  console.warn("Affected dependency chain: " + allowed.join(", "));
} else {
  console.log("No high or critical production dependency vulnerabilities found.");
}
