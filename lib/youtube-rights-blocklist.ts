import restrictions from "@/data/youtube-rights-restrictions.json";

// Source of truth for video-level publishing holds. A verified channel name
// does not establish distribution rights for every individual upload.
export const restrictedYouTubeVideoIds: readonly string[] = restrictions.blockedVideoIds;
const blocked = new Set<string>(restrictedYouTubeVideoIds);

export function isRestrictedYouTubeVideoId(videoId: string) {
  return blocked.has(videoId);
}
