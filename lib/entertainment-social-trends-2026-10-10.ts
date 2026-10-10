import type { EntertainmentTitle } from "@/lib/entertainment";

// Issakaba Returns has verified third-party release coverage and a film catalog listing.
// Do not label the film as streaming or available in cinemas before 13 November 2026.
export const verifiedOctoberFilm: EntertainmentTitle[] = [
  {
    slug: "issakaba-the-return-2026",
    title: "Issakaba: The Return",
    year: 2026,
    format: "movie",
    genres: ["Action", "Crime", "Thriller", "Drama", "Nollywood"],
    languages: ["English", "Igbo"],
    synopsis: "Twenty-five years after the original Issakaba vigilante story, Ebube faces a new wave of insecurity and crime. The sequel brings the group's old idea of neighbourhood protection into conflict with the consequences of deciding what justice means. The first trailer frames the confrontation as more than another fight against criminals: the new generation must reckon with whether protecting a community justifies violent methods. Sam Dede reprises Ebube, and filmmaker Lancelot Oduwa Imasuen returns to the franchise.",
    cast: ["Sam Dede", "Chiwetalu Agu", "Chidi Mokeme", "Iyabo Ojo", "Regina Daniels", "Nosa Rex", "Mark Angel", "Phyna"],
    featuredCast: ["Sam Dede", "Chidi Mokeme", "Iyabo Ojo"],
    directors: ["Lancelot Oduwa Imasuen"],
    references: [
      {
        label: "Nollywood.com — film details and release listing",
        href: "https://nollywood.com/movies/issakaba-the-return",
        lastChecked: "2026-10-10",
        note: "The independent film catalog lists 13 November 2026 and Blue Pictures Distribution for Nigeria; no showtimes or ticket availability are confirmed."
      },
      {
        label: "OYA Magazine — trailer, cast and director analysis",
        href: "https://www.oyamag.com/issakaba-returns-trailer/",
        lastChecked: "2026-10-10",
        note: "Independent report describing the official trailer, returning filmmaker, supporting cast and thematic focus."
      },
      {
        label: "NollywoodCV — cast and original franchise context",
        href: "https://www.nollywoodcv.com/public/blog/issakaba-returns-set-for-november-13-cinema-release-25-years-after-nollywood-classic",
        lastChecked: "2026-10-10",
        note: "Independent coverage of the announced release and the relationship to the 2001 film."
      }
    ],
    watchLinks: [
      {
        platform: "Cinema",
        label: "See the film listing and announced 13 November release",
        href: "https://nollywood.com/movies/issakaba-the-return",
        access: "cinema",
        lastChecked: "2026-10-10",
        note: "Announced to open in Nigerian cinemas 13 November 2026. This is a film catalog listing, not a cinema ticket seller or streaming link. Verify actual showtimes later with an authorised exhibitor."
      }
    ]
  }
];
