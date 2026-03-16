import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PromoTab({ autoOpen = false, onAutoClose }) {
  const [open, setOpen] = useState(false);

  // Auto-open when triggered from WelcomeModal
  useEffect(() => {
    if (autoOpen) setOpen(true);
  }, [autoOpen]);

  const handleClose = () => {
    setOpen(false);
    if (onAutoClose) onAutoClose();
  };

  return (
    <>
      {/* Vertical sticky tab — always visible */}
      <div
        className="fixed right-0 top-1/2 z-50 -translate-y-1/2 cursor-pointer select-none"
        onClick={() => setOpen(true)}
        style={{ writingMode: "vertical-rl" }}
      >
        <div
          className="flex items-center gap-0 px-2.5 py-4 text-[11px] font-semibold tracking-editorial uppercase transition-all duration-200 hover:px-4"
          style={{
            background: "var(--promo-bg, #0A0A0A)",
            color: "var(--promo-text, #fff)",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.18em",
          }}
        >
          GET 10% OFF
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{ background: "rgba(0,0,0,0.65)" }}
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Split modal */}
            <motion.div
              className="relative z-10 flex w-full max-w-3xl overflow-hidden"
              style={{ height: "520px", background: "white" }}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-50"
                style={{ color: "#0A0A0A" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Left: Content */}
              <div className="flex flex-col justify-center px-12 py-14 w-1/2 flex-shrink-0" style={{ background: "#fff" }}>
                <p className="text-xs uppercase mb-3"
                  style={{ letterSpacing: "0.25em", color: "#9A9A9A", fontFamily: "'DM Sans', sans-serif" }}>
                  Exclusive Offer
                </p>
                <h2 className="font-serif leading-none mb-1"
                  style={{ fontSize: "18px", color: "#0A0A0A", fontWeight: 400 }}>
                  Unlock
                </h2>
                <h1 className="font-serif leading-none mb-2"
                  style={{ fontSize: "60px", fontWeight: 800, color: "#0A0A0A", lineHeight: 1 }}>
                  10% Off
                </h1>
                <p className="font-serif mb-8"
                  style={{ fontSize: "22px", fontWeight: 400, color: "#0A0A0A", letterSpacing: "0.02em" }}>
                  Original Art
                </p>

                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 text-sm mb-4 outline-none"
                  style={{
                    border: "1.5px solid #0A0A0A", borderRadius: 0,
                    fontFamily: "'DM Sans', sans-serif", color: "#0A0A0A", background: "#fff",
                  }}
                />

                <button
                  className="w-full py-3.5 text-xs font-semibold uppercase transition-opacity hover:opacity-80"
                  style={{
                    background: "#0A0A0A", color: "#fff", borderRadius: 0,
                    fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.2em",
                  }}
                  onClick={handleClose}
                >
                  Sign Up Now
                </button>

                <p className="text-center mt-4 text-[11px] leading-relaxed"
                  style={{ color: "#9A9A9A", fontFamily: "'DM Sans', sans-serif" }}>
                  By subscribing, I agree to the{" "}
                  <span className="underline cursor-pointer">Terms of Use</span>{" "}
                  and acknowledge that my information will be used as described in the{" "}
                  <span className="underline cursor-pointer">Privacy Notice</span>.
                </p>
              </div>

              {/* Right: Art Image */}
              <div className="flex-1 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&q=90"
                  alt="Original Art"
                  className="w-full h-full object-cover"
                  style={{ display: "block", objectPosition: "center center" }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to right, rgba(255,255,255,0.18) 0%, transparent 30%)",
                  pointerEvents: "none",
                }} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}