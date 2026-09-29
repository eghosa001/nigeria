import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourcesPath = path.join(root, "data/youtube-movie-sources.json");
const cachePath = path.join(root, "data/youtube-channel-cache.json");
const outputPath = path.join(root, "data/youtube-movies.generated.json");
const apiKey = process.env.YOUTUBE_DATA_API_KEY;

if (!apiKey) {
  console.error("YOUTUBE_DATA_API_KEY is required. No files were changed.");
  process.exit(2);
}

const registry = JSON.parse(await fs.readFile(sourcesPath, "utf8"));
let cache = {};
try { cache = JSON.parse(await fs.readFile(cachePath, "utf8")); } catch {}

const API = "https://www.googleapis.com/youtube/v3";

function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

async function youtube(endpoint, params) {
  const url = new URL(API + "/" + endpoint);
  for (const [key, value] of Object.entries({...params, key: apiKey})) {
    if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
  }
  const response = await fetch(url, {headers: {"accept":"application/json"}});
  if (!response.ok) {
    const body = await response.text();
    throw new Error(endpoint + " failed (" + response.status + "): " + body.slice(0, 500));
  }
  return response.json();
}

function exactChannelMatch(source, title) {
  const target = normalize(title);
  return source.aliases.some((alias) => normalize(alias) === target);
}

async function resolveChannel(source) {
  const cached = cache[source.slug];
  if (cached?.channelId && exactChannelMatch(source, cached.channelTitle)) return cached;

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
  const channel = details.items?.[0];
  if (!channel || !exactChannelMatch(source, channel.snippet?.title)) {
    throw new Error("Resolved channel failed identity check: " + source.searchName);
  }

  const description = normalize(channel.snippet?.description);
  const purposeWords = ["movie", "film", "nollywood", "producer", "production", "official", "entertainment"];
  if (!purposeWords.some((word) => description.includes(word))) {
    throw new Error("Channel description does not establish movie/producer context: " + source.searchName);
  }

  const customUrl = channel.snippet?.customUrl || undefined;
  const resolved = {
    channelId: channel.id,
    channelTitle: channel.snippet.title,
    channelUrl: customUrl ? "https://www.youtube.com/" + customUrl : "https://www.youtube.com/channel/" + channel.id,
    customUrl,
    uploadsPlaylistId: channel.contentDetails?.relatedPlaylists?.uploads,
    resolvedAt: new Date().toISOString(),
  };
  if (!resolved.uploadsPlaylistId) throw new Error("No uploads playlist for " + source.searchName);
  cache[source.slug] = resolved;
  return resolved;
}

async function allUploads(playlistId) {
  const items = [];
  let pageToken;
  do {
    const page = await youtube("playlistItems", {
      part: "snippet,contentDetails",
      playlistId,
      maxResults: 50,
      pageToken,
    });
    items.push(...(page.items ?? []));
    pageToken = page.nextPageToken;
  } while (pageToken);
  return items;
}

