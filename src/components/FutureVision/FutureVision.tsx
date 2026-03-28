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
  const mergedRef = useRef<HTMLDivElement>(null);

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

        // 1. All items come in together to the center
        tl.fromTo(itemsRef.current, 
          { 
            top: "-30vh",
            opacity: 0,
            rotateX: -30,
            scale: 1.5,
            filter: "blur(10px)"
          },
          {
            top: "50vh",
            opacity: 1,
            rotateX: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.05 // Tiny stagger for organic feel but mostly together
          }
        );

        // 2. Merge effect: 3 items vanish, ALL IN ONE appears
        tl.to(itemsRef.current, {
          scale: 0.5,
          opacity: 0,
          filter: "blur(20px)",
          duration: 0.2,
          ease: "power2.in"
        }, 0.4);

        tl.fromTo(mergedRef.current,
          {
            top: "50vh",
            scale: 2,
            opacity: 0,
            filter: "blur(20px)"
          },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.3,
            ease: "back.out(1.7)"
          },
          0.45 // Start slightly after the vanish begins
        );

        // 3. ALL IN ONE drops out
        tl.to(mergedRef.current, {
          top: "125vh",
          rotateX: 20,
          scale: 0.8,
          duration: 0.4,
          ease: "power2.in"
        }, 0.75);
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

          <div className="merged-item" ref={mergedRef}>
            <h2>ALL IN ONE</h2>
          </div>
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
