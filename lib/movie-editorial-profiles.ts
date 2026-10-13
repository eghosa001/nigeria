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
};
