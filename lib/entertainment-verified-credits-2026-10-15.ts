// Independently checked film-production credits, not guesses from casts.
// A credit source is evidence for the named production role, NOT a claim
// that the movie is currently playable on that source's website.
type VerifiedCredit = {
  directors: string[];
  source: { label: string; href: string; lastChecked: string; note: string };
};
export const verifiedFilmDirectorCredits20261015: Record<string, VerifiedCredit> = {
  "chief-daddy": {
    directors: ["Niyi Akinmolayan"],
    source: { label: "EbonyLife Films — Chief Daddy production announcement", href: "https://ebonylifetv.com/filming-wraps-up-for-ebonylife-production-chief-daddy/", lastChecked: "2026-10-15", note: "Producer's production announcement explicitly names Niyi Akinmolayan as director." },
  },
  "chief-daddy-2": {
    directors: ["Niyi Akinmolayan"],
    source: { label: "IMDb — Chief Daddy 2 full production credits", href: "https://www.imdb.com/title/tt16760592/fullcredits/", lastChecked: "2026-10-15", note: "Full credits identify Niyi Akinmolayan as director; not evidence of current streaming availability." },
  },
  "elesin-oba": {
    directors: ["Biyi Bandele"],
    source: { label: "IMDb — Elesin Oba production credits", href: "https://www.imdb.com/title/tt15374214/fullcredits/", lastChecked: "2026-10-15", note: "Production credits attribute the film direction to Biyi Bandele." },
  },
  "blood-vessel": {
    directors: ["Moses Inwang"],
    source: { label: "Play Network Studios — Blood Vessel credits", href: "https://www.playnetworkstudios.com/film?mid=6", lastChecked: "2026-10-15", note: "The producing studio explicitly lists Moses Inwang as director." },
  },
  "tokunbo": {
    directors: ["Ramsey Nouah"],
    source: { label: "IMDb — Tòkunbò production credits", href: "https://www.imdb.com/title/tt32324146/fullcredits/", lastChecked: "2026-10-15", note: "The full production credits identify Ramsey Nouah as director." },
  },
  "a-naija-christmas": {
    directors: ["Kunle Afolayan"],
    source: { label: "IMDb — A Naija Christmas credits", href: "https://www.imdb.com/title/tt15565704/fullcredits/", lastChecked: "2026-10-15", note: "The film's full credits identify Kunle Afolayan as director." },
  },
  "swallow": {
    directors: ["Kunle Afolayan"],
    source: { label: "IMDb — Swallow film credits", href: "https://www.imdb.com/title/tt14391622/", lastChecked: "2026-10-15", note: "The 2021 film listing identifies Kunle Afolayan as director, distinct from other films called Swallow." },
  },
  "up-north": {
    directors: ["Tope Oshin"],
    source: { label: "FilmOne — Up North production credits", href: "https://www.filmoneng.com/movie/up-north", lastChecked: "2026-10-15", note: "The distributor explicitly credits Tope Oshin as director." },
  },
};
