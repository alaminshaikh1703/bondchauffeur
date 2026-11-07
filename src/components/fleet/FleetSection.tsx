"use client";

import React, { useState } from "react";
import { Users, Briefcase, Zap, Check, Sparkles, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

interface FleetCategory {
  id: string;
  name: string;
  tagline: string;
  exampleModels: string;
  guests: number;
  luggage: number;
  isElectric?: boolean;
  features: string[];
  image: string;
}

const FLEET_CATEGORIES: FleetCategory[] = [
  {
    id: "business",
    name: "Business Class",
    tagline: "The premier standard for executive travel",
    exampleModels: "Mercedes-Benz E-Class, BMW 5 Series, Audi A6 or similar",
    guests: 3,
    luggage: 2,
    features: [
      "Complimentary 15 minutes wait time included",
      "Chilled bottled spring water & universal multi-device phone chargers",
      "Handpicked, top-rated local executive chauffeurs",
    ],
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "electric",
    name: "Electric Class",
    tagline: "100% emission-free luxury",
    exampleModels: "Mercedes-Benz EQS, BMW i7, Porsche Taycan, Lucid Air",
    guests: 3,
    luggage: 2,
    isElectric: true,
    features: [
      "Zero direct tailpipe emissions with sustainable footprint",
      "Whisper-quiet acoustic sanctuary with dual-pane glass",
      "Cutting-edge electric luxury performance and smooth acceleration",
    ],
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "first",
    name: "First Class",
    tagline: "Exceptional prestige and maximum legroom",
    exampleModels: "Mercedes-Benz S-Class, BMW 7 Series, Audi A8 L",
    guests: 3,
    luggage: 2,
    features: [
      "Extended wheelbase with maximum rear cabin comfort",
      "Reclining executive seating with massage & climate features",
      "Senior VIP-accredited chauffeurs for heads of state and executives",
    ],
    image: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "van",
    name: "Business Van / SUV",
    tagline: "Spacious luxury for travel parties and delegations",
    exampleModels: "Mercedes-Benz V-Class, Cadillac Escalade, Lincoln Navigator",
    guests: 5,
    luggage: 6,
    features: [
      "Substantial luggage capacity for groups and touring families",
      "Face-to-face conference seating arrangements upon request",
      "Ideal for airport departures, roadshows, and alpine golf retreats",
    ],
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop",
  },
];

export function FleetSection() {
  const [selectedId, setSelectedId] = useState(FLEET_CATEGORIES[0].id);
  const activeVehicle = FLEET_CATEGORIES.find((v) => v.id === selectedId) || FLEET_CATEGORIES[0];

  return (
    <section id="fleet" className="fleet-section py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0B0E14] text-white border-b border-white/10 relative overflow-hidden">
      {/* Subtle Ambient Radial Highlight */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[350px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, rgba(15, 99, 189, 0.08), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <FadeIn className="text-center mx-auto max-w-3xl mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#C5A059] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Crafted Mobility</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-editorial font-normal tracking-tight text-white mb-3">
            Our vehicle classes.
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-light leading-relaxed max-w-xl mx-auto">
            Only recent, high-end models equipped for ultimate acoustic comfort, privacy, and discretion.
          </p>
        </FadeIn>

        {/* Vehicle Tabs with Micro-interactions */}
        <div className="flex justify-center gap-2.5 sm:gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="luxury-segmented-control inline-flex items-center p-1.5 border border-white/15 bg-[#131922]/90 backdrop-blur-xl rounded-full shadow-lg">
            {FLEET_CATEGORIES.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedId(v.id)}
                className={`snap-start shrink-0 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  selectedId === v.id
                    ? "bg-[#C5A059] text-[#0B0E14] shadow-md shadow-[#C5A059]/30 font-semibold"
                    : "text-[#94A3B8] hover:text-white hover:bg-white/5"
                }`}
              >
                {v.isElectric && <Zap className="w-4 h-4 text-emerald-400" />}
                <span>{v.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Vehicle Showcase Card with Animation */}
        <FadeIn key={activeVehicle.id} duration={0.4} y={12}>
          <div className="luxury-glass-card rounded-3xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border border-white/15 shadow-2xl bg-[#131922]/90">
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-[#C5A059] block mb-2">
                  {activeVehicle.tagline}
                </span>
                <h3 className="text-3xl sm:text-4xl font-editorial font-normal text-white mb-2 tracking-tight">
                  {activeVehicle.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] mb-6 font-mono">
                  {activeVehicle.exampleModels}
                </p>

                {/* Capacities */}
                <div className="flex items-center gap-6 py-4 border-y border-white/10 mb-6">
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <Users className="w-4 h-4 text-[#C5A059]" />
                    <span>Up to {activeVehicle.guests} passengers</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <Briefcase className="w-4 h-4 text-[#C5A059]" />
                    <span>Up to {activeVehicle.luggage} bags</span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  {activeVehicle.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-[#94A3B8] font-light">
                      <Check className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    const pickupInput = document.getElementById("pickup-location-input");
                    pickupInput?.focus();
                  }}
                  className="luxury-btn-primary w-full sm:w-auto min-h-[48px] flex items-center justify-center gap-2 px-7 py-3 text-sm font-medium hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#0F63BD]/30 cursor-pointer rounded-full"
                >
                  <span>Book {activeVehicle.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 rounded-2xl overflow-hidden aspect-[16/10] bg-black/50 border border-white/10 shadow-xl group relative">
              <img
                src={activeVehicle.image}
                alt={activeVehicle.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default FleetSection;