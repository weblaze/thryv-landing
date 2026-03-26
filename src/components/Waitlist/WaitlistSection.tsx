"use client";

import { useRef } from "react";
import WaitlistForm from "./WaitlistForm";
import { useWaitlistBlur } from "@/hooks/useWaitlistBlur";
import styles from "./WaitlistSection.module.css";

export default function WaitlistSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isMobile } = useWaitlistBlur(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="waitlist-section"
      className={styles["waitlist-section"]}
    >
      {/* 
        ─────────────────────────────────────────────────────
        1. DYNAMIC BLUR BACKGROUND
        ─────────────────────────────────────────────────────
      */}
      <div className={styles["blur-text-wrapper"]}>
        <h1 className={`${styles["base-h1"]} ${styles["layer-blurred"]}`}>
          EARLY ACCESS
        </h1>
        <h1 className={`${styles["base-h1"]} ${styles["layer-sharp"]}`}>
          EARLY ACCESS
        </h1>
      </div>

      {/* 
        ─────────────────────────────────────────────────────
        2. FOREGROUND CONTENT & FORM
        ─────────────────────────────────────────────────────
      */}
      <div className={styles["waitlist-form-container"]}>
        <span className={styles["waitlist-eyebrow"]}>thryv waitlist</span>
        
        <div style={{ textAlign: "center" }}>
          <h2 
            className="t-display" 
            style={{ fontSize: "clamp(40px, 8vw, 80px)", marginBottom: "0.5rem" }}
          >
            CLAIM YOUR SPOT.
          </h2>
          <p className="t-secondary" style={{ fontSize: "18px", opacity: 0.8 }}>
            Be first. Move early. Earn more.
          </p>
        </div>

        <WaitlistForm />
      </div>

      {/* Subtle ambient glow to help form legibility */}
      <div 
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(8, 8, 8, 0.4) 0%, rgba(8, 8, 8, 0) 60%)",
          pointerEvents: "none",
          zIndex: 5
        }} 
      />
    </section>
  );
}
