import { publicServiceListings, type PublicServiceListing } from "@/lib/data";
import { searchServices } from "@/lib/search";
import type { VerificationStatus } from "@/lib/types";

export const SERVICE_DIRECTORY_PAGE_SIZE = 24;

export type ServiceDirectorySort = "relevance" | "az" | "recent";
export type ServiceDirectoryStatus = "all" | Exclude<VerificationStatus, "review">;

export type ServiceDirectoryQuery = {
  q?: string;
  category?: string;
  status?: ServiceDirectoryStatus;
  sort?: ServiceDirectorySort;
  page?: number;
  pageSize?: number;
};

export type ServiceDirectoryResult = {
  items: PublicServiceListing[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

function boundedPageSize(value?: number) {
  if (!Number.isFinite(value)) return SERVICE_DIRECTORY_PAGE_SIZE;
  return Math.min(48, Math.max(1, Math.floor(value as number)));
}

export function queryServiceDirectory(input: ServiceDirectoryQuery = {}): ServiceDirectoryResult {
  const q = input.q?.trim() ?? "";
  const category = input.category?.trim() || "all";
  const status = input.status ?? "all";
  const sort = input.sort ?? "relevance";
  const pageSize = boundedPageSize(input.pageSize);

  let rows = publicServiceListings.filter((service) =>
    (category === "all" || service.category === category) &&
    (status === "all" || service.status === status),
  );

  if (q) {
    rows = searchServices(rows, q, rows.length).map(({ service }) => service);
  } else if (sort === "az") {
    rows = [...rows].sort((a, b) => a.shortTitle.localeCompare(b.shortTitle));
  } else if (sort === "recent") {
    rows = [...rows].sort((a, b) => b.lastVerified.localeCompare(a.lastVerified));
  }

  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const requestedPage = Number.isFinite(input.page) ? Math.max(1, Math.floor(input.page as number)) : 1;
  const page = Math.min(requestedPage, totalPages);
  const start = (page - 1) * pageSize;

  return {
    items: rows.slice(start, start + pageSize),
    total,
    page,
    pageSize,
    totalPages,
  };
}
