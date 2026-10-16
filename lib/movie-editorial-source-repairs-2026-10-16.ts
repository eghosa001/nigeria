import type { EntertainmentTitle, EntertainmentReferenceLink } from "@/lib/entertainment";
import type { MovieEditorialProfile } from "@/lib/movie-editorial-profiles";
import { movieEditorialProfilesRemainingB } from "@/lib/movie-editorial-profiles-remaining-b";
import { featuredEditorialProfiles } from "@/lib/movie-editorial-profiles-featured";

// Five individually researched corrections to existing, canonical movie pages.
// Sources checked 16 October 2026. A database duration is not a measured video
// duration, a film credit is not a rights grant, and a publisher description is
// not evidence that a film has been watched independently.
type RecordRepair = Partial<Pick<EntertainmentTitle, "synopsis" | "directors" | "runtimeMinutes">> & {
  references: EntertainmentReferenceLink[];
};
export const reviewedMovieRecords20261016: Record<string, RecordRepair> = {
  "oil-and-water-2025": {
    directors: ["Olubunmi Akingbola"],
    references: [
      {
        label: "Shutterspeed Projects — Oil and Water production credits and producer brochure",
        href: "https://shutterspeedprojects.com/our-portfolio/",
        lastChecked: "2026-10-16",
        note: "The producing studio credits Olubunmi Akingbola as director, matching FilmFlux. Its web portfolio has a different story synopsis from the studio's 2025 brochure and original BIODUNSTEPHEN TV video; the discrepancy is disclosed below."
      },
      {
        label: "Shutterspeed Projects — official 2025 production brochure",
        href: "https://shutterspeedprojects.com/wp-content/uploads/2025/10/ssp-brochure-2025.pdf",
        lastChecked: "2026-10-16",
        note: "Official production brochure's Oil and Water entry names Olubunmi Akingbola as director and describes an estranged mother and daughter; the generic original-video description instead says produced and directed by Biodun Stephen."
      }
    ]
  },
  "the-man-i-never-knew": {
    synopsis: "Mila meets Val at a resort and defies a family-arranged marriage to be with him. Years later, someone who looks like her former love appears but insists he has never met her. The 2026 Royal Arts TV romance turns this apparent reunion into a question of identity; this summary does not reveal the explanation.",
    references: [
      {
        label: "FilmFlux — The Man I Never Knew (2026) original release record",
        href: "https://filmflux.app/movie/73b3559e-59aa-49f3-869f-74d69ca0a8e5-the-man-i-never-knew",
        lastChecked: "2026-10-16",
        note: "Documents the resort meeting, cancelled arranged marriage, identity complication, publisher Royal Arts TV, September 24 release and billed cast. It does not claim a pregnancy."
      },
      {
        label: "Nollywood Times — original Royal Arts TV release reporting",
        href: "https://www.nollywoodtimes.com/2026/09/the-man-i-never-knew-starring-toosweet.html",
        lastChecked: "2026-10-16",
        note: "Independent September 25 report confirms Royal Arts TV's 24 September 2026 release, listed performers, and a lookalike who denies recognising Mila; no pregnancy is reported."
      }
    ]
  },
  "man-of-the-year-2026": {
    references: [
      {
        label: "Nollywire — Man of the Year (2026) film profile",
        href: "https://nollywire.com/films/man-of-the-year",
        lastChecked: "2026-10-16",
        note: "Independently corroborates Nigerian drama, Maurice Sam and Sarian Martins; its 101-minute listing conflicts with the 126-minute runtime given by NollyMeter and is not an exact YouTube-player measurement."
      },
      {
        label: "NollyMeter — Man of the Year original January 2026 film listing",
        href: "https://nollymeter.com/movies/man-of-the-year",
        lastChecked: "2026-10-16",
        note: "Publisher-description synopsis, 20 January 2026 release, credited leads and a 126-minute running-time listing. The duration discrepancy remains unresolved; no director attribution inferred."
      }
    ]
  },
  "for-richer-for-poorer-2026": {
    references: [
      {
        label: "Nollywire — For Richer For Poorer (2026) Nigerian film",
        href: "https://nollywire.com/films/for-richer-for-poorer",
        lastChecked: "2026-10-16",
        note: "Confirms the Maurice Sam and Sophie Alakija drama and its central financial-hardship storyline. Gives 144 minutes rather than FilmFlux's 163; runtime disagreement is explained below, not disguised."
      },
      {
        label: "NollyMeter — For Richer For Poorer exact 2026 release",
        href: "https://www.nollymeter.com/movies/for-richer-for-poorer",
        lastChecked: "2026-10-16",
        note: "Exact cast and 26 May 2026 release match the official Maurice Sam TV upload. Lists 164 minutes, close to FilmFlux's 163, but not proof of a fixed duration across platforms."
      }
    ]
  },
  "one-more-night": {
    references: [
      {
        label: "FilmFlux — One More Night (2025) Frederick Leonard TV",
        href: "https://filmflux.app/movie/d24e1517-990c-47ac-8d1a-76f712c063ee-one-more-night",
        lastChecked: "2026-10-16",
        note: "Identifies the original 7 February 2025 Frederick Leonard TV release, 129-minute listing, lead cast, Annabel and Mason story, and documented production-crew roles; no director is identified."
      }
    ]
  }
};

