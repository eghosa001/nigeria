// Film-specific guides for the remaining curated catalog, batch two.
import type { MovieEditorialProfile } from "@/lib/movie-editorial-profiles";
type Entry = {
 story: [string,string]; context: [string,string];
 questions: [[string,string],[string,string]];
 roles?: [string,string][]; crew?: [string,string][];
 releaseDate?: string;
};
const records: Record<string,Entry> = {
  "love-and-legacy-2026": {
    "story": [
      "Love and Legacy begins after the death of the Obasi family patriarch. Obinna takes charge of the family business, even though his older sister Chinwe has spent years helping to manage it. The decision sharpens a longstanding dispute about competence and entitlement. Obinna then borrows heavily against company shares to fund a new venture, increasing the stakes of the siblings' disagreement when the expansion struggles.",
      "Alongside that corporate conflict, Obinna's relationship with Ene introduces tensions about class and family acceptance. Chinwe's doubts about her brother's choices extend beyond his partner to his management of the business. What makes the film more than a routine romance is the way one set of decisions threatens family wealth, personal loyalty and the possibility of reconciliation. The synopsis does not disclose how the business crisis is resolved."
    ],
    "context": [
      "The 2026 Uche Jombo TV film lists Uche Jombo, Omeche Oko and Victory Michael among its cast. African Movies Database credits Uche Jombo as Chinwe, Victory Michael as Obinna, and Esther Akapo as director. Its production record also names Uche Jombo as producer and story contributor. These are attributed film-specific credits, not guessed from actor publicity images.",
      "The original YouTube publisher remains the starting point for the full film, and the independent production record establishes the story's family-company conflict. This title should not be confused with wedding-film businesses or unrelated productions called Love and Legacy. The indexed guide should explain both the succession dispute and the romance rather than presenting the film solely as a battle for Chinwe's approval."
    ],
    "questions": [
      [
        "What is the central conflict in Love and Legacy (2026)?",
        "After Obinna inherits leadership of the Obasi family company, his sister Chinwe questions his decisions as an ambitious financed venture puts the business at risk."
      ],
      [
        "Who directed Love and Legacy starring Uche Jombo?",
        "African Movies Database credits Esther Akapo as the director of this 2026 Uche Jombo TV drama."
      ]
    ]
  },
  "where-love-lives": {
    "story": [
      "Where Love Lives follows Demilade and Ekene as they face personal expectations and choices about a lasting relationship. Their romance becomes more complicated when the lives of people around them intersect with their own plans. The movie blends moments of humour with difficult conversations about trust and commitment.",
      "The story is structured around whether two people can sustain affection while responding to other relationships, changing priorities and family expectations. It is a fictional romantic comedy, not a report of the real-life relationships of the actors featured in its promotional video."
    ],
    "context": [
      "Bimbo Ademoye plays Demilade, while Uzor Arukwe plays Ekene. The film also credits Osas Ighodaro as Imade and features Chioma Nwosu. IMDb names Great Valentine Edochie as director, with a story credit for Bimbo Ademoye and screenplay credit for Ukeme Ninedeys.",
      "The authorised film was published through Bimbo Ademoye TV in December 2025. Film credits should be checked against the official video and the title-specific IMDb record; 'Where Love Lives' is also a phrase used by unrelated media and is not sufficient for identification on its own."
    ],
    "questions": [
      [
        "Who plays Demilade and Ekene in Where Love Lives?",
        "Bimbo Ademoye plays Demilade and Uzor Arukwe plays Ekene in the 2025 romantic comedy."
      ],
      [
        "Who directed Where Love Lives?",
        "Great Valentine Edochie is credited as director."
      ]
    ],
    "roles": [
      [
        "Bimbo Ademoye",
        "Demilade"
      ],
      [
        "Uzor Arukwe",
        "Ekene"
      ],
      [
        "Osas Ighodaro",
        "Imade"
      ]
    ],
    "crew": [
      [
        "Director",
        "Great Valentine Edochie"
      ],
      [
        "Story",
        "Bimbo Ademoye"
      ],
      [
        "Screenwriter",
        "Ukeme Ninedeys"
      ]
    ]
  },
  "monica": {
    "story": [
      "Monica tells a contemporary romantic story involving a woman whose feelings and decisions grow more difficult as her relationship develops. The movie focuses on personal choices and the emotional effects of miscommunication rather than using a historical or supernatural premise.",
      "Because the story continues in Monica 2, viewing the first film supplies the necessary context for the later family and relationship complications. This entry covers the original instalment only and does not assume events described for the sequel take place here."
    ],
    "context": [
      "The 2026 original lists Uche Montana and John Ekanem in its principal cast. The authorised first-film YouTube upload is a separate source from the video labelled Monica 2, so they should remain distinct pages with separate links and credits.",
      "The public catalog supplies only a brief synopsis and a small billed cast. There is not enough title-specific evidence to claim a director, full credited cast or exact actor-to-character assignments. The movie can still be described accurately without inventing those details."
    ],
    "questions": [
      [
        "Is Monica connected to Monica 2?",
        "Yes. Monica is the first film; Monica 2 continues the story and has a separate viewing link."
      ],
      [
        "Who appears in Monica (2026)?",
        "Uche Montana and John Ekanem are the documented lead actors."
      ]
    ]
  },
  "fruit-covenant": {
    "story": [
      "Fruit Covenant follows Adun after she makes a sacred promise that creates consequences for both her ordinary life and her spiritual understanding of what she has undertaken. The story follows how a choice made in faith can become difficult when duties and expectations begin to conflict.",
      "The film's drama comes from the gap between intending to make a promise and confronting its practical implications. The supernatural and faith-based elements belong to a fictional narrative, and the plot should not be described as instructions for religious practice or an established historical event."
    ],
    "context": [
      "Sola Oyedele and Toyin Abraham Ajeyemi are credited as directors. The 2026 Yoruba-language drama lists Toyin Abraham Ajeyemi, Olarotimi Fakunle, Jumoke George, Hejiwumi Akewi and Miracle Ojorale among the performers.",
      "The official full-film publisher link on YouTube is the recorded viewing destination. The story's named character Adun should not automatically be assigned to the best-known actor without a reliable credit. The film's year, creative team and title help separate it from religious commentary clips."
    ],
    "questions": [
      [
        "Who directed Fruit Covenant (2026)?",
        "Sola Oyedele and Toyin Abraham Ajeyemi are the listed co-directors."
      ],
      [
        "What is Fruit Covenant about?",
        "Adun faces the earthly and spiritual consequences of a sacred promise."
      ]
    ]
  },
  "man-of-the-year-2026": {
    "story": [
      "Man of the Year centres on a fighter who learns that victory in the ring does not settle every difficult question outside it. As personal relationships and pride complicate his life, he has to decide what strength should mean when the challenge cannot be solved through physical competition.",
      "The movie contrasts the public status earned through fighting with the less visible decisions required for love and responsibility. This distinguishes it from a factual sporting documentary or a professional boxing event broadcast."
    ],
    "context": [
      "Maurice Sam and Sarian Martin appear in the 2026 film's documented lead cast. The source record links an authorised full-length YouTube release, allowing viewers to distinguish the scripted drama from awards-show or sports footage using the same title.",
      "No reliably confirmed individual roles, athletic biography or director are provided in the current credits. Those facts should remain unassigned until the original publisher or another credible film-credit source establishes them."
    ],
    "questions": [
      [
        "Is Man of the Year a boxing documentary?",
        "No. The 2026 Nigerian film is a fictional drama about a fighter facing challenges outside the ring."
      ],
      [
        "Who are the leads in Man of the Year?",
        "Maurice Sam and Sarian Martin are the named stars."
      ]
    ]
  },
  "a-place-with-you": {
    "story": [
      "A Place With You is a romance about two people whose lives have been affected by painful experiences before they meet. Their connection develops as each has to decide whether it is safe to trust another person after disappointment.",
      "The story centres on healing and choice rather than the idea that affection alone can instantly repair past harm. The characters must consider whether they are ready to build something shared while preserving their own needs and emotional boundaries."
    ],
    "context": [
      "Uche Montana and Chidi Dike are the billed leads of this 2026 Nigerian film. The existing catalog links a publisher-authorised full-length YouTube movie so that readers can find the correct release rather than generic videos about relationships.",
      "The public synopsis provides the themes but not individual character names or the complete filmmaking team. The guide therefore avoids assigning fictional roles from the actors' other romantic dramas to this production."
    ],
    "questions": [
      [
        "Who stars in A Place With You?",
        "Uche Montana and Chidi Dike are the listed lead performers."
      ],
      [
        "What is the story of A Place With You?",
        "It concerns healing from earlier hurt and deciding whether a new relationship is possible."
      ]
    ]
  },
  "sister-agatha": {
    "story": [
      "Sister Agatha follows a church where only one sponsored ticket is available for a London crusade. A strict head usher expects the opportunity to reflect her service and authority, while a younger newcomer challenges that assumption, creating an escalating comic rivalry.",
      "The dispute places generational attitudes and ideas about deserving a reward inside a familiar local church setting. Small disagreements during worship and organisation become part of the contest, and the film uses humour to ask whether spiritual service can be reduced to a competition for recognition."
    ],
    "context": [
      "The cast includes Blessing Obasi and Kiekie, alongside Michael Ejoor and Kenzy Udosen. The authorised full-length movie appears through its YouTube publisher's channel and is catalogued as a 2026 Nigerian comedy.",
      "The title might be mistaken for a real religious figure or a church event announcement. This is a fictional comic story about characters competing over travel, not a verification of a London crusade booking or the existence of a named nun."
    ],
    "questions": [
      [
        "What are the characters competing for in Sister Agatha?",
        "One sponsored ticket to a London crusade triggers the rivalry between a head usher and a newcomer."
      ],
      [
        "Who appears in Sister Agatha?",
        "Blessing Obasi and Kiekie are among the leading billed performers."
      ]
    ]
  },
  "forever-found": {
    "story": [
      "Forever Found examines the balance between wanting a lasting relationship and preserving an independent sense of identity. A romance brings difficult choices about patience, sacrifice and whether two people are genuinely supporting each other.",
      "The film approaches love as a decision that may require compromise without making self-erasure its ideal. Its conflict is emotional rather than a thriller mystery, and the available synopsis does not support declaring the exact ending or assigning hidden motives to named characters."
    ],
    "context": [
      "Chinenye Nnebe and John Ekanem feature alongside Chioma Nwosu and Amaka Ndukwe in the recorded 2026 cast. The catalog lists an authorised full-length YouTube source that identifies the original production.",
      "The title is a common phrase used in music and religious material. The country, year, cast and official movie publisher are important for telling this romance apart from unrelated clips. Character names and director have not been independently established in the stored record."
    ],
    "questions": [
      [
        "Who stars in Forever Found (2026)?",
        "Chinenye Nnebe and John Ekanem lead the documented cast."
      ],
      [
        "What does Forever Found explore?",
        "The romance examines patience, self-worth and the sacrifices involved in maintaining a relationship."
      ]
    ]
  },
  "all-things-equal": {
    "story": [
      "All Things Equal follows two independent people attempting to build a relationship without losing the careers and commitments that matter to them. Their differing priorities turn decisions about time, sacrifice and support into a source of tension.",
      "The movie asks whether equality within a partnership means identical choices or a fair recognition of each person's needs. Its conflict is built around an emotional relationship, not a legal or economic theory despite the broad meaning of its title."
    ],
    "context": [
      "Sarian Martin and Daniel Etim Effiong star in this 2026 Nigerian romance. The full-length authorised movie is linked through the original YouTube publisher record; viewers should identify the film by these performers and its release year.",
      "The existing source does not establish a complete supporting cast, director or actor-to-character roles. Rather than inventing them, the guide concentrates on the documented two-person premise and available viewing information."
    ],
    "questions": [
      [
        "Who are the stars of All Things Equal?",
        "Sarian Martin and Daniel Etim Effiong are the documented lead performers."
      ],
      [
        "What is All Things Equal about?",
        "It follows two partners balancing romance, independent ambitions and decisions about sacrifice."
      ]
    ]
  },
  "my-housemate": {
    "story": [
      "My Housemate brings together a musician whose career is not going as planned and an unemployed professional who needs somewhere to live. Sharing an apartment begins as a practical arrangement, but their very different habits turn everyday life into conflict.",
      "As arguments give way to friendship and attraction, relationships from the past reappear to complicate the roommates' new understanding of one another. The story examines whether the stability of an accidental household can support a genuine romance once outside choices return."
    ],
    "context": [
      "Bolaji Ogunmola and Nosa Rex lead this 2026 Nigerian romantic comedy. A full-length original YouTube release is documented, and its publisher link should be preferred over unrelated housing sketches or short clips with similar titles.",
      "The available credits do not securely map the musician and unemployed professional to the two actors, so this page avoids claiming an unsupported casting assignment. Its specific cohabitation story and billed pair still make the release identifiable for search visitors."
    ],
    "questions": [
      [
        "What brings the characters together in My Housemate?",
        "A struggling musician and an unemployed professional are forced to share an apartment."
      ],
      [
        "Who stars in My Housemate (2026)?",
        "Bolaji Ogunmola and Nosa Rex are the listed lead actors."
      ]
    ]
  },
  "the-man-i-never-knew": {
    "story": [
      "The Man I Never Knew follows Mila after a romantic encounter at a resort ends with the other person leaving her. She discovers she is pregnant and must build a life for herself without his support. Years later the man returns, but his response to her is not the reunion she imagined.",
      "His insistence that he does not recognise her raises questions about memory, responsibility and whether the past can be repaired. Mila's experience of parenting alone gives the new encounter its weight; the story does not rely only on the surprise of seeing an old partner again."
    ],
    "context": [
      "TooSweet Annan, Chisom Agoawuike and Mojoyin Fadaka appear in the documented cast of the 2026 Nigerian movie. The existing film entry links to an authorised full-length YouTube publisher video.",
      "The public plot identifies Mila but does not provide a dependable character-role mapping for every actor. The film should not be confused with other romances about lost memories, abandoned pregnancies or reunions; its resort story and year distinguish it."
    ],
    "questions": [
      [
        "Who is Mila in The Man I Never Knew?",
        "Mila is a woman who raises a child after a resort romance ends, before the man unexpectedly returns."
      ],
      [
        "Who appears in The Man I Never Knew?",
        "The cast includes TooSweet Annan, Chisom Agoawuike and Mojoyin Fadaka."
      ]
    ]
  },
  "oil-and-water-2025": {
    "story": [
      "Oil and Water follows a mother and daughter whose relationship is already difficult before they discover that their romantic lives are connected to the same man. The revelation intensifies mistrust and makes it harder for either woman to separate personal feelings from family loyalty.",
      "The story explores why close relatives may struggle to understand one another even before a crisis. Its central complication is not just romantic rivalry: it forces both characters to reconsider what honesty and support should look like between generations."
    ],
    "context": [
      "Bimbo Ademoye, Bobby Ekpe and Constance Owoyomi are listed with Biodun Stephen and Biola Kareem in the film's 2025 credited cast. The existing source record points to Biodun Stephen's production company and an official full-length YouTube upload.",
      "Because the plot is unusually specific, a synopsis should distinguish this Nigerian movie from generic relationship discussions that use the phrase oil and water. Verified actor-to-character assignments have not been supplied, so the mother and daughter are not assigned cast names here."
    ],
    "questions": [
      [
        "What is the conflict in Oil and Water (2025)?",
        "A mother and daughter discover their romantic lives have become entangled with the same man."
      ],
      [
        "Who is in Oil and Water?",
        "Bimbo Ademoye, Bobby Ekpe and Constance Owoyomi appear in the documented cast."
      ]
    ]
  },
  "journey-to-love-2026": {
    "story": [
      "Journey to Love follows Beauty after an unexpected meeting with Uche, a successful businessman. Their different circumstances bring questions of expectation and opportunity into the early stages of a developing relationship.",
      "The film's romantic tension concerns how two people understand each other beyond an initial impression. Beauty's choices are important because the apparent difference in status between the partners can influence what each assumes the other needs."
    ],
    "context": [
      "Kingsley Fresh Onyenma directed this 2026 movie. Ray Adeka, Thelma Chukwunwem, Osereme Inegbenebor, Donna Ilomba, Tega Leonard and Chidimma Ugwu are included in the documented cast.",
      "An original full-length movie is available through the authorised YouTube publisher link. Beauty and Uche are established names in the story, but their actor-to-character assignments should only be displayed after checking a source that explicitly credits those roles."
    ],
    "questions": [
      [
        "Who are Beauty and Uche in Journey to Love?",
        "They are the two people whose chance meeting begins a romance across differing circumstances."
      ],
      [
        "Who directed Journey to Love (2026)?",
        "Kingsley Fresh Onyenma is the credited director."
      ]
    ]
  },
  "married-for-the-weekend": {
    "story": [
      "Married for the Weekend follows a couple who have spent six months apart and are planning to end their marriage. When Tomi's ailing father unexpectedly visits, they agree to present themselves as a happy couple for a single weekend to avoid upsetting him.",
      "Their staged reconciliation forces them into shared routines and conversations they had been avoiding. Past feelings begin to return, making the decision about divorce less straightforward. The story examines how a performance can reveal whether a relationship has truly ended or whether its problems have simply gone unspoken."
    ],
    "context": [
      "Mo' Fakorede directed this 2026 Nigerian romance. Published film credits list Omoni Oboli as Tomi, Daniel Etim Effiong as Damilare and Akin Lewis as Segun, while Tomi Adeoye is credited as a doctor. Some synopsis listings spell the husband's name differently, so the actor-to-character table follows the credited-cast listing.",
      "The authorised full film was published on Omoni Oboli TV; a film database records 18 September 2026 as its streaming release and a runtime around 98 minutes. The movie is fictional and should not be read as guidance for a couple considering divorce or a seriously ill relative."
    ],
    "questions": [
      [
        "Who plays Tomi and her husband in Married for the Weekend?",
        "Omoni Oboli plays Tomi and Daniel Etim Effiong is credited as Damilare."
      ],
      [
        "Where can Married for the Weekend be watched?",
        "The original full-length film is linked through Omoni Oboli TV on YouTube."
      ]
    ],
    "roles": [
      [
        "Omoni Oboli",
        "Tomi"
      ],
      [
        "Daniel Etim-Effiong",
        "Damilare"
      ],
      [
        "Akin Lewis",
        "Segun"
      ],
      [
        "Tomi Adeoye",
        "Doctor"
      ]
    ],
    "crew": [
      [
        "Director",
        "Mo' Fakorede"
      ],
      [
        "Producer",
        "Mfon-Abasi Michael Inyang"
      ]
    ],
    "releaseDate": "2026-09-18"
  }
};
export const movieEditorialProfilesRemainingB: Record<string,MovieEditorialProfile> = Object.fromEntries(
  Object.entries(records).map(([slug, x]) => [slug, {
    roles: (x.roles ?? []).map(([actor,character])=>({actor,character})),
    crew: (x.crew ?? []).map(([role,name])=>({role,name})),
    releaseDate: x.releaseDate,
    sections: [
      { heading: "The story and characters", paragraphs: x.story },
      { heading: "Verified credits and viewing information", paragraphs: x.context },
    ],
    questions: x.questions.map(([question,answer])=>({question,answer})),
  }]),
);