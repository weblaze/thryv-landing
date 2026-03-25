"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function useCursorLens(containerRef: React.RefObject<HTMLElement | null>) {
  const [isActive, setIsActive] = useState(false);
  
  const NUM_POINTS = 6;
  const pointsRef = useRef(Array.from({ length: NUM_POINTS }, () => ({ x: -2000, y: -2000 })));
  const targetRef = useRef({ x: -2000, y: -2000 });
  
  // SVG element refs
  const maskRefs    = useRef<(SVGCircleElement | null)[]>([]);
  const rimRefs     = useRef<(SVGCircleElement | null)[]>([]);   // index 0 = outer rim, 1 = specular arc
  const inverseRefs = useRef<(SVGCircleElement | null)[]>([]);
  const highlightRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      targetRef.current.x = e.clientX - rect.left;
      targetRef.current.y = e.clientY - rect.top;
    };
    const handleEnter = () => setIsActive(true);
    const handleLeave = () => setIsActive(false);

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);

    const update = () => {
      // Premium weighted lerp: head chases mouse slowly, tail follows head
      pointsRef.current[0].x += (targetRef.current.x - pointsRef.current[0].x) * 0.1;
      pointsRef.current[0].y += (targetRef.current.y - pointsRef.current[0].y) * 0.1;
      for (let i = 1; i < NUM_POINTS; i++) {
        pointsRef.current[i].x += (pointsRef.current[i-1].x - pointsRef.current[i].x) * 0.08;
        pointsRef.current[i].y += (pointsRef.current[i-1].y - pointsRef.current[i].y) * 0.08;
      }

      // Map from DOM coords → SVG viewBox coords
      const svgW = 1200, svgH = 400;
      const vW = el.clientWidth  || svgW;
      const vH = el.clientHeight || svgH;

      pointsRef.current.forEach((p, i) => {
        const sx = (p.x / vW) * svgW;
        const sy = (p.y / vH) * svgH;

        // Mask circles (all 6 nodes for liquid blob)
        const m = maskRefs.current[i];
        if (m) { m.setAttribute("cx", String(sx)); m.setAttribute("cy", String(sy)); }

        // Inverse mask circles (all 6 nodes for X-Ray cutout)
        const inv = inverseRefs.current[i];
        if (inv) { inv.setAttribute("cx", String(sx)); inv.setAttribute("cy", String(sy)); }

        // Glass rim tracks ALL nodes (same positions as mask) so it deforms with the blob
        const rim = rimRefs.current[i];
        if (rim) { rim.setAttribute("cx", String(sx)); rim.setAttribute("cy", String(sy)); }

        // Highlight arc path tracks head only
        if (i === 0 && highlightRef.current) {
          const d = `M ${sx - 80} ${sy - 30} A 90 90 0 0 1 ${sx - 15} ${sy - 90}`;
          highlightRef.current.setAttribute("d", d);
        }
      });
    };

    gsap.ticker.add(update);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
      gsap.ticker.remove(update);
    };
  }, [containerRef]);

  return { isActive, maskRefs, rimRefs, inverseRefs, highlightRef };
}
