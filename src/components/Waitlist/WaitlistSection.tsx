"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import WaitlistForm from "./WaitlistForm";

export default function WaitlistSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(section.children, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem",
        background: "var(--void)",
        gap: "2.5rem",
      }}
    >
      <span className="t-eyebrow">EARLY ACCESS</span>

      <div
        className="section-title"
        style={{ textAlign: "center", maxWidth: "600px" }}
      >
        <span className="t-display">JOIN THE WAITLIST.</span>
        <span className="t-secondary">
          Be first. Move early. Earn more.
        </span>
      </div>

      <WaitlistForm />
    </section>
  );
}
