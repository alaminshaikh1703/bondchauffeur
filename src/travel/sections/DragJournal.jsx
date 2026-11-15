"use client";
import React, { useState, useRef, useEffect } from 'react';
import { journalDragSlides, pressCards } from '../data/homeData';

export default function DragJournal() {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const [sliderRef, pressRef] = [useRef(null), useRef(null)];
  const [isDownRef, startXRef, scrollLeftRef, velXRef, lastXRef, rafIdRef] = [useRef(false), useRef(0), useRef(0), useRef(0), useRef(0), useRef(null)];

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    isDownRef.current = true;
    setIsDragging(true);
    startXRef.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeftRef.current = sliderRef.current.scrollLeft;
    velXRef.current = 0;
    lastXRef.current = e.pageX;
    cancelAnimationFrame(rafIdRef.current);
  };

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    if (!isDownRef.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.35;
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
    velXRef.current = e.pageX - lastXRef.current;
    lastXRef.current = e.pageX;
  };

  const handleMouseUp = () => {
    if (!isDownRef.current) return;
    isDownRef.current = false;
    setIsDragging(false);

    let velocity = velXRef.current * 1.6;
    const glide = () => {
      if (!sliderRef.current || Math.abs(velocity) < 0.2) return;
      sliderRef.current.scrollLeft -= velocity;
      velocity *= 0.93; // silky inertia damping
      rafIdRef.current = requestAnimationFrame(glide);
    };
    rafIdRef.current = requestAnimationFrame(glide);
  };

  useEffect(() => () => cancelAnimationFrame(rafIdRef.current), []);

  const handlePressScroll = (dir) => {
    if (pressRef.current) pressRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  return (
    <section id="journal" className="bg-surface text-persian py-[150px] relative overflow-hidden">
      {isHovering && (
        <div className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 bg-[#7A7D82]/90 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-[4px] tracking-widest uppercase font-medium shadow-xl select-none" style={{ left: mousePos.x, top: mousePos.y }}>
          {isDragging ? 'Dragging...' : '← Drag →'}
        </div>
      )}

      {/* Part A: Horizontal Drag Slider */}
      <div className="relative">
        <div className="max-w-[1440px] mx-auto px-6 mb-12">
          <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase">THE SOUTHERN PRIVATE JOURNEY // 10 DAYS</span>
          <h2 className="text-[44px] sm:text-[60px] md:text-[80px] font-display font-normal leading-[1.05] mt-2">From the Page to the Passage</h2>
          <p className="text-sm sm:text-base text-persian/80 max-w-2xl mt-4 font-light leading-relaxed">
            Christchurch • Banks Peninsula • Aoraki / Mount Cook • Queenstown • The Restorative Finale
          </p>
        </div>

        <div
          ref={sliderRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => { setIsHovering(false); handleMouseUp(); }}
          onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
          className="flex gap-6 overflow-x-auto no-scrollbar px-6 md:px-12 cursor-grab active:cursor-grabbing select-none pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {journalDragSlides.map((slide) => {
            const isDark = slide.theme === 'dark';
            return (
              <div
                key={slide.id}
                className={`flex-shrink-0 w-[340px] sm:w-[480px] md:w-[540px] rounded-[4px] p-8 md:p-10 flex flex-col justify-between border transition-shadow duration-300 ${
                  isDark ? 'bg-persian text-light border-persian shadow-xl' : 'bg-[#EDE5DC] text-persian border-persian/15 shadow-sm'
                }`}
              >
                <div>
                  <span className={`text-[11px] tracking-[0.25em] font-mono block mb-4 ${isDark ? 'text-accent' : 'text-persian/70'}`}>
                    {slide.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-normal leading-[1.15] mb-4">{slide.title}</h3>
                  <p className={`text-sm sm:text-base font-light leading-relaxed mb-6 ${isDark ? 'text-surface/90' : 'text-persian/80'}`}>{slide.intro}</p>
                </div>
                <div className="my-4">
                  {slide.imageB ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="aspect-[4/3] rounded-[4px] overflow-hidden"><img src={slide.imageA} alt={slide.title} className="w-full h-full object-cover" /></div>
                      <div className="aspect-[4/3] rounded-[4px] overflow-hidden"><img src={slide.imageB} alt={slide.title} className="w-full h-full object-cover" /></div>
                    </div>
                  ) : (
                    <div className="aspect-[16/9] rounded-[4px] overflow-hidden"><img src={slide.imageA} alt={slide.title} className="w-full h-full object-cover" /></div>
                  )}
                </div>
                <div className="pt-4 border-t border-current/10">
                  <a href="#contact" className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase hover:underline">
                    <span>{slide.link}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part B: As Seen In Press Section */}
      <div className="relative max-w-[1440px] mx-auto px-6 mt-36">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase">GLOBAL ACCLAIM</span>
            <h2 className="text-[44px] sm:text-[60px] md:text-[80px] font-display font-normal leading-[1.05] text-persian mt-2">As Seen In</h2>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => handlePressScroll('left')} className="w-11 h-11 rounded-[4px] border border-persian/30 flex items-center justify-center hover:bg-persian hover:text-light transition-all duration-300" aria-label="Previous Press Article">←</button>
            <button type="button" onClick={() => handlePressScroll('right')} className="w-11 h-11 rounded-[4px] border border-persian/30 flex items-center justify-center hover:bg-persian hover:text-light transition-all duration-300" aria-label="Next Press Article">→</button>
          </div>
        </div>

        <div ref={pressRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto no-scrollbar scroll-smooth">
          {pressCards.map((card) => (
            <div key={card.id} className="aspect-[3/4] rounded-[4px] overflow-hidden group relative bg-persian shadow-lg cursor-pointer flex-shrink-0">
              <img src={card.image} alt={card.publication} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[650ms] ease-kudanil opacity-85" />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-persian/85 backdrop-blur-md rounded-[4px] border border-light/20 text-xs font-semibold text-light uppercase tracking-wider">{card.publication}</div>
              <div className="absolute inset-0 bg-gradient-to-t from-persian via-persian/30 to-transparent p-6 flex flex-col justify-end text-light">
                <p className="text-base sm:text-lg font-display text-white italic drop-shadow-sm leading-snug">"{card.quote}"</p>
                <span className="text-[10px] tracking-widest text-accent uppercase mt-3 font-mono">{card.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
