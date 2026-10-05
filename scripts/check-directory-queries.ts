import { publicServiceListings } from "../lib/data";
import { entertainmentTitles } from "../lib/entertainment";
import { queryEntertainmentDirectory, ENTERTAINMENT_DIRECTORY_PAGE_SIZE } from "../lib/entertainment-query";
import { queryServiceDirectory, SERVICE_DIRECTORY_PAGE_SIZE } from "../lib/service-query";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const services = queryServiceDirectory();
assert(services.total === publicServiceListings.length, "Service directory total must match published listings.");
assert(services.items.length <= SERVICE_DIRECTORY_PAGE_SIZE, "Service directory must stay page-bounded.");
assert(queryServiceDirectory({ q: "passport" }).total > 0, "Service search must find passport guides.");
assert(queryServiceDirectory({ category: "Education" }).items.every((item) => item.category === "Education"), "Service category filtering must be exact.");
if (services.totalPages > 1) {
  assert(queryServiceDirectory({ page: 2 }).page === 2, "Service directory must support server page 2.");
}

const movies = queryEntertainmentDirectory();
assert(movies.total === entertainmentTitles.length, "Movie directory total must match curated titles.");
assert(movies.items.length <= ENTERTAINMENT_DIRECTORY_PAGE_SIZE, "Movie directory must stay page-bounded.");
const blackMarket = queryEntertainmentDirectory({ q: "Black Market" });
assert(blackMarket.items[0]?.slug === "black-market-2026", "Exact movie-title search should rank first.");
assert(
  queryEntertainmentDirectory({ platform: "Netflix" }).items.every((item) =>
    item.watchLinks.some((link) => link.platform === "Netflix")
  ),
  "Movie platform filtering must be exact.",
);
if (movies.totalPages > 1) {
  assert(queryEntertainmentDirectory({ page: 2 }).page === 2, "Movie directory must support server page 2.");
}

await Promise.all([
  import("../app/services/page"),
  import("../app/api/services/route"),
  import("../components/service-directory"),
  import("../app/entertainment/movies/page"),
  import("../app/api/entertainment/movies/route"),
  import("../components/entertainment-catalog"),
]);

console.log(
  "Directory query checks passed:",
  services.total + " services,",
  movies.total + " curated movies.",
);
