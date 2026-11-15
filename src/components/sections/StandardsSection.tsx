"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";

export function StandardsSection() {
  return (
    <section id="standards" className="standards-section py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0B0E14] text-white border-b border-white/10 relative overflow-hidden">
      {/* Subtle Ambient Radial Highlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[350px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, rgba(197, 160, 89, 0.05), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mx-auto max-w-3xl mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#C5A059] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Uncompromising Benchmark</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-editorial font-normal tracking-tight text-white mb-3">
            Expect excellence.
          </h2>
          <h3 className="text-base sm:text-xl text-[#94A3B8] font-light">
            Leave the vehicle refreshed and ready for what&apos;s next.
          </h3>
        </FadeIn>

        {/* 3 Pillars with Elevated Obsidian Cards & Gold Vector Accents */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Pillar 1 */}
          <StaggerItem className="flex flex-col items-start text-left p-7 sm:p-8 rounded-2xl bg-[#131922]/85 hover:bg-[#1A222E] border border-white/10 hover:border-[#C5A059]/40 transition-all duration-300 shadow-xl group hover:-translate-y-1">
            <div className="h-24 mb-6 flex items-center group-hover:scale-105 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="140" height="84" fill="none" viewBox="0 0 292 200">
                <path fill="#0F63BD" d="M136.326 141.162c0-34.681 28.114-62.795 62.795-62.795h29.513c34.68 0 62.794 28.114 62.794 62.795 0 10.404-8.434 18.838-18.838 18.838H155.164c-10.404 0-18.838-8.434-18.838-18.838M246.531 32.653c0 18.034-14.62 32.653-32.653 32.653s-32.653-14.62-32.653-32.653S195.844 0 213.878 0s32.653 14.62 32.653 32.653"></path>
                <path fill="#C5A059" fillOpacity="0.35" d="M204.082 71.735c0-19.33-15.67-35-35-35H35c-19.33 0-35 15.67-35 35v66.687c0 19.33 15.67 35 35 35h26.243a35 35 0 0 1 24.962 10.466l8.704 8.856c3.919 3.987 10.345 3.987 14.264 0l8.704-8.856a35 35 0 0 1 24.961-10.466h26.244c19.33 0 35-15.67 35-35z"></path>
                <path fill="#0F63BD" d="M85.95 93.674c0 8.453-6.815 15.306-15.22 15.306s-15.22-6.853-15.22-15.306c0-8.454 6.814-15.307 15.22-15.307 8.405 0 15.22 6.853 15.22 15.307"></path>
                <path fill="#0F63BD" d="M110.3 93.674c0 8.453-6.814 15.306-15.22 15.306-8.405 0-15.219-6.853-15.219-15.306 0-8.454 6.814-15.307 15.22-15.307 8.405 0 15.219 6.853 15.219 15.307"></path>
                <path fill="#C5A059" d="M82.905 127.347 59.18 103.623h47.45z"></path>
              </svg>
            </div>
            <h4 className="text-xl font-medium text-white mb-2 group-hover:text-[#F4E8D1] transition-colors">
              Available worldwide
            </h4>
            <p className="text-sm sm:text-base text-[#94A3B8] font-light leading-relaxed">
              Expert vetted chauffeurs across 500+ cities in 50 countries, with specialized New Zealand concierge coverage.
            </p>
          </StaggerItem>

          {/* Pillar 2 */}
          <StaggerItem className="flex flex-col items-start text-left p-7 sm:p-8 rounded-2xl bg-[#131922]/85 hover:bg-[#1A222E] border border-white/10 hover:border-[#C5A059]/40 transition-all duration-300 shadow-xl group hover:-translate-y-1">
            <div className="h-24 mb-6 flex items-center group-hover:scale-105 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="140" height="84" fill="none" viewBox="0 0 271 182">
                <path fill="#0F63BD" d="M271 64.5c0 35.622-28.878 64.5-64.5 64.5S142 100.122 142 64.5 170.878 0 206.5 0 271 28.878 271 64.5"></path>
                <path fill="#C5A059" fillOpacity="0.3" d="M224 181.997c26.003-.268 47-21.43 47-47.497 0-26.234-21.266-47.5-47.5-47.5q-2.449 0-4.833.243C212.724 69.659 196.09 57 176.5 57c-4.99 0-9.788.821-14.267 2.336C157.875 33.6 135.477 14 108.5 14 78.4 14 54 38.4 54 68.5q.001 2.787.274 5.5H54C24.177 74 0 98.177 0 128s24.177 54 54 54h170z"></path>
              </svg>
            </div>
            <h4 className="text-xl font-medium text-white mb-2 group-hover:text-[#F4E8D1] transition-colors">
              High-end executive fleet
            </h4>
            <p className="text-sm sm:text-base text-[#94A3B8] font-light leading-relaxed">
              Only recent, pristine models from Mercedes-Benz, BMW, and Audi, meticulously sanitized before every ride.
            </p>
          </StaggerItem>

          {/* Pillar 3 */}
          <StaggerItem className="flex flex-col items-start text-left p-7 sm:p-8 rounded-2xl bg-[#131922]/85 hover:bg-[#1A222E] border border-white/10 hover:border-[#C5A059]/40 transition-all duration-300 shadow-xl group hover:-translate-y-1">
            <div className="h-24 mb-6 flex items-center group-hover:scale-105 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="105" height="84" fill="none" viewBox="0 0 173 215">
                <path fill="#0F63BD" d="M86.5 0C38.729 0 0 38.729 0 86.5c0 47.772 38.729 86.5 86.5 86.5s86.5-38.728 86.5-86.5C173 38.729 134.271 0 86.5 0"></path>
                <path fill="#C5A059" d="M86.5 45a41.5 41.5 0 1 0 0 83 41.5 41.5 0 0 0 0-83m-9.337 59.882-15.8-15.8 5.869-5.868 9.931 9.931 24.538-24.538 5.869 5.869z"></path>
              </svg>
            </div>
            <h4 className="text-xl font-medium text-white mb-2 group-hover:text-[#F4E8D1] transition-colors">
              Safe & guaranteed reliability
            </h4>
            <p className="text-sm sm:text-base text-[#94A3B8] font-light leading-relaxed">
              Background-checked, senior VIP-accredited chauffeurs with flight monitoring and guaranteed punctual pickups.
            </p>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}

export default StandardsSection;