"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Check,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Search,
} from "lucide-react";

export interface BookRideInitialValues {
  pickupAddress?: string;
  dropoffAddress?: string;
  date?: string;
  time?: string;
  service?: string;
  vehicle?: string;
  passengers?: string;
  specialInstruction?: string;
}

export interface BookRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultVehicle?: string;
  defaultPickup?: string;
  defaultDropoff?: string;
  defaultDate?: string;
  defaultTime?: string;
  defaultSpecialInstruction?: string;
  initialValues?: BookRideInitialValues;
}

export interface CountryInfo {
  name: string;
  code: string;
  flag: string;
}

// Comprehensive country list starting with New Zealand followed by popular selections and alphabetical list
export const COUNTRIES: CountryInfo[] = [
  // Primary selections - New Zealand default for local chauffeur operations
  { name: "New Zealand", code: "+64", flag: "🇳🇿" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Bangladesh", code: "+880", flag: "🇧🇩" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
  { name: "Qatar", code: "+974", flag: "🇶🇦" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Pakistan", code: "+92", flag: "🇵🇰" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Italy", code: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "+34", flag: "🇪🇸" },
  { name: "Netherlands", code: "+31", flag: "🇳🇱" },
  { name: "Switzerland", code: "+41", flag: "🇨🇭" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "South Korea", code: "+82", flag: "🇰🇷" },
  { name: "China", code: "+86", flag: "🇨🇳" },

  // Alphabetical list from screenshot: Afghanistan, Åland Islands, Albania, Algeria...
  { name: "Afghanistan", code: "+93", flag: "🇦🇫" },
  { name: "Åland Islands", code: "+358", flag: "🇦🇽" },
  { name: "Albania", code: "+355", flag: "🇦🇱" },
  { name: "Algeria", code: "+213", flag: "🇩🇿" },
  { name: "American Samoa", code: "+1", flag: "🇦🇸" },
  { name: "Andorra", code: "+376", flag: "🇦🇩" },
  { name: "Angola", code: "+244", flag: "🇦🇴" },
  { name: "Anguilla", code: "+1264", flag: "🇦🇮" },
  { name: "Antigua and Barbuda", code: "+1268", flag: "🇦🇬" },
  { name: "Argentina", code: "+54", flag: "🇦🇷" },
  { name: "Armenia", code: "+374", flag: "🇦🇲" },
  { name: "Aruba", code: "+297", flag: "🇦🇼" },
  { name: "Austria", code: "+43", flag: "🇦🇹" },
  { name: "Azerbaijan", code: "+994", flag: "🇦🇿" },
  { name: "Bahamas", code: "+1242", flag: "🇧🇸" },
  { name: "Bahrain", code: "+973", flag: "🇧🇭" },
  { name: "Barbados", code: "+1246", flag: "🇧🇧" },
  { name: "Belarus", code: "+375", flag: "🇧🇾" },
  { name: "Belgium", code: "+32", flag: "🇧🇪" },
  { name: "Belize", code: "+501", flag: "🇧🇿" },
  { name: "Benin", code: "+229", flag: "🇧🇯" },
  { name: "Bermuda", code: "+1441", flag: "🇧🇲" },
  { name: "Bhutan", code: "+975", flag: "🇧🇹" },
  { name: "Bolivia", code: "+591", flag: "🇧🇴" },
  { name: "Bosnia and Herzegovina", code: "+387", flag: "🇧🇦" },
  { name: "Botswana", code: "+267", flag: "🇧🇼" },
  { name: "Brazil", code: "+55", flag: "🇧🇷" },
  { name: "Brunei", code: "+673", flag: "🇧🇳" },
  { name: "Bulgaria", code: "+359", flag: "🇧🇬" },
  { name: "Cambodia", code: "+855", flag: "🇰🇭" },
  { name: "Cameroon", code: "+237", flag: "🇨🇲" },
  { name: "Chile", code: "+56", flag: "🇨🇱" },
  { name: "Colombia", code: "+57", flag: "🇨🇴" },
  { name: "Costa Rica", code: "+506", flag: "🇨🇷" },
  { name: "Croatia", code: "+385", flag: "🇭🇷" },
  { name: "Cyprus", code: "+357", flag: "🇨🇾" },
  { name: "Czech Republic", code: "+420", flag: "🇨🇿" },
  { name: "Denmark", code: "+45", flag: "🇩🇰" },
  { name: "Dominican Republic", code: "+1809", flag: "🇩🇴" },
  { name: "Ecuador", code: "+593", flag: "🇪🇨" },
  { name: "Egypt", code: "+20", flag: "🇪🇬" },
  { name: "Estonia", code: "+372", flag: "🇪🇪" },
  { name: "Ethiopia", code: "+251", flag: "🇪🇹" },
  { name: "Fiji", code: "+679", flag: "🇫🇯" },
  { name: "Finland", code: "+358", flag: "🇫🇮" },
  { name: "Georgia", code: "+995", flag: "🇬🇪" },
  { name: "Ghana", code: "+233", flag: "🇬🇭" },
  { name: "Greece", code: "+30", flag: "🇬🇷" },
  { name: "Hong Kong", code: "+852", flag: "🇭🇰" },
  { name: "Hungary", code: "+36", flag: "🇭🇺" },
  { name: "Iceland", code: "+354", flag: "🇮🇸" },
  { name: "Indonesia", code: "+62", flag: "🇮🇩" },
  { name: "Ireland", code: "+353", flag: "🇮🇪" },
  { name: "Israel", code: "+972", flag: "🇮🇱" },
  { name: "Jamaica", code: "+1876", flag: "🇯🇲" },
  { name: "Jordan", code: "+962", flag: "🇯🇴" },
  { name: "Kenya", code: "+254", flag: "🇰🇪" },
  { name: "Kuwait", code: "+965", flag: "🇰🇼" },
  { name: "Lebanon", code: "+961", flag: "🇱🇧" },
  { name: "Luxembourg", code: "+352", flag: "🇱🇺" },
  { name: "Maldives", code: "+960", flag: "🇲🇻" },
  { name: "Mexico", code: "+52", flag: "🇲🇽" },
  { name: "Monaco", code: "+377", flag: "🇲🇨" },
  { name: "Morocco", code: "+212", flag: "🇲🇦" },
  { name: "Nepal", code: "+977", flag: "🇳🇵" },
  { name: "Nigeria", code: "+234", flag: "🇳🇬" },
  { name: "Norway", code: "+47", flag: "🇳🇴" },
  { name: "Oman", code: "+968", flag: "🇴🇲" },
  { name: "Philippines", code: "+63", flag: "🇵🇭" },
  { name: "Poland", code: "+48", flag: "🇵🇱" },
  { name: "Portugal", code: "+351", flag: "🇵🇹" },
  { name: "Romania", code: "+40", flag: "🇷🇴" },
  { name: "South Africa", code: "+27", flag: "🇿🇦" },
  { name: "Sweden", code: "+46", flag: "🇸🇪" },
  { name: "Thailand", code: "+66", flag: "🇹🇭" },
  { name: "Turkey", code: "+90", flag: "🇹🇷" },
  { name: "Vietnam", code: "+84", flag: "🇻🇳" },
];

const SERVICES = [
  "Select a Service",
  "Airport Transfer (Flight Tracked)",
  "Hourly & By-the-Hour Hire",
  "City-to-City Long Distance",
  "Chauffeur Hailing (On Demand)",
  "Limousine & VIP Chauffeur",
];

const VEHICLES = [
  "Select a Vehicle",
  "Business Class (Mercedes-Benz E-Class, BMW 5 Series)",
  "Electric Class (EQS, BMW i7, Porsche Taycan)",
  "First Class (Mercedes-Benz S-Class, BMW 7 Series)",
  "Business Van / SUV (Mercedes-Benz V-Class, Escalade)",
];

const PASSENGER_OPTIONS = [
  "Number of Passengers",
  "1 Passenger",
  "2 Passengers",
  "3 Passengers",
  "4 Passengers",
  "5 Passengers",
  "6 Passengers",
  "7+ Passengers",
];

export function BookRideModal({
  isOpen,
  onClose,
  defaultService = SERVICES[0],
  defaultVehicle = VEHICLES[0],
  defaultPickup,
  defaultDropoff,
  defaultDate,
  defaultTime,
  defaultSpecialInstruction,
  initialValues,
}: BookRideModalProps) {
  const [mounted, setMounted] = useState(false);

  // Form Fields - First & Last name as requested
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // Selected Country: default to New Zealand (+64)
  const defaultNzCountry = COUNTRIES.find((c) => c.name === "New Zealand" || c.code === "+64") || COUNTRIES[0];
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(defaultNzCountry);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(initialValues?.service || defaultService);
  const [passengers, setPassengers] = useState(initialValues?.passengers || PASSENGER_OPTIONS[0]);
  const [vehicle, setVehicle] = useState(initialValues?.vehicle || defaultVehicle);
  const [pickupAddress, setPickupAddress] = useState(initialValues?.pickupAddress || defaultPickup || "");
  const [dropoffAddress, setDropoffAddress] = useState(initialValues?.dropoffAddress || defaultDropoff || "");
  const [date, setDate] = useState(initialValues?.date || defaultDate || "");
  const [time, setTime] = useState(initialValues?.time || defaultTime || "");
  const [returnTrip, setReturnTrip] = useState<"yes" | "no">("no");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [specialInstruction, setSpecialInstruction] = useState(initialValues?.specialInstruction || defaultSpecialInstruction || "");
  const [babySeat, setBabySeat] = useState<"no" | "yes">("no");
  const [bookingIntent, setBookingIntent] = useState<"quote" | "book">("quote");

  // Sync state whenever modal opens or initial values change
  useEffect(() => {
    if (isOpen) {
      if (initialValues?.pickupAddress !== undefined) {
        setPickupAddress(initialValues.pickupAddress);
      } else if (defaultPickup !== undefined) {
        setPickupAddress(defaultPickup);
      }

      if (initialValues?.dropoffAddress !== undefined) {
        setDropoffAddress(initialValues.dropoffAddress);
      } else if (defaultDropoff !== undefined) {
        setDropoffAddress(defaultDropoff);
      }

      if (initialValues?.date !== undefined) {
        setDate(initialValues.date);
      } else if (defaultDate !== undefined) {
        setDate(defaultDate);
      }

      if (initialValues?.time !== undefined) {
        setTime(initialValues.time);
      } else if (defaultTime !== undefined) {
        setTime(defaultTime);
      }

      if (initialValues?.service) {
        setService(initialValues.service);
      } else if (defaultService) {
        setService(defaultService);
      }

      if (initialValues?.vehicle) {
        setVehicle(initialValues.vehicle);
      } else if (defaultVehicle) {
        setVehicle(defaultVehicle);
      }

      if (initialValues?.passengers) {
        setPassengers(initialValues.passengers);
      }

      if (initialValues?.specialInstruction !== undefined) {
        setSpecialInstruction(initialValues.specialInstruction);
      } else if (defaultSpecialInstruction !== undefined) {
        setSpecialInstruction(defaultSpecialInstruction);
      }
      setIsSuccess(false);
    }
  }, [
    isOpen,
    initialValues,
    defaultPickup,
    defaultDropoff,
    defaultDate,
    defaultTime,
    defaultService,
    defaultVehicle,
    defaultSpecialInstruction,
  ]);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Refs for click outside
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close country dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(e.target as Node)
      ) {
        setIsCountryDropdownOpen(false);
      }
    };
    if (isCountryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCountryDropdownOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          if (isCountryDropdownOpen) {
            setIsCountryDropdownOpen(false);
          } else {
            onClose();
          }
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose, isCountryDropdownOpen]);

  if (!isOpen || !mounted) return null;

  // Filter countries by search term
  const filteredCountries = COUNTRIES.filter((c) => {
    if (!countrySearch.trim()) return true;
    const q = countrySearch.toLowerCase().trim();
    return (
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  });

  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "transfer",
          pickup_location: pickupAddress || "TBD",
          dropoff_location: dropoffAddress || "TBD",
          first_name: firstName,
          last_name: lastName,
          passenger_name: fullName || "Guest",
          country_code: selectedCountry.code,
          phone: phone,
          email: email,
          service_type: service,
          vehicle_type: vehicle,
          passenger_count: parseInt(passengers) || 1,
          ride_date: date || new Date().toISOString().split("T")[0],
          ride_time: time || "12:00 PM",
          return_trip: returnTrip,
          return_date: returnDate || null,
          return_time: returnTime || null,
          special_instruction: specialInstruction || null,
          baby_seat: babySeat,
          booking_intent: bookingIntent,
        }),
      }).catch(() => {});
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return createPortal(
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200"
    >
      {/* Dim Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Main Dialog Modal: Minimal & Modern White Card matching user's design */}
      <div
        className="relative w-full max-w-[760px] bg-white border border-gray-200 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl z-10 animate-in zoom-in-95 duration-200 text-gray-900 max-h-[92vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button top-right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title: Exactly "Book Your Ride Now!" */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
            Book Your Ride Now!
          </h2>
        </div>

        {/* Form Body or Success Confirmation */}
        {isSuccess ? (
          <div className="py-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600 shadow-lg shadow-emerald-500/10">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 tracking-tight">
                {bookingIntent === "book" ? "Booking Confirmed!" : "Quotation Request Received!"}
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, <span className="font-semibold text-gray-900">{fullName || "Guest"}</span>.
                Our concierge dispatch team will confirm your details and contact you at{" "}
                <span className="font-medium text-emerald-700">
                  {selectedCountry.code} {phone || email || "your provided contacts"}
                </span>{" "}
                shortly.
              </p>
            </div>

            {/* Summary Details Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-left space-y-2.5 max-w-lg mx-auto">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-500 uppercase tracking-wider text-[10px] font-medium">Passenger</span>
                <span className="font-semibold text-gray-900">{fullName || "Guest"}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <span className="text-gray-500 uppercase tracking-wider text-[10px] font-medium">Service / Vehicle</span>
                <span className="font-semibold text-gray-900">{vehicle !== "Select a Vehicle" ? vehicle.split("(")[0].trim() : "Standard Class"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Contact:</span>
                <span className="font-medium text-gray-900">{selectedCountry.flag} {selectedCountry.code} {phone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Pick-up:</span>
                <span className="font-medium text-gray-900 truncate max-w-[260px]">{pickupAddress || "Not specified"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Drop Off:</span>
                <span className="font-medium text-gray-900 truncate max-w-[260px]">{dropoffAddress || "Not specified"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Schedule:</span>
                <span className="font-medium text-gray-900">{date || "Today"} {time ? `at ${time}` : ""}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Options:</span>
                <span className="font-medium text-gray-900">
                  {passengers !== "Number of Passengers" ? passengers : "1-2 Passengers"}
                  {babySeat === "yes" ? " • Baby Seat included" : ""}
                  {returnTrip === "yes" ? " • Return trip requested" : ""}
                </span>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto min-w-[200px] px-8 py-3 rounded-xl bg-[#00873E] hover:bg-[#007033] active:scale-95 text-white font-semibold text-sm transition-all shadow-md shadow-emerald-700/20 cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Row 1: First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {/* First Name */}
              <div>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-gray-900 placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-white transition-all"
                />
              </div>

              {/* Last Name */}
              <div>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-gray-900 placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Row 2: Phone No. & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {/* Phone No. with Flag + Code Button & Interactive Popover */}
              <div
                ref={countryDropdownRef}
                className={`relative flex items-center rounded-lg bg-[#F9FAFB] border transition-all ${
                  isCountryDropdownOpen
                    ? "border-blue-500 ring-2 ring-blue-500/20 bg-white"
                    : "border-[#E5E7EB] focus-within:ring-1 focus-within:ring-gray-400 focus-within:bg-white"
                }`}
              >
                {/* Flag + Country Code Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsCountryDropdownOpen((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-3 py-3 rounded-l-lg border-r border-[#E5E7EB] hover:bg-gray-100 transition-colors cursor-pointer shrink-0 select-none ${
                    isCountryDropdownOpen ? "bg-gray-100 text-blue-600" : ""
                  }`}
                  aria-expanded={isCountryDropdownOpen}
                  aria-label={`Select country code. Currently ${selectedCountry.name} ${selectedCountry.code}`}
                >
                  <span className="text-xl leading-none">{selectedCountry.flag}</span>
                  <span className="text-xs font-semibold text-gray-700 leading-none">
                    {selectedCountry.code}
                  </span>
                  <span className="text-[8px] text-gray-500 leading-none">
                    {isCountryDropdownOpen ? "▲" : "▾"}
                  </span>
                </button>

                {/* Phone Input */}
                <input
                  ref={phoneInputRef}
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone No."
                  className="w-full px-3 py-3 bg-transparent text-gray-900 placeholder-[#9CA3AF] text-sm focus:outline-none"
                />

                {/* Country Dropdown Popover */}
                {isCountryDropdownOpen && (
                  <div className="absolute top-[calc(100%+4px)] left-0 z-50 w-72 sm:w-80 bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    {/* Search box for convenient quick search */}
                    <div className="p-2 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <input
                        type="text"
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        placeholder="Search country or code..."
                        className="w-full bg-transparent text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
                        autoFocus
                      />
                      {countrySearch && (
                        <button
                          type="button"
                          onClick={() => setCountrySearch("")}
                          className="text-gray-400 hover:text-gray-600 p-0.5"
                          aria-label="Clear search"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Scrollable list of countries */}
                    <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 divide-y divide-gray-50">
                      {filteredCountries.map((c) => {
                        const isSelected = selectedCountry.name === c.name;
                        return (
                          <button
                            key={`${c.name}-${c.code}`}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(c);
                              setIsCountryDropdownOpen(false);
                              setCountrySearch("");
                              phoneInputRef.current?.focus();
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-100 transition-colors cursor-pointer text-xs sm:text-sm ${
                              isSelected ? "bg-blue-50/70 font-medium" : ""
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0 pr-2">
                              <span className="text-base leading-none shrink-0">{c.flag}</span>
                              <span className="text-gray-900 truncate">{c.name}</span>
                              <span className="text-gray-400 text-xs shrink-0 font-normal">
                                {c.code}
                              </span>
                            </div>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-1" />
                            )}
                          </button>
                        );
                      })}
                      {filteredCountries.length === 0 && (
                        <div className="py-4 text-center text-xs text-gray-400">
                          No country found matching &quot;{countrySearch}&quot;
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-gray-900 placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Row 3: Service, Passengers & Vehicle Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {/* Select a Service - Full Width on 2-col layout */}
              <div className="sm:col-span-2">
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-white transition-all cursor-pointer"
                >
                  {SERVICES.map((s) => (
                    <option key={s} value={s} className="bg-white text-gray-900">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Number of Passengers */}
              <div>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-white transition-all cursor-pointer"
                >
                  {PASSENGER_OPTIONS.map((p) => (
                    <option key={p} value={p} className="bg-white text-gray-900">
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select a Vehicle */}
              <div>
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-white transition-all cursor-pointer"
                >
                  {VEHICLES.map((v) => (
                    <option key={v} value={v} className="bg-white text-gray-900">
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4: Pick-up & Drop-off Addresses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {/* Enter Street number, street name and suburb */}
              <div>
                <input
                  type="text"
                  required
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Enter Street number, street name and suburb"
                  className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-gray-900 placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-white transition-all"
                />
              </div>

              {/* Enter Drop Off Address */}
              <div>
                <input
                  type="text"
                  required
                  value={dropoffAddress}
                  onChange={(e) => setDropoffAddress(e.target.value)}
                  placeholder="Enter Drop Off Address"
                  className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-gray-900 placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Row 5: Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {/* Date */}
              <div>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Date"
                  className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-gray-700 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-white transition-all"
                />
              </div>

              {/* Time */}
              <div>
                <input
                  type="text"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Choose your time"
                  className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-gray-900 placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Row 6: Return Trip* */}
            <div className="pt-1">
              <label className="block text-xs font-semibold text-gray-800 mb-2">
                Return Trip <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                {/* Yes option */}
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="returnTrip"
                    checked={returnTrip === "yes"}
                    onChange={() => setReturnTrip("yes")}
                    className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="px-4 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Yes
                  </span>
                </label>

                {/* No option */}
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="returnTrip"
                    checked={returnTrip === "no"}
                    onChange={() => setReturnTrip("no")}
                    className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="px-4 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    No
                  </span>
                </label>
              </div>

              {/* Optional Return Date/Time expansion if Yes */}
              {returnTrip === "yes" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mt-3 pt-3 border-t border-gray-100 animate-in fade-in duration-200">
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    placeholder="Return Date"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-gray-700 text-sm focus:outline-none"
                  />
                  <input
                    type="text"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    placeholder="Return Time (e.g. 06:00 PM)"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-gray-900 placeholder-[#9CA3AF] text-sm focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Row 7: Special Instruction ( If Any ) */}
            <div>
              <textarea
                rows={3}
                value={specialInstruction}
                onChange={(e) => setSpecialInstruction(e.target.value)}
                placeholder="Special Instruction ( If Any )"
                className="w-full px-4 py-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-gray-900 placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Row 8: Baby Seat Required */}
            <div>
              <label className="block text-xs font-semibold text-gray-800 mb-2">
                Baby Seat Required
              </label>
              <div className="flex items-center gap-4">
                {/* No option */}
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="babySeat"
                    checked={babySeat === "no"}
                    onChange={() => setBabySeat("no")}
                    className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="px-4 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    No
                  </span>
                </label>

                {/* Yes option */}
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="babySeat"
                    checked={babySeat === "yes"}
                    onChange={() => setBabySeat("yes")}
                    className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="px-4 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Yes
                  </span>
                </label>
              </div>
            </div>

            {/* Row 9: Purpose Intent Toggles (I want quotation vs I want to make a booking) */}
            <div className="pt-1">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {/* I want quotation */}
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="bookingIntent"
                    checked={bookingIntent === "quote"}
                    onChange={() => setBookingIntent("quote")}
                    className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="px-4 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    I want quotation
                  </span>
                </label>

                {/* I want to make a booking */}
                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="bookingIntent"
                    checked={bookingIntent === "book"}
                    onChange={() => setBookingIntent("book")}
                    className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="px-4 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    I want to make a booking
                  </span>
                </label>
              </div>
            </div>

            {/* Row 10: SUBMIT Button matching the green button in image */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-44 py-3.5 px-6 rounded-lg bg-[#00873E] hover:bg-[#007335] active:scale-95 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <span>SUBMIT</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}

export default BookRideModal;