const existing = movieEditorialProfilesRemainingB;
const featured = featuredEditorialProfiles;
const sourceQuestion = (question: string, answer: string) => ({ question, answer });

export const reviewedMovieDossiers20261016: Record<string, MovieEditorialProfile> = {
  "the-man-i-never-knew": {
    ...existing["the-man-i-never-knew"],
    sections: [
      {
        heading: "Mila, Val and the person who denies knowing her",
        paragraphs: [
          "Mila meets Val during a resort visit and falls for him strongly enough to go against her father's choice of a marriage partner. The next major conflict is not simply a former lover returning. After years have passed, she comes across someone who looks like Val, but he claims never to have known her. The production's published description establishes this as an identity mystery; the film-specific record supplies further information about the explanation, which is left out here for viewers who want to avoid spoilers.",
          "The distinction matters because a previous description of this film claimed Mila was abandoned while pregnant and later raised a child alone. Neither the original film record examined for this revision nor contemporary coverage supports those pregnancy and parenting details. They have been withdrawn, rather than repeated as established plot facts.",
          "TooSweet Annan, Chisom Agoawuike and Mojoyin Fadaka are named in both the publisher-linked FilmFlux entry and release reporting. Those sources do not establish which performer portrays every supporting character, so no extra roles are assigned."
        ]
      },
      {
        heading: "Which release is this, and where does the evidence stop?",
        paragraphs: [
          "The Nigerian film appeared on Royal Arts TV on 24 September 2026; an independent 25 September news report describes its mystery about a familiar-looking man who refuses recognition. The catalogued running time is approximately 94 minutes. Use the original publisher-linked YouTube video on this page rather than confusing a similarly named film, a trailer or an unauthorised repost with the full movie.",
          "The available film-specific sources do not reliably name a director. The plot explanation in a third-party catalogue should also not be confused with a first-hand review of the finished movie. The central identification problem is enough to explain the story's premise without presenting unsupported details as fact."
        ]
      }
    ],
    questions: [
      sourceQuestion("Does Mila have a child in The Man I Never Knew?", "The sources checked for this update do not confirm pregnancy or a child. The verified setup concerns Mila's resort romance with Val and a later identity mystery."),
      sourceQuestion("Where can I watch The Man I Never Knew (2026)?", "The film was released through Royal Arts TV on 24 September 2026. Follow the original publisher video linked on this page; access can change."),
      sourceQuestion("Who appears in The Man I Never Knew?", "TooSweet Annan, Chisom Agoawuike and Mojoyin Fadaka are the billed performers. Specific character assignments beyond the documented storyline remain unverified.")
    ]
  },
  "oil-and-water-2025": {
    ...existing["oil-and-water-2025"],
    crew: [
      { role: "Director (producer brochure and FilmFlux attribution; original video tagline differs)", name: "Olubunmi Akingbola" }
    ],
    sections: [
      ...existing["oil-and-water-2025"].sections,
      {
        heading: "Why the official pages disagree about the story and director",
        paragraphs: [
          "The production company's 2025 brochure and the original BIODUNSTEPHEN TV release both describe an estranged mother and daughter who become entangled with the same man. Shutterspeed Projects' current online portfolio gives a different premise, about tenants troubled by their landlady, despite listing the same production. That web-portfolio synopsis should not replace the story shown in the original release and brochure.",
          "Shutterspeed Projects explicitly lists Olubunmi Akingbola as director in the official brochure and its online production entry; FilmFlux's film-specific crew list agrees. However, the original publisher video description includes a broader 'produced and directed by Biodun Stephen' claim. This page therefore attributes the director to the producer's formal credit documents and discloses the inconsistent video wording. Only the actual film's on-screen credits or direct production confirmation could fully reconcile it."
        ]
      }
    ],
    questions: [
      ...existing["oil-and-water-2025"].questions,
      sourceQuestion("Who directed Oil and Water (2025)?", "The producer's official portfolio and brochure, supported by FilmFlux, name Olubunmi Akingbola. A conflicting director phrase on the original video is disclosed; on-screen title credits were not independently viewed.")
    ]
  },
  "man-of-the-year-2026": {
    ...existing["man-of-the-year-2026"],
    sections: [
      ...existing["man-of-the-year-2026"].sections,
      {
        heading: "Confirmed release, cast and running-time uncertainty",
        paragraphs: [
          "The original Maurice Sam TV full-length video was published on 20 January 2026 and describes a fighter whose difficulties extend beyond competition into love and pride. Nollywire identifies the same film as a 2026 Nigerian drama and lists Maurice Sam and Sarian Martins among its stars. The channel's film title spells her surname Martin; those two spellings do not establish different performers.",
          "Runtime records conflict: Nollywire shows 1 hour 41 minutes and NollyMeter lists 2 hours 6 minutes. Neither is a verified measurement of the currently accessible YouTube player, so the page should not present a single precise duration as settled. No identified reliable source establishes the director; no directorial credit is invented."
        ]
      }
    ],
    questions: [
      ...existing["man-of-the-year-2026"].questions,
      sourceQuestion("How long is Man of the Year (2026)?", "Nollywire lists 101 minutes, while NollyMeter lists 126 minutes. Check the original Maurice Sam TV player for its actual current duration."),
      sourceQuestion("Who directed Man of the Year (2026)?", "The checked film-specific publisher and catalogue records do not establish a director, so this page does not assign one.")
    ]
  },
  "for-richer-for-poorer-2026": {
    ...featured["for-richer-for-poorer-2026"],
    sections: [
      ...featured["for-richer-for-poorer-2026"].sections,
      {
        heading: "Which film and how long is the publisher's version?",
        paragraphs: [
          "This guide covers the Nigerian 2026 drama starring Maurice Sam and Sophie Alakija that premiered on Maurice Sam TV on 26 May 2026. Its dilemma begins when financial security disappears and tests the couple's mutual commitment. Use the original cast, publisher and year to distinguish it from similarly titled television episodes and unrelated older films.",
          "FilmFlux describes the original upload as approximately 163 minutes, and NollyMeter records 164 minutes for the same cast and year. Nollywire instead lists 144 minutes. The discrepancy has not been reconciled as a platform edit, shortened cut or catalogue error, so the player is a better reference for a viewer's actual time commitment. An online movie database is not evidence that a separate streaming service owns distribution rights."
        ]
      }
    ],
    questions: [
      ...featured["for-richer-for-poorer-2026"].questions,
      sourceQuestion("How long is For Richer, For Poorer (2026)?", "FilmFlux gives about 163 minutes and NollyMeter 164, while Nollywire lists 144. The original Maurice Sam TV player's current duration should be checked before planning a full viewing.")
    ]
  },
  "one-more-night": {
    ...featured["one-more-night"],
    releaseDate: "2025-02-07",
    sections: [
      ...featured["one-more-night"].sections,
      {
        heading: "This 2025 film is not a similarly titled newer release",
        paragraphs: [
          "One More Night here is the Frederick Leonard TV film first uploaded on 7 February 2025. The film-specific catalogue identifies Frederick Leonard, Cynthia Clarke, Bryan Okoye, Vivian Gabriel and Desmond Anyanwu and describes Annabel and Mason as reunited former sweethearts. Its listed length is around 129 minutes, though a player may not always display the same duration.",
          "Production-crew information in FilmFlux includes Frederick Leonard as producer, but the checked source does not identify a director. A producer credit cannot be automatically converted into a director credit. When a search result uses the same title for a different movie, match the original publisher, release year and cast before relying on its plot or credits."
        ]
      }
    ],
    questions: [
      ...featured["one-more-night"].questions,
      sourceQuestion("Which One More Night film does this guide cover?", "The 7 February 2025 full-length Frederick Leonard TV release featuring Frederick Leonard and Cynthia Clarke, not another production sharing the title."),
      sourceQuestion("Who directed One More Night (2025)?", "The film-specific sources checked identify production crew but do not reliably name the director. This guide therefore leaves the director unassigned.")
    ]
  }
};
