export interface HeroPolaroid {
  id: number;
  src: string;
  alt: string;
  caption: string;
  tag: string;
  initialX: number; // percentage
  initialY: number; // percentage
  targetX: number;  // px translation
  targetY: number;  // px translation
  rotation: number; // deg
  scale: number;
}

export interface ExpeditionRegion {
  id: string;
  name: string;
  maoriName: string;
  tagline: string;
  coordinates: string;
  lat: number;
  lng: number;
  mapPinPos: { top: string; left: string }; // percentage on map
  highlights: string[];
  description: string;
  duration: string;
  season: string;
  vesselAir: string;
  heroImage: string;
  badge: string;
  featuredLodge: string;
}

export interface SanctuaryFeature {
  title: string;
  subtitle: string;
  description: string;
  iconName: "Compass" | "Sparkles" | "Shield" | "Wind";
}

export interface EditorialArticle {
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  body: string[];
  image: string;
  imageAlt: string;
  pullQuote?: string;
  accentText?: string;
}

export interface JournalEntry {
  id: string;
  type: "review" | "log";
  source: string;
  location: string;
  dateOrIssue: string;
  quote: string;
  authorOrVessel: string;
  rating?: number;
  image?: string;
}

export const HERO_STORY_DATA = {
  overline: "AMMAR LUXURY EXPEDITIONS AOTEAROA",
  titlePrimary: "Adventure For The",
  titleSecondary: "Restless Soul",
  tagline: "Set sail aboard a private luxury expedition yacht and helicopter to the furthest reaches of New Zealand...",
  quoteWords: [
    "A", "bespoke", "exploration", "of", "New", "Zealand’s",
    "remote", "fjords,", "glaciated", "alpine", "peaks,",
    "and", "private", "wilderness", "sanctuaries."
  ],
  polaroids: [
    {
      id: 1,
      src: "/hero/1.webp",
      alt: "Aoraki / Mount Cook private glacier heli-landing",
      caption: "Aoraki Glacial Flight",
      tag: "43.5950° S, 170.1418° E",
      initialX: 0,
      initialY: 0,
      targetX: -340,
      targetY: -160,
      rotation: -7,
      scale: 0.95,
    },
    {
      id: 2,
      src: "/hero/2.webp",
      alt: "Milford Sound sheer granite waterfalls",
      caption: "Fiordland Silence",
      tag: "44.6414° S, 167.8974° E",
      initialX: 0,
      initialY: 0,
      targetX: 320,
      targetY: -190,
      rotation: 6,
      scale: 0.92,
    },
    {
      id: 3,
      src: "/hero/3.webp",
      alt: "Lake Wakatipu lakeside estate & private dining",
      caption: "Southern Sanctuary",
      tag: "45.0312° S, 168.6626° E",
      initialX: 0,
      initialY: 0,
      targetX: -360,
      targetY: 170,
      rotation: -4,
      scale: 0.96,
    },
    {
      id: 4,
      src: "/hero/4.webp",
      alt: "Banks Peninsula secluded bays & yacht passage",
      caption: "Maritime Solitude",
      tag: "43.7667° S, 172.9667° E",
      initialX: 0,
      initialY: 0,
      targetX: 340,
      targetY: 160,
      rotation: 5,
      scale: 0.94,
    },
    {
      id: 5,
      src: "/hero/5.webp",
      alt: "Southern Alps snow-capped ridge expedition",
      caption: "Alpine Dawn Overlook",
      tag: "44.0000° S, 169.5000° E",
      initialX: 0,
      initialY: 0,
      targetX: 0,
      targetY: -280,
      rotation: 2,
      scale: 1.02,
    },
  ] as HeroPolaroid[],
};

