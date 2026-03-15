import { useState } from "react";
import { motion } from "framer-motion";
import { useArtists } from "../context/ArtistContext";
import { useDebounce } from "../hooks/useDebounce";
import { useFilteredArtists } from "../hooks/useFilteredArtists";
import { usePagination } from "../hooks/usePagination";
import SearchFilters from "../components/SearchFilters";
import ArtistCard from "../components/ArtistCard";
import SkeletonCard from "../components/SkeletonCard";
import FeaturedBanner from "../components/FeaturedBanner";
import HeroBanner from "../components/HeroBanner";

const SKELETON_COUNT = 8;

// Beautiful art-world background image
const GRID_BG = "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=1920&q=80";

export default function HomePage() {
  const { artists } = useArtists();

  const [search, setSearch]     = useState(() => sessionStorage.getItem("filter_search")   || "");
  const [category, setCategory] = useState(() => sessionStorage.getItem("filter_category") || "All");
  const [sortBy, setSortBy]     = useState(() => sessionStorage.getItem("filter_sort")     || "followers_desc");

  const set = (key, setter) => (v) => { setter(v); sessionStorage.setItem(key, v); };

  const debouncedSearch = useDebounce(search, 350);

  const [showSkeleton, setShowSkeleton] = useState(() => {
    const seen = sessionStorage.getItem("visited");
    if (!seen) { sessionStorage.setItem("visited", "1"); return true; }
    return false;
  });
  if (showSkeleton) setTimeout(() => setShowSkeleton(false), 1100);

  const filteredArtists = useFilteredArtists(artists, { search: debouncedSearch, category, sortBy });
  const { paginatedItems, hasMore, loadMore } = usePagination(filteredArtists);

  const resultLabel = filteredArtists.length === artists.length
    ? `${artists.length} Artists`
    : `${filteredArtists.length} of ${artists.length} Artists`;

  return (
    <main>
      {/* Full-width hero banner */}
      <HeroBanner />

      {/* ── Section with background art image ── */}
      <div className="relative">
        {/* Fixed background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage: `url(${GRID_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        {/* Colour + opacity tint over the bg — adapts to dark/light mode */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background: "var(--grid-tint)",
          }}
        />

        {/* Actual content sits on top */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 pb-16" style={{ zIndex: 2 }}>
          {/* Featured premium artists */}
          <FeaturedBanner artists={artists} />

          {/* Search & Filters — sticky */}
          <div
            id="discover-section"
            className="sticky z-40 -mx-6 sm:-mx-10 px-6 sm:px-10 py-4 mb-8"
            style={{
              top: "60px",
              background: "var(--grid-tint)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <SearchFilters
              search={search}     setSearch={set("filter_search", setSearch)}
              category={category} setCategory={set("filter_category", setCategory)}
              sortBy={sortBy}     setSortBy={set("filter_sort", setSortBy)}
            />
          </div>

          {/* Results meta */}
          <div className="flex items-center justify-between mb-6">
            <p style={{
              fontSize: "10px", fontWeight: 600, textTransform: "uppercase",
              letterSpacing: "0.18em", color: "var(--ink-4)", fontFamily: "'DM Sans', sans-serif",
            }}>
              {resultLabel}
              {category !== "All" && ` · ${category}`}
              {debouncedSearch && ` · "${debouncedSearch}"`}
            </p>
          </div>

          {/* Grid */}
          {showSkeleton ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: SKELETON_COUNT }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredArtists.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 gap-4"
            >
              <div className="w-12 h-12 flex items-center justify-center text-2xl"
                style={{ background: "var(--subtle)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                🎨
              </div>
              <h3 className="font-serif" style={{ fontSize: "20px", fontWeight: 500, color: "var(--ink)" }}>
                No artists found
              </h3>
              <p style={{ fontSize: "12px", color: "var(--ink-4)", fontFamily: "'DM Sans', sans-serif" }}>
                Try adjusting your search or category filter
              </p>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {paginatedItems.map((artist, index) => (
                  <ArtistCard key={artist.id} artist={artist} index={index} />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-14">
                  <button
                    onClick={loadMore}
                    className="px-8 py-3.5 text-[10px] font-semibold uppercase tracking-editorial"
                    style={{
                      background: "transparent", color: "var(--ink)",
                      border: "1px solid var(--ink)", borderRadius: "4px",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "background 0.2s, color 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--ink)"; }}
                  >
                    Load More Artists
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}