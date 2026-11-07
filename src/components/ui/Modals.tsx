"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Check,
  ShieldCheck,
  Clock,
  Users,
  Briefcase,
  ArrowRight,
  Car,
  ChevronRight,
} from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function BaseModal({ isOpen, onClose, title, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-lg bg-[#141A23] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-in zoom-in-95 duration-200 text-white max-h-[90vh] overflow-y-auto scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <h3 className="text-xl font-medium tracking-tight text-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}

export function SignInModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Sign in to Blacklane">
      {isSubmitted ? (
        <div className="py-8 text-center">
          <div className="w-12 h-12 rounded-full bg-[#3E1DD1]/20 text-[#AECFF3] flex items-center justify-center mx-auto mb-4 border border-[#3E1DD1]">
            <Check className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-lg font-medium text-white mb-1">Welcome back</h4>
          <p className="text-sm text-white/60">Redirecting to your personal chauffeur dashboard...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5 font-medium">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#3E1DD1] focus:ring-1 focus:ring-[#3E1DD1] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5 font-medium">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#3E1DD1] focus:ring-1 focus:ring-[#3E1DD1] transition-all"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-white/60 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded bg-white/10 border-white/20 text-[#3E1DD1] focus:ring-0" />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="text-[#AECFF3] hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#3E1DD1] hover:bg-[#4d2ce0] text-white font-medium text-sm transition-all duration-150 shadow-md shadow-[#3E1DD1]/30 active:scale-[0.99] mt-2 cursor-pointer"
          >
            Sign in
          </button>

          <p className="text-xs text-center text-white/50 pt-2">
            Don&apos;t have an account yet?{" "}
            <a href="#register" className="text-[#AECFF3] hover:underline font-medium">
              Sign up
            </a>
          </p>
        </form>
      )}
    </BaseModal>
  );
}

export function ViewOptionsModal({
  isOpen,
  onClose,
  bookingDetails,
}: {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    mode: string;
    pickup: string;
    dropoff: string;
    duration: string;
    date: string;
    time: string;
  };
}) {
  const [selectedVehicle, setSelectedVehicle] = useState("business");
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsBooked(false);
    }
  }, [isOpen]);

  const VEHICLES = [
    {
      id: "business",
      name: "Business Class",
      models: "Mercedes-Benz E-Class, BMW 5 Series, Audi A6",
      seats: 3,
      luggage: 2,
      price: "$164.20",
      featured: true,
    },
    {
      id: "first",
      name: "First Class",
      models: "Mercedes-Benz S-Class, BMW 7 Series, Audi A8",
      seats: 3,
      luggage: 2,
      price: "$228.50",
      featured: false,
    },
    {
      id: "van",
      name: "Business Van / SUV",
      models: "Mercedes-Benz V-Class, Cadillac Escalade",
      seats: 5,
      luggage: 5,
      price: "$256.00",
      featured: false,
    },
  ];

  const handleConfirm = () => {
    setIsBooked(true);
  };

  const handleScrollToFleet = () => {
    onClose();
    setTimeout(() => {
      const fleetEl = document.getElementById("fleet");
      if (fleetEl) {
        fleetEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={isBooked ? "Reservation Confirmed" : "Available Vehicle Classes"}>
      {isBooked ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#3E1DD1]/20 border border-[#3E1DD1] flex items-center justify-center mx-auto text-white shadow-lg shadow-[#3E1DD1]/30">
            <Check className="w-7 h-7 text-[#AECFF3]" />
          </div>
          <div>
            <h4 className="text-xl font-medium text-white mb-1.5">Your ride is reserved</h4>
            <p className="text-sm text-white/70 max-w-sm mx-auto leading-relaxed">
              We have reserved your chauffeur for{" "}
              <span className="text-white font-medium">{bookingDetails.date}</span> at{" "}
              <span className="text-white font-medium">{bookingDetails.time}</span>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-left space-y-2 text-white/80">
            <div className="flex justify-between">
              <span className="text-white/50">Pickup:</span>
              <span className="font-medium text-white truncate max-w-[240px]">{bookingDetails.pickup}</span>
            </div>
            {bookingDetails.mode === "transfer" ? (
              <div className="flex justify-between">
                <span className="text-white/50">Destination:</span>
                <span className="font-medium text-white truncate max-w-[240px]">{bookingDetails.dropoff}</span>
              </div>
            ) : (
              <div className="flex justify-between">
                <span className="text-white/50">Duration:</span>
                <span className="font-medium text-white">{bookingDetails.duration}</span>
              </div>
            )}
            <div className="flex justify-between pt-1 border-t border-white/10">
              <span className="text-white/50">Vehicle:</span>
              <span className="font-medium text-[#AECFF3]">
                {VEHICLES.find((v) => v.id === selectedVehicle)?.name || "Business Class"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-full bg-[#3E1DD1] hover:bg-[#4d2ce0] text-white font-medium text-sm transition-all duration-150 shadow-md shadow-[#3E1DD1]/30 cursor-pointer"
          >
            Done
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Ride Summary Header */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/80 space-y-1">
            <div className="flex items-center justify-between text-white font-medium">
              <span className="truncate pr-2">
                {bookingDetails.mode === "transfer"
                  ? `${bookingDetails.pickup || "Auckland Airport"} → ${bookingDetails.dropoff || "City Centre"}`
                  : `Hourly Hire (${bookingDetails.duration})`}
              </span>
              <span className="text-[#AECFF3] shrink-0 font-medium">{bookingDetails.time}</span>
            </div>
            <div className="text-white/50">{bookingDetails.date} • Fixed all-inclusive price</div>
          </div>

          {/* Vehicle Selection List */}
          <div className="space-y-2.5">
            {VEHICLES.map((v) => (
              <div
                key={v.id}
                onClick={() => setSelectedVehicle(v.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedVehicle === v.id
                    ? "bg-[#3E1DD1]/20 border-[#3E1DD1] shadow-lg shadow-[#3E1DD1]/20"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white">{v.name}</h4>
                    {v.featured && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#3E1DD1] text-white">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/50 mt-0.5">{v.models}</p>
                  <div className="flex items-center gap-3 text-xs text-white/60 mt-2">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-white/40" /> {v.seats} passengers
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-white/40" /> {v.luggage} bags
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-base font-semibold text-white">{v.price}</div>
                  <div className="text-[11px] text-white/40">Includes all taxes & tip</div>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits list */}
          <div className="pt-2 text-xs text-white/70 space-y-1.5">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#AECFF3]" />
              <span>Complimentary 60-minute wait time for airport pickups</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#AECFF3]" />
              <span>Free cancellation up to 1 hour before scheduled pickup</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full py-3.5 rounded-full bg-[#3E1DD1] hover:bg-[#4d2ce0] text-white font-medium text-sm transition-all duration-150 shadow-md shadow-[#3E1DD1]/30 flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
            >
              <span>Continue to passenger details</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleScrollToFleet}
              className="w-full py-2.5 rounded-full text-xs text-white/60 hover:text-white transition-colors flex items-center justify-center gap-1 cursor-pointer hover:bg-white/5"
            >
              <span>Explore full vehicle fleet specifications</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </BaseModal>
  );
}

export function ServiceDetailModal({
  isOpen,
  onClose,
  service,
}: {
  isOpen: boolean;
  onClose: () => void;
  service: {
    category: string;
    title: string;
    body: string;
    image: string;
  } | null;
}) {
  if (!service) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={service.category}>
      <div className="space-y-4">
        <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden bg-black/20">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-lg font-medium text-white mb-2">{service.title}</h4>
          <p className="text-sm text-white/80 leading-relaxed font-light">{service.body}</p>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70 space-y-1.5">
          <div className="font-semibold text-white">Included with every booking:</div>
          <div>• Professional, licensed and background-checked chauffeur</div>
          <div>• Flight tracking and automatic delay adjustments</div>
          <div>• Curated Mercedes-Benz, BMW, and Audi vehicle classes</div>
          <div>• Chilled bottled water and multi-device phone chargers</div>
        </div>
        <button
          type="button"
          onClick={() => {
            onClose();
            const widget = document.getElementById("booking-form");
            widget?.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-full py-3 rounded-full bg-[#3E1DD1] hover:bg-[#4d2ce0] text-white font-medium text-sm transition-all cursor-pointer"
        >
          Book this service
        </button>
      </div>
    </BaseModal>
  );
}

export { BookRideModal, type BookRideInitialValues, type BookRideModalProps } from "./BookRideModal";
