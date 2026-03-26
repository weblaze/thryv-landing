"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export const XP_SHAPES = {
  arrow: "M 200 550 L 700 300 L 600 450 L 900 500 L 600 550 L 700 700 Z",
  webOne: "M 250 250 L 800 350 L 400 850 L 600 150 L 900 700 L 150 600 Z",
  webTwo: "M 150 850 L 750 150 L 850 800 L 200 300 L 600 900 L 400 100 Z",
};

export function useXPPhilosophy(
  containerRef: React.RefObject<HTMLElement | null>,
  pathRef: React.RefObject<SVGPathElement | null>
) {
  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;
    if (!container || !path) return;

    const isDesktop = window.matchMedia("(min-width: 769px)").matches;

    if (isDesktop) {
      const ctx = gsap.context(() => {
        // SEQUENTIAL TIMELINE (Ensures 1 -> 2 -> 3 logic)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5, // Snappier scrub for better mapping
          }
        });

        // The timeline is divided into 2 sections: 
        // 0.0 to 0.5: Morph Arrow -> WebOne
        // 0.5 to 1.0: Morph WebOne -> WebTwo
        
        tl.to(path, {
          attr: { d: XP_SHAPES.webOne },
          ease: "none", // Linear is best for mapping to scroll
          duration: 1,
        })
        .to(path, {
          attr: { d: XP_SHAPES.webTwo },
          ease: "none",
          duration: 1,
        });
      });

      return () => ctx.revert();
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            // Immediate set for mobile performance
            if (id === "step-intensity") path.setAttribute("d", XP_SHAPES.arrow);
            if (id === "step-recovery") path.setAttribute("d", XP_SHAPES.webOne);
            if (id === "step-consistency") path.setAttribute("d", XP_SHAPES.webTwo);
          }
        });
      }, { threshold: 0.5 });

      const blocks = container.querySelectorAll("[id^='step-']");
      blocks.forEach(block => observer.observe(block));

      return () => observer.disconnect();
    }
  }, [containerRef, pathRef]);
}
