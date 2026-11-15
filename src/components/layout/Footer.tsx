"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Check, ArrowRight, ShieldCheck, Clock, PhoneCall } from "lucide-react";

interface NavigationColumn {
  heading: string;
  links: {
    label: string;
    href: string;
    badge?: string;
  }[];
}

const NAVIGATION_COLUMNS: NavigationColumn[] = [
  {
    heading: "Services & Fleet",
    links: [
      { label: "Chauffeur Service", href: "/chauffeur-service/" },
      { label: "Airport Transfers", href: "/airport-transfer/" },
      { label: "City-to-City Long Distance", href: "/city-to-city/" },
      { label: "Hourly As-Directed Charter", href: "/car-service/" },
    ],
  },
  {
    heading: "Top Destinations",
    links: [
      { label: "Christchurch & Canterbury", href: "/countries/nz/christchurch/" },
      { label: "Queenstown & Southern Alps", href: "/countries/nz/queenstown/" },
      { label: "Auckland & Northland", href: "/cities/" },
    ],
  },
];

export function Footer() {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);

  const toggleMobileSection = (heading: string) => {
    setMobileExpandedSection((prev) => (prev === heading ? null : heading));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer
      id="footer"
      className="bg-black text-[#FDFAF5] border-t border-white/10 pt-16 md:pt-24 pb-12 px-5 sm:px-8 lg:px-14 font-sans relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Tier: Brand Essence & Private Dispatch / Concierge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 sm:pb-16 border-b border-white/10">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-6 flex flex-col space-y-5">
            <Link
              href="/"
              aria-label="Ammar Luxury Homepage"
              className="inline-flex items-center gap-3 group focus:outline-none w-max"
            >
              {/* Logo Mark in warm ivory */}
              <svg
                viewBox="0 0 250 150"
                className="h-6 sm:h-7 lg:h-8 w-auto fill-current text-[#FDFAF5] group-hover:opacity-85 transition-opacity shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <path d="M0 0 L173 0 L221 48 L197 72 L246 122 L222 148 L208 148 L231 124 L124 124 L74 74 L183 74 L207 49 L48 48 Z" />
              </svg>

              <span className="text-2xl sm:text-3xl font-serif tracking-tight text-[#FDFAF5] group-hover:opacity-85 transition-opacity leading-none">
                Ammar Luxury
              </span>
            </Link>

            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-lg font-light">
              Pioneering discreet chauffeur mobility, private aviation transfers, and bespoke travel across New Zealand and worldwide. Every route calibrated for unmatched discretion, comfort, and precision.
            </p>

            {/* Quiet Luxury Trust Markers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-neutral-300 font-medium">
                <Clock className="w-4 h-4 text-amber-200/90 shrink-0" />
                <span>24/7 Global Dispatch</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-amber-200/90 shrink-0" />
                <span>Vetted Executive Chauffeurs</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-300 font-medium">
                <PhoneCall className="w-4 h-4 text-amber-200/90 shrink-0" />
                <span>Direct Concierge Access</span>
              </div>
            </div>
          </div>

          {/* Private Dispatch Subscription */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 lg:pl-8">
            <div className="space-y-2">
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-neutral-400">
                Private Dispatch
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-[#FDFAF5]">
                Curated travel intelligence & seasonal routes.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light">
                Receive confidential briefings, flight route updates, and regional expedition previews directly to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your confidential email"
                  required
                  className="flex-1 bg-neutral-900/90 border border-white/15 rounded-lg px-4 py-3 text-sm text-[#FDFAF5] placeholder:text-neutral-500 focus:outline-none focus:border-amber-200/60 transition-colors"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-[#FDFAF5] hover:bg-white text-black font-medium text-xs tracking-wider uppercase px-6 py-3.5 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                  <span>{subscribed ? "Subscribed" : "Join Dispatch"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
                  <Check className="w-3.5 h-3.5" /> Thank you. Your dispatch subscription is confirmed.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Middle Tier: Directory Navigation (Mobile First Accordion + Desktop Grid) */}
        <div className="py-12 sm:py-16">
          {/* Mobile Accordion View (< 640px) */}
          <div className="sm:hidden space-y-3">
            {NAVIGATION_COLUMNS.map((column) => {
              const isExpanded = mobileExpandedSection === column.heading;
              return (
                <div
                  key={column.heading}
                  className="border border-white/10 rounded-xl overflow-hidden bg-neutral-950/60"
                >
                  <button
                    type="button"
                    onClick={() => toggleMobileSection(column.heading)}
                    aria-expanded={isExpanded}
                    className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/[0.03] focus:outline-none min-h-[52px]"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FDFAF5]">
                      {column.heading}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-amber-200/90" : ""
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 space-y-3 border-t border-white/5 animate-fadeIn">
                      {column.links.map((link) => (
                        <div key={link.label}>
                          <Link
                            href={link.href}
                            className="text-sm text-neutral-300 hover:text-white transition-colors block py-1.5"
                          >
                            {link.label}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop & Tablet Directory (sm: and up) */}
          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
            {NAVIGATION_COLUMNS.map((column) => (
              <div key={column.heading} className="flex flex-col space-y-4">
                <h4 className="text-[12px] font-semibold uppercase tracking-[0.22em] text-neutral-400 pb-2 border-b border-white/10">
                  {column.heading}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[14px] text-neutral-300 hover:text-white hover:translate-x-1 transition-all inline-block leading-relaxed"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Lower Tier: Social Networks & Legal / Copyright Row */}
        <div className="py-8 border-t border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <p className="text-xs text-neutral-400 font-medium">
              © {new Date().getFullYear()} Ammar Luxury Ltd. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-400">
              <Link href="/about/" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/about/" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/about/" className="hover:text-white transition-colors">
                Legal Notice
              </Link>
              <Link href="/about/" className="hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>

          {/* Social Channels with Uniform Micro-Icons & Touch Targets */}
          <div className="flex items-center gap-2.5">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ammar Luxury on LinkedIn"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/[0.04] transition-all"
            >
              <svg width="18" height="18" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 17V13.5V10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11 17V13.75M11 10V13.75M11 13.75C11 10 17 10 17 13.75V17" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 7.01L7.01 6.99889" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ammar Luxury on Instagram"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/[0.04] transition-all"
            >
              <svg width="18" height="18" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z" />
                <path d="M17.5 6.51L17.51 6.49889" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ammar Luxury on Facebook"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/[0.04] transition-all"
            >
              <svg width="18" height="18" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ammar Luxury on X"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/[0.04] transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ammar Luxury on YouTube"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 hover:bg-white/[0.04] transition-all"
            >
              <svg width="18" height="18" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M14 12L10.5 14V10L14 12Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12.7075V11.2924C2 8.39705 2 6.94939 2.90549 6.01792C3.81099 5.08645 5.23656 5.04613 8.08769 4.96549C9.43873 4.92728 10.8188 4.8999 12 4.8999C13.1812 4.8999 14.5613 4.92728 15.9123 4.96549C18.7634 5.04613 20.189 5.08645 21.0945 6.01792C22 6.94939 22 8.39705 22 11.2924V12.7075C22 15.6028 22 17.0505 21.0945 17.9819C20.189 18.9134 18.7635 18.9537 15.9124 19.0344C14.5613 19.0726 13.1812 19.1 12 19.1C10.8188 19.1 9.43867 19.0726 8.0876 19.0344C5.23651 18.9537 3.81097 18.9134 2.90548 17.9819C2 17.0505 2 15.6028 2 12.7075Z" stroke="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
