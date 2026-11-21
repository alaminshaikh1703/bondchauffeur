"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { expeditionsHeader, expeditionsData } from '../data/homeData';
import NewZealandMap from '../components/NewZealandMap';
import LocationFlipModal from '../components/LocationFlipModal';

gsap.registerPlugin(ScrollTrigger);

const INITIAL_VISIBLE_COUNT = 4;

export default function MapExpeditions({ className = "" }) {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [modalLocation, setModalLocation] = useState(null);
  const [flippingCardId, setFlippingCardId] = useState(null);
  const cardsRef = useRef(null);
  const cardElementRefs = useRef({});

  const activeRegionId = hoveredRegion || selectedRegion;
  const visibleCards = showAll
    ? expeditionsData
    : expeditionsData.slice(0, INITIAL_VISIBLE_COUNT);

  // Refresh ScrollTrigger whenever grid height expands or collapses
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(raf);
  }, [showAll]);

  const handleMapSelect = (id) => {
    const idx = expeditionsData.findIndex((item) => item.id === id);
    const needsExpand = idx >= INITIAL_VISIBLE_COUNT && !showAll;

    setSelectedRegion(id);
    if (needsExpand) {
      setShowAll(true);
    }

    requestAnimationFrame(() => {
      const targetEl = cardElementRefs.current[id] || cardsRef.current;
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  };

  const handleCardClick = (card) => {
    setSelectedRegion(card.id);
    setFlippingCardId(card.id);
    setModalLocation(card);
  };

  const handleCloseModal = () => {
    setModalLocation(null);
    setFlippingCardId(null);
  };

  const remainingCount = Math.max(0, expeditionsData.length - INITIAL_VISIBLE_COUNT);

  return (
    <section
      id="expeditions"
      className={`relative z-20 bg-[#F2EBE3] text-persian ${className}`.trim()}
    >
      {/* 1) Solid Background Text Header Block */}
      <div className="bg-[#F2EBE3] pt-28 md:pt-36 pb-16 md:pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase mb-4">
            South Island Expeditions
          </span>
          <h2 className="text-[44px] sm:text-[56px] md:text-[80px] leading-[1.05] font-display font-normal text-persian">
            {expeditionsHeader.title}
          </h2>
          <p className="text-sm sm:text-base max-w-2xl mx-auto text-center mt-6 text-persian/85 font-light leading-relaxed">
            {expeditionsHeader.description}
          </p>
          <a
            href="#contact"
            className="border border-persian/40 bg-white/40 px-6 py-3 rounded-[4px] text-xs tracking-widest uppercase mt-8 text-persian hover:bg-persian hover:text-light transition-all duration-[650ms] ease-kudanil font-semibold"
          >
            {expeditionsHeader.buttonText || 'EXPLORE EXPEDITIONS'}
          </a>
        </div>
      </div>

      {/* 2) Full-Width Clear Background Image (travel15.jpeg) + South Island Map */}
      <div className="relative w-full overflow-hidden py-12 md:py-16 px-6">
        <img
          src="/mapbg5.jpeg"
          alt="South Island New Zealand Alpine Landscape"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        />

        <div className="relative z-10 max-w-[1440px] mx-auto">
          <NewZealandMap
            activeRegionId={activeRegionId}
            onSelectRegion={handleMapSelect}
            onHoverRegion={setHoveredRegion}
          />
        </div>
      </div>

      {/* 3) South Island Location Cards (4 visible initially on Desktop & Mobile + Explore More for all 9) */}
      <div className="bg-[#F2EBE3] py-14 sm:py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-[1440px] mx-auto">
          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative z-20"
            style={{ perspective: '1200px' }}
          >
            {visibleCards.map((card) => {
              const isActive = activeRegionId === card.id;
              const isFlipping = flippingCardId === card.id;
              const hasOtherActive = Boolean(activeRegionId && !isActive);

              return (
                <motion.div
                  key={card.id}
                  ref={(el) => {
                    if (el) cardElementRefs.current[card.id] = el;
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Explore ${card.title}`}
                  onClick={() => handleCardClick(card)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick(card);
                    }
                  }}
                  onMouseEnter={() => setHoveredRegion(card.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    rotateY: isFlipping ? 180 : 0,
                    y: isActive && !isFlipping ? -8 : 0,
                    scale: isFlipping ? 0.94 : isActive ? 1.03 : 1,
                    opacity: isFlipping ? 0.45 : hasOtherActive ? 0.78 : 1,
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className={`aspect-[4/3] rounded-[10px] overflow-hidden relative group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C59B27] ${
                    isActive
                      ? 'ring-2 ring-[#C59B27] z-30'
                      : 'z-10'
                  }`}
                >
                  {/* Top-Left Pin Icon Badge matching Map Pin */}
                  <div
                    className={`absolute top-3.5 left-3.5 z-20 w-8 h-8 rounded-[6px] flex items-center justify-center transition-all duration-300 border ${
                      isActive
                        ? 'bg-[#8C6D3F] border-[#D4AF37] text-white'
                        : 'border-[#B8A692]/60 bg-[#F2EBE3]/85 text-[#8C7A65] backdrop-blur-sm group-hover:bg-white'
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
                    <h3 className="text-xl sm:text-2xl font-display font-medium text-white mt-1 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-white/75 font-light mt-2 line-clamp-2 leading-relaxed">
                      {card.highlights}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Explore More / Show Less Toggle Button */}
          {remainingCount > 0 && (
            <div className="mt-10 sm:mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="inline-flex items-center gap-2.5 border border-persian/40 bg-white/50 hover:bg-persian hover:text-light text-persian px-7 py-3.5 rounded-[4px] text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 cursor-pointer min-h-[44px]"
              >
                {showAll ? (
                  <>
                    <span>Show Less</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Explore More</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Flip Popup Image Slider Modal */}
      <LocationFlipModal location={modalLocation} onClose={handleCloseModal} />
    </section>
  );
}
