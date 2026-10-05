import { jobOpportunities, type CareerOpportunity, type JobSector } from "@/lib/jobs";
import { getEffectiveJobStatus } from "@/lib/job-runtime";

export type JobEmployer = {
  slug: string;
  name: string;
  sector: JobSector;
  opportunitySlugs: string[];
  latestVerified: string;
  activeCount: number;
  careerPageSlug?: string;
};

export function jobEmployerSlug(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildEmployers() {
  const groups = new Map<string, CareerOpportunity[]>();
  for (const item of jobOpportunities) {
    const list = groups.get(item.organization) ?? [];
    list.push(item);
    groups.set(item.organization, list);
  }

  return Array.from(groups.entries())
    .map(([name, items]): JobEmployer => ({
      slug: jobEmployerSlug(name),
      name,
      sector: items[0].sector,
      opportunitySlugs: items.map((item) => item.slug),
      latestVerified: items.reduce((latest, item) => item.verifiedAt > latest ? item.verifiedAt : latest, ""),
      activeCount: items.filter((item) => getEffectiveJobStatus(item) === "open").length,
      careerPageSlug: items.find((item) => item.status === "career-page")?.slug,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export const jobEmployers = buildEmployers();

export function getJobEmployer(name: string) {
  return jobEmployers.find((employer) => employer.name === name);
}

export function getEmployerOpportunities(name: string, excludeSlug?: string) {
  return jobOpportunities.filter((item) => item.organization === name && item.slug !== excludeSlug);
}