async function videoDetails(ids) {
  const rows = [];
  for (let i = 0; i < ids.length; i += 50) {
    const page = await youtube("videos", {
      part: "snippet,contentDetails,status",
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

const excludeTitle = /\b(trailer|teaser|behind\s+the\s+scenes|\bbts\b|clip\b|short\s+film|episode\s*\d+|\bep\.?\s*\d+|season\s*\d+|interview|reaction|soundtrack|music\s+video|making\s+of|preview)\b/i;
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
    .replace(/\b(starring|featuring|feat\.?|ft\.?)\b/gi, "")
    .replace(/[#|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function splitNames(value) {
  return value
    .split(/,|\s+&\s+|\s+and\s+|\s*\/\s*/i)
    .map(cleanName)
    .filter((name) =>
      name.length >= 4 &&
      name.length <= 60 &&
      /^[A-Za-zÀ-ÖØ-öø-ÿ'’.\-\s]+$/.test(name) &&
      !/\b(movie|film|latest|nigerian|nollywood|full|official|watch|youtube|tv|production|director|producer)\b/i.test(name),
    )
    .slice(0, 12);
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
    if (/^(?:cast|starring|stars?|featuring)\s*:?s*$/i.test(line)) {
      const block = [];
      for (let j = i + 1; j < Math.min(lines.length, i + 12); j++) {
        if (/^(?:crew|director|producer|written|screenplay|dop|sound|editor|subscribe|follow)\b/i.test(lines[j])) break;
        block.push(lines[j].replace(/\s+[-–—].*$/, ""));
      }
      const names = splitNames(block.join(","));
      if (names.length) return names;
    }
  }

  const title = video.snippet?.title ?? "";
  const starring = title.match(/(?:starring|featuring|feat\.?|ft\.?)\s*[:.\-]?\s*(.+?)(?:\||\b20\d{2}\b|\blatest\b|\bnigerian\b|\bnollywood\b|\bfull\b|$)/i);
  if (starring) {
    const names = splitNames(starring[1]);
    if (names.length) return names;
  }

  const segments = title.split(/\s+-\s+/);
  if (segments.length > 1) {
    const names = splitNames(segments[1].replace(/\b(?:latest|nigerian|nollywood|full|movie).*$/i, ""));
    if (names.length >= 2) return names;
  }
  return [];
}

function synopsisFromDescription(video, displayTitle, channelTitle) {
  const description = video.snippet?.description ?? "";
  const paragraphs = description
    .split(/\n\s*\n|\r?\n/)
    .map((line) => line.trim())
    .filter((line) =>
      line.length >= 70 &&
      !/https?:\/\//i.test(line) &&
      !/^(?:cast|starring|crew|subscribe|follow|watch|produced|directed|written|#)/i.test(line) &&
      !/\b(?:subscribe to|social media|instagram|tiktok|facebook|youtube channel)\b/i.test(line),
    );
  const chosen = paragraphs[0];
  if (chosen) return chosen.slice(0, 360).replace(/\s+/g, " ").trim();
  return displayTitle + " is a full Nigerian movie published by " + channelTitle + " on its official YouTube channel.";
}

function cleanTitle(raw) {
  let title = String(raw ?? "").trim();
  title = title.replace(/\((?:full\s+movie|the\s+movie|complete\s+movie)\)/gi, "");
  title = title.split("|")[0].trim();
  title = title.replace(/\s+-\s+(?:starring|feat(?:uring)?\.?|[A-Z][A-Z\s,'.&-]{8,}).*$/i, "").trim();
  title = title.replace(/\s+(?:latest\s+)?(?:20\d{2}\s+)?(?:nigerian|nollywood|african)\s+(?:full\s+)?movie.*$/i, "").trim();
  return title || String(raw ?? "").trim();
}

function yearFor(video) {
  const text = (video.snippet?.title ?? "") + "\n" + (video.snippet?.description ?? "");
  const years = [...text.matchAll(/\b(20(?:2[0-6]|1\d))\b/g)].map((match) => Number(match[1]));
  if (years.length) return Math.max(...years.filter((year) => year <= 2026));
  return Number((video.snippet?.publishedAt ?? "2026").slice(0, 4));
}

const movies = [];
let pendingQualityCount = 0;
const seen = new Set();

for (const source of registry.sources) {
  console.log("Resolving", source.searchName);
  const channel = await resolveChannel(source);
  const uploads = await allUploads(channel.uploadsPlaylistId);
  const ids = uploads.map((item) => item.contentDetails?.videoId).filter(Boolean);
  const details = await videoDetails(ids);

  for (const video of details) {
    if (!isMovie(video) || seen.has(video.id)) continue;
    seen.add(video.id);
    const cast = extractCast(video);
    const title = cleanTitle(video.snippet?.title);
    const synopsis = synopsisFromDescription(video, title, channel.channelTitle);
    if (!cast.length) {
      pendingQualityCount++;
      continue;
    }
    const seconds = durationSeconds(video.contentDetails?.duration);
    const publishedAt = video.snippet?.publishedAt ?? new Date().toISOString();
    movies.push({
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
      videoUrl: "https://www.youtube.com/watch?v=" + video.id,
      lastChecked: new Date().toISOString().slice(0, 10),
    });
  }
}

movies.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title));

await fs.writeFile(cachePath, JSON.stringify(cache, null, 2) + "\n");
await fs.writeFile(outputPath, JSON.stringify({
  generatedAt: new Date().toISOString(),
  sourceCount: registry.sources.length,
  importedCount: movies.length,
  pendingQualityCount,
  movies,
}, null, 2) + "\n");

console.log("Imported", movies.length, "full movies from", registry.sources.length, "approved sources.");
console.log("Held for missing cast metadata:", pendingQualityCount);
