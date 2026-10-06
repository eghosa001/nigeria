import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
// Recovery sync trigger: validated title-cast pass after validator repair.
const sourcesPath = path.join(root, "data/youtube-movie-sources.json");
const cachePath = path.join(root, "data/youtube-channel-cache.json");
const outputPath = path.join(root, "data/youtube-movies.generated.json");
const reviewPath = path.join(root, "data/youtube-movies-review.generated.json");
const apiKey = process.env.YOUTUBE_DATA_API_KEY;

if (!apiKey) {
  console.error("YOUTUBE_DATA_API_KEY is required. No files were changed.");
  process.exit(2);
}

const registry = JSON.parse(await fs.readFile(sourcesPath, "utf8"));
let cache = {};
try { cache = JSON.parse(await fs.readFile(cachePath, "utf8")); } catch {}

let previousGenerated = { movies: [], pendingQualityCount: 0 };
try { previousGenerated = JSON.parse(await fs.readFile(outputPath, "utf8")); } catch {}
let previousReview = { candidates: [] };
try { previousReview = JSON.parse(await fs.readFile(reviewPath, "utf8")); } catch {}
const previousMovies = Array.isArray(previousGenerated.movies) ? previousGenerated.movies : [];
const fullSync = process.env.YOUTUBE_FULL_SYNC === "1" || previousMovies.length === 0;
const now = new Date();
const checkedDate = now.toISOString().slice(0, 10);

const API = "https://www.googleapis.com/youtube/v3";

function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function youtube(endpoint, params) {
  const url = new URL(API + "/" + endpoint);
  for (const [key, value] of Object.entries({ ...params, key: apiKey })) {
    if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
  }

  for (let attempt = 1; attempt <= 4; attempt++) {
    const response = await fetch(url, { headers: { accept: "application/json" } });
    if (response.ok) return response.json();

    const body = await response.text();
    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable || attempt === 4) {
      throw new Error(endpoint + " failed (" + response.status + "): " + body.slice(0, 500));
    }

    const retryAfter = Number(response.headers.get("retry-after") ?? 0);
    await wait(retryAfter > 0 ? retryAfter * 1000 : 500 * (2 ** (attempt - 1)));
  }

  throw new Error(endpoint + " failed after retries");
}

function exactChannelMatch(source, title) {
  const target = normalize(title);
  return source.aliases.some((alias) => normalize(alias) === target);
}

function knownHandle(source) {
  if (!source.knownUrl) return null;
  try {
    const url = new URL(source.knownUrl);
    const segment = url.pathname.split("/").filter(Boolean).find((part) => part.startsWith("@"));
    return segment ? segment.slice(1) : null;
  } catch {
    return null;
  }
}

function knownChannelId(source) {
  if (!source.knownUrl) return null;
  try {
    const url = new URL(source.knownUrl);
    const parts = url.pathname.split("/").filter(Boolean);
    const index = parts.indexOf("channel");
    return index >= 0 ? parts[index + 1] ?? null : null;
  } catch {
    return null;
  }
}

function verifiedChannelRecord(source, channel) {
  if (!channel || !exactChannelMatch(source, channel.snippet?.title)) return null;

  const description = normalize(channel.snippet?.description);
  const purposeWords = ["movie", "film", "nollywood", "producer", "production", "official", "entertainment"];
  const manuallyPinned = Boolean(source.knownUrl);
  if (!manuallyPinned && !purposeWords.some((word) => description.includes(word))) return null;

  const customUrl = channel.snippet?.customUrl || undefined;
  const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) return null;

  return {
    channelId: channel.id,
    channelTitle: channel.snippet.title,
    channelUrl: customUrl ? "https://www.youtube.com/" + customUrl : "https://www.youtube.com/channel/" + channel.id,
    customUrl,
    uploadsPlaylistId,
    resolvedAt: new Date().toISOString(),
  };
}

