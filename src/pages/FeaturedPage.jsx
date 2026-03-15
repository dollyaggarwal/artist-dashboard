import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useArtists } from "../context/ArtistContext";
import { formatFollowers } from "../utils/formatters";
import UpgradeModal from "../components/UpgradeModal";

// ── Hotstar-style benefits row with View All expand ──────────────
function BenefitsRow({ benefits }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? benefits : benefits.slice(0, 5);

  return (
    <div style={{ paddingBottom: "clamp(52px,7vw,80px)" }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2 style={{
          fontSize: "20px", fontWeight: 700, color: "#fff",
          fontFamily: "'Playfair Display', serif", margin: 0,
        }}>
          What's Included
        </h2>
        <motion.button
          onClick={() => setExpanded(v => !v)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex", alignItems: "center", gap: "5px",
            padding: "6px 14px", borderRadius: "20px",
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.22)",
            color: "#fff", fontSize: "11px", fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
            textTransform: "uppercase", letterSpacing: "0.10em",
            cursor: "pointer", backdropFilter: "blur(8px)",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.20)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.10)")}
        >
          {expanded ? "Show Less" : "View All"}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: "inline-block" }}
          >
            ›
          </motion.span>
        </motion.button>
      </div>

      {/* Cards row */}
      <motion.div
        style={{
          display: "flex", gap: "14px",
          overflowX: expanded ? "visible" : "auto",
          flexWrap: expanded ? "wrap" : "nowrap",
          paddingBottom: "12px",
          scrollbarWidth: "none",
        }}
        className="scrollbar-hide"
        layout
      >
        <AnimatePresence>
          {visible.map((b, i) => (
            <motion.div
              key={b.label}
              layout
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 280, damping: 22 }}
              style={{
                flexShrink: 0,
                width: "160px",
                padding: "20px 14px 18px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(16px)",
                cursor: "default",
                textAlign: "center",
              }}
            >
              <div style={{
                width: "52px", height: "52px", borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.22)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 12px", fontSize: "24px",
              }}>
                {b.icon}
              </div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#fff", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.2, marginBottom: "6px" }}>
                {b.label}
              </div>
              <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.52)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
                {b.desc}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

const STRIPE_IMG  = "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1920&q=90";

// Collage panels — no portrait photos, only art/design/camera/craft images
const COLLAGE = [
  {
    img: "https://images.unsplash.com/photo-1452457807411-4979b707c5be?w=900&q=90",
    label: "Photography",
    span: "1/3",  // tall left panel
    pos: "center center",
  },
  {
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&q=90",
    label: "Digital Art",
    span: null,
    pos: "center center",
  },
  {
    img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=700&q=90",
    label: "Painting",
    span: null,
    pos: "center center",
  },
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=90",
    label: "3D Design",
    span: null,
    pos: "center center",
  },
  {
    img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=700&q=90",
    label: "Illustration",
    span: null,
    pos: "center center",
    filter: "brightness(0.88) saturate(1.1)",
  },
  {
    img: "https://images.unsplash.com/photo-1526285759904-71d1170ed2ac?w=700&q=90",
    label: "Sculpture",
    span: null,
    pos: "center center",
    filter: "brightness(0.85) sepia(0.08)",
  },
  {
    img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=700&q=90",
    label: "Abstract",
    span: null,
    pos: "center center",
  },
];

const PREMIUM_BENEFITS = [
  { icon: "⭐", label: "Priority Listing",   desc: "Appear at the top of all searches" },
  { icon: "🖼",  label: "Full Portfolio",     desc: "Showcase up to 6 artworks" },
  { icon: "🎨", label: "Custom Banner",      desc: "Add a hero banner to your profile" },
  { icon: "🔗", label: "Website Link",       desc: "Link to your external portfolio" },
  { icon: "✨", label: "Homepage Spotlight", desc: "Featured in our curated section" },
  { icon: "🏅", label: "Premium Ribbon",     desc: "A permanent ribbon on your card" },
];

