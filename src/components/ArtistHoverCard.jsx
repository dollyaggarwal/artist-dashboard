import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatFollowers } from "../utils/formatters";

export default function ArtistHoverCard({ artist, children }) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const hideTimer = useRef(null);

  const CARD_WIDTH = 320;
  const CARD_HEIGHT = 280;
  const OFFSET = 14;

  const showCard = () => {
    clearTimeout(hideTimer.current);
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Prefer right side, fall back to left
    let left = rect.right + OFFSET;
    if (left + CARD_WIDTH > vw - 16) {
      left = rect.left - CARD_WIDTH - OFFSET;
    }
    // Clamp left
    left = Math.max(12, left);

    // Prefer align to top of trigger, nudge up if overflows
    let top = rect.top;
    if (top + CARD_HEIGHT > vh - 16) {
      top = vh - CARD_HEIGHT - 16;
    }
    top = Math.max(12, top);

    setPos({ top, left });
    setVisible(true);
  };

  const scheduleHide = () => {
    hideTimer.current = setTimeout(() => setVisible(false), 120);
  };

  const cancelHide = () => clearTimeout(hideTimer.current);

  // Derived stats from followers count
  const appreciations = formatFollowers(Math.round(artist.followers * 2.3));
  const views = formatFollowers(Math.round(artist.followers * 48));
  const covers = (artist.portfolio || []).slice(0, 3);

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={showCard}
        onMouseLeave={scheduleHide}
        style={{ display: "inline-block", cursor: "pointer" }}
      >
        {children}
      </span>

      <AnimatePresence>
        {visible && (
          <motion.div
            onMouseEnter={cancelHide}
            onMouseLeave={scheduleHide}
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              zIndex: 9999,
              width: CARD_WIDTH,
              background: "#fff",
              borderRadius: 12,
              boxShadow:
                "0 4px 6px -1px rgba(0,0,0,0.07), 0 16px 48px -8px rgba(0,0,0,0.18)",
              overflow: "hidden",
              fontFamily: "'DM Sans', sans-serif",
              pointerEvents: "auto",
            }}
          >
            {/* ── Cover images strip ── */}
            <div style={{ display: "flex", height: 112, background: "#f0eeea" }}>
              {covers.length > 0 ? (
                covers.map((src, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      overflow: "hidden",
                      borderRight: i < covers.length - 1 ? "2px solid #fff" : "none",
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      loading="eager"
                    />
                  </div>
                ))
              ) : (
                <div style={{ flex: 1, background: "linear-gradient(135deg, #e8e6e1 0%, #d4d0c8 100%)" }} />
              )}
            </div>

            {/* ── Avatar overlapping cover ── */}
            <div style={{ position: "relative", paddingTop: 0 }}>
              <div
                style={{
                  position: "absolute",
                  top: -28,
                  left: 16,
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  border: "3px solid #fff",
                  overflow: "hidden",
                  background: "#e8e6e1",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                }}
              >
                <img
                  src={artist.profile_image}
                  alt={artist.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  loading="eager"
                />
              </div>

              {/* ── Info ── */}
              <div style={{ padding: "36px 16px 14px" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#0A0A0A", lineHeight: 1.2 }}>
                  {artist.name}
                </div>
                <div style={{ fontSize: 11.5, color: "#6A6A6A", marginTop: 3, display: "flex", alignItems: "center", gap: 3 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  {artist.location}
                </div>

                {/* ── Stats ── */}
                <div
                  style={{
                    display: "flex",
                    gap: 0,
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: "1px solid #f0eeea",
                  }}
                >
                  {[
                    { label: "Appreciations", value: appreciations },
                    { label: "Followers", value: formatFollowers(artist.followers) },
                    { label: "Views", value: views },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      style={{
                        flex: 1,
                        textAlign: "center",
                        borderRight: i < 2 ? "1px solid #f0eeea" : "none",
                        padding: "0 6px",
                      }}
                    >
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#0A0A0A", lineHeight: 1.2 }}>
                        {stat.value}
                      </div>
                      <div style={{ fontSize: 9, color: "#9A9A9A", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Action Buttons ── */}
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <HoverButton primary>Follow</HoverButton>
                  <HoverButton>Message</HoverButton>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HoverButton({ children, primary }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: primary ? 1.4 : 1,
        padding: "8px 0",
        fontSize: 11,
        fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        borderRadius: 6,
        border: primary ? "none" : "1px solid #D8D5CE",
        background: primary
          ? hovered ? "#2A2A2A" : "#0A0A0A"
          : hovered ? "#F5F3EF" : "#fff",
        color: primary ? "#fff" : "#0A0A0A",
        cursor: "pointer",
        transition: "background 0.15s ease, transform 0.15s ease",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      {children}
    </button>
  );
}