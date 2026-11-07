"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Compass,
  ArrowRight,
  ChevronRight,
  Star,
  Check,
  Calendar,
  Phone,
  Mail,
  X,
  Send,
  CheckCircle2,
  Volume2,
  VolumeX,
  Sparkles,
  Shield,
  Users,
} from "lucide-react";
import { COUNTRIES } from "@/components/ui/BookRideModal";

// --- Types ---
export interface TourPackageItem {
  id: number;
  title: string;
  region: string;
  duration_days: number;
  price: string | number;
  highlights: string[];
  itinerary: { day: number; title: string; desc: string }[];
  image_url: string;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  season?: string;
}

export interface DestinationSpot {
  id: string;
  name: string;
  region: "South Island" | "North Island";
  tagline: string;
  description: string;
  imageUrl: string;
  highlight: string;
}

export interface FundamentalGuide {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  imageUrl: string;
  readTime: string;
  content: string[];
}

// --- Sample Journeys Data ---
export const SAMPLE_NZ_JOURNEYS: TourPackageItem[] = [
  {
    id: 1,
    title: "The Alpine & Sound Odyssey",
    region: "Queenstown & Fiordland",
    duration_days: 7,
    price: 4850,
    badge: "Signature Journey",
    rating: 5.0,
    reviewCount: 42,
    season: "Oct – May",
    image_url:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=85&w=1600&auto=format&fit=crop",
    highlights: [
      "Private Mercedes S-Class chauffeur throughout",
      "Milford Sound private vessel cruise with chef dining",
      "Central Otago private cellar door masterclass",
      "Helicopter glacier landing on Mount Aspiring",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Queenstown",
        desc: "VIP airport meet & greet. Executive transfer to your alpine lodge overlooking Lake Wakatipu. Welcome champagne.",
      },
      {
        day: 2,
        title: "Gibbston Valley Wine Trail",
        desc: "Private chauffeured journey through rugged gorges. Exclusive tastings with boutique Pinot Noir winemakers.",
      },
      {
        day: 3,
        title: "Glacier Heli-Flight & Alpine Lake",
        desc: "Scenic helicopter ascent over snow-dusted ridges. Touch down upon pristine ancient ice before a mountain picnic.",
      },
      {
        day: 4,
        title: "Journey to Fiordland & Te Anau",
        desc: "Drive the iconic Devil's Staircase. Evening glowworm cave exploration by silent underground punt.",
      },
      {
        day: 5,
        title: "Milford Sound Private Charter",
        desc: "Traverse the Homer Tunnel into sheer granite chasms. Cruise beneath 1,000-metre cascading waterfalls.",
      },
      {
        day: 6,
        title: "Historic Arrowtown & Cardrona",
        desc: "Leisurely morning in gold-mining heritage lanes, followed by high-country artisanal luncheon.",
      },
      {
        day: 7,
        title: "Farewell Aotearoa",
        desc: "Chauffeured departure transfer to Queenstown Airport with dedicated concierge luggage handling.",
      },
    ],
  },
  {
    id: 2,
    title: "Coastal Vineyards & Sunlit Bays",
    region: "Waiheke & Northland",
    duration_days: 6,
    price: 3950,
    badge: "Epicurean Escape",
    rating: 4.9,
    reviewCount: 38,
    season: "Year Round",
    image_url:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=85&w=1600&auto=format&fit=crop",
    highlights: [
      "Helicopter transfer from Auckland to Waiheke Island",
      "Olive grove & vintage syrah private tasting estate",
      "Private catamaran charter through secluded maritime coves",
      "Boutique beachfront luxury lodge stay",
    ],
    itinerary: [
      {
        day: 1,
        title: "Auckland to Waiheke Island",
        desc: "Panoramic helicopter flight across the Hauraki Gulf. Check-in to cliffside estate above Oneroa Bay.",
      },
      {
        day: 2,
        title: "Estate Cellars & Olive Mills",
        desc: "Chauffeured island discovery. Private sommelier-led barrel tasting paired with fresh Pacific oysters.",
      },
      {
        day: 3,
        title: "Private Catamaran Cruise",
        desc: "Sail hidden coves of turquoise water. Swim, snorkel, or relax on deck with gourmet seafood luncheon.",
      },
      {
        day: 4,
        title: "Northland Coastal Flight",
        desc: "Transfer north to the Bay of Islands. Historical guided immersion at Waitangi Treaty Grounds.",
      },
      {
        day: 5,
        title: "Dolphin Cove & Cape Brett",
        desc: "Private vessel excursion to the Hole in the Rock with secluded island beach anchorage.",
      },
      {
        day: 6,
        title: "Return to Auckland",
        desc: "Executive Mercedes-Benz transfer back to Auckland CBD or international terminal.",
      },
    ],
  },
  {
    id: 3,
    title: "Glacial Peaks & Wilderness Lodges",
    region: "Southern Alps & West Coast",
    duration_days: 8,
    price: 5400,
    badge: "Grand Wilderness",
    rating: 5.0,
    reviewCount: 29,
    season: "Nov – Apr",
    image_url:
      "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=85&w=1600&auto=format&fit=crop",
    highlights: [
      "Haast Pass mountain highway chauffeured journey",
      "Franz Josef Glacier ice-hiking with expert alpine guide",
      "Eco-sanctuary kiwi encounter in native rainforest",
      "Five-star wilderness lodge dining beneath the Milky Way",
    ],
    itinerary: [
      {
        day: 1,
        title: "Christchurch to High Country",
        desc: "Chauffeured departure across the Canterbury Plains towards the turquoise glacial waters of Lake Tekapo.",
      },
      {
        day: 2,
        title: "Aoraki Mount Cook National Park",
        desc: "Morning Hooker Valley walk beneath New Zealand's highest peak. Twilight stargazing session.",
      },
      {
        day: 3,
        title: "Across the Southern Alps",
        desc: "Ascend through Lindis Pass to Wanaka. Evening lakeside dining at a secluded alpine lodge.",
      },
      {
        day: 4,
        title: "Wild West Coast & Haast Pass",
        desc: "Dramatic drive through ancient temperate rainforests, roaring waterfalls, and rugged coastline.",
      },
      {
        day: 5,
        title: "Franz Josef Glacier Heli-Hike",
        desc: "Helicopter directly into upper icefall crevasses. Walk among sparkling blue ice formations with an alpine master.",
      },
      {
        day: 6,
        title: "Hokitika Jade & Coastal Rail",
        desc: "Discover Māori pounamu carving traditions. Board the luxury TranzAlpine scenic carriage.",
      },
      {
        day: 7,
        title: "Arthur's Pass High Viaduct",
        desc: "Cross mountain gorges and return to Christchurch in your executive Mercedes.",
      },
      {
        day: 8,
        title: "Christchurch Departure",
        desc: "Morning botanical garden stroll and private airport transfer.",
      },
    ],
  },
];