export const EXPEDITION_REGIONS: ExpeditionRegion[] = [
  {
    id: "fiordland",
    name: "Fiordland & Southern Lakes",
    maoriName: "Te Rua-o-te-moko",
    tagline: "Glacial waters flanked by sheer granite monoliths",
    coordinates: "44.6414° S, 167.8974° E",
    lat: -44.6414,
    lng: 167.8974,
    mapPinPos: { top: "79%", left: "32%" },
    highlights: [
      "Private superyacht anchorage in Doubtful & Milford Sound",
      "Heli-access to high alpine hanging valleys",
      "Wild crayfish and Pacific oyster degustation on deck",
    ],
    description:
      "Descend into primeval silence. Thousand-metre waterfalls thunder directly into dark mirror waters, navigated in complete seclusion aboard private chartered vessels with onboard sommelier and master mariners.",
    duration: "4 to 7 Days",
    season: "October – May",
    vesselAir: "Airbus H130 Helicopter & 38m Expedition Yacht",
    heroImage: "/hero/2.webp",
    badge: "Prime Expedition",
    featuredLodge: "Blanket Bay & Fiordland Floating Sanctuary",
  },
  {
    id: "central-otago",
    name: "Central Otago & Glacial Alps",
    maoriName: "Aoraki / Mount Cook",
    tagline: "Highest peaks, ancient icefall, and premier Pinot Noir",
    coordinates: "43.5950° S, 170.1418° E",
    lat: -43.5950,
    lng: 170.1418,
    mapPinPos: { top: "68%", left: "41%" },
    highlights: [
      "Tasman Glacier icefall exploration with alpine master guides",
      "Private barrel tastings in closed-door Gibbston Valley cellars",
      "MacKenzie International Dark Sky Reserve private observatory",
    ],
    description:
      "A soaring theater of rock, snow, and golden tussock. Ascend above the spine of the Southern Alps by private helicopter before touching down on untouched powder for a mountaintop champagne luncheon.",
    duration: "5 to 8 Days",
    season: "Year Round",
    vesselAir: "Twin-Turbine Helicopter & Mercedes S-Class Chauffeur",
    heroImage: "/hero/1.webp",
    badge: "UNESCO Heritage",
    featuredLodge: "Matakauri Lodge & The Hermitage Chalets",
  },
  {
    id: "marlborough",
    name: "Marlborough Sounds & Tasman Bay",
    maoriName: "Te Tau Ihu o te Waka",
    tagline: "Sunken valleys, drowned river canyons, and sheltered bays",
    coordinates: "41.2500° S, 174.0000° E",
    lat: -41.25,
    lng: 174.0,
    mapPinPos: { top: "48%", left: "55%" },
    highlights: [
      "Navigation through Queen Charlotte and Kenepuru Sounds",
      "Golden granite coastlines of Abel Tasman National Park",
      "Private king salmon, green-lipped mussel, and Sauvignon harvest",
    ],
    description:
      "An intricate maze of crystalline waterways where dense native bush plunges into the sea. Drop anchor in secluded coves unreachable by road, and wake to the chorus of bellbirds in complete maritime peace.",
    duration: "3 to 6 Days",
    season: "November – April",
    vesselAir: "Private Catamaran & Amphibious Floatplane",
    heroImage: "/footer-gallery/6.webp",
    badge: "Maritime Haven",
    featuredLodge: "Bay of Many Coves & Split Apple Retreat",
  },
  {
    id: "subtropical-north",
    name: "Volcanic Plateau & Subtropical North",
    maoriName: "Te Ika-a-Māui",
    tagline: "Geothermal wonders, ancient kauri groves, and coastal islands",
    coordinates: "35.2820° S, 174.1200° E",
    lat: -35.282,
    lng: 174.12,
    mapPinPos: { top: "22%", left: "68%" },
    highlights: [
      "Bay of Islands maritime sanctuary across 144 subtropical isles",
      "Helicopter landing on White Island volcanic perimeter",
      "Waiheke Island cliffside private estate & olive grove sanctuary",
    ],
    description:
      "From warm emerald waters in the far north to bubbling mineral cauldrons and sacred Māori cultural sites, experience the vibrant contrast of living geothermal landscapes paired with world-class seaside estates.",
    duration: "4 to 7 Days",
    season: "Year Round",
    vesselAir: "AgustaWestland Helicopter & Mercedes-Maybach VIP",
    heroImage: "/hero/4.webp",
    badge: "Cultural & Coastal",
    featuredLodge: "The Landing Residences & Cape Kidnappers",
  },
];

export const MOUNTAIN_SANCTUARY_DATA = {
  title: "WHERE ALPINE SILENCE MEETS UNHURRIED COMFORT",
  subtitle: "The Expedition Sanctuary",
  tag: "100% OFF-GRID WILDERNESS",
  image: "/exp.webp",
  alt: "Mount Taranaki solitary volcanic peak and alpine wilderness sanctuary",
  quote:
    "We travel not to conquer the wilderness, but to inhabit its grandeur with quiet reverence and absolute ease.",
  specs: [
    {
      title: "Direct Alpine Heli-Access",
      subtitle: "Helipad 30 seconds from your suite",
      description: "Direct seamless transfers between superyacht decks, regional airports, and private mountain passes.",
      iconName: "Wind",
    },
    {
      title: "Private Michelin Degustation",
      subtitle: "Bespoke high-country gastronomy",
      description: "Dedicated executive chefs foraging wild herbs, Central Otago venison, and pristine Bluff oysters daily.",
      iconName: "Sparkles",
    },
    {
      title: "Acoustic Silence Glazing",
      subtitle: "Whisper-quiet cabin isolation",
      description: "Double-paned acoustic glass envelopes every suite, keeping raw alpine blizzards outside while you rest.",
      iconName: "Shield",
    },
    {
      title: "Manaakitanga Concierge",
      subtitle: "Discreet 24/7 expedition service",
      description: "Attentive, unhurried hospitality guided by indigenous Māori customs of reverence, care, and privacy.",
      iconName: "Compass",
    },
  ] as SanctuaryFeature[],
};

