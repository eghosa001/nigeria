export type SearchConsoleHistoryRow = {
  date: string;
  clicks: number;
  impressions: number;
  position: number;
};

export const SEARCH_CONSOLE_HISTORY_THROUGH = "2026-10-02";

export const SEARCH_CONSOLE_HISTORY: SearchConsoleHistoryRow[] = [
  { date: "2026-09-27", clicks: 0, impressions: 0, position: 0 },
  { date: "2026-09-28", clicks: 0, impressions: 0, position: 0 },
  { date: "2026-09-29", clicks: 0, impressions: 28, position: 21.357142857142858 },
  { date: "2026-09-30", clicks: 8, impressions: 119, position: 15.739495798319327 },
  { date: "2026-10-01", clicks: 1, impressions: 143, position: 12.797202797202797 },
  { date: "2026-10-02", clicks: 7, impressions: 584, position: 30.960616438356166 },
];

export function historicalSearchConsoleSummary(startDate: string, endDate: string) {
  const rows = SEARCH_CONSOLE_HISTORY.filter((row) => row.date >= startDate && row.date <= endDate);
  const impressions = rows.reduce((sum, row) => sum + row.impressions, 0);
  const clicks = rows.reduce((sum, row) => sum + row.clicks, 0);
  const weightedPosition = rows.reduce((sum, row) => sum + row.position * row.impressions, 0);
  return {
    rows,
    impressions,
    clicks,
    ctr: impressions > 0 ? clicks / impressions : 0,
    position: impressions > 0 ? weightedPosition / impressions : 0,
    latestDate: rows.length ? rows[rows.length - 1]!.date : null,
  };
}
