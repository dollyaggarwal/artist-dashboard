import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft, FiMapPin, FiUsers, FiInstagram, FiTwitter,
  FiGlobe, FiStar, FiZap, FiExternalLink, FiX, FiChevronLeft,
  FiChevronRight, FiZoomIn,
} from "react-icons/fi";
import { useArtists } from "../context/ArtistContext";
import { formatFollowers, getCategoryColor } from "../utils/formatters";
import UpgradeModal from "../components/UpgradeModal";

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getArtistById } = useArtists();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [rippleOrigin, setRippleOrigin] = useState({ x: 0, y: 0 });
  const [rippleActive, setRippleActive] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const [direction, setDirection] = useState(0); // -1 prev, 1 next

  const artist = getArtistById(id);
  const portfolioItems = artist
    ? artist.isPremium
      ? artist.portfolio
      : artist.portfolio.slice(0, 4)
    : [];

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, lightboxIndex]);

  const openLightbox = useCallback((index, e) => {
    // Capture click position for ripple origin
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRippleOrigin({ x, y });
    setRippleActive(true);
    setLightboxIndex(index);
    setZoomed(false);

    // Delay lightbox open to let ripple play
    setTimeout(() => {
      setRippleActive(false);
      setLightboxOpen(true);
    }, 420);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setZoomed(false);
    setTimeout(() => setLightboxIndex(null), 300);
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setZoomed(false);
    setLightboxIndex((i) => (i + 1) % portfolioItems.length);
  }, [portfolioItems.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setZoomed(false);
    setLightboxIndex((i) => (i - 1 + portfolioItems.length) % portfolioItems.length);
  }, [portfolioItems.length]);

  if (!artist) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-5xl">🔍</p>
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">Artist not found</h2>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-semibold text-sm"
        >
          Back
        </button>
      </div>
    );
  }

  // Slide variants for image navigation
  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.92 }),
  };

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 group transition-colors"
        >
          <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        {/* Banner */}
        <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden mb-6 shadow-md">
          {artist.isPremium ? (
            <img src={artist.banner} alt="Profile banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-100 via-pink-100 to-violet-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {!artist.isPremium && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setShowUpgrade(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 dark:bg-gray-900/90 text-orange-500 font-semibold text-sm shadow hover:shadow-md transition-all"
              >
                <FiZap size={14} /> Add Custom Banner
              </button>
            </div>
          )}
        </div>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-end mb-8 -mt-16 px-4 relative z-10">
          <img
            src={artist.profile_image}
            alt={artist.name}
            className="w-24 h-24 rounded-2xl border-4 border-white dark:border-gray-950 shadow-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">{artist.name}</h1>
              {artist.isPremium && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold shadow">
                  <FiStar size={10} fill="white" /> Premium
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(artist.art_category)}`}>
                {artist.art_category}
              </span>
              <span className="flex items-center gap-1"><FiMapPin size={13} /> {artist.location}</span>
              <span className="flex items-center gap-1">
                <FiUsers size={13} />
                <strong className="text-gray-700 dark:text-gray-200">{formatFollowers(artist.followers)}</strong> followers
              </span>
            </div>
          </div>
          {!artist.isPremium ? (
            <button
              onClick={() => setShowUpgrade(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold text-sm shadow-lg hover:opacity-90 transition-opacity"
            >
              <FiZap size={14} /> Upgrade Profile
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-sm font-semibold">
              <FiStar size={14} fill="currentColor" /> Premium Active
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Bio + Socials */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">About</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{artist.bio}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Social Links</h2>
              <div className="space-y-2.5">
                <a href={artist.social_links.instagram} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-pink-500 transition-colors">
                  <FiInstagram size={16} /> Instagram
                </a>
                <a href={artist.social_links.twitter} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-sky-500 transition-colors">
                  <FiTwitter size={16} /> Twitter / X
                </a>
                {artist.isPremium && (
                  <a href={artist.social_links.website} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 text-sm text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                    <FiGlobe size={16} /> Website <FiExternalLink size={12} />
                  </a>
                )}
              </div>
              {!artist.isPremium && (
                <button onClick={() => setShowUpgrade(true)}
                  className="mt-3 flex items-center gap-1.5 text-xs text-gray-400 hover:text-orange-500 transition-colors">
                  <FiZap size={11} /> Unlock website link with Premium
                </button>
              )}
            </div>
          </div>

          {/* Right: Portfolio Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Portfolio</h2>
                {!artist.isPremium && (
                  <button onClick={() => setShowUpgrade(true)}
                    className="flex items-center gap-1 text-xs text-orange-500 font-semibold hover:text-orange-600">
                    <FiZap size={11} /> Unlock full gallery
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {portfolioItems.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, type: "spring", stiffness: 200 }}
                    onHoverStart={() => setHoveredIndex(i)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    className="aspect-square rounded-xl overflow-hidden cursor-pointer relative shadow-sm"
                    onClick={(e) => openLightbox(i, e)}
                    whileHover={{ scale: 1.03, zIndex: 10 }}
                    whileTap={{ scale: 0.96 }}
                    style={{ position: "relative" }}
                  >
                    <img
                      src={img}
                      alt={`Portfolio ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700"
                      style={{ transform: hoveredIndex === i ? "scale(1.1)" : "scale(1)" }}
                      loading="lazy"
                    />

                    {/* Hover overlay */}
                    <AnimatePresence>
                      {hoveredIndex === i && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col items-center justify-end pb-3 gap-1"
                        >
                          <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.05 }}
                            className="flex items-center gap-1.5 text-white text-xs font-semibold"
                          >
                            <FiZoomIn size={13} /> View
                          </motion.div>
                          {/* Shimmer line */}
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                            className="h-0.5 w-10 rounded-full bg-gradient-to-r from-orange-400 to-pink-500"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Click ripple effect */}
                    {rippleActive && lightboxIndex === i && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0.7 }}
                        animate={{ scale: 6, opacity: 0 }}
                        transition={{ duration: 0.42, ease: "easeOut" }}
                        className="absolute rounded-full bg-white/60 w-12 h-12 pointer-events-none"
                        style={{
                          left: rippleOrigin.x - 24,
                          top: rippleOrigin.y - 24,
                        }}
                      />
                    )}

                    {/* Index badge */}
                    <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-black/40 text-white text-xs flex items-center justify-center font-bold backdrop-blur-sm">
                      {i + 1}
                    </div>
                  </motion.div>
                ))}

                {/* Locked premium tiles */}
                {!artist.isPremium &&
                  Array.from({ length: 2 }).map((_, i) => (
                    <motion.div
                      key={`locked-${i}`}
                      onClick={() => setShowUpgrade(true)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all group"
                    >
                      <FiZap size={20} className="text-gray-300 dark:text-gray-600 group-hover:text-orange-400 transition-colors" />
                      <span className="text-xs text-gray-400 group-hover:text-orange-400 font-medium transition-colors">Premium</span>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxOpen && lightboxIndex !== null && (
          <motion.div
            key="lightbox-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Blurred backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              onClick={closeLightbox}
            />

            {/* Close */}
            <motion.button
              onClick={closeLightbox}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: 0.15 }}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-sm border border-white/10"
            >
              <FiX size={18} />
            </motion.button>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="absolute top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
            >
              <span className="text-white/60 text-sm font-medium">
                {lightboxIndex + 1} / {portfolioItems.length}
              </span>
            </motion.div>

            {/* Prev button */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.15 }}
              className="absolute left-4 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all backdrop-blur-sm border border-white/10 hover:scale-110"
            >
              <FiChevronLeft size={22} />
            </motion.button>

            {/* Next button */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.15 }}
              className="absolute right-4 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all backdrop-blur-sm border border-white/10 hover:scale-110"
            >
              <FiChevronRight size={22} />
            </motion.button>

            {/* Main Image with slide animation */}
            <div className="relative z-10 max-w-3xl w-full px-16 flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={lightboxIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                  className="relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Glow behind image */}
                  <div
                    className="absolute inset-0 rounded-2xl blur-3xl opacity-30 scale-95"
                    style={{ background: "radial-gradient(circle, #f97316, #ec4899, transparent)" }}
                  />

                  <motion.img
                    src={portfolioItems[lightboxIndex]}
                    alt={`Portfolio ${lightboxIndex + 1}`}
                    className="relative rounded-2xl shadow-2xl max-h-[75vh] object-contain cursor-zoom-in"
                    style={{
                      maxWidth: "100%",
                      transform: zoomed ? "scale(1.6)" : "scale(1)",
                      transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      cursor: zoomed ? "zoom-out" : "zoom-in",
                    }}
                    onClick={() => setZoomed((z) => !z)}
                    drag={zoomed ? "x" : false}
                    dragConstraints={{ left: -200, right: 200 }}
                  />

                  {/* Zoom hint */}
                  {!zoomed && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="absolute bottom-3 right-3 flex items-center gap-1 text-white/50 text-xs bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm"
                    >
                      <FiZoomIn size={11} /> Click to zoom
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
            >
              {portfolioItems.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setDirection(i > lightboxIndex ? 1 : -1); setLightboxIndex(i); setZoomed(false); }}
                  animate={{ scale: i === lightboxIndex ? 1.4 : 1, opacity: i === lightboxIndex ? 1 : 0.4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-1.5 h-1.5 rounded-full bg-white"
                />
              ))}
            </motion.div>

            {/* Thumbnail strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 flex gap-2 max-w-sm overflow-x-auto scrollbar-hide px-4"
            >
              {portfolioItems.map((img, i) => (
                <motion.button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setDirection(i > lightboxIndex ? 1 : -1); setLightboxIndex(i); setZoomed(false); }}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ opacity: i === lightboxIndex ? 1 : 0.45, scale: i === lightboxIndex ? 1.08 : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-colors"
                  style={{ borderColor: i === lightboxIndex ? "#f97316" : "transparent" }}
                >
                  <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <UpgradeModal artist={artist} onClose={() => setShowUpgrade(false)} />
      )}
    </>
  );
}

// Slide variants defined outside component for performance
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 280 : -280, opacity: 0, scale: 0.94 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -280 : 280, opacity: 0, scale: 0.94 }),
};
