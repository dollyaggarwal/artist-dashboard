import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useArtists } from "../context/ArtistContext";

const NAV_LINKS = [
  { label: "Discover", to: "/" },
  { label: "Featured", to: "/featured" },
];

export default function Header() {
  const { darkMode, toggleDarkMode } = useArtists();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-300"
      style={{
        background: darkMode ? "rgba(12,12,12,0.92)" : "rgba(250,250,248,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex items-center justify-between h-[60px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            {/* Icon badge */}
            <div style={{
              width: "32px", height: "32px", borderRadius: "8px",
              background: "linear-gradient(135deg, #D4651A 0%, #C4501A 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(196,80,26,0.30)",
              flexShrink: 0,
            }}>
              <span style={{ color: "#fff", fontSize: "14px", fontWeight: 800, fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.02em" }}>A</span>
            </div>
            {/* Wordmark */}
            <span className="font-serif text-xl" style={{ letterSpacing: "0.04em" }}>
              <span style={{ color: "var(--ink)", fontWeight: 600 }}>Arti</span><span style={{ color: "#C4501A", fontWeight: 600 }}>sta</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative text-xs font-semibold uppercase tracking-editorial transition-colors duration-200"
                  style={{ color: active ? "var(--ink)" : "var(--ink-3)" }}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-[20px] left-0 right-0"
                      style={{ height: "1px", background: "var(--ink)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Dark mode */}
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
              className="w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-50"
              style={{ color: "var(--ink-3)" }}
            >
              {darkMode ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Upgrade CTA */}
            <Link
              to="/featured"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-editorial transition-opacity hover:opacity-85"
              style={{
                background: "linear-gradient(135deg, #D4651A 0%, #C4501A 100%)",
                color: "#FFFFFF",
                fontFamily: "'DM Sans', sans-serif",
                borderRadius: "20px",
                boxShadow: "0 2px 10px rgba(196,80,26,0.28)",
                letterSpacing: "0.08em",
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              Upgrade
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden w-8 h-8 flex items-center justify-center"
              onClick={() => setMenuOpen((v) => !v)}
              style={{ color: "var(--ink)" }}
            >
              {menuOpen ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3 12h18M3 6h18M3 18h18"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="text-xs font-semibold uppercase tracking-editorial py-2.5 px-3 transition-colors"
                  style={{ color: location.pathname === link.to ? "var(--ink)" : "var(--ink-3)" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/featured"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 w-full py-3 text-[11px] font-semibold uppercase tracking-editorial"
                style={{
                  background: "linear-gradient(135deg, #D4651A 0%, #C4501A 100%)",
                  color: "#FFFFFF", borderRadius: "20px",
                  boxShadow: "0 2px 8px rgba(196,80,26,0.25)",
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                Upgrade
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}