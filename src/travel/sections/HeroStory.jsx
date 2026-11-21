
"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { heroData, scrubNarrative, floatingImages } from '../data/homeData';

gsap.registerPlugin(ScrollTrigger);

export default function HeroStory({ isClone = false }) {
  const containerRef = useRef(null);
  const heroContentRef = useRef(null);
  const cloneTextRef = useRef(null);
  const blurOverlayRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  const [p1Ref, p2Ref, p3Ref, p4Ref, p5Ref] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useGSAP(() => {
    if (!containerRef.current) return;

    // ==========================================
    // CLONE MODE
    // ==========================================

    if (isClone) {
      if (!cloneTextRef.current) return;

      const skyEl = document.getElementById('sky-extension');

      const cloneTl = gsap.timeline({
        scrollTrigger: {
          trigger: skyEl || containerRef.current,
          start: 'top 85%',
          endTrigger: containerRef.current,
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,

          onLeave: () => {
            gsap.set(cloneTextRef.current, {
              y: 0,
              opacity: 1,
            });
          },

          onToggle: (self) => {
            if (self.progress >= 0.99) {
              gsap.set(cloneTextRef.current, {
                y: 0,
                opacity: 1,
              });
            }
          },
        },
      });

      cloneTl.fromTo(
        cloneTextRef.current,
        { y: '-60vh', opacity: 0.75 },
        { y: 0, opacity: 1, ease: 'none' }
      );

      return;
    }

    // ==========================================
    // INITIAL STATES
    // ==========================================

    gsap.set(
      [
        p1Ref.current,
        p2Ref.current,
        p3Ref.current,
        p4Ref.current,
      ],
      {
        autoAlpha: 0,
        xPercent: -50,
        yPercent: 0,
        y: '110vh',
      }
    );

    gsap.set(p5Ref.current, {
      autoAlpha: 0,
      xPercent: -50,
      yPercent: -50,
      y: '110vh',
    });

    gsap.set(text1Ref.current, { autoAlpha: 0 });
    gsap.set(text2Ref.current, { autoAlpha: 0 });

    // ==========================================
    // MAIN SCROLL TIMELINE
    // ==========================================

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=580%',
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      },
    });

    // ==========================================
    // 1. BACKGROUND BLUR & DARK OVERLAY
    // ==========================================

    tl.to(
      blurOverlayRef.current,
      {
        opacity: 1,
        ease: 'power1.out',
        duration: 0.08,
      },
      0
    );

    // ==========================================
    // 2. HERO TITLE FADE OUT
    // ==========================================

    tl.to(
      heroContentRef.current,
      {
        y: 0,
        scale: 0.98,
        opacity: 0,
        autoAlpha: 0,
        ease: 'power1.out',
        duration: 0.06,
      },
      0.04
    );

    // ==========================================
    // 3. TOP TWO CARDS
    // ==========================================

    // Card 1 - Top Left

    tl.fromTo(
      p1Ref.current,
      {
        x: '-6vw',
        y: '110vh',
        xPercent: -50,
        yPercent: 0,
        rotation: -5,
        autoAlpha: 0,
      },
      {
        x: '-33vw',
        y: '-42vh',
        xPercent: -50,
        yPercent: 0,
        rotation: 0,
        autoAlpha: 1,
        duration: 0.20,
        ease: 'power2.out',
      },
      0.08
    );

    // Card 2 - Top Right

    tl.fromTo(
      p2Ref.current,
      {
        x: '6vw',
        y: '110vh',
        xPercent: -50,
        yPercent: 0,
        rotation: 5,
        autoAlpha: 0,
      },
      {
        x: '30vw',
        y: '-50vh',
        xPercent: -50,
        yPercent: 0,
        rotation: 0,
        autoAlpha: 1,
        duration: 0.20,
        ease: 'power2.out',
      },
      0.08
    );

    // ==========================================
    // 4. FIRST NARRATIVE TEXT
    // ==========================================

    tl.fromTo(
      text1Ref.current,
      { autoAlpha: 0 },
      {
        autoAlpha: 0.18,
        duration: 0.05,
        ease: 'power1.out',
      },
      0.09
    );

    tl.to(
      text1Ref.current,
      {
        autoAlpha: 1,
        duration: 0.10,
        ease: 'power1.inOut',
      },
      0.18
    );

    // ==========================================
    // 5. BOTTOM TWO CARDS
    // ==========================================

    // Card 3 - Bottom Left

    tl.fromTo(
      p3Ref.current,
      {
        x: '-10vw',
        y: '110vh',
        xPercent: -50,
        yPercent: 0,
        rotation: -4,
        autoAlpha: 0,
      },
      {
        x: '-25vw',
        y: '0vh',
        xPercent: -50,
        yPercent: 0,
        rotation: 0,
        autoAlpha: 1,
        duration: 0.14,
        ease: 'power2.out',
      },
      0.16
    );

    // Card 4 - Bottom Right

    tl.fromTo(
      p4Ref.current,
      {
        x: '10vw',
        y: '110vh',
        xPercent: -50,
        yPercent: 0,
        rotation: 4,
        autoAlpha: 0,
      },
      {
        x: '30vw',
        y: '10vh',
        xPercent: -50,
        yPercent: 0,
        rotation: 0,
        autoAlpha: 1,
        duration: 0.14,
        ease: 'power2.out',
      },
      0.16
    );

    // ==========================================
    // 6. CARD 5 - CONTINUOUS UPWARD MOVEMENT
    // ==========================================

    // Card 5 starts immediately after the four
    // corner cards finish appearing.
    //
    // One continuous animation:
    // Bottom (110vh) -> Top (-120vh)
    //
    // No separate movement tweens.
    // No pause between center and top.

    tl.fromTo(
      p5Ref.current,
      {
        x: '0vw',
        y: '110vh',
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
      },
      {
        y: '-120vh',
        xPercent: -50,
        yPercent: -50,
        duration: 0.64,
        ease: 'none',
      },
      0.15
    );

    // Card 5 fades in while entering from bottom.

    tl.to(
      p5Ref.current,
      {
        autoAlpha: 1,
        duration: 0.18,
        ease: 'none',
      },
      0.30
    );

    // ==========================================
    // 7. TEXT 1 FADES OUT
    // ==========================================

    tl.to(
      text1Ref.current,
      {
        opacity: 0.18,
        duration: 0.06,
        ease: 'power1.out',
      },
      0.45
    );

    tl.to(
      text1Ref.current,
      {
        autoAlpha: 0,
        duration: 0.05,
        ease: 'power1.in',
      },
      0.50
    );

    // ==========================================
    // 8. FOUR CORNER CARDS FADE OUT
    // ==========================================

    tl.to(
      [
        p1Ref.current,
        p2Ref.current,
        p3Ref.current,
        p4Ref.current,
      ],
      {
        autoAlpha: 0,
        scale: 0.94,
        duration: 0.10,
        ease: 'power1.in',
      },
      0.50
    );

    // ==========================================
    // 9. TEXT 2 REVEAL
    // ==========================================

    tl.fromTo(
      text2Ref.current,
      {
        autoAlpha: 0,
        scale: 0.98,
      },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.12,
        ease: 'power1.out',
      },
      0.54
    );

    // ==========================================
    // 10. CARD 5 GRADUAL FADE OUT
    // ==========================================

    // Card 5 continues moving upward while fading.
    // Its movement is controlled by the single
    // continuous tween above.

    tl.to(
      p5Ref.current,
      {
        autoAlpha: 0,
        duration: 0.12,
        ease: 'none',
      },
      0.53
    );

    // ==========================================
    // 11. TEXT 2 FADES OUT
    // ==========================================

    tl.to(
      text2Ref.current,
      {
        opacity: 0.18,
        duration: 0.06,
        ease: 'power1.out',
      },
      0.7
    );

    tl.to(
      text2Ref.current,
      {
        autoAlpha: 0,
        duration: 0.06,
        ease: 'power1.in',
      },
      0.76
    );

  }, {
    scope: containerRef,
    dependencies: [isClone],
  });

  // ==========================================
  // CLONE SECTION
  // ==========================================

  if (isClone) {
    return (
      <section
        id="hero-clone"
        ref={containerRef}
        className="relative w-full h-[100vh] overflow-visible bg-[#B8D3EA] text-light z-30"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <img
            src={heroData.bgImage || "/travel8.jpg"}
            alt="Hero Background Clone"
            className="w-full h-full object-cover transform-gpu will-change-transform"
            style={{
              objectPosition: heroData.bgPosition || 'center center',
              transform: `scale(${heroData.bgScale || 1})`,
            }}
          />
        </div>

        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center text-center pointer-events-none px-4 overflow-visible">
          <div
            ref={cloneTextRef}
            className="max-w-6xl mx-auto flex flex-col items-center [will-change:transform] [backface-visibility:hidden] transform-gpu overflow-visible"
          >
            <span className="text-accent tracking-[0.3em] text-[10px] md:text-xs uppercase font-medium mb-4 drop-shadow-sm">
              {heroData.tagline}
            </span>

            <h1 className="text-[44px] sm:text-[64px] md:text-[84px] lg:text-[96px] font-display font-medium leading-[1.04] tracking-tight text-white text-center mb-6 drop-shadow-md">
              <span className="block whitespace-nowrap">
               The Southern

              </span>
              <span className="block"> Private Journey</span>
            </h1>

            <p className="max-w-2xl text-base sm:text-lg md:text-xl text-white/90 font-light leading-relaxed drop-shadow-md">
              {heroData.subtitle}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // MAIN HERO SECTION
  // ==========================================

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#B8D3EA] text-light"
    >

      {/* Background Image */}

      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none [will-change:transform] [backface-visibility:hidden] transform-gpu">
        {/* <img
          src={heroData.bgImage || "/travel8.jpg"}
          alt="Ammar Luxury New Zealand"
          className="w-full h-full object-cover transform-gpu will-change-transform"
          style={{
            objectPosition: heroData.bgPosition || 'center center',
            transform: `scale(${heroData.bgScale || 1})`,
          }}
        /> */
<video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  poster="/travel8.jpg"
  className="w-full h-full object-cover transform-gpu"
  style={{
    objectPosition: heroData.bgPosition || "center center",
    transform: `scale(${heroData.bgScale || 1})`,
  }}
>
  <source
    src="/travelbg.mp4"
    type="video/mp4"
  />
</video>}


        {/* Subtle Luxury Dark Vignette for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none" />
      </div>

      {/* Glassy Blur & Luxury Dark Overlay */}

      <div
        ref={blurOverlayRef}
        className="absolute inset-0 z-0 opacity-0 backdrop-blur-[16px] bg-[#003357]/40 pointer-events-none"
      />

      {/* Initial Hero Title & Subtitle */}

      <div className="hero-text-entrance absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4 [will-change:transform] [backface-visibility:hidden] transform-gpu">
        <div
          ref={heroContentRef}
          className="max-w-6xl mx-auto flex flex-col items-center [will-change:transform] [backface-visibility:hidden] transform-gpu"
        >
          <span className="hero-entrance text-accent tracking-[0.3em] text-[10px] md:text-xs uppercase font-medium mb-4 drop-shadow-sm">
            {heroData.tagline}
          </span>

          <h1 className="hero-entrance text-[44px] sm:text-[64px] md:text-[84px] lg:text-[96px] font-display font-medium leading-[1.04] tracking-tight text-white text-center mb-6 drop-shadow-md">
            <span className="block whitespace-nowrap">
               NEW ZEALAND 
            </span>
            <span className="block">PRIVATELY YOURS</span>
          </h1>

          <p className="hero-entrance max-w-2xl text-base sm:text-lg md:text-xl text-white/90 font-light leading-relaxed drop-shadow-md">
            {heroData.subtitle}
          </p>
        </div>
      </div>

      {/* Center Narrative Text Container */}

      <div className="absolute inset-0 z-20 flex items-center justify-center text-center pointer-events-none px-6">
        <div className="relative w-full max-w-[320px] sm:max-w-[460px] md:max-w-[580px] lg:max-w-[660px] mx-auto flex items-center justify-center">

          <p
            ref={text1Ref}
            className="absolute text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] leading-[1.18] font-display font-normal text-white text-center tracking-tight opacity-0 invisible select-none"
            style={{
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.45)',
            }}
          >
            <span className="block">
              where curated adventures await
            </span>
            <span className="block">
              those who&apos;ve seen it all, done it all,
            </span>
            <span className="block">
              and still crave more.
            </span>
          </p>

          <p
            ref={text2Ref}
            className="absolute text-[24px] sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] leading-[1.18] font-display font-normal text-white text-center tracking-tight opacity-0 invisible select-none"
            style={{
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.45)',
            }}
          >
            <span className="block">
              Encounters with nature, wildlife,
            </span>
            <span className="block">
              and local culture shape each journey,
            </span>
            <span className="block">
              making no two days ever the same.
            </span>
          </p>

        </div>
      </div>

      {/* 4 Corners & Center Card Container */}

      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">

        {/* Card 1: Top Left */}

        <div
          ref={p1Ref}
          className="absolute left-1/2 top-1/2 w-[30vw] md:w-[40vw] max-w-[480px] min-w-[220px] aspect-[4/3] rounded-[6px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.65),0_0_25px_rgba(0,0,0,0.3)] overflow-hidden opacity-0 invisible"
        >
          <img
            src={floatingImages[0]?.url || '/hero/1.webp'}
            alt="Milford Sound Fjord"
            className="w-full h-full object-cover block select-none pointer-events-none"
          />
        </div>

        {/* Card 2: Top Right */}

        <div
          ref={p2Ref}
          className="absolute left-1/2 top-1/2 w-[50vw] md:w-[36vw] max-w-[600px] min-w-[260px] aspect-[16/12] rounded-[6px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.65),0_0_25px_rgba(0,0,0,0.3)] overflow-hidden opacity-0 invisible"
        >
          <img
            src={floatingImages[1]?.url || '/hero/2.webp'}
            alt="Queenstown Alpine Night"
            className="w-full h-full object-cover block select-none pointer-events-none"
          />
        </div>

        {/* Card 3: Bottom Left */}

        <div
          ref={p3Ref}
          className="absolute left-1/2 top-1/2 w-[23vw] md:w-[24vw] max-w-[360px] min-w-[170px] aspect-[4/5] rounded-[6px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6),0_0_25px_rgba(0,0,0,0.3)] overflow-hidden opacity-0 invisible"
        >
          <img
            src={floatingImages[2]?.url || '/hero/3.webp'}
            alt="Mount Cook Mountain Peak"
            className="w-full h-full object-cover block select-none pointer-events-none"
          />
        </div>

        {/* Card 4: Bottom Right */}

        <div
          ref={p4Ref}
          className="absolute left-1/2 top-1/2 w-[25vw] md:w-[26vw] max-w-[400px] min-w-[180px] aspect-[5/4] rounded-[6px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6),0_0_25px_rgba(0,0,0,0.3)] overflow-hidden opacity-0 invisible"
        >
          <img
            src={floatingImages[3]?.url || '/hero/4.webp'}
            alt="Hobbiton Misty Morning"
            className="w-full h-full object-cover block select-none pointer-events-none"
          />
        </div>

        {/* Card 5: Continuous Center Rise */}

        <div
          ref={p5Ref}
          className="absolute left-1/2 top-1/2 w-[26vw] md:w-[28vw] max-w-[440px] min-w-[220px] aspect-[4/5] rounded-[6px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7),0_0_30px_rgba(0,0,0,0.4)] overflow-hidden opacity-0 invisible"
        >
          <img
            src={floatingImages[4]?.url || '/hero/5.webp'}
            alt="Ocean Adventure Jet Ski"
            className="w-full h-full object-cover block select-none pointer-events-none"
          />
        </div>

      </div>
    </section>
  );
}
