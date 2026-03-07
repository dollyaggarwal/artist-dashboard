import { useState, useEffect } from "react";

/**
 * Debounces a value by the specified delay.
 * Prevents excessive re-renders on rapid input changes (e.g. search).
 */
export function useDebounce(value, delay = 350) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
