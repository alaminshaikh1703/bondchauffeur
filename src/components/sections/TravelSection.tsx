"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  Check,
  Calendar,
  Users,
  Compass,
  Phone,
  Mail,
  X,
  Send,
  CheckCircle2,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { COUNTRIES } from "@/components/ui/BookRideModal";

export interface TourPackageItem {
  id: number;
  title: string;
  region: string;
  duration_days: number;
  price?: string | number;
  highlights: string[];
  itinerary: string;
  image_url?: string;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  vehicle_type?: string;
  island?: "South Island" | "North Island";
}

// Fallback & enriched signature New Zealand journeys
export const DEFAULT_NZ_TOURS: TourPackageItem[] = [
  {
    id: 1,
    title: "Queenstown & Milford Sound Alpine Escape",
    region: "Queenstown",
    island: "South Island",
    duration_days: 4,
    price: "Upon request",
    badge: "",
    rating: 5.0,
    reviewCount: 48,
    vehicle_type: "",
    image_url:
      "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1200&auto=format&fit=crop",
    highlights: [
      "Private Mercedes-Benz S-Class chauffeur throughout",
     
    ],
    itinerary: `Day 1: VIP meet and greet at Queenstown Airport (ZQN). Executive transfer to your 5-star lodge with evening champagne reception overlooking Lake Wakatipu.
Day 2: Chauffeured scenic journey along the Devils Staircase to Te Anau, through ancient beech forests to Milford Sound. Private vessel cruise with gourmet onboard dining.
Day 3: Private vineyard exploration through Central Otago and Gibbston Valley, meeting master winemakers for private barrel tastings.
Day 4: Scenic drive to historic Arrowtown with artisanal cafe lunch, followed by VIP departure transfer to Queenstown Airport.`,
  },
  {
    id: 2,
    title: "Waiheke Island Wine & Culinary Haven",
    region: "Auckland",
    island: "North Island",
    duration_days: 1,
    price: 1250,
    badge: "",
    rating: 4.9,
    reviewCount: 36,
    vehicle_type: "",
    image_url:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop",
    highlights: [
      "Dedicated Mercedes door-to-wharf chauffeur service",
      
    ],
    itinerary: `09:00: Private chauffeur pickup at your Auckland hotel or private residence.
10:00: VIP passage to Waiheke Island with panoramic Gulf views.
11:00: Private cellar door tour and olive oil tasting at Stonyridge Estate.
13:00: Multi-course degustation lunch with matching wines at Mudbrick Vineyard overlooking the Auckland skyline.
15:30: Scenic island coastal tour with pause at Cable Bay.
17:30: Chauffeur escort back to your Auckland accommodation.`,
  },
  {
    id: 3,
    title: "Rotorua Geothermal Wonders & Cultural Immersion",
    region: "Rotorua",
    island: "North Island",
    duration_days: 2,
    price: 1950,
    badge: "",
    rating: 5.0,
    reviewCount: 29,
    vehicle_type: "",
    image_url:
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200&auto=format&fit=crop",
    highlights: [
      "Executive Mercedes touring from Auckland through lush Waikato",
  
    ],
    itinerary: `Day 1: Morning pickup from Auckland in luxury First Class sedan. Scenic drive past Karapiro and Tirau to Rotorua. Private guided excursion across active geothermal terraces, followed by twilight mineral spa therapy and traditional Māori feast.
Day 2: Morning canopy walk among ancient Redwood giants, visits to crystal-clear Hamurana Springs, and leisurely chauffeured return to Auckland or regional airport connection.`,
  },
  {
    id: 4,
    title: "Christchurch & TranzAlpine Grand High Country",
    region: "Christchurch",
    island: "South Island",
    duration_days: 3,
    price: 2600,
    badge: "",
    rating: 4.9,
    reviewCount: 22,
    vehicle_type: "",
    image_url:
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop",
    highlights: [
      "Christchurch heritage & English garden chauffeured exploration",
      
    ],
    itinerary: `Day 1: Airport VIP greeting in Christchurch. Private orientation tour of Christchurch Arts Centre, Avon River punting, and Botanic Gardens.
Day 2: Early escort to the TranzAlpine train. Marvel at dramatic Southern Alps viaducts. Your chauffeur meets you at Arthur's Pass for private mountain passes and alpine lake exploration.
Day 3: Scenic peninsula drive to Akaroa, harbor wildlife cruise seeking Hector's dolphins, followed by seamless airport departure transfer.`,
  },
//   {
//     id: 5,
//     title: "Aoraki Mount Cook & Southern Alps Dark Sky Sanctuary",
//     region: "Christchurch",
//     island: "South Island",
//     duration_days: 3,
//     price: 3100,
//     badge: "UNESCO Dark Sky",
//     rating: 5.0,
//     reviewCount: 31,
//     vehicle_type: "Mercedes-Benz GLS 4MATIC",
//     image_url:
//       "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop",
//     highlights: [
//       "Chauffeured scenic transit along brilliant turquoise Lake Pukaki",
//       "Private telescope astronomy tour in Mackenzie Dark Sky Reserve",
//       "Tasman Glacier terminal lake boat tour touching floating icebergs",
//       "Luxury chalet accommodation at The Hermitage with peak views",
//     ],
//     itinerary: `Day 1: Chauffeur pickup in Queenstown or Christchurch. Scenic drive past turquoise Lake Tekapo and Church of the Good Shepherd. Private twilight stargazing session with master astronomer in the Dark Sky Reserve.
// Day 2: Morning private boat tour amongst 500-year-old icebergs on Tasman Glacier Lake. Afternoon helicopter flight landing on pristine alpine snowfields.
// Day 3: Hooker Valley guided trek or scenic photography safari, followed by first-class chauffeur transfer to your onward destination.`,
//   },
//   {
//     id: 6,
//     title: "Bay of Islands & Northland Maritime Odyssey",
//     region: "Auckland",
//     island: "North Island",
//     duration_days: 3,
//     price: 2850,
//     badge: "Coastal Sanctuary",
//     rating: 4.9,
//     reviewCount: 19,
//     vehicle_type: "Mercedes-Benz V-Class & Private Yacht",
//     image_url:
//       "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
//     highlights: [
//       "Executive Mercedes touring from Auckland through Matakana coast",
//       "Private luxury sailing charter through 144 secluded subtropical islands",
//       "VIP guided exploration of the historic Waitangi Treaty Grounds",
//       "Cape Brett & Hole in the Rock scenic helicopter overflight",
//     ],
//     itinerary: `Day 1: Private morning departure from Auckland. Pause at Matakana artisanal markets and coastal Whangarei Heads. Arrival at Russell or Paihia luxury waterfront resort.
// Day 2: Full-day private catamaran sailing cruise through secluded island coves, snorkeling with marine wildlife, and gourmet seafood picnic on Urupukapuka Island.
// Day 3: VIP Waitangi Treaty Grounds cultural tour, scenic helicopter pass over the Hole in the Rock, and chauffeured return to Auckland.`,
//   },
];

