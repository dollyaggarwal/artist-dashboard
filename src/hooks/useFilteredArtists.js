import { useMemo } from "react";

/**
 * Filters and sorts artists based on search query, category, and sort option.
 * Premium artists are always listed first (priority listing feature).
 */
export function useFilteredArtists(artists, { search, category, sortBy }) {
  return useMemo(() => {
    let result = [...artists];

    // Search: match name or location (case-insensitive)
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.location.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (category && category !== "All") {
      result = result.filter((a) => a.art_category === category);
    }

    // Sort
    switch (sortBy) {
      case "followers_desc":
        result.sort((a, b) => b.followers - a.followers);
        break;
      case "name_asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    // Premium artists always appear first (priority listing)
    result.sort((a, b) => (b.isPremium ? 1 : 0) - (a.isPremium ? 1 : 0));

    return result;
  }, [artists, search, category, sortBy]);
}
