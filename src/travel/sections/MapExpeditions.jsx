"use client";
import React, { useState, useRef } from 'react';
import { expeditionsHeader, expeditionsData } from '../data/homeData';
import NewZealandMap from '../components/NewZealandMap';

export default function MapExpeditions() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const cardsRef = useRef(null);

  const activeRegionId = hoveredRegion || selectedRegion;

  const handleSelect = (id) => {
    setSelectedRegion((prev) => (prev === id ? null : id));
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section id="expeditions" className="relative z-20 bg-surface text-persian py-[140px] px-6 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] -mt-[100vh]">
      <div className="max-w-[1440px] mx-auto">
        {/* Top Centered Header Block (Kudanil Style) */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-[44px] sm:text-[64px] md:text-[80px] leading-[1.05] font-display font-normal text-persian">
            {expeditionsHeader.title}
          </h2>
          <p className="text-sm sm:text-base max-w-2xl mx-auto text-center mt-6 text-persian/85 font-light leading-relaxed">
            {expeditionsHeader.description}
          </p>
          <a
            href="#contact"
            className="border border-persian/30 px-6 py-3 rounded-[4px] text-xs tracking-widest uppercase mt-8 hover:bg-persian hover:text-light transition-all duration-[650ms] ease-kudanil font-semibold"
          >
            {expeditionsHeader.buttonText || 'EXPLORE EXPEDITIONS'}
          </a>
        </div>

        {/* Real High-Resolution Cartographic New Zealand SVG Map */}
        <NewZealandMap
          activeRegionId={activeRegionId}
          onSelectRegion={handleSelect}
          onHoverRegion={setHoveredRegion}
        />

        {/* 4 Most Popular Luxury Travel Destination Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 -mt-6 sm:-mt-10 relative z-20">
          {expeditionsData.map((card) => {
            const isActive = activeRegionId === card.id;
            return (
              <div
                key={card.id}
                onClick={() => handleSelect(card.id)}
                onMouseEnter={() => setHoveredRegion(card.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                className={`aspect-[4/3] rounded-[8px] overflow-hidden relative group cursor-pointer transition-all duration-500 ease-out ${
                  isActive
                    ? '-translate-y-4 scale-[1.03] shadow-2xl ring-2 ring-[#C59B27]'
                    : 'translate-y-0 scale-100 shadow-sm hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Top-Left Pin Icon Badge matching Map Pin */}
                <div
                  className={`absolute top-3.5 left-3.5 z-20 w-8 h-8 rounded-[6px] flex items-center justify-center transition-all duration-300 border shadow-md ${
                    isActive
                      ? 'bg-[#8C6D3F] border-[#D4AF37] text-white shadow-[0_4px_12px_rgba(212,175,55,0.4)]'
                      : 'border-[#B8A692]/60 bg-[#F2EBE3]/80 text-[#8C7A65] backdrop-blur-sm group-hover:bg-white'
                  }`}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                  </svg>
                </div>

                {/* Card Full-Bleed Photography */}
                <img
                  src={card.image}
                  alt={card.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                    isActive ? 'scale-105' : 'group-hover:scale-105'
                  }`}
                />

                {/* Bottom Dark Gradient Overlay with Typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C]/95 via-[#0B192C]/40 to-transparent p-5 sm:p-6 flex flex-col justify-end text-light pointer-events-none">
                  <span className="text-[11px] text-white/80 tracking-wider font-light uppercase">
                    {card.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-medium text-white mt-1 drop-shadow-sm leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs text-white/70 font-light mt-2 line-clamp-2 leading-relaxed">
                    {card.highlights}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
