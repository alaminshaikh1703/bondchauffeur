"use client";

import React from "react";
import { Luggage, Sliders, BatteryCharging, Sparkles } from "lucide-react";

export function SanctuarySection() {
  return (
    <section
      id="sanctuary"
      className="sanctuary-section relative w-full h-[100svh] min-h-[100svh] overflow-hidden bg-[#0B0E14] select-none"
    >
      {/* 1. Centered Top Heading Block (Autonomous entrance + Scroll-tied exit) */}
      <div className="sanctuary-heading-block absolute top-6 sm:top-12 md:top-16 inset-x-0 z-40 text-center px-4 sm:px-6 pointer-events-none will-change-[opacity,transform]">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-xs font-medium text-[#C5A059] mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>The Cabin Sanctuary</span>
        </div>
        <h2 className="sanctuary-title text-3xl sm:text-5xl md:text-6xl font-editorial font-normal tracking-tight text-white mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] will-change-[opacity,transform,filter]">
          Step in. Breathe out.
        </h2>
        <p className="sanctuary-subtitle text-xs sm:text-base md:text-lg text-white/90 font-light max-w-xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] will-change-[opacity,transform,filter]">
          Thoughtful details and discreet service transform every journey into your personal sanctuary.
        </p>
      </div>

      {/* 2. Full-Screen Edge-to-Edge Slides Container */}
      <div className="sanctuary-container w-full h-[100svh] min-h-[100svh] relative overflow-hidden">
        {/* =========================================
            SLIDE 3: "Recharge your batteries" (Base z-10)
           ========================================= */}
        <div className="sanctuary-slide sanctuary-slide-3 absolute inset-0 w-full h-full overflow-hidden z-10 will-change-transform">
          <img
            src="/pic 123/tuch.webp"
            alt="Recharge your batteries - Universal charging and calm cabin"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50 pointer-events-none" />

          {/* Frosted Luxury Glass Info Pill */}
          <div className="absolute bottom-6 sm:bottom-12 left-4 sm:left-10 md:left-16 right-4 sm:right-auto max-w-md sm:max-w-lg z-20 pointer-events-none">
            <div className="luxury-glass-card p-5 sm:p-7 rounded-2xl border border-white/20 backdrop-blur-2xl bg-[#0B0E14]/85 shadow-2xl">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#C5A059]/15 flex items-center justify-center text-[#C5A059] border border-[#C5A059]/30 shrink-0">
                  <BatteryCharging className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-editorial font-normal text-white tracking-tight">
                  Recharge on the move
                </h3>
              </div>
              <p className="text-xs sm:text-[15px] text-white/90 leading-relaxed font-light">
                Fast multi-device chargers, chilled premium spring water, and acoustic glass isolation keep you fully refreshed.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================
            SLIDE 2: "You set the tone" (Middle z-20)
           ========================================= */}
        <div className="sanctuary-slide sanctuary-slide-2 absolute inset-0 w-full h-full overflow-hidden z-20 will-change-transform">
          <img
            src="/pic 123/woman.jpg"
            alt="You set the tone - Personalized climate and audio preferences"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50 pointer-events-none" />

          {/* Frosted Luxury Glass Info Pill */}
          <div className="absolute bottom-6 sm:bottom-12 left-4 sm:left-10 md:left-16 right-4 sm:right-auto max-w-md sm:max-w-lg z-20 pointer-events-none">
            <div className="luxury-glass-card p-5 sm:p-7 rounded-2xl border border-white/20 backdrop-blur-2xl bg-[#0B0E14]/85 shadow-2xl">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#C5A059]/15 flex items-center justify-center text-[#C5A059] border border-[#C5A059]/30 shrink-0">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-editorial font-normal text-white tracking-tight">
                  You set the tone
                </h3>
              </div>
              <p className="text-xs sm:text-[15px] text-white/90 leading-relaxed font-light">
                Sit back and relax. Cabin audio, acoustic privacy, and multi-zone climate control are adjusted precisely to your comfort.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================
            SLIDE 1: "A welcome like no other" (Top z-30)
           ========================================= */}
        <div className="sanctuary-slide sanctuary-slide-1 absolute inset-0 w-full h-full overflow-hidden z-30 will-change-transform">
          <img
            src="/pic 123/men.webp"
            alt="A welcome like no other - Chauffeur greeting and luggage handling"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50 pointer-events-none" />

          {/* Frosted Luxury Glass Info Pill */}
          <div className="absolute bottom-6 sm:bottom-12 left-4 sm:left-10 md:left-16 right-4 sm:right-auto max-w-md sm:max-w-lg z-20 pointer-events-none">
            <div className="luxury-glass-card p-5 sm:p-7 rounded-2xl border border-white/20 backdrop-blur-2xl bg-[#0B0E14]/85 shadow-2xl">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#C5A059]/15 flex items-center justify-center text-[#C5A059] border border-[#C5A059]/30 shrink-0">
                  <Luggage className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-editorial font-normal text-white tracking-tight">
                  A welcome like no other
                </h3>
              </div>
              <p className="text-xs sm:text-[15px] text-white/90 leading-relaxed font-light">
                The door is opened for you. Your luggage is stowed with care. Total peace of mind from the moment you meet your chauffeur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { SanctuarySection as ExperienceSection };
export default SanctuarySection;