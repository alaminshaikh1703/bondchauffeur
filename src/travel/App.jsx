"use client";
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/Navbar';
import HeroStory from './sections/HeroStory';
import MapExpeditions from './sections/MapExpeditions';
import YachtShowcase from './sections/YachtShowcase';
import EditorialCrew from './sections/EditorialCrew';
import DragJournal from './sections/DragJournal';
import FooterGalleryMarquee from './components/FooterGalleryMarquee';
import { Footer } from '@/components/layout/Footer';
import { useSmoothLoop } from './hooks/useSmoothLoop';

gsap.registerPlugin(ScrollTrigger);

// Force every page refresh to start at top (Preloader -> Hero Section) regardless of previous section
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  window.scrollTo(0, 0);
}

export default function App() {
  // Initialize Lenis infinite smooth loop engine with GSAP ScrollTrigger
  useSmoothLoop();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      window.scrollTo(0, 0);
    }

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Infinite scroll teleport handoff: sync Lenis with ScrollTrigger on the exact same frame
    let unbindLoop = null;
    let isWarping = false;

    const attachLoopSync = () => {
      const lenis = window.__lenis;
      if (!lenis) return;

      const handleScroll = (e) => {
        if (isWarping) return;
        const currentScroll = typeof e?.scroll === 'number' ? e.scroll : window.scrollY;
        const cloneEl = document.getElementById('hero-clone');
        if (!cloneEl) return;

        // Ensure calculations for loop threshold match exact DOM height of SEC-08 clone
        const cloneTop = cloneEl.offsetTop;
        const cloneHeight = cloneEl.offsetHeight || window.innerHeight;
        const maxScroll = cloneTop + cloneHeight - window.innerHeight;

        // Downward loop warp: scrolling past SEC-08 clone -> warp instantly back to top (0)
        if (currentScroll >= maxScroll - 2) {
          isWarping = true;
          lenis.scrollTo(0, { immediate: true, force: true });
          ScrollTrigger.update();
          isWarping = false;
        }
        // Upward loop warp: scrolling past top (0) -> warp instantly to bottom SEC-08 clone
        else if (currentScroll <= -2) {
          isWarping = true;
          lenis.scrollTo(maxScroll, { immediate: true, force: true });
          ScrollTrigger.update();
          isWarping = false;
        }
      };

      lenis.on('scroll', handleScroll);
      unbindLoop = () => lenis.off('scroll', handleScroll);
    };

    attachLoopSync();
    const lenisTimer = setTimeout(attachLoopSync, 600);

    // Deterministic font and asset layout stabilization for ScrollTrigger
    let cancelled = false;
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) {
          ScrollTrigger.refresh();
        }
      });
    }

    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleWindowLoad);

    return () => {
      cancelled = true;
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleWindowLoad);
      if (unbindLoop) unbindLoop();
      clearTimeout(lenisTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-surface text-persian selection:bg-accent selection:text-light">
      {/* 1) Fixed Top Header Nav Bar (hides on scroll) */}
      <Navbar />

      <main className="w-full">
        {/* 2) Pinned Hero Section with Parallax Scrub */}
        <HeroStory isClone={false} />

        {/* 3) Adventure Across Two Extraordinary Islands Map & 4 Region Cards */}
        <MapExpeditions className="-mt-[100vh]" />

        {/* 4) Mountain Reveal & Experience Sanctuary Intro */}
        <YachtShowcase />

        {/* 5) Editorial Story & Manaakitanga Staggered Grid */}
        <EditorialCrew />

        {/* 6) Custom Drag Horizontal Journal Slider & As Seen In Press */}
        <DragJournal />

        {/* 7) Visual Archive Photo Marquee Gallery */}
        <div className="bg-[#B8D3EA] pt-12 pb-6 border-t border-persian/10">
          <FooterGalleryMarquee />
        </div>

        {/* 8) Main Website Global Footer */}
        <Footer />
      </main>
    </div>
  );
}
