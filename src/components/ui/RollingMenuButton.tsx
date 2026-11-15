"use client";

import React from "react";
import { Menu, X } from "lucide-react";

interface RollingMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  isScrolled: boolean;
}

/**
 * RollingMenuButton inspired by Mejuma Tuscany's signature Button-040.
 * Snappy, GPU-accelerated rolling icon swap.
 */
export function RollingMenuButton({
  isOpen,
  onClick,
  isScrolled,
}: RollingMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={isOpen}
      className={`group relative inline-flex items-center h-10 sm:h-11 px-1 sm:px-1.5 rounded-full cursor-pointer select-none transition-colors duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] ${
        isOpen
          ? "bg-[#C5A059] text-[#0B0E14] shadow-lg shadow-[#C5A059]/25 hover:bg-[#D4AF37]"
          : isScrolled
          ? "bg-[#C5A059] text-[#0B0E14] shadow-md shadow-[#C5A059]/20 hover:bg-[#D4AF37] hover:shadow-[#C5A059]/35"
          : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md shadow-sm"
      }`}
    >
      {/* Primary Left Icon: scales from 0 to 1 on hover */}
      <span
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] scale-0 group-hover:scale-100 origin-left ${
          isOpen || isScrolled
            ? "bg-[#0B0E14] text-[#C5A059]"
            : "bg-white/20 text-white"
        }`}
      >
        {isOpen ? (
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.4] transition-transform duration-300 group-hover:rotate-90" />
        ) : (
          <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.4] transition-transform duration-300 group-hover:rotate-90" />
        )}
      </span>

      {/* Button Text Label: slides smoothly on hover */}
      <span
        className={`px-2.5 sm:px-3 text-[11px] sm:text-xs uppercase tracking-widest font-semibold transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-x-3.5 sm:-translate-x-4 group-hover:translate-x-0 ${
          isOpen || isScrolled ? "text-[#0B0E14]" : "text-white"
        }`}
      >
        {isOpen ? "Close" : "Menu"}
      </span>

      {/* Duplicate Right Icon: scales from 1 to 0 on hover */}
      <span
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] scale-100 group-hover:scale-0 origin-right ${
          isOpen || isScrolled
            ? "bg-[#0B0E14] text-[#C5A059]"
            : "bg-white/15 text-white"
        }`}
      >
        {isOpen ? (
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.4]" />
        ) : (
          <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.4]" />
        )}
      </span>
    </button>
  );
}

export default RollingMenuButton;
