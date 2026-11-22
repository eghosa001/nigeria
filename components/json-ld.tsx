import { canonicalGuidePath, canonicalGuideUrl } from "@/lib/seo-routes";

function canonicalJsonLdValue(key: string, value: unknown) {
  if (typeof value !== "string" || !["url", "item", "@id", "sameAs", "mainEntityOfPage"].includes(key)) return value;
  if (value.startsWith("/")) return canonicalGuidePath(value);
  try {
    const parsed = new URL(value);
    if (parsed.hostname === "mynigeriaguide.com" || parsed.hostname === "localhost") {
      return canonicalGuideUrl(value);
    }
  } catch {
    // Not a first-party URL.
  }
  return value;
}

export function JsonLd({ data }: { data: Record<string, unknown> | Array<Record<string, unknown>> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, canonicalJsonLdValue).replace(/</g, "\\u003c") }}
    />
  );
}
