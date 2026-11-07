"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Globe, ChevronDown, Check, X } from "lucide-react";

interface NavigationColumn {
  heading: string;
  links: {
    label: string;
    href: string;
  }[];
}

const NAVIGATION_COLUMNS: NavigationColumn[] = [
  {
    heading: "Company",
    links: [
      { label: "How Ammar Luxury works", href: "/about/" },
      { label: "Career", href: "/career/" },
      { label: "Press", href: "/press/" },
      { label: "Blog", href: "/blog/" },
      { label: "Green initiatives", href: "/sustainability/" },
      { label: "Become a chauffeur partner", href: "/partners/" },
    ],
  },
  {
    heading: "Ammar Luxury for Business",
    links: [
      { label: "Overview", href: "/business/" },
      { label: "Corporations", href: "/corporations/" },
      { label: "Travel agencies", href: "/travel-agencies/" },
      { label: "Strategic partnerships", href: "/strategic-partnerships/" },
    ],
  },
  {
    heading: "Top cities",
    links: [
      { label: "Auckland", href: "/countries/nz/auckland/" },
      { label: "Christchurch", href: "/countries/nz/christchurch/" },
      { label: "Queenstown", href: "/countries/nz/queenstown/" },
      { label: "Wellington", href: "/countries/nz/wellington/" },
      { label: "Sydney", href: "/countries/au/sydney/" },
      { label: "All cities", href: "/cities/" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "City-to-city rides", href: "/city-to-city/" },
      { label: "Limousine service", href: "/limousine-service/" },
      { label: "Chauffeur service", href: "/chauffeur-service/" },
      { label: "Private car service", href: "/car-service/" },
      { label: "Ground transportation", href: "/ground-transportation/" },
      { label: "Airport transfer", href: "/airport-transfer/" },
      { label: "All countries", href: "/countries/" },
    ],
  },
  {
    heading: "City-to-City rides",
    links: [
      { label: "Christchurch - Queenstown", href: "/city-to-city/christchurch-queenstown/" },
      { label: "Auckland - Hamilton", href: "/city-to-city/auckland-hamilton/" },
      { label: "Wellington - Palmerston North", href: "/city-to-city/wellington-palmerston-north/" },
      { label: "Queenstown - Wanaka", href: "/city-to-city/queenstown-wanaka/" },
      { label: "Dubai - Abu Dhabi", href: "/city-to-city/abu-dhabi-dubai/" },
      { label: "London - Bristol", href: "/city-to-city/london-bristol/" },
    ],
  },
];

const LANGUAGES = [
  "English (US)",
  "English (UK)",
  "English (NZ)",
  "Deutsch",
  "Français",
  "Español",
  "العربية",
];

const CURRENCIES = ["USD ($)", "NZD ($)", "AUD ($)", "EUR (€)", "GBP (£)"];

// Ammar Luxury signature deep obsidian & champagne reflection
const FOOTER_BACKGROUND_STYLE: React.CSSProperties = {
  backgroundColor: "#07090D",
  backgroundImage: `
    radial-gradient(ellipse 120% 80% at 50% 100%, rgba(212, 175, 55, 0.05) 0%, rgba(15, 99, 189, 0.03) 40%, transparent 80%),
    radial-gradient(circle at 10% 90%, rgba(212, 175, 55, 0.04) 0%, transparent 50%)
  `,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "0% 0%, 0% 0%",
  backgroundSize: "100% 100%, 100% 100%",
};

