"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useFlywheelScrollytelling(
  containerRef: React.RefObject<HTMLDivElement | null>,
  videoWrapperRef: React.RefObject<HTMLDivElement | null>,
  stepsRef: React.RefObject<(HTMLDivElement | null)[]>
) {
  useEffect(() => {
    const container = containerRef.current;
    const videoWrapper = videoWrapperRef.current;
    if (!container || !videoWrapper) return;

    const ctx = gsap.context(() => {
      // 1. TOOLTIP REVEALS
      // ─────────────────────────────────────────────────────
      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        
        // Ensure initial state is set via GSAP to avoid CSS conflicts
        gsap.set(step, { opacity: 0, y: 50 });

        gsap.to(step, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%", // Reveal when tooltip is 80% from top
            toggleActions: "play none none reverse",
            // markers: true, // DEBUG
          }
        });
      });

      // 2. EXIT SHRINK ANIMATION
      // ─────────────────────────────────────────────────────
      gsap.to(videoWrapper, {
        scale: 0.85,
        borderRadius: "40px",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: container,
          start: "bottom bottom", 
          end: "bottom center",   
          scrub: true,
        }
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, videoWrapperRef, stepsRef]);
}
