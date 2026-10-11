export function exportYouTubeD1Import(
  movies: unknown[],
  outputDir: string,
  options?: { batchSize?: number; editorialStatus?: 'draft' | 'published' },
): { recordCount: number; editorialStatus: string; files: Array<{ name: string }> };
