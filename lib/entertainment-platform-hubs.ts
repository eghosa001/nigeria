import type { EntertainmentPlatform } from "@/lib/entertainment";

export type EntertainmentPlatformHub = {
  slug: string;
  name: string;
  platform: EntertainmentPlatform;
  href: string;
  summary: string;
  status: string;
  officialUrl: string;
  lastChecked: string;
  popularTitleSlugs: string[];
  detailPage: boolean;
};

export const entertainmentPlatformHubs: EntertainmentPlatformHub[] = [
  {
    slug: "netflix",
    name: "Netflix",
    platform: "Netflix",
    href: "/entertainment/platforms/netflix",
    summary: "Nigerian films currently linked to Netflix title pages, including recent local releases and established Nollywood hits.",
    status: "64 verified movie links",
    officialUrl: "https://www.netflix.com/ng-en/browse/genre/1077508",
    lastChecked: "2026-10-05",
    popularTitleSlugs: [
      "my-fathers-shadow",
      "the-waiter",
      "ada-omo-daddy",
      "devil-is-a-liar",
      "thinline",
      "farmers-bride",
      "the-herd",
      "a-lagos-love-story",
      "lisabi-a-legend-is-born",
      "king-of-thieves-2",
    ],
    detailPage: true,
  },
  {
    slug: "prime-video",
    name: "Prime Video",
    platform: "Prime Video",
    href: "/entertainment/platforms/prime-video",
    summary: "A growing Nigerian Prime Video catalog led by recent high-interest films and official Prime title pages.",
    status: "Major catalog expansion",
    officialUrl: "https://www.primevideo.com/",
    lastChecked: "2026-10-05",
    popularTitleSlugs: [
      "everybody-loves-jenifa",
      "christmas-in-lagos",
      "family-gbese",
      "finding-me",
      "ms-kanyin",
      "after-30",
      "osoronga",
      "the-lost-days",
    ],
    detailPage: true,
  },
  {
    slug: "kava",
    name: "Kava",
    platform: "Kava",
    href: "/entertainment/platforms/kava",
    summary: "Nollywood titles with verified Kava catalog links, including films currently surfaced by Kava's own discovery pages.",
    status: "Licensed streaming catalog",
    officialUrl: "https://kava.tv/",
    lastChecked: "2026-10-05",
    popularTitleSlugs: [
      "ajosepo-the-gathering",
      "ajosepo",
      "a-mama-deola-wedding-story",
      "strangers",
      "three-wise-men",
      "tenis-big-day",
      "okanjuwa",
      "palava",
      "ori-rebirth",
      "queen-lateefah",
    ],
    detailPage: true,
  },
  {
    slug: "youtube",
    name: "YouTube",
    platform: "YouTube",
    href: "/entertainment/youtube",
    summary: "Full Nigerian films from approved producer and rights-holder channels, with a separate large YouTube catalog and source checks.",
    status: "Official full-movie uploads",
    officialUrl: "https://www.youtube.com/",
    lastChecked: "2026-10-05",
    popularTitleSlugs: [
      "millionaire-until-morning",
      "the-man-i-never-knew",
      "all-things-equal",
      "sister-agatha",
      "bowale",
    ],
    detailPage: false,
  },
  {
    slug: "cinema",
    name: "Nigerian cinemas",
    platform: "Cinema",
    href: "/entertainment/cinemas",
    summary: "Current and upcoming Nigerian theatrical releases with cinema, distributor and showtime sources.",
    status: "Current release watch",
    officialUrl: "https://silverbirdcinemas.com/genre/nollywood/",
    lastChecked: "2026-10-05",
    popularTitleSlugs: [
      "black-market-2026",
      "mko-documentary-2026",
      "agbara-nla-the-return",
      "king-kosoko-the-battle-for-lagos",
      "one-gidi-night",
      "19-movie-2026",
      "first-lady-2026",
      "onibon-oje-2026",
    ],
    detailPage: false,
  },
  {
    slug: "africa-magic",
    name: "Africa Magic",
    platform: "Africa Magic",
    href: "/entertainment/releases",
    summary: "Africa Magic movie premieres are tracked through the release calendar when a current broadcast date is verified.",
    status: "Broadcast premieres",
    officialUrl: "https://www.dstv.com/africamagic/en-ng",
    lastChecked: "2026-10-05",
    popularTitleSlugs: ["pushing-30-2026"],
    detailPage: false,
  },
];

export const indexableEntertainmentPlatformHubs = entertainmentPlatformHubs.filter((hub) => hub.detailPage);

export function getEntertainmentPlatformHub(slug: string) {
  return entertainmentPlatformHubs.find((hub) => hub.slug === slug);
}
