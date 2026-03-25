"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setGravityActive(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!gravityActive) return;
    const container = containerRef.current;
    if (!container) return;

    const syncDOMToPhysics = () => {
      const bodies = bodiesRef.current;
      const elements = elementsRef.current;

      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        const el = elements[i];
        if (!el || !body) continue;
        
        const width = footerItems[i].width;
        const height = footerItems[i].height;

        el.style.position = "absolute";
        el.style.left = `${body.position.x - width / 2}px`;
        el.style.top = `${body.position.y - height / 2}px`;
        el.style.transform = `rotate(${body.angle}rad)`;
      }

      animFrameRef.current = requestAnimationFrame(syncDOMToPhysics);
    };

    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 },
    });
    engineRef.current = engine;

    const wallThickness = 60;
    const walls = [
      Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width + 200, wallThickness, {
        isStatic: true,
        render: { visible: false },
      }),
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true,
        render: { visible: false },
      }),
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, {
        isStatic: true,
        render: { visible: false },
      }),
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
        restitution: 0.4,
        friction: 0.3,
        frictionAir: 0.01,
        density: 0.002,
        chamfer: undefined, // sharp corners
      });

      newBodies.push(body);
    }

    bodiesRef.current = newBodies;
    Matter.Composite.add(engine.world, newBodies);

    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Matter.Composite.add(engine.world, mouseConstraint);

    mouseConstraint.mouse.element.removeEventListener(
      "mousewheel",
      (mouseConstraint.mouse as unknown as Record<string, EventListener>).mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      (mouseConstraint.mouse as unknown as Record<string, EventListener>).mousewheel
    );

    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    animFrameRef.current = requestAnimationFrame(syncDOMToPhysics);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) Matter.Engine.clear(engineRef.current);
      Matter.Composite.clear(engine.world, false);
    };
  }, [gravityActive]);

  return (
    <section
      ref={sectionRef}
      id="footer"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "80vh",
        padding: "4rem 2rem 2rem",
        background: "var(--void)",
        borderTop: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <span className="t-eyebrow" style={{ marginBottom: "1rem", display: "block" }}>
          THE END.
        </span>
        <div className="section-title" style={{ textAlign: "center" }}>
          <span className="t-display">READY TO EXPLORE?</span>
        </div>
      </div>

      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          minHeight: "500px",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {footerItems.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              elementsRef.current[i] = el;
            }}
            style={{
              zIndex: 4,
              transition: gravityActive ? "none" : "transform 0.3s ease",
            }}
          >
            <FooterItem item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
