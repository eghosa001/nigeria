import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  goalFrom, providers, selectProvider, evidence, callProvider,
  coordinate, markdownReport, writeArtifacts,
} from "../scripts/agent-hub.mjs";

test("goal is length-limited, and its default preserves no-filler editorial policy", () => {
  assert.match(goalFrom(""), /Do not add filler/);
  assert.throws(() => goalFrom("a".repeat(801)), /800/);
  assert.throws(() => goalFrom("\u0000"), /printable/);
});

test("provider routing prefers independent models when configured", () => {
  assert.deepEqual(providers({ GEMINI_API_KEY: "x", GROQ_API_KEY: "y" }), ["gemini", "groq"]);
  assert.equal(selectProvider("research", ["gemini", "groq"]), "gemini");
  assert.equal(selectProvider("engineering", ["gemini", "groq"]), "groq");
  assert.equal(selectProvider("reviewer", ["gemini"]), "gemini");
});

test("context uses a fixed allowlist instead of environment secrets", () => {
  const root = mkdtempSync(join(tmpdir(), "agent-hub-test-"));
  mkdirSync(join(root, "docs"));
  writeFileSync(join(root, "package.json"), JSON.stringify({
    scripts: { "check:content": "true", "audit:publisher": "true" }
  }));
  writeFileSync(join(root, "README.md"), "public information");
  writeFileSync(join(root, "docs/SEO_GROWTH_EXECUTION.md"), "Search priorities");
  const context = evidence(root);
  assert.match(context, /check:content/);
  assert.match(context, /Search priorities/);
  assert.doesNotMatch(context, /SECRET_TOKEN/);
});

test("no keys produces an honest setup report without attempting network calls", async () => {
  const result = await coordinate({
    env: { AGENT_GOAL: "Review code" },
    fetcher: async () => { throw new Error("Unexpected network request"); },
  });
  assert.equal(result.status, "setup_required");
  assert.equal(result.agents.length, 0);
  assert.match(markdownReport(result), /not an AI review/);
});

test("Gemini and Groq requests use fixed trusted endpoints and parse result texts", async () => {
  const requests = [];
  const fetcher = async (url, options) => {
    requests.push({ url, options });
    return {
      ok: true,
      json: async () => url.includes("googleapis")
        ? { candidates: [{ content: { parts: [{ text: "Gemini response" }] } }] }
        : { choices: [{ message: { content: "Groq response" } }] },
    };
  };
  const env = { GEMINI_API_KEY: "not-for-logs", GROQ_API_KEY: "also-not-for-logs" };
  const a = await callProvider("gemini", "hello", env, fetcher);
  const b = await callProvider("groq", "hello", env, fetcher);
  assert.equal(a.text, "Gemini response");
  assert.equal(b.text, "Groq response");
  assert.match(requests[0].url, /^https:\/\/generativelanguage\.googleapis\.com\//);
  assert.match(requests[1].url, /^https:\/\/api\.groq\.com\//);
  assert.equal(requests[0].options.headers["x-goog-api-key"], "not-for-logs");
  assert.equal(requests[1].options.headers.Authorization, "Bearer also-not-for-logs");
});

test("three specialists run first, then the reviewer uses their findings", async () => {
  const root = mkdtempSync(join(tmpdir(), "agent-hub-test-"));
  mkdirSync(join(root, "docs"));
  writeFileSync(join(root, "package.json"), JSON.stringify({ scripts: { typecheck: "tsc" } }));
  let calls = 0;
  const fetcher = async (_url, options) => {
    calls += 1;
    const body = JSON.parse(options.body);
    const prompt = body.contents?.[0]?.parts?.[0]?.text || body.messages?.[0]?.content;
    if (prompt.includes("Independently challenge")) {
      assert.match(prompt, /OTHER AGENT FINDINGS/);
    }
    return {
      ok: true,
      json: async () => ({ candidates: [{ content: { parts: [{ text: "A candidate requiring review" }] } }] }),
    };
  };
  const result = await coordinate({ root, env: { GEMINI_API_KEY: "fake" }, fetcher });
  assert.equal(result.status, "review_only");
  assert.equal(calls, 4);
  assert.deepEqual(result.agents.map((a) => a.role), ["research", "engineering", "seo", "reviewer"]);
  const outDir = join(root, "out");
  writeArtifacts(result, outDir);
  assert.equal(JSON.parse(readFileSync(join(outDir, "review.json"), "utf8")).agents.length, 4);
  assert.match(readFileSync(join(outDir, "review.md"), "utf8"), /not verified facts/);
});

test("model failure does not masquerade as successful review", async () => {
  const root = mkdtempSync(join(tmpdir(), "agent-hub-test-"));
  writeFileSync(join(root, "package.json"), "{}");
  const result = await coordinate({
    root, env: { GEMINI_API_KEY: "fake" },
    fetcher: async () => ({ ok: false, status: 429 }),
  });
  assert.equal(result.status, "providers_unavailable");
  assert.equal(result.agents.every((a) => a.status === "failed"), true);
  assert.doesNotMatch(JSON.stringify(result), /fake/);
});
