import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useArtists } from "../context/ArtistContext";

const STEP = { PLAN: "plan", PAYMENT: "payment", PROCESSING: "processing", SUCCESS: "success" };

const FEATURES = [
  { icon: "⭐", label: "Priority Listing",   desc: "Appear first in every search" },
  { icon: "🖼",  label: "Full Portfolio",     desc: "Showcase up to 6 artworks" },
  { icon: "🎨", label: "Custom Banner",      desc: "Hero banner on your profile" },
  { icon: "🔗", label: "Website Link",       desc: "Link your external portfolio" },
  { icon: "✨", label: "Homepage Spotlight", desc: "Curated discovery section" },
  { icon: "🏅", label: "Premium Ribbon",     desc: "Permanent badge on your card" },
];

const STEPS_META = [
  { id: STEP.PLAN,    label: "Plan" },
  { id: STEP.PAYMENT, label: "Payment" },
];

function StepDot({ active, done }) {
  return (
    <div style={{
      width: 8, height: 8, borderRadius: "50%",
      background: done ? "#D4651A" : active ? "#D4651A" : "#D8D5CE",
      transition: "background 0.3s",
      boxShadow: active ? "0 0 0 3px rgba(212,101,26,0.2)" : "none",
    }} />
  );
}

function Input({ label, placeholder, value, onChange, type = "text", mono = false, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{
        display: "block", marginBottom: "5px",
        fontSize: "10px", fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.18em", color: focused ? "#D4651A" : "#6A6A6A",
        fontFamily: "'DM Sans', sans-serif", transition: "color 0.15s",
      }}>{label}</label>
      <input
        type={type} placeholder={placeholder} value={value} onChange={onChange}
        onFocus={e => { setFocused(true); e.target.style.borderColor = "#D4651A"; e.target.style.boxShadow = "0 0 0 3px rgba(212,101,26,0.12)"; }}
        onBlur={e => { setFocused(false); e.target.style.borderColor = error ? "#E53E3E" : "#D8D5CE"; e.target.style.boxShadow = "none"; }}
        style={{
          width: "100%", padding: "10px 13px",
          border: `1.5px solid ${error ? "#E53E3E" : "#D8D5CE"}`,
          borderRadius: "8px", background: "#FAFAF8", color: "#0A0A0A",
          fontSize: "13px", outline: "none", transition: "border-color 0.15s, box-shadow 0.15s",
          fontFamily: mono ? "'JetBrains Mono', monospace" : "'DM Sans', sans-serif",
        }}
      />
      {error && <p style={{ fontSize: "10px", color: "#E53E3E", marginTop: "4px", fontFamily: "'DM Sans', sans-serif" }}>{error}</p>}
    </div>
  );
}