async function resolveChannel(source) {
  const cached = cache[source.slug];
  if (
    cached?.channelId &&
    cached?.uploadsPlaylistId &&
    exactChannelMatch(source, cached.channelTitle)
  ) {
    return cached;
  }

  const channelId = knownChannelId(source);
  if (channelId) {
    const details = await youtube("channels", {
      part: "snippet,contentDetails,status",
      id: channelId,
    });
    const resolved = verifiedChannelRecord(source, details.items?.[0]);
    if (resolved) {
      cache[source.slug] = resolved;
      return resolved;
    }
  }

  const handle = knownHandle(source);
  if (handle) {
    const details = await youtube("channels", {
      part: "snippet,contentDetails,status",
      forHandle: handle,
    });
    const resolved = verifiedChannelRecord(source, details.items?.[0]);
    if (resolved) {
      cache[source.slug] = resolved;
      return resolved;
    }
  }

  const found = await youtube("search", {
    part: "snippet",
    type: "channel",
    maxResults: 5,
    q: source.searchName,
  });
  const match = (found.items ?? []).find((item) => exactChannelMatch(source, item.snippet?.title));
  if (!match) throw new Error("Could not exact-match approved YouTube channel: " + source.searchName);

  const details = await youtube("channels", {
    part: "snippet,contentDetails,status",
    id: match.id.channelId,
  });
  const resolved = verifiedChannelRecord(source, details.items?.[0]);
  if (!resolved) {
    throw new Error("Resolved channel failed identity or publisher-context check: " + source.searchName);
  }

  cache[source.slug] = resolved;
  return resolved;
}

async function uploadsSince(playlistId, stopAtVideoId) {
  const items = [];
  let pageToken;
  let latestUploadVideoId = null;
  let reachedPreviousUpload = false;

  do {
    const page = await youtube("playlistItems", {
      part: "snippet,contentDetails",
      playlistId,
      maxResults: 50,
      pageToken,
    });

    for (const item of page.items ?? []) {
      const videoId = item.contentDetails?.videoId;
      if (!videoId) continue;
      if (!latestUploadVideoId) latestUploadVideoId = videoId;
      if (stopAtVideoId && videoId === stopAtVideoId) {
        reachedPreviousUpload = true;
        break;
      }
      items.push(item);
    }

    if (reachedPreviousUpload) break;
    pageToken = page.nextPageToken;
  } while (pageToken);

  return { items, latestUploadVideoId, reachedPreviousUpload };
}

async function videoDetails(ids) {
  const rows = [];
  for (let i = 0; i < ids.length; i += 50) {
    const page = await youtube("videos", {
      part: "snippet,contentDetails,status,statistics",
      id: ids.slice(i, i + 50).join(","),
      maxResults: 50,
    });
    rows.push(...(page.items ?? []));
  }
  return rows;
}

function durationSeconds(iso) {
  const match = String(iso ?? "").match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return 0;
  return Number(match[1] ?? 0) * 3600 + Number(match[2] ?? 0) * 60 + Number(match[3] ?? 0);
}

const excludeTitle = /\b(trailer|teaser|behind\s+the\s+scenes|\bbts\b|clip\b|short\s+film|episode\s*\d+|\bep\.?\s*\d+|season\s*\d+|interview|reaction|soundtrack|music\s+video|making\s+of|preview|concert|live\s*stream|livestream|watch\s+party|webinar)\b/i;
const positiveMovie = /\b(full\s+movie|full\s+film|nollywood|nigerian\s+movie|african\s+movie|latest\s+movie|movie\b|film\b)/i;

function isMovie(video) {
  const seconds = durationSeconds(video.contentDetails?.duration);
  const title = video.snippet?.title ?? "";
  if (video.status?.privacyStatus !== "public") return false;
  if (video.snippet?.liveBroadcastContent && video.snippet.liveBroadcastContent !== "none") return false;
  if (seconds < 55 * 60) return false;
  if (excludeTitle.test(title)) return false;
  const haystack = title + "\n" + (video.snippet?.description ?? "");
  return seconds >= 75 * 60 || positiveMovie.test(haystack);
}

