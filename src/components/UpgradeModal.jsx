import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiZap, FiCheck, FiCreditCard, FiLock, FiStar } from "react-icons/fi";
import toast from "react-hot-toast";
import { useArtists } from "../context/ArtistContext";
import Aurora from "./animations/Aurora";
import Particles from "./animations/Particles";
import SpotlightButton from "./animations/SpotlightButton";
import MagneticButton from "./animations/MagneticButton";
import ShimmerText from "./animations/ShimmerText";

const STEP = { PLAN: "plan", PAYMENT: "payment", PROCESSING: "processing", SUCCESS: "success" };

const PREMIUM_FEATURES = [
  "Premium badge on artist card",
  "Priority listing — appear first in results",
  "Portfolio gallery expansion (6 artworks)",
  "Featured section on homepage",
  "Custom profile banner",
  "External website link unlocked",
];

export default function UpgradeModal({ artist, onClose }) {
  const { upgradeArtist } = useArtists();
  const [step, setStep] = useState(STEP.PLAN);
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [errors, setErrors] = useState({});

  const validateCard = () => {
    const newErrors = {};
    if (!cardDetails.name.trim()) newErrors.name = "Name is required";
    if (cardDetails.number.replace(/\s/g, "").length < 16) newErrors.number = "Enter valid card number";
    if (cardDetails.expiry.length < 5) newErrors.expiry = "Enter valid expiry";
    if (cardDetails.cvv.length < 3) newErrors.cvv = "Enter valid CVV";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayNow = () => {
    if (!validateCard()) return;
    setStep(STEP.PROCESSING);
    setTimeout(() => {
      upgradeArtist(artist.id);
      setStep(STEP.SUCCESS);
      toast.success(`${artist.name} is now a Premium artist!`);
    }, 2200);
  };

  const formatCardNumber = (val) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (val) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 4);
    return cleaned.length >= 3 ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}` : cleaned;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={step !== STEP.PROCESSING ? onClose : undefined}
        />

        <motion.div
          className="relative z-10 w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.88, y: 24, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.88, y: 24, opacity: 0 }}
          transition={{ type: "spring", damping: 22, stiffness: 260 }}
        >
          {step !== STEP.PROCESSING && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all z-20"
            >
              <FiX size={18} />
            </button>
          )}

          {/* STEP 1: Plan */}
          {step === STEP.PLAN && (
            <div>
              <div className="relative h-44 overflow-hidden">
                <Aurora colors={["#f97316", "#ec4899", "#8b5cf6"]} size={1.2} />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0">
                  <Particles count={30} color="#ffffff" speed={0.3} minSize={1} maxSize={2.5} connected={true} connectionDistance={70} />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-3 border border-white/30 shadow-lg"
                  >
                    <FiZap size={22} className="text-yellow-300" />
                  </motion.div>
                  <ShimmerText className="text-2xl font-black">Premium Artist Plan</ShimmerText>
                  <p className="text-white/70 text-sm mt-1">Unlock your full creative potential</p>
                  <div className="mt-2 flex items-end gap-1">
                    <span className="text-4xl font-black text-white">$9.99</span>
                    <span className="text-white/60 mb-1">/month</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Everything included</p>
                <ul className="space-y-3 mb-6">
                  {PREMIUM_FEATURES.map((f, i) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-200"
                    >
                      <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0">
                        <FiCheck size={11} className="text-green-500" />
                      </div>
                      {f}
                    </motion.li>
                  ))}
                </ul>

                <div data-cursor="upgrade" data-cursor-label="Upgrade Now">
                  <SpotlightButton
                    onClick={() => setStep(STEP.PAYMENT)}
                    className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2"
                  >
                    <FiZap size={15} /> Proceed to Payment
                  </SpotlightButton>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Payment */}
          {step === STEP.PAYMENT && (
            <div>
              <div className="relative h-20 overflow-hidden">
                <Aurora colors={["#f97316", "#ec4899"]} size={2} />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center px-6 gap-3 z-10">
                  <FiCreditCard className="text-white" size={20} />
                  <h2 className="font-bold text-white text-lg">Payment Details</h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Cardholder Name</label>
                  <input
                    type="text" placeholder="John Doe" value={cardDetails.name}
                    onChange={(e) => setCardDetails((p) => ({ ...p, name: e.target.value }))}
                    className={`mt-1 w-full px-3 py-2.5 rounded-lg border ${errors.name ? "border-red-400" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Card Number</label>
                  <input
                    type="text" placeholder="1234 5678 9012 3456" value={cardDetails.number}
                    onChange={(e) => setCardDetails((p) => ({ ...p, number: formatCardNumber(e.target.value) }))}
                    className={`mt-1 w-full px-3 py-2.5 rounded-lg border ${errors.number ? "border-red-400" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-400`}
                  />
                  {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Expiry</label>
                    <input
                      type="text" placeholder="MM/YY" value={cardDetails.expiry}
                      onChange={(e) => setCardDetails((p) => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                      className={`mt-1 w-full px-3 py-2.5 rounded-lg border ${errors.expiry ? "border-red-400" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-400`}
                    />
                    {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">CVV</label>
                    <input
                      type="password" placeholder="•••" maxLength={4} value={cardDetails.cvv}
                      onChange={(e) => setCardDetails((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "") }))}
                      className={`mt-1 w-full px-3 py-2.5 rounded-lg border ${errors.cvv ? "border-red-400" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-400`}
                    />
                    {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Premium Artist Plan</span>
                  <span className="font-bold text-orange-600 dark:text-orange-400">$9.99/mo</span>
                </div>

                <div data-cursor="upgrade" data-cursor-label="Pay Now">
                  <MagneticButton
                    onClick={handlePayNow}
                    strength={0.25}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-200 dark:shadow-orange-900/30"
                  >
                    <FiLock size={14} /> Pay $9.99 Now
                  </MagneticButton>
                </div>

                <p className="text-center text-xs text-gray-400">🔒 Simulated payment — no real charge</p>
              </div>
            </div>
          )}

          {/* STEP 3: Processing */}
          {step === STEP.PROCESSING && (
            <div className="relative overflow-hidden">
              <div className="absolute inset-0">
                <Aurora colors={["#f97316", "#ec4899", "#8b5cf6"]} size={1.5} />
                <div className="absolute inset-0 bg-black/50" />
              </div>
              <div className="relative z-10 p-14 flex flex-col items-center justify-center gap-5">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-orange-400/40"
                    animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-2 rounded-full border-2 border-pink-400/60"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
                  />
                  <div className="w-10 h-10 rounded-full border-4 border-white/30 border-t-white animate-spin" />
                </div>
                <div className="text-center">
                  <ShimmerText className="text-xl font-black">Processing Payment...</ShimmerText>
                  <p className="text-white/60 text-sm mt-1">Please wait a moment</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Success */}
          {step === STEP.SUCCESS && (
            <div className="relative overflow-hidden">
              <div className="absolute inset-0">
                <Aurora colors={["#10b981", "#f97316", "#fbbf24"]} size={1.5} />
                <div className="absolute inset-0 bg-black/40" />
              </div>
              <div className="relative z-10 p-12 flex flex-col items-center justify-center gap-4 text-center">
                <div className="relative">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400"
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{
                        x: Math.cos((i / 8) * Math.PI * 2) * 50,
                        y: Math.sin((i / 8) * Math.PI * 2) * 50,
                        opacity: 0, scale: 0,
                      }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      style={{ top: "50%", left: "50%" }}
                    />
                  ))}
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.1, stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-white/20 backdrop-blur border-2 border-white/40 flex items-center justify-center shadow-2xl"
                  >
                    <FiStar size={36} className="text-yellow-300" fill="currentColor" />
                  </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <ShimmerText className="text-2xl font-black block mb-1">You're Premium! 🎉</ShimmerText>
                  <p className="text-white/70 text-sm">
                    <strong className="text-white">{artist.name}</strong> now has all premium features unlocked.
                  </p>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} data-cursor="upgrade" data-cursor-label="Let's Go!">
                  <SpotlightButton onClick={onClose} className="mt-2 px-8 py-3 rounded-xl text-white font-bold text-sm">
                    Awesome, let's go! ✦
                  </SpotlightButton>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
