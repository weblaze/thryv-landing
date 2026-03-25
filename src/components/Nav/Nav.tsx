"use client";

import { forwardRef } from "react";

const Nav = forwardRef<HTMLElement>(function Nav(_, ref) {
  return (
    <nav
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        opacity: 0,
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        height: "56px",
        background: "rgba(5, 5, 5, 0.94)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <span
        className="nav-logo"
        style={{
          fontFamily: "var(--font-cond)",
          fontWeight: 900,
          fontSize: "18px",
          letterSpacing: "-0.01em",
          textTransform: "uppercase",
          background: "var(--red-grad)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          opacity: 0,
        }}
      >
        THRYV
      </span>
    </nav>
  );
});

export default Nav;
