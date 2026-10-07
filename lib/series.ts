export type SeriesStatus = "released" | "ongoing" | "upcoming";

export type SeriesWatchLink = {
  platform: string;
  label: string;
  href: string;
  access: "subscription" | "free-official" | "broadcast" | "availability-varies";
  lastChecked: string;
  note: string;
};

export type SeriesSource = {
  label: string;
  url: string;
  lastChecked: string;
};

export type SeriesTitle = {
  slug: string;
  title: string;
  year: number;
  country: string;
  artworkNote: string;
  genres: string[];
  languages: string[];
  synopsis: string;
  cast: string[];
  creators?: string[];
  status: SeriesStatus;
  premiereLabel?: string;
  episodeInfo?: string;
  watchLinks: SeriesWatchLink[];
  sources: SeriesSource[];
};

export const seriesTitles: SeriesTitle[] = [
  {
    slug: "once-upon-a-village",
    title: "Once Upon a Village",
    year: 2026,
    country: "Nigeria",
    artworkNote: "No third-party poster is displayed unless an approved usage basis is recorded.",
    genres: ["Drama", "Comedy", "Family", "Nollywood"],
    languages: ["English"],
    synopsis: "A village-set Nigerian ensemble series following intertwined family, romance and community conflicts as recurring characters face new relationships, rivalries and consequences across an expanding run of feature-length episodes.",
    cast: ["Deza The Great", "Prisma James", "Fessa Ajoku", "Annabel Apara", "Eronini Osinachi", "Solomon Osagie", "Henrietta Ibekwe", "Amaka Ogbonna"],
    creators: ["Ruth Kadiri"],
    status: "ongoing",
    premiereLabel: "Series began 6 August 2026 on RuthKadiri247",
    episodeInfo: "FilmFlux lists 8 feature-length episodes in the current run; new instalments continued through September 2026.",
    watchLinks: [
      {
        platform: "YouTube",
        label: "Watch Once Upon a Village Episode 1 on RuthKadiri247",
        href: "https://www.youtube.com/watch?v=Yu-QxqPDmXM",
        access: "free-official",
        lastChecked: "2026-10-07",
        note: "Official episode-one upload from the RuthKadiri247 rights-holder channel."
      },
      {
        platform: "YouTube",
        label: "Watch Once Upon a Village 3 on RuthKadiri247",
        href: "https://www.youtube.com/watch?v=X3HaWmJoSRU",
        access: "free-official",
        lastChecked: "2026-10-07",
        note: "Official third instalment from RuthKadiri247; MyNigeriaGuide also maintains a dedicated episode detail page."
      }
    ],
    sources: [
      { label: "RuthKadiri247 — Once Upon a Village Episode 1", url: "https://www.youtube.com/watch?v=Yu-QxqPDmXM", lastChecked: "2026-10-07" },
      { label: "FilmFlux — Once Upon a Village series", url: "https://filmflux.app/series/3ef87482-63c6-4b45-a8db-7e8c1347db6d-once-upon-a-village", lastChecked: "2026-10-07" },
      { label: "Nollywire — Once Upon a Village", url: "https://nollywire.com/films/once-upon-a-village", lastChecked: "2026-10-07" }
    ]
  },
  {
    slug: "ordinary-people",
    title: "Ordinary People",
    year: 2026,
    country: "Nigeria",
    artworkNote: "No third-party poster is displayed unless an approved usage basis is recorded.",
    genres: ["Crime", "Drama", "Mystery", "Thriller", "Nollywood"],
    languages: ["English"],
    synopsis: "After seven years on the run, a criminal and his wife hide as bakers inside a quiet gated estate, unaware that undercover agents living among their neighbours are hunting them.",
    cast: ["Ramsey Nouah", "Chidi Mokeme", "Adunni Ade", "Sharon Ooja", "Gbenga Titiloye", "Uche Montana", "Lasisi Elenu", "Jackie Appiah", "Adjetey Anang", "Shawn Faqua"],
    creators: ["Moses Inwang"],
    status: "released",
    premiereLabel: "Released 4 September 2026 on Netflix",
    episodeInfo: "8-episode action-thriller series",
    watchLinks: [
      {
        platform: "Netflix",
        label: "Check current Netflix Nigeria availability",
        href: "https://www.netflix.com/ng/title/82785277",
        access: "availability-varies",
        lastChecked: "2026-10-06",
        note: "Netflix's current Nigerian Nollywood catalog lists Ordinary People among new titles, while direct title availability can vary by account or territory."
      }
    ],
    sources: [
      { label: "Netflix — Ordinary People", url: "https://www.netflix.com/ng/title/82785277", lastChecked: "2026-10-06" },
      { label: "Netflix Nigeria — Naija To The World", url: "https://www.netflix.com/ng/browse/genre/81349500", lastChecked: "2026-10-06" },
      { label: "Premium Times — Ordinary People review", url: "https://www.premiumtimesng.com/entertainment/nollywood/909032-movie-review-ordinary-people-has-all-the-ingredients-but-too-much-on-its-plate.html", lastChecked: "2026-10-06" }
    ]
  },
  {
    slug: "to-kill-a-monkey",
    title: "To Kill a Monkey",
    year: 2025,
    country: "Nigeria",
    artworkNote: "No third-party poster is displayed unless an approved usage basis is recorded.",
    genres: ["Crime", "Drama", "Thriller", "Nollywood"],
    languages: ["English"],
    synopsis: "A struggling father is drawn into cybercrime by the promise of fast money, forcing him into increasingly dangerous moral compromises.",
    cast: ["William Benson", "Bucci Franklin", "Bimbo Akintola", "Stella Damasus", "Chidi Mokeme", "Sunshine Rosman", "Iretiola Doyle", "Lilian Afegbai", "Teniola Aladese", "Michael Ejoor"],
    creators: ["Kemi Adetiba"],
    status: "released",
    premiereLabel: "Released in 2025",
    watchLinks: [
      {
        platform: "Netflix",
        label: "Check current Netflix availability",
        href: "https://www.netflix.com/ng/title/81687484",
        access: "availability-varies",
        lastChecked: "2026-10-04",
        note: "Official Netflix title page. Netflix currently indicates that availability can differ by country."
      }
    ],
    sources: [
      { label: "Netflix title page", url: "https://www.netflix.com/ng/title/81687484", lastChecked: "2026-10-04" }
    ]
  },
  {
    slug: "koleoso",
    title: "Koleoso",
    year: 2025,
    country: "Nigeria",
    artworkNote: "No third-party poster is displayed unless an approved usage basis is recorded.",
    genres: ["Drama", "Supernatural", "Yoruba", "Nollywood"],
    languages: ["Yoruba"],
    synopsis: "A continuing Yoruba supernatural family saga built around power, loyalty, betrayal and spiritual conflict.",
    cast: ["Ibrahim Yekini", "Kemi Apesin", "Akinfolarin Olamide", "Kevin Ikeduba", "Jumai Sanni"],
    creators: ["Ibrahim Yekini"],
    status: "ongoing",
    premiereLabel: "Current run began in 2025",
    episodeInfo: "The current YouTube run reached Part 13 / Season 3 by 26 June 2026.",
    watchLinks: [
      {
        platform: "YouTube",
        label: "Watch the latest verified Koleoso part on Itelediconstudio",
        href: "https://www.youtube.com/watch?v=3dre5pN4gXs",
        access: "free-official",
        lastChecked: "2026-10-04",
        note: "Part 13 is published by Itelediconstudio, the series' rights-holder channel."
      }
    ],
    sources: [
      { label: "Itelediconstudio — Koleoso Part 13", url: "https://www.youtube.com/watch?v=3dre5pN4gXs", lastChecked: "2026-10-04" },
      { label: "Voice of Nigeria — Koleoso audience milestone", url: "https://von.gov.ng/koleoso-becomes-youtubes-most-watched-african-film-title/", lastChecked: "2026-10-04" }
    ]
  },
  {
    slug: "wata-shida",
    title: "Wata Shida",
    year: 2025,
    country: "Nigeria",
    artworkNote: "No third-party poster is displayed unless an approved usage basis is recorded.",
    genres: ["Drama", "Romance", "Kannywood"],
    languages: ["Hausa"],
    synopsis: "A northern Nigerian drama about family pressure, relationships and a marriage arrangement that grows into a larger web of rivalry, inheritance and reputation.",
    cast: ["Amal Umar", "Adam Garba", "Fatima Hussaini", "Adam Abdullahi Adam", "Misbahu Aliyu"],
    status: "ongoing",
    premiereLabel: "Series began in 2025",
    episodeInfo: "Season 4 Episode 1 was published on 12 August 2026.",
    watchLinks: [
      {
        platform: "YouTube",
        label: "Watch Season 4 Episode 1 on MURYAR HAUSA TV",
        href: "https://www.youtube.com/watch?v=vycYnqVNoRk",
        access: "free-official",
        lastChecked: "2026-10-04",
        note: "Published by verified MURYAR HAUSA TV."
      }
    ],
    sources: [
      { label: "MURYAR HAUSA TV — Season 4 Episode 1", url: "https://www.youtube.com/watch?v=vycYnqVNoRk", lastChecked: "2026-10-04" }
    ]
  },
  {
    slug: "better-half-2026",
    title: "Better Half",
    year: 2026,
    country: "Nigeria",
    artworkNote: "No third-party poster is displayed unless an approved usage basis is recorded.",
    genres: ["Drama", "Romance", "Nollywood"],
    languages: ["English"],
    synopsis: "A relationship expert whose public advice has become a success story discovers that her own marriage is far more complicated than the formula she shares with others.",
    cast: [],
    status: "upcoming",
    premiereLabel: "Premieres 5 October 2026 on Africa Magic Showcase",
    watchLinks: [
      {
        platform: "Africa Magic Showcase",
        label: "Open Africa Magic",
        href: "https://www.dstv.com/africamagic/en-ng",
        access: "broadcast",
        lastChecked: "2026-10-04",
        note: "Premiere information is current for Africa Magic Showcase; package and replay availability can vary."
      }
    ],
    sources: [
      { label: "October 2026 Nigeria release guide", url: "https://whatkeptmeup.com/preview/new-in-nigeria-movies-and-tv-shows-to-watch-this-october-2026/", lastChecked: "2026-10-04" },
      { label: "Africa Magic", url: "https://www.dstv.com/africamagic/en-ng", lastChecked: "2026-10-04" }
    ]
  },
  {
    slug: "the-ten-2026",
    title: "The Ten",
    year: 2026,
    country: "Nigeria",
    artworkNote: "No third-party poster is displayed unless an approved usage basis is recorded.",
    genres: ["Drama", "Faith", "Nollywood"],
    languages: ["English"],
    synopsis: "Ten survivors are brought back together by faith, forcing them to confront unresolved history, accountability, forgiveness and the limits of redemption.",
    cast: [],
    status: "upcoming",
    premiereLabel: "Premieres 8 October 2026 on Africa Magic Showcase",
    watchLinks: [
      {
        platform: "Africa Magic Showcase",
        label: "Open Africa Magic",
        href: "https://www.dstv.com/africamagic/en-ng",
        access: "broadcast",
        lastChecked: "2026-10-04",
        note: "Premiere information is current for Africa Magic Showcase; package and replay availability can vary."
      }
    ],
    sources: [
      { label: "ShockNG — Africa Magic October premieres", url: "https://shockng.com/new-africa-magic-tv-nollywood-shows-2026/", lastChecked: "2026-10-04" },
      { label: "Africa Magic", url: "https://www.dstv.com/africamagic/en-ng", lastChecked: "2026-10-04" }
    ]
  },
  {
    slug: "afobaje-2026",
    title: "Afobaje",
    year: 2026,
    country: "Nigeria",
    artworkNote: "No third-party poster is displayed unless an approved usage basis is recorded.",
    genres: ["Drama", "Mystery", "Supernatural", "Yoruba"],
    languages: ["Yoruba"],
    synopsis: "A royal heir becomes the main suspect as a mysterious force targets heirs to the throne of Ekinrinade, drawing succession, tradition and supernatural danger into one investigation.",
    cast: [],
    status: "upcoming",
    premiereLabel: "Premieres 10 October 2026 on Africa Magic Yoruba",
    watchLinks: [
      {
        platform: "Africa Magic Yoruba",
        label: "Open Africa Magic",
        href: "https://www.dstv.com/africamagic/en-ng",
        access: "broadcast",
        lastChecked: "2026-10-04",
        note: "Premiere information is current for Africa Magic Yoruba; package and replay availability can vary."
      }
    ],
    sources: [
      { label: "ShockNG — Africa Magic October premieres", url: "https://shockng.com/new-africa-magic-tv-nollywood-shows-2026/", lastChecked: "2026-10-04" },
      { label: "October 2026 Nigeria release guide", url: "https://whatkeptmeup.com/preview/new-in-nigeria-movies-and-tv-shows-to-watch-this-october-2026/", lastChecked: "2026-10-04" }
    ]
  }
];

export function getSeriesTitle(slug: string) {
  return seriesTitles.find((item) => item.slug === slug);
}

export function seriesLastChecked(item: SeriesTitle) {
  return [...item.watchLinks.map((link) => link.lastChecked), ...item.sources.map((source) => source.lastChecked)]
    .reduce((latest, value) => value > latest ? value : latest, "");
}
