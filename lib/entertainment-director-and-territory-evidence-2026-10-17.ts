import type { EntertainmentTitle, EntertainmentReferenceLink } from "@/lib/entertainment";
import type { MovieEditorialProfile } from "@/lib/movie-editorial-profiles";

// Film-by-film credit and territory checks, 17 October 2026.
// A source catalogue attributing a crew member is not first-hand observation of
// screen credits. Do not convert a channel name or region-blocked listing into
// a confirmed director or a playable Nigerian watch link.
type MovieReview = {
  directors?: string[];
  synopsis?: string;
  references: EntertainmentReferenceLink[];
  editorial: {
    heading: string;
    paragraphs: string[];
    question: { question: string; answer: string };
    crew?: MovieEditorialProfile["crew"];
  };
};

export const filmCreditAndAvailabilityReviews20261017: Record<string, MovieReview> = {
  "third-party-risk": {
    directors: ["Uche Alexmoore"],
    references: [{
      label: "African Movies Database — Third Party Risk exact-title production crew",
      href: "https://africanmoviedb.com/title/third-party-risk-2026",
      lastChecked: "2026-10-17",
      note: "The film-specific 8 September 2026 cast-and-crew record explicitly attributes the Director and Director of Photography roles to Uche Alexmoore. This is a named catalogue credit, not an independent inspection of the film's final screen titles."
    }],
    editorial: {
      heading: "How the credited director was identified",
      paragraphs: [
        "The African Movies Database's exact-title record for the 8 September 2026 film names Uche Alexmoore as both director and director of photography. The same record places Ray Emodi as Jason, Omeche Oko as Emerald and Symon Oko as Dare. These are distinct production roles: Enyinna Jonas appears as executive producer, not as the director merely because the film was uploaded to Enyinna Jonas TV.",
        "This credits correction does not imply that we have personally inspected the closing titles. Viewers looking for a credits confirmation should consult the specific film catalogue and original publisher video rather than infer production responsibility from the YouTube channel name."
      ],
      question: { question: "Who is credited as directing Third Party Risk (2026)?", answer: "African Movies Database names Uche Alexmoore as director and cinematographer for the 8 September 2026 film; it credits Enyinna Jonas as executive producer." },
      crew: [{ role: "Director (African Movies Database attribution)", name: "Uche Alexmoore" }]
    }
  },
  "one-more-night": {
    directors: ["Frederick Leonard"],
    references: [{
      label: "African Movies Database — One More Night (7 February 2025) director and cast credits",
      href: "https://africanmoviedb.com/title/one-more-night-2025",
      lastChecked: "2026-10-17",
      note: "Exact film credits name Frederick Leonard as Director and Producer; list Cynthia Clarke as Anna, Leonard as Mason and Bryan Okoye as Richie. FilmFlux identifies the producer but omits a director field; omission is not an affirmative conflicting director attribution."
    }],
    editorial: {
      heading: "Why this Frederick Leonard film's director is now credited",
      paragraphs: [
        "One More Night is the Frederick Leonard TV film released on 7 February 2025, not another romance with a similar title. African Movies Database's dedicated entry credits Frederick Leonard as both director and producer, in addition to playing Mason. Cynthia Clarke is credited as Anna and Bryan Okoye as Richie. The available FilmFlux entry lists Leonard as producer but does not name a director, so we attribute the directorial credit specifically to the film's named catalogue listing.",
        "The story revolves around Anna's difficult reunion with Mason after eight years apart. The film-specific record supports the identities of the leads, but a plot description and cast list cannot substitute for a review of the complete film. Use the original Frederick Leonard TV release for the viewing experience and the film-credit source for the director attribution."
      ],
      question: { question: "Who directed One More Night with Frederick Leonard and Cynthia Clarke?", answer: "The African Movies Database cast-and-crew entry for the 7 February 2025 film credits Frederick Leonard as director and producer." },
      crew: [{ role: "Director (African Movies Database attribution)", name: "Frederick Leonard" }]
    }
  },
  "for-richer-for-poorer-2026": {
    directors: ["Chidi Anyanwu"],
    references: [{
      label: "FilmFlux — exact 26 May 2026 For Richer, For Poorer production crew",
      href: "https://filmflux.app/movie/73f3fc6a-a22c-4351-9c54-f4544f6eebe3-for-richer-for-poorer",
      lastChecked: "2026-10-17",
      note: "Exact Maurice Sam TV film entry's crew identifies Chidi Anyanwu as Director, alongside Maurice Sam and Uchenna Mbunabo as credited producers. 144-minute Nollywire runtime conflicts with 163–164-minute full-video indexes; do not assert an exact immutable runtime."
    }],
    editorial: {
      heading: "Production credit and conflicting running times",
      paragraphs: [
        "For Richer, For Poorer is the 26 May 2026 Maurice Sam TV film led by Maurice Sam and Sophie Alakija. FilmFlux's named production-crew list credits Chidi Anyanwu as director and Maurice Sam and Uchenna Mbunabo as producers. Those are catalogue-attributed roles for this exact upload; neither an actor's starring role nor ownership of the upload channel alone establishes direction.",
        "The film's running time remains inconsistent between available records: FilmFlux indexes roughly two hours forty-three minutes, NollyMeter two hours forty-four, and Nollywire two hours twenty-four. The sensible viewing advice is to check the original publisher video's displayed length rather than treating one secondary metadata figure as the single definitive cut."
      ],
      question: { question: "Who directed For Richer, For Poorer (2026) on Maurice Sam TV?", answer: "FilmFlux's exact-title credits name Chidi Anyanwu as director. It lists Maurice Sam and Uchenna Mbunabo among the producers." },
      crew: [{ role: "Director (FilmFlux production-crew attribution)", name: "Chidi Anyanwu" }]
    }
  },
  "colours-of-fire": {
    synopsis: "Akinbode, a warrior of a clan known for its indigo craft, must confront escalating tension with a rival red-dye clan when his feelings for Moremi, an apparent rival, challenge both groups' loyalties. The 2025 fantasy film reached cinemas before later streaming announcements. Netflix Nigeria currently displays the film but warns that it cannot be watched locally; Kava separately limits viewing to selected territories outside Africa.",
    references: [{
      label: "Kava TV — Colours of Fire provider page and Africa territory exclusion",
      href: "https://kavatv.vhx.tv/colours-of-fire",
      lastChecked: "2026-10-17",
      note: "Official Kava listing names director Niyi Akinmolayan and the 2025 cast, but explicitly states 'only available in select regions, not available in Africa'. Do not present this as a Nigerian playback link."
    },{
      label: "Netflix Nigeria — Colours of Fire local availability warning",
      href: "https://www.netflix.com/ng/title/82752912",
      lastChecked: "2026-10-17",
      note: "Nigerian storefront still displays 'This title currently isn't available to watch in your country'. A local metadata listing must not be portrayed as a valid watch option."
    }],
    editorial: {
      heading: "Where Nigerians cannot currently watch Colours of Fire",
      paragraphs: [
        "The official Kava TV page identifies the 2025 fantasy film and attributes its direction to Niyi Akinmolayan, but it explicitly restricts playback to selected regions outside Africa. Kava's promotional page therefore is not a working Nigeria watch recommendation. Netflix Nigeria's own title page also currently says the film is unavailable in the country. Reports about earlier release plans do not outweigh a present territory restriction shown by the platforms themselves.",
        "For viewers in Nigeria, no playable authorised streaming link was verified in this review. That does not imply the film has been removed everywhere or that its historic cinema release never took place. Check the distributor or official platform on the day you want to watch; do not subscribe or pay based solely on an old availability announcement."
      ],
      question: { question: "Can Colours of Fire currently be streamed on Netflix Nigeria or Kava from Nigeria?", answer: "Both checked platform pages restrict viewing: Netflix Nigeria says the title is not available locally and Kava says its version is not available in Africa. No Nigeria-playable link is presently verified." }
    }
  },
  "abe-odale-2026": {
    references: [{
      label: "Nollywood Times — Abe Odale 11 October 2026 LibraTV premiere",
      href: "https://www.nollywoodtimes.com/2026/10/abe-odale-premieres-on-libratv-youtube.html",
      lastChecked: "2026-10-17",
      note: "Reports 11 October full release through LibraTV and the named principal actors, author-producer Omobolanle Salisu and director Wasiu Adeyanju. The report says to search the publisher's channel but does not supply an independently verified watch URL."
    }],
    editorial: {
      heading: "How to identify the original LibraTV release",
      paragraphs: [
        "Reporting dated 12 October 2026 identifies an 11 October premiere on LibraTV, naming Wasiu Adeyanju as director and Omobolanle Salisu as writer-producer. However, the accessible article directs viewers to the channel rather than providing a verified full-film video identifier. A search result showing a similarly named Yoruba video or an unofficial mirror is not enough to create a permanent film-playback link.",
        "Until an exact authorised video is checked, use the publisher name and the film's alternative title, Blade of Betrayal, to find the original. The platform is documented; a specific playable upload has not been validated for this page. The film's detailed story and character pairings also remain unverified rather than being guessed from the word 'betrayal'."
      ],
      question: { question: "Where was Abe Odale released and is its exact full-film link confirmed here?", answer: "The 11 October 2026 premiere was reported on LibraTV's YouTube channel. This guide has not verified the exact authorised video URL, so it does not label an unconfirmed upload as playable." }
    }
  },
  "long-enough-2026": {
    references: [{
      label: "Uche Nancy Update TV — 2026 Long Enough channel release evidence",
      href: "https://www.youtube.com/channel/UCllyxqlpQNkJpXf3PHb4aWQ",
      lastChecked: "2026-10-17",
      note: "The official publisher channel is identified by its exact channel ID. Secondary channel indexes report a 17 September 2026 full upload with Victory Michael, Prisma James and Jennifer Obodo; the exact original watch URL remains unverified."
    }],
    editorial: {
      heading: "Why a publisher channel is not yet a verified film link",
      paragraphs: [
        "This is the 2026 Long Enough film promoted by Uche Nancy Update TV with Victory Michael, Prisma James and Jennifer Obodo. Available channel indexes describe a full film uploaded on 17 September 2026, but no reliable direct watch identifier was established during this check. That is why this page does not substitute a channel homepage or an unrelated re-upload for a confirmed full-film video.",
        "Do not confuse the title with Forever Isn't Long Enough, the separate 2025 Royal Arts TV production featuring a church-family storyline. Similar titles and recent search dates are not evidence of the same cast, publisher or story. Consult Uche Nancy's authenticated channel until the exact authorised video can be verified."
      ],
      question: { question: "Is Long Enough (2026) the Royal Arts TV movie Forever Isn't Long Enough?", answer: "No. Long Enough is associated with Uche Nancy Update TV's September 2026 release; Forever Isn't Long Enough is a different Royal Arts TV film released in December 2025. The exact authorised Long Enough watch link is not yet verified here." }
    }
  },
  "the-man-i-never-knew": {
    references: [{
      label: "FilmFlux — The Man I Never Knew conflicting directorial attributions",
      href: "https://filmflux.app/movie/73b3559e-59aa-49f3-869f-74d69ca0a8e5-the-man-i-never-knew",
      lastChecked: "2026-10-17",
      note: "The exact-title page's header and ranking associate Uche Alexmoore with direction, but its expanded crew simultaneously lists Imaobong Udoh as Director and Uche Alexmoore as cinematographer/post-production. These conflicting fields cannot support a single definitive director."
    }],
    editorial: {
      heading: "Why the director credit is still unconfirmed",
      paragraphs: [
        "FilmFlux's exact Royal Arts TV movie entry carries conflicting production-role fields: its overview identifies Uche Alexmoore as director, while the expanded crew section credits Imaobong Udoh as director and Uche Alexmoore with cinematography and post-production. That internal inconsistency matters. We cannot present either name as a confirmed director without a more authoritative production record or the film's own screen credits.",
        "The verified viewing link points to Royal Arts TV's September 2026 release, featuring TooSweet Annan, Chisom Agoawuike and Mojoyin Fadaka. A watchable original upload verifies distribution but does not by itself resolve the competing director names. The guide therefore leaves the director field unconfirmed rather than inventing certainty."
      ],
      question: { question: "Why does The Man I Never Knew still have an unconfirmed director?", answer: "An indexed FilmFlux summary names Uche Alexmoore but its own expanded crew names Imaobong Udoh as director. The sources conflict, and no final on-screen credit was independently checked." }
    }
  },
  "what-love-is": {
    references: [{
      label: "African Movies Database — What Love Is 2026 producer, writer and director absence",
      href: "https://africanmoviedb.com/title/what-love-is-2026",
      lastChecked: "2026-10-17",
      note: "Lists Maurice Sam as producer and Onyii Cindy Umeh as writer, with Tunde Adekoya as director of photography, but does not identify a film director. These roles must not be conflated."
    }],
    editorial: {
      heading: "Production roles that are verified, and the one still missing",
      paragraphs: [
        "African Movies Database credits Maurice Sam as producer, Onyii Cindy Umeh as writer, and Tunde Adekoya as director of photography for the 8 September 2026 What Love Is film. A cinematographer's 'director of photography' title is not a director-of-film credit. The original Maurice Sam TV description confirms the publisher and lead cast but does not name a director.",
        "The film guide can therefore distinguish a verifiable producing role from the unresolved directing role. Treating Maurice Sam as director only because he leads the cast or operates the publisher channel would create the kind of unverified movie credit this editorial review is designed to prevent."
      ],
      question: { question: "Does What Love Is (2026) have a confirmed film director?", answer: "No director is identified in the checked publisher description or African Movies Database record. Maurice Sam is credited as producer, Onyii Cindy Umeh as writer and Tunde Adekoya as director of photography." }
    }
  }
};
