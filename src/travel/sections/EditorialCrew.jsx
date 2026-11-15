"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { editorialCrewData } from '../data/homeData';

gsap.registerPlugin(ScrollTrigger);

export default function EditorialCrew() {
  const containerRef = useRef(null);
  const [item1, item2, item3] = editorialCrewData.items;

  useGSAP(() => {
    if (!containerRef.current) return;

    const images = gsap.utils.toArray('.sec04-photo-card img', containerRef.current);
    images.forEach((img) => {
      const card = img.closest('.sec04-photo-card') || img;
      gsap.killTweensOf(img);
      gsap.fromTo(
        img,
        {
          scale: 1.75,
          yPercent: -12,
          transformOrigin: 'center center',
        },
        {
          scale: 1.0,
          yPercent: 12,
          transformOrigin: 'center center',
          ease: 'none',
          immediateRender: true,
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="story" ref={containerRef} className="relative bg-surface text-persian py-[150px] px-6">
      <div className="max-w-[1440px] mx-auto space-y-24 md:space-y-32">
        {/* Story Part 1: A spirit of Manaakitanga (Single Large Photo Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase mb-4">{editorialCrewData.sectionTag}</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal leading-[1.08] text-persian mb-6">{item1.title}</h2>
            <p className="text-base sm:text-lg text-persian/85 font-light leading-relaxed max-w-lg">{item1.text}</p>
          </div>
          <div className="lg:col-span-7 flex justify-center lg:justify-end items-center">
            <div className="sec04-photo-card w-full max-w-[560px] md:max-w-[640px] h-[580px] md:h-[680px] rounded-sm overflow-hidden shadow-lg ml-auto border border-persian/10">
              <img
                src={item1.image1}
                alt="Private lodge serenity"
                className="w-full h-full object-cover will-change-transform [backface-visibility:hidden] transform-gpu"
                style={{ transformOrigin: 'center center' }}
                onLoad={() => ScrollTrigger.refresh()}
              />
            </div>
          </div>
        </div>

        {/* Story Part 2: Elite local hosts & guides (Inverted 2-Column, +20% Size) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="sec04-photo-card w-full max-w-[580px] md:max-w-[660px] h-[520px] md:h-[640px] rounded-sm overflow-hidden shadow-xl border border-persian/10">
              <img
                src={item2.image}
                alt="Elite naturalist host"
                className="w-full h-full object-cover will-change-transform [backface-visibility:hidden] transform-gpu"
                style={{ transformOrigin: 'center center' }}
                onLoad={() => ScrollTrigger.refresh()}
              />
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
            <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase mb-4">UNCOMPROMISED STANDARDS</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal leading-[1.08] text-persian mb-6">{item2.title}</h2>
            <p className="text-base sm:text-lg text-persian/85 font-light leading-relaxed max-w-lg">{item2.text}</p>
          </div>
        </div>

        {/* Story Part 3: Personalized Itineraries (+20% Size) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase mb-4">FLUID EXPLORATION</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal leading-[1.08] text-persian mb-6">{item3.title}</h2>
            <p className="text-base sm:text-lg text-persian/85 font-light leading-relaxed max-w-lg">{item3.text}</p>
          </div>
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="sec04-photo-card w-full max-w-[620px] md:max-w-[740px] h-[460px] md:h-[560px] rounded-sm overflow-hidden shadow-xl border border-persian/10">
              <img
                src={item3.topDownImage}
                alt="Aerial fiordland exploration"
                className="w-full h-full object-cover will-change-transform [backface-visibility:hidden] transform-gpu"
                style={{ transformOrigin: 'center center' }}
                onLoad={() => ScrollTrigger.refresh()}
              />
            </div>
          </div>
        </div>

  
{/* Full Screen Crew Briefing Image Reveal */}
<div className="sec04-photo-card relative left-1/2 -translate-x-1/2 w-screen max-w-none h-screen min-h-[120svh] rounded-none overflow-hidden shadow-2xl border-0">

  <img
    src={item3.fullBleedImage}
    alt="Southern Alps private expedition route"
    className="absolute inset-0 w-full h-full object-cover object-center will-change-transform [backface-visibility:hidden] transform-gpu"
    style={{ transformOrigin: 'center center' }}
    onLoad={() => ScrollTrigger.refresh()}
  />

  <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-persian/80 backdrop-blur-md px-5 py-2.5 rounded-[4px] border border-light/20 text-light">
    <span className="text-[11px] md:text-xs tracking-[0.25em] uppercase font-medium">
      EXPEDITION BRIEFING // AOTEAROA PRIVATE SANCTUARY
    </span>
  </div>

</div>

      </div>
    </section>
  );
}
