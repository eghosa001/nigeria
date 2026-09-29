export type EntertainmentPerson = {
  slug: string;
  name: string;
  roles: string[];
  knownForSlugs: string[];
  summary: string;
};

export const entertainmentPeople: EntertainmentPerson[] = [
  {
    slug: "kunle-afolayan",
    name: "Kunle Afolayan",
    roles: ["Director", "Producer", "Actor"],
    knownForSlugs: ["anikulapo", "ijogbon"],
    summary: "Nigerian filmmaker whose work in this catalog includes the Netflix films Aníkúlápó and Ìjọ̀gbọ̀n.",
  },
  {
    slug: "omoni-oboli",
    name: "Omoni Oboli",
    roles: ["Actor", "Filmmaker", "Producer"],
    knownForSlugs: ["oloture", "irreplaceable", "pieces-that-fit"],
    summary: "Nigerian actor and filmmaker with both streaming credits and a major direct-to-YouTube movie channel.",
  },
  {
    slug: "maurice-sam",
    name: "Maurice Sam",
    roles: ["Actor", "Producer"],
    knownForSlugs: ["what-love-is"],
    summary: "Nigerian actor and producer whose verified YouTube channel publishes full-length Nollywood films.",
  },
  {
    slug: "chinaza-onuzo",
    name: "Chinaza Onuzo",
    roles: ["Director", "Producer", "Writer"],
    knownForSlugs: ["a-lagos-love-story"],
    summary: "Nigerian filmmaker and Inkblot co-founder; Prime Video lists him as director of A Lagos Love Story.",
  },
  {
    slug: "femi-adebayo",
    name: "Femi Adebayo",
    roles: ["Actor", "Producer"],
    knownForSlugs: ["a-mama-deola-wedding-story", "strangers", "kesari-the-king"],
    summary: "Nigerian actor and producer with major Yoruba-language cinema and streaming credits including A Mama Deola Wedding Story, Strangers and Kesari: The King.",
  },
  {
    slug: "kemi-adetiba",
    name: "Kemi Adetiba",
    roles: ["Director", "Creator"],
    knownForSlugs: ["king-of-boys"],
    summary: "Nigerian filmmaker and creator whose catalog credits include King of Boys and later Netflix projects including To Kill a Monkey.",
  },

  {
    slug: "nancy-isime",
    name: "Nancy Isime",
    roles: ["Actor", "Presenter"],
    knownForSlugs: ["tenis-big-day", "love-in-a-pandemic", "levi"],
    summary: "Nigerian actor and presenter with catalog credits spanning romantic comedy, drama and ensemble films.",
  },
  {
    slug: "timini-egbuson",
    name: "Timini Egbuson",
    roles: ["Actor"],
    knownForSlugs: ["big-love", "ajosepo", "ajosepo-the-gathering", "love-and-new-notes"],
    summary: "Nigerian actor featured across contemporary romance, family comedy and drama titles in this catalog.",
  },
  {
    slug: "toyin-abraham",
    name: "Toyin Abraham",
    roles: ["Actor", "Producer", "Filmmaker"],
    knownForSlugs: ["ghost-and-the-tout", "ghost-and-the-tout-too", "ijakumo", "iyalode", "ajosepo-the-gathering"],
    summary: "Nigerian actor and filmmaker with prominent comedy, supernatural and Yoruba-drama credits.",
  },
  {
    slug: "richard-mofe-damijo",
    name: "Richard Mofe-Damijo",
    roles: ["Actor", "Producer"],
    knownForSlugs: ["the-stand-up", "three-wise-men", "palava"],
    summary: "Veteran Nigerian actor whose catalog credits include comedy, family drama and ensemble films.",
  },
  {
    slug: "ramsey-nouah",
    name: "Ramsey Nouah",
    roles: ["Actor", "Director"],
    knownForSlugs: ["levi", "the-cartel", "confusion-na-wa"],
    summary: "Nigerian actor and director represented here in romance, crime and dark-comedy films.",
  },
  {
    slug: "odunlade-adekola",
    name: "Odunlade Adekola",
    roles: ["Actor", "Filmmaker"],
    knownForSlugs: ["ajosepo-the-gathering", "love-and-new-notes", "ghost-and-the-tout-too", "kesari-the-king"],
    summary: "Yoruba-language actor and filmmaker with comedy, drama and epic credits across the catalog.",
  },
  {
    slug: "kunle-remi",
    name: "Kunle Remi",
    roles: ["Actor"],
    knownForSlugs: ["anikulapo", "okanjuwa", "ijakumo"],
    summary: "Nigerian actor represented across period drama, contemporary comedy and thriller titles.",
  },
  {
    slug: "uzor-arukwe",
    name: "Uzor Arukwe",
    roles: ["Actor"],
    knownForSlugs: ["okanjuwa", "the-cartel"],
    summary: "Nigerian actor featured in contemporary drama, comedy and crime titles in this catalog.",
  },
  {
    slug: "kayode-kasum",
    name: "Kayode Kasum",
    roles: ["Director", "Producer"],
    knownForSlugs: ["ajosepo", "ajosepo-the-gathering", "love-and-new-notes"],
    summary: "Nigerian filmmaker whose catalog credits include contemporary family comedy, romance and drama.",
  },
  {
    slug: "adebayo-tijani",
    name: "Adebayo Tijani",
    roles: ["Director", "Actor"],
    knownForSlugs: ["iyalode", "ijakumo", "ori-rebirth"],
    summary: "Yoruba filmmaker represented by epic, thriller and supernatural drama titles in this catalog.",
  },
];

