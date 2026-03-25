"use client";

interface FeatureItemProps {
  name: string;
  color: string;
  icon: string;
}

export default function FeatureItem({ name, color, icon }: FeatureItemProps) {
  return (
    <div
      className="feature-item"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.8rem 1.6rem",
        borderRadius: "12px",
        border: `1px solid ${color}22`,
        background: `${color}0A`,
        backdropFilter: "blur(8px)",
        opacity: 0,
      }}
    >
      <span style={{ fontSize: "1.8rem" }}>{icon}</span>
      <span
        style={{
          fontFamily: "var(--font-cond)",
          fontWeight: 700,
          fontSize: "clamp(14px, 2vw, 20px)",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: color,
        }}
      >
        {name}
      </span>
    </div>
  );
}
