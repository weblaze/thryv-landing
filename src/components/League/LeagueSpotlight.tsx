"use client";

import { useRef } from "react";
import styles from "./LeagueSpotlight.module.css";
import { useLeagueSpotlight } from "@/hooks/useLeagueSpotlight";

const ATHLETES = [
  { id: 1, name: "UNIT 01", stat: "XP: 14,250 | STREAK: 42D", left: "11.5%", width: "12%", top: "8%",  height: "82%" },
  { id: 2, name: "UNIT 02", stat: "XP: 11,800 | RANK: #04",   left: "24.2%", width: "11%", top: "18%", height: "75%" },
  { id: 3, name: "UNIT 03", stat: "XP: 16,400 | PRIME: L3",   left: "54.0%", width: "11%", top: "11%", height: "84%" },
  { id: 4, name: "UNIT 04", stat: "XP: 9,200 | ELITE: S2",    left: "76.5%", width: "13%", top: "11%", height: "84%" },
];

export default function LeagueSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const { displayText, scrambleText } = useLeagueSpotlight(sectionRef, labelRef);

  return (
    <section 
      id="league-spotlight" 
      ref={sectionRef} 
      className={styles["league-section"]}
    >
      {/* 1. IMAGE STACK (SHARP + BLURRED) */}
      <div className={styles["image-stack"]}>
        <img 
          src="/league-bg.png" 
          className={styles["layer-sharp"]} 
          alt="League Sharp" 
        />
        <img 
          src="/league-bg.png" 
          className={styles["layer-blurred"]} 
          alt="League Blurred" 
        />
      </div>

      {/* 2. INTERACTIVE HITBOXES */}
      <div className={styles["hitbox-container"]}>
        {ATHLETES.map((athlete) => (
          <div
            key={athlete.id}
            className={styles["athlete-hitbox"]}
            style={{ 
              left: athlete.left, 
              width: athlete.width, 
              top: athlete.top, 
              height: athlete.height 
            }}
            onMouseEnter={() => scrambleText(athlete.stat)}
            onMouseLeave={() => scrambleText("SCANNING...")}
          />
        ))}
      </div>

      {/* 3. SCI-FI CURSOR LABEL */}
      <div 
        ref={labelRef} 
        className={styles["sci-fi-cursor-label"]}
      >
        <span className={styles["scramble-text"]}>
          {displayText}
        </span>
      </div>

      {/* 4. MOBILE STATS PANEL (Graceful Fallback) */}
      <div className={styles["mobile-stats-panel"]}>
        <div style={{ display: 'none' /* Will be visible via media queries */ }}>
          <h4 style={{ color: 'var(--neon-lime)', marginBottom: '1rem' }}>LEAGUE INTEL</h4>
          {ATHLETES.map(a => (
            <p key={a.id} style={{ fontSize: '14px', marginBottom: '0.5rem', opacity: 0.8 }}>
              UNIT {a.id}: {a.stat}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
