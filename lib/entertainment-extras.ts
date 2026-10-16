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
    lastChecked: "2026-10-06",
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
    lastChecked: "2026-10-06",
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
    lastChecked: "2026-10-06",
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
    lastChecked: "2026-10-06",
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
    lastChecked: "2026-10-06",
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
    lastChecked: "2026-10-06",
  },
  {
    slug: "nollywood-com",
    name: "Nollywood.com",
    officialUrl: "https://www.nollywood.com/",
    summary: "A Nigerian-film catalog with movie, cast, crew and box-office records. MyNigeriaGuide can use exact title pages as an additional industry reference, but not as proof that a movie is legally playable or downloadable.",
    status: "Industry catalog and app",
    sourceKind: "catalog",
    lastChecked: "2026-10-06",
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
    lastChecked: "2026-10-06",
  },
  {
    slug: "silverbird",
    name: "Silverbird Cinemas",
    officialUrl: "https://silverbirdcinemas.com/",
    bookingUrl: "https://silverbirdcinemas.com/book-movie-ticket/",
    locations: ["Victoria Island, Lagos", "Ikeja, Lagos", "Jabi, Abuja", "SEC Abuja", "Kaduna"],
    priceNote: "Use Silverbird's booking flow for the current movie, location, showtime and final ticket price.",
    lastChecked: "2026-10-06",
  },
  {
    slug: "viva",
    name: "Viva Cinemas",
    officialUrl: "https://web.vivacinemas.com/",
    bookingUrl: "https://web.vivacinemas.com/",
    locations: ["Ikeja", "Lekki", "Ibadan", "Ota", "Enugu", "Ilorin"],
    priceNote: "Viva exposes showtimes by cinema and date. Check the final booking screen for the current ticket price.",
    lastChecked: "2026-10-06",
  },
];

export type ReleaseItem = {
  id: string;
  title: string;
  kind: "streaming" | "cinema" | "event";
  status: "new" | "now-showing" | "upcoming" | "ended";
  startDate?: string;
  endDate?: string;
  dateLabel: string;
  platform: string;
  summary: string;
  officialUrl: string;
  lastChecked: string;
};

