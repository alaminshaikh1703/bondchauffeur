"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plane,
  Navigation,
  Compass,
  ShoppingBag,
  ShieldCheck,
  Mountain,
  Briefcase,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  Check,
  X,
  Phone,
  Mail,
  Calendar,
  Send,
  MessageSquare,
  ChevronRight,
  CheckCircle2,
  Car,
  Clock,
  Shield,
} from "lucide-react";
import { Preloader } from "@/components/Preloader";
import { ScrollEffects } from "@/components/ScrollEffects";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FadeIn } from "@/components/ui/FadeIn";
import { BookRideModal, SignInModal } from "@/components/ui/Modals";
import { COUNTRIES } from "@/components/ui/BookRideModal";

interface ServiceItem {
  id: string;
  title: string;
  shortTitle: string;
  category: "transfers" | "concierge" | "tours" | "corporate";
  categoryLabel: string;
  badge: string;
  icon: React.ElementType;
  image: string;
  subtitle: string;
  description: string;
  highlights: string[];
  vehicleTypes: string;
  popularRoutes?: string;
}

const SIGNATURE_SERVICES: ServiceItem[] = [
  {
    id: "airport-transfers",
    title: "Private Airport Transfers",
    shortTitle: "Airport Transfers",
    category: "transfers",
    categoryLabel: "Chauffeur Transfers",
    badge: "Flight Tracked",
    icon: Plane,
    image: "https://images.pexels.com/photos/29299967/pexels-photo-29299967.jpeg?_gl=1*170mo7m*_ga*MTQ1NTIwMjIzNi4xNzkzNzgxNzc2*_ga_8JE65Q40S6*czE3OTM4ODEzNjIkbzMkZzEkdDE3OTM4ODE2NzckajYwJGwwJGgw",
    subtitle: "Begin and end your travels effortlessly across Auckland, Queenstown, Christchurch, and Wellington.",
    description: "From the moment you touch down to your final destination, we offer a discreet, punctual, and calming arrival experience. Our chauffeurs monitor live flight arrivals, automatically adjust for delays, and greet you inside the terminal with personalized meet-and-greet service and 60 minutes of complimentary wait time.",
    highlights: [
      "Real-time flight arrival tracking & automatic delay adjustments",
      "Complimentary 60-minute wait time at all New Zealand airports (AKL, ZQN, CHC, WLG)",
      "Personalized inside-terminal luggage assistance & VIP greeting",
      "Chilled Antipodes New Zealand spring water & high-speed mobile chargers",
    ],
    vehicleTypes: "Mercedes-Benz S-Class, E-Class, V-Class VIP",
    popularRoutes: "AKL Airport ↔ Park Hyatt Auckland, ZQN Airport ↔ Blanket Bay / Matakauri Lodge",
  },
  {
    id: "intercity-chauffeur",
    title: "Intercity Chauffeur Service",
    shortTitle: "Intercity Rides",
    category: "transfers",
    categoryLabel: "Chauffeur Transfers",
    badge: "Fixed All-Inclusive",
    icon: Navigation,
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
    subtitle: "Travel with ease and luxury between cities. Experience the freedom of the open road.",
    description: "Bypass the congestion, security lines, and stress of regional airports. Experience seamless city-to-city travel across New Zealand’s North and South Islands in quiet Mercedes luxury. Work undisturbed with onboard Wi-Fi, relax with ergonomic seating, and arrive refreshed and prepared.",
    highlights: [
      "Fixed all-inclusive pricing with zero surge charges or surprise toll fees",
      "Door-to-door direct transit between any two New Zealand metropolitan or regional centres",
      "Private acoustic cabin environment for confidential telephone calls and rest",
      "Flexible en-route scenic pauses at boutique artisan cafes, cellar doors, or viewpoints",
    ],
    vehicleTypes: "Mercedes-Benz S-Class 4MATIC, GLS SUV, V-Class",
    popularRoutes: "Auckland ↔ Tauranga / Rotorua / Hamilton, Queenstown ↔ Wanaka / Te Anau",
  },
  {
    id: "lifestyle-concierge",
    title: "Lifestyle Concierge",
    shortTitle: "Lifestyle Concierge",
    category: "concierge",
    categoryLabel: "Lifestyle & Concierge",
    badge: "Beyond Transport",
    icon: Compass,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop",
    subtitle: "Beyond transport — your trusted personal companion across Aotearoa.",
    description: "We assist with private dining reservations at New Zealand's top degustation tables, exclusive cellar door access, helicopter winery transfers, and trusted local recommendations. You focus on the moment; our concierge team handles the rest with quiet, meticulous precision.",
    highlights: [
      "Priority reservations at signature New Zealand restaurants & private dining rooms",
      "Sommelier-curated vineyard introductions across Waiheke Island and Central Otago",
      "Bespoke lifestyle errands, luggage courier, and VIP procurement services",
      "24/7 dedicated local concierge dispatch team always within reach",
    ],
    vehicleTypes: "Dedicated Executive Mercedes Fleet + Private Helicopter / Catamaran",
    popularRoutes: "Waiheke Island Cellar Doors, Central Otago Gibbston Valley, Queenstown Lake Wakatipu",
  },
  {
    id: "luxury-dining-shopping",
    title: "Luxury Dining & Shopping Assistance",
    shortTitle: "Dining & Shopping",
    category: "concierge",
    categoryLabel: "Lifestyle & Concierge",
    badge: "Curbside Standby",
    icon: ShoppingBag,
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
    subtitle: "Effortless luxury with your dedicated chauffeur on standby at premier destinations.",
    description: "Enjoy stress-free luxury with a dedicated chauffeur at your beck and call. Whether visiting high-end fashion boutiques on Queen Street and Commercial Bay, artisan craft studios, or Michelin-caliber culinary destinations, your vehicle is always curbside, luggage is securely stored, and your day flows without friction.",
    highlights: [
      "Dedicated by-the-hour vehicle standby (reserve from 2 to 24 hours)",
      "Hands-free boutique shopping: packages stored securely in climate-controlled trunk",
      "Seamless multi-stop navigation through premier shopping & dining districts",
      "Complete discretion and security for high-value purchases and personal belongings",
    ],
    vehicleTypes: "Mercedes-Benz E-Class, S-Class, EQS Electric",
    popularRoutes: "Commercial Bay & Britomart (Auckland), The Mall (Queenstown), Arts Centre (Christchurch)",
  },
  {
    id: "elite-school-transfers",
    title: "Elite School & Family Transfers",
    shortTitle: "School & Family",
    category: "corporate",
    categoryLabel: "Family & Executive",
    badge: "Police Vetted",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
    subtitle: "Discreet. Reliable. Reassuring. For families who expect the highest standards of safety.",
    description: "Designed for executives, diplomats, and high-profile families who require uncompromising reliability and security. Ammar Luxury provides safe, discreet school and extracurricular transfers for children, backed by strictly vetted, police-checked chauffeurs and live trip updates for parents.",
    highlights: [
      "Strict New Zealand Police background checks & child-safety accredited chauffeurs",
      "Premium ISOFIX European child safety & booster seats available upon request",
      "Direct SMS/WhatsApp confirmation upon pickup and destination arrival",
      "Consistent dedicated chauffeur matching for familiar, reassuring continuity",
    ],
    vehicleTypes: "Mercedes-Benz V-Class VIP, GLS SUV, E-Class",
    popularRoutes: "Auckland Grammar, King's College, St Cuthbert's, Diocesan & Private Residences",
  },
  {
    id: "private-day-tours",
    title: "Private Day Tours & Scenic Expeditions",
    shortTitle: "Private Day Tours",
    category: "tours",
    categoryLabel: "Bespoke Tours",
    badge: "Custom Itinerary",
    icon: Mountain,
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=1200&auto=format&fit=crop",
    subtitle: "Explore the North and South Island in your own way, through a bespoke lens.",
    description: "Discover New Zealand's dramatic landscapes without tour groups or rigid schedules. From the alpine fjords of Milford Sound and turquoise waters of Lake Tekapo to the French heritage of Akaroa and geothermal geysers of Te Puia, every itinerary is tailored around your desires.",
    highlights: [
      "100% customisable private day itineraries with expert local chauffeur guides",
      "Seamless coordination with private helicopter operators & chartered catamarans",
      "Gourmet picnic provisions & boutique vineyard cellar door stops",
      "Flexible departure times with door-to-door hotel collection",
    ],
    vehicleTypes: "Mercedes-Benz GLS 4MATIC, V-Class VIP, S-Class",
    popularRoutes: "Queenstown ↔ Milford Sound, Christchurch ↔ Akaroa / Tekapo, Auckland ↔ Rotorua / Waitomo",
  },
  {
    id: "executive-events",
    title: "Executive & Event Chauffeur Services",
    shortTitle: "Executive & Events",
    category: "corporate",
    categoryLabel: "Corporate & Events",
    badge: "Dedicated Dispatch",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop",
    subtitle: "Professional, comfortable transport for business summits, red carpet galas, and VIP events.",
    description: "Deliver flawless first impressions for your corporate delegations, board meetings, and high-stakes events. We coordinate single executive transfers through to entire synchronized Mercedes-Benz fleet convoys, managed by a dedicated event dispatch coordinator.",
    highlights: [
      "On-site dispatch coordinator and dedicated flight/schedule manager",
      "Uniformed fleet of matching black Mercedes-Benz S-Class, E-Class, and V-Class",
      "Corporate centralized invoicing, consolidated reporting & duty of care compliance",
      "Strict non-disclosure agreements (NDAs) signed by all chauffeurs",
    ],
    vehicleTypes: "Mercedes-Benz Fleet Convoys (S-Class, E-Class, V-Class)",
    popularRoutes: "Corporate Head Offices, Viaduct Events Centre, Queenstown Summit Venues",
  },
  {
    id: "wellness-retreats",
    title: "Wellness & Retreat Transfers",
    shortTitle: "Wellness & Retreats",
    category: "concierge",
    categoryLabel: "Lifestyle & Concierge",
    badge: "Cabin Sanctuary",
    icon: HeartHandshake,
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1200&auto=format&fit=crop",
    subtitle: "Begin your escape the moment you step into the vehicle. Quiet, calming, and restorative.",
    description: "Your journey to the sanctuary begins the second the door closes behind you. Soft ambient lighting, whisper-quiet acoustic glass, curated wellness amenities, and smooth, unhurried driving prepare your mind and body for the retreat ahead.",
    highlights: [
      "Ultra-quiet Mercedes-Benz electric and executive cabins with acoustic glazing",
      "Chilled organic herbal refreshments, eucalyptus towels & mindfulness amenities",
      "Direct transfers to secluded luxury lodges (Blanket Bay, Matakauri, Cape Kidnappers)",
      "Private luggage porterage directly to your lodge suite",
    ],
    vehicleTypes: "Mercedes-Benz EQS Electric, S-Class, V-Class",
    popularRoutes: "Millbrook Resort (Arrowtown), Aro Hā Retreat (Glenorchy), Polynesian Spa (Rotorua)",
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [askDrawerOpen, setAskDrawerOpen] = useState(false);

  const filteredServices = SIGNATURE_SERVICES.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const handleOpenBooking = (serviceTitle?: string) => {
    setSelectedService(null);
    setPreselectedService(serviceTitle || "Private Airport Transfers");
    setBookModalOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#0A0D14] text-white w-full max-w-full overflow-x-hidden select-none">
      <ScrollEffects />
      <Navbar />

      {/* 1. First Luxe Inspired Hero Section with Luxury Background & Dark Shadow */}
      <section className="relative isolate w-full pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-24 overflow-hidden">
        {/* Background Image Container at z-0 (inside section stacking context, above main background, below text at z-10) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="/images/services-hero-bg.jpg"
            alt="Ammar Luxury Chauffeur New Zealand"
            className="w-full h-full object-cover object-center scale-[1.01]"
            fetchPriority="high"
            loading="eager"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.pexels.com/photos/36377051/pexels-photo-36377051.jpeg?auto=compress&cs=tinysrgb&w=1920";
            }}
          />
          {/* Dark Shadow & Vignette Overlays: Designed so the background image is clearly visible, while text has sharp luxury contrast */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D14]/95 via-[#0A0D14]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D14]/80 via-transparent to-[#0A0D14]" />
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 shadow-lg shadow-black/40">
              <Sparkles className="w-3.5 h-3.5 text-[#AECFF3]" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-white/90">
                Signature Offerings
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-[68px] lg:text-[76px] font-editorial font-light tracking-tight leading-[1.05] sm:leading-[1.08] text-white max-w-4xl mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              What we curate, <br />
              <span className="font-bold text-[#AECFF3]">discreetly</span>.
            </h1>

            <p className="text-lg sm:text-xl lg:text-[22px] leading-relaxed font-light text-white/90 max-w-3xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Where your time is honoured, your comfort is curated, and every journey across New Zealand is quietly exceptional.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full mb-8">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* 2. Interactive Category Filter Bar
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full mb-8 sm:mb-12">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5 sm:mx-0 sm:px-0">
          {[
            { id: "all", label: "All Services (8)" },
            { id: "transfers", label: "Chauffeur Transfers" },
            { id: "concierge", label: "Lifestyle & Concierge" },
            { id: "tours", label: "Bespoke Tours" },
            { id: "corporate", label: "Corporate & Family" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === tab.id
                  ? "bg-white text-[#0A0D14] shadow-md font-semibold scale-[1.02]"
                  : "bg-white/10 hover:bg-white/15 text-white/80 border border-white/10 hover:border-white/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section> */}

      {/* 3. First Luxe 4x2 Visual Cards Grid */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full mb-20 sm:mb-28">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {filteredServices.map((service) => {
            const IconComp = service.icon;

            return (
              <div
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/5] group cursor-pointer border border-white/10 hover:border-white/30 shadow-xl transition-all duration-500 bg-[#121620]"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/95 group-hover:via-black/50 transition-colors" />

                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#AECFF3] border border-white/10">
                    {service.badge}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:bg-white group-hover:text-black transition-colors">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-end p-4 sm:p-5 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-2.5 sm:mb-3 group-hover:scale-110 group-hover:bg-[#0F63BD] transition-all duration-300 shadow-md">
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <h3 className="text-white text-sm sm:text-base md:text-lg font-medium tracking-tight leading-snug group-hover:text-[#AECFF3] transition-colors mb-1">
                    {service.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-white/60 font-light line-clamp-1 max-w-[200px]">
                    {service.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. First Luxe Style Editorial Context Section
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full pb-20 sm:pb-28">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/15 to-transparent mb-12 sm:mb-16" />

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 text-[#D8D8D8] text-[15px] sm:text-[16px] leading-[175%] font-light">
          <div>
            <h2 className="font-editorial text-white text-2xl sm:text-3xl lg:text-[32px] leading-[115%] mb-5 font-normal">
              Private lifestyle management across every detail
            </h2>
            <p>
              Ammar Luxury New Zealand acts as a discreet luxury chauffeur and private concierge for principals, traveling executives, high-net-worth families, and private institutions who need dependable mobility across Aotearoa. Requests can be practical, exceptional, or highly time-sensitive: the value is one trusted team that understands the client, the brief, and the standard expected.
            </p>
            <p className="mt-4 text-white/70">
              Services cover private airport transfers, intercity chauffeured travel, lifestyle concierge, luxury shopping assistance, elite school runs, bespoke South Island scenic day tours, executive event fleet management, and restorative wellness retreat transfers.
            </p>
          </div>

          <div>
            <h2 className="font-editorial text-white text-2xl sm:text-3xl lg:text-[32px] leading-[115%] mb-5 font-normal">
              Designed for principals, advisers and institutions
            </h2>
            <p>
              For high-net-worth individuals and traveling families, we protect time and privacy. For corporate offices, embassies, and luxury travel agencies, we provide a responsive chauffeur layer that can support principals, guests, executives, and households without diluting confidentiality.
            </p>
            <p className="mt-4 text-white/70">
              Every engagement is managed quietly, with careful vehicle selection, real-time flight monitoring, clear communication, and a bias for solutions that feel effortless to the client.
            </p>
          </div>
        </div>
      </section> */}

      {/* 5. Direct CTA Banner */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full pb-20">
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-white/10 via-white/5 to-transparent border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#AECFF3] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Concierge Dispatch</span>
            </div>
            <h3 className="font-editorial text-2xl sm:text-3xl text-white font-normal">
              Ready to curate your New Zealand journey?
            </h3>
            <p className="text-sm text-white/70 font-light mt-1">
              Direct booking with all-inclusive fixed pricing, or connect with our 24/7 concierge.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setAskDrawerOpen(true)}
              className="px-6 py-3 rounded-full border border-white/30 hover:border-white text-white hover:bg-white/10 text-xs sm:text-sm font-medium transition-all cursor-pointer"
            >
              Ask a Question
            </button>

            <button
              type="button"
              onClick={() => handleOpenBooking()}
              className="blacklane-btn-primary px-7 py-3 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-[#0F63BD]/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Ride Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Floating Ask Concierge Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setAskDrawerOpen(true)}
          aria-label="Open concierge question drawer"
          className="flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full bg-white text-[#0A0D14] hover:bg-white/95 active:scale-95 shadow-2xl font-semibold text-xs sm:text-sm transition-all cursor-pointer border border-white/40 group"
        >
          <MessageSquare className="w-4 h-4 text-[#0F63BD] group-hover:scale-110 transition-transform" />
          <span>Ask Concierge</span>
        </button>
      </div>

      {selectedService && (
        <ServiceDetailDrawer
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onBook={() => handleOpenBooking(selectedService.title)}
          onAsk={() => {
            setSelectedService(null);
            setAskDrawerOpen(true);
          }}
        />
      )}

      {askDrawerOpen && (
        <AskConciergeDrawer onClose={() => setAskDrawerOpen(false)} />
      )}

      <Footer />

      <BookRideModal
        isOpen={bookModalOpen}
        onClose={() => setBookModalOpen(false)}
        defaultService={preselectedService}
      />
    </main>
  );
}

function ServiceDetailDrawer({
  service,
  onClose,
  onBook,
  onAsk,
}: {
  service: ServiceItem;
  onClose: () => void;
  onBook: () => void;
  onAsk: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200"
    >
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div
        className="relative w-full max-w-2xl bg-[#121620] border border-white/15 rounded-3xl p-5 sm:p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-200 text-white max-h-[92vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden mb-6 bg-slate-900">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider bg-[#0F63BD] px-2.5 py-0.5 rounded-full">
                {service.categoryLabel}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[#AECFF3]">
                {service.badge}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-editorial font-normal leading-tight text-white">
              {service.title}
            </h3>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm sm:text-base text-[#AECFF3] font-medium mb-3">
            {service.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
            {service.description}
          </p>
        </div>

        <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm">
          <h5 className="font-semibold text-white mb-2.5 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#AECFF3]" />
            <span>Every Experience Includes:</span>
          </h5>
          <ul className="space-y-2 text-white/75">
            {service.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-white/50 block text-[11px]">Dedicated Fleet</span>
            <span className="font-semibold text-white">{service.vehicleTypes}</span>
          </div>
          {service.popularRoutes && (
            <div className="sm:text-right">
              <span className="text-white/50 block text-[11px]">Popular Corridors</span>
              <span className="text-white/80 font-light">{service.popularRoutes}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onAsk}
            className="w-full py-3 rounded-full border border-white/20 hover:border-white text-white hover:bg-white/10 text-xs sm:text-sm font-medium transition-colors cursor-pointer text-center"
          >
            Ask a Question
          </button>
          <button
            type="button"
            onClick={onBook}
            className="w-full py-3 rounded-full bg-[#0F63BD] hover:bg-[#0d529c] text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-[#0F63BD]/30 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          >
            <span>Book This Service</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function AskConciergeDrawer({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-200"
    >
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

      <div
        className="relative w-full max-w-md h-full bg-[#0A0D14] border-l border-white/15 p-6 sm:p-8 shadow-2xl z-10 flex flex-col justify-between overflow-y-auto text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
            <span className="font-serif text-lg text-white">Ammar Luxury Concierge</span>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSuccess ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-editorial font-normal text-white">Request Received</h3>
              <p className="text-sm text-white/70 leading-relaxed font-light">
                Thank you. Our private concierge dispatch team will review your inquiry and reply to{" "}
                <span className="text-white font-medium">{email}</span> shortly.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 px-8 py-2.5 rounded-full bg-white text-[#0A0D14] font-semibold text-xs transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-4xl font-editorial font-normal text-white mb-2">Ask</h2>
              <p className="text-xs sm:text-sm text-white/60 font-light mb-6">
                Have a question, custom itinerary brief, or want to make a quick luxury transfer request? Ask away.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5 font-medium">
                    Your Message / Request *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Need private airport pickup at Queenstown on Friday with luggage assistance..."
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 focus:border-[#0F63BD] outline-none text-sm text-white placeholder-white/30 resize-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 focus:border-[#0F63BD] outline-none text-sm text-white placeholder-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5 font-medium">
                    Contact Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+64 21 000 0000"
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 focus:border-[#0F63BD] outline-none text-sm text-white placeholder-white/30 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-white text-[#0A0D14] hover:bg-white/90 active:scale-95 font-semibold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? (
                    <span>Sending to Concierge...</span>
                  ) : (
                    <>
                      <span>Submit Concierge Request</span>
                      <Send className="w-4 h-4 text-[#0F63BD]" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-white/10 text-xs text-white/40 flex items-center justify-between">
          <span>Ammar Luxury Concierge</span>
          <span>Discreet & Secure</span>
        </div>
      </div>
    </div>
  );
}
