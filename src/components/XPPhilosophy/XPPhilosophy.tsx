"use client";

import { useRef } from "react";
import styles from "./XPPhilosophy.module.css";
import { useXPPhilosophy, XP_SHAPES } from "@/hooks/useXPPhilosophy";

const BLOCKS = [
  {
    id: "step-intensity",
    eyebrow: "The Heroic Burst",
    title: "Random intensity is chaotic and unsustainable.",
    p: "A 2-hour gym session looks great on Instagram, but burnout is inevitable."
  },
  {
    id: "step-recovery",
    eyebrow: "The Recovery Baseline",
    title: "Thryv rewards rest just as heavily as effort.",
    p: "Overtraining is a trap. Sleep (7-9 hours) is your highest-leverage health behaviour."
  },
  {
    id: "step-consistency",
    eyebrow: "The Compounding System",
    title: "Consistency is the ultimate advantage.",
    p: "A 10-minute walk every single day beats one extreme session. Thryv's XP system proves it."
  }
];

export default function XPPhilosophy() {
  const containerRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useXPPhilosophy(containerRef, pathRef);

  return (
    <section 
      id="xp-philosophy" 
      ref={containerRef} 
      className={styles["split-layout"]}
    >
      <div className={styles["visual-column"]}>
        <svg viewBox="0 0 1000 1000" className={styles["minimal-line-art"]}>
          <path
            ref={pathRef}
            className={styles["dynamic-line"]}
            d={XP_SHAPES.arrow}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="miter"
          />
        </svg>
      </div>

      <div className={styles["content-column"]}>
        {BLOCKS.map(block => (
          <div 
            key={block.id} 
            id={block.id} 
            className={styles["text-block"]}
          >
            <h3>{block.eyebrow}</h3>
            <h2>{block.title}</h2>
            <p>{block.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
