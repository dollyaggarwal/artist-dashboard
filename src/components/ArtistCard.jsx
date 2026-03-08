import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMapPin, FiUsers, FiZap, FiStar } from "react-icons/fi";
import { formatFollowers, getCategoryColor } from "../utils/formatters";
import UpgradeModal from "./UpgradeModal";

export default function ArtistCard({ artist, index }) {
  const navigate = useNavigate();
  const [showUpgrade, setShowUpgrade] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: (index % 8) * 0.05 }}
        className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-gray-950 border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1"
      >
        {artist.isPremium && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold shadow-lg">
            <FiStar size={10} fill="white" />
            Premium
          </div>
        )}

        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
          <img
            src={artist.profile_image}
            alt={artist.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-4">
          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${getCategoryColor(artist.art_category)}`}>
            {artist.art_category}
          </span>

          <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1 truncate">
            {artist.name}
          </h3>

          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs mb-3">
            <FiMapPin size={11} />
            <span className="truncate">{artist.location}</span>
          </div>

          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 text-sm mb-4">
            <FiUsers size={13} />
            <span className="font-semibold">{formatFollowers(artist.followers)}</span>
            <span className="text-gray-400 text-xs">followers</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/artist/${artist.id}`)}
              className="flex-1 py-2 px-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
            >
              View Profile
            </button>

            {!artist.isPremium && (
              <button
                onClick={() => setShowUpgrade(true)}
                className="flex items-center gap-1 py-2 px-3 rounded-lg border border-orange-200 dark:border-orange-800 text-orange-500 dark:text-orange-400 text-sm font-semibold hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                title="Upgrade to Premium"
              >
                <FiZap size={14} />
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {showUpgrade && (
        <UpgradeModal artist={artist} onClose={() => setShowUpgrade(false)} />
      )}
    </>
  );
}
