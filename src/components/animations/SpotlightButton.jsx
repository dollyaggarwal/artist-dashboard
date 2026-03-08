import { useRef, useState } from "react";

/**
 * SpotlightButton — button with a radial spotlight that follows the cursor
 * React Bits inspired spotlight effect
 */
export default function SpotlightButton({ children, className = "", onClick }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: "50%", y: "50%" });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top } = ref.current.getBoundingClientRect();
    setPos({ x: `${e.clientX - left}px`, y: `${e.clientY - top}px` });
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: hovered
          ? `radial-gradient(circle 80px at ${pos.x} ${pos.y}, rgba(255,255,255,0.18) 0%, transparent 70%), linear-gradient(135deg, #f97316, #ec4899)`
          : "linear-gradient(135deg, #f97316, #ec4899)",
        transition: "box-shadow 0.3s ease",
        boxShadow: hovered
          ? "0 0 32px 4px rgba(249,115,22,0.45), 0 4px 24px rgba(236,72,153,0.3)"
          : "0 4px 15px rgba(249,115,22,0.3)",
      }}
    >
      {children}
    </button>
  );
}
