import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiZap, FiCheck, FiCreditCard, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";
import { useArtists } from "../context/ArtistContext";

// Payment flow steps
const STEP = { PLAN: "plan", PAYMENT: "payment", PROCESSING: "processing", SUCCESS: "success" };

const PREMIUM_FEATURES = [
  "Premium badge on artist card",
  "Priority listing — appear first in results",
  "Portfolio gallery expansion",
  "Featured section on homepage",
  "Custom profile banner",
  "External website link",
];

export default function UpgradeModal({ artist, onClose }) {
  const { upgradeArtist } = useArtists();
  const [step, setStep] = useState(STEP.PLAN);
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [errors, setErrors] = useState({});

  // Basic card validation
  const validateCard = () => {
    const newErrors = {};
    if (!cardDetails.name.trim()) newErrors.name = "Name is required";
    if (cardDetails.number.replace(/\s/g, "").length < 16) newErrors.number = "Enter valid card number";
    if (cardDetails.expiry.length < 5) newErrors.expiry = "Enter valid expiry";
    if (cardDetails.cvv.length < 3) newErrors.cvv = "Enter valid CVV";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceedToPayment = () => setStep(STEP.PAYMENT);

  const handlePayNow = () => {
    if (!validateCard()) return;
    setStep(STEP.PROCESSING);

    // Simulate payment processing
    setTimeout(() => {
      upgradeArtist(artist.id);
      setStep(STEP.SUCCESS);
      toast.success(`${artist.name} is now a Premium artist! 🎉`);
    }, 2000);
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
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={step !== STEP.PROCESSING ? onClose : undefined}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 20 }}
        >
          {/* Close button */}
          {step !== STEP.PROCESSING && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all z-10"
            >
              <FiX size={18} />
            </button>
          )}

          {/* ── STEP 1: Plan Details ── */}
          {step === STEP.PLAN && (
            <div>
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <FiZap size={20} />
                  <span className="font-bold text-lg">Premium Artist Plan</span>
                </div>
                <p className="text-white/80 text-sm">Unlock your full potential</p>
                <div className="mt-3">
                  <span className="text-4xl font-black">$9.99</span>
                  <span className="text-white/70 ml-1">/month</span>
                </div>
              </div>

              {/* Features list */}
              <div className="p-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  What you get
                </p>
                <ul className="space-y-2.5 mb-6">
                  {PREMIUM_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                      <FiCheck className="text-green-500 mt-0.5 flex-shrink-0" size={15} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleProceedToPayment}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-orange-200 dark:shadow-orange-900/30"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Payment Form ── */}
          {step === STEP.PAYMENT && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <FiCreditCard className="text-orange-500" size={20} />
                <h2 className="font-bold text-gray-900 dark:text-white text-lg">Payment Details</h2>
              </div>

              <div className="space-y-4">
                {/* Cardholder Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails((p) => ({ ...p, name: e.target.value }))}
                    className={`mt-1 w-full px-3 py-2.5 rounded-lg border ${errors.name ? "border-red-400" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-400`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Card Number */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails((p) => ({ ...p, number: formatCardNumber(e.target.value) }))}
                    className={`mt-1 w-full px-3 py-2.5 rounded-lg border ${errors.number ? "border-red-400" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-400`}
                  />
                  {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
                </div>

                {/* Expiry + CVV */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails((p) => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                      className={`mt-1 w-full px-3 py-2.5 rounded-lg border ${errors.expiry ? "border-red-400" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-400`}
                    />
                    {errors.expiry && <p className="text-red-500 text-xs mt-1">{errors.expiry}</p>}
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      CVV
                    </label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "") }))}
                      className={`mt-1 w-full px-3 py-2.5 rounded-lg border ${errors.cvv ? "border-red-400" : "border-gray-200 dark:border-gray-700"} bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-400`}
                    />
                    {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                  </div>
                </div>
              </div>

              {/* Amount summary */}
              <div className="mt-5 p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">Premium Artist Plan</span>
                <span className="font-bold text-orange-600 dark:text-orange-400">$9.99/mo</span>
              </div>

              <button
                onClick={handlePayNow}
                className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
              >
                <FiLock size={14} /> Pay $9.99 Now
              </button>

              <p className="text-center text-xs text-gray-400 mt-3">
                🔒 Simulated payment — no real charge
              </p>
            </div>
          )}

          {/* ── STEP 3: Processing ── */}
          {step === STEP.PROCESSING && (
            <div className="p-10 flex flex-col items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full border-4 border-orange-200 border-t-orange-500 animate-spin" />
              <p className="font-semibold text-gray-700 dark:text-gray-200">Processing payment...</p>
              <p className="text-sm text-gray-400">Please wait a moment</p>
            </div>
          )}

          {/* ── STEP 4: Success ── */}
          {step === STEP.SUCCESS && (
            <div className="p-10 flex flex-col items-center justify-center gap-4 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
              >
                <FiCheck className="text-green-500" size={32} />
              </motion.div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white">You're Premium! 🎉</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong className="text-gray-700 dark:text-gray-200">{artist.name}</strong> now has all premium features unlocked.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold text-sm"
              >
                Awesome, let's go!
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
