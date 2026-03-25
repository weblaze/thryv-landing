"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function SuccessState() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.from(el, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        textAlign: "center",
      }}
    >
      {/* Checkmark */}
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "var(--red-grad)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "0.5rem",
          boxShadow: "0 0 30px rgba(232, 0, 45, 0.3)",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-cond)",
          fontWeight: 900,
          fontSize: "clamp(32px, 5vw, 56px)",
          textTransform: "uppercase",
          letterSpacing: "-0.01em",
          lineHeight: 0.9,
          background: "var(--red-grad)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        YOU&apos;RE IN.
      </h3>

      <p
        style={{
          fontFamily: "var(--font-eleg)",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(17px, 2.4vw, 28px)",
          color: "var(--ice)",
          letterSpacing: "0.02em",
        }}
      >
        We&apos;ll be in touch.
      </p>
    </div>
  );
}
