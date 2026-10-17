// The remaining curated Nollywood film dossiers, batch one.
// Factual names and official viewing routes derive from the corresponding
// catalog records; actor-to-character roles are included only when credited.
import type { MovieEditorialProfile } from "@/lib/movie-editorial-profiles";
type Entry = {
 story: [string,string]; context: [string,string];
 questions: [[string,string],[string,string]];
 roles?: [string,string][]; crew?: [string,string][];
 releaseDate?: string;
};
const records: Record<string,Entry> = {
  "in-every-lifetime": {
    "story": [
      "In Every Lifetime follows Nyla and Prince Nathaniel, whose romantic bond brings competing obligations into the open. Nathaniel must consider what his royal position demands, while Nyla faces the personal consequences of joining a relationship shaped by the expectations of others. The premise makes love inseparable from questions of public responsibility.",
      "The story does not present marriage as merely a private decision between two people. It follows how sacrifice and patience change the choices available to each of them, and asks whether strong feelings are sufficient when family or ceremonial duty points in another direction."
    ],
    "context": [
      "This 2025 Nigerian romance is directed by Jide Oyegbile, with Daniel Etim Effiong, Ego Nwosu and Shaznay Okawa in the published cast. The available film record establishes Nyla and Prince Nathaniel as characters, but not every actor-to-character pairing is documented, so the page deliberately avoids guessing their assignments.",
      "The complete film is linked through the official Ego Nwosu TV YouTube publisher record. Viewers looking for this specific royal drama should use the cast, release year and authorised upload rather than similarly titled music or short clips. The original source remains the place to check current playback and duration."
    ],
    "questions": [
      [
        "What is In Every Lifetime about?",
        "Nyla and Prince Nathaniel navigate romance, royal responsibility and decisions that demand personal sacrifice."
      ],
      [
        "Who directed In Every Lifetime?",
        "Jide Oyegbile directed the 2025 film, whose cast includes Daniel Etim Effiong and Ego Nwosu."
      ]
    ]
  },
  "beauty-in-scars-2026": {
    "story": [
      "Whitney works in Abuja's luxury property market and is rebuilding confidence after preventive breast surgery. A major real-estate deal creates professional opportunities, but her developing personal relationship brings fears about intimacy, disclosure and social stigma into the foreground. Her scars affect how she believes others will see her.",
      "Beauty in Scars asks whether a person can accept affection without first hiding a difficult history. Whitney's professional competence contrasts with the uncertainty she feels about vulnerability in her private life. The film is a fictional drama; descriptions of the surgery are elements of the story, not medical advice."
    ],
    "context": [
      "Ben Cassie directed the 2026 production. Naya Pratt, Emeka Ike, Ochanya John-Enenche, Tony Goodman and Elizabeth Popoola Julius appear in the credited cast. The film's identity rests on Whitney's Abuja setting and recovery narrative rather than a generic romance about appearances.",
      "An official Uchenna Mbunabo TV full-length video is listed for this release. The linked African Movies Database title is also a useful record for verifying the production and release year. The synopsis does not establish which performer plays Whitney, so actor-to-character roles should only appear when a reliable credit confirms them."
    ],
    "questions": [
      [
        "What is Beauty in Scars (2026) about?",
        "It follows Whitney, an Abuja property agent navigating trust and intimacy after preventive breast surgery."
      ],
      [
        "Where can Beauty in Scars be watched?",
        "The catalog links an official Uchenna Mbunabo TV upload; check the publisher for current availability."
      ]
    ]
  },
  "love-always-wins-2026": {
    "story": [
      "Love Always Wins begins when two young entrepreneurs lose control of the app they created. A larger company gains influence over the project, putting their ambitions and friendship under strain. A chance encounter introduces a personal relationship just when professional security has become uncertain.",
      "The film connects romance to the difficult decisions faced by people who build something together. The founders must determine whether preserving trust matters more than clinging to their original plans. The app dispute supplies the specific context; it is not a general software industry documentary or legal guide to startup ownership."
    ],
    "context": [
      "Ndifreke Mathew directed the 2026 romance, with Omeche Oko, Bryan Okoye and Jeffery Nortey in the recorded cast. The movie has an original full-length Royal Arts TV publisher link in MyNigeriaGuide; release descriptions should identify that authorised video before pointing viewers anywhere else.",
      "The film's currently stored independent reference is a broad African Movies Database genre listing rather than a title-specific credit page. That is not enough to assign character names or additional creative roles, so the guide uses only the supplied credited director, cast and storyline until a more precise production source becomes available."
    ],
    "questions": [
      [
        "What happens to the app founders in Love Always Wins?",
        "They lose control of their startup, forcing difficult decisions about ambition, friendship and romance."
      ],
      [
        "Who directed Love Always Wins?",
        "Ndifreke Mathew is credited as director of the 2026 movie."
      ]
    ]
  },
  "what-tomorrow-holds-2026": {
    "story": [
      "Gladys and Jude begin building their family through adoption after years of difficulties conceiving. The later arrival of a biological child changes the household's relationships in ways they did not anticipate. Jealousy and outside influence create tensions between family members who had hoped for a secure home.",
      "The drama examines whether belonging can survive comparisons between adopted and biological children. Its emotional conflict arises when the adults' decisions affect children who did not choose the circumstances of their upbringing. The film ultimately deals with responsibility, consequences and the possibility of repairing damaged relationships."
    ],
    "context": [
      "Olowajaiye Michael directed What Tomorrow Holds, a 2026 film with Chioma Nwosu, Sandra Okunzuwa, Adeoluwa Okusaga, Kalu Ikeagwu and Fiyinfoluwa Asenuga among the documented cast. Individual actor-to-character roles beyond the story names are not assumed without a credit.",
      "The catalog links an authorised Uchenna Mbunabo TV full-length YouTube release and an African Movies Database title record. The guide discusses the fictional family's choices, not the legal procedures or medical causes of infertility and adoption. Readers seeking real-world guidance should consult qualified sources rather than the film."
    ],
    "questions": [
      [
        "Who are Gladys and Jude in What Tomorrow Holds?",
        "They are a couple who adopt a child and later have a biological child, creating unexpected family tensions."
      ],
      [
        "What is the main theme of What Tomorrow Holds?",
        "The family drama explores acceptance, jealousy and responsibilities toward adopted and biological children."
      ]
    ]
  },
  "no-fury-2024": {
    "story": [
      "No Fury follows a couple whose marriage has been widely admired before evidence of betrayal changes how they view one another. Once trust is broken, revenge and disputes within the wider family become difficult to avoid. The film examines how attempts to punish a partner can lead to new consequences.",
      "The premise contrasts the appearance of a successful relationship with the fragile decisions that sustain it. Rather than claiming that a specific real couple inspired the film, the story focuses on fictional characters caught between anger, reconciliation and the pressure of relatives."
    ],
    "context": [
      "Akay Mason directed the 2024 film. Nse Ikpe-Etim, Jim Iyke, Lilian Esoro, Tina Mba, Jide Awobona and Nosa Rex are listed in its cast record. The IMDb film page supplies a reference for the title and credited performers.",
      "Unlike some other films in the catalog, No Fury does not have a verified current official viewing link. This page must not invent a Netflix listing or free YouTube release. It can still document the movie and its filmmakers while explaining clearly that legal playback has not yet been established."
    ],
    "questions": [
      [
        "Who directed No Fury (2024)?",
        "Akay Mason is credited as director, with Nse Ikpe-Etim and Jim Iyke among the performers."
      ],
      [
        "Where can No Fury be watched legally?",
        "A current authorised full-length viewing option has not been verified in this catalog."
      ]
    ]
  },
  "pieces-that-fit": {
    "story": [
      "Pieces That Fit centres on a woman who leaves an abusive marriage and then loses her remaining possessions in a fire. Arriving in Lagos with few resources, she receives help from a neighbour whose guarded manner suggests that he also has reasons to avoid emotional closeness.",
      "An opportunity to work with an architect who is coping with grief brings different kinds of loss into the same story. The film explores whether trust can develop without asking either person to deny what happened before. Its portrayal of abuse and trauma is fictional and should not be treated as professional counselling guidance."
    ],
    "context": [
      "The 2026 release lists Micheal Dappa, Ekama Etim-Inyang, Ehis Perfect and Floyd Igbo among the main performers. Their character assignments are not reliably documented in the existing movie record, so the guide separates identifiable actors from plot characters.",
      "The film is linked to an authorised full-length YouTube publisher source. Viewers should choose that link over unauthorised reposts, and cast researchers should avoid reusing roles from other romance films starring the same actors. The Lagos setting and grief-and-recovery storyline identify this particular feature."
    ],
    "questions": [
      [
        "What happens before the heroine arrives in Lagos?",
        "She escapes an abusive marriage and loses her possessions in a fire before trying to start again."
      ],
      [
        "Is Pieces That Fit a 2026 Nigerian movie?",
        "Yes, with Micheal Dappa and Ekama Etim-Inyang in the documented cast."
      ]
    ]
  },
  "love-in-every-word": {
    "story": [
      "Love in Every Word follows a wealthy man, Obiora, whose immediate attraction to Chioma creates a romance shaped by differences in outlook and expectation. Obiora's pursuit puts the couple's intentions under pressure as they consider whether a relationship can survive contrasting priorities.",
      "The film's romance is distinctive because its characters' dialogue and cultural identity matter as much as their circumstances. Its popularity also produced a separately titled follow-up, Love in Every Word: The Wedding. The original is not the sequel, and details from the wedding story should not be transferred into this film's synopsis."
    ],
    "context": [
      "Stanley Obi directed the original 2025 movie, with Inyang Mfon-Abasi Michael and Daniel Uzodinma credited as writers. IMDb lists Uzor Arukwe as Obiora and Bamike Olawunmi as Chioma, with Thelma Chukwunwem, Osereme Inegbenebor, Amanda Iriekpen and Tinuade Jemiseye among the supporting cast.",
      "The official original film is on Omoni Oboli TV's YouTube channel. IMDb records 7 March 2025 as its Nigerian release date and approximately 116 minutes as its runtime. The separate sequel has a different title and credits, so both should have distinct canonical pages if the sequel is eventually added."
    ],
    "questions": [
      [
        "Who plays Obiora and Chioma in Love in Every Word?",
        "Uzor Arukwe plays Obiora, and Bamike Olawunmi (BamBam) plays Chioma."
      ],
      [
        "Who directed Love in Every Word (2025)?",
        "Stanley Obi directed the original 2025 film; Love in Every Word: The Wedding is a separate follow-up."
      ]
    ],
    "roles": [
      [
        "Uzor Arukwe",
        "Obiora"
      ],
      [
        "Bamike Olawunmi",
        "Chioma"
      ],
      [
        "Thelma Chukwunwem",
        "Mummy"
      ],
      [
        "Osereme Inegbenebor",
        "Ify"
      ]
    ],
    "crew": [
      [
        "Director",
        "Stanley Obi"
      ],
      [
        "Screenwriter",
        "Inyang Mfon-Abasi Michael"
      ],
      [
        "Screenwriter",
        "Daniel Uzodinma"
      ]
    ],
    "releaseDate": "2025-03-07"
  },
  "after-a-night-in-july": {
    "story": [
      "After a Night in July begins with a pregnancy that leads two people into marriage faster than either had planned. Their new household must handle sleepless nights, costs and work demands while the couple still has unresolved disagreements about the relationship itself.",
      "Rather than presenting a wedding as the final achievement of a romance, the movie starts with what happens afterwards. Old wounds and a loss of trust complicate daily decisions, turning small frustrations into arguments about whether they truly understand one another."
    ],
    "context": [
      "The 2025 Nigerian film lists Uche Montana, Eso Dike, Perpetual Ukadike and Eyiyemi Olivia Rogbinyin as performers. The original publisher's full-length YouTube upload is the recorded viewing route, not an unrelated short clip using July in its title.",
      "The release information establishes the marriage-and-parenthood storyline but does not provide dependable individual character credits. This page therefore identifies the known performers without assigning unverified spouse names or inventing a precise wedding date inside the plot."
    ],
    "questions": [
      [
        "Why do the couple marry in After a Night in July?",
        "An unexpected pregnancy accelerates their decision, but work, finances and unresolved issues later strain the marriage."
      ],
      [
        "Who stars in After a Night in July?",
        "The cast includes Uche Montana, Eso Dike and Perpetual Ukadike."
      ]
    ]
  },
  "the-long-way-home": {
    "story": [
      "The Long Way Home is the July 2026 Uche Montana TV drama in which family secrets, an unexpected pregnancy and betrayal put existing relationships under pressure. Despite the title, the film's documented premise is about the breakdown of trust within a family, not a verified travel itinerary or an account of someone returning to a particular Nigerian city.",
      "The tension is the gap between what relatives believe about one another and what concealed information forces them to reconsider. That distinguishes this production from unrelated films and songs called The Long Way Home. The film's listed synopsis does not identify every character behind those events or establish how the relationships end, so neither a final reconciliation nor a specific character's pregnancy is asserted here."
    ],
    "context": [
      "Nollywood.com's exact-film record lists Uche Montana, Maurice Sam and Nadia Buari, attributes co-direction to Reuben Reng and Uche Montana, and dates the original YouTube release to 4 July 2026. Those are production and distribution credits, not proof of particular unlisted character names or today's playback rights.",
      "The title is shared by unrelated English-language films, songs and television episodes. Pairing the Nigerian year and billed cast with the source video is important for search accuracy. No unverified plot resolution or relationship status is asserted here."
    ],
    "questions": [
      [
        "Who appears in The Long Way Home (2026)?",
        "The documented Nigerian movie features Uche Montana, Maurice Sam and Nadia Buari."
      ],
      [
        "What is the theme of The Long Way Home?",
        "Its published premise involves family secrets, betrayal and an unexpected pregnancy straining important relationships. The outcome has not been independently established in this guide."
      ]
    ]
  },
  "monica-2": {
    "story": [
      "Monica 2 continues the story of a firstborn daughter who has carried much of her family's financial and emotional responsibilities. After years of sacrificing education and opportunities to support her relatives, Monica attempts to reclaim independence through her tailoring business and additional fashion training. Her plans are tested when renewed family demands threaten to push her back into the same role that exhausted her in the first film.",
      "The conflict is not primarily a conventional romance. A developing relationship is part of Monica's recovery, but the more distinctive theme is how family obligation can become an expectation of endless self-denial. The sequel asks whether she can care about her relatives without surrendering the future she is trying to build. This description avoids disclosing the film's final decision."
    ],
    "context": [
      "Uche Montana portrays Monica, and Blessing Onwukwe plays her mother; Joseph Momodu also features. Premium Times' 6 May 2026 review discusses the sequel's focus on firstborn sacrifice, vocational training and renewed family pressure, while the film-specific African Movies Database lists Chidi Chijioke as director. These are separate types of evidence: the news review supports the thematic summary, and the production database supplies the director credit.",
      "The sequel premiered on Uche Montana TV on 2 May 2026, following the first Monica film in March. They are separate full-length releases and should keep separate cast, plot and watch links. Viewer counts reported immediately after launch are historical milestones, not guaranteed current totals. The official video remains the appropriate place to check playback."
    ],
    "questions": [
      [
        "What is Monica 2 about beyond the romance?",
        "Monica tries to rebuild her fashion career and protect her independence after years of sacrifices for relatives whose demands continue."
      ],
      [
        "Who directed Monica 2, and when did it premiere?",
        "African Movies Database credits Chidi Chijioke as director. The sequel premiered on Uche Montana TV on 2 May 2026."
      ]
    ]
  },
  "the-merger": {
    "roles": [["Uche Montana", "Natalie"], ["Timini Egbuson", "Theo"]],
    "crew": [["Director (FilmFlux and Zikoko)", "Best Okoduwa"]],
    "story": [
      "The Merger places Theo, played by Timini Egbuson, and Natalie, played by Uche Montana, on the teams negotiating a merger between their employers. Their professional duties require them to evaluate a transaction whose terms matter to both businesses. When attraction develops during the negotiations, the relationship introduces a separate question: can either lead defend their employer's interests without allowing private feelings to change the balance of power?",
      "The corporate deal is not just a metaphor for romance; September reporting from Zikoko and a film-specific independent review describe the merger negotiation as the setting of the conflict. This makes the film useful to distinguish from stories merely about two people forming a couple. The unresolved question is how professional trust and personal attachment can coexist when the two negotiators are accountable to different organisations. A general uploader's description alone does not establish every scene or the final terms of the deal."
    ],
    "context": [
      "Uche Montana TV published The Merger on 5 September 2026, starring Uche Montana as Natalie and Timini Egbuson as Theo. The official full-film link identifies this production; it should not be confused with corporate news articles or an unrelated title. The recorded runtime is approximately 94 minutes, not a promise that every later video edit is identical.",
      "Zikoko's September film listing, FilmFlux's film-specific crew record and contemporary release coverage credit Best Okoduwa as director. The independent review identifies the same Theo and Natalie pairing. These are attributed film-specific details rather than role names guessed from Uche Montana and Timini Egbuson's other collaborations."
    ],
    "questions": [
      [
        "Who are the leads in The Merger?",
        "Uche Montana and Timini Egbuson star in the 2026 Nigerian romance."
      ],
      [
        "Is The Merger about a company acquisition?",
        "Yes. Theo and Natalie work on opposite sides of an actual company-merger negotiation, and their developing romance complicates their professional responsibilities. Film-specific September coverage confirms that premise."
      ]
    ]
  },
  "never-let-go": {
    "story": [
      "Never Let Go follows Adebanjo Williams, a former police inspector who has spent years in prison for crimes he says he did not commit. After his release, he moves into a new neighbourhood under another identity and gets close to Nene, a singer mourning a previous relationship. Their growing connection is complicated by his effort to expose the officials and powerful people behind his conviction.",
      "The story combines romantic attachment with an investigation and a question of personal accountability. Nene's family has links to the case that destroyed Adebanjo's career, so the relationship cannot be separated from his search for evidence. The central tension is whether a man pursuing vindication can build an honest relationship while concealing his name and motives. The page does not reveal the investigation's resolution."
    ],
    "context": [
      "This 2026 Nigerian drama stars Maurice Sam and Nadia Buari. African Movies Database identifies their characters as Victor, the identity used by the former inspector, and Nene, and credits Omoruyi Efosa Emmanuel as director. The source also identifies Maurice Sam as producer. These credits are specific to the 25 August 2026 Nigerian YouTube release, not the unrelated 2024 Halle Berry thriller with the same title.",
      "The full-length movie is linked through the original Maurice Sam TV YouTube publication. The source-backed synopsis involves false imprisonment, corruption and revenge; describing it only as a light romance misses the actual premise. Because online availability and publisher controls can change, the link should be checked on the original platform rather than treated as permanent offline access."
    ],
    "questions": [
      [
        "Is Never Let Go (2026) a romance or a thriller?",
        "It is a Nigerian drama combining a developing relationship with a former inspector's attempt to challenge a wrongful conviction and uncover corruption."
      ],
      [
        "Who directed Never Let Go starring Maurice Sam and Nadia Buari?",
        "The 2026 film-specific African Movies Database record credits Omoruyi Efosa Emmanuel as director."
      ]
    ]
  },
  "just-before-forever": {
    "crew": [["Director (FilmFlux attribution)", "Omoruyi Efosa Emmanuel"]],
    "story": [
      "Just Before Forever is the 11 August 2026 Maurice Sam TV romantic drama with Maurice Sam, Pamela Okoye and Uche Montana. The publisher's short description concerns love and difficult choices, but does not establish which characters form a triangle or whose actions cause a particular breakup. Those details should not be invented to make an otherwise brief synopsis sound more dramatic.",
      "The useful distinction for viewers is its actual film identity: the original channel, August 2026 date, approximately 112-minute running time and credited actors distinguish it from many unrelated 'forever' romance titles. FilmFlux provides production metadata and the identified publisher hosts the original upload; neither source alone verifies a scene-by-scene plot or an ending, so this guide confines its story account to the supported premise."
    ],
    "context": [
      "Maurice Sam, Uche Montana and Pamela Okoye lead the recorded cast of the 2026 film. Its authorised full-length YouTube publisher link identifies the correct production, rather than a similarly named marriage-advice video or unrelated romantic drama.",
      "FilmFlux's exact 11 August 2026 Maurice Sam TV record attributes direction to Omoruyi Efosa Emmanuel and identifies Maurice Sam, Pamela Okoye and Uche Montana among the cast. It separately lists Maurice Sam as executive producer; producer and director credits should not be interchanged. Individual character assignments and a definite final pairing have not been corroborated here."
    ],
    "questions": [
      [
        "Who appears in Just Before Forever?",
        "The recorded cast includes Maurice Sam, Uche Montana and Pamela Okoye."
      ],
      [
        "What is the story about?",
        "Three people navigate romantic choices and loyalties that threaten their ideas about a lasting relationship."
      ]
    ]
  },
  "a-turn-of-events": {
    "story": [
      "A Turn of Events begins when changes neither partner anticipated disrupt a relationship's familiar routine. Choices made under pressure raise questions about trust and whether the two people still imagine the same future.",
      "The premise depends on the uncertainty created by major life changes rather than an established crime or historical incident. Its emotional drama comes from how people react when the commitments they thought were settled are suddenly tested."
    ],
    "context": [
      "Maurice Sam and Sarian Martin are named as the leading actors in this 2026 Nigerian romance. The original full-length publisher release is linked through YouTube; that link is the proper source for confirming the exact film and current availability.",
      "The title is generic enough to overlap with books, short films and television episodes. This guide uses the country, year and billed performers to distinguish it, while leaving director and unverified character names unstated."
    ],
    "questions": [
      [
        "Who stars in A Turn of Events (2026)?",
        "Maurice Sam and Sarian Martin are the documented leads."
      ],
      [
        "What kind of film is A Turn of Events?",
        "It is a Nigerian romantic drama about changes that test trust and commitment."
      ]
    ]
  },
  "bowale": {
    "story": [
      "Bowale follows a man who is released after spending thirty years in prison for a crime he did not commit. A successful businesswoman offers him work as her driver, giving him a chance to re-enter ordinary life after decades of lost time.",
      "The unlikely connection between employer and driver becomes the foundation for a story about judgment and second chances. Past events continue to affect how the characters see one another, and the film considers how difficult rebuilding may be when society has moved on without someone."
    ],
    "context": [
      "Biodun Stephen wrote, produced and directed the 2026 drama, which stars Bamike 'BamBam' Olawunmi-Adenibuyan, Bobby Ekpe and Jude Chukwuka. The official BIODUNSTEPHENTV upload was published on 16 September 2026; the source describes the wrongful imprisonment and driving job.",
      "Nigerian entertainment reporting discussed the film's strong initial YouTube audience, but view counts are time-sensitive and should not be frozen into evergreen article copy. The original video is the authoritative legal viewing destination and can provide current numbers."
    ],
    "questions": [
      [
        "Who directed Bowale (2026)?",
        "Biodun Stephen directed and produced the film about a man wrongfully imprisoned for thirty years."
      ],
      [
        "Where can I watch Bowale in full?",
        "The authorised full-length film is published by BIODUNSTEPHENTV on YouTube."
      ]
    ],
    "crew": [
      [
        "Director, writer and producer",
        "Biodun Stephen"
      ]
    ],
    "releaseDate": "2026-09-16"
  }
};
export const movieEditorialProfilesRemainingA: Record<string,MovieEditorialProfile> = Object.fromEntries(
  Object.entries(records).map(([slug, x]) => [slug, {
    roles: (x.roles ?? []).map(([actor,character])=>({actor,character})),
    crew: (x.crew ?? []).map(([role,name])=>({role,name})),
    releaseDate: x.releaseDate,
    sections: [
      { heading: "Story, characters and central conflict", paragraphs: x.story },
      { heading: "Cast, production and official viewing", paragraphs: x.context }
    ],
    questions: x.questions.map(([question,answer])=>({question,answer})),
  }]),
);