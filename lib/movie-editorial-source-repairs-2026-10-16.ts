import type { EntertainmentTitle, EntertainmentReferenceLink } from "@/lib/entertainment";
import type { MovieEditorialProfile } from "@/lib/movie-editorial-profiles";
import { movieEditorialProfilesRemainingB } from "@/lib/movie-editorial-profiles-remaining-b";
import { featuredEditorialProfiles } from "@/lib/movie-editorial-profiles-featured";
import { filmCreditAndAvailabilityReviews20261017 } from "@/lib/entertainment-director-and-territory-evidence-2026-10-17";

// Eight individually researched corrections to existing, canonical movie pages.
// Sources checked 16 October 2026. A database duration is not a measured video
// duration, a film credit is not a rights grant, and a publisher description is
// not evidence that a film has been watched independently.
type RecordRepair = Partial<Pick<EntertainmentTitle, "synopsis" | "directors" | "runtimeMinutes" | "genres" | "cast">> & {
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
  "a-place-with-you": {
    references: [{
      label: "African Movies Database — A Place With You film characters",
      href: "https://africanmoviedb.com/title/a-place-with-you-2026",
      lastChecked: "2026-10-16",
      note: "Separately identifies Uche Montana as Chidiomimi and Chidi Dike as Kelechi; the independent eElive review already linked above corroborates the young widow, village fish trading and adult schooling."
    }]
  },
  "where-love-lives": {
    cast: ["Uzor Arukwe", "Bimbo Ademoye", "Chioma Nwosu", "Osas Ighodaro", "Emem Udonquak"],
    synopsis: "To celebrate their wedding anniversary, Ekene surprises his wife Demilade with a house in a wealthy Lagos estate. Neighbours Queen, Imade and Eno challenge the new arrival's place in their circle, while family pressure about children and emerging financial problems test the couple's marriage. Bimbo Ademoye and Uzor Arukwe lead this 2025 romantic comedy about class, loyalty and the appearance of success.",
    references: [
      {
        label: "Premium Times — Where Love Lives original film review and plot",
        href: "https://www.premiumtimesng.com/entertainment/movies/846490-movie-review-where-love-lives-proves-nollywood-doesnt-need-big-budgets-to-win-hearts.html",
        lastChecked: "2026-10-16",
        note: "Reports Ekene and Demilade's marriage, wedding-anniversary estate, neighbours Queen/Imade/Eno, family questions about children and financial tensions."
      },
      {
        label: "Nollywood.com — Where Love Lives production and character credits",
        href: "https://nollywood.com/movies/where-love-lives/crew",
        lastChecked: "2026-10-16",
        note: "Corroborates 24 December 2025 release and actor-character assignments, distinct from similarly named productions."
      }
    ]
  },
  "monica": {
    genres: ["Drama", "Family", "Nollywood"],
    synopsis: "Monica, the eldest daughter of a struggling Nigerian family, sacrifices education and her own plans to support relatives whose expectations keep growing. Her generosity meets pressure and ingratitude, turning this 2026 Uche Montana-led drama into a story about family duty and self-worth. This is the original March film, not its later sequel Monica 2.",
    cast: ["Uche Montana", "John Ekanem", "Blessing Onwukwe", "Chris Biyibi"],
    references: [
      {
        label: "TheCable Lifestyle — Monica review and family-sacrifice storyline",
        href: "https://lifestyle.thecable.ng/review-monica-forces-a-rethink-of-sacrifice-and-self-worth/",
        lastChecked: "2026-10-16",
        note: "Independent 29 March review identifies Uche Montana's original YouTube movie as a drama about family support, self-worth and sacrifices, not a generic romantic courtship."
      },
      {
        label: "Premium Times — Monica and Monica 2 original release chronology",
        href: "https://www.premiumtimesng.com/entertainment/nollywood/877356-movie-review-monica-2-breaks-internet-with-a-story-many-nigerians-know-too-well.html",
        lastChecked: "2026-10-16",
        note: "Confirms the original premiered 7 March 2026 and Monica 2 followed 2 May; documents firstborn-daughter family burden, distinct film entries and official publisher."
      },
      {
        label: "Entertainment Digest — original Monica credited characters",
        href: "https://entertainmentdigest.ng/2026/05/23/movie-review-monica-heavy/",
        lastChecked: "2026-10-16",
        note: "Film-specific review names Uche Montana as Monica, John Ekanem as Pascal, Blessing Onwukwe as Mama Monica and Chris Biyibi as Papa Monica. Director attribution awaits independent production-title confirmation."
      }
    ]
  },
  "fruit-covenant": {
    cast: ["Toyin Abraham Ajeyemi", "Olarotimi Fakunle", "Jumoke George", "Hejiwumi Akewi", "Miracle Ojorale", "Abisola Salami"],
    references: [
      {
        label: "Toyin Abraham TV — original Fruit Covenant cast and production credits",
        href: "https://www.youtube.com/watch?v=OLmUOAjZqOg",
        lastChecked: "2026-10-16",
        note: "Original June 12 full-length upload explicitly credits Toyin Abraham as Adun, Olarotimi Fakunle as Adekunle, Jumoke George as Mrs Coker, Hejiwumi Akewi as Miracle, Miracle Ojorale as Favour and Abisola Salami as Desire; lists Sola Oyedele and Toyin Abraham as co-directors."
      },
      {
        label: "eElive — Fruit Covenant story and characters review",
        href: "https://www.eelive.ng/fruit-covenant-review-the-spiritual-price-of-wealth-and-the-need-for-discernment/",
        lastChecked: "2026-10-16",
        note: "Independent film review verifies Adun and Adekunle's marriage, family economic pressures, three named daughters and Mrs Coker's role. No claim is made about the film's primary spoken language."
      }
    ]
  },
  "sister-agatha": {
    references: [{
      label: "FilmFlux — Sister Agatha (2026) original Blessing Obasi TV release",
      href: "https://filmflux.app/movie/fddd64fc-a974-4548-b970-96f5e9b8b4e5-sister-agatha",
      lastChecked: "2026-10-16",
      note: "Documents 25 September 2026 release, approximate 108-minute length, publisher and billed cast; story features rivalry for a sponsored church trip to a London crusade."
    }]
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

// Later, exact-film source checks are merged into this established correction
// registry. Keep the original eight amendments and their historical citations;
// replacing a matching URL updates its evidence date without duplicating it.
for (const [slug, review] of Object.entries(filmCreditAndAvailabilityReviews20261017)) {
  const prior = reviewedMovieRecords20261016[slug];
  reviewedMovieRecords20261016[slug] = {
    ...(prior ?? {}),
    ...(review.directors ? { directors: review.directors } : {}),
    ...(review.synopsis ? { synopsis: review.synopsis } : {}),
    references: [
      ...(prior?.references ?? []).filter(ref => !review.references.some(next => next.href === ref.href)),
      ...review.references,
    ],
  };
}

const existing = movieEditorialProfilesRemainingB;
const featured = featuredEditorialProfiles;
const sourceQuestion = (question: string, answer: string) => ({ question, answer });

export const reviewedMovieDossiers20261016: Record<string, MovieEditorialProfile> = {
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
  },
  "a-place-with-you": {
    ...existing["a-place-with-you"],
    roles: [
      { actor: "Uche Montana", character: "Chidiomimi" },
      { actor: "Chidi Dike", character: "Kelechi" }
    ],
    sections: [
      {
        heading: "Why Chidiomimi returns to school",
        paragraphs: [
          "The central character is Chidiomimi, a young widow who earns money selling fish in her village. After being publicly humiliated by a wealthy customer over her circumstances and education, she decides to go back to school at 25. This is a much more specific premise than a generic story about people healing from past relationships: schooling, economic status and social judgment drive what she hopes to change.",
          "Chidiomimi meets Kelechi, a city-raised young man, while pursuing her education. Their friendship grows against expectations about a widow's age, literacy and suitability for romance. The independent eElive review identifies the performers as Uche Montana and Chidi Dike, which the film-specific catalogue corroborates; this guide does not infer character identities from unrelated productions.",
          "This film is a choice for viewers interested in second chances and the stigma surrounding adult learners, rather than only a conventional relationship drama. The accessible original upload is from Uche Montana TV, with no evidence that a separate paid platform is necessary."
        ]
      },
      {
        heading: "The difference between social status and dignity",
        paragraphs: [
          "A major tension is whether education is something people must have obtained early in life to deserve respect. Chidiomimi's decision to return to the classroom despite village ridicule gives the film its central act of agency; the relationship with Kelechi complicates the community's assumptions rather than replacing that education story.",
          "eElive published a named review on 6 February 2026 describing these events and the performance choices. The review is a critic's interpretation rather than proof of every future viewing or distribution claim; the public film page provides the original publisher video. The ending is not reproduced here."
        ]
      }
    ],
    questions: [
      sourceQuestion("Who plays Chidiomimi and Kelechi in A Place With You?", "Uche Montana plays young widow Chidiomimi, while Chidi Dike plays Kelechi, according to the film-specific cast catalogue and eElive review."),
      sourceQuestion("Why does Chidiomimi go back to school?", "After facing humiliation as a fish seller and young widow, she chooses to pursue an education at age 25 despite social pressure."),
      sourceQuestion("Where can I watch A Place With You?", "The publisher-linked full film is available through Uche Montana TV on YouTube, subject to current playback access.")
    ]
  },
  "where-love-lives": {
    ...existing["where-love-lives"],
    releaseDate: "2025-12-24",
    roles: [
      { actor: "Bimbo Ademoye", character: "Demilade" },
      { actor: "Uzor Arukwe", character: "Ekene" },
      { actor: "Chioma Nwosu", character: "Queen" },
      { actor: "Osas Ighodaro", character: "Imade" },
      { actor: "Emem Udonquak", character: "Eno" }
    ],
    sections: [
      {
        heading: "The wedding-anniversary house and the estate rivalry",
        paragraphs: [
          "Where Love Lives begins with Ekene's move into a luxurious Lagos estate with his wife Demilade as a wedding-anniversary surprise. Demilade is comfortable being outspoken, but three affluent neighbourhood women — Queen, Imade and Eno — see her as a threat to their social position. Their clash turns everyday encounters in the estate into a comedy of status, gossip and belonging.",
          "The couple are already married at the start. This is not a story about whether two strangers begin a romance. Pressure from relatives about having children and the couple's changing financial situation create further conflict outside the rivalry with the neighbours. This distinction matters for readers who want to know the film's actual plot rather than a generic romantic-comedy label.",
          "The documented cast identifies Bimbo Ademoye as Demilade and Uzor Arukwe as Ekene. IMDb and Nollywood.com also identify Chioma Nwosu as Queen, Osas Ighodaro as Imade and Emem Udonquak as Eno. Those are film-specific character credits, not guesses from trailer pictures."
        ]
      },
      {
        heading: "Who made it and where is the film?",
        paragraphs: [
          "The Nigerian feature was released on Bimbo Ademoye TV on 24 December 2025. IMDb lists Great Valentine Edochie as director, Bimbo Ademoye for story and Ukeme Ninedeys for screenplay, while the catalogue gives an approximate 146-minute running time. Its original YouTube film link, rather than a random repost using the same title, is the direct viewing route.",
          "Premium Times and TheNET independently discussed the family and estate conflicts. Those reviews vary in opinion, and the film's success or enjoyment cannot be guaranteed by an audience statistic. The useful evidence here is the identity of the specific production, the premise and the original place to watch it."
        ]
      }
    ],
    questions: [
      sourceQuestion("Are Demilade and Ekene married in Where Love Lives?", "Yes. Ekene surprises his wife Demilade with a luxurious estate home for their wedding anniversary; the neighbours' rivalry follows their move."),
      sourceQuestion("Who are Queen, Imade and Eno?", "They are the affluent women in the new estate. Chioma Nwosu plays Queen, Osas Ighodaro plays Imade and Emem Udonquak plays Eno in the 2025 film."),
      sourceQuestion("Who directed Where Love Lives?", "Great Valentine Edochie, according to the film-specific production credits.")
    ]
  },
  "monica": {
    ...existing["monica"],
    releaseDate: "2026-03-07",
    roles: [
      { actor: "Uche Montana", character: "Monica" },
      { actor: "John Ekanem", character: "Pascal" },
      { actor: "Blessing Onwukwe", character: "Mama Monica" },
      { actor: "Chris Biyibi", character: "Papa Monica" }
    ],
    sections: [
      {
        heading: "Why Monica keeps putting her own future last",
        paragraphs: [
          "Monica is the firstborn daughter in a family that relies heavily on her efforts. She gives up opportunities for her own education and progress so that relatives can continue to benefit from her work. Their repeated demands and the lack of appreciation, not a conventional courtship, drive the tension in Uche Montana's March 2026 film.",
          "That situation poses a difficult question: when does responsibility to family turn into the loss of a person's own choices? The film's emotional subject is the uneven distribution of duty and gratitude among relatives. TheCable and later reporting describe this family-sacrifice premise; this guide is an explanation of a film, not advice that all viewers should respond to their relatives in the same way.",
          "Uche Montana plays Monica. Separate film-specific reporting also identifies John Ekanem as Pascal, Blessing Onwukwe as her mother and Chris Biyibi as her father. The fact that these performers appear in the first film does not prove identical screentime or roles in the sequel."
        ]
      },
      {
        heading: "How Monica differs from Monica 2",
        paragraphs: [
          "The original Monica was published through Uche Montana TV on 7 March 2026. The follow-up Monica 2 premiered on the same publisher channel on 2 May 2026. Both use a related family storyline, but they are separate uploads and should have separate page links and release details. Watching the first part before the sequel provides context for the expectations placed on Monica.",
          "Some commentary describes the drama as based on a real event. An independent reviewer repeating that claim is not sufficient proof of the underlying person's identity, consent or life story, so this guide does not present the fictional characters as documented real people. No director is attributed without adequately corroborated film production credits."
        ]
      }
    ],
    questions: [
      sourceQuestion("Is Monica (2026) a romance or family drama?", "The original is principally a family drama about a firstborn daughter's sacrifices, expectations and self-worth, rather than the generic romance previously described here."),
      sourceQuestion("Who plays Monica and her family?", "Uche Montana plays Monica. John Ekanem is listed as Pascal, Blessing Onwukwe as her mother and Chris Biyibi as her father."),
      sourceQuestion("What order should Monica and Monica 2 be watched?", "Start with Monica, the 7 March 2026 original, then Monica 2, released 2 May 2026. Both have distinct original Uche Montana TV uploads.")
    ]
  },
  "fruit-covenant": {
    ...existing["fruit-covenant"],
    releaseDate: "2026-06-12",
    roles: [
      { actor: "Toyin Abraham Ajeyemi", character: "Adun" },
      { actor: "Olarotimi Fakunle", character: "Adekunle" },
      { actor: "Jumoke George", character: "Mrs Coker" },
      { actor: "Hejiwumi Akewi", character: "Miracle" },
      { actor: "Miracle Ojorale", character: "Favour" },
      { actor: "Abisola Salami", character: "Desire" }
    ],
    sections: [
      {
        heading: "Adun's family and the meaning of the covenant",
        paragraphs: [
          "Fruit Covenant is a fictional family-and-faith drama following Adun and her husband Adekunle as financial strain affects their home. Adun's decision to make a sacred promise leads to consequences that the film presents through supernatural and moral elements. The story uses faith to examine desperate choices, but its events should not be treated as real-world religious instructions.",
          "The independent eElive review places economic pressure on Adun's family at the centre of the setup. It identifies the couple's three daughters, Favour, Desire and Miracle, and the character Mrs Coker as important to the family's situation. This more specific context helps a viewer distinguish the movie from generic videos about covenants or religious rituals.",
          "Toyin Abraham TV's original June 2026 upload lists the actual performer-to-character credits in its description. Toyin Abraham plays Adun, Olarotimi Fakunle plays Adekunle, Jumoke George plays Mrs Coker, and the children are played by Miracle Ojorale, Abisola Salami and Hejiwumi Akewi. These mappings are explicitly credited, not deduced from actor fame."
        ]
      },
      {
        heading: "Production and correct viewing source",
        paragraphs: [
          "The original full feature was released on 12 June 2026 on Toyin Abraham TV. The publisher names Sola Oyedele and Toyin Abraham Ajeyemi as directors and credits Bose La'Bos Bamidele and Toyin Abraham as the writers. The film is listed at approximately 93 minutes by FilmFlux. Viewers should use the original publisher video rather than fan reuploads or unrelated sermons.",
          "A previous text called this definitely a Yoruba-language film while the catalogue's language field separately said English. The checked original upload description does not settle its dominant spoken language, so the definitive Yoruba-language claim has been dropped pending direct playback or an explicit publisher statement."
        ]
      }
    ],
    questions: [
      sourceQuestion("Who plays Adun and Adekunle in Fruit Covenant?", "The original Toyin Abraham TV credits list Toyin Abraham Ajeyemi as Adun and Olarotimi Fakunle as her husband Adekunle."),
      sourceQuestion("Who directed Fruit Covenant?", "Sola Oyedele and Toyin Abraham Ajeyemi are both credited as directors by the film publisher."),
      sourceQuestion("What language is Fruit Covenant?", "The checked film description does not clearly establish its main spoken language. The exact original playback and available captions should be checked instead of relying on contradictory catalogue wording.")
    ]
  },
  "sister-agatha": {
    ...existing["sister-agatha"],
    releaseDate: "2026-09-25",
    sections: [
      ...existing["sister-agatha"].sections,
      {
        heading: "Original full release and the practical way to identify it",
        paragraphs: [
          "FilmFlux identifies the specific 2026 comedy as a Blessing Obasi TV full-length upload on 25 September 2026, with an approximate 108-minute listing and principal billed performers including Blessing Obasi-Nze, Michael Ejoor and Kenzy Udosen. The original publisher description also bills Kiekie. Character assignments beyond the head-usher/newcomer conflict are not substantiated in the checked records.",
          "This film is about a fictional competition for one sponsored ticket to a crusade in London; it is not an announcement of a live church event, a visa service or proof that a real journey can be booked. Watch via the original Blessing Obasi TV link, which may change availability rather than using unofficial reposts."
        ]
      }
    ],
    questions: [
      ...existing["sister-agatha"].questions,
      sourceQuestion("When was Sister Agatha released?", "The original Blessing Obasi TV full-length film was released on 25 September 2026, according to the film-specific catalogue."),
      sourceQuestion("Does Sister Agatha advertise an actual London crusade?", "No. The sponsored London-crusade ticket is part of the fictional comedy story, not verified real-world event information.")
    ]
  },
};
