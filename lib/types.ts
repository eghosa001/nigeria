export type VerificationStatus = "verified" | "conflict" | "review";

export type Agency = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  website: string;
};

export type Source = {
  label: string;
  agency: string;
  url: string;
  lastChecked: string;
  published?: string;
};

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  category: string;
  agencySlug: string;
  feeLabel: string;
  feeNote?: string;
  timeline?: string;
  status: VerificationStatus;
  lastVerified: string;
  officialPortal?: string;
  requirements: string[];
  steps: string[];
  notes: string[];
  sources: Source[];
  searchTerms: string[];
  related: string[];
};
