// Conservative inventory export: no metadata is rewritten from a crawl alone.
// Verified Search Console queries and editorial replacements can be joined later.
export const INVENTORY_COLUMNS = [
  "url", "pillar", "page_type", "indexing_eligibility", "http_status",
  "previous_title", "new_title", "previous_description", "new_description",
  "primary_keyword", "secondary_keyword_cluster", "search_intent",
  "canonical", "robots", "h1", "og_title", "og_description", "og_image", "og_url",
  "twitter_title", "twitter_description", "twitter_image", "schema_types",
  "source_evidence", "reason_for_modification", "validation_status", "deployment_status"
];

export function identifyPage(url) {
  const pathname = new URL(url).pathname;
  if (pathname.startsWith("/services/")) return ["Services Guide", "service guide"];
  if (pathname === "/services") return ["Services Guide", "category"];
  if (pathname.startsWith("/jobs/")) return ["Jobs & Careers", "jobs/career detail"];
  if (pathname === "/jobs") return ["Jobs & Careers", "category"];
  if (pathname.startsWith("/explore/")) return ["Tour Nigeria", "travel detail"];
  if (pathname === "/explore") return ["Tour Nigeria", "category"];
  if (pathname.startsWith("/entertainment/movies/")) return ["Movies & Entertainment", "movie detail"];
  if (pathname.startsWith("/entertainment/people/")) return ["Movies & Entertainment", "person profile"];
  if (pathname.startsWith("/entertainment/")) return ["Movies & Entertainment", "entertainment detail"];
  if (pathname === "/entertainment") return ["Movies & Entertainment", "category"];
  return ["Sitewide", pathname === "/" ? "homepage" : "other"];
}

export function mapSeoInventory(pages, summary, crawledAt, discovery = "sitemap") {
  const duplicated = (key) => new Set((summary[key] || []).flatMap((group) => group.urls));
  const titleDuplicates = duplicated("duplicateTitles");
  const descriptionDuplicates = duplicated("duplicateDescriptions");
  return pages.map((page) => {
    const [pillar, pageType] = identifyPage(page.url);
    const reasons = (page.issues || [])
      .filter((issue) => ["http-status", "missing-title-in-head", "missing-description",
        "missing-canonical", "invalid-canonical", "canonical-differs", "sitemap-noindex",
        "invalid-jsonld", "missing-head", "generic-og-title", "generic-twitter-title",
        "og-url-differs"].includes(issue.code))
      .map((issue) => issue.code);
    if (titleDuplicates.has(page.url)) reasons.push("duplicate-title");
    if (descriptionDuplicates.has(page.url)) reasons.push("duplicate-description");
    if (!page.title) reasons.push("empty-title");
    if (!page.description) reasons.push("empty-description");
    const requiresReview = reasons.length > 0;
    // A social-sharing defect does not justify rewriting a strong search
    // title/description. Preserve each field unless that field is defective.
    const titleNeedsReview = reasons.some((reason) =>
      ["missing-title-in-head", "empty-title", "duplicate-title"].includes(reason));
    const descriptionNeedsReview = reasons.some((reason) =>
      ["missing-description", "empty-description", "duplicate-description"].includes(reason));
    return {
      url: page.url,
      pillar,
      page_type: pageType,
      // This is a crawl eligibility assessment, not Google's actual indexed state.
      indexing_eligibility: page.status !== 200 ? "HTTP error" :
        discovery === "sitemap"
          ? (page.indexable ? "eligible in sitemap; indexing unverified" : "noindex in sitemap")
          : (page.indexable ? "linked off sitemap; indexing unverified" : "linked off sitemap; noindex"),
      http_status: page.status,
      previous_title: page.title || "",
      new_title: titleNeedsReview ? "" : page.title || "",
      previous_description: page.description || "",
      new_description: descriptionNeedsReview ? "" : page.description || "",
      primary_keyword: "",
      secondary_keyword_cluster: "",
      search_intent: "",
      canonical: page.canonical || "",
      robots: page.robots || "",
      h1: page.h1 || "",
      og_title: page.ogTitle || "",
      og_description: page.ogDescription || "",
      og_image: page.ogImage || "",
      og_url: page.ogUrl || "",
      twitter_title: page.twitterTitle || "",
      twitter_description: page.twitterDescription || "",
      twitter_image: page.twitterImage || "",
      schema_types: (page.schema?.types || []).join("; "),
      source_evidence: (discovery === "sitemap" ? "Sitemap + HTTP crawl " : "Internal-link discovery + HTTP crawl ") + crawledAt,
      reason_for_modification: reasons.join("; ") || "No automated metadata defect; retain pending performance review",
      validation_status: requiresReview ? "review required" : "automated crawl passed",
      deployment_status: "unchanged (snapshot)"
    };
  });
}

export function recordsToCsv(records, columns = INVENTORY_COLUMNS) {
  const quote = (value) => '"' + String(value ?? "").replaceAll('"', '""').replace(/[\r\n]+/g, " ") + '"';
  return [columns.map(quote).join(","), ...records.map((record) => columns.map((key) => quote(record[key])).join(","))].join("\n") + "\n";
}
