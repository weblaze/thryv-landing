"use client";

import { useEffect, useRef, useState } from "react";

export function useWaitlistBlur(containerRef: React.RefObject<HTMLElement | null>) {
  const [isMobile, setIsMobile] = useState(false);
  const targetYRef = useRef(50);
  const currentYRef = useRef(50);
  const rAFRef = useRef<number>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      const percentageY = (relativeY / rect.height) * 100;
      targetYRef.current = Math.min(Math.max(percentageY, 0), 100);
    };

    const update = () => {
      // LERP: current += (target - current) * factor
      const delta = targetYRef.current - currentYRef.current;
      
      // Only update if there's a meaningful change to save CPU
      if (Math.abs(delta) > 0.01) {
        currentYRef.current += delta * 0.08;
        if (container) {
          container.style.setProperty("--focus-y-start", `${currentYRef.current.toFixed(2)}%`);
          container.style.setProperty("--focus-y-end", `${(currentYRef.current + 20).toFixed(2)}%`);
        }
      }

      rAFRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rAFRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, [isMobile, containerRef]);

  return { isMobile };
}
