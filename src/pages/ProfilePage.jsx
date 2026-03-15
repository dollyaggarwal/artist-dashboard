import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useArtists } from "../context/ArtistContext";
import { formatFollowers } from "../utils/formatters";
import UpgradeModal from "../components/UpgradeModal";

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 260 : -260, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -260 : 260, opacity: 0 }),
};

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getArtistById } = useArtists();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  const artist = getArtistById(id);
  const portfolioItems = artist ? (artist.isPremium ? artist.portfolio : artist.portfolio.slice(0, 4)) : [];

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setTimeout(() => setLightboxIndex(null), 260);
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setLightboxIndex((i) => (i + 1) % portfolioItems.length);
  }, [portfolioItems.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setLightboxIndex((i) => (i - 1 + portfolioItems.length) % portfolioItems.length);
  }, [portfolioItems.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
      if (e.key === "Escape")     closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, lightboxIndex, goNext, goPrev, closeLightbox]);

  if (!artist) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="font-serif" style={{ fontSize: "22px", fontWeight: 500, color: "var(--ink)" }}>Artist not found</h2>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2.5 text-xs font-semibold uppercase tracking-editorial"
          style={{ background: "var(--ink)", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}
        >
          Back to Discover
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 mb-8 text-[10px] font-semibold uppercase tracking-editorial transition-opacity hover:opacity-50"
          style={{ color: "var(--ink-3)", fontFamily: "'DM Sans', sans-serif" }}
        >
          ← Back
        </button>

        {/* Hero Banner */}
        <div
          className="relative w-full mb-0 overflow-hidden"
          style={{ height: "340px", background: "#E2DED8" }}
        >
          {artist.isPremium ? (
            <img src={artist.banner} alt="Banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3"
              style={{
                background: "var(--grid-tint)",
                borderBottom: "1px solid var(--border)",
              }}>
              {/* Dashed border frame */}
              <div style={{
                position: "absolute", inset: "20px",
                border: "2px dashed var(--strong)",
                borderRadius: "8px",
                pointerEvents: "none",
              }} />
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: "var(--ink-4)" }}>
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9l4-4 4 4 4-4 4 4"/><circle cx="8.5" cy="13.5" r="1.5"/>
              </svg>
              <p style={{ fontSize: "11px", color: "var(--ink-4)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em" }}>
                No Banner Yet
              </p>
              <button
                onClick={() => setShowUpgrade(true)}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "9px 20px", fontSize: "10px", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.14em",
                  background: "linear-gradient(135deg, #D4651A, #C4501A)",
                  color: "#fff", border: "none", borderRadius: "4px",
                  fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(196,80,26,0.35)",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                Add Custom Banner
              </button>
            </div>
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, var(--bg) 100%)", pointerEvents: "none" }} />
        </div>

        {/* Profile header */}
        <div className="relative flex flex-col sm:flex-row gap-6 -mt-16 mb-10 z-10" style={{ paddingTop: "8px" }}>
          {/* Avatar */}
          <img
            src={artist.profile_image}
            alt={artist.name}
            className="w-24 h-24 object-cover flex-shrink-0"
            style={{
              border: `3px solid ${artist.isPremium ? "var(--ink)" : "var(--surface)"}`,
              borderRadius: 0,
            }}
          />

          {/* Info */}
          <div className="flex-1 pt-16 sm:pt-14">
            <p
              className="mb-1 uppercase"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.2em", color: "var(--ink-3)", fontFamily: "'DM Sans', sans-serif" }}
            >
              {artist.art_category}
              {artist.isPremium && (
                <span className="ml-3 px-2 py-0.5" style={{ background: "linear-gradient(135deg, #D4651A, #C4501A)", color: "#fff", fontSize: "8px", letterSpacing: "0.1em", borderRadius: "3px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>PREMIUM</span>
              )}
            </p>
            <h1 className="font-serif mb-1" style={{ fontSize: "36px", fontWeight: 500, color: "var(--ink)", lineHeight: 1.1 }}>
              {artist.name}
            </h1>
            <p style={{ fontSize: "12px", color: "var(--ink-4)", fontFamily: "'DM Sans', sans-serif" }}>
              {artist.location} · {formatFollowers(artist.followers)} followers
            </p>
          </div>

          {/* CTA */}
          <div className="sm:self-end">
            {!artist.isPremium ? (
              <button
                onClick={() => setShowUpgrade(true)}
                className="flex items-center gap-2 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-editorial transition-opacity hover:opacity-80"
                style={{
                  background: "linear-gradient(135deg, #D4651A, #C4501A)",
                  color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  borderRadius: "4px",
                  border: "none",
                  boxShadow: "0 3px 12px rgba(196,80,26,0.35)",
                }}
              >
                ⚡ Upgrade to Premium
              </button>
            ) : (
              <span
                className="flex items-center gap-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-editorial"
                style={{
                  background: "linear-gradient(135deg, #D4651A, #C4501A)",
                  color: "#fff", fontFamily: "'DM Sans', sans-serif",
                  borderRadius: "4px", border: "none",
                  boxShadow: "0 2px 10px rgba(196,80,26,0.3)",
                }}
              >
                ✓ Premium Active
              </span>
            )}
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", marginBottom: "32px" }} />

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">

          {/* Left col */}
          <div className="space-y-6">
            {/* About */}
            <div>
              <p className="mb-3 uppercase" style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--ink-4)", fontFamily: "'DM Sans', sans-serif" }}>About</p>
              <p style={{ fontSize: "13px", color: "var(--ink-3)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
                {artist.bio}
              </p>
            </div>

            <div style={{ borderTop: "1px solid var(--border)" }} />

            {/* Social */}
            <div>
              <p className="mb-3 uppercase" style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--ink-4)", fontFamily: "'DM Sans', sans-serif" }}>Social</p>
              <div className="space-y-2.5">
                {[
                  { href: artist.social_links.instagram, label: "Instagram" },
                  { href: artist.social_links.twitter,   label: "Twitter / X" },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-xs transition-opacity hover:opacity-50"
                    style={{ color: "var(--ink-2)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {label}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                ))}
                {artist.isPremium ? (
                  <a
                    href={artist.social_links.website}
                    target="_blank" rel="noreferrer"
                    className="flex items-center justify-between text-xs transition-opacity hover:opacity-50"
                    style={{ color: "var(--ink-2)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
                  >
                    Website
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </a>
                ) : (
                  <button
                    onClick={() => setShowUpgrade(true)}
                    className="text-xs transition-opacity hover:opacity-50"
                    style={{ color: "var(--ink-4)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    + Unlock website link
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right col: Portfolio */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="uppercase" style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--ink-4)", fontFamily: "'DM Sans', sans-serif" }}>Portfolio</p>
              {!artist.isPremium && (
                <button
                  onClick={() => setShowUpgrade(true)}
                  className="text-[10px] font-semibold uppercase tracking-editorial transition-opacity hover:opacity-50"
                  style={{ color: "var(--ink)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  + Unlock full gallery
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {portfolioItems.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="group relative overflow-hidden cursor-pointer"
                  style={{ aspectRatio: "1/1", background: "var(--subtle)" }}
                  onClick={() => { setLightboxIndex(i); setDirection(0); setTimeout(() => setLightboxOpen(true), 0); }}
                  whileHover={{ scale: 1 }}
                >
                  <img src={img} alt={`Portfolio ${i+1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{ background: "rgba(255,255,255,0.85)" }}
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-editorial" style={{ color: "#0A0A0A", fontFamily: "'DM Sans', sans-serif" }}>
                      View
                    </span>
                  </motion.div>
                </motion.div>
              ))}

              {/* Locked tiles */}
              {!artist.isPremium && Array.from({ length: 2 }).map((_, i) => (
                <motion.div
                  key={`locked-${i}`}
                  onClick={() => setShowUpgrade(true)}
                  whileHover={{ opacity: 0.7 }}
                  className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                  style={{
                    aspectRatio: "1/1",
                    background: "var(--subtle)",
                    border: "1px dashed var(--strong)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: "var(--ink-4)" }}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span className="text-[9px] font-semibold uppercase tracking-editorial" style={{ color: "var(--ink-4)", fontFamily: "'DM Sans', sans-serif" }}>Premium</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.96)" }}
              onClick={closeLightbox}
            />

            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-50"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20 text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em" }}>
              {lightboxIndex + 1} / {portfolioItems.length}
            </div>

            {[
              { dir: -1, action: goPrev, pos: "left-4" },
              { dir:  1, action: goNext, pos: "right-4" },
            ].map(({ dir, action, pos }) => (
              <button
                key={dir}
                onClick={(e) => { e.stopPropagation(); action(); }}
                className={`absolute ${pos} z-20 w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-50`}
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d={dir > 0 ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"}/>
                </svg>
              </button>
            ))}

            <div className="relative z-10 max-w-3xl w-full px-16">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={lightboxIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                  src={portfolioItems[lightboxIndex]}
                  alt={`Portfolio ${lightboxIndex + 1}`}
                  className="w-full object-contain"
                  style={{ maxHeight: "78vh" }}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2 max-w-sm overflow-x-auto scrollbar-hide px-4">
              {portfolioItems.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setDirection(i > lightboxIndex ? 1 : -1); setLightboxIndex(i); }}
                  className="flex-shrink-0 w-10 h-10 overflow-hidden transition-opacity"
                  style={{
                    opacity: i === lightboxIndex ? 1 : 0.4,
                    outline: i === lightboxIndex ? "2px solid rgba(255,255,255,0.8)" : "none",
                    outlineOffset: "2px",
                  }}
                >
                  <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showUpgrade && <UpgradeModal artist={artist} onClose={() => setShowUpgrade(false)} />}
    </>
  );
}