"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollEffects() {
  useEffect(() => {
    let refreshTimer: NodeJS.Timeout;

    const ctx = gsap.context(() => {
      // 1. Hero Content & Booking Card Scroll Upwards over Fixed Background
      if (document.querySelector(".hero-section")) {
        gsap.to(".hero-content, .hero-booking-wrapper", {
          y: -60,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "30% top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        // Toggle fixed background visibility once past hero to ensure clean stacking
        ScrollTrigger.create({
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          onLeave: () => gsap.set(".hero-fixed-bg", { autoAlpha: 0 }),
          onEnterBack: () => gsap.set(".hero-fixed-bg", { autoAlpha: 1 }),
        });
      }

      // Master Header State Helper: Consistent Luxury Dark Obsidian Glass
      const setHeaderGlass = () => {
        const header = document.querySelector("header");
        if (header) {
          header.classList.add("header-dark");
          header.classList.remove("header-light");
        }
      };

      // Ensure header initializes in dark glass state
      setHeaderGlass();

      // 2. Services Section Headline reveal
      if (document.querySelector("#services")) {
        const headingElements = gsap.utils.toArray<HTMLElement>([
          ".services-title",
          ".services-subtitle",
        ]);

        if (headingElements.length > 0) {
          gsap.fromTo(
            headingElements,
            {
              opacity: 0,
              scale: 0.88,
              y: 40,
              filter: "blur(8px)",
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.75,
              ease: "back.out(1.6)",
              stagger: 0.15,
              scrollTrigger: {
                trigger: ".services-heading-block",
                start: "top 65%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // 6. Sanctuary Text Entrance & Sequential Freeze-and-Peel Timeline
      const sanctuarySection = document.querySelector(".sanctuary-section");
      const slide1 = document.querySelector(".sanctuary-slide-1");
      const slide2 = document.querySelector(".sanctuary-slide-2");
      const slide3 = document.querySelector(".sanctuary-slide-3");

      if (sanctuarySection) {
        // 1. Autonomous Text Entrance Motion at ~70% Viewport
        const sanctuaryHeadingElements = gsap.utils.toArray<HTMLElement>([
          ".sanctuary-title",
          ".sanctuary-subtitle",
        ]);

        if (sanctuaryHeadingElements.length > 0) {
          gsap.fromTo(
            sanctuaryHeadingElements,
            {
              opacity: 0,
              y: 35,
              scale: 0.95,
              filter: "blur(6px)",
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.15,
              scrollTrigger: {
                trigger: sanctuarySection,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // 2. Sequential Freeze-and-Peel Timeline with Scroll-Tied Text Exit
        if (slide1 && slide2 && slide3) {
          gsap.set(slide1, { yPercent: 0 });
          gsap.set(slide2, { yPercent: 0 });
          gsap.set(slide3, { yPercent: 0 });

          const isMobileViewport =
            typeof window !== "undefined" && window.innerWidth < 1024;

          const sanctuaryTl = gsap.timeline({
            scrollTrigger: {
              trigger: sanctuarySection,
              start: "top top",
              end: isMobileViewport ? "+=120%" : "+=300%",
              pin: true,
              pinSpacing: true,
              scrub: isMobileViewport ? 0.6 : 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Step 1: Text Block gracefully slides upward and fades out BEFORE Slide 1 starts peeling
          if (document.querySelector(".sanctuary-heading-block")) {
            sanctuaryTl.to(".sanctuary-heading-block", {
              y: -50,
              opacity: 0,
              ease: "power1.inOut",
              duration: isMobileViewport ? 0.35 : 0.5,
            });
          }

          // Step 2: Slide 1 peels upward (yPercent: -100) unveiling stationary Slide 2
          sanctuaryTl.to(slide1, {
            yPercent: -100,
            ease: isMobileViewport ? "power1.inOut" : "none",
            duration: 1,
          });

          // Step 3: Slide 2 peels upward (yPercent: -100) unveiling stationary Slide 3
          sanctuaryTl.to(slide2, {
            yPercent: -100,
            ease: isMobileViewport ? "power1.inOut" : "none",
            duration: 1,
          });
        }
      }

      // Consistent Dark Glass Header on Scroll
      ScrollTrigger.create({
        start: "top -50",
        onUpdate: () => setHeaderGlass(),
      });
    });

    // Ensure ScrollTrigger accurately calculates positions after DOM render
    refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const handleWindowLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleWindowLoad);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener("load", handleWindowLoad);
      ctx.revert();
    };
  }, []);

  return null;
}

export { ScrollEffects };
