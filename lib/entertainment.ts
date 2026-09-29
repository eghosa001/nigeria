export type EntertainmentPlatform = "Netflix" | "YouTube" | "Prime Video";

export type WatchLink = {
  platform: EntertainmentPlatform;
  label: string;
  href: string;
  access: "subscription" | "full-movie" | "rent-or-buy" | "subscription-or-rent";
  lastChecked: string;
  note: string;
  publisher?: string;
  publisherUrl?: string;
};

export type TrailerLink = {
  label: string;
  href: string;
  platform: "YouTube";
  lastChecked: string;
  publisher?: string;
  publisherUrl?: string;
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
    trailer: {
      label: "Watch the official Netflix trailer",
      href: "https://www.youtube.com/watch?v=6PPH4SOm9gk",
      platform: "YouTube",
      lastChecked: "2026-09-29",
      publisher: "AfricaOnNetflix",
      publisherUrl: "https://www.youtube.com/@AfricaOnNetflix",
    },
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
    trailer: {
      label: "Watch the official Netflix trailer",
      href: "https://www.youtube.com/watch?v=WH19OJ7k270",
      platform: "YouTube",
      lastChecked: "2026-09-29",
      publisher: "AfricaOnNetflix",
      publisherUrl: "https://www.youtube.com/@AfricaOnNetflix",
    },
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
    trailer: {
      label: "Watch the official Netflix trailer",
      href: "https://www.youtube.com/watch?v=E5ugUvUTFpE",
      platform: "YouTube",
      lastChecked: "2026-09-29",
      publisher: "AfricaOnNetflix",
      publisherUrl: "https://www.youtube.com/@AfricaOnNetflix",
    },
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
    trailer: {
      label: "Watch the official Netflix trailer",
      href: "https://www.youtube.com/watch?v=1eMAYynMc1w",
      platform: "YouTube",
      lastChecked: "2026-09-29",
      publisher: "AfricaOnNetflix",
      publisherUrl: "https://www.youtube.com/@AfricaOnNetflix",
    },
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
    trailer: {
      label: "Watch the official Netflix trailer",
      href: "https://www.youtube.com/watch?v=XnyuqAJ9_kI",
      platform: "YouTube",
      lastChecked: "2026-09-29",
      publisher: "AfricaOnNetflix",
      publisherUrl: "https://www.youtube.com/@AfricaOnNetflix",
    },
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
    trailer: {
      label: "Watch the official Netflix trailer",
      href: "https://www.youtube.com/watch?v=0pzE10-3nzI",
      platform: "YouTube",
      lastChecked: "2026-09-29",
      publisher: "AfricaOnNetflix",
      publisherUrl: "https://www.youtube.com/@AfricaOnNetflix",
    },
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
    trailer: {
      label: "Watch the official Netflix trailer",
      href: "https://www.youtube.com/watch?v=9OG-NzwzOYQ",
      platform: "YouTube",
      lastChecked: "2026-09-29",
      publisher: "AfricaOnNetflix",
      publisherUrl: "https://www.youtube.com/@AfricaOnNetflix",
    },
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
    trailer: {
      label: "Watch the official Netflix trailer",
      href: "https://www.youtube.com/watch?v=I6uNj0Zlak8",
      platform: "YouTube",
      lastChecked: "2026-09-29",
      publisher: "AfricaOnNetflix",
      publisherUrl: "https://www.youtube.com/@AfricaOnNetflix",
    },
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
    trailer: {
      label: "Watch the official Netflix trailer",
      href: "https://www.youtube.com/watch?v=rNJzWqKUlwM",
      platform: "YouTube",
      lastChecked: "2026-09-29",
      publisher: "AfricaOnNetflix",
      publisherUrl: "https://www.youtube.com/@AfricaOnNetflix",
    },
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

  {
    slug: "amina",
    title: "Amina",
    year: 2021,
    format: "movie",
    genres: ["Drama", "Action", "Period", "Nollywood"],
    languages: ["English"],
    synopsis: "In 16th-century Zazzau, a gifted warrior uses her military skill and strategy to defend her family's kingdom.",
    cast: ["Lucy Ameh", "Ali Nuhu", "Clarion Chukwura", "Chris Gbakann", "Yakubu Mohammed", "Habiba Ummi Mohammed"],
    featuredCast: ["Lucy Ameh", "Ali Nuhu", "Clarion Chukwura"],
    trailer: {
      label: "Watch the official Netflix trailer",
      href: "https://www.youtube.com/watch?v=RW87asYGq7g",
      platform: "YouTube",
      lastChecked: "2026-09-29",
      publisher: "AfricaOnNetflix",
      publisherUrl: "https://www.youtube.com/@AfricaOnNetflix",
    },
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81450071", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix Nigeria title page." }],
  },
  {
    slug: "tokunbo",
    title: "Tòkunbọ̀",
    year: 2024,
    format: "movie",
    genres: ["Crime", "Drama", "Thriller", "Nollywood"],
    languages: ["English"],
    synopsis: "An ex-car smuggler is given only hours to deliver a government official's daughter to her captor or risk losing his own family.",
    cast: ["Gideon Okeke", "Funlola Aofiyebi-Raimi", "Darasimi Nadi", "Norbert Young", "Ivie Okujaye", "Adunni Ade", "Chidi Mokeme", "Majid Michel"],
    featuredCast: ["Gideon Okeke", "Funlola Aofiyebi-Raimi", "Chidi Mokeme"],
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81729081", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix Nigeria title page." }],
  },
  {
    slug: "lisabi-the-uprising",
    title: "Lísàbí: The Uprising",
    year: 2024,
    format: "movie",
    genres: ["Drama", "Period", "Historical", "Nollywood"],
    languages: ["Yoruba", "English"],
    synopsis: "A Yoruba folk hero leads a rebellion against an oppressive empire in a fight for freedom that changes the course of his people.",
    cast: ["Lateef Adedimeji", "Adebimpe Oyebade", "Ibrahim Yekini Itele", "Gabriel Afolayan", "Olumide Oworu", "Kevin Ikeduba"],
    featuredCast: ["Lateef Adedimeji", "Adebimpe Oyebade", "Ibrahim Yekini Itele"],
    trailer: {
      label: "Watch the official Netflix trailer",
      href: "https://www.youtube.com/watch?v=EyjesbX13vM",
      platform: "YouTube",
      lastChecked: "2026-09-29",
      publisher: "AfricaOnNetflix",
      publisherUrl: "https://www.youtube.com/@AfricaOnNetflix",
    },
    watchLinks: [{ platform: "Netflix", label: "Watch on Netflix", href: "https://www.netflix.com/ng/title/81789163", access: "subscription", lastChecked: "2026-09-29", note: "Official Netflix Nigeria title page." }],
  },

  {
    slug: "love-in-every-word",
    title: "Love in Every Word",
    year: 2025,
    format: "movie",
    genres: ["Romance", "Drama", "Nollywood"],
    languages: ["English"],
    synopsis: "Two people from very different worlds meet unexpectedly and must decide whether love can survive ambition, cultural differences and personal fears.",
    cast: ["Uzor Arukwe", "Bambam", "Osereme Inegbenebor", "Daniel Rocky", "Thelma Nwosu", "Amanda Iriekpen", "Susan Jimah"],
    featuredCast: ["Uzor Arukwe", "Bambam", "Osereme Inegbenebor"],
    watchLinks: [{ platform: "YouTube", label: "Watch the full movie on YouTube", href: "https://www.youtube.com/watch?v=bslcx4LRFL0", access: "full-movie", lastChecked: "2026-09-29", note: "Full movie published by Omoni Oboli TV.", publisher: "Omoni Oboli TV", publisherUrl: "https://www.youtube.com/@OmoniOboliTV" }],
  },
  {
    slug: "after-a-night-in-july",
    title: "After a Night in July",
    year: 2025,
    format: "movie",
    genres: ["Romance", "Drama", "Nollywood"],
    languages: ["English"],
    synopsis: "A rushed marriage following an unexpected pregnancy is tested by sleepless nights, career pressure, money problems, old wounds and broken trust.",
    cast: ["Uche Montana", "Eso Dike", "Perpetual Ukadike", "Eyiyemi Olivia Rogbinyin"],
    featuredCast: ["Uche Montana", "Eso Dike", "Perpetual Ukadike"],
    watchLinks: [{ platform: "YouTube", label: "Watch the full movie on YouTube", href: "https://www.youtube.com/watch?v=W0p847uOcC0", access: "full-movie", lastChecked: "2026-09-29", note: "Full movie published by Omoni Oboli TV.", publisher: "Omoni Oboli TV", publisherUrl: "https://www.youtube.com/@OmoniOboliTV" }],
  },
  {
    slug: "the-long-way-home",
    title: "The Long Way Home",
    year: 2026,
    format: "movie",
    genres: ["Romance", "Drama", "Nollywood"],
    languages: ["English"],
    synopsis: "A contemporary relationship drama about love, distance and difficult choices, built around an unexpected emotional journey home.",
    cast: ["Uche Montana", "Maurice Sam", "Nadia Buari"],
    featuredCast: ["Uche Montana", "Maurice Sam", "Nadia Buari"],
    watchLinks: [{ platform: "YouTube", label: "Watch the full movie on YouTube", href: "https://www.youtube.com/watch?v=tYp-UskX0cM", access: "full-movie", lastChecked: "2026-09-29", note: "Full movie published by verified Uche Montana TV.", publisher: "Uche Montana TV", publisherUrl: "https://www.youtube.com/@UchemontanaTV" }],
  },
  {
    slug: "monica-2",
    title: "Monica 2",
    year: 2026,
    format: "movie",
    genres: ["Romance", "Drama", "Nollywood"],
    languages: ["English"],
    synopsis: "The continuation of Monica's story brings new relationship pressure, family complications and emotional choices.",
    cast: ["Uche Montana", "Blessing Onwukwe", "Joseph Momodu"],
    featuredCast: ["Uche Montana", "Blessing Onwukwe", "Joseph Momodu"],
    watchLinks: [{ platform: "YouTube", label: "Watch the full movie on YouTube", href: "https://www.youtube.com/watch?v=7jteLIoNDaQ", access: "full-movie", lastChecked: "2026-09-29", note: "Full movie published by verified Uche Montana TV.", publisher: "Uche Montana TV", publisherUrl: "https://www.youtube.com/@UchemontanaTV" }],
  },
  {
    slug: "the-merger",
    title: "The Merger",
    year: 2026,
    format: "movie",
    genres: ["Romance", "Drama", "Nollywood"],
    languages: ["English"],
    synopsis: "Two people drawn together by a complicated situation discover that a relationship they never planned may become impossible to ignore.",
    cast: ["Uche Montana", "Timini Egbuson"],
    featuredCast: ["Uche Montana", "Timini Egbuson"],
    watchLinks: [{ platform: "YouTube", label: "Watch the full movie on YouTube", href: "https://www.youtube.com/watch?v=Vzg7hNXk7lo", access: "full-movie", lastChecked: "2026-09-29", note: "Full movie published by verified Uche Montana TV.", publisher: "Uche Montana TV", publisherUrl: "https://www.youtube.com/@UchemontanaTV" }],
  },
  {
    slug: "never-let-go",
    title: "Never Let Go",
    year: 2026,
    format: "movie",
    genres: ["Romance", "Drama", "Nollywood"],
    languages: ["English"],
    synopsis: "An emotional romance about heartbreak, second chances and the effort required to hold on when a relationship starts falling apart.",
    cast: ["Maurice Sam", "Nadia Buari"],
    featuredCast: ["Maurice Sam", "Nadia Buari"],
    watchLinks: [{ platform: "YouTube", label: "Watch the full movie on YouTube", href: "https://www.youtube.com/watch?v=q5Vg0jUMl-s", access: "full-movie", lastChecked: "2026-09-29", note: "Full movie published by verified Maurice Sam TV.", publisher: "Maurice Sam TV", publisherUrl: "https://www.youtube.com/@mauricesamtv" }],
  },
  {
    slug: "just-before-forever",
    title: "Just Before Forever",
    year: 2026,
    format: "movie",
    genres: ["Romance", "Drama", "Nollywood"],
    languages: ["English"],
    synopsis: "Love, difficult choices and unexpected turns push three people toward decisions that could change what forever means to them.",
    cast: ["Maurice Sam", "Uche Montana", "Pamela Okoye"],
    featuredCast: ["Maurice Sam", "Uche Montana", "Pamela Okoye"],
    watchLinks: [{ platform: "YouTube", label: "Watch the full movie on YouTube", href: "https://www.youtube.com/watch?v=WIQUH0YSZAs", access: "full-movie", lastChecked: "2026-09-29", note: "Full movie published by verified Maurice Sam TV.", publisher: "Maurice Sam TV", publisherUrl: "https://www.youtube.com/@mauricesamtv" }],
  },
  {
    slug: "a-turn-of-events",
    title: "A Turn of Events",
    year: 2026,
    format: "movie",
    genres: ["Drama", "Romance", "Nollywood"],
    languages: ["English"],
    synopsis: "A relationship is forced to adapt when unexpected changes, difficult choices and questions of trust alter the course of two lives.",
    cast: ["Maurice Sam", "Sarian Martin"],
    featuredCast: ["Maurice Sam", "Sarian Martin"],
    watchLinks: [{ platform: "YouTube", label: "Watch the full movie on YouTube", href: "https://www.youtube.com/watch?v=negcmBrWxm0", access: "full-movie", lastChecked: "2026-09-29", note: "Full movie published by Maurice Sam TV.", publisher: "Maurice Sam TV", publisherUrl: "https://www.youtube.com/@mauricesamtv" }],
  },
  {
    slug: "a-sunday-affair",
    title: "A Sunday Affair",
    year: 2023,
    format: "movie",
    genres: ["Drama", "Romance", "Nollywood"],
    languages: ["English"],
    synopsis: "Lifelong best friends Uche and Toyin fall for the same complicated man, putting their friendship under pressure as a painful revelation changes what each of them wants.",
    cast: ["Dakore Egbuson-Akande", "Nse Ikpe-Etim", "Oris Erhuero", "Alexx Ekubo", "Uzor Osimkpa", "Hilda Dokubo"],
    featuredCast: ["Dakore Egbuson-Akande", "Nse Ikpe-Etim", "Oris Erhuero"],
    watchLinks: [{
      platform: "Netflix",
      label: "Watch on Netflix",
      href: "https://www.netflix.com/ng/title/81462490",
      access: "subscription",
      lastChecked: "2026-09-29",
      note: "Official Netflix Nigeria title page. Availability and plan requirements can change.",
    }],
  },
  {
    slug: "adire",
    title: "Adire",
    year: 2023,
    format: "movie",
    genres: ["Drama", "Social issues", "Nollywood"],
    languages: ["English"],
    synopsis: "A woman leaves sex work behind, moves to a small town and starts a lingerie business, drawing the hostility of a powerful preacher's wife.",
    cast: ["Kehinde Bankole", "Funlola Aofiyebi-Raimi", "Femi Branch", "Yvonne Jegede", "Yemi Blaq", "Ibrahim Chatta"],
    featuredCast: ["Kehinde Bankole", "Funlola Aofiyebi-Raimi", "Femi Branch"],
    watchLinks: [{
      platform: "Netflix",
      label: "Watch on Netflix",
      href: "https://www.netflix.com/ng/title/81730156",
      access: "subscription",
      lastChecked: "2026-09-29",
      note: "Official Netflix title page. Availability can vary by account and region.",
    }],
  },
  {
    slug: "breaded-life",
    title: "Breaded Life",
    year: 2021,
    format: "movie",
    genres: ["Drama", "Comedy", "Nollywood"],
    languages: ["English"],
    synopsis: "When everyone in his privileged life suddenly forgets him, a wealthy young man turns to the only person who still recognizes him: a local bread seller.",
    cast: ["Bimbo Ademoye", "Timini Egbuson", "Tina Mba", "Bisola Aiyeola", "Bolanle Ninalowo", "Jide Kosoko"],
    featuredCast: ["Bimbo Ademoye", "Timini Egbuson", "Tina Mba"],
    watchLinks: [{
      platform: "Netflix",
      label: "Watch on Netflix",
      href: "https://www.netflix.com/ng/title/81591160",
      access: "subscription",
      lastChecked: "2026-09-29",
      note: "Official Netflix title page. Availability can vary by account and region.",
    }],
  },
  {
    slug: "a-tribe-called-judah",
    title: "A Tribe Called Judah",
    year: 2023,
    format: "movie",
    genres: ["Comedy", "Drama", "Crime", "Nollywood"],
    languages: ["English"],
    synopsis: "A mother and her sons face a family medical crisis, pushing the brothers toward a risky plan that becomes far more dangerous when real criminals enter the picture.",
    cast: ["Funke Akindele", "Jidekene Achufusi", "Uzee Usman", "Timini Egbuson", "Tobi Makinde", "Olumide Oworu", "Nse Ikpe-Etim", "Uzor Arukwe"],
    featuredCast: ["Funke Akindele", "Jidekene Achufusi", "Uzee Usman"],
    directors: ["Funke Akindele", "Adeola Owu", "Oladele Rasheed"],
    runtimeMinutes: 134,
    watchLinks: [{
      platform: "Prime Video",
      label: "Open on Prime Video",
      href: "https://www.primevideo.com/detail/0T4CUFXFYX8QO6MWW0OV62S11J",
      access: "subscription-or-rent",
      lastChecked: "2026-09-29",
      note: "Official Prime Video title page. The exact subscription, rental or purchase option can depend on region.",
    }],
  },
  {
    slug: "sin-first-blood",
    title: "Sin: First Blood",
    year: 2025,
    format: "movie",
    genres: ["Thriller", "Action", "Crime", "Nollywood"],
    languages: ["English"],
    synopsis: "A glamorous Lagos nightclub owner is forced to rebuild after her husband's arrest, then faces pressure from a cartel that wants her to take over his criminal operation.",
    cast: ["Jim Iyke", "Toni Tones", "Leiba Love"],
    featuredCast: ["Jim Iyke", "Toni Tones", "Leiba Love"],
    runtimeMinutes: 113,
    watchLinks: [{
      platform: "Prime Video",
      label: "Watch on Prime Video",
      href: "https://www.primevideo.com/detail/0KXCFQNLM0K54DL96DZ76BWDCK",
      access: "subscription",
      lastChecked: "2026-09-29",
      note: "Official Prime Video title page. Regional availability and plan requirements can change.",
    }],
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
