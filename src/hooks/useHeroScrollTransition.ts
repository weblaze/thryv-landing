"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useHeroScrollTransition(
  heroRef: React.RefObject<HTMLElement | null>,
  titleRef: React.RefObject<HTMLElement | null>,
  navRef: React.RefObject<HTMLElement | null>
) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const nav = navRef.current;
    if (!hero || !title || !nav) return;

    // Wait a beat for layout
    const timer = setTimeout(() => {
      ctxRef.current = gsap.context(() => {
        const navLogo = nav.querySelector(".nav-logo");
        if (!navLogo) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=600",
            scrub: 1,
            pin: true,
            pinSpacing: true,
          },
        });

        // Shrink hero title
        tl.to(
          title,
          {
            scale: 0.15,
            opacity: 0,
            ease: "none",
          },
          0
        );

        // Fade in nav
        tl.fromTo(
          nav,
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, ease: "none" },
          0.3
        );

        // Show nav logo text
        tl.fromTo(
          navLogo,
          { opacity: 0 },
          { opacity: 1, ease: "none" },
          0.5
        );
      }, hero);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctxRef.current) ctxRef.current.revert();
    };
  }, [heroRef, titleRef, navRef]);
}
