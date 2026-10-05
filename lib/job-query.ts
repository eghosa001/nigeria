import { jobLocationFacets, jobProfessionFacets, matchesJobLocation, matchesJobProfession } from "@/lib/job-facets";
import { getEffectiveJobStatus, getEffectiveStatusLabel } from "@/lib/job-runtime";
import { jobOpportunities, type CareerOpportunity, type JobSector, type JobStatus } from "@/lib/jobs";

export const JOBS_DIRECTORY_PAGE_SIZE = 24;
export const JOBS_DIRECTORY_MAX_PAGE_SIZE = 48;

export type JobDirectoryItem = Pick<
  CareerOpportunity,
  "slug" | "title" | "organization" | "sector" | "summary" | "location" | "employmentType" | "audiences" | "fields" | "deadline" | "verifiedAt"
> & {
  effectiveStatus: JobStatus;
  effectiveStatusLabel: string;
};

export type JobDirectoryQuery = {
  q?: string;
  sector?: JobSector | "All";
  status?: JobStatus | "all";
  location?: string;
  profession?: string;
  page?: number;
  pageSize?: number;
};

export type JobDirectoryResult = {
  items: JobDirectoryItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

function clampInteger(value: number | undefined, fallback: number, min: number, max: number) {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.floor(value as number)));
}

function searchableText(item: CareerOpportunity) {
  return [
    item.title,
    item.organization,
    item.summary,
    item.location,
    item.employmentType,
    ...item.audiences,
    ...item.fields,
    ...item.qualifications,
  ].join(" ").toLowerCase();
}

function toDirectoryItem(item: CareerOpportunity): JobDirectoryItem {
  return {
    slug: item.slug,
    title: item.title,
    organization: item.organization,
    sector: item.sector,
    summary: item.summary,
    location: item.location,
    employmentType: item.employmentType,
    audiences: item.audiences.slice(0, 2),
    fields: item.fields.slice(0, 2),
    deadline: item.deadline,
    verifiedAt: item.verifiedAt,
    effectiveStatus: getEffectiveJobStatus(item),
    effectiveStatusLabel: getEffectiveStatusLabel(item),
  };
}

export function queryJobDirectory(input: JobDirectoryQuery = {}): JobDirectoryResult {
  const q = (input.q ?? "").trim().toLowerCase();
  const sector = input.sector ?? "All";
  const status = input.status ?? "all";
  const location = input.location ?? "all";
  const profession = input.profession ?? "all";
  const pageSize = clampInteger(input.pageSize, JOBS_DIRECTORY_PAGE_SIZE, 1, JOBS_DIRECTORY_MAX_PAGE_SIZE);

  const validLocation = location === "all" || jobLocationFacets.some((facet) => facet.slug === location);
  const validProfession = profession === "all" || jobProfessionFacets.some((facet) => facet.slug === profession);

  const priority: Record<JobStatus, number> = {
    open: 0,
    screening: 1,
    training: 2,
    upcoming: 3,
    "career-page": 4,
    closed: 5,
  };

  const filtered = jobOpportunities
    .filter((item) => {
      if (sector !== "All" && item.sector !== sector) return false;
      if (status !== "all" && getEffectiveJobStatus(item) !== status) return false;
      if (validLocation && location !== "all" && !matchesJobLocation(item, location)) return false;
      if (validProfession && profession !== "all" && !matchesJobProfession(item, profession)) return false;
      if (q && !searchableText(item).includes(q)) return false;
      return true;
    })
    .sort((a, b) => {
      const statusOrder = priority[getEffectiveJobStatus(a)] - priority[getEffectiveJobStatus(b)];
      if (statusOrder !== 0) return statusOrder;
      if (a.deadline && b.deadline) return a.deadline.localeCompare(b.deadline);
      if (a.deadline) return -1;
      if (b.deadline) return 1;
      return a.organization.localeCompare(b.organization) || a.title.localeCompare(b.title);
    });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = clampInteger(input.page, 1, 1, totalPages);
  const start = (page - 1) * pageSize;

  return {
    items: filtered.slice(start, start + pageSize).map(toDirectoryItem),
    total,
    page,
    pageSize,
    totalPages,
  };
}
