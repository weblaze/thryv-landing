"use client";

import { motion } from "framer-motion";

export interface FooterItemData {
  id: string;
  type: "text" | "link" | "button";
  content: string;
  className?: string;
  href?: string;
  width: number;
  height: number;
  bg?: string;
  border?: string;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  letterSpacing?: string;
  textTransform?: string;
}

interface FooterItemProps {
  item: FooterItemData;
  style?: React.CSSProperties;
}

export default function FooterItem({ item, style }: FooterItemProps) {
  const isDark = item.bg === "var(--void)" || item.bg === "var(--card)";
  
  return (
    <motion.div
      whileHover={isDark ? { backgroundColor: "var(--red-gh)", borderColor: "var(--red-dim)", color: "var(--ice)" } : { scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${item.width}px`,
        height: `${item.height}px`,
        background: item.bg || "var(--card)",
        border: item.border || "1px solid var(--border)",
        color: item.color || "var(--ice-mid)",
        cursor: item.type === "link" || item.type === "button" ? "pointer" : "grab",
        transition: "color 0.2s ease, background 0.2s ease, border-color 0.2s ease",
        textDecoration: "none",
        userSelect: "none",
        overflow: "hidden",
        whiteSpace: "nowrap",
        ...style,
      }}
      onClick={() => {
        if (item.type === "link" || item.type === "button") {
          // Add your routing/click logic here
          console.log(`Clicked ${item.content}`);
        }
      }}
    >
      <span className={item.className} style={{ 
        pointerEvents: "none",
        fontSize: item.fontSize,
        fontFamily: item.fontFamily,
        letterSpacing: item.letterSpacing,
        textTransform: item.textTransform,
      }}>
        {item.content}
      </span>
    </motion.div>
  );
}
