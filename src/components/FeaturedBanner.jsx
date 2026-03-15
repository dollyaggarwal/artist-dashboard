import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function FeaturedBanner({ artists }) {
  const navigate = useNavigate();
  const premiumArtists = artists.filter((a) => a.isPremium);
  if (premiumArtists.length === 0) return null;

  // Duplicate for seamless infinite scroll
  const items = [...premiumArtists, ...premiumArtists, ...premiumArtists];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-14"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6"
        style={{ paddingBottom: "14px", borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-3">
          <motion.span
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{ display: "inline-block", width: "3px", height: "22px",
              background: "linear-gradient(to bottom, #D4651A, #C4501A)",
              borderRadius: "2px", transformOrigin: "top", flexShrink: 0 }}
          />
          <h2 className="font-serif" style={{ fontSize: "21px", fontWeight: 600, color: "var(--ink)" }}>
            Featured Artists
          </h2>
          <span style={{ padding: "3px 9px", background: "linear-gradient(135deg, #D4651A, #C4501A)",
            color: "#fff", fontSize: "8px", fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.16em", fontFamily: "'DM Sans', sans-serif", borderRadius: "20px" }}>
            Premium
          </span>
        </div>
        <button onClick={() => navigate("/featured")}
          style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.14em", color: "#C4501A", background: "none", border: "none",
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "opacity 0.15s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
          View all →
        </button>
      </div>

      {/* Infinite scroll marquee */}
      <div style={{ overflow: "hidden", position: "relative" }}>
        {/* Left/right fade masks */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", zIndex: 2,
          background: "linear-gradient(to right, var(--bg), transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", zIndex: 2,
          background: "linear-gradient(to left, var(--bg), transparent)", pointerEvents: "none" }} />

        <motion.div
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", gap: "16px", width: "max-content" }}
        >
          {items.map((artist, i) => (
            <div
              key={`${artist.id}-${i}`}
              onClick={() => navigate(`/artist/${artist.id}`)}
              className="group"
              style={{ cursor: "pointer", flexShrink: 0, width: "180px", paddingBottom: "8px" }}
            >
              {/* Outer wrapper provides the circular clip — separate from the scaling element */}
              <div style={{
                width: "180px", height: "180px", borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid var(--border)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              }}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ width: "100%", height: "100%", position: "relative" }}
                >
                  <img
                    src={artist.profile_image}
                    alt={artist.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover",
                      objectPosition: "center 20%", display: "block" }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{ background: "rgba(0,0,0,0.28)", transition: "opacity 0.25s",
                      display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: "10px", fontWeight: 700,
                      textTransform: "uppercase", letterSpacing: "0.12em",
                      fontFamily: "'DM Sans', sans-serif" }}>View</span>
                  </div>
                </motion.div>
              </div>

              {/* Name below */}
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <div className="font-serif" style={{ fontSize: "13px", fontWeight: 600,
                  color: "var(--ink)", lineHeight: 1.2, whiteSpace: "nowrap",
                  overflow: "hidden", textOverflow: "ellipsis" }}>
                  {artist.name}
                </div>
                <div style={{ fontSize: "9px", fontWeight: 600, textTransform: "uppercase",
                  letterSpacing: "0.16em", color: "#C4501A",
                  fontFamily: "'DM Sans', sans-serif", marginTop: "2px" }}>
                  {artist.art_category}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}