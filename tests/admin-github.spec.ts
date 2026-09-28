import fs from "node:fs";
import { Buffer } from "node:buffer";
import { expect, test } from "@playwright/test";
import { createServiceProposal } from "@/lib/admin-github";
import { validateServiceCatalog } from "@/lib/service-records";

const catalogText = fs.readFileSync(new URL("../data/services.json", import.meta.url), "utf8");
const catalog = validateServiceCatalog(JSON.parse(catalogText));

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("GitHub proposal retries a colliding branch name", async () => {
  const originalFetch = globalThis.fetch;
  const originalToken = process.env.MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN;
  process.env.MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN = "unit-test-token";

  let branchAttempts = 0;
  const calls: Array<{ url: string; method: string }> = [];

  globalThis.fetch = async (input, init = {}) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    const method = init.method ?? "GET";
    calls.push({ url, method });

    if (url.endsWith("/git/ref/heads/main") && method === "GET") {
      return json({ object: { sha: "main-sha" } });
    }
    if (url.includes("/contents/data/services.json?ref=main") && method === "GET") {
      return json({
        encoding: "base64",
        sha: "catalog-sha",
        content: Buffer.from(catalogText, "utf8").toString("base64"),
      });
    }
    if (url.endsWith("/git/refs") && method === "POST") {
      branchAttempts += 1;
      if (branchAttempts === 1) return json({ message: "Reference already exists" }, 422);
      return json({ ref: "refs/heads/admin/test" }, 201);
    }
    if (url.endsWith("/contents/data/services.json") && method === "PUT") {
      return json({ content: { sha: "updated-sha" } }, 200);
    }
    if (url.endsWith("/pulls") && method === "POST") {
      return json({ html_url: "https://github.com/eghosa001/nigeria/pull/123", number: 123 }, 201);
    }
    throw new Error("Unexpected GitHub request: " + method + " " + url);
  };

  try {
    const next = structuredClone(catalog[0]);
    next.summary += " branch retry regression";
    const result = await createServiceProposal(next.slug, next);
    expect(branchAttempts).toBe(2);
    expect(result.pullRequestNumber).toBe(123);
    expect(calls.some((call) => call.method === "PUT" && call.url.endsWith("/contents/data/services.json"))).toBe(true);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalToken == null) delete process.env.MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN;
    else process.env.MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN = originalToken;
  }
});

test("GitHub proposal cleanup accepts a 204 branch deletion response", async () => {
  const originalFetch = globalThis.fetch;
  const originalToken = process.env.MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN;
  process.env.MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN = "unit-test-token";

  let cleanupCalled = false;
  globalThis.fetch = async (input, init = {}) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
    const method = init.method ?? "GET";

    if (url.endsWith("/git/ref/heads/main") && method === "GET") return json({ object: { sha: "main-sha" } });
    if (url.includes("/contents/data/services.json?ref=main") && method === "GET") {
      return json({ encoding: "base64", sha: "catalog-sha", content: Buffer.from(catalogText).toString("base64") });
    }
    if (url.endsWith("/git/refs") && method === "POST") return json({ ref: "refs/heads/admin/test" }, 201);
    if (url.endsWith("/contents/data/services.json") && method === "PUT") return json({ content: { sha: "updated-sha" } });
    if (url.endsWith("/pulls") && method === "POST") return json({ message: "temporary failure" }, 500);
    if (method === "DELETE" && url.includes("/git/refs/heads/")) {
      cleanupCalled = true;
      return new Response(null, { status: 204 });
    }
    throw new Error("Unexpected GitHub request: " + method + " " + url);
  };

  try {
    const next = structuredClone(catalog[0]);
    next.summary += " cleanup regression";
    await expect(createServiceProposal(next.slug, next)).rejects.toThrow(/GitHub request failed/);
    expect(cleanupCalled).toBe(true);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalToken == null) delete process.env.MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN;
    else process.env.MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN = originalToken;
  }
});
