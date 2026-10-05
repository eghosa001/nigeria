import { entertainmentTitles, type EntertainmentPlatform, type EntertainmentTitle } from "@/lib/entertainment";

export const ENTERTAINMENT_DIRECTORY_PAGE_SIZE = 30;

export type EntertainmentDirectorySort = "newest" | "oldest" | "az";

export type EntertainmentDirectoryQuery = {
  q?: string;
  platform?: EntertainmentPlatform | "all";
  genre?: string;
  sort?: EntertainmentDirectorySort;
  page?: number;
  pageSize?: number;
};

export type EntertainmentDirectoryResult = {
  items: EntertainmentTitle[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

function boundedPageSize(value?: number) {
  if (!Number.isFinite(value)) return ENTERTAINMENT_DIRECTORY_PAGE_SIZE;
  return Math.min(60, Math.max(1, Math.floor(value as number)));
}

function normalized(value: string) {
  return value.trim().toLowerCase();
}

function relevance(title: EntertainmentTitle, query: string) {
  const q = normalized(query);
  if (!q) return 0;
  const name = normalized(title.title);
  const cast = normalized(title.cast.join(" "));
  const genres = normalized(title.genres.join(" "));
  const languages = normalized(title.languages.join(" "));
  const synopsis = normalized(title.synopsis);

  if (name === q) return 100;
  let score = 0;
  if (name.startsWith(q)) score += 60;
  else if (name.includes(q)) score += 45;
  if (cast.includes(q)) score += 25;
  if (genres.includes(q)) score += 15;
  if (languages.includes(q)) score += 10;
  if (synopsis.includes(q)) score += 5;
  return score;
}

export function queryEntertainmentDirectory(input: EntertainmentDirectoryQuery = {}): EntertainmentDirectoryResult {
  const q = input.q?.trim() ?? "";
  const platform = input.platform ?? "all";
  const genre = input.genre?.trim() || "all";
  const sort = input.sort ?? "newest";
  const pageSize = boundedPageSize(input.pageSize);

  let rows = entertainmentTitles.filter((title) =>
    (platform === "all" || title.watchLinks.some((link) => link.platform === platform)) &&
    (genre === "all" || title.genres.includes(genre)),
  );

  if (q) {
    rows = rows
      .map((title) => ({ title, score: relevance(title, q) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || b.title.year - a.title.year || a.title.title.localeCompare(b.title.title))
      .map((entry) => entry.title);
  } else {
    rows = [...rows].sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "oldest") return a.year - b.year || a.title.localeCompare(b.title);
      return b.year - a.year || a.title.localeCompare(b.title);
    });
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
