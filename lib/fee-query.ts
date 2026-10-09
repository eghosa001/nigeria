import { getAgency, publicServices } from "@/lib/data";

export const FEE_DIRECTORY_PAGE_SIZE = 24;

export type FeeDirectoryItem = {
  slug: string;
  shortTitle: string;
  category: string;
  agencyShortName: string;
  agencyName: string;
  feeLabel: string;
  feeNote: string;
  status: string;
  lastVerified: string;
  searchText: string;
};

const entries: FeeDirectoryItem[] = publicServices.map((service) => {
  const agency = getAgency(service.agencySlug);
  return {
    slug: service.slug,
    shortTitle: service.shortTitle,
    category: service.category,
    agencyShortName: agency?.shortName || service.agencySlug.toUpperCase(),
    agencyName: agency?.name || "",
    feeLabel: service.feeLabel,
    feeNote: service.feeNote || "",
    status: service.status,
    lastVerified: service.lastVerified,
    searchText: [
      service.title, service.shortTitle, service.category, service.feeLabel,
      service.feeNote || "", agency?.name || "", agency?.shortName || "",
    ].join(" ").toLowerCase(),
  };
}).sort((a, b) => a.shortTitle.localeCompare(b.shortTitle));

export const feeCategories = [...new Set(entries.map((service) => service.category))].sort();

export type FeeDirectoryResult = {
  items: Omit<FeeDirectoryItem, "searchText" | "agencyName">[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export function queryFeeDirectory({
  q = "", category = "all", status = "all", page = 1,
}: {
  q?: string; category?: string; status?: string; page?: number;
} = {}): FeeDirectoryResult {
  const query = q.trim().toLowerCase().slice(0, 100);
  const rows = entries.filter((entry) =>
    (category === "all" || entry.category === category) &&
    (status === "all" || entry.status === status) &&
    (!query || entry.searchText.includes(query))
  );
  const total = rows.length;
  const pageSize = FEE_DIRECTORY_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const selected = Math.min(totalPages, Math.max(1, Number.isFinite(page) ? Math.floor(page) : 1));
  const items = rows.slice((selected - 1) * pageSize, selected * pageSize).map(({ searchText: _searchText, agencyName: _agencyName, ...item }) => item);
  return { items, total, page: selected, pageSize, totalPages };
}
