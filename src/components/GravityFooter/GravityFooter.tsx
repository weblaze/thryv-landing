"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import FooterItem, { FooterItemData } from "./FooterItem";

const footerItems: FooterItemData[] = [
  { id: "thryv", type: "text", content: "THRYV", className: "t-display", width: 240, height: 90, bg: "var(--void)", border: "1px solid var(--border)", color: "var(--ice)", fontSize: "3rem" },
  { id: "tagline", type: "text", content: "move. earn. belong.", className: "t-secondary", width: 260, height: 60, bg: "var(--card)", border: "1px solid var(--border)" },
  { id: "cta", type: "button", content: "GET IN TOUCH", className: "t-display", width: 340, height: 100, bg: "var(--void)", border: "2px solid var(--red-hi)", color: "var(--ice)", fontSize: "2.5rem" },
  { id: "instagram", type: "link", content: "Instagram", width: 160, height: 50, bg: "var(--card)", border: "1px solid var(--border)" },
  { id: "linkedin", type: "link", content: "LinkedIn", width: 160, height: 50, bg: "var(--card)", border: "1px solid var(--border)" },
  { id: "tiktok", type: "link", content: "Tik-Tok", width: 140, height: 50, bg: "var(--card)", border: "1px solid var(--border)" },
  { id: "website", type: "link", content: "Website", width: 140, height: 50, bg: "var(--card)", border: "1px solid var(--border)" },
  { id: "legal", type: "text", content: "THRYV © 2026", className: "t-eyebrow", width: 200, height: 40, bg: "var(--void)", border: "none" },
];

export default function GravityFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const animFrameRef = useRef<number>(0);
  const [gravityActive, setGravityActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
            setGravityActive(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!gravityActive) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.5, scale: 0.001 },
      positionIterations: 20,
    });
    engineRef.current = engine;

    const wallThick = 5000;
    const walls = [
      Matter.Bodies.rectangle(width / 2, height + wallThick / 2, width * 10, wallThick, { isStatic: true }),
      Matter.Bodies.rectangle(-wallThick / 2, height / 2, wallThick, height * 10, { isStatic: true }),
      Matter.Bodies.rectangle(width + wallThick / 2, height / 2, wallThick, height * 10, { isStatic: true }),
      Matter.Bodies.rectangle(width / 2, -wallThick / 2 - 1000, width * 10, wallThick, { isStatic: true })
    ];

    Matter.Composite.add(engine.world, walls);

    const elements = elementsRef.current;
    const newBodies: Matter.Body[] = [];

    for (let i = 0; i < footerItems.length; i++) {
      const el = elements[i];
      if (!el) continue;
      const elRect = el.getBoundingClientRect();
      const x = elRect.left - rect.left + elRect.width / 2;
      const y = elRect.top - rect.top + elRect.height / 2;
      const body = Matter.Bodies.rectangle(x, y, elRect.width, elRect.height, {
        restitution: 0.3,
        friction: 0.1,
        frictionAir: 0.04,
        density: 0.005,
      });
      newBodies.push(body);
    }

    bodiesRef.current = newBodies;
    Matter.Composite.add(engine.world, newBodies);

    // CORE SCROLL FIX: Don't let Matter bind its own listeners to the container
    // We create the mouse object with an empty element first, then manually sync it
    const mouse = Matter.Mouse.create(container);
    
    // Remove ALL listeners from mouse.element that Matter.js adds
    // This includes wheel and touchstart that block scrolling
    // @ts-ignore
    container.removeEventListener("wheel", mouse.mousewheel);
    // @ts-ignore
    container.removeEventListener("mousewheel", mouse.mousewheel);
    // @ts-ignore
    container.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    // @ts-ignore
    container.removeEventListener("touchstart", mouse.mousedown);
    // @ts-ignore
    container.removeEventListener("touchmove", mouse.mousemove);
    // @ts-ignore
    container.removeEventListener("touchend", mouse.mouseup);

    // MANUALLY RE-BIND ONLY WHAT WE NEED (Without preventDefault on scroll)
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      // @ts-ignore
      mouse.mousedown(e);
    };
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      // @ts-ignore
      mouse.mousemove(e);
    };
    const handlePointerUp = (e: MouseEvent | TouchEvent) => {
      // @ts-ignore
      mouse.mouseup(e);
    };

    container.addEventListener("mousedown", handlePointerDown);
    container.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    container.addEventListener("touchstart", handlePointerDown, { passive: true });
    container.addEventListener("touchmove", handlePointerMove, { passive: true });
    container.addEventListener("touchend", handlePointerUp, { passive: true });

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.1, render: { visible: false } },
    });
    
    Matter.Composite.add(engine.world, mouseConstraint);

    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    const syncDOMToPhysics = () => {
      const bodies = bodiesRef.current;
      const elements = elementsRef.current;
      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        const el = elements[i];
        if (!el || !body) continue;
        el.style.position = "absolute";
        el.style.left = `${body.position.x - footerItems[i].width / 2}px`;
        el.style.top = `${body.position.y - footerItems[i].height / 2}px`;
        el.style.transform = `rotate(${body.angle}rad)`;
      }
      animFrameRef.current = requestAnimationFrame(syncDOMToPhysics);
    };

    animFrameRef.current = requestAnimationFrame(syncDOMToPhysics);

    container.style.touchAction = "pan-y";

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) Matter.Engine.clear(engineRef.current);
      Matter.Composite.clear(engine.world, false);
      container.removeEventListener("mousedown", handlePointerDown);
      container.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      container.removeEventListener("touchstart", handlePointerDown);
      container.removeEventListener("touchmove", handlePointerMove);
      container.removeEventListener("touchend", handlePointerUp);
    };
  }, [gravityActive]);

  return (
    <section
      ref={sectionRef}
      id="footer"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        padding: "8rem 2rem 0",
        background: "var(--void)",
        borderTop: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "4rem", pointerEvents: "none" }}>
        <span className="t-eyebrow" style={{ marginBottom: "1rem", display: "block" }}>THE END.</span>
        <div className="section-title" style={{ textAlign: "center" }}>
          <span className="t-display">READY TO EXPLORE?</span>
        </div>
      </div>

      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          minHeight: "500px",
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "150px"
        }}
      >
        {footerItems.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => { elementsRef.current[i] = el; }}
            style={{
              zIndex: 10,
              transition: gravityActive ? "none" : "transform 0.5s cubic-bezier(0.2, 0, 0, 1)",
            }}
          >
            <FooterItem item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
