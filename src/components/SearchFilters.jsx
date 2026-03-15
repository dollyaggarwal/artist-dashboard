import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SORT_LABELS = {
  followers_desc: "Most Followed",
  name_asc:       "A–Z",
  name_desc:      "Z–A",
};

function SortDropdown({ sortBy, setSortBy }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", flexShrink: 0 }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: "flex", alignItems: "center", gap: "7px",
          padding: "9px 14px", borderRadius: "999px",
          border: open ? "1.5px solid #0A0A0A" : "1.5px solid var(--border)",
          background: open ? "#0A0A0A" : "var(--surface)",
          color: open ? "#fff" : "var(--ink)",
          fontSize: "12px", fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.02em",
          cursor: "pointer", whiteSpace: "nowrap",
          transition: "all 0.15s",
          boxShadow: open ? "0 4px 16px rgba(0,0,0,0.18)" : "none",
        }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.borderColor = "var(--strong)"; }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.borderColor = "var(--border)"; }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M3 6h18M7 12h10M11 18h2"/>
        </svg>
        {SORT_LABELS[sortBy]}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: "inline-block", fontSize: "10px", lineHeight: 1 }}
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", right: 0, top: "calc(100% + 8px)",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.14)",
              overflow: "hidden", zIndex: 100,
              minWidth: "160px",
            }}
          >
            {Object.entries(SORT_LABELS).map(([val, label]) => (
              <button
                key={val}
                onClick={() => { setSortBy(val); setOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", padding: "10px 16px",
                  background: val === sortBy ? "var(--subtle)" : "transparent",
                  border: "none", cursor: "pointer",
                  fontSize: "12px", fontWeight: val === sortBy ? 700 : 500,
                  color: val === sortBy ? "#C4501A" : "var(--ink)",
                  fontFamily: "'DM Sans', sans-serif",
                  textAlign: "left",
                  transition: "background 0.12s",
                  borderBottom: "1px solid var(--border)",
                }}
                onMouseEnter={e => { if (val !== sortBy) e.currentTarget.style.background = "var(--subtle)"; }}
                onMouseLeave={e => { if (val !== sortBy) e.currentTarget.style.background = "transparent"; }}
              >
                {label}
                {val === sortBy && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C4501A" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const CATEGORY_META = {
  All:             { icon: "✦",  label: "All Artists",  bg: "#0A0A0A", color: "#fff" },
  Painter:         { icon: "🎨", label: "Painters",     bg: "#1a1a2e", color: "#fff" },
  Photographer:    { icon: "📷", label: "Photographers",  bg: "#16213e", color: "#fff" },
  "Digital Artist":{ icon: "💻", label: "Digital Art",  bg: "#0f3460", color: "#fff" },
  Illustrator:     { icon: "✏️", label: "Illustration", bg: "#533483", color: "#fff" },
  Sculptor:        { icon: "🗿", label: "Sculpture",    bg: "#2d4a22", color: "#fff" },
};

function CategoryChip({ cat, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  const meta = CATEGORY_META[cat] || { icon: "✦", label: cat, bg: "#0A0A0A", color: "#fff" };

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.07, y: -3 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        padding: "9px 16px",
        borderRadius: "999px",
        border: active ? "none" : hovered ? "1.5px solid var(--strong)" : "1.5px solid var(--border)",
        background: active ? meta.bg : hovered ? "var(--subtle)" : "var(--surface)",
        color: active ? meta.color : "var(--ink)",
        fontSize: "12px",
        fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
        cursor: "pointer",
        flexShrink: 0,
        boxShadow: active
          ? "0 4px 16px rgba(0,0,0,0.22)"
          : hovered
          ? "0 4px 14px rgba(0,0,0,0.10)"
          : "none",
        transition: "background 0.15s, border 0.15s, color 0.15s, box-shadow 0.15s",
      }}
    >
      <span style={{ fontSize: "14px", lineHeight: 1 }}>{meta.icon}</span>
      <span>{meta.label}</span>
    </motion.button>
  );
}

export default function SearchFilters({ search, setSearch, category, setCategory, sortBy, setSortBy }) {
  const inputRef = useRef(null);

  return (
    <div className="space-y-5">
      {/* Search bar */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: "var(--ink-4)" }}
        >
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search artists by name or city…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-9 py-3 text-sm bg-transparent outline-none"
          style={{
            color: "var(--ink)",
            border: "none",
            borderBottom: "1px solid var(--strong)",
            borderRadius: 0,
            fontFamily: "'DM Sans', sans-serif",
          }}
          onFocus={(e) => { e.target.style.borderBottomColor = "var(--ink)"; }}
          onBlur={(e) => { e.target.style.borderBottomColor = "var(--strong)"; }}
        />
        {search && (
          <button
            onClick={() => { setSearch(""); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-50"
            style={{ color: "var(--ink-4)" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>

      {/* Category chips + Sort */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-hide flex-1 min-w-0 pb-1">
          {Object.keys(CATEGORY_META).map((cat) => (
            <CategoryChip
              key={cat}
              cat={cat}
              active={category === cat}
              onClick={() => setCategory(cat)}
            />
          ))}
        </div>

        <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
      </div>
    </div>
  );
}