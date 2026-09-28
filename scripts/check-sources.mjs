import fs from "node:fs/promises";

const monitors = JSON.parse(
  await fs.readFile(new URL("../data/source-monitors.json", import.meta.url), "utf8"),
);

const failures = [];
const warnings = [];
const queue = [...monitors];
const concurrency = 5;

function record(monitor, message, definitive = false) {
  if (definitive && monitor.strict !== false) failures.push(monitor.name + ": " + message);
  else warnings.push(monitor.name + ": " + message);
}

async function check(monitor) {
  try {
    const response = await fetch(monitor.url, {
      headers: { "User-Agent": "MyNigeriaGuide-SourceMonitor/1.0" },
      signal: AbortSignal.timeout(15000),
      redirect: "follow",
    });

    if (response.status === 404 || response.status === 410) {
      record(monitor, "HTTP " + response.status, true);
      return;
    }

    if (response.status === 401 || response.status === 403 || response.status === 429 || response.status >= 500) {
      record(monitor, "source not reliably readable by runner (HTTP " + response.status + ")");
      return;
    }

    if (!response.ok) {
      record(monitor, "HTTP " + response.status);
      return;
    }

    const body = (await response.text()).replace(/\s+/g, " ");
    const expectedAll = monitor.expectedAll ?? [];
    const expectedAny = monitor.expectedAny ?? [];

    const missingAll = expectedAll.filter((value) => !body.includes(value));
    const anySatisfied = expectedAny.length === 0 || expectedAny.some((value) => body.includes(value));

    if (missingAll.length || !anySatisfied) {
      record(
        monitor,
        "expected source markers changed or were not rendered" +
          (missingAll.length ? " (missing: " + missingAll.join(", ") + ")" : ""),
        true,
      );
      return;
    }

    console.log("OK " + monitor.name);
  } catch (error) {
    record(monitor, error instanceof Error ? error.message : String(error));
  }
}

async function worker() {
  while (queue.length) {
    const monitor = queue.shift();
    if (monitor) await check(monitor);
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));

if (warnings.length) {
  console.warn("\nSource warnings requiring periodic human review:");
  for (const warning of warnings.sort()) console.warn("- " + warning);
}

if (failures.length) {
  console.error("\nMyNigeriaGuide definitive source review required:");
  for (const failure of failures.sort()) console.error("- " + failure);
  process.exit(1);
}

console.log("\nNo definitive monitored source breakages detected.");