export type PlatformGuide = {
  slug: string;
  name: string;
  aliases?: string[];
  officialUrl: string;
  summary: string;
  status: string;
  sourceKind: "streaming" | "rental" | "publisher" | "catalog";
  offlineLabel?: string;
  offlineHelpUrl?: string;
  lastChecked: string;
};

export const platformGuides: PlatformGuide[] = [
  {
    slug: "netflix",
    name: "Netflix",
    officialUrl: "https://www.netflix.com/ng-en/browse/genre/1077508",
    summary: "Netflix maintains a dedicated Nollywood catalog in Nigeria with movies and series from Nigerian creators.",
    status: "Active Nigerian catalog",
    sourceKind: "streaming",
    offlineLabel: "Eligible titles can be downloaded in the Netflix app for offline viewing.",
    offlineHelpUrl: "https://help.netflix.com/en/node/54816",
    lastChecked: "2026-09-29",
  },
  {
    slug: "youtube",
    name: "YouTube",
    officialUrl: "https://www.youtube.com/",
    summary: "Some Nigerian producers publish complete films directly on their verified YouTube channels. MyNigeriaGuide links only to identifiable rights-holder or producer uploads.",
    status: "Official channel uploads",
    sourceKind: "publisher",
    offlineLabel: "YouTube Premium can download eligible videos for offline playback where the feature is available.",
    offlineHelpUrl: "https://support.google.com/youtube/answer/11977233?hl=en",
    lastChecked: "2026-09-29",
  },
  {
    slug: "prime-video",
    name: "Prime Video",
    officialUrl: "https://www.primevideo.com/",
    summary: "Prime Video carries Nigerian films through subscription, rental and purchase models that can differ by country.",
    status: "Availability varies by title and region",
    sourceKind: "streaming",
    offlineLabel: "Eligible Prime Video titles can be downloaded in supported Prime Video apps for offline viewing.",
    offlineHelpUrl: "https://www.primevideo.com/help?nodeId=GMF637NHNEF9D8GT",
    lastChecked: "2026-09-29",
  },
  {
    slug: "kava",
    name: "Kava",
    officialUrl: "https://kava.tv/",
    summary: "Kava is a subscription-based third-party Nollywood and African cinema platform. Its terms state that content is offered in territories where Kava has licensed it.",
    status: "Licensed third-party streaming platform; availability varies by region",
    sourceKind: "streaming",
    offlineLabel: "Kava supports downloading eligible titles inside its service for offline viewing.",
    offlineHelpUrl: "https://kava.tv/help",
    lastChecked: "2026-09-29",
  },
  {
    slug: "nollistream",
    name: "NolliStream",
    officialUrl: "https://nollistream.com/",
    summary: "NolliStream is a Nigerian ad-supported Nollywood platform whose terms state that its catalog content is owned by NolliStream or its licensors.",
    status: "Legal third-party AVOD platform; exact title availability must be verified before linking",
    sourceKind: "streaming",
    offlineLabel: "The NolliStream service advertises offline downloads inside its app for supported titles.",
    offlineHelpUrl: "https://nollistream.com/",
    lastChecked: "2026-09-29",
  },
  {
    slug: "dstv-stream-boxoffice",
    name: "DStv Stream / BoxOffice",
    aliases: ["DStv Stream"],
    officialUrl: "https://www.dstv.com/en-ng/watch/stream-with-dstv/",
    summary: "DStv Stream carries subscription entertainment in Nigeria and BoxOffice provides official movie rentals where available. Showmax was retired in 2026 as MultiChoice moved customers toward its broader streaming platform.",
    status: "Active in Nigeria; title availability varies by package and region",
    sourceKind: "rental",
    offlineLabel: "The DStv app supports up to 25 offline items for eligible content.",
    offlineHelpUrl: "https://www.dstv.com/en-ng/watch/stream-with-dstv/",
    lastChecked: "2026-09-29",
  },
  {
    slug: "nollywood-com",
    name: "Nollywood.com",
    officialUrl: "https://www.nollywood.com/",
    summary: "A Nigerian-film catalog with movie, cast, crew and box-office records. MyNigeriaGuide can use exact title pages as an additional industry reference, but not as proof that a movie is legally playable or downloadable.",
    status: "Industry catalog and app",
    sourceKind: "catalog",
    lastChecked: "2026-09-29",
  },
];

export function getPlatformGuide(name: string) {
  const normalized = name.trim().toLowerCase();
  return platformGuides.find((guide) =>
    guide.name.toLowerCase() === normalized ||
    guide.aliases?.some((alias) => alias.toLowerCase() === normalized),
  );
}

