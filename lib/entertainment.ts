export type EntertainmentPlatform = "Netflix" | "YouTube" | "Prime Video";

export type WatchLink = {
  platform: EntertainmentPlatform;
  label: string;
  href: string;
  access: "subscription" | "full-movie" | "rent-or-buy" | "subscription-or-rent";
  lastChecked: string;
  note: string;
};

export type TrailerLink = {
  label: string;
  href: string;
  platform: "YouTube";
  lastChecked: string;
};

export type EntertainmentImageUsageBasis =
  | "press-kit-permission"
  | "direct-permission"
  | "licensed"
  | "creative-commons";

export type EntertainmentArtwork = {
  url: string;
  sourceUrl: string;
  credit: string;
  usageBasis: EntertainmentImageUsageBasis;
  licenseNote: string;
  lastChecked: string;
  status: "approved";
};

export type EntertainmentTitle = {
  slug: string;
  title: string;
  year: number;
  format: "movie";
  genres: string[];
  languages: string[];
  synopsis: string;
  cast: string[];
  featuredCast?: string[];
  directors?: string[];
  runtimeMinutes?: number;
  trailer?: TrailerLink;
  artwork?: EntertainmentArtwork;
  featured?: boolean;
  watchLinks: WatchLink[];
};

export const entertainmentTitles: EntertainmentTitle[] = [
  {
    slug: "anikulapo",
    title: "Aníkúlápó",
    year: 2022,
    format: "movie",
    genres: ["Drama", "Period", "Nollywood"],
    languages: ["Yoruba", "English"],
    synopsis: "After an affair with a queen leads to his death, a traveller encounters a mystical bird with the power to give him another life.",
    cast: ["Kunle Remi", "Bimbo Ademoye", "Hakeem Kae-Kazim"],
    directors: ["Kunle Afolayan"],
    trailer: {
      label: "Watch the official trailer",
      href: "https://www.youtube.com/watch?v=rXIKrHPaB-o",
      platform: "YouTube",
      lastChecked: "2026-09-29",
    },
    featured: true,
    watchLinks: [
      {
        platform: "Netflix",
        label: "Watch on Netflix",
        href: "https://www.netflix.com/ng/title/81392197",
        access: "subscription",
        lastChecked: "2026-09-29",
        note: "Official Netflix title page. Availability and plan requirements can change.",
      },
    ],
  },
  {
    slug: "oloture",
    title: "Òlòtūré",
    year: 2020,
    format: "movie",
    genres: ["Drama", "Social issues", "Nollywood"],
    languages: ["English"],
    synopsis: "A journalist goes undercover in Lagos while investigating human trafficking and encounters a dangerous world of exploitation.",
    cast: ["Sharon Ooja", "Omoni Oboli", "Blossom Chukwujekwu"],
    directors: ["Kenneth Gyang"],
    featured: true,
    watchLinks: [
      {
        platform: "Netflix",
        label: "Watch on Netflix",
        href: "https://www.netflix.com/ng/title/81300126",
        access: "subscription",
        lastChecked: "2026-09-29",
        note: "Official Netflix title page. Availability and plan requirements can change.",
      },
    ],
  },
  {
    slug: "blood-vessel",
    title: "Blood Vessel",
    year: 2023,
    format: "movie",
    genres: ["Thriller", "Drama", "Nollywood"],
    languages: ["Ijaw", "English"],
    synopsis: "Six people fleeing a community devastated by oil pollution stow away on a mysterious ship and discover new dangers onboard.",
    cast: ["Adaobi Dibor", "David Ezekiel", "Sylvester Ekanem"],
    featured: true,
    watchLinks: [
      {
        platform: "Netflix",
        label: "Watch on Netflix",
        href: "https://www.netflix.com/title/81676887",
        access: "subscription",
        lastChecked: "2026-09-29",
        note: "Official Netflix title page. Regional availability can change.",
      },
    ],
  },
  {
    slug: "the-black-book",
    title: "The Black Book",
    year: 2023,
    format: "movie",
    genres: ["Thriller", "Action", "Crime"],
    languages: ["English"],
    synopsis: "After his son is framed for kidnapping, a grieving deacon confronts a corrupt police gang while trying to clear his son's name.",
    cast: ["Richard Mofe-Damijo", "Ade Laoye", "Sam Dede"],
    featured: true,
    watchLinks: [
      {
        platform: "Netflix",
        label: "Watch on Netflix",
        href: "https://www.netflix.com/title/81698992",
        access: "subscription",
        lastChecked: "2026-09-29",
        note: "Official Netflix title page. Regional availability can change.",
      },
    ],
  },
  {
    slug: "ijogbon",
    title: "Ìjọ̀gbọ̀n",
    year: 2023,
    format: "movie",
    genres: ["Drama", "Teen", "Nollywood"],
    languages: ["Yoruba", "English"],
    synopsis: "Four teenagers from a rural South West Nigerian village find a pouch of uncut diamonds and quickly discover that others are searching for the same bounty.",
    cast: ["Fawaz Aina", "Ebiesuwa Oluwaseyi", "Ruby Akubueze"],
    directors: ["Kunle Afolayan"],
    trailer: {
      label: "Watch the official Netflix trailer",
      href: "https://www.youtube.com/watch?v=ocOjEtqq_Nw",
      platform: "YouTube",
      lastChecked: "2026-09-29",
    },
    watchLinks: [
      {
        platform: "Netflix",
        label: "Watch on Netflix",
        href: "https://www.netflix.com/ng/title/81671712",
        access: "subscription",
        lastChecked: "2026-09-29",
        note: "Official Netflix Nigeria title page.",
      },
    ],
  },
  {
    slug: "a-lagos-love-story",
    title: "A Lagos Love Story",
    year: 2025,
    format: "movie",
    genres: ["Romance", "Comedy", "Nollywood"],
    languages: ["English"],
    synopsis: "An aspiring Lagos event planner is pushed into the orbit of a rising Afrobeats star and finds her professional assignment becoming personal.",
    cast: ["Jemima Osunde", "Mike Afolarin", "Susan Pwajok"],
    directors: ["Chinaza Onuzo"],
    runtimeMinutes: 104,
    featured: true,
    watchLinks: [
      {
        platform: "Prime Video",
        label: "Open on Prime Video",
        href: "https://www.primevideo.com/detail/0QKNHEFWV4SEKZ4OFQFAYWKWCN",
        access: "subscription-or-rent",
        lastChecked: "2026-09-29",
        note: "Official Prime Video title page. The exact subscription, rental or purchase option can depend on region.",
      },
    ],
  },
  {
    slug: "pieces-that-fit",
    title: "Pieces That Fit",
    year: 2026,
    format: "movie",
    genres: ["Romance", "Drama", "Nollywood"],
    languages: ["English"],
    synopsis: "A woman rebuilding her life after abuse and loss finds an unexpected path toward healing while living and working around people carrying their own grief.",
    cast: ["Micheal Dappa", "Ekama Etim-Inyang", "Ehis Perfect", "Floyd Igbo"],
    watchLinks: [
      {
        platform: "YouTube",
        label: "Watch the full movie on YouTube",
        href: "https://www.youtube.com/watch?v=W0YCyyBMyAw",
        access: "full-movie",
        lastChecked: "2026-09-29",
        note: "Full movie published by Omoni Oboli TV.",
      },
    ],
  },
  {
    slug: "what-love-is",
    title: "What Love Is",
    year: 2026,
    format: "movie",
    genres: ["Romance", "Drama", "Nollywood"],
    languages: ["English"],
    synopsis: "A contemporary romance about trust, uncertainty and relationship pressure, led by Maurice Sam and Erica Nlewedim.",
    cast: ["Maurice Sam", "Erica Nlewedim"],
    featured: true,
    watchLinks: [
      {
        platform: "YouTube",
        label: "Watch the full movie on YouTube",
        href: "https://www.youtube.com/watch?v=ORIBBpN7YMs",
        access: "full-movie",
        lastChecked: "2026-09-29",
        note: "Full movie published by verified Maurice Sam TV.",
      },
    ],
  },
  {
    slug: "irreplaceable",
    title: "Irreplaceable",
    year: 2024,
    format: "movie",
    genres: ["Romance", "Family", "Nollywood"],
    languages: ["English"],
    synopsis: "A responsible teenager tries to find her mother a partner, pulling a school rival into a plan that changes how they think about love and family.",
    cast: ["John Ekanem", "Emmanuel Nse", "Angel Unigwe", "Betcy Amilo", "Rejoice Rejme"],
    featured: true,
    watchLinks: [
      {
        platform: "YouTube",
        label: "Watch the full movie on YouTube",
        href: "https://www.youtube.com/watch?v=a-TfeLSnveE",
        access: "full-movie",
        lastChecked: "2026-09-29",
        note: "Full movie published by Omoni Oboli TV on its official YouTube channel.",
      },
    ],
  },
  {
    slug: "plus-one",
    title: "Plus One",
    year: 2026,
    format: "movie",
    genres: ["Romance", "Drama", "Nollywood"],
    languages: ["English"],
    synopsis: "A pretend relationship arranged for a family gathering becomes more complicated when the connection starts to feel real.",
    cast: ["Saga Adeolu", "Sophia Chisom", "Ayo Adesanya", "Symon Oko"],
    featured: true,
    watchLinks: [
      {
        platform: "YouTube",
        label: "Watch the full movie on YouTube",
        href: "https://www.youtube.com/watch?v=fY28a7s3ThU",
        access: "full-movie",
        lastChecked: "2026-09-29",
        note: "Full movie published by Omoni Oboli TV on its official YouTube channel.",
      },
    ],
  },

  {
    slug: "jagun-jagun",
    title: "Jagun Jagun",
    year: 2023,
    format: "movie",
    genres: ["Action", "Drama", "Period", "Nollywood"],
    languages: ["Yoruba", "English"],
    synopsis: "A young man joins an elite warrior school to pursue power, only to collide with a ruthless warlord and a dangerous love story.",
    cast: ["Femi Adebayo", "Lateef Adedimeji", "Odunlade Adekola", "Ibrahim Yekini Itele", "Bukunmi Oluwashina", "Adebayo Salami", "Fathia Balogun", "Muyiwa Ademola", "Yinka Quadri", "Debo Adedayo"],
    featuredCast: ["Femi Adebayo", "Lateef Adedimeji", "Odunlade Adekola"],
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81681240", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix Nigeria title page." }],
  },
  {
    slug: "lionheart",
    title: "Lionheart",
    year: 2018,
    format: "movie",
    genres: ["Drama", "Comedy", "Nollywood"],
    languages: ["English"],
    synopsis: "When her father falls ill, Adaeze takes on the family transport business and must prove herself in a male-dominated environment.",
    cast: ["Genevieve Nnaji", "Nkem Owoh", "Pete Edochie", "Onyeka Onwenu", "Kanayo O. Kanayo"],
    featuredCast: ["Genevieve Nnaji", "Nkem Owoh", "Pete Edochie"],
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81030789", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix Nigeria title page." }],
  },
  {
    slug: "swallow",
    title: "Swallow",
    year: 2021,
    format: "movie",
    genres: ["Drama", "Social issues", "Nollywood"],
    languages: ["English"],
    synopsis: "Under pressure in 1980s Lagos, a young woman is drawn into drug smuggling and must deal with the consequences.",
    cast: ["Eniola 'Niyola' Akinbo", "Ijeoma Grace Agu", "Deyemi Okanlawon", "Chioma Chukwuka Akpotha", "Eniola Badmus", "Kevin Ikeduba", "Mercy Aigbe"],
    featuredCast: ["Eniola 'Niyola' Akinbo", "Deyemi Okanlawon", "Chioma Chukwuka Akpotha"],
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81392180", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix Nigeria title page." }],
  },
  {
    slug: "man-of-god",
    title: "Man of God",
    year: 2022,
    format: "movie",
    genres: ["Drama", "Nollywood"],
    languages: ["English"],
    synopsis: "A man who rejected a strict religious upbringing struggles to reconcile the life he chose with the faith he left behind.",
    cast: ["Akah Nnani", "Osas Ighodaro", "Atlanta Bridget Johnson", "Dorcas Shola Fapson", "Jude Chukwuka", "Ayo Mogaji", "Olumide Oworu", "Patrick Doyle", "Eucharia Anunobi", "Mawuli Gavor"],
    featuredCast: ["Akah Nnani", "Osas Ighodaro", "Olumide Oworu"],
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81572291", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix Nigeria title page." }],
  },
  {
    slug: "citation",
    title: "Citation",
    year: 2020,
    format: "movie",
    genres: ["Drama", "Social issues", "Nollywood"],
    languages: ["English"],
    synopsis: "A university student challenges the academic establishment after reporting sexual misconduct by a respected professor.",
    cast: ["Temi Otedola", "Jimmy Jean-Louis", "Joke Silva", "Gabriel Afolayan", "Adjetey Anang", "Ini Edo", "Sadiq Daba", "Yomi Fash-Lanso", "Bukunmi Oluwashina"],
    featuredCast: ["Temi Otedola", "Joke Silva", "Ini Edo"],
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81294345", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix Nigeria title page." }],
  },
  {
    slug: "glamour-girls",
    title: "Glamour Girls",
    year: 2022,
    format: "movie",
    genres: ["Drama", "Social issues", "Nollywood"],
    languages: ["English"],
    synopsis: "A group of women enter a world of wealth and high-end escorts, but violence and theft put their lives and ambitions at risk.",
    cast: ["Nse Ikpe-Etim", "Sharon Ooja", "Joselyn Dumas", "Toke Makinwa", "Segilola Ogidan", "James Gardiner"],
    featuredCast: ["Nse Ikpe-Etim", "Sharon Ooja", "Joselyn Dumas"],
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81478629", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix title page." }],
  },
  {
    slug: "elesin-oba",
    title: "Ẹlẹṣin Ọba: The King's Horseman",
    year: 2022,
    format: "movie",
    genres: ["Drama", "Period", "Nollywood"],
    languages: ["Yoruba", "English"],
    synopsis: "Following the death of a king, the royal horseman faces a sacred duty whose disruption sets tragedy in motion.",
    cast: ["Odunlade Adekola", "Shaffy Bello", "Deyemi Okanlawon", "Omowunmi Dada", "Jide Kosoko", "Olawale 'Brymo' Olofooro"],
    featuredCast: ["Odunlade Adekola", "Shaffy Bello", "Deyemi Okanlawon"],
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81332042", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix Nigeria title page." }],
  },
  {
    slug: "a-naija-christmas",
    title: "A Naija Christmas",
    year: 2021,
    format: "movie",
    genres: ["Comedy", "Romance", "Family", "Nollywood"],
    languages: ["English"],
    synopsis: "Three brothers compete to fulfil their mother's Christmas wish, turning the festive season into a chaotic race for love and approval.",
    cast: ["Rachel Oniga", "Kunle Remi", "Segilola Ogidan", "Efa Iwara", "Linda Osifo", "Mercy Johnson Okojie", "Lateef Adedimeji"],
    featuredCast: ["Rachel Oniga", "Kunle Remi", "Mercy Johnson Okojie"],
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81434660", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix Nigeria title page." }],
  },
  {
    slug: "chief-daddy",
    title: "Chief Daddy",
    year: 2018,
    format: "movie",
    genres: ["Comedy", "Drama", "Nollywood"],
    languages: ["English"],
    synopsis: "After a wealthy patriarch dies unexpectedly, his relatives, friends and staff scramble over the fortune he leaves behind.",
    cast: ["Taiwo Obileye", "Joke Silva", "Falz", "Dakore Egbuson-Akande", "Funke Akindele", "Zainab Balogun", "Shaffy Bello", "Ini Edo", "Mawuli Gavor"],
    featuredCast: ["Joke Silva", "Funke Akindele", "Falz"],
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81074015", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix Nigeria title page." }],
  },
  {
    slug: "chief-daddy-2",
    title: "Chief Daddy 2 - Going for Broke",
    year: 2021,
    format: "movie",
    genres: ["Comedy", "Drama", "Romance", "Nollywood"],
    languages: ["English"],
    synopsis: "The Beecroft family returns to fight over Chief Daddy's inheritance while a determined company executive complicates their plans.",
    cast: ["Shaffy Bello", "Funke Akindele", "Joke Silva", "Kate Henshaw-Nuttal", "Rahama Sadau", "Mawuli Gavor", "Beverly Naya", "Falz"],
    featuredCast: ["Shaffy Bello", "Funke Akindele", "Joke Silva"],
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81323628", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix Nigeria title page." }],
  },
  {
    slug: "king-of-boys",
    title: "King of Boys",
    year: 2018,
    format: "movie",
    genres: ["Crime", "Drama", "Nollywood"],
    languages: ["English"],
    synopsis: "A powerful businesswoman's political ambitions collide with her underworld connections, triggering a brutal struggle for power.",
    cast: ["Sola Sobowale", "Adesua Etomi", "Remilekun 'Reminisce' Safaru", "Tobechukwu 'iLLbliss' Ejiofor", "Toni Tones", "Jide Kosoko", "Sharon Ooja"],
    featuredCast: ["Sola Sobowale", "Adesua Etomi", "Remilekun 'Reminisce' Safaru"],
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81172721", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix Nigeria title page." }],
  },
  {
    slug: "merry-men-3",
    title: "Merry Men 3: Nemesis",
    year: 2023,
    format: "movie",
    genres: ["Thriller", "Crime", "Nollywood"],
    languages: ["English"],
    synopsis: "After a devastating loss, a wealthy group of friends set out for revenge against the people they hold responsible.",
    cast: ["Ramsey Nouah", "Chidi Mokeme", "Iretiola Doyle", "Ayo Makun", "Ufuoma McDermott", "Uchemba Williams", "Nadia Buari", "Segun Arinze"],
    featuredCast: ["Ramsey Nouah", "Chidi Mokeme", "Iretiola Doyle"],
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81689059", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix Nigeria title page." }],
  },
  {
    slug: "house-of-gaa",
    title: "House of Ga'a",
    year: 2024,
    format: "movie",
    genres: ["Action", "Drama", "Period", "Nollywood"],
    languages: ["Yoruba", "English"],
    synopsis: "At the height of the Oyo Empire, Bashorun Ga'a rises above the kings he helps install until power and family turn against him.",
    cast: ["Femi Branch", "Mike Afolarin", "Funke Akindele", "Femi Adebayo", "Ibrahim Chatta", "Toyin Abraham", "Bimbo Manuel", "Lateef Adedimeji"],
    featuredCast: ["Femi Branch", "Mike Afolarin", "Funke Akindele"],
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81681233", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix Nigeria title page." }],
  },
  {
    slug: "hijack-93",
    title: "Hijack '93",
    year: 2024,
    format: "movie",
    genres: ["Drama", "Thriller", "Historical", "Nollywood"],
    languages: ["English"],
    synopsis: "Four men hijack an aircraft in a politically charged attempt to challenge a military-backed government.",
    cast: ["Nancy Isime", "Sharon Ooja", "Jemima Osunde", "Idia Aisien", "Efa Iwara", "John Dumelo"],
    featuredCast: ["Nancy Isime", "Sharon Ooja", "Jemima Osunde"],
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81676888", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix Nigeria title page." }],
  },
  {
    slug: "afamefuna",
    title: "Áfàméfùnà: An Nwa Boi Story",
    year: 2023,
    format: "movie",
    genres: ["Drama", "Nollywood"],
    languages: ["Igbo"],
    synopsis: "A successful man questioned after a friend's death looks back on their complicated history inside the Igbo apprenticeship system.",
    cast: ["Stan Nze", "Kanayo O. Kanayo", "Alexx Ekubo", "Atlanta Bridget Johnson", "Segun Arinze", "Chuks Joseph"],
    featuredCast: ["Stan Nze", "Kanayo O. Kanayo", "Alexx Ekubo"],
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81730157", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix Nigeria title page." }],
  },
  {
    slug: "the-set-up",
    title: "The Set Up",
    year: 2019,
    format: "movie",
    genres: ["Crime", "Drama", "Nollywood"],
    languages: ["English"],
    synopsis: "A con artist recruits a young woman into a scheme targeting a wealthy heiress, but personal vendettas quickly complicate the plan.",
    cast: ["Adesua Etomi", "Jim Iyke", "Dakore Egbuson-Akande", "Ayoola Ayolola", "Tina Mba", "Joke Silva", "Kehinde Bankole"],
    featuredCast: ["Adesua Etomi", "Jim Iyke", "Dakore Egbuson-Akande"],
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81270837", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix title page." }],
  },
];

export const entertainmentPlatforms = ["Netflix", "YouTube", "Prime Video"] as const;

export function getEntertainmentTitle(slug: string) {
  return entertainmentTitles.find((item) => item.slug === slug);
}

export function getEntertainmentGenres() {
  return [...new Set(entertainmentTitles.flatMap((item) => item.genres))].sort();
}

export function getPlatformCount(platform: EntertainmentPlatform) {
  return entertainmentTitles.filter((item) => item.watchLinks.some((link) => link.platform === platform)).length;
}


export function canDisplayEntertainmentArtwork(title: EntertainmentTitle) {
  const artwork = title.artwork;
  return Boolean(
    artwork &&
    artwork.status === "approved" &&
    artwork.url &&
    artwork.sourceUrl &&
    artwork.credit &&
    artwork.licenseNote &&
    artwork.lastChecked &&
    ["press-kit-permission", "direct-permission", "licensed", "creative-commons"].includes(artwork.usageBasis),
  );
}

export function getFeaturedCast(title: EntertainmentTitle) {
  return (title.featuredCast?.length ? title.featuredCast : title.cast).slice(0, 3);
}
