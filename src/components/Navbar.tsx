"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SignInModal, BookRideModal } from "@/components/ui/Modals";
import { RollingMenuButton } from "@/components/ui/RollingMenuButton";
import { LuxuryMenuDrawer } from "@/components/ui/LuxuryMenuDrawer";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);

  // High-performance scroll listener with hysteresis and RAF throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          setIsScrolled((prev) => {
            if (!prev && currentScroll > 40) return true;
            if (prev && currentScroll <= 15) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      (window as unknown as { lenis?: { stop: () => void; start: () => void } })?.lenis?.stop?.();
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        (window as unknown as { lenis?: { stop: () => void; start: () => void } })?.lenis?.start?.();
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
      (window as unknown as { lenis?: { stop: () => void; start: () => void } })?.lenis?.start?.();
    }
  }, [menuOpen]);

  const handleBookNow = () => {
    setMenuOpen(false);
    setBookModalOpen(true);
  };

  return (
    <>
      {/* 
        High-Performance Navigation Bar:
        Fixed outer wrapper with zero layout transitions.
        Inner capsule island animates smoothly on scroll with 100% GPU-accelerated styling.
      */}
      <header className="fixed top-0 inset-x-0 z-[70] pointer-events-none select-none">
        <div
          id="main-navbar"
          className={`mx-auto flex items-center justify-between pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
            isScrolled
              ? "mt-3 sm:mt-4 w-[92%] sm:w-[480px] max-w-[500px] h-14 sm:h-16 px-5 sm:px-6 rounded-full bg-[#0B0E14]/92 backdrop-blur-2xl border border-white/20 shadow-2xl text-white"
              : "mt-0 w-full max-w-7xl h-20 sm:h-24 px-6 sm:px-10 rounded-none bg-transparent border-transparent text-white shadow-none"
          }`}
        >
          {/* Left: Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-2.5 shrink-0 group focus:outline-none"
            aria-label="Ammar Luxury New Zealand Homepage"
          >
            <svg
              viewBox="0 0 246 148"
              className={`w-auto fill-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0 ${
                isScrolled
                  ? "h-[20px] sm:h-[22px] text-[#C5A059] group-hover:opacity-85"
                  : "h-[24px] sm:h-[28px] text-[#C5A059] group-hover:opacity-90"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <path d="M0 0 L173 0 L221 48 L197 72 L246 122 L222 148 L208 148 L231 124 L124 124 L74 74 L183 74 L207 49 L48 48 Z" />
            </svg>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span
                className={`font-serif tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] leading-none whitespace-nowrap text-white ${
                  isScrolled
                    ? "text-base sm:text-lg"
                    : "text-xl sm:text-2xl lg:text-[26px]"
                }`}
              >
                Ammar Luxury
              </span>
              {/* <span
                className={`text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold text-[#C5A059] bg-[#C5A059]/10 px-1.5 sm:px-2 py-0.5 rounded-full border border-[#C5A059]/30 transition-opacity ${
                  isScrolled ? "hidden sm:inline-block" : "inline-block"
                }`}
              >
                NZ
              </span> */}
            </div>
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* Quick Nav Links (Fades out cleanly when scrolled, without layout jump) */}
            <div
              className={`flex items-center gap-2 sm:gap-3 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled
                  ? "opacity-0 max-w-0 pointer-events-none scale-95 overflow-hidden"
                  : "opacity-100 max-w-[650px] scale-100 pointer-events-auto"
              }`}
            >
              <Link
                href="/services"
                className="hidden md:inline-flex items-center px-4 py-2 text-xs uppercase tracking-widest font-medium text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                Chauffeur Services
              </Link>

              <Link
                href="/travel"
                className="hidden lg:inline-flex items-center px-4 py-2 text-xs uppercase tracking-widest font-medium text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                Curated Escapes
              </Link>

              <button
                type="button"
                onClick={handleBookNow}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#C5A059] text-[#0B0E14] hover:bg-[#D4AF37] text-xs uppercase tracking-widest font-semibold transition-all shadow-md shadow-[#C5A059]/20 hover:shadow-[#C5A059]/35 cursor-pointer whitespace-nowrap active:scale-95"
              >
                <span>Book Ride</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>

            {/* Signature Rolling Pill Button */}
            <div className="shrink-0">
              <RollingMenuButton
                isOpen={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
                isScrolled={isScrolled}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Editorial Curtain Drawer */}
      <LuxuryMenuDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onBookRide={handleBookNow}
      />

      {/* Modals */}
      <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
      <BookRideModal
        isOpen={bookModalOpen}
        onClose={() => setBookModalOpen(false)}
      />
    </>
  );
}

export { Navbar as Header };
export default Navbar;
