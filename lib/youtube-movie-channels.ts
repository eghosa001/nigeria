export type VerifiedYouTubeMovieChannel = {
  slug: string;
  name: string;
  handle: string;
  channelUrl: string;
  verificationBasis: string;
  lastChecked: string;
};

export const verifiedYouTubeMovieChannels: VerifiedYouTubeMovieChannel[] = [
  {
    slug: "omoni-oboli-tv",
    name: "Omoni Oboli TV",
    handle: "@OmoniOboliTV",
    channelUrl: "https://www.youtube.com/@OmoniOboliTV",
    verificationBasis: "Producer-owned movie channel cross-checked against Omoni Oboli TV's official movie site.",
    lastChecked: "2026-09-29",
  },
  {
    slug: "maurice-sam-tv",
    name: "Maurice Sam TV",
    handle: "@mauricesamtv",
    channelUrl: "https://www.youtube.com/@mauricesamtv",
    verificationBasis: "YouTube-verified channel publishing full Nigerian movies.",
    lastChecked: "2026-09-29",
  },
  {
    slug: "uche-montana-tv",
    name: "Uche Montana TV",
    handle: "@UchemontanaTV",
    channelUrl: "https://www.youtube.com/@UchemontanaTV",
    verificationBasis: "YouTube-verified channel publishing premium Nollywood movies.",
    lastChecked: "2026-09-29",
  },
];

export function isApprovedYouTubeMoviePublisher(name?: string) {
  if (!name) return false;
  return verifiedYouTubeMovieChannels.some((channel) => channel.name === name);
}
