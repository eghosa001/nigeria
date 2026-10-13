// Editorial dossiers for the remaining featured non-Netflix films.
// These are unique story-focused summaries grounded in the film catalog's
// original publisher, trailer, and credited source records.
import type { MovieEditorialProfile } from "@/lib/movie-editorial-profiles";
type FeaturedDraft = {
  plot: string[];
  context: string[];
  questions: [{ question: string; answer: string }, { question: string; answer: string }];
  crew?: { role: string; name: string }[];
};
const drafts: Record<string, FeaturedDraft> = {
  "epe-after-dark": {
    plot: ["An outing in Epe turns unsettling as the people involved discover that the night is not unfolding the way they expected. What initially feels ordinary becomes a test of judgment, trust and the ability to recognise danger when circumstances change quickly.","The film uses uncertainty about what may happen next to build tension around relationships rather than depending only on spectacle. The audience follows characters whose choices become harder after dark and whose confidence is challenged by the setting."],
    context: ["Epe After Dark is a 2026 Nigerian drama released through Maurice Sam TV. Maurice Sam, Pearl Wats and Bibi Sonye lead the cast; Atewe Raphael and Djizzy also appear in the documented credits.","The source record links the original publisher's full-length YouTube upload. A short promotional excerpt or repost should not be substituted for that authorised film. Specific role names are left unassigned where the published credits do not establish them."],
    questions: [{"question":"Where can Epe After Dark be watched?","answer":"The movie's authorised full-length upload is linked from Maurice Sam TV on YouTube."},{"question":"Who stars in Epe After Dark?","answer":"Maurice Sam, Pearl Wats and Bibi Sonye are among the documented cast members."}],
    crew: [],
  },

  "wire-transfer-2026": {
    plot: ["Wire Transfer is an announced Nigerian crime thriller about criminals organising a risky financial operation. The story's conflict concerns planning, loyalty and whether the people involved can survive the pressure once their scheme begins to unravel.","The premise uses money as the source of both opportunity and danger. It belongs to the crime-thriller genre, and the published advance description does not justify adding supposed plot twists or character deaths that have not been shown in officially released material."],
    context: ["Femi Odugemi is the credited director. The announced cast includes Hanks Anuku, Gideon Okeke, Deyemi Okanlawon, Mike Afolarin and Teddy A. The theatrical release was publicised for late October 2026, so cinema access should be checked against current exhibitor schedules.","At the 13 October 2026 editorial check, the public information describes a forthcoming cinema film, not an authorised free YouTube feature. Movie pages should preserve that difference and link only to genuine distributor or cinema information."],
    questions: [{"question":"Who directs Wire Transfer (2026)?","answer":"Femi Odugemi is credited as director."},{"question":"Is Wire Transfer already available as a free full movie?","answer":"No authorised free film source is documented in this guide; check official cinema and distributor information for the announced release."}],
    crew: [{"role":"Director","name":"Femi Odugemi"}],
  },

  "mko-documentary-2026": {
    plot: ["Ose Oyamendan's MKO documentary examines Moshood Kashimawo Olawale Abiola and the politics surrounding Nigeria's 12 June 1993 presidential election. It situates the annulled vote in the pro-democracy struggle that followed and asks how Abiola's experience is remembered.","The film is a documentary rather than a fictional political thriller. Its subjects are historical public figures, and the information on this page distinguishes people discussed in the film from an acting cast playing invented roles."],
    context: ["The director is Ose Oyamendan. Public release coverage describes the documentary's October 2026 cinema presentation and its attention to Nigeria's democratic transition, making contemporary viewing information distinct from historical background sources.","Readers researching June 12 should not treat a movie synopsis as sufficient for historical claims. Reputable election records and multiple histories remain necessary for understanding disputed events, while the film can be evaluated as an interpretation of that period."],
    questions: [{"question":"Is MKO (2026) a documentary?","answer":"Yes. It examines MKO Abiola, the annulled June 12, 1993 presidential election and its political aftermath."},{"question":"Who directed the MKO documentary?","answer":"Ose Oyamendan is the credited director."}],
    crew: [{"role":"Director","name":"Ose Oyamendan"}],
  },

  "a-lagos-love-story": {
    plot: ["An aspiring event planner in Lagos is hired into the professional orbit of a rising Afrobeats star. A demanding job creates a connection that grows increasingly personal, complicating the boundaries between career ambition and romantic feeling.","The film draws on Lagos's live-entertainment and event culture. Its central question is what happens when a professional opportunity that could transform someone's prospects also begins to influence her private decisions."],
    context: ["A Lagos Love Story is a 2025 Nigerian romance directed by Chinaza Onuzo. Jemima Osunde, Mike Afolarin and Susan Pwajok appear in the film's documented principal cast.","The official Prime Video title page is the legal streaming reference. It should not be confused with unofficial music videos, event highlights or films using Lagos and love in their titles. Viewer access must be confirmed through the provider."],
    questions: [{"question":"Who directed A Lagos Love Story?","answer":"Chinaza Onuzo directed the film."},{"question":"Where can A Lagos Love Story be watched?","answer":"It has an official Prime Video listing; confirm your region and subscription through the linked provider."}],
    crew: [{"role":"Director","name":"Chinaza Onuzo"}],
  },

  "what-love-is": {
    plot: ["What Love Is follows a contemporary romance shaped by uncertainty, expectations and difficult decisions about trust. The central relationship becomes a test of whether affection can survive disagreements about commitment and what each partner owes the other.","The drama is grounded in personal conversations rather than a fantasy setting. Its search identity is the combination of the two leading actors and an original online release, not a generic statement about what love means."],
    context: ["The film features Maurice Sam and Erica Nlewedim. The original publisher's YouTube video is the viewing reference in the catalog; the title should not be confused with interviews or advice videos that share the same question-like wording.","Specific actor-to-character assignments are deliberately omitted until a credited source provides them. The movie guide separates available cast facts from interpretation of the relationship story."],
    questions: [{"question":"Who are the stars of What Love Is?","answer":"Maurice Sam and Erica Nlewedim are the documented leads."},{"question":"Is What Love Is available as a film on YouTube?","answer":"The catalog links the authorised full-length publisher upload; check the original video for current playback."}],
    crew: [],
  },

  "irreplaceable": {
    plot: ["A teenager decides that her mother needs companionship and attempts to arrange a relationship herself. A school rival becomes involved, turning an initially awkward matchmaking plan into a story about assumptions, friendship and family needs.","The comedy and drama arise because the young characters believe they understand adult relationships better than the adults themselves. Their efforts have consequences for people who did not choose to be part of the plan."],
    context: ["Irreplaceable is a 2024 Nigerian film featuring John Ekanem, Emmanuel Nse, Angel Unigwe, Betcy Amilo and Rejoice Rejme. The existing record links to its official online release.","Although teenagers are involved in the story, the premise is not a factual account of any actor's own family. The credited film and its year identify it against unrelated romances also called Irreplaceable."],
    questions: [{"question":"What is Irreplaceable (2024) about?","answer":"A teenager tries to help her mother find a partner and draws a school rival into her plan."},{"question":"Who stars in Irreplaceable?","answer":"The cast includes John Ekanem, Emmanuel Nse and Angel Unigwe."}],
    crew: [],
  },

  "plus-one": {
    plot: ["Plus One begins with a pretend romance arranged to make a family gathering easier. The agreement creates a convincing public relationship, but its boundaries blur as the pair spend time together and their feelings become harder to separate from the performance.","The romantic-comedy tension comes from the contrast between what the couple has agreed to say and what they actually begin to experience. Family expectations increase the pressure to keep the arrangement believable."],
    context: ["Saga Adeolu and Sophia Chisom lead the 2026 movie, with Ayo Adesanya and Symon Oko in its documented cast. The title is associated with a specific official YouTube movie upload.","The phrase plus one also commonly means a guest at an event, so a film search should use the lead actors and release year to avoid confusing the movie with unrelated clips or romantic advice."],
    questions: [{"question":"What is the premise of Plus One?","answer":"Two people pretend to be a couple for a family gathering, then struggle when their relationship begins to feel real."},{"question":"Who appears in Plus One (2026)?","answer":"Saga Adeolu, Sophia Chisom, Ayo Adesanya and Symon Oko are credited."}],
    crew: [],
  },

  "ashes-of-us-2026": {
    plot: ["Ashes of Us follows a couple whose balance changes after the husband loses a job that had given him financial security. His wife's success in real estate offers a possible route forward, but accepting help threatens his sense of independence.","The marriage must confront the practical consequences of changed income as well as the emotional consequences of pride. The story's conflict is not simply financial: it concerns who feels entitled to make decisions when partners' relative earning power changes."],
    context: ["Austin Onyema directed the 2026 drama. The cast includes Chinenye Nnebe, Daniel Etim Effiong, Thelma Chukwunwem, Donna Ilomba and other credited performers.","The catalog links the original YouTube release through its publisher metadata. The verified film record supports the job-loss and real-estate premise, but it does not establish every performer’s character name."],
    questions: [{"question":"What tests the marriage in Ashes of Us?","answer":"The husband loses his longtime job while his wife's stronger financial position changes the couple's relationship."},{"question":"Who directed Ashes of Us (2026)?","answer":"Austin Onyema directed the film."}],
    crew: [{"role":"Director","name":"Austin Onyema"}],
  },

  "onte-final-chapter-2026": {
    plot: ["Onte: Final Chapter returns to the tenants at No. 13 Ire Akari Street, whose lives are still shaped by a controlling landlady. Wande comes back with a plan to loosen that control, but the final confrontation reveals more complications than the residents expected.","The film is a conclusion to an existing story. Viewers who begin with the final chapter may recognise the central conflict but miss how earlier instalments established relationships between the tenants and their landlord."],
    context: ["Abiodun Jimoh is credited as director. The listed cast includes Anike Ami Olaniyi, Omolara Kowoti, Seyi Adeola, Bamidele Ayodele and Babatunde Shodipo.","The full final-chapter publisher release is the relevant viewing destination. Search results for the series title without the subtitle may refer to earlier films, so this page identifies the exact instalment."],
    questions: [{"question":"What is Onte: Final Chapter about?","answer":"The tenants at No. 13 Ire Akari Street confront their landlady as Wande returns with a plan to change their situation."},{"question":"Can I start the Onte story with Final Chapter?","answer":"It is a concluding instalment; earlier chapters help explain the established relationships and conflict."}],
    crew: [{"role":"Director","name":"Abiodun Jimoh"}],
  },

  "celebrity-crush-2024": {
    plot: ["Celebrity Crush follows a young admirer whose unexpected encounter with a celebrity changes both their lives. The idea of getting to know a famous person develops into a relationship shaped by the gap between a public image and the person behind it.","The romance explores how admiration can become complicated once two people must make practical decisions together. What begins as a fan's dream has consequences for work, privacy and expectations."],
    context: ["The 2024 Nigerian romance features Clinton Joshua, Chioma Nwaoha, Courtney Ochanya and Ikechukwu Ohanen. The official full movie is linked through the publisher's YouTube channel.","The title has a common meaning outside film, so searches for the actor names and year are more useful for identifying this specific production than the phrase celebrity crush alone."],
    questions: [{"question":"What happens in Celebrity Crush (2024)?","answer":"A young fan unexpectedly meets a celebrity and their connection becomes more complex than the imagined romance."},{"question":"Who stars in Celebrity Crush?","answer":"The documented cast includes Clinton Joshua and Chioma Nwaoha."}],
    crew: [],
  },

  "a-ride-forever-2026": {
    plot: ["A Ride Forever uses a journey to bring two people into an unexpected emotional connection. Their encounter is challenged by difficult choices and uncertainty about what the future will allow.","The road premise gives the couple an immediate reason to spend time together. The relationship's uncertainty, rather than the destination itself, becomes the source of the film's romantic drama."],
    context: ["The 2026 movie features Sarian Martins and Deza the Great. MyNigeriaGuide's existing record links to an authorised full-length source and a separate film-information entry.","The film should be distinguished from ordinary travel videos or other romances built around a road trip. The stars and movie year are useful identifiers."],
    questions: [{"question":"Who are the leads in A Ride Forever?","answer":"Sarian Martins and Deza the Great are the listed performers."},{"question":"What kind of movie is A Ride Forever?","answer":"It is a 2026 Nigerian romance built around an unexpected connection during a journey."}],
    crew: [],
  },

  "for-richer-for-poorer-2026": {
    plot: ["A marriage once sustained by financial comfort begins to struggle when hardship takes its place. The couple must decide how to respond to the loss of stability while their expectations about loyalty, support and sacrifice are tested.","The title deliberately evokes marriage vows. Its conflict asks what those promises mean when money is no longer available to resolve every disagreement, rather than treating hardship only as a background detail."],
    context: ["The film's recorded cast includes Maurice Sam, Sophie Alakija, Princess Maureen Ihua and Eben Austine Ephraim. It is a 2026 Nigerian movie with an official full-length YouTube publishing record.","Multiple unrelated films use versions of the marriage-vow title For Richer, For Poorer. The year and principal actors should accompany the title in search results to distinguish this release."],
    questions: [{"question":"What tests the couple in For Richer, For Poorer (2026)?","answer":"Financial hardship puts their marriage vows, loyalty and mutual support under pressure."},{"question":"Who appears in the 2026 version?","answer":"Maurice Sam and Sophie Alakija are among the listed leading performers."}],
    crew: [],
  },

  "lost-connection-2026": {
    plot: ["Lost Connection follows Maureen and Funsho, a married couple who now feel like strangers. A therapist suggests a seventy-two-hour period without digital devices, forcing them to speak directly rather than avoid difficult conversations.","The exercise uncovers a secret they have not confronted. The film's premise is less about technology being inherently harmful than about the couple using constant connectivity as a way to avoid emotional honesty."],
    context: ["Tobe Nosike directed the 2026 drama. The listed cast includes Stan Nze, Bamike Olawunmi-Adenibuyan, Olubunmi Sunday and Samson Ogunde.","The seventy-two-hour challenge is a fictional plot device, not medical advice or a validated treatment plan. The film can still prompt discussion about communication without promising that its method works for every couple."],
    questions: [{"question":"What is the 72-hour challenge in Lost Connection?","answer":"The couple attempts a therapist-suggested period without devices to force direct communication."},{"question":"Who directed Lost Connection (2026)?","answer":"Tobe Nosike is the credited director."}],
    crew: [{"role":"Director","name":"Tobe Nosike"}],
  },

  "the-kings-matchmaker-2026": {
    plot: ["The King's Matchmaker follows a palace searching for a partner for a reluctant prince. A matchmaker is brought in to organise an appropriate royal union, turning a formal assignment into a conflict between duty and personal feelings.","The story contrasts a family's ceremonial expectations with the prince's own preferences. The matchmaker's presence creates opportunities for misunderstandings and a connection that may not fit the original plan."],
    context: ["The 2026 film stars Uzor Arukwe, Ego Nwosu, Sunshine Dennis, Chieke Donald and Sunshine Rosman. Its credited directors are Jide JBlaze Oyegbile and Kingsley Fresh Onyenma.","The original publisher's full movie is the viewing source, not an unrelated documentary about royal marriage traditions. Character-role labels will be expanded only when supported by a production credit."],
    questions: [{"question":"Why is there a matchmaker in The King's Matchmaker?","answer":"A palace hires one to find a suitable wife for a reluctant prince."},{"question":"Who directed the 2026 movie?","answer":"Jide JBlaze Oyegbile and Kingsley Fresh Onyenma are listed as directors."}],
    crew: [{"role":"Co-director","name":"Jide JBlaze Oyegbile"},{"role":"Co-director","name":"Kingsley Fresh Onyenma"}],
  },

  "long-enough-2026": {
    plot: ["Long Enough follows the strain on a relationship that has remained hidden for too long. Secrecy imposes emotional costs on the people involved, while competing loyalties make it increasingly difficult to continue as before.","The story's title refers to the point when patience stops being enough. The characters must decide whether maintaining the relationship is still worth the sacrifices required to keep it out of view."],
    context: ["Austin Onyema directed the 2026 Nigerian drama. The cast includes Victory Michael, Prisma James, Jennifer Obodo, Ekene Andrew Emueze and Chinedu Ikedieze.","The existing publisher record identifies the authorised film and director. A list of actors does not establish who plays each partner, so the guide does not invent character roles."],
    questions: [{"question":"What is Long Enough about?","answer":"A secret long-term relationship is threatened by emotional pressure and conflicting loyalties."},{"question":"Who directs Long Enough (2026)?","answer":"Austin Onyema is the credited director."}],
    crew: [{"role":"Director","name":"Austin Onyema"}],
  },

  "terms-of-attraction-2026": {
    plot: ["Terms of Attraction begins with an accident that unexpectedly connects two people. As one or both deal with its aftermath, the relationship develops under the pressure of recovery and the difficulty of trusting someone new.","The romance is less about a chance meeting than about the consequences of what happened before the characters knew each other. The film examines whether affection can grow alongside unresolved hurt."],
    context: ["The 2026 movie features Maurice Sam and Ruth Kadiri, with Sunshine Dennis, Solomon Osagie and Sunshine Rosman also credited. The official viewing reference is a publisher-linked YouTube release.","Viewers should not confuse the title with legal advice or general relationship commentary. The principal cast and accident-based premise identify the film."],
    questions: [{"question":"What brings the couple together in Terms of Attraction?","answer":"A painful accident creates an unexpected connection that develops during recovery."},{"question":"Who stars in Terms of Attraction?","answer":"Maurice Sam and Ruth Kadiri lead the listed cast."}],
    crew: [],
  },

  "if-you-ask-me-to-stay": {
    plot: ["Zara is preparing for a career move to Abuja and has little time to reconsider her future. A chance meeting with Timi introduces the possibility of romance only thirty days before her planned departure.","As the relationship grows, a dangerous secret complicates the decision to stay or leave. The film brings work ambition into direct conflict with personal attachment rather than treating relocation as a minor background detail."],
    context: ["Mo' Fakorede is credited as director. Toluwani George, Sydney Ihionu and Paul Utomi are among the cast members listed for the 2026 movie.","The authorised full-length video is linked by the original publisher. The film's title may resemble lyrics or relationship advice online, so the cast and year are useful search identifiers."],
    questions: [{"question":"Why does Zara have thirty days in If You Ask Me to Stay?","answer":"She is preparing for a major career move to Abuja when she meets Timi."},{"question":"Who directed the movie?","answer":"Mo' Fakorede directed the 2026 romance."}],
    crew: [{"role":"Director","name":"Mo' Fakorede"}],
  },

  "husband-or-dare": {
    plot: ["Husband or Dare follows a wife whose jealousy intensifies as she attempts to protect her marriage. Earlier grief and new relationships shape what she is prepared to believe about her husband.","The drama traces how suspicion can turn ordinary interactions into apparent evidence of betrayal. Hidden truths gradually challenge the characters' assumptions about loyalty and trust."],
    context: ["The listed cast includes Bukunmi Adeaga-Ilori, Taye Arimoro, Kiki Bakare and Lolade Okusanya. The 2026 movie is linked to an authorised full-length publisher video.","The film's title is distinctive, but short social clips can remove the context of the family loss driving the story. The original publisher link is preferable for viewers trying to understand the full drama."],
    questions: [{"question":"What creates tension in Husband or Dare?","answer":"A wife's jealousy and unresolved family grief lead her to question her marriage and her husband's loyalty."},{"question":"Who stars in Husband or Dare?","answer":"Bukunmi Adeaga-Ilori, Taye Arimoro, Kiki Bakare and Lolade Okusanya are among the credited cast."}],
    crew: [],
  },

  "one-more-night": {
    plot: ["One More Night brings former sweethearts Annabel and Mason together after their relationship has ended. Their reunion forces them to consider what went wrong and whether regret can be transformed into a genuine second chance.","The romantic dilemma depends on forgiveness, not merely attraction. Familiarity with each other's past makes reconciliation possible, while unresolved hurt also makes it difficult."],
    context: ["The 2025 film features Frederick Leonard and Cynthia Clarke, with Bryan Okoye, Vivian Gabriel and Desmond Anyanwu in the existing cast record. The official Frederick Leonard TV upload is the preferred full-length viewing source.","Several movies share the title One More Night. To identify this Nigerian feature, use the leading actors, publisher and approximate 129-minute runtime shown on its movie page."],
    questions: [{"question":"Who are the former sweethearts in One More Night?","answer":"Annabel and Mason reunite after a past relationship and reconsider whether they can reconcile."},{"question":"Who stars in One More Night (2025)?","answer":"Frederick Leonard and Cynthia Clarke lead the documented cast."}],
    crew: [],
  },
};

export const featuredEditorialProfiles: Record<string, MovieEditorialProfile> = Object.fromEntries(
  Object.entries(drafts).map(([slug, value]) => [
    slug,
    {
      roles: [],
      crew: value.crew ?? [],
      sections: [
        { heading: "Story and main conflict", paragraphs: value.plot },
        { heading: "Cast, release and verified viewing", paragraphs: value.context },
      ],
      questions: value.questions,
    },
  ]),
);
