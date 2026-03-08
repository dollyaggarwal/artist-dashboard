import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * CustomCursor — replaces default cursor with a branded glowing cursor
 * React Bits inspired cursor effect
 * Only active when hovering over upgrade/premium elements
 */
export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering over a premium/upgrade element
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el?.closest("[data-cursor='upgrade']")) {
        setVisible(true);
        setLabel(el.closest("[data-cursor='upgrade']").dataset.cursorLabel || "✦");
      } else {
        setVisible(false);
        setLabel("");
      }
    };

    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed pointer-events-none z-[9999]"
          style={{ left: pos.x, top: pos.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: clicked ? 0.8 : 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute rounded-full border-2 border-orange-400"
            style={{
              width: 44,
              height: 44,
              top: -22,
              left: -22,
              boxShadow: "0 0 16px 4px rgba(249,115,22,0.4)",
            }}
            animate={{ scale: clicked ? 0.7 : [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Inner dot */}
          <motion.div
            className="absolute rounded-full bg-gradient-to-br from-orange-400 to-pink-500"
            style={{ width: 10, height: 10, top: -5, left: -5 }}
          />

          {/* Label */}
          {label && label !== "✦" && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-5 left-3 bg-gray-900 text-white text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-lg"
            >
              {label}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
