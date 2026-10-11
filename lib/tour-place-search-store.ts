/**
 * Tour catalog migration seam. Only global-search place previews use this
 * adapter for now; /explore guides, directory and sitemap remain canonical.
 * TOUR_PLACES_D1_CUTOVER is deliberately unset in production.
 */
import { queryPublishedTourPlaces, type TourD1Database } from "./tour-place-d1-repository";
import type { ExplorePlace } from "./explore-places";

type StoreOption = { mode: "static" } | { mode: "d1"; db: TourD1Database } | { mode: "runtime" };

export function createTourPlaceSearchStore(option: StoreOption) {
  return {
    async search(query: string): Promise<
      { mode: "static"; places: ExplorePlace[] } | { mode: "d1"; places: ExplorePlace[] }
    > {
      if (option.mode === "static") {
        const { explorePlaces } = await import("./explore-places");
        return { mode: "static", places: explorePlaces };
      }
      let db: TourD1Database | null = option.mode === "d1" ? option.db : null;
      if (option.mode === "runtime" &&
          process.env.NODE_ENV === "production" &&
          process.env.NEXT_PHASE !== "phase-production-build") {
        let workers: { env: { CONTENT_DB?: TourD1Database; TOUR_PLACES_D1_CUTOVER?: string } } | null = null;
        try { workers = await import("cloudflare:workers"); } catch { /* Node SSR does not provide Worker bindings. */ }
        const env = workers?.env as {
          CONTENT_DB?: TourD1Database;
          TOUR_PLACES_D1_CUTOVER?: string;
        };
        if (env?.TOUR_PLACES_D1_CUTOVER === "enabled") {
          if (!env.CONTENT_DB) throw new Error("Tour production D1 cutover requires CONTENT_DB.");
          db = env.CONTENT_DB;
        }
      }
      if (!db) {
        const { explorePlaces } = await import("./explore-places");
        return { mode: "static", places: explorePlaces };
      }
      const result = await queryPublishedTourPlaces(db, { q: query, pageSize: 12 });
      return { mode: "d1", places: result.places };
    },
  };
}

export const tourPlaceSearchStore = createTourPlaceSearchStore({ mode: "runtime" });
