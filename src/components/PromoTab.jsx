import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PromoTab({ autoOpen = false, onAutoClose }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    if (autoOpen) setOpen(true);
  }, [autoOpen]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = () => {
    setOpen(false);
    if (onAutoClose) onAutoClose();
  };

  return (
    <>
      {/* Sticky vertical tab */}
      <div
        className="fixed right-0 top-1/2 z-50 -translate-y-1/2 cursor-pointer select-none"
        onClick={() => setOpen(true)}
        style={{ writingMode: "vertical-rl" }}
      >
        <div
          className="px-2.5 py-4 text-[10px] font-bold uppercase transition-all duration-200 hover:py-6"
          style={{
            background: "#0A0A0A", color: "#fff",
            letterSpacing: "0.2em", fontFamily: "'DM Sans', sans-serif",
          }}
        >
          GET 10% OFF
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ padding: isMobile ? "0" : "16px" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.72)" }}
              onClick={handleClose} />

            {/* Card */}
            <motion.div
              className="relative z-10 bg-white overflow-hidden"
              style={{
                width: isMobile ? "88vw" : "780px",
                maxWidth: isMobile ? "360px" : "780px",
                maxHeight: isMobile ? "88vh" : "560px",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
              }}
              initial={{ scale: 0.95, opacity: 0, y: 14 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 14 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Close btn */}
              <button onClick={handleClose}
                className="absolute top-3 right-3 z-30 flex items-center justify-center"
                style={{
                  width: 30, height: 30,
                  background: "rgba(255,255,255,0.95)",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: "50%", color: "#0A0A0A",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* ── LEFT / TOP: Content ── */}
              <div
                style={{
                  width: isMobile ? "100%" : "50%",
                  flexShrink: 0,
                  padding: isMobile ? "20px 20px 20px" : "48px 52px",
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  overflowY: "auto",
                }}>

                {/* Image strip — mobile only */}
                {isMobile && (
                  <div style={{
                    margin: "-20px -20px 14px -20px",
                    height: "110px", position: "relative", overflow: "hidden", flexShrink: 0,
                  }}>
                    <img
                      src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=320&fit=crop&q=80"
                      alt="Art"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%", display: "block" }}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(255,255,255,1) 95%)",
                    }} />
                    <span style={{
                      position: "absolute", top: 12, left: 16,
                      background: "#0A0A0A", color: "#fff",
                      fontSize: "9px", fontWeight: 700,
                      letterSpacing: "0.2em", textTransform: "uppercase",
                      padding: "3px 10px", fontFamily: "'DM Sans', sans-serif",
                    }}>
                      Exclusive Offer
                    </span>
                  </div>
                )}

                {!isMobile && (
                  <p style={{
                    fontSize: "11px", color: "#9A9A9A",
                    letterSpacing: "0.25em", textTransform: "uppercase",
                    fontFamily: "'DM Sans', sans-serif", marginBottom: "8px",
                  }}>
                    Exclusive Offer
                  </p>
                )}

                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? "13px" : "18px",
                  fontWeight: 400, color: "#0A0A0A", marginBottom: "1px",
                }}>
                  Unlock
                </p>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? "40px" : "64px",
                  fontWeight: 800, color: "#0A0A0A",
                  lineHeight: 1, marginBottom: "2px",
                }}>
                  10% Off
                </p>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? "15px" : "22px",
                  fontWeight: 400, color: "#0A0A0A",
                  marginBottom: isMobile ? "10px" : "24px",
                }}>
                  Original Art
                </p>

                {!isMobile && (
                  <p style={{
                    fontSize: "12px", color: "#6B6B6B", lineHeight: 1.65,
                    marginBottom: "20px", fontFamily: "'DM Sans', sans-serif",
                  }}>
                    Subscribe for exclusive discounts on premium artist upgrades and featured placements.
                  </p>
                )}

                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: "100%", padding: isMobile ? "10px 12px" : "12px 14px",
                    fontSize: "13px", outline: "none",
                    border: "1.5px solid #0A0A0A", borderRadius: 0,
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#0A0A0A", background: "#fff",
                    marginBottom: "8px", boxSizing: "border-box",
                  }}
                />

                <button
                  onClick={handleClose}
                  style={{
                    width: "100%",
                    padding: isMobile ? "10px" : "14px",
                    background: "#0A0A0A", color: "#fff",
                    fontSize: "10px", fontWeight: 700,
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    border: "none", borderRadius: 0, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    marginBottom: isMobile ? "8px" : "12px",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.82"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  Sign Up Now
                </button>

                <p style={{
                  textAlign: "center",
                  fontSize: "10px",
                  color: "#9A9A9A", lineHeight: 1.5,
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  By subscribing, I agree to the{" "}
                  <span style={{ textDecoration: "underline", cursor: "pointer" }}>Terms of Use</span>
                  {" "}and acknowledge that my information will be used as described in the{" "}
                  <span style={{ textDecoration: "underline", cursor: "pointer" }}>Privacy Notice</span>.
                </p>
              </div>

              {/* ── RIGHT: Art image — desktop only ── */}
              {!isMobile && (
                <div style={{ flex: 1, position: "relative", overflow: "hidden", minHeight: "460px" }}>
                  <img
                    src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&h=900&fit=crop&q=85"
                    alt="Original Art"
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: "center",
                      display: "block",
                    }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to right, rgba(255,255,255,0.15) 0%, transparent 28%)",
                    pointerEvents: "none",
                  }} />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}