import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { formatFollowers } from "../utils/formatters";
import UpgradeModal from "./UpgradeModal";
import ArtistHoverCard from "./ArtistHoverCard";

const WORK_TYPE_STYLES = {
  "Full Time":  { bg: "#EBF5EB", color: "#2E7D32", dot: "#4CAF50" },
  "Part Time":  { bg: "#E8F0FE", color: "#1A56A0", dot: "#4285F4" },
  "Freelancer": { bg: "#FFF3E0", color: "#C4501A", dot: "#D4651A" },
};

function WorkTypeBadge({ type }) {
  if (!type) return null;
  const s = WORK_TYPE_STYLES[type] || WORK_TYPE_STYLES["Freelancer"];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "4px",
      padding: "2px 7px", borderRadius: "20px",
      background: s.bg, color: s.color,
      fontSize: "9px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
      letterSpacing: "0.06em", whiteSpace: "nowrap",
    }}>
      <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
      {type}
    </span>
  );
}

export default function ArtistCard({ artist, index }) {
  const navigate = useNavigate();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: (index % 8) * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="group relative cursor-pointer"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          boxShadow: hovered
            ? "0 8px 32px rgba(0,0,0,0.12)"
            : "0 1px 4px rgba(0,0,0,0.05)",
          transition: "box-shadow 0.3s ease",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={() => navigate(`/artist/${artist.id}`)}
      >
        {/* ── Image ── */}
        <div
          className="relative overflow-hidden"
          style={{ height: "340px", background: "var(--subtle)", flexShrink: 0 }}
        >
          <motion.img
            src={artist.profile_image}
            alt={artist.name}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center top",
              display: "block",
            }}
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            loading="lazy"
          />

          {/* Gradient overlay */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Premium ribbon */}
          {artist.isPremium && (
            <div className="absolute overflow-hidden" style={{ top: 0, right: 0, width: 72, height: 72, pointerEvents: "none" }}>
              <div style={{
                background: "var(--ink)", color: "#fff",
                fontSize: "7px", fontWeight: 700, letterSpacing: "0.12em",
                padding: "5px 26px", position: "absolute",
                top: 18, right: -22, transform: "rotate(45deg)",
                fontFamily: "'DM Sans', sans-serif",
                whiteSpace: "nowrap", textTransform: "uppercase",
              }}>
                Premium
              </div>
            </div>
          )}

          {/* View Profile on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-2.5"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: "none" }}
          >
            <span style={{
              fontSize: "10px", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.22em", color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            }}>
              View Profile →
            </span>
          </motion.div>
        </div>

        {/* ── Info ── */}
        <div style={{ padding: "12px 14px 14px" }}>
          {/* Category + Work Type row */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px", flexWrap: "wrap" }}>
            <p style={{
              fontSize: "9px", fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.2em", color: "var(--ink-4)",
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {artist.art_category}
            </p>
            <WorkTypeBadge type={artist.work_type} />
          </div>

          {/* Artist name — hover card trigger */}
          <ArtistHoverCard artist={artist}>
            <h3
              className="font-serif truncate"
              style={{
                fontSize: "16px", fontWeight: 600, color: "var(--ink)",
                lineHeight: 1.25, marginBottom: "3px",
                transition: "color 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--ink-3)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--ink)")}
            >
              {artist.name}
            </h3>
          </ArtistHoverCard>

          {/* Location */}
          <p style={{
            fontSize: "11px", color: "var(--ink-4)",
            fontFamily: "'DM Sans', sans-serif",
            display: "flex", alignItems: "center", gap: "4px",
            marginBottom: "10px",
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            {artist.location}
          </p>

          {/* Bottom row */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            paddingTop: "10px", borderTop: "1px solid var(--border)",
          }}>
            {/* Followers with icon */}
            <span style={{
              fontSize: "11px", color: "var(--ink-3)",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
              display: "flex", alignItems: "center", gap: "5px",
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#C4501A", flexShrink: 0 }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {formatFollowers(artist.followers)}
            </span>

            {!artist.isPremium && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowUpgrade(true);
                }}
                style={{
                  fontSize: "10px", fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.12em", color: "#fff",
                  background: "linear-gradient(135deg, #D4651A, #C4501A)",
                  border: "none",
                  padding: "5px 10px", borderRadius: "4px",
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer", transition: "opacity 0.15s",
                  boxShadow: "0 2px 8px rgba(196,80,26,0.35)",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                ⚡ Upgrade
              </button>
            )}
          </div>
        </div>
      </motion.article>

      {showUpgrade && (
        <UpgradeModal artist={artist} onClose={() => setShowUpgrade(false)} />
      )}
    </>
  );
}