import { kainjiDamGuide } from "@/lib/explore-kainji-dam-2026-10-10";
import { exploreGrowthWave9 } from "@/lib/explore-growth-wave-9";
import { verifiedTrendEvents } from "@/lib/explore-trend-events-2026-10-08";
import { exploreGrowthWave8 } from "@/lib/explore-growth-wave-8";
import { exploreGrowthWave7 } from "@/lib/explore-growth-wave-7";
import { exploreGrowthWave6 } from "@/lib/explore-growth-wave-6";
import { exploreGrowthWave5 } from "@/lib/explore-growth-wave-5";
import { exploreGrowthWave4 } from "@/lib/explore-growth-wave-4";
import { exploreGrowthWave3 } from "@/lib/explore-growth-wave-3";
import { exploreGrowthWave2 } from "@/lib/explore-growth-wave-2";
import { exploreGrowthWave } from "@/lib/explore-growth-wave-2026-10-06";

export type ExploreGuideKind = "city" | "destination" | "itinerary" | "event";

export type ExploreGuide = {
  slug: string;
  title: string;
  shortTitle: string;
  kind: ExploreGuideKind;
  region: string;
  summary: string;
  intro: string[];
  bestFor: string[];
  highlights: Array<{ name: string; detail: string }>;
  planning: Array<{ label: string; detail: string }>;
  source?: { label: string; href: string };
  lastReviewed: string;
};

export const exploreGuides: ExploreGuide[] = [
  kainjiDamGuide,
  ...verifiedTrendEvents,
  ...exploreGrowthWave9,
  ...exploreGrowthWave8,
  ...exploreGrowthWave7,
  ...exploreGrowthWave6,
  ...exploreGrowthWave5,
  ...exploreGrowthWave4,
  ...exploreGrowthWave3,
  ...exploreGrowthWave2,
  ...exploreGrowthWave,
  {
    slug: "smfest-abuja-2026",
    title: "SMFest Abuja 2026 Guide: Dates, Venue, Tickets & Speakers",
    shortTitle: "SMFest Abuja",
    kind: "event",
    region: "Federal Capital Territory",
    summary: "SMFest Abuja 2026 runs 17–18 October at Family Worship Centre, Wuye, with talks and networking around social media, technology, business and digital growth under the theme AdvantageX.",
    intro: [
      "SMFest Abuja returns on 17 and 18 October 2026 at Family Worship Centre in Wuye. The organiser describes the event as a gathering for creators, entrepreneurs, professionals and business owners using social media, technology and innovation to grow.",
      "The 2026 theme is AdvantageX — The Exponential Advantage. The official event site lists speakers across business, technology, utilities, media and entrepreneurship, while ticket tiers currently run from entry-level to premium networking packages."
    ],
    bestFor: ["Technology", "Social media", "Business", "Networking"],
    highlights: [
      { name: "17–18 October 2026", detail: "The official SMFest site lists the Abuja event for Saturday and Sunday, with doors from 9:00 AM." },
      { name: "Family Worship Centre, Wuye", detail: "The listed venue is FWC Wuye in Abuja." },
      { name: "AdvantageX theme", detail: "Sessions focus on business, technology, social media, real estate and digital opportunity." },
      { name: "Ticket tiers", detail: "The organiser currently lists ticket options from ₦15,000 to ₦250,000; confirm the live checkout price before purchase." }
    ],
    planning: [
      { label: "Buy only from the organiser", detail: "Use the official SMFest site for tickets and confirm the ticket tier before payment." },
      { label: "Plan Wuye transport", detail: "Allow time for event traffic and ride-hailing pickup around Family Worship Centre." },
      { label: "Choose sessions in advance", detail: "Review the final speaker and programme schedule so you do not miss the sessions most relevant to your work." },
      { label: "Re-check the event page", detail: "Speaker order, programme timing and ticket availability can change close to the event." }
    ],
    source: { label: "SMFest Abuja 2026 official website", href: "https://smfest.org/" },
    lastReviewed: "2026-10-06"
  },
  {
    slug: "nifafest-abuja-2026",
    title: "NIFAFEST Abuja 2026: Dates, Venues & Fashion Festival Guide",
    shortTitle: "NIFAFEST 2026",
    kind: "event",
    region: "Federal Capital Territory",
    summary: "Nigeria International Fashion Festival (NIFAFEST) runs 15–17 October 2026 in Abuja with fashion and craft exhibitions, empowerment sessions and a finale across Garki and Maitama venues.",
    intro: [
      "NIFAFEST 2026 is scheduled for 15 to 17 October in Abuja. The organiser positions the three-day festival around Nigerian fashion, textiles, craft, youth and women empowerment, sustainable design and the creative economy.",
      "The programme uses two main venues: Cyprian Ekwensi Centre for Arts and Culture in Area 10, Garki, for the opening and empowerment sessions, and the National Universities Commission Event Auditorium in Maitama for the grand finale."
    ],
    bestFor: ["Fashion", "Creative industry", "Culture", "October events"],
    highlights: [
      { name: "15 October — opening & exhibition", detail: "The opening ceremony and trade/fashion exhibition is listed for noon at the Cyprian Ekwensi Centre for Arts and Culture, Area 10, Garki." },
      { name: "16 October — empowerment seminar", detail: "A grant and empowerment seminar for models, designers and fashion stakeholders is listed for noon at the same Garki venue." },
      { name: "17 October — grand finale", detail: "The awards and finale ceremony is listed for 3:00 PM at the National Universities Commission Event Auditorium in Maitama." },
      { name: "Three-day creative-economy programme", detail: "The organiser highlights sustainable fashion, indigenous textile preservation, youth and women empowerment, and trade exposure." }
    ],
    planning: [
      { label: "Check which venue applies", detail: "The festival changes venue for the finale, so confirm the programme day before travelling." },
      { label: "Register through the organiser", detail: "Use NIFAFEST's official registration and contact routes rather than copied social-media payment instructions." },
      { label: "Allow cross-city travel time", detail: "Garki and Maitama are separate Abuja districts; do not assume the full festival happens in one building." },
      { label: "Verify the live programme", detail: "Check the official site shortly before attendance for timing, accreditation and access changes." }
    ],
    source: { label: "NIFAFEST 2026 official website", href: "https://nifafest.com/" },
    lastReviewed: "2026-10-06"
  },
  {
    slug: "carnival-calabar-2026",
    title: "Carnival Calabar 2026 Guide: Dates, Parade & Festival Schedule",
    shortTitle: "Carnival Calabar",
    kind: "event",
    region: "Cross River State",
    summary: "Plan Carnival Calabar 2026 with the official Cross River schedule: the festival season starts 30 November, the Cultural Carnival is 26 December, Junior Carnival 27 December, main Parade of Bands 28 December and Bikers Carnival 29 December.",
    intro: [
      "Cross River State's official 2026 calendar lists 62 festival events from the Christmas Tree Lighting on 30 November through New Year activities on 1 January 2027.",
      "For visitors focused on the signature carnival days, the main sequence is Cultural Carnival on 26 December, Junior Carnival on 27 December, Carnival Calabar and Parade of Bands on 28 December, and Bikers Carnival on 29 December."
    ],
    bestFor: ["Carnival", "Culture", "December travel", "Live entertainment"],
    highlights: [
      { name: "26 December — Cultural Carnival", detail: "The Cultural Carnival is scheduled for 9:00 AM, flagging off at Millennium Park and using part of the Carnival Calabar route." },
      { name: "27 December — Junior Carnival", detail: "The Junior Carnival is scheduled for 10:00 AM, with the official calendar listing Botanic Garden as the flag-off point." },
      { name: "28 December — Parade of Bands", detail: "Carnival Calabar and the Parade of Bands is scheduled for 10:00 AM on the official carnival route." },
      { name: "29 December — Bikers Carnival", detail: "The Bikers Carnival is scheduled for noon on the carnival route, followed by evening entertainment at U.J. Esuene Stadium." }
    ],
    planning: [
      { label: "Book the peak dates early", detail: "Accommodation and transport demand rises sharply around 26–29 December. Confirm your stay and return travel well before the main parade." },
      { label: "Use the live official calendar", detail: "The season contains dozens of events at different venues. Re-check the Cross River schedule for any timing or venue change before travelling." },
      { label: "Plan around road closures", detail: "Parade days use the carnival route and can change normal traffic movement. Avoid tight airport, hotel or intercity connections around parade times." },
      { label: "Choose your priority days", detail: "If you cannot attend the full season, the Cultural Carnival, Junior Carnival, Parade of Bands and Bikers Carnival form the strongest four-day core." }
    ],
    source: { label: "Cross River State — Carnival Calabar 2026 schedule", href: "https://www.carnival.crossriverstate.gov.ng/schedule" },
    lastReviewed: "2026-10-06"
  },
  {
    slug: "african-traditional-food-fair-abuja-2026",
    title: "African Traditional Food Fair Abuja 2026: Date, Venue & Planning",
    shortTitle: "African Traditional Food Fair",
    kind: "event",
    region: "Federal Capital Territory",
    summary: "The 8th African Traditional Food Fair is scheduled for 17 October 2026 from 10:00 AM to 6:00 PM at the FCT Exhibition Pavilion in Abuja, with indigenous food, tasting, cooking, farmers and food producers.",
    intro: [
      "The 2026 African Traditional Food Fair is a one-day Abuja event focused on indigenous African food systems under the theme 'Reviving Indigenous Foods for Healthy People, Climate Resilience and a Food-Secure Nigeria'.",
      "Visit Abuja lists the fair for Saturday 17 October from 10:00 AM to 6:00 PM at the FCT Exhibition Pavilion beside the International Conference Centre."
    ],
    bestFor: ["Food", "Culture", "Family outings", "October events"],
    highlights: [
      { name: "17 October 2026", detail: "The fair runs from 10:00 AM to 6:00 PM." },
      { name: "FCT Exhibition Pavilion", detail: "The listed venue is on Herbert Macaulay Way in Central Area, beside the International Conference Centre." },
      { name: "Indigenous food & tasting", detail: "The programme brings together farmers, chefs, food producers, policymakers and food innovators with public tasting, cooking and produce stalls." },
      { name: "One-day event", detail: "Build the visit around the published Saturday programme rather than treating it as a multi-day festival." }
    ],
    planning: [
      { label: "Confirm access before leaving", detail: "Check the organiser's current event page for registration, ticket or entry updates." },
      { label: "Arrive with a Central Area transport plan", detail: "The venue is close to major Abuja event and conference traffic; allow time for parking or ride-hailing pickup." },
      { label: "Check food-allergy details directly", detail: "If you have a serious allergy or dietary restriction, ask individual vendors about ingredients rather than relying on assumptions." },
      { label: "Re-check the programme", detail: "Talks, demonstrations and vendor schedules can change even when the event date stays fixed." }
    ],
    source: { label: "Visit Abuja — 8th African Traditional Food Fair", href: "https://www.visitabuja.org/event/8th-african-traditional-food-fair/" },
    lastReviewed: "2026-10-06"
  },
  {
    slug: "abuja-international-film-festival-2026",
    title: "Abuja International Film Festival 2026: Dates, Venues & Planning",
    shortTitle: "Abuja International Film Festival",
    kind: "event",
    region: "Federal Capital Territory",
    summary: "The 23rd Abuja International Film Festival runs 20–24 October 2026, with screenings, premieres, masterclasses, industry discussions and awards across Abuja venues including Silverbird Cinemas.",
    intro: [
      "The 23rd Abuja International Film Festival is scheduled from 20 to 24 October 2026. Visit Abuja lists screenings and festival activity across Silverbird Cinemas in Central Area, Transcorp Hilton and the University of Abuja Mini Campus in Gwagwalada.",
      "Because the programme spans multiple venues, confirm the exact screening or session venue before travelling instead of assuming every event is at Silverbird."
    ],
    bestFor: ["Film", "Nollywood", "Creative industry", "October events"],
    highlights: [
      { name: "20–24 October 2026", detail: "The festival runs for five days in Abuja." },
      { name: "Film screenings & premieres", detail: "The programme brings African and international filmmakers together for screenings and premieres." },
      { name: "Masterclasses & industry sessions", detail: "The festival also includes professional discussions and learning sessions for filmmakers and creative-industry participants." },
      { name: "Multiple Abuja venues", detail: "Silverbird Cinemas is a listed venue, with additional activity at Transcorp Hilton and the University of Abuja Mini Campus in Gwagwalada." }
    ],
    planning: [
      { label: "Check the session venue", detail: "The venues are not all close together, especially Gwagwalada versus Central Area. Verify each programme item before setting out." },
      { label: "Allow travel buffers", detail: "Do not book back-to-back sessions in distant Abuja districts without realistic road time." },
      { label: "Verify ticket or accreditation rules", detail: "Screenings, premieres, awards and industry sessions may use different access arrangements." },
      { label: "Use the current festival programme", detail: "Check the festival's linked programme close to the date for screening times and late changes." }
    ],
    source: { label: "Visit Abuja — 23rd Abuja International Film Festival", href: "https://www.visitabuja.org/event/23rd-abuja-international-film-festival/" },
    lastReviewed: "2026-10-06"
  },
  {
    slug: "felabration-2026",
    title: "Felabration 2026 Lagos: New Afrika Shrine & Freedom Park",
    shortTitle: "Felabration 2026",
    kind: "itinerary",
    region: "Lagos State",
    summary: "Felabration runs 12–18 October 2026 with a main festival at New Afrika Shrine in Ikeja and a separate seven-night Underground System 5 programme at Freedom Park on Lagos Island. Compare the venues, entry details and routes before you go.",
    intro: [
      "Felabration is not one single venue this year. The New Afrika Shrine in Agidingbi/Ikeja hosts the main Fela celebration from 12 to 18 October, while Freedom Park on Lagos Island is promoting its own seven-night Underground System 5 music and arts programme over the same dates. They are different venues on opposite sides of Lagos: tickets, gates and line-ups should not be assumed interchangeable.",
      "Freedom Park's publicly circulated October 2026 programme lists daily shows from 6 pm and a ₦3,000 gate fee for Underground System 5, with rotating genres from Highlife and Jazz to Juju/Fuji, Reggae and Afrobeat. These terms are specific to the Freedom Park programme, not a price or admission guarantee for the New Afrika Shrine. Recheck the organiser's latest @freedomparklagos announcement before leaving.",
      "The free Dress Fela fashion competition at Freedom Park on Saturday 10 October is a separate earlier event; a free pre-event does not make the later 12–18 October Underground System concerts free. Late-night visitors should arrange a safe route home before attending either programme."
    ],
    bestFor: ["Live Afrobeat", "Fela Kuti history", "Lagos music events", "Festival travel"],
    highlights: [
      { name: "12–18 October — two festival venues", detail: "Main Felabration celebrations are scheduled at New Afrika Shrine in Agidingbi/Ikeja. Underground System 5 is a separate programme at Freedom Park on Lagos Island." },
      { name: "Freedom Park — 6 pm, ₦3,000 announced", detail: "The park's 2026 event promotions state a 6 pm daily start and ₦3,000 admission for Underground System 5. Confirm current entry rules and ticket handling with Freedom Park before paying." },
      { name: "Underground System programme", detail: "The advertised week features different musical traditions plus spoken word, open mic and a young-creative Gen Z Zone. Not every act performs on every night; check each day's official announcement." },
      { name: "New Afrika Shrine main programme", detail: "The Shrine is in Agidingbi/Ikeja, not Lagos Island. The announced main-festival dates are 12–18 October; its detailed daily line-up, entry and door times should be checked with its own organiser." },
      { name: "10 October Dress Fela", detail: "The fashion contest announced at Freedom Park at 4 pm is a free pre-festival event and should not be confused with the paid Underground System nights." }
    ],
    planning: [
      { label: "Choose Shrine or Freedom Park first", detail: "A trip across Lagos from Agidingbi to Lagos Island can take substantial time in evening traffic. Decide which programme and artist you actually want instead of treating both as one address." },
      { label: "Verify entry information by venue", detail: "Follow Freedom Park's official @freedomparklagos posts for the Underground System start, ticket rules and performers; separately verify the New Afrika Shrine programme with Felabration organisers. Do not pay resellers offering a supposedly universal Felabration pass." },
      { label: "Plan for return transport", detail: "Arrange a pick-up or reliable ride before the show. Agree on a meeting point outside busy venue gates; allow extra travel time after late performances." },
      { label: "Expect differing daily performances", detail: "Freedom Park's announcements include Highlife, Jazz, Juju/Fuji, Reggae and Afrobeat nights as well as poetry and younger-artist showcases. Confirm the day-specific performers rather than assuming a headline act is present throughout the week." },
      { label: "Check if a pre-event is free", detail: "The free 10 October Dress Fela listing does not change the separate advertised ₦3,000 Freedom Park concert-night fee. Check date and organiser before travelling." }
    ],
    source: { label: "Freedom Park Lagos — official venue event announcements", href: "https://www.instagram.com/freedomparklagos/" },
    lastReviewed: "2026-10-10"
  },
  {
    slug: "design-week-lagos-2026",
    title: "Design Week Lagos 2026: 18–25 October Dates, National Theatre Sessions",
    shortTitle: "Design Week Lagos 2026",
    kind: "itinerary",
    region: "Lagos State",
    summary: "Design Week Lagos runs 18–25 October across Lagos. The National Theatre's published detailed exhibition-and-talk schedule is concentrated on 22–25 October; distinguish the full festival week from the main hall programme before booking.",
    intro: [
      "Design Week Lagos 2026 is officially scheduled for 18–25 October, with exhibitions, workshops, designer showcases, creative-industry talks and partner activities across the city. The National Theatre in Iganmu is the principal hub, not the only place where festival-related activities can happen.",
      "The National Theatre's current event listing gives a specific Hall programme from Thursday 22 to Sunday 25 October. It lists a provisional daily window of 10 am–6 pm, but warns that timings can vary. That four-day hall schedule is only one part of the wider eight-day festival; do not assume every Design Week activity starts at the National Theatre on 18 October.",
      "For anyone choosing between exhibitions and talks, the detailed published agenda is particularly useful: Thursday focuses on industrialisation, SMEs and architecture; Friday explores products, interior design and textile/craft manufacturing; Saturday includes an African design and interiors focus; Sunday adds a student competition. Check the organiser's registration page for the ticket category and final session times."
    ],
    bestFor: ["Architecture", "Design & manufacturing", "Creative industry", "Student competitions", "Exhibitions"],
    highlights: [
      { name: "18–25 October — full festival week", detail: "The organiser's official website publishes this eight-day window across Lagos. Individual partner events can have different venues and attendance rules." },
      { name: "22 October — industry & architecture talks", detail: "National Theatre programme: Made by Design and Design & Innovation exhibitions alongside Industrialisation Day, SME Day and Architecture Day talks / press activities." },
      { name: "23 October — product, interiors & textiles", detail: "National Theatre programme: continuing exhibitions, design products and global markets, an interior-design forum and workshops on craft, textiles and industrial production." },
      { name: "24 October — African design networks", detail: "National Theatre programme: exhibitions plus From Africa to the World and Interior Designers Association Nigeria (IDAN) talks, subject to the final timings." },
      { name: "25 October — student competition", detail: "National Theatre programme: the Made by Design and Design & Innovation exhibitions with the DWL Student Competition." },
      { name: "National Theatre, Iganmu", detail: "The hall events are listed at National Theatre. The official page presents a provisional 10 am to 6 pm programme; verify the registration confirmation for your session." }
    ],
    planning: [
      { label: "Pick a specific date and session", detail: "Thursday is best for industry and architecture; Friday for design products and interiors; Saturday for design networks; Sunday for the student competition. These are programme themes, not promises of admission to all sessions with one ticket." },
      { label: "Distinguish festival week from hall dates", detail: "Use designweeklagos.com for the full 18–25 October calendar and the National Theatre official listing for the scheduled 22–25 October Hall sessions." },
      { label: "Register with the official event partner", detail: "The National Theatre page sends attendees to the organiser's registration partner at tix.dot360.co. Check the live prices, tickets, admission requirements and confirmation before payment; no single entry price has been assumed here." },
      { label: "Check venue for each booking", detail: "Some showcases and partner events happen elsewhere in Lagos. Do not travel to Iganmu for a session unless its organiser confirms National Theatre as that session's venue." },
      { label: "Build in transit time", detail: "Traffic around the Iganmu arts district and cross-city evening travel may take longer during busy events. Leave time between bookings, especially if moving to another neighbourhood." }
    ],
    source: { label: "National Theatre — Design Week Lagos 22–25 October Hall programme", href: "https://nationaltheatre.gov.ng/event/register/design-week-lagos-2026/XzBl38MQ" },
    lastReviewed: "2026-10-10"
  },
  {
    slug: "lagos-fashion-week-2026",
    title: "Lagos Fashion Week 2026 Guide: Dates & Planning",
    shortTitle: "Lagos Fashion Week 2026",
    kind: "itinerary",
    region: "Lagos State",
    summary: "Plan around the announced Lagos Fashion Week 2026 dates of 28 October to 1 November, then verify the live runway, venue and access schedule before attending.",
    intro: [
      "Lagos Fashion Week has announced 28 October to 1 November for its 2026 edition.",
      "The detailed runway, off-site, exhibition and access schedule can change as the event approaches, so use this page as a planning hub and confirm each final venue and entry condition with Lagos Fashion Week."
    ],
    bestFor: ["Fashion", "Runway", "Creative industry", "October events"],
    highlights: [
      { name: "28 October–1 November 2026", detail: "Lagos Fashion Week has published these dates for the 2026 edition." },
      { name: "Runway & designer showcases", detail: "The event traditionally combines runway presentations with wider fashion-industry programming." },
      { name: "Off-site events", detail: "Some Fashion Week activity may happen away from the main venue, so check every listing rather than assuming one address." },
      { name: "Access varies", detail: "Registration, invitations or tickets can differ by event; verify the current rule before travelling." }
    ],
    planning: [
      { label: "Wait for the detailed schedule", detail: "Use the announced dates now for travel planning, but confirm the individual programme before committing to a venue." },
      { label: "Group nearby events", detail: "If the final calendar includes off-site shows, cluster them by area to reduce cross-city travel." },
      { label: "Confirm access", detail: "Do not assume every runway or industry event is open entry; check registration and invitation requirements." },
      { label: "Use official channels", detail: "Follow Lagos Fashion Week's website and official accounts for the final timetable and venue information." }
    ],
    source: { label: "Lagos Fashion Week official website", href: "https://lagosfashionweek.ng/" },
    lastReviewed: "2026-10-05"
  },

  {
    slug: "lagos",
    title: "Lagos Travel Guide",
    shortTitle: "Lagos",
    kind: "city",
    region: "Lagos State",
    summary: "Plan Lagos by area: culture, nature, beaches, art and food without turning the trip into one long traffic jam.",
    intro: [
      "Lagos rewards planning by neighbourhood. Pick one or two areas for each day instead of crossing the city repeatedly, and keep generous time around airport, bridge and rush-hour journeys.",
      "This starter guide focuses on durable places and planning decisions rather than fragile lists of today's hotel prices or venue opening hours.",
    ],
    bestFor: ["Art & culture", "Beaches", "Food", "Short city breaks"],
    highlights: [
      { name: "Lekki Conservation Centre", detail: "A nature-focused stop on the Lekki axis with forest walks and elevated walkways. Confirm current admission and operating details before setting out." },
      { name: "Nike Art Gallery", detail: "A strong starting point for Nigerian visual art and craft in Lagos, especially if you want an indoor cultural stop." },
      { name: "National Museum Lagos", detail: "Useful for historical context before exploring the city's newer creative and commercial districts." },
      { name: "Tarkwa Bay", detail: "A beach outing normally reached by boat. Use a reputable operator, confirm return arrangements and check weather before departure." },
    ],
    planning: [
      { label: "Cluster your day", detail: "Plan Island, Lekki/Victoria Island and Mainland stops in separate blocks where possible." },
      { label: "Build in traffic time", detail: "Do not schedule airport transfers, cinema tickets or reservations back-to-back with cross-city journeys." },
      { label: "Treat water trips separately", detail: "Confirm boat operator, boarding point, return time, weather and life-jacket arrangements before a beach or waterfront trip." },
      { label: "Keep a return plan", detail: "For late outings, decide how you are getting back before you leave rather than depending on last-minute availability." },
      { label: "With children, choose accessible stops", detail: "Review the operator's age, walking, food and facilities guidance before selecting a beach or raised walkway. A family afternoon needs fewer stops and a dependable return route." },
      { label: "Choose Island, Mainland or Lekki", detail: "Treat long cross-city travel as a real part of the itinerary. The dedicated things-to-do guide contains a more specific one- or two-day sequence for different groups." },
    ],
    source: { label: "Lagos State Ministry of Tourism, Arts & Culture", href: "https://tourismartandculture.lagosstate.gov.ng/" },
    lastReviewed: "2026-10-09",
  },
  {
    slug: "abuja",
    title: "Abuja Travel Guide",
    shortTitle: "Abuja",
    kind: "city",
    region: "Federal Capital Territory",
    summary: "A practical Abuja guide for parks, lakes, landmarks, neighbourhood dining and easy day planning around the capital.",
    intro: [
      "Abuja is easier to enjoy when you group stops by district and leave time for security checks around formal government areas.",
      "The city mixes monumental landmarks with parks, lakes, markets, galleries, restaurants and nearby hills, so a balanced itinerary can work well even on a short stay.",
    ],
    bestFor: ["City breaks", "Parks", "Landmarks", "Dining"],
    highlights: [
      { name: "Millennium Park", detail: "A central green-space stop that works well as a low-pressure break between busier parts of an Abuja day." },
      { name: "Jabi Lake", detail: "A waterfront area for relaxed afternoons, dining and recreation; check any activity operator directly before booking." },
      { name: "National Mosque & National Christian Centre", detail: "Major city landmarks. Be respectful of worship, dress requirements, photography rules and restricted areas." },
      { name: "Arts and craft shopping", detail: "Abuja has established craft and market options; compare quality and prices and keep valuables secure in busy areas." },
    ],
    planning: [
      { label: "Plan by district", detail: "Maitama, Wuse, Central Area, Jabi and Gwarinpa can be far enough apart to make poor sequencing expensive in time." },
      { label: "Respect controlled areas", detail: "Government and diplomatic zones may have photography, parking or access restrictions." },
      { label: "Check the weather", detail: "Heat and heavy rainy-season storms can change the best time for parks, hills and lake activities." },
      { label: "Arrange return transport", detail: "For evening plans or less central stops, confirm your return option before staying late." },
      { label: "For a family outing, confirm suitability", detail: "Choose park and lake activities with the children's ages and available supervision in mind. Verify the current operator's access and charges before leaving." },
      { label: "For couples and first-time visitors", detail: "An achievable park, lakeside or gallery visit is often better than several cross-district stops. Use the dedicated Abuja activity guide for a city-centred day." },
    ],
    source: { label: "Visit Abuja visitor information", href: "https://www.visitabuja.org/about-abuja/" },
    lastReviewed: "2026-10-09",
  },
  {
    slug: "benin-city",
    title: "Benin City Travel Guide",
    shortTitle: "Benin City",
    kind: "city",
    region: "Edo State",
    summary: "Explore Benin City's royal history, bronze-casting tradition, museums and wider Edo heritage with the right cultural context.",
    intro: [
      "Benin City is strongest as a heritage trip. The best experience comes from understanding the Benin Kingdom, its art traditions and the living cultural institutions behind the places you visit.",
      "Some heritage locations are active royal, religious or community spaces rather than conventional tourist attractions, so access and photography rules should be treated seriously.",
    ],
    bestFor: ["History", "Benin art", "Culture", "Heritage"],
    highlights: [
      { name: "Benin City National Museum", detail: "A useful first stop for historical context and collections connected to Benin and wider Nigerian heritage." },
      { name: "Igun Street", detail: "Known for the city's bronze-casting tradition and craft workshops; ask before photographing people or workspaces." },
      { name: "Oba's Palace area", detail: "Central to Benin's living royal institution. Visit only areas open to the public and follow local guidance." },
      { name: "Great Benin earthworks", detail: "The historic moat and earthwork system is part of the city's larger heritage story; access varies by section." },
    ],
    planning: [
      { label: "Start with context", detail: "A museum or knowledgeable local guide can make later heritage stops much more meaningful." },
      { label: "Ask before photographing", detail: "Royal, sacred and workshop settings may restrict photography even when the surrounding area is public." },
      { label: "Separate city and day trips", detail: "Okomu and other Edo attractions sit outside the central city and need their own transport plan." },
      { label: "Confirm access", detail: "Palace-related and heritage sites can change visitor access for ceremonies, maintenance or local events." },
      { label: "A heritage-focused first day", detail: "Build the day around the museum, then Igun Street's bronze-casting tradition and any palace-area access open to the public. Treat ceremonial spaces and workshop photography respectfully." },
      { label: "Do not combine Okomu casually", detail: "Okomu National Park is a separate nature excursion outside Benin City; confirm current access, permitted routes and reliable transport before booking." },
    ],
    source: { label: "Edo State Government tourism overview", href: "https://edostate.gov.ng/visit-edo-state-to-enjoy-her-unique-hospitality-and-tourism-signature/" },
    lastReviewed: "2026-10-09",
  },
  {
    slug: "calabar",
    title: "Calabar Nigeria Travel Guide: Places to Visit & Things to Do",
    shortTitle: "Calabar",
    kind: "city",
    region: "Cross River State",
    summary: "Calabar, Nigeria is the Cross River State capital and a gateway to Efik culture, waterfront history, Carnival Calabar and wider rainforest and mountain trips across the state.",
    intro: [
      "Calabar is the capital of Cross River State in southern Nigeria. The city works as both a heritage-focused break and a base for wider Cross River travel, with museum stops, waterfront leisure, Efik food and culture, and the state's best-known December festival season.",
      "For 2026, Carnival Calabar's official state schedule starts on 30 November, with the signature Cultural Carnival, Junior Carnival, Parade of Bands and Bikers Carnival running from 26 to 29 December. If you are travelling for that period, book transport and accommodation early and use the current official schedule rather than old carnival calendars.",
    ],
    bestFor: ["History", "Culture", "Waterfront", "December travel"],
    highlights: [
      { name: "Marina Resort", detail: "A waterfront leisure area in Calabar with recreation and visitor facilities; individual attractions inside can change, so check what is operating." },
      { name: "Slave History Museum", detail: "A history-focused stop connected to Calabar's role in the transatlantic slave trade." },
      { name: "Old Residency / museum circuit", detail: "Useful for understanding colonial-era and regional history before moving into modern Calabar." },
      { name: "Carnival Calabar 2026", detail: "The official Cross River calendar places the Cultural Carnival on 26 December, Junior Carnival on 27 December, main Parade of Bands on 28 December and Bikers Carnival on 29 December." },
      { name: "Wider Cross River trips", detail: "Calabar can be a base for planning rainforest, wildlife and mountain destinations elsewhere in the state." },
    ],
    planning: [
      { label: "December needs early booking", detail: "Carnival and festive-season demand can change transport, hotel availability and road conditions." },
      { label: "Check rainfall", detail: "Outdoor and rainforest plans are more comfortable when you account for wet-season conditions." },
      { label: "Do not overpack day trips", detail: "Cross River destinations can involve substantial road travel; give major excursions a full day or more." },
      { label: "Verify individual attractions", detail: "Facilities inside resorts and leisure complexes can open, close or undergo redevelopment independently." },
      { label: "Separate the city from Cross River mountain trips", detail: "Calabar's waterfront and historical destinations work for an urban stay. Obudu and rainforest attractions need a longer journey and should not be promised as simple city excursions." },
    ],
    source: { label: "Calabar Municipal tourist attractions", href: "https://calabar.municipal.crossriverstate.gov.ng/tourist-attractions" },
    lastReviewed: "2026-10-06",
  },
  {
    slug: "port-harcourt",
    title: "Port Harcourt Travel Guide",
    shortTitle: "Port Harcourt",
    kind: "city",
    region: "Rivers State",
    summary: "Use Port Harcourt as a base for parks, food, culture and carefully planned waterfront or riverine excursions.",
    intro: [
      "Port Harcourt is best approached as both an urban destination and a gateway to Rivers State. Build the city part around food, parks and cultural experiences, then plan riverine or coastal trips separately.",
      "Water-based excursions need more preparation than ordinary city sightseeing: use an established operator and confirm transport, weather and local access conditions.",
    ],
    bestFor: ["Food", "Parks", "Culture", "Riverine trips"],
    highlights: [
      { name: "Port Harcourt Pleasure Park", detail: "A major urban recreation stop that works well for families, relaxed afternoons and a break from road-heavy sightseeing." },
      { name: "City food culture", detail: "Build time around Rivers cuisine rather than treating meals as an afterthought; ask locals for current, well-regarded options." },
      { name: "Bonny Island planning", detail: "A historically and economically significant island trip that requires transport and access planning rather than a spontaneous detour." },
      { name: "Rivers coastal destinations", detail: "The state tourism agency highlights destinations beyond the city; use local guidance for current routes and conditions." },
    ],
    planning: [
      { label: "Separate land and water days", detail: "Do not make a riverine trip depend on a tight city schedule." },
      { label: "Use established operators", detail: "For boats and remote coastal stops, verify the operator, boarding point, life-jacket arrangements and return plan." },
      { label: "Watch the weather", detail: "Heavy rainfall can affect road, water and outdoor plans quickly." },
      { label: "Ask about local access", detail: "Conditions for specific riverine communities or sites may change; current local guidance matters." },
    ],
    source: { label: "Rivers State Tourism Development Agency", href: "https://rstda.rv.gov.ng/" },
    lastReviewed: "2026-09-29",
  },
  {
    slug: "kano",
    title: "Kano Travel Guide",
    shortTitle: "Kano",
    kind: "city",
    region: "Kano State",
    summary: "Discover Kano's old-city history, markets, museums and landmarks with practical guidance on culture, dress and photography.",
    intro: [
      "Kano's strongest visitor experience is cultural and historical. The old city, markets and museums make more sense when you understand the city's long role in trans-Saharan trade and Hausa history.",
      "Dress and behaviour should fit the local setting, particularly around religious, royal and traditional spaces.",
    ],
    bestFor: ["History", "Markets", "Architecture", "Culture"],
    highlights: [
      { name: "Gidan Makama Museum", detail: "A key place to build context around Kano's history, traditional architecture and material culture." },
      { name: "Kurmi Market", detail: "A historic commercial area whose long trading tradition remains part of Kano's identity." },
      { name: "Dala Hill", detail: "Closely connected to the early history of Kano; plan the visit in cooler parts of the day." },
      { name: "Old-city walls and gates", detail: "Use them as part of a wider old-city route rather than isolated photo stops, and ask before photographing people." },
    ],
    planning: [
      { label: "Dress for the setting", detail: "Modest clothing is the practical choice for markets, traditional areas and religious landmarks." },
      { label: "Ask before photographing", detail: "People, worship spaces, royal areas and some security-sensitive locations may not welcome photography." },
      { label: "Plan for heat", detail: "Outdoor walking is easier earlier or later in the day, with water and sun protection." },
      { label: "Allow for prayer times", detail: "Friday prayers and daily worship can affect traffic, opening patterns and access around major religious areas." },
    ],
    source: { label: "Kano State Government history", href: "https://kanostate.gov.ng/history/" },
    lastReviewed: "2026-09-29",
  },
  {
    slug: "jos",
    title: "Jos Travel Guide",
    shortTitle: "Jos",
    kind: "city",
    region: "Plateau State",
    summary: "Plan a Jos highland break around museums, wildlife, rock formations, cooler weather and wider Plateau scenery.",
    intro: [
      "Jos and the Plateau reward travellers who mix city stops with outdoor scenery. The climate can feel different from much of Nigeria, but rain, fog and road conditions still need to be part of your plan.",
      "For hills, rocks and less formal nature sites, local guidance is more valuable than relying on an old blog post or map pin.",
    ],
    bestFor: ["Highlands", "Hiking", "Museums", "Nature"],
    highlights: [
      { name: "Jos Museum", detail: "A foundational cultural stop for Plateau and Nigerian history before heading to outdoor sites." },
      { name: "Jos Wildlife Park", detail: "A long-established recreation and wildlife stop; confirm current visitor conditions before travelling." },
      { name: "Shere Hills", detail: "A major Plateau highland destination for scenery and climbing; go with appropriate local guidance for the route you choose." },
      { name: "Riyom Rock", detail: "A distinctive rock formation south of Jos that fits naturally into a broader Plateau road trip." },
    ],
    planning: [
      { label: "Pack for changing weather", detail: "Highland conditions can shift quickly, especially in the rainy season and around exposed viewpoints." },
      { label: "Use local guidance outdoors", detail: "For hiking or unfamiliar rock routes, do not depend only on a map pin." },
      { label: "Keep road time realistic", detail: "Plateau attractions can be spread across different local-government areas." },
      { label: "Check current access", detail: "Nature sites and parks may change opening or access arrangements; verify shortly before travel." },
    ],
    source: { label: "Visit Plateau tourism platform", href: "https://visitplateau.com/" },
    lastReviewed: "2026-09-29",
  },
  {
    slug: "enugu",
    title: "Enugu Travel Guide",
    shortTitle: "Enugu",
    kind: "city",
    region: "Enugu State",
    summary: "Explore Enugu's hills, forests, lakes and nearby waterfalls while accounting for ongoing tourism upgrades and road travel.",
    intro: [
      "Enugu is a strong base for a nature-heavy break because several of its best-known attractions sit outside the dense city centre.",
      "The state has been upgrading tourism sites, so current access can differ from older travel posts. Verify the specific site before building a day around it.",
    ],
    bestFor: ["Nature", "Hills", "Waterfalls", "Weekend breaks"],
    highlights: [
      { name: "Ngwo Pine Forest", detail: "A popular forest-and-cave outing near Enugu. Confirm current access and any redevelopment work before travelling." },
      { name: "Nike Lake", detail: "A calmer city-side option that can balance a trip dominated by road journeys and hikes." },
      { name: "Milken Hills", detail: "Known for views over Enugu; use a safe access route and avoid relying on an unverified shortcut." },
      { name: "Awhum Waterfall & Cave", detail: "A well-known day-trip destination outside central Enugu. Check access status, road conditions and local rules in advance." },
    ],
    planning: [
      { label: "Verify upgraded sites", detail: "Enugu State has announced tourism redevelopment at several natural attractions, so old directions may be outdated." },
      { label: "Give nature trips a full block", detail: "Do not squeeze waterfalls or forest trips between fixed city appointments." },
      { label: "Prepare for rain", detail: "Trails, rocks and access roads can change significantly after heavy rainfall." },
      { label: "Use known access routes", detail: "For hills and caves, prefer current local guidance over unofficial shortcuts." },
    ],
    source: { label: "Enugu State Government 2026 tourism update", href: "https://enugustate.gov.ng/2025/12/02/full-text-of-the-proposed-2026-budget-of-renewed-momentum-presented-by-governor-peter-mbah-to-the-house-of-assembly-today/" },
    lastReviewed: "2026-09-29",
  },
  {
    slug: "obudu-mountain-resort",
    title: "Obudu Mountain Resort Guide",
    shortTitle: "Obudu Mountain Resort",
    kind: "destination",
    region: "Cross River State",
    summary: "Plan Obudu as a mountain destination, with realistic transport, weather and facility checks before the long journey.",
    intro: [
      "Obudu is a destination trip rather than a quick Calabar add-on. Road logistics, accommodation, mountain weather and the status of individual resort facilities should all be confirmed before departure.",
      "Cross River State announced a new concession and rehabilitation programme in 2026, including work on the cable car and hospitality infrastructure. Do not assume every legacy attraction is operating simply because it appears in older travel material.",
    ],
    bestFor: ["Mountain scenery", "Nature", "Resort stays", "Long weekends"],
    highlights: [
      { name: "Highland viewpoints", detail: "The mountain landscape is the core reason to visit; give yourself enough daylight to enjoy it rather than arriving late and leaving early." },
      { name: "Becheve Nature Reserve", detail: "One of the nature-oriented experiences associated with the resort area; confirm guided-access arrangements locally." },
      { name: "Nature walks", detail: "Shorter guided walks can be a better choice than trying to cover every attraction in one day." },
      { name: "Resort recreation", detail: "Facilities can change during rehabilitation. Confirm what is actually open for your dates before paying or travelling." },
    ],
    planning: [
      { label: "Confirm transport end-to-end", detail: "Plan the full road journey, fuel stops, driver arrangements and arrival time before setting out." },
      { label: "Check mountain weather", detail: "Visibility, rain and cooler temperatures can change what you can comfortably do." },
      { label: "Verify cable-car status", detail: "The state announced cable-car rehabilitation in 2026, so direct confirmation is essential before making it central to your itinerary." },
      { label: "Confirm rooms and facilities", detail: "Get current accommodation and activity confirmation directly from the resort or operator, not from an old listing." },
      { label: "Do not quote old resort rates", detail: "Get a direct dated price and confirmation for the exact room and visit period; transport, guiding and activity charges are different expenses, so there is no single guaranteed price per person." },
      { label: "Confirm 2026 rehabilitation impacts", detail: "The state announced work on the resort and cable car. Confirm operational facilities and booking/payment instructions with the responsible operator before departure." },
    ],
    source: { label: "Cross River State 2026 Obudu rehabilitation update", href: "https://news.crossriverstate.gov.ng/obudu-ranch-concession-will-transform-obanliku-create-jobs-boost-tourism-gov-otu/" },
    lastReviewed: "2026-10-09",
  },
  {
    slug: "yankari-game-reserve",
    title: "Yankari Game Reserve Guide",
    shortTitle: "Yankari Game Reserve",
    kind: "destination",
    region: "Bauchi State",
    summary: "Prepare for wildlife viewing, Wikki Warm Spring and a multi-day reserve visit with the right season and logistics.",
    intro: [
      "Yankari is one of Nigeria's best-known wildlife destinations and is far enough from Bauchi city that it should be planned as its own trip.",
      "Bauchi State notes that wildlife viewing is generally better in the dry season, when animals are more likely to gather around water sources. Always confirm current reserve rules, accommodation and guided-drive arrangements.",
    ],
    bestFor: ["Wildlife", "Warm spring", "Nature", "Multi-day trips"],
    highlights: [
      { name: "Wildlife viewing", detail: "The reserve is known for species including elephants, baboons, buffalo and other wildlife; sightings are never guaranteed." },
      { name: "Wikki Warm Spring", detail: "A signature Yankari attraction and a natural break from vehicle-based wildlife activities." },
      { name: "Marshall Caves", detail: "Part of the wider historical and natural-interest circuit within the reserve." },
      { name: "Dry-season planning", detail: "Bauchi State tourism guidance says wildlife is generally easier to watch between November and May." },
    ],
    planning: [
      { label: "Plan more than a few hours", detail: "The travel distance and reserve scale make an overnight or multi-day plan more practical than a rushed stop." },
      { label: "Confirm guided activities", detail: "Check the current process for game drives, guides, vehicle requirements and restricted areas." },
      { label: "Book accommodation directly", detail: "Verify room availability and payment instructions using current reserve or official channels." },
      { label: "Pack for wildlife conditions", detail: "Bring water, sun protection, suitable footwear and realistic expectations about sightings." },
    ],
    source: { label: "Bauchi State Government tourism guide", href: "https://www.bauchistate.gov.ng/tourism/" },
    lastReviewed: "2026-09-29",
  },
  {
    slug: "weekend-trips-from-lagos",
    title: "Weekend Trips from Lagos",
    shortTitle: "Weekend trips from Lagos",
    kind: "itinerary",
    region: "South West Nigeria",
    summary: "Choose a weekend escape from Lagos by travel effort, trip style and how much road time you actually want.",
    intro: [
      "A good Lagos weekend trip is not just a list of places. The deciding factor is how much of the weekend you are willing to spend in traffic or on the road.",
      "Leave Friday-night and Sunday-return congestion in your plan, and verify accommodation or attraction access before driving several hours for a single stop.",
    ],
    bestFor: ["2-day breaks", "Road trips", "Heritage", "Nature"],
    highlights: [
      { name: "Badagry heritage day or overnight", detail: "A history-focused option within Lagos State. Build the trip around verified heritage sites instead of trying to rush every stop." },
      { name: "Abeokuta & Olumo Rock", detail: "A classic Ogun State city-and-landmark combination that can work as a full day or relaxed overnight." },
      { name: "Epe and the eastern Lagos axis", detail: "A lower-intensity option if your priority is food, water-side scenery and a slower pace rather than a long interstate drive." },
      { name: "Ibadan city break", detail: "Works better as an overnight when you want food, culture and multiple city stops rather than one attraction." },
    ],
    planning: [
      { label: "Choose by road time", detail: "Pick the destination that leaves enough of the weekend for the actual experience, not just the drive." },
      { label: "Avoid optimistic departure times", detail: "Friday evenings and Sunday returns can add major delays; leave margin around check-in and tickets." },
      { label: "Verify the anchor attraction", detail: "If one attraction is the reason for the trip, confirm its access before committing to the journey." },
      { label: "Keep the return simple", detail: "Do not stack a final late activity onto the same day as a long drive back into Lagos." },
    ],
    source: { label: "Lagos State Ministry of Tourism, Arts & Culture", href: "https://tourismartandculture.lagosstate.gov.ng/" },
    lastReviewed: "2026-09-29",
  },
  {
    slug: "ibadan",
    title: "Ibadan Travel Guide",
    shortTitle: "Ibadan",
    kind: "city",
    region: "Oyo State",
    summary: "Explore Ibadan through its hilltop views, civic landmarks, gardens, museums and strong food culture without overpacking the day.",
    intro: [
      "Ibadan is spread out, so the best plan is to group heritage stops around the older city and pair them with one or two more relaxed attractions rather than crossing town repeatedly.",
      "The city works well as an overnight from Lagos when you want enough time for history, food and a slower afternoon without turning the trip into a return-road sprint.",
    ],
    bestFor: ["History", "City breaks", "Food", "Viewpoints"],
    highlights: [
      { name: "Bower's Tower", detail: "A hilltop landmark on Oke-Are with broad views over Ibadan; confirm access conditions before climbing." },
      { name: "Agodi Gardens", detail: "A central leisure stop that works well for a quieter afternoon between busier city activities." },
      { name: "National Museum of Unity", detail: "A useful cultural stop for Nigerian history and material culture." },
      { name: "Mapo Hall", detail: "One of Ibadan's major civic landmarks and an easy anchor for exploring the older city." },
    ],
    planning: [
      { label: "Group the old city", detail: "Mapo, Oke-Are and nearby heritage areas are easier to combine than mixing them with far-out stops." },
      { label: "Leave road margin", detail: "Traffic can build quickly around major junctions, markets and intercity approaches." },
      { label: "Confirm attraction access", detail: "Some heritage sites have variable opening or guided-access arrangements." },
      { label: "Stay overnight if possible", detail: "An overnight makes food, culture and multiple attractions much easier to enjoy than a rushed day return." },
    ],
    source: { label: "Oyo State Government tourism overview", href: "https://oyostate.gov.ng/about-oyo-state/" },
    lastReviewed: "2026-09-29",
  },
  {
    slug: "abeokuta",
    title: "Abeokuta Travel Guide",
    shortTitle: "Abeokuta",
    kind: "city",
    region: "Ogun State",
    summary: "Plan Abeokuta around Egba history, adire culture and the city's best-known rock landmark.",
    intro: [
      "Abeokuta is compact enough for a focused heritage day, but it is more rewarding when you leave time for both Olumo Rock and the living craft and royal traditions around the older city.",
      "Use Olumo Rock as one anchor rather than the whole trip; the markets, palace area and historic halls add much more context.",
    ],
    bestFor: ["Heritage", "Craft", "Day trips", "Rock landscapes"],
    highlights: [
      { name: "Olumo Rock", detail: "The city's best-known landmark and a natural viewpoint tied closely to Egba history." },
      { name: "Itoku Adire Market", detail: "A practical place to see and buy adire textiles; compare quality and ask before photographing traders." },
      { name: "Alake's Palace", detail: "A living royal institution in Ake; respect access rules, ceremonies and photography restrictions." },
      { name: "Centenary Hall", detail: "A historic civic building in the Ake area that fits naturally into a heritage-focused city circuit." },
    ],
    planning: [
      { label: "Start early", detail: "Outdoor climbing and market visits are more comfortable before the hottest part of the day." },
      { label: "Pair nearby heritage stops", detail: "Ake and Itoku can be combined more efficiently than repeatedly crossing the city." },
      { label: "Ask before photographing", detail: "Markets, palace spaces and craft workshops can have local rules or preferences." },
      { label: "Check Olumo access", detail: "Verify current entrance, guide and facility arrangements before travelling primarily for the rock." },
      { label: "A sensible Olumo Rock outing", detail: "Begin with the rock in daylight when access is confirmed, then pair nearby Ake heritage and Itoku adire stops without assuming all workshops permit photography." },
      { label: "Verify Olumo Rock ticket details", detail: "Admission, site guidance and facility availability can change. Obtain the current official operator's charges before committing to a trip; older online figures are not reliable prices." },
    ],
    source: { label: "Ogun State investment and tourism update", href: "https://invest.ogunstate.gov.ng/blogdetails?id=7" },
    lastReviewed: "2026-10-09",
  },
  {
    slug: "osogbo",
    title: "Osogbo Travel Guide",
    shortTitle: "Osogbo",
    kind: "city",
    region: "Osun State",
    summary: "Explore Osogbo through the Sacred Grove, Yoruba art, palace heritage and the city's long connection to the Osun festival.",
    intro: [
      "Osogbo's strongest visitor experience comes from treating culture as the centre of the trip rather than as a quick photo stop.",
      "The Sacred Grove, artists and traditional institutions are living cultural spaces, so respectful behaviour and attention to access rules matter.",
    ],
    bestFor: ["Yoruba culture", "Art", "Heritage", "Festivals"],
    highlights: [
      { name: "Osun-Osogbo Sacred Grove", detail: "A UNESCO World Heritage cultural landscape and the city's most important heritage site." },
      { name: "Nike Art Centre Osogbo", detail: "A strong stop for local art traditions, textiles and the wider Osogbo school of creativity." },
      { name: "Ataoja Palace", detail: "A living royal institution connected to Osogbo's history and the Osun festival." },
      { name: "Osun-Osogbo Festival", detail: "The annual festival draws large crowds; verify dates and plan accommodation and transport early." },
    ],
    planning: [
      { label: "Treat sacred spaces respectfully", detail: "Follow local guidance around worship areas, photography and ceremonial activity." },
      { label: "Festival travel needs planning", detail: "Crowds, traffic and accommodation demand rise sharply around the Osun-Osogbo festival." },
      { label: "Add an art stop", detail: "Pairing the grove with Osogbo's art centres gives the city visit more context." },
      { label: "Confirm same-day access", detail: "Palace or cultural-site access can change around ceremonies and maintenance." },
    ],
    source: { label: "Osun State tourist centres", href: "https://www.osunstate.gov.ng/tourist-centres/" },
    lastReviewed: "2026-09-29",
  },
  {
    slug: "ile-ife",
    title: "Ile-Ife Heritage Guide",
    shortTitle: "Ile-Ife",
    kind: "city",
    region: "Osun State",
    summary: "A heritage-focused Ile-Ife guide for royal history, museums, monuments and major Yoruba cultural sites.",
    intro: [
      "Ile-Ife is best approached as a living heritage city, not just a checklist of monuments.",
      "Many important locations remain active royal or spiritual spaces, so visitor access, dress, photography and ceremony rules should be confirmed locally.",
    ],
    bestFor: ["Yoruba history", "Museums", "Royal heritage", "Culture"],
    highlights: [
      { name: "Ooni of Ife Palace", detail: "The royal centre of Ile-Ife and one of the city's most important living institutions." },
      { name: "National Museum Ile-Ife", detail: "A useful stop for archaeological and artistic context before visiting other heritage locations." },
      { name: "Moremi Statue of Liberty", detail: "A prominent monument honouring Moremi Ajasoro and a clear visual landmark in the city." },
      { name: "Oranmiyan Staff", detail: "One of Ile-Ife's well-known historic monuments and part of the wider royal-heritage circuit." },
    ],
    planning: [
      { label: "Ask about palace access", detail: "Royal ceremonies and official activity can affect what visitors may see on a given day." },
      { label: "Start with the museum", detail: "Museum context helps make the city's monuments and artistic traditions easier to understand." },
      { label: "Respect sacred sites", detail: "Some locations are active spiritual spaces rather than conventional tourist attractions." },
      { label: "Keep the day focused", detail: "A small number of well-explained heritage stops is more useful than rushing through every landmark." },
    ],
    source: { label: "Osun State tourist centres", href: "https://www.osunstate.gov.ng/tourist-centres/" },
    lastReviewed: "2026-09-29",
  },
  {
    slug: "ondo-state-highlights",
    title: "Ondo State Nature & Heritage Guide",
    shortTitle: "Ondo State highlights",
    kind: "destination",
    region: "Ondo State",
    summary: "Build an Ondo State trip around Idanre Hills, Owo heritage and nature stops instead of treating the state as a single-city visit.",
    intro: [
      "Ondo State's strongest visitor circuit is spread across several towns and landscapes, so it works better as a road trip than as one tightly packed city itinerary.",
      "Idanre Hills is the obvious anchor, while Owo's museum heritage and nature areas around Akure add variety.",
    ],
    bestFor: ["Hiking", "Heritage", "Road trips", "Nature"],
    highlights: [
      { name: "Idanre Hills", detail: "A major natural and heritage site with a long climb, historic structures and wide views; plan footwear, water and weather carefully." },
      { name: "Owo Museum of Antiquities", detail: "A cultural stop focused on the history and artistic heritage of the old Owo Kingdom." },
      { name: "Akure Forest Reserve", detail: "A nature-focused option for travellers interested in forest environments and bird life." },
      { name: "Dry-season travel", detail: "Ondo State tourism guidance recommends the drier months for easier outdoor planning." },
    ],
    planning: [
      { label: "Treat it as a road circuit", detail: "Idanre, Owo and Akure are separate stops; build realistic driving time into the trip." },
      { label: "Prepare for the climb", detail: "Idanre is physically demanding for some visitors; take water and use suitable footwear." },
      { label: "Verify local guides", detail: "For hill, forest or heritage access, confirm current guide and entry arrangements locally." },
      { label: "Avoid overpacking one day", detail: "Give major nature sites enough time rather than trying to combine distant towns in one rushed loop." },
    ],
    source: { label: "Ondo State Government tourism", href: "https://ondostate.gov.ng/tourism" },
    lastReviewed: "2026-09-29",
  },
  {
    slug: "ekiti-nature-circuit",
    title: "Ekiti Nature & Springs Guide",
    shortTitle: "Ekiti nature circuit",
    kind: "destination",
    region: "Ekiti State",
    summary: "Plan an Ekiti road trip around warm springs, waterfalls, hills and quieter nature stops rather than trying to treat the state as one attraction.",
    intro: [
      "Ekiti's official tourism material highlights a cluster of springs, waterfalls, hills and heritage sites spread across several towns.",
      "A practical visit works best as a road circuit with realistic driving time and same-day checks for access, guides and weather conditions.",
    ],
    bestFor: ["Nature", "Waterfalls", "Hiking", "Road trips"],
    highlights: [
      { name: "Ikogosi Warm Springs", detail: "The state's best-known nature attraction, where warm and cold springs meet while retaining distinct temperatures." },
      { name: "Arinta Waterfalls", detail: "A waterfall area at Ipole-Iloro that fits naturally into an Ekiti West nature itinerary." },
      { name: "Fajuyi Memorial Park", detail: "A more accessible Ado-Ekiti stop that adds civic history to a nature-focused trip." },
      { name: "Olosunta & Orole Hills", detail: "Hill landscapes around Ikere-Ekiti for travellers interested in views and more active outings." },
    ],
    planning: [
      { label: "Use a road-trip plan", detail: "The attractions sit in different towns, so allow real travel time rather than stacking them tightly." },
      { label: "Check outdoor access", detail: "Rain, path conditions and local access arrangements can change the experience at waterfalls and hills." },
      { label: "Start major nature stops early", detail: "Earlier visits leave more daylight for walking, return travel and weather changes." },
      { label: "Verify resort facilities", detail: "For Ikogosi, confirm current accommodation, pool and visitor-facility availability directly before relying on them." },
    ],
    source: { label: "Ekiti State Bureau of Tourism Development", href: "https://www.ekitistate.gov.ng/bureau-of-tourism-development" },
    lastReviewed: "2026-09-29",
  },
  {
    slug: "kwara-highlights",
    title: "Kwara State Travel Highlights",
    shortTitle: "Kwara highlights",
    kind: "destination",
    region: "Kwara State",
    summary: "Combine Ilorin's landmarks with Kwara's waterfall and heritage sites using a realistic multi-stop road plan.",
    intro: [
      "Kwara combines city landmarks in Ilorin with nature and heritage attractions that sit much farther away.",
      "Keep Ilorin as one cluster and give Owu Falls or Esie their own travel block rather than assuming every attraction is close to the state capital.",
    ],
    bestFor: ["Waterfalls", "Heritage", "Architecture", "Road trips"],
    highlights: [
      { name: "Ilorin Central Mosque", detail: "A major city landmark that dominates the central Ilorin skyline; visit respectfully around worship activity." },
      { name: "Flower Garden", detail: "A government-recognised green-space and leisure location in Ilorin's GRA." },
      { name: "Owu Falls", detail: "A major waterfall attraction in the state that needs its own transport and outdoor-access plan." },
      { name: "Esie Museum", detail: "One of Kwara's key heritage attractions, known for its large collection of soapstone figures." },
    ],
    planning: [
      { label: "Separate Ilorin and rural stops", detail: "Owu Falls and Esie need more road time than city attractions." },
      { label: "Plan waterfall conditions", detail: "Weather and road conditions can affect access; verify locally before departure." },
      { label: "Respect worship spaces", detail: "Dress, photography and visitor movement at the Central Mosque should follow local guidance." },
      { label: "Avoid late rural returns", detail: "Build enough daylight into trips outside Ilorin for the return journey." },
    ],
    source: { label: "Kwara State Government tourism", href: "https://kwarastate.gov.ng/do-business/tourism/" },
    lastReviewed: "2026-09-29",
  },
  {
    slug: "uyo",
    title: "Uyo Travel Guide",
    shortTitle: "Uyo",
    kind: "city",
    region: "Akwa Ibom State",
    summary: "Explore Uyo through museums, arts, entertainment and the wider Akwa Ibom leisure circuit with simple city planning.",
    intro: [
      "Uyo is a manageable city base for culture and entertainment, and it also works as the starting point for wider Akwa Ibom coastal and heritage trips.",
      "The most useful short visit combines one cultural stop, one entertainment or leisure stop and enough time for local food rather than rushing between many venues.",
    ],
    bestFor: ["Culture", "Museums", "Food", "Leisure"],
    highlights: [
      { name: "Ibom Unity Museum", detail: "A state museum stop for Akwa Ibom history, culture and identity." },
      { name: "State Centre for Arts and Culture", detail: "A cultural venue on the Olusegun Obasanjo Way axis connected to the state's arts and performance scene." },
      { name: "Ibom Tropicana Entertainment Centre", detail: "A major Uyo entertainment complex on Udo Udoma Avenue." },
      { name: "Wider waterfront trips", detail: "Akwa Ibom tourism planning can extend beyond Uyo to riverine and coastal leisure areas; confirm transport before leaving the city." },
    ],
    planning: [
      { label: "Keep city stops close", detail: "Group central Uyo venues rather than making repeated cross-city trips." },
      { label: "Confirm opening hours", detail: "Museum, arts and entertainment venue schedules can change around events." },
      { label: "Plan coastal trips separately", detail: "Waterfront destinations outside Uyo need their own transport and return plan." },
      { label: "Check event calendars", detail: "Arts and entertainment venues are more useful when you know what is actually scheduled during your visit." },
    ],
    source: { label: "Akwa Ibom State tourism-site tour", href: "https://akwaibomstate.gov.ng/a-r-i-s-e-agenda-gov-umo-eno-tours-tourism-sites-vows-to-revamp-akwa-ibom-tourism-sector/" },
    lastReviewed: "2026-09-29",
  },
  {
    slug: "anambra-heritage-circuit",
    title: "Anambra Nature & Heritage Circuit",
    shortTitle: "Anambra heritage circuit",
    kind: "destination",
    region: "Anambra State",
    summary: "Plan Anambra around caves, lakes, waterfalls and Igbo heritage sites spread across several towns.",
    intro: [
      "Anambra's major tourism sites are distributed across the state rather than concentrated in Awka, so the right mental model is a road circuit.",
      "Official state tourism material highlights Ogbunike Caves, Agulu Lake, Owerre-Ezukala cave and waterfall, Igbo-Ukwu heritage and other natural sites.",
    ],
    bestFor: ["Caves", "Lakes", "Igbo heritage", "Road trips"],
    highlights: [
      { name: "Ogbunike Cave", detail: "A major cave system at Ogbunike and one of the state's best-known natural and cultural attractions." },
      { name: "Agulu Lake", detail: "A large lake at Agulu with strong local cultural significance and protected wildlife traditions." },
      { name: "Owerre-Ezukala Cave & Waterfall", detail: "A cave-and-waterfall destination in Orumba South highlighted by the state tourism ministry." },
      { name: "Igbo-Ukwu heritage", detail: "The wider Igbo-Ukwu area is important for archaeological history and bronze traditions." },
    ],
    planning: [
      { label: "Expect road travel", detail: "The major sites are in different local-government areas; do not plan them as a walkable cluster." },
      { label: "Use local guides at caves", detail: "Confirm access, footwear, water conditions and local guidance before entering cave systems." },
      { label: "Respect cultural rules", detail: "Some natural sites also have sacred or community significance; follow local instructions." },
      { label: "Check development status", detail: "Several Anambra tourism sites are being upgraded, so facilities and access can change." },
    ],
    source: { label: "Anambra State Ministry of Culture, Entertainment and Tourism", href: "https://anambrastate.gov.ng/ministry-of-culture-entertainment-and-tourism/" },
    lastReviewed: "2026-09-29",
  },



  {
    slug: "gashaka-gumti-national-park",
    title: "Gashaka-Gumti National Park Guide",
    shortTitle: "Gashaka-Gumti National Park",
    kind: "destination",
    region: "Taraba & Adamawa States",
    summary: "Plan a serious nature trip to Nigeria's largest national park with realistic road, guide, weather and park-access checks before departure.",
    intro: [
      "Gashaka-Gumti is Nigeria's largest national park. Nigeria Park Service lists it across Taraba and Adamawa states at 6,731 square kilometres, so it should be treated as a destination trip rather than a casual roadside stop.",
      "Remote nature travel changes quickly with weather, road and local access conditions. Confirm the exact park entry point, guide arrangements and current visitor advice with Nigeria Park Service before travelling.",
    ],
    bestFor: ["Wildlife", "Hiking", "Biodiversity", "Multi-day nature trips"],
    highlights: [
      { name: "Large protected landscape", detail: "At 6,731 sq km in the Nigeria Park Service overview, the park covers a much larger area than a conventional city attraction and needs realistic travel time." },
      { name: "Biodiversity", detail: "The park is promoted nationally for its rich fauna, flora and nature experiences; use park guidance rather than attempting unfamiliar routes independently." },
      { name: "Highland scenery", detail: "Its position around the Taraba-Adamawa highland zone makes landscape and nature observation central to the visit." },
      { name: "Conservation-focused visit", detail: "Treat wildlife encounters as observation, follow ranger instructions and avoid disturbing animals or habitats." },
    ],
    planning: [
      { label: "Contact the park first", detail: "Confirm the current visitor entrance, opening arrangements, guide/ranger requirements and any charges before starting the road journey." },
      { label: "Plan transport end-to-end", detail: "Do not assume ordinary ride-hailing or same-day return transport will be practical for a remote national-park trip." },
      { label: "Check weather and roads", detail: "Rain can materially change road and trail conditions; build daylight and contingency time into the trip." },
      { label: "Check current local advice", detail: "For any remote trip, confirm current access and security conditions with the park or relevant authorities shortly before departure." },
      { label: "Agree on the park entrance", detail: "The park spans Taraba and Adamawa. Confirm an approved visitor entrance, reachable road, guide/ranger contact and overnight arrangements before booking transport: not every nearby route is a public entry point." },
      { label: "Budget time for a guided trip", detail: "Plan the outward and return legs separately, carry appropriate water and weather protection, and ask park staff which trails are open. Avoid unescorted wildlife walks or an assumed same-day return from a distant city." },
    ],
    source: { label: "Nigeria Park Service — National Parks Overview", href: "https://nigeriaparkservice.gov.ng/overview/" },
    lastReviewed: "2026-10-02",
  },
  {
    slug: "sukur-cultural-landscape",
    title: "Sukur Cultural Landscape Guide",
    shortTitle: "Sukur Cultural Landscape",
    kind: "destination",
    region: "Adamawa State",
    summary: "Visit Nigeria's UNESCO-listed Sukur Cultural Landscape with context on its hilltop settlement, terraces, stone architecture and living heritage.",
    intro: [
      "Sukur is one of Nigeria's UNESCO World Heritage properties. UNESCO describes a living cultural landscape shaped by the Hidi's Palace, terraced fields, stone-paved walkways, sacred features and the remains of a historic iron industry.",
      "This is a living community and heritage landscape, not an amusement attraction. Plan around local guidance, cultural respect, walking conditions and current access information.",
    ],
    bestFor: ["World Heritage", "History", "Cultural landscapes", "Walking"],
    highlights: [
      { name: "Hidi's Palace", detail: "The palace sits above the villages and is one of the landscape's central architectural and cultural features." },
      { name: "Terraced landscape", detail: "Agricultural terraces, stone structures and paved paths express a long relationship between settlement, farming and the mountain environment." },
      { name: "Iron-working heritage", detail: "UNESCO records extensive remains associated with a formerly flourishing iron industry." },
      { name: "Living culture", detail: "Sukur remains a living cultural landscape, so visitor behaviour should respect community life, sacred areas and local instructions." },
    ],
    planning: [
      { label: "Arrange local guidance", detail: "A knowledgeable local guide is valuable for route-finding, cultural context and understanding where visitors may or may not enter." },
      { label: "Prepare for walking", detail: "The hilltop setting, stone paths and uneven terrain call for suitable footwear, water and enough daylight." },
      { label: "Ask before photography", detail: "Do not assume homes, ceremonies, people or sacred places are automatically open to photography." },
      { label: "Verify current access", detail: "Check transport, local conditions and site access shortly before travel rather than relying only on old itineraries." },
    ],
    source: { label: "UNESCO World Heritage Centre — Sukur Cultural Landscape", href: "https://whc.unesco.org/en/list/938" },
    lastReviewed: "2026-10-02",
  },
  {
    slug: "erin-ijesha-waterfall",
    title: "Erin-Ijesha Waterfall Guide",
    shortTitle: "Erin-Ijesha Waterfall",
    kind: "destination",
    region: "Osun State",
    summary: "Plan an Erin-Ijesha waterfall day trip around weather, footwear, daylight, local access and a safe return plan.",
    intro: [
      "Nigeria's federal e-government tourism portal lists Erin-Ijesha Waterfall among the country's featured attractions and describes it as a popular destination for excursions and nature photography.",
      "A waterfall trip is most enjoyable when you plan for slippery terrain, rainfall, changing water conditions and enough daylight rather than treating it like an indoor attraction with fixed conditions.",
    ],
    bestFor: ["Waterfalls", "Nature", "Day trips", "Photography"],
    highlights: [
      { name: "Waterfall scenery", detail: "The waterfall itself is the main experience, with the surrounding natural setting making it suitable for a dedicated outdoor day trip." },
      { name: "Nature photography", detail: "The federal tourism portal specifically highlights the site for nature photography; protect equipment against spray and rain." },
      { name: "Active outing", detail: "Expect uneven and potentially wet ground, and choose footwear and clothing for an outdoor visit." },
      { name: "Osun road-trip pairing", detail: "It can fit into a wider Osun itinerary, but keep enough time for the waterfall rather than squeezing it between distant fixed appointments." },
    ],
    planning: [
      { label: "Check the weather", detail: "Heavy rain can change water flow, footing and road conditions; reassess the plan when weather is poor." },
      { label: "Wear suitable footwear", detail: "Use shoes with reliable grip and expect wet or uneven surfaces around a waterfall environment." },
      { label: "Keep to daylight", detail: "Give yourself enough daylight for the visit and return journey, especially if travelling from another town." },
      { label: "Confirm current local access", detail: "Entrance arrangements, guide expectations and charges can change, so verify locally before setting out." },
    ],
    source: { label: "Nigeria e-Government Portal — Visit Nigeria", href: "https://services.gov.ng/visit-nigeria" },
    lastReviewed: "2026-10-02",
  },
  {
    slug: "zuma-rock-gurara-falls",
    title: "Zuma Rock & Gurara Falls Trip Guide",
    shortTitle: "Zuma Rock & Gurara Falls",
    kind: "destination",
    region: "Niger State / Abuja corridor",
    summary: "Plan two of the best-known natural landmarks on the Abuja–Niger axis without underestimating road time, weather or waterfall conditions.",
    intro: [
      "The Federal Ministry of Information and National Orientation's tourism guide highlights both Zuma Rock on the Kaduna-Abuja highway corridor and Gurara Waterfalls off the Minna-Suleja road in Niger State.",
      "They work best as a road-trip plan rather than as two quick photo stops. Keep the driving sequence, daylight, rainfall and your return to Abuja or another base in view.",
    ],
    bestFor: ["Road trips", "Landmarks", "Waterfalls", "Photography"],
    highlights: [
      { name: "Zuma Rock", detail: "A prominent granite formation in Niger State near the Abuja corridor, long associated with Gwari history and one of the country's most recognisable rock landmarks." },
      { name: "Gurara Waterfalls", detail: "A major Niger State waterfall whose appearance changes substantially with seasonal water levels." },
      { name: "Seasonal contrast", detail: "The federal tourism guide describes higher water levels around April to August and lower levels from September to March, so the experience changes through the year." },
      { name: "Easy pairing from Abuja", detail: "Both sites sit on routes accessible from the Abuja area, but road conditions and actual travel time should be checked on the day." },
    ],
    planning: [
      { label: "Do not climb casually", detail: "Treat rock faces and unfamiliar paths as outdoor terrain, not informal climbing routes; follow local access rules." },
      { label: "Respect waterfall conditions", detail: "Keep back from dangerous water and slippery edges, especially when flow is strong after rain." },
      { label: "Sequence the drive", detail: "Check live road conditions and decide which stop comes first before leaving Abuja or another base." },
      { label: "Confirm local charges", detail: "Parking, entrance or guide arrangements can change and should be confirmed at the destination." },
    ],
    source: { label: "Federal Ministry of Information and National Orientation — Tourism", href: "https://fmino.gov.ng/culture/tourism/" },
    lastReviewed: "2026-10-02",
  },
  {
    slug: "kainji-lake-national-park",
    title: "Kainji Lake National Park Guide",
    shortTitle: "Kainji Lake National Park",
    kind: "destination",
    region: "Niger & Kwara States",
    summary: "Plan a Kainji Lake National Park trip with park-led access, realistic travel time and current checks on routes, guides and visitor conditions.",
    intro: [
      "Nigeria Park Service lists Kainji Lake National Park across Niger and Kwara states at 5,382 square kilometres, making it one of the country's largest protected areas.",
      "Because a national park covers a broad landscape rather than a single gate-and-building attraction, confirm the specific visitor area, route and ranger or guide arrangements before travelling.",
    ],
    bestFor: ["National parks", "Wildlife", "Nature", "Road trips"],
    highlights: [
      { name: "Large conservation area", detail: "Nigeria Park Service lists the park at 5,382 sq km across Niger and Kwara states." },
      { name: "Wildlife-focused travel", detail: "Plan around observation and conservation rules, and follow park staff on where visitors may go." },
      { name: "Nature landscape", detail: "The scale of the park makes route selection and travel time part of the experience rather than an afterthought." },
      { name: "Multi-stop potential", detail: "The wider Kainji area can support a longer nature itinerary, but only after confirming which visitor facilities are currently operating." },
    ],
    planning: [
      { label: "Confirm the visitor route", detail: "Ask Nigeria Park Service which entrance, sector or visitor area is appropriate for the trip you intend to make." },
      { label: "Arrange guides where required", detail: "Use park-approved guidance for wildlife areas and unfamiliar tracks rather than exploring independently." },
      { label: "Plan fuel and daylight", detail: "Long road distances and limited last-mile options make early departure and a clear return plan important." },
      { label: "Recheck conditions", detail: "Weather, road access, park operations and local conditions can change, so reconfirm shortly before travel." },
    ],
    source: { label: "Nigeria Park Service — National Parks Overview", href: "https://nigeriaparkservice.gov.ng/overview/" },
    lastReviewed: "2026-10-02",
  },

  {
    slug: "nigeria-landmarks-places-to-visit",
    title: "Places to Visit in Nigeria: Landmarks, Nature & Heritage",
    shortTitle: "Nigeria",
    kind: "itinerary",
    region: "Nigeria",
    summary: "A practical shortlist of places to visit in Nigeria, from major landmarks and heritage sites to waterfalls, wildlife destinations, city attractions and region-by-region trip guides.",
    intro: [
      "Nigeria is too large and varied for one generic tourist checklist. Use this guide as a starting map: choose the kind of trip you want, then open the linked city or destination guide for current access, transport and planning details.",
      "The shortlist deliberately mixes cultural heritage, national parks, waterfalls, city landmarks and nature destinations instead of ranking places as if one trip style fits everyone.",
    ],
    bestFor: ["Landmarks", "Heritage", "Nature", "First-time trip planning"],
    highlights: [
      { name: "Osun-Osogbo Sacred Grove", detail: "A UNESCO-listed cultural landscape in Osun State and one of the country's clearest combinations of living tradition, art and protected forest." },
      { name: "Sukur Cultural Landscape", detail: "A UNESCO World Heritage cultural landscape in Adamawa State with terraced fields, stone architecture and a hilltop palace complex." },
      { name: "Olumo Rock", detail: "A major Abeokuta landmark tied to Egba history and one of the easiest heritage-and-viewpoint combinations to build into a South West trip." },
      { name: "Zuma Rock & Gurara Falls", detail: "Two Niger State landmarks that can fit a road-trip route from Abuja when road, weather and daylight conditions are planned carefully." },
      { name: "Yankari Game Reserve", detail: "A Bauchi State wildlife destination best treated as an overnight or multi-day trip, with Wikki Warm Spring as another major draw." },
      { name: "Obudu Mountain Resort", detail: "A Cross River highland destination where weather, long road travel and the current status of resort facilities matter as much as the scenery." },
      { name: "Gashaka-Gumti National Park", detail: "Nigeria's largest national park, spanning Taraba and Adamawa, suited to travellers prepared for a remote nature trip with park guidance." },
      { name: "Erin-Ijesha Waterfall", detail: "A major Osun State waterfall that works well as a nature-focused day trip when access and wet-season conditions are checked first." },
    ],
    planning: [
      { label: "Choose a region before choosing attractions", detail: "Nigeria's major places are spread across long road and flight distances. Build a South West, North Central, North East or South South circuit instead of trying to combine distant landmarks casually." },
      { label: "Confirm live access", detail: "Opening arrangements, road conditions, weather, rehabilitation work and local visitor rules can change. Re-check the detailed guide and official source close to travel." },
      { label: "Treat nature trips differently from city stops", detail: "Parks, waterfalls, mountains and remote heritage landscapes need daylight, weather planning, reliable transport and often local or official guidance." },
      { label: "Keep security conditions current", detail: "Travel conditions can change by route and locality. Use current official/local guidance rather than an old itinerary before committing to a long road trip." },
      { label: "South West history route", detail: "Olumo Rock in Abeokuta and Osun-Osogbo Sacred Grove in Osun State both suit a heritage-led visit, but are in different cities. Compare the linked destination guides and organise a realistic transfer instead of treating them as adjacent stops." },
      { label: "Near-Abuja nature route", detail: "Use Zuma Rock and Gurara Falls as a North Central starting point, but verify access to each separately, allow for the road journey and leave remote national-park travel to its own itinerary." },
      { label: "Match waterfalls to their region", detail: "Erin-Ijesha in Osun State and Gurara in Niger State are not neighbouring stops. Select a regional itinerary and verify season, safety and local access." },
      { label: "Choose park trips by permitted visitor access", detail: "Yankari in Bauchi and Gashaka-Gumti across Taraba/Adamawa require different trip logistics. Check official access and current conditions rather than assuming every named park is open on arrival." },
    ],
    source: { label: "Tour Nigeria — Nigerian Tourism Development Authority", href: "https://tournigeria.gov.ng/" },
    lastReviewed: "2026-10-03",
  },


  {
    slug: "detty-december-lagos-2026",
    title: "Detty December Lagos 2026 Guide",
    shortTitle: "Detty December 2026",
    kind: "itinerary",
    region: "Lagos State",
    summary: "Plan Detty December 2026 in Lagos around the confirmed 18–30 December festival season, Wizkid's 18 December opening concert, official ticket routes, transport, accommodation and safe late-night movement.",
    intro: [
      "Detty December Fest's official 2026 calendar runs from 18 to 30 December at the Detty December Village in Lagos. The first announced headline concert is Wizkid on Friday 18 December, and the official ticketing partner currently lists opening-night tickets from ₦50,000.",
      "The organiser is revealing the wider 2026 bill in waves, so do not treat recycled 2025 line-ups or copied social posts as the final 2026 schedule. Build your trip around confirmed dates, then add later announcements only after they appear on the organiser's current calendar."
    ],
    bestFor: ["December travel", "Concerts", "Nightlife", "IJGB planning"],
    highlights: [
      { name: "18–30 December — 13 festival days", detail: "The official Detty December Fest calendar currently runs for 13 days in Lagos, with concerts, parties, daytime experiences, food, fashion and family programming." },
      { name: "Wizkid — 18 December", detail: "Wizkid is the announced headliner for the Grand Opening Concert on Friday 18 December at the Detty Festival Stage." },
      { name: "Opening-night tickets from ₦50,000", detail: "The official DOT TIX listing currently shows Wizkid opening-night tickets from ₦50,000. Re-check the live checkout before paying because ticket tiers can sell out or change." },
      { name: "Line-up still being revealed", detail: "The organiser says the 2026 line-up is being announced in waves through the year, so MyNigeriaGuide does not copy unconfirmed Flytime, Rhythm Unplugged or other December bills into this guide." }
    ],
    planning: [
      { label: "Book the fixed parts first", detail: "Lock in flights and accommodation before buying multiple event tickets; changing hotels or crossing Lagos nightly can erase the benefit of a cheaper room." },
      { label: "Stay near your main event cluster", detail: "The official Detty December Village is at Livespot Entertarium on the Lekki axis. If this festival is your main anchor, staying nearby can reduce repeated cross-city movement." },
      { label: "Pre-plan late-night transport", detail: "Decide the return route and pickup point before entering an event. December traffic and demand can make late-night improvisation slower and more expensive." },
      { label: "Use official ticket links and current line-ups", detail: "Confirm the date, artist, venue and ticket status on Detty December Fest or its linked ticketing partner before paying. Do not rely on an old 2025 bill presented as 2026." }
    ],
    source: { label: "Detty December Fest 2026 official calendar", href: "https://dettydecfest.com/events/" },
    lastReviewed: "2026-10-07",
  },
  {
    slug: "calabar-carnival-2026",
    title: "Calabar Carnival 2026 Guide & Official Schedule",
    shortTitle: "Calabar Carnival 2026",
    kind: "itinerary",
    region: "Cross River State",
    summary: "Use the official 2026 Calabar Carnival schedule to plan the festival season, including the 28 December Parade of Bands, 29 December Bikers Carnival and the wider December programme.",
    intro: [
      "Carnival Calabar's official 2026 calendar runs from the 30 November Christmas Tree Lighting through New Year activities, with dozens of cultural, music, food and carnival events across the month.",
      "The main Parade of Bands is scheduled for 28 December, while the Bikers Carnival is scheduled for 29 December. Travellers who only want the headline carnival should still arrive early enough to absorb transport delays and secure accommodation.",
    ],
    bestFor: ["Carnival", "Culture", "December travel", "Family trips"],
    highlights: [
      { name: "30 November — Christmas Tree Lighting", detail: "The official programme opens the festive season with the Christmas Tree Lighting at Millennium Park." },
      { name: "18 December — Boat Regatta", detail: "The official schedule lists the Mbuba Ubom boat regatta at Marina Resort from 12:00 PM." },
      { name: "22 December — Festival of Grills", detail: "Food, music and local grills are scheduled at Marina Resort Waterfront from 6:00 PM." },
      { name: "26 December — Cultural Carnival", detail: "Use the official calendar for the Boxing Day cultural programme before travelling, because route and timing details matter." },
      { name: "27 December — Junior Carnival", detail: "The Junior Carnival is scheduled to flag off from Botanic Garden at 10:00 AM." },
      { name: "28 December — Parade of Bands", detail: "Carnival Calabar and the Parade of Bands is scheduled for 10:00 AM on the official Carnival Route." },
      { name: "29 December — Bikers Carnival", detail: "The official schedule places the Bikers Carnival on the Carnival Route at 12:00 PM." },
      { name: "31 December — New Year fireworks", detail: "The season closes with the midnight fireworks and New Year declaration at Festival Village." },
    ],
    planning: [
      { label: "Book before the peak week", detail: "Hotel and transport demand rises sharply around the Parade of Bands. Secure accommodation before building smaller activities around it." },
      { label: "Use the official schedule", detail: "The 2026 calendar contains many events and times can be revised; re-check the official Cross River carnival schedule shortly before travel." },
      { label: "Plan city movement around closures", detail: "Carnival Route activity can change normal traffic patterns, so do not schedule tight airport, bus or hotel transfers around parade hours." },
      { label: "Add daytime culture", detail: "The wider programme includes exhibitions, food, waterfront and cultural events, which can make a longer stay more useful than travelling only for parade day." },
      { label: "Three-day headline visit, 27–29 December", detail: "The 2026 organiser timetable places Junior Carnival at 10 AM on 27 December, the Parade of Bands at 10 AM on 28 December and Bikers Carnival at noon on 29 December. Arrive earlier than your preferred first event and allow extra time for crowd-related road closures." },
      { label: "Culture-first alternatives", detail: "If you prefer exhibitions over parade crowds, the official calendar schedules a season-long National Museum arts exhibition and Arts and Craft Village activity. Confirm the specific day's programme, entry and accessibility before travelling." },
    ],
    source: { label: "Carnival Calabar 2026 official schedule", href: "https://www.carnival.crossriverstate.gov.ng/schedule" },
    lastReviewed: "2026-10-05",
  },

  {
    slug: "beneficial-ownership-asset-recovery-conference-2026",
    title: "Lagos Beneficial Ownership & Asset Recovery Conference 2026 Guide",
    shortTitle: "BO & Asset Recovery Conference 2026",
    kind: "itinerary",
    region: "Lagos State",
    summary: "Plan for the CAC-led Global Conference on Beneficial Ownership & Asset Recovery at Sheraton Hotels, Ikeja, from 8–11 November 2026, including registration, venue, airport and entry details.",
    intro: [
      "The Corporate Affairs Commission and partner agencies are hosting the Global Conference on Beneficial Ownership & Asset Recovery in Lagos from 8 to 11 November 2026.",
      "The official programme uses Sheraton Hotels in Ikeja as the conference venue, with arrival and registration on 8 November, two main conference days on 9–10 November and departures on 11 November."
    ],
    bestFor: ["Business travel", "Governance", "Compliance", "International conference"],
    highlights: [
      { name: "8–11 November 2026", detail: "The official conference site publishes a four-day Lagos programme covering arrivals, plenaries, technical sessions and departures." },
      { name: "Sheraton Hotels, Ikeja", detail: "The venue is at 30 Mobolaji Bank Anthony Way, Ikeja, near Murtala Muhammed International Airport." },
      { name: "Early bird to 15 October", detail: "The official in-person delegate fee is ₦250,000 through 15 October; late registration is ₦300,000 from 16 October to 5 November. Virtual rates are lower." },
      { name: "International delegate support", detail: "The organiser publishes guidance on e-Visas, invitation letters, airport protocol, yellow-fever documentation and Nigeria's Landing Card." }
    ],
    planning: [
      { label: "Register through the official conference site", detail: "Use the CAC-hosted conference site and its generated invoice rather than third-party payment requests." },
      { label: "Stay close to Ikeja if possible", detail: "The venue is near Lagos airport, so accommodation on the Ikeja axis reduces cross-city travel for an event with early starts." },
      { label: "Check entry documents early", detail: "International visitors should confirm passport validity, yellow-fever documentation, visa status where required and the online Landing Card before travel." },
      { label: "Build around the two main conference days", detail: "The substantive plenaries, panels and workshops are on 9 and 10 November; 8 November is arrival/registration and 11 November is departure." }
    ],
    source: { label: "CAC Global Conference on Beneficial Ownership & Asset Recovery", href: "https://boconference.cac.gov.ng/" },
    lastReviewed: "2026-10-05",
  },
  {
    slug: "abia-state-travel-guide",
    title: "Abia State Travel Guide: Umuahia, Arochukwu & Heritage Sites",
    shortTitle: "Abia State",
    kind: "destination",
    region: "Abia State",
    summary: "Plan Abia around Umuahia's civil-war heritage, Arochukwu's historic landscape and natural attractions that the state is actively restoring and developing.",
    intro: ["Abia's strongest visitor story combines Nigerian history, Arochukwu heritage, creative industry and nature. Umuahia is the practical base for the National War Museum and Ojukwu Bunker, while Arochukwu and other LGAs add caves, waterfalls and heritage landscapes.","Several major heritage sites are currently being rehabilitated, so this guide separates durable attractions from access details that should be confirmed close to travel."],
    bestFor: ["History","Arochukwu heritage","Creative culture","Nature"],
    highlights: [
      { name: "National War Museum & Ojukwu Bunker", detail: "Abia and federal heritage authorities are rehabilitating these major Umuahia landmarks; confirm reopening and visitor arrangements before setting out." },
      { name: "Arochukwu heritage", detail: "The Long Juju / Ibini Ukpabi heritage landscape is one of the state’s best-known historical attractions and is part of current tourism-development discussions." },
      { name: "Ibom Waterfall & Ulochukwu Cave", detail: "Abia has designated these natural sites as state monuments, widening the state’s tourism offer beyond museums." },
      { name: "Aba creative economy", detail: "Aba has been designated a Creative and Innovative City by the state, making markets, fashion, leatherwork and enterprise part of a broader visitor itinerary." },
    ],
    planning: [
      { label: "Use Umuahia as a history base", detail: "Cluster the War Museum, Bunker and city stops rather than crossing the state repeatedly." },
      { label: "Confirm restoration status", detail: "Some flagship heritage sites are under active retrofit in 2026; verify public access before travel." },
      { label: "Treat caves and waterfalls as day trips", detail: "Use daylight, local directions and realistic road time for attractions outside the major cities." },
      { label: "Add Aba intentionally", detail: "If shopping or creative-industry visits matter, make Aba a separate block rather than an afterthought on an Umuahia day." },
    ],
    source: { label: "Federal Ministry of Information — Abia heritage restoration", href: "https://fmino.gov.ng/federal-governments-war-museum-and-ojukwu-bunker-get-major-historical-preservation-boost-in-abia/" },
    lastReviewed: "2026-10-05",
  },
  {
    slug: "bayelsa-state-travel-guide",
    title: "Bayelsa State Travel Guide: Yenagoa, Oloibiri & Niger Delta Heritage",
    shortTitle: "Bayelsa State",
    kind: "destination",
    region: "Bayelsa State",
    summary: "Explore Bayelsa through Yenagoa, oil-history landmarks, waterways, mangrove landscapes and the state’s living Niger Delta culture.",
    intro: ["Bayelsa is a riverine destination where waterways, mangrove ecosystems and Ijaw cultural heritage shape the trip. Yenagoa is the easiest base for most visitors, while Ogbia and coastal communities carry important petroleum and trading history.","The long-planned Oloibiri/Otuabagi museum project is still being developed, so distinguish the historic oil-heritage area from a fully completed museum attraction when planning."],
    bestFor: ["Niger Delta heritage","Waterways","Culture","Oil history"],
    highlights: [
      { name: "Oloibiri / Otuabagi oil heritage", detail: "The area marks the origin story of Nigeria’s commercial oil industry; the new museum and research-centre project is under development, so confirm what is open to visitors." },
      { name: "Akassa & Royal Niger Company heritage", detail: "Bayelsa’s tourism ministry highlights the state’s historic trading-post story alongside wider coastal heritage." },
      { name: "Mangroves and waterways", detail: "The state’s official tourism strategy emphasises Bayelsa’s waterways, mangrove forests and eco-cultural potential." },
      { name: "Yenagoa base", detail: "Use the state capital for accommodation and logistics before longer riverine or heritage excursions." },
    ],
    planning: [
      { label: "Confirm boat logistics", detail: "For riverine trips, arrange the operator, boarding point, return time, weather check and life-jacket provision before departure." },
      { label: "Check Oloibiri project status", detail: "Do not assume the new museum building is fully operational simply because the heritage site is promoted." },
      { label: "Use local guidance outside Yenagoa", detail: "Waterway conditions and community access are easier to manage with current local information." },
      { label: "Protect devices and documents", detail: "Plan for rain, spray and humid conditions with waterproof storage on river trips." },
    ],
    source: { label: "Bayelsa State Ministry of Tourism Development", href: "https://motd.bayelsastate.gov.ng/tourism-sites/" },
    lastReviewed: "2026-10-05",
  },
  {
    slug: "benue-state-travel-guide",
    title: "Benue State Travel Guide: Makurdi, Hills, Springs & Culture",
    shortTitle: "Benue State",
    kind: "destination",
    region: "Benue State",
    summary: "Use Makurdi as a base for River Benue experiences, cultural tourism and day trips to hills, springs and heritage sites across the Food Basket State.",
    intro: ["Benue’s tourism bureau identifies a broad mix of rivers, hills, valleys, waterfalls, caves, historical monuments and cultural festivals. Makurdi is the simplest logistics base, especially for visitors combining riverfront stops with cultural or food experiences.","Many nature sites sit outside the capital, so current road conditions, daylight and local directions matter more than trying to cover a long attraction list in one day."],
    bestFor: ["Culture","River landscapes","Nature","Food"],
    highlights: [
      { name: "Makurdi River Beach & River Benue", detail: "The state tourism bureau lists river-beach recreation and major river landscapes among Benue’s visitor assets." },
      { name: "Ushongo Hills", detail: "A recognised natural attraction for visitors interested in scenic landscapes and outdoor trips." },
      { name: "Enemabia Warm Spring", detail: "One of the state tourism bureau’s named natural sites and a useful anchor for an Otukpo-area trip." },
      { name: "Festivals & performance", detail: "Benue promotes events including Kwagh-Hir, Igede Agba, fishing and cultural festivals, giving repeat visitors a reason to plan around dates." },
    ],
    planning: [
      { label: "Base in Makurdi first", detail: "Use the capital for transport and accommodation before deciding which distant nature sites fit the time available." },
      { label: "Confirm festival dates", detail: "Cultural events can move year to year; verify the current organiser or state notice before booking travel." },
      { label: "Use daylight for rural sites", detail: "Hills, springs and caves deserve separate daytime trips with current directions." },
      { label: "Expect distance between attractions", detail: "Do not treat Benue’s tourism assets as a single walkable cluster." },
    ],
    source: { label: "Benue State Bureau for Arts, Culture and Tourism", href: "https://bact.benuestate.gov.ng/departments/department-of-tourism/" },
    lastReviewed: "2026-10-05",
  },
  {
    slug: "borno-state-travel-guide",
    title: "Borno State Travel Guide: Maiduguri, Lake Chad & Sahel Landscapes",
    shortTitle: "Borno State",
    kind: "destination",
    region: "Borno State",
    summary: "A cautious planning guide to Borno’s Sahel landscape, Lake Chad heritage and protected areas, with current security and access checks treated as the first step.",
    intro: ["Borno spans Sahel savanna, parts of the Mandara Plateau, the Nigerian Lake Chad basin and sections of Chad Basin National Park. Those landscapes are nationally significant, but remote travel in the state cannot be planned from an evergreen tourism list alone.","For Borno, current official security and local access information must override any old itinerary. Use Maiduguri as the decision point and only proceed to remote areas when competent local and official guidance says the route and site are suitable."],
    bestFor: ["Sahel landscapes","History","Culture","Specialist nature travel"],
    highlights: [
      { name: "Lake Chad basin", detail: "The northeastern edge of Borno reaches the Nigerian portion of Lake Chad and its flooded-savanna ecosystem." },
      { name: "Chad Basin National Park", detail: "Parts of the national park lie in Borno and protect Sahel wildlife and habitats, but access conditions must be checked directly before any visit." },
      { name: "Mandara Plateau landscape", detail: "The southeast of the state reaches the montane Mandara Plateau, adding a different landscape to Borno’s Sahel geography." },
      { name: "Maiduguri as logistics base", detail: "Keep accommodation, transport and itinerary decisions anchored in the capital unless current local guidance supports travel beyond it." },
    ],
    planning: [
      { label: "Check live security first", detail: "Do not travel to remote Borno attractions using an old blog or saved itinerary; obtain current official and reputable local guidance." },
      { label: "Confirm park access directly", detail: "A place existing on a map does not mean it is open or appropriate for tourism on your travel date." },
      { label: "Avoid improvised remote road trips", detail: "Use established operators or hosts with current route knowledge when travel beyond Maiduguri is appropriate." },
      { label: "Keep plans flexible", detail: "Be prepared to replace a remote excursion with a city-based day if conditions or access change." },
    ],
    source: { label: "Borno State Government — About Borno", href: "https://bornostate.gov.ng/about" },
    lastReviewed: "2026-10-05",
  },
  {
    slug: "delta-state-travel-guide",
    title: "Delta State Travel Guide: Asaba, Koko, Abraka & River Heritage",
    shortTitle: "Delta State",
    kind: "destination",
    region: "Delta State",
    summary: "Plan Delta around Asaba, River Ethiope, Nana’s Palace in Koko and riverfront or beach experiences across the state.",
    intro: ["Delta combines Niger River history, Urhobo/Itsekiri/Anioma cultural landscapes and water-based attractions. Asaba works well as a northern base, while Koko, Abraka and other destinations require deliberate road planning.","Official investment and federal public-information sources identify a wide set of heritage and natural sites, so choose a regional cluster rather than attempting the whole state in one trip."],
    bestFor: ["River heritage","History","Culture","Road trips"],
    highlights: [
      { name: "Nana Living History Palace, Koko", detail: "The historic palace of Chief Nana Olomu is one of Delta’s most important heritage sites and preserves material linked to his 19th-century trading history." },
      { name: "River Ethiope source", detail: "The river’s source at Umuaja is promoted as a natural and cultural attraction in the state." },
      { name: "Mungo Park House, Asaba", detail: "Delta’s official tourism investment material includes the historic Mungo Park House among its visitor assets." },
      { name: "Abraka & Asaba leisure stops", detail: "The state identifies beach and river-related attractions that can be paired with city stays when access conditions are suitable." },
    ],
    planning: [
      { label: "Choose north or south Delta first", detail: "Asaba, Abraka, Koko and Warri-area stops are not one compact circuit." },
      { label: "Confirm heritage-site opening", detail: "Museums and palaces can have event, restoration or local-access constraints." },
      { label: "Plan river trips in daylight", detail: "Weather and local water conditions should shape any boat or waterfront activity." },
      { label: "Leave road buffers", detail: "Intercity movement can take longer than map distance suggests." },
    ],
    source: { label: "Federal Presidency South-South Community Engagement — Delta", href: "https://communityengagementss.presidency.gov.ng/portfolio/delta/" },
    lastReviewed: "2026-10-05",
  },
  {
    slug: "ebonyi-state-travel-guide",
    title: "Ebonyi State Travel Guide: Abakaliki, Salt Lakes & Natural Wonders",
    shortTitle: "Ebonyi State",
    kind: "destination",
    region: "Ebonyi State",
    summary: "Explore Ebonyi from Abakaliki through salt-lake heritage, waterfalls, rock landscapes, food and the state’s growing cultural-tourism offer.",
    intro: ["Ebonyi’s official visitor portal presents the state as a mix of salt-lake heritage, waterfalls, caves, rock formations, agriculture and living culture. Abakaliki is the practical base for most first visits.","The state’s tourism pages are still developing detailed access information, so use the official attraction list as a discovery layer and verify exact opening, transport and local guidance before a rural trip."],
    bestFor: ["Nature","Salt heritage","Food","Culture"],
    highlights: [
      { name: "Okposi salt lakes", detail: "Salt landscapes are central to Ebonyi’s identity as the Salt of the Nation and are highlighted by the state’s visitor portal." },
      { name: "Waterfalls & natural wonders", detail: "The state promotes waterfalls, caves and rock formations as part of its nature-and-adventure offer." },
      { name: "Abakaliki", detail: "Use the capital for hotels, food, transport and a base before longer day trips." },
      { name: "Rice & local food culture", detail: "Agriculture and rice production are prominent parts of Ebonyi’s identity and can make food a meaningful part of the trip." },
    ],
    planning: [
      { label: "Start from Abakaliki", detail: "Confirm transport from the capital before committing to rural attractions." },
      { label: "Ask for exact local access", detail: "Generic attraction names are not enough for a safe rural itinerary; get a current contact or guide where needed." },
      { label: "Plan nature stops around weather", detail: "Heavy rain can change roads, trails and waterfall conditions." },
      { label: "Keep one flexible half-day", detail: "Use it for a local market, food stop or cultural visit if a remote site is unavailable." },
    ],
    source: { label: "Ebonyi State Government — Discover Ebonyi", href: "https://ebonyistate.gov.ng/discover" },
    lastReviewed: "2026-10-05",
  },
  {
    slug: "gombe-state-travel-guide",
    title: "Gombe State Travel Guide: Gombe City, Kaltungo Hills & Dadin Kowa",
    shortTitle: "Gombe State",
    kind: "destination",
    region: "Gombe State",
    summary: "Use Gombe city as a base for highland scenery around Kaltungo, Dadin Kowa’s reservoir landscape and the state’s varied savannah communities.",
    intro: ["Gombe’s official state portal highlights distinct landscapes across its LGAs: the capital’s urban role, Kaltungo’s majestic hills, Nafada’s riverside history and Dadin Kowa’s major dam in Yamaltu-Deba.","A first trip works best by choosing one south/highland excursion or one eastern reservoir excursion rather than attempting multiple long road legs in a single day."],
    bestFor: ["Highlands","Road trips","Landscape","Local culture"],
    highlights: [
      { name: "Kaltungo hills", detail: "The state describes Kaltungo as a southern-highlands area known for majestic hills and cultural heritage." },
      { name: "Dadin Kowa Dam", detail: "Yamaltu-Deba is home to the major Dadin Kowa dam, an important hydroelectric and irrigation landmark." },
      { name: "Gombe city", detail: "The capital is the state’s administrative and commercial centre and the best starting point for transport planning." },
      { name: "Nafada riverside heritage", detail: "The official LGA profile describes Nafada as an ancient river-side settlement with historic trade connections." },
    ],
    planning: [
      { label: "Use Gombe city as the base", detail: "Arrange a vehicle and return plan before long day trips." },
      { label: "Choose one regional direction daily", detail: "Kaltungo and Dadin Kowa belong on separate relaxed day plans." },
      { label: "Confirm access at infrastructure sites", detail: "A dam is working infrastructure, so do not assume every area is open for casual visitor access." },
      { label: "Use daylight outside the capital", detail: "Return with enough margin for road conditions and local navigation." },
    ],
    source: { label: "Gombe State Government — Local Government Areas", href: "https://gombestate.gov.ng/pages/lgas.php" },
    lastReviewed: "2026-10-05",
  },
  {
    slug: "imo-state-travel-guide",
    title: "Imo State Travel Guide: Owerri, Oguta Lake & Cultural Sites",
    shortTitle: "Imo State",
    kind: "destination",
    region: "Imo State",
    summary: "Plan Imo around Owerri’s hospitality and culture, Oguta Lake, Mbari heritage and scenic day trips toward Okigwe and river landscapes.",
    intro: ["Imo’s official investment material identifies Oguta Lake as the state’s standout tourism asset alongside Mbari cultural heritage, the Okigwe hills and river landscapes. Owerri remains the easiest base for accommodation, food and onward road trips.","Some tourism assets have been discussed alongside redevelopment plans, so confirm what facilities are actually operating before relying on old resort descriptions."],
    bestFor: ["Lake trips","Culture","Owerri breaks","Nature"],
    highlights: [
      { name: "Oguta Lake", detail: "The lake is Imo’s best-known nature and leisure attraction, with boating, fishing, birdlife and historic features associated with the wider resort area." },
      { name: "Mbari cultural heritage", detail: "The Mbari centre in Owerri is highlighted for art and cultural artefacts linked to Imo identity." },
      { name: "Okigwe hills", detail: "Rolling hills in the Okigwe area add a scenic inland contrast to the lake-and-city itinerary." },
      { name: "Owerri", detail: "Use the capital for hospitality, dining and a stable base before day trips." },
    ],
    planning: [
      { label: "Verify Oguta facilities", detail: "Separate the natural lake experience from resort amenities that may be under redevelopment or operating differently." },
      { label: "Use a current boat operator", detail: "Confirm life jackets, weather and return arrangements before going on the water." },
      { label: "Keep Owerri and Oguta as separate blocks", detail: "Avoid squeezing a lake trip between city appointments." },
      { label: "Ask before photographing cultural spaces", detail: "Some art, heritage and community spaces may have local rules." },
    ],
    source: { label: "Imo State Investment Promotion Agency — About Imo", href: "https://www.isipa.im.gov.ng/about-imo.html" },
    lastReviewed: "2026-10-05",
  },
  {
    slug: "jigawa-state-travel-guide",
    title: "Jigawa State Travel Guide: Dutse Rock City, Emirates & Heritage",
    shortTitle: "Jigawa State",
    kind: "destination",
    region: "Jigawa State",
    summary: "Explore Jigawa through Dutse’s rocky landscape, the state’s five emirates and historic towns including Birnin Kudu, Hadejia and Kazaure.",
    intro: ["Jigawa’s official portal presents Dutse as its 'Rock City' and frames the state through five emirates: Dutse, Hadejia, Ringim, Gumel and Kazaure. That makes a heritage-led road itinerary more useful than a single-attraction checklist.","Distances between emirate towns mean a short visit should centre on Dutse and one additional heritage direction."],
    bestFor: ["Emirate heritage","Rock landscapes","Road trips","Northern culture"],
    highlights: [
      { name: "Dutse Rock City", detail: "The capital is promoted for its striking rocky landscape alongside modern state infrastructure." },
      { name: "Five emirates", detail: "Dutse, Hadejia, Ringim, Gumel and Kazaure provide distinct heritage anchors across the state." },
      { name: "Birnin Kudu", detail: "The official state portal highlights Birnin Kudu for educational institutions and historical sites." },
      { name: "Hadejia", detail: "An ancient city and emirate area that can anchor an eastern Jigawa heritage route." },
    ],
    planning: [
      { label: "Base in Dutse first", detail: "Use the capital to organise intercity road travel and accommodation." },
      { label: "Choose one emirate route per day", detail: "Avoid a checklist that turns the trip into continuous driving." },
      { label: "Confirm palace and heritage access", detail: "Traditional institutions may have event, prayer or protocol constraints." },
      { label: "Plan for heat", detail: "Carry water and schedule exposed outdoor stops earlier or later in the day." },
    ],
    source: { label: "Jigawa State Government", href: "https://jigawastate.gov.ng/index" },
    lastReviewed: "2026-10-05",
  },
  {
    slug: "kaduna-state-travel-guide",
    title: "Kaduna State Travel Guide: Zaria, Hills, Waterfalls & Heritage",
    shortTitle: "Kaduna State",
    kind: "destination",
    region: "Kaduna State",
    summary: "Build a Kaduna trip around Zaria heritage, Kufena and Kagoro landscapes, waterfalls and carefully planned nature or resort excursions.",
    intro: ["Kaduna’s official investment guide identifies a deep tourism mix including Zaria city walls, Kufena Hills, Matsirga Waterfalls, Nok heritage, River Kaduna and privately operated leisure properties.","The state is geographically large. Use Kaduna city or Zaria as a base and confirm current road, access and security conditions before nature trips outside the urban centres."],
    bestFor: ["History","Hills","Waterfalls","Northern culture"],
    highlights: [
      { name: "Zaria city walls", detail: "The remains of the historic Zazzau walls and gates are among Kaduna’s most important architectural heritage assets." },
      { name: "Kufena Hills", detail: "The rugged Zaria-area hills are a designated national monument and a major landscape landmark." },
      { name: "Matsirga Waterfalls", detail: "The waterfall near Kafanchan is fed from the Kagoro Hills and is one of southern Kaduna’s best-known natural attractions." },
      { name: "Nok heritage", detail: "Southern Kaduna is associated with the archaeological discovery and legacy of the ancient Nok culture." },
    ],
    planning: [
      { label: "Pick Kaduna or Zaria as a base", detail: "Do not treat Zaria, Kajuru and southern Kaduna as one compact day." },
      { label: "Check current route conditions", detail: "For out-of-city attractions, verify roads, access and security with reliable local sources close to travel." },
      { label: "Confirm private-property access", detail: "Places such as Kajuru Castle are not ordinary public parks; booking and access rules can change." },
      { label: "Use daylight for nature trips", detail: "Waterfalls and hill visits need realistic return buffers." },
    ],
    source: { label: "Kaduna Investment Promotion Agency — Publications", href: "https://kadipa.kdsg.gov.ng/documents.html" },
    lastReviewed: "2026-10-05",
  },
  {
    slug: "katsina-state-travel-guide",
    title: "Katsina State Travel Guide: Gobarau, Daura, Durbar & Historic Sites",
    shortTitle: "Katsina State",
    kind: "destination",
    region: "Katsina State",
    summary: "Explore Katsina’s historic city, Daura heritage, Gobarau Minaret, Kusugu Well, emirate culture and festival calendar.",
    intro: ["Katsina State’s tourism policy highlights ancient cities, emirate architecture, Gobarau Minaret, Kusugu Well, craft traditions and Durbar festivals. Katsina city and Daura form the clearest first-time heritage circuit.","Festival days can transform access and crowd levels, so travellers should decide whether they want everyday heritage visits or the much busier Durbar experience."],
    bestFor: ["History","Emirate culture","Architecture","Festivals"],
    highlights: [
      { name: "Gobarau Minaret", detail: "The historic minaret is one of Katsina’s signature landmarks and appears repeatedly in official state tourism material." },
      { name: "Kusugu Well, Daura", detail: "A central landmark in Daura’s origin traditions and a key stop for visitors exploring the emirate’s history." },
      { name: "Emir’s Palaces", detail: "Katsina and Daura palaces are important cultural anchors; access should respect current palace protocol." },
      { name: "Durbar & Sallah festivals", detail: "The state continues to host prominent Durbar celebrations, including major 2026 festivities in Katsina and Daura." },
    ],
    planning: [
      { label: "Choose ordinary days or festival days deliberately", detail: "Durbar offers spectacle but also crowds, road controls and limited accommodation." },
      { label: "Confirm palace access", detail: "Traditional institutions are active places, not static museums." },
      { label: "Pair Katsina with Daura realistically", detail: "Allow proper road time rather than stacking too many stops." },
      { label: "Dress and behave respectfully", detail: "Religious and traditional heritage sites call for conservative, locally appropriate conduct." },
    ],
    source: { label: "Katsina State Ministry of Commerce, Industry and Tourism", href: "https://mocit.kt.gov.ng/tourism/" },
    lastReviewed: "2026-10-05",
  },
  {
    slug: "kebbi-state-travel-guide",
    title: "Kebbi State Travel Guide: Argungu, Kanta Museum & Festivals",
    shortTitle: "Kebbi State",
    kind: "destination",
    region: "Kebbi State",
    summary: "Plan Kebbi around Argungu’s fishing heritage, Kanta Museum, Gwandu history and major cultural festivals.",
    intro: ["Kebbi’s official state portal identifies the Argungu International Fishing Festival, Zuru’s Uhola Festival, Kanta Museum and Gwandu heritage among its major tourism assets.","Outside festival periods, a heritage trip needs more deliberate scheduling because attractions are spread among Birnin Kebbi, Argungu, Gwandu and Zuru."],
    bestFor: ["Festivals","Museums","History","Northern culture"],
    highlights: [
      { name: "Argungu Fishing Festival", detail: "Kebbi’s internationally known festival is one of northern Nigeria’s defining cultural events; travel should be built around the official event calendar." },
      { name: "Kanta Museum, Argungu", detail: "A major museum and heritage stop in Argungu identified by the state government." },
      { name: "Gwandu heritage", detail: "The tomb of Sheikh Abdullahi Dan Fodio is among Kebbi’s named historic attractions." },
      { name: "Uhola Festival, Zuru", detail: "The state also highlights Zuru’s annual cultural festival as an important part of Kebbi’s visitor calendar." },
    ],
    planning: [
      { label: "Check the festival year and dates", detail: "Do not book around an assumed Argungu date from an old poster." },
      { label: "Use Birnin Kebbi or Argungu as the base", detail: "Choose accommodation according to the event or heritage cluster you actually want." },
      { label: "Respect museum and religious-site rules", detail: "Ask about photography and local protocol." },
      { label: "Leave road time between emirates", detail: "The state’s attractions are geographically dispersed." },
    ],
    source: { label: "Kebbi State Government", href: "https://kebbistate.gov.ng/" },
    lastReviewed: "2026-10-05",
  },
  {
    slug: "kogi-state-travel-guide",
    title: "Kogi State Travel Guide: Lokoja, Mount Patti & the Niger-Benue Confluence",
    shortTitle: "Kogi State",
    kind: "destination",
    region: "Kogi State",
    summary: "Make Lokoja the centre of a Kogi trip built around Mount Patti, the Niger-Benue confluence and the city’s colonial and transport history.",
    intro: ["Lokoja sits where the Niger and Benue rivers meet and beneath Mount Patti, giving Kogi one of Nigeria’s clearest landscape-and-history pairings. The city’s former colonial administrative role adds another layer to a short heritage trip.","Most first-time visitors can keep the itinerary compact by basing in Lokoja instead of chasing distant state attractions."],
    bestFor: ["River landscapes","History","Photography","Weekend trips"],
    highlights: [
      { name: "Niger-Benue confluence", detail: "The meeting of two of West Africa’s major rivers is Kogi’s defining geographic landmark." },
      { name: "Mount Patti", detail: "The wooded hill rises above Lokoja and provides a major visual reference for the city and river valley." },
      { name: "Historic Lokoja", detail: "The state government describes Lokoja as a former colonial administrative headquarters with a long pre-colonial and colonial history." },
      { name: "River-valley setting", detail: "Lokoja’s position between Mount Patti and the Niger creates a compact landscape-focused city break." },
    ],
    planning: [
      { label: "Use Lokoja as the base", detail: "The confluence and Mount Patti belong in the same relaxed city itinerary." },
      { label: "Confirm viewpoint access", detail: "Road, weather and local access to hill viewpoints can change." },
      { label: "Plan river activity separately", detail: "If using a boat, verify the operator, weather, life jackets and return point." },
      { label: "Avoid midday heat for exposed viewpoints", detail: "Earlier or later hours are usually more comfortable for outdoor stops." },
    ],
    source: { label: "Kogi State Government — About Us", href: "https://kogistate.gov.ng/about-us/" },
    lastReviewed: "2026-10-05",
  },
  {
    slug: "nasarawa-state-travel-guide",
    title: "Nasarawa State Travel Guide: Farin Ruwa, Eggon Hills & Rock Landscapes",
    shortTitle: "Nasarawa State",
    kind: "destination",
    region: "Nasarawa State",
    summary: "Use Lafia as a planning base for Farin Ruwa Waterfalls, Eggon Hills, Ara Rock and the state’s salt and rock landscapes.",
    intro: ["Nasarawa’s tourism assets are primarily nature-led and spread across multiple LGAs. Federal tourism surveys identify Farin Ruwa Waterfalls, Eggon Hills and caves, Akiri Salt Village and Ara Rock among the key sites.","These are not city-centre attractions. Weather, road condition and local directions should determine which one or two sites fit a day."],
    bestFor: ["Waterfalls","Hiking","Rock landscapes","Day trips"],
    highlights: [
      { name: "Farin Ruwa Waterfalls", detail: "A major waterfall in Wamba LGA and one of Nasarawa’s best-known natural attractions." },
      { name: "Eggon Hills & caves", detail: "The hill range is associated with adventure, streams and distinctive rock formations." },
      { name: "Ara Rock", detail: "A dramatic rock formation near Ara town and one of the state’s recognisable landscape features." },
      { name: "Akiri Salt Village", detail: "Awe LGA has traditional salt-processing heritage linked to local spring water." },
    ],
    planning: [
      { label: "Choose one nature zone per day", detail: "Farin Ruwa, Eggon and Ara are not a single quick loop." },
      { label: "Use current local guidance", detail: "Roads, trail conditions and access can change seasonally." },
      { label: "Avoid waterfall trips in poor weather", detail: "Heavy rain changes roads, water volume and safe viewing areas." },
      { label: "Carry essentials", detail: "Water, footwear, power and offline directions matter outside major towns." },
    ],
    source: { label: "Federal Ministry of Information — Nasarawa tourism survey", href: "https://fmino.gov.ng/report-on-tourism-survey-at-nasarawa-state-from-tuesday-7th-thursday-9th-of-may-2019/" },
    lastReviewed: "2026-10-05",
  },
  {
    slug: "sokoto-state-travel-guide",
    title: "Sokoto State Travel Guide: Caliphate History, Durbar & Old City Heritage",
    shortTitle: "Sokoto State",
    kind: "destination",
    region: "Sokoto State",
    summary: "Explore Sokoto as the historic seat of the Sokoto Caliphate, with traditional institutions, Durbar culture and old-city heritage at the centre of the trip.",
    intro: ["Sokoto’s identity is inseparable from the history of the Sokoto Caliphate and its role as a centre of Islamic scholarship and traditional authority. A first visit should focus on the city’s historical context and active cultural institutions rather than treating them as ordinary tourist props.","Religious and palace sites remain living institutions, so visitor access, photography and timing should be confirmed respectfully on the day."],
    bestFor: ["Islamic history","Traditional culture","Architecture","Durbar"],
    highlights: [
      { name: "Sokoto Caliphate heritage", detail: "The state government describes Sokoto as the spiritual and political capital of the world-renowned caliphate." },
      { name: "Traditional institutions", detail: "The Sultanate and emirate traditions remain central to the city’s identity and public cultural life." },
      { name: "Durbar culture", detail: "The state describes Grand and mini-Durbar displays with decorated horses and camels for important occasions and visitors." },
      { name: "Historical research & museums", detail: "Sokoto has long maintained collections and archives tied to caliphate, Gobir and wider regional history; confirm current museum access locally." },
    ],
    planning: [
      { label: "Respect active religious life", detail: "Plan around prayer times and follow local dress, conduct and photography expectations." },
      { label: "Ask before entering palace spaces", detail: "Traditional institutions set their own visitor protocol." },
      { label: "Use a local heritage guide", detail: "Context matters more than checking buildings off a list." },
      { label: "Confirm current security and road guidance", detail: "As with any regional road trip, use current local information before travelling beyond the city." },
    ],
    source: { label: "Sokoto State Government — History of Sokoto", href: "https://sokotostate.gov.ng/history-of-sokoto/" },
    lastReviewed: "2026-10-05",
  },
  {
    slug: "yobe-state-travel-guide",
    title: "Yobe State Travel Guide: Damaturu, Dagona, Dufuna & Sahel Heritage",
    shortTitle: "Yobe State",
    kind: "destination",
    region: "Yobe State",
    summary: "A cautious guide to Yobe’s Sahel heritage, Dagona bird sanctuary, Dufuna canoe history, cultural festivals and desert landscapes.",
    intro: ["Yobe’s official investment agency promotes the state’s history, natural scenery and cultural tourism, including wetlands, birdlife, old settlements, festivals and Sahel landscapes. Damaturu is the sensible base for most planning.","Remote nature and heritage trips require current access and security checks. Treat the attraction list as a discovery map, not permission to travel without up-to-date local guidance."],
    bestFor: ["Birding","Archaeology","Sahel landscapes","Culture"],
    highlights: [
      { name: "Dagona Bird Sanctuary", detail: "The sanctuary in the Bade-Nguru wetlands is associated with migratory waterbirds and is one of Yobe’s best-known nature assets." },
      { name: "Dufuna canoe heritage", detail: "Yobe is associated with the ancient Dufuna canoe, one of Africa’s most significant archaeological finds." },
      { name: "Gorgaram fishing & culture", detail: "The state promotes a long-running fishing and cultural festival in Jakusko LGA." },
      { name: "Sahel & historic landscapes", detail: "Yobe’s visitor material highlights dunes, ancient settlements and the historic Kanem-Bornu landscape." },
    ],
    planning: [
      { label: "Check live conditions before remote travel", detail: "Security, road and protected-area access must be verified close to the date." },
      { label: "Ask the park or local authority about Dagona", detail: "Do not assume birding access, guides or accommodation from old reports." },
      { label: "Use Damaturu for logistics", detail: "Arrange transport and contacts before setting out for distant LGAs." },
      { label: "Plan for heat and distance", detail: "Carry water, fuel margin and realistic daylight buffers." },
    ],
    source: { label: "Yobe Investment Promotion Agency — Culture and Tourism", href: "https://yobeinvest.ng/culture-and-tourism/" },
    lastReviewed: "2026-10-05",
  },
  {
    slug: "zamfara-state-travel-guide",
    title: "Zamfara State Travel Guide: Gusau, Kwatakashi Rocks & Heritage",
    shortTitle: "Zamfara State",
    kind: "destination",
    region: "Zamfara State",
    summary: "Discover Zamfara’s documented cultural attractions from Gusau museums to Kwatakashi Rocks, Kaura Namoda heritage and traditional crafts—with live security checks first.",
    intro: ["Zamfara’s Ministry of Commerce, Industry and Tourism lists historical, cultural and natural attractions including Kwatakashi Rocks, Kauran Namoda’s Tomb, Jata’s cave settlement, museums in Gusau and traditional craft heritage.","Because conditions can vary significantly by route and locality, current security and access advice must come before any out-of-city tourism plan."],
    bestFor: ["History","Rock landscapes","Crafts","Culture"],
    highlights: [
      { name: "Zamfara State Museum, Gusau", detail: "The state tourism ministry identifies the museum and National Art Gallery presence in the capital as cultural visitor assets." },
      { name: "Kwatakashi Rocks", detail: "A major natural rock formation promoted for scenery and photography." },
      { name: "Kauran Namoda’s Tomb", detail: "A historical site associated with the Alibawa warrior whose name is linked to Kaura Namoda." },
      { name: "Jata cave settlement", detail: "The state tourism page describes Jata as an ancient settlement around a hill and large cave with continuing cultural significance." },
    ],
    planning: [
      { label: "Check current security before leaving Gusau", detail: "Do not rely on a static tourism page for road or locality safety." },
      { label: "Use official/local contacts for rural sites", detail: "Confirm whether a site is open, staffed and appropriate to visit on the day." },
      { label: "Keep photography respectful", detail: "Museums, tombs and traditional sites may have restrictions." },
      { label: "Prefer daylight road travel", detail: "Build conservative return buffers for trips outside the capital." },
    ],
    source: { label: "Zamfara State Ministry of Commerce, Industry and Tourism", href: "https://mocit.zamfara.gov.ng/tourism/" },
    lastReviewed: "2026-10-05",
  },
  {
    "slug": "olumo-rock-visitor-guide",
    "title": "Olumo Rock Visitor Guide: Climb, History & Abeokuta Stops",
    "shortTitle": "Olumo Rock",
    "kind": "destination",
    "region": "Ogun State",
    "summary": "Plan an Olumo Rock visit around the climb, Egba history, Itoku adire shopping and nearby Abeokuta heritage stops without wasting the day in cross-town movement.",
    "intro": [
      "Olumo Rock is one of Abeokuta's defining landmarks and a distinct trip-planning search intent beyond a general city guide. Treat it as the anchor for an Abeokuta heritage day rather than an isolated photo stop.",
      "Opening conditions, lift availability, guide arrangements and admission can change, so confirm live visitor details before leaving and keep the nearby Itoku and Ake heritage stops as flexible additions."
    ],
    "bestFor": [
      "Rock scenery",
      "Egba history",
      "Abeokuta day trips",
      "Culture"
    ],
    "highlights": [
      {
        "name": "Olumo Rock Tourist Complex",
        "detail": "Make the rock the main stop and allow enough time for the climb, viewpoints and historical interpretation rather than rushing through."
      },
      {
        "name": "Egba history",
        "detail": "The landmark is closely tied to Abeokuta's history, so a guided explanation adds more value than treating it only as a viewpoint."
      },
      {
        "name": "Itoku Adire Market",
        "detail": "Pair the rock with nearby adire shopping if you want a culture-and-craft day in one area."
      },
      {
        "name": "Ake heritage area",
        "detail": "Ake's palace and civic landmarks can round out the trip without turning it into a long-distance circuit."
      }
    ],
    "planning": [
      {
        "label": "Confirm live access",
        "detail": "Check current opening, admission, guide and lift arrangements before travelling."
      },
      {
        "label": "Wear practical footwear",
        "detail": "Rock surfaces and steps can be tiring or slippery, especially after rain."
      },
      {
        "label": "Cluster nearby stops",
        "detail": "Keep Itoku and Ake in the same day instead of adding distant Ogun destinations."
      },
      {
        "label": "Protect against heat",
        "detail": "Start earlier when possible and carry water for exposed sections of the visit."
      }
    ],
    "source": {
      "label": "Olumo Rock Tourist Complex",
      "href": "https://olumorock.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "idanre-hills-visitor-guide",
    "title": "Idanre Hills Visitor Guide: Climb, Old Settlement & Ondo Trip Planning",
    "shortTitle": "Idanre Hills",
    "kind": "destination",
    "region": "Ondo State",
    "summary": "Plan Idanre Hills as a proper climbing and heritage trip, with realistic timing, weather checks and nearby Ondo options instead of treating it as a quick roadside stop.",
    "intro": [
      "Idanre Hills combines a long stair climb, dramatic rock scenery and the old hilltop settlement, which makes it a distinct destination rather than just one item on an Ondo list.",
      "The hill is on Nigeria's UNESCO Tentative List. That is not the same as World Heritage inscription, and visitors should still confirm current access, guides and weather locally before climbing."
    ],
    "bestFor": [
      "Hiking",
      "Rock scenery",
      "Heritage",
      "Photography"
    ],
    "highlights": [
      {
        "name": "The climb",
        "detail": "The ascent is a major part of the experience, so budget time and energy rather than scheduling it between several distant stops."
      },
      {
        "name": "Old Idanre settlement",
        "detail": "Historic structures and cultural features on the hill give the visit more depth than the viewpoints alone."
      },
      {
        "name": "Rock formations",
        "detail": "The landscape is the main attraction and works best when weather and visibility are favourable."
      },
      {
        "name": "Ondo heritage circuit",
        "detail": "Owo Museum or Akure can be separate additions if your trip extends beyond the hills."
      }
    ],
    "planning": [
      {
        "label": "Start early",
        "detail": "Avoid putting the climb in the hottest part of the day and leave daylight margin for the return."
      },
      {
        "label": "Check rain before climbing",
        "detail": "Wet steps and rock surfaces can make the visit harder and less comfortable."
      },
      {
        "label": "Use local guidance",
        "detail": "Confirm the current visitor route and any restricted or culturally sensitive areas."
      },
      {
        "label": "Do not overpack the day",
        "detail": "Treat Owo or Akure as optional follow-on stops, not mandatory same-day targets."
      }
    ],
    "source": {
      "label": "Ondo State Ministry of Culture and Tourism",
      "href": "https://tourism.on.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ikogosi-warm-springs-guide",
    "title": "Ikogosi Warm Springs Guide: Visit, Nearby Waterfalls & Ekiti Planning",
    "shortTitle": "Ikogosi Warm Springs",
    "kind": "destination",
    "region": "Ekiti State",
    "summary": "Plan an Ikogosi Warm Springs trip with current access checks, realistic road time and nearby Ekiti nature stops such as Arinta Waterfalls.",
    "intro": [
      "Ikogosi is one of Ekiti's best-known nature destinations and has enough destination-specific intent to justify a focused planning guide separate from a general state circuit.",
      "Resort facilities, admission and opening arrangements can change, so use the spring as the anchor and verify live details directly before setting out."
    ],
    "bestFor": [
      "Nature",
      "Warm springs",
      "Weekend trips",
      "Photography"
    ],
    "highlights": [
      {
        "name": "Warm and cold spring meeting",
        "detail": "The natural spring system is the core reason to visit and should be given enough time rather than squeezed between long road legs."
      },
      {
        "name": "Ikogosi landscape",
        "detail": "The surrounding green setting is part of the experience, especially in comfortable weather."
      },
      {
        "name": "Arinta Waterfalls",
        "detail": "Nearby Ipole-Iloro can form a separate nature stop if road and weather conditions suit your plan."
      },
      {
        "name": "Ado-Ekiti gateway",
        "detail": "The capital is the practical base for many visitors arranging transport and an overnight stay."
      }
    ],
    "planning": [
      {
        "label": "Confirm resort access",
        "detail": "Check current admission, opening hours and which facilities are operating."
      },
      {
        "label": "Account for rain",
        "detail": "Heavy rain can change road comfort and waterfall conditions quickly."
      },
      {
        "label": "Keep the route compact",
        "detail": "Combine only nearby Ekiti stops rather than crossing the state repeatedly."
      },
      {
        "label": "Leave a daylight buffer",
        "detail": "Rural return journeys are easier when you are not depending on late-night movement."
      }
    ],
    "source": {
      "label": "Ekiti State tourism information",
      "href": "https://www.ekitistate.gov.ng/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ogbunike-caves-guide",
    "title": "Ogbunike Caves Guide: Steps, Cultural Rules & Anambra Trip Planning",
    "shortTitle": "Ogbunike Caves",
    "kind": "destination",
    "region": "Anambra State",
    "summary": "Visit Ogbunike Caves with realistic stair, footwear and cultural planning, plus nearby Anambra nature stops for a fuller trip.",
    "intro": [
      "Ogbunike Caves is a distinct heritage-and-nature destination with a demanding descent and living local traditions, not simply a generic sightseeing stop.",
      "UNESCO lists the caves on Nigeria's Tentative List. Follow local rules, ask before photography in sensitive areas and confirm current access before travelling."
    ],
    "bestFor": [
      "Caves",
      "Heritage",
      "Nature",
      "Adventure"
    ],
    "highlights": [
      {
        "name": "Cave system",
        "detail": "The network of chambers and passages is the main attraction; use local guidance instead of entering unfamiliar sections independently."
      },
      {
        "name": "Long stair approach",
        "detail": "The descent and return climb are physically significant and should shape your timing and footwear."
      },
      {
        "name": "Living cultural setting",
        "detail": "The caves remain culturally important, so visitor behaviour should follow local guidance rather than treating the site as an unrestricted playground."
      },
      {
        "name": "Anambra nature circuit",
        "detail": "Agulu Lake and Owerre-Ezukala can be separate additions when time and road conditions allow."
      }
    ],
    "planning": [
      {
        "label": "Wear grip-friendly shoes",
        "detail": "Steps and cave surfaces may be wet or slippery."
      },
      {
        "label": "Use a local guide",
        "detail": "Confirm the appropriate visitor route and any areas that should not be entered."
      },
      {
        "label": "Respect local customs",
        "detail": "Ask before photography and follow instructions around sacred or restricted spaces."
      },
      {
        "label": "Avoid a rushed return",
        "detail": "Allow energy and daylight for the climb back up the stairway."
      }
    ],
    "source": {
      "label": "UNESCO World Heritage Centre — Ogbunike Caves Tentative List",
      "href": "https://whc.unesco.org/en/tentativelists/5174/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ngwo-pine-forest-guide",
    "title": "Ngwo Pine Forest Guide: Enugu Nature Trip, Cave & Waterfall Planning",
    "shortTitle": "Ngwo Pine Forest",
    "kind": "destination",
    "region": "Enugu State",
    "summary": "Plan Ngwo Pine Forest as an Enugu nature outing with current route, weather and access checks, and keep Awhum as a separate excursion rather than overpacking one day.",
    "intro": [
      "Ngwo Pine Forest has its own nature-trip intent and sits close enough to Enugu to work as a focused half-day or day outing when access is confirmed.",
      "Enugu State is actively developing tourism assets around Ngwo and other sites in 2026, so old visitor reports may not reflect current works, routes or operating arrangements."
    ],
    "bestFor": [
      "Forest scenery",
      "Nature walks",
      "Photography",
      "Enugu day trips"
    ],
    "highlights": [
      {
        "name": "Pine forest setting",
        "detail": "The unusual forest landscape is the main draw and works best when visitors leave time to walk rather than treating it as a drive-by photo stop."
      },
      {
        "name": "Cave and waterfall features",
        "detail": "Natural features around Ngwo may require a local route or guide; confirm what is currently accessible."
      },
      {
        "name": "Enugu proximity",
        "detail": "The site can fit into an Enugu-based trip without the long travel required for more distant state attractions."
      },
      {
        "name": "Awhum option",
        "detail": "Awhum Waterfall is better treated as a separate excursion unless a local operator confirms a realistic combined route."
      }
    ],
    "planning": [
      {
        "label": "Check development works",
        "detail": "Confirm current public access because tourism infrastructure work may affect the route."
      },
      {
        "label": "Use local directions",
        "detail": "Do not rely only on an old map pin for forest trails or cave access."
      },
      {
        "label": "Watch the weather",
        "detail": "Rain can make unpaved approaches and natural surfaces harder to use."
      },
      {
        "label": "Return before dark",
        "detail": "Build enough daylight margin for trail finding and the drive back to Enugu."
      }
    ],
    "source": {
      "label": "Enugu State Government — tourism development update",
      "href": "https://enugustate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "awhum-waterfall-guide",
    "title": "Awhum Waterfall Guide: Enugu Day Trip, Access & What to Expect",
    "shortTitle": "Awhum Waterfall",
    "kind": "destination",
    "region": "Enugu State",
    "summary": "Plan an Awhum Waterfall trip from Enugu with realistic road, walking, weather and local-access checks before travelling.",
    "intro": [
      "Awhum Waterfall is a distinct Enugu nature destination and is better planned as its own outing than buried inside a broad city list.",
      "The state has been working on tourism development around Awhum in 2026. Verify the current route, visitor access and any site rules close to your trip."
    ],
    "bestFor": [
      "Waterfalls",
      "Nature",
      "Day trips",
      "Photography"
    ],
    "highlights": [
      {
        "name": "Awhum Waterfall",
        "detail": "The waterfall and surrounding rock setting are the core attraction; conditions vary significantly with rainfall."
      },
      {
        "name": "Cave setting",
        "detail": "Natural cave features add interest but should be approached only on the currently recognised visitor route."
      },
      {
        "name": "Udi landscape",
        "detail": "The wider area gives the trip a rural nature character different from an Enugu city outing."
      },
      {
        "name": "Ngwo pairing",
        "detail": "Ngwo is another strong Enugu nature stop, but it is safer to combine them only when transport and daylight make sense."
      }
    ],
    "planning": [
      {
        "label": "Confirm local access",
        "detail": "Check whether the site is open and whether a guide or local permission is expected."
      },
      {
        "label": "Wear water-ready footwear",
        "detail": "Expect wet, uneven surfaces around a waterfall environment."
      },
      {
        "label": "Check rainfall",
        "detail": "Heavy rain changes both water conditions and road or trail comfort."
      },
      {
        "label": "Leave daylight margin",
        "detail": "Plan the return before dark rather than relying on a late rural departure."
      }
    ],
    "source": {
      "label": "Enugu State Government — tourism development update",
      "href": "https://enugustate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "owu-falls-guide",
    "title": "Owu Falls Kwara Guide: Route, Waterfall Visit & Ilorin Planning",
    "shortTitle": "Owu Falls",
    "kind": "destination",
    "region": "Kwara State",
    "summary": "Plan Owu Falls as a dedicated Kwara nature trip, with current road and local-access checks and an Ilorin base for wider state travel.",
    "intro": [
      "Owu Falls is one of Kwara's best-known nature attractions and has enough destination intent for a focused visitor guide rather than a single line in a state roundup.",
      "Because the falls sit away from central Ilorin, road condition, local directions, weather and the return plan matter more than squeezing extra city stops into the day."
    ],
    "bestFor": [
      "Waterfalls",
      "Nature",
      "Road trips",
      "Photography"
    ],
    "highlights": [
      {
        "name": "Owu Falls",
        "detail": "Make the waterfall the day anchor and give yourself time for the approach, viewing and a safe return."
      },
      {
        "name": "Rural Kwara scenery",
        "detail": "The journey is part of the experience, but road comfort and travel time can vary."
      },
      {
        "name": "Ilorin gateway",
        "detail": "Ilorin is the practical base for arranging transport, accommodation and city stops before or after the waterfall trip."
      },
      {
        "name": "Kwara cultural stops",
        "detail": "Central Mosque and city attractions work better on a separate Ilorin block than on a rushed waterfall day."
      }
    ],
    "planning": [
      {
        "label": "Confirm the road",
        "detail": "Ask locally about current access and recent weather before setting out."
      },
      {
        "label": "Travel in daylight",
        "detail": "Keep enough return margin for a rural road trip."
      },
      {
        "label": "Carry water and basics",
        "detail": "Do not assume full visitor services are available at the falls."
      },
      {
        "label": "Use current local directions",
        "detail": "Map pins alone may not reflect the most practical final approach."
      }
    ],
    "source": {
      "label": "Kwara State tourism information",
      "href": "https://kwarastate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "oguta-lake-guide",
    "title": "Oguta Lake Guide: Boating, Safety & Imo Day Trip Planning",
    "shortTitle": "Oguta Lake",
    "kind": "destination",
    "region": "Imo State",
    "summary": "Plan an Oguta Lake visit with live checks for boats, life jackets and operating facilities, plus nearby Imo cultural stops if you have more time.",
    "intro": [
      "Oguta Lake is Imo's best-known lake destination and supports a distinct boating-and-nature trip intent beyond a broad state travel page.",
      "Treat water activities as operator-dependent: confirm what is running, the boat condition, life jackets, weather and your return arrangement before boarding."
    ],
    "bestFor": [
      "Lakes",
      "Boating",
      "Nature",
      "Weekend trips"
    ],
    "highlights": [
      {
        "name": "Oguta Lake",
        "detail": "The lake itself is the trip anchor, with views and water-based activities depending on live operator availability."
      },
      {
        "name": "Boat outing",
        "detail": "Only use an operator you are comfortable with and confirm safety equipment before departure."
      },
      {
        "name": "Oguta history",
        "detail": "The wider area has cultural and historical context that can make the visit more than a short boat ride."
      },
      {
        "name": "Owerri connection",
        "detail": "Owerri can serve as a practical base, with Mbari Cultural Centre as a separate city stop."
      }
    ],
    "planning": [
      {
        "label": "Check boat safety",
        "detail": "Confirm life jackets, weather, route and return time before boarding."
      },
      {
        "label": "Verify facilities",
        "detail": "Do not assume every older resort or recreation facility is currently operating."
      },
      {
        "label": "Keep valuables protected",
        "detail": "Use a water-resistant plan for phones, documents and electronics."
      },
      {
        "label": "Allow road time",
        "detail": "Do not schedule a tight appointment immediately after a lake outing."
      }
    ],
    "source": {
      "label": "Imo State Investment Promotion Agency — About Imo",
      "href": "https://www.isipa.im.gov.ng/about-imo.html"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "farin-ruwa-waterfalls-guide",
    "title": "Farin Ruwa Waterfalls Guide: Nasarawa Route, Access & Safety Planning",
    "shortTitle": "Farin Ruwa Waterfalls",
    "kind": "destination",
    "region": "Nasarawa State",
    "summary": "Plan Farin Ruwa as a serious waterfall day trip with road, weather, local-access and daylight checks before leaving for Wamba LGA.",
    "intro": [
      "Farin Ruwa is one of Nasarawa's signature nature attractions and its remoteness creates a different planning need from a general state guide.",
      "Public tourism references establish the attraction, but live road, site and local security conditions can change. Confirm them close to departure rather than relying on an old travel post."
    ],
    "bestFor": [
      "Waterfalls",
      "Nature",
      "Road trips",
      "Photography"
    ],
    "highlights": [
      {
        "name": "Farin Ruwa Waterfalls",
        "detail": "The waterfall is the destination anchor and deserves a full trip window rather than a rushed detour."
      },
      {
        "name": "Wamba landscape",
        "detail": "The surrounding terrain is part of the nature experience but increases the importance of route planning."
      },
      {
        "name": "Eggon Hills option",
        "detail": "Nasarawa has other major rock and hill attractions, better handled as separate trip days."
      },
      {
        "name": "Daylight return",
        "detail": "Distance and road variability make a conservative return time part of the itinerary."
      }
    ],
    "planning": [
      {
        "label": "Verify the road",
        "detail": "Ask current local contacts about the final approach before setting out."
      },
      {
        "label": "Check recent rainfall",
        "detail": "Water volume and road conditions can change after heavy rain."
      },
      {
        "label": "Carry essentials",
        "detail": "Plan water, food, fuel margin and basic first-aid rather than assuming services at the site."
      },
      {
        "label": "Avoid a late return",
        "detail": "Build enough daylight for delays on the outward or return journey."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Nasarawa tourism survey",
      "href": "https://fmino.gov.ng/report-on-tourism-survey-at-nasarawa-state-from-tuesday-7th-thursday-9th-of-may-2019/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "matsirga-waterfalls-guide",
    "title": "Matsirga Waterfalls Guide: Southern Kaduna Route & Trip Planning",
    "shortTitle": "Matsirga Waterfalls",
    "kind": "destination",
    "region": "Kaduna State",
    "summary": "Plan Matsirga Waterfalls as a Southern Kaduna nature trip with current road, weather and local-security checks before travelling.",
    "intro": [
      "Matsirga Waterfalls is a distinct Southern Kaduna nature destination and should be planned around current local conditions rather than folded casually into a city itinerary.",
      "The state promotes the waterfall in its tourism material, but road and security conditions can vary by route. Verify them close to your travel date."
    ],
    "bestFor": [
      "Waterfalls",
      "Nature",
      "Southern Kaduna",
      "Photography"
    ],
    "highlights": [
      {
        "name": "Matsirga Waterfalls",
        "detail": "The waterfall is the trip anchor, fed from the Kagoro Hills area and best visited with enough time for the rural route."
      },
      {
        "name": "Kagoro landscape",
        "detail": "The surrounding hills and Southern Kaduna scenery add context to the visit."
      },
      {
        "name": "Kafanchan gateway",
        "detail": "Kafanchan is a practical reference point for arranging local movement into the area."
      },
      {
        "name": "Zaria alternative",
        "detail": "Kufena Hills and Zaria heritage are separate Kaduna clusters rather than same-day add-ons."
      }
    ],
    "planning": [
      {
        "label": "Check current security",
        "detail": "Use live local and official guidance for the exact route you intend to take."
      },
      {
        "label": "Confirm road conditions",
        "detail": "Rain can change access and travel time considerably."
      },
      {
        "label": "Travel with daylight",
        "detail": "Set a conservative turnaround time for the return journey."
      },
      {
        "label": "Use local directions",
        "detail": "Confirm the final access point instead of depending only on an old map location."
      }
    ],
    "source": {
      "label": "Kaduna Investment Promotion Agency — tourism publications",
      "href": "https://kadipa.kdsg.gov.ng/documents.html"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "national-war-museum-umuahia-guide",
    "title": "National War Museum Umuahia Guide: Access, Ojukwu Bunker & History Trip",
    "shortTitle": "National War Museum Umuahia",
    "kind": "destination",
    "region": "Abia State",
    "summary": "Plan an Umuahia history trip around the National War Museum and Ojukwu Bunker, with a live access check because federal rehabilitation work is ongoing in 2026.",
    "intro": [
      "The National War Museum and Ojukwu Bunker form one of Nigeria's most important modern-history visitor clusters and answer a distinct heritage search intent.",
      "Federal preservation and rehabilitation work has been underway in 2026, so the first planning step is to confirm which areas are open before making the trip."
    ],
    "bestFor": [
      "Modern history",
      "Museums",
      "Civil-war history",
      "Umuahia"
    ],
    "highlights": [
      {
        "name": "National War Museum",
        "detail": "The museum preserves military and civil-war material and is the central stop for an Umuahia history-focused visit."
      },
      {
        "name": "Ojukwu Bunker",
        "detail": "The bunker adds site-specific context to the Biafran period and is naturally paired with the museum."
      },
      {
        "name": "Preservation work",
        "detail": "Ongoing rehabilitation may improve the site but can also affect visitor access or presentation."
      },
      {
        "name": "Abia heritage extension",
        "detail": "Arochukwu is a separate heritage trip and should not be squeezed into a short Umuahia visit."
      }
    ],
    "planning": [
      {
        "label": "Confirm what is open",
        "detail": "Check current rehabilitation status and visitor hours before travelling."
      },
      {
        "label": "Allow time for interpretation",
        "detail": "This is a history-heavy visit; rushing through reduces much of its value."
      },
      {
        "label": "Treat sensitive history respectfully",
        "detail": "Use museum interpretation and credible sources rather than sensationalising the subject."
      },
      {
        "label": "Keep Arochukwu separate",
        "detail": "The road time makes it a better dedicated excursion than a casual add-on."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Abia heritage restoration",
      "href": "https://fmino.gov.ng/federal-governments-war-museum-and-ojukwu-bunker-get-major-historical-preservation-boost-in-abia/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "niger-benue-confluence-lokoja-guide",
    "title": "Niger–Benue Confluence Lokoja Guide: Viewpoints, Boat Safety & History",
    "shortTitle": "Niger–Benue Confluence",
    "kind": "destination",
    "region": "Kogi State",
    "summary": "Plan a Lokoja trip around the Niger–Benue confluence, Mount Patti and colonial heritage, with boat safety checks if you choose a water-level view.",
    "intro": [
      "The meeting of the Niger and Benue rivers is Lokoja's defining geographic attraction and supports a focused trip distinct from a broad Kogi State guide.",
      "You can approach the experience through viewpoints and the city's history without needing a boat. If you do use one, verify the operator, weather, life jackets and return point."
    ],
    "bestFor": [
      "River views",
      "Geography",
      "History",
      "Lokoja day trips"
    ],
    "highlights": [
      {
        "name": "Niger–Benue Confluence",
        "detail": "The meeting point of the two major rivers is the core reason to build a sightseeing day around Lokoja."
      },
      {
        "name": "Mount Patti",
        "detail": "Elevated views can add geographic context when current access and weather are suitable."
      },
      {
        "name": "Colonial heritage",
        "detail": "Lokoja's historical sites make the trip stronger than a single confluence photo stop."
      },
      {
        "name": "River-level option",
        "detail": "Boat viewing is optional and should only be used with a satisfactory safety setup."
      }
    ],
    "planning": [
      {
        "label": "Do not depend on a boat",
        "detail": "Build a good land-based plan first; water access should be an optional extra."
      },
      {
        "label": "Check life jackets",
        "detail": "If you board, confirm safety equipment and the full return arrangement before departure."
      },
      {
        "label": "Avoid poor weather",
        "detail": "Rain, wind and visibility can reduce both safety and the quality of the view."
      },
      {
        "label": "Cluster Lokoja sites",
        "detail": "Mount Patti and city heritage work naturally in the same destination block."
      }
    ],
    "source": {
      "label": "Kogi State Government — About Kogi",
      "href": "https://kogistate.gov.ng/about-us/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "gobarau-minaret-katsina-guide",
    "title": "Gobarau Minaret Katsina Guide: Old City Heritage & Visitor Planning",
    "shortTitle": "Gobarau Minaret",
    "kind": "destination",
    "region": "Katsina State",
    "summary": "Plan a Katsina old-city heritage visit around Gobarau Minaret, the Emir's Palace area and other historic stops while respecting worship and access rules.",
    "intro": [
      "Gobarau Minaret is one of Katsina's signature historic landmarks and gives travellers a focused old-city heritage intent beyond a state-wide attractions page.",
      "The area remains a living religious and cultural environment. Confirm visitor access, dress appropriately and ask before photography rather than assuming every space is open tourism infrastructure."
    ],
    "bestFor": [
      "Islamic heritage",
      "Architecture",
      "History",
      "Katsina city"
    ],
    "highlights": [
      {
        "name": "Gobarau Minaret",
        "detail": "The historic tower is the anchor for understanding Katsina's old-city religious and educational heritage."
      },
      {
        "name": "Emir's Palace area",
        "detail": "Royal heritage nearby adds cultural context, subject to current visitor boundaries."
      },
      {
        "name": "Old-city fabric",
        "detail": "Walking or driving the historic core can be more meaningful with a knowledgeable local guide."
      },
      {
        "name": "Daura extension",
        "detail": "Kusugu Well is a separate Katsina State heritage stop best planned with its own road-time allowance."
      }
    ],
    "planning": [
      {
        "label": "Respect worship",
        "detail": "Avoid disrupting prayer and follow any local dress or access requirements."
      },
      {
        "label": "Ask before photography",
        "detail": "Religious and royal sites may restrict cameras even when surrounding streets are public."
      },
      {
        "label": "Use a local guide",
        "detail": "Context matters in historic districts and can prevent accidental entry into restricted spaces."
      },
      {
        "label": "Separate Daura if needed",
        "detail": "Do not underestimate road time when adding heritage stops outside Katsina city."
      }
    ],
    "source": {
      "label": "Katsina State Ministry of Commerce, Industry and Tourism",
      "href": "https://mocit.kt.gov.ng/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "kanta-museum-argungu-guide",
    "title": "Kanta Museum Argungu Guide: Kebbi Heritage & Festival Context",
    "shortTitle": "Kanta Museum",
    "kind": "destination",
    "region": "Kebbi State",
    "summary": "Plan an Argungu heritage visit around Kanta Museum with current opening checks and wider Kebbi cultural context beyond festival season.",
    "intro": [
      "Kanta Museum gives Argungu a year-round heritage reason to visit beyond the famous fishing festival and supports a focused museum-and-history search intent.",
      "Museum hours and local visitor arrangements can change, so confirm opening before a long road journey and use Argungu as the centre of the day."
    ],
    "bestFor": [
      "Museums",
      "Argungu heritage",
      "History",
      "Culture"
    ],
    "highlights": [
      {
        "name": "Kanta Museum",
        "detail": "The museum is the main heritage anchor and provides context for Argungu and Kebbi history."
      },
      {
        "name": "Argungu cultural identity",
        "detail": "The town's history and festival tradition make the museum stronger when viewed as part of a living cultural setting."
      },
      {
        "name": "Gwandu heritage",
        "detail": "Hubbare and Gwandu form another major Kebbi heritage cluster that requires separate road planning."
      },
      {
        "name": "Zuru heritage",
        "detail": "Zuru cultural sites are farther away and should not be treated as a quick Argungu add-on."
      }
    ],
    "planning": [
      {
        "label": "Confirm museum hours",
        "detail": "Check current opening and admission arrangements before travelling."
      },
      {
        "label": "Plan by cluster",
        "detail": "Keep Argungu, Gwandu and Zuru as separate route decisions instead of chasing every state attraction in one day."
      },
      {
        "label": "Check seasonal events",
        "detail": "Festival periods can change traffic, accommodation demand and access."
      },
      {
        "label": "Use daylight road time",
        "detail": "Keep a conservative return plan for inter-town travel."
      }
    ],
    "source": {
      "label": "Kebbi State Government",
      "href": "https://kebbistate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "dadin-kowa-dam-guide",
    "title": "Dadin Kowa Dam Guide: Gombe Viewpoints, Access & Road Trip Planning",
    "shortTitle": "Dadin Kowa Dam",
    "kind": "destination",
    "region": "Gombe State",
    "summary": "Plan a Dadin Kowa landscape visit without treating working infrastructure as an unrestricted tourist site: confirm legal viewpoints, road conditions and local access first.",
    "intro": [
      "Dadin Kowa is a major dam and landscape landmark east of Gombe, but it is also working infrastructure. A useful guide needs to distinguish public viewing from restricted operational areas.",
      "Use the trip for the wider scenery and approved viewpoints, and never cross barriers or assume industrial facilities are open to casual visitors."
    ],
    "bestFor": [
      "Landscape",
      "Road trips",
      "Engineering interest",
      "Photography"
    ],
    "highlights": [
      {
        "name": "Dadin Kowa Dam landscape",
        "detail": "The reservoir and surrounding terrain are the main visitor interest from lawful public areas."
      },
      {
        "name": "Engineering context",
        "detail": "The dam has power and irrigation functions, so operational restrictions take priority over sightseeing."
      },
      {
        "name": "Eastern Gombe scenery",
        "detail": "The road trip adds a different landscape experience from central Gombe city."
      },
      {
        "name": "Kaltungo option",
        "detail": "Kaltungo Hills are another state nature cluster and need their own time allowance."
      }
    ],
    "planning": [
      {
        "label": "Respect restricted areas",
        "detail": "Do not cross gates, barriers or security instructions for a better photo."
      },
      {
        "label": "Confirm public viewpoints",
        "detail": "Ask locally where visitors may stop safely and legally."
      },
      {
        "label": "Check road conditions",
        "detail": "Weather and road works can change travel time from Gombe."
      },
      {
        "label": "Travel in daylight",
        "detail": "Keep enough return time for a road-based outing."
      }
    ],
    "source": {
      "label": "Gombe State Government — Local Government Areas",
      "href": "https://gombestate.gov.ng/pages/lgas.php"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "okposi-salt-lakes-guide",
    "title": "Okposi Salt Lakes Guide: Ebonyi Salt Heritage & Visitor Planning",
    "shortTitle": "Okposi Salt Lakes",
    "kind": "destination",
    "region": "Ebonyi State",
    "summary": "Plan an Okposi salt-heritage visit with current local directions, cultural guidance and realistic rural travel time from Abakaliki.",
    "intro": [
      "Okposi's salt-lake heritage is closely tied to Ebonyi's identity as the Salt of the Nation and answers a distinct cultural-and-nature search intent.",
      "This is not a mass-market resort visit. Confirm local access, appropriate behaviour and the current route before travelling, and treat community guidance as part of the experience."
    ],
    "bestFor": [
      "Salt heritage",
      "Culture",
      "Nature",
      "Ebonyi day trips"
    ],
    "highlights": [
      {
        "name": "Okposi salt heritage",
        "detail": "The main value is understanding the natural brine resources and the local history around salt production."
      },
      {
        "name": "Community context",
        "detail": "Local knowledge matters more here than generic attraction lists, especially for appropriate access."
      },
      {
        "name": "Ebonyi landscape",
        "detail": "The rural setting makes the journey part of the trip and requires realistic road timing."
      },
      {
        "name": "Other state nature stops",
        "detail": "Caves and river beaches exist elsewhere in Ebonyi but should be planned as separate route clusters."
      }
    ],
    "planning": [
      {
        "label": "Arrange local guidance",
        "detail": "Confirm where visitors should go and which areas or activities are appropriate."
      },
      {
        "label": "Ask before photography",
        "detail": "Respect people, work areas and culturally sensitive locations."
      },
      {
        "label": "Check the route",
        "detail": "Use current directions rather than relying on an old travel article."
      },
      {
        "label": "Return with daylight",
        "detail": "Build a conservative road-time buffer from rural areas."
      }
    ],
    "source": {
      "label": "Ebonyi State Government — Discover Ebonyi",
      "href": "https://ebonyistate.gov.ng/discover"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "river-ethiope-source-guide",
    "title": "River Ethiope Source Guide: Umuaja Nature & Delta Trip Planning",
    "shortTitle": "River Ethiope Source",
    "kind": "destination",
    "region": "Delta State",
    "summary": "Plan a visit to the River Ethiope source at Umuaja with local-access, water-condition and cultural checks rather than relying on generic Delta attraction lists.",
    "intro": [
      "The source of the River Ethiope is a distinct natural and cultural attraction in Delta State and supports a focused visitor-planning page of its own.",
      "Water conditions, local access and community expectations matter. Confirm current directions and visitor arrangements before travelling rather than assuming a fully serviced tourist complex."
    ],
    "bestFor": [
      "Rivers",
      "Nature",
      "Culture",
      "Delta road trips"
    ],
    "highlights": [
      {
        "name": "River Ethiope source",
        "detail": "The spring-fed river origin is the core natural feature and is best visited with local context."
      },
      {
        "name": "Umuaja setting",
        "detail": "The community environment makes respectful local guidance part of the trip."
      },
      {
        "name": "Delta heritage connection",
        "detail": "Koko and Asaba hold separate historical attractions that can support a longer state itinerary."
      },
      {
        "name": "Water-focused planning",
        "detail": "Conditions around natural water sites change with weather and local activity."
      }
    ],
    "planning": [
      {
        "label": "Confirm community access",
        "detail": "Use current local directions and follow any site-specific instructions."
      },
      {
        "label": "Avoid unsafe water assumptions",
        "detail": "Do not swim or enter water solely because older travel posts describe it as safe."
      },
      {
        "label": "Protect electronics",
        "detail": "Use a water-resistant plan for phones and valuables around the river."
      },
      {
        "label": "Keep distant Delta stops separate",
        "detail": "Do not combine Umuaja, Koko and Asaba without realistic road-time planning."
      }
    ],
    "source": {
      "label": "Federal Presidency South-South Community Engagement — Delta",
      "href": "https://communityengagementss.presidency.gov.ng/portfolio/delta/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "kwatakashi-rocks-guide",
    "title": "Kwatakashi Rocks Guide: Zamfara Landscape & Safe Trip Planning",
    "shortTitle": "Kwatakashi Rocks",
    "kind": "destination",
    "region": "Zamfara State",
    "summary": "Use Kwatakashi Rocks as a scenery-focused Zamfara trip only after checking current route, local access and security conditions close to departure.",
    "intro": [
      "Kwatakashi Rocks is a documented Zamfara nature attraction with a distinct landscape intent, but trip planning must be condition-led rather than driven by a static attraction list.",
      "Current security and road conditions can change materially by locality. Treat official and trusted local guidance on the day as more important than any evergreen tourism description."
    ],
    "bestFor": [
      "Rock landscapes",
      "Photography",
      "Geology",
      "Zamfara heritage"
    ],
    "highlights": [
      {
        "name": "Kwatakashi rock formations",
        "detail": "The landscape is the principal reason to visit and should be approached only when the current route is considered suitable."
      },
      {
        "name": "Gusau base",
        "detail": "The state capital is the practical place to organise information and transport before leaving for out-of-city sites."
      },
      {
        "name": "Kaura Namoda heritage",
        "detail": "Historical sites elsewhere in Zamfara require their own current-condition checks."
      },
      {
        "name": "State museum context",
        "detail": "Gusau's museum can provide a lower-risk cultural alternative when a rural route is not appropriate."
      }
    ],
    "planning": [
      {
        "label": "Check security first",
        "detail": "Do not travel on the strength of an old itinerary; verify the exact route close to departure."
      },
      {
        "label": "Use local contacts",
        "detail": "Confirm whether the site is appropriate to visit and where visitors should stop."
      },
      {
        "label": "Prefer daylight travel",
        "detail": "Use conservative outbound and return timing."
      },
      {
        "label": "Be willing to cancel",
        "detail": "If current conditions are uncertain, choose a city-based alternative rather than forcing the trip."
      }
    ],
    "source": {
      "label": "Zamfara State Ministry of Commerce, Industry and Tourism",
      "href": "https://mocit.zamfara.gov.ng/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "badagry-heritage-guide",
    "title": "Badagry Heritage Guide: Museums, Slave Route & Point of No Return",
    "shortTitle": "Badagry Heritage",
    "kind": "destination",
    "region": "Lagos State",
    "summary": "Plan a Badagry history trip around the heritage museum, slave-route sites and Gberefu Point of No Return with enough time for interpretation and the return to Lagos.",
    "intro": [
      "Badagry has a dense cluster of transatlantic-slavery, missionary and colonial heritage sites, making it a distinct history destination rather than just another Lagos day trip.",
      "The subject is sensitive and should be handled with context and respect. Use recognised museums and local guides, confirm the operating status of each stop, and avoid turning memorial sites into novelty attractions."
    ],
    "bestFor": [
      "History",
      "Museums",
      "Heritage",
      "Lagos day trips"
    ],
    "highlights": [
      {
        "name": "Badagry Heritage Museum",
        "detail": "The museum provides essential historical framing before or after visiting route-specific memorial sites."
      },
      {
        "name": "Historic district",
        "detail": "Multiple monuments and museums sit within Badagry's old-town heritage area and are best explored as a connected story."
      },
      {
        "name": "Gberefu Point of No Return",
        "detail": "The route usually involves local movement and a water crossing, so confirm the current logistics before committing."
      },
      {
        "name": "Living town",
        "detail": "Badagry is not only a memorial landscape; plan respectfully around residents, worship and everyday activity."
      }
    ],
    "planning": [
      {
        "label": "Start with context",
        "detail": "A museum or knowledgeable guide makes the historical sites more meaningful and reduces misinformation."
      },
      {
        "label": "Confirm the water crossing",
        "detail": "If visiting Gberefu, agree the crossing, guide and return arrangement before departure."
      },
      {
        "label": "Allow Lagos road time",
        "detail": "Do not schedule a tight evening commitment after a Badagry day trip."
      },
      {
        "label": "Photograph respectfully",
        "detail": "Ask before photographing people, sacred spaces or sensitive memorial material."
      }
    ],
    "source": {
      "label": "Badagry Local Government — Historic Monuments",
      "href": "https://badagry.lg.gov.ng/historical-monuments/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "akwa-ibom-coast-guide",
    "title": "Akwa Ibom Coast Guide: Ibeno Beach, Ikot Abasi & Waterfront Planning",
    "shortTitle": "Akwa Ibom Coast",
    "kind": "destination",
    "region": "Akwa Ibom State",
    "summary": "Plan an Akwa Ibom coastal trip around Ibeno Beach and Ikot Abasi heritage with weather, road and water-safety checks before travelling.",
    "intro": [
      "Akwa Ibom's Atlantic coast and riverine heritage create a distinct travel intent from an Uyo city break, especially for travellers looking for beaches and historic waterfront sites.",
      "Beach and waterfront conditions are dynamic. Confirm access, surf or water conditions, transport and the return plan close to your visit instead of treating old leisure listings as permanent."
    ],
    "bestFor": [
      "Beaches",
      "Coast",
      "History",
      "Road trips"
    ],
    "highlights": [
      {
        "name": "Ibeno Beach",
        "detail": "The long Atlantic shoreline is the core coastal attraction and deserves a dedicated beach block rather than a rushed stop."
      },
      {
        "name": "Ikot Abasi heritage",
        "detail": "The Bridge of No Return and wider waterfront history add a serious heritage dimension to the coast."
      },
      {
        "name": "Marina and waterfront leisure",
        "detail": "Current public access to organised waterfront facilities should be checked before setting out."
      },
      {
        "name": "Uyo base",
        "detail": "Uyo remains useful for accommodation and transport planning even when the day's focus is the coast."
      }
    ],
    "planning": [
      {
        "label": "Check sea conditions",
        "detail": "Do not enter rough water simply because the beach is open."
      },
      {
        "label": "Confirm public access",
        "detail": "Beach, marina and heritage-site access can change with works or private operations."
      },
      {
        "label": "Allow road time",
        "detail": "Coastal sites can be far from Uyo; avoid stacking distant stops."
      },
      {
        "label": "Plan the return first",
        "detail": "Decide how you are getting back before staying for a late waterfront period."
      }
    ],
    "source": {
      "label": "Akwa Ibom State Government — About Akwa Ibom",
      "href": "https://akwaibomstate.gov.ng/about-akwa-ibom/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "agbokim-waterfalls-guide",
    "title": "Agbokim Waterfalls Guide: Cross River Route, Access & Trip Planning",
    "shortTitle": "Agbokim Waterfalls",
    "kind": "destination",
    "region": "Cross River State",
    "summary": "Plan Agbokim Waterfalls with current road and access checks, especially while Cross River State continues tourism-site development and infrastructure work.",
    "intro": [
      "Agbokim Waterfalls is one of Cross River's strongest standalone nature destinations and has a different trip profile from Calabar or Obudu.",
      "Cross River tourism officials inspected the site in 2026 as part of renewed development attention, but road and visitor conditions still need live confirmation before a long trip."
    ],
    "bestFor": [
      "Waterfalls",
      "Nature",
      "Photography",
      "Cross River road trips"
    ],
    "highlights": [
      {
        "name": "Agbokim Waterfalls",
        "detail": "The multi-stream waterfall landscape is the destination anchor and should be given a dedicated visit window."
      },
      {
        "name": "Etung landscape",
        "detail": "The rural setting adds scenery but also increases dependence on current road and local-access information."
      },
      {
        "name": "Ikom heritage option",
        "detail": "The Alok monoliths form a separate cultural stop in the wider Ikom area when time and conditions permit."
      },
      {
        "name": "Afi option",
        "detail": "Afi Mountain is another major nature cluster, better treated as a separate excursion than a rushed add-on."
      }
    ],
    "planning": [
      {
        "label": "Check the approach road",
        "detail": "Confirm current conditions close to the day of travel."
      },
      {
        "label": "Use local guidance",
        "detail": "Ask about the recognised access route and safe viewing areas."
      },
      {
        "label": "Watch rainfall",
        "detail": "Heavy rain changes water volume, trail conditions and road comfort."
      },
      {
        "label": "Keep a daylight return",
        "detail": "Do not depend on a late rural departure after a long waterfall stop."
      }
    ],
    "source": {
      "label": "Cross River State Government — Agbokim tourism inspection",
      "href": "https://news.crossriverstate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "alok-ikom-monoliths-guide",
    "title": "Alok Ikom Monoliths Guide: Cross River Stone Heritage & Access",
    "shortTitle": "Alok Ikom Monoliths",
    "kind": "destination",
    "region": "Cross River State",
    "summary": "Visit the Alok/Ikom stone monolith heritage with local guidance, respectful photography and enough time to understand the cultural landscape rather than treating it as a photo stop.",
    "intro": [
      "The carved stone monoliths around Ikom are one of Nigeria's distinctive archaeological and cultural heritage clusters and are recognised on UNESCO's Tentative List.",
      "They sit within living communities, so current local access and interpretation matter. Use a guide or community contact and do not touch, climb or move heritage objects."
    ],
    "bestFor": [
      "Archaeology",
      "Culture",
      "History",
      "Heritage"
    ],
    "highlights": [
      {
        "name": "Carved stone monoliths",
        "detail": "The stones are the core heritage asset and should be viewed as archaeological objects, not props."
      },
      {
        "name": "Alok community context",
        "detail": "Local interpretation helps explain the setting and reduces the risk of misreading the stones through generic online summaries."
      },
      {
        "name": "Ikom gateway",
        "detail": "Ikom is the practical base for arranging local movement and wider Cross River excursions."
      },
      {
        "name": "Agbokim connection",
        "detail": "The waterfall is another major attraction in the wider area but needs its own weather and road planning."
      }
    ],
    "planning": [
      {
        "label": "Arrange local guidance",
        "detail": "Confirm who can show you the recognised visitor areas and explain local expectations."
      },
      {
        "label": "Do not touch the stones",
        "detail": "Treat the monoliths as vulnerable heritage objects."
      },
      {
        "label": "Ask before photography",
        "detail": "Community and heritage-site rules may differ by location."
      },
      {
        "label": "Plan rural movement",
        "detail": "Keep fuel, daylight and road-condition buffers for travel outside Ikom."
      }
    ],
    "source": {
      "label": "UNESCO World Heritage Centre — Alok Ikom Stone Monoliths Tentative List",
      "href": "https://whc.unesco.org/en/tentativelists/5173/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "afi-mountain-wildlife-guide",
    "title": "Afi Mountain Wildlife Guide: Sanctuary Access, Hiking & Conservation",
    "shortTitle": "Afi Mountain",
    "kind": "destination",
    "region": "Cross River State",
    "summary": "Plan Afi Mountain as a conservation-focused Cross River trip with current sanctuary access, guide, road and weather checks before leaving for Boki.",
    "intro": [
      "Afi Mountain is a biodiversity and conservation destination, not an ordinary roadside attraction, and it deserves a focused planning page for travellers interested in wildlife and forest landscapes.",
      "Wildlife sightings are never guaranteed. Confirm sanctuary access, guides, current trail conditions and any conservation restrictions rather than planning around a promised animal encounter."
    ],
    "bestFor": [
      "Wildlife",
      "Conservation",
      "Forest",
      "Hiking"
    ],
    "highlights": [
      {
        "name": "Afi Mountain Wildlife Sanctuary",
        "detail": "The protected forest landscape is the main reason to visit and conservation rules take priority over convenience."
      },
      {
        "name": "Primate conservation",
        "detail": "The wider Afi area is known for important primate and forest conservation work, but sightings depend on nature rather than schedules."
      },
      {
        "name": "Boki landscape",
        "detail": "The remote terrain makes the journey part of the experience and requires more planning than a city excursion."
      },
      {
        "name": "Cross River biodiversity",
        "detail": "Afi fits into the state's larger rainforest story alongside Cross River National Park."
      }
    ],
    "planning": [
      {
        "label": "Confirm sanctuary access",
        "detail": "Check whether visitors need advance contact, a guide or specific entry arrangements."
      },
      {
        "label": "Do not chase wildlife",
        "detail": "Follow guide instructions and keep distance from animals."
      },
      {
        "label": "Prepare for forest conditions",
        "detail": "Use suitable footwear, rain protection and water."
      },
      {
        "label": "Keep the itinerary conservative",
        "detail": "Remote road and trail time can exceed optimistic online estimates."
      }
    ],
    "source": {
      "label": "Cross River Ministry of Tourism, Arts and Culture — Tourist Sites",
      "href": "https://crs-motac.org/tourists.php"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "okomu-national-park-guide",
    "title": "Okomu National Park Guide: Edo Rainforest, Wildlife & Benin City Planning",
    "shortTitle": "Okomu National Park",
    "kind": "destination",
    "region": "Edo State",
    "summary": "Plan Okomu National Park as a conservation-focused Edo trip with current park access, guide and road checks, using Benin City as the practical gateway.",
    "intro": [
      "Okomu National Park protects an important rainforest area in Edo State and answers a distinct wildlife-and-forest intent beyond a Benin City heritage guide.",
      "National parks are managed environments: confirm current entry, guide, lodging or camp availability and permitted routes directly rather than relying on old safari-style travel posts."
    ],
    "bestFor": [
      "Rainforest",
      "Wildlife",
      "Birding",
      "Conservation"
    ],
    "highlights": [
      {
        "name": "Okomu rainforest",
        "detail": "The protected forest is the trip anchor and should be visited through current park-approved routes."
      },
      {
        "name": "Wildlife and birding",
        "detail": "The park supports significant biodiversity, but sightings are never guaranteed."
      },
      {
        "name": "Arakhuan visitor area",
        "detail": "Use the park's current visitor arrangements rather than assuming older camp or facility details still apply."
      },
      {
        "name": "Benin City gateway",
        "detail": "Benin's museum and Igun Street can form a separate heritage block before or after the park trip."
      }
    ],
    "planning": [
      {
        "label": "Contact the park first",
        "detail": "Confirm entry, guide, road and accommodation arrangements before travelling."
      },
      {
        "label": "Prepare for rainforest weather",
        "detail": "Carry rain protection, suitable footwear, water and insect protection."
      },
      {
        "label": "Keep wildlife distance",
        "detail": "Do not feed, pursue or approach animals for photos."
      },
      {
        "label": "Separate park and city time",
        "detail": "Avoid turning a forest visit into a rushed same-day checklist of Benin attractions."
      }
    ],
    "source": {
      "label": "Nigeria Park Service — Okomu National Park",
      "href": "https://nigeriaparkservice.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "mambilla-plateau-guide",
    "title": "Mambilla Plateau Guide: Gembu, Highland Weather & Road Trip Planning",
    "shortTitle": "Mambilla Plateau",
    "kind": "destination",
    "region": "Taraba State",
    "summary": "Plan the Mambilla Plateau as a multi-day highland road trip based around Gembu, with current road, weather, local-access and security checks before travelling.",
    "intro": [
      "The Mambilla Plateau is one of Nigeria's major highland landscapes and has a distinct destination intent that cannot be served well by a generic Taraba list.",
      "Distance and road variability make this a trip to plan conservatively. Use Gembu as a practical highland base and confirm current travel conditions before setting out."
    ],
    "bestFor": [
      "Highlands",
      "Scenery",
      "Road trips",
      "Cooler weather"
    ],
    "highlights": [
      {
        "name": "Mambilla highlands",
        "detail": "Rolling highland scenery and cooler conditions are the main draw, best appreciated over more than a rushed day."
      },
      {
        "name": "Gembu",
        "detail": "The town is the practical centre for arranging local transport, supplies and overnight logistics."
      },
      {
        "name": "Tea-growing landscape",
        "detail": "Tea is part of the plateau's identity; any estate or factory access should be arranged directly rather than assumed."
      },
      {
        "name": "Weather changes",
        "detail": "Highland rain, mist and visibility can alter driving and sightseeing plans quickly."
      }
    ],
    "planning": [
      {
        "label": "Plan multiple days",
        "detail": "Do not treat the plateau as a quick detour from distant Nigerian cities."
      },
      {
        "label": "Check the road",
        "detail": "Verify current route and travel-time conditions close to departure."
      },
      {
        "label": "Pack for cooler weather",
        "detail": "Even in Nigeria, highland temperatures and rain can require warmer or waterproof layers."
      },
      {
        "label": "Use local guidance",
        "detail": "Confirm which viewpoints, farms or natural areas are open and appropriate to visit."
      }
    ],
    "source": {
      "label": "Taraba State Government",
      "href": "https://www.tarabastate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "cross-river-national-park-guide",
    "title": "Cross River National Park Guide: Oban, Okwangwo & Rainforest Planning",
    "shortTitle": "Cross River National Park",
    "kind": "destination",
    "region": "Cross River State",
    "summary": "Plan Cross River National Park around the correct division, current park access and conservation rules instead of treating the vast rainforest as one simple roadside attraction.",
    "intro": [
      "Cross River National Park spans major rainforest landscapes in the Oban and Okwangwo divisions and requires more precise planning than a generic 'visit the park' itinerary.",
      "Choose the division that matches your route and interest, contact park authorities before travelling, and treat wildlife, community and conservation restrictions as core trip requirements."
    ],
    "bestFor": [
      "Rainforest",
      "Wildlife",
      "Conservation",
      "Hiking"
    ],
    "highlights": [
      {
        "name": "Oban Division",
        "detail": "The southern division is part of the Cross River rainforest complex and is approached differently from the northern park areas."
      },
      {
        "name": "Okwangwo Division",
        "detail": "The northern division connects to the wider mountain and forest conservation landscape near Boki and Obanliku."
      },
      {
        "name": "High biodiversity",
        "detail": "The park's value is ecological; wildlife sightings should never be treated as guaranteed attractions."
      },
      {
        "name": "Conservation landscape",
        "detail": "UNESCO's tentative-list material places the park within a broader rainforest and cultural landscape of international importance."
      }
    ],
    "planning": [
      {
        "label": "Choose a division first",
        "detail": "Do not set out for 'Cross River National Park' without knowing the correct access point."
      },
      {
        "label": "Contact park authorities",
        "detail": "Confirm guide, entry, road and trail arrangements before departure."
      },
      {
        "label": "Prepare for rainforest conditions",
        "detail": "Bring suitable footwear, rain protection, water and insect protection."
      },
      {
        "label": "Respect conservation rules",
        "detail": "Stay on approved routes and never disturb wildlife or remove natural material."
      }
    ],
    "source": {
      "label": "UNESCO World Heritage Centre — Cross River-Korup-Takamanda-Okwangwo tentative landscape",
      "href": "https://whc.unesco.org/en/tentativelists/6204/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "arochukwu-long-juju-guide",
    "title": "Arochukwu Long Juju Guide: Cave Temple, Abia Heritage & Respectful Visit",
    "shortTitle": "Arochukwu Long Juju",
    "kind": "destination",
    "region": "Abia State",
    "summary": "Plan an Arochukwu heritage trip around the Long Juju cave-temple landscape with a knowledgeable local guide, respectful access and realistic road time.",
    "intro": [
      "Arochukwu's Long Juju heritage landscape has deep religious, political and historical significance and is recognised on Nigeria's UNESCO Tentative List.",
      "It is not an ordinary entertainment attraction. Arrange appropriate local guidance, follow restrictions around sacred areas and use careful historical interpretation rather than sensationalised retellings."
    ],
    "bestFor": [
      "Heritage",
      "History",
      "Caves",
      "Culture"
    ],
    "highlights": [
      {
        "name": "Long Juju cave-temple landscape",
        "detail": "The historic religious complex is the core destination and should be visited with appropriate interpretation."
      },
      {
        "name": "Arochukwu heritage",
        "detail": "The town's wider history adds context that a standalone cave visit cannot provide."
      },
      {
        "name": "Ibom Waterfall",
        "detail": "Nearby nature attractions can complement a longer Arochukwu trip when current local access allows."
      },
      {
        "name": "Umuahia history connection",
        "detail": "The National War Museum is another important Abia heritage cluster but requires separate road time."
      }
    ],
    "planning": [
      {
        "label": "Use a knowledgeable local guide",
        "detail": "Context and appropriate access matter at a living sacred and heritage landscape."
      },
      {
        "label": "Respect restricted areas",
        "detail": "Do not enter, touch or photograph sacred spaces without permission."
      },
      {
        "label": "Allow road time",
        "detail": "Arochukwu is better treated as a dedicated excursion than a rushed Umuahia add-on."
      },
      {
        "label": "Use careful history",
        "detail": "Prefer museum, heritage and scholarly interpretation over sensational stories copied online."
      }
    ],
    "source": {
      "label": "UNESCO World Heritage Centre — Arochukwu Long Juju Slave Route Tentative List",
      "href": "https://whc.unesco.org/en/tentativelists/5172/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "lagos-3-day-itinerary",
    "title": "3 Days in Lagos: A Practical First-Time Itinerary",
    "shortTitle": "3 Days in Lagos",
    "kind": "itinerary",
    "region": "Lagos State",
    "summary": "Spend three days in Lagos without wasting the trip in traffic: use one cultural day, one Lekki nature-and-art day and one flexible food or waterfront day.",
    "intro": [
      "A three-day Lagos trip works best when each day stays in one broad part of the city. The goal is not to collect attractions; it is to reduce cross-city movement and leave enough time for meals, traffic and unexpected delays.",
      "This itinerary uses durable places already verified in the Lagos guide and keeps live prices, reservations and opening hours as checks to make close to the trip."
    ],
    "bestFor": [
      "First-time visitors",
      "Long weekends",
      "Art & culture",
      "Nature"
    ],
    "highlights": [
      {
        "name": "Day 1 — Lagos history and culture",
        "detail": "Start with the National Museum area, then keep the rest of the day around nearby cultural or dining stops instead of crossing the city repeatedly."
      },
      {
        "name": "Day 2 — Lekki nature and art",
        "detail": "Pair Lekki Conservation Centre with Nike Art Gallery because they sit on the same broad axis and answer different interests without a major cross-city detour."
      },
      {
        "name": "Day 3 — food and waterfront time",
        "detail": "Keep the final day flexible for a restaurant, waterfront meal, shopping or a slower neighbourhood block before departure."
      },
      {
        "name": "Traffic buffer",
        "detail": "Protect each day with a generous movement window, especially around bridges, rush hours and airport travel."
      }
    ],
    "planning": [
      {
        "label": "Stay near your main cluster",
        "detail": "Choose accommodation based on where most of your planned stops are, not only on the cheapest room rate."
      },
      {
        "label": "Do not overbook evenings",
        "detail": "A delayed afternoon journey can easily destroy a tightly timed dinner or show reservation."
      },
      {
        "label": "Confirm attraction access",
        "detail": "Check opening hours and any admission change for museums, galleries and conservation sites close to the visit."
      },
      {
        "label": "Protect the airport day",
        "detail": "Keep the final hours light and leave a large buffer for the airport rather than adding one last distant attraction."
      }
    ],
    "source": {
      "label": "Lagos State Ministry of Tourism, Arts & Culture",
      "href": "https://tourismartandculture.lagosstate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "abuja-weekend-itinerary",
    "title": "Weekend in Abuja: 48-Hour First-Time Itinerary",
    "shortTitle": "Weekend in Abuja",
    "kind": "itinerary",
    "region": "Federal Capital Territory",
    "summary": "Use 48 hours in Abuja for central landmarks, green space, Jabi or dining time and one relaxed final block instead of rushing between distant districts.",
    "intro": [
      "Abuja is spread out enough that a weekend works better by district than by a long checklist. Current visitor guidance from Visit Abuja also recommends grouping activities and allowing time between stops.",
      "The plan below keeps major central landmarks together, leaves room for a park or lake block, and avoids treating a weekend as a race across Maitama, Jabi, Wuse, Garki and the city outskirts."
    ],
    "bestFor": [
      "First-time visitors",
      "48-hour trips",
      "Landmarks",
      "Relaxed city breaks"
    ],
    "highlights": [
      {
        "name": "Friday — arrive and settle",
        "detail": "Use the first evening for a nearby meal or a quiet district rather than starting with cross-city sightseeing after the airport drive."
      },
      {
        "name": "Saturday — central landmarks",
        "detail": "Combine the National Mosque, National Christian Centre and Millennium Park in one central-area block, respecting worship and access rules."
      },
      {
        "name": "Saturday evening — one social district",
        "detail": "Choose Jabi, Wuse or another single area for dinner and leisure instead of bouncing across the city."
      },
      {
        "name": "Sunday — one final experience",
        "detail": "Use the last block for a market, gallery, park or relaxed meal before departure rather than trying to finish every major attraction."
      }
    ],
    "planning": [
      {
        "label": "Group by district",
        "detail": "Avoid repeated journeys between Jabi, Maitama, Asokoro and Wuse on the same day."
      },
      {
        "label": "Keep Sunday flexible",
        "detail": "Leave enough time for brunch, traffic and the airport rather than locking in a distant excursion."
      },
      {
        "label": "Respect formal areas",
        "detail": "Government and worship zones can have photography, parking or access restrictions."
      },
      {
        "label": "Confirm live hours",
        "detail": "Check the places you actually plan to enter close to the weekend."
      }
    ],
    "source": {
      "label": "Visit Abuja — First 48 Hours",
      "href": "https://www.visitabuja.org/first-48-hours-in-abuja/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "benin-city-weekend-itinerary",
    "title": "Weekend in Benin City: Heritage, Bronze & Food Itinerary",
    "shortTitle": "Weekend in Benin City",
    "kind": "itinerary",
    "region": "Edo State",
    "summary": "Build a Benin City weekend around the museum, Igun bronze-casting heritage and relaxed food stops while leaving royal and sacred access to current local guidance.",
    "intro": [
      "Benin City is strongest when a short trip has one clear theme: the history and living culture of the Benin Kingdom. That makes a heritage-led weekend more useful than a generic list of places.",
      "Use the museum and Igun Street for context, then keep royal or ceremonial areas flexible because access and photography rules can change."
    ],
    "bestFor": [
      "History",
      "Benin art",
      "Weekend breaks",
      "Culture"
    ],
    "highlights": [
      {
        "name": "Day 1 — museum context",
        "detail": "Start with the National Museum so the art, kingdom history and later heritage stops make more sense."
      },
      {
        "name": "Day 1 — Igun Street",
        "detail": "Visit the bronze-casting district with enough time to look at workshops and ask before photographing people or workspaces."
      },
      {
        "name": "Evening — local dining",
        "detail": "Use one verified restaurant stop and keep transport simple rather than crossing the city repeatedly."
      },
      {
        "name": "Day 2 — flexible heritage block",
        "detail": "Use the second morning for an open heritage or palace-area experience only after checking current visitor rules."
      }
    ],
    "planning": [
      {
        "label": "Ask before photographing",
        "detail": "Royal, workshop and sacred settings may have restrictions even when nearby streets are public."
      },
      {
        "label": "Do not force palace access",
        "detail": "Visit only areas currently open to the public and follow local instructions."
      },
      {
        "label": "Keep Okomu separate",
        "detail": "The national park deserves its own dedicated trip rather than a rushed add-on to a city weekend."
      },
      {
        "label": "Use daylight for heritage stops",
        "detail": "Start cultural visits early enough to avoid a rushed close-of-day schedule."
      }
    ],
    "source": {
      "label": "Edo State Government tourism overview",
      "href": "https://edostate.gov.ng/your-tourist-destinations-in-edo-state-this-easter-holiday/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "calabar-weekend-itinerary",
    "title": "Weekend in Calabar: History, Marina & Food Itinerary",
    "shortTitle": "Weekend in Calabar",
    "kind": "itinerary",
    "region": "Cross River State",
    "summary": "Use a Calabar weekend for the city's history, marina waterfront and food, keeping rainforest and Obudu trips outside the short city itinerary.",
    "intro": [
      "Calabar can fill a weekend without forcing a long Cross River road trip. The city works best when history, the waterfront and food are treated as the main experience.",
      "Remote nature destinations elsewhere in the state deserve separate days. This short itinerary stays in Calabar so the weekend remains realistic."
    ],
    "bestFor": [
      "History",
      "Waterfront",
      "Food",
      "Weekend breaks"
    ],
    "highlights": [
      {
        "name": "Day 1 — historic Calabar",
        "detail": "Use the Slave History Museum and nearby heritage context as the main cultural block rather than rushing between unrelated stops."
      },
      {
        "name": "Day 1 — Marina",
        "detail": "Move into the Marina Resort area for a slower waterfront period after the history-focused morning."
      },
      {
        "name": "Evening — Calabar food",
        "detail": "Build dinner around a current local option and leave room for the city's food culture rather than overloading the sightseeing list."
      },
      {
        "name": "Day 2 — flexible city time",
        "detail": "Use the final day for another museum, waterfront stop or relaxed meal depending on current opening and weather."
      }
    ],
    "planning": [
      {
        "label": "Keep Obudu out of a city weekend",
        "detail": "The road time makes it a separate trip, not a casual Calabar add-on."
      },
      {
        "label": "Check attraction operations",
        "detail": "Facilities inside leisure complexes can change independently."
      },
      {
        "label": "Book earlier in December",
        "detail": "Festival season can increase transport and accommodation demand."
      },
      {
        "label": "Leave a weather buffer",
        "detail": "Heavy rain can change waterfront and outdoor plans quickly."
      }
    ],
    "source": {
      "label": "Cross River Ministry of Tourism, Arts & Culture",
      "href": "https://www.crs-motac.org/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "port-harcourt-weekend-itinerary",
    "title": "Weekend in Port Harcourt: Parks, Bole & City Itinerary",
    "shortTitle": "Weekend in Port Harcourt",
    "kind": "itinerary",
    "region": "Rivers State",
    "summary": "Plan a Port Harcourt weekend around one recreation block, local food and a comfortable stay while keeping riverine excursions for a separate day.",
    "intro": [
      "A short Port Harcourt trip is easier when city experiences stay on land and water-based excursions are treated as a separate decision. That avoids making a weekend depend on boat schedules or remote access.",
      "Use a park, a strong Rivers-style meal and a relaxed hotel or leisure block as the core, then add anything farther only if current conditions support it."
    ],
    "bestFor": [
      "Food",
      "City breaks",
      "Parks",
      "Relaxed weekends"
    ],
    "highlights": [
      {
        "name": "Day 1 — Pleasure Park",
        "detail": "Use the major urban recreation stop as an easy first anchor after arrival."
      },
      {
        "name": "Day 1 — bole and local food",
        "detail": "Make Rivers food part of the itinerary instead of treating meals as filler between attractions."
      },
      {
        "name": "Evening — one leisure base",
        "detail": "Keep the evening around a verified hotel, restaurant or nearby entertainment area to reduce unnecessary movement."
      },
      {
        "name": "Day 2 — optional culture block",
        "detail": "Use the second day for another city experience unless a properly planned riverine trip is already arranged."
      }
    ],
    "planning": [
      {
        "label": "Separate water trips",
        "detail": "Do not make a weekend city plan depend on a last-minute boat excursion."
      },
      {
        "label": "Confirm local transport",
        "detail": "Arrange a reliable return option before staying out late."
      },
      {
        "label": "Watch heavy rain",
        "detail": "Weather can affect both roads and waterfront plans."
      },
      {
        "label": "Keep the final day light",
        "detail": "Allow time for traffic and departure rather than squeezing in a distant stop."
      }
    ],
    "source": {
      "label": "Rivers State Tourism Development Agency",
      "href": "https://rstda.rv.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "kano-2-day-itinerary",
    "title": "2 Days in Kano: Old City, Dala Hill & Food Itinerary",
    "shortTitle": "2 Days in Kano",
    "kind": "itinerary",
    "region": "Kano State",
    "summary": "Use two days in Kano for old-city history, Dala Hill and a relaxed food block, with respectful access around traditional and religious areas.",
    "intro": [
      "Kano's strongest short-trip value comes from the old-city story, not from trying to cover the whole metropolis. A two-day plan can give history, views and food enough time to breathe.",
      "Traditional and religious sites remain active places. Dress appropriately, follow current visitor guidance and ask before photographing people or sensitive spaces."
    ],
    "bestFor": [
      "Old-city history",
      "Culture",
      "Architecture",
      "Short breaks"
    ],
    "highlights": [
      {
        "name": "Day 1 — Gidan Makama",
        "detail": "Start with the museum for historical context before exploring other old-city landmarks."
      },
      {
        "name": "Day 1 — Dala Hill",
        "detail": "Use the hill as a separate viewpoint block and account for heat and the physical climb."
      },
      {
        "name": "Evening — Kano dining",
        "detail": "Choose a current restaurant or food area and keep the first night relaxed."
      },
      {
        "name": "Day 2 — old-city focus",
        "detail": "Use the final day for markets, architecture or cultural stops that are open and appropriate to visit."
      }
    ],
    "planning": [
      {
        "label": "Respect worship and tradition",
        "detail": "Dress and behave appropriately around religious and royal areas."
      },
      {
        "label": "Ask before photos",
        "detail": "Do not assume markets, workshops or traditional sites are unrestricted photography spaces."
      },
      {
        "label": "Avoid peak heat",
        "detail": "Schedule climbs and long walks earlier or later in the day."
      },
      {
        "label": "Use local guidance",
        "detail": "A knowledgeable local guide can add context and prevent accidental entry into restricted areas."
      }
    ],
    "source": {
      "label": "Kano State Government — History",
      "href": "https://kanostate.gov.ng/history/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "jos-weekend-itinerary",
    "title": "Weekend in Jos: Museum, Wildlife Park & Plateau Break",
    "shortTitle": "Weekend in Jos",
    "kind": "itinerary",
    "region": "Plateau State",
    "summary": "Spend a Jos weekend around the museum, wildlife park and the city's cooler plateau atmosphere without overloading the trip with distant Plateau excursions.",
    "intro": [
      "Jos can support a comfortable weekend with a museum-and-nature mix inside the city area. That is a different trip from a longer Plateau State road circuit.",
      "The plan below keeps the short break compact and leaves remote rock formations, waterfalls or rural sites for dedicated excursions."
    ],
    "bestFor": [
      "Cooler weather",
      "Museums",
      "Nature",
      "Weekend breaks"
    ],
    "highlights": [
      {
        "name": "Day 1 — museum block",
        "detail": "Use the Jos Museum area as the first cultural stop while energy and daylight are good."
      },
      {
        "name": "Day 1 — local dining",
        "detail": "Choose one current restaurant and allow a slower evening rather than adding another distant attraction."
      },
      {
        "name": "Day 2 — wildlife park",
        "detail": "Use the park as the main outdoor block and confirm current operating details before setting out."
      },
      {
        "name": "Plateau pace",
        "detail": "Leave room for weather changes and the city's slower highland rhythm."
      }
    ],
    "planning": [
      {
        "label": "Check current opening",
        "detail": "Museum and wildlife facilities can change hours or operating conditions."
      },
      {
        "label": "Pack for cooler evenings",
        "detail": "Jos can feel noticeably cooler than many Nigerian cities."
      },
      {
        "label": "Do not chase wildlife",
        "detail": "Follow park rules and treat sightings as unpredictable."
      },
      {
        "label": "Keep rural trips separate",
        "detail": "Use another day for destinations well outside Jos."
      }
    ],
    "source": {
      "label": "Visit Plateau",
      "href": "https://visitplateau.com/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "enugu-weekend-itinerary",
    "title": "Weekend in Enugu: City, Ngwo & Food Itinerary",
    "shortTitle": "Weekend in Enugu",
    "kind": "itinerary",
    "region": "Enugu State",
    "summary": "Plan an Enugu weekend with one city block and one nearby nature trip, choosing Ngwo or Awhum rather than forcing both into an unrealistic schedule.",
    "intro": [
      "Enugu works well for a weekend when the city and one nature excursion are balanced. The mistake is trying to fit both Ngwo and Awhum plus several city stops into the same short window.",
      "Tourism infrastructure around major Enugu attractions is changing, so confirm current access before deciding which nature stop belongs in your weekend."
    ],
    "bestFor": [
      "Nature",
      "Food",
      "Weekend breaks",
      "Short road trips"
    ],
    "highlights": [
      {
        "name": "Day 1 — Enugu city",
        "detail": "Use a relaxed city block for food, local culture and your hotel area after arrival."
      },
      {
        "name": "Day 2 — choose Ngwo or Awhum",
        "detail": "Pick one major nature outing based on current access, weather and road conditions."
      },
      {
        "name": "Nike Lake option",
        "detail": "A lake or resort stop can work as a slower alternative if a waterfall or forest trip is not suitable."
      },
      {
        "name": "Local food",
        "detail": "Build time around a proper Enugu meal instead of rushing between distant attractions."
      }
    ],
    "planning": [
      {
        "label": "Choose one nature anchor",
        "detail": "Do not make the weekend depend on two separate rural excursions."
      },
      {
        "label": "Check tourism works",
        "detail": "Development projects can affect routes and visitor access."
      },
      {
        "label": "Watch rain",
        "detail": "Wet weather can make forest and waterfall surfaces harder to use."
      },
      {
        "label": "Return before dark",
        "detail": "Keep a daylight buffer for rural approaches and the drive back."
      }
    ],
    "source": {
      "label": "Enugu State Government",
      "href": "https://enugustate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ibadan-weekend-itinerary",
    "title": "Weekend in Ibadan: Agodi, Bower's Tower & Museum Itinerary",
    "shortTitle": "Weekend in Ibadan",
    "kind": "itinerary",
    "region": "Oyo State",
    "summary": "Use a weekend in Ibadan for one nature block, one city viewpoint and one museum stop, keeping travel time realistic across the large city.",
    "intro": [
      "Ibadan is geographically large, so a weekend becomes tiring if the route jumps between distant neighbourhoods. Use one or two clusters per day.",
      "Agodi Gardens, Bower's Tower and the National Museum of Unity provide a simple nature-viewpoint-history mix without needing a long excursion outside the city."
    ],
    "bestFor": [
      "City breaks",
      "History",
      "Parks",
      "Views"
    ],
    "highlights": [
      {
        "name": "Day 1 — Agodi Gardens",
        "detail": "Use the park as a relaxed first stop after arrival rather than beginning with a long cross-city route."
      },
      {
        "name": "Day 1 — city food or evening",
        "detail": "Keep the rest of the day nearby and leave time for traffic."
      },
      {
        "name": "Day 2 — Bower's Tower",
        "detail": "Use the elevated landmark as one morning block, checking current access before climbing."
      },
      {
        "name": "Day 2 — museum context",
        "detail": "Finish with the National Museum of Unity if its current opening fits your departure schedule."
      }
    ],
    "planning": [
      {
        "label": "Plan by neighbourhood",
        "detail": "Ibadan's size makes route order more important than the number of attractions."
      },
      {
        "label": "Check opening times",
        "detail": "Confirm museum and park operations close to the weekend."
      },
      {
        "label": "Avoid a tight departure",
        "detail": "Road traffic can extend travel time significantly."
      },
      {
        "label": "Keep one flexible block",
        "detail": "Leave room to swap stops if weather or access changes."
      }
    ],
    "source": {
      "label": "Oyo State Government — About Oyo State",
      "href": "https://oyostate.gov.ng/about-oyo-state/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "abeokuta-day-trip-itinerary",
    "title": "Abeokuta Day Trip: Olumo Rock, Itoku & Ake Itinerary",
    "shortTitle": "Abeokuta Day Trip",
    "kind": "itinerary",
    "region": "Ogun State",
    "summary": "Use one day in Abeokuta for Olumo Rock, Itoku adire and the Ake heritage area, keeping the route compact enough for a same-day return.",
    "intro": [
      "Abeokuta is one of the strongest day-trip destinations in southwest Nigeria because major heritage stops can be grouped around a clear city story.",
      "This route starts with the physically demanding rock visit, then shifts to craft and heritage stops so the day becomes easier rather than harder."
    ],
    "bestFor": [
      "Day trips",
      "Egba history",
      "Crafts",
      "Rock scenery"
    ],
    "highlights": [
      {
        "name": "Morning — Olumo Rock",
        "detail": "Start early with the climb before the hottest part of the day and while energy is highest."
      },
      {
        "name": "Midday — Itoku Adire Market",
        "detail": "Move into the nearby textile and craft district for shopping and cultural context."
      },
      {
        "name": "Afternoon — Ake heritage",
        "detail": "Use the palace and Centenary Hall area as the final historical block if current access permits."
      },
      {
        "name": "Return buffer",
        "detail": "Leave Abeokuta with enough daylight and road margin instead of adding one more distant stop."
      }
    ],
    "planning": [
      {
        "label": "Start early",
        "detail": "The rock climb is easier before peak heat."
      },
      {
        "label": "Wear practical shoes",
        "detail": "Steps and rock surfaces need better footwear than a casual city stroll."
      },
      {
        "label": "Ask before photos",
        "detail": "Markets and palace-related spaces may have their own rules."
      },
      {
        "label": "Protect the return time",
        "detail": "Do not turn a day trip into a late-night road journey for one extra stop."
      }
    ],
    "source": {
      "label": "Ogun State investment and tourism information",
      "href": "https://invest.ogunstate.gov.ng/blogdetails?id=7"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "osogbo-ile-ife-weekend-itinerary",
    "title": "Osogbo & Ile-Ife Weekend: Yoruba Heritage Itinerary",
    "shortTitle": "Osogbo & Ile-Ife Weekend",
    "kind": "itinerary",
    "region": "Osun State",
    "summary": "Use a two-city Osun weekend for the Osun-Osogbo Sacred Grove, Osogbo art and Ile-Ife royal and museum heritage without rushing both cities in one day.",
    "intro": [
      "Osogbo and Ile-Ife answer a shared Yoruba heritage trip intent but each deserves its own block. A weekend works better than a same-day sprint between every major site.",
      "The sacred grove, palaces and museums are culturally significant spaces. Current access and photography rules should shape the route."
    ],
    "bestFor": [
      "Yoruba heritage",
      "UNESCO",
      "Art",
      "Weekend road trips"
    ],
    "highlights": [
      {
        "name": "Day 1 — Osogbo",
        "detail": "Use the Sacred Grove as the main heritage stop, then add Nike Art Centre or the Ataoja Palace area only if time and access allow."
      },
      {
        "name": "Day 2 — Ile-Ife",
        "detail": "Build the second day around the Ooni's Palace area, Moremi monument and the National Museum."
      },
      {
        "name": "Cultural context",
        "detail": "Treat both cities as living cultural centres, not only collections of monuments."
      },
      {
        "name": "Travel buffer",
        "detail": "Keep enough road time between the two cities and for your final departure."
      }
    ],
    "planning": [
      {
        "label": "Respect sacred areas",
        "detail": "Follow site rules inside the grove and around palace spaces."
      },
      {
        "label": "Ask before photography",
        "detail": "Do not assume royal or religious spaces allow unrestricted photography."
      },
      {
        "label": "Use local interpretation",
        "detail": "A knowledgeable guide can add context and reduce shallow or inaccurate storytelling."
      },
      {
        "label": "Do not compress both cities",
        "detail": "Give each city its own day where possible."
      }
    ],
    "source": {
      "label": "Osun State Government — Tourist Centres",
      "href": "https://www.osunstate.gov.ng/tourist-centres/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "uyo-weekend-itinerary",
    "title": "Weekend in Uyo: Museum, Arts & Leisure Itinerary",
    "shortTitle": "Weekend in Uyo",
    "kind": "itinerary",
    "region": "Akwa Ibom State",
    "summary": "Use a Uyo weekend for museums, arts and leisure in the capital, saving Ibeno and the coastal circuit for a separate road-trip day.",
    "intro": [
      "Uyo can support a compact cultural and leisure weekend without depending on a long coastal journey. That makes it a different trip from an Akwa Ibom beach itinerary.",
      "Use city attractions as the core and add the coast only when you have another full day and current transport information."
    ],
    "bestFor": [
      "City breaks",
      "Culture",
      "Leisure",
      "Weekend trips"
    ],
    "highlights": [
      {
        "name": "Day 1 — Ibom Unity Museum",
        "detail": "Use the museum as the cultural anchor and confirm current visitor access before arrival."
      },
      {
        "name": "Day 1 — arts and culture",
        "detail": "Pair it with the State Centre for Arts and Culture when programmes or public access are available."
      },
      {
        "name": "Evening — Tropicana area",
        "detail": "Use the entertainment complex or another current leisure option as a relaxed evening block."
      },
      {
        "name": "Day 2 — flexible city time",
        "detail": "Keep the second day light unless a separate coastal trip has been planned in advance."
      }
    ],
    "planning": [
      {
        "label": "Keep Ibeno separate",
        "detail": "The coast deserves its own road-time and weather planning."
      },
      {
        "label": "Confirm current operations",
        "detail": "Large leisure complexes can have individual facilities open or closed independently."
      },
      {
        "label": "Use one transport base",
        "detail": "Avoid unnecessary cross-city changes during a short stay."
      },
      {
        "label": "Leave departure margin",
        "detail": "Protect the final hours for traffic and onward travel."
      }
    ],
    "source": {
      "label": "Akwa Ibom State Government tourism update",
      "href": "https://akwaibomstate.gov.ng/a-r-i-s-e-agenda-gov-umo-eno-tours-tourism-sites-vows-to-revamp-akwa-ibom-tourism-sector/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ondo-nature-weekend-itinerary",
    "title": "Ondo Nature Weekend: Idanre Hills, Forest & Heritage Itinerary",
    "shortTitle": "Ondo Nature Weekend",
    "kind": "itinerary",
    "region": "Ondo State",
    "summary": "Plan a two-day Ondo nature trip around Idanre Hills and one additional nature or heritage stop instead of attempting the state's coast, forests and hills in a single weekend.",
    "intro": [
      "Ondo has several strong but widely separated nature destinations. A useful weekend itinerary therefore needs a strict route, not a long list of attractions.",
      "Make Idanre the main physical activity, then choose one complementary stop based on where you are staying and current road conditions."
    ],
    "bestFor": [
      "Hiking",
      "Nature",
      "Road trips",
      "Weekend breaks"
    ],
    "highlights": [
      {
        "name": "Day 1 — Idanre Hills",
        "detail": "Give the climb most of the day and avoid stacking another demanding outdoor activity afterwards."
      },
      {
        "name": "Day 2 — choose one cluster",
        "detail": "Use Owo Museum, Akure Forest Reserve or another verified stop based on route and weather."
      },
      {
        "name": "Coast is separate",
        "detail": "Araromi and Igbokoda are a different coastal direction and should not be forced into the same short itinerary."
      },
      {
        "name": "Weather decides the order",
        "detail": "Rain can make climbs, forest roads and coastal travel less comfortable."
      }
    ],
    "planning": [
      {
        "label": "Start the climb early",
        "detail": "Use cooler hours for Idanre and carry water."
      },
      {
        "label": "Choose one second-day anchor",
        "detail": "Do not try to cover hills, forest and coast in 48 hours."
      },
      {
        "label": "Check road conditions",
        "detail": "Rural access can change with weather."
      },
      {
        "label": "Keep daylight for return",
        "detail": "Build a conservative driving margin."
      }
    ],
    "source": {
      "label": "Ondo State tourism information",
      "href": "https://ondostate.gov.ng/tourism"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ekiti-nature-weekend-itinerary",
    "title": "Ekiti Nature Weekend: Ikogosi, Arinta & Ado-Ekiti Itinerary",
    "shortTitle": "Ekiti Nature Weekend",
    "kind": "itinerary",
    "region": "Ekiti State",
    "summary": "Use an Ekiti weekend for Ikogosi Warm Springs, Arinta Waterfalls and a light Ado-Ekiti stop while keeping rain and rural road conditions central to the plan.",
    "intro": [
      "Ikogosi and Arinta create a natural weekend pair because they serve different experiences without requiring a state-wide sightseeing race.",
      "Use Ado-Ekiti as the practical base or final city block, and verify current attraction access before leaving for the rural stops."
    ],
    "bestFor": [
      "Warm springs",
      "Waterfalls",
      "Nature",
      "Weekend trips"
    ],
    "highlights": [
      {
        "name": "Day 1 — Ikogosi",
        "detail": "Use the warm springs as the main destination and confirm current resort access and facilities."
      },
      {
        "name": "Day 2 — Arinta",
        "detail": "Visit the waterfall only when road and weather conditions are suitable."
      },
      {
        "name": "Ado-Ekiti buffer",
        "detail": "Keep the capital as a flexible food, park or overnight block rather than another demanding excursion."
      },
      {
        "name": "Rain-sensitive route",
        "detail": "Be ready to reverse or simplify the order after heavy rain."
      }
    ],
    "planning": [
      {
        "label": "Check both sites live",
        "detail": "Opening and facility conditions can differ between the spring and waterfall."
      },
      {
        "label": "Wear practical footwear",
        "detail": "Wet natural surfaces require grip and care."
      },
      {
        "label": "Travel with daylight",
        "detail": "Rural return journeys are easier before dark."
      },
      {
        "label": "Do not force the waterfall",
        "detail": "If rain or access is poor, keep the weekend around Ikogosi and Ado-Ekiti."
      }
    ],
    "source": {
      "label": "Ekiti State Bureau of Tourism Development",
      "href": "https://www.ekitistate.gov.ng/bureau-of-tourism-development"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "kwara-weekend-itinerary",
    "title": "Kwara Weekend: Ilorin & Owu Falls Itinerary",
    "shortTitle": "Kwara Weekend",
    "kind": "itinerary",
    "region": "Kwara State",
    "summary": "Use a Kwara weekend for an Ilorin culture block and a separate Owu Falls day, with road and weather checks before the waterfall journey.",
    "intro": [
      "Kwara's strongest short itinerary combines an easy Ilorin day with one dedicated nature excursion. The two should not be squeezed together as if Owu Falls were an inner-city stop.",
      "Use the capital for culture, food and overnight logistics, then make the waterfall the second-day anchor only when the road and weather are suitable."
    ],
    "bestFor": [
      "Ilorin",
      "Waterfalls",
      "Culture",
      "Weekend road trips"
    ],
    "highlights": [
      {
        "name": "Day 1 — Ilorin",
        "detail": "Use the Central Mosque area and Flower Garden as a compact city block, respecting worship and local rules."
      },
      {
        "name": "Day 2 — Owu Falls",
        "detail": "Give the rural waterfall trip its own travel window and current local directions."
      },
      {
        "name": "City base",
        "detail": "Use Ilorin for accommodation, meals and transport planning rather than changing bases for a short trip."
      },
      {
        "name": "Fallback plan",
        "detail": "If road or weather conditions are poor, keep the second day in the city instead of forcing the waterfall trip."
      }
    ],
    "planning": [
      {
        "label": "Check the Owu road",
        "detail": "Ask about the final approach before departure."
      },
      {
        "label": "Respect worship",
        "detail": "Dress appropriately and avoid disrupting prayer at the Central Mosque."
      },
      {
        "label": "Carry basics",
        "detail": "Do not assume full visitor services at the waterfall."
      },
      {
        "label": "Return before dark",
        "detail": "Keep enough road margin for delays."
      }
    ],
    "source": {
      "label": "Kwara State tourism information",
      "href": "https://kwarastate.gov.ng/do-business/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "anambra-nature-weekend-itinerary",
    "title": "Anambra Nature Weekend: Ogbunike, Agulu & Waterfall Itinerary",
    "shortTitle": "Anambra Nature Weekend",
    "kind": "itinerary",
    "region": "Anambra State",
    "summary": "Plan an Anambra nature weekend around Ogbunike Caves and one additional lake or waterfall stop, respecting cultural rules and realistic road time.",
    "intro": [
      "Anambra's cave, lake and waterfall sites can support a strong nature weekend, but they should not be treated as three quick photo stops.",
      "Make Ogbunike the main heritage-and-physical activity, then choose either Agulu Lake or Owerre-Ezukala according to route, weather and current local access."
    ],
    "bestFor": [
      "Caves",
      "Nature",
      "Weekend trips",
      "Adventure"
    ],
    "highlights": [
      {
        "name": "Day 1 — Ogbunike",
        "detail": "Use the cave system as the main destination and allow time for the stair descent and return."
      },
      {
        "name": "Day 2 — choose lake or waterfall",
        "detail": "Pick Agulu Lake or Owerre-Ezukala rather than trying to rush both."
      },
      {
        "name": "Cultural rules",
        "detail": "Treat Ogbunike as a living heritage landscape and follow local guidance."
      },
      {
        "name": "Weather flexibility",
        "detail": "Rain can change cave, waterfall and road conditions quickly."
      }
    ],
    "planning": [
      {
        "label": "Use a local guide",
        "detail": "Follow the recognised visitor route at the caves."
      },
      {
        "label": "Wear grip-friendly footwear",
        "detail": "Steps and natural surfaces may be wet."
      },
      {
        "label": "Ask before photography",
        "detail": "Respect culturally sensitive areas."
      },
      {
        "label": "Keep one optional stop",
        "detail": "Do not make the weekend fail because one rural attraction is inaccessible."
      }
    ],
    "source": {
      "label": "Anambra State Ministry of Culture, Entertainment and Tourism",
      "href": "https://anambrastate.gov.ng/ministry-of-culture-entertainment-and-tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "umuahia-history-weekend-itinerary",
    "title": "Umuahia History Weekend: War Museum & Ojukwu Bunker Itinerary",
    "shortTitle": "Umuahia History Weekend",
    "kind": "itinerary",
    "region": "Abia State",
    "summary": "Use a history-focused Umuahia weekend for the National War Museum and Ojukwu Bunker, with a live rehabilitation and access check before travelling.",
    "intro": [
      "Umuahia's National War Museum and Ojukwu Bunker form a coherent modern-history trip that deserves more time than a quick stop on a wider Abia route.",
      "Federal preservation work has been active in 2026, so the itinerary depends on confirming what is open rather than assuming old visitor reports still apply."
    ],
    "bestFor": [
      "Modern history",
      "Museums",
      "Umuahia",
      "Weekend trips"
    ],
    "highlights": [
      {
        "name": "Day 1 — National War Museum",
        "detail": "Use the museum as the main interpretation block and allow enough time to engage with the exhibits."
      },
      {
        "name": "Day 1 or 2 — Ojukwu Bunker",
        "detail": "Pair the bunker with the museum when access is confirmed because the two sites provide connected historical context."
      },
      {
        "name": "Slow history day",
        "detail": "Leave room to read and reflect rather than turning the visit into a photo checklist."
      },
      {
        "name": "Arochukwu is separate",
        "detail": "Use another full day for Arochukwu because the road time and heritage depth do not fit a short Umuahia block."
      }
    ],
    "planning": [
      {
        "label": "Confirm rehabilitation status",
        "detail": "Check which areas are open before the weekend."
      },
      {
        "label": "Use credible interpretation",
        "detail": "Prefer museum and official historical context over sensational retellings."
      },
      {
        "label": "Keep schedules flexible",
        "detail": "Works can change visitor flow or hours."
      },
      {
        "label": "Separate distant heritage",
        "detail": "Do not force Arochukwu into the same short city itinerary."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Abia heritage restoration",
      "href": "https://fmino.gov.ng/federal-governments-war-museum-and-ojukwu-bunker-get-major-historical-preservation-boost-in-abia/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "lokoja-weekend-itinerary",
    "title": "Weekend in Lokoja: Confluence, Mount Patti & Heritage Itinerary",
    "shortTitle": "Weekend in Lokoja",
    "kind": "itinerary",
    "region": "Kogi State",
    "summary": "Use a Lokoja weekend for the Niger–Benue confluence, Mount Patti and colonial heritage with optional boat viewing only when safety conditions are satisfactory.",
    "intro": [
      "Lokoja's geography and history fit naturally into a two-day trip: river confluence, elevated views and colonial-era context all tell one connected story.",
      "A boat is not required for a useful visit. Treat water-level viewing as optional and only use it when the operator, weather and safety equipment are acceptable."
    ],
    "bestFor": [
      "River views",
      "History",
      "Road trips",
      "Weekend breaks"
    ],
    "highlights": [
      {
        "name": "Day 1 — confluence and city history",
        "detail": "Use land-based viewpoints and nearby heritage areas to understand why Lokoja developed where it did."
      },
      {
        "name": "Day 2 — Mount Patti",
        "detail": "Visit the hill when current access and weather are suitable, leaving enough time for the climb or drive."
      },
      {
        "name": "Optional boat",
        "detail": "Use a river trip only as a safety-checked extra, not as the foundation of the itinerary."
      },
      {
        "name": "Compact city story",
        "detail": "Keep the weekend around Lokoja rather than adding distant Kogi attractions."
      }
    ],
    "planning": [
      {
        "label": "Check weather first",
        "detail": "Rain and visibility can change both hill and river plans."
      },
      {
        "label": "Verify boat safety",
        "detail": "Confirm life jackets, operator and return point before boarding."
      },
      {
        "label": "Keep daylight margin",
        "detail": "Do not leave the hill or river return too late."
      },
      {
        "label": "Use one base",
        "detail": "Stay in or near Lokoja instead of changing accommodation during a short trip."
      }
    ],
    "source": {
      "label": "Kogi State Government — About Kogi",
      "href": "https://kogistate.gov.ng/about-us/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "katsina-heritage-weekend-itinerary",
    "title": "Katsina Heritage Weekend: Gobarau, Palace & Daura Itinerary",
    "shortTitle": "Katsina Heritage Weekend",
    "kind": "itinerary",
    "region": "Katsina State",
    "summary": "Use a Katsina heritage weekend for the old-city minaret and palace area, adding Daura only with a realistic second-day road plan.",
    "intro": [
      "Katsina city and Daura contain different heritage clusters, so a weekend should give each its own time rather than compressing them into one rushed circuit.",
      "Religious and royal spaces remain active cultural environments. Dress appropriately, confirm visitor boundaries and ask before photography."
    ],
    "bestFor": [
      "Islamic heritage",
      "History",
      "Architecture",
      "Weekend trips"
    ],
    "highlights": [
      {
        "name": "Day 1 — Gobarau Minaret",
        "detail": "Use the old-city landmark as the central historical anchor."
      },
      {
        "name": "Day 1 — palace area",
        "detail": "Add the Emir's Palace surroundings only within current visitor rules."
      },
      {
        "name": "Day 2 — Daura option",
        "detail": "Use Kusugu Well as a separate road-trip block if time and current conditions allow."
      },
      {
        "name": "Living heritage",
        "detail": "Approach religious and royal sites as active institutions, not static attractions."
      }
    ],
    "planning": [
      {
        "label": "Respect worship",
        "detail": "Avoid prayer times when casual sightseeing would be disruptive."
      },
      {
        "label": "Ask before photography",
        "detail": "Royal and religious areas may restrict cameras."
      },
      {
        "label": "Allow road time to Daura",
        "detail": "Do not treat it as an inner-city stop."
      },
      {
        "label": "Use local guidance",
        "detail": "Context improves both understanding and access etiquette."
      }
    ],
    "source": {
      "label": "Katsina State Ministry of Commerce, Industry and Tourism",
      "href": "https://mocit.kt.gov.ng/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "kebbi-heritage-weekend-itinerary",
    "title": "Kebbi Heritage Weekend: Argungu, Gwandu & Culture Itinerary",
    "shortTitle": "Kebbi Heritage Weekend",
    "kind": "itinerary",
    "region": "Kebbi State",
    "summary": "Plan a Kebbi heritage weekend around Argungu and one second heritage cluster, rather than trying to cover Argungu, Gwandu and Zuru in a single day.",
    "intro": [
      "Kebbi's heritage sites are spread across different towns. A useful weekend therefore needs one primary base and one deliberate road-trip decision.",
      "Argungu is the strongest starting point for museum and festival context, with Gwandu or Zuru as a separate second-day option when travel conditions support it."
    ],
    "bestFor": [
      "Museums",
      "Heritage",
      "Road trips",
      "Culture"
    ],
    "highlights": [
      {
        "name": "Day 1 — Argungu",
        "detail": "Use Kanta Museum as the main heritage anchor and leave time to understand the town beyond festival imagery."
      },
      {
        "name": "Day 2 — choose Gwandu or Zuru",
        "detail": "Pick one second cluster rather than chasing distant sites in both directions."
      },
      {
        "name": "Festival context",
        "detail": "If visiting around a major event, expect different traffic and accommodation demand."
      },
      {
        "name": "Road-first planning",
        "detail": "Distance between towns is the main constraint, not the number of attractions available."
      }
    ],
    "planning": [
      {
        "label": "Choose the second town early",
        "detail": "Base the decision on current road conditions and where you are staying."
      },
      {
        "label": "Confirm museum opening",
        "detail": "Do not make a long road journey without checking access first."
      },
      {
        "label": "Use daylight travel",
        "detail": "Keep a conservative return buffer."
      },
      {
        "label": "Plan festival periods separately",
        "detail": "Large events can change the entire transport and lodging picture."
      }
    ],
    "source": {
      "label": "Kebbi State Government",
      "href": "https://kebbistate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "cross-river-rainforest-road-trip",
    "title": "Cross River Rainforest Road Trip: Calabar, Agbokim, Afi & Park Planning",
    "shortTitle": "Cross River Rainforest Road Trip",
    "kind": "itinerary",
    "region": "Cross River State",
    "summary": "Plan a multi-day Cross River nature trip by choosing a realistic sequence between Calabar, Agbokim, Ikom/Alok, Afi and park divisions instead of treating the state as one short excursion.",
    "intro": [
      "Cross River's rainforest, waterfalls and monoliths are spread across long road distances. A multi-day route must be built around overnight bases and current access rather than a list of famous names.",
      "Use Calabar as the arrival gateway, then choose a northern or central nature cluster. Do not attempt every major site on one compressed road trip."
    ],
    "bestFor": [
      "Rainforest",
      "Waterfalls",
      "Wildlife",
      "Multi-day road trips"
    ],
    "highlights": [
      {
        "name": "Start — Calabar",
        "detail": "Use the state capital for arrival, supplies and a city buffer before heading inland."
      },
      {
        "name": "Middle — Agbokim and Ikom",
        "detail": "Pair the waterfall and monolith area only when road, weather and local access make the sequence realistic."
      },
      {
        "name": "Nature extension — Afi",
        "detail": "Treat the sanctuary as a conservation visit with its own guide and access requirements."
      },
      {
        "name": "Park choice",
        "detail": "Choose the correct Cross River National Park division for your route rather than assuming one universal entrance."
      }
    ],
    "planning": [
      {
        "label": "Plan overnight bases",
        "detail": "Long distances make same-day returns inefficient and tiring."
      },
      {
        "label": "Confirm each nature site",
        "detail": "Park, sanctuary and waterfall access can change independently."
      },
      {
        "label": "Build rain flexibility",
        "detail": "Rainforest weather can alter roads and trails quickly."
      },
      {
        "label": "Do not promise wildlife",
        "detail": "Treat sightings as unpredictable and conservation rules as mandatory."
      }
    ],
    "source": {
      "label": "Cross River Ministry of Tourism, Arts & Culture",
      "href": "https://www.crs-motac.org/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "edo-heritage-nature-itinerary",
    "title": "Edo Heritage & Nature Itinerary: Benin City and Okomu National Park",
    "shortTitle": "Edo Heritage & Nature Trip",
    "kind": "itinerary",
    "region": "Edo State",
    "summary": "Use a multi-day Edo trip to combine Benin City heritage with a separately planned Okomu National Park day instead of forcing rainforest travel into a short city schedule.",
    "intro": [
      "Benin City and Okomu answer two very different travel intents—living cultural heritage and protected rainforest. Combining them works only when each gets its own day.",
      "Use the city first for historical context, then contact the park and treat the forest as a dedicated conservation trip with its own transport and weather plan."
    ],
    "bestFor": [
      "Benin heritage",
      "Rainforest",
      "Wildlife",
      "Multi-day trips"
    ],
    "highlights": [
      {
        "name": "Day 1 — Benin City museum",
        "detail": "Start with the National Museum to build context for the kingdom and its art traditions."
      },
      {
        "name": "Day 1 — Igun Street",
        "detail": "Add the bronze-casting district as a living craft experience, asking before photography."
      },
      {
        "name": "Day 2 — Okomu National Park",
        "detail": "Use the entire day for the park only after confirming entry, guide and road arrangements."
      },
      {
        "name": "Flexible final block",
        "detail": "Keep an optional meal or city heritage stop after the park rather than another distant excursion."
      }
    ],
    "planning": [
      {
        "label": "Contact the park first",
        "detail": "Do not leave Benin City without current Okomu access information."
      },
      {
        "label": "Prepare for rainforest weather",
        "detail": "Use suitable footwear, rain protection and insect protection."
      },
      {
        "label": "Respect living heritage",
        "detail": "Follow workshop, palace and cultural photography rules."
      },
      {
        "label": "Do not combine both in one day",
        "detail": "The city and national park deserve separate planning blocks."
      }
    ],
    "source": {
      "label": "Edo State Government tourism overview",
      "href": "https://edostate.gov.ng/your-tourist-destinations-in-edo-state-this-easter-holiday/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "lekki-conservation-centre-guide",
    "title": "Lekki Conservation Centre Guide: Canopy Walk, Nature & Planning",
    "shortTitle": "Lekki Conservation Centre",
    "kind": "destination",
    "region": "Lagos State",
    "summary": "Plan a Lekki Conservation Centre visit around the forest boardwalk, canopy experience and family park, with current booking, weather and mobility checks before arrival.",
    "intro": [
      "Lekki Conservation Centre is one of Lagos's clearest nature-focused visitor intents and deserves a dedicated guide rather than only appearing inside a general Lagos itinerary.",
      "The Nigerian Conservation Foundation manages the site and currently provides direct booking contacts for LCC. Confirm current admission, canopy access and operating arrangements before setting out."
    ],
    "bestFor": [
      "Urban nature",
      "Canopy walks",
      "Families",
      "Photography"
    ],
    "highlights": [
      {
        "name": "Forest boardwalk",
        "detail": "Use the walk through the conservation landscape as the core experience rather than treating the centre as a quick photo stop."
      },
      {
        "name": "Canopy walkway",
        "detail": "The elevated canopy experience is a major draw, but access can depend on current site rules, weather and personal comfort with heights."
      },
      {
        "name": "Family park",
        "detail": "The open recreation area can make the visit work for mixed-age groups after the more active boardwalk section."
      },
      {
        "name": "Lekki cluster",
        "detail": "Nike Art Gallery and nearby dining can fit the same broad axis without forcing a cross-city journey."
      }
    ],
    "planning": [
      {
        "label": "Confirm current access",
        "detail": "Check admission, opening and canopy arrangements directly with NCF before travelling."
      },
      {
        "label": "Prepare for heat and rain",
        "detail": "Use water, sun protection and weather-appropriate footwear for an outdoor visit."
      },
      {
        "label": "Do not feed wildlife",
        "detail": "Treat animals as part of a conservation area rather than an attraction to approach."
      },
      {
        "label": "Keep the day on the Lekki axis",
        "detail": "Pair only nearby stops so traffic does not consume the rest of the outing."
      }
    ],
    "source": {
      "label": "Nigerian Conservation Foundation — Lekki Conservation Centre",
      "href": "https://ncfnigeria.org/our-centers/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nike-art-gallery-lagos-guide",
    "title": "Nike Art Gallery Lagos Guide: Art, Culture & Lekki Visit Planning",
    "shortTitle": "Nike Art Gallery Lagos",
    "kind": "destination",
    "region": "Lagos State",
    "summary": "Visit Nike Art Gallery as a focused Lagos art stop, with enough time for its multi-floor collection and a compact Lekki route rather than a rushed citywide schedule.",
    "intro": [
      "Nike Art Gallery is a major Lagos cultural destination with works by hundreds of African artists and enough depth to justify its own art-focused visitor guide.",
      "Current cultural listings continue to identify the gallery as an important Lagos destination. Check live visitor hours and any exhibition-specific arrangements before travelling."
    ],
    "bestFor": [
      "Nigerian art",
      "Culture",
      "Indoor visits",
      "Lekki"
    ],
    "highlights": [
      {
        "name": "Multi-floor collection",
        "detail": "Allow enough time to move through the gallery slowly rather than treating it as a short lobby stop."
      },
      {
        "name": "Contemporary and traditional work",
        "detail": "The collection spans multiple forms of Nigerian and African art, making the visit useful for both first-time viewers and collectors."
      },
      {
        "name": "Lekki location",
        "detail": "The gallery pairs naturally with Lekki Conservation Centre or a nearby meal when traffic and timing allow."
      },
      {
        "name": "Art-shopping context",
        "detail": "If you intend to buy work, ask about artist information, pricing and handling directly rather than assuming every displayed piece is available."
      }
    ],
    "planning": [
      {
        "label": "Check current hours",
        "detail": "Verify the gallery's live opening schedule before travelling."
      },
      {
        "label": "Give the collection time",
        "detail": "A large gallery is more rewarding with an unhurried block than between multiple reservations."
      },
      {
        "label": "Ask before close-up photography",
        "detail": "Follow current gallery rules around artworks, people and commercial use."
      },
      {
        "label": "Stay on one axis",
        "detail": "Combine only nearby Lekki or Victoria Island stops to protect the day from traffic."
      }
    ],
    "source": {
      "label": "ART X Lagos — Nike Art Gallery profile",
      "href": "https://www.artxlagos.com/exhibitors/nike-art-gallery-2026"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "millennium-park-abuja-guide",
    "title": "Millennium Park Abuja Guide: Visit, Nearby Landmarks & Planning",
    "shortTitle": "Millennium Park Abuja",
    "kind": "destination",
    "region": "Federal Capital Territory",
    "summary": "Plan a Millennium Park visit as an easy central Abuja green-space stop, pairing it with nearby national landmarks while keeping heat, rain and formal-area access in mind.",
    "intro": [
      "Millennium Park is one of Abuja's best-known public green spaces and works especially well as a lower-pressure stop between the city's more formal landmarks.",
      "Current Visit Abuja guidance places the park within the central visitor circuit, close enough to major national landmarks to form a compact half-day without crossing the city repeatedly."
    ],
    "bestFor": [
      "Parks",
      "Relaxed walks",
      "Families",
      "Central Abuja"
    ],
    "highlights": [
      {
        "name": "Open green space",
        "detail": "Use the park for walking, sitting and a slower break rather than expecting a dense attraction programme."
      },
      {
        "name": "Central location",
        "detail": "The park can fit naturally with the National Mosque and National Christian Centre in one broad city block."
      },
      {
        "name": "Photography",
        "detail": "Green space and city views make it useful for casual photography, while nearby government areas may have separate restrictions."
      },
      {
        "name": "Flexible stop",
        "detail": "It works well when you need a short outdoor activity between meals, meetings or cultural visits."
      }
    ],
    "planning": [
      {
        "label": "Use cooler hours",
        "detail": "Morning or later afternoon can be more comfortable than peak midday heat."
      },
      {
        "label": "Watch rain",
        "detail": "Heavy showers can change an outdoor park plan quickly."
      },
      {
        "label": "Respect nearby controlled areas",
        "detail": "Do not assume photography or parking rules are the same outside government and diplomatic zones."
      },
      {
        "label": "Keep the route central",
        "detail": "Pair the park with nearby landmarks instead of using it as the start of a cross-city loop."
      }
    ],
    "source": {
      "label": "Visit Abuja — Things to Do",
      "href": "https://www.visitabuja.org/see-and-do/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "jabi-lake-abuja-guide",
    "title": "Jabi Lake Abuja Guide: Waterfront, Boats & Safety Planning",
    "shortTitle": "Jabi Lake",
    "kind": "destination",
    "region": "Federal Capital Territory",
    "summary": "Use Jabi Lake for a relaxed Abuja waterfront block, with operator, weather and life-jacket checks before any boat activity.",
    "intro": [
      "Jabi Lake adds a waterfront experience to Abuja's city break and is distinct from the capital's formal landmarks and central parks.",
      "Current Abuja visitor guidance highlights the lake as a leisure area. Any boat or water activity should be treated as operator-dependent rather than automatically included."
    ],
    "bestFor": [
      "Waterfront",
      "Relaxed afternoons",
      "Dining",
      "Short city breaks"
    ],
    "highlights": [
      {
        "name": "Lakefront time",
        "detail": "The easiest experience is simply using the waterfront area for a slower afternoon or evening."
      },
      {
        "name": "Water activities",
        "detail": "Boat outings can be available, but only use an operator after checking equipment, weather and return arrangements."
      },
      {
        "name": "Jabi district",
        "detail": "Keep dining and shopping in the same area where possible to reduce unnecessary movement."
      },
      {
        "name": "Sunset planning",
        "detail": "A later visit can be attractive, but decide your return transport before staying into the evening."
      }
    ],
    "planning": [
      {
        "label": "Check life jackets",
        "detail": "Do not board a recreational boat without suitable safety equipment."
      },
      {
        "label": "Watch the weather",
        "detail": "Wind and storms should override a planned water activity."
      },
      {
        "label": "Confirm the operator",
        "detail": "Agree the route, duration, price and return point before departure."
      },
      {
        "label": "Plan the return first",
        "detail": "Avoid relying on last-minute transport after a late waterfront stop."
      }
    ],
    "source": {
      "label": "Visit Abuja — About Abuja",
      "href": "https://www.visitabuja.org/about-abuja/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "abuja-arts-crafts-village-guide",
    "title": "Abuja Arts & Crafts Village Guide: What to Buy & Visitor Tips",
    "shortTitle": "Abuja Arts & Crafts Village",
    "kind": "destination",
    "region": "Federal Capital Territory",
    "summary": "Use Abuja's Arts and Crafts Village as a focused shopping-and-culture stop for textiles, carvings, leather, jewellery and art, with current access checks before travelling.",
    "intro": [
      "Abuja's Arts and Crafts Village answers a clear shopping and culture intent that is different from the capital's landmark or park guides.",
      "Visit Abuja currently includes the village among places to look for locally made craft. Public access can change, so confirm the site is open before building a trip around it."
    ],
    "bestFor": [
      "Craft shopping",
      "Textiles",
      "Souvenirs",
      "Culture"
    ],
    "highlights": [
      {
        "name": "Locally made goods",
        "detail": "Look for textiles, carvings, leatherwork, jewellery and paintings rather than treating the stop like a conventional mall."
      },
      {
        "name": "Compare before buying",
        "detail": "Walk through multiple sellers before committing when quality, size and finish vary."
      },
      {
        "name": "Ask about provenance",
        "detail": "For higher-value art or craft, ask who made the piece and what materials were used."
      },
      {
        "name": "Central-area pairing",
        "detail": "The village can fit with nearby national landmarks when access and route order make sense."
      }
    ],
    "planning": [
      {
        "label": "Confirm public access",
        "detail": "Check that the village is open before travelling specifically for shopping."
      },
      {
        "label": "Carry purchases carefully",
        "detail": "Plan how fragile carvings, art or textiles will be transported."
      },
      {
        "label": "Negotiate respectfully",
        "detail": "Ask prices clearly and compare without turning bargaining into confrontation."
      },
      {
        "label": "Keep valuables secure",
        "detail": "Use normal market precautions in busy shopping areas."
      }
    ],
    "source": {
      "label": "Visit Abuja — Things to Do",
      "href": "https://www.visitabuja.org/see-and-do/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "gidan-makama-museum-guide",
    "title": "Gidan Makama Museum Guide: Kano History & Old City Planning",
    "shortTitle": "Gidan Makama Museum",
    "kind": "destination",
    "region": "Kano State",
    "summary": "Start a Kano heritage visit at Gidan Makama Museum for historical context before exploring Dala Hill and the old city.",
    "intro": [
      "Gidan Makama is one of Kano's key museum and heritage stops, and the state has continued to allocate rehabilitation funding to the museum.",
      "Use the museum as context for Kano's old-city story, then keep nearby heritage stops in the same day rather than jumping across the metropolis."
    ],
    "bestFor": [
      "Kano history",
      "Museums",
      "Old city",
      "Culture"
    ],
    "highlights": [
      {
        "name": "Historical context",
        "detail": "The museum is most useful at the beginning of a Kano heritage route so later landmarks are easier to understand."
      },
      {
        "name": "Old-city setting",
        "detail": "Its location makes it a natural anchor for a wider historic-district visit."
      },
      {
        "name": "Dala Hill connection",
        "detail": "The hill can add landscape and settlement context when heat and access allow."
      },
      {
        "name": "Living heritage",
        "detail": "Kano's traditional institutions and markets remain active, so visitor etiquette matters beyond museum walls."
      }
    ],
    "planning": [
      {
        "label": "Confirm museum access",
        "detail": "Check current opening and any rehabilitation effects before travelling."
      },
      {
        "label": "Dress respectfully",
        "detail": "Use modest, practical clothing for a heritage day that may include traditional or religious areas."
      },
      {
        "label": "Ask before photography",
        "detail": "Museum and old-city locations may have different rules."
      },
      {
        "label": "Use local context",
        "detail": "A knowledgeable guide can add meaning and reduce inaccurate retellings."
      }
    ],
    "source": {
      "label": "Kano State Government",
      "href": "https://kanostate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "dala-hill-kano-guide",
    "title": "Dala Hill Kano Guide: Climb, History & Old City Planning",
    "shortTitle": "Dala Hill",
    "kind": "destination",
    "region": "Kano State",
    "summary": "Plan a Dala Hill visit around cooler hours, safe footing and Kano's wider old-city heritage rather than treating the climb as an isolated viewpoint.",
    "intro": [
      "Dala Hill is a defining natural and historical landmark in Kano's settlement story and supports a focused visitor guide of its own.",
      "The climb is exposed and should be planned around heat, weather and current local access, with Gidan Makama providing useful historical context before or after."
    ],
    "bestFor": [
      "Views",
      "History",
      "Short climbs",
      "Kano heritage"
    ],
    "highlights": [
      {
        "name": "City views",
        "detail": "The elevated position gives a different perspective on Kano's urban landscape."
      },
      {
        "name": "Settlement history",
        "detail": "The hill is closely tied to Kano's early history and is more meaningful with historical context."
      },
      {
        "name": "Old-city pairing",
        "detail": "Gidan Makama Museum and nearby heritage can fit the same day without turning the trip into a citywide race."
      },
      {
        "name": "Simple outdoor stop",
        "detail": "The experience is mainly the climb, views and context rather than extensive built visitor facilities."
      }
    ],
    "planning": [
      {
        "label": "Avoid peak heat",
        "detail": "Climb earlier or later in the day when possible."
      },
      {
        "label": "Wear stable footwear",
        "detail": "Use shoes suitable for uneven steps or rock surfaces."
      },
      {
        "label": "Check current local access",
        "detail": "Follow any instructions around the recognised visitor route."
      },
      {
        "label": "Carry water",
        "detail": "Do not depend on finding refreshments during the climb."
      }
    ],
    "source": {
      "label": "Kano State Government — History",
      "href": "https://kanostate.gov.ng/history/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "jos-wildlife-park-guide",
    "title": "Jos Wildlife Park Guide: Entry, Safety & Visitor Planning",
    "shortTitle": "Jos Wildlife Park",
    "kind": "destination",
    "region": "Plateau State",
    "summary": "Plan Jos Wildlife Park as a focused nature visit with current entry details, marked-route rules and no assumptions about guaranteed animal sightings.",
    "intro": [
      "Jos Wildlife Park is one of Plateau's established city-accessible nature attractions and the official state tourism platform currently publishes visitor and safety information for it.",
      "Treat the park as a conservation environment: stay on recognised paths, follow staff guidance and never plan the day around a guaranteed sighting."
    ],
    "bestFor": [
      "Wildlife",
      "Nature walks",
      "Families",
      "Jos outings"
    ],
    "highlights": [
      {
        "name": "Savanna setting",
        "detail": "The park offers a nature-focused break from city sightseeing within the wider Jos area."
      },
      {
        "name": "Wildlife viewing",
        "detail": "Animals may be present across the park, but sightings and activity levels vary naturally."
      },
      {
        "name": "Guided experience",
        "detail": "Use staff or recognised guides where required rather than leaving marked routes."
      },
      {
        "name": "Jos pairing",
        "detail": "The museum or a city meal can fit the same day if the park visit ends earlier than expected."
      }
    ],
    "planning": [
      {
        "label": "Check current hours and fee",
        "detail": "Use VisitPlateau's live listing before travelling."
      },
      {
        "label": "Stay on marked paths",
        "detail": "Do not approach animals or leave recognised visitor areas."
      },
      {
        "label": "Do not feed wildlife",
        "detail": "Feeding changes animal behaviour and creates risk."
      },
      {
        "label": "Carry sun protection",
        "detail": "Outdoor wildlife visits can involve long periods in exposed conditions."
      }
    ],
    "source": {
      "label": "VisitPlateau — Jos Wildlife Park",
      "href": "https://visitplateau.com/destinations/jos-wildlife-park"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "shere-hills-guide",
    "title": "Shere Hills Guide: Hiking, Views & Jos Trip Planning",
    "shortTitle": "Shere Hills",
    "kind": "destination",
    "region": "Plateau State",
    "summary": "Plan a Shere Hills outing from Jos with a local route, enough water and a conservative daylight schedule for the highland terrain.",
    "intro": [
      "Shere Hills is promoted by Plateau's official tourism platform as one of the state's major adventure landscapes and supports a distinct hiking search intent.",
      "Treat it as a real outdoor activity rather than a roadside viewpoint: route choice, fitness, weather and local guidance should shape the day."
    ],
    "bestFor": [
      "Hiking",
      "Highland views",
      "Adventure",
      "Photography"
    ],
    "highlights": [
      {
        "name": "Rocky highlands",
        "detail": "The hills are the main experience, with wide views and uneven terrain rather than built attraction infrastructure."
      },
      {
        "name": "Hiking routes",
        "detail": "Use a suitable local route and avoid improvising across unfamiliar terrain."
      },
      {
        "name": "Jos proximity",
        "detail": "The hills work as a dedicated outdoor block from a Jos base."
      },
      {
        "name": "Plateau landscape",
        "detail": "Cooler highland conditions can still include strong sun, wind or sudden rain."
      }
    ],
    "planning": [
      {
        "label": "Use a local guide",
        "detail": "Confirm the route, expected duration and turnaround time before starting."
      },
      {
        "label": "Carry enough water",
        "detail": "Do not assume supplies are available on the hill."
      },
      {
        "label": "Watch the weather",
        "detail": "Rain or poor visibility can make exposed rock less suitable."
      },
      {
        "label": "Turn around early",
        "detail": "Protect enough daylight for the descent and return to Jos."
      }
    ],
    "source": {
      "label": "VisitPlateau — official tourism platform",
      "href": "https://visitplateau.com/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "wase-rock-guide",
    "title": "Wase Rock Guide: Plateau Road Trip, Views & Access Planning",
    "shortTitle": "Wase Rock",
    "kind": "destination",
    "region": "Plateau State",
    "summary": "Plan Wase Rock as a dedicated Plateau road trip with current access, daylight and local guidance rather than a quick add-on to central Jos sightseeing.",
    "intro": [
      "Wase Rock is one of Plateau State's signature geological landmarks and is promoted by the official tourism platform as a major adventure destination.",
      "The distance from Jos means the journey matters as much as the stop itself. Confirm the current route, local access and return plan before leaving."
    ],
    "bestFor": [
      "Geology",
      "Rock landscapes",
      "Road trips",
      "Photography"
    ],
    "highlights": [
      {
        "name": "Volcanic rock landmark",
        "detail": "The dramatic formation is the central reason to travel to Wase and should be given a full destination block."
      },
      {
        "name": "Birdlife context",
        "detail": "Official tourism material links the area with notable birdlife; observe without disturbing nesting or wildlife."
      },
      {
        "name": "Rural Plateau route",
        "detail": "The drive passes beyond the main Jos visitor circuit and needs more conservative timing."
      },
      {
        "name": "Landscape photography",
        "detail": "Use safe public viewpoints rather than climbing or crossing into uncertain terrain."
      }
    ],
    "planning": [
      {
        "label": "Confirm current local access",
        "detail": "Check the recognised visitor area before travelling."
      },
      {
        "label": "Plan fuel and daylight",
        "detail": "Treat Wase as a road-trip destination, not a short city detour."
      },
      {
        "label": "Do not disturb wildlife",
        "detail": "Keep distance from birds and nesting areas."
      },
      {
        "label": "Avoid unapproved climbing",
        "detail": "Do not assume the rock itself is open for unrestricted ascent."
      }
    ],
    "source": {
      "label": "VisitPlateau — official tourism platform",
      "href": "https://visitplateau.com/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "assop-falls-guide",
    "title": "Assop Falls Guide: Jos–Abuja Stop, Safety & Waterfall Planning",
    "shortTitle": "Assop Falls",
    "kind": "destination",
    "region": "Plateau State",
    "summary": "Use Assop Falls as a focused waterfall stop on the Jos–Abuja corridor, with sturdy footwear, daylight timing and no swimming assumptions.",
    "intro": [
      "Assop Falls is one of Plateau's more accessible waterfall stops and the official state tourism platform currently publishes direct safety guidance for visitors.",
      "The attraction is still a natural site: slippery rock, changing water flow and roadside timing should matter more than a fixed photo schedule."
    ],
    "bestFor": [
      "Waterfalls",
      "Road-trip stops",
      "Nature",
      "Photography"
    ],
    "highlights": [
      {
        "name": "Waterfall cascade",
        "detail": "The falls and rocky setting are the main attraction, especially when seasonal water flow is strong."
      },
      {
        "name": "Highway access",
        "detail": "Its position near the Jos–Abuja route can make it practical as a planned stop rather than a separate multi-day trip."
      },
      {
        "name": "Natural pool",
        "detail": "Treat the water as a viewing feature unless current official guidance specifically permits an activity."
      },
      {
        "name": "Plateau nature circuit",
        "detail": "Riyom or Jos attractions can fit a wider trip, but avoid overpacking the same day."
      }
    ],
    "planning": [
      {
        "label": "Wear sturdy footwear",
        "detail": "Official guidance warns that rocks can be slippery."
      },
      {
        "label": "Do not assume swimming is safe",
        "detail": "Use the current site safety rule rather than old travel posts."
      },
      {
        "label": "Visit in daylight",
        "detail": "Natural footing is easier to assess before dark."
      },
      {
        "label": "Check recent rain",
        "detail": "Water flow and road conditions can change after heavy weather."
      }
    ],
    "source": {
      "label": "VisitPlateau — Assop Falls",
      "href": "https://visitplateau.com/destinations/assop-falls"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "riyom-rock-guide",
    "title": "Riyom Rock Guide: Balanced Formations & Plateau Day Trip",
    "shortTitle": "Riyom Rock",
    "kind": "destination",
    "region": "Plateau State",
    "summary": "Plan a Riyom Rock visit for the balanced formations and landscape views, using daylight, stable footing and a no-climbing approach around unstable rock.",
    "intro": [
      "Riyom's balanced rock formations are a distinct geological attraction and the official Plateau tourism platform provides current access and safety guidance.",
      "The site is best treated as a landscape stop rather than a climbing challenge. Stay clear of unstable formations and use recognised public access."
    ],
    "bestFor": [
      "Geology",
      "Photography",
      "Road trips",
      "Landscape"
    ],
    "highlights": [
      {
        "name": "Balanced formations",
        "detail": "The unusual natural rock shapes are the main visual draw and need no climbing to appreciate."
      },
      {
        "name": "Riyom landscape",
        "detail": "The surrounding highland scenery adds value beyond the most photographed formation."
      },
      {
        "name": "Easy Plateau pairing",
        "detail": "The site can fit into a wider Jos-area route when travel time remains realistic."
      },
      {
        "name": "Open-air visit",
        "detail": "Weather and light can strongly change the experience at an exposed rock site."
      }
    ],
    "planning": [
      {
        "label": "Do not climb unstable formations",
        "detail": "Official guidance specifically warns against climbing the balanced rocks."
      },
      {
        "label": "Watch loose footing",
        "detail": "Use shoes suitable for uneven ground."
      },
      {
        "label": "Stay in daylight",
        "detail": "Visit while surfaces and route boundaries are easy to see."
      },
      {
        "label": "Keep weather flexibility",
        "detail": "Rain can make rock and roadside conditions less comfortable."
      }
    ],
    "source": {
      "label": "VisitPlateau — Riyom Rock",
      "href": "https://visitplateau.com/destinations/riyom-rock"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "owo-museum-guide",
    "title": "Owo Museum of Antiquities Guide: Ondo Heritage Visit Planning",
    "shortTitle": "Owo Museum of Antiquities",
    "kind": "destination",
    "region": "Ondo State",
    "summary": "Use Owo Museum as a focused Ondo heritage stop, then decide separately whether Idanre or Akure belongs in the same wider trip.",
    "intro": [
      "Owo's museum provides a distinct history-and-art destination within Ondo State and should not be reduced to one line inside a broad nature circuit.",
      "Use the museum as the main cultural anchor, confirm current visitor hours and keep distant state attractions as optional extensions."
    ],
    "bestFor": [
      "Museums",
      "Yoruba heritage",
      "History",
      "Art"
    ],
    "highlights": [
      {
        "name": "Owo heritage collections",
        "detail": "The museum is the core place to build context around Owo's artistic and historical traditions."
      },
      {
        "name": "Cultural interpretation",
        "detail": "Give time to labels, guides or local explanation rather than rushing through exhibits."
      },
      {
        "name": "Ondo contrast",
        "detail": "The museum creates a useful cultural counterpoint to Idanre Hills and other nature-led state trips."
      },
      {
        "name": "Owo stopover",
        "detail": "It can work as a dedicated heritage block on a road trip through northern Ondo."
      }
    ],
    "planning": [
      {
        "label": "Confirm current opening",
        "detail": "Check museum access before making a dedicated road journey."
      },
      {
        "label": "Follow photography rules",
        "detail": "Ask before photographing objects or indoor collections."
      },
      {
        "label": "Keep Idanre separate if needed",
        "detail": "Do not compress two major destinations when road time is tight."
      },
      {
        "label": "Allow interpretation time",
        "detail": "A museum visit is more useful when you are not rushing to the next city."
      }
    ],
    "source": {
      "label": "Ondo State tourism information",
      "href": "https://ondostate.gov.ng/tourism"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "arinta-waterfalls-guide",
    "title": "Arinta Waterfalls Guide: Ekiti Nature Trip & Safety Planning",
    "shortTitle": "Arinta Waterfalls",
    "kind": "destination",
    "region": "Ekiti State",
    "summary": "Plan Arinta Waterfalls as a dedicated Ekiti nature stop with weather, footwear and current local-access checks before leaving for Ipole-Iloro.",
    "intro": [
      "Arinta is a distinct waterfall destination in Ekiti and deserves its own planning page beyond a general state nature circuit.",
      "Waterfall conditions change with rainfall, so the useful questions are access, footing, water level and daylight rather than a fixed promise about what the site will look like."
    ],
    "bestFor": [
      "Waterfalls",
      "Nature",
      "Photography",
      "Ekiti road trips"
    ],
    "highlights": [
      {
        "name": "Waterfall setting",
        "detail": "The cascade and surrounding green landscape are the central experience."
      },
      {
        "name": "Ipole-Iloro route",
        "detail": "Use current local directions for the final approach rather than depending on an old map pin alone."
      },
      {
        "name": "Ikogosi pairing",
        "detail": "The warm springs can fit a wider Ekiti trip when road and timing conditions make sense."
      },
      {
        "name": "Seasonal character",
        "detail": "Rain can improve water flow while also making surfaces and roads more difficult."
      }
    ],
    "planning": [
      {
        "label": "Check recent weather",
        "detail": "Heavy rain can change both the falls and the approach."
      },
      {
        "label": "Wear grip-friendly shoes",
        "detail": "Expect wet or uneven natural surfaces."
      },
      {
        "label": "Use daylight",
        "detail": "Keep enough time to return before dark."
      },
      {
        "label": "Confirm local access",
        "detail": "Check the current entry route and any local arrangements before travelling."
      }
    ],
    "source": {
      "label": "Ekiti State Bureau of Tourism Development",
      "href": "https://www.ekitistate.gov.ng/bureau-of-tourism-development"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "mount-patti-lokoja-guide",
    "title": "Mount Patti Lokoja Guide: Views, History & Trip Planning",
    "shortTitle": "Mount Patti",
    "kind": "destination",
    "region": "Kogi State",
    "summary": "Plan a Mount Patti visit around weather, access and daylight, then connect the views with Lokoja's Niger–Benue confluence and colonial history.",
    "intro": [
      "Mount Patti is one of Lokoja's defining landscape landmarks and supports a focused visit separate from a generic Kogi attractions list.",
      "The best value comes from combining the elevated viewpoint with the city's geographic and historical context, not from treating the hill as an isolated photo stop."
    ],
    "bestFor": [
      "Views",
      "Hills",
      "Lokoja history",
      "Photography"
    ],
    "highlights": [
      {
        "name": "Elevated Lokoja views",
        "detail": "The hill helps show the relationship between the city, surrounding terrain and major rivers."
      },
      {
        "name": "Confluence context",
        "detail": "Pair the viewpoint with a land-based look at the Niger–Benue confluence for a stronger geography-focused day."
      },
      {
        "name": "Colonial history",
        "detail": "Lokoja's historical sites add context to why the city became strategically important."
      },
      {
        "name": "Outdoor block",
        "detail": "Treat the hill as a physical activity that needs its own weather and time allowance."
      }
    ],
    "planning": [
      {
        "label": "Check current access",
        "detail": "Confirm the recognised route before starting the hill visit."
      },
      {
        "label": "Avoid poor visibility",
        "detail": "Heavy rain or haze can reduce both safety and the value of the view."
      },
      {
        "label": "Carry water",
        "detail": "Do not depend on supplies during the hill section."
      },
      {
        "label": "Keep daylight margin",
        "detail": "Leave enough time for the return and any later city stop."
      }
    ],
    "source": {
      "label": "Kogi State Government — About Kogi",
      "href": "https://kogistate.gov.ng/about-us/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "agulu-lake-guide",
    "title": "Agulu Lake Guide: Anambra Nature Visit & Water Safety Planning",
    "shortTitle": "Agulu Lake",
    "kind": "destination",
    "region": "Anambra State",
    "summary": "Use Agulu Lake as a calm Anambra nature stop with local-access and water-safety checks, keeping cave and waterfall excursions as separate decisions.",
    "intro": [
      "Agulu Lake offers a different, slower nature experience from Anambra's cave and waterfall destinations and supports a focused visitor-planning page.",
      "Treat the water as a natural environment rather than assuming boating, swimming or other activities are always available or safe."
    ],
    "bestFor": [
      "Lakes",
      "Nature",
      "Photography",
      "Anambra road trips"
    ],
    "highlights": [
      {
        "name": "Lake landscape",
        "detail": "The main experience is the water and surrounding scenery rather than a dense list of built attractions."
      },
      {
        "name": "Agulu setting",
        "detail": "Use local guidance for the current visitor area and any culturally sensitive parts of the shoreline."
      },
      {
        "name": "Ogbunike option",
        "detail": "The caves can form another day in a longer Anambra nature trip."
      },
      {
        "name": "Flexible pace",
        "detail": "The lake works well as a slower block between more physically demanding destinations."
      }
    ],
    "planning": [
      {
        "label": "Confirm local access",
        "detail": "Use current directions and follow any community guidance."
      },
      {
        "label": "Do not assume swimming safety",
        "detail": "Only enter water when a current, responsible local authority or operator says conditions are suitable."
      },
      {
        "label": "Protect electronics",
        "detail": "Use a water-resistant plan for phones and valuables."
      },
      {
        "label": "Keep distant nature stops separate",
        "detail": "Avoid rushing from the lake to caves and waterfalls in one short day."
      }
    ],
    "source": {
      "label": "Anambra State — Agulu Lake",
      "href": "https://anambrastate.gov.ng/directory/agulu-lake/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "kufena-hills-zaria-guide",
    "title": "Kufena Hills Zaria Guide: Hiking, Heritage & Kaduna Planning",
    "shortTitle": "Kufena Hills",
    "kind": "destination",
    "region": "Kaduna State",
    "summary": "Plan Kufena Hills as a Zaria landscape and heritage outing with current route, weather and local-security checks before the climb.",
    "intro": [
      "Kufena Hills gives Zaria a strong outdoor identity beyond its historic walls and built heritage, making it a distinct trip-planning destination.",
      "Current road and security conditions should be checked close to the visit, and the hill should be approached through a recognised local route."
    ],
    "bestFor": [
      "Hiking",
      "Rock landscapes",
      "Zaria",
      "Photography"
    ],
    "highlights": [
      {
        "name": "Hill landscape",
        "detail": "The rocky terrain and elevated views are the main reason to visit."
      },
      {
        "name": "Zaria heritage connection",
        "detail": "City walls and historic areas can add cultural context to a wider Zaria trip."
      },
      {
        "name": "Outdoor activity",
        "detail": "Treat the visit as a real hike or climb rather than a drive-by stop."
      },
      {
        "name": "Southern Kaduna alternative",
        "detail": "Matsirga and other state nature sites are separate trips, not same-day requirements."
      }
    ],
    "planning": [
      {
        "label": "Check current security",
        "detail": "Verify the exact route close to departure."
      },
      {
        "label": "Use local guidance",
        "detail": "Confirm the recognised path and turnaround time."
      },
      {
        "label": "Carry water and sun protection",
        "detail": "Do not assume services on the hill."
      },
      {
        "label": "Return before dark",
        "detail": "Keep enough daylight for the descent and road journey."
      }
    ],
    "source": {
      "label": "Kaduna Investment Promotion Agency — tourism publications",
      "href": "https://kadipa.kdsg.gov.ng/documents.html"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "kusugu-well-daura-guide",
    "title": "Kusugu Well Daura Guide: Bayajidda Heritage & Visitor Planning",
    "shortTitle": "Kusugu Well",
    "kind": "destination",
    "region": "Katsina State",
    "summary": "Visit Kusugu Well as a focused Daura heritage stop with local interpretation, respectful photography and realistic road time from Katsina.",
    "intro": [
      "Kusugu Well is central to one of northern Nigeria's best-known origin traditions and gives Daura a distinct heritage intent beyond a general Katsina State itinerary.",
      "Use local interpretation and current visitor guidance rather than treating a historic site only as a photo marker."
    ],
    "bestFor": [
      "History",
      "Daura",
      "Cultural heritage",
      "Road trips"
    ],
    "highlights": [
      {
        "name": "Bayajidda tradition",
        "detail": "The site is associated with the famous Daura origin narrative and is most meaningful with careful local explanation."
      },
      {
        "name": "Daura heritage",
        "detail": "The well belongs within the wider cultural landscape of the historic town."
      },
      {
        "name": "Katsina connection",
        "detail": "Gobarau Minaret and the Emir's Palace form a separate city heritage cluster."
      },
      {
        "name": "Interpretation over spectacle",
        "detail": "The value of the stop is historical and cultural context rather than a large physical attraction complex."
      }
    ],
    "planning": [
      {
        "label": "Use local interpretation",
        "detail": "Ask a knowledgeable guide or custodian for current context."
      },
      {
        "label": "Ask before photography",
        "detail": "Follow any site-specific cultural rules."
      },
      {
        "label": "Allow road time",
        "detail": "Daura is a separate travel block from Katsina city."
      },
      {
        "label": "Confirm current access",
        "detail": "Check the site is open before making the road journey."
      }
    ],
    "source": {
      "label": "Katsina State Ministry of Commerce, Industry and Tourism",
      "href": "https://mocit.kt.gov.ng/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "eggon-hills-guide",
    "title": "Eggon Hills & Caves Guide: Nasarawa Hiking & Access Planning",
    "shortTitle": "Eggon Hills & Caves",
    "kind": "destination",
    "region": "Nasarawa State",
    "summary": "Plan the Eggon Hills and caves as a serious Nasarawa outdoor trip with local guidance, daylight and current road and security checks.",
    "intro": [
      "Eggon Hills is a distinct rock-and-cave landscape within Nasarawa and deserves a dedicated outdoor guide rather than a line inside a state roundup.",
      "Treat route finding and current conditions as core parts of the trip. Do not enter unfamiliar caves or remote hill sections without appropriate local guidance."
    ],
    "bestFor": [
      "Hiking",
      "Caves",
      "Rock landscapes",
      "Adventure"
    ],
    "highlights": [
      {
        "name": "Hill terrain",
        "detail": "The rocky landscape is the main experience and requires suitable footwear and realistic fitness expectations."
      },
      {
        "name": "Cave features",
        "detail": "Only enter areas recognised as appropriate for visitors and use local guidance."
      },
      {
        "name": "Nasarawa nature circuit",
        "detail": "Farin Ruwa and Ara Rock are separate strong destinations for a longer state trip."
      },
      {
        "name": "Remote setting",
        "detail": "The trip requires more route planning than a city attraction."
      }
    ],
    "planning": [
      {
        "label": "Use a local guide",
        "detail": "Do not improvise through unfamiliar hill or cave terrain."
      },
      {
        "label": "Check current security and road conditions",
        "detail": "Verify the exact route close to departure."
      },
      {
        "label": "Carry essentials",
        "detail": "Bring water, sun protection and basic first-aid."
      },
      {
        "label": "Keep daylight margin",
        "detail": "Turn around early enough for a safe return."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Nasarawa tourism survey",
      "href": "https://fmino.gov.ng/report-on-tourism-survey-at-nasarawa-state-from-tuesday-7th-thursday-9th-of-may-2019/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "dagona-bird-sanctuary-guide",
    "title": "Dagona Bird Sanctuary Guide: Yobe Wetlands & Birding Planning",
    "shortTitle": "Dagona Bird Sanctuary",
    "kind": "destination",
    "region": "Yobe State",
    "summary": "Plan Dagona as a conservation-first birding trip in the Bade–Nguru wetlands, with current security, protected-area access and local-guide checks before travelling.",
    "intro": [
      "Dagona Bird Sanctuary sits within an important wetland landscape associated with migratory waterbirds and supports a distinct birding and conservation search intent.",
      "Yobe travel conditions and protected-area access can change materially. Confirm the current situation close to departure and do not travel simply because an old tourism page lists the site."
    ],
    "bestFor": [
      "Birding",
      "Wetlands",
      "Conservation",
      "Nature"
    ],
    "highlights": [
      {
        "name": "Wetland birdlife",
        "detail": "The sanctuary's value comes from habitat and seasonal bird activity rather than guaranteed species sightings."
      },
      {
        "name": "Bade–Nguru landscape",
        "detail": "The wider wetland system is ecologically important and should be approached with minimal disturbance."
      },
      {
        "name": "Conservation context",
        "detail": "Use guides and recognised access rather than leaving tracks or approaching nesting areas."
      },
      {
        "name": "Yobe heritage extension",
        "detail": "Dufuna canoe heritage and cultural events are separate state interests when current conditions support travel."
      }
    ],
    "planning": [
      {
        "label": "Check security first",
        "detail": "Use current official and trusted local advice for the exact route."
      },
      {
        "label": "Confirm protected-area access",
        "detail": "Ask whether a guide, permit or specific entry arrangement is required."
      },
      {
        "label": "Keep distance from birds",
        "detail": "Avoid nesting areas, loud disturbance and off-route movement."
      },
      {
        "label": "Travel with daylight",
        "detail": "Use conservative road and return timing."
      }
    ],
    "source": {
      "label": "Yobe Investment Promotion Agency — Culture and Tourism",
      "href": "https://yobeinvest.ng/culture-and-tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "agodi-gardens-guide",
    "title": "Agodi Gardens Ibadan Guide: Park Visit & Weekend Planning",
    "shortTitle": "Agodi Gardens",
    "kind": "destination",
    "region": "Oyo State",
    "summary": "Plan Agodi Gardens as an easy Ibadan park stop with current opening, weather and family-activity checks before arrival.",
    "intro": [
      "Agodi Gardens is one of Ibadan's best-known urban recreation spaces and supports a distinct park-and-family search intent beyond the broader city guide.",
      "Use it as a relaxed outdoor block, then keep Bower's Tower or the museum as separate additions depending on time and traffic."
    ],
    "bestFor": [
      "Parks",
      "Families",
      "Relaxed outings",
      "Ibadan"
    ],
    "highlights": [
      {
        "name": "Urban green space",
        "detail": "The garden is best used for a slower outdoor break rather than a rushed checklist stop."
      },
      {
        "name": "Family-friendly outing",
        "detail": "Current facilities and activities can vary, so confirm what is operating before travelling with children."
      },
      {
        "name": "Ibadan pairing",
        "detail": "Bower's Tower or the National Museum of Unity can fit the same weekend, but not every city stop needs to be in one day."
      },
      {
        "name": "Weather-sensitive",
        "detail": "Rain and midday heat can change the comfort of an outdoor visit quickly."
      }
    ],
    "planning": [
      {
        "label": "Confirm current opening",
        "detail": "Check the park's live operating status before travelling."
      },
      {
        "label": "Use cooler hours",
        "detail": "Morning or later afternoon can be more comfortable than peak heat."
      },
      {
        "label": "Keep one flexible block",
        "detail": "Swap outdoor plans if heavy rain arrives."
      },
      {
        "label": "Protect travel time",
        "detail": "Ibadan is large; avoid pairing the garden with distant stops without a route plan."
      }
    ],
    "source": {
      "label": "Oyo State Government — About Oyo State",
      "href": "https://oyostate.gov.ng/about-oyo-state/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "bowers-tower-guide",
    "title": "Bower's Tower Ibadan Guide: Views, History & Access Planning",
    "shortTitle": "Bower's Tower",
    "kind": "destination",
    "region": "Oyo State",
    "summary": "Plan Bower's Tower as an Ibadan viewpoint-and-history stop with current access, daylight and road checks before climbing.",
    "intro": [
      "Bower's Tower is one of Ibadan's defining hilltop landmarks and answers a focused city-view and heritage intent of its own.",
      "Use the tower for elevated perspective, then keep museum or park stops nearby enough that traffic does not dominate the rest of the day."
    ],
    "bestFor": [
      "Views",
      "History",
      "Photography",
      "Ibadan"
    ],
    "highlights": [
      {
        "name": "City panorama",
        "detail": "The elevated location gives one of the clearest ways to understand Ibadan's scale and terrain."
      },
      {
        "name": "Historic landmark",
        "detail": "The tower adds colonial-era civic context to a city trip."
      },
      {
        "name": "Compact visit",
        "detail": "It works well as one focused morning or afternoon block rather than a full-day attraction."
      },
      {
        "name": "Museum pairing",
        "detail": "The National Museum of Unity can provide historical depth on a separate city block."
      }
    ],
    "planning": [
      {
        "label": "Check access first",
        "detail": "Confirm current opening and whether the tower itself is accessible."
      },
      {
        "label": "Use daylight",
        "detail": "Views and footing are better before dark."
      },
      {
        "label": "Wear practical footwear",
        "detail": "Hill or stair approaches can be tiring."
      },
      {
        "label": "Avoid overpacking the route",
        "detail": "Ibadan traffic makes a short, clustered itinerary more reliable."
      }
    ],
    "source": {
      "label": "Oyo State tourism publication",
      "href": "https://tourism.oyostate.gov.ng/wp-content/uploads/2025/07/NEW-DEAL-BOOK-ITSOYOSTATE-2025.pdf"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "osun-osogbo-sacred-grove-guide",
    "title": "Osun-Osogbo Sacred Grove Guide: UNESCO Heritage & Visitor Etiquette",
    "shortTitle": "Osun-Osogbo Sacred Grove",
    "kind": "destination",
    "region": "Osun State",
    "summary": "Visit the Osun-Osogbo Sacred Grove as a living sacred and UNESCO-listed cultural landscape, with respectful access and photography rules.",
    "intro": [
      "The Osun-Osogbo Sacred Grove is one of Nigeria's most significant cultural landscapes and is both a heritage destination and a living sacred environment.",
      "A useful visit depends on cultural respect, current access and interpretation, not just walking through the forest for photographs."
    ],
    "bestFor": [
      "UNESCO heritage",
      "Yoruba culture",
      "Sacred landscapes",
      "Art"
    ],
    "highlights": [
      {
        "name": "Sacred forest",
        "detail": "The grove is a living religious landscape rather than a conventional public park."
      },
      {
        "name": "Art and shrines",
        "detail": "Sculptural works and sacred structures form part of the cultural landscape and should be approached respectfully."
      },
      {
        "name": "Osogbo context",
        "detail": "Nike Art Centre and the Ataoja Palace area can add wider artistic and royal context."
      },
      {
        "name": "Festival season",
        "detail": "Osun-Osogbo festival periods can change crowds, access and accommodation demand."
      }
    ],
    "planning": [
      {
        "label": "Follow sacred-site rules",
        "detail": "Do not enter restricted areas or ignore local instructions."
      },
      {
        "label": "Ask before photography",
        "detail": "Sacred spaces and people may have restrictions."
      },
      {
        "label": "Use local interpretation",
        "detail": "A knowledgeable guide adds meaning and reduces shallow storytelling."
      },
      {
        "label": "Plan festival visits separately",
        "detail": "Major festival periods need different transport and crowd planning."
      }
    ],
    "source": {
      "label": "Osun State Government — Tourist Centres",
      "href": "https://www.osunstate.gov.ng/tourist-centres/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ooni-palace-ile-ife-guide",
    "title": "Ooni's Palace Ile-Ife Guide: Royal Heritage & Visitor Etiquette",
    "shortTitle": "Ooni's Palace Ile-Ife",
    "kind": "destination",
    "region": "Osun State",
    "summary": "Plan a respectful visit to the Ooni's Palace area in Ile-Ife with current access, dress and photography rules checked before arrival.",
    "intro": [
      "The Ooni's Palace sits at the centre of Ile-Ife's royal and cultural identity and supports a distinct heritage visit separate from a generic city guide.",
      "Because it is an active royal institution, public access can change and visitor etiquette matters more than treating the complex like a museum."
    ],
    "bestFor": [
      "Royal heritage",
      "Yoruba history",
      "Culture",
      "Ile-Ife"
    ],
    "highlights": [
      {
        "name": "Royal institution",
        "detail": "The palace is a living seat of traditional authority, not a static attraction."
      },
      {
        "name": "Ile-Ife heritage",
        "detail": "The palace area connects naturally with the National Museum and Moremi monument."
      },
      {
        "name": "Cultural interpretation",
        "detail": "Local context is essential for understanding the significance of the spaces and traditions."
      },
      {
        "name": "Ceremonial periods",
        "detail": "Events or palace activity can change visitor movement and access."
      }
    ],
    "planning": [
      {
        "label": "Confirm public access",
        "detail": "Check what areas are open before travelling specifically for the palace."
      },
      {
        "label": "Dress respectfully",
        "detail": "Use modest clothing appropriate for a formal traditional institution."
      },
      {
        "label": "Ask before photography",
        "detail": "Do not assume cameras are permitted throughout palace-related spaces."
      },
      {
        "label": "Follow local instructions",
        "detail": "Respect security, custodians and ceremonial boundaries."
      }
    ],
    "source": {
      "label": "Osun State Government — Tourist Centres",
      "href": "https://www.osunstate.gov.ng/tourist-centres/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "araromi-seaside-guide",
    "title": "Araromi Seaside Guide: Ondo Coast, Access & Safety Planning",
    "shortTitle": "Araromi Seaside",
    "kind": "destination",
    "region": "Ondo State",
    "summary": "Plan Araromi Seaside as an Ondo coastal road trip with live access, weather, surf and return-transport checks.",
    "intro": [
      "Araromi Seaside gives Ondo State a distinct Atlantic-coast travel intent beyond its hill and forest attractions.",
      "Coastal conditions can change quickly, so sea state, road access and a daylight return plan are more important than a fixed activity list."
    ],
    "bestFor": [
      "Beaches",
      "Atlantic coast",
      "Road trips",
      "Photography"
    ],
    "highlights": [
      {
        "name": "Atlantic shoreline",
        "detail": "The coast is the central attraction and works best as a dedicated beach day."
      },
      {
        "name": "Ilaje landscape",
        "detail": "The wider coastal environment gives the trip a different character from inland Ondo."
      },
      {
        "name": "Photography",
        "detail": "Open shoreline and changing light can be attractive without needing to enter rough water."
      },
      {
        "name": "Separate from Idanre",
        "detail": "The coast and hills are different route directions and should not be forced into one short day."
      }
    ],
    "planning": [
      {
        "label": "Check sea conditions",
        "detail": "Do not enter rough water simply because the beach is accessible."
      },
      {
        "label": "Confirm the final road",
        "detail": "Use current local directions for the approach."
      },
      {
        "label": "Plan the return first",
        "detail": "Avoid a late rural or coastal departure without reliable transport."
      },
      {
        "label": "Protect valuables",
        "detail": "Use a water-resistant plan for phones and documents."
      }
    ],
    "source": {
      "label": "Ondo State Government — coastal tourism update",
      "href": "https://ondostate.gov.ng/news-details?id=708515"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ebomi-lake-guide",
    "title": "Ebomi Lake Guide: Ondo Nature Trip & Water Safety Planning",
    "shortTitle": "Ebomi Lake",
    "kind": "destination",
    "region": "Ondo State",
    "summary": "Use Ebomi Lake as a focused Akoko nature trip with current community access, water-safety and daylight checks.",
    "intro": [
      "Ebomi Lake is one of Ondo State's distinctive inland-water attractions and answers a slower nature-and-landscape intent than the state's hill or seaside trips.",
      "Treat water activities as condition-dependent and use local guidance rather than assuming swimming or boating is automatically available."
    ],
    "bestFor": [
      "Lakes",
      "Nature",
      "Photography",
      "Road trips"
    ],
    "highlights": [
      {
        "name": "Lake landscape",
        "detail": "The water and surrounding scenery are the main reasons to visit."
      },
      {
        "name": "Akoko setting",
        "detail": "The rural location makes local directions and road timing part of the trip."
      },
      {
        "name": "Slow nature stop",
        "detail": "The lake works best as a dedicated block rather than another item in a long state circuit."
      },
      {
        "name": "Community context",
        "detail": "Local guidance can clarify appropriate access and any cultural considerations."
      }
    ],
    "planning": [
      {
        "label": "Confirm local access",
        "detail": "Use current community or tourism guidance before travelling."
      },
      {
        "label": "Do not assume water safety",
        "detail": "Only enter water when current conditions and responsible local guidance support it."
      },
      {
        "label": "Travel in daylight",
        "detail": "Build a conservative road-time margin."
      },
      {
        "label": "Carry essentials",
        "detail": "Do not assume full visitor services are available."
      }
    ],
    "source": {
      "label": "Ondo State profile",
      "href": "https://mepb.on.gov.ng/meet-us/ondo-state-profile/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ilorin-central-mosque-guide",
    "title": "Ilorin Central Mosque Guide: Architecture, Worship & Visitor Etiquette",
    "shortTitle": "Ilorin Central Mosque",
    "kind": "destination",
    "region": "Kwara State",
    "summary": "Plan an Ilorin Central Mosque visit around worship schedules, respectful dress and current visitor boundaries.",
    "intro": [
      "Ilorin Central Mosque is one of Kwara's defining religious and architectural landmarks and supports a focused heritage visit.",
      "It remains an active place of worship, so prayer, dress and photography etiquette take priority over casual sightseeing."
    ],
    "bestFor": [
      "Islamic architecture",
      "Culture",
      "History",
      "Ilorin"
    ],
    "highlights": [
      {
        "name": "Architecture",
        "detail": "The mosque is one of the city's most recognisable built landmarks."
      },
      {
        "name": "Living worship space",
        "detail": "Visitor behaviour should reflect that religious activity takes priority."
      },
      {
        "name": "Ilorin identity",
        "detail": "The site is closely tied to the city's cultural and historical character."
      },
      {
        "name": "City pairing",
        "detail": "Flower Garden or another city stop can fit the same day without a long rural drive."
      }
    ],
    "planning": [
      {
        "label": "Avoid disrupting prayer",
        "detail": "Choose a respectful visit time and follow mosque instructions."
      },
      {
        "label": "Dress modestly",
        "detail": "Use clothing appropriate for an active religious site."
      },
      {
        "label": "Ask before photography",
        "detail": "Do not assume cameras are permitted in all areas."
      },
      {
        "label": "Follow local guidance",
        "detail": "Use designated visitor areas and entrances."
      }
    ],
    "source": {
      "label": "Kwara State tourism information",
      "href": "https://kwarastate.gov.ng/do-business/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ibom-unity-museum-guide",
    "title": "Ibom Unity Museum Guide: Uyo History & Culture Visit",
    "shortTitle": "Ibom Unity Museum",
    "kind": "destination",
    "region": "Akwa Ibom State",
    "summary": "Use Ibom Unity Museum as a focused Uyo culture-and-history stop, with current operating details checked before travelling.",
    "intro": [
      "Ibom Unity Museum supports a distinct cultural visit inside Uyo and gives a short city break more depth than leisure-only attractions.",
      "Akwa Ibom's tourism programme has continued to highlight the site, but live public access should still be confirmed before a dedicated visit."
    ],
    "bestFor": [
      "Museums",
      "Akwa Ibom history",
      "Culture",
      "Uyo"
    ],
    "highlights": [
      {
        "name": "State heritage",
        "detail": "The museum provides context for Akwa Ibom's people, identity and history."
      },
      {
        "name": "City location",
        "detail": "It fits naturally into a Uyo-based itinerary without a long coastal road trip."
      },
      {
        "name": "Arts pairing",
        "detail": "The State Centre for Arts and Culture can complement the museum when public programmes are available."
      },
      {
        "name": "Indoor alternative",
        "detail": "The museum can provide a useful weather-proof cultural block during a city weekend."
      }
    ],
    "planning": [
      {
        "label": "Confirm opening",
        "detail": "Check current public hours before travelling."
      },
      {
        "label": "Follow photography rules",
        "detail": "Ask before photographing indoor collections."
      },
      {
        "label": "Allow interpretation time",
        "detail": "Do not rush a museum visit between unrelated errands."
      },
      {
        "label": "Keep coastal trips separate",
        "detail": "Ibeno and other coastal destinations need their own road-time planning."
      }
    ],
    "source": {
      "label": "Akwa Ibom State Government tourism update",
      "href": "https://akwaibomstate.gov.ng/a-r-i-s-e-agenda-gov-umo-eno-tours-tourism-sites-vows-to-revamp-akwa-ibom-tourism-sector/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "owerre-ezukala-cave-waterfall-guide",
    "title": "Owerre-Ezukala Cave & Waterfall Guide: Anambra Nature Planning",
    "shortTitle": "Owerre-Ezukala Cave & Waterfall",
    "kind": "destination",
    "region": "Anambra State",
    "summary": "Plan Owerre-Ezukala as a dedicated Anambra cave-and-waterfall trip with local guidance, weather and daylight checks.",
    "intro": [
      "Owerre-Ezukala combines cave and waterfall features in one destination and supports a different nature intent from Ogbunike or Agulu Lake.",
      "Anambra has identified the site for tourism development, but current access, route and safety conditions should be checked close to the visit."
    ],
    "bestFor": [
      "Caves",
      "Waterfalls",
      "Adventure",
      "Nature"
    ],
    "highlights": [
      {
        "name": "Cave setting",
        "detail": "Use a recognised local route rather than entering unfamiliar cave sections independently."
      },
      {
        "name": "Waterfall landscape",
        "detail": "Water flow and footing change with rainfall."
      },
      {
        "name": "Rural Anambra trip",
        "detail": "The journey requires more planning than an urban stop."
      },
      {
        "name": "Separate from Ogbunike",
        "detail": "Both are strong cave destinations, but each deserves its own trip block."
      }
    ],
    "planning": [
      {
        "label": "Use local guidance",
        "detail": "Confirm the current visitor route before entering cave or waterfall areas."
      },
      {
        "label": "Wear grip-friendly shoes",
        "detail": "Expect wet and uneven surfaces."
      },
      {
        "label": "Check rainfall",
        "detail": "Heavy rain can change water flow and road comfort."
      },
      {
        "label": "Return before dark",
        "detail": "Protect enough daylight for the rural journey back."
      }
    ],
    "source": {
      "label": "Anambra State tourism development update",
      "href": "https://anambrastate.gov.ng/soludo-administration-to-develop-five-major-tourism-heritage-sites-in-anambra/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "oloibiri-oil-heritage-guide",
    "title": "Oloibiri Oil Heritage Guide: Bayelsa History & Visitor Planning",
    "shortTitle": "Oloibiri Oil Heritage",
    "kind": "destination",
    "region": "Bayelsa State",
    "summary": "Visit the Oloibiri/Otuabagi oil heritage area for Nigeria's petroleum-history context, with current site access and local guidance checked before travelling.",
    "intro": [
      "Oloibiri's oil heritage is nationally significant and gives Bayelsa a distinct industrial-history travel intent beyond riverine leisure.",
      "The useful visit is about historical context and community interpretation, not simply photographing a marker. Confirm what facilities and heritage sites are currently open."
    ],
    "bestFor": [
      "Industrial history",
      "Nigeria history",
      "Bayelsa",
      "Heritage"
    ],
    "highlights": [
      {
        "name": "Oil-history context",
        "detail": "The area is associated with Nigeria's early commercial petroleum production and deserves careful historical interpretation."
      },
      {
        "name": "Community setting",
        "detail": "Use local guidance and respect residents rather than treating the area as an abandoned industrial exhibit."
      },
      {
        "name": "Bayelsa contrast",
        "detail": "Yenagoa's Ox-Bow Lake offers a different leisure experience for a longer state trip."
      },
      {
        "name": "Heritage infrastructure",
        "detail": "Visitor facilities can change, so confirm what is actually open before travelling."
      }
    ],
    "planning": [
      {
        "label": "Confirm site access",
        "detail": "Check current public facilities and recognised visitor points."
      },
      {
        "label": "Use local interpretation",
        "detail": "Historical context matters more than a quick photo stop."
      },
      {
        "label": "Respect community spaces",
        "detail": "Ask before photographing people or private property."
      },
      {
        "label": "Travel in daylight",
        "detail": "Use conservative road timing outside Yenagoa."
      }
    ],
    "source": {
      "label": "Bayelsa Ministry of Tourism Development — Tourism Sites",
      "href": "https://motd.bayelsastate.gov.ng/tourism-sites/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "makurdi-river-benue-guide",
    "title": "Makurdi River Benue Guide: Waterfront, Safety & City Planning",
    "shortTitle": "Makurdi River Benue",
    "kind": "destination",
    "region": "Benue State",
    "summary": "Use Makurdi's River Benue waterfront as a focused city nature stop, with current water, weather and operator checks before any boat activity.",
    "intro": [
      "The River Benue is central to Makurdi's identity and supports a distinct waterfront travel intent separate from Benue's hill and spring destinations.",
      "Treat water activities as optional and condition-dependent. The river can still be a meaningful landscape stop without boarding a boat."
    ],
    "bestFor": [
      "River views",
      "Makurdi",
      "Photography",
      "Relaxed outings"
    ],
    "highlights": [
      {
        "name": "River landscape",
        "detail": "The broad river is the main visual and geographic attraction."
      },
      {
        "name": "City identity",
        "detail": "The waterfront helps explain Makurdi's relationship with the River Benue."
      },
      {
        "name": "Optional boat viewing",
        "detail": "Use only a suitable operator with clear safety equipment and return arrangements."
      },
      {
        "name": "Benue extension",
        "detail": "Ushongo Hills or Enemabia Warm Spring are separate road-trip options for a longer stay."
      }
    ],
    "planning": [
      {
        "label": "Check river conditions",
        "detail": "Weather and water levels should determine whether water activity is appropriate."
      },
      {
        "label": "Verify life jackets",
        "detail": "Do not board a boat without suitable safety equipment."
      },
      {
        "label": "Plan your return",
        "detail": "Agree the return point and transport before a late waterfront period."
      },
      {
        "label": "Keep rural trips separate",
        "detail": "Do not combine distant Benue destinations casually in one short day."
      }
    ],
    "source": {
      "label": "Benue State Department of Tourism",
      "href": "https://bact.benuestate.gov.ng/departments/department-of-tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ushongo-hills-guide",
    "title": "Ushongo Hills Guide: Benue Hiking & Road Trip Planning",
    "shortTitle": "Ushongo Hills",
    "kind": "destination",
    "region": "Benue State",
    "summary": "Plan Ushongo Hills as a dedicated Benue outdoor trip with local route, daylight, road and weather checks.",
    "intro": [
      "Ushongo Hills gives Benue a distinct hill-and-landscape travel intent beyond Makurdi's riverfront or the state's warm spring.",
      "Treat the visit as an outdoor activity requiring current local guidance and realistic travel time rather than a roadside viewpoint."
    ],
    "bestFor": [
      "Hiking",
      "Rock landscapes",
      "Nature",
      "Road trips"
    ],
    "highlights": [
      {
        "name": "Hill terrain",
        "detail": "The landscape and elevated views are the main reason to visit."
      },
      {
        "name": "Outdoor activity",
        "detail": "A proper hill visit needs practical footwear, water and enough time."
      },
      {
        "name": "Benue countryside",
        "detail": "The rural setting is part of the trip and increases the need for route planning."
      },
      {
        "name": "Separate state clusters",
        "detail": "Makurdi and Otukpo-area attractions are different trip directions."
      }
    ],
    "planning": [
      {
        "label": "Use local guidance",
        "detail": "Confirm the recognised route and turnaround time."
      },
      {
        "label": "Check current road conditions",
        "detail": "Weather can change rural access."
      },
      {
        "label": "Carry essentials",
        "detail": "Bring water, sun protection and basic first-aid."
      },
      {
        "label": "Return before dark",
        "detail": "Keep a conservative daylight margin."
      }
    ],
    "source": {
      "label": "Benue State Department of Tourism",
      "href": "https://bact.benuestate.gov.ng/departments/department-of-tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nana-palace-koko-guide",
    "title": "Nana Living History Palace Guide: Koko Heritage & Delta Planning",
    "shortTitle": "Nana Living History Palace",
    "kind": "destination",
    "region": "Delta State",
    "summary": "Visit Nana Living History Palace in Koko as a focused Delta heritage stop with current public access and interpretation checked before travelling.",
    "intro": [
      "The Nana Living History Palace preserves an important Niger Delta political and trading story and supports a distinct heritage visit beyond Delta's nature attractions.",
      "Use current official or local guidance for access and interpretation rather than relying on old visitor reports."
    ],
    "bestFor": [
      "History",
      "Niger Delta heritage",
      "Museums",
      "Koko"
    ],
    "highlights": [
      {
        "name": "Nana Olomu history",
        "detail": "The site is connected with one of the most significant Itsekiri trading and political figures of the colonial period."
      },
      {
        "name": "Living-history setting",
        "detail": "The palace context makes the visit more meaningful than a standalone artefact display."
      },
      {
        "name": "Delta heritage circuit",
        "detail": "Mungo Park House in Asaba forms another separate historical cluster."
      },
      {
        "name": "Community setting",
        "detail": "Respect local use and any palace-specific boundaries."
      }
    ],
    "planning": [
      {
        "label": "Confirm public access",
        "detail": "Check opening and visitor arrangements before travelling."
      },
      {
        "label": "Ask before photography",
        "detail": "Palace and heritage spaces may have restrictions."
      },
      {
        "label": "Allow interpretation time",
        "detail": "Use the visit to understand the history rather than rushing through."
      },
      {
        "label": "Keep distant Delta stops separate",
        "detail": "Koko and Asaba require realistic road-time planning."
      }
    ],
    "source": {
      "label": "Federal Presidency South-South Community Engagement — Delta",
      "href": "https://communityengagementss.presidency.gov.ng/portfolio/delta/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "mungo-park-house-asaba-guide",
    "title": "Mungo Park House Asaba Guide: Delta Colonial Heritage Visit",
    "shortTitle": "Mungo Park House Asaba",
    "kind": "destination",
    "region": "Delta State",
    "summary": "Plan Mungo Park House as an Asaba heritage stop with current opening, interpretation and photography rules checked before arrival.",
    "intro": [
      "Mungo Park House is one of Delta's documented historic landmarks and supports a focused colonial-history visit inside Asaba.",
      "The site is most useful with careful historical context rather than a quick landmark photograph."
    ],
    "bestFor": [
      "History",
      "Asaba",
      "Heritage",
      "Architecture"
    ],
    "highlights": [
      {
        "name": "Historic building",
        "detail": "The structure provides a tangible link to early colonial-era exploration and administration narratives."
      },
      {
        "name": "Asaba city stop",
        "detail": "It can fit into a short heritage block without a long rural road trip."
      },
      {
        "name": "Delta history context",
        "detail": "The site adds a different layer to the state's river, trade and colonial history."
      },
      {
        "name": "Interpretation",
        "detail": "Use credible historical framing rather than romanticised explorer stories."
      }
    ],
    "planning": [
      {
        "label": "Confirm opening",
        "detail": "Check current public access before travelling."
      },
      {
        "label": "Follow photography rules",
        "detail": "Ask before photographing interiors or collections."
      },
      {
        "label": "Use credible history",
        "detail": "Prefer museum or official interpretation over simplified travel summaries."
      },
      {
        "label": "Keep Koko separate",
        "detail": "Nana Palace is a different Delta heritage cluster with its own road time."
      }
    ],
    "source": {
      "label": "Federal Presidency South-South Community Engagement — Delta",
      "href": "https://communityengagementss.presidency.gov.ng/portfolio/delta/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "dutse-rock-city-guide",
    "title": "Dutse Rock City Guide: Jigawa Landscape & Visitor Planning",
    "shortTitle": "Dutse Rock City",
    "kind": "destination",
    "region": "Jigawa State",
    "summary": "Use Dutse's surrounding rock landscape as a focused Jigawa city-and-nature trip with daylight, weather and local-route checks.",
    "intro": [
      "Dutse is known for its distinctive rocky setting, giving the Jigawa capital a visual identity that supports a dedicated landscape guide.",
      "Treat the rock environment as open terrain rather than unrestricted climbing space and use current local directions for appropriate viewpoints."
    ],
    "bestFor": [
      "Rock landscapes",
      "Photography",
      "Dutse",
      "Short city trips"
    ],
    "highlights": [
      {
        "name": "Rocky city setting",
        "detail": "The formations around Dutse create the main visual character of the destination."
      },
      {
        "name": "City viewpoint potential",
        "detail": "Use recognised public areas rather than improvising on steep or private terrain."
      },
      {
        "name": "Jigawa heritage pairing",
        "detail": "Saminu Turaki Tower can add a built-landmark stop to the same city trip."
      },
      {
        "name": "Birnin Kudu extension",
        "detail": "The heritage area is a separate road block for a longer stay."
      }
    ],
    "planning": [
      {
        "label": "Use safe public viewpoints",
        "detail": "Do not climb unstable or restricted rock areas."
      },
      {
        "label": "Avoid peak heat",
        "detail": "Outdoor rock landscapes can become very hot."
      },
      {
        "label": "Carry water",
        "detail": "Do not depend on supplies outside central areas."
      },
      {
        "label": "Keep daylight margin",
        "detail": "Finish outdoor exploration before visibility drops."
      }
    ],
    "source": {
      "label": "Jigawa State Government",
      "href": "https://jigawastate.gov.ng/index"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "saminu-turaki-tower-guide",
    "title": "Saminu Turaki Tower Dutse Guide: Landmark Visit & City Views",
    "shortTitle": "Saminu Turaki Tower",
    "kind": "destination",
    "region": "Jigawa State",
    "summary": "Plan a Saminu Turaki Tower visit as a Dutse landmark stop with current access, opening and photography rules checked beforehand.",
    "intro": [
      "Saminu Turaki Tower is one of Dutse's most recognisable built landmarks and supports a focused city-view and architecture intent.",
      "Public access and tower operations can change, so confirm current visitor arrangements before travelling specifically for the site."
    ],
    "bestFor": [
      "Architecture",
      "City views",
      "Dutse",
      "Photography"
    ],
    "highlights": [
      {
        "name": "Built landmark",
        "detail": "The tower provides a distinct urban focal point within Dutse."
      },
      {
        "name": "City context",
        "detail": "It pairs naturally with the wider Dutse rock landscape."
      },
      {
        "name": "Short visit",
        "detail": "The tower can work as one focused stop in a city itinerary rather than a full-day destination."
      },
      {
        "name": "Photography",
        "detail": "Use permitted public areas and follow any security restrictions."
      }
    ],
    "planning": [
      {
        "label": "Confirm public access",
        "detail": "Check whether the tower is currently open to visitors."
      },
      {
        "label": "Follow security instructions",
        "detail": "Do not cross barriers or restricted areas for a better photo."
      },
      {
        "label": "Use daylight",
        "detail": "Visit when access and views are easiest to assess."
      },
      {
        "label": "Pair locally",
        "detail": "Keep the rest of the day around Dutse rather than adding a distant inter-town trip."
      }
    ],
    "source": {
      "label": "Jigawa State Government",
      "href": "https://jigawastate.gov.ng/index"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "zaria-city-walls-guide",
    "title": "Zaria City Walls Guide: Kaduna Heritage & Old City Planning",
    "shortTitle": "Zaria City Walls",
    "kind": "destination",
    "region": "Kaduna State",
    "summary": "Use Zaria's historic wall remains as a focused old-city heritage visit with local guidance and respectful photography.",
    "intro": [
      "Zaria's city walls are part of the historic fabric of one of northern Nigeria's major traditional cities and support a distinct built-heritage search intent.",
      "Because surviving sections sit within a living city, use local context and current route information rather than expecting a single fenced attraction."
    ],
    "bestFor": [
      "History",
      "Old cities",
      "Architecture",
      "Zaria"
    ],
    "highlights": [
      {
        "name": "Historic wall remains",
        "detail": "The surviving sections help explain the old city's defensive and urban form."
      },
      {
        "name": "Living urban context",
        "detail": "The walls are embedded in contemporary Zaria rather than isolated in a museum setting."
      },
      {
        "name": "Kufena connection",
        "detail": "Kufena Hills can add a nature block to a longer Zaria stay."
      },
      {
        "name": "Traditional city identity",
        "detail": "Local interpretation can connect the walls to wider emirate history."
      }
    ],
    "planning": [
      {
        "label": "Use local guidance",
        "detail": "Ask where the clearest and most appropriate surviving sections can be viewed."
      },
      {
        "label": "Respect residents",
        "detail": "Do not treat homes or private streets as open heritage exhibits."
      },
      {
        "label": "Ask before photography",
        "detail": "Use normal courtesy around people and traditional areas."
      },
      {
        "label": "Stay in daylight",
        "detail": "Historic streets and wall sections are easier to understand and navigate during the day."
      }
    ],
    "source": {
      "label": "Kaduna Investment Promotion Agency — tourism publications",
      "href": "https://kadipa.kdsg.gov.ng/documents.html"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "sultans-palace-sokoto-guide",
    "title": "Sultan's Palace Sokoto Guide: Caliphate Heritage & Visitor Etiquette",
    "shortTitle": "Sultan's Palace Sokoto",
    "kind": "destination",
    "region": "Sokoto State",
    "summary": "Plan a respectful visit around the Sultan's Palace area in Sokoto with current public boundaries, dress and photography rules checked first.",
    "intro": [
      "The Sultanate heritage area is central to Sokoto's historical and religious identity and supports a focused cultural visit.",
      "It remains an active traditional and religious institution, so access is not equivalent to a museum ticket and may change around ceremonies or official activity."
    ],
    "bestFor": [
      "Caliphate history",
      "Royal heritage",
      "Islamic culture",
      "Sokoto"
    ],
    "highlights": [
      {
        "name": "Sultanate heritage",
        "detail": "The palace area is tied to the continuing institutional legacy of the Sokoto Caliphate."
      },
      {
        "name": "Living institution",
        "detail": "Traditional and religious functions take priority over sightseeing."
      },
      {
        "name": "History Bureau pairing",
        "detail": "Sokoto State History Bureau can add documentary context to a heritage day."
      },
      {
        "name": "City cultural context",
        "detail": "The wider old-city environment helps place the palace in Sokoto's historical landscape."
      }
    ],
    "planning": [
      {
        "label": "Confirm public boundaries",
        "detail": "Check which areas can be visited before travelling specifically for the palace."
      },
      {
        "label": "Dress respectfully",
        "detail": "Use modest clothing appropriate for a formal religious and traditional institution."
      },
      {
        "label": "Ask before photography",
        "detail": "Do not assume cameras are permitted."
      },
      {
        "label": "Avoid ceremonial disruption",
        "detail": "Follow staff and security directions during official activity."
      }
    ],
    "source": {
      "label": "Sokoto State Government — History of Sokoto",
      "href": "https://sokotostate.gov.ng/history-of-sokoto/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "dufuna-canoe-heritage-guide",
    "title": "Dufuna Canoe Heritage Guide: Yobe Archaeology & Trip Planning",
    "shortTitle": "Dufuna Canoe Heritage",
    "kind": "destination",
    "region": "Yobe State",
    "summary": "Use Dufuna canoe heritage as a focused archaeology-and-history trip only after confirming current exhibition, access and security conditions.",
    "intro": [
      "The Dufuna canoe is one of Africa's most important archaeological discoveries and gives Yobe a distinct ancient-technology and heritage search intent.",
      "Because the original find, exhibition arrangements and current travel conditions are separate issues, confirm what visitors can actually see before making the journey."
    ],
    "bestFor": [
      "Archaeology",
      "African history",
      "Ancient technology",
      "Yobe heritage"
    ],
    "highlights": [
      {
        "name": "Ancient canoe heritage",
        "detail": "The find is significant for understanding early watercraft technology and settlement in the region."
      },
      {
        "name": "Archaeological context",
        "detail": "The story is more meaningful with careful interpretation rather than a simple 'oldest canoe' headline."
      },
      {
        "name": "Yobe cultural landscape",
        "detail": "The heritage belongs within the broader historic and Sahel setting of the state."
      },
      {
        "name": "Separate from birding",
        "detail": "Dagona is a different conservation trip with its own current access requirements."
      }
    ],
    "planning": [
      {
        "label": "Confirm what is viewable",
        "detail": "Check the current exhibition or heritage arrangement before travelling."
      },
      {
        "label": "Check security first",
        "detail": "Use current official and trusted local advice for the route."
      },
      {
        "label": "Use credible interpretation",
        "detail": "Prefer museum, archaeological or official context over exaggerated claims."
      },
      {
        "label": "Travel in daylight",
        "detail": "Use conservative road timing."
      }
    ],
    "source": {
      "label": "Yobe Investment Promotion Agency — Culture and Tourism",
      "href": "https://yobeinvest.ng/culture-and-tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "kaltungo-hills-guide",
    "title": "Kaltungo Hills Guide: Gombe Landscape & Road Trip Planning",
    "shortTitle": "Kaltungo Hills",
    "kind": "destination",
    "region": "Gombe State",
    "summary": "Plan Kaltungo Hills as a dedicated Gombe outdoor trip with current road, local-route and daylight checks.",
    "intro": [
      "Kaltungo's hill landscape gives southern Gombe a distinct outdoor destination separate from Dadin Kowa or the state's river corridors.",
      "Use local guidance for appropriate viewpoints and treat the trip as a road-and-landscape day rather than a quick detour."
    ],
    "bestFor": [
      "Hills",
      "Road trips",
      "Photography",
      "Gombe nature"
    ],
    "highlights": [
      {
        "name": "Hill landscape",
        "detail": "The terrain and views are the central experience."
      },
      {
        "name": "Southern Gombe setting",
        "detail": "The route gives a different landscape perspective from Gombe city."
      },
      {
        "name": "Outdoor stop",
        "detail": "Plan for heat, water and uneven ground."
      },
      {
        "name": "State nature circuit",
        "detail": "Dadin Kowa and Nafada are separate route directions."
      }
    ],
    "planning": [
      {
        "label": "Confirm current access",
        "detail": "Use local information for suitable viewpoints and routes."
      },
      {
        "label": "Check the road",
        "detail": "Weather and works can change rural travel time."
      },
      {
        "label": "Carry water",
        "detail": "Do not assume visitor services on the hills."
      },
      {
        "label": "Return before dark",
        "detail": "Protect enough daylight for the road journey back."
      }
    ],
    "source": {
      "label": "Gombe State Government — Local Government Areas",
      "href": "https://gombestate.gov.ng/pages/lgas.php"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "mbari-cultural-centre-guide",
    "title": "Mbari Cultural Centre Owerri Guide: Igbo Art & Heritage Visit",
    "shortTitle": "Mbari Cultural Centre",
    "kind": "destination",
    "region": "Imo State",
    "summary": "Use Mbari Cultural Centre as a focused Owerri culture stop with current opening, programme and photography details checked before arrival.",
    "intro": [
      "Mbari Cultural Centre offers a distinct art-and-heritage intent inside Owerri and gives an Imo trip a cultural anchor beyond Oguta Lake.",
      "Current public programming and access can change, so confirm what is operating before travelling specifically for the centre."
    ],
    "bestFor": [
      "Igbo culture",
      "Art",
      "Owerri",
      "Heritage"
    ],
    "highlights": [
      {
        "name": "Cultural expression",
        "detail": "The centre is associated with Imo and wider Igbo artistic and cultural identity."
      },
      {
        "name": "Owerri city stop",
        "detail": "It works as a compact indoor or semi-indoor cultural block."
      },
      {
        "name": "Oguta contrast",
        "detail": "Oguta Lake provides a separate nature-and-water destination for a longer Imo stay."
      },
      {
        "name": "Programme-dependent experience",
        "detail": "Events or exhibitions can significantly change what a visitor sees."
      }
    ],
    "planning": [
      {
        "label": "Confirm opening and programme",
        "detail": "Check current public access before travelling."
      },
      {
        "label": "Ask before photography",
        "detail": "Follow rules around artworks, performances and people."
      },
      {
        "label": "Allow interpretation time",
        "detail": "Use the centre for cultural context rather than a quick photo stop."
      },
      {
        "label": "Keep lake trips separate",
        "detail": "Oguta needs its own road and water-safety planning."
      }
    ],
    "source": {
      "label": "Imo State Investment Promotion Agency — About Imo",
      "href": "https://www.isipa.im.gov.ng/about-imo.html"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ara-rock-guide",
    "title": "Ara Rock Nasarawa Guide: Landscape & Road Trip Planning",
    "shortTitle": "Ara Rock",
    "kind": "destination",
    "region": "Nasarawa State",
    "summary": "Plan Ara Rock as a dedicated Nasarawa landscape stop with current road, local-access and daylight checks.",
    "intro": [
      "Ara Rock is one of Nasarawa's documented natural landmarks and supports a focused geology-and-landscape trip separate from Farin Ruwa or Eggon Hills.",
      "The rock should be treated as a viewing and landscape destination unless current local guidance specifically supports a recognised climbing route."
    ],
    "bestFor": [
      "Rock landscapes",
      "Photography",
      "Road trips",
      "Nature"
    ],
    "highlights": [
      {
        "name": "Prominent rock formation",
        "detail": "The geological landmark is the main reason to travel to Ara."
      },
      {
        "name": "Rural setting",
        "detail": "The surrounding landscape adds to the trip but increases reliance on current directions."
      },
      {
        "name": "Nasarawa nature circuit",
        "detail": "Eggon Hills and Farin Ruwa are separate outdoor destinations."
      },
      {
        "name": "Viewpoint-first experience",
        "detail": "There is no need to climb unstable terrain to appreciate the formation."
      }
    ],
    "planning": [
      {
        "label": "Confirm local access",
        "detail": "Ask where visitors can stop safely and legally."
      },
      {
        "label": "Avoid unapproved climbing",
        "detail": "Do not improvise a route on unfamiliar rock."
      },
      {
        "label": "Travel in daylight",
        "detail": "Keep enough return margin for a rural road trip."
      },
      {
        "label": "Carry essentials",
        "detail": "Bring water and basic supplies rather than assuming visitor facilities."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Nasarawa tourism survey",
      "href": "https://fmino.gov.ng/report-on-tourism-survey-at-nasarawa-state-from-tuesday-7th-thursday-9th-of-may-2019/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "hubbare-gwandu-guide",
    "title": "Hubbare Gwandu Guide: Kebbi Caliphate Heritage & Visitor Planning",
    "shortTitle": "Hubbare Gwandu",
    "kind": "destination",
    "region": "Kebbi State",
    "summary": "Visit Hubbare in Gwandu as a focused caliphate-history and memorial stop with respectful access and local interpretation.",
    "intro": [
      "Hubbare, associated with Abdullahi dan Fodio, gives Gwandu a distinct historical and religious heritage intent within Kebbi State.",
      "The site should be approached as a memorial and living cultural environment, not simply a roadside landmark."
    ],
    "bestFor": [
      "Islamic history",
      "Gwandu",
      "Caliphate heritage",
      "Culture"
    ],
    "highlights": [
      {
        "name": "Abdullahi dan Fodio heritage",
        "detail": "The site connects to one of the major figures in the Sokoto Caliphate's history."
      },
      {
        "name": "Gwandu context",
        "detail": "Local interpretation helps place the memorial within the emirate's wider historical role."
      },
      {
        "name": "Respectful visit",
        "detail": "Religious and memorial etiquette should guide photography and behaviour."
      },
      {
        "name": "Kebbi circuit",
        "detail": "Argungu and Zuru are separate heritage directions for a longer trip."
      }
    ],
    "planning": [
      {
        "label": "Confirm current access",
        "detail": "Check the recognised visitor area before travelling."
      },
      {
        "label": "Dress respectfully",
        "detail": "Use modest clothing appropriate for a religious memorial."
      },
      {
        "label": "Ask before photography",
        "detail": "Do not assume all areas permit cameras."
      },
      {
        "label": "Use local interpretation",
        "detail": "Context adds value and helps avoid inaccurate historical claims."
      }
    ],
    "source": {
      "label": "Kebbi State Government",
      "href": "https://kebbistate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ojukwu-bunker-guide",
    "title": "Ojukwu Bunker Umuahia Guide: Biafran History & Visitor Planning",
    "shortTitle": "Ojukwu Bunker",
    "kind": "destination",
    "region": "Abia State",
    "summary": "Plan an Ojukwu Bunker visit as a focused Umuahia modern-history stop, with current rehabilitation and access status checked before travelling.",
    "intro": [
      "Ojukwu Bunker is one of Umuahia's most important Biafran-war heritage sites and supports a distinct history search intent separate from the National War Museum.",
      "Federal preservation work has been active in 2026, so the first planning step is confirming what is open and how the site is currently interpreted."
    ],
    "bestFor": [
      "Modern history",
      "Biafran history",
      "Umuahia",
      "Heritage"
    ],
    "highlights": [
      {
        "name": "Historic bunker",
        "detail": "The site provides direct physical context for the Biafran period and wartime administration."
      },
      {
        "name": "War Museum connection",
        "detail": "The National War Museum is the natural companion stop for a fuller history day."
      },
      {
        "name": "Preservation work",
        "detail": "Current rehabilitation can improve interpretation while also changing access."
      },
      {
        "name": "Sensitive history",
        "detail": "Use careful, evidence-based interpretation rather than sensational storytelling."
      }
    ],
    "planning": [
      {
        "label": "Confirm access first",
        "detail": "Check the current rehabilitation and opening status before travelling."
      },
      {
        "label": "Use credible interpretation",
        "detail": "Prefer museum, federal or scholarly context for contested historical details."
      },
      {
        "label": "Allow time to read",
        "detail": "This is a history-heavy visit and benefits from a slower pace."
      },
      {
        "label": "Keep distant Abia sites separate",
        "detail": "Arochukwu deserves its own road-trip day."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Abia heritage restoration",
      "href": "https://fmino.gov.ng/federal-governments-war-museum-and-ojukwu-bunker-get-major-historical-preservation-boost-in-abia/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "national-museum-unity-ibadan-guide",
    "title": "National Museum of Unity Ibadan Guide: History & Visitor Planning",
    "shortTitle": "National Museum of Unity Ibadan",
    "kind": "destination",
    "region": "Oyo State",
    "summary": "Use Ibadan's National Museum of Unity as a focused history-and-culture stop with current opening and photography rules checked before arrival.",
    "intro": [
      "The National Museum of Unity adds a dedicated museum intent to Ibadan's broader park and viewpoint attractions.",
      "Plan it as a slower interpretive stop rather than a quick add-on, and confirm current hours before travelling."
    ],
    "bestFor": [
      "Museums",
      "History",
      "Culture",
      "Ibadan"
    ],
    "highlights": [
      {
        "name": "National collections",
        "detail": "The museum provides a broader Nigerian historical and cultural frame beyond one city or ethnic tradition."
      },
      {
        "name": "Indoor cultural block",
        "detail": "It works well when weather makes a park or hill stop less attractive."
      },
      {
        "name": "Ibadan pairing",
        "detail": "Agodi Gardens or Bower's Tower can form separate outdoor blocks on the same weekend."
      },
      {
        "name": "Interpretation",
        "detail": "Reading labels and asking questions adds more value than rushing through display rooms."
      }
    ],
    "planning": [
      {
        "label": "Confirm opening",
        "detail": "Check current public hours before travelling."
      },
      {
        "label": "Follow photography rules",
        "detail": "Ask before photographing collections or interiors."
      },
      {
        "label": "Allow enough time",
        "detail": "Avoid squeezing the museum between long cross-city journeys."
      },
      {
        "label": "Plan by area",
        "detail": "Ibadan's size makes route order important."
      }
    ],
    "source": {
      "label": "Oyo State investment tourism material",
      "href": "https://oysipa.oyostate.gov.ng/admin/uploads/INVEST-IN-TOURISM.pdf"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nike-art-centre-osogbo-guide",
    "title": "Nike Art Centre Osogbo Guide: Yoruba Art & Workshop Visit",
    "shortTitle": "Nike Art Centre Osogbo",
    "kind": "destination",
    "region": "Osun State",
    "summary": "Plan a Nike Art Centre Osogbo visit around art, textile and cultural context, with current public access and workshop details checked first.",
    "intro": [
      "Osogbo's Nike Art Centre supports a distinct art-and-craft visitor intent beyond the Sacred Grove.",
      "Use the visit to understand artistic practice and local cultural production rather than treating the centre only as a souvenir stop."
    ],
    "bestFor": [
      "Art",
      "Textiles",
      "Culture",
      "Osogbo"
    ],
    "highlights": [
      {
        "name": "Art practice",
        "detail": "The centre connects visitors with Osogbo's strong contemporary and traditional art identity."
      },
      {
        "name": "Textile tradition",
        "detail": "Adire and other textile practices can add depth to the visit when demonstrations or works are available."
      },
      {
        "name": "Sacred Grove pairing",
        "detail": "The centre can complement a separate Osun-Osogbo heritage block."
      },
      {
        "name": "Artist context",
        "detail": "Ask about makers and techniques when viewing or buying work."
      }
    ],
    "planning": [
      {
        "label": "Confirm access",
        "detail": "Check current visitor hours before travelling."
      },
      {
        "label": "Ask before photographing",
        "detail": "Workshops and artists may have their own rules."
      },
      {
        "label": "Allow browsing time",
        "detail": "Do not rush a gallery or craft-centre visit."
      },
      {
        "label": "Handle purchases carefully",
        "detail": "Plan transport for fragile or textile pieces."
      }
    ],
    "source": {
      "label": "Osun State Government — Tourist Centres",
      "href": "https://www.osunstate.gov.ng/tourist-centres/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "moremi-statue-ile-ife-guide",
    "title": "Moremi Statue Ile-Ife Guide: Yoruba Heritage & Visitor Planning",
    "shortTitle": "Moremi Statue Ile-Ife",
    "kind": "destination",
    "region": "Osun State",
    "summary": "Visit the Moremi monument as part of a focused Ile-Ife heritage route, with royal and cultural context rather than as an isolated photo stop.",
    "intro": [
      "The Moremi monument is a major visual landmark in Ile-Ife and supports a distinct heritage search intent tied to one of Yoruba history's best-known figures.",
      "Pair it with museum or palace context so the visit is more than a monument photograph."
    ],
    "bestFor": [
      "Yoruba heritage",
      "Monuments",
      "History",
      "Ile-Ife"
    ],
    "highlights": [
      {
        "name": "Moremi legacy",
        "detail": "The monument represents a major figure in Ile-Ife's historical tradition."
      },
      {
        "name": "City heritage setting",
        "detail": "The surrounding city contains palace and museum sites that deepen the story."
      },
      {
        "name": "Public landmark",
        "detail": "The monument can work as a compact stop within a larger heritage day."
      },
      {
        "name": "Interpretive value",
        "detail": "Use careful historical and cultural context rather than repeating unverified legends as fact."
      }
    ],
    "planning": [
      {
        "label": "Visit in daylight",
        "detail": "The monument and surrounding area are easier to navigate and photograph during the day."
      },
      {
        "label": "Respect nearby cultural spaces",
        "detail": "Follow local instructions around royal or sacred areas."
      },
      {
        "label": "Use credible context",
        "detail": "Distinguish tradition, oral history and documented history where relevant."
      },
      {
        "label": "Cluster Ile-Ife stops",
        "detail": "Keep the museum and palace within the same city block where practical."
      }
    ],
    "source": {
      "label": "Osun State Government — Tourist Centres",
      "href": "https://www.osunstate.gov.ng/tourist-centres/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "national-museum-ile-ife-guide",
    "title": "National Museum Ile-Ife Guide: Yoruba Art & History Visit",
    "shortTitle": "National Museum Ile-Ife",
    "kind": "destination",
    "region": "Osun State",
    "summary": "Use the National Museum Ile-Ife as a focused Yoruba art-and-history stop, with current opening and collection-access details checked before arrival.",
    "intro": [
      "Ile-Ife's National Museum offers a distinct museum intent within one of Nigeria's most important cultural cities.",
      "Use the museum for context before or after palace and monument visits, especially if you want a deeper historical frame than outdoor landmarks alone."
    ],
    "bestFor": [
      "Museums",
      "Yoruba art",
      "History",
      "Ile-Ife"
    ],
    "highlights": [
      {
        "name": "Museum context",
        "detail": "Collections help frame the city's artistic and historical significance."
      },
      {
        "name": "Indoor heritage stop",
        "detail": "The museum gives a weather-resistant cultural block during an Ile-Ife visit."
      },
      {
        "name": "Palace pairing",
        "detail": "The Ooni's Palace area can complement the museum when current public access allows."
      },
      {
        "name": "Moremi connection",
        "detail": "The monument and museum together create a broader heritage story."
      }
    ],
    "planning": [
      {
        "label": "Confirm current opening",
        "detail": "Check public hours before travelling."
      },
      {
        "label": "Follow photography rules",
        "detail": "Ask before photographing collections."
      },
      {
        "label": "Allow interpretation time",
        "detail": "Read labels and use available guides rather than rushing through."
      },
      {
        "label": "Respect museum rules",
        "detail": "Do not touch or handle collection objects."
      }
    ],
    "source": {
      "label": "Osun State Government — Tourist Centres",
      "href": "https://www.osunstate.gov.ng/tourist-centres/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "akure-forest-reserve-guide",
    "title": "Akure Forest Reserve Guide: Ondo Nature & Access Planning",
    "shortTitle": "Akure Forest Reserve",
    "kind": "destination",
    "region": "Ondo State",
    "summary": "Plan an Akure Forest Reserve outing with current access, local-route, weather and conservation checks before travelling.",
    "intro": [
      "Akure Forest Reserve adds a distinct forest-and-conservation intent to Ondo State's better-known hill and coastal attractions.",
      "Treat it as managed natural land rather than an unrestricted picnic space and confirm current public access before departure."
    ],
    "bestFor": [
      "Forest",
      "Nature",
      "Birding",
      "Conservation"
    ],
    "highlights": [
      {
        "name": "Forest landscape",
        "detail": "The reserve's vegetation and natural setting are the main draw."
      },
      {
        "name": "Wildlife potential",
        "detail": "Observe quietly and never plan around guaranteed sightings."
      },
      {
        "name": "Akure proximity",
        "detail": "The reserve can fit an Akure-based trip more easily than distant coastal sites."
      },
      {
        "name": "Conservation value",
        "detail": "Stay on recognised routes and avoid removing plants or disturbing habitat."
      }
    ],
    "planning": [
      {
        "label": "Confirm public access",
        "detail": "Check whether visitors need advance permission or a guide."
      },
      {
        "label": "Prepare for forest conditions",
        "detail": "Use suitable footwear, water and insect protection."
      },
      {
        "label": "Watch rain",
        "detail": "Wet weather can change unpaved approaches and trail comfort."
      },
      {
        "label": "Leave no trace",
        "detail": "Carry waste out and avoid disturbing wildlife."
      }
    ],
    "source": {
      "label": "Ondo State tourism information",
      "href": "https://ondostate.gov.ng/tourism"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "fajuyi-memorial-park-guide",
    "title": "Fajuyi Memorial Park Guide: Ado-Ekiti History & City Visit",
    "shortTitle": "Fajuyi Memorial Park",
    "kind": "destination",
    "region": "Ekiti State",
    "summary": "Use Fajuyi Memorial Park as a focused Ado-Ekiti history and green-space stop with current access checked before arrival.",
    "intro": [
      "Fajuyi Memorial Park gives Ado-Ekiti a distinct civic-history destination beyond the state's warm springs and waterfalls.",
      "The park works best as a city-based heritage stop before or after longer rural nature trips."
    ],
    "bestFor": [
      "History",
      "Parks",
      "Ado-Ekiti",
      "Short visits"
    ],
    "highlights": [
      {
        "name": "Memorial context",
        "detail": "The park is associated with Adekunle Fajuyi and offers a civic-history frame for the city."
      },
      {
        "name": "Urban green space",
        "detail": "It can provide a slower stop within Ado-Ekiti."
      },
      {
        "name": "Nature-trip gateway",
        "detail": "Use the city as a base before separate Ikogosi or Arinta outings."
      },
      {
        "name": "Flexible duration",
        "detail": "The park can fit into a short city block without taking over the day."
      }
    ],
    "planning": [
      {
        "label": "Confirm current access",
        "detail": "Check park opening or maintenance status."
      },
      {
        "label": "Use daylight",
        "detail": "Visit while paths and memorial areas are easy to navigate."
      },
      {
        "label": "Respect memorial spaces",
        "detail": "Avoid disruptive behaviour around commemorative areas."
      },
      {
        "label": "Keep rural trips separate",
        "detail": "Do not underestimate road time to Ikogosi or Arinta."
      }
    ],
    "source": {
      "label": "Ekiti State Facts & Figures",
      "href": "https://www.ekitistate.gov.ng/wp-content/uploads/2023/FACTS_FIGURES_2023.pdf"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "kwara-flower-garden-guide",
    "title": "Kwara Flower Garden Guide: Ilorin Park & Relaxed Visit Planning",
    "shortTitle": "Kwara Flower Garden",
    "kind": "destination",
    "region": "Kwara State",
    "summary": "Plan a Kwara Flower Garden visit as a light Ilorin green-space stop, with current public access and weather checked beforehand.",
    "intro": [
      "The Flower Garden offers a relaxed urban nature intent inside Ilorin and complements the city's religious and cultural landmarks.",
      "Use it as a flexible park block rather than expecting a large attraction complex."
    ],
    "bestFor": [
      "Parks",
      "Relaxed outings",
      "Ilorin",
      "Families"
    ],
    "highlights": [
      {
        "name": "Green space",
        "detail": "The garden provides a simple outdoor break inside the city."
      },
      {
        "name": "Ilorin pairing",
        "detail": "It can fit naturally with the Central Mosque or a meal on the same day."
      },
      {
        "name": "Flexible stop",
        "detail": "The visit can be shortened or extended depending on weather and schedule."
      },
      {
        "name": "Urban contrast",
        "detail": "It offers a different pace from a longer Owu Falls road trip."
      }
    ],
    "planning": [
      {
        "label": "Check current access",
        "detail": "Confirm the garden is open before travelling specifically for it."
      },
      {
        "label": "Use cooler hours",
        "detail": "Morning or late afternoon can be more comfortable."
      },
      {
        "label": "Watch rain",
        "detail": "Outdoor plans may need to change quickly."
      },
      {
        "label": "Keep Owu Falls separate",
        "detail": "The waterfall is a rural road trip, not an inner-city add-on."
      }
    ],
    "source": {
      "label": "Kwara State tourism information",
      "href": "https://kwarastate.gov.ng/do-business/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "akwa-ibom-arts-culture-centre-guide",
    "title": "Akwa Ibom State Centre for Arts & Culture Guide",
    "shortTitle": "Akwa Ibom Arts & Culture Centre",
    "kind": "destination",
    "region": "Akwa Ibom State",
    "summary": "Use Uyo's State Centre for Arts and Culture as a focused performing-arts and cultural stop, checking current programmes and public access first.",
    "intro": [
      "The State Centre for Arts and Culture gives Uyo a programme-driven cultural destination distinct from museums or leisure complexes.",
      "Because the experience depends heavily on current exhibitions, performances and public events, confirm the programme before travelling."
    ],
    "bestFor": [
      "Performing arts",
      "Culture",
      "Uyo",
      "Events"
    ],
    "highlights": [
      {
        "name": "Cultural programmes",
        "detail": "The centre's strongest value comes when public performances, rehearsals or exhibitions are active."
      },
      {
        "name": "State arts identity",
        "detail": "The venue can add context to Akwa Ibom's dance, music and visual culture."
      },
      {
        "name": "Museum pairing",
        "detail": "Ibom Unity Museum can complement the centre in the same city weekend."
      },
      {
        "name": "Programme-dependent visit",
        "detail": "The same venue can offer very different experiences from one date to another."
      }
    ],
    "planning": [
      {
        "label": "Check the programme",
        "detail": "Confirm current public events before travelling."
      },
      {
        "label": "Ask about tickets",
        "detail": "Performance or event access may differ from general venue access."
      },
      {
        "label": "Follow photography rules",
        "detail": "Performers and exhibitions may restrict cameras."
      },
      {
        "label": "Keep coastal trips separate",
        "detail": "Do not combine Uyo culture with a rushed Ibeno trip unless you have enough time."
      }
    ],
    "source": {
      "label": "Akwa Ibom State Government tourism update",
      "href": "https://akwaibomstate.gov.ng/a-r-i-s-e-agenda-gov-umo-eno-tours-tourism-sites-vows-to-revamp-akwa-ibom-tourism-sector/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ibom-tropicana-guide",
    "title": "Ibom Tropicana Guide: Uyo Leisure & Visitor Planning",
    "shortTitle": "Ibom Tropicana",
    "kind": "destination",
    "region": "Akwa Ibom State",
    "summary": "Plan an Ibom Tropicana visit around whichever leisure facilities are currently operating, rather than assuming the entire complex has one opening status.",
    "intro": [
      "Ibom Tropicana is a major Uyo leisure complex, but large multi-use venues can have individual facilities operating on different schedules.",
      "Use it as a flexible entertainment block and confirm the exact activity you want before travelling."
    ],
    "bestFor": [
      "Leisure",
      "Entertainment",
      "Families",
      "Uyo"
    ],
    "highlights": [
      {
        "name": "Multi-use complex",
        "detail": "Different parts of the site can offer different entertainment or leisure experiences."
      },
      {
        "name": "Evening option",
        "detail": "It can work as a relaxed city block after museums or cultural visits."
      },
      {
        "name": "Family potential",
        "detail": "Suitability depends on which facilities are currently active."
      },
      {
        "name": "City-based alternative",
        "detail": "It offers a non-road-trip option when weather or time makes coastal travel unattractive."
      }
    ],
    "planning": [
      {
        "label": "Check the exact facility",
        "detail": "Do not assume every part of the complex is open."
      },
      {
        "label": "Confirm ticketing",
        "detail": "Prices and access may differ by activity."
      },
      {
        "label": "Plan transport home",
        "detail": "Arrange a reliable return option if staying late."
      },
      {
        "label": "Keep plans flexible",
        "detail": "Large leisure sites can change operations without the whole complex closing."
      }
    ],
    "source": {
      "label": "Akwa Ibom State Government tourism update",
      "href": "https://akwaibomstate.gov.ng/a-r-i-s-e-agenda-gov-umo-eno-tours-tourism-sites-vows-to-revamp-akwa-ibom-tourism-sector/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "igbokoda-waterfront-guide",
    "title": "Igbokoda Waterfront Guide: Ondo Riverine Trip & Safety Planning",
    "shortTitle": "Igbokoda Waterfront",
    "kind": "destination",
    "region": "Ondo State",
    "summary": "Use Igbokoda Waterfront as an Ondo riverine landscape stop with current boat, weather and return-transport checks before any water activity.",
    "intro": [
      "Igbokoda gives Ondo State a distinct riverine travel intent separate from Araromi's Atlantic coast and Idanre's hills.",
      "The waterfront can be meaningful without boarding a boat; if you do use one, safety equipment and operator quality should decide the plan."
    ],
    "bestFor": [
      "Waterfront",
      "Riverine culture",
      "Photography",
      "Road trips"
    ],
    "highlights": [
      {
        "name": "Riverine landscape",
        "detail": "The water and community setting are the main attraction."
      },
      {
        "name": "Ilaje context",
        "detail": "The trip gives a different perspective on Ondo's coastal and river economy."
      },
      {
        "name": "Boat option",
        "detail": "Use only an operator with clear safety arrangements and a defined return point."
      },
      {
        "name": "Coastal extension",
        "detail": "Araromi Seaside is a separate coastal destination rather than an automatic same-day stop."
      }
    ],
    "planning": [
      {
        "label": "Check weather and water",
        "detail": "Conditions should determine whether boating is appropriate."
      },
      {
        "label": "Verify life jackets",
        "detail": "Do not board without suitable safety equipment."
      },
      {
        "label": "Agree the return",
        "detail": "Know where and when the boat or vehicle will bring you back."
      },
      {
        "label": "Use daylight",
        "detail": "Keep river and road movement within a conservative daylight window."
      }
    ],
    "source": {
      "label": "Ondo State tourism information",
      "href": "https://ondostate.gov.ng/tourism"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "royal-niger-akassa-guide",
    "title": "Royal Niger Company Akassa Guide: Bayelsa Colonial Heritage",
    "shortTitle": "Royal Niger Company Akassa",
    "kind": "destination",
    "region": "Bayelsa State",
    "summary": "Plan an Akassa heritage visit around the Royal Niger Company history with current riverine access and local guidance checked before departure.",
    "intro": [
      "Akassa's Royal Niger Company heritage offers a distinct trade-and-colonial-history intent within Bayelsa's riverine landscape.",
      "Because reaching Akassa can involve more complex transport than a city stop, access planning is central to the trip."
    ],
    "bestFor": [
      "Colonial history",
      "Niger Delta heritage",
      "Riverine trips",
      "Bayelsa"
    ],
    "highlights": [
      {
        "name": "Trading-history context",
        "detail": "The site links to the commercial and colonial history of the Niger Delta."
      },
      {
        "name": "Akassa setting",
        "detail": "The riverine environment is part of the experience and affects how visitors travel."
      },
      {
        "name": "Bayelsa heritage circuit",
        "detail": "Oloibiri provides a different industrial-history story for a longer state trip."
      },
      {
        "name": "Community context",
        "detail": "Use local interpretation rather than viewing the site as an isolated relic."
      }
    ],
    "planning": [
      {
        "label": "Confirm riverine access",
        "detail": "Check the current transport route before leaving Yenagoa or another base."
      },
      {
        "label": "Use a reliable operator",
        "detail": "If water travel is required, verify boat condition and safety equipment."
      },
      {
        "label": "Travel in daylight",
        "detail": "Keep conservative timing for river and road movement."
      },
      {
        "label": "Respect community spaces",
        "detail": "Ask before photographing residents or private property."
      }
    ],
    "source": {
      "label": "Bayelsa Ministry of Tourism Development",
      "href": "https://motd.bayelsastate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ox-bow-lake-yenagoa-guide",
    "title": "Ox-Bow Lake Yenagoa Guide: Waterfront Leisure & Safety",
    "shortTitle": "Ox-Bow Lake Yenagoa",
    "kind": "destination",
    "region": "Bayelsa State",
    "summary": "Use Yenagoa's Ox-Bow Lake as a relaxed waterfront stop, with live checks for facilities, boats and weather before any water activity.",
    "intro": [
      "Ox-Bow Lake gives Yenagoa an accessible water-focused leisure intent without requiring a long riverine trip into remote Bayelsa.",
      "The simplest visit is the waterfront itself; treat boat or recreation activities as optional and operator-dependent."
    ],
    "bestFor": [
      "Lakes",
      "Waterfront",
      "Yenagoa",
      "Relaxed outings"
    ],
    "highlights": [
      {
        "name": "Urban lake",
        "detail": "The water setting provides a slower contrast to city movement."
      },
      {
        "name": "Leisure potential",
        "detail": "Current facilities can vary, so check what is actually operating."
      },
      {
        "name": "Yenagoa base",
        "detail": "The location can fit easily into a capital-city stay."
      },
      {
        "name": "Bayelsa contrast",
        "detail": "Oloibiri and Akassa offer separate heritage trips requiring more travel."
      }
    ],
    "planning": [
      {
        "label": "Confirm current facilities",
        "detail": "Do not rely on old leisure listings."
      },
      {
        "label": "Check life jackets",
        "detail": "Use suitable safety equipment for any boat trip."
      },
      {
        "label": "Watch weather",
        "detail": "Storms and wind should override a water plan."
      },
      {
        "label": "Plan the return",
        "detail": "Arrange reliable transport if staying into the evening."
      }
    ],
    "source": {
      "label": "Bayelsa Ministry of Tourism Development",
      "href": "https://motd.bayelsastate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "enemabia-warm-spring-guide",
    "title": "Enemabia Warm Spring Guide: Benue Nature & Access Planning",
    "shortTitle": "Enemabia Warm Spring",
    "kind": "destination",
    "region": "Benue State",
    "summary": "Plan Enemabia Warm Spring as a focused Benue nature trip with current local access, water-condition and daylight checks.",
    "intro": [
      "Enemabia Warm Spring adds a distinct water-and-nature destination to Benue beyond the River Benue and Ushongo Hills.",
      "Treat the spring as a natural site with current local rules rather than assuming swimming or facilities are always available."
    ],
    "bestFor": [
      "Warm springs",
      "Nature",
      "Road trips",
      "Benue"
    ],
    "highlights": [
      {
        "name": "Natural spring",
        "detail": "The spring itself is the central attraction and should be approached with water-safety awareness."
      },
      {
        "name": "Otukpo-area trip",
        "detail": "The location creates a different route from Makurdi-based sightseeing."
      },
      {
        "name": "Slow nature stop",
        "detail": "The site works best as one dedicated block rather than a rushed multi-stop circuit."
      },
      {
        "name": "Benue variety",
        "detail": "Hills, river and spring experiences can form separate days in a longer state trip."
      }
    ],
    "planning": [
      {
        "label": "Confirm local access",
        "detail": "Check current directions and visitor arrangements."
      },
      {
        "label": "Do not assume swimming safety",
        "detail": "Only enter water when current local guidance supports it."
      },
      {
        "label": "Travel in daylight",
        "detail": "Protect enough road time for the return."
      },
      {
        "label": "Carry essentials",
        "detail": "Do not assume full visitor services are available."
      }
    ],
    "source": {
      "label": "Benue State Department of Tourism",
      "href": "https://bact.benuestate.gov.ng/departments/department-of-tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "chad-basin-national-park-borno-guide",
    "title": "Chad Basin National Park Borno Guide: Access & Conservation Planning",
    "shortTitle": "Chad Basin National Park Borno",
    "kind": "destination",
    "region": "Borno State",
    "summary": "Treat the Borno sector of Chad Basin National Park as a conservation destination that requires current official access and security clearance before any trip.",
    "intro": [
      "Chad Basin National Park represents an important protected landscape in northeastern Nigeria, but current conditions must determine whether tourism is appropriate at all.",
      "A static destination page must never be treated as permission to travel. Verify current park access and security from official and trusted local sources close to departure."
    ],
    "bestFor": [
      "Conservation",
      "Sahel ecology",
      "Protected areas",
      "Research-minded travel"
    ],
    "highlights": [
      {
        "name": "Protected landscape",
        "detail": "The park's value is ecological and conservation-led rather than built tourism infrastructure."
      },
      {
        "name": "Sahel and wetland context",
        "detail": "The wider region has significant dryland and wetland ecological importance."
      },
      {
        "name": "Wildlife is unpredictable",
        "detail": "Never plan around a guaranteed sighting."
      },
      {
        "name": "Security-led planning",
        "detail": "Current conditions may make a visit inappropriate regardless of tourism interest."
      }
    ],
    "planning": [
      {
        "label": "Check security first",
        "detail": "Do not travel without current official and trusted local guidance."
      },
      {
        "label": "Confirm park access",
        "detail": "Ask whether visitors are currently permitted and under what arrangements."
      },
      {
        "label": "Use authorised guides",
        "detail": "Stay within recognised protected-area routes."
      },
      {
        "label": "Be willing to cancel",
        "detail": "If conditions are uncertain, choose another destination."
      }
    ],
    "source": {
      "label": "Borno State Government — About Borno",
      "href": "https://bornostate.gov.ng/about"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "lake-chad-borno-guide",
    "title": "Lake Chad Borno Guide: Landscape, Access & Security Planning",
    "shortTitle": "Lake Chad Borno",
    "kind": "destination",
    "region": "Borno State",
    "summary": "Approach Lake Chad from the Borno side only when current security and local-access conditions make travel appropriate.",
    "intro": [
      "Lake Chad is a major geographic and ecological landmark, but a visitor guide must put current security and access ahead of tourism ambition.",
      "Use the page for geography and trip-planning context, not as encouragement to enter areas that current authorities or trusted local sources advise against."
    ],
    "bestFor": [
      "Geography",
      "Wetlands",
      "Landscape",
      "Research-minded travel"
    ],
    "highlights": [
      {
        "name": "Major lake system",
        "detail": "Lake Chad is one of West and Central Africa's defining shared water landscapes."
      },
      {
        "name": "Borderland context",
        "detail": "Its location adds complexity to access, security and transport."
      },
      {
        "name": "Ecological importance",
        "detail": "The wider basin supports wetland, fishing and migratory-bird systems."
      },
      {
        "name": "Condition-dependent travel",
        "detail": "The correct plan may be not to travel if current conditions are poor."
      }
    ],
    "planning": [
      {
        "label": "Check security first",
        "detail": "Use current official and trusted local advice for the exact route."
      },
      {
        "label": "Confirm legal access",
        "detail": "Border and protected-area rules may affect where visitors can go."
      },
      {
        "label": "Avoid independent exploration",
        "detail": "Do not improvise routes in remote or border areas."
      },
      {
        "label": "Be willing to cancel",
        "detail": "Safety overrides the itinerary."
      }
    ],
    "source": {
      "label": "Borno State Government — About Borno",
      "href": "https://bornostate.gov.ng/about"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "mandara-plateau-borno-guide",
    "title": "Mandara Plateau Borno Guide: Landscape & Security-First Planning",
    "shortTitle": "Mandara Plateau Borno",
    "kind": "destination",
    "region": "Borno State",
    "summary": "Use the Mandara Plateau page for landscape context and only plan travel when current route, border and security conditions are explicitly suitable.",
    "intro": [
      "The Mandara Plateau is a dramatic cross-border highland landscape in northeastern Nigeria and Cameroon, but travel planning here must be condition-led.",
      "Do not infer safety from an evergreen tourism description. Current official and trusted local guidance should decide whether a trip is appropriate."
    ],
    "bestFor": [
      "Highlands",
      "Geography",
      "Landscape",
      "Research-minded travel"
    ],
    "highlights": [
      {
        "name": "Highland landscape",
        "detail": "The plateau offers a distinct mountainous contrast to surrounding Sahel terrain."
      },
      {
        "name": "Border context",
        "detail": "Cross-border geography makes legal access and security planning essential."
      },
      {
        "name": "Cultural landscape",
        "detail": "Communities across the highlands have long historical and cultural ties to the terrain."
      },
      {
        "name": "Safety-first decision",
        "detail": "The correct outcome may be to postpone travel when conditions are uncertain."
      }
    ],
    "planning": [
      {
        "label": "Check current security",
        "detail": "Use up-to-date official and trusted local guidance."
      },
      {
        "label": "Confirm border rules",
        "detail": "Do not approach border areas without understanding current restrictions."
      },
      {
        "label": "Avoid independent routes",
        "detail": "Use recognised local arrangements if travel is appropriate."
      },
      {
        "label": "Cancel when uncertain",
        "detail": "Do not force a highland itinerary into unsafe conditions."
      }
    ],
    "source": {
      "label": "Borno State Government — About Borno",
      "href": "https://bornostate.gov.ng/about"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "amanchor-cave-guide",
    "title": "Amanchor Cave Ebonyi Guide: Access, Footwear & Nature Planning",
    "shortTitle": "Amanchor Cave",
    "kind": "destination",
    "region": "Ebonyi State",
    "summary": "Plan Amanchor Cave as a dedicated Ebonyi nature trip with local guidance, proper footwear and daylight checks.",
    "intro": [
      "Amanchor Cave adds a distinct cave-and-geology intent to Ebonyi's nature inventory beyond salt heritage and river beaches.",
      "Use local guidance and avoid entering unfamiliar cave sections independently."
    ],
    "bestFor": [
      "Caves",
      "Geology",
      "Adventure",
      "Ebonyi"
    ],
    "highlights": [
      {
        "name": "Cave landscape",
        "detail": "The cave system is the main reason to visit and requires careful movement."
      },
      {
        "name": "Rural setting",
        "detail": "The approach may require local directions rather than relying only on a map pin."
      },
      {
        "name": "Ebonyi nature variety",
        "detail": "Okposi and Oferekpe offer separate spring/salt and beach experiences."
      },
      {
        "name": "Low-infrastructure trip",
        "detail": "Prepare for a natural site rather than a heavily serviced attraction."
      }
    ],
    "planning": [
      {
        "label": "Use local guidance",
        "detail": "Confirm the recognised visitor route."
      },
      {
        "label": "Wear grip-friendly shoes",
        "detail": "Cave surfaces can be uneven or wet."
      },
      {
        "label": "Carry a light",
        "detail": "Do not rely only on a phone torch."
      },
      {
        "label": "Return before dark",
        "detail": "Keep daylight for the rural road journey."
      }
    ],
    "source": {
      "label": "Ebonyi State Government — Discover Ebonyi",
      "href": "https://ebonyistate.gov.ng/discover"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "oferekpe-beach-guide",
    "title": "Oferekpe Beach Ebonyi Guide: River Beach & Safety Planning",
    "shortTitle": "Oferekpe Beach",
    "kind": "destination",
    "region": "Ebonyi State",
    "summary": "Use Oferekpe Beach as a focused inland-beach nature trip with current water, local-access and weather checks.",
    "intro": [
      "Oferekpe Beach gives Ebonyi a distinct river-beach travel intent that differs from the state's cave and salt-heritage destinations.",
      "Treat water conditions as dynamic and avoid assuming swimming is safe because a site is described as a beach."
    ],
    "bestFor": [
      "River beaches",
      "Nature",
      "Photography",
      "Ebonyi road trips"
    ],
    "highlights": [
      {
        "name": "Inland beach setting",
        "detail": "The shoreline and water landscape are the main experience."
      },
      {
        "name": "Rural outing",
        "detail": "The site works best as a dedicated nature block."
      },
      {
        "name": "Ebonyi contrast",
        "detail": "Amanchor Cave and Okposi offer different geological and cultural experiences."
      },
      {
        "name": "Weather-sensitive",
        "detail": "Rain and water levels can change the character of the site."
      }
    ],
    "planning": [
      {
        "label": "Check water conditions",
        "detail": "Do not enter water unless current conditions are clearly suitable."
      },
      {
        "label": "Confirm local access",
        "detail": "Use current directions for the final approach."
      },
      {
        "label": "Travel in daylight",
        "detail": "Build a conservative return margin."
      },
      {
        "label": "Protect valuables",
        "detail": "Use a water-resistant plan for electronics and documents."
      }
    ],
    "source": {
      "label": "Ebonyi State Government — Discover Ebonyi",
      "href": "https://ebonyistate.gov.ng/discover"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nafada-riverside-guide",
    "title": "Nafada Riverside Guide: Gombe Nature & Road Trip Planning",
    "shortTitle": "Nafada Riverside",
    "kind": "destination",
    "region": "Gombe State",
    "summary": "Plan a Nafada riverside outing with current road, water-condition and daylight checks before leaving Gombe's main urban centres.",
    "intro": [
      "Nafada's riverside landscape gives northern Gombe a distinct water-and-rural nature intent beyond Dadin Kowa or Kaltungo Hills.",
      "Treat the visit as a low-infrastructure landscape trip and use current local guidance for the final approach."
    ],
    "bestFor": [
      "Rivers",
      "Nature",
      "Road trips",
      "Photography"
    ],
    "highlights": [
      {
        "name": "Riverside landscape",
        "detail": "The water and surrounding rural scenery are the main attraction."
      },
      {
        "name": "Nafada setting",
        "detail": "The journey gives a different perspective on Gombe State beyond the capital."
      },
      {
        "name": "Slow nature trip",
        "detail": "The site works best as one dedicated block rather than a crowded itinerary."
      },
      {
        "name": "State contrast",
        "detail": "Kaltungo Hills and Dadin Kowa are separate route directions."
      }
    ],
    "planning": [
      {
        "label": "Check road conditions",
        "detail": "Weather and works can affect rural travel."
      },
      {
        "label": "Do not assume water safety",
        "detail": "Avoid entering water without current local guidance."
      },
      {
        "label": "Carry essentials",
        "detail": "Bring water, food margin and basic first-aid."
      },
      {
        "label": "Return before dark",
        "detail": "Keep a conservative daylight window."
      }
    ],
    "source": {
      "label": "Gombe State Government — Local Government Areas",
      "href": "https://gombestate.gov.ng/pages/lgas.php"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "okigwe-hills-guide",
    "title": "Okigwe Hills Guide: Imo Landscape & Road Trip Planning",
    "shortTitle": "Okigwe Hills",
    "kind": "destination",
    "region": "Imo State",
    "summary": "Plan Okigwe Hills as a dedicated Imo outdoor trip with current road, local-route and daylight checks.",
    "intro": [
      "Okigwe Hills adds a distinct highland and landscape intent to Imo beyond Oguta Lake and Owerri's cultural stops.",
      "Use recognised viewpoints and local guidance rather than treating unfamiliar slopes as unrestricted hiking terrain."
    ],
    "bestFor": [
      "Hills",
      "Landscape",
      "Photography",
      "Road trips"
    ],
    "highlights": [
      {
        "name": "Hill scenery",
        "detail": "The terrain and views are the main reason to visit."
      },
      {
        "name": "Okigwe setting",
        "detail": "The trip offers a different landscape experience from Owerri or Oguta."
      },
      {
        "name": "Outdoor block",
        "detail": "Plan water, footwear and weather around the visit."
      },
      {
        "name": "Imo variety",
        "detail": "Oguta Lake and Mbari Cultural Centre are separate nature and culture clusters."
      }
    ],
    "planning": [
      {
        "label": "Confirm local access",
        "detail": "Use current local directions and recognised viewpoints."
      },
      {
        "label": "Avoid unapproved climbing",
        "detail": "Do not improvise across unstable or private terrain."
      },
      {
        "label": "Carry water",
        "detail": "Do not assume visitor facilities on the hills."
      },
      {
        "label": "Use daylight",
        "detail": "Finish the outdoor section before visibility drops."
      }
    ],
    "source": {
      "label": "Imo State Investment Promotion Agency — About Imo",
      "href": "https://www.isipa.im.gov.ng/about-imo.html"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "birnin-kudu-heritage-guide",
    "title": "Birnin Kudu Heritage Guide: Jigawa History & Road Trip Planning",
    "shortTitle": "Birnin Kudu Heritage",
    "kind": "destination",
    "region": "Jigawa State",
    "summary": "Use Birnin Kudu as a focused Jigawa heritage trip with current site access, local interpretation and daylight road planning.",
    "intro": [
      "Birnin Kudu offers a distinct heritage intent outside Dutse's rock-and-city landmarks.",
      "Because heritage assets may be spread across a living town rather than one ticketed complex, local interpretation and route planning matter."
    ],
    "bestFor": [
      "History",
      "Jigawa heritage",
      "Road trips",
      "Culture"
    ],
    "highlights": [
      {
        "name": "Historic town context",
        "detail": "The area's value comes from its wider historical and cultural setting."
      },
      {
        "name": "Local interpretation",
        "detail": "A knowledgeable guide can connect separate sites into a coherent story."
      },
      {
        "name": "Dutse contrast",
        "detail": "Dutse's rock landscape and tower form a different city-based cluster."
      },
      {
        "name": "Slow heritage trip",
        "detail": "Allow time to understand places rather than racing between markers."
      }
    ],
    "planning": [
      {
        "label": "Confirm what is visitable",
        "detail": "Check the current recognised heritage stops before travelling."
      },
      {
        "label": "Ask before photography",
        "detail": "Respect residents and traditional spaces."
      },
      {
        "label": "Travel in daylight",
        "detail": "Keep a conservative return margin."
      },
      {
        "label": "Use local context",
        "detail": "Avoid repeating unsourced historical claims."
      }
    ],
    "source": {
      "label": "Jigawa State Government",
      "href": "https://jigawastate.gov.ng/index"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "emirs-palace-katsina-guide",
    "title": "Emir's Palace Katsina Guide: Royal Heritage & Visitor Etiquette",
    "shortTitle": "Emir's Palace Katsina",
    "kind": "destination",
    "region": "Katsina State",
    "summary": "Plan a respectful visit around the Emir's Palace area in Katsina with current public boundaries, dress and photography rules checked first.",
    "intro": [
      "The Emir's Palace is central to Katsina's traditional heritage and supports a distinct royal-history intent alongside Gobarau Minaret.",
      "It remains an active institution, so public access can change and should never be assumed from old travel accounts."
    ],
    "bestFor": [
      "Royal heritage",
      "History",
      "Architecture",
      "Katsina"
    ],
    "highlights": [
      {
        "name": "Traditional institution",
        "detail": "The palace remains part of living emirate governance and culture."
      },
      {
        "name": "Old-city connection",
        "detail": "Gobarau Minaret provides a strong companion heritage stop."
      },
      {
        "name": "Architectural context",
        "detail": "The palace area contributes to the historic character of Katsina city."
      },
      {
        "name": "Ceremonial activity",
        "detail": "Events can change access and visitor movement."
      }
    ],
    "planning": [
      {
        "label": "Confirm public access",
        "detail": "Check what visitors may currently see."
      },
      {
        "label": "Dress respectfully",
        "detail": "Use modest clothing appropriate for a formal traditional institution."
      },
      {
        "label": "Ask before photography",
        "detail": "Do not assume cameras are permitted."
      },
      {
        "label": "Follow local instructions",
        "detail": "Respect security and ceremonial boundaries."
      }
    ],
    "source": {
      "label": "Katsina State Ministry of Commerce, Industry and Tourism",
      "href": "https://mocit.kt.gov.ng/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "girmache-shrine-zuru-guide",
    "title": "Girmache Shrine Zuru Guide: Kebbi Cultural Heritage Planning",
    "shortTitle": "Girmache Shrine Zuru",
    "kind": "destination",
    "region": "Kebbi State",
    "summary": "Visit Girmache Shrine only with respectful local guidance, current access and cultural rules clearly understood.",
    "intro": [
      "Girmache Shrine gives Zuru a distinct cultural-heritage intent within Kebbi State, separate from Argungu's museum or Gwandu's Islamic heritage.",
      "Because shrine sites can remain spiritually significant, local permission and etiquette matter more than casual sightseeing."
    ],
    "bestFor": [
      "Cultural heritage",
      "Zuru",
      "Tradition",
      "History"
    ],
    "highlights": [
      {
        "name": "Living cultural site",
        "detail": "The shrine should be approached as a place of continuing cultural significance."
      },
      {
        "name": "Zuru context",
        "detail": "Local interpretation is essential to understanding the site's meaning."
      },
      {
        "name": "Kebbi diversity",
        "detail": "Argungu and Gwandu represent different museum and caliphate-history traditions."
      },
      {
        "name": "Respectful access",
        "detail": "Not every area or ritual context is necessarily open to visitors."
      }
    ],
    "planning": [
      {
        "label": "Arrange local guidance",
        "detail": "Do not arrive assuming unrestricted access."
      },
      {
        "label": "Ask before photography",
        "detail": "Follow cultural rules around people and sacred spaces."
      },
      {
        "label": "Dress respectfully",
        "detail": "Use clothing appropriate for a traditional site."
      },
      {
        "label": "Accept restrictions",
        "detail": "If custodians say an area is closed, do not push for entry."
      }
    ],
    "source": {
      "label": "Kebbi State Government",
      "href": "https://kebbistate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "lokoja-colonial-heritage-guide",
    "title": "Lokoja Colonial Heritage Guide: Historic Sites & City Planning",
    "shortTitle": "Lokoja Colonial Heritage",
    "kind": "destination",
    "region": "Kogi State",
    "summary": "Use Lokoja's colonial heritage area as a focused history route tied to the city's river geography and early administrative role.",
    "intro": [
      "Lokoja's colonial-era heritage adds a distinct historical intent beyond Mount Patti and the Niger–Benue confluence.",
      "A useful visit connects buildings, memorials and geography into one city story rather than treating each marker separately."
    ],
    "bestFor": [
      "Colonial history",
      "Architecture",
      "Lokoja",
      "Heritage"
    ],
    "highlights": [
      {
        "name": "Historic city role",
        "detail": "Lokoja's location helped make it important in early colonial administration and trade."
      },
      {
        "name": "Built heritage",
        "detail": "Surviving structures and memorials can be viewed as a connected city-history route."
      },
      {
        "name": "River context",
        "detail": "The confluence helps explain why the city became strategically important."
      },
      {
        "name": "Mount Patti connection",
        "detail": "The hill adds a geographic perspective to the same historical story."
      }
    ],
    "planning": [
      {
        "label": "Use local interpretation",
        "detail": "A guide can connect dispersed sites into a coherent route."
      },
      {
        "label": "Ask before entering buildings",
        "detail": "Not every historic structure is open to the public."
      },
      {
        "label": "Visit in daylight",
        "detail": "Older sites and city routes are easier to navigate during the day."
      },
      {
        "label": "Keep the route compact",
        "detail": "Focus on Lokoja rather than adding distant Kogi attractions."
      }
    ],
    "source": {
      "label": "Kogi State Government — About Kogi",
      "href": "https://kogistate.gov.ng/about-us/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "sokoto-history-bureau-guide",
    "title": "Sokoto State History Bureau Guide: Caliphate Records & Heritage",
    "shortTitle": "Sokoto State History Bureau",
    "kind": "destination",
    "region": "Sokoto State",
    "summary": "Use the Sokoto State History Bureau as a focused documentary-heritage stop for deeper context on the city and caliphate.",
    "intro": [
      "The State History Bureau provides a distinct research-and-history intent beyond palace-area sightseeing in Sokoto.",
      "Use it to deepen understanding of the city's institutions, documents and historical narratives, subject to current public access."
    ],
    "bestFor": [
      "History",
      "Archives",
      "Caliphate heritage",
      "Sokoto"
    ],
    "highlights": [
      {
        "name": "Documentary context",
        "detail": "The bureau can add depth beyond visible monuments and palace architecture."
      },
      {
        "name": "Sokoto history",
        "detail": "It supports a more evidence-based understanding of the city's political and religious development."
      },
      {
        "name": "Palace pairing",
        "detail": "The Sultan's Palace area can form the living-institution counterpart to documentary history."
      },
      {
        "name": "Research-minded visit",
        "detail": "The value may be strongest for visitors who want more than a quick landmark tour."
      }
    ],
    "planning": [
      {
        "label": "Confirm public access",
        "detail": "Check whether visitors or researchers can enter on your date."
      },
      {
        "label": "Ask about records",
        "detail": "Archive or document access may require separate permission."
      },
      {
        "label": "Follow handling rules",
        "detail": "Do not touch or photograph materials without permission."
      },
      {
        "label": "Plan weekday timing",
        "detail": "Administrative institutions may not operate like leisure attractions."
      }
    ],
    "source": {
      "label": "Sokoto State Government — History of Sokoto",
      "href": "https://sokotostate.gov.ng/history-of-sokoto/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "gorgaram-festival-guide",
    "title": "Gorgaram Fishing & Cultural Festival Guide: Yobe Event Planning",
    "shortTitle": "Gorgaram Festival",
    "kind": "event",
    "region": "Yobe State",
    "summary": "Use this guide to plan for the Gorgaram fishing and cultural festival only when current event dates, security and local access are officially confirmed.",
    "intro": [
      "Gorgaram is identified in Yobe's tourism material as a long-running fishing and cultural festival, giving the state a distinct event-based travel intent.",
      "Festival timing and security conditions can change, so never travel from an evergreen page alone. Confirm the current edition before making bookings."
    ],
    "bestFor": [
      "Festivals",
      "Fishing culture",
      "Yobe",
      "Traditional events"
    ],
    "highlights": [
      {
        "name": "Fishing tradition",
        "detail": "The festival centres on local fishing and community celebration."
      },
      {
        "name": "Cultural programme",
        "detail": "Traditional performances and community activity can form part of the event when scheduled."
      },
      {
        "name": "Jakusko setting",
        "detail": "The event is associated with Jakusko LGA and requires road planning beyond Damaturu."
      },
      {
        "name": "Condition-led attendance",
        "detail": "The festival should only be treated as visitable when current official and local advice supports travel."
      }
    ],
    "planning": [
      {
        "label": "Confirm the exact dates",
        "detail": "Do not assume the festival runs on the same dates every year."
      },
      {
        "label": "Check security first",
        "detail": "Use current official and trusted local guidance."
      },
      {
        "label": "Arrange accommodation early",
        "detail": "Local capacity can be limited around a major event."
      },
      {
        "label": "Travel in daylight",
        "detail": "Use conservative road timing."
      }
    ],
    "source": {
      "label": "Yobe Investment Promotion Agency — Culture and Tourism",
      "href": "https://yobeinvest.ng/culture-and-tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "zamfara-state-museum-guide",
    "title": "Zamfara State Museum Gusau Guide: Culture & Safe City Visit",
    "shortTitle": "Zamfara State Museum",
    "kind": "destination",
    "region": "Zamfara State",
    "summary": "Use the Zamfara State Museum in Gusau as a city-based cultural alternative when rural tourism routes are not appropriate.",
    "intro": [
      "Zamfara State Museum gives Gusau a focused cultural and heritage intent that can be planned without depending on remote travel.",
      "Because broader state security conditions can vary, a city-based museum visit may be the more appropriate option on some dates."
    ],
    "bestFor": [
      "Museums",
      "Culture",
      "Gusau",
      "History"
    ],
    "highlights": [
      {
        "name": "State heritage",
        "detail": "The museum provides a cultural frame for Zamfara's history and traditions."
      },
      {
        "name": "Gusau location",
        "detail": "A capital-city stop can be easier to assess than rural attractions."
      },
      {
        "name": "Alternative to remote travel",
        "detail": "Use the museum when current conditions make Kwatakashi or other out-of-city trips unsuitable."
      },
      {
        "name": "Cultural context",
        "detail": "The visit can add depth before any wider state itinerary."
      }
    ],
    "planning": [
      {
        "label": "Confirm museum opening",
        "detail": "Check current hours before travelling."
      },
      {
        "label": "Check city conditions",
        "detail": "Use current local guidance even for urban travel."
      },
      {
        "label": "Follow photography rules",
        "detail": "Ask before photographing exhibits."
      },
      {
        "label": "Do not force rural extensions",
        "detail": "Skip out-of-city attractions when conditions are uncertain."
      }
    ],
    "source": {
      "label": "Zamfara State Ministry of Commerce, Industry and Tourism",
      "href": "https://mocit.zamfara.gov.ng/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "kaura-namoda-tomb-guide",
    "title": "Kauran Namoda Tomb Guide: Zamfara History & Security-First Planning",
    "shortTitle": "Kauran Namoda Tomb",
    "kind": "destination",
    "region": "Zamfara State",
    "summary": "Use Kauran Namoda's tomb as a heritage-planning reference only when current route, local access and security conditions make travel appropriate.",
    "intro": [
      "The tomb is identified in Zamfara's tourism material as a historical site associated with the warrior linked to Kaura Namoda's name.",
      "Current security conditions should decide whether a visit is appropriate. Do not treat an evergreen heritage page as a live travel clearance."
    ],
    "bestFor": [
      "History",
      "Zamfara heritage",
      "Culture",
      "Research-minded travel"
    ],
    "highlights": [
      {
        "name": "Local historical significance",
        "detail": "The site connects to the history behind Kaura Namoda's name and regional identity."
      },
      {
        "name": "Heritage context",
        "detail": "Local interpretation can help distinguish documented history from oral tradition."
      },
      {
        "name": "Rural route",
        "detail": "Travel outside Gusau requires condition-specific planning."
      },
      {
        "name": "City alternative",
        "detail": "Zamfara State Museum can provide a cultural option when rural travel is unsuitable."
      }
    ],
    "planning": [
      {
        "label": "Check security first",
        "detail": "Use current official and trusted local advice for the exact route."
      },
      {
        "label": "Confirm local access",
        "detail": "Ask whether the site is appropriate to visit on the day."
      },
      {
        "label": "Travel in daylight",
        "detail": "Use conservative road timing."
      },
      {
        "label": "Be willing to cancel",
        "detail": "Choose a city-based alternative if conditions are uncertain."
      }
    ],
    "source": {
      "label": "Zamfara State Ministry of Commerce, Industry and Tourism",
      "href": "https://mocit.zamfara.gov.ng/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "national-museum-lagos-guide",
    "title": "National Museum Lagos Guide: History, Art & Onikan Planning",
    "shortTitle": "National Museum Lagos",
    "kind": "destination",
    "region": "Lagos State",
    "summary": "Use the National Museum Lagos as a focused history-and-art stop in Onikan, with current opening and photography rules checked before arrival.",
    "intro": [
      "The National Museum gives Lagos a dedicated museum intent that is different from Lekki's nature and gallery circuit.",
      "Use it for historical context, then keep Freedom Park or Tafawa Balewa Square as nearby heritage extensions rather than crossing the city."
    ],
    "bestFor": [
      "Museums",
      "History",
      "Art",
      "Lagos Island"
    ],
    "highlights": [
      {
        "name": "National collections",
        "detail": "The museum provides a broad Nigerian historical and cultural frame inside Lagos."
      },
      {
        "name": "Onikan location",
        "detail": "Its position makes it useful within a Lagos Island heritage day."
      },
      {
        "name": "Heritage pairing",
        "detail": "Freedom Park and Tafawa Balewa Square can extend the history theme without a long cross-city trip."
      },
      {
        "name": "Indoor cultural stop",
        "detail": "The museum can anchor a day when heat or rain makes outdoor plans less attractive."
      }
    ],
    "planning": [
      {
        "label": "Confirm current opening",
        "detail": "Check public hours before travelling."
      },
      {
        "label": "Follow photography rules",
        "detail": "Ask before photographing collections or interiors."
      },
      {
        "label": "Allow interpretation time",
        "detail": "Do not rush through exhibits simply to add another stop."
      },
      {
        "label": "Stay on Lagos Island",
        "detail": "Cluster nearby heritage sites to reduce traffic exposure."
      }
    ],
    "source": {
      "label": "Lagos State Ministry of Tourism, Arts & Culture",
      "href": "https://tourismartandculture.lagosstate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "abuja-national-mosque-guide",
    "title": "Abuja National Mosque Guide: Architecture, Worship & Visitor Etiquette",
    "shortTitle": "Abuja National Mosque",
    "kind": "destination",
    "region": "Federal Capital Territory",
    "summary": "Plan an Abuja National Mosque visit around prayer schedules, respectful dress and current visitor boundaries.",
    "intro": [
      "Abuja National Mosque is one of the capital's defining landmarks and supports a distinct architecture-and-religion visitor intent.",
      "It remains an active place of worship, so prayer and religious etiquette take priority over casual sightseeing."
    ],
    "bestFor": [
      "Islamic architecture",
      "Landmarks",
      "Culture",
      "Central Abuja"
    ],
    "highlights": [
      {
        "name": "National landmark",
        "detail": "The mosque is one of Abuja's most recognisable central-city structures."
      },
      {
        "name": "Living worship space",
        "detail": "Religious activity determines visitor movement and timing."
      },
      {
        "name": "Central cluster",
        "detail": "Millennium Park and the National Christian Centre sit within the wider central visitor circuit."
      },
      {
        "name": "Architecture",
        "detail": "Exterior and permitted interior views offer a strong built-environment focus."
      }
    ],
    "planning": [
      {
        "label": "Avoid disrupting prayer",
        "detail": "Choose a respectful visit time and follow mosque instructions."
      },
      {
        "label": "Dress modestly",
        "detail": "Use clothing appropriate for an active religious site."
      },
      {
        "label": "Ask before photography",
        "detail": "Do not assume cameras are permitted in all areas."
      },
      {
        "label": "Use designated entrances",
        "detail": "Follow security and visitor guidance around the complex."
      }
    ],
    "source": {
      "label": "Visit Abuja — Things to Do",
      "href": "https://www.visitabuja.org/see-and-do/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "national-christian-centre-abuja-guide",
    "title": "National Christian Centre Abuja Guide: Architecture & Visitor Planning",
    "shortTitle": "National Christian Centre Abuja",
    "kind": "destination",
    "region": "Federal Capital Territory",
    "summary": "Visit the National Christian Centre as a focused Abuja landmark and worship-space stop, respecting services and current access rules.",
    "intro": [
      "The National Christian Centre is one of Abuja's central religious landmarks and supports its own architecture-and-faith travel intent.",
      "Because it remains an active worship venue, visitor access should be planned around services and current site instructions."
    ],
    "bestFor": [
      "Christian heritage",
      "Architecture",
      "Landmarks",
      "Central Abuja"
    ],
    "highlights": [
      {
        "name": "National worship centre",
        "detail": "The building plays a prominent role in national Christian ceremonies and worship."
      },
      {
        "name": "Central Abuja setting",
        "detail": "It sits within the wider national landmark district."
      },
      {
        "name": "Architecture",
        "detail": "The building is a major visual feature of the capital's central area."
      },
      {
        "name": "Landmark pairing",
        "detail": "The National Mosque and Millennium Park can form a compact central-area route."
      }
    ],
    "planning": [
      {
        "label": "Check service times",
        "detail": "Avoid disrupting worship or formal events."
      },
      {
        "label": "Dress respectfully",
        "detail": "Use clothing appropriate for a religious venue."
      },
      {
        "label": "Ask before photography",
        "detail": "Interior and event photography may have restrictions."
      },
      {
        "label": "Follow security guidance",
        "detail": "Use permitted visitor areas and entrances."
      }
    ],
    "source": {
      "label": "Visit Abuja — Things to Do",
      "href": "https://www.visitabuja.org/see-and-do/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "benin-city-national-museum-guide",
    "title": "Benin City National Museum Guide: Kingdom History & Art",
    "shortTitle": "Benin City National Museum",
    "kind": "destination",
    "region": "Edo State",
    "summary": "Use Benin City National Museum as the main interpretive stop for Benin Kingdom history before visiting Igun Street or other heritage areas.",
    "intro": [
      "Benin City National Museum is a natural starting point for visitors who want historical context before engaging with the city's living bronze-casting tradition.",
      "Use the museum as a slower interpretive block and keep Igun Street as the complementary living-craft experience."
    ],
    "bestFor": [
      "Benin Kingdom history",
      "Museums",
      "Art",
      "Culture"
    ],
    "highlights": [
      {
        "name": "Kingdom context",
        "detail": "The museum helps frame Benin's political, artistic and cultural history."
      },
      {
        "name": "Art heritage",
        "detail": "Museum interpretation adds context to the city's internationally known artistic traditions."
      },
      {
        "name": "Igun connection",
        "detail": "The bronze-casting district provides a living craft counterpart to museum collections."
      },
      {
        "name": "Central heritage stop",
        "detail": "The museum fits naturally into a Ring Road heritage day."
      }
    ],
    "planning": [
      {
        "label": "Confirm current opening",
        "detail": "Check public hours before travelling."
      },
      {
        "label": "Follow photography rules",
        "detail": "Ask before photographing collections."
      },
      {
        "label": "Allow enough time",
        "detail": "Do not rush museum interpretation before going to Igun Street."
      },
      {
        "label": "Respect sensitive history",
        "detail": "Use careful, evidence-based context around contested heritage issues."
      }
    ],
    "source": {
      "label": "Edo State Government tourism overview",
      "href": "https://edostate.gov.ng/your-tourist-destinations-in-edo-state-this-easter-holiday/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "igun-street-guide",
    "title": "Igun Street Benin Guide: Bronze Casting & Visitor Etiquette",
    "shortTitle": "Igun Street",
    "kind": "destination",
    "region": "Edo State",
    "summary": "Visit Igun Street as a living bronze-casting district with time to understand workshops, artists and current photography rules.",
    "intro": [
      "Igun Street is one of Benin City's strongest living-craft destinations and deserves a focused guide separate from the museum.",
      "The value is in meeting a working artistic tradition, so visitor etiquette around workshops and people matters as much as shopping."
    ],
    "bestFor": [
      "Bronze casting",
      "Craft",
      "Benin heritage",
      "Art"
    ],
    "highlights": [
      {
        "name": "Working craft district",
        "detail": "Bronze casting remains a living practice rather than a staged attraction."
      },
      {
        "name": "Artist interaction",
        "detail": "Ask about makers, techniques and materials when viewing or buying work."
      },
      {
        "name": "Museum pairing",
        "detail": "Benin City National Museum can provide historical context before the street visit."
      },
      {
        "name": "Heritage shopping",
        "detail": "If buying work, clarify price, maker and handling before payment."
      }
    ],
    "planning": [
      {
        "label": "Ask before photography",
        "detail": "Workshops and artists may restrict cameras."
      },
      {
        "label": "Respect workspaces",
        "detail": "Do not touch tools, moulds or unfinished pieces without permission."
      },
      {
        "label": "Compare purchases",
        "detail": "Take time to understand quality and authorship."
      },
      {
        "label": "Visit in daylight",
        "detail": "Workshops and street activity are easiest to navigate during the day."
      }
    ],
    "source": {
      "label": "Edo State Government tourism overview",
      "href": "https://edostate.gov.ng/your-tourist-destinations-in-edo-state-this-easter-holiday/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "marina-resort-calabar-guide",
    "title": "Marina Resort Calabar Guide: Waterfront & Leisure Planning",
    "shortTitle": "Marina Resort Calabar",
    "kind": "destination",
    "region": "Cross River State",
    "summary": "Plan a Marina Resort Calabar visit around whichever waterfront and leisure facilities are currently operating.",
    "intro": [
      "Marina Resort is one of Calabar's best-known waterfront leisure areas and supports a distinct city-recreation intent.",
      "Large leisure complexes can change facility-by-facility, so verify the specific activity you want before travelling."
    ],
    "bestFor": [
      "Waterfront",
      "Leisure",
      "Calabar",
      "Families"
    ],
    "highlights": [
      {
        "name": "Waterfront setting",
        "detail": "The marina environment is the core attraction even when individual facilities change."
      },
      {
        "name": "Calabar city break",
        "detail": "It fits naturally after a history-focused museum block."
      },
      {
        "name": "Leisure mix",
        "detail": "Current entertainment, food or recreation options should be checked live."
      },
      {
        "name": "Evening potential",
        "detail": "The area can work as a slower end to a city day if return transport is arranged."
      }
    ],
    "planning": [
      {
        "label": "Check current facilities",
        "detail": "Do not assume every older listing is still operating."
      },
      {
        "label": "Confirm activity pricing",
        "detail": "Different facilities may have separate fees."
      },
      {
        "label": "Plan the return",
        "detail": "Arrange transport before staying late."
      },
      {
        "label": "Watch weather",
        "detail": "Heavy rain can change waterfront plans."
      }
    ],
    "source": {
      "label": "Cross River State Government tourism update",
      "href": "https://news.crossriverstate.gov.ng/two-years-of-purposeful-leadership-and-shared-progress-a-state-broadcast-by-his-excellency-the-governor-of-cross-river-state-on-the-occasion-of-his-second-year-in-office-may-29-2025/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "slave-history-museum-calabar-guide",
    "title": "Slave History Museum Calabar Guide: Heritage & Respectful Visit",
    "shortTitle": "Slave History Museum Calabar",
    "kind": "destination",
    "region": "Cross River State",
    "summary": "Use Calabar's Slave History Museum as a focused transatlantic-slavery history visit, with enough time for interpretation and respectful engagement.",
    "intro": [
      "The Slave History Museum gives Calabar a serious historical destination beyond waterfront leisure and festival tourism.",
      "The subject requires careful interpretation and should not be reduced to sensational stories or novelty photographs."
    ],
    "bestFor": [
      "History",
      "Museums",
      "Calabar heritage",
      "Education"
    ],
    "highlights": [
      {
        "name": "Transatlantic-slavery context",
        "detail": "The museum frames Calabar's role within a wider history of forced migration and trade."
      },
      {
        "name": "Marina location",
        "detail": "Its waterfront setting connects history with the city's old trading geography."
      },
      {
        "name": "Interpretive visit",
        "detail": "Labels, guides and exhibits matter more than a quick photo stop."
      },
      {
        "name": "City pairing",
        "detail": "Marina Resort can form a separate leisure block after the history-focused visit."
      }
    ],
    "planning": [
      {
        "label": "Allow enough time",
        "detail": "Sensitive history benefits from a slower museum visit."
      },
      {
        "label": "Follow photography rules",
        "detail": "Ask before photographing exhibits or memorial material."
      },
      {
        "label": "Use respectful language",
        "detail": "Avoid trivialising or sensationalising the subject."
      },
      {
        "label": "Confirm current opening",
        "detail": "Check museum hours before travelling."
      }
    ],
    "source": {
      "label": "Calabar Municipal — Tourist Attractions",
      "href": "https://calabar.municipal.crossriverstate.gov.ng/tourist-attractions"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "port-harcourt-pleasure-park-guide",
    "title": "Port Harcourt Pleasure Park Guide: Activities & Family Planning",
    "shortTitle": "Port Harcourt Pleasure Park",
    "kind": "destination",
    "region": "Rivers State",
    "summary": "Use Port Harcourt Pleasure Park as a focused urban recreation stop, checking current activities, tickets and weather before arrival.",
    "intro": [
      "Pleasure Park is one of Port Harcourt's strongest city-based recreation destinations and supports a dedicated family-and-leisure intent.",
      "Current attractions and pricing can change, so plan around what is operating now rather than old feature lists."
    ],
    "bestFor": [
      "Families",
      "Parks",
      "Leisure",
      "Port Harcourt"
    ],
    "highlights": [
      {
        "name": "Urban recreation",
        "detail": "The park provides a city-based leisure option without a riverine excursion."
      },
      {
        "name": "Family outing",
        "detail": "Suitability depends on the activities currently operating."
      },
      {
        "name": "Food pairing",
        "detail": "A local bole meal can form a separate city experience after the park."
      },
      {
        "name": "Flexible duration",
        "detail": "The park can fill a short afternoon or a longer recreation block depending on the programme."
      }
    ],
    "planning": [
      {
        "label": "Check current activities",
        "detail": "Confirm what is operating before travelling."
      },
      {
        "label": "Confirm ticket prices",
        "detail": "Individual activities may have separate charges."
      },
      {
        "label": "Watch rain",
        "detail": "Outdoor recreation can change quickly in heavy weather."
      },
      {
        "label": "Plan transport home",
        "detail": "Arrange a reliable return option if staying late."
      }
    ],
    "source": {
      "label": "Rivers State Tourism Development Agency",
      "href": "https://rstda.rv.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "jos-museum-zoo-guide",
    "title": "Jos Museum & Zoo Guide: History, Wildlife & Visitor Planning",
    "shortTitle": "Jos Museum & Zoo",
    "kind": "destination",
    "region": "Plateau State",
    "summary": "Plan the Jos Museum and Zoo area as a combined culture-and-wildlife stop, checking current operating status before arrival.",
    "intro": [
      "Jos Museum and Zoo supports a distinct city-based history-and-wildlife intent within Plateau's broader nature offering.",
      "Because museum and animal facilities can change operations independently, verify the exact areas open before building the day around them."
    ],
    "bestFor": [
      "Museums",
      "Wildlife",
      "Families",
      "Jos"
    ],
    "highlights": [
      {
        "name": "Museum context",
        "detail": "The museum component can provide historical and cultural interpretation."
      },
      {
        "name": "Zoo component",
        "detail": "Treat animals as managed wildlife and follow enclosure rules."
      },
      {
        "name": "City location",
        "detail": "The site can fit a Jos weekend without the long road time of Wase or other rural destinations."
      },
      {
        "name": "Plateau pairing",
        "detail": "Jos Wildlife Park provides a separate nature-focused experience."
      }
    ],
    "planning": [
      {
        "label": "Confirm current operations",
        "detail": "Check which museum and zoo areas are open."
      },
      {
        "label": "Do not feed animals",
        "detail": "Follow wildlife-management rules."
      },
      {
        "label": "Allow a mixed pace",
        "detail": "Museum interpretation and animal viewing require different timing."
      },
      {
        "label": "Use daylight",
        "detail": "Plan the visit before late-day closing or reduced visibility."
      }
    ],
    "source": {
      "label": "VisitPlateau — official tourism platform",
      "href": "https://visitplateau.com/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "becheve-nature-reserve-guide",
    "title": "Becheve Nature Reserve Guide: Obudu Forest & Conservation Planning",
    "shortTitle": "Becheve Nature Reserve",
    "kind": "destination",
    "region": "Cross River State",
    "summary": "Plan Becheve Nature Reserve as a conservation-focused Obudu Plateau visit with current access, guide and trail checks.",
    "intro": [
      "Becheve Nature Reserve provides a distinct forest-and-conservation experience within the Obudu Plateau area.",
      "Treat it as a managed natural environment rather than an unrestricted hiking zone and confirm current visitor arrangements."
    ],
    "bestFor": [
      "Forest",
      "Conservation",
      "Birding",
      "Obudu"
    ],
    "highlights": [
      {
        "name": "Montane nature",
        "detail": "The reserve adds forest and biodiversity value to a highland resort trip."
      },
      {
        "name": "Trail experience",
        "detail": "Use recognised routes and local guidance rather than improvising through vegetation."
      },
      {
        "name": "Obudu pairing",
        "detail": "The main resort and Ulanga views can form separate blocks in a longer stay."
      },
      {
        "name": "Wildlife etiquette",
        "detail": "Observe quietly and do not pursue animals for photographs."
      }
    ],
    "planning": [
      {
        "label": "Confirm reserve access",
        "detail": "Check whether a guide or advance arrangement is required."
      },
      {
        "label": "Prepare for wet trails",
        "detail": "Use suitable footwear and rain protection."
      },
      {
        "label": "Carry water",
        "detail": "Do not assume supplies on reserve trails."
      },
      {
        "label": "Leave no trace",
        "detail": "Carry waste out and avoid disturbing habitat."
      }
    ],
    "source": {
      "label": "Obudu LGA — Tourism",
      "href": "https://obudu.crossriverstate.gov.ng/tourism"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ulanga-mountain-obudu-guide",
    "title": "Ulanga Mountain Obudu Guide: Highland Views & Safety Planning",
    "shortTitle": "Ulanga Mountain Obudu",
    "kind": "destination",
    "region": "Cross River State",
    "summary": "Use Ulanga Mountain views as a dedicated Obudu highland outing with weather, local-route and daylight checks.",
    "intro": [
      "Ulanga Mountain adds a distinct highland-view intent to the wider Obudu Plateau experience.",
      "Use local guidance and current weather to choose appropriate viewpoints rather than treating every slope as unrestricted hiking terrain."
    ],
    "bestFor": [
      "Highland views",
      "Photography",
      "Hiking",
      "Obudu"
    ],
    "highlights": [
      {
        "name": "Mountain scenery",
        "detail": "The landscape and views are the primary attraction."
      },
      {
        "name": "Plateau climate",
        "detail": "Mist, rain and cooler temperatures can change visibility quickly."
      },
      {
        "name": "Obudu connection",
        "detail": "The resort and Becheve reserve provide complementary stay and nature experiences."
      },
      {
        "name": "Outdoor activity",
        "detail": "Plan the stop as a real hill outing rather than a drive-by photo."
      }
    ],
    "planning": [
      {
        "label": "Check weather",
        "detail": "Low cloud or rain can reduce visibility and make terrain slippery."
      },
      {
        "label": "Use local guidance",
        "detail": "Confirm recognised viewpoints and routes."
      },
      {
        "label": "Wear practical footwear",
        "detail": "Use shoes suitable for uneven highland terrain."
      },
      {
        "label": "Return before dark",
        "detail": "Protect daylight for the descent and onward movement."
      }
    ],
    "source": {
      "label": "Obudu LGA — Tourism",
      "href": "https://obudu.crossriverstate.gov.ng/tourism"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "wikki-warm-spring-guide",
    "title": "Wikki Warm Spring Guide: Yankari Water Safety & Visitor Planning",
    "shortTitle": "Wikki Warm Spring",
    "kind": "destination",
    "region": "Bauchi State",
    "summary": "Plan a Wikki Warm Spring visit inside Yankari around current reserve access, water rules and park operating arrangements.",
    "intro": [
      "Wikki Warm Spring is one of Yankari's best-known individual attractions and supports a distinct warm-spring search intent beyond the reserve guide.",
      "Because it lies inside a protected reserve, current park rules and access arrangements govern the experience."
    ],
    "bestFor": [
      "Warm springs",
      "Yankari",
      "Nature",
      "Relaxed swimming"
    ],
    "highlights": [
      {
        "name": "Warm spring",
        "detail": "The spring is the central leisure feature within the wider reserve."
      },
      {
        "name": "Protected-area setting",
        "detail": "Reserve rules remain in force even during a recreational water visit."
      },
      {
        "name": "Yankari pairing",
        "detail": "Wildlife and Marshall Caves are separate reserve experiences."
      },
      {
        "name": "Evening potential",
        "detail": "The spring can be a slower activity after a daytime reserve outing when current rules permit."
      }
    ],
    "planning": [
      {
        "label": "Confirm reserve access",
        "detail": "Check current entry and operating arrangements."
      },
      {
        "label": "Follow water rules",
        "detail": "Use only areas currently permitted for bathing."
      },
      {
        "label": "Respect wildlife",
        "detail": "Do not feed or approach animals near the spring."
      },
      {
        "label": "Keep valuables secure",
        "detail": "Use a water-resistant plan for phones and documents."
      }
    ],
    "source": {
      "label": "Bauchi State Government — Tourism",
      "href": "https://www.bauchistate.gov.ng/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "marshall-caves-yankari-guide",
    "title": "Marshall Caves Yankari Guide: Archaeology & Reserve Planning",
    "shortTitle": "Marshall Caves Yankari",
    "kind": "destination",
    "region": "Bauchi State",
    "summary": "Visit Marshall Caves as a focused Yankari archaeological stop with reserve-approved access and local guidance.",
    "intro": [
      "Marshall Caves add a heritage and archaeology dimension to Yankari beyond wildlife and Wikki Warm Spring.",
      "Because the caves sit inside a protected reserve, use recognised park routes and never enter unfamiliar sections independently."
    ],
    "bestFor": [
      "Archaeology",
      "Caves",
      "Yankari",
      "History"
    ],
    "highlights": [
      {
        "name": "Cave heritage",
        "detail": "The caves provide a different historical layer within the reserve landscape."
      },
      {
        "name": "Protected setting",
        "detail": "Park rules govern access and behaviour."
      },
      {
        "name": "Yankari variety",
        "detail": "The caves can complement wildlife viewing and the warm spring on a longer stay."
      },
      {
        "name": "Interpretive value",
        "detail": "Local guidance helps visitors understand the archaeological context."
      }
    ],
    "planning": [
      {
        "label": "Use reserve guidance",
        "detail": "Confirm whether the caves are open and how visits are arranged."
      },
      {
        "label": "Do not enter alone",
        "detail": "Use recognised visitor routes."
      },
      {
        "label": "Wear practical footwear",
        "detail": "Cave surfaces can be uneven."
      },
      {
        "label": "Respect archaeological features",
        "detail": "Do not remove, scratch or disturb material."
      }
    ],
    "source": {
      "label": "Bauchi State Government — Tourism",
      "href": "https://www.bauchistate.gov.ng/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "itoku-adire-market-guide",
    "title": "Itoku Adire Market Guide: Abeokuta Textiles & Shopping Tips",
    "shortTitle": "Itoku Adire Market",
    "kind": "destination",
    "region": "Ogun State",
    "summary": "Use Itoku Adire Market as a focused Abeokuta textile-and-craft stop, with time to compare makers, quality and prices.",
    "intro": [
      "Itoku is one of Abeokuta's strongest craft-shopping destinations and supports a distinct adire and textile intent beyond Olumo Rock.",
      "The best visit is not only buying fabric: ask about techniques, makers and material quality while respecting active market workspaces."
    ],
    "bestFor": [
      "Adire",
      "Textiles",
      "Craft shopping",
      "Abeokuta"
    ],
    "highlights": [
      {
        "name": "Adire textiles",
        "detail": "The market is closely associated with indigo and patterned cloth traditions."
      },
      {
        "name": "Maker context",
        "detail": "Ask who produced a piece and what technique was used."
      },
      {
        "name": "Olumo pairing",
        "detail": "The market fits naturally into an Olumo Rock heritage day."
      },
      {
        "name": "Shopping variety",
        "detail": "Compare multiple stalls before buying when quality and finish vary."
      }
    ],
    "planning": [
      {
        "label": "Carry purchases carefully",
        "detail": "Protect textiles from rain and dirt."
      },
      {
        "label": "Negotiate respectfully",
        "detail": "Ask prices clearly and compare without confrontation."
      },
      {
        "label": "Ask before photography",
        "detail": "Market workers may not want to be photographed."
      },
      {
        "label": "Use daylight",
        "detail": "Shopping and route finding are easier during normal market hours."
      }
    ],
    "source": {
      "label": "Ogun State investment and tourism information",
      "href": "https://invest.ogunstate.gov.ng/blogdetails?id=7"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "alake-palace-abeokuta-guide",
    "title": "Alake's Palace Abeokuta Guide: Egba Royal Heritage & Etiquette",
    "shortTitle": "Alake's Palace Abeokuta",
    "kind": "destination",
    "region": "Ogun State",
    "summary": "Plan a respectful visit around the Alake's Palace area with current public boundaries, dress and photography rules checked first.",
    "intro": [
      "The Alake's Palace is central to Abeokuta's Egba royal heritage and supports a distinct traditional-institution visit.",
      "It remains an active palace, so public access can change and should never be assumed from old travel reports."
    ],
    "bestFor": [
      "Royal heritage",
      "Egba history",
      "Culture",
      "Abeokuta"
    ],
    "highlights": [
      {
        "name": "Traditional institution",
        "detail": "The palace remains part of living Egba authority and culture."
      },
      {
        "name": "Ake heritage area",
        "detail": "Centenary Hall and nearby historic sites can complement the visit."
      },
      {
        "name": "Olumo connection",
        "detail": "The palace adds political and cultural context to Abeokuta's better-known rock landmark."
      },
      {
        "name": "Ceremonial activity",
        "detail": "Events can change access and visitor movement."
      }
    ],
    "planning": [
      {
        "label": "Confirm public access",
        "detail": "Check what areas visitors may currently enter."
      },
      {
        "label": "Dress respectfully",
        "detail": "Use appropriate clothing for a royal institution."
      },
      {
        "label": "Ask before photography",
        "detail": "Do not assume cameras are permitted."
      },
      {
        "label": "Follow palace instructions",
        "detail": "Respect custodians, security and ceremonial boundaries."
      }
    ],
    "source": {
      "label": "Ogun State investment and tourism information",
      "href": "https://invest.ogunstate.gov.ng/blogdetails?id=7"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "centenary-hall-abeokuta-guide",
    "title": "Centenary Hall Abeokuta Guide: Egba History & Visitor Planning",
    "shortTitle": "Centenary Hall Abeokuta",
    "kind": "destination",
    "region": "Ogun State",
    "summary": "Use Centenary Hall as a focused Abeokuta civic-heritage stop, paired with nearby Ake and Itoku history rather than a citywide rush.",
    "intro": [
      "Centenary Hall is one of Abeokuta's established heritage landmarks and supports a distinct civic-history intent beyond Olumo Rock.",
      "Its value is strongest when viewed inside the wider Ake heritage area, with current public access checked before travelling."
    ],
    "bestFor": [
      "Egba history",
      "Architecture",
      "Abeokuta",
      "Heritage"
    ],
    "highlights": [
      {
        "name": "Civic heritage",
        "detail": "The hall represents an important layer of Abeokuta's institutional and public history."
      },
      {
        "name": "Ake setting",
        "detail": "Its location connects naturally with the Alake's Palace area."
      },
      {
        "name": "Itoku connection",
        "detail": "Adire shopping can add a living-craft dimension to the same heritage day."
      },
      {
        "name": "Compact stop",
        "detail": "It works best as one part of a clustered Abeokuta route."
      }
    ],
    "planning": [
      {
        "label": "Confirm current access",
        "detail": "Check whether the hall is open to visitors or hosting an event."
      },
      {
        "label": "Ask before photography",
        "detail": "Follow rules around interior or event spaces."
      },
      {
        "label": "Stay in the Ake cluster",
        "detail": "Avoid unnecessary cross-city movement."
      },
      {
        "label": "Use daylight",
        "detail": "Historic-area navigation is easier during the day."
      }
    ],
    "source": {
      "label": "Ogun State investment and tourism information",
      "href": "https://invest.ogunstate.gov.ng/blogdetails?id=7"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ataoja-palace-osogbo-guide",
    "title": "Ataoja Palace Osogbo Guide: Royal Heritage & Visitor Etiquette",
    "shortTitle": "Ataoja Palace Osogbo",
    "kind": "destination",
    "region": "Osun State",
    "summary": "Plan a respectful visit around the Ataoja Palace area in Osogbo with current public boundaries, dress and photography rules checked first.",
    "intro": [
      "The Ataoja Palace is central to Osogbo's royal heritage and supports a distinct traditional-institution visit alongside the Sacred Grove.",
      "Because it remains a living palace, access may change around ceremonies, official activity or local restrictions."
    ],
    "bestFor": [
      "Royal heritage",
      "Osogbo",
      "Yoruba culture",
      "History"
    ],
    "highlights": [
      {
        "name": "Traditional institution",
        "detail": "The palace remains part of living Osogbo royal and cultural life."
      },
      {
        "name": "Sacred Grove connection",
        "detail": "The palace and grove together help explain the city's religious and political heritage."
      },
      {
        "name": "City heritage route",
        "detail": "Nike Art Centre can add an artistic dimension to the same broader visit."
      },
      {
        "name": "Ceremonial context",
        "detail": "Festival or palace activity can change visitor movement."
      }
    ],
    "planning": [
      {
        "label": "Confirm public access",
        "detail": "Check what visitors may currently enter."
      },
      {
        "label": "Dress respectfully",
        "detail": "Use appropriate clothing for a royal institution."
      },
      {
        "label": "Ask before photography",
        "detail": "Do not assume cameras are permitted."
      },
      {
        "label": "Follow palace instructions",
        "detail": "Respect custodians and ceremonial boundaries."
      }
    ],
    "source": {
      "label": "Osun State Government — Tourist Centres",
      "href": "https://www.osunstate.gov.ng/tourist-centres/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ladi-kwali-pottery-centre-guide",
    "title": "Ladi Kwali Pottery Centre Guide: Suleja Craft Heritage",
    "shortTitle": "Ladi Kwali Pottery Centre",
    "kind": "destination",
    "region": "Niger State",
    "summary": "Use the Ladi Kwali Pottery Centre as a focused Suleja craft-and-heritage stop with current visitor and workshop access checked before arrival.",
    "intro": [
      "The Ladi Kwali pottery tradition gives Suleja a distinct Nigerian craft-history intent beyond nearby Zuma Rock and Gurara Falls.",
      "A meaningful visit should focus on technique, makers and cultural context rather than treating the centre only as a souvenir stop."
    ],
    "bestFor": [
      "Pottery",
      "Craft heritage",
      "Suleja",
      "Culture"
    ],
    "highlights": [
      {
        "name": "Ladi Kwali legacy",
        "detail": "The centre connects to one of Nigeria's most celebrated pottery traditions."
      },
      {
        "name": "Craft technique",
        "detail": "Ask about materials, firing and decorative methods when demonstrations are available."
      },
      {
        "name": "Suleja context",
        "detail": "The stop can fit a wider Niger/FCT road trip without being folded into a waterfall day."
      },
      {
        "name": "Buying work",
        "detail": "Clarify maker, price and safe transport for fragile pieces."
      }
    ],
    "planning": [
      {
        "label": "Confirm current access",
        "detail": "Check whether workshops or exhibitions are open."
      },
      {
        "label": "Ask before photography",
        "detail": "Makers and workspaces may have restrictions."
      },
      {
        "label": "Handle pottery carefully",
        "detail": "Plan protective transport for purchases."
      },
      {
        "label": "Keep Gurara separate",
        "detail": "The waterfall needs its own road and weather planning."
      }
    ],
    "source": {
      "label": "Niger State Government — Suleja Emirate",
      "href": "https://nigerstate.gov.ng/suleja-emirate/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "kainji-dam-guide",
    "title": "Kainji Dam Guide: Engineering Landmark & Access Planning",
    "shortTitle": "Kainji Dam",
    "kind": "destination",
    "region": "Niger State",
    "summary": "Plan a Kainji Dam visit as an engineering-and-landscape stop while treating the power complex as working infrastructure with restricted areas.",
    "intro": [
      "Kainji Dam is a major Nigerian engineering landmark and supports a distinct infrastructure-and-geography search intent beyond the national park.",
      "The dam is operational infrastructure, so public viewing must stay within approved areas and current security instructions."
    ],
    "bestFor": [
      "Engineering",
      "Landscapes",
      "Kainji",
      "Road trips"
    ],
    "highlights": [
      {
        "name": "Major dam complex",
        "detail": "The scale of the structure and reservoir is the central visitor interest."
      },
      {
        "name": "Working infrastructure",
        "detail": "Operational areas take priority over tourism access."
      },
      {
        "name": "National park context",
        "detail": "Kainji Lake National Park provides a separate protected-nature experience."
      },
      {
        "name": "Reservoir landscape",
        "detail": "Public viewpoints can add geographic context without entering restricted zones."
      }
    ],
    "planning": [
      {
        "label": "Respect restricted areas",
        "detail": "Do not cross barriers or security instructions."
      },
      {
        "label": "Confirm public viewpoints",
        "detail": "Ask where visitors may stop legally and safely."
      },
      {
        "label": "Travel in daylight",
        "detail": "Use conservative road timing."
      },
      {
        "label": "Do not assume tours",
        "detail": "Only enter operational facilities when officially permitted."
      }
    ],
    "source": {
      "label": "Nigeria Park Service — Kainji Lake National Park brochure",
      "href": "https://nigeriaparkservice.gov.ng/blog/2023/11/17/nigeria-national-parks-service-brochure/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "shagunu-beach-guide",
    "title": "Shagunu Beach Kainji Guide: Lakeshore & Safety Planning",
    "shortTitle": "Shagunu Beach",
    "kind": "destination",
    "region": "Niger State",
    "summary": "Use Shagunu Beach as a focused Kainji lakeshore stop with current park access, water-condition and safety checks.",
    "intro": [
      "Shagunu Beach adds a distinct lakeshore recreation intent inside the wider Kainji landscape.",
      "Because it sits within a protected-area context, current park rules and water conditions should shape the visit."
    ],
    "bestFor": [
      "Lakeshore",
      "Nature",
      "Photography",
      "Kainji"
    ],
    "highlights": [
      {
        "name": "Lakeshore setting",
        "detail": "The beach provides a slower water-and-landscape experience."
      },
      {
        "name": "Protected-area context",
        "detail": "Park rules still govern behaviour and access."
      },
      {
        "name": "Kainji pairing",
        "detail": "The dam and national park are separate engineering and conservation experiences."
      },
      {
        "name": "Waterfront photography",
        "detail": "The shoreline can be enjoyed without entering the water."
      }
    ],
    "planning": [
      {
        "label": "Confirm park access",
        "detail": "Check current visitor arrangements."
      },
      {
        "label": "Do not assume swimming safety",
        "detail": "Use current official guidance before entering water."
      },
      {
        "label": "Protect valuables",
        "detail": "Use a water-resistant plan for electronics."
      },
      {
        "label": "Leave no trace",
        "detail": "Carry waste out of the protected area."
      }
    ],
    "source": {
      "label": "Nigeria Park Service — Kainji Lake National Park brochure",
      "href": "https://nigeriaparkservice.gov.ng/blog/2023/11/17/nigeria-national-parks-service-brochure/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "sukur-hidi-palace-guide",
    "title": "Hidi's Palace Sukur Guide: UNESCO Cultural Landscape Planning",
    "shortTitle": "Hidi's Palace Sukur",
    "kind": "destination",
    "region": "Adamawa State",
    "summary": "Visit Hidi's Palace as part of the UNESCO-listed Sukur Cultural Landscape with local guidance and respect for living cultural traditions.",
    "intro": [
      "Hidi's Palace is a core element of the Sukur Cultural Landscape and supports a focused royal-and-cultural heritage intent within the UNESCO site.",
      "The palace should be understood as part of a living cultural system rather than an isolated monument."
    ],
    "bestFor": [
      "UNESCO heritage",
      "Royal history",
      "Sukur",
      "Cultural landscapes"
    ],
    "highlights": [
      {
        "name": "Palace complex",
        "detail": "The palace is central to the social and political organisation represented in the cultural landscape."
      },
      {
        "name": "Hilltop setting",
        "detail": "Its location connects architecture with the wider mountain environment."
      },
      {
        "name": "Terraces and pathways",
        "detail": "The surrounding stone and agricultural systems deepen the heritage story."
      },
      {
        "name": "Living tradition",
        "detail": "Local customs and current community use should guide visitor behaviour."
      }
    ],
    "planning": [
      {
        "label": "Use local guidance",
        "detail": "Visit through recognised community arrangements."
      },
      {
        "label": "Ask before photography",
        "detail": "Sacred, royal or private areas may restrict cameras."
      },
      {
        "label": "Wear practical footwear",
        "detail": "The landscape involves steep and uneven paths."
      },
      {
        "label": "Respect living heritage",
        "detail": "Do not treat community spaces as abandoned ruins."
      }
    ],
    "source": {
      "label": "UNESCO World Heritage Centre — Sukur Cultural Landscape",
      "href": "https://whc.unesco.org/en/list/938"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "sukur-terraces-guide",
    "title": "Sukur Terraces & Stone Walkways Guide: UNESCO Landscape Visit",
    "shortTitle": "Sukur Terraces",
    "kind": "destination",
    "region": "Adamawa State",
    "summary": "Explore Sukur's terraced fields and stone walkways as part of a living UNESCO cultural landscape, with local guidance and suitable footwear.",
    "intro": [
      "The terraced fields and paved pathways are fundamental to why Sukur is recognised as a cultural landscape, not merely a scenic hill settlement.",
      "A focused guide helps visitors understand agriculture, settlement and movement as connected heritage features."
    ],
    "bestFor": [
      "UNESCO heritage",
      "Terraced landscapes",
      "Walking",
      "Cultural history"
    ],
    "highlights": [
      {
        "name": "Agricultural terraces",
        "detail": "The terraces demonstrate long-term adaptation of farming to mountain terrain."
      },
      {
        "name": "Stone pathways",
        "detail": "Paved routes connect parts of the landscape and form part of its heritage value."
      },
      {
        "name": "Palace relationship",
        "detail": "The Hidi's Palace anchors the wider social landscape."
      },
      {
        "name": "Living land use",
        "detail": "The area remains culturally meaningful rather than a static archaeological site."
      }
    ],
    "planning": [
      {
        "label": "Wear sturdy footwear",
        "detail": "Expect steep and uneven stone surfaces."
      },
      {
        "label": "Use local guidance",
        "detail": "Stay on appropriate paths and respect community areas."
      },
      {
        "label": "Watch weather",
        "detail": "Rain can make stone routes slippery."
      },
      {
        "label": "Do not disturb fields",
        "detail": "Respect active agricultural land."
      }
    ],
    "source": {
      "label": "UNESCO World Heritage Centre — Sukur Cultural Landscape",
      "href": "https://whc.unesco.org/en/list/938"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "kiriji-war-museum-guide",
    "title": "Kiriji War Museum Guide: Ilesa Yoruba History & Visitor Planning",
    "shortTitle": "Kiriji War Museum",
    "kind": "destination",
    "region": "Osun State",
    "summary": "Use Kiriji War Museum as a focused Ilesa-area history stop for context on the long Yoruba civil wars of the nineteenth century.",
    "intro": [
      "Kiriji War Museum gives the Ilesa area a distinct military-history and Yoruba-history intent beyond waterfalls and royal landmarks.",
      "The subject benefits from careful interpretation, especially where oral tradition and documented history intersect."
    ],
    "bestFor": [
      "Yoruba history",
      "Museums",
      "Military history",
      "Ilesa"
    ],
    "highlights": [
      {
        "name": "Kiriji War context",
        "detail": "The museum focuses on a major period of nineteenth-century Yoruba warfare."
      },
      {
        "name": "Regional history",
        "detail": "The story helps explain political relationships across several Yoruba states."
      },
      {
        "name": "Ilesa pairing",
        "detail": "The Owa Obokun monument can add a royal-history element to the same area."
      },
      {
        "name": "Erin-Ijesha contrast",
        "detail": "The waterfall is a separate nature trip rather than part of the museum story."
      }
    ],
    "planning": [
      {
        "label": "Confirm current opening",
        "detail": "Check public access before travelling."
      },
      {
        "label": "Use careful interpretation",
        "detail": "Distinguish documented history from later legend where needed."
      },
      {
        "label": "Follow photography rules",
        "detail": "Ask before photographing exhibits."
      },
      {
        "label": "Allow enough time",
        "detail": "Do not reduce a complex conflict history to a quick stop."
      }
    ],
    "source": {
      "label": "Osun State Government — Ilesa fact file",
      "href": "https://www.osunstate.gov.ng/2017/02/osun-fact-file-ilesha/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "owa-obokun-statue-guide",
    "title": "Owa Obokun Statue Ilesa Guide: Royal Heritage & City Planning",
    "shortTitle": "Owa Obokun Statue",
    "kind": "destination",
    "region": "Osun State",
    "summary": "Use the Owa Obokun monument as a focused Ilesa royal-heritage stop, paired with museum context rather than a rushed photo-only visit.",
    "intro": [
      "The Owa Obokun monument gives Ilesa a distinct royal-history landmark within Osun State's broader heritage network.",
      "Pairing it with historical interpretation makes the stop more useful than treating it only as a city marker."
    ],
    "bestFor": [
      "Royal heritage",
      "Ilesa",
      "Monuments",
      "History"
    ],
    "highlights": [
      {
        "name": "Royal identity",
        "detail": "The monument connects to Ijesa traditional history and leadership."
      },
      {
        "name": "Ilesa city context",
        "detail": "Its meaning is strongest within the wider historic city."
      },
      {
        "name": "Museum pairing",
        "detail": "Kiriji War Museum can add political and military context."
      },
      {
        "name": "Short heritage stop",
        "detail": "It fits naturally into an Ilesa-focused day."
      }
    ],
    "planning": [
      {
        "label": "Visit in daylight",
        "detail": "The monument and surrounding area are easier to navigate."
      },
      {
        "label": "Use credible context",
        "detail": "Avoid reducing royal history to unsupported legend."
      },
      {
        "label": "Respect nearby activity",
        "detail": "The area remains part of a living city."
      },
      {
        "label": "Keep Erin-Ijesha separate",
        "detail": "The waterfall needs its own nature-trip time."
      }
    ],
    "source": {
      "label": "Osun State Government — Tourist Centres",
      "href": "https://www.osunstate.gov.ng/tourist-centres/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "gashaka-hill-forts-guide",
    "title": "Gashaka Hill Historic Forts Guide: Park Heritage & Access Planning",
    "shortTitle": "Gashaka Hill Historic Forts",
    "kind": "destination",
    "region": "Taraba State",
    "summary": "Visit Gashaka Hill's historic fort remains only through current national-park access and guide arrangements.",
    "intro": [
      "Gashaka-Gumti contains cultural and historical features as well as exceptional biodiversity, and the hill forts support a distinct heritage intent within the park.",
      "Because they sit inside a major protected landscape, park-approved access should govern every visit."
    ],
    "bestFor": [
      "Park heritage",
      "History",
      "Hiking",
      "Gashaka-Gumti"
    ],
    "highlights": [
      {
        "name": "Historic fort remains",
        "detail": "The sites add a human-history layer to the park's natural landscape."
      },
      {
        "name": "Protected setting",
        "detail": "The surrounding national park remains the primary management context."
      },
      {
        "name": "Hill terrain",
        "detail": "Reaching heritage features can involve demanding outdoor conditions."
      },
      {
        "name": "Serti gateway",
        "detail": "Park administration in Serti is the practical starting point for current information."
      }
    ],
    "planning": [
      {
        "label": "Contact the park first",
        "detail": "Confirm whether the fort route is open and how visits are arranged."
      },
      {
        "label": "Use an authorised guide",
        "detail": "Do not enter remote park terrain independently."
      },
      {
        "label": "Prepare for hiking",
        "detail": "Carry water, suitable footwear and weather protection."
      },
      {
        "label": "Respect conservation rules",
        "detail": "Do not remove natural or heritage material."
      }
    ],
    "source": {
      "label": "Nigeria Park Service — Gashaka-Gumti National Park",
      "href": "https://nigeriaparkservice.gov.ng/blog/2014/08/12/gashaka-gumti-national-park/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "gashaka-gumti-serti-guide",
    "title": "Gashaka-Gumti Serti Guide: Park Gateway & Trip Preparation",
    "shortTitle": "Gashaka-Gumti Serti Gateway",
    "kind": "destination",
    "region": "Taraba State",
    "summary": "Use Serti as the planning gateway for Gashaka-Gumti National Park, confirming current entry, guides, roads and accommodation before heading deeper into the park.",
    "intro": [
      "Serti is important less as a sightseeing attraction than as the practical gateway to Nigeria's largest national park.",
      "A dedicated gateway guide helps visitors make the correct operational decisions before entering a remote protected area."
    ],
    "bestFor": [
      "National park planning",
      "Gateway towns",
      "Conservation trips",
      "Taraba"
    ],
    "highlights": [
      {
        "name": "Park administration",
        "detail": "Current entry and guide information should start with park authorities."
      },
      {
        "name": "Logistics base",
        "detail": "Use Serti to confirm supplies, transport and onward arrangements."
      },
      {
        "name": "Gashaka access",
        "detail": "Different parts of the park may require different routes and permissions."
      },
      {
        "name": "Conservative planning",
        "detail": "Remote terrain and road conditions make flexible timing essential."
      }
    ],
    "planning": [
      {
        "label": "Contact park staff",
        "detail": "Confirm entry, guide and route before departure."
      },
      {
        "label": "Fuel and supply early",
        "detail": "Do not assume services deeper inside the park."
      },
      {
        "label": "Check road conditions",
        "detail": "Weather can change travel time materially."
      },
      {
        "label": "Do not enter independently",
        "detail": "Use recognised park arrangements."
      }
    ],
    "source": {
      "label": "Nigeria Park Service — Overview",
      "href": "https://nigeriaparkservice.gov.ng/overview/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "freedom-park-lagos-guide",
    "title": "Freedom Park Lagos Guide: History, Arts & 2026 Events",
    "shortTitle": "Freedom Park Lagos",
    "kind": "destination",
    "region": "Lagos State",
    "summary": "Use Freedom Park as a Lagos Island heritage-and-arts stop, checking its active 2026 event calendar and visit arrangements before arrival.",
    "intro": [
      "Freedom Park transforms the former Broad Street Prison site into a heritage, arts and recreation venue, giving Lagos Island a distinct history-and-culture destination.",
      "Its official site is active in 2026 with events and visit booking, so the experience can vary significantly by date."
    ],
    "bestFor": [
      "Heritage",
      "Live arts",
      "Lagos Island",
      "Events"
    ],
    "highlights": [
      {
        "name": "Former prison site",
        "detail": "The park preserves the historical memory of the old colonial prison while repurposing the space for public culture."
      },
      {
        "name": "Arts programme",
        "detail": "Concerts, performances and cultural events can change the character of a visit."
      },
      {
        "name": "Island heritage cluster",
        "detail": "National Museum and Tafawa Balewa Square can form a nearby history-focused route."
      },
      {
        "name": "Evening potential",
        "detail": "Event nights can extend the visit beyond a daytime heritage walk."
      }
    ],
    "planning": [
      {
        "label": "Check the event calendar",
        "detail": "The official programme determines whether the day is quiet or event-heavy."
      },
      {
        "label": "Confirm visit booking",
        "detail": "Use the official site for current visit arrangements."
      },
      {
        "label": "Plan evening transport",
        "detail": "Arrange a reliable return option for late events."
      },
      {
        "label": "Respect memorial context",
        "detail": "Remember that the site also carries prison history."
      }
    ],
    "source": {
      "label": "Freedom Park Lagos — official site",
      "href": "https://freedomparklagos.com/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "tafawa-balewa-square-guide",
    "title": "Tafawa Balewa Square Guide: Independence History & Lagos Heritage",
    "shortTitle": "Tafawa Balewa Square",
    "kind": "destination",
    "region": "Lagos State",
    "summary": "Visit Tafawa Balewa Square for Nigeria's independence history and civic heritage, with current event and security access checked before arrival.",
    "intro": [
      "Tafawa Balewa Square is a major national civic landmark tied to Nigeria's independence history and supports a distinct history-and-architecture intent.",
      "Lagos State's renewed Independence Obelisk reinforces the square's heritage significance, while live event or security arrangements can change access."
    ],
    "bestFor": [
      "Independence history",
      "Civic landmarks",
      "Lagos Island",
      "Architecture"
    ],
    "highlights": [
      {
        "name": "Independence history",
        "detail": "The square is closely associated with Nigeria's national independence narrative."
      },
      {
        "name": "Independence Obelisk",
        "detail": "The renewed monument strengthens the site's role as a civic heritage landmark."
      },
      {
        "name": "Lagos Island cluster",
        "detail": "National Museum and Freedom Park can form a compact history route."
      },
      {
        "name": "Event space",
        "detail": "Large civic events can change how much of the square is accessible."
      }
    ],
    "planning": [
      {
        "label": "Check event access",
        "detail": "Confirm whether the square is open or restricted on your date."
      },
      {
        "label": "Follow security instructions",
        "detail": "Do not cross controlled areas for photography."
      },
      {
        "label": "Use daylight",
        "detail": "The architecture and surrounding heritage are easier to navigate."
      },
      {
        "label": "Cluster nearby stops",
        "detail": "Keep the day on Lagos Island to reduce traffic."
      }
    ],
    "source": {
      "label": "Lagos State Government — Independence Obelisk at TBS",
      "href": "https://lagosstate.gov.ng/news/all/view/6920819c88319a643b6df3a8"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "national-theatre-lagos-guide",
    "title": "National Theatre Lagos Guide: Wole Soyinka Centre & 2026 Events",
    "shortTitle": "National Theatre Lagos",
    "kind": "destination",
    "region": "Lagos State",
    "summary": "Plan a visit to the renovated National Theatre/Wole Soyinka Centre around its active 2026 performance calendar, exhibitions and excursion arrangements.",
    "intro": [
      "The National Theatre complex in Iganmu has been restored and the main edifice is now the Wole Soyinka Centre for Culture and the Creative Arts, while the institution continues to operate an active 2026 programme.",
      "A dedicated guide is justified because the venue now combines architecture, performances, exhibitions and organised excursions rather than functioning only as a static landmark."
    ],
    "bestFor": [
      "Performing arts",
      "Architecture",
      "Culture",
      "Lagos"
    ],
    "highlights": [
      {
        "name": "Restored cultural landmark",
        "detail": "The complex remains one of Nigeria's most recognisable national arts institutions."
      },
      {
        "name": "2026 programme",
        "detail": "The official calendar lists theatre, festival and cultural events through the year."
      },
      {
        "name": "Wole Soyinka Centre",
        "detail": "The renovated edifice carries the new cultural-centre identity while the National Theatre institution continues its programme."
      },
      {
        "name": "Excursion potential",
        "detail": "The official site provides dedicated excursion contact information for organised visits."
      }
    ],
    "planning": [
      {
        "label": "Check what's on",
        "detail": "Use the official calendar before choosing the date."
      },
      {
        "label": "Book the relevant experience",
        "detail": "Performance tickets and excursions are different visitor needs."
      },
      {
        "label": "Plan Iganmu transport",
        "detail": "Allow Lagos traffic margin before a timed show."
      },
      {
        "label": "Confirm venue naming",
        "detail": "Use current official information for the National Theatre/Wole Soyinka Centre complex."
      }
    ],
    "source": {
      "label": "National Theatre Nigeria — official site",
      "href": "https://nationaltheatre.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "new-afrika-shrine-guide",
    "title": "New Afrika Shrine Guide: Afrobeat, Felabration & Lagos Planning",
    "shortTitle": "New Afrika Shrine",
    "kind": "destination",
    "region": "Lagos State",
    "summary": "Use the New Afrika Shrine as a focused Afrobeat and live-culture destination, with event-night transport and current programme checks before travelling.",
    "intro": [
      "The New Afrika Shrine is a major Lagos cultural venue tied to Fela Kuti's legacy and remains central to Felabration, which continues to attract Nigerian and international visitors.",
      "The venue experience is programme-driven, so a normal night and a major Felabration event require very different transport, crowd and timing plans."
    ],
    "bestFor": [
      "Afrobeat",
      "Live music",
      "Fela heritage",
      "Lagos nightlife"
    ],
    "highlights": [
      {
        "name": "Afrobeat heritage",
        "detail": "The venue carries forward a major part of the Kuti family's musical and cultural legacy."
      },
      {
        "name": "Felabration",
        "detail": "The annual festival uses the Shrine for key competitions and performances."
      },
      {
        "name": "Live cultural venue",
        "detail": "Music, debate, dance and cultural programming can shape the visitor experience."
      },
      {
        "name": "Mainland location",
        "detail": "Agidingbi traffic and late-night return planning matter on busy event dates."
      }
    ],
    "planning": [
      {
        "label": "Check the programme",
        "detail": "Confirm the exact event and start time before travelling."
      },
      {
        "label": "Plan late-night transport",
        "detail": "Arrange a reliable return option before the show."
      },
      {
        "label": "Expect festival crowds",
        "detail": "Felabration dates require more time and crowd planning than ordinary nights."
      },
      {
        "label": "Protect valuables",
        "detail": "Use normal busy-event precautions."
      }
    ],
    "source": {
      "label": "Voice of Nigeria — Felabration 2026 and New Afrika Shrine",
      "href": "https://von.gov.ng/felabration-promotes-nigerian-culture-yeni-kuti/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-waterfalls-guide",
    "title": "Best Waterfalls in Nigeria: Where to Go & How to Plan",
    "shortTitle": "Nigeria Waterfalls",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Compare Nigeria's strongest waterfall trips by region, road difficulty, season and trip style before choosing where to go.",
    "intro": [
      "Nigeria's waterfalls are spread across very different road, climate and access conditions, so a useful guide should help travellers choose rather than simply list names.",
      "Federal tourism material highlights major falls across the country, while each destination still needs a current local weather and access check."
    ],
    "bestFor": [
      "Waterfalls",
      "Nature trips",
      "Photography",
      "Road trips"
    ],
    "highlights": [
      {
        "name": "Southwest options",
        "detail": "Erin-Ijesha and Arinta can fit shorter regional trips with very different trail and waterfall settings."
      },
      {
        "name": "North-Central options",
        "detail": "Gurara, Owu and Farin Ruwa require more deliberate road planning and seasonal awareness."
      },
      {
        "name": "Southeast and South-South",
        "detail": "Awhum, Owerre-Ezukala and Agbokim add cave, forest and tropical settings."
      },
      {
        "name": "Season matters",
        "detail": "Higher water flow can improve the spectacle while making roads and rock surfaces harder."
      }
    ],
    "planning": [
      {
        "label": "Choose by route, not fame",
        "detail": "Pick a waterfall that fits your base and road time."
      },
      {
        "label": "Check recent rain",
        "detail": "Rain changes water volume, road access and footing."
      },
      {
        "label": "Wear grip-friendly shoes",
        "detail": "Wet rock is a recurring risk across waterfall sites."
      },
      {
        "label": "Keep daylight margin",
        "detail": "Many falls require rural travel and should not end with a late return."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-national-parks-guide",
    "title": "National Parks in Nigeria: Which Park to Visit & How to Plan",
    "shortTitle": "Nigeria National Parks",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Compare Nigeria's national parks by landscape, access and trip style before contacting the relevant park for current entry and guide arrangements.",
    "intro": [
      "Nigeria Park Service currently lists seven national parks across major ecosystems, from Cross River rainforest to Kainji savanna and Gashaka highlands.",
      "A national overview is useful for choosing the right park, but entry, guides, roads and wildlife conditions must still be confirmed park by park."
    ],
    "bestFor": [
      "Wildlife",
      "Conservation",
      "Rainforest",
      "Adventure"
    ],
    "highlights": [
      {
        "name": "Rainforest parks",
        "detail": "Cross River and Okomu suit travellers prioritising forest biodiversity."
      },
      {
        "name": "Large wilderness",
        "detail": "Gashaka-Gumti is Nigeria's largest listed national park and demands conservative multi-day planning."
      },
      {
        "name": "Savanna and lake landscapes",
        "detail": "Kainji Lake offers a different mix of park, water and dam environments."
      },
      {
        "name": "Security-sensitive parks",
        "detail": "Chad Basin access should be treated as condition-led rather than assumed from evergreen tourism pages."
      }
    ],
    "planning": [
      {
        "label": "Contact the park first",
        "detail": "Confirm entry, guides, roads and accommodation before travel."
      },
      {
        "label": "Never expect guaranteed wildlife",
        "detail": "Sightings depend on nature."
      },
      {
        "label": "Prepare for the ecosystem",
        "detail": "Rainforest, savanna and highland trips need different gear."
      },
      {
        "label": "Respect protected-area rules",
        "detail": "Stay on approved routes and do not disturb wildlife."
      }
    ],
    "source": {
      "label": "Nigeria Park Service — National Parks Overview",
      "href": "https://nigeriaparkservice.gov.ng/overview/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-unesco-heritage-guide",
    "title": "Nigeria UNESCO World Heritage & Tentative Sites Guide",
    "shortTitle": "Nigeria UNESCO Heritage",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Understand Nigeria's two inscribed World Heritage properties and major Tentative List destinations without confusing tentative status with full inscription.",
    "intro": [
      "UNESCO currently lists two World Heritage properties in Nigeria: Osun-Osogbo Sacred Grove and Sukur Cultural Landscape.",
      "Nigeria also has a larger Tentative List including Idanre, Ogbunike, Arochukwu, Alok Ikom and Gashaka-Gumti. Tentative listing is not the same as World Heritage inscription."
    ],
    "bestFor": [
      "UNESCO heritage",
      "History",
      "Culture",
      "Conservation"
    ],
    "highlights": [
      {
        "name": "Inscribed sites",
        "detail": "Osun-Osogbo and Sukur are Nigeria's two current World Heritage properties."
      },
      {
        "name": "Tentative cultural sites",
        "detail": "Idanre, Arochukwu, Ogbunike and Alok Ikom are among important nomination candidates."
      },
      {
        "name": "Tentative natural sites",
        "detail": "Cross River and Gashaka-Gumti appear in Nigeria's current tentative heritage landscape."
      },
      {
        "name": "Status clarity",
        "detail": "Use the correct UNESCO status rather than calling every tentative site World Heritage."
      }
    ],
    "planning": [
      {
        "label": "Check the official status",
        "detail": "Use UNESCO's Nigeria page before describing a site."
      },
      {
        "label": "Respect living heritage",
        "detail": "Many cultural sites remain active sacred or community spaces."
      },
      {
        "label": "Use local guides",
        "detail": "Interpretation matters at complex cultural landscapes."
      },
      {
        "label": "Plan by region",
        "detail": "Nigeria's heritage sites are widely dispersed and should not be treated as one short circuit."
      }
    ],
    "source": {
      "label": "UNESCO World Heritage Centre — Nigeria",
      "href": "https://whc.unesco.org/en/statesparties/ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-caves-guide",
    "title": "Caves in Nigeria: Ogbunike, Eggon, Amanchor & More",
    "shortTitle": "Nigeria Caves",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Compare cave destinations in Nigeria by cultural significance, physical difficulty and current local access.",
    "intro": [
      "Nigeria's cave destinations range from living sacred landscapes such as Ogbunike to hill-and-cave adventure settings such as Eggon.",
      "Caves require more safety discipline than ordinary sightseeing: local guidance, weather and recognised routes matter."
    ],
    "bestFor": [
      "Caves",
      "Adventure",
      "Geology",
      "Heritage"
    ],
    "highlights": [
      {
        "name": "Ogbunike",
        "detail": "Combines cave exploration with living cultural significance and a demanding stair approach."
      },
      {
        "name": "Eggon Hills",
        "detail": "Adds hill terrain and remote outdoor planning to the cave experience."
      },
      {
        "name": "Amanchor",
        "detail": "Offers a lower-infrastructure Ebonyi cave trip requiring local route guidance."
      },
      {
        "name": "Owerre-Ezukala",
        "detail": "Pairs cave features with a waterfall environment."
      }
    ],
    "planning": [
      {
        "label": "Never enter unfamiliar caves alone",
        "detail": "Use recognised local guides and routes."
      },
      {
        "label": "Carry a real light",
        "detail": "Do not depend only on a phone torch."
      },
      {
        "label": "Watch rain",
        "detail": "Wet conditions can change cave and road safety."
      },
      {
        "label": "Respect cultural restrictions",
        "detail": "Some cave sites have sacred or community rules."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-lakes-waterfronts-guide",
    "title": "Lakes & Waterfronts in Nigeria: Nature and City Options",
    "shortTitle": "Nigeria Lakes & Waterfronts",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Compare Nigeria's lake, river and waterfront trips from easy city leisure to rural nature destinations, with water safety built into the plan.",
    "intro": [
      "Nigeria's water-based destinations are not one category in practice: Jabi and Yenagoa are urban leisure stops, while Oguta, Agulu and Ebomi require more destination planning.",
      "A useful comparison separates viewing, boating and swimming rather than assuming every waterfront offers the same activities."
    ],
    "bestFor": [
      "Lakes",
      "Waterfronts",
      "Nature",
      "Relaxed trips"
    ],
    "highlights": [
      {
        "name": "Urban waterfronts",
        "detail": "Jabi Lake and Ox-Bow Lake are easier to fit into city breaks."
      },
      {
        "name": "Nature lakes",
        "detail": "Oguta, Agulu and Ebomi offer stronger landscape-focused trips."
      },
      {
        "name": "River cities",
        "detail": "Makurdi and Lokoja show how major rivers shape city identity."
      },
      {
        "name": "Water activities vary",
        "detail": "Boating or swimming should only be used when current local conditions and operators support them."
      }
    ],
    "planning": [
      {
        "label": "Check water conditions",
        "detail": "Weather and water level should guide activity choices."
      },
      {
        "label": "Verify life jackets",
        "detail": "Use proper safety equipment for boats."
      },
      {
        "label": "Do not assume swimming is safe",
        "detail": "A scenic shoreline is not a safety guarantee."
      },
      {
        "label": "Protect electronics",
        "detail": "Use a water-resistant plan for valuables."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-hills-mountains-guide",
    "title": "Hills & Mountains in Nigeria: Hiking and Highland Guide",
    "shortTitle": "Nigeria Hills & Mountains",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Choose between Nigeria's hill and highland destinations based on fitness, road time, weather and the type of landscape you want.",
    "intro": [
      "Nigeria's upland destinations range from city-adjacent hills to remote highland road trips, so comparing them by difficulty and logistics is more useful than ranking them by height.",
      "Federal tourism material highlights several major hill and plateau landscapes, while current route and weather checks remain essential."
    ],
    "bestFor": [
      "Hiking",
      "Highlands",
      "Views",
      "Adventure"
    ],
    "highlights": [
      {
        "name": "Shorter hill trips",
        "detail": "Dala, Mount Patti and Kufena can fit more compact regional itineraries."
      },
      {
        "name": "Major climbing destinations",
        "detail": "Idanre and Shere demand more time, water and footwear planning."
      },
      {
        "name": "Highland road trips",
        "detail": "Mambilla and Obudu work best as multi-day destinations."
      },
      {
        "name": "Landscape variety",
        "detail": "Plateau rock country and southeastern highlands offer very different terrain."
      }
    ],
    "planning": [
      {
        "label": "Match the route to fitness",
        "detail": "Do not choose a climb only because it is famous."
      },
      {
        "label": "Check visibility and rain",
        "detail": "Weather can remove the main benefit of a viewpoint."
      },
      {
        "label": "Carry water",
        "detail": "Do not assume hilltop services."
      },
      {
        "label": "Use a turnaround time",
        "detail": "Protect enough daylight for the descent."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-rock-landmarks-guide",
    "title": "Famous Rock Landmarks in Nigeria: Zuma, Olumo, Wase & More",
    "shortTitle": "Nigeria Rock Landmarks",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Compare Nigeria's major rock landmarks by history, geology and whether the experience is a climb, viewpoint or road-trip stop.",
    "intro": [
      "Nigeria's famous rocks serve very different visitor intents: Olumo is a climb-and-history attraction, Zuma is primarily a monumental landscape landmark, and Wase or Riyom are geology-focused road trips.",
      "Choose the experience type before choosing the destination."
    ],
    "bestFor": [
      "Geology",
      "Landmarks",
      "Photography",
      "Road trips"
    ],
    "highlights": [
      {
        "name": "Historic rock",
        "detail": "Olumo combines physical climbing with Egba history."
      },
      {
        "name": "Monumental roadside landmark",
        "detail": "Zuma Rock is best understood through safe public viewpoints."
      },
      {
        "name": "Plateau geology",
        "detail": "Wase and Riyom offer distinctive formation-focused trips."
      },
      {
        "name": "Remote formations",
        "detail": "Ara and Kwatakashi require more condition-led local planning."
      }
    ],
    "planning": [
      {
        "label": "Do not assume climbing access",
        "detail": "Many rock landmarks are viewing destinations, not unrestricted climbs."
      },
      {
        "label": "Use public viewpoints",
        "detail": "Avoid roadsides or private land where stopping is unsafe."
      },
      {
        "label": "Check heat and weather",
        "detail": "Rock surfaces can become hazardous in rain or strong heat."
      },
      {
        "label": "Use local guidance",
        "detail": "Remote formations need current route information."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-museums-guide",
    "title": "Museums in Nigeria: History, Art & Regional Collections",
    "shortTitle": "Nigeria Museums",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Use Nigeria's museums by theme—national history, kingdom heritage, war history or regional culture—rather than treating them as interchangeable stops.",
    "intro": [
      "Nigeria's museum network offers very different stories, from Benin art and Kano old-city history to Umuahia's war heritage and national collections in Lagos or Ibadan.",
      "Choose a museum that matches your trip theme, then verify current opening and photography rules before travelling."
    ],
    "bestFor": [
      "Museums",
      "History",
      "Art",
      "Education"
    ],
    "highlights": [
      {
        "name": "National collections",
        "detail": "Lagos and Ibadan provide broad cultural and historical framing."
      },
      {
        "name": "Kingdom heritage",
        "detail": "Benin City, Kano and Ile-Ife connect museum collections with major historic traditions."
      },
      {
        "name": "Modern history",
        "detail": "Umuahia's National War Museum focuses on twentieth-century conflict."
      },
      {
        "name": "Regional museums",
        "detail": "Kanta Museum and Ibom Unity Museum add local cultural depth."
      }
    ],
    "planning": [
      {
        "label": "Confirm opening",
        "detail": "Museum hours and rehabilitation work can change."
      },
      {
        "label": "Follow photography rules",
        "detail": "Ask before photographing collections."
      },
      {
        "label": "Allow interpretation time",
        "detail": "Museums lose value when rushed."
      },
      {
        "label": "Pair with nearby heritage",
        "detail": "Use museums to add context to palaces, craft districts or historic streets."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Culture and Heritage",
      "href": "https://fmino.gov.ng/culture/culture/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-royal-palaces-guide",
    "title": "Royal Palaces & Traditional Institutions in Nigeria: Visitor Guide",
    "shortTitle": "Nigeria Royal Palaces",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Understand how to visit palace areas respectfully in Abeokuta, Ile-Ife, Osogbo, Katsina, Sokoto and other traditional centres.",
    "intro": [
      "Nigeria's palace sites are living institutions, not ordinary museums, and public access can change around ceremonies, worship and official duties.",
      "A national guide is useful because etiquette—dress, photography and boundaries—is often more important than ticketing."
    ],
    "bestFor": [
      "Royal heritage",
      "Culture",
      "History",
      "Architecture"
    ],
    "highlights": [
      {
        "name": "Yoruba royal centres",
        "detail": "Abeokuta, Ile-Ife and Osogbo each offer different palace traditions."
      },
      {
        "name": "Northern emirate heritage",
        "detail": "Katsina and Sokoto connect palace areas with Islamic and caliphate history."
      },
      {
        "name": "Sukur traditional authority",
        "detail": "Hidi's Palace sits inside a wider UNESCO cultural landscape."
      },
      {
        "name": "Living institutions",
        "detail": "Ceremonial or administrative activity may limit sightseeing."
      }
    ],
    "planning": [
      {
        "label": "Confirm public boundaries",
        "detail": "Do not assume every palace area is open."
      },
      {
        "label": "Dress respectfully",
        "detail": "Use culturally appropriate clothing."
      },
      {
        "label": "Ask before photography",
        "detail": "Cameras may be restricted."
      },
      {
        "label": "Accept access limits",
        "detail": "Do not push past custodians or security."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Culture and Heritage",
      "href": "https://fmino.gov.ng/culture/culture/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-art-craft-guide",
    "title": "Art & Craft Destinations in Nigeria: Galleries, Bronze, Adire & Pottery",
    "shortTitle": "Nigeria Art & Craft",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Build an art-and-craft trip around galleries, working craft districts and markets where technique and maker context matter as much as shopping.",
    "intro": [
      "Nigeria's strongest art-and-craft destinations range from formal galleries to living workshop districts and markets.",
      "A useful guide separates viewing, learning and buying so travellers can choose Nike Art Gallery, Igun Street, Itoku, Osogbo or Suleja for the right reason."
    ],
    "bestFor": [
      "Art",
      "Craft",
      "Textiles",
      "Shopping"
    ],
    "highlights": [
      {
        "name": "Gallery experiences",
        "detail": "Nike Art Gallery and Osogbo art spaces support slower collection-focused visits."
      },
      {
        "name": "Living craft",
        "detail": "Igun Street and Itoku connect visitors with active bronze and textile traditions."
      },
      {
        "name": "Pottery heritage",
        "detail": "Suleja's Ladi Kwali tradition offers a different material and craft history."
      },
      {
        "name": "Abuja craft shopping",
        "detail": "The Arts and Crafts Village provides a central-city browsing option."
      }
    ],
    "planning": [
      {
        "label": "Ask about the maker",
        "detail": "Understand who produced a work before buying."
      },
      {
        "label": "Ask before photography",
        "detail": "Artists and workshops may have restrictions."
      },
      {
        "label": "Plan safe transport",
        "detail": "Fragile art and pottery require packaging."
      },
      {
        "label": "Compare quality",
        "detail": "Do not treat all market items as equivalent."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Culture and Heritage",
      "href": "https://fmino.gov.ng/culture/culture/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-beaches-coast-guide",
    "title": "Beaches & Coastal Trips in Nigeria: Where to Go & Safety Tips",
    "shortTitle": "Nigeria Beaches & Coast",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Compare Atlantic beaches, river beaches and coastal waterfront trips in Nigeria, with sea state, road access and return transport built into the decision.",
    "intro": [
      "Nigeria's beach options range from Lagos and Akwa Ibom Atlantic coast to Ondo and inland river-beach environments.",
      "The word 'beach' does not guarantee safe swimming, lifeguards or permanent facilities, so current conditions matter."
    ],
    "bestFor": [
      "Beaches",
      "Coast",
      "Waterfronts",
      "Road trips"
    ],
    "highlights": [
      {
        "name": "Atlantic coast",
        "detail": "Ibeno and Araromi offer long coastal landscapes with different road logistics."
      },
      {
        "name": "Inland beach settings",
        "detail": "Oferekpe and Shagunu provide water-edge experiences away from the open Atlantic."
      },
      {
        "name": "Waterfront alternatives",
        "detail": "Igbokoda and Yenagoa suit travellers who want water scenery without a surf beach."
      },
      {
        "name": "Facilities vary",
        "detail": "Some destinations are low-infrastructure and should not be planned like resorts."
      }
    ],
    "planning": [
      {
        "label": "Check sea or water conditions",
        "detail": "Do not enter rough or uncertain water."
      },
      {
        "label": "Plan the return first",
        "detail": "Coastal destinations can have limited late transport."
      },
      {
        "label": "Protect valuables",
        "detail": "Use a water-resistant plan."
      },
      {
        "label": "Confirm public access",
        "detail": "Beach or waterfront access can change."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-warm-springs-guide",
    "title": "Warm Springs in Nigeria: Ikogosi, Wikki & Enemabia Guide",
    "shortTitle": "Nigeria Warm Springs",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Compare Nigeria's major warm-spring experiences by setting: resort-oriented Ikogosi, protected-area Wikki and lower-infrastructure Enemabia.",
    "intro": [
      "Nigeria's warm springs offer very different travel experiences despite sharing a natural-water theme.",
      "A comparison guide helps travellers choose between a developed destination, a national reserve setting and a more locally arranged rural visit."
    ],
    "bestFor": [
      "Warm springs",
      "Nature",
      "Relaxation",
      "Road trips"
    ],
    "highlights": [
      {
        "name": "Ikogosi",
        "detail": "Combines warm-spring nature with a more developed destination setting."
      },
      {
        "name": "Wikki",
        "detail": "Sits inside Yankari and is governed by reserve access and rules."
      },
      {
        "name": "Enemabia",
        "detail": "Requires more local-access and water-condition planning."
      },
      {
        "name": "Different trip types",
        "detail": "Do not assume facilities or swimming arrangements are the same across sites."
      }
    ],
    "planning": [
      {
        "label": "Confirm current access",
        "detail": "Each spring has different operating arrangements."
      },
      {
        "label": "Check water rules",
        "detail": "Only enter water where current guidance permits it."
      },
      {
        "label": "Bring water-safe storage",
        "detail": "Protect phones and documents."
      },
      {
        "label": "Plan the wider route",
        "detail": "Warm-spring locations are far apart and belong to separate regional trips."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "lagos-island-heritage-day",
    "title": "Lagos Island Heritage Day: Museum, Freedom Park & TBS",
    "shortTitle": "Lagos Island Heritage Day",
    "kind": "itinerary",
    "region": "Lagos State",
    "summary": "Spend one heritage-focused day on Lagos Island using the National Museum, Freedom Park and Tafawa Balewa Square without crossing the city unnecessarily.",
    "intro": [
      "Lagos Island has enough national and city history for a dedicated day without adding Lekki or mainland stops.",
      "The route works because the three anchors tell different parts of the story: museum collections, colonial-prison memory and independence-era civic heritage."
    ],
    "bestFor": [
      "History",
      "Lagos Island",
      "Museums",
      "Day trips"
    ],
    "highlights": [
      {
        "name": "Morning — National Museum",
        "detail": "Start with collections and historical context while energy is high."
      },
      {
        "name": "Midday — Freedom Park",
        "detail": "Move into the former prison site for heritage and arts programming."
      },
      {
        "name": "Afternoon — Tafawa Balewa Square",
        "detail": "Finish with independence and civic-history context when current access allows."
      },
      {
        "name": "Stay on the island",
        "detail": "The main advantage is avoiding a cross-city itinerary."
      }
    ],
    "planning": [
      {
        "label": "Check all three live",
        "detail": "Museum hours, events and security restrictions can differ."
      },
      {
        "label": "Leave walking and traffic margin",
        "detail": "Short map distances can still take time."
      },
      {
        "label": "Respect memorial spaces",
        "detail": "Freedom Park has serious historical context."
      },
      {
        "label": "Plan evening transport",
        "detail": "Arrange the return before staying for an event."
      }
    ],
    "source": {
      "label": "Lagos State Ministry of Tourism, Arts & Culture",
      "href": "https://tourismartandculture.lagosstate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "lagos-culture-weekend",
    "title": "Lagos Culture Weekend: Art, Theatre, Afrobeat & Heritage",
    "shortTitle": "Lagos Culture Weekend",
    "kind": "itinerary",
    "region": "Lagos State",
    "summary": "Build a Lagos culture weekend around visual art, theatre, Afrobeat and heritage while grouping each day by area to protect time from traffic.",
    "intro": [
      "Lagos culture spans multiple districts, so a good weekend should not try to visit Nike Art Gallery, the National Theatre and New Afrika Shrine in one continuous day.",
      "Use one island/Lekki culture block and one mainland arts-and-music block, with live event calendars deciding the final order."
    ],
    "bestFor": [
      "Art",
      "Theatre",
      "Afrobeat",
      "Weekend trips"
    ],
    "highlights": [
      {
        "name": "Visual art block",
        "detail": "Nike Art Gallery can anchor a Lekki-focused art period."
      },
      {
        "name": "National Theatre block",
        "detail": "Use the official 2026 calendar for performances or an excursion."
      },
      {
        "name": "Afrobeat block",
        "detail": "New Afrika Shrine works best when you know the exact event and return plan."
      },
      {
        "name": "Heritage alternative",
        "detail": "Freedom Park can replace a show when the schedule is lighter."
      }
    ],
    "planning": [
      {
        "label": "Plan by district",
        "detail": "Do not bounce repeatedly between Lekki, Iganmu and Ikeja."
      },
      {
        "label": "Check event calendars",
        "detail": "Theatre and music venues are programme-driven."
      },
      {
        "label": "Arrange late transport",
        "detail": "Night events require a reliable return plan."
      },
      {
        "label": "Keep one flexible block",
        "detail": "Traffic or event changes should not break the whole weekend."
      }
    ],
    "source": {
      "label": "Lagos State Ministry of Tourism, Arts & Culture",
      "href": "https://tourismartandculture.lagosstate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "abuja-national-landmarks-day",
    "title": "Abuja National Landmarks Day: Mosque, Christian Centre & Park",
    "shortTitle": "Abuja National Landmarks Day",
    "kind": "itinerary",
    "region": "Federal Capital Territory",
    "summary": "Use one central Abuja day for the National Mosque, National Christian Centre, Millennium Park and a craft stop without crossing the city repeatedly.",
    "intro": [
      "Abuja's major national landmarks can be grouped into a compact central-area day, making this a different intent from a general weekend guide.",
      "Religious and government-adjacent spaces require current access, worship and photography awareness."
    ],
    "bestFor": [
      "Landmarks",
      "Architecture",
      "Culture",
      "Day trips"
    ],
    "highlights": [
      {
        "name": "National Mosque",
        "detail": "Visit respectfully around prayer and current visitor rules."
      },
      {
        "name": "National Christian Centre",
        "detail": "Use the worship and architecture stop as a separate formal-site block."
      },
      {
        "name": "Millennium Park",
        "detail": "Add green space to break up formal landmark visits."
      },
      {
        "name": "Craft extension",
        "detail": "Use the Arts and Crafts Village only if current public access is confirmed."
      }
    ],
    "planning": [
      {
        "label": "Check worship schedules",
        "detail": "Do not disrupt religious services."
      },
      {
        "label": "Dress respectfully",
        "detail": "Formal religious sites require appropriate clothing."
      },
      {
        "label": "Watch photography restrictions",
        "detail": "Government and worship areas can limit cameras."
      },
      {
        "label": "Keep the route central",
        "detail": "Avoid adding Jabi or distant districts to the same day."
      }
    ],
    "source": {
      "label": "Visit Abuja — Things to Do",
      "href": "https://www.visitabuja.org/see-and-do/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "plateau-nature-road-trip",
    "title": "Plateau Nature Road Trip: Jos, Shere, Assop & Riyom",
    "shortTitle": "Plateau Nature Road Trip",
    "kind": "itinerary",
    "region": "Plateau State",
    "summary": "Plan a Plateau nature trip around Jos and a realistic combination of hills, waterfalls and rock formations rather than chasing every attraction in one day.",
    "intro": [
      "Plateau's official tourism platform gives the state one of Nigeria's strongest clusters of outdoor attractions, but road time and weather still limit what fits comfortably.",
      "Use Jos as the base and choose one or two outdoor anchors per day."
    ],
    "bestFor": [
      "Hiking",
      "Waterfalls",
      "Rock formations",
      "Road trips"
    ],
    "highlights": [
      {
        "name": "Jos base",
        "detail": "Use the city for accommodation and a wildlife or museum block."
      },
      {
        "name": "Shere Hills",
        "detail": "Make the hike a dedicated physical activity."
      },
      {
        "name": "Assop Falls",
        "detail": "Use the waterfall as a separate road-stop block with slippery-rock precautions."
      },
      {
        "name": "Riyom Rock",
        "detail": "Add geology and landscape without turning the day into another climb."
      }
    ],
    "planning": [
      {
        "label": "Choose two anchors per day",
        "detail": "Do not overpack the route."
      },
      {
        "label": "Check rain",
        "detail": "Plateau weather can change trail and waterfall conditions."
      },
      {
        "label": "Keep daylight",
        "detail": "Outdoor destinations are easier and safer before dark."
      },
      {
        "label": "Use current official listings",
        "detail": "Fees and operating conditions can change."
      }
    ],
    "source": {
      "label": "VisitPlateau — official tourism platform",
      "href": "https://visitplateau.com/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "ogun-heritage-day",
    "title": "Abeokuta Heritage Day: Olumo, Itoku, Palace & Centenary Hall",
    "shortTitle": "Abeokuta Heritage Day",
    "kind": "itinerary",
    "region": "Ogun State",
    "summary": "Build an Abeokuta heritage day around Olumo Rock, Itoku adire, the Alake's Palace area and Centenary Hall in one compact city route.",
    "intro": [
      "Abeokuta's strongest visitor assets tell one connected Egba story, making a heritage day more useful than four disconnected attraction pages.",
      "Start with the physically demanding rock visit and move into craft, royal and civic heritage afterwards."
    ],
    "bestFor": [
      "Egba history",
      "Craft",
      "Royal heritage",
      "Day trips"
    ],
    "highlights": [
      {
        "name": "Olumo first",
        "detail": "Use cooler morning hours for the climb."
      },
      {
        "name": "Itoku second",
        "detail": "Shift into adire and craft shopping after the rock."
      },
      {
        "name": "Ake heritage",
        "detail": "Use the palace area for royal context when current access permits."
      },
      {
        "name": "Centenary Hall",
        "detail": "Finish with civic heritage in the same broad cluster."
      }
    ],
    "planning": [
      {
        "label": "Start early",
        "detail": "Heat matters most on the rock climb."
      },
      {
        "label": "Ask before photography",
        "detail": "Market and palace spaces may have restrictions."
      },
      {
        "label": "Keep the route compact",
        "detail": "Do not add distant Ogun attractions to the same day."
      },
      {
        "label": "Protect return time",
        "detail": "Leave enough daylight for onward travel."
      }
    ],
    "source": {
      "label": "Ogun State investment and tourism information",
      "href": "https://invest.ogunstate.gov.ng/blogdetails?id=7"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "osun-heritage-road-trip",
    "title": "Osun Heritage Road Trip: Osogbo, Ile-Ife & Ilesa",
    "shortTitle": "Osun Heritage Road Trip",
    "kind": "itinerary",
    "region": "Osun State",
    "summary": "Plan a multi-day Osun heritage route across Osogbo, Ile-Ife and Ilesa, giving each city's sacred, royal, art and history sites enough time.",
    "intro": [
      "Osun's major heritage destinations cluster into different cities, so a useful route should not compress the Sacred Grove, Ile-Ife palaces and Ilesa history into one day.",
      "Use one city per major block and let current palace, museum and sacred-site access determine the exact order."
    ],
    "bestFor": [
      "Yoruba heritage",
      "UNESCO",
      "Royal history",
      "Road trips"
    ],
    "highlights": [
      {
        "name": "Osogbo",
        "detail": "Combine the Sacred Grove, Ataoja heritage and art."
      },
      {
        "name": "Ile-Ife",
        "detail": "Use palace, museum and Moremi sites for royal and artistic history."
      },
      {
        "name": "Ilesa",
        "detail": "Add Kiriji War Museum and Owa Obokun context."
      },
      {
        "name": "Nature option",
        "detail": "Erin-Ijesha is best treated as a separate physical outing."
      }
    ],
    "planning": [
      {
        "label": "Use multiple days",
        "detail": "Give each city enough time rather than racing."
      },
      {
        "label": "Respect sacred and royal sites",
        "detail": "Access rules matter."
      },
      {
        "label": "Check museum hours",
        "detail": "Do not assume every site opens daily."
      },
      {
        "label": "Plan road time",
        "detail": "City-to-city transfers should not consume heritage visits."
      }
    ],
    "source": {
      "label": "Osun State Government — Tourist Centres",
      "href": "https://www.osunstate.gov.ng/tourist-centres/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "south-south-heritage-road-trip",
    "title": "South-South Heritage Road Trip: Benin, Delta, Calabar & Bayelsa",
    "shortTitle": "South-South Heritage Road Trip",
    "kind": "itinerary",
    "region": "South-South Nigeria",
    "summary": "Build a multi-state South-South heritage route around Benin art, Delta history, Calabar museums and Bayelsa industrial heritage without pretending the distances fit a short weekend.",
    "intro": [
      "South-South Nigeria contains several nationally significant heritage stories, but the region is too large for a compressed checklist route.",
      "Use this as a multi-stage planning hub, choosing one or two state clusters per trip."
    ],
    "bestFor": [
      "History",
      "Art",
      "Museums",
      "Multi-state road trips"
    ],
    "highlights": [
      {
        "name": "Edo cluster",
        "detail": "Benin City links museum history with Igun Street craft."
      },
      {
        "name": "Delta cluster",
        "detail": "Koko and Asaba offer distinct colonial and trading heritage."
      },
      {
        "name": "Cross River cluster",
        "detail": "Calabar's Slave History Museum anchors a serious history visit."
      },
      {
        "name": "Bayelsa cluster",
        "detail": "Oloibiri and Akassa add oil and trading history."
      }
    ],
    "planning": [
      {
        "label": "Split the region into stages",
        "detail": "Do not attempt all four states in a short trip."
      },
      {
        "label": "Check road conditions",
        "detail": "Inter-state travel time can vary materially."
      },
      {
        "label": "Use daylight transfers",
        "detail": "Keep long journeys conservative."
      },
      {
        "label": "Respect sensitive history",
        "detail": "Use careful museum and local interpretation."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-historic-cities-guide",
    "title": "Historic Cities in Nigeria: Heritage Trip Planning Guide",
    "shortTitle": "Nigeria Historic Cities",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Compare Nigeria's major historic-city experiences by the type of heritage they offer—kingdoms, emirates, royal centres, museums, craft districts and civic landmarks.",
    "intro": [
      "Nigeria's historic cities cannot be reduced to one national itinerary because their heritage comes from different political, religious and artistic traditions.",
      "This hub helps travellers choose a city by interest, then move into the detailed museum, palace, craft and landmark guides already available."
    ],
    "bestFor": [
      "Historic cities",
      "Heritage",
      "Architecture",
      "Culture"
    ],
    "highlights": [
      {
        "name": "Benin City",
        "detail": "Strong for kingdom history, museum context and living bronze-casting tradition."
      },
      {
        "name": "Kano",
        "detail": "Strong for old-city, museum, hill and emirate heritage."
      },
      {
        "name": "Abeokuta and Ile-Ife",
        "detail": "Offer distinct Egba and Yoruba royal, craft and sacred histories."
      },
      {
        "name": "Sokoto",
        "detail": "Adds caliphate, palace and documentary-history context."
      }
    ],
    "planning": [
      {
        "label": "Choose by heritage theme",
        "detail": "Do not select a city only because it has the most landmarks."
      },
      {
        "label": "Use museums for context",
        "detail": "Museum visits can make palace and street heritage more meaningful."
      },
      {
        "label": "Respect living institutions",
        "detail": "Palaces, religious sites and craft districts are active places."
      },
      {
        "label": "Plan cities as separate trips",
        "detail": "Distances make a single compressed national heritage circuit unrealistic."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Culture and Heritage",
      "href": "https://fmino.gov.ng/culture/culture/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-wildlife-guide",
    "title": "Wildlife in Nigeria: Parks, Reserves & Responsible Viewing",
    "shortTitle": "Nigeria Wildlife",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Choose a Nigerian wildlife trip by ecosystem and access rather than expecting the same safari experience everywhere.",
    "intro": [
      "Nigeria's wildlife destinations range from savanna reserves to rainforest parks, and each requires different expectations about roads, guides and sightings.",
      "Wild animals are never guaranteed. The useful planning question is which protected landscape fits your route, season and comfort level."
    ],
    "bestFor": [
      "Wildlife",
      "National parks",
      "Conservation",
      "Nature"
    ],
    "highlights": [
      {
        "name": "Savanna wildlife",
        "detail": "Yankari and Kainji offer open-country wildlife and reserve experiences."
      },
      {
        "name": "Rainforest wildlife",
        "detail": "Cross River, Okomu and Afi focus more on forest biodiversity and conservation."
      },
      {
        "name": "Birding destinations",
        "detail": "Dagona and several parks reward patient bird-focused visits."
      },
      {
        "name": "Protected-area rules",
        "detail": "Guides, routes and current access matter more than a checklist of species."
      }
    ],
    "planning": [
      {
        "label": "Contact the park or reserve",
        "detail": "Confirm current entry, guides and routes before travel."
      },
      {
        "label": "Do not expect guaranteed sightings",
        "detail": "Wildlife activity changes by season and day."
      },
      {
        "label": "Keep distance",
        "detail": "Never feed or pursue animals for photographs."
      },
      {
        "label": "Prepare for the ecosystem",
        "detail": "Rainforest, wetland and savanna trips need different clothing and gear."
      }
    ],
    "source": {
      "label": "Nigeria Park Service — National Parks Overview",
      "href": "https://nigeriaparkservice.gov.ng/overview/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-birdwatching-guide",
    "title": "Birdwatching in Nigeria: Wetlands, Forests & Park Planning",
    "shortTitle": "Nigeria Birdwatching",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Plan birding trips around wetland, rainforest and savanna habitats while keeping disturbance low and access conditions current.",
    "intro": [
      "Nigeria's ecological variety creates strong birdwatching potential across wetlands, forests and national parks.",
      "A birding guide should prioritise habitat and quiet observation rather than promising specific sightings."
    ],
    "bestFor": [
      "Birding",
      "Wetlands",
      "Forests",
      "Conservation"
    ],
    "highlights": [
      {
        "name": "Dagona wetlands",
        "detail": "A major northern wetland birding destination when current conditions support travel."
      },
      {
        "name": "Rainforest birding",
        "detail": "Afi, Cross River and Okomu offer forest-focused habitat."
      },
      {
        "name": "Savanna parks",
        "detail": "Yankari and Kainji add open-country species and water-edge habitats."
      },
      {
        "name": "Seasonal movement",
        "detail": "Migratory patterns can change what is visible across the year."
      }
    ],
    "planning": [
      {
        "label": "Check access first",
        "detail": "Protected and security-sensitive areas need current confirmation."
      },
      {
        "label": "Keep quiet distance",
        "detail": "Avoid approaching nests or flushing birds."
      },
      {
        "label": "Use early hours",
        "detail": "Bird activity is often stronger earlier in the day."
      },
      {
        "label": "Bring optics",
        "detail": "Binoculars reduce the need to approach wildlife closely."
      }
    ],
    "source": {
      "label": "Nigeria Park Service — National Parks Overview",
      "href": "https://nigeriaparkservice.gov.ng/overview/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-rainforest-guide",
    "title": "Rainforests in Nigeria: Cross River, Okomu, Afi & Forest Trips",
    "shortTitle": "Nigeria Rainforests",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Compare Nigeria's major rainforest destinations by access, conservation focus and the level of trekking involved.",
    "intro": [
      "Nigeria's remaining major rainforest destinations are concentrated in a few important conservation landscapes, especially in Cross River and Edo.",
      "Forest visits demand realistic weather, trail and guide planning; they are not ordinary city-park walks."
    ],
    "bestFor": [
      "Rainforest",
      "Conservation",
      "Hiking",
      "Biodiversity"
    ],
    "highlights": [
      {
        "name": "Cross River National Park",
        "detail": "One of Nigeria's most important rainforest conservation landscapes."
      },
      {
        "name": "Afi Mountain",
        "detail": "Combines mountain forest and wildlife-conservation interest."
      },
      {
        "name": "Okomu",
        "detail": "Provides an Edo rainforest option closer to Benin City."
      },
      {
        "name": "Forest alternatives",
        "detail": "Akure and Ngwo offer different forest experiences outside national parks."
      }
    ],
    "planning": [
      {
        "label": "Prepare for rain",
        "detail": "Waterproofing and grip matter even outside peak wet season."
      },
      {
        "label": "Use recognised trails",
        "detail": "Do not enter dense forest independently."
      },
      {
        "label": "Carry insect protection",
        "detail": "Forest conditions differ from city tourism."
      },
      {
        "label": "Respect conservation rules",
        "detail": "Do not remove plants or disturb animals."
      }
    ],
    "source": {
      "label": "Nigeria Park Service — National Parks Overview",
      "href": "https://nigeriaparkservice.gov.ng/overview/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-savanna-nature-guide",
    "title": "Savanna Nature Trips in Nigeria: Wildlife, Rocks & Open Landscapes",
    "shortTitle": "Nigeria Savanna Nature",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Choose open-country nature trips across Nigeria's savanna belts by wildlife interest, heat tolerance and road logistics.",
    "intro": [
      "Savanna landscapes offer a different travel experience from Nigeria's rainforest and coastal regions, with more exposed terrain, seasonal water and long road approaches.",
      "The best destination depends on whether you want wildlife, rock landscapes or broad open-country scenery."
    ],
    "bestFor": [
      "Savanna",
      "Wildlife",
      "Road trips",
      "Landscape"
    ],
    "highlights": [
      {
        "name": "Yankari",
        "detail": "Combines savanna wildlife with Wikki Warm Spring."
      },
      {
        "name": "Kainji",
        "detail": "Adds lake, park and large-scale landscape."
      },
      {
        "name": "Plateau edges",
        "detail": "Rock and hill destinations create dramatic open-country scenery."
      },
      {
        "name": "Northern wetlands",
        "detail": "Dagona shows how wetland habitats can sit within a wider savanna region."
      }
    ],
    "planning": [
      {
        "label": "Plan for heat",
        "detail": "Carry water and avoid unnecessary midday exposure."
      },
      {
        "label": "Check seasonal access",
        "detail": "Rain can change roads and wildlife movement."
      },
      {
        "label": "Use protected-area guidance",
        "detail": "Stay on approved park routes."
      },
      {
        "label": "Keep road days conservative",
        "detail": "Distances can be longer than they appear on a map."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-archaeology-guide",
    "title": "Archaeological & Ancient Heritage Sites in Nigeria",
    "shortTitle": "Nigeria Archaeology",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Explore Nigeria's archaeology and ancient cultural landscapes through stone monoliths, caves, early watercraft heritage and UNESCO-listed sites.",
    "intro": [
      "Nigeria's archaeological heritage ranges from the Dufuna canoe story to Alok Ikom monoliths, cave landscapes and the ancient settlement systems preserved at Sukur.",
      "A good archaeology trip distinguishes physical evidence, oral tradition and later historical interpretation."
    ],
    "bestFor": [
      "Archaeology",
      "Ancient history",
      "Heritage",
      "Museums"
    ],
    "highlights": [
      {
        "name": "Dufuna canoe heritage",
        "detail": "One of the country's most important ancient-technology stories."
      },
      {
        "name": "Alok Ikom monoliths",
        "detail": "Carved stone heritage with strong archaeological significance."
      },
      {
        "name": "Cave landscapes",
        "detail": "Ogbunike and Arochukwu combine physical sites with long cultural histories."
      },
      {
        "name": "Sukur",
        "detail": "A UNESCO cultural landscape preserving settlement, palace and terrace systems."
      }
    ],
    "planning": [
      {
        "label": "Use credible interpretation",
        "detail": "Separate evidence from legend where necessary."
      },
      {
        "label": "Do not touch artefacts",
        "detail": "Protect fragile heritage material."
      },
      {
        "label": "Use local guides",
        "detail": "Community context is essential at living sites."
      },
      {
        "label": "Check access",
        "detail": "Archaeological sites may not operate like conventional museums."
      }
    ],
    "source": {
      "label": "UNESCO World Heritage Centre — Nigeria",
      "href": "https://whc.unesco.org/en/statesparties/ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-war-history-guide",
    "title": "War History Sites in Nigeria: Umuahia, Kiriji & Conflict Heritage",
    "shortTitle": "Nigeria War History",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Use Nigeria's war-history sites to understand different conflicts through museums, bunkers and regional interpretation rather than sensational storytelling.",
    "intro": [
      "Nigeria's conflict heritage spans very different periods, including the Nigerian Civil War and nineteenth-century Yoruba wars.",
      "These sites should be approached as historical interpretation spaces, not entertainment attractions."
    ],
    "bestFor": [
      "Military history",
      "Museums",
      "Modern history",
      "Education"
    ],
    "highlights": [
      {
        "name": "Umuahia",
        "detail": "The National War Museum and Ojukwu Bunker anchor Civil War interpretation."
      },
      {
        "name": "Kiriji War Museum",
        "detail": "Provides regional context for nineteenth-century Yoruba conflict."
      },
      {
        "name": "Museum-first planning",
        "detail": "Formal interpretation helps reduce historical simplification."
      },
      {
        "name": "Sensitive memory",
        "detail": "Conflict sites can carry personal and community significance."
      }
    ],
    "planning": [
      {
        "label": "Use credible sources",
        "detail": "Avoid sensational or partisan retellings."
      },
      {
        "label": "Confirm rehabilitation status",
        "detail": "Umuahia heritage work can affect access."
      },
      {
        "label": "Allow time to read",
        "detail": "These visits benefit from a slower pace."
      },
      {
        "label": "Photograph respectfully",
        "detail": "Follow museum and memorial rules."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Abia heritage restoration",
      "href": "https://fmino.gov.ng/federal-governments-war-museum-and-ojukwu-bunker-get-major-historical-preservation-boost-in-abia/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-colonial-history-guide",
    "title": "Colonial History Sites in Nigeria: Lagos, Lokoja, Delta & Akassa",
    "shortTitle": "Nigeria Colonial History",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Trace colonial-era history through civic spaces, prisons, trading sites and historic buildings while keeping the story grounded in local context.",
    "intro": [
      "Nigeria's colonial history is visible in very different site types, from Lagos civic landmarks to Lokoja's administrative history and Niger Delta trading heritage.",
      "A national hub helps connect those places without reducing the period to architecture alone."
    ],
    "bestFor": [
      "Colonial history",
      "Architecture",
      "Museums",
      "Heritage"
    ],
    "highlights": [
      {
        "name": "Lagos",
        "detail": "Freedom Park and Tafawa Balewa Square connect prison, civic and independence history."
      },
      {
        "name": "Lokoja",
        "detail": "The city's colonial heritage is closely tied to river geography and administration."
      },
      {
        "name": "Delta",
        "detail": "Mungo Park House and Nana Palace preserve different colonial-era narratives."
      },
      {
        "name": "Akassa",
        "detail": "Royal Niger Company heritage adds commercial and riverine context."
      }
    ],
    "planning": [
      {
        "label": "Use local interpretation",
        "detail": "Colonial history should include Nigerian perspectives."
      },
      {
        "label": "Check building access",
        "detail": "Historic structures may not all be open."
      },
      {
        "label": "Respect memorial context",
        "detail": "Some sites represent incarceration or conflict."
      },
      {
        "label": "Plan by region",
        "detail": "These places are spread across several states."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Culture and Heritage",
      "href": "https://fmino.gov.ng/culture/culture/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-industrial-heritage-guide",
    "title": "Industrial & Engineering Heritage in Nigeria: Oil, Dams & Infrastructure",
    "shortTitle": "Nigeria Industrial Heritage",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Explore Nigeria's industrial-history landmarks through oil heritage, major dams and working infrastructure while respecting operational restrictions.",
    "intro": [
      "Nigeria's industrial heritage includes petroleum history in Oloibiri and large engineering landmarks such as Kainji and Dadin Kowa.",
      "These sites differ from museums because some remain working infrastructure, making legal access and safety central to the visit."
    ],
    "bestFor": [
      "Engineering",
      "Industrial history",
      "Infrastructure",
      "Education"
    ],
    "highlights": [
      {
        "name": "Oloibiri",
        "detail": "Connects visitors with the history of commercial petroleum production."
      },
      {
        "name": "Kainji Dam",
        "detail": "A major national engineering and hydroelectric landmark."
      },
      {
        "name": "Dadin Kowa",
        "detail": "Adds dam, irrigation and power-generation context in Gombe."
      },
      {
        "name": "Working-site rules",
        "detail": "Operational areas may be restricted even when the landscape is visible."
      }
    ],
    "planning": [
      {
        "label": "Respect security barriers",
        "detail": "Do not cross operational boundaries."
      },
      {
        "label": "Confirm public viewpoints",
        "detail": "Use only recognised visitor areas."
      },
      {
        "label": "Do not assume tours",
        "detail": "Facility access must be explicitly permitted."
      },
      {
        "label": "Use daylight road plans",
        "detail": "Several sites require out-of-city travel."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-religious-heritage-guide",
    "title": "Religious Heritage in Nigeria: Mosques, Churches & Sacred Landscapes",
    "shortTitle": "Nigeria Religious Heritage",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Plan respectful visits to Nigeria's major religious landmarks and sacred landscapes by understanding worship, dress, photography and living traditions.",
    "intro": [
      "Nigeria's religious heritage includes major national worship centres, historic mosques and deeply rooted indigenous sacred landscapes.",
      "These are living religious places first and tourism sites second, so etiquette and access rules matter."
    ],
    "bestFor": [
      "Religious heritage",
      "Architecture",
      "Culture",
      "History"
    ],
    "highlights": [
      {
        "name": "National worship landmarks",
        "detail": "Abuja's National Mosque and Christian Centre represent formal national institutions."
      },
      {
        "name": "Historic Islamic centres",
        "detail": "Gobarau Minaret and Ilorin Central Mosque connect worship with urban heritage."
      },
      {
        "name": "Indigenous sacred landscapes",
        "detail": "Osun-Osogbo and Arochukwu require different forms of cultural respect."
      },
      {
        "name": "Living practice",
        "detail": "Prayer, ceremonies and local customs can change visitor access."
      }
    ],
    "planning": [
      {
        "label": "Dress appropriately",
        "detail": "Respect the norms of each site."
      },
      {
        "label": "Avoid disrupting worship",
        "detail": "Check service or prayer timing."
      },
      {
        "label": "Ask before photography",
        "detail": "Sacred spaces often restrict cameras."
      },
      {
        "label": "Accept closed areas",
        "detail": "Do not push past custodians or security."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Culture and Heritage",
      "href": "https://fmino.gov.ng/culture/culture/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-sacred-sites-guide",
    "title": "Sacred Sites in Nigeria: Groves, Caves, Shrines & Royal Landscapes",
    "shortTitle": "Nigeria Sacred Sites",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Approach Nigeria's sacred destinations as living cultural places with community rules, not as unrestricted attractions.",
    "intro": [
      "Sacred sites in Nigeria span forest groves, caves, shrines and royal-religious landscapes.",
      "Their visitor value depends on respecting community authority and understanding that some rituals or spaces are not open to tourists."
    ],
    "bestFor": [
      "Sacred heritage",
      "Culture",
      "History",
      "Responsible travel"
    ],
    "highlights": [
      {
        "name": "Osun-Osogbo",
        "detail": "A living sacred grove and UNESCO World Heritage property."
      },
      {
        "name": "Arochukwu",
        "detail": "A cave-temple landscape with deep historical and religious significance."
      },
      {
        "name": "Ogbunike",
        "detail": "A culturally significant cave system with local rules."
      },
      {
        "name": "Girmache",
        "detail": "A traditional shrine site where local permission is essential."
      }
    ],
    "planning": [
      {
        "label": "Use local custodians",
        "detail": "Do not arrive assuming unrestricted access."
      },
      {
        "label": "Ask before photography",
        "detail": "Sacred spaces and people may restrict cameras."
      },
      {
        "label": "Respect ritual boundaries",
        "detail": "Do not enter closed areas."
      },
      {
        "label": "Avoid sensational framing",
        "detail": "Describe beliefs and traditions carefully."
      }
    ],
    "source": {
      "label": "UNESCO World Heritage Centre — Nigeria",
      "href": "https://whc.unesco.org/en/statesparties/ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-afrobeat-heritage-guide",
    "title": "Afrobeat Heritage in Nigeria: Fela, Shrine & Lagos Culture",
    "shortTitle": "Nigeria Afrobeat Heritage",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Build an Afrobeat-focused Lagos trip around the New Afrika Shrine and wider cultural venues while planning around live events and late-night transport.",
    "intro": [
      "Afrobeat heritage in Nigeria is inseparable from Lagos and the Kuti family's continuing cultural presence.",
      "A focused guide should connect music history with current live culture instead of treating Fela's legacy as a static museum topic."
    ],
    "bestFor": [
      "Afrobeat",
      "Music history",
      "Lagos nightlife",
      "Culture"
    ],
    "highlights": [
      {
        "name": "New Afrika Shrine",
        "detail": "The central living venue for the Kuti legacy and major Felabration programming."
      },
      {
        "name": "Felabration",
        "detail": "The annual festival combines music, debate, fashion, dance and art."
      },
      {
        "name": "National Theatre",
        "detail": "Provides a broader performing-arts context within Lagos."
      },
      {
        "name": "Freedom Park",
        "detail": "Adds another active cultural venue with heritage depth."
      }
    ],
    "planning": [
      {
        "label": "Check event schedules",
        "detail": "Music venues are programme-driven."
      },
      {
        "label": "Plan late transport",
        "detail": "Night events require a reliable return option."
      },
      {
        "label": "Expect crowds",
        "detail": "Felabration and major shows need extra time."
      },
      {
        "label": "Protect valuables",
        "detail": "Use normal busy-event precautions."
      }
    ],
    "source": {
      "label": "Voice of Nigeria — Felabration and New Afrika Shrine",
      "href": "https://von.gov.ng/felabration-promotes-nigerian-culture-yeni-kuti/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-performing-arts-guide",
    "title": "Performing Arts Destinations in Nigeria: Theatre, Music & Culture",
    "shortTitle": "Nigeria Performing Arts",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Choose performing-arts venues and culture centres by programme rather than treating them as static landmarks.",
    "intro": [
      "Nigeria's performing-arts destinations include national institutions, culture centres and live music venues.",
      "The experience changes by date, so event calendars and public programmes should decide when and why to visit."
    ],
    "bestFor": [
      "Theatre",
      "Live music",
      "Dance",
      "Culture"
    ],
    "highlights": [
      {
        "name": "National Theatre",
        "detail": "Nigeria's foremost national performing-arts institution with an active 2026 calendar."
      },
      {
        "name": "Freedom Park",
        "detail": "Combines live culture with a historic Lagos setting."
      },
      {
        "name": "New Afrika Shrine",
        "detail": "A leading live-music venue tied to Afrobeat heritage."
      },
      {
        "name": "State culture centres",
        "detail": "Uyo and other capitals can offer regional performance programmes."
      }
    ],
    "planning": [
      {
        "label": "Check the programme first",
        "detail": "Do not travel for a venue name alone."
      },
      {
        "label": "Buy or reserve where needed",
        "detail": "Ticketing differs by event."
      },
      {
        "label": "Plan late transport",
        "detail": "Performances may finish after normal daytime travel."
      },
      {
        "label": "Follow recording rules",
        "detail": "Shows may restrict photography or video."
      }
    ],
    "source": {
      "label": "National Theatre Nigeria — official site",
      "href": "https://nationaltheatre.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-textile-craft-guide",
    "title": "Textile & Craft Heritage in Nigeria: Adire, Bronze, Pottery & Art",
    "shortTitle": "Nigeria Textile & Craft",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Plan craft-focused travel around working makers, markets and art centres where technique and provenance matter as much as shopping.",
    "intro": [
      "Nigeria's craft destinations cover textiles, bronze, pottery and mixed visual arts, with strong regional traditions.",
      "A craft trip becomes more valuable when visitors ask who made an item and how it was produced."
    ],
    "bestFor": [
      "Textiles",
      "Craft",
      "Art",
      "Shopping"
    ],
    "highlights": [
      {
        "name": "Itoku",
        "detail": "Abeokuta's best-known adire market and textile destination."
      },
      {
        "name": "Igun Street",
        "detail": "Living bronze-casting tradition in Benin City."
      },
      {
        "name": "Suleja",
        "detail": "Ladi Kwali pottery heritage adds a ceramic tradition."
      },
      {
        "name": "Osogbo and Lagos",
        "detail": "Nike centres connect gallery and workshop experiences."
      }
    ],
    "planning": [
      {
        "label": "Ask about provenance",
        "detail": "Understand who made a piece."
      },
      {
        "label": "Compare quality",
        "detail": "Do not assume all market goods are equivalent."
      },
      {
        "label": "Ask before photography",
        "detail": "Workshops may restrict cameras."
      },
      {
        "label": "Plan transport",
        "detail": "Fragile or large purchases need careful packing."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Culture and Heritage",
      "href": "https://fmino.gov.ng/culture/culture/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-river-landscapes-guide",
    "title": "River Landscapes in Nigeria: Confluences, Waterfronts & River Cities",
    "shortTitle": "Nigeria River Landscapes",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Explore Nigeria's river landscapes through Lokoja, Makurdi, Igbokoda and the River Ethiope while treating boat activity as optional and safety-dependent.",
    "intro": [
      "Nigeria's major river destinations offer geography, city identity and cultural history rather than one standard leisure experience.",
      "A river guide should separate land-based viewing from boating and swimming."
    ],
    "bestFor": [
      "Rivers",
      "Geography",
      "Waterfronts",
      "Photography"
    ],
    "highlights": [
      {
        "name": "Lokoja confluence",
        "detail": "The Niger-Benue meeting point is one of the country's defining geographic landmarks."
      },
      {
        "name": "Makurdi",
        "detail": "The River Benue shapes the city's identity and waterfront."
      },
      {
        "name": "Igbokoda",
        "detail": "Provides a riverine coastal-community setting in Ondo."
      },
      {
        "name": "River Ethiope",
        "detail": "Adds a spring-fed river origin story in Delta."
      }
    ],
    "planning": [
      {
        "label": "Do not depend on a boat",
        "detail": "Build a strong land-based plan first."
      },
      {
        "label": "Verify life jackets",
        "detail": "Use proper safety equipment on water."
      },
      {
        "label": "Check weather",
        "detail": "Rain and wind can change water plans."
      },
      {
        "label": "Plan the return",
        "detail": "Know how you are getting back before staying late."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-dams-engineering-guide",
    "title": "Dams & Engineering Landmarks in Nigeria: Kainji, Dadin Kowa & More",
    "shortTitle": "Nigeria Dams & Engineering",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Compare major Nigerian dam and engineering landmarks while respecting working-infrastructure access restrictions.",
    "intro": [
      "Large dams are visually impressive but remain operational infrastructure, making them different from ordinary attractions.",
      "The right visitor approach is public viewpoints, engineering context and strict respect for security boundaries."
    ],
    "bestFor": [
      "Engineering",
      "Infrastructure",
      "Landscapes",
      "Education"
    ],
    "highlights": [
      {
        "name": "Kainji Dam",
        "detail": "A major hydroelectric and reservoir landmark."
      },
      {
        "name": "Dadin Kowa",
        "detail": "Adds power and irrigation context in Gombe."
      },
      {
        "name": "Reservoir landscapes",
        "detail": "Large water bodies create scenic value beyond the structures themselves."
      },
      {
        "name": "Operational restrictions",
        "detail": "Working facilities may close or limit visitor access."
      }
    ],
    "planning": [
      {
        "label": "Stay outside restricted areas",
        "detail": "Never cross security barriers."
      },
      {
        "label": "Confirm public viewpoints",
        "detail": "Ask where visitors may legally stop."
      },
      {
        "label": "Do not assume facility tours",
        "detail": "Only enter operational areas with explicit permission."
      },
      {
        "label": "Keep photography rules in mind",
        "detail": "Infrastructure sites may restrict cameras."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-civic-landmarks-guide",
    "title": "Civic Landmarks in Nigeria: Squares, Halls & National Spaces",
    "shortTitle": "Nigeria Civic Landmarks",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Explore Nigerian civic landmarks through independence squares, historic halls and national public spaces with current event and security access checked first.",
    "intro": [
      "Civic landmarks tell stories about independence, public life and urban identity that are different from palaces, museums or religious sites.",
      "Many remain active event spaces, so access can change without the landmark itself closing permanently."
    ],
    "bestFor": [
      "Civic history",
      "Architecture",
      "National landmarks",
      "Urban heritage"
    ],
    "highlights": [
      {
        "name": "Tafawa Balewa Square",
        "detail": "A major independence and national-event landmark in Lagos."
      },
      {
        "name": "Centenary Hall",
        "detail": "Abeokuta civic heritage within the Ake cluster."
      },
      {
        "name": "Millennium Park",
        "detail": "A modern national-capital public space in Abuja."
      },
      {
        "name": "National Theatre",
        "detail": "Combines civic cultural identity with active performing arts."
      }
    ],
    "planning": [
      {
        "label": "Check event access",
        "detail": "Large events can close parts of a site."
      },
      {
        "label": "Follow security instructions",
        "detail": "National spaces may have controlled areas."
      },
      {
        "label": "Use daylight",
        "detail": "Architecture and context are easier to appreciate."
      },
      {
        "label": "Pair nearby sites",
        "detail": "Keep city heritage routes compact."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Culture and Heritage",
      "href": "https://fmino.gov.ng/culture/culture/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-independence-history-guide",
    "title": "Nigeria Independence History Sites: Lagos Civic Heritage Guide",
    "shortTitle": "Nigeria Independence History",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Use Lagos's civic and museum landmarks to build a focused independence-history route grounded in public history rather than symbolism alone.",
    "intro": [
      "Nigeria's independence story has a strong physical footprint in Lagos through national civic sites and museum collections.",
      "A focused guide links the square, museum and surrounding heritage so visitors can understand the political setting rather than only photograph monuments."
    ],
    "bestFor": [
      "Independence history",
      "Lagos",
      "Civic heritage",
      "Museums"
    ],
    "highlights": [
      {
        "name": "Tafawa Balewa Square",
        "detail": "Closely associated with national independence history and later state events."
      },
      {
        "name": "National Museum",
        "detail": "Provides broader historical context beyond one ceremony or monument."
      },
      {
        "name": "Freedom Park",
        "detail": "Adds colonial prison memory to the city's political history."
      },
      {
        "name": "Historic Lagos Island",
        "detail": "The concentration of sites makes a compact heritage day possible."
      }
    ],
    "planning": [
      {
        "label": "Check event restrictions",
        "detail": "TBS access can change."
      },
      {
        "label": "Start with museum context",
        "detail": "Collections help frame later outdoor landmarks."
      },
      {
        "label": "Use daylight",
        "detail": "Keep the route easy to navigate."
      },
      {
        "label": "Avoid oversimplifying history",
        "detail": "Use credible historical interpretation."
      }
    ],
    "source": {
      "label": "Lagos State Ministry of Tourism, Arts & Culture",
      "href": "https://tourismartandculture.lagosstate.gov.ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-caliphate-heritage-guide",
    "title": "Caliphate & Emirate Heritage in Nigeria: Sokoto, Gwandu, Katsina & Kano",
    "shortTitle": "Nigeria Caliphate Heritage",
    "kind": "destination",
    "region": "Northern Nigeria",
    "summary": "Explore northern Nigeria's caliphate and emirate heritage through palaces, historic mosques, tombs and documentary institutions with respectful access.",
    "intro": [
      "Northern Nigeria's traditional institutions are connected through complex histories of emirates, scholarship, religion and the Sokoto Caliphate.",
      "A regional guide should distinguish living institutions from museum-style attractions and make etiquette central."
    ],
    "bestFor": [
      "Islamic history",
      "Caliphate heritage",
      "Emirates",
      "Architecture"
    ],
    "highlights": [
      {
        "name": "Sokoto",
        "detail": "The Sultanate area and History Bureau anchor caliphate history."
      },
      {
        "name": "Gwandu",
        "detail": "Hubbare connects visitors with Abdullahi dan Fodio heritage."
      },
      {
        "name": "Katsina",
        "detail": "Gobarau and the Emir's Palace add older emirate and scholarly context."
      },
      {
        "name": "Kano",
        "detail": "Gidan Makama and old-city heritage broaden the northern historical picture."
      }
    ],
    "planning": [
      {
        "label": "Dress respectfully",
        "detail": "Traditional and religious sites require appropriate clothing."
      },
      {
        "label": "Ask before photography",
        "detail": "Palaces and mosques may restrict cameras."
      },
      {
        "label": "Check current access",
        "detail": "Living institutions can close areas."
      },
      {
        "label": "Use local guides",
        "detail": "Regional history benefits from knowledgeable interpretation."
      }
    ],
    "source": {
      "label": "Sokoto State Government — History of Sokoto",
      "href": "https://sokotostate.gov.ng/history-of-sokoto/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-yoruba-heritage-guide",
    "title": "Yoruba Heritage Sites in Nigeria: Ife, Osogbo, Abeokuta, Owo & Ilesa",
    "shortTitle": "Nigeria Yoruba Heritage",
    "kind": "destination",
    "region": "Southwest Nigeria",
    "summary": "Compare major Yoruba heritage centres through royal institutions, sacred landscapes, museums, craft traditions and conflict history.",
    "intro": [
      "Yoruba heritage is distributed across multiple cities and traditions rather than centred in one attraction.",
      "A regional hub helps travellers choose between sacred Osogbo, royal Ile-Ife, Egba Abeokuta, Owo museum heritage and Ilesa history."
    ],
    "bestFor": [
      "Yoruba heritage",
      "Royal history",
      "Sacred sites",
      "Craft"
    ],
    "highlights": [
      {
        "name": "Ile-Ife",
        "detail": "Palace, museum and Moremi heritage anchor royal and artistic history."
      },
      {
        "name": "Osogbo",
        "detail": "The Sacred Grove, palace and art centre connect religion, royalty and creativity."
      },
      {
        "name": "Abeokuta",
        "detail": "Olumo, Itoku and Alake heritage tell an Egba city story."
      },
      {
        "name": "Owo and Ilesa",
        "detail": "Museums and war-history sites broaden the regional picture."
      }
    ],
    "planning": [
      {
        "label": "Use multiple days",
        "detail": "Do not compress major cities into one route."
      },
      {
        "label": "Respect sacred and royal spaces",
        "detail": "Access and photography rules matter."
      },
      {
        "label": "Use museums for context",
        "detail": "They deepen outdoor-site visits."
      },
      {
        "label": "Plan road time",
        "detail": "Southwest city transfers can be slower than expected."
      }
    ],
    "source": {
      "label": "Osun State Government — Tourist Centres",
      "href": "https://www.osunstate.gov.ng/tourist-centres/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-cultural-landscapes-guide",
    "title": "Cultural Landscapes in Nigeria: Heritage Shaped by People & Place",
    "shortTitle": "Nigeria Cultural Landscapes",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Explore places where landscape, settlement, religion and history are inseparable—from Sukur and Osun-Osogbo to Idanre and Arochukwu.",
    "intro": [
      "Cultural landscapes differ from isolated monuments because their heritage value comes from the relationship between people, land and long-term use.",
      "Nigeria's UNESCO and Tentative List sites provide strong examples across forest, hill, settlement and sacred landscapes."
    ],
    "bestFor": [
      "Cultural landscapes",
      "UNESCO",
      "History",
      "Geography"
    ],
    "highlights": [
      {
        "name": "Sukur",
        "detail": "Terraces, palace and settlement form an integrated UNESCO landscape."
      },
      {
        "name": "Osun-Osogbo",
        "detail": "Sacred forest, river and art create a living religious landscape."
      },
      {
        "name": "Idanre",
        "detail": "Hilltop settlement history sits within dramatic geology."
      },
      {
        "name": "Arochukwu",
        "detail": "Cave-temple heritage is tied to a wider historic cultural route."
      }
    ],
    "planning": [
      {
        "label": "Think beyond one monument",
        "detail": "Give time to the surrounding landscape."
      },
      {
        "label": "Use local interpretation",
        "detail": "Community history is central."
      },
      {
        "label": "Respect living traditions",
        "detail": "These are not abandoned heritage zones."
      },
      {
        "label": "Check UNESCO status",
        "detail": "Distinguish inscribed and tentative sites."
      }
    ],
    "source": {
      "label": "UNESCO World Heritage Centre — Nigeria",
      "href": "https://whc.unesco.org/en/statesparties/ng/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-forest-walks-guide",
    "title": "Forest Walks in Nigeria: Rainforest, Pine Forest & Reserve Trips",
    "shortTitle": "Nigeria Forest Walks",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Choose forest walks by trail difficulty, ecosystem and guide needs, from Ngwo's pine landscape to rainforest reserves.",
    "intro": [
      "Nigeria's forest outings range from relatively accessible scenic forests to protected rainforest requiring formal park arrangements.",
      "The experience should be selected by trail conditions and access, not just scenery."
    ],
    "bestFor": [
      "Forest walks",
      "Hiking",
      "Nature",
      "Photography"
    ],
    "highlights": [
      {
        "name": "Ngwo",
        "detail": "A distinctive pine-forest outing near Enugu."
      },
      {
        "name": "Cross River",
        "detail": "Protected rainforest with higher planning demands."
      },
      {
        "name": "Okomu",
        "detail": "Rainforest conservation close enough to pair with an Edo trip."
      },
      {
        "name": "Akure and Afi",
        "detail": "Offer additional forest and mountain-forest settings."
      }
    ],
    "planning": [
      {
        "label": "Check trail access",
        "detail": "Some reserves require guides or permission."
      },
      {
        "label": "Prepare for rain",
        "detail": "Forest surfaces can stay wet."
      },
      {
        "label": "Carry insect protection",
        "detail": "Natural forest conditions differ from urban parks."
      },
      {
        "label": "Leave no trace",
        "detail": "Do not remove plants or litter."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-city-parks-guide",
    "title": "City Parks in Nigeria: Relaxed Green Spaces for Short Visits",
    "shortTitle": "Nigeria City Parks",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Compare easy urban green-space stops in Abuja, Ibadan, Ilorin, Ado-Ekiti and Port Harcourt for low-complexity city outings.",
    "intro": [
      "Not every trip needs a remote waterfall or long road day. Nigeria's urban parks provide simpler outdoor breaks that fit city schedules.",
      "A city-park hub helps travellers choose a low-logistics option near museums, food or accommodation."
    ],
    "bestFor": [
      "Parks",
      "Families",
      "Relaxed outings",
      "Cities"
    ],
    "highlights": [
      {
        "name": "Millennium Park",
        "detail": "Central Abuja green space near national landmarks."
      },
      {
        "name": "Agodi Gardens",
        "detail": "A major Ibadan recreation option."
      },
      {
        "name": "Fajuyi Memorial Park",
        "detail": "Combines Ado-Ekiti green space with civic history."
      },
      {
        "name": "Pleasure Park and Flower Garden",
        "detail": "Port Harcourt and Ilorin add different recreation styles."
      }
    ],
    "planning": [
      {
        "label": "Check current opening",
        "detail": "Maintenance or events can change access."
      },
      {
        "label": "Use cooler hours",
        "detail": "Outdoor comfort improves in morning or late afternoon."
      },
      {
        "label": "Watch rain",
        "detail": "Have an indoor alternative."
      },
      {
        "label": "Keep the route local",
        "detail": "Use parks as city stops, not reasons for long detours."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "southwest-craft-road-trip",
    "title": "Southwest Craft Road Trip: Adire, Art, Royal Heritage & Makers",
    "shortTitle": "Southwest Craft Road Trip",
    "kind": "itinerary",
    "region": "Southwest Nigeria",
    "summary": "Build a craft-focused Southwest trip around Abeokuta adire, Osogbo art and Ile-Ife heritage instead of treating craft shopping as isolated stops.",
    "intro": [
      "Southwest Nigeria offers a strong craft-and-art route through cities with distinct textile, gallery and royal traditions.",
      "Use separate city blocks so making, buying and historical context each get enough time."
    ],
    "bestFor": [
      "Craft",
      "Art",
      "Textiles",
      "Road trips"
    ],
    "highlights": [
      {
        "name": "Abeokuta",
        "detail": "Itoku and Olumo connect textile craft with city history."
      },
      {
        "name": "Osogbo",
        "detail": "Nike Art Centre adds workshop and gallery traditions."
      },
      {
        "name": "Ile-Ife",
        "detail": "Museum and palace context deepen the region's artistic history."
      },
      {
        "name": "Maker focus",
        "detail": "Ask about artists and techniques rather than buying anonymously."
      }
    ],
    "planning": [
      {
        "label": "Use multiple days",
        "detail": "Do not rush three heritage cities."
      },
      {
        "label": "Protect purchases",
        "detail": "Plan packaging for textiles and art."
      },
      {
        "label": "Ask before photography",
        "detail": "Workshops and palace areas may restrict cameras."
      },
      {
        "label": "Plan road time",
        "detail": "Allow realistic inter-city transfers."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Culture and Heritage",
      "href": "https://fmino.gov.ng/culture/culture/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "southwest-museum-road-trip",
    "title": "Southwest Museum Road Trip: Lagos, Ibadan, Ife & Owo",
    "shortTitle": "Southwest Museum Road Trip",
    "kind": "itinerary",
    "region": "Southwest Nigeria",
    "summary": "Plan a museum-focused Southwest route that moves from national collections to Yoruba art, regional history and kingdom heritage.",
    "intro": [
      "Southwest Nigeria contains several museums with different collection strengths, making a museum road trip more meaningful than repeating similar city sightseeing.",
      "Use one museum as an anchor per city and pair it with a nearby heritage site."
    ],
    "bestFor": [
      "Museums",
      "History",
      "Art",
      "Road trips"
    ],
    "highlights": [
      {
        "name": "Lagos",
        "detail": "National collections provide a broad opening context."
      },
      {
        "name": "Ibadan",
        "detail": "National Museum of Unity expands the national cultural frame."
      },
      {
        "name": "Ile-Ife",
        "detail": "Museum collections connect closely with royal and artistic heritage."
      },
      {
        "name": "Owo",
        "detail": "Adds a distinct kingdom and antiquities focus."
      }
    ],
    "planning": [
      {
        "label": "Check opening days",
        "detail": "Museum schedules can differ."
      },
      {
        "label": "Follow photography rules",
        "detail": "Collection policies vary."
      },
      {
        "label": "Use nearby heritage",
        "detail": "Pair each museum with one relevant local site."
      },
      {
        "label": "Do not rush cities",
        "detail": "Allow interpretation time."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Culture and Heritage",
      "href": "https://fmino.gov.ng/culture/culture/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "north-central-rocks-waterfalls-road-trip",
    "title": "North-Central Rocks & Waterfalls Road Trip: Niger, Kwara & Nasarawa",
    "shortTitle": "North-Central Rocks & Waterfalls",
    "kind": "itinerary",
    "region": "North-Central Nigeria",
    "summary": "Plan a multi-stage North-Central nature route around Zuma Rock, Gurara, Owu Falls, Farin Ruwa and Ara Rock without compressing long rural drives.",
    "intro": [
      "North-Central Nigeria has a strong cluster of rock and waterfall destinations, but they sit across multiple states and cannot be treated as one weekend loop.",
      "Use the guide to choose a regional segment rather than chasing every landmark."
    ],
    "bestFor": [
      "Waterfalls",
      "Rock formations",
      "Road trips",
      "Nature"
    ],
    "highlights": [
      {
        "name": "Niger axis",
        "detail": "Zuma Rock and Gurara Falls form the most accessible FCT-adjacent cluster."
      },
      {
        "name": "Kwara",
        "detail": "Owu Falls requires its own rural road-day."
      },
      {
        "name": "Nasarawa",
        "detail": "Farin Ruwa and Ara Rock create another distinct nature segment."
      },
      {
        "name": "Route discipline",
        "detail": "The distances make state-by-state planning essential."
      }
    ],
    "planning": [
      {
        "label": "Choose one state cluster",
        "detail": "Do not force all destinations into one trip."
      },
      {
        "label": "Check recent rain",
        "detail": "Waterfall and road conditions change."
      },
      {
        "label": "Travel in daylight",
        "detail": "Rural return timing matters."
      },
      {
        "label": "Use local directions",
        "detail": "Final approaches may not be obvious from maps."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "southeast-caves-lakes-road-trip",
    "title": "Southeast Caves & Lakes Road Trip: Anambra, Imo & Ebonyi",
    "shortTitle": "Southeast Caves & Lakes",
    "kind": "itinerary",
    "region": "Southeast Nigeria",
    "summary": "Build a Southeast nature route around caves, lakes and waterfalls while keeping each state's rural travel time realistic.",
    "intro": [
      "Southeast Nigeria offers several strong cave and lake destinations, but the best route is staged rather than compressed across state lines.",
      "Use Anambra for caves and lake heritage, Imo for Oguta, and Ebonyi for cave and beach alternatives."
    ],
    "bestFor": [
      "Caves",
      "Lakes",
      "Waterfalls",
      "Road trips"
    ],
    "highlights": [
      {
        "name": "Anambra",
        "detail": "Ogbunike, Agulu and Owerre-Ezukala create a strong nature cluster."
      },
      {
        "name": "Imo",
        "detail": "Oguta Lake provides a slower water-focused stop."
      },
      {
        "name": "Ebonyi",
        "detail": "Amanchor and Oferekpe add cave and river-beach variety."
      },
      {
        "name": "State-by-state pace",
        "detail": "Use overnight bases rather than rushing interstate transfers."
      }
    ],
    "planning": [
      {
        "label": "Use local guides for caves",
        "detail": "Do not enter unfamiliar cave sections alone."
      },
      {
        "label": "Check rainfall",
        "detail": "Wet weather changes roads and natural surfaces."
      },
      {
        "label": "Do not assume swimming safety",
        "detail": "Lake and beach conditions vary."
      },
      {
        "label": "Plan multiple days",
        "detail": "The region is too broad for a single-day circuit."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "south-south-waterfront-heritage-route",
    "title": "South-South Waterfront & Heritage Route: Bayelsa, Delta, Calabar & Uyo",
    "shortTitle": "South-South Waterfront Heritage",
    "kind": "itinerary",
    "region": "South-South Nigeria",
    "summary": "Plan a staged South-South route combining riverine landscapes, coastal heritage and museums without pretending the region fits one short trip.",
    "intro": [
      "South-South Nigeria's relationship with water runs through coastal communities, trading history, petroleum heritage and river cities.",
      "The route works best as separate state clusters linked by a broader regional theme."
    ],
    "bestFor": [
      "Waterfronts",
      "Heritage",
      "Coast",
      "Multi-state trips"
    ],
    "highlights": [
      {
        "name": "Bayelsa",
        "detail": "Yenagoa lake leisure and Oloibiri/Akassa history."
      },
      {
        "name": "Delta",
        "detail": "Koko, Asaba and the River Ethiope add trading and river heritage."
      },
      {
        "name": "Cross River",
        "detail": "Calabar connects waterfront leisure with slavery-history interpretation."
      },
      {
        "name": "Akwa Ibom",
        "detail": "Ibeno and Ikot Abasi add Atlantic coast and heritage."
      }
    ],
    "planning": [
      {
        "label": "Split the route by state",
        "detail": "Do not drive the full region as one short itinerary."
      },
      {
        "label": "Check water transport",
        "detail": "Some riverine access may require boats."
      },
      {
        "label": "Use daylight transfers",
        "detail": "Keep long journeys conservative."
      },
      {
        "label": "Respect sensitive history",
        "detail": "Use careful museum and local interpretation."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "northwest-heritage-road-trip",
    "title": "Northwest Heritage Road Trip: Kano, Katsina, Sokoto, Kebbi & Zaria",
    "shortTitle": "Northwest Heritage Road Trip",
    "kind": "itinerary",
    "region": "Northwest Nigeria",
    "summary": "Build a Northwest heritage route around old cities, emirate history, museums and caliphate sites while checking current route conditions state by state.",
    "intro": [
      "Northwest Nigeria contains some of the country's strongest old-city and traditional-institution heritage, but distances and current conditions require staged travel.",
      "Use major cities as bases and avoid treating the region as one continuous sightseeing loop."
    ],
    "bestFor": [
      "Old cities",
      "Islamic heritage",
      "Museums",
      "Road trips"
    ],
    "highlights": [
      {
        "name": "Kano",
        "detail": "Gidan Makama and Dala anchor old-city history."
      },
      {
        "name": "Katsina",
        "detail": "Gobarau and the Emir's Palace add scholarly and royal heritage."
      },
      {
        "name": "Sokoto and Kebbi",
        "detail": "Caliphate history extends through palace, bureau and Gwandu sites."
      },
      {
        "name": "Zaria",
        "detail": "City walls and Kufena Hills add another historic-city cluster."
      }
    ],
    "planning": [
      {
        "label": "Check current conditions",
        "detail": "Route suitability can change by state."
      },
      {
        "label": "Respect worship and royal sites",
        "detail": "Dress and photography rules matter."
      },
      {
        "label": "Use daylight road travel",
        "detail": "Keep inter-city transfers conservative."
      },
      {
        "label": "Plan multiple bases",
        "detail": "The region is too large for one hotel base."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Culture and Heritage",
      "href": "https://fmino.gov.ng/culture/culture/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "northern-museums-heritage-route",
    "title": "Northern Nigeria Museums & Heritage Route: Kano, Kebbi, Sokoto & Zamfara",
    "shortTitle": "Northern Museums Heritage",
    "kind": "itinerary",
    "region": "Northern Nigeria",
    "summary": "Plan a museum-and-documentary heritage route through northern cities while using current security and opening information for each state.",
    "intro": [
      "Northern Nigeria's museum and heritage institutions provide valuable indoor and documentary context alongside palaces and old-city landmarks.",
      "A route focused on museums can be more resilient than a nature-heavy itinerary when rural access is uncertain."
    ],
    "bestFor": [
      "Museums",
      "History",
      "Northern heritage",
      "Research"
    ],
    "highlights": [
      {
        "name": "Kano",
        "detail": "Gidan Makama provides old-city historical framing."
      },
      {
        "name": "Kebbi",
        "detail": "Kanta Museum anchors Argungu heritage."
      },
      {
        "name": "Sokoto",
        "detail": "The History Bureau adds documentary depth to caliphate history."
      },
      {
        "name": "Zamfara",
        "detail": "The state museum offers a city-based cultural alternative to rural travel."
      }
    ],
    "planning": [
      {
        "label": "Check opening first",
        "detail": "Administrative and museum schedules vary."
      },
      {
        "label": "Check security by city",
        "detail": "Do not rely on old route assumptions."
      },
      {
        "label": "Follow photography rules",
        "detail": "Collections may restrict cameras."
      },
      {
        "label": "Use museums as anchors",
        "detail": "Add palaces or landmarks only when current access is suitable."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Culture and Heritage",
      "href": "https://fmino.gov.ng/culture/culture/"
    },
    "lastReviewed": "2026-10-05"
  },
  {
    "slug": "nigeria-scenic-viewpoints-guide",
    "title": "Best Scenic Viewpoints in Nigeria: Hills, Towers & Rock Landscapes",
    "shortTitle": "Nigeria Scenic Viewpoints",
    "kind": "destination",
    "region": "Nigeria",
    "summary": "Choose scenic viewpoints by access and physical effort, from city towers and hills to major highland road trips.",
    "intro": [
      "Nigeria's best viewpoints range from short city climbs to remote mountains, so the key comparison is effort and logistics rather than just elevation.",
      "A viewpoint guide helps travellers avoid treating every scenic place as a full hiking expedition."
    ],
    "bestFor": [
      "Views",
      "Photography",
      "Hills",
      "Landscapes"
    ],
    "highlights": [
      {
        "name": "City viewpoints",
        "detail": "Bower's Tower, Dala Hill and Mount Patti fit shorter urban or city-edge visits."
      },
      {
        "name": "Rock viewpoints",
        "detail": "Olumo and Riyom offer very different geology-focused experiences."
      },
      {
        "name": "Highland views",
        "detail": "Mambilla and Obudu require larger road-trip commitments."
      },
      {
        "name": "Weather dependence",
        "detail": "Mist or heavy rain can remove the main benefit of a viewpoint."
      }
    ],
    "planning": [
      {
        "label": "Check visibility",
        "detail": "Do not force a viewpoint in poor weather."
      },
      {
        "label": "Match effort to fitness",
        "detail": "Some stops involve significant stairs or hiking."
      },
      {
        "label": "Use daylight",
        "detail": "Views and footing are better before dark."
      },
      {
        "label": "Carry water",
        "detail": "Do not assume summit services."
      }
    ],
    "source": {
      "label": "Federal Ministry of Information — Tourism",
      "href": "https://fmino.gov.ng/culture/tourism/"
    },
    "lastReviewed": "2026-10-05"
  }
];

export function getExploreGuide(slug: string) {
  return exploreGuides.find((guide) => guide.slug === slug);
}
