export function formatFollowers(count) {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000)     return `${(count / 1_000).toFixed(1)}K`;
  return String(count);
}

// Editorial uppercase sans-serif category labels — no color fills, just text styling
export function getCategoryStyle(category) {
  const base = "text-[10px] font-semibold uppercase tracking-editorial";
  return base;
}

// Minimal single dot accent per category (used as small indicator only)
export function getCategoryDot(category) {
  const map = {
    Painter:         "#0A0A0A",
    Photographer:    "#0A0A0A",
    "Digital Artist":"#0A0A0A",
    Illustrator:     "#0A0A0A",
    Sculptor:        "#0A0A0A",
  };
  return map[category] || "#0A0A0A";
}

// Legacy support — return a minimal style for any existing getCategoryColor calls
export function getCategoryColor(category) {
  return "text-[10px] font-semibold uppercase tracking-editorial";
}