export const EDITORIAL_CREW_ARTICLES: EditorialArticle[] = [
  {
    number: "01",
    tag: "MANAAKITANGA",
    title: "The Spirit of Sacred Hospitality",
    subtitle: "A philosophy of intuitive reverence, anticipating every unuttered desire.",
    body: [
      "In the Māori world, Manaakitanga is far more than hospitality—it is the sacred obligation to nurture, protect, and elevate the spirits of those who cross your threshold.",
      "Aboard our expeditions, this translates into an atmosphere of profound warmth without stiffness. Your private hosts do not simply attend; they listen, adapt, and craft moments of unscripted wonder.",
      "From a steaming cup of kawakawa tea handed to you as you step off a misty Fiordland trail, to fresh bread baked at dawn in an alpine galley, every detail honors this enduring heritage.",
    ],
    image: "/1.webp",
    imageAlt: "Alpine expedition guide gazing across mountain wilderness",
    pullQuote: "To welcome a guest is to welcome their ancestors, their peace of mind, and their journey into your home.",
    accentText: "44°20'S 168°48'E • Mount Aspiring National Park",
  },
  {
    number: "02",
    tag: "MASTERS OF THE TERRAIN",
    title: "Backcountry Skippers & Alpine Navigators",
    subtitle: "Vetted veterans who know every hidden cove, thermal vent, and glacier fissure.",
    body: [
      "The wilderness of New Zealand demands absolute competence. Our skippers have spent decades navigating the unpredictable Southern Ocean, and our chief pilots have logged thousands of alpine flight hours.",
      "They possess the quiet confidence that only intimacy with the land provides—reading changing cloud banks over the Southern Alps, knowing precisely which secret cove offers mirror-calm anchorage when westerlies rise.",
      "With them at your helm, the most remote frontiers of Aotearoa become accessible playgrounds explored in serene, guaranteed safety.",
    ],
    image: "/2.webp",
    imageAlt: "Private helicopter hovering above pristine mountain ridgeline",
    pullQuote: "True luxury is not having to watch the clock, knowing a master is watching the horizon.",
    accentText: "45°50'S 166°35'E • Dusky Sound Maritime Wilderness",
  },
  {
    number: "03",
    tag: "UNHURRIED FREEDOM",
    title: "The Art of the Fluid Itinerary",
    subtitle: "No rigid agendas. Nature leads; we orchestrate effortlessly in response.",
    body: [
      "Too many luxury journeys are ruined by the tyranny of rigid schedules. If a pod of dusky dolphins joins your vessel in the Marlborough Sounds, we drop anchor and stay.",
      "If dawn reveals crystalline skies over Aoraki, our helicopter departs immediately for a glacier touchdown before other flights even begin their engines.",
      "This is expedition luxury as it was meant to be: responsive, fluid, and attuned entirely to the rhythm of the wild.",
    ],
    image: "/3.webp",
    imageAlt: "Private luxury vessel anchored in tranquil turquoise fiord",
    pullQuote: "The greatest indulgence of our time is time itself, gifted back to you in pristine wilderness.",
    accentText: "41°15'S 174°02'E • Queen Charlotte Sound",
  },
];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: "j-1",
    type: "review",
    source: "Condé Nast Traveler",
    location: "Global Luxury Survey",
    dateOrIssue: "Gold List 2026",
    quote:
      "Ammar Luxury Expeditions has set an untouchable benchmark for exploration in the South Pacific. Effortless, deeply moving, and undeniably sublime.",
    authorOrVessel: "Editorial Critics' Selection",
    rating: 5,
  },
  {
    id: "j-2",
    type: "log",
    source: "Expedition Field Log",
    location: "Doubtful Sound / Patea",
    dateOrIssue: "November 2026",
    quote:
      "Engines cut at 18:00. Complete, absolute silence. Granite walls rising 1,200 meters overhead draped in moss. Not a single other human vessel for forty nautical miles.",
    authorOrVessel: "Captain Hamish Fraser • Vessel Aotea II",
    image: "/hero/2.webp",
  },
  {
    id: "j-3",
    type: "review",
    source: "Robb Report",
    location: "Aviation & Superyacht Division",
    dateOrIssue: "Best of the Best",
    quote:
      "The seamless handoff between executive Mercedes chauffeur, twin-turbine helicopter, and private maritime charter is executed with military precision and superyacht grace.",
    authorOrVessel: "Luxury Lifestyle Review",
    rating: 5,
  },
  {
    id: "j-4",
    type: "log",
    source: "Private Charter Guest",
    location: "Aoraki Glacial Plateau",
    dateOrIssue: "December 2026",
    quote:
      "Having a multi-course tasting menu served on a fold-out linen table on ancient glacier ice, while looking down upon clouds rolling across the Tasman Sea, was life-altering.",
    authorOrVessel: "Lord & Lady Sterling • Geneva, Switzerland",
    image: "/hero/1.webp",
  },
  {
    id: "j-5",
    type: "review",
    source: "Departures Magazine",
    location: "Special Edition",
    dateOrIssue: "Annual Expedition Issue",
    quote:
      "It feels less like a commercial tour and more like being invited into the private high-country estates and yachts of an exceptionally well-connected old friend.",
    authorOrVessel: "Contributing Editor",
    rating: 5,
  },
];
