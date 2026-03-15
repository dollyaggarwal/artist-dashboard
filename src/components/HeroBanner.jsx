import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HERO_IMAGE = "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1920&q=90";

const STATS = [
  { value: "12,400+", label: "Artists" },
  { value: "84K+",    label: "Artworks" },
  { value: "230+",    label: "Cities" },
];

export default function HeroBanner() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "580px", marginBottom: "0" }}>
      <img
        src={HERO_IMAGE}
        alt="Art Gallery"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 40%" }}
      />
      <div className="absolute inset-0" style={{
        background: "linear-gradient(100deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.10) 100%)",
      }} />
      <div className="absolute inset-0" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "150px", opacity: 0.03,
      }} />

      <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16" style={{ maxWidth: "640px" }}>
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.1 }}
          style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <span style={{ display: "inline-block", width: "28px", height: "1px", background: "rgba(255,255,255,0.5)" }} />
          <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.36em", color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif" }}>
            Artista · Artist Discovery
          </span>
        </motion.div>

        <motion.h1 className="font-serif"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 700, color: "#fff", lineHeight: 1.0, letterSpacing: "-0.01em", textShadow: "0 2px 24px rgba(0,0,0,0.3)", marginBottom: "16px" }}>
          Where Art<br />
          <em style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.78)", fontSize: "0.9em" }}>finds its audience.</em>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }}
          style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.58)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, maxWidth: "380px", marginBottom: "28px" }}>
          Discover painters, sculptors, photographers and digital visionaries — curated from studios around the world.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
          style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
          <HeroBtn primary onClick={() => navigate("/featured")}>Explore Featured</HeroBtn>
          <HeroBtn onClick={() => document.getElementById("discover-section")?.scrollIntoView({ behavior: "smooth" })}>
            Browse Artists
          </HeroBtn>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.68 }}
          style={{ display: "flex", gap: "28px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.14)" }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div className="font-serif" style={{ fontSize: "22px", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontSize: "9px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.42)", fontFamily: "'DM Sans', sans-serif", marginTop: "3px" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0" style={{ height: "60px", background: "linear-gradient(to bottom, transparent, var(--bg))" }} />
    </section>
  );
}

function HeroBtn({ children, primary, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button onClick={onClick}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
      style={{
        padding: "11px 22px", fontSize: "11px", fontWeight: 700,
        fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase",
        letterSpacing: "0.13em", borderRadius: "4px", cursor: "pointer",
        border: primary ? "none" : "1.5px solid rgba(255,255,255,0.40)",
        background: primary ? "linear-gradient(135deg, #D4651A, #C4501A)" : hovered ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
        color: "#fff",
        boxShadow: primary ? "0 4px 16px rgba(196,80,26,0.42)" : "none",
        transition: "background 0.2s",
      }}>
      {children}
    </motion.button>
  );
}