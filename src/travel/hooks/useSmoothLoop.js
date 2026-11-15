"use client";
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothLoop() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis with smooth wheel settings
    const lenis = new Lenis({
      infinite: false,
      smoothWheel: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.scrollTo(0, { immediate: true, force: true });
    lenis.start();

    lenis.warpTo = (targetScroll) => {
      ScrollTrigger.update();
      lenis.scrollTo(targetScroll, { immediate: true, force: true, lock: true });
      requestAnimationFrame(() => {
        ScrollTrigger.update();
      });
    };

    lenisRef.current = lenis;
    if (typeof window !== 'undefined') {
      window.__lenis = lenis;
    }

    // Sync Lenis scroll events with GSAP ScrollTrigger instantly on the exact same frame
    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on('scroll', handleScroll);

    // Drive Lenis animations via GSAP ticker for synchronized frame timing
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off('scroll', handleScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}

export default useSmoothLoop;
