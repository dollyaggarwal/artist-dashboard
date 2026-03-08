import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiStar, FiArrowRight, FiMapPin, FiUsers,
  FiZap, FiGlobe, FiInstagram, FiTwitter
} from "react-icons/fi";
import { useArtists } from "../context/ArtistContext";
import { formatFollowers, getCategoryColor } from "../utils/formatters";
import UpgradeModal from "../components/UpgradeModal";
import Aurora from "../components/animations/Aurora";

export default function FeaturedPage() {
  const navigate = useNavigate();
  const { artists } = useArtists();
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgradeTarget, setUpgradeTarget] = useState(null);

  const premiumArtists = artists.filter((a) => a.isPremium);
  const nonPremiumArtists = artists.filter((a) => !a.isPremium);

  const handleUpgrade = (artist, e) => {
    e.stopPropagation();
    setUpgradeTarget(artist);
    setShowUpgrade(true);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden mb-12 h-52 flex items-center">
        <Aurora colors={["#f97316", "#ec4899", "#8b5cf6"]} size={1.4} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-8">
          <div className="flex items-center gap-2 mb-2">
            <FiStar className="text-amber-400" size={18} fill="currentColor" />
            <span className="text-amber-400 text-sm font-bold uppercase tracking-widest">
              Premium Artists
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Featured Artists
          </h1>
          <p className="text-white/60 mt-1.5 text-sm max-w-md">
            Discover the top premium creators handpicked from our community.
          </p>
        </div>
      </div>

      {/* ── PREMIUM ARTISTS GRID ── */}
      {premiumArtists.length === 0 ? (
        <EmptyPremium onUpgradeClick={() => { setUpgradeTarget(artists[0]); setShowUpgrade(true); }} />
      ) : (
        <>
          <div className="flex items-center gap-2 mb-5">
            <FiStar className="text-amber-500" size={15} fill="currentColor" />
            <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              {premiumArtists.length} Featured {premiumArtists.length === 1 ? "Artist" : "Artists"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {premiumArtists.map((artist, i) => (
              <PremiumCard
                key={artist.id}
                artist={artist}
                index={i}
                isSelected={selectedArtist?.id === artist.id}
                onSelect={() => setSelectedArtist(
                  selectedArtist?.id === artist.id ? null : artist
                )}
                onViewProfile={() => navigate(`/artist/${artist.id}`)}
              />
            ))}
          </div>
        </>
      )}

      {/* ── NON-PREMIUM SECTION ── */}
      {nonPremiumArtists.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-black text-gray-900 dark:text-white">
                Upgrade to Get Featured
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                These artists could be in the spotlight with Premium
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {nonPremiumArtists.map((artist, i) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm group hover:shadow-md transition-all"
              >
                {/* Image */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={artist.profile_image}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Locked overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleUpgrade(artist, e)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-pink-600 text-white text-xs font-bold shadow-lg"
                    >
                      <FiZap size={12} /> Get Featured
                    </button>
                  </div>
                </div>

                <div className="p-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getCategoryColor(artist.art_category)}`}>
                    {artist.art_category}
                  </span>
                  <p className="font-bold text-gray-900 dark:text-white text-sm mt-1.5 truncate">
                    {artist.name}
                  </p>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                    <FiMapPin size={10} /> {artist.location}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <FiUsers size={11} /> {formatFollowers(artist.followers)}
                    </span>
                    <button
                      onClick={(e) => handleUpgrade(artist, e)}
                      className="text-xs text-orange-500 font-semibold flex items-center gap-1 hover:text-orange-600 transition-colors"
                    >
                      <FiZap size={11} /> Upgrade
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgrade && upgradeTarget && (
        <UpgradeModal
          artist={upgradeTarget}
          onClose={() => { setShowUpgrade(false); setUpgradeTarget(null); }}
        />
      )}
    </main>
  );
}

/* ── Premium Artist Card (expandable) ── */
function PremiumCard({ artist, index, isSelected, onSelect, onViewProfile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 200 }}
      layout
      className={`relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border shadow-md transition-all cursor-pointer
        ${isSelected
          ? "border-orange-400 shadow-orange-100 dark:shadow-orange-900/20"
          : "border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-0.5"
        }`}
      onClick={onSelect}
    >
      {/* Banner */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={artist.banner}
          alt={`${artist.name} banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Premium badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold shadow-lg">
          <FiStar size={10} fill="white" /> Premium
        </div>

        {/* Avatar overlapping banner */}
        <div className="absolute -bottom-6 left-5">
          <img
            src={artist.profile_image}
            alt={artist.name}
            className="w-14 h-14 rounded-xl border-3 border-white dark:border-gray-900 shadow-lg object-cover"
            style={{ borderWidth: 3 }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="pt-8 px-5 pb-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-black text-gray-900 dark:text-white text-base">
              {artist.name}
            </h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getCategoryColor(artist.art_category)}`}>
                {artist.art_category}
              </span>
              <span className="flex items-center gap-1 text-gray-400 text-xs">
                <FiMapPin size={10} /> {artist.location}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm font-semibold">
            <FiUsers size={13} className="text-gray-400" />
            {formatFollowers(artist.followers)}
          </div>
        </div>

        {/* Expandable section */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 leading-relaxed line-clamp-3">
                {artist.bio}
              </p>

              {/* Portfolio preview strip */}
              <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
                {artist.portfolio.slice(0, 4).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`portfolio-${i}`}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                ))}
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4 mt-3">
                <a href={artist.social_links.instagram} target="_blank" rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="text-gray-400 hover:text-pink-500 transition-colors">
                  <FiInstagram size={16} />
                </a>
                <a href={artist.social_links.twitter} target="_blank" rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="text-gray-400 hover:text-sky-500 transition-colors">
                  <FiTwitter size={16} />
                </a>
                {artist.social_links.website && (
                  <a href={artist.social_links.website} target="_blank" rel="noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="text-gray-400 hover:text-orange-500 transition-colors">
                    <FiGlobe size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-400">
            {isSelected ? "Click to collapse" : "Click to expand"}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onViewProfile(); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold hover:opacity-80 transition-opacity"
          >
            View Profile <FiArrowRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Empty state when no premium artists yet ── */
function EmptyPremium({ onUpgradeClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16 mb-12 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700"
    >
      <div className="text-5xl mb-4">⭐</div>
      <h3 className="text-lg font-black text-gray-800 dark:text-white mb-1">
        No Featured Artists Yet
      </h3>
      <p className="text-sm text-gray-400 mb-5 max-w-xs mx-auto">
        Upgrade any artist to Premium and they'll appear here in the spotlight.
      </p>
      <button
        onClick={onUpgradeClick}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold text-sm mx-auto hover:opacity-90 transition-opacity"
      >
        <FiZap size={14} /> Upgrade an Artist
      </button>
    </motion.div>
  );
}
