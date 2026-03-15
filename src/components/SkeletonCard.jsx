export default function SkeletonCard() {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden" }}>
      <div className="skeleton" style={{ aspectRatio: "4/3" }} />
      <div style={{ padding: "14px 16px 16px" }}>
        <div className="skeleton" style={{ height: "9px", width: "38%", marginBottom: "8px", borderRadius: "4px" }} />
        <div className="skeleton" style={{ height: "17px", width: "70%", marginBottom: "6px", borderRadius: "4px" }} />
        <div className="skeleton" style={{ height: "11px", width: "50%", marginBottom: "14px", borderRadius: "4px" }} />
        <div style={{ paddingTop: "12px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="skeleton" style={{ height: "11px", width: "34%", borderRadius: "4px" }} />
          <div className="skeleton" style={{ height: "26px", width: "20%", borderRadius: "4px" }} />
        </div>
      </div>
    </div>
  );
}
