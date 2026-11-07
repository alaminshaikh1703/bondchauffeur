"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Check,
  Plane,
  Building2,
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
} from "lucide-react";
import { BookRideModal } from "@/components/ui/BookRideModal";

type BookingMode = "transfer" | "hourly";

interface NZLocation {
  title: string;
  subtitle: string;
  type: "airport" | "hotel" | "city";
}

const NZ_LOCATIONS: NZLocation[] = [
  {
    title: "Auckland Airport (AKL)",
    subtitle: "Ray Emery Drive, Māngere, Auckland",
    type: "airport",
  },
  {
    title: "Queenstown Airport (ZQN)",
    subtitle: "Sir Henry Wigley Drive, Frankton, Queenstown",
    type: "airport",
  },
  {
    title: "Wellington International Airport (WLG)",
    subtitle: "Stewart Duff Drive, Rongotai, Wellington",
    type: "airport",
  },
  {
    title: "Christchurch International Airport (CHC)",
    subtitle: "Durey Road, Christchurch Airport",
    type: "airport",
  },
  {
    title: "Park Hyatt Auckland",
    subtitle: "99 Halsey Street, Auckland CBD",
    type: "hotel",
  },
  {
    title: "The Rees Hotel & Luxury Apartments",
    subtitle: "377 Frankton Road, Queenstown",
    type: "hotel",
  },
  {
    title: "InterContinental Wellington",
    subtitle: "2 Grey Street, Wellington Central",
    type: "hotel",
  },
  {
    title: "The George Christchurch",
    subtitle: "50 Park Terrace, Christchurch Central",
    type: "hotel",
  },
  {
    title: "Auckland CBD / Viaduct Harbour",
    subtitle: "Quay Street & Customs St, Auckland",
    type: "city",
  },
  {
    title: "Queenstown Central / Lake Wakatipu",
    subtitle: "The Mall & Beach St, Queenstown",
    type: "city",
  },
  {
    title: "Wellington Central / Lambton Quay",
    subtitle: "Lambton Quay, Wellington Central",
    type: "city",
  },
  {
    title: "Christchurch City Centre / Cathedral Square",
    subtitle: "Cathedral Square, Christchurch",
    type: "city",
  },
];

const DURATION_OPTIONS = [
  "2 hours (40 km included)",
  "3 hours (60 km included)",
  "4 hours (80 km included)",
  "5 hours (100 km included)",
  "6 hours (120 km included)",
  "8 hours (160 km included)",
  "10 hours (200 km included)",
  "12 hours (240 km included)",
  "24 hours (480 km included)",
];

