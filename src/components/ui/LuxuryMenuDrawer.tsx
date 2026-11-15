"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Facebook,
  ArrowUpRight,
  ArrowRight,
  X,
} from "lucide-react";

interface LuxuryMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onBookRide: () => void;
}

interface NavLinkItem {
  title: string;
  subtitle: string;
  href?: string;
  targetId?: string;
  action?: "book" | "scroll" | "navigate";
}

const MAIN_PAGES: NavLinkItem[] = [
  {
    title: "Home",
    subtitle: "Sanctuary & private mobility",
    href: "/",
    action: "navigate",
  },
  {
    title: "Chauffeur Services",
    subtitle: "Transfers, hourly charter & long distance",
    href: "/services",
    action: "navigate",
  },
  {
    title: "NZ Curated Escapes",
    subtitle: "Private luxury expeditions & alpine lodges",
    href: "/travel",
    action: "navigate",
  },
  {
    title: "Vehicle Fleet",
    subtitle: "Executive Sedan, Luxury SUV & Luxury VAN",
    targetId: "fleet",
    action: "scroll",
  },
  {
    title: "Standards & Sanctuary",
    subtitle: "Discretion, protocol & security vetting",
    targetId: "sanctuary",
    action: "scroll",
  },
];

export function LuxuryMenuDrawer({
  isOpen,
  onClose,
  onBookRide,
}: LuxuryMenuDrawerProps) {
  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleActionClick = (
    item: { href?: string; targetId?: string; action?: "book" | "scroll" | "navigate" }
  ) => {
    onClose();
    if (item.action === "book") {
      setTimeout(() => onBookRide(), 120);
    } else if (item.href) {
      // standard next/link
    } else if (item.targetId) {
      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        window.location.href = `/#${item.targetId}`;
        return;
      }
      setTimeout(() => {
        const el = document.getElementById(item.targetId!);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 120);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex flex-col justify-between overflow-y-auto select-none bg-black"
        >
          {/* Hardware-Accelerated Curtain Slide */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-0 -z-10 bg-black"
          />

          {/* Top Header Row inside the Drawer */}
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-5 sm:py-7 flex items-center justify-between border-b border-white/10 shrink-0">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <svg
                viewBox="0 0 246 148"
                className="h-6 sm:h-7 w-auto fill-current text-[#FDFAF5] group-hover:opacity-85 transition-opacity"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0 L173 0 L221 48 L197 72 L246 122 L222 148 L208 148 L231 124 L124 124 L74 74 L183 74 L207 49 L48 48 Z" />
              </svg>
              <span className="font-serif text-xl sm:text-2xl text-[#FDFAF5] font-normal tracking-tight">
                Ammar Luxury{" "}
                <span className="text-[10px] tracking-widest uppercase font-sans font-medium text-amber-200/90 ml-1 px-1.5 py-0.5 rounded-full border border-amber-200/30 bg-amber-200/10">
                  NZ
                </span>
              </span>
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white active:scale-95 border border-white/15 text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer"
            >
              <span>Close</span>
              <X className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90 stroke-[2.2]" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-8 sm:py-14 flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Modern & Minimal Navigation (Refined Minimal Typography) */}
              <div className="lg:col-span-7 flex flex-col space-y-4 max-w-xl">
                <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-amber-200/80 pb-2 border-b border-white/10 w-full">
                  Explore Ammar Luxury
                </span>

                <div className="flex flex-col">
                  {MAIN_PAGES.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{
                        duration: 0.28,
                        delay: 0.03 + idx * 0.025,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {item.href ? (
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="group flex items-start sm:items-baseline justify-between py-3.5 border-b border-white/[0.08] hover:border-amber-200/30 transition-all"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3.5">
                            <span className="text-base sm:text-lg lg:text-xl font-serif text-[#FDFAF5] group-hover:text-amber-200/90 transition-colors tracking-tight">
                              {item.title}
                            </span>
                            <span className="text-xs text-neutral-400 font-light group-hover:text-neutral-300 transition-colors mt-0.5 sm:mt-0">
                              {item.subtitle}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-neutral-500 opacity-60 group-hover:opacity-100 group-hover:text-amber-200/90 group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-3 mt-1 sm:mt-0" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleActionClick(item)}
                          className="w-full text-left group flex items-start sm:items-baseline justify-between py-3.5 border-b border-white/[0.08] hover:border-amber-200/30 transition-all cursor-pointer"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3.5">
                            <span className="text-base sm:text-lg lg:text-xl font-serif text-[#FDFAF5] group-hover:text-amber-200/90 transition-colors tracking-tight">
                              {item.title}
                            </span>
                            <span className="text-xs text-neutral-400 font-light group-hover:text-neutral-300 transition-colors mt-0.5 sm:mt-0">
                              {item.subtitle}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-neutral-500 opacity-60 group-hover:opacity-100 group-hover:text-amber-200/90 group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-3 mt-1 sm:mt-0" />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Column: Kept Concierge Card */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.36, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 flex flex-col justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-neutral-950/80 border border-white/10"
              >
                <div>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-amber-200/90 block mb-1.5">
                    Private Chauffeur & Charter
                  </span>
                  <h4 className="font-serif text-2xl text-white mb-3">
                    Ready to Begin Your Journey?
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light mb-6">
                    Direct door-to-door luxury transfers, airport protocol, and bespoke South & North Island curated travel experiences.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onBookRide();
                    }}
                    className="w-full py-3.5 px-6 rounded-xl bg-amber-200/90 hover:bg-amber-200 text-black font-semibold text-xs uppercase tracking-widest inline-flex items-center justify-center gap-2 shadow-lg shadow-amber-200/15 transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <span>Instant Ride Reservation</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                  </button>
                </div>

                <div className="pt-5 border-t border-white/10 flex flex-col gap-3.5">
                  {/* Phone */}
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 block mb-0.5">
                      24/7 Global Concierge
                    </span>
                    <a
                      href="tel:+6498887766"
                      className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-white hover:text-amber-200 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-200/90" />
                      <span>+64 9 888 7766</span>
                    </a>
                  </div>

                  {/* Mail */}
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 block mb-0.5">
                      Private Inquiries
                    </span>
                    <a
                      href="mailto:concierge@ammarluxury.nz"
                      className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-white hover:text-amber-200 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-200/90" />
                      <span>concierge@ammarluxury.nz</span>
                    </a>
                  </div>

                  {/* Socials */}
                  <div className="pt-1">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 block mb-2">
                      Connect With Us
                    </span>
                    <div className="flex items-center gap-2.5">
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-all duration-200"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-all duration-200"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-all duration-200"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-400 shrink-0">
            <div>Ammar Luxury New Zealand • Private Chauffeur & Bespoke Travel</div>
            <div>© {new Date().getFullYear()} All rights reserved.</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LuxuryMenuDrawer;
