import fs from "node:fs/promises";

const monitors = JSON.parse(
  await fs.readFile(new URL("../data/source-monitors.json", import.meta.url), "utf8"),
);

const failures = [];

for (const monitor of monitors) {
  try {
    const response = await fetch(monitor.url, {
      headers: { "User-Agent": "GovGuideNigeria-SourceMonitor/1.0" },
      signal: AbortSignal.timeout(20000),
      redirect: "follow",
    });

    if (!response.ok) {
      failures.push(monitor.name + ": HTTP " + response.status);
      continue;
    }

    const body = (await response.text()).replace(/\s+/g, " ");
    const expectedAll = monitor.expectedAll ?? [];
    const expectedAny = monitor.expectedAny ?? [];

    const missingAll = expectedAll.filter((value) => !body.includes(value));
    const anySatisfied = expectedAny.length === 0 || expectedAny.some((value) => body.includes(value));

    if (missingAll.length || !anySatisfied) {
      failures.push(
        monitor.name +
          ": expected source markers changed or disappeared" +
          (missingAll.length ? " (missing: " + missingAll.join(", ") + ")" : ""),
      );
    } else {
      console.log("OK " + monitor.name);
    }
  } catch (error) {
    failures.push(monitor.name + ": " + (error instanceof Error ? error.message : String(error)));
  }
}

if (failures.length) {
  console.error("\nGovGuide source review required:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("\nAll monitored source markers are still present.");