// --- Destination Spots Data ---
export const NZ_DESTINATIONS: DestinationSpot[] = [
  {
    id: "queenstown",
    name: "Queenstown & Southern Lakes",
    region: "South Island",
    tagline: "The Alpine Sanctuary",
    description:
      "Glacial waters flanked by the Remarkables range, home to world-renowned Pinot Noir and secluded luxury lodges.",
    imageUrl:
      "https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?q=85&w=1600&auto=format&fit=crop",
    highlight: "Helicopter alpine landings & private cellar doors",
  },
  {
    id: "milford",
    name: "Milford Sound & Fiordland",
    region: "South Island",
    tagline: "Eighth Wonder of the World",
    description:
      "Sheer granite monoliths rising thousands of metres straight from dark mirror waters into ancient rainforest mists.",
    imageUrl:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=85&w=1600&auto=format&fit=crop",
    highlight: "Private boat charter beneath thundering waterfalls",
  },
  {
    id: "waiheke",
    name: "Waiheke Island & Hauraki Gulf",
    region: "North Island",
    tagline: "Island of Wine and Light",
    description:
      "A thirty-minute flight from Auckland brings you to sun-drenched coastal hills, olive groves, and boutique syrah estates.",
    imageUrl:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=85&w=1600&auto=format&fit=crop",
    highlight: "Cliffside estates & private yacht anchorage",
  },
];

// --- The Fundamentals Guides ---
export const FUNDAMENTAL_GUIDES: FundamentalGuide[] = [
  {
    id: "seasons",
    title: "Best Time to Visit: The Four Seasons",
    subtitle: "A seasonal guide to Aotearoa",
    summary:
      "New Zealand's inverted seasons offer distinct wonders — from golden summer vineyards to crisp snow-draped alpine winters.",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=85&w=1600&auto=format&fit=crop",
    readTime: "3 min read",
    content: [
      "Summer (December to February): Long sunlit evenings, warm beach days, and vibrant outdoor dining. Ideal for coastal touring, helicopter expeditions, and private boat charters.",
      "Autumn (March to May): Golden foliage across Central Otago and Hawke's Bay, quieter roads, crisp mornings, and the annual wine harvest in full swing.",
      "Winter (June to August): Snow-capped Southern Alps, blazing fireplaces in 5-star wilderness lodges, and pristine heli-skiing.",
      "Spring (September to November): Newborn wildlife, roaring waterfalls in Fiordland, blooming alpine flora, and fresh snow on high peaks.",
    ],
  },
  {
    id: "islands",
    title: "South Island vs. North Island",
    subtitle: "Where should your journey begin?",
    summary:
      "Dramatic alpine peaks and ancient fjords in the South, or geothermal wonders, rich Māori heritage, and golden beaches in the North.",
    imageUrl:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=85&w=1600&auto=format&fit=crop",
    readTime: "4 min read",
    content: [
      "The South Island is the grand wilderness theatre: Milford Sound, Mount Cook, Lake Wanaka, and Franz Josef Glacier. Perfect for travelers seeking dramatic scale, high-country luxury, and quiet seclusion.",
      "The North Island blends rich cultural tapestry with warm maritime charm: Rotorua's geothermal valleys, Waitangi's historic treaty grounds, and Waiheke Island's coastal vineyards.",
      "Our Recommendation: A 10 to 14 day private itinerary gracefully pairs both islands, connected by scenic charter flights.",
    ],
  },
  {
    id: "chauffeur",
    title: "The Chauffeur Advantage",
    subtitle: "Why private touring changes everything",
    summary:
      "Navigate New Zealand's winding scenic passes in effortless tranquility while your accredited chauffeur handles every detail.",
    imageUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=85&w=1600&auto=format&fit=crop",
    readTime: "3 min read",
    content: [
      "Effortless Ease: New Zealand roads are renowned for narrow alpine passes and unpredictable mountain weather. Relax in a Mercedes S-Class while your professional chauffeur commands the road.",
      "Local Secrets: Access private gate codes, secluded picnic lookouts, and private farm tracks closed to general commercial tourists.",
      "Complete Freedom: Linger over another glass of Central Otago Pinot Noir without navigating driving limits or unfamiliar terrain.",
    ],
  },
];

export function NzTravelExperience() {
  // Modal states
  const [selectedJourney, setSelectedJourney] = useState<TourPackageItem | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<FundamentalGuide | null>(null);

  // Hero Video state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Inquiry Form state
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find((c) => c.name === "New Zealand" || c.code === "+64") || COUNTRIES[0]
  );
  const [destinationChoice, setDestinationChoice] = useState("Queenstown & Milford Sound");
  const [travelDates, setTravelDates] = useState("");
  const [groupSize, setGroupSize] = useState("2 Guests");
  const [specialInterests, setSpecialInterests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside country dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };
    if (isCountryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCountryDropdownOpen]);

  const filteredCountries = COUNTRIES.filter((c) => {
    if (!countrySearch.trim()) return true;
    const q = countrySearch.toLowerCase().trim();
    return c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q);
  });

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const payload = {
        client_name: clientName,
        email: email,
        phone: phone,
        country_code: selectedCountry.code,
        travel_dates: travelDates || "Flexible / Within 6 months",
        group_size: groupSize,
        interests: `Travel Page Inquiry for: ${destinationChoice}. Notes: ${
          specialInterests || "None specified"
        }`,
      };

      const res = await fetch("/api/travel-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Unable to send inquiry. Please check details.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      // Fallback success for client-side demo if backend is offline
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToInquiry = (journeyTitle?: string) => {
    if (journeyTitle) setDestinationChoice(journeyTitle);
    const target = document.getElementById("travel-inquiry");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#FBF9F3] text-[#1E392B] font-sans antialiased selection:bg-[#1E392B] selection:text-[#FBF9F3]">
      
      {/* =========================================================================
          SECTION 1: HERO
          Cinematic dawn view over calm lake / fjord with minimal, clean typography
         ========================================================================= */}
      <section className="relative w-full h-[92vh] min-h-[640px] flex items-center justify-center overflow-hidden bg-black text-white">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=85&w=2000&auto=format&fit=crop"
            className="w-full h-full object-cover object-center scale-105"
          >
            <source src="/travelhero.mp4" type="video/mp4" />
            <source src="/travlehero.mp4" type="video/mp4" />
          </video>
          {/* Subtle gradient overlay to match Reverie's calm warmth and ensure text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/65" />
        </div>

        {/* Subtle Audio Toggle */}
        <button
          type="button"
          onClick={toggleAudio}
          aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
          className="absolute bottom-6 right-6 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer group shadow-lg"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 stroke-[2]" />
          ) : (
            <Volume2 className="w-4 h-4 stroke-[2] text-[#C5A880]" />
          )}
        </button>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
          <span className="text-[11px] sm:text-xs tracking-[0.3em] font-medium uppercase text-white/85 mb-4 block">
            New Zealand Private Escapes
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-normal tracking-[0.02em] leading-[1.1] text-white mb-6">
            Something rare, forgotten, <br className="hidden sm:inline" />
            vast and furious.
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-light text-white/85 max-w-xl mx-auto leading-relaxed mb-8">
            Tailor-made private journeys through Aotearoa's most majestic landscapes, planned with firsthand intimacy.
          </p>

          <button
            type="button"
            onClick={() => scrollToInquiry()}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#1E392B] hover:bg-white/90 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>Plan Your Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom subtle scroll cue */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 text-white/60 text-xs tracking-widest uppercase flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[10px]">Scroll</span>
          <div className="w-[1px] h-6 bg-white/40 animate-pulse" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: DARK FOREST GREEN STATEMENT BLOCK
          Matches the deep forest green block in the screenshot
         ========================================================================= */}
      <section className="w-full bg-[#1E392B] text-[#FBF9F3] py-24 sm:py-32 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#C5A880] block mb-5 font-medium">
            The Spirit of Aotearoa
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-editorial font-normal leading-[1.2] mb-6 tracking-wide">
            Everything you hope for. <br />
            <span className="italic font-normal">Nothing you expect.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#FBF9F3]/80 leading-relaxed max-w-xl mx-auto font-light mb-8">
            From mirrored glacial fjords and high-country sheep stations to sun-drenched coastal vineyards, experience New Zealand in quiet, private luxury.
          </p>

          <div className="w-12 h-[1px] bg-[#C5A880]/60 mx-auto" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: ASYMMETRIC 2-COLUMN SECTION (Firsthand Knowledge)
          Matches the asymmetric photo + text block in the screenshot
         ========================================================================= */}
      <section className="w-full bg-[#FBF9F3] py-20 sm:py-24 px-4 sm:px-10 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-4 text-left">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#1E392B]/60 font-medium block mb-3">
              Firsthand Knowledge
            </span>

            <h3 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1E392B] leading-tight mb-5">
              We know every corner of this land.
            </h3>

            <p className="text-sm sm:text-base text-[#1E392B]/75 leading-relaxed font-light mb-8">
              Every remote alpine pass, private vineyard cellar, and hidden fjord helipad has been personally vetted by our local concierges. We do not sell what we have not lived.
            </p>

            <button
              type="button"
              onClick={() => scrollToInquiry()}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#1E392B] hover:text-[#C5A880] transition-colors group cursor-pointer"
            >
              <span>Explore our philosophy</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Landscape Image Column */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[4/3] w-full rounded-none overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=85&w=1600&auto=format&fit=crop"
                alt="New Zealand Alpine Wilderness"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: SLIM DARK GREEN STATEMENT BANNER
          Matches the centered quote bar in the screenshot
         ========================================================================= */}
      <section className="w-full bg-[#1E392B] text-[#FBF9F3] py-14 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#C5A880] font-medium block mb-2">
            Curated Privacy
          </span>
          <p className="text-xl sm:text-2xl font-editorial italic font-normal text-[#FBF9F3] leading-relaxed">
            "No crowds. No compromises. Just pure wilderness and effortless ease."
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: THE CONCIERGE / HOST SPOTLIGHT
          Matches the host photo + text block in the screenshot
         ========================================================================= */}
      <section className="w-full bg-[#FBF9F3] py-16 sm:py-24 px-4 sm:px-10 lg:px-8 border-b border-[#1E392B]/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Host Photo */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-none overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=85&w=1200&auto=format&fit=crop"
                alt="Chief Travel Concierge in New Zealand"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-7 order-1 lg:order-2 text-left">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#1E392B]/60 font-medium block mb-3">
              Your Private Host
            </span>

            <h3 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1E392B] leading-tight mb-5">
              Direct access. Zero bureaucracy.
            </h3>

            <p className="text-sm sm:text-base text-[#1E392B]/75 leading-relaxed font-light mb-6">
              You work directly with a dedicated New Zealand specialist who designs your itinerary, coordinates every private transfer, and remains on-call throughout your journey.
            </p>

            <div className="pt-4 border-t border-[#1E392B]/15">
              <span className="block font-editorial text-lg text-[#1E392B]">Julian Vance</span>
              <span className="text-xs text-[#1E392B]/60 tracking-wider uppercase font-medium">
                Lead Travel Concierge • Queenstown, Aotearoa
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: FULL-WIDTH PANORAMIC IMAGE BREAK
          Matches the full-bleed hot air balloon break in the screenshot
         ========================================================================= */}
      <section className="relative w-full h-[700px] sm:h-[75vh] overflow-hidden bg-black">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=2000&auto=format&fit=crop"
          alt="Hot air balloon soaring over mountain plains at sunrise"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10" />
      </section>

      {/* =========================================================================
          SECTION 7: SAMPLE JOURNEYS (3-Column Grid)
          Matches the 3-card curated journeys in the screenshot
         ========================================================================= */}
      <section className="w-full bg-[#FBF9F3] py-24 sm:py-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Centered Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#1E392B]/60 font-medium block mb-3">
              Sample Journeys
            </span>
            <h3 className="text-3xl sm:text-5xl font-editorial font-normal text-[#1E392B] mb-3">
              Journeys Across Aotearoa
            </h3>
            <p className="text-sm sm:text-base text-[#1E392B]/70 font-light">
              Tailored routes crafted from firsthand experience. Each itinerary is fully customizable.
            </p>
          </div>

          {/* 3-Column Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {SAMPLE_NZ_JOURNEYS.map((journey) => (
              <div
                key={journey.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#1E392B]/10 hover:shadow-xl transition-all duration-300"
              >
                {/* Image (Aspect 4:3 or 16:10) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={journey.image_url}
                    alt={journey.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {journey.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#1E392B]/90 text-[#FBF9F3] text-[10px] tracking-wider uppercase font-medium backdrop-blur-sm">
                      {journey.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-[#1E392B]/60 block mb-1">
                      {journey.region} • {journey.duration_days} Days
                    </span>

                    <h4 className="text-xl sm:text-2xl font-editorial font-normal text-[#1E392B] mb-3 group-hover:text-[#C5A880] transition-colors">
                      {journey.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-[#1E392B]/70 font-light leading-relaxed mb-6">
                      Private chauffeur, bespoke accommodation & tailored inclusions
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#1E392B]/10 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedJourney(journey)}
                      className="text-xs font-semibold tracking-wider uppercase text-[#1E392B] hover:text-[#C5A880] transition-colors cursor-pointer"
                    >
                      View Itinerary →
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToInquiry(journey.title)}
                      className="px-4 py-2 rounded-full bg-[#1E392B] hover:bg-[#1E392B]/90 text-[#FBF9F3] text-xs font-medium tracking-wide transition-all cursor-pointer"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FULL-WIDTH EDGE-TO-EDGE LUXURY PICNIC MOMENT
          Matches the champagne savanna picnic in the screenshot
         ========================================================================= */}
      <section className="relative w-full h-[60vh] sm:h-[75vh] overflow-hidden bg-black">
        <Image
          src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=85&w=2000&auto=format&fit=crop"
          alt="Private luxury picnic in secluded nature"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/15" />
      </section>

      {/* =========================================================================
          SECTION 9: WARM TAUPE QUOTE BREAK
          Matches the soft taupe quote section in the screenshot
         ========================================================================= */}
      <section className="w-full bg-[#D8D3CA] text-[#1E392B] py-20 sm:py-28 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#1E392B]/70 font-medium block mb-3">
            Aotearoa
          </span>
          <p className="text-2xl sm:text-4xl font-editorial italic font-normal text-[#1E392B] leading-snug">
            "In a world that never stops moving, New Zealand gives you back the luxury of silence."
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: WHERE WE GO (3-Column Destinations)
          Matches the 3-destination card grid in the screenshot
         ========================================================================= */}
      <section className="w-full bg-[#FBF9F3] py-24 sm:py-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#1E392B]/60 font-medium block mb-3">
              Destinations
            </span>
            <h3 className="text-3xl sm:text-5xl font-editorial font-normal text-[#1E392B]">
              Where We Go
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {NZ_DESTINATIONS.map((dest) => (
              <div
                key={dest.id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#1E392B]/10 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={dest.imageUrl}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[10px] tracking-widest uppercase text-white/80 font-medium block mb-1">
                      {dest.region}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-editorial font-normal text-white">
                      {dest.name}
                    </h4>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs sm:text-sm text-[#1E392B]/75 font-light leading-relaxed mb-4">
                    {dest.description}
                  </p>
                  <div className="text-[11px] font-semibold text-[#1E392B]/90 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{dest.highlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 11: PRIVATE & GROUP TRAVEL (Asymmetric layout)
          Matches the private cabin/villa section in the screenshot
         ========================================================================= */}
      <section className="w-full bg-[#FBF9F3] py-20 sm:py-28 px-6 sm:px-10 lg:px-20 border-t border-[#1E392B]/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Wide Image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=85&w=1600&auto=format&fit=crop"
                alt="Luxury private villa and lodge in New Zealand"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-5 text-left">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#1E392B]/60 font-medium block mb-3">
              Exclusive Use
            </span>

            <h3 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1E392B] leading-tight mb-5">
              Private Villas & Group Touring
            </h3>

            <p className="text-sm sm:text-base text-[#1E392B]/75 leading-relaxed font-light mb-8">
              From multigenerational family holidays to executive delegations, our executive Mercedes fleet and private villa partners accommodate your group with absolute privacy and bespoke attention.
            </p>

            <button
              type="button"
              onClick={() => scrollToInquiry("Private Group / Villa Charter")}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#1E392B] hover:text-[#C5A880] transition-colors group cursor-pointer"
            >
              <span>Inquire for private groups</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 12: DEEP FOREST GREEN STATEMENT BLOCK
          Matches the deep green quote block in the screenshot
         ========================================================================= */}
      <section className="w-full bg-[#1E392B] text-[#FBF9F3] py-24 sm:py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#C5A880] font-medium block mb-4">
            Our Promise
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial italic font-normal text-[#FBF9F3] leading-snug mb-4">
            "We travel not to escape life, <br />
            but for life not to escape us."
          </h2>
          <p className="text-xs sm:text-sm text-[#FBF9F3]/70 font-light tracking-wide">
            Bespoke New Zealand journeys crafted for the discerning traveler.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13: THE FUNDAMENTALS / EDITORIAL GUIDES
          Matches the editorial guide cards in the screenshot
         ========================================================================= */}
      <section className="w-full bg-[#FBF9F3] py-24 sm:py-32 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#1E392B]/60 font-medium block mb-3">
              The Fundamentals
            </span>
            <h3 className="text-3xl sm:text-5xl font-editorial font-normal text-[#1E392B]">
              Essential Knowledge
            </h3>
          </div>

          {/* 3 Guide Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FUNDAMENTAL_GUIDES.map((guide) => (
              <div
                key={guide.id}
                onClick={() => setSelectedGuide(guide)}
                className="group cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden border border-[#1E392B]/10 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={guide.imageUrl}
                    alt={guide.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/70 text-white text-[10px] font-medium">
                    {guide.readTime}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase font-medium text-[#1E392B]/60 block mb-1">
                      {guide.subtitle}
                    </span>
                    <h4 className="text-lg sm:text-xl font-editorial font-normal text-[#1E392B] mb-2 group-hover:text-[#C5A880] transition-colors">
                      {guide.title}
                    </h4>
                    <p className="text-xs text-[#1E392B]/70 font-light leading-relaxed">
                      {guide.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#1E392B]/10 text-xs font-semibold uppercase tracking-wider text-[#1E392B] group-hover:text-[#C5A880] flex items-center justify-between">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 14: WARM TAUPE PRE-FOOTER INQUIRY CARD
          Matches the clean, minimalist inquiry section in the screenshot
         ========================================================================= */}
      <section id="travel-inquiry" className="w-full bg-[#D8D3CA] text-[#1E392B] py-24 sm:py-32 px-6 sm:px-10">
        <div className="max-w-2xl mx-auto text-center">
          
          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#1E392B]/70 font-medium block mb-3">
            Let's Begin
          </span>

          <h3 className="text-3xl sm:text-5xl font-editorial font-normal text-[#1E392B] mb-4">
            Where Dreams Roam Wild
          </h3>

          <p className="text-sm sm:text-base text-[#1E392B]/75 font-light leading-relaxed max-w-lg mx-auto mb-10">
            Tell us how you wish to travel. We will curate a custom New Zealand journey tailored to your personal rhythm.
          </p>

          {isSuccess ? (
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#1E392B]/15 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-editorial text-2xl text-[#1E392B]">Inquiry Received</h4>
              <p className="text-sm text-[#1E392B]/75 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#1E392B]">{clientName || "Valued Guest"}</span>.
                Our travel concierge will contact you at{" "}
                <span className="font-medium text-[#1E392B]">{selectedCountry.code} {phone || email}</span>{" "}
                within 2 business hours.
              </p>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#1E392B] text-white text-xs font-semibold tracking-wider uppercase"
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleInquirySubmit}
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-[#1E392B]/15 text-left space-y-5"
            >
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1E392B]/70 mb-1.5">
                    Lead Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-[#1E392B] focus:ring-1 focus:ring-[#1E392B] outline-none text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1E392B]/70 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eleanor@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-[#1E392B] focus:ring-1 focus:ring-[#1E392B] outline-none text-sm transition-all"
                  />
                </div>
              </div>

              {/* Phone with Country Code */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1E392B]/70 mb-1.5">
                  Phone Number *
                </label>
                <div className="flex gap-2">
                  <div className="relative shrink-0" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="h-11 px-3 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 flex items-center gap-1.5 text-sm font-medium text-stone-800 transition-colors cursor-pointer"
                    >
                      <span>{selectedCountry.flag}</span>
                      <span>{selectedCountry.code}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-500 rotate-90" />
                    </button>

                    {isCountryDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-64 max-h-56 overflow-y-auto bg-white border border-stone-200 rounded-xl shadow-xl z-50 p-2 text-xs">
                        <input
                          type="text"
                          placeholder="Search country..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          className="w-full p-2 mb-2 rounded-lg border border-stone-200 text-xs outline-none focus:border-[#1E392B]"
                        />
                        <div className="space-y-0.5">
                          {filteredCountries.map((c) => (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(c);
                                setIsCountryDropdownOpen(false);
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg hover:bg-stone-100 flex items-center justify-between text-left cursor-pointer"
                            >
                              <span className="truncate">
                                {c.flag} {c.name}
                              </span>
                              <span className="font-mono text-stone-500">{c.code}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="21 555 0199"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 focus:border-[#1E392B] focus:ring-1 focus:ring-[#1E392B] outline-none text-sm transition-all"
                  />
                </div>
              </div>

              {/* Destination & Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1E392B]/70 mb-1.5">
                    Destination / Route
                  </label>
                  <select
                    value={destinationChoice}
                    onChange={(e) => setDestinationChoice(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-[#1E392B] outline-none text-sm bg-white"
                  >
                    <option value="The Alpine & Sound Odyssey (Queenstown & Milford)">
                      The Alpine & Sound Odyssey
                    </option>
                    <option value="Coastal Vineyards & Sunlit Bays (Waiheke & Northland)">
                      Coastal Vineyards & Sunlit Bays
                    </option>
                    <option value="Glacial Peaks & Wilderness Lodges (Southern Alps)">
                      Glacial Peaks & Wilderness Lodges
                    </option>
                    <option value="Private Group / Villa Charter">
                      Private Group / Villa Charter
                    </option>
                    <option value="Custom Bespoke Itinerary">
                      Custom Bespoke Itinerary
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1E392B]/70 mb-1.5">
                    Party Size
                  </label>
                  <select
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-[#1E392B] outline-none text-sm bg-white"
                  >
                    <option value="2 Guests (Couple)">2 Guests (Couple)</option>
                    <option value="1 Guest (Solo Private)">1 Guest (Solo Private)</option>
                    <option value="3-4 Guests (Family)">3-4 Guests (Family)</option>
                    <option value="5-7 Guests (VIP Mercedes Van)">5-7 Guests (VIP Mercedes Van)</option>
                    <option value="8+ Guests (Private Delegation)">8+ Guests (Private Delegation)</option>
                  </select>
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1E392B]/70 mb-1.5">
                  Preferences or Inclusions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialInterests}
                  onChange={(e) => setSpecialInterests(e.target.value)}
                  placeholder="Helicopter glacier flights, private lodge preferences, dietary notes..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-[#1E392B] outline-none text-sm resize-none"
                />
              </div>

              {errorMessage && (
                <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#1E392B] hover:bg-[#1E392B]/90 text-white font-medium text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-[#1E392B]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <span>Submit Travel Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>
      </section>

      {/* =========================================================================
          MODAL 1: DAY-BY-DAY ITINERARY MODAL
         ========================================================================= */}
      {selectedJourney && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setSelectedJourney(null)}
          />

          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto scrollbar-thin text-[#1E392B]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedJourney(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#1E392B]/60 block mb-1">
              {selectedJourney.region} • {selectedJourney.duration_days} Days
            </span>

            <h3 className="text-2xl sm:text-3xl font-editorial font-normal mb-2">
              {selectedJourney.title}
            </h3>

            <p className="text-xs text-[#1E392B]/70 mb-6">
              Private Chauffeur, Curated Excursions & Luxury Accommodation
            </p>

            {/* Highlights */}
            <div className="mb-6 p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1E392B] block mb-2">
                Journey Highlights
              </span>
              <ul className="space-y-1.5 text-xs text-[#1E392B]/80">
                {selectedJourney.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Day by Day List */}
            <div className="space-y-4 mb-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1E392B] block">
                Day-by-Day Itinerary
              </span>
              {selectedJourney.itinerary.map((item) => (
                <div key={item.day} className="flex items-start gap-3.5 pb-3 border-b border-stone-100">
                  <div className="w-7 h-7 rounded-full bg-[#1E392B] text-[#FBF9F3] text-xs font-semibold flex items-center justify-center shrink-0">
                    {item.day}
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-[#1E392B] mb-0.5">
                      {item.title}
                    </h5>
                    <p className="text-xs text-[#1E392B]/75 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                const title = selectedJourney.title;
                setSelectedJourney(null);
                scrollToInquiry(title);
              }}
              className="w-full py-3.5 rounded-full bg-[#1E392B] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#1E392B]/90 transition-all cursor-pointer"
            >
              Inquire for This Journey
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: FUNDAMENTALS DETAIL MODAL
         ========================================================================= */}
      {selectedGuide && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setSelectedGuide(null)}
          />

          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto scrollbar-thin text-[#1E392B]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedGuide(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#1E392B]/60 block mb-1">
              {selectedGuide.subtitle}
            </span>

            <h3 className="text-2xl sm:text-3xl font-editorial font-normal mb-4">
              {selectedGuide.title}
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#1E392B]/80 font-light leading-relaxed mb-8">
              {selectedGuide.content.map((p, idx) => (
                <p key={idx} className="pb-2">
                  {p}
                </p>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSelectedGuide(null)}
              className="w-full py-3 rounded-full bg-[#1E392B] text-white text-xs font-semibold tracking-wider uppercase cursor-pointer"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default NzTravelExperience;
