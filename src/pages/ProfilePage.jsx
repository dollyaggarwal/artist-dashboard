import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft, FiMapPin, FiUsers, FiInstagram, FiTwitter,
  FiGlobe, FiStar, FiZap, FiExternalLink
} from "react-icons/fi";
import { useArtists } from "../context/ArtistContext";
import { formatFollowers, getCategoryColor } from "../utils/formatters";
import UpgradeModal from "../components/UpgradeModal";

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getArtistById } = useArtists();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  const artist = getArtistById(id);

  if (!artist) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-5xl">🔍</p>
        <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">Artist not found</h2>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-semibold text-sm"
        >
          Back to Discover
        </button>
      </div>
    );
  }

  // Premium artists show full 6-image portfolio; free artists show 4
  const portfolioItems = artist.isPremium ? artist.portfolio : artist.portfolio.slice(0, 4);

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 group transition-colors"
        >
          <FiArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Discover
        </button>

        {/* Banner (premium) or gradient fallback */}
        <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden mb-6 shadow-md">
          {artist.isPremium ? (
            <img
              src={artist.banner}
              alt="Profile banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-100 via-pink-100 to-violet-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {!artist.isPremium && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setShowUpgrade(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 dark:bg-gray-900/90 text-orange-500 font-semibold text-sm shadow hover:shadow-md transition-all"
              >
                <FiZap size={14} /> Add Custom Banner
              </button>
            </div>
          )}
        </div>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-end mb-8 -mt-16 px-4 relative z-10">
          {/* Avatar */}
          <img
            src={artist.profile_image}
            alt={artist.name}
            className="w-24 h-24 rounded-2xl border-4 border-white dark:border-gray-950 shadow-lg object-cover"
          />

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                {artist.name}
              </h1>
              {artist.isPremium && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold shadow">
                  <FiStar size={10} fill="white" /> Premium
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${getCategoryColor(artist.art_category)}`}>
                {artist.art_category}
              </span>
              <span className="flex items-center gap-1">
                <FiMapPin size={13} /> {artist.location}
              </span>
              <span className="flex items-center gap-1">
                <FiUsers size={13} />
                <strong className="text-gray-700 dark:text-gray-200">{formatFollowers(artist.followers)}</strong> followers
              </span>
            </div>
          </div>

          {/* Upgrade / Premium CTA */}
          {!artist.isPremium ? (
            <button
              onClick={() => setShowUpgrade(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold text-sm shadow-lg hover:opacity-90 transition-opacity"
            >
              <FiZap size={14} /> Upgrade Profile
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-sm font-semibold">
              <FiStar size={14} fill="currentColor" /> Premium Active
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Bio + Socials */}
          <div className="lg:col-span-1 space-y-6">
            {/* Bio */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">About</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{artist.bio}</p>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Social Links</h2>
              <div className="space-y-2.5">
                <a
                  href={artist.social_links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                >
                  <FiInstagram size={16} /> Instagram
                </a>
                <a
                  href={artist.social_links.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  <FiTwitter size={16} /> Twitter / X
                </a>
                {artist.isPremium && artist.social_links.website && (
                  <a
                    href={artist.social_links.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-sm text-orange-500 font-semibold hover:text-orange-600 transition-colors"
                  >
                    <FiGlobe size={16} /> Website
                    <FiExternalLink size={12} />
                  </a>
                )}
              </div>

              {!artist.isPremium && (
                <button
                  onClick={() => setShowUpgrade(true)}
                  className="mt-3 flex items-center gap-1.5 text-xs text-gray-400 hover:text-orange-500 transition-colors"
                >
                  <FiZap size={11} /> Unlock website link with Premium
                </button>
              )}
            </div>
          </div>

          {/* Right: Portfolio Gallery */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Portfolio</h2>
                {!artist.isPremium && (
                  <button
                    onClick={() => setShowUpgrade(true)}
                    className="flex items-center gap-1 text-xs text-orange-500 font-semibold hover:text-orange-600"
                  >
                    <FiZap size={11} /> Unlock full gallery
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {portfolioItems.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative shadow-sm"
                    onClick={() => setLightboxImg(img)}
                  >
                    <img
                      src={img}
                      alt={`Portfolio ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </motion.div>
                ))}

                {/* Locked premium tiles */}
                {!artist.isPremium &&
                  Array.from({ length: 2 }).map((_, i) => (
                    <div
                      key={`locked-${i}`}
                      onClick={() => setShowUpgrade(true)}
                      className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all group"
                    >
                      <FiZap size={20} className="text-gray-300 dark:text-gray-600 group-hover:text-orange-400 transition-colors" />
                      <span className="text-xs text-gray-400 group-hover:text-orange-400 font-medium transition-colors">
                        Premium
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setLightboxImg(null)}
        >
          <motion.img
            src={lightboxImg}
            alt="Portfolio preview"
            className="max-w-full max-h-full rounded-xl shadow-2xl"
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
          />
        </motion.div>
      )}

      {/* Upgrade Modal */}
      {showUpgrade && (
        <UpgradeModal artist={artist} onClose={() => setShowUpgrade(false)} />
      )}
    </>
  );
}
