import { useState, useCallback, useEffect } from "react";

const PAGE_SIZE = 8;

/**
 * Handles pagination logic.
 * Resets to page 1 whenever the filtered list changes.
 */
export function usePagination(items) {
  const [page, setPage] = useState(1);

  // Reset page when items list changes (new search/filter)
  useEffect(() => {
    setPage(1);
  }, [items]);

  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const paginatedItems = items.slice(0, page * PAGE_SIZE);
  const hasMore = page < totalPages;

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  return { paginatedItems, hasMore, loadMore, page, totalPages };
}
