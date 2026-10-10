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
  internalLinks?: Array<{ label: string; href: string }>;
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
    ],
    internalLinks: [
      { label: "Once Upon a Village 3 cast & full episode", href: "/entertainment/movies/once-upon-a-village-3" }
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
    synopsis: "A relationship influencer turns her claimed formula for successful love into a reality television show. Secrets within her fiancé’s family threaten the certainty that built her public reputation. The drama contrasts advice delivered to an audience with the harder decisions required inside an actual relationship.",
    cast: ["Treasure Enagbare", "Nnamdi Agbo", "Demi Banwo", "Tolu Asanu"],
    creators: ["Rogba Arimoro"],
    status: "ongoing",
    premiereLabel: "Premiered 5 October 2026 at 8:30 pm on Africa Magic Showcase (DStv 151)",
    episodeInfo: "Broadcast premiere confirmed for 5 October; confirm repeat times and DStv Stream catch-up access with the broadcaster.",
    watchLinks: [
      {
        platform: "Africa Magic Showcase",
        label: "Visit the official Africa Magic channel hub",
        href: "https://www.dstv.com/en-ng/africamagic/",
        access: "broadcast",
        lastChecked: "2026-10-04",
        note: "This opens the official broadcaster hub, not a direct episode. Check DStv Stream or the current TV guide; access depends on your subscription."
      }
    ],
    sources: [
      { label: "Africa Magic 2026 October originals — Independent", url: "https://independent.ng/africa-magic-announces-five-new-originals-for-october/", lastChecked: "2026-10-10" },
      { label: "October 2026 Nigeria release guide", url: "https://whatkeptmeup.com/preview/new-in-nigeria-movies-and-tv-shows-to-watch-this-october-2026/", lastChecked: "2026-10-04" },
      { label: "Africa Magic", url: "https://www.dstv.com/en-ng/africamagic/", lastChecked: "2026-10-04" }
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
    synopsis: "Ten survivors of a kidnapping reunite for a vigil led by a pastor haunted by guilt. When someone is killed inside the gathering and a local festival closes off escape, they realise the danger may already be among them. The psychological thriller explores shared trauma, trust and responsibility as the survivors question their former captors and one another.",
    cast: ["Patrick Dibuah"],
    creators: ["Lota Chukwu"],
    status: "ongoing",
    premiereLabel: "Premiered 8 October 2026 at 8:30 pm on Africa Magic Showcase (DStv 151)",
    episodeInfo: "The 8 October broadcast launch is confirmed; check the broadcaster for repeat times and current streaming access.",
    watchLinks: [
      {
        platform: "Africa Magic Showcase",
        label: "Visit the official Africa Magic channel hub",
        href: "https://www.dstv.com/en-ng/africamagic/",
        access: "broadcast",
        lastChecked: "2026-10-04",
        note: "This opens the official broadcaster hub, not a direct episode. Check DStv Stream or the current TV guide; access depends on your subscription."
      }
    ],
    sources: [
      { label: "Africa Magic October originals — Independent", url: "https://independent.ng/africa-magic-announces-five-new-originals-for-october/", lastChecked: "2026-10-10" },
      { label: "ShockNG — Africa Magic October premieres", url: "https://shockng.com/new-africa-magic-tv-nollywood-shows-2026/", lastChecked: "2026-10-04" },
      { label: "Africa Magic", url: "https://www.dstv.com/en-ng/africamagic/", lastChecked: "2026-10-04" }
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
    synopsis: "Twenty-nine years after a betrayal changed the fictional Ekinrinade monarchy, a rejected spiritual guardian returns alongside a surviving heir. As deaths accumulate, Crown Prince Aderounmu investigates the figures who secured power after the old regime fell. The mystery pits revenge against restraint and forces the prince to question what his lineage means for the kingdom.",
    cast: ["Antar Laniyan", "Aina Gold", "Murphy Ray", "Abija"],
    status: "ongoing",
    premiereLabel: "Premiere announced for 10 October 2026; weekends at 7 pm on Africa Magic Yoruba (DStv 157)",
    episodeInfo: "Saturday and Sunday broadcasts have been announced. Check the current official guide for individual episode times.",
    watchLinks: [
      {
        platform: "Africa Magic Yoruba",
        label: "Visit the official Africa Magic channel hub",
        href: "https://www.dstv.com/en-ng/africamagic/",
        access: "broadcast",
        lastChecked: "2026-10-04",
        note: "This opens the official broadcaster hub, not a direct episode; confirm the show on DStv channel 157 and check subscription and replay access."
      }
    ],
    sources: [
      { label: "Africa Magic October originals — Independent", url: "https://independent.ng/africa-magic-announces-five-new-originals-for-october/", lastChecked: "2026-10-10" },
      { label: "ShockNG — Africa Magic October premieres", url: "https://shockng.com/new-africa-magic-tv-nollywood-shows-2026/", lastChecked: "2026-10-04" },
      { label: "October 2026 Nigeria release guide", url: "https://whatkeptmeup.com/preview/new-in-nigeria-movies-and-tv-shows-to-watch-this-october-2026/", lastChecked: "2026-10-04" }
    ]
  },
  {
    slug: "sirrin-amarya-2026",
    title: "Sirrin Amarya (The Bride's Secret)",
    year: 2026,
    country: "Nigeria",
    artworkNote: "Series details are verified from the broadcaster's October slate and production coverage; no unlicensed artwork is displayed.",
    genres: ["Psychological thriller", "Mystery", "Family drama", "Romance", "Kannywood"],
    languages: ["Hausa"],
    synopsis: "Zainab vanishes shortly before her wedding to a prominent businessman in northern Nigeria. What begins as an urgent search brings two influential families into conflict; the groom's eldest son investigates and uncovers a decade-old trail of secrets, betrayal and divided loyalties. The Hausa-language thriller asks whether the disappearance conceals a personal decision or a wider family scheme.",
    cast: ["Norah Ego", "Aysha Usman Adam"],
    creators: ["Chidozie Christian Ahaiwe"],
    status: "ongoing",
    premiereLabel: "Premiered Saturday 10 October 2026 at 8:00 pm on Africa Magic Hausa, DStv channel 156",
    episodeInfo: "Announced as a 26-episode Hausa series. The broadcaster controls repeat times and DStv Stream availability; check the current programme guide before watching.",
    watchLinks: [
      {
        platform: "Africa Magic Hausa",
        label: "Visit Africa Magic's official channel hub",
        href: "https://www.dstv.com/en-ng/africamagic/",
        access: "broadcast",
        lastChecked: "2026-10-10",
        note: "This opens the official broadcaster hub, not a direct episode. The show was announced on DStv channel 156; confirm the TV schedule and your package."
      }
    ],
    sources: [
      { label: "Africa Magic October originals — programme announcement reported by Independent", url: "https://independent.ng/africa-magic-announces-five-new-originals-for-october/", lastChecked: "2026-10-10" },
      { label: "Africa Magic October premieres and episode context — What Kept Me Up", url: "https://whatkeptmeup.com/preview/new-in-nigeria-movies-and-tv-shows-to-watch-this-october-2026/", lastChecked: "2026-10-10" },
      { label: "Africa Magic — official television and streaming information", url: "https://www.dstv.com/en-ng/africamagic/", lastChecked: "2026-10-10" }
    ],
    internalLinks: [
      { label: "Browse other Nigerian TV series", href: "/entertainment/series" }
    ]
  },
  {
    slug: "onu-ahia-nwanyi-2026",
    title: "Onu Ahia Nwanyi",
    year: 2026,
    country: "Nigeria",
    artworkNote: "No unlicensed third-party image is used.",
    genres: ["Drama", "Romance", "Family", "Igbo-language series", "Nollywood"],
    languages: ["Igbo"],
    synopsis: "Nkem enters a traditional bride-selection contest as a possible escape from difficult circumstances at home. The decision places her inside the rival interests of powerful families, where she discovers an unexpected connection with the very man at the centre of the competition. Her feelings complicate a contest driven by family expectations, hidden plans and status.",
    cast: [],
    creators: ["Smart Ifeanyi Chukwu Abugu"],
    status: "ongoing",
    premiereLabel: "Premiere announced for Saturday 10 October 2026 at 7:30 pm on Africa Magic Igbo, DStv channel 159",
    episodeInfo: "The October slate confirms a new Igbo-language drama but does not supply an independently verified full cast or episode count. Viewers should check the broadcaster's current programme guide for repeat times.",
    watchLinks: [
      {
        platform: "Africa Magic Igbo",
        label: "Visit Africa Magic's official channel hub",
        href: "https://www.dstv.com/en-ng/africamagic/",
        access: "broadcast",
        lastChecked: "2026-10-10",
        note: "This opens the official broadcaster hub, not a direct episode. The show was announced on DStv channel 159; confirm the TV schedule and your package."
      }
    ],
    sources: [
      { label: "Africa Magic October slate — Independent", url: "https://independent.ng/africa-magic-announces-five-new-originals-for-october/", lastChecked: "2026-10-10" },
      { label: "October Nigerian TV premieres — What Kept Me Up", url: "https://whatkeptmeup.com/preview/new-in-nigeria-movies-and-tv-shows-to-watch-this-october-2026/", lastChecked: "2026-10-10" },
      { label: "Africa Magic — official broadcaster", url: "https://www.dstv.com/en-ng/africamagic/", lastChecked: "2026-10-10" }
    ],
    internalLinks: [
      { label: "Browse other Nigerian TV series", href: "/entertainment/series" }
    ]
  },

];

export function getSeriesTitle(slug: string) {
  return seriesTitles.find((item) => item.slug === slug);
}

export function seriesLastChecked(item: SeriesTitle) {
  return [...item.watchLinks.map((link) => link.lastChecked), ...item.sources.map((source) => source.lastChecked)]
    .reduce((latest, value) => value > latest ? value : latest, "");
}
