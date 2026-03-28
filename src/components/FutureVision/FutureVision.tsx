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

          const startTime = index * 0.5;
          
          tl.fromTo(item, 
            { 
              top: "-50vh",
              opacity: 0,
              rotateX: -20,
              scale: 0.8
            },
            {
              top: "120vh",
              opacity: 1,
              duration: 1,
              ease: "none",
              onUpdate: function() {
                const progress = this.progress();
                
                // Fade out at the bottom
                if (progress > 0.8) {
                  gsap.set(item, { opacity: (1 - progress) / 0.2 });
                } else if (progress < 0.2) {
                  gsap.set(item, { opacity: progress / 0.2 });
                } else {
                  gsap.set(item, { opacity: 1 });
                }

                // Processing effect in the middle (0.4 to 0.6)
                if (progress > 0.35 && progress < 0.65) {
                    const localProgress = (progress - 0.35) / 0.3;
                    const bulge = Math.sin(localProgress * Math.PI);
                    gsap.set(item, { 
                      scale: 1 + bulge * 0.2, 
                      rotateX: bulge * 20 - 10,
                      filter: `brightness(${1 + bulge * 0.5})`
                    });
                } else {
                    gsap.set(item, { 
                      scale: 0.9, 
                      rotateX: -10,
                      filter: "brightness(1)"
                    });
                }
              }
            }, 
            startTime
          );
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
      <div className="sticky-container">
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
      </div>
    </section>
  );
};

export default FutureVision;
