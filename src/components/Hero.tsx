"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { BookingWidget } from "@/components/booking/BookingWidget";

export function Hero() {
  return (
    <section className="hero-section relative z-10 min-h-[100svh] sm:min-h-[860px] lg:min-h-[960px] w-full flex flex-col justify-end pt-24 pb-8 sm:pb-16 bg-transparent">
      {/* 1. Hero Luxury Background: Crisp 2K rendering with seamless bottom fade */}
      <div
        className="hero-fixed-bg fixed top-0 left-0 w-full h-screen -z-10 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src="/hero-bg.webp"
          alt="Luxury chauffeur opening executive sedan door for passenger in New Zealand"
          fill
          priority={true}
          quality={100}
          unoptimized={true}
          sizes="100vw"
          className="hero-bg object-cover object-center w-full h-full transform-none filter-none"
        />
        {/* Seamless Obsidian Gradient Overlay to merge with the deep luxury canvas */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/40 to-black/30 pointer-events-none" />
      </div>

      {/* 2. Hero Content & Booking Widget Grouped Together in the Lower Viewport */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Title & Prestige Trust Badge */}
        <div className="hero-content w-full text-center mx-auto mb-6 sm:mb-8 will-change-transform">
          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs font-medium text-[#F4E8D1] mb-3 sm:mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Private Chauffeur & Bespoke NZ Journeys</span>
            <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
            <span className="text-[#94A3B8] hidden sm:inline">Vetted Executive Standards</span>
          </div> */}

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] leading-tight sm:leading-[1.1] tracking-tight font-editorial text-white font-normal max-w-4xl mx-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)] text-center">
            Your chauffeur awaits.
          </h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg text-[#CBD5E1] font-light max-w-xl mx-auto drop-shadow-md">
            Seamless airport transfers, hourly private standby, and handcrafted New Zealand escapes.
          </p>
        </div>

        {/* Booking Card Container */}
        <div className="hero-booking-wrapper w-full">
          <div className="booking-card w-full will-change-transform">
            <BookingWidget />
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero as HeroSection };
export default Hero;
