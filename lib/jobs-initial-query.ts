/** Only deep-linked, filtered Jobs views need an immediate API request.
 * The canonical first page was already rendered on the server. */
export type InitialJobsQuery = {
  query: string;
  sector: string;
  status: string;
  location: string;
  profession: string;
  page: number;
};

export function needsInitialJobsQuery(filters: InitialJobsQuery, serverPage = 1) {
  return Boolean(
    filters.query.trim() ||
    filters.sector !== "All" ||
    filters.status !== "all" ||
    filters.location !== "all" ||
    filters.profession !== "all" ||
    filters.page !== serverPage
  );
}