const TIME_OPTIONS = [
  "12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM",
  "03:00 AM", "03:30 AM", "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM",
  "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM",
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
  "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
  "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM",
];

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function BookingWidget() {
  const [mode, setMode] = useState<BookingMode>("transfer");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [duration, setDuration] = useState("2 hours (40 km included)");

  // Date state
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  // Time state - defaults to empty with "Choose your time" placeholder
  const [pickupTime, setPickupTime] = useState("");

  // Popover / dropdown states
  const [pickupOpen, setPickupOpen] = useState(false);
  const [dropoffOpen, setDropoffOpen] = useState(false);
  const [durationOpen, setDurationOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);

  // References for outside click dismissal
  const pickupRef = useRef<HTMLDivElement>(null);
  const dropoffRef = useRef<HTMLDivElement>(null);
  const durationRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (pickupRef.current && !pickupRef.current.contains(e.target as Node)) {
        setPickupOpen(false);
      }
      if (dropoffRef.current && !dropoffRef.current.contains(e.target as Node)) {
        setDropoffOpen(false);
      }
      if (durationRef.current && !durationRef.current.contains(e.target as Node)) {
        setDurationOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
      if (timeRef.current && !timeRef.current.contains(e.target as Node)) {
        setTimeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered NZ locations based on query
  const filteredPickupLocations = NZ_LOCATIONS.filter((loc) => {
    if (!pickup.trim()) return true;
    const q = pickup.toLowerCase();
    return (
      loc.title.toLowerCase().includes(q) || loc.subtitle.toLowerCase().includes(q)
    );
  });

  const filteredDropoffLocations = NZ_LOCATIONS.filter((loc) => {
    if (!dropoff.trim()) return true;
    const q = dropoff.toLowerCase();
    return (
      loc.title.toLowerCase().includes(q) || loc.subtitle.toLowerCase().includes(q)
    );
  });

  // Format date helper
  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Calendar calculations
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(calYear, calMonth, 1).getDay();
  const daysInPrevMonth = new Date(calYear, calMonth, 0).getDate();

  const prevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(calYear - 1);
    } else {
      setCalMonth(calMonth - 1);
    }
  };

  const nextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(calYear + 1);
    } else {
      setCalMonth(calMonth + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    setSelectedDate(new Date(calYear, calMonth, day));
    setCalendarOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    // Close any open popovers cleanly
    setPickupOpen(false);
    setDropoffOpen(false);
    setDurationOpen(false);
    setCalendarOpen(false);
    setTimeOpen(false);

    // Open Book Now modal with pre-filled inputs
    setTimeout(() => {
      setIsLoading(false);
      setBookModalOpen(true);
    }, 150);
  };

  return (
    <>
      <div id="booking-form" className="w-full mx-auto">
        {/* 1. Mode Switcher: Refined Segmented Control */}
        <div
          className="flex items-center justify-center sm:justify-start gap-2 mb-3"
          role="tablist"
          aria-label="Booking transfer options"
        >
          <div className="luxury-segmented-control inline-flex items-center p-1.5 border border-white/20 bg-[#0B0E14]/95 backdrop-blur-2xl rounded-full shadow-2xl">
            {/* "One way" Button */}
            <button
              type="button"
              role="tab"
              aria-selected={mode === "transfer"}
              onClick={(e) => {
                e.preventDefault();
                setMode("transfer");
              }}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none ${
                mode === "transfer"
                  ? "bg-[#1A222E] text-white border border-white/25 shadow-md shadow-black/60 font-semibold"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/10 border border-transparent"
              }`}
            >
              One way transfer
            </button>

            {/* "By the hour" Button */}
            <button
              type="button"
              role="tab"
              aria-selected={mode === "hourly"}
              onClick={(e) => {
                e.preventDefault();
                setMode("hourly");
              }}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer select-none ${
                mode === "hourly"
                  ? "bg-[#1A222E] text-white border border-white/25 shadow-md shadow-black/60 font-semibold"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/10 border border-transparent"
              }`}
            >
              Hourly standby
            </button>
          </div>
        </div>

        {/* 2. Main Luxury Glassmorphic Booking Container (High Opacity for maximum contrast & readability) */}
        <div className="luxury-glass-card bg-[#0B0E14]/95 backdrop-blur-3xl border border-white/20 shadow-[0_24px_70px_-10px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.12)] rounded-2xl p-4 sm:p-5 lg:p-6 text-white w-full transition-all duration-300">
          {/* Dynamic Input Grid: Cleanly stacked on mobile, fluid multi-column on desktop */}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-3.5 items-end">
              {/* Column 1: 'Pickup location' */}
              <div ref={pickupRef} className="col-span-1 lg:col-span-3 relative">
                <div className="bg-[#131922]/90 hover:bg-[#1A222E]/95 focus-within:bg-[#1A222E] focus-within:ring-1 focus-within:ring-[#C5A059] focus-within:border-[#C5A059]/50 border border-white/15 hover:border-white/25 rounded-xl px-3.5 py-2.5 transition-all shadow-inner shadow-black/20">
                  <label
                    htmlFor="pickup-location-input"
                    className="block text-[11px] uppercase tracking-wider text-[#A0AEC0] font-semibold mb-1 text-left"
                  >
                    Pickup location
                  </label>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <input
                      id="pickup-location-input"
                      type="text"
                      value={pickup}
                      onChange={(e) => {
                        setPickup(e.target.value);
                        if (!pickupOpen) setPickupOpen(true);
                      }}
                      onFocus={() => {
                        setPickupOpen(true);
                        setDropoffOpen(false);
                        setDurationOpen(false);
                        setCalendarOpen(false);
                        setTimeOpen(false);
                      }}
                      placeholder="Airport, hotel, or address..."
                      className="w-full bg-transparent text-white placeholder-white/45 text-sm sm:text-base leading-6 focus:outline-none"
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* Pickup Suggestions Popover */}
                {pickupOpen && (
                  <div
                    data-lenis-prevent
                    className="fixed sm:absolute inset-x-3 sm:inset-x-auto bottom-3 sm:bottom-[calc(100%+10px)] sm:left-0 sm:right-auto sm:min-w-[340px] bg-[#0B0E14]/98 sm:bg-[#131922]/95 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-xl p-3 z-50 max-h-[60vh] sm:max-h-64 overflow-y-auto overscroll-contain scrollbar-none animate-in fade-in slide-in-from-bottom-2 duration-150 shadow-2xl"
                  >
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10 sm:border-none mb-1 sm:mb-0">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
                        New Zealand Locations
                      </span>
                      <button
                        type="button"
                        onClick={() => setPickupOpen(false)}
                        className="sm:hidden p-1 rounded-full text-white/60 hover:text-white cursor-pointer"
                        aria-label="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      {filteredPickupLocations.length > 0 ? (
                        filteredPickupLocations.map((loc, idx) => {
                          const isSelected = pickup === loc.title;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setPickup(loc.title);
                                setPickupOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2.5 sm:py-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group flex items-start gap-2.5 border ${
                                isSelected
                                  ? "border-[#0F63BD] bg-[#0F63BD]/20 shadow-sm"
                                  : "border-transparent"
                              }`}
                            >
                              {loc.type === "airport" ? (
                                <Plane className="w-4 h-4 text-[#AECFF3] mt-0.5 shrink-0" />
                              ) : loc.type === "hotel" ? (
                                <Building2 className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                              ) : (
                                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                              )}
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium text-white group-hover:text-white transition-colors truncate">
                                  {loc.title}
                                </div>
                                <div className="text-xs text-[#94A3B8] truncate">{loc.subtitle}</div>
                              </div>
                            </button>
                          );
                        })
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPickupOpen(false)}
                          className="w-full text-left px-3 py-2.5 sm:py-2 rounded-lg hover:bg-white/10 text-xs text-neutral-300 cursor-pointer"
                        >
                          Use address: <span className="text-white font-medium">&quot;{pickup}&quot;</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Column 2: In "One way" mode: 'Drop-off location'; in "By the hour" mode: 'Duration' */}
              {mode === "transfer" ? (
                <div ref={dropoffRef} className="col-span-1 lg:col-span-3 relative">
                  <div className="bg-[#131922]/90 hover:bg-[#1A222E]/95 focus-within:bg-[#1A222E] focus-within:ring-1 focus-within:ring-[#C5A059] focus-within:border-[#C5A059]/50 border border-white/15 hover:border-white/25 rounded-xl px-3.5 py-2.5 transition-all shadow-inner shadow-black/20">
                    <label
                      htmlFor="dropoff-location-input"
                      className="block text-[11px] uppercase tracking-wider text-[#A0AEC0] font-semibold mb-1 text-left"
                    >
                      Drop-off location
                    </label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#AECFF3] shrink-0" />
                      <input
                        id="dropoff-location-input"
                        type="text"
                        value={dropoff}
                        onChange={(e) => {
                          setDropoff(e.target.value);
                          if (!dropoffOpen) setDropoffOpen(true);
                        }}
                        onFocus={() => {
                          setDropoffOpen(true);
                          setPickupOpen(false);
                          setDurationOpen(false);
                          setCalendarOpen(false);
                          setTimeOpen(false);
                        }}
                        placeholder="Where would you like to journey?"
                        className="w-full bg-transparent text-white placeholder-white/45 text-sm sm:text-base leading-6 focus:outline-none"
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  {/* Drop-off Suggestions Popover */}
                  {dropoffOpen && (
                    <div
                      data-lenis-prevent
                      className="fixed sm:absolute inset-x-3 sm:inset-x-auto bottom-3 sm:bottom-[calc(100%+10px)] sm:left-0 sm:right-auto sm:min-w-[340px] bg-[#0B0E14]/98 sm:bg-[#131922]/95 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-xl p-3 z-50 max-h-[60vh] sm:max-h-64 overflow-y-auto overscroll-contain scrollbar-none animate-in fade-in slide-in-from-bottom-2 duration-150 shadow-2xl"
                    >
                      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10 sm:border-none mb-1 sm:mb-0">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
                          Suggested Destination
                        </span>
                        <button
                          type="button"
                          onClick={() => setDropoffOpen(false)}
                          className="sm:hidden p-1 rounded-full text-white/60 hover:text-white cursor-pointer"
                          aria-label="Close"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-1">
                        {filteredDropoffLocations.length > 0 ? (
                          filteredDropoffLocations.map((loc, idx) => {
                            const isSelected = dropoff === loc.title;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  setDropoff(loc.title);
                                  setDropoffOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2.5 sm:py-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer group flex items-start gap-2.5 border ${
                                  isSelected
                                    ? "border-[#0F63BD] bg-[#0F63BD]/20 shadow-sm"
                                    : "border-transparent"
                                }`}
                              >
                                {loc.type === "airport" ? (
                                  <Plane className="w-4 h-4 text-[#AECFF3] mt-0.5 shrink-0" />
                                ) : loc.type === "hotel" ? (
                                  <Building2 className="w-4 h-4 text-[#C5A059] mt-0.5 shrink-0" />
                                ) : (
                                  <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                )}
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-medium text-white group-hover:text-white transition-colors truncate">
                                    {loc.title}
                                  </div>
                                  <div className="text-xs text-[#94A3B8] truncate">{loc.subtitle}</div>
                                </div>
                              </button>
                            );
                          })
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDropoffOpen(false)}
                            className="w-full text-left px-3 py-2.5 sm:py-2 rounded-lg hover:bg-white/10 text-xs text-neutral-300 cursor-pointer"
                          >
                            Use destination: <span className="text-white font-medium">&quot;{dropoff}&quot;</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div ref={durationRef} className="col-span-1 lg:col-span-3 relative">
                  <div
                    onClick={() => {
                      setDurationOpen(!durationOpen);
                      setPickupOpen(false);
                      setDropoffOpen(false);
                      setCalendarOpen(false);
                      setTimeOpen(false);
                    }}
                    className="bg-[#131922]/90 hover:bg-[#1A222E]/95 focus-within:bg-[#1A222E] border border-white/15 hover:border-white/25 rounded-xl px-3.5 py-2.5 cursor-pointer transition-all shadow-inner shadow-black/20"
                  >
                    <label className="block text-[11px] uppercase tracking-wider text-[#A0AEC0] font-semibold mb-1 text-left cursor-pointer">
                      Charter duration
                    </label>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 truncate">
                        <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                        <span className="text-white text-sm sm:text-base leading-6 font-normal truncate">
                          {duration}
                        </span>
                      </div>
                      {durationOpen ? (
                        <ChevronUp className="w-4 h-4 text-white/70 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-white/70 shrink-0" />
                      )}
                    </div>
                  </div>

                  {/* Duration Popover */}
                  {durationOpen && (
                    <div
                      data-lenis-prevent
                      className="fixed sm:absolute inset-x-3 sm:inset-x-auto bottom-3 sm:bottom-[calc(100%+10px)] sm:left-0 sm:right-auto sm:w-72 bg-[#0B0E14]/98 sm:bg-[#131922]/95 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-xl p-3 z-50 max-h-[60vh] sm:max-h-60 overflow-y-auto overscroll-contain scrollbar-none animate-in fade-in slide-in-from-bottom-2 duration-150 shadow-2xl"
                    >
                      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10 sm:border-none mb-1 sm:mb-0">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
                          Select Duration
                        </span>
                        <button
                          type="button"
                          onClick={() => setDurationOpen(false)}
                          className="sm:hidden p-1 rounded-full text-white/60 hover:text-white cursor-pointer"
                          aria-label="Close"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-1">
                        {DURATION_OPTIONS.map((opt) => {
                          const isSelected = duration === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                setDuration(opt);
                                setDurationOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2.5 sm:py-2 rounded-lg text-sm flex items-center justify-between transition-colors cursor-pointer border ${
                                isSelected
                                  ? "bg-[#0F63BD] text-white border-[#0F63BD] font-medium shadow-md shadow-[#0F63BD]/25"
                                  : "text-white hover:bg-white/10 border-transparent"
                              }`}
                            >
                              <span className="truncate">{opt}</span>
                              {isSelected && <Check className="w-4 h-4 text-white shrink-0 ml-2" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Column 3: 'Date' selector with interactive calendar popover */}
              <div ref={dateRef} className="col-span-1 sm:col-span-1 lg:col-span-2 relative">
                <div
                  onClick={() => {
                    setCalendarOpen(!calendarOpen);
                    setPickupOpen(false);
                    setDropoffOpen(false);
                    setDurationOpen(false);
                    setTimeOpen(false);
                  }}
                  className="bg-[#131922]/90 hover:bg-[#1A222E]/95 focus-within:bg-[#1A222E] border border-white/15 hover:border-white/25 rounded-xl px-3.5 py-2.5 cursor-pointer transition-all shadow-inner shadow-black/20"
                >
                  <label className="block text-[11px] uppercase tracking-wider text-[#A0AEC0] font-semibold mb-1 text-left cursor-pointer">
                    Ride date
                  </label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <CalendarIcon className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <span className="text-white text-sm sm:text-base leading-6 font-normal truncate">
                        {formattedDate}
                      </span>
                    </div>
                    {calendarOpen ? (
                      <ChevronUp className="w-4 h-4 text-white/70 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white/70 shrink-0" />
                    )}
                  </div>
                </div>

                {/* Calendar Popover */}
                {calendarOpen && (
                  <div
                    data-lenis-prevent
                    className="fixed sm:absolute inset-x-3 sm:inset-x-auto bottom-3 sm:bottom-[calc(100%+10px)] sm:left-0 sm:right-auto sm:w-80 bg-[#0B0E14]/98 sm:bg-[#131922]/95 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-xl p-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10 sm:border-none">
                      <span className="text-sm font-semibold text-white">
                        {MONTH_NAMES[calMonth]} {calYear}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={prevMonth}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                          aria-label="Previous month"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={nextMonth}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                          aria-label="Next month"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setCalendarOpen(false)}
                          className="sm:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white ml-1 cursor-pointer"
                          aria-label="Close"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {DAYS_OF_WEEK.map((d) => (
                        <span key={d} className="text-xs font-medium text-[#94A3B8]">
                          {d}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center">
                      {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                        <span
                          key={`prev-${i}`}
                          className="h-9 sm:h-8 flex items-center justify-center text-xs text-white/20 select-none"
                        >
                          {daysInPrevMonth - firstDayOfMonth + i + 1}
                        </span>
                      ))}

                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dayNumber = i + 1;
                        const isSelected =
                          selectedDate.getDate() === dayNumber &&
                          selectedDate.getMonth() === calMonth &&
                          selectedDate.getFullYear() === calYear;

                        return (
                          <button
                            key={`day-${dayNumber}`}
                            type="button"
                            onClick={() => handleSelectDay(dayNumber)}
                            className={`h-9 sm:h-8 rounded-lg text-xs font-medium flex items-center justify-center transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#0F63BD] text-white font-semibold shadow-md shadow-[#0F63BD]/30 border border-[#0F63BD]"
                                : "text-white hover:bg-white/10 border border-transparent"
                            }`}
                          >
                            {dayNumber}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Column 4: 'Pickup time' selector */}
              <div ref={timeRef} className="col-span-1 sm:col-span-1 lg:col-span-2 relative">
                <div
                  onClick={() => {
                    setTimeOpen(!timeOpen);
                    setPickupOpen(false);
                    setDropoffOpen(false);
                    setDurationOpen(false);
                    setCalendarOpen(false);
                  }}
                  className="bg-[#131922]/90 hover:bg-[#1A222E]/95 focus-within:bg-[#1A222E] border border-white/15 hover:border-white/25 rounded-xl px-3.5 py-2.5 cursor-pointer transition-all shadow-inner shadow-black/20"
                >
                  <label className="block text-[11px] uppercase tracking-wider text-[#A0AEC0] font-semibold mb-1 text-left cursor-pointer">
                    Pickup time
                  </label>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <span
                        className={`text-sm sm:text-base leading-6 truncate ${
                          pickupTime ? "text-white font-medium" : "text-white/45"
                        }`}
                      >
                        {pickupTime || "Choose time"}
                      </span>
                    </div>
                    {timeOpen ? (
                      <ChevronUp className="w-4 h-4 text-white/70 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white/70 shrink-0" />
                    )}
                  </div>
                </div>

                {/* Time Selection Popover */}
                {timeOpen && (
                  <div
                    data-lenis-prevent
                    className="fixed sm:absolute inset-x-3 sm:inset-x-auto bottom-3 sm:bottom-[calc(100%+10px)] sm:left-0 sm:right-auto sm:w-56 bg-[#0B0E14]/98 sm:bg-[#131922]/95 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-xl p-3 z-50 max-h-[60vh] sm:max-h-60 overflow-y-auto overscroll-contain scrollbar-none animate-in fade-in slide-in-from-bottom-2 duration-150 shadow-2xl"
                  >
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10 sm:border-none mb-1 sm:mb-0">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A059]">
                        Select Pickup Time
                      </span>
                      <button
                        type="button"
                        onClick={() => setTimeOpen(false)}
                        className="sm:hidden p-1 rounded-full text-white/60 hover:text-white cursor-pointer"
                        aria-label="Close"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      {pickupTime && (
                        <button
                          type="button"
                          onClick={() => {
                            setPickupTime("");
                            setTimeOpen(false);
                          }}
                          className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-transparent mb-1"
                        >
                          Clear time (Choose time)
                        </button>
                      )}
                      {TIME_OPTIONS.map((t) => {
                        const isSelected = pickupTime === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              setPickupTime(t);
                              setTimeOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2.5 sm:py-2 rounded-lg text-sm flex items-center justify-between transition-colors cursor-pointer border ${
                              isSelected
                                ? "bg-[#0F63BD] text-white border-[#0F63BD] font-medium shadow-md shadow-[#0F63BD]/25"
                                : "text-white hover:bg-white/10 border-transparent"
                            }`}
                          >
                            <span>{t}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button: Touch-friendly min-h-[48px] CTA */}
              <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex items-end pt-1 lg:pt-0">
                <button
                  type="submit"
                  disabled={isLoading}
                  data-cy="search-button"
                  className="luxury-btn-primary w-full h-[46px] min-h-[46px] sm:h-[48px] px-5 rounded-xl font-medium text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#0F63BD]/35 hover:shadow-[#0F63BD]/50 active:scale-[0.98] disabled:opacity-75 cursor-pointer whitespace-nowrap"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                  ) : (
                    <>
                      <span className="whitespace-nowrap">Reserve Ride</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Interactive Book Now Modal rendered via Portal with pre-filled inputs */}
      <BookRideModal
        isOpen={bookModalOpen}
        onClose={() => setBookModalOpen(false)}
        initialValues={{
          pickupAddress: pickup,
          dropoffAddress:
            mode === "hourly"
              ? (dropoff || `Hourly charter (${duration})`)
              : dropoff,
          date: selectedDate
            ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
            : "",
          time: pickupTime,
          service:
            mode === "hourly"
              ? "Hourly & By-the-Hour Hire"
              : (pickup.toLowerCase().includes("airport") || dropoff.toLowerCase().includes("airport"))
              ? "Airport Transfer (Flight Tracked)"
              : "Airport Transfer (Flight Tracked)",
          specialInstruction: mode === "hourly" ? `Hourly charter duration: ${duration}` : "",
        }}
      />
    </>
  );
}
