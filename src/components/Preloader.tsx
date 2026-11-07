"use client";

import React, { useState, useEffect } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    // Lock body scroll while preloader is active
    document.body.style.overflow = "hidden";

    // Smooth progressive loading timeline
    const startTime = Date.now();
    const duration = 1800; // 1.8s for smooth, luxurious loading feeling

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = elapsed / duration;

      // Realistic easing: fast initial rise, steady cruise, crisp finish to 100
      let currentProgress = 0;
      if (rawProgress < 0.6) {
        currentProgress = (rawProgress / 0.6) * 65;
      } else if (rawProgress < 0.9) {
        currentProgress = 65 + ((rawProgress - 0.6) / 0.3) * 28;
      } else {
        currentProgress = 93 + ((rawProgress - 0.9) / 0.1) * 7;
      }

      const clamped = Math.min(100, Math.round(currentProgress));
      setProgress(clamped);

      if (elapsed >= duration) {
        clearInterval(interval);
        setProgress(100);

        // Hold briefly at 100% then trigger smooth scale-down & fade-out exit
        setTimeout(() => {
          setIsExiting(true);
          document.body.style.overflow = "";

          setTimeout(() => {
            setIsRemoved(true);
          }, 650);
        }, 180);
      }
    }, 25);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      id="blacklane-preloader"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-700 ease-in-out select-none ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={isExiting}
    >
      {/* Central Branding Wrapper with smooth scale-down and fade exit */}
      <div
        className={`flex flex-col items-center justify-center transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExiting ? "scale-90 opacity-0 -translate-y-2" : "scale-100 opacity-100 translate-y-0"
        }`}
      >
        {/* Geometric Ribbon 'B' Logo Icon with gentle pulse and metallic light sweep */}
        <div className="relative w-20 sm:w-24 md:w-28 aspect-[246/148] flex items-center justify-center preloader-logo-pulse">
          {/* Masked SVG with sweeping metallic shine */}
          <svg
            viewBox="0 0 246 148"
            className="w-full h-full drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Metallic Light Sweep Gradient */}
              <linearGradient id="metallicSweepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.82" />
                <stop offset="38%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="62%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.82" />
              </linearGradient>

              {/* Exact geometric ribbon mask */}
              <mask id="ribbonBMask">
                <path
                  d="M0 0 L173 0 L221 48 L197 72 L246 122 L222 148 L208 148 L231 124 L124 124 L74 74 L183 74 L207 49 L48 48 Z"
                  fill="#ffffff"
                />
              </mask>
            </defs>

            {/* Base White Geometric Ribbon */}
            <path
              d="M0 0 L173 0 L221 48 L197 72 L246 122 L222 148 L208 148 L231 124 L124 124 L74 74 L183 74 L207 49 L48 48 Z"
              fill="#ffffff"
              opacity="0.92"
            />

            {/* Moving crisp metallic sheen across the sharp angular edges */}
            <g mask="url(#ribbonBMask)">
              <rect
                x="-140"
                y="-30"
                width="120"
                height="210"
                fill="url(#metallicSweepGradient)"
                className="preloader-metallic-gleam"
                transform="rotate(25 123 74)"
              />
            </g>
          </svg>
        </div>

        {/* Minimal Typography: 'Blacklane' */}
        <h1 className="mt-6 text-xs sm:text-sm font-sans font-normal tracking-[0.32em] uppercase text-white/95">
          Ammar Luxury
        </h1>

        {/* Thin Subtle Horizontal Loading Line (Progress Bar) */}
        <div className="w-36 sm:w-44 h-[1.5px] bg-white/15 rounded-full overflow-hidden mt-7 relative">
          <div
            className="h-full bg-white rounded-full transition-all duration-100 ease-out shadow-[0_0_6px_rgba(255,255,255,0.7)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Embedded Styles for Metallic Sweep & Gentle Pulse */}
      <style jsx>{`
        .preloader-logo-pulse {
          animation: preloaderPulse 1.8s ease-in-out infinite;
        }

        @keyframes preloaderPulse {
          0%,
          100% {
            opacity: 0.72;
            transform: scale(0.985);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .preloader-metallic-gleam {
          animation: metallicLightSweep 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes metallicLightSweep {
          0% {
            x: -240px;
          }
          45%,
          100% {
            x: 320px;
          }
        }
      `}</style>
    </div>
  );
}

export default Preloader;
