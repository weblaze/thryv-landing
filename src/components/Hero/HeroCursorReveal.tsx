"use client";

import { useRef } from "react";
import { useCursorLens } from "@/hooks/useCursorLens";
import styles from "./HeroCursorReveal.module.css";

export default function HeroCursorReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isActive, maskRefs, rimRefs, inverseRefs } = useCursorLens(containerRef);

  const textContent = "THRYV";
  const viewBox = "0 0 1200 400";

  // All 6 nodes for the liquid blob — mask, inverse, AND rim all share the same radii
  // This makes the rim deform organically with the liquid, not stay a perfect circle
  const radii = [120, 104, 88, 74, 62, 50];

  return (
    <div
      ref={containerRef}
      className={styles["hero-reveal-container"]}
      aria-label="THRYV — move. earn. belong."
    >
      <svg className={styles["reveal-svg"]} viewBox={viewBox} preserveAspectRatio="xMidYMid meet">
        <defs>

          {/*
            ─────────────────────────────────────────────────────
            1. METABALL FILTER
            High alpha threshold = crisp, organic edges.
            All three layers (mask, inverse, rim) pass through this.
            ─────────────────────────────────────────────────────
          */}
          <filter id="lensBlob" x="-40%" y="-80%" width="180%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -25"
              result="goo"
            />
          </filter>

          {/*
            ─────────────────────────────────────────────────────
            2. GLASS SURFACE FILTER
            Adds specular sheen on top of the liquid blob shape.
            feSpecularLighting reads the blob's alpha as a height map,
            producing a real 3-D specular reflection that follows the
            organic edge — bright on the upper-left convex face.
            ─────────────────────────────────────────────────────
          */}
          <filter id="glassShine" x="-40%" y="-80%" width="180%" height="260%" colorInterpolationFilters="sRGB">
            {/* Step 1: recreate the goo shape */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 60 -25"
              result="gooMask"
            />
            {/* Step 2: specular on the alpha surface → white highlight */}
            <feSpecularLighting
              in="gooMask"
              surfaceScale="6"
              specularConstant="2.2"
              specularExponent="55"
              lightingColor="#ffffff"
              result="specular"
            >
              {/* Light from upper-left, far back → gives a sharp crescent shine */}
              <fePointLight x="-200" y="-300" z="450" />
            </feSpecularLighting>
            {/* Step 3: mask the specular to only appear on the blob shape */}
            <feComposite in="specular" in2="gooMask" operator="in" result="shineOnly" />
            {/* Step 4: merge: blob rim stroke + specular shine */}
            <feMerge>
              <feMergeNode in="gooMask" />
              <feMergeNode in="shineOnly" />
            </feMerge>
          </filter>

          {/*
            ─────────────────────────────────────────────────────
            3. REVEAL TEXTURE MASK — the moving liquid window
            ─────────────────────────────────────────────────────
          */}
          <mask id="lensMask">
            <rect x="0" y="0" width="100%" height="100%" fill="black" />
            <g
              filter="url(#lensBlob)"
              style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.5s ease" }}
            >
              {radii.map((r, i) => (
                <circle
                  key={`m-${i}`}
                  ref={(el) => { maskRefs.current[i] = el; }}
                  r={r}
                  cx="-2000"
                  cy="-2000"
                  fill="white"
                />
              ))}
            </g>
          </mask>

          {/*
            ─────────────────────────────────────────────────────
            4. INVERSE MASK — cuts out white text where the lens sits
            ─────────────────────────────────────────────────────
          */}
          <mask id="inverseLensMask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <g
              filter="url(#lensBlob)"
              style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.5s ease" }}
            >
              {radii.map((r, i) => (
                <circle
                  key={`inv-${i}`}
                  ref={(el) => { inverseRefs.current[i] = el; }}
                  r={r}
                  cx="-2000"
                  cy="-2000"
                  fill="black"
                />
              ))}
            </g>
          </mask>

          {/*
            ─────────────────────────────────────────────────────
            5. THE GEAR IMAGE TEXTURE
            Full-bleed, covers the entire viewBox so the text
            clip will always show the correct part.
            ─────────────────────────────────────────────────────
          */}
          <pattern id="gearTexture" patternUnits="userSpaceOnUse" width="1200" height="400">
            <image
              href="/thryv_gear_texture.png"
              x="0"
              y="0"
              width="1200"
              height="400"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>

        </defs>

        {/*
          ═══════════════════════════════════════════
          LAYER 1 — WHITE PLAIN TEXT (always visible,
          cut out where the glass sits)
          ═══════════════════════════════════════════
        */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className={styles["hero-text-base"]}
          mask="url(#inverseLensMask)"
        >
          {textContent}
        </text>

        {/*
          ═══════════════════════════════════════════
          LAYER 2 — GEAR TEXTURE FILL (revealed only
          through the liquid lens)
          ═══════════════════════════════════════════
        */}
        <g mask="url(#lensMask)">
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className={styles["hero-text-fancy"]}
            fill="url(#gearTexture)"
          >
            {textContent}
          </text>
        </g>

        {/*
          ═══════════════════════════════════════════
          LAYER 3 — LIQUID GLASS RIM + SPECULAR
          Same 6 circles as the mask, same metaball
          filter — so the edge deforms organically.
          Rendered as stroked circles so you see the
          glass boundary. The glassShine filter adds
          a physically-based specular sheen on the
          upper-left convex face of the blob.
          ═══════════════════════════════════════════
        */}
        <g
          filter="url(#glassShine)"
          style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.5s ease", pointerEvents: "none" }}
        >
          {radii.map((r, i) => (
            <circle
              key={`rim-${i}`}
              ref={(el) => { rimRefs.current[i] = el; }}
              r={r}
              cx="-2000"
              cy="-2000"
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.4"
            />
          ))}
        </g>

      </svg>

      <div className={styles["glow-ambient"]} />

      <div className={styles["hero-post-reveal"]}>
        <span className={styles["hero-eyebrow"]}>move. earn. belong.</span>
        <div className={styles["scroll-indicator"]}>
          <span>scroll</span>
          <div className={styles["scroll-arrow"]} />
        </div>
      </div>
    </div>
  );
}
