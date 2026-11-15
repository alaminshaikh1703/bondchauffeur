"use client";
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { yachtIntro } from '../data/homeData';

gsap.registerPlugin(ScrollTrigger);

export default function YachtShowcase() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current || !textRef.current) return;

    // 1) Strong Initial Zoom-In -> Scroll-Synced Zoom-Out (/exp.webp)
    gsap.fromTo(
      imageRef.current,
      { scale: 2.05, transformOrigin: 'center 60%' },
      {
        scale: 1.0,
        transformOrigin: 'center 60%',
        ease: 'none',
        immediateRender: true,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );

    // 2) Smooth Staggered Entrance Animation for SEC-03 Text
    gsap.fromTo(
      textRef.current.children,
      { y: 70, opacity: 0, filter: 'blur(6px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'top 25%',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="yacht"
      ref={containerRef}
      className="relative w-full bg-[#EFE1D4] text-persian overflow-x-hidden"
    >

      {/* Seamless Top Sky Blend from SEC-02 (#F2EBE3) into SEC-03 sky (#EFE1D4) */}
      <div className="absolute top-0 left-0 right-0 h-40 md:h-52 bg-gradient-to-b from-[#F2EBE3] to-transparent pointer-events-none z-10" />

      {/* Upper Sky Header Block Above the Mountain Peak */}
      <div className="relative z-20 pt-28 md:pt-40 pb-12 px-6 text-center">
        <div
          ref={textRef}
          className="flex flex-col items-center max-w-3xl mx-auto will-change-transform [backface-visibility:hidden] transform-gpu"
        >
          <span className="text-accent text-xs tracking-[0.3em] font-medium uppercase mb-4 will-change-[transform,opacity,filter]">
            The Southern
Private Journey
          </span>
          <h2 className="text-[44px] sm:text-[56px] md:text-[80px] leading-[1.05] font-display font-normal text-persian drop-shadow-sm will-change-[transform,opacity,filter]">
            For those who prefer to travel
differently.
          </h2>
          <p className="text-sm sm:text-base max-w-2xl mx-auto mt-6 text-persian/85 font-light leading-relaxed drop-shadow-sm will-change-[transform,opacity,filter]">
            A private journey through the South Island, arranged entirely around two guests and their own pace.
From the Southern Alps to Milford Sound, every detail is considered before it is ever asked for.
          </p>
          <a
            href="#story"
            className="border border-persian/40 bg-white/40 backdrop-blur-sm px-6 py-3 rounded-[4px] text-xs tracking-widest uppercase mt-8 text-persian hover:bg-persian hover:text-light transition-all duration-[650ms] ease-kudanil font-semibold shadow-sm will-change-[transform,opacity,filter]"
          >
            {yachtIntro.buttonText}
          </a>
        </div>
      </div>

      {/* 100% Uncropped Image Container (Zero Top or Bottom Cropping) */}
      <div className="relative w-full overflow-hidden -mt-6 md:-mt-10">
        {/* Soft top gradient blend overlay */}
        <div className="absolute top-0 left-0 right-0 h-28 md:h-40 bg-gradient-to-b from-[#EFE1D4] via-[#EFE1D4]/60 to-transparent pointer-events-none z-10" />

        <img
          ref={imageRef}
          src="/travel7.webp"
          alt="Mount Taranaki expedition"
          width={2752}
          height={1536}
          className="w-full h-auto block select-none will-change-transform [backface-visibility:hidden] transform-gpu"
          style={{
            transformOrigin: 'center 60%',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 100%)',
          }}
          onLoad={() => ScrollTrigger.refresh()}
        />
      </div>
    </section>
  );
}
