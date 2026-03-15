import { motion } from "framer-motion";

// 6 images — mix of modern art, photography, digital, ancient/sculpture, illustration, craft
const COLLAGE_IMAGES = [
  { src: "https://images.unsplash.com/photo-1452457807411-4979b707c5be?w=800&q=90", label: "Photography",  row: "1/2", col: "1/2" },
  { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=90", label: "Digital Art",  row: "1/2", col: "2/3" },
  { src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=90", label: "Painting",     row: "1/2", col: "3/4" },
  { src: "https://images.unsplash.com/photo-1526285759904-71d1170ed2ac?w=800&q=90", label: "Sculpture",    row: "2/3", col: "1/2" },
  { src: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=90", label: "Illustration", row: "2/3", col: "2/3" },
  { src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=90", label: "Abstract",     row: "2/3", col: "3/4" },
];

export default function CollageHeroBanner({ onGoPremium, onViewArtists }) {
  return (
    <section style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      minHeight: "480px",
      background: "#0A0A0A",
      overflow: "hidden",
      position: "relative",
    }}>

      {/* ── LEFT: Text content ── */}
      <div style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "clamp(40px, 6vw, 80px) clamp(32px, 5vw, 64px)",
        position: "relative", zIndex: 2,
      }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}
        >
          <span style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.45)", display: "inline-block" }} />
          <span style={{
            fontSize: "9px", fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.34em", color: "rgba(255,255,255,0.5)",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Premium Membership
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-serif"
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 700, color: "#fff",
            lineHeight: 1.0, letterSpacing: "-0.01em",
            textShadow: "0 2px 20px rgba(0,0,0,0.25)", margin: "0 0 12px",
          }}
        >
          Stand Out.<br />
          <em style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.70)", fontSize: "0.88em" }}>
            Get Discovered.
          </em>
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.55 }}
          style={{
            fontSize: "13px", color: "rgba(255,255,255,0.50)",
            fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75,
            maxWidth: "340px", margin: "0 0 28px",
          }}
        >
          Premium artists get priority placement, a full portfolio, and an exclusive ribbon that signals top-tier talent.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.5 }}
          style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
        >
          <button
            onClick={onGoPremium}
            style={{
              padding: "12px 26px", fontSize: "11px", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.13em",
              background: "linear-gradient(135deg, #D4651A, #C4501A)",
              color: "#fff", border: "none", borderRadius: "4px",
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 4px 18px rgba(196,80,26,0.45)", transition: "opacity 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            ⚡ Go Premium
          </button>
          <button
            onClick={onViewArtists}
            style={{
              padding: "12px 26px", fontSize: "11px", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.13em",
              background: "rgba(255,255,255,0.07)", color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.30)", borderRadius: "4px",
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              backdropFilter: "blur(6px)", transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
          >
            View Artists
          </button>
        </motion.div>

        {/* Subtle bottom gradient fade into page */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "60px",
          background: "linear-gradient(to bottom, transparent, var(--bg))",
          pointerEvents: "none",
        }} />
      </div>

      {/* ── RIGHT: Collage mosaic ── */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "3px",
          height: "100%",
          minHeight: "480px",
        }}>
          {COLLAGE_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{
                gridRow: img.row,
                gridColumn: img.col,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                src={img.src}
                alt={img.label}
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  display: "block", filter: "brightness(0.78)",
                  transition: "transform 0.7s ease, filter 0.3s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.07)";
                  e.currentTarget.style.filter = "brightness(0.92)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.filter = "brightness(0.78)";
                }}
              />
              {/* Category label */}
              <div style={{
                position: "absolute", bottom: "8px", left: "8px",
                padding: "2px 7px", borderRadius: "20px",
                background: "rgba(0,0,0,0.62)", backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}>
                <span style={{
                  color: "rgba(255,255,255,0.85)", fontSize: "8px",
                  fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.13em",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Left edge gradient blending into dark left panel */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: "60px",
          background: "linear-gradient(to right, #0A0A0A, transparent)",
          pointerEvents: "none", zIndex: 2,
        }} />

        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "60px",
          background: "linear-gradient(to bottom, transparent, var(--bg))",
          pointerEvents: "none", zIndex: 2,
        }} />
      </div>
    </section>
  );
}