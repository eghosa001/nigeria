import type { ExploreGuide } from "@/lib/explore";

// Source-checked 17 October 2026. Each item adds a specific visitor decision.
// Historic operator pages establish identity, not verified current entry.
// Security advisories are attributed and do not claim to be local permissions.
type EvidenceReview = {
  source: { label: string; href: string };
  additionalSources?: Array<{ label: string; href: string }>;
  context: string;
  planning: ExploreGuide["planning"][number];
  summary?: string;
};

export const thirdAgentTourEvidence20261017: Record<string, EvidenceReview> = {
  "calabar-carnival-2026": {
    "source": {
      "label": "Cross River State Ministry of Information — 18 October 2026 carnival dry run",
      "href": "https://news.crossriverstate.gov.ng/carnival-calabar-2026-first-dry-run-set-for-october-18/"
    },
    "context": "There is a separate 2026 rehearsal before the December carnival: Cross River's Carnival Commission announced a first dry run for Sunday 18 October, with a 1:30 pm flag-off at Millennium Park. It is not the 28 December Parade of Bands. Consult the state's dated announcement and its separate full-season calendar rather than treating the rehearsal and main parade as the same event.",
    "planning": {
      "label": "Distinguish the October rehearsal from December parade",
      "detail": "The 18 October 2026 first dry run starts at Millennium Park at 1:30 pm according to Cross River's September announcement. Confirm any late route changes and allow for street restrictions; the main adult parade remains listed for 28 December."
    }
  },
  "wase-rock-guide": {
    "source": {
      "label": "Plateau State Government — tourism listing for Wase Rock",
      "href": "https://www.plateaustate.gov.ng/tourism/"
    },
    "additionalSources": [
      {
        "label": "UK FCDO — current Plateau State travel advisory",
        "href": "https://www.gov.uk/foreign-travel-advice/nigeria"
      }
    ],
    "summary": "Wase Rock is a major inselberg near Wase town, not a casual Jos walk; verify any lawful viewpoint and heed the current UK warning against all but essential travel to Plateau State.",
    "context": "Plateau State's tourism page identifies Wase Rock as a dome-shaped inselberg near Wase town in Wase Local Government Area. That confirms the landmark, not an authorised summit trail, ranger service, operating fee or bird-nesting access. The UK FCDO currently advises against all but essential travel to Plateau State; do not treat the rock's tourism listing as a green light for an independent hike.",
    "planning": {
      "label": "Avoid an unverified climb or long-distance detour",
      "detail": "Wase is a separate journey from Jos. Confirm local access rules and current security first; do not climb or approach restricted areas merely because the official tourism page describes the rock's geology."
    }
  },
  "zamfara-state-museum-guide": {
    "source": {
      "label": "UK FCDO — current Zamfara State travel advisory",
      "href": "https://www.gov.uk/foreign-travel-advice/nigeria"
    },
    "context": "Zamfara's commerce and tourism ministry lists a State Museum and a National Art Gallery branch in Gusau as distinct cultural institutions. It does not publish verified current public hours for either. The UK FCDO currently advises against all travel to Zamfara State; a capital-city museum listing does not make leisure travel advisable.",
    "summary": "Gusau's museum appears in Zamfara's official tourism inventory, but public operating details are unverified and the UK FCDO advises against all travel to Zamfara.",
    "planning": {
      "label": "Do not confuse the museum with safe travel authorisation",
      "detail": "Treat the official ministry's heritage list as a reference, not a recommendation to enter Gusau. Review current Zamfara-wide security guidance and seek direct confirmation of the museum's status only if an essential trip is unavoidable."
    }
  },
  "kwatakashi-rocks-guide": {
    "source": {
      "label": "UK FCDO — current Zamfara State travel advisory",
      "href": "https://www.gov.uk/foreign-travel-advice/nigeria"
    },
    "summary": "Zamfara lists Kwatakashi Rocks as a landscape attraction; independent leisure visits are not appropriate while the UK FCDO advises against all travel to Zamfara State.",
    "context": "The Zamfara State Ministry of Commerce, Industry and Tourism lists Kwatakashi Rocks for scenery and photography, not as a managed climb with opening hours, security escorts or ticketing. The UK FCDO advises against all travel to Zamfara State. An official tourism listing cannot override that wider security assessment.",
    "planning": {
      "label": "Put travel safety ahead of viewpoints",
      "detail": "Do not plan a recreational road trip on the strength of a historic tourism entry. If travel is unavoidable for another reason, rely on up-to-date official security briefings; no safe rock-climbing route or photo stop is verified here."
    }
  },
  "kaura-namoda-tomb-guide": {
    "source": {
      "label": "UK FCDO — current Zamfara State travel advisory",
      "href": "https://www.gov.uk/foreign-travel-advice/nigeria"
    },
    "summary": "Kauran Namoda's tomb is part of Zamfara's official heritage inventory, not a confirmed open attraction; current UK guidance advises against all travel to Zamfara State.",
    "context": "The Zamfara tourism ministry describes Kauran Namoda's Tomb as the memorial of an Alibawa warrior in Kaura Namoda. This supports the historical subject of the guide but not a ticketed museum, on-site interpreter or daily access programme. The UK FCDO advises against all travel to Zamfara State.",
    "planning": {
      "label": "Respect heritage without promoting unsafe travel",
      "detail": "Keep the tomb in a heritage-reference context unless reliable local authorities can document controlled access for an essential trip. Do not advertise a day trip, invent an entrance fee or treat a place's listing as proof of safe roads."
    }
  },
  "felabration-2026": {
    "source": {
      "label": "Felabration Organising Committee — festival history and New Afrika Shrine venue",
      "href": "https://www.felabration.net/about"
    },
    "context": "The Felabration Organising Committee describes its annual festival as a celebration of Fela Kuti conceived by Yeni Kuti in 1998, with a central week of music at the New Afrika Shrine and supporting debates, dance and exhibitions. Its general history is not the dated 2026 programme for Freedom Park: organisers and independent venues may run different events, prices and line-ups under the Felabration period.",
    "planning": {
      "label": "Check the specific organiser for each venue",
      "detail": "For the final 17–18 October dates, cross-check the New Afrika Shrine programme with Felabration's official channels and separately check Freedom Park for its Underground System schedule. Neither a general festival history nor a sponsor post guarantees an act on a particular night."
    }
  },
  "new-afrika-shrine-guide": {
    "source": {
      "label": "Felabration Organising Committee — New Afrika Shrine and festival context",
      "href": "https://www.felabration.net/about"
    },
    "context": "Felabration's own history identifies the New Afrika Shrine as the festival's key music venue, with Fela debates and cultural activities around the wider celebration. It is distinct from Freedom Park on Lagos Island and from Kalakuta Museum; a festival week does not mean every event or performer advertised in Lagos occurs at the Shrine.",
    "planning": {
      "label": "Confirm Shrine event versus off-site programme",
      "detail": "Before setting out for Agidingbi/Ikeja, check that your preferred event is actually scheduled at the New Afrika Shrine, its door and payment rules, and your late return. Freedom Park programmes are separate Lagos Island events."
    }
  },
  "gashaka-hill-forts-guide": {
    "source": {
      "label": "UK FCDO — current Taraba State travel advisory",
      "href": "https://www.gov.uk/foreign-travel-advice/nigeria"
    },
    "summary": "Historic forts within the remote Gashaka area should be treated as research interest rather than a confirmed public walking trail; UK FCDO advises against all but essential travel to Taraba State.",
    "context": "Gashaka-Gumti is a protected park landscape, and a reference to historical forts in a tourism guide does not confirm their archaeological survey, public route or legal entry. The UK FCDO advises against all but essential travel to Taraba State. Neither a generic park overview nor old cultural references establish that a fort trail can safely be visited.",
    "planning": {
      "label": "No unverified fort access",
      "detail": "Do not market a self-guided fort hike. Check the exact site's identity with park or heritage authorities, permission and current security before describing any authorised research visit; no independent public route is established."
    }
  },
  "akwa-ibom-coast-guide": {
    "source": {
      "label": "UK FCDO — riverine Akwa Ibom safety guidance",
      "href": "https://www.gov.uk/foreign-travel-advice/nigeria"
    },
    "summary": "The Akwa Ibom coast includes beaches and heritage stops, but riverine boat-dependent areas face a UK FCDO all-travel warning; do not assume every coastal excursion is safe or open.",
    "context": "The UK FCDO's travel warning covers riverine areas of Akwa Ibom State that are accessible by boat rather than by road. This is not a blanket statement that every street or road-accessible beach is closed, but it does mean a coastal itinerary must distinguish a beach visit from boat-only river and swamp crossings. No route should be inferred safe from a general tourism list.",
    "planning": {
      "label": "Do not conflate shore access with riverine boat travel",
      "detail": "Before including Ibeno, Ikot Abasi or another coastal stop, verify the exact approach, current local restrictions and return arrangements. Do not improvise boat transfers into riverine areas covered by the current FCDO warning."
    }
  }
};
