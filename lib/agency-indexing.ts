/**
 * Agency directory pages mostly repeat short agency descriptions and a handful
 * of underlying service cards. Keep these navigable for visitors but only ask
 * search engines to index hubs with a meaningful set of distinct guide routes.
 * Individual service guides retain their own indexing status.
 */
export const MIN_INDEXABLE_AGENCY_GUIDES = 4;

export function shouldIndexAgencyHub(publishedGuideCount: number) {
  return Number.isInteger(publishedGuideCount) &&
    publishedGuideCount >= MIN_INDEXABLE_AGENCY_GUIDES;
}