export type CinemaGuide = {
  slug: string;
  name: string;
  officialUrl: string;
  bookingUrl: string;
  priceUrl?: string;
  locations: string[];
  priceNote: string;
  lastChecked: string;
};

export const cinemaGuides: CinemaGuide[] = [
  {
    slug: "filmhouse",
    name: "Filmhouse Cinemas",
    officialUrl: "https://fh-frontend.filmhouseng.com/",
    bookingUrl: "https://fh-frontend.filmhouseng.com/",
    priceUrl: "https://fh-frontend.filmhouseng.com/ticket-prices",
    locations: ["Lagos", "Ibadan", "Benin City", "Akure", "Port Harcourt"],
    priceNote: "Filmhouse publishes location-specific ticket prices. Standard and premium prices vary by cinema, format and promotion.",
    lastChecked: "2026-09-29",
  },
  {
    slug: "silverbird",
    name: "Silverbird Cinemas",
    officialUrl: "https://silverbirdcinemas.com/",
    bookingUrl: "https://silverbirdcinemas.com/book-movie-ticket/",
    locations: ["Victoria Island, Lagos", "Ikeja, Lagos", "Jabi, Abuja", "SEC Abuja", "Kaduna"],
    priceNote: "Use Silverbird's booking flow for the current movie, location, showtime and final ticket price.",
    lastChecked: "2026-09-29",
  },
  {
    slug: "viva",
    name: "Viva Cinemas",
    officialUrl: "https://web.vivacinemas.com/",
    bookingUrl: "https://web.vivacinemas.com/",
    locations: ["Ikeja", "Lekki", "Ibadan", "Ota", "Enugu", "Ilorin"],
    priceNote: "Viva exposes showtimes by cinema and date. Check the final booking screen for the current ticket price.",
    lastChecked: "2026-09-29",
  },
];

export type ReleaseItem = {
  id: string;
  title: string;
  kind: "streaming" | "cinema" | "event";
  status: "new" | "now-showing" | "upcoming";
  dateLabel: string;
  platform: string;
  summary: string;
  officialUrl: string;
  lastChecked: string;
};

export const releaseItems: ReleaseItem[] = [
  {
    id: "ordinary-people-netflix",
    title: "Ordinary People",
    kind: "streaming",
    status: "new",
    dateLabel: "New on Netflix",
    platform: "Netflix",
    summary: "A 2026 Nollywood crime drama about a couple hiding in a gated estate while undercover agents close in.",
    officialUrl: "https://www.netflix.com/ng/title/82785277",
    lastChecked: "2026-09-29",
  },
  {
    id: "colours-of-fire-netflix",
    title: "Colours of Fire",
    kind: "streaming",
    status: "new",
    dateLabel: "New on Netflix",
    platform: "Netflix",
    summary: "A Nigerian fantasy drama listed by Netflix among its current new Nollywood additions.",
    officialUrl: "https://www.netflix.com/ng/title/82752912",
    lastChecked: "2026-09-29",
  },
  {
    id: "king-of-thieves-2-netflix",
    title: "King of Thieves 2",
    kind: "streaming",
    status: "new",
    dateLabel: "New on Netflix",
    platform: "Netflix",
    summary: "The Yoruba-language sequel is listed by Netflix among its current new Nollywood additions.",
    officialUrl: "https://www.netflix.com/ng/title/82748703",
    lastChecked: "2026-09-29",
  },
  {
    id: "starlomo-silverbird",
    title: "Starlomo",
    kind: "cinema",
    status: "now-showing",
    dateLabel: "Released 25 September 2026",
    platform: "Silverbird Cinemas",
    summary: "A Yoruba-language Nollywood drama currently listed in Silverbird's now-showing catalog.",
    officialUrl: "https://silverbirdcinemas.com/",
    lastChecked: "2026-09-29",
  },
  {
    id: "behind-the-scenes-viva",
    title: "Behind The Scenes",
    kind: "cinema",
    status: "now-showing",
    dateLabel: "Showtimes available",
    platform: "Viva Cinemas",
    summary: "Viva currently lists Behind The Scenes with selectable showtimes across multiple Nigerian cinema locations.",
    officialUrl: "https://web.vivacinemas.com/movies/11fcdd5a-4efb-4b29-994f-39d829c6b2f2",
    lastChecked: "2026-09-29",
  },
  {
    id: "after-credits-club",
    title: "After Credits Club — First Edition",
    kind: "event",
    status: "upcoming",
    dateLabel: "2–4 October 2026",
    platform: "Lagos",
    summary: "A three-day independent film and cultural experience built around screenings, conversation and community.",
    officialUrl: "https://thefedoyinproductions.com/",
    lastChecked: "2026-09-29",
  },
  {
    id: "aaiff-2026",
    title: "All Africans Indie Film Festival 2026",
    kind: "event",
    status: "upcoming",
    dateLabel: "November 2026",
    platform: "Lagos + global livestream",
    summary: "A Nigerian-rooted African film festival with screenings, labs, workshops and conversations.",
    officialUrl: "https://aaiffestival.com/",
    lastChecked: "2026-09-29",
  },
];

export function getEntertainmentPerson(slug: string) {
  return entertainmentPeople.find((person) => person.slug === slug);
}