function cleanName(value) {
  return value
    .replace(/\([^)]*\)/g, "")
    .replace(/^[a-z]\s*[-–—]\s*/i, "")
    .replace(/\b(starring|featuring|feat\.?|ft\.?)\b/gi, "")
    .replace(/and\s+many\s+(?:more|others?)\.?$/i, "")
    .replace(/^\s*(?:with|also)\s+/i, "")
    .replace(/\s+as\s+[A-Za-zÀ-ÖØ-öø-ÿ'’.\-\s]+$/i, "")
    .replace(/([A-Za-z])\.([A-Za-z])/g, "$1. $2")
    .replace(/[#|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[,.;:!?\s]+|[,.;:!?\s]+$/g, "");
}

const castNoiseExact = /^(?:many\s+(?:more|others?)|comment(?:s)?|like|share|subscribe|follow|hottest|trailers?|lastest|latest|produced|more|story|screen\s*play|join\s+the\s+trend|new)$/i;
const castNoiseContains = /\b(?:don['’]?t\s+forget\s+to|join\s+the\s+trend|screen\s*play|original\s+story|facebook|instagram|youtube|nollywoodpicturestv|movies?\b|films?\b|subscribe|comment|share|entertainment\s+network|world\s+class\s+premieres?)\b/i;
const promoSynopsis = /\b(?:subscribe(?:\s+to)?|follow\s+us|welcome\s+to\s+(?:our|the)\s+channel|youtube\s+channel|watch\s+more|watch\s+now|like\s*(?:,|and|&)\s*share|don't\s+forget\s+to|do\s+not\s+forget\s+to|thank\s+you\s+for\s+watching|amazing(?:\s+masterpiece)?|captivating|masterpiece|blockbuster|ultimate|unmissable|must[- ]watch|filled\s+with|edge\s+of\s+your\s+seat|will\s+(?:make\s+your\s+day|blow\s+your\s+mind)|hottest|trending|latest\s+nigerian\s+movies?|full\s+movie|complete\s+movie|official\s+full\s+movie|latest\s+full\s+movies?|nollywood\s+movies?\s*20\d{2}|nigerian\s+movies?\s*20\d{2})\b/i;

function looksLikePersonName(name) {
  const words = name.split(/\s+/).filter(Boolean);
  if (!words.length || words.length > 4) return false;
  if (name === name.toLowerCase()) return false;
  return words.every((word) => /^[A-Za-zÀ-ÖØ-öø-ÿ'’.\-]+$/.test(word));
}

function splitNames(value) {
  return value
    .split(/,|\s*&\s*|\s+and\s+|\s*\/\s*/i)
    .map(cleanName)
    .filter((name) =>
      name.length >= 4 &&
      name.length <= 60 &&
      /^[A-Za-zÀ-ÖØ-öø-ÿ'’.\-\s]+$/.test(name) &&
      looksLikePersonName(name) &&
      !castNoiseExact.test(name) &&
      !castNoiseContains.test(name) &&
      !/\b(movie|film|latest|nigerian|nollywood|full|official|watch|youtube|tv|production|director|producer|channel|welcome|subscribe|romantic|drama|comedy|trending)\b/i.test(name),
    )
    .slice(0, 12);
}

function inlineDescriptionCast(description) {
  const marker = /\b(?:cast(?:\s+includes)?|starring|stars?|featuring)\s*(?:is|are)?\s*[:\-]?\s*/ig;
  let match;
  while ((match = marker.exec(description))) {
    let tail = description.slice(match.index + match[0].length, match.index + match[0].length + 260);
    tail = tail.split(/\b(?:watch|welcome|subscribe|if you|this movie|the movie|brings you|on our channel)\b/i)[0];
    tail = tail.split(/[.!?]\s/)[0];
    const names = splitNames(tail);
    if (names.length) return names;
  }
  return [];
}

function titleEmbeddedCast(title) {
  const candidates = [];
  const pipeParts = title.split(/\s*\|\s*/);
  if (pipeParts.length > 1) candidates.push(...pipeParts.slice(1, -1).concat(pipeParts.slice(1, 2)));

  const movieTail = title.match(/\b(?:the\s+movie|d\s+movie|movie)\)?\s*[:\-]?\s*([^|#]{6,180})/i);
  if (movieTail) candidates.push(movieTail[1]);

  for (const match of title.matchAll(/\s[-–—]\s*([^|#]{6,180})/g)) {
    candidates.push(match[1]);
  }

  for (let value of candidates) {
    value = value
      .replace(/\b20\d{2}\b.*$/i, "")
      .replace(/\b(?:latest|nigerian|nollywood|full|movie|romcom|romantic|drama|comedy|trending)\b.*$/i, "")
      .trim();
    const names = splitNames(value);
    if (names.length >= 2) return names;
  }
  return [];
}

function extractCast(video) {
  const description = video.snippet?.description ?? "";
  const lines = description.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const direct = line.match(/^(?:cast|starring|stars?|featuring)\s*[:\-]\s*(.+)$/i);
    if (direct) {
      const names = splitNames(direct[1]);
      if (names.length) return names;
    }
    if (/^(?:cast|starring|stars?|featuring)\s*:?\s*$/i.test(line)) {
      const block = [];
      for (let j = i + 1; j < Math.min(lines.length, i + 12); j++) {
        if (/^(?:crew|director|producer|written|screenplay|dop|sound|editor|subscribe|follow)\b/i.test(lines[j])) break;
        block.push(lines[j].replace(/\s+[-–—].*$/, ""));
      }
      const names = splitNames(block.join(","));
      if (names.length) return names;
    }
  }

  const inline = inlineDescriptionCast(description);
  if (inline.length) return inline;

  const title = video.snippet?.title ?? "";
  const starring = title.match(/(?:starring|featuring|feat\.?|ft\.?)\s*[:.\-]?\s*(.+?)(?:\||\b20\d{2}\b|\blatest\b|\bnigerian\b|\bnollywood\b|\bfull\b|$)/i);
  if (starring) {
    const names = splitNames(starring[1]);
    if (names.length) return names;
  }

  const embedded = titleEmbeddedCast(title);
  if (embedded.length) return embedded;

  const segments = title.split(/\s+-\s+/);
  if (segments.length > 1) {
    const names = splitNames(segments[1].replace(/\b(?:latest|nigerian|nollywood|full|movie).*$/i, ""));
    if (names.length >= 2) return names;
  }
  return [];
}

function synopsisFromDescription(video, displayTitle, channelTitle, cast = []) {
  const description = video.snippet?.description ?? "";
  const paragraphs = description
    .split(/\n\s*\n|\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .map((line) =>
      line.replace(
        /^now\s+showing\s+on\s+our\s+channel\s+is\s+the\s+movie\s+["'“”][^"'“”]+["'“”]\s*/i,
        "",
      ),
    )
    .filter((line) =>
      line.length >= 70 &&
      !/https?:\/\//i.test(line) &&
      !/^(?:cast|starring|crew|subscribe|follow|watch|produced|directed|written|#|please\s+watch\b|thank\s+you\b)/i.test(line) &&
      !/^welcome\s+to\s+.+\b(?:tv|channel)\b/i.test(line) &&
      !/\b(?:social media|instagram|tiktok|facebook)\b/i.test(line) &&
      !promoSynopsis.test(line),
    );
  const chosen = paragraphs.find((paragraph) =>
    !/^\s*(?:it|this title|the phrase)\s+(?:signifies|means|refers to)\b/i.test(paragraph) &&
    !/\p{Extended_Pictographic}/u.test(paragraph)
  );
  if (chosen) return chosen.slice(0, 360).replace(/\s+/g, " ").trim();

  const featured = cast.slice(0, 3).join(", ");
  return displayTitle + " is a full-length Nigerian film published by " + channelTitle +
    (featured ? ", featuring " + featured : "") +
    ". Watch it through the publisher's official YouTube release.";
}

function cleanTitle(raw, cast = []) {
  let title = String(raw ?? "").replace(/\p{Extended_Pictographic}/gu, " ").replace(/\s+/g, " ").trim();

  // Treat "(Full Movie)" / "(New Movie)" as feed metadata when it follows a real title.
  // Cutting at the marker also removes actor/SEO text that many channels append after it.
  const feedMovieMarker = title.search(/\s*\((?:full|complete|new)\s+movie\)/i);
  if (feedMovieMarker > 1) title = title.slice(0, feedMovieMarker).trim();

  // Only use "Watch ... in TITLE" extraction for compact feed labels, not prose
  // such as "Watch Ruke and Jess begin to fall in love".
  const watchInMatch = title.length <= 110
    ? title.match(/^watch\s+(?:[A-Z][\w.'’-]+(?:\s+[A-Z][\w.'’-]+){0,3})\s+in\s+(.+?)(?:\s*[-|]\s*(?:nigerian|nollywood|african|latest|20\d{2})\b.*)?$/i)
    : null;
  if (watchInMatch?.[1]) title = watchInMatch[1].trim();

  title = title.replace(/^(?:nollywood|nigerian)\s+movie(?:\s*\([^)]*\))?\s*:\s*/i, "");
  title = title.replace(/\((?:\s*(?:full|complete|new)\s+movie|the\s+movie|d\s+movie)\s*\)/gi, " ");
  title = title.split("|")[0].trim();
  title = title.replace(/\s*;\s*[^;]*(?:,|20\d{2}).*$/i, " ");
  title = title.replace(/\s*(?:\[\s*full\s+movie\s*\]|\(\s*full\s+movie\s*\)|\bfull\s+movie\b).*$/i, " ");

  const lowerTitle = title.toLowerCase();
  const castHits = cast
    .map((name) => cleanName(name))
    .filter((name) => name.length >= 4)
    .map((name) => lowerTitle.indexOf(name.toLowerCase()))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b);

  if (castHits.length >= 2) {
    const earliest = castHits[0];
    const prefix = title.slice(0, earliest);
    if (/[-–—:/]\s*$/.test(prefix) || /\s{2,}$/.test(prefix)) {
      title = prefix;
    }
  }

  title = title.replace(/\s*[-–—/]\s*(?:latest|lastest)\b.*$/i, " ");
  title = title.replace(/\s+(?:latest|lastest)\s+20\d{2}\b.*$/i, " ");
  title = title.replace(/\s+-\s+(?:starring|feat(?:uring)?\.?|[A-Z][A-Z\s,'.&-]{8,}).*$/i, " ");
  title = title.replace(/[.\s-]*\b(?:starring|featuring|feat\.?|ft\.?)\b.*$/i, " ");
  title = title.replace(/\s*-\s*new\s+["'“”]?latest\b.*$/i, " ");
  title = title.replace(/\s*[-–—]\s*latest\s+nollywood\b.*$/i, " ");
  title = title.replace(/\s*[.]\s*latest\s+20\d{2}\s+nigeria(?:n)?\s+movie.*$/i, " ");
  title = title.replace(/\s*[.]\s*latest\s+romantic\s+movie.*$/i, " ");
  title = title.replace(/\s+["'“”]?latest\s+nollywood\b.*$/i, " ");
  title = title.replace(/\s*[-–—/]\s*(?:nigerian|nollywood|african)\s+movies?\s+20\d{2}.*$/i, " ");
  title = title.replace(/\s+(?:latest\s+)?(?:20\d{2}\s+)?(?:nigerian|nollywood|african)\s+(?:full\s+)?movies?.*$/i, " ");
  title = title.replace(/\s*[-–—]\s*20\d{2}\s+(?:latest|new|full)\b.*$/i, " ");
  title = title.replace(/\s+20\d{2}\s+(?:latest|new|full)\b.*$/i, " ");
  title = title.replace(/\s+(?:full|complete)\s+movie(?:\s+20\d{2})?\s*$/i, " ");
  title = title.replace(/\s*\((?:latest|new|full)\b.*$/i, " ");
  title = title.replace(/\s*-\s*latest\s*$/i, " ");
  title = title.replace(/\s*[-–—/|]+\s*$/g, " ");
  title = title.replace(/\s+/g, " ").trim();
  return title || String(raw ?? "").trim();
}

function yearFor(video) {
  const currentYear = now.getUTCFullYear();
  const text = (video.snippet?.title ?? "") + "\n" + (video.snippet?.description ?? "");
  const years = [...text.matchAll(/\b(20\d{2})\b/g)]
    .map((match) => Number(match[1]))
    .filter((year) => year >= 2000 && year <= currentYear + 1);
  if (years.length) return Math.max(...years);
  return Number((video.snippet?.publishedAt ?? now.toISOString()).slice(0, 4));
}

const priorActorStats = new Map();
for (const movie of previousMovies) {
  for (const rawName of movie.cast ?? []) {
    const name = cleanName(rawName);
    if (
      !name ||
      castNoiseExact.test(name) ||
      castNoiseContains.test(name) ||
      !looksLikePersonName(name) ||
      name.split(/\s+/).length < 2
    ) continue;
    const key = normalize(name);
    const current = priorActorStats.get(key) ?? { name, count: 0 };
    current.count++;
    if (name.length > current.name.length) current.name = name;
    priorActorStats.set(key, current);
  }
}

const priorActorIndex = [...priorActorStats.entries()]
  .filter(([, value]) => value.count >= 2)
  .map(([key, value]) => ({ key, name: value.name }))
  .sort((a, b) => b.key.length - a.key.length);

function castFromPriorCatalogTitle(rawTitle) {
  if (!priorActorIndex.length) return [];
  const title = " " + normalize(rawTitle) + " ";
  const matches = [];

  for (const actor of priorActorIndex) {
    const needle = " " + actor.key + " ";
    const index = title.indexOf(needle);
    if (index < 0) continue;
    const end = index + needle.length;
    if (matches.some((match) => index < match.end && end > match.index)) continue;
    matches.push({ ...actor, index, end });
    if (matches.length >= 8) break;
  }

  return matches.length >= 2
    ? matches.sort((a, b) => a.index - b.index).map((match) => match.name)
    : [];
}

const moviesByVideoId = new Map(
  fullSync ? [] : previousMovies.map((movie) => [movie.videoId, movie]),
);
const pendingByVideoId = new Map(
  fullSync
    ? []
    : (Array.isArray(previousReview.candidates) ? previousReview.candidates : [])
        .map((candidate) => [candidate.videoId, candidate]),
);
let pendingQualityCount = fullSync ? 0 : Number(previousGenerated.pendingQualityCount ?? 0);
let importedThisRun = 0;
let pendingThisRun = 0;
let duplicateTitleCount = 0;
const sourceErrors = [];

for (const source of registry.sources) {
  console.log((fullSync ? "Full scan " : "Incremental scan ") + source.searchName);
  try {
    const channel = await resolveChannel(source);
    const cached = cache[source.slug] ?? channel;
    const stopAtVideoId = fullSync ? null : cached.latestUploadVideoId ?? null;
    const scan = await uploadsSince(channel.uploadsPlaylistId, stopAtVideoId);
    const ids = scan.items.map((item) => item.contentDetails?.videoId).filter(Boolean);
    const details = await videoDetails(ids);

    for (const video of details) {
    if (!isMovie(video)) continue;
    let cast = extractCast(video);
    if (!cast.length) cast = castFromPriorCatalogTitle(video.snippet?.title ?? "");
    const title = cleanTitle(video.snippet?.title, cast);
    const synopsis = synopsisFromDescription(video, title, channel.channelTitle, cast);
    const seconds = durationSeconds(video.contentDetails?.duration);
    const castPending = cast.length === 0;
    if (castPending) {
      pendingQualityCount++;
      pendingThisRun++;
      pendingByVideoId.set(video.id, {
        videoId: video.id,
        rawTitle: video.snippet?.title ?? title,
        title,
        channelName: channel.channelTitle,
        channelId: channel.channelId,
        channelUrl: channel.channelUrl,
        publishedAt: video.snippet?.publishedAt ?? now.toISOString(),
        durationMinutes: Math.round(seconds / 60),
        videoUrl: "https://www.youtube.com/watch?v=" + video.id,
        reason: "missing-cast",
        descriptionExcerpt: String(video.snippet?.description ?? "")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 1800),
      });
    } else {
      pendingByVideoId.delete(video.id);
    }

    const publishedAt = video.snippet?.publishedAt ?? now.toISOString();
    moviesByVideoId.set(video.id, {
      videoId: video.id,
      title,
      rawTitle: video.snippet?.title ?? title,
      synopsis,
      cast,
      featuredCast: cast.slice(0, 3),
      channelName: channel.channelTitle,
      channelId: channel.channelId,
      channelUrl: channel.channelUrl,
      publishedAt,
      year: yearFor(video),
      durationMinutes: Math.round(seconds / 60),
      viewCount: Number(video.statistics?.viewCount ?? 0),
      metadataStatus: castPending ? "cast-pending" : "complete",
      videoUrl: "https://www.youtube.com/watch?v=" + video.id,
      lastChecked: checkedDate,
    });
      importedThisRun++;
    }

    if (fullSync || scan.items.length > 0 || !cached.latestUploadVideoId) {
      cache[source.slug] = {
        ...channel,
        latestUploadVideoId: scan.latestUploadVideoId ?? cached.latestUploadVideoId,
        lastScannedAt: now.toISOString(),
        lastScanMode: fullSync ? "full" : "incremental",
        reachedPreviousUpload: scan.reachedPreviousUpload,
      };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/quotaExceeded|exceeded[^\n]*quota/i.test(message)) {
      console.error("YouTube Data API quota exhausted. Existing catalog files are preserved.");
      throw error;
    }
    sourceErrors.push({ slug: source.slug, name: source.searchName, optional: source.optional === true, message });
    console.error("Source skipped:", source.searchName, "-", message);
  }
}

const requiredSourceErrors = sourceErrors.filter((error) => !error.optional);
if (fullSync && requiredSourceErrors.length > 0) {
  console.error(
    "Full sync aborted because " + requiredSourceErrors.length +
    " required approved source(s) failed. Existing catalog files are preserved.",
  );
  process.exit(3);
}

const approvedSlugs = new Set(registry.sources.map((source) => source.slug));
for (const slug of Object.keys(cache)) {
  if (!approvedSlugs.has(slug)) delete cache[slug];
}

const approvedChannelIds = new Set(
  registry.sources
    .map((source) => cache[source.slug]?.channelId)
    .filter(Boolean),
);

const sorted = [...moviesByVideoId.values()]
  .filter((movie) => approvedChannelIds.has(movie.channelId))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title));

const uniqueByPublisherTitle = new Map();
for (const movie of sorted) {
  const key = [movie.channelId, normalize(movie.title), movie.year].join("|");
  if (uniqueByPublisherTitle.has(key)) {
    duplicateTitleCount++;
    continue;
  }
  uniqueByPublisherTitle.set(key, movie);
}
const movies = [...uniqueByPublisherTitle.values()];

await fs.writeFile(cachePath, JSON.stringify(cache, null, 2) + "\n");
await fs.writeFile(reviewPath, JSON.stringify({
  generatedAt: now.toISOString(),
  syncMode: fullSync ? "full" : "incremental",
  candidateCount: pendingByVideoId.size,
  candidates: [...pendingByVideoId.values()]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
}, null, 2) + "\n");
await fs.writeFile(outputPath, JSON.stringify({
  generatedAt: now.toISOString(),
  syncMode: fullSync ? "full" : "incremental",
  sourceCount: registry.sources.length,
  importedCount: movies.length,
  importedThisRun,
  pendingQualityCount,
  pendingThisRun,
  duplicateTitleCount,
  failedSourceCount: sourceErrors.length,
  requiredFailedSourceCount: requiredSourceErrors.length,
  sourceErrors,
  movies,
}, null, 2) + "\n");

console.log("Catalog now contains", movies.length, "full movies from", registry.sources.length, "approved sources.");
console.log("Imported this run:", importedThisRun, "| held for metadata review this run:", pendingThisRun);
console.log("Duplicate publisher/title/year entries skipped:", duplicateTitleCount);
console.log("Sources needing review:", sourceErrors.length);
