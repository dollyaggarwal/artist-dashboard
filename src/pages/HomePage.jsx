import { useState } from "react";
import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";
import { useArtists } from "../context/ArtistContext";
import { useDebounce } from "../hooks/useDebounce";
import { useFilteredArtists } from "../hooks/useFilteredArtists";
import { usePagination } from "../hooks/usePagination";
import SearchFilters from "../components/SearchFilters";
import ArtistCard from "../components/ArtistCard";
import SkeletonCard from "../components/SkeletonCard";
import FeaturedBanner from "../components/FeaturedBanner";

const SKELETON_COUNT = 8;

export default function HomePage() {
  const { artists } = useArtists();

  // Filter / sort state — persisted in component state
  const [search, setSearch] = useState(() => sessionStorage.getItem("filter_search") || "");
  const [category, setCategory] = useState(() => sessionStorage.getItem("filter_category") || "All");
  const [sortBy, setSortBy] = useState(() => sessionStorage.getItem("filter_sort") || "followers_desc");

  // Persist filters to sessionStorage for the tab session
  const handleSetSearch = (v) => { setSearch(v); sessionStorage.setItem("filter_search", v); };
  const handleSetCategory = (v) => { setCategory(v); sessionStorage.setItem("filter_category", v); };
  const handleSetSortBy = (v) => { setSortBy(v); sessionStorage.setItem("filter_sort", v); };

  // Debounce search for performance
  const debouncedSearch = useDebounce(search, 350);

  // Loading simulation on first mount
  const [loading] = useState(() => {
    // Only show skeleton on first visit
    const seen = sessionStorage.getItem("visited");
    if (!seen) { sessionStorage.setItem("visited", "1"); return true; }
    return false;
  });
  const [showSkeleton, setShowSkeleton] = useState(loading);

  if (showSkeleton) {
    setTimeout(() => setShowSkeleton(false), 1000);
  }

  const filteredArtists = useFilteredArtists(artists, {
    search: debouncedSearch,
    category,
    sortBy,
  });

  const { paginatedItems, hasMore, loadMore } = usePagination(filteredArtists);

  const resultLabel =
    filteredArtists.length === artists.length
      ? `${artists.length} artists`
      : `${filteredArtists.length} of ${artists.length} artists`;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Discover Artists
        </h1>
        <p className="mt-1.5 text-gray-500 dark:text-gray-400 text-sm">
          Explore creatives from around the world
        </p>
      </div>

      {/* Featured Premium Section */}
      <FeaturedBanner artists={artists} />

      {/* Search & Filters */}
      <div className="mb-6">
        <SearchFilters
          search={search}
          setSearch={handleSetSearch}
          category={category}
          setCategory={handleSetCategory}
          sortBy={sortBy}
          setSortBy={handleSetSortBy}
        />
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
        Showing <span className="font-semibold text-gray-600 dark:text-gray-300">{resultLabel}</span>
        {category !== "All" && ` in ${category}`}
        {debouncedSearch && ` matching "${debouncedSearch}"`}
      </p>

      {/* Artist Grid */}
      {showSkeleton ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredArtists.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-5xl mb-4">🎨</p>
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">No artists found</h3>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {paginatedItems.map((artist, index) => (
              <ArtistCard key={artist.id} artist={artist} index={index} />
            ))}
          </div>

          {/* Load More / Infinite Scroll button */}
          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={loadMore}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:border-orange-400 hover:text-orange-500 transition-all"
              >
                <FiLoader size={15} />
                Load More Artists
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
