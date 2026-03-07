/**
 * Formats a follower count into a readable string.
 * e.g. 12400 → "12.4K", 1200000 → "1.2M"
 */
export function formatFollowers(count) {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return String(count);
}

/**
 * Returns a CSS color class string for each art category badge.
 */
export function getCategoryColor(category) {
  const map = {
    Painter: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    Photographer: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    "Digital Artist": "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    Illustrator: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    Sculptor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  };
  return map[category] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
}
