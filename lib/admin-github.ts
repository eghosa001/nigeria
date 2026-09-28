import { Buffer } from "node:buffer";
import type { Service } from "@/lib/types";
import { validateServiceCatalog, validateServiceRecord } from "@/lib/service-records";

const OWNER = "eghosa001";
const REPO = "nigeria";
const API = "https://api.github.com/repos/" + OWNER + "/" + REPO;
const CONTENT_PATH = "data/services.json";

type GitHubFile = { content?: string; encoding?: string; sha?: string };
type GitHubRef = { object?: { sha?: string } };
type PullRequest = { html_url?: string; number?: number };

function token() {
  return process.env.MYNIGERIAGUIDE_GITHUB_ADMIN_TOKEN?.trim() ?? "";
}

export function githubAdminConfigured() {
  return Boolean(token());
}

async function github<T>(path: string, init: RequestInit = {}): Promise<T> {
  const secret = token();
  if (!secret) throw new Error("GitHub admin integration is not configured.");
  const response = await fetch(API + path, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: "Bearer " + secret,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "MyNigeriaGuide-Admin",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!response.ok) {
    const safe = await response.text().catch(() => "");
    throw new Error("GitHub request failed (" + response.status + ")" + (safe ? ": " + safe.slice(0, 300) : ""));
  }
  if (response.status === 204) return undefined as T;
  return await response.json() as T;
}

function branchName(slug: string) {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, "").slice(0, 14);
  const suffix = crypto.randomUUID().slice(0, 8);
  return "admin/" + slug + "-" + stamp + "-" + suffix;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function preserveJsonKeyOrder(current: unknown, next: unknown): unknown {
  if (Array.isArray(next)) {
    const currentArray = Array.isArray(current) ? current : [];
    return next.map((item, index) => preserveJsonKeyOrder(currentArray[index], item));
  }
  if (isRecord(next)) {
    const currentRecord = isRecord(current) ? current : {};
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(currentRecord)) {
      if (Object.prototype.hasOwnProperty.call(next, key)) {
        result[key] = preserveJsonKeyOrder(currentRecord[key], next[key]);
      }
    }
    for (const key of Object.keys(next)) {
      if (!Object.prototype.hasOwnProperty.call(result, key)) {
        result[key] = preserveJsonKeyOrder(undefined, next[key]);
      }
    }
    return result;
  }
  return next;
}

export function changedServiceFields(current: Service, next: Service) {
  const fields: (keyof Service)[] = [
    "title", "shortTitle", "summary", "category", "agencySlug", "feeLabel", "feeNote",
    "timeline", "status", "lastVerified", "officialPortal", "requirements", "steps",
    "notes", "sources", "searchTerms", "related",
  ];
  return fields.filter((field) => JSON.stringify(current[field]) !== JSON.stringify(next[field]));
}

export async function createServiceProposal(
  slug: string,
  proposed: Service,
): Promise<{ pullRequestUrl: string; pullRequestNumber: number; branch: string }> {
  const next = validateServiceRecord(proposed);
  if (next.slug !== slug) throw new Error("The service slug cannot be changed.");

  const [ref, file] = await Promise.all([
    github<GitHubRef>("/git/ref/heads/main"),
    github<GitHubFile>("/contents/" + CONTENT_PATH + "?ref=main"),
  ]);

  const mainSha = ref.object?.sha;
  const contentSha = file.sha;
  if (!mainSha || !contentSha || file.encoding !== "base64" || !file.content) {
    throw new Error("GitHub did not return the expected repository state.");
  }

  const decoded = Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8");
  const rawCatalog = JSON.parse(decoded) as unknown;
  const currentCatalog = validateServiceCatalog(rawCatalog);
  if (!Array.isArray(rawCatalog)) throw new Error("Service catalog is not an array.");
  const index = currentCatalog.findIndex((service) => service.slug === slug);
  if (index < 0) throw new Error("The service no longer exists on main.");

  const current = currentCatalog[index];
  const changes = changedServiceFields(current, next);
  if (changes.length === 0) throw new Error("No guide changes were detected.");

  const updated = [...rawCatalog];
  updated[index] = preserveJsonKeyOrder(rawCatalog[index], next);
  validateServiceCatalog(updated);
  let branch = branchName(slug);
  let branchCreated = false;

  try {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        await github("/git/refs", {
          method: "POST",
          body: JSON.stringify({ ref: "refs/heads/" + branch, sha: mainSha }),
          headers: { "Content-Type": "application/json" },
        });
        branchCreated = true;
        break;
      } catch (error) {
        if (attempt === 0 && error instanceof Error && /GitHub request failed \(422\)/.test(error.message)) {
          branch = branchName(slug);
          continue;
        }
        throw error;
      }
    }
    if (!branchCreated) throw new Error("GitHub could not create a unique review branch.");

    await github("/contents/" + CONTENT_PATH, {
      method: "PUT",
      body: JSON.stringify({
        message: "content: propose update to " + slug,
        content: Buffer.from(JSON.stringify(updated, null, 2) + "\n", "utf8").toString("base64"),
        sha: contentSha,
        branch,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const pr = await github<PullRequest>("/pulls", {
      method: "POST",
      body: JSON.stringify({
        title: "Update guide: " + next.shortTitle,
        head: branch,
        base: "main",
        body: [
          "Admin-submitted review change for **" + next.shortTitle + "**.",
          "",
          "**Changed fields:** " + changes.map((field) => "`" + field + "`").join(", "),
          "",
          "This proposal does not publish directly. Merge only after the repository quality checks are green and the official-source changes have been reviewed.",
        ].join("\n"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!pr.html_url || !pr.number) throw new Error("GitHub did not return the created pull request.");
    return { pullRequestUrl: pr.html_url, pullRequestNumber: pr.number, branch };
  } catch (error) {
    if (branchCreated) {
      await github("/git/refs/heads/" + encodeURIComponent(branch), { method: "DELETE" }).catch(() => undefined);
    }
    throw error;
  }
}