export default function FeaturedPage() {
  const { artists } = useArtists();
  const navigate    = useNavigate();
  const [selectedArtist, setSelectedArtist] = useState(null);

  const premiumArtists = artists.filter((a) => a.isPremium);
  const regularArtists = artists.filter((a) => !a.isPremium).slice(0, 3);

  return (
    <main style={{ background: "var(--bg)" }}>

      {/* ════ UNIFIED HERO + BENEFITS BANNER ════ */}
      <section style={{ position: "relative", overflow: "hidden", background: "#0A0A0A" }}>

        {/* Single full-bleed background image */}
        <img
          src="https://images.pexels.com/photos/1227497/pexels-photo-1227497.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90"
          alt=""
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 40%",
            filter: "brightness(0.55) saturate(0.9)",
          }}
        />

        {/* Mode-adaptive overlay — light: warm translucent, dark: deep dark */}
        <div className="unified-overlay" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        <style>{`
          .unified-overlay { background: linear-gradient(160deg, rgba(245,240,232,0.15) 0%, rgba(245,240,232,0.08) 100%); }
          .dark .unified-overlay { background: linear-gradient(160deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.20) 100%); }
        `}</style>

        {/* Vertical gradient: strong dark top-left for headline, fades out */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(110deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.40) 45%, rgba(0,0,0,0.10) 100%)",
        }} />

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-6 sm:px-10" style={{ zIndex: 1 }}>

          {/* ── Hero text ── */}
          <div style={{ paddingTop: "clamp(60px,8vw,100px)", paddingBottom: "clamp(48px,6vw,72px)", maxWidth: "560px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ width: "24px", height: "1px", background: "rgba(255,255,255,0.45)", display: "inline-block" }} />
              <span style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.34em", color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif" }}>
                Premium Membership
              </span>
            </div>

            <h1 className="font-serif" style={{ fontSize: "clamp(40px,6vw,74px)", fontWeight: 700, color: "#fff", lineHeight: 1.0, letterSpacing: "-0.01em", textShadow: "0 2px 28px rgba(0,0,0,0.4)", margin: "0 0 14px" }}>
              Stand Out.<br />
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.72)", fontSize: "0.88em" }}>Get Discovered.</em>
            </h1>

            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75, maxWidth: "360px", margin: "0 0 28px" }}>
              Premium artists get priority placement, a full portfolio, and an exclusive ribbon that signals top-tier talent.
            </p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                onClick={() => regularArtists[0] && setSelectedArtist(regularArtists[0])}
                style={{ padding: "12px 26px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.13em", background: "linear-gradient(135deg,#D4651A,#C4501A)", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", boxShadow: "0 4px 18px rgba(196,80,26,0.5)", transition: "opacity 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                ⚡ Go Premium
              </button>
              <button
                onClick={() => document.getElementById("premium-artists")?.scrollIntoView({ behavior: "smooth" })}
                style={{ padding: "12px 26px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.13em", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: "4px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", backdropFilter: "blur(8px)", transition: "background 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.16)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              >
                View Artists
              </button>
            </div>
          </div>

          {/* ── Divider ── */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.15)", marginBottom: "32px" }} />

          {/* ── Benefits — Hotstar style ── */}
          <BenefitsRow benefits={PREMIUM_BENEFITS} />
        </div>

        {/* Bottom fade to page bg */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to bottom, transparent, var(--bg))", pointerEvents: "none" }} />
      </section>


      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-14">

        {/* Premium artists */}
        {premiumArtists.length > 0 && (
          <section id="premium-artists" className="mb-16">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", paddingBottom: "14px", borderBottom: "1px solid var(--border)" }}>
              <div>
                <h2 className="font-serif" style={{ fontSize: "24px", fontWeight: 600, color: "var(--ink)" }}>Premium Artists</h2>
                <p style={{ fontSize: "11px", color: "var(--ink-4)", fontFamily: "'DM Sans', sans-serif", marginTop: "3px" }}>Hand-picked talents with premium access</p>
              </div>
              <span style={{
                padding: "4px 10px", borderRadius: "20px",
                background: "linear-gradient(135deg,#D4651A,#C4501A)",
                color: "#fff", fontSize: "10px", fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {premiumArtists.length} members
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {premiumArtists.map((artist, i) => (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 240, damping: 20 }}
                  onClick={() => navigate(`/artist/${artist.id}`)}
                  className="group cursor-pointer"
                  style={{
                    borderRadius: "10px", overflow: "hidden",
                    background: "var(--surface)", border: "1px solid var(--border)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    transition: "box-shadow 0.25s, transform 0.25s",
                  }}
                  whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.12)" }}
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                    <img src={artist.profile_image} alt={artist.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
                      style={{ objectFit: "cover" }} />
                    {/* Premium badge */}
                    <div style={{
                      position: "absolute", top: "10px", left: "10px",
                      padding: "3px 8px", borderRadius: "20px",
                      background: "linear-gradient(135deg,#D4651A,#C4501A)",
                      color: "#fff", fontSize: "8px", fontWeight: 700,
                      fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em",
                    }}>
                      ✦ Premium
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <p style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--ink-4)", fontFamily: "'DM Sans', sans-serif", marginBottom: "4px" }}>
                      {artist.art_category}
                    </p>
                    <h3 className="font-serif" style={{ fontSize: "16px", fontWeight: 600, color: "var(--ink)", marginBottom: "4px" }}>
                      {artist.name}
                    </h3>
                    <p style={{ fontSize: "11px", color: "var(--ink-4)", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: "4px" }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {artist.location} · {formatFollowers(artist.followers)} followers
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Pricing CTA band */}
        <section className="relative overflow-hidden mb-16" style={{ borderRadius: "12px" }}>
          <div style={{
            background: "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #2A1A0A 100%)",
            padding: "clamp(32px,4vw,52px) clamp(24px,4vw,52px)",
            borderRadius: "12px",
            display: "flex", flexDirection: "column", alignItems: "center",
            textAlign: "center", gap: "16px",
            position: "relative", overflow: "hidden",
          }}>
            {/* Subtle gold shimmer */}
            <div style={{
              position: "absolute", inset: 0, opacity: 0.04,
              backgroundImage: "radial-gradient(ellipse at 70% 50%, #D4651A 0%, transparent 65%)",
              borderRadius: "12px",
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", marginBottom: "10px" }}>
                Simple Pricing
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px", justifyContent: "center", marginBottom: "6px" }}>
                <span className="font-serif" style={{ fontSize: "clamp(48px,6vw,72px)", fontWeight: 800, color: "#fff", lineHeight: 1 }}>$9.99</span>
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>/month</span>
              </div>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", marginBottom: "24px" }}>
                Cancel anytime. No hidden fees.
              </p>
              <button
                onClick={() => regularArtists[0] && setSelectedArtist(regularArtists[0])}
                style={{
                  padding: "13px 36px", fontSize: "11px", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.14em",
                  background: "linear-gradient(135deg,#D4651A,#C4501A)",
                  color: "#fff", border: "none", borderRadius: "4px",
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 4px 20px rgba(196,80,26,0.45)",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                Start Premium Today →
              </button>
            </div>
          </div>
        </section>

        {/* Upgrade CTA cards */}
        {regularArtists.length > 0 && (
          <section>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "14px", borderBottom: "1px solid var(--border)" }}>
              <div>
                <h2 className="font-serif" style={{ fontSize: "22px", fontWeight: 600, color: "var(--ink)" }}>Ready to Upgrade?</h2>
                <p style={{ fontSize: "11px", color: "var(--ink-4)", fontFamily: "'DM Sans', sans-serif", marginTop: "3px" }}>Join these artists on their premium journey</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {regularArtists.map((artist, i) => (
                <motion.div
                  key={artist.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid var(--border)", background: "var(--surface)" }}
                >
                  <div style={{ aspectRatio: "4/3", overflow: "hidden", position: "relative" }}>
                    <img src={artist.profile_image} alt={artist.name} className="w-full h-full object-cover" style={{ opacity: 0.75, filter: "grayscale(20%)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
                  </div>
                  <div style={{ padding: "14px 16px" }}>
                    <p style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--ink-4)", fontFamily: "'DM Sans', sans-serif", marginBottom: "4px" }}>
                      {artist.art_category}
                    </p>
                    <h3 className="font-serif" style={{ fontSize: "15px", fontWeight: 600, color: "var(--ink)", marginBottom: "12px" }}>
                      {artist.name}
                    </h3>
                    <button
                      onClick={() => setSelectedArtist(artist)}
                      style={{
                        width: "100%", padding: "9px", fontSize: "10px",
                        fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em",
                        background: "linear-gradient(135deg,#D4651A,#C4501A)",
                        color: "#fff", border: "none", borderRadius: "4px",
                        cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                        transition: "opacity 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
                      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >
                      ⚡ Upgrade to Premium
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>

      {selectedArtist && <UpgradeModal artist={selectedArtist} onClose={() => setSelectedArtist(null)} />}
    </main>
  );
}