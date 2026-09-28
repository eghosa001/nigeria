import type { Service, Source, VerificationStatus } from "@/lib/types";

const VALID_STATUSES = new Set<VerificationStatus>(["verified", "conflict", "review"]);

function record(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(label + " must be an object.");
  }
  return value as Record<string, unknown>;
}

function textValue(value: unknown, label: string, optional = false): string | undefined {
  if (value == null && optional) return undefined;
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(label + " must be a non-empty string.");
  }
  return value;
}

function stringList(value: unknown, label: string): string[] {
  if (!Array.isArray(value)) throw new Error(label + " must be an array.");
  return value.map((item, index) => {
    if (typeof item !== "string" || !item.trim()) {
      throw new Error(label + "[" + index + "] must be a non-empty string.");
    }
    return item;
  });
}

function httpsUrl(value: unknown, label: string, optional = false): string | undefined {
  const result = textValue(value, label, optional);
  if (result == null) return undefined;
  let parsed: URL;
  try {
    parsed = new URL(result);
  } catch {
    throw new Error(label + " must be a valid URL.");
  }
  if (parsed.protocol !== "https:") throw new Error(label + " must use HTTPS.");
  return result;
}

function validateSource(value: unknown, index: number): Source {
  const item = record(value, "sources[" + index + "]");
  return {
    label: textValue(item.label, "sources[" + index + "].label")!,
    agency: textValue(item.agency, "sources[" + index + "].agency")!,
    url: httpsUrl(item.url, "sources[" + index + "].url")!,
    lastChecked: textValue(item.lastChecked, "sources[" + index + "].lastChecked")!,
    ...(item.published == null ? {} : { published: textValue(item.published, "sources[" + index + "].published")! }),
  };
}

export function validateServiceRecord(value: unknown): Service {
  const item = record(value, "service");
  const status = textValue(item.status, "service.status") as VerificationStatus;
  if (!VALID_STATUSES.has(status)) throw new Error("service.status is invalid.");

  if (!Array.isArray(item.sources) || item.sources.length === 0) {
    throw new Error("service.sources must contain at least one source.");
  }

  const service: Service = {
    slug: textValue(item.slug, "service.slug")!,
    title: textValue(item.title, "service.title")!,
    shortTitle: textValue(item.shortTitle, "service.shortTitle")!,
    summary: textValue(item.summary, "service.summary")!,
    category: textValue(item.category, "service.category")!,
    agencySlug: textValue(item.agencySlug, "service.agencySlug")!,
    feeLabel: textValue(item.feeLabel, "service.feeLabel")!,
    ...(item.feeNote == null ? {} : { feeNote: textValue(item.feeNote, "service.feeNote")! }),
    ...(item.timeline == null ? {} : { timeline: textValue(item.timeline, "service.timeline")! }),
    status,
    lastVerified: textValue(item.lastVerified, "service.lastVerified")!,
    ...(item.officialPortal == null ? {} : { officialPortal: httpsUrl(item.officialPortal, "service.officialPortal")! }),
    requirements: stringList(item.requirements, "service.requirements"),
    steps: stringList(item.steps, "service.steps"),
    notes: stringList(item.notes, "service.notes"),
    sources: item.sources.map(validateSource),
    searchTerms: stringList(item.searchTerms, "service.searchTerms"),
    related: stringList(item.related, "service.related"),
  };

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(service.slug)) {
    throw new Error("service.slug must be a lowercase kebab-case slug.");
  }
  return service;
}

export function validateServiceCatalog(value: unknown): Service[] {
  if (!Array.isArray(value)) throw new Error("Service catalog must be an array.");
  const result = value.map(validateServiceRecord);
  const slugs = new Set<string>();
  for (const service of result) {
    if (slugs.has(service.slug)) throw new Error("Duplicate service slug: " + service.slug);
    slugs.add(service.slug);
  }
  return result;
}

export function serializeServiceCatalog(records: Service[]): string {
  const validated = validateServiceCatalog(records);
  return JSON.stringify(validated, null, 2) + "\n";
}
