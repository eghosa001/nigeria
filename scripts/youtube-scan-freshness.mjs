// Only a successfully completed, source-verified API scan advances freshness.
// A channel can be current even when it has not uploaded a new video.
export function recordSuccessfulChannelScan(cache, source, channel, scan, checkedAt, fullSync) {
  const previous = cache[source.slug] ?? {};
  cache[source.slug] = {
    ...channel,
    latestUploadVideoId: scan.latestUploadVideoId ?? previous.latestUploadVideoId,
    lastScannedAt: checkedAt,
    lastScanMode: fullSync ? "full" : "incremental",
    reachedPreviousUpload: scan.reachedPreviousUpload,
  };
  return cache[source.slug];
}
