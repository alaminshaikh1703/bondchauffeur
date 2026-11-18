"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0.4,
    scale: 1.04,
  }),
  center: {
    x: '0%',
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? '-35%' : '35%',
    opacity: 0.2,
    scale: 0.98,
  }),
};

export default function LocationFlipModal({ location, onClose }) {
  const [[currentIndex, direction], setSlide] = useState([0, 0]);

  const images =
    location?.gallery && location.gallery.length > 0
      ? location.gallery
      : location?.image
      ? [location.image]
      : [];

  const total = images.length;

  // Reset to first slide whenever a new location opens
  useEffect(() => {
    setSlide([0, 0]);
  }, [location?.id]);

  // Preload all gallery images for instant, jank-free sliding
  useEffect(() => {
    if (!images.length) return;
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [location?.id]);

  const paginate = useCallback(
    (newDirection) => {
      if (total <= 1) return;
      setSlide(([prevIndex]) => {
        const nextIndex = (prevIndex + newDirection + total) % total;
        return [nextIndex, newDirection];
      });
    },
    [total]
  );

  const goToSlide = (targetIndex) => {
    if (targetIndex === currentIndex) return;
    setSlide([targetIndex, targetIndex > currentIndex ? 1 : -1]);
  };

  // Lock page & Lenis scroll and listen for keyboard navigation while open
  useEffect(() => {
    if (!location) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.stop();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') paginate(1);
      else if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [location, onClose, paginate]);

  const handleDragEnd = (_event, { offset, velocity }) => {
    const swipeThreshold = 45;
    if (offset.x < -swipeThreshold || velocity.x < -350) {
      paginate(1);
    } else if (offset.x > swipeThreshold || velocity.x > 350) {
      paginate(-1);
    }
  };

  return (
    <AnimatePresence>
      {location && (
        <motion.div
          key="location-flip-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={location.title}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#04101D]/80 backdrop-blur-md p-3 sm:p-6 md:p-10"
          style={{ perspective: '1600px' }}
        >
          {/* 3D Flip-In Mobile-First Popup Card */}
          <motion.div
            key={location.id}
            initial={{ rotateY: -88, scale: 0.84, opacity: 0 }}
            animate={{ rotateY: 0, scale: 1, opacity: 1 }}
            exit={{ rotateY: 72, scale: 0.88, opacity: 0 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
            className="relative w-full max-w-[440px] sm:max-w-[680px] lg:max-w-[920px] h-[74dvh] max-h-[620px] sm:h-auto sm:aspect-[16/10] sm:max-h-[82vh] rounded-[16px] sm:rounded-[20px] overflow-hidden bg-[#061524] ring-1 ring-white/15 select-none"
          >
            {/* Top Bar Controls: Slide Counter + Close Button */}
            <div className="absolute top-3.5 left-3.5 right-3.5 sm:top-5 sm:left-5 sm:right-5 z-30 flex items-center justify-between pointer-events-none">
              <div className="pointer-events-auto px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-[11px] font-medium tracking-[0.2em] text-white/95 tabular-nums">
                {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close location preview"
                className="pointer-events-auto w-11 h-11 rounded-full bg-black/45 hover:bg-black/70 active:scale-95 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Swipeable Image Slider */}
            <div className="relative w-full h-full overflow-hidden touch-pan-y">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={`${location.id}-slide-${currentIndex}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.22}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
                >
                  <img
                    src={images[currentIndex]}
                    alt={
                      currentIndex === 0
                        ? location.title
                        : `${location.title} — view ${currentIndex + 1}`
                    }
                    draggable={false}
                    className="w-full h-full object-cover object-center pointer-events-none select-none"
                  />

                  {/* Heading & Little Bio ONLY on First Image (Slide 0); Slides 1..3 remain pure flat images */}
                  {currentIndex === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.42, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-x-0 bottom-0 pt-24 pb-14 sm:pb-16 px-5 sm:px-8 md:px-10 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none"
                    >
                      <span className="inline-block text-[10px] sm:text-xs tracking-[0.24em] uppercase text-[#D4AF37] font-medium mb-2">
                        {location.subtitle}
                      </span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white leading-tight tracking-tight">
                        {location.title}
                      </h3>
                      <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-white/85 font-light leading-relaxed max-w-xl">
                        {location.bio || location.highlights}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Previous / Next Navigation Arrows (44px Mobile-First Tap Targets) */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  aria-label="Previous image"
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/65 active:scale-95 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => paginate(1)}
                  aria-label="Next image"
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-black/65 active:scale-95 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Bottom Pagination Dots */}
            {total > 1 && (
              <div className="absolute bottom-4 sm:bottom-5 inset-x-0 z-30 flex items-center justify-center gap-2 pointer-events-none">
                <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/15">
                  {images.map((_, idx) => {
                    const isCurrent = idx === currentIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => goToSlide(idx)}
                        aria-label={`View image ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          isCurrent
                            ? 'w-7 bg-[#D4AF37]'
                            : 'w-2 bg-white/55 hover:bg-white/90'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
