"use client";

import { useEffect, useRef, useState } from "react";

const SCIFI_CHARS = "!<>-_\\/[]{}—=+*^?#_";

export function useLeagueSpotlight(
  sectionRef: React.RefObject<HTMLElement | null>,
  labelRef: React.RefObject<HTMLDivElement | null>
) {
  const [displayText, setDisplayText] = useState("SCANNING...");
  const mouseRef = useRef({ x: 0, y: 0, lerpX: 0, lerpY: 0 });
  const scrambleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isDesktop = window.matchMedia("(min-width: 769px)").matches;
    if (!isDesktop) return;

    // 1. LERP TRACKING LOOP
    // ─────────────────────────────────────────────────────
    let rafId: number;
    const updateSpotlight = () => {
      const { x, y, lerpX, lerpY } = mouseRef.current;
      
      // Interpolation (Friction)
      const friction = 0.1;
      const nextX = lerpX + (x - lerpX) * friction;
      const nextY = lerpY + (y - lerpY) * friction;
      
      mouseRef.current.lerpX = nextX;
      mouseRef.current.lerpY = nextY;

      // Update CSS Variables
      section.style.setProperty("--mouse-x", `${nextX}%`);
      section.style.setProperty("--mouse-y", `${nextY}%`);

      // Update Label Position
      if (labelRef.current) {
        labelRef.current.style.left = `${nextX}%`;
        labelRef.current.style.top = `${nextY}%`;
      }

      rafId = requestAnimationFrame(updateSpotlight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };

    section.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(updateSpotlight);

    // Initial label visibility
    const showLabel = () => {
      if (labelRef.current) {
        labelRef.current.style.opacity = "1";
        labelRef.current.style.visibility = "visible";
      }
    };
    const hideLabel = () => {
      if (labelRef.current) {
        labelRef.current.style.opacity = "0";
        labelRef.current.style.visibility = "hidden";
      }
    };

    section.addEventListener("mouseenter", showLabel);
    section.addEventListener("mouseleave", hideLabel);

    // Failsafe: if the cursor is already over the section on mount
    if (section.matches(':hover')) showLabel();

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", showLabel);
      section.removeEventListener("mouseleave", hideLabel);
      cancelAnimationFrame(rafId);
    };
  }, [sectionRef, labelRef]);

  // SCRAMBLE EFFECT ENGINE
  // ─────────────────────────────────────────────────────
  const scrambleText = (finalString: string) => {
    if (scrambleIntervalRef.current) clearInterval(scrambleIntervalRef.current);
    
    let iteration = 0;
    const maxIterations = 15; // Approx 450ms at 30ms interval

    scrambleIntervalRef.current = setInterval(() => {
      const scrambled = finalString
        .split("")
        .map((char, index) => {
          if (index < iteration) {
            return finalString[index];
          }
          return SCIFI_CHARS[Math.floor(Math.random() * SCIFI_CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (iteration >= finalString.length) {
        clearInterval(scrambleIntervalRef.current!);
      }

      iteration += 1 / 3; // Slow down revelation
    }, 30);
  };

  return { displayText, scrambleText };
}