export const releaseItems: ReleaseItem[] = [
  {
    id: "my-30th-wedding-youtube-2026",
    title: "My 30th Wedding",
    kind: "streaming",
    status: "new",
    startDate: "2026-10-01",
    dateLabel: "Premiered 1 October 2026 on Bimbo Ademoye TV",
    platform: "YouTube — Bimbo Ademoye TV",
    summary: "Bimbo Ademoye and Timini Egbuson star in this 149-minute romantic comedy, now available as an official free full-length YouTube film.",
    officialUrl: "https://www.youtube.com/watch?v=0_JzNVzFukE",
    lastChecked: "2026-10-11",
  },
  {
    id: "love-on-credit-youtube-2026",
    title: "Love On Credit",
    kind: "streaming",
    status: "new",
    startDate: "2026-10-04",
    dateLabel: "Premiered 4 October 2026 on Nollyfamily TV",
    platform: "YouTube — Nollyfamily TV",
    summary: "A Nigerian relationship drama led by Sonia Uche, Omeche Oko and Bright Morgan; the official full movie is available free on YouTube.",
    officialUrl: "https://www.youtube.com/watch?v=yuDQCaeGCwk",
    lastChecked: "2026-10-11",
  },
  {
    id: "issakaba-the-return-2026-cinema",
    title: "Issakaba: The Return",
    kind: "cinema",
    status: "upcoming",
    startDate: "2026-11-13",
    dateLabel: "Nigerian cinema release announced for 13 November 2026",
    platform: "Nigerian cinemas — showtimes to be confirmed",
    summary: "Sam Dede reprises Ebube in a new Issakaba chapter from Lancelot Oduwa Imasuen. Film catalog records show 13 November as the announced release; specific theatre listings remain to be confirmed.",
    officialUrl: "https://nollywood.com/movies/issakaba-the-return",
    lastChecked: "2026-10-10",
  },
  {
    id: "agbara-nla-the-return-cinema",
    title: "Agbara Nla: The Return",
    kind: "cinema",
    status: "now-showing",
    startDate: "2026-10-02",
    endDate: "2026-10-22",
    dateLabel: "16–22 October Galleria listings checked — verify selected cinema",
    platform: "Nigerian cinemas",
    summary: "Silverbird's Galleria schedule for 16–22 October 2026 lists Agbara Nla: The Return, a Yoruba/English drama released on 2 October. Its listed sessions vary by day, and any screening or advance ticket must be confirmed with the chosen cinema; this is not a guarantee of a countrywide showtime.",
    officialUrl: "https://silverbirdcinemas.com/movie/agbara-nla-the-return/",
    lastChecked: "2026-10-17",
  },
  // Source review 2026-10-15: Distributor primary film announcement https://www.tntheatrical.com/post/desmond-elliot-ibrahim-suleiman-and-fehintola-olulana-lead-new-political-drama-first-lady-in-cinem ; dated listing https://www.tntheatrical.com/all-movies .
  {
    id: "first-lady-2026-cinema",
    title: "First Lady",
    kind: "cinema",
    status: "upcoming",
    startDate: "2026-10-16",
    dateLabel: "Distributor-announced cinema release: 16 October 2026",
    platform: "Tribe Nation Theatrical / cinemas",
    summary: "Fehintola Olulana leads and wrote this Yinka Akanbi-directed Lagos political and family drama about a first lady whose struggle with motherhood threatens her marriage and public life. Desmond Elliot, Ibrahim Suleiman, Ngozi Nwosu and Jaiye Kuti are among the billed cast. Tribe Nation Theatrical confirms 16 October as the cinema release date; confirm showtimes with your local exhibitor.",
    officialUrl: "https://www.tntheatrical.com/post/desmond-elliot-ibrahim-suleiman-and-fehintola-olulana-lead-new-political-drama-first-lady-in-cinem",
    lastChecked: "2026-10-15",
  },
  // Source review 2026-10-15: Broadcaster's October press announcement at https://businesspost.ng/showbiz/africa-magic-announces-five-new-originals-for-october/ ; Better Half appears on official https://www.dstv.com/en-ng/africamagic/ .
  {
    id: "better-half-africa-magic-2026",
    title: "Better Half",
    kind: "streaming",
    status: "new",
    startDate: "2026-10-05",
    dateLabel: "Premiered 5 October 2026 at 8:30 PM; Monday–Wednesday episodes announced",
    platform: "Africa Magic Showcase",
    summary: "A relationship influencer gets a reality show to test her formula for love, but secrets around her fiancé's family threaten her confidence. Executive produced by Rogba Arimoro and featuring Treasure Enagbare, Nnamdi Agbo, Demi Banwo and Tolu Asanu. Africa Magic announced a 5 October debut on Showcase (DStv 151, GOtv 8); check the broadcaster's current schedule and DStv Stream for access.",
    officialUrl: "https://www.dstv.com/en-ng/africamagic/",
    lastChecked: "2026-10-15",
  },
  // Source review 2026-10-15: Africa Magic press announcement https://businesspost.ng/showbiz/africa-magic-announces-five-new-originals-for-october/ ; official DStv EPG first episode https://www.dstv.com/en-ng/africamagic/ .
  {
    id: "the-ten-africa-magic-2026",
    title: "The Ten",
    kind: "streaming",
    status: "upcoming",
    startDate: "2026-10-08",
    dateLabel: "Scheduled 8 October 2026 at 8:30 PM; Thursday–Friday episodes announced",
    platform: "Africa Magic Showcase",
    summary: "Lota Chukwu's psychological thriller reunites ten survivors of a kidnapping for a church vigil, before another death raises doubts about whom they can trust. Patrick Dibuah plays pastor Matthew. Africa Magic's published programme schedule lists the first episode on 8 October on Showcase (DStv 151, GOtv 8); check the broadcaster for current episodes or catch-up access.",
    officialUrl: "https://www.dstv.com/en-ng/africamagic/",
    lastChecked: "2026-10-15",
  },
  // Source review 2026-10-15: Broadcaster's October lineup announcement, syndicated https://businesspost.ng/showbiz/africa-magic-announces-five-new-originals-for-october/ ; official broadcaster https://www.dstv.com/en-ng/africamagic/ . Current individual episode availability not verified.
  {
    id: "afobaje-africa-magic-2026",
    title: "Afobaje",
    kind: "streaming",
    status: "upcoming",
    startDate: "2026-10-10",
    dateLabel: "Africa Magic Yoruba debut scheduled 10 October 2026, 7 PM",
    platform: "Africa Magic Yoruba",
    summary: "A Yoruba-language palace mystery set in the Ekinrinade Confederation: as the royal succession unravels, Crown Prince Aderounmu investigates deaths linked to an old betrayal. Africa Magic's October programme announcement lists DStv channel 157 and GOtv channel 2 for the 10 October premiere, with weekend episodes. Check the broadcaster for current repeats or streaming access.",
    officialUrl: "https://www.dstv.com/en-ng/africamagic/",
    lastChecked: "2026-10-15",
  },
  // Source review 2026-10-15: Director interview and announced date https://thenollywoodreporter.com/tv/why-pushing-30-is-debuting-on-tv-orobosa-ikponmwen/ ; Africa Magic 18 Oct EPG corroboration https://pulzz.stream/guide?country=NG&date=2026-10-18&time_block=prime&type=ALL .
  {
    id: "pushing-30-africa-magic-2026",
    title: "Pushing 30",
    kind: "streaming",
    status: "upcoming",
    startDate: "2026-10-18",
    dateLabel: "Africa Magic Showcase premiere scheduled 18 October 2026, 8 PM",
    platform: "Africa Magic Showcase",
    summary: "Orobosa Ikponmwen directs a Lagos ensemble dramedy written by Mannie Oiseomaye. On tech founder Osaze Imafidon's 30th birthday, unresolved tensions among friends upend a seemingly successful life. Director interviews and the 18 October television guide confirm the planned 8 PM Africa Magic Showcase slot; this is a TV premiere, not an official free YouTube full-movie release.",
    officialUrl: "https://www.dstv.com/en-ng/africamagic/",
    lastChecked: "2026-10-15",
  },
  // Source review 2026-10-15: Producer's film trailer https://linktr.ee/sutoriteraprojects ; cinema release and director cross-checked against https://www.imdb.com/title/tt31776257/ . No live tickets verified.
  {
    id: "a-land-apart-cinema-2026",
    title: "A Land Apart",
    kind: "cinema",
    status: "upcoming",
    startDate: "2026-10-23",
    dateLabel: "Announced Nigerian cinema release: 23 October 2026",
    platform: "Nigerian cinemas",
    summary: "Pever Bem's alternate-history drama follows the secret daughter of a powerful agricultural entrepreneur as a disputed crop formula attracts international pressure. Richard Mofe-Damijo, Princess Mufeedah and Daniel Etim Effiong lead the cast. The producer publishes an official trailer; the 23 October date is a release announcement, not a confirmed booking at every cinema.",
    officialUrl: "https://linktr.ee/sutoriteraprojects",
    lastChecked: "2026-10-15",
  },
  // Source review 2026-10-15: Official film account 14 Oct https://x.com/telexzikora/status/2110282395245293831 ; premiere note https://x.com/telexzikora/status/2110048097522860509 ; Cinemax distribution cross-check https://contenthub.broadcastmediaafrica.com/display-news/nollywood-campus-romance-tele-x-zikora-set-for-nigerian-cinema-release-382 .
  {
    id: "tele-x-zikora-cinema-2026",
    title: "Tele x Zikora",
    kind: "cinema",
    status: "upcoming",
    startDate: "2026-10-23",
    dateLabel: "Film-account-announced Nigerian cinema release: 23 October 2026",
    platform: "Nigerian cinemas",
    summary: "Adenike Adebayo-Esho's campus romance follows Tele and Zikora, two Lagos Metropolitan University students from different backgrounds. Mike Afolarin and Genoveva Umeh lead the cast. The official film account reaffirmed the 23 October cinema date on 14 October and announced an 18 October launch event; neither a launch event nor an advance trailer proves that tickets are currently on sale.",
    officialUrl: "https://x.com/telexzikora",
    lastChecked: "2026-10-15",
  },
  // Source review 2026-10-15: Filmmaker's primary credit list https://ifeomachukwuogo.com/film ; 30 October Nigerian release cross-checked via https://ynaija.com/nollywood-movies-and-series-coming-out-this-october-2026/ ; no confirmed showtime.
  {
    id: "phoenix-fury-cinema-2026",
    title: "Phoenix Fury",
    kind: "cinema",
    status: "upcoming",
    startDate: "2026-10-30",
    dateLabel: "Reported Nigerian cinema release: 30 October 2026",
    platform: "Nigeria & Ghana cinemas",
    summary: "Ifeoma Nkiruka Chukwuogo's revenge drama crosses Nigeria and Ghana over several decades. The filmmaker's production page credits Richard Mofe-Damijo, Ama K. Abebrese, Uzoamaka Power, Tina Mba and Adjetey Anang, and identifies a 2026 release. Nigerian film listings report 30 October for cinemas, but individual showtimes and a distributor-confirmed ticket link are not yet verified.",
    officialUrl: "https://ifeomachukwuogo.com/film",
    lastChecked: "2026-10-15",
  },
  // Source review 2026-10-15: Cinema operator's 14 Oct primary announcement https://x.com/SilverbCinemas/status/2110329723457057117 ; no live showtime or ticket checkout verified.
  {
    id: "wire-transfer-cinema-2026",
    title: "Wire Transfer",
    kind: "cinema",
    status: "upcoming",
    startDate: "2026-10-30",
    dateLabel: "Silverbird Cinemas-announced release: 30 October 2026",
    platform: "Silverbird Film Distribution",
    summary: "A Nigerian crime thriller about an ambitious criminal crew whose planned operation spirals into trouble. Silverbird Cinemas reaffirmed the 30 October theatrical date in a 14 October official post. A cinema release announcement does not confirm any particular screening or ticket price; check current local showtimes before travelling.",
    officialUrl: "https://x.com/SilverbCinemas/status/2110329723457057117",
    lastChecked: "2026-10-15",
  },
  {
    id: "black-market-cinema",
    title: "Black Market",
    kind: "cinema",
    status: "now-showing",
    startDate: "2026-10-02",
    endDate: "2026-10-22",
    dateLabel: "16–22 October Galleria listing checked — times may change",
    platform: "Nigerian cinemas",
    summary: "Silverbird's Galleria schedule for 16–22 October 2026 lists Black Market, an English-language drama released on 2 October, with time slots dependent on the day. A listing at Victoria Island cannot confirm a screening at other Silverbird sites or guarantee a ticket at checkout.",
    officialUrl: "https://silverbirdcinemas.com/cinema/galleria/",
    lastChecked: "2026-10-17",
  },
  {
    id: "mko-documentary-cinema",
    title: "MKO",
    kind: "cinema",
    status: "now-showing",
    startDate: "2026-10-02",
    endDate: "2026-10-22",
    dateLabel: "Galleria 16–22 October: only specific weekdays have listed times",
    platform: "Nigerian cinemas",
    summary: "Silverbird's 16–22 October Galleria schedule lists the documentary MKO with Monday/Tuesday/Thursday sessions, while Friday–Sunday entries say 'to be updated'. That is not a confirmed Saturday show or a national release timetable; open the venue calendar or call its box office before paying.",
    officialUrl: "https://silverbirdcinemas.com/cinema/galleria/",
    lastChecked: "2026-10-17",
  },
  {
    id: "colours-of-fire-netflix",
    title: "Colours of Fire",
    kind: "streaming",
    status: "new",
    dateLabel: "Netflix Nigeria title listing verified; playback not personally tested",
    platform: "Netflix",
    summary: "Netflix's Nigerian title page identifies Colours of Fire (2025), a fantasy drama with Uzor Arukwe, Osas Ighodaro and Ibrahim Chatta. A public catalogue page is not proof of completed login or actual video playback; confirm the title opens in your own Netflix account before claiming Nigeria streaming access.",
    officialUrl: "https://www.netflix.com/ng/title/82752912",
    lastChecked: "2026-10-17",
  },
  {
    id: "king-of-thieves-2-netflix",
    title: "King of Thieves 2",
    kind: "streaming",
    status: "new",
    dateLabel: "Netflix Nigeria film-specific listing checked; account access required",
    platform: "Netflix",
    summary: "Netflix Nigeria's title page for King of Thieves 2 lists a 2025 Yoruba-language drama starring Femi Adebayo, Yemi Solade and Gabriel Afolayan. This is a film-specific catalogue listing, not a verified playback test or permission to reproduce the video; confirm service eligibility from your account.",
    officialUrl: "https://www.netflix.com/ng/title/82748703",
    lastChecked: "2026-10-17",
  },
  {
    id: "starlomo-silverbird",
    title: "Starlomo",
    kind: "cinema",
    status: "now-showing",
    startDate: "2026-09-25",
    endDate: "2026-10-22",
    dateLabel: "16–22 October Galleria screening listing checked",
    platform: "Silverbird Cinemas",
    summary: "Silverbird's 16–22 October 2026 Galleria schedule lists the Yoruba-language film Starlomo, released 25 September, and its film page attributes directing to Kayode Kasum. The posted venue-dependent times can change; do not assume every cinema or future week still has a show.",
    officialUrl: "https://silverbirdcinemas.com/movie/starlomo/",
    lastChecked: "2026-10-17",
  },
  {
    id: "behind-the-scenes-viva",
    title: "Behind The Scenes",
    kind: "cinema",
    status: "now-showing",
    startDate: "2026-10-08",
    endDate: "2026-10-14",
    dateLabel: "Previously listed showtimes: 8–14 October 2026",
    platform: "Viva Cinemas",
    summary: "Viva Cinemas listed dated sessions from 8–14 October 2026 at venues including Ikeja, Ibadan, Ota, Enugu and Ilorin. Those dates have passed; a current session is not independently confirmed. Check the official booking page for new dates before travelling.",
    officialUrl: "https://web.vivacinemas.com/movies/11fcdd5a-4efb-4b29-994f-39d829c6b2f2",
    lastChecked: "2026-10-15",
  },
  {
    id: "after-credits-club",
    title: "After Credits Club — First Edition",
    kind: "event",
    status: "ended",
    startDate: "2026-10-02",
    endDate: "2026-10-04",
    dateLabel: "Scheduled 2–4 October 2026 — dates passed",
    platform: "Lagos",
    summary: "The organiser advertised After Credits Club for 2–4 October 2026 in Lagos. Those dates have passed, but its official page still displays pre-event planning and future ticketing language; the event's completion and any later edition are not independently confirmed. Treat this as a historical schedule, not an active ticket offer.",
    officialUrl: "https://thefedoyinproductions.com/",
    lastChecked: "2026-10-10",
  },
  {
    id: "aaiff-2026",
    title: "All Africans Indie Film Festival 2026",
    kind: "event",
    status: "upcoming",
    startDate: "2026-11-28",
    endDate: "2026-11-28",
    dateLabel: "28 November 2026 · Silverbird Galleria, Lagos",
    platform: "Silverbird Galleria, Victoria Island, Lagos",
    summary: "The organiser confirms a one-day festival on Saturday 28 November at Silverbird Galleria, Lagos, with film screenings, panels, labs and creative exchange. The film submission deadline is 30 October 2026. Check registration and the final programme at the organiser's official festival page; a global livestream for every session has not been confirmed.",
    officialUrl: "https://www.aaiffestival.com/festival",
    lastChecked: "2026-10-10",
  },
];

