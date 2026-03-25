"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import FeatureItem from "./FeatureItem";
import styles from "./ConceptAnimation.module.css";

const features = [
  { name: "Workout", color: "var(--h-workout)", colorHex: "#FF2D55", icon: "🏋️" },
  { name: "Steps", color: "var(--h-steps)", colorHex: "#3B82F6", icon: "👟" },
  { name: "Sleep", color: "var(--h-sleep)", colorHex: "#8B5CF6", icon: "🌙" },
  { name: "Nutrition", color: "var(--h-nutrition)", colorHex: "#10B981", icon: "🍎" },
  { name: "Hydration", color: "var(--h-hydration)", colorHex: "#06B6D4", icon: "💧" },
  { name: "Mind", color: "var(--h-mind)", colorHex: "#F59E0B", icon: "🧠" },
];

export default function ConceptAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasPlayed.current) return;

    // Check reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      // Show final state immediately
      const items = section.querySelectorAll(".feature-item");
      const title = section.querySelector(`.${styles["concept-title"]}`);
      const allinone = section.querySelector(`.${styles["allinone-container"]}`);
      if (title) (title as HTMLElement).style.opacity = "1";
      items.forEach((el) => ((el as HTMLElement).style.opacity = "1"));
      if (allinone) (allinone as HTMLElement).style.opacity = "1";
      hasPlayed.current = true;
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          once: true,
        },
      });

      // Act 1 — Name reveal
      tl.from(`.${styles["concept-title"]}`, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
      });

      // Act 2 — Feature expand
      tl.from(
        ".feature-item",
        {
          opacity: 0,
          y: 30,
          scale: 0.8,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Pause to let user absorb
      tl.to({}, { duration: 0.8 });

      // Act 3 — Collapse features
      tl.to(".feature-item", {
        opacity: 0,
        scale: 0.3,
        x: 0,
        y: -20,
        stagger: 0.08,
        duration: 0.4,
        ease: "power2.in",
      });

      // Reveal all-in-one
      tl.from(`.${styles["allinone-container"]}`, {
        opacity: 0,
        scale: 0.6,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      hasPlayed.current = true;
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles["concept-section"]} id="concept">
      <div className={styles["concept-title"]}>
        <div className="section-title" style={{ textAlign: "center" }}>
          <span className="t-display">EVERYTHING YOU NEED.</span>
          <span className="t-secondary">Six pillars. One app.</span>
        </div>
      </div>

      <div className={styles["features-grid"]}>
        {features.map((f) => (
          <FeatureItem key={f.name} name={f.name} color={f.colorHex} icon={f.icon} />
        ))}
      </div>

      <div className={styles["allinone-container"]}>
        <div className={styles["allinone-icon"]}>
          <span>T</span>
        </div>
        <span className={styles["allinone-label"]}>all in one.</span>
      </div>
    </section>
  );
}
