export type EntertainmentPlatform = "Netflix" | "YouTube";

export type WatchLink = {
  platform: EntertainmentPlatform;
  label: string;
  href: string;
  access: "subscription" | "full-movie";
  lastChecked: string;
  note: string;
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
];

export const entertainmentPlatforms = ["Netflix", "YouTube"] as const;

export function getEntertainmentTitle(slug: string) {
  return entertainmentTitles.find((item) => item.slug === slug);
}

export function getEntertainmentGenres() {
  return [...new Set(entertainmentTitles.flatMap((item) => item.genres))].sort();
}

export function getPlatformCount(platform: EntertainmentPlatform) {
  return entertainmentTitles.filter((item) => item.watchLinks.some((link) => link.platform === platform)).length;
}