export function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState("English (NZ)");
  const [selectedCurrency, setSelectedCurrency] = useState("NZD ($)");
  const [showLangModal, setShowLangModal] = useState(false);

  return (
    <footer
      id="footer"
      style={FOOTER_BACKGROUND_STYLE}
      className="footer-section footer-flatline-gradient text-[#FDFAF5] border-t border-white/10 pt-14 md:pt-20 pb-10 px-6 sm:px-8 lg:px-14 font-sans relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Header Row: Logo & App Store Download Badges */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-10 border-b border-white/10 gap-6">
          <Link
            href="/"
            aria-label="Ammar Luxury Homepage"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none"
          >
            {/* Logo Mark matching Header in warm ivory white */}
            <svg
              viewBox="0 0 250 150"
              className="h-[22px] sm:h-[26px] lg:h-[28px] w-auto fill-current text-[#FDFAF5] group-hover:opacity-85 transition-opacity shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <path d="M0 0 L173 0 L221 48 L197 72 L246 122 L222 148 L208 148 L231 124 L124 124 L74 74 L183 74 L207 49 L48 48 Z" />
            </svg>

            {/* Typography matching Flatline Agency warm ivory token */}
            <span className="text-xl sm:text-2xl lg:text-[28px] font-serif font-normal tracking-tight text-[#FDFAF5] group-hover:opacity-85 transition-opacity leading-none">
              Ammar Luxury
            </span>
          </Link>

          
        </div>
        {/* Multi-Column Navigation Directory (5 Columns) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 py-12 md:py-16">
          {NAVIGATION_COLUMNS.map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col">
              <h3 className="text-[14px] sm:text-[15px] font-medium uppercase tracking-wider text-[#FDFAF5] mb-4">
                {column.heading}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      href={link.href}
                      className="text-[14px] sm:text-[15px] text-[#FDFAF5]/70 hover:text-[#E5C378] hover:translate-x-0.5 transition-all leading-relaxed inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Region / Currency Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between py-6 border-t border-white/10 gap-4">
          <div className="flex items-center gap-6">
            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLangModal(!showLangModal)}
                className="inline-flex items-center gap-2 text-sm text-[#FDFAF5] hover:text-white transition-colors font-medium cursor-pointer"
              >
                <Globe className="w-4 h-4 text-[#FDFAF5]" />
                <span>{selectedLanguage}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#FDFAF5]/60" />
              </button>

              {/* Language Dropdown Modal */}
              {showLangModal && (
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-[#0F1319]/95 backdrop-blur-xl border border-white/15 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#FDFAF5]/50">
                    Select Language
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setShowLangModal(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#FDFAF5]/90 hover:text-white hover:bg-white/10 transition-colors text-left"
                    >
                      <span>{lang}</span>
                      {selectedLanguage === lang && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="inline-flex items-center gap-1.5 text-sm text-[#FDFAF5] font-medium">
              <span className="text-[#FDFAF5]/60">Currency:</span>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="bg-transparent text-[#FDFAF5] font-medium focus:outline-none cursor-pointer"
              >
                {CURRENCIES.map((cur) => (
                  <option key={cur} value={cur} className="bg-[#0F1319] text-white">
                    {cur}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Social Media SVG Icons */}
          <div className="flex items-center gap-4 text-[#FDFAF5]">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-1.5 text-[#FDFAF5]/80 hover:text-[#FDFAF5] hover:scale-110 transition-all"
            >
              <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
              aria-label="Instagram"
              className="p-1.5 text-[#FDFAF5]/80 hover:text-[#FDFAF5] hover:scale-110 transition-all"
            >
              <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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
              aria-label="Facebook"
              className="p-1.5 text-[#FDFAF5]/80 hover:text-[#FDFAF5] hover:scale-110 transition-all"
            >
              <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
              className="p-1.5 text-[#FDFAF5]/80 hover:text-[#FDFAF5] hover:scale-110 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="p-1.5 text-[#FDFAF5]/80 hover:text-[#FDFAF5] hover:scale-110 transition-all"
            >
              <svg width="20" height="20" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M14 12L10.5 14V10L14 12Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12.7075V11.2924C2 8.39705 2 6.94939 2.90549 6.01792C3.81099 5.08645 5.23656 5.04613 8.08769 4.96549C9.43873 4.92728 10.8188 4.8999 12 4.8999C13.1812 4.8999 14.5613 4.92728 15.9123 4.96549C18.7634 5.04613 20.189 5.08645 21.0945 6.01792C22 6.94939 22 8.39705 22 11.2924V12.7075C22 15.6028 22 17.0505 21.0945 17.9819C20.189 18.9134 18.7635 18.9537 15.9124 19.0344C14.5613 19.0726 13.1812 19.1 12 19.1C10.8188 19.1 9.43867 19.0726 8.0876 19.0344C5.23651 18.9537 3.81097 18.9134 2.90548 17.9819C2 17.0505 2 15.6028 2 12.7075Z" stroke="currentColor" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[13px] text-[#FDFAF5]/60">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <p className="font-semibold text-[#FDFAF5]">© {new Date().getFullYear()} Ammar Luxury. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href="/terms/" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/privacy-policy/" className="hover:text-white transition-colors">
                Privacy policy
              </Link>
              <Link href="/imprint/" className="hover:text-white transition-colors">
                Legal notice
              </Link>
              <Link href="/accessibility/" className="hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
          <p className="text-xs text-[#FDFAF5]/50">The Global Chauffeur Service</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
