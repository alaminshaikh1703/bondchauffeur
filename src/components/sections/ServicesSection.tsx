"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ServiceDetailModal } from "@/components/ui/Modals";

interface ServiceCardData {
  category: string;
  title: string;
  body: string;
  image: string;
  href: string;
}

const SERVICE_CARDS: ServiceCardData[] = [
  {
    category: "Airport Transfers",
    title: "Smooth landings, every time.",
    body: "Delayed flight? Chauffeurs track arrivals and adjust seamlessly. Enjoy 60 minutes of complimentary wait time with meet & greet inside the terminal.",
    image: "https://static.blacklane.com/assets/_next/static/media/1.879377e626f27fdd.webp",
    href: "/airport-transfer/",
  },
  {
    category: "Hourly & Standby Hire",
    title: "Seize the day on your terms.",
    body: "Reserve a dedicated executive chauffeur from 2 to 24 hours. Your driver and luxury vehicle remain on standby wherever your schedule takes you.",
    image: "https://static.blacklane.com/assets/_next/static/media/2.9ae17562d88c590d.webp",
    href: "/hourly-car-service/",
  },
  {
    category: "City-to-City Journeys",
    title: "Between cities, done better.",
    body: "Transform long-distance travel across New Zealand into productive rest. Avoid crowded terminals and arrive rejuvenated at your destination.",
    image: "https://static.blacklane.com/assets/_next/static/media/3.a05cc4329bbe2ee0.webp",
    href: "/city-to-city/",
  },
  {
    category: "Enterprise Solutions",
    title: "Corporate travel, simplified.",
    body: "A centralized executive platform for multinational companies and travel directors to book, track, and reconcile executive journeys worldwide.",
    image: "https://static.blacklane.com/assets/_next/static/media/4.13f5624e9bdcc2ee.webp",
    href: "/business/",
  },
];

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceCardData | null>(null);

  return (
    <>
      <section
        id="services"
        className="services-section relative z-20 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0B0E14] text-white border-b border-white/10 overflow-hidden"
      >
        {/* Subtle Ambient Radial Highlight */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] pointer-events-none -z-10"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(15, 99, 189, 0.12), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto">
          {/* Headline Block */}
          <div className="text-center mx-auto max-w-3xl mb-14 sm:mb-18">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#C5A059] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Mobility</span>
            </div>
            <h2 className="services-title font-editorial text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-tight">
              Arrive at your best.
            </h2>
            <p className="services-subtitle mt-3 sm:mt-4 text-base sm:text-xl text-[#94A3B8] font-light max-w-xl mx-auto">
              Effortless journeys, tailored to the demands of discerning travelers.
            </p>
          </div>

          {/* 4-Card Luxury Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-6">
            {SERVICE_CARDS.map((card, idx) => (
              <div
                key={idx}
                className="bg-[#131922]/85 hover:bg-[#1A222E] border border-white/10 hover:border-[#C5A059]/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between group transition-all duration-300 shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Service Preview Image with Subtle Vignette */}
                  <div className="w-full h-[220px] sm:h-[240px] rounded-xl overflow-hidden mb-5 relative bg-black/40">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Clean Text Hierarchy */}
                  <div className="px-1">
                    <span className="text-[11px] font-semibold text-[#C5A059] uppercase tracking-wider block mb-1.5">
                      {card.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-editorial font-normal text-white tracking-tight mb-2.5">
                      {card.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed text-[#94A3B8] mb-6">
                      {card.body}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Pill Button */}
                <div className="px-1 pt-2 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setSelectedService(card)}
                    className="inline-flex items-center gap-2 border border-white/20 hover:border-[#C5A059] text-white hover:text-[#C5A059] rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer bg-white/5 hover:bg-white/10"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
      />
    </>
  );
}

export default ServicesSection;