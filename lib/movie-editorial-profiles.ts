// Carefully sourced film-specific editorial profiles. Do not generate generic
// prose or role assignments for titles without confirmed credits.
export type MovieEditorialProfile = {
  releaseDate?: string;
  roles: { actor: string; character: string }[];
  crew: { role: string; name: string }[];
  sections: { heading: string; paragraphs: string[] }[];
  questions: { question: string; answer: string }[];
};

export const movieEditorialProfiles: Record<string, MovieEditorialProfile> = {
  "sibe": {
    releaseDate: "2026-07-25",
    roles: [
      { actor: "Bimbo Ademoye", character: "Sibe" },
      { actor: "Uche Montana", character: "Natasha" },
      { actor: "Afeez Oyetoro", character: "The Oracle" },
    ],
    crew: [
      { role: "Producer", name: "Bimbo Ademoye" },
    ],
    sections: [
      {
        heading: "What happens in Sibe: The Movie?",
        paragraphs: [
          "Sibe is a Nigerian comedy built around the ambitious but frequently unlucky character played by Bimbo Ademoye. At the beginning of the film, Sibe imagines receiving public recognition as a police officer. That imagined achievement establishes a central tension: she dreams of importance and a better life while her day-to-day choices keep creating trouble. The feature lets those ambitions shape a longer story rather than simply repeating a series of isolated comedy sketches.",
          "The conflict with Natasha, played by Uche Montana, supplies much of the film's continuing drama. Sibe's confidence and repeated mistakes collide with another strong personality, leaving viewers to see what happens when dreams of advancement meet responsibility and consequences. The verified reporting describes the relationship as an important part of the plot; this guide does not invent unreported character histories or reveal the film's ending.",
          "Afeez Oyetoro, also known as Saka, appears as the Oracle. That role has been specifically identified in NTA's coverage, but the available checked sources do not reliably assign film-character names to Uzor Arukwe and Deyemi Okanlawon. Both are confirmed performers on the publisher's upload, so they remain in the cast list without guessed roles.",
        ],
      },
      {
        heading: "Is this the same Sibe from Bimbo Ademoye's web series?",
        paragraphs: [
          "Yes. The character appeared before this feature in Bimbo Ademoye's online Sibe sketches and web series, which NTA dates to December 2022. The earlier series featured Adewale Elesho as Baba Sibe and Uzor Arukwe as Bobo. Those are credits for the earlier format, not automatic proof that the same characters have identical roles or screen time in the 2026 movie. A viewer can follow the new film as a feature-length story while recognising the personality established in the sketches.",
          "This distinction is important for cast searches. Searching for Sibe may turn up the earlier short-format instalments, a different production featuring the same performers, or fan-uploaded extracts. For the 2026 feature, use the complete original film posted on Bimbo Ademoye TV on 25 July 2026. It runs for approximately two hours and 25 minutes according to the film catalogue and is presented as a comedy, not an episodic short.",
          "The publisher's credited feature cast includes Bimbo Ademoye, Uche Montana, Uzor Arukwe and Deyemi Okanlawon. NTA also confirms Afeez Oyetoro's Oracle appearance. Separate the full-film credits from the earlier web-series roster when looking up a specific performer. We have not independently established a theatrical screening, subscription release or sequel announcement, and a review's speculation about future instalments is not confirmation that one has been commissioned.",
        ],
      },
    ],
    questions: [
      {
        question: "Who plays Sibe, Natasha and the Oracle in the 2026 movie?",
        answer: "Bimbo Ademoye plays Sibe, Uche Montana plays Natasha, and Afeez Oyetoro (Saka) plays the Oracle. Uzor Arukwe and Deyemi Okanlawon also appear, but this guide does not assign unverified film-character names to them.",
      },
      {
        question: "When was Sibe released and where is the full movie?",
        answer: "The original complete Sibe film was published on 25 July 2026 by Bimbo Ademoye TV on YouTube. Use the publisher link on this page; lookalike uploads and excerpts are not proof of authorised distribution.",
      },
      {
        question: "Do I need to watch the old Sibe series first?",
        answer: "Not necessarily. The earlier web sketches introduce Sibe's familiar comic personality, while the 2026 feature develops a longer story around her ambitions and conflicts. Do not confuse recurring web-series characters with verified feature-film credits.",
      },
    ],
  },
  "oversabi-aunty": {
    releaseDate: "2025-12-19",
    roles: [
      { actor: "Toyin Abraham", character: "Toun" },
      { actor: "Mike Ezuruonye", character: "Chidi" },
      { actor: "Enioluwa Adeoluwa", character: "Chuka" },
      { actor: "Efe Irele", character: "Seyi" },
      { actor: "Jemima Osunde", character: "Ada" },
      { actor: "Queen Nwokoye", character: "Aunty Rose" },
      { actor: "Tana Adelana", character: "Achalugo" },
      { actor: "Bianca Ugowanne", character: "Aderonke" },
    ],
    crew: [
      { role: "Director", name: "Toyin Abraham" },
      { role: "Screenwriter (co-writer)", name: "Toyin Abraham" },
      { role: "Executive producer", name: "Toyin Abraham" },
      { role: "Cinematographer", name: "Jonathan Kovel" },
      { role: "Editor", name: "Shola Ayorinde" },
    ],
    sections: [
      {
        heading: "The family at the centre of Oversabi Aunty",
        paragraphs: [
          "Toun is a church usher who sees herself as the person best placed to correct other people's behaviour. Her good intentions become controlling habits: she is quick to intervene in neighbours' affairs and even quicker to lecture her children. The family comedy turns that certainty against her when wedding preparations make private tensions impossible to hide.",
          "Seyi's wedding introduction brings relatives and competing expectations into the same room. The ceremony is more than a backdrop for jokes: it exposes disagreements about money, marriage and family obligations. Meanwhile, Toun has spent so much time monitoring others that she has overlooked what Chuka, Ada, Aderonke and the rest of the family are managing themselves.",
          "The film's central question is whether advice remains helpful when it becomes unwanted interference. Its mix of church life, family dynamics and wedding customs makes the premise particularly familiar to viewers of Nigerian domestic comedies. The official synopsis establishes this conflict without revealing how Toun's family resolves it.",
        ],
      },
      {
        heading: "Release, director and legal viewing status",
        paragraphs: [
          "Oversabi Aunty opened in Nigerian cinemas on 19 December 2025. Toyin Abraham both stars in and directs the film. Its theatrical history should not be confused with current streaming availability: an old cinema release or a platform listing does not guarantee an active play button in every country.",
          "Kava currently publishes an official Oversabi Aunty film page with a Subscribe option and a full-film listing. Visit that provider to confirm account access, payment and territorial restrictions. Netflix also has a title listing, but the regional availability notice observed on its page does not establish that it can be played in Nigeria. The FilmOne YouTube link on this guide is a trailer, not a free full-movie release.",
        ],
      },
    ],
    questions: [
      {
        question: "Who plays Toun, Chuka and Seyi in Oversabi Aunty?",
        answer: "Toyin Abraham plays Toun, Enioluwa Adeoluwa plays Chuka, and Efe Irele plays Seyi. Additional verified character credits appear in the cast table on this page.",
      },
      {
        question: "Is Oversabi Aunty available as a free full movie on YouTube?",
        answer: "No authorised free full-film upload has been verified here. The FilmOne video is a trailer; the official Kava film page offers a subscription route that viewers should check for current eligibility.",
      },
    ],
  },
  "my-30th-wedding": {
    releaseDate: "2026-10-01",
    roles: [
      { actor: "Bimbo Ademoye", character: "Aeta" },
      { actor: "Timini Egbuson", character: "Leon Wellington" },
    ],
    crew: [
      { role: "Director (FilmFlux credit)", name: "Great-Valedochie" },
      { role: "Writer and producer (reported by BellaNaija)", name: "Bimbo Ademoye" },
      { role: "Producer (FilmFlux credit)", name: "Grace Felix" },
      { role: "Cinematographer (FilmFlux credit)", name: "Abiola Ladipo" },
      { role: "Editor (FilmFlux credit)", name: "Adio Solanke" },
    ],
    sections: [
      {
        heading: "What happens in My 30th Wedding?",
        paragraphs: [
          "Aeta has a successful career organising other people's events, but her own approaching 30th birthday puts her under pressure to settle down. A demanding project introduces her to Leon Wellington, a client whose position and personality create an uneasy professional relationship. As the two grow closer, the expectations attached to work, status and marriage become harder to separate.",
          "The film builds its romance around a contradiction: Aeta is experienced at planning moments of happiness for clients while struggling with the timetable others have set for her personal life. It uses comedy and family expectations to explore the cost of trying to satisfy everyone at once. Bimbo Ademoye plays Aeta opposite Timini Egbuson's Leon. Other performers are credited in the cast list, but their character names have not been independently confirmed here.",
          "For viewers who follow the pair's earlier on-screen collaborations, this is another romantic comedy built around their chemistry. It is also a distinct original film, not footage of the actors' real-life wedding.",
        ],
      },
      {
        heading: "Why did Bimbo Ademoye and Timini Egbuson's wedding photos trend?",
        paragraphs: [
          "Promotional images showed Ademoye and Egbuson dressed as a bride and groom in both modern wedding attire and Edo- and Igbo-inspired ceremonial looks. The photographs prompted speculation that the actors had married. BellaNaija reported on 2 October 2026 that the images were publicity for My 30th Wedding, not an announcement of a real wedding.",
          "The film premiered on Bimbo Ademoye TV on YouTube on 1 October 2026. Its official full-length release runs approximately 149 minutes. This page links to the film on the publisher's channel rather than sending visitors to unofficial mirror uploads. Early audience milestones were reported by Nigerian entertainment coverage; live view counts may have increased since those reports.",
        ],
      },
    ],
    questions: [
      {
        question: "Did Bimbo Ademoye marry Timini Egbuson?",
        answer: "No marriage was announced in the film's promotional wedding photographs. The pictures were created to promote My 30th Wedding, in which the actors play Aeta and Leon Wellington.",
      },
      {
        question: "Who directed My 30th Wedding and when did it premiere?",
        answer: "FilmFlux credits Great-Valedochie as director. The film premiered on Bimbo Ademoye TV on 1 October 2026. Published reporting separately identifies Bimbo Ademoye as its writer and producer.",
      },
    ],
  },
  "once-upon-a-village-3": {
    releaseDate: "2026-08-20",
    roles: [
      { actor: "Deza The Great", character: "Chairman Jeffery" },
      { actor: "Prisma James", character: "Lilian" },
      { actor: "Annabel Apara", character: "Enoh" },
      { actor: "Eronini Osinachi", character: "Mina" },
      { actor: "Henrietta Ibekwe", character: "Mama" },
      { actor: "Karo Benedict", character: "Mascot" },
      { actor: "Solomon Osagie", character: "Sammy" },
      { actor: "Lydian John", character: "Aunty Anita" },
    ],
    crew: [
      { role: "Executive producer", name: "Ruth Kadiri" },
      { role: "Producer", name: "Precious Ehis Kadiri" },
      { role: "Director", name: "Nelly Gilson" },
    ],
    sections: [
      {
        heading: "What is Once Upon a Village 3 about?",
        paragraphs: [
          "Once Upon a Village 3 follows Chairman Jeffery's decision to shelter three women while repairs are made to their home. Enoh and her grandmother are among the women offered work in his household. The help initially seems generous, but his wife Hilda objects to the arrangement and the family's son Mina is hostile, turning the house into an uncomfortable place for its new residents.",
          "A separate dispute surrounds Lilian and Sammy when questions about the past re-emerge in the village. These connected domestic conflicts give Part 3 a different immediate focus from the earliest instalment's concerns over promised scholarships. The film explores what happens when people with financial power offer help while refusing their guests equal dignity. Viewers who begin here may also miss why certain family relationships were strained before the housekeeper arrangement.",
          "The cast should be identified by instalment rather than assuming that every actor appears in every episode. The role table above is limited to individually documented Part 3 credits. This guide avoids claiming that its cast list includes every performer in the larger Once Upon a Village series.",
        ],
      },
      {
        heading: "How does Part 3 fit into the RuthKadiri247 series?",
        paragraphs: [
          "RuthKadiri247 published Once Upon a Village 3 on YouTube on 20 August 2026. The publisher's title prominently names Deza The Great, Prisma James, Fessa Ajoku and Annabel Apara. The verified upload is roughly 99 minutes, and its title distinguishes it from the original instalment and later entries.",
          "You can watch Part 3 from the original RuthKadiri247 source linked below, or use MyNigeriaGuide's separate series guide to follow the story in sequence. This distinction matters because people searching for 'Once Upon a Village cast' may want credits for the whole series, while others want the specific actors in the third film.",
        ],
      },
    ],
    questions: [
      {
        question: "Who plays Chairman Jeffery and Lilian in Once Upon a Village 3?",
        answer: "Deza The Great is credited as Chairman Jeffery and Prisma James as Lilian. Annabel Apara plays Enoh, with additional independently documented part-specific roles listed above.",
      },
      {
        question: "Where can I watch Once Upon a Village 3?",
        answer: "The full Part 3 upload is published by RuthKadiri247 on YouTube. Follow the official video link in the viewing section and see the linked series guide if you want to start with the first instalment.",
      },
    ],
  },
  "millionaire-until-morning": {
    roles: [
      { actor: "Sophia Chisom", character: "Ndidi" },
      { actor: "Chris Attoh", character: "Harrison" },
      { actor: "Thelma Chukwunwem", character: "Matilda" },
      { actor: "Desmond Bryce", character: "Desmond" },
      { actor: "Taiwo Familoni", character: "Mr Sam" },
    ],
    crew: [
      { role: "Executive producer", name: "Omoni Oboli" },
      { role: "Producer", name: "Susan Ogutuga" },
    ],
    sections: [
      {
        heading: "Story and characters in Millionaire Until Morning",
        paragraphs: [
          "Ndidi is a young woman struggling to find security after her father's death. Living with her harsh stepmother Matilda, she faces pressure to marry an older suitor rather than make her own future. Sophia Chisom plays Ndidi and Thelma Chukwunwem plays Matilda in this romance and family drama.",
          "Chris Attoh plays Harrison, a man who offers a way out of the proposed marriage and seems to provide the financial certainty Ndidi has been denied. Their relationship raises a more difficult question about the difference between a convincing appearance of wealth and a person's real ability to care for someone else.",
          "The early conflict includes Desmond, Ndidi's boyfriend, and Mr Sam, the older suitor favoured by her family. Rather than presenting a conventional rescue story, the film places trust, honesty and family power at the centre of the romantic decision. The details that change Ndidi's view of Harrison are best experienced in the original movie.",
        ],
      },
      {
        heading: "Official release and why the title matters",
        paragraphs: [
          "Millionaire Until Morning is a 2026 Nigerian drama available as a complete film on the official Omoni Oboli TV YouTube channel. The published feature runs about 144 minutes. A direct link to that approved publisher appears in the viewing section, so readers do not need to search among unauthorised reposts.",
          "The title hints that a promise of sudden prosperity may not survive until daylight. Its story is about the consequences of that gap between claims and reality, not merely a wealthy man offering financial rescue. Reviews have discussed the film as a variation on familiar Nollywood themes of arranged marriage, hardship and romance.",
        ],
      },
    ],
    questions: [
      {
        question: "Who plays Ndidi and Harrison in Millionaire Until Morning?",
        answer: "Sophia Chisom plays Ndidi, and Chris Attoh plays Harrison. The supporting character credits listed above have also been checked against published film reviews and cast records.",
      },
      {
        question: "Is Millionaire Until Morning available on YouTube?",
        answer: "Yes. The film is linked here through Omoni Oboli TV, its original full-movie publisher. Check the video for current regional access and do not confuse the official upload with copied versions.",
      },
    ],
  },
};
