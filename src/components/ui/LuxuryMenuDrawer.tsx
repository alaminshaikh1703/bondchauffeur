"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  Compass,
  Sparkles,
  ShieldCheck,
  Calendar,
  Send,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Facebook,
  ArrowUpRight,
  X,
} from "lucide-react";

interface LuxuryMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onBookRide: () => void;
}

interface MenuItem {
  title: string;
  badge?: string;
  href?: string;
  targetId?: string;
  action?: "book" | "scroll" | "navigate";
  icon: React.ElementType;
}

const MENU_ITEMS: MenuItem[] = [
  {
    title: "Chauffeur Services",
    badge: "Transfers & Standby",
    href: "/services",
    action: "navigate",
    icon: Car,
  },
  {
    title: "NZ Curated Escapes",
    badge: "Luxury Itineraries",
    href: "/travel",
    action: "navigate",
    icon: Compass,
  },
  {
    title: "Executive Mercedes Fleet",
    badge: "S-Class & Sprinters",
    targetId: "fleet",
    action: "scroll",
    icon: Sparkles,
  },
  {
    title: "Standards & Sanctuary",
    badge: "Discretion & Protocol",
    targetId: "sanctuary",
    action: "scroll",
    icon: ShieldCheck,
  },
  {
    title: "Reserve a Chauffeur",
    badge: "Instant Quote",
    action: "book",
    icon: Calendar,
  },
  {
    title: "Custom Travel Planning",
    badge: "Private Journey",
    targetId: "travel-destinations",
    action: "scroll",
    icon: Send,
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

  const handleItemClick = (item: MenuItem) => {
    onClose();
    if (item.action === "book") {
      setTimeout(() => onBookRide(), 80);
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
      }, 100);
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
          className="fixed inset-0 z-[100] flex flex-col justify-between overflow-y-auto select-none"
        >
          {/* Hardware-Accelerated Curtain Slide: 100% GPU translateY with zero repaint */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.42,
              ease: [0.16, 1, 0.3, 1], // Apple spring out-cubic
            }}
            className="fixed inset-0 -z-10 bg-[#0B0E14] bg-[radial-gradient(ellipse_120%_80%_at_50%_0%,_rgba(197,160,89,0.12)_0%,_rgba(15,99,189,0.06)_40%,_transparent_75%)]"
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
                className="h-6 sm:h-7 w-auto fill-current text-[#C5A059] group-hover:opacity-90 transition-opacity"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0 L173 0 L221 48 L197 72 L246 122 L222 148 L208 148 L231 124 L124 124 L74 74 L183 74 L207 49 L48 48 Z" />
              </svg>
              <span className="font-serif text-xl sm:text-2xl text-white font-normal tracking-tight">
                Ammar Luxury{" "}
                <span className="text-[10px] tracking-widest uppercase font-sans font-semibold text-[#C5A059] ml-1 px-1.5 py-0.5 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10">
                  NZ
                </span>
              </span>
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-[#C5A059] text-white hover:text-[#0B0E14] active:scale-95 border border-white/20 hover:border-[#C5A059] backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-lg"
            >
              <span>Close</span>
              <X className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90 stroke-[2.4]" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-8 sm:py-12 flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Signature Editorial Typography with Expanding Golden Dot */}
              <div className="lg:col-span-8 flex flex-col gap-2.5 sm:gap-3.5">
                <div className="mb-1">
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-[#C5A059] block">
                    Curated Destinations & Services
                  </span>
                </div>

                {MENU_ITEMS.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.05 + idx * 0.035,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="group inline-flex items-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white hover:text-[#C5A059] transition-colors leading-[1.1] tracking-tight cursor-pointer"
                      >
                        {/* Mejuma-inspired expanding golden dot */}
                        <span className="w-0 h-2.5 sm:h-3.5 rounded-full bg-[#C5A059] shrink-0 mr-0 opacity-0 scale-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-2.5 sm:group-hover:w-3.5 group-hover:mr-3 sm:group-hover:mr-4 group-hover:opacity-100 group-hover:scale-100" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="hidden sm:inline-block ml-4 text-[10px] font-sans font-medium uppercase tracking-widest px-2.5 py-0.5 rounded-full text-white/50 border border-white/10 group-hover:text-[#C5A059] group-hover:border-[#C5A059]/40 transition-colors">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleItemClick(item)}
                        className="group inline-flex items-center text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white hover:text-[#C5A059] transition-colors leading-[1.1] tracking-tight cursor-pointer"
                      >
                        {/* Mejuma-inspired expanding golden dot */}
                        <span className="w-0 h-2.5 sm:h-3.5 rounded-full bg-[#C5A059] shrink-0 mr-0 opacity-0 scale-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-2.5 sm:group-hover:w-3.5 group-hover:mr-3 sm:group-hover:mr-4 group-hover:opacity-100 group-hover:scale-100" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="hidden sm:inline-block ml-4 text-[10px] font-sans font-medium uppercase tracking-widest px-2.5 py-0.5 rounded-full text-white/50 border border-white/10 group-hover:text-[#C5A059] group-hover:border-[#C5A059]/40 transition-colors">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Right Column: Contact Details, Reserve CTA, Socials */}
              <motion.div
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.38, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-4 flex flex-col justify-between gap-6 p-6 sm:p-7 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl"
              >
                <div>
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-[#C5A059] block mb-1">
                    Private Chauffeur & Charter
                  </span>
                  <h4 className="font-serif text-2xl text-white mb-3">
                    Ready to Begin Your Journey?
                  </h4>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-5">
                    Direct door-to-door luxury transfers, airport protocol, and bespoke South & North Island curated travel experiences.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onBookRide();
                    }}
                    className="w-full py-3 px-6 rounded-full bg-[#C5A059] text-[#0B0E14] hover:bg-[#D4AF37] font-semibold text-xs uppercase tracking-widest inline-flex items-center justify-center gap-2 shadow-lg shadow-[#C5A059]/25 hover:shadow-[#C5A059]/40 transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <span>Instant Ride Reservation</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                  </button>
                </div>

                <div className="pt-5 border-t border-white/10 flex flex-col gap-3.5">
                  {/* Phone */}
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-0.5">
                      24/7 Global Concierge
                    </span>
                    <a
                      href="tel:+6498887766"
                      className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-white hover:text-[#C5A059] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>+64 9 888 7766</span>
                    </a>
                  </div>

                  {/* Mail */}
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-0.5">
                      Private Inquiries
                    </span>
                    <a
                      href="mailto:concierge@ammarluxury.nz"
                      className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-white hover:text-[#C5A059] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>concierge@ammarluxury.nz</span>
                    </a>
                  </div>

                  {/* Socials */}
                  <div className="pt-1">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">
                      Connect With Us
                    </span>
                    <div className="flex items-center gap-2.5">
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#C5A059] text-white/80 hover:text-[#0B0E14] border border-white/10 hover:border-[#C5A059] transition-all duration-200"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#C5A059] text-white/80 hover:text-[#0B0E14] border border-white/10 hover:border-[#C5A059] transition-all duration-200"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Facebook"
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-[#C5A059] text-white/80 hover:text-[#0B0E14] border border-white/10 hover:border-[#C5A059] transition-all duration-200"
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
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40 shrink-0">
            <div>Ammar Luxury New Zealand • Private Chauffeur & Bespoke Travel</div>
            <div>© {new Date().getFullYear()} All rights reserved.</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LuxuryMenuDrawer;
