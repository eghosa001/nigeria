/**
 * Published-only, server-side read boundary for the existing CONTENT_DB
 * tour_places + tour_place_search (FTS5) tables.
 * No import or bulk publication of draft/verified records is permitted.
 */
import type { ExplorePlace, ExplorePlaceKind } from "./explore-places";

type SqlValue = string | number | null;
export type TourD1Database = {
  prepare(sql: string): {
    bind(...values: SqlValue[]): {
      first<T extends object>(): Promise<T | null>;
      all<T extends object>(): Promise<{ results: T[] }>;
    };
  };
};

export type TourPlaceD1Query = {
  q?: string;
  kind?: ExplorePlaceKind;
  guideSlug?: string;
  state?: string;
  page?: number;
  pageSize?: number;
};

type TourPlaceRow = {
  slug: string;
  guide_slug: string;
  name: string;
  kind: string;
  state_or_fct: string;
  city_or_area: string | null;
  address: string;
  summary: string;
  cost_guidance: string;
  hours: string | null;
  phone: string | null;
  website: string | null;
  source_url: string;
  source_name: string;
  checked_at: string;
  editorial_status: string;
};

const kinds = new Set<string>(["attraction", "nature", "restaurant", "hotel", "shopping", "landmark"]);
const validSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_SEARCH_CHARS = 120;
const MAX_PAGE_SIZE = 24;
const MAX_PAGE = 1000;

/** FTS5 phrase-prefix operands: input never reaches MATCH as syntax/operators. */
export function safeTourFtsQuery(raw: string): string {
  if (raw.length > MAX_SEARCH_CHARS) throw new Error("Tour search query exceeds length limit.");
  const terms = raw.toLocaleLowerCase().match(/[\p{L}\p{N}]+/gu)?.slice(0, 8) ?? [];
  return terms.map((word) => '"' + word + '"*').join(" AND ");
}

export function tourPlaceQueryPlan(input: TourPlaceD1Query = {}) {
  const q = (input.q ?? "").trim();
  const clause = ["p.editorial_status = 'published'"];
  const params: SqlValue[] = [];
  const fts = safeTourFtsQuery(q);
  const usesFts = Boolean(fts);
  const join = usesFts ? " JOIN tour_place_search ON tour_place_search.rowid = p.id" : "";
  if (q && !usesFts) clause.push("0 = 1");
  if (usesFts) { clause.push("tour_place_search MATCH ?"); params.push(fts); }
  if (input.kind) {
    if (!kinds.has(input.kind)) throw new Error("Invalid Tour place kind.");
    clause.push("p.kind = ?");
    params.push(input.kind);
  }
  if (input.guideSlug) {
    if (!validSlug.test(input.guideSlug)) throw new Error("Invalid Tour guide slug.");
    clause.push("p.guide_slug = ?");
    params.push(input.guideSlug);
  }
  if (input.state) {
    const state = input.state.trim();
    if (state.length > 80) throw new Error("Invalid Tour state filter.");
    clause.push("p.state_or_fct = ?");
    params.push(state);
  }
  const from = "tour_places p" + join;
  const where = clause.join(" AND ");
  const order = usesFts
    ? "bm25(tour_place_search), p.checked_at DESC, p.slug ASC"
    : "p.checked_at DESC, p.slug ASC";
  return {
    countSql: "SELECT COUNT(*) AS total FROM " + from + " WHERE " + where,
    pageSql: `SELECT p.slug, p.guide_slug, p.name, p.kind, p.state_or_fct,
      p.city_or_area, p.address, p.summary, p.cost_guidance, p.hours,
      p.phone, p.website, p.source_url, p.source_name, p.checked_at, p.editorial_status
      FROM ${from} WHERE ${where} ORDER BY ${order} LIMIT ? OFFSET ?`,
    params,
  };
}

function toPlace(row: TourPlaceRow): ExplorePlace {
  if (row.editorial_status !== "published") throw new Error("Non-published Tour row returned.");
  if (!validSlug.test(row.slug) || !validSlug.test(row.guide_slug) || !kinds.has(row.kind)) {
    throw new Error("Invalid published Tour identity.");
  }
  if (!row.name?.trim() || !row.address?.trim() || !row.summary?.trim() ||
      !/^\d{4}-\d{2}-\d{2}$/.test(row.checked_at)) {
    throw new Error("Published Tour row is missing essential visitor information.");
  }
  const url = new URL(row.source_url);
  if (url.protocol !== "https:" || !url.hostname) throw new Error("Invalid Tour evidence source.");
  return {
    slug: row.slug,
    guideSlug: row.guide_slug,
    name: row.name,
    kind: row.kind as ExplorePlaceKind,
    area: row.city_or_area || row.state_or_fct,
    address: row.address,
    summary: row.summary,
    cost: row.cost_guidance || "Confirm current prices with the venue",
    hours: row.hours ?? undefined,
    phone: row.phone ?? undefined,
    website: row.website ?? undefined,
    source: { label: row.source_name || "Original source", href: row.source_url },
    checkedAt: row.checked_at,
    tags: [],
  };
}

/**
 * Never expose unpublished rows; FTS5 is used for nonempty queries.
 * An explicit cutover must demonstrate read and catalog/sitemap parity first.
 */
export async function queryPublishedTourPlaces(db: TourD1Database, input: TourPlaceD1Query = {}) {
  const plan = tourPlaceQueryPlan(input);
  const count = await db.prepare(plan.countSql).bind(...plan.params).first<{ total: number }>();
  if (!count || !Number.isSafeInteger(count.total) || count.total < 0) {
    throw new Error("Invalid Tour D1 total.");
  }
  const pageSize = Number.isSafeInteger(input.pageSize)
    ? Math.max(1, Math.min(MAX_PAGE_SIZE, input.pageSize as number)) : 12;
  const pageCount = Math.max(1, Math.ceil(count.total / pageSize));
  const requested = Number.isSafeInteger(input.page) && (input.page as number) > 0 ? input.page as number : 1;
  const page = Math.min(requested, pageCount);
  if (page > MAX_PAGE) throw new Error("Tour D1 deep pagination requires a cursor.");
  const rows = await db.prepare(plan.pageSql)
    .bind(...plan.params, pageSize, (page - 1) * pageSize)
    .all<TourPlaceRow>();
  if (rows.results.length > pageSize) throw new Error("Tour D1 exceeded page bound.");
  return { places: rows.results.map(toPlace), total: count.total, page, pageSize, pageCount };
}
