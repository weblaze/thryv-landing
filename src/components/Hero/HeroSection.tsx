"use client";

import { useRef } from "react";
import HeroCursorReveal from "./HeroCursorReveal";
import Nav from "../Nav/Nav";
import { useHeroScrollTransition } from "@/hooks/useHeroScrollTransition";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useHeroScrollTransition(heroRef, titleRef, navRef);

  return (
    <>
      <Nav ref={navRef} />
      <section
        ref={heroRef}
        className="hero-section"
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <div ref={titleRef} className="hero-title">
          <HeroCursorReveal />
        </div>
      </section>
    </>
  );
}