export function getEntertainmentPerson(slug: string) {
  return entertainmentPeople.find((person) => person.slug === slug);
}


/** Film-card references are not person-biography evidence. Only these reviewed
 * author-written dossiers can make a people page indexable. */
export type PersonEditorialSection = { heading: string; paragraphs: string[]; sources: number[] };
export type PersonEditorialReference = { label: string; href: string; lastChecked: string };
export type PersonEditorialProfile = { intro: string[]; sections: PersonEditorialSection[]; sources: PersonEditorialReference[]; lastReviewed: string };
export const personEditorialProfiles: Record<string, PersonEditorialProfile> = {
  "femi-adebayo": {
    "intro": [
      "Femi Adebayo is a Nigerian actor and filmmaker whose Yoruba-language films include action, drama and cultural storytelling. His role in Jagun Jagun is documented by Netflix, while direct interviews provide better evidence for the production decisions than unsourced biography compilations. This profile distinguishes credited appearances from what he says about creating the work.",
      "Adebayo's film career is also a question of how films reach viewers. Interviews about King of Thieves, Jagun Jagun and Seven Doors show that theatrical and streaming releases can involve different economic choices. A claim about an old premiere is not proof that a film can be watched on a specific service today."
    ],
    "sections": [
      {
        "heading": "Jagun Jagun: an official credited performance",
        "paragraphs": [
          "Netflix lists Jagun Jagun as a 2023 Yoruba-language action film and identifies Femi Adebayo among the starring performers, alongside Lateef Adedimeji and Odunlade Adekola. Its central story follows a warrior recruit entering an elite army dominated by a ruthless leader. That distributor evidence supports the title, the broad plot and Adebayo's listed cast status, not every circulating anecdote about its creation.",
          "The film draws on a period-action setting, but a fictional warlord and the characters' experiences should not be passed off as a documentary record of Yoruba history. To answer a specific cast question, use Netflix's performer list or a film's end credits rather than assigning character names from a plot description. The film's official page should also be checked before claiming any particular region still offers it."
        ],
        "sources": [
          0
        ]
      },
      {
        "heading": "What the producer said about developing stories",
        "paragraphs": [
          "In an interview published by BusinessDay, Adebayo said he had conceived Jagun Jagun before King of Thieves, then chose to test his ability to handle a large production with the earlier project. This is an attributed description of his decision-making; it does not independently establish the budget, wages or earnings of either film.",
          "Speaking to Independent about Seven Doors, he explained that he wanted a culturally grounded story with wider appeal. He contrasted the two productions' genres and discussed how an initial script idea was developed with collaborators rather than by one person working alone. The distinction matters: a star's participation does not mean that every creative department, script and directorial credit belongs to the same person."
        ],
        "sources": [
          1,
          2
        ]
      },
      {
        "heading": "Why cinema and streaming releases differ",
        "paragraphs": [
          "A PUNCH interview records Adebayo discussing cinema distribution and deals with streaming platforms. He linked those choices to recouping investments, the structure of theatrical distribution and the potential international reach of Netflix. He named films including King of Thieves and Jagun Jagun as examples from his own experience, which is stronger evidence than an anonymous box-office ranking.",
          "It is not accurate to turn his explanations into a universal prediction that cinema is inferior or that Netflix is permanently the home of all his future work. Each release has its own distribution contract and marketing timetable. Readers should check a specific movie's current official source before following a watch link or relying on an old planned-release announcement."
        ],
        "sources": [
          0,
          3
        ]
      },
      {
        "heading": "How to read the credits and the evidence",
        "paragraphs": [
          "The useful questions for someone following Adebayo are whether he acted, produced, directed or collaborated on a film; what its release year and format are; and where current legal viewing information can be confirmed. Jagun Jagun has a directly verifiable on-screen listing, while the interviews help explain the development and distribution context. These are different kinds of sources with different evidentiary value.",
          "The linked titles below are a selection from MyNigeriaGuide's own film directory, not a complete filmography or an independently verified awards archive. We do not assign roles from film synopses, infer personal earnings from theatrical grosses or publish unverified family and relationship speculation. This approach makes the page useful to someone researching the films rather than filling it with claims that cannot be checked."
        ],
        "sources": [
          0,
          1,
          2,
          3
        ]
      }
    ],
    "sources": [
      {
        "label": "Netflix — Jagun Jagun film, year and credited cast",
        "href": "https://www.netflix.com/title/81681240",
        "lastChecked": "2026-10-15"
      },
      {
        "label": "BusinessDay — Femi Adebayo on developing Jagun Jagun",
        "href": "https://businessday.ng/bd-weekender/article/jagun-jagun-is-only-a-fiction-it-is-not-tied-to-any-activity-producer/",
        "lastChecked": "2026-10-15"
      },
      {
        "label": "Independent Nigeria — Femi Adebayo discusses Seven Doors",
        "href": "https://independent.ng/my-team-initially-rejected-seven-doors-femi-adebayo/",
        "lastChecked": "2026-10-15"
      },
      {
        "label": "PUNCH — interview on film distribution and family collaboration",
        "href": "https://punchng.com/my-father-helped-me-beat-his-records-femi-adebayo/",
        "lastChecked": "2026-10-15"
      }
    ],
    "lastReviewed": "2026-10-15"
  },
  "kunle-afolayan": {
    "intro": [
      "Kunle Afolayan is a Nigerian film director, producer and actor known for work that crosses cinema, festivals and streaming. His career and Golden Effects Pictures are documented by the Nigerian Copyright Commission and the African Film Festival, while Netflix's own announcements clarify some of his later distribution relationships.",
      "This profile focuses on verifiable career developments instead of assuming a selected cast-list represents all of his projects. Afolayan's name can appear as a director, producer or actor: those are not interchangeable credits. Official title pages and historical festival records are useful for different questions."
    ],
    "sections": [
      {
        "heading": "From a film family to directing",
        "paragraphs": [
          "The African Film Festival's profile records that Afolayan is a son of the filmmaker Ade Love. It describes studying economics, working in a bank, doing occasional acting and pursuing filmmaking training at the New York Film Academy before moving more fully into film. Nigeria's Copyright Commission independently identifies him as an actor, producer and director and links his work to productions dating back to the 1990s.",
          "Those details explain a professional shift rather than a mythical overnight rise to fame. Acting experience was one part of the path, while producing and directing required additional skills and collaborations. Neither source should be stretched into a claim that he personally wrote every screenplay or that the film company created every title he appeared in."
        ],
        "sources": [
          0,
          1
        ]
      },
      {
        "heading": "A selective filmography worth examining",
        "paragraphs": [
          "The African Film Festival lists Irapada, The Figurine, Phone Swap, October 1, The CEO, Citation and Swallow among productions connected with Afolayan. These films are useful milestones across supernatural drama, contemporary comedy, historical storytelling and other genres. A festival filmography records an artistic career; it does not verify today's screening times, regional streaming licences or actor roles for every performer.",
          "The festival's profile notes that Phone Swap was screened in France at NollywoodWeek Paris and recognised by an audience-choice award, while The Figurine received honours at the African Movie Academy Awards. Historical award information should be attributed to the relevant organisers rather than expanded into made-up totals. To research a single title, compare its festival description with its original credits and distributor information."
        ],
        "sources": [
          1
        ]
      },
      {
        "heading": "Netflix's documented collaboration",
        "paragraphs": [
          "Netflix's newsroom announced a three-film partnership with Afolayan in March 2021. The announcement identified an adaptation of Sefi Atta's Swallow and referred to established films including The CEO, October 1, The Figurine and Citation. This gives readers primary-source evidence of a particular production-and-distribution relationship, rather than a vague claim that Netflix bought his entire film library.",
          "Netflix's own Aníkúlápó page lists a 2022 fantasy film with a Yoruba original-audio track and credited performers including Kunle Remi and Bimbo Ademoye. Its synopsis centres on a traveller, royal intrigue and a mystical return to life. Those facts help classify the film, but the cast listing does not establish that Afolayan played the lead character or that related future productions are automatically available."
        ],
        "sources": [
          2,
          3
        ]
      },
      {
        "heading": "Golden Effects and checking production roles",
        "paragraphs": [
          "The Nigerian Copyright Commission calls Afolayan the chief executive of Golden Effects Pictures. The African Film Festival dates the company's founding to 2005. Corporate activity helps explain why his professional profile includes production as well as directing. A company's portfolio, however, should not be presented as a verified list of films that one individual personally directed.",
          "For each film, look for the explicit director, writer, cast, producer and distributor fields, rather than assuming that one well-known filmmaker performed all five functions. Use our title-specific film guides to see the released story, source-backed credits and current legal viewing routes. This page intentionally avoids invented reviews, private wealth estimates and unsupported claims about awards or family members."
        ],
        "sources": [
          0,
          1,
          2,
          3
        ]
      }
    ],
    "sources": [
      {
        "label": "Nigerian Copyright Commission — Kunle Afolayan",
        "href": "https://copyright.gov.ng/kunle-afolayan-2/",
        "lastChecked": "2026-10-15"
      },
      {
        "label": "African Film Festival — Afolayan biography and filmography",
        "href": "https://africanfilmny.org/directors/kunle-afolayan/",
        "lastChecked": "2026-10-15"
      },
      {
        "label": "Netflix Newsroom — Kunle Afolayan three-film agreement (2021)",
        "href": "https://about.netflix.com/en/news/more-naija-stories-from-kunle-afolayan-coming-to-netflix",
        "lastChecked": "2026-10-15"
      },
      {
        "label": "Netflix — Aníkúlápó title and credited cast",
        "href": "https://www.netflix.com/ng/title/81392197",
        "lastChecked": "2026-10-15"
      }
    ],
    "lastReviewed": "2026-10-15"
  },
  "timini-egbuson": {
    "intro": [
      "Timini Egbuson is a Nigerian actor with credits across film romance, drama and ensemble productions. Independent reporting on Reel Love provides confirmed examples of his acting and executive-producing work, while a published interview explains how he approached a specific production. That is firmer evidence than repeating gossip or disconnected film titles.",
      "His film-career profile illustrates why a cast credit, producing credit and news interview should be treated separately. Reel Love has documented collaborators and an identifiable production period; this page does not assume every film listed in a database is current, still streaming or directed by him."
    ],
    "sections": [
      {
        "heading": "Reel Love and the move into executive production",
        "paragraphs": [
          "Premium Times reported on the February 2025 premiere of Reel Love, describing it as Egbuson's first film as an executive producer. The paper named Kayode Kasum as director and listed an ensemble that included Egbuson, Funke Akindele, Bimbo Ademoye and Dakore Egbuson-Akande. This report establishes separate performance, directing and producing roles for a specific film.",
          "An executive-producing credit is not proof that a performer wrote the screenplay, financed all of production or directed the scenes. Distinguishing those duties is essential when a viewer wants to know what the person actually contributed. A public premiere report documents the participants and occasion, not a full verified ledger of every crew member's contract."
        ],
        "sources": [
          0
        ]
      },
      {
        "heading": "The working relationship with Kayode Kasum",
        "paragraphs": [
          "Black Film Wire published an interview in which Egbuson discussed working with director Kayode Kasum over several projects. He described their working familiarity as part of why they collaborated on Reel Love. The article attributes those statements to the actor himself rather than claiming that an outside writer attended the production meetings.",
          "In the same interview, he identified practical difficulties involving weather, locations, finances and artists' schedules during production. They are concrete examples of the logistics behind a film and make the profile more useful than a list of flattering adjectives. They should not be expanded into invented filming dates, exact production budgets or stories about unnamed crew members."
        ],
        "sources": [
          1
        ]
      },
      {
        "heading": "Acting choices rather than repeated character labels",
        "paragraphs": [
          "In the Black Film Wire interview, Egbuson discussed repeatedly being offered recognisable kinds of roles, and the challenge of making each performance feel different. This is a useful insight into how he discusses his craft, but it does not prove that every performance has the same genre, award status or critical reception.",
          "Entertainment databases can combine television, short films, cinema releases and video-platform productions in one long list. Unless each credit has a dependable individual source, it is misleading to present that list as a complete filmography. The titles below are only entries already catalogued by MyNigeriaGuide and should be inspected individually to confirm cast, director, year and legal distribution."
        ],
        "sources": [
          1,
          2
        ]
      },
      {
        "heading": "Reliable ways to confirm a title or claim",
        "paragraphs": [
          "A reader looking for Reel Love can start with Premium Times for the premiere and named collaborators, and then read Black Film Wire for Egbuson's attributed account of why the team worked together. The first is outside reporting; the second is an interview. Neither automatically verifies where the film streams today or whether every later project has been released.",
          "Opening-weekend rankings require a defined date, market and source, and film grosses are not an actor's private income. We therefore omit guessed net-worth figures, relationship speculation, uncorroborated box-office totals and imaginary personal encounters. A narrower page with transparent evidence and clear credit boundaries answers more questions than an inflated biography of unsupported claims."
        ],
        "sources": [
          0,
          1,
          2
        ]
      }
    ],
    "sources": [
      {
        "label": "Premium Times — Reel Love premiere and first executive-producer credit",
        "href": "https://www.premiumtimesng.com/entertainment/nollywood/773648-ebuka-funke-akindele-veekee-james-grace-timinis-reel-love-premiere.html",
        "lastChecked": "2026-10-15"
      },
      {
        "label": "Black Film Wire — Timini Egbuson interview about Reel Love",
        "href": "https://www.blackfilmwire.com/post/from-lover-boy-to-game-changer-timini-egbuson-on-reel-love-and-redefining-nollywood",
        "lastChecked": "2026-10-15"
      },
      {
        "label": "IMDb — supplementary, non-authoritative credit cross-check",
        "href": "https://www.imdb.com/name/nm6170424/",
        "lastChecked": "2026-10-15"
      }
    ],
    "lastReviewed": "2026-10-15"
  }
};

export function getPersonEditorialProfile(slug: string): PersonEditorialProfile | undefined {
  return personEditorialProfiles[slug];
}

export function hasIndexablePersonEditorial(slug: string): boolean {
  const dossier = getPersonEditorialProfile(slug);
  if (!dossier || dossier.intro.length < 2 || dossier.sections.length < 4 || dossier.sources.length < 3) return false;
  const hosts = new Set<string>();
  for (const source of dossier.sources) {
    try {
      const address = new URL(source.href);
      if (address.protocol !== "https:" || !/^\d{4}-\d{2}-\d{2}$/.test(source.lastChecked)) return false;
      hosts.add(address.hostname.replace(/^www\./,""));
    } catch { return false; }
  }
  if (hosts.size < 3 || !/^\d{4}-\d{2}-\d{2}$/.test(dossier.lastReviewed)) return false;
  if (dossier.sections.some(section => !section.heading || section.paragraphs.length < 2 ||
    !section.sources.length || section.sources.some(idx => idx < 0 || idx >= dossier.sources.length))) return false;
  const text = [...dossier.intro, ...dossier.sections.flatMap(x => x.paragraphs)].join(" ");
  return text.trim().split(/\s+/).length >= 450;
}
