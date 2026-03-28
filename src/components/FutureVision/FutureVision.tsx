"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FutureVision.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FutureVision = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const isDesktop = window.matchMedia("(min-width: 769px)").matches;

      if (isDesktop) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        itemsRef.current.forEach((item, index) => {
          if (!item) return;

          // Sequential fall: Item 1 starts, then Item 2 starts when 1 is halfway, etc.
          // Total duration is 400vh, we have 3 items.
          // Let's map them to start at different points in the timeline.
          
          const startTime = index * 0.5; // Staggered start
          
          tl.to(item, {
            top: "120vh",
            duration: 1,
            ease: "none",
            onUpdate: function() {
                // "Processing" effect at 50vh mark
                // Top goes from -20vh to 120vh (total 140vh)
                // Center point (50vh) is at (50 - (-20)) / 140 = 70/140 = 0.5 progress of THIS item
                const progress = this.progress();
                if (progress > 0.4 && progress < 0.6) {
                    const localProgress = (progress - 0.4) / 0.2; // 0 to 1 over the center
                    const scale = 1 + Math.sin(localProgress * Math.PI) * 0.15;
                    const rotateX = Math.sin(localProgress * Math.PI) * 15;
                    gsap.set(item, { scale: scale, rotateX: rotateX });
                } else {
                    gsap.set(item, { scale: 1, rotateX: 0 });
                }
            }
          }, startTime);
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const roadmapItems = [
    "AI COACHING",
    "WEARABLE SYNC",
    "MEDICAL ANALYSIS"
  ];

  return (
    <section id="future-vision" ref={sectionRef} className="relative">
      <div className="text-waterfall">
        {roadmapItems.map((item, index) => (
          <div
            key={item}
            className="roadmap-item"
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
          >
            <h2>{item}</h2>
          </div>
        ))}
      </div>

      <div className="sticky-hub-layer">
        <div className="relative w-[60vw] max-w-[600px] aspect-square">
          <Image
            src="/barbell-hub.png"
            alt="Thryv Core"
            fill
            className="hub-asset object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default FutureVision;
