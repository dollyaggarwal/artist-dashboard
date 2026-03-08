import { useEffect, useRef } from "react";

/**
 * ShimmerText — text with a moving light shimmer effect
 * React Bits inspired text shimmer
 */
export default function ShimmerText({ children, className = "" }) {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{
        background: "linear-gradient(90deg, #f97316 0%, #fbbf24 40%, #ec4899 60%, #f97316 100%)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "shimmer 2.5s linear infinite",
      }}
    >
      {children}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </span>
  );
}