export default function UpgradeModal({ artist, onClose, isWelcome = false }) {
  const { upgradeArtist } = useArtists();
  const [step, setStep] = useState(STEP.PLAN);
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!card.name.trim()) e.name = "Required";
    if (card.number.replace(/\s/g, "").length < 16) e.number = "Enter valid card number";
    if (card.expiry.length < 5) e.expiry = "MM/YY";
    if (card.cvv.length < 3) e.cvv = "CVV";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handlePay = () => {
    if (!validate()) return;
    setStep(STEP.PROCESSING);
    setTimeout(() => {
      if (artist) upgradeArtist(artist.id);
      setStep(STEP.SUCCESS);
      if (artist) toast.success(`${artist.name} is now Premium! 🎉`);
    }, 2000);
  };

  const fmtCard = v => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const fmtExp  = v => { const c = v.replace(/\D/g,"").slice(0,4); return c.length>=3?`${c.slice(0,2)}/${c.slice(2)}`:c; };

  const artistFirst = artist?.name?.split(" ")[0] || "your profile";
  const isPayStep = step === STEP.PAYMENT;
  const isPlan = step === STEP.PLAN;

  return (
    <AnimatePresence>
      <motion.div
        style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "70px 16px 16px" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          style={{ position: "fixed", inset: 0, background: "rgba(10,10,10,0.82)", backdropFilter: "blur(6px)" }}
          onClick={step !== STEP.PROCESSING ? onClose : undefined}
        />

        {/* Card */}
        <motion.div
          initial={{ scale: 0.93, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative", zIndex: 1,
            width: "100%", maxWidth: "640px",
            background: "#fff", borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >

          {/* ── Dark gradient header ── */}
          {(isPlan || isPayStep) && (
            <div style={{
              background: "linear-gradient(135deg, #0A0A0A 0%, #1C1008 60%, #2A1205 100%)",
              padding: "28px 28px 24px",
              position: "relative", overflow: "hidden",
            }}>
              {/* Decorative glow orbs */}
              <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,101,26,0.35) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -20, left: 40, width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,101,26,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />

              {/* Step indicator */}
              {isPayStep && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                  {STEPS_META.map((s, i) => (
                    <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <StepDot active={step === s.id} done={step === STEP.PAYMENT && i === 0} />
                      <span style={{ fontSize: "10px", fontWeight: 600, color: step === s.id ? "#D4651A" : "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.12em" }}>{s.label}</span>
                      {i < STEPS_META.length - 1 && <div style={{ width: "20px", height: "1px", background: "rgba(255,255,255,0.2)" }} />}
                    </div>
                  ))}
                </div>
              )}

              {isWelcome && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 10px", borderRadius: "20px", background: "rgba(212,101,26,0.2)", border: "1px solid rgba(212,101,26,0.4)", marginBottom: "10px" }}>
                  <span style={{ fontSize: "11px" }}>✨</span>
                  <span style={{ fontSize: "9px", fontWeight: 700, color: "#F0A060", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.12em" }}>Welcome to Artista</span>
                </div>
              )}

              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: "9px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif", marginBottom: "4px" }}>
                    {isPlan ? "Premium Membership" : "Secure Checkout"}
                  </p>
                  <h2 className="font-serif" style={{ fontSize: isPlan ? "clamp(22px,3vw,30px)" : "22px", fontWeight: 700, color: "#fff", lineHeight: 1.1, margin: 0 }}>
                    {isPlan ? (isWelcome ? "Unlock Premium" : `Upgrade ${artistFirst}`) : "Payment Details"}
                  </h2>
                  {isPlan && (
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif", marginTop: "4px" }}>
                      Everything you need to stand out
                    </p>
                  )}
                </div>
                {isPlan && (
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div className="font-serif" style={{ fontSize: "28px", fontWeight: 800, color: "#fff", lineHeight: 1 }}>$9.99</div>
                    <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>/ month</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Body ── */}
          <div style={{ padding: "24px 28px 28px" }}>

            {/* PLAN STEP */}
            {isPlan && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                {/* Feature grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
                  {FEATURES.map((f, i) => (
                    <motion.div
                      key={f.label}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, type: "spring", stiffness: 300, damping: 22 }}
                      whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(212,101,26,0.10)", borderColor: "rgba(212,101,26,0.3)" }}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: "10px",
                        padding: "10px 12px", borderRadius: "4px",
                        border: "1.5px solid #EDE9E3", background: "#FAFAF8",
                        cursor: "default", transition: "all 0.18s",
                      }}
                    >
                      <span style={{ fontSize: "16px", lineHeight: 1, flexShrink: 0, marginTop: "1px" }}>{f.icon}</span>
                      <div>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: "#0A0A0A", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.2 }}>{f.label}</div>
                        <div style={{ fontSize: "9px", color: "#9A9A92", fontFamily: "'DM Sans', sans-serif", marginTop: "2px", lineHeight: 1.3 }}>{f.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Trust row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "16px" }}>
                  {["🔒 Secure", "↩ Cancel anytime", "⚡ Instant access"].map(t => (
                    <span key={t} style={{ fontSize: "10px", color: "#9A9A92", fontFamily: "'DM Sans', sans-serif" }}>{t}</span>
                  ))}
                </div>

                <button
                  onClick={() => setStep(STEP.PAYMENT)}
                  style={{
                    width: "100%", padding: "14px",
                    background: "linear-gradient(135deg, #D4651A, #C4501A)",
                    color: "#fff", border: "none", borderRadius: "4px",
                    fontSize: "12px", fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.14em", fontFamily: "'DM Sans', sans-serif",
                    cursor: "pointer", boxShadow: "0 4px 18px rgba(196,80,26,0.4)",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(196,80,26,0.45)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(196,80,26,0.4)"; }}
                >
                  Continue to Payment →
                </button>
              </motion.div>
            )}

            {/* PAYMENT STEP */}
            {isPayStep && (
              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.22 }}>
                <button onClick={() => setStep(STEP.PLAN)} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "18px", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#9A9A9A", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", padding: 0 }}>
                  ← Back
                </button>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
                  <Input label="Cardholder Name" placeholder="Jane Doe" value={card.name}
                    onChange={e => setCard(p => ({...p, name: e.target.value}))} error={errors.name} />
                  <Input label="Card Number" placeholder="4242 4242 4242 4242" value={card.number}
                    onChange={e => setCard(p => ({...p, number: fmtCard(e.target.value)}))} mono error={errors.number} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <Input label="Expiry" placeholder="MM / YY" value={card.expiry}
                      onChange={e => setCard(p => ({...p, expiry: fmtExp(e.target.value)}))} mono error={errors.expiry} />
                    <Input label="CVV" placeholder="•••" value={card.cvv} type="password"
                      onChange={e => setCard(p => ({...p, cvv: e.target.value.replace(/\D/g,"").slice(0,4)}))} mono error={errors.cvv} />
                  </div>
                </div>

                {/* Order summary */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", borderRadius: "4px", background: "#F5F3EF", marginBottom: "14px" }}>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#0A0A0A", fontFamily: "'DM Sans', sans-serif" }}>Premium Artist Plan</div>
                    <div style={{ fontSize: "10px", color: "#9A9A9A", fontFamily: "'DM Sans', sans-serif", marginTop: "1px" }}>Billed monthly · Cancel anytime</div>
                  </div>
                  <div className="font-serif" style={{ fontSize: "18px", fontWeight: 700, color: "#0A0A0A" }}>$9.99</div>
                </div>

                <button
                  onClick={handlePay}
                  style={{
                    width: "100%", padding: "14px",
                    background: "linear-gradient(135deg, #D4651A, #C4501A)",
                    color: "#fff", border: "none", borderRadius: "4px",
                    fontSize: "12px", fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.14em", fontFamily: "'DM Sans', sans-serif",
                    cursor: "pointer", boxShadow: "0 4px 18px rgba(196,80,26,0.4)",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(196,80,26,0.45)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(196,80,26,0.4)"; }}
                >
                  🔒 Pay $9.99 — Unlock Premium
                </button>
                <p style={{ textAlign: "center", marginTop: "10px", fontSize: "10px", color: "#B0ADA8", fontFamily: "'DM Sans', sans-serif" }}>
                  Simulated payment — no real charge
                </p>
              </motion.div>
            )}

            {/* PROCESSING */}
            {step === STEP.PROCESSING && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "52px 0", gap: "20px" }}>
                <div style={{ position: "relative", width: "52px", height: "52px" }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "3px solid #F0EDE8" }} />
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "3px solid transparent", borderTopColor: "#D4651A", animation: "spin 0.75s linear infinite" }} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p className="font-serif" style={{ fontSize: "20px", fontWeight: 600, color: "#0A0A0A", marginBottom: "4px" }}>Unlocking Premium…</p>
                  <p style={{ fontSize: "12px", color: "#9A9A9A", fontFamily: "'DM Sans', sans-serif" }}>Setting up your artist profile</p>
                </div>
              </div>
            )}

            {/* SUCCESS */}
            {step === STEP.SUCCESS && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ textAlign: "center", padding: "36px 8px" }}
              >
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 18 }}
                  style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg, #D4651A, #C4501A)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 8px 24px rgba(196,80,26,0.4)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </motion.div>
                <h2 className="font-serif" style={{ fontSize: "28px", fontWeight: 700, color: "#0A0A0A", marginBottom: "8px" }}>You're Premium! 🎉</h2>
                <p style={{ fontSize: "13px", color: "#6A6A6A", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, marginBottom: "28px" }}>
                  <strong style={{ color: "#0A0A0A" }}>{artist?.name || "Your profile"}</strong> is now unlocked with all premium features.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "24px" }}>
                  {["Priority listing", "Full portfolio", "Gold badge"].map(f => (
                    <div key={f} style={{ padding: "8px 6px", borderRadius: "8px", background: "#FFF5EE", border: "1px solid #F0D5C0" }}>
                      <div style={{ fontSize: "9px", fontWeight: 700, color: "#C4501A", fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>✓ {f}</div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={onClose}
                  style={{
                    width: "100%", padding: "13px",
                    background: "linear-gradient(135deg, #D4651A, #C4501A)",
                    color: "#fff", border: "none", borderRadius: "4px",
                    fontSize: "12px", fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif",
                    cursor: "pointer", boxShadow: "0 4px 18px rgba(196,80,26,0.4)",
                  }}
                >
                  Explore Your Profile →
                </button>
              </motion.div>
            )}
          </div>

          {/* Close button */}
          {step !== STEP.PROCESSING && (
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: "16px", right: "16px", zIndex: 20,
                width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)",
                borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)",
                cursor: "pointer", color: "#fff", transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </motion.div>
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </AnimatePresence>
  );
}