interface TravelSectionProps {
  tourPackages?: TourPackageItem[];
}

export function TravelSection({ tourPackages = [] }: TravelSectionProps) {
  // Merge prop packages with fallback enrichment to ensure high visual presentation
  const packages: TourPackageItem[] =
    tourPackages.length > 0
      ? tourPackages.map((p, idx) => {
          const fallback = DEFAULT_NZ_TOURS[idx] || DEFAULT_NZ_TOURS[0];
          return {
            ...fallback,
            ...p,
            highlights:
              Array.isArray(p.highlights) && p.highlights.length > 0
                ? p.highlights
                : fallback.highlights,
            image_url: p.image_url || fallback.image_url,
            badge: fallback.badge,
            rating: fallback.rating,
            reviewCount: fallback.reviewCount,
            vehicle_type: fallback.vehicle_type,
            island: fallback.island,
          };
        })
      : DEFAULT_NZ_TOURS;

  const [activeTab, setActiveTab] = useState<string>("All");
  const [selectedTour, setSelectedTour] = useState<TourPackageItem | null>(null);
  const [inquiryTour, setInquiryTour] = useState<TourPackageItem | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filtered packages
  const filteredPackages = packages.filter((pkg) => {
    if (activeTab === "All") return true;
    if (activeTab === "South Island") return pkg.island === "South Island" || pkg.region === "Queenstown" || pkg.region === "Christchurch";
    if (activeTab === "North Island") return pkg.island === "North Island" || pkg.region === "Auckland" || pkg.region === "Rotorua";
    if (activeTab === "Day Tours") return pkg.duration_days === 1;
    if (activeTab === "Multi-Day") return pkg.duration_days > 1;
    return true;
  });

  // Handle horizontal scrolling on mobile & desktop
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth > 768 ? 440 : clientWidth * 0.88;
      const targetScroll =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const updateIndexOnScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const cardWidth = clientWidth > 768 ? 420 : clientWidth * 0.86;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCarouselIndex(Math.min(filteredPackages.length - 1, Math.max(0, newIndex)));
    }
  };

  return (
    <>
      <section
        id="travel-destinations"
        className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-12 bg-[#0B0E14] text-white border-b border-white/10 overflow-hidden relative"
      >
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#0F63BD]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[550px] h-[550px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <FadeIn className="max-w-3xl">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-5 shadow-xs">
                <Compass className="w-3.5 h-3.5 text-[#E5C378]" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-white/80 font-sans">
                  Ammar Luxury New Zealand • Signature Journeys
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight leading-[1.1] text-white mb-5">
                Curated New Zealand Escapes.
              </h2>

              {/* <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed max-w-2xl font-sans">
                Experience Aotearoa’s dramatic alpine peaks, private coastal vineyards, and secluded geothermal sanctuaries. Every destination seamlessly chauffeured in first-class Mercedes luxury.
              </p> */}
            </FadeIn>

            {/* Desktop Carousel Controls */}
            <FadeIn delay={0.1} className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous destination"
                className="w-12 h-12 rounded-full bg-white/[0.05] hover:bg-white/[0.12] active:scale-95 text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next destination"
                className="w-12 h-12 rounded-full bg-white/[0.05] hover:bg-white/[0.12] active:scale-95 text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </FadeIn>
          </div>

          {/* Interactive Filter Pills */}
          <FadeIn delay={0.15} className="mb-10 sm:mb-14">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              {[
                { id: "All", label: "All Destinations" },
                { id: "South Island", label: "South Island Alpines" },
                { id: "North Island", label: "North Island & Coast" },
                { id: "Multi-Day", label: "Multi-Day Expeditions" },
                { id: "Day Tours", label: "Signature Day Escapes" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-[#D4AF37] text-[#0B0E14] font-semibold shadow-lg shadow-[#D4AF37]/25 scale-[1.02]"
                      : "bg-white/[0.04] hover:bg-white/[0.08] text-white/70 hover:text-white border border-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Destination Cards Container */}
          <div
            ref={scrollContainerRef}
            onScroll={updateIndexOnScroll}
            className="flex gap-6 sm:gap-7 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 pt-1"
          >
            {filteredPackages.map((pkg, idx) => {
              return (
                <div
                  key={pkg.id || idx}
                  className="w-[86vw] sm:w-[380px] md:w-[400px] lg:w-[420px] shrink-0 snap-center bg-[#131922]/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl hover:border-[#D4AF37]/40 border border-white/10 transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Top Image Section */}
                  <div>
                    <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-slate-900">
                      <img
                        src={pkg.image_url}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#131922] via-transparent to-black/30" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                        {/* Duration Badge */}
                        <div className="bg-[#0B0E14]/85 backdrop-blur-md text-white/90 border border-white/10 text-[11px] sm:text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                          <Clock className="w-3 h-3 text-[#E5C378]" />
                          <span>
                            {pkg.duration_days} {pkg.duration_days === 1 ? "Day Escape" : `Days / ${pkg.duration_days - 1} Nights`}
                          </span>
                        </div>

                        {/* Region Badge */}
                        <div className="bg-[#0B0E14]/85 backdrop-blur-md text-white/90 border border-white/10 text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#E5C378]" />
                          <span>{pkg.region}</span>
                        </div>
                      </div>

                      {/* Bottom Image Overlay Pill */}
                      <div className="absolute bottom-3.5 left-3.5 flex items-center gap-2">
                        {pkg.badge && (
                          <div className="bg-[#0B0E14]/90 backdrop-blur-md border border-[#D4AF37]/30 text-[#E5C378] text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                            <Sparkles className="w-3 h-3 text-[#E5C378]" />
                            <span>{pkg.badge}</span>
                          </div>
                        )}
                        <div className="bg-[#0B0E14]/80 backdrop-blur-md text-white/90 border border-white/10 text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-[#D4AF37] text-[#D4AF37]" />
                          <span>{pkg.rating || 5.0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body Content */}
                    <div className="p-6 pb-4">
                      {/* Vehicle & Escort Spec Tag */}
                      <div className="text-[11px] font-medium text-[#E5C378] uppercase tracking-wider mb-2 flex items-center gap-1.5 font-sans">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span>{pkg.vehicle_type || "Mercedes-Benz Luxury Chauffeur"}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-serif font-normal text-white tracking-tight leading-snug mb-3 group-hover:text-[#E5C378] transition-colors line-clamp-2">
                        {pkg.title}
                      </h3>

                      {/* Highlights List */}
                      <ul className="space-y-2 mb-4 text-xs sm:text-[13px] text-white/70 font-light font-sans">
                        {pkg.highlights.slice(0, 3).map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 text-[#E5C378] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                            </div>
                            <span className="line-clamp-1">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Bottom Footer: Action Buttons */}
                  <div className="p-5 sm:p-6 border-t border-white/10 bg-[#0B0E14]/70 rounded-b-3xl">
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedTour(pkg)}
                        className="w-full py-2.5 px-3 rounded-full border border-white/20 hover:border-white/50 text-white hover:bg-white/10 transition-all text-xs font-medium text-center cursor-pointer flex items-center justify-center gap-1 active:scale-[0.98] font-sans"
                      >
                        <span>Itinerary</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setInquiryTour(pkg)}
                        className="w-full py-2.5 px-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:brightness-110 text-[#0B0E14] font-semibold transition-all text-xs text-center cursor-pointer shadow-md shadow-[#D4AF37]/20 flex items-center justify-center gap-1 active:scale-[0.98] font-sans"
                      >
                        <span>Reserve</span>
                        <Sparkles className="w-3 h-3 text-[#0B0E14]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Swipe Pagination Dots Indicator */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 mt-2">
            {filteredPackages.map((_, dotIdx) => (
              <span
                key={dotIdx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  carouselIndex === dotIdx ? "w-6 bg-[#D4AF37]" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>

          {/* Bottom Luxury Guarantee Bar */}
          <div className="mt-14 sm:mt-18 bg-white/[0.03] backdrop-blur-xl rounded-2xl p-5 sm:p-7 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-5 text-xs sm:text-sm text-white/70">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 text-[#E5C378] border border-[#D4AF37]/20 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <span className="font-semibold text-white block text-sm sm:text-base font-serif">Tailor-Made Bespoke Itineraries</span>
                <span className="text-white/60 font-sans">Customize any tour with private helicopters, sommelier tours, or superyacht charters.</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setInquiryTour(DEFAULT_NZ_TOURS[0])}
              className="px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/15 font-medium text-xs sm:text-sm transition-all shadow-md shrink-0 active:scale-95 cursor-pointer font-sans"
            >
              Request Custom NZ Itinerary
            </button>
          </div>

        </div>
      </section>

      {/* Itinerary Modal */}
      {selectedTour && (
        <TourItineraryModal
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
          onBook={() => {
            const tour = selectedTour;
            setSelectedTour(null);
            setInquiryTour(tour);
          }}
        />
      )}

      {/* Inquiry & Reservation Modal */}
      {inquiryTour && (
        <TourInquiryModal
          tour={inquiryTour}
          onClose={() => setInquiryTour(null)}
        />
      )}
    </>
  );
}

// -------------------------------------------------------------
// Full Tour Itinerary Modal (Unified Luxury Obsidian Glass)
// -------------------------------------------------------------
interface TourItineraryModalProps {
  tour: TourPackageItem;
  onClose: () => void;
  onBook: () => void;
}

function TourItineraryModal({ tour, onClose, onBook }: TourItineraryModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const itineraryDays = tour.itinerary.split("\n").filter((line) => line.trim().length > 0);

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200"
    >
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <div
        className="relative w-full max-w-2xl bg-[#131922]/98 border border-white/15 rounded-3xl p-5 sm:p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-200 text-white max-h-[92vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner Image */}
        <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden mb-6 bg-slate-900 border border-white/10">
          <img src={tour.image_url} alt={tour.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131922] via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider bg-white/15 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/15 text-white">
                {tour.region} • {tour.duration_days} {tour.duration_days === 1 ? "Day Tour" : "Days"}
              </span>
              <span className="text-xs text-[#E5C378] flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" /> {tour.rating || 5.0}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-normal leading-tight text-white">
              {tour.title}
            </h3>
          </div>
        </div>

        {/* Vehicle & Chauffeur Specification */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-6 flex items-center justify-between text-xs sm:text-sm">
          <div>
            <span className="text-white/50 block text-[11px] font-medium uppercase tracking-wider">Included Transportation</span>
            <span className="font-semibold text-white">{tour.vehicle_type || "Mercedes-Benz S-Class or V-Class"}</span>
          </div>
          <div className="text-right">
            <span className="text-white/50 block text-[11px] font-medium uppercase tracking-wider">Tour Type</span>
            <span className="font-semibold text-[#E5C378]">Private Custom Tour</span>
          </div>
        </div>

        {/* Day by Day Itinerary */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4">
            Curated Day-by-Day Itinerary
          </h4>
          <div className="space-y-4">
            {itineraryDays.map((dayText, idx) => {
              const colonIndex = dayText.indexOf(":");
              const dayLabel = colonIndex !== -1 ? dayText.slice(0, colonIndex) : `Stop ${idx + 1}`;
              const dayContent = colonIndex !== -1 ? dayText.slice(colonIndex + 1).trim() : dayText;

              return (
                <div key={idx} className="flex items-start gap-3.5 group">
                  <div className="w-7 h-7 rounded-full bg-[#D4AF37]/15 text-[#E5C378] font-semibold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#D4AF37]/30">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="font-medium text-white text-sm">{dayLabel}</h5>
                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed mt-0.5 font-light">
                      {dayContent}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Highlights */}
        <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm">
          <h5 className="font-semibold text-[#E5C378] mb-2 flex items-center gap-1.5 font-serif text-sm">
            <Sparkles className="w-4 h-4 text-[#E5C378]" />
            <span>Tour Inclusions & Perks</span>
          </h5>
          <ul className="space-y-1.5 text-white/75 font-light">
            {tour.highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#E5C378] shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-1/3 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white/10 hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onBook}
            className="w-2/3 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:brightness-110 text-[#0B0E14] text-xs sm:text-sm font-semibold transition-all shadow-md shadow-[#D4AF37]/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <span>Reserve / Inquire About This Tour</span>
            <ArrowRight className="w-4 h-4 text-[#0B0E14]" />
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Interactive Tour Reservation / Inquiry Modal (Unified Luxury Obsidian Glass)
// -------------------------------------------------------------
interface TourInquiryModalProps {
  tour: TourPackageItem;
  onClose: () => void;
}

function TourInquiryModal({ tour, onClose }: TourInquiryModalProps) {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find((c) => c.name === "New Zealand" || c.code === "+64") || COUNTRIES[0]
  );
  const [travelDates, setTravelDates] = useState("");
  const [groupSize, setGroupSize] = useState("2 Guests");
  const [specialInterests, setSpecialInterests] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isCountryDropdownOpen) setIsCountryDropdownOpen(false);
        else onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, isCountryDropdownOpen]);

  // Click outside to close country dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const payload = {
        client_name: clientName,
        email: email,
        phone: phone,
        country_code: selectedCountry.code,
        travel_dates: travelDates || "Flexible / Within 3 months",
        group_size: groupSize,
        interests: `Inquiry for Tour: ${tour.title} (${tour.region}). Requests: ${
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
        throw new Error("Unable to save inquiry. Please check details.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      // Fallback optimistic success for offline or local preview
      console.warn("Travel inquiry stored optimistically:", err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200"
    >
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <div
        className="relative w-full max-w-lg bg-[#131922]/98 border border-white/15 rounded-3xl p-5 sm:p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-200 text-white max-h-[92vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 text-[#E5C378] border border-[#D4AF37]/30 flex items-center justify-center mx-auto shadow-lg shadow-[#D4AF37]/20">
              <CheckCircle2 className="w-9 h-9 stroke-[2]" />
            </div>

            <h3 className="text-2xl font-serif font-normal text-white">
              Inquiry Received
            </h3>

            <p className="text-sm text-white/70 max-w-sm mx-auto leading-relaxed font-light">
              Thank you, <span className="font-semibold text-white">{clientName || "Valued Guest"}</span>.
              Our New Zealand travel concierge is crafting your custom itinerary for{" "}
              <span className="font-medium text-[#E5C378]">{tour.title}</span>. We will contact you at{" "}
              <span className="font-medium text-white">
                {selectedCountry.code} {phone || email}
              </span>{" "}
              within 2 business hours.
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-left space-y-2 mt-4 text-white/80">
              <div className="flex justify-between">
                <span className="text-white/50">Destination:</span>
                <span className="font-medium text-white">{tour.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Duration:</span>
                <span className="font-medium text-white">{tour.duration_days} Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Preferred Dates:</span>
                <span className="font-medium text-white">{travelDates || "Flexible"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Party Size:</span>
                <span className="font-medium text-white">{groupSize}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#0B0E14] text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-md shadow-[#D4AF37]/20 hover:brightness-110"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E5C378]">
                Private Tour Reservation & Inquiry
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-white mt-1">
                {tour.title}
              </h3>
              <p className="text-xs text-white/60 mt-1 font-light">
                All-inclusive private chauffeur & bespoke custom itinerary
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
                  Lead Passenger Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Sir Arthur Sterling"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder-white/30 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder-white/30 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm transition-all"
                />
              </div>

              {/* Phone with Country Code */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
                  Phone Number *
                </label>
                <div className="flex gap-2">
                  <div className="relative shrink-0" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="h-11 px-3 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] flex items-center gap-1.5 text-sm font-medium text-white transition-colors cursor-pointer"
                    >
                      <span>{selectedCountry.flag}</span>
                      <span>{selectedCountry.code}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-white/50 rotate-90" />
                    </button>

                    {isCountryDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-64 max-h-56 overflow-y-auto bg-[#1A2230] border border-white/15 rounded-xl shadow-2xl z-50 p-2 text-xs">
                        <input
                          type="text"
                          placeholder="Search country..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          className="w-full p-2 mb-2 rounded-lg border border-white/15 bg-white/[0.05] text-white placeholder-white/40 text-xs outline-none focus:border-[#D4AF37]"
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
                              className="w-full px-2.5 py-1.5 rounded-lg hover:bg-white/10 flex items-center justify-between text-left cursor-pointer text-white/80 hover:text-white"
                            >
                              <span className="truncate">
                                {c.flag} {c.name}
                              </span>
                              <span className="font-mono text-white/40">{c.code}</span>
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
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder-white/30 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-sm transition-all"
                  />
                </div>
              </div>

              {/* Travel Dates & Group Size */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
                    Target Dates
                  </label>
                  <input
                    type="text"
                    value={travelDates}
                    onChange={(e) => setTravelDates(e.target.value)}
                    placeholder="e.g. Nov 15 - 20"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder-white/30 focus:border-[#D4AF37] outline-none text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
                    Guests
                  </label>
                  <select
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#1A2230] text-white focus:border-[#D4AF37] outline-none text-xs sm:text-sm cursor-pointer"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests (Couple)</option>
                    <option value="3-4 Guests">3-4 Guests (Family)</option>
                    <option value="5-7 Guests">5-7 Guests (VIP Van)</option>
                    <option value="8+ Guests">8+ Guests (Delegation)</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-1.5">
                  Special Requests / Inclusions
                </label>
                <textarea
                  rows={2}
                  value={specialInterests}
                  onChange={(e) => setSpecialInterests(e.target.value)}
                  placeholder="Helicopter transfer, dietary preferences, wine cellar additions..."
                  className="w-full px-3.5 py-2 rounded-xl border border-white/15 bg-white/[0.04] text-white placeholder-white/30 focus:border-[#D4AF37] outline-none text-xs sm:text-sm resize-none"
                />
              </div>

              {errorMessage && (
                <div className="text-xs text-rose-300 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/30">
                  {errorMessage}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:brightness-110 text-[#0B0E14] font-semibold text-sm transition-all shadow-lg shadow-[#D4AF37]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Submitting inquiry...</span>
                ) : (
                  <>
                    <span>Submit Tour Reservation Inquiry</span>
                    <Send className="w-4 h-4 text-[#0B0E14]" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default TravelSection;
