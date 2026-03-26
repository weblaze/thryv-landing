"use client";

import { useRef } from "react";
import styles from "./FlywheelScrollytelling.module.css";
import { useFlywheelScrollytelling } from "@/hooks/useFlywheelScrollytelling";

const steps = [
  {
    number: "01.",
    title: "LOG",
    description: "Log your workout, sleep, or steps in under 15 seconds.",
  },
  {
    number: "02.",
    title: "EARN XP",
    description: "Consistency pays. Watch your score rise.",
  },
  {
    number: "03.",
    title: "COMPETE",
    description: "Live leaderboards. A closed league of 24 real people.",
  },
  {
    number: "04.",
    title: "SHARE",
    description: "Hit a milestone. Generate a beautiful card.",
  },
  {
    number: "05.",
    title: "RECRUIT",
    description: "Friends tap your card, view your profile, and join your league.",
  },
];

export default function FlywheelScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useFlywheelScrollytelling(containerRef, videoWrapperRef, stepsRef);

  return (
    <section 
      id="flywheel-section" 
      ref={containerRef} 
      className={styles["flywheel-section"]}
    >
      {/* 
        ─────────────────────────────────────────────────────
        1. STICKY VIDEO BACKGROUND
        ─────────────────────────────────────────────────────
      */}
      <div 
        ref={videoWrapperRef}
        className={styles["sticky-video-wrapper"]}
      >
        <video
          className={styles["video-element"]}
          autoPlay
          loop
          muted
          playsInline
          src="/flywheel.mp4"
        />
        <div className={styles["video-overlay"]} />
      </div>

      {/* 
        ─────────────────────────────────────────────────────
        2. SCROLLING TOOLTIP TRACK
        ─────────────────────────────────────────────────────
      */}
      <div className={styles["scrolling-tooltip-track"]}>
        <div className={styles["scroll-spacer"]} />
        
        {steps.map((step, index) => (
          <div key={index} className={styles["step-wrapper"]}>
            <div
              ref={(el) => { stepsRef.current[index] = el; }}
              className={styles["step-tooltip"]}
            >
              <span className={styles["step-number"]}>
                {step.number} {step.title}
              </span>
              <h3 className={styles["step-title"]}>
                {step.title}
              </h3>
              <p className={styles["step-description"]}>
                {step.description}
              </p>
            </div>
            <div className={styles["scroll-spacer"]} />
          </div>
        ))}
      </div>
    </section>
  );
}
