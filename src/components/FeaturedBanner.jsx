import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiStar, FiArrowRight } from "react-icons/fi";
import { formatFollowers, getCategoryColor } from "../utils/formatters";

export default function FeaturedBanner({ artists }) {
  const navigate = useNavigate();
  const premiumArtists = artists.filter((a) => a.isPremium).slice(0, 3);

  if (premiumArtists.length === 0) return null;

  return (
    <section id="featured" className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <FiStar className="text-amber-500" size={16} fill="currentColor" />
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          Featured Premium Artists
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {premiumArtists.map((artist, i) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative rounded-2xl overflow-hidden h-44 cursor-pointer group shadow-md"
            onClick={() => navigate(`/artist/${artist.id}`)}
          >
            <img
              src={artist.banner}
              alt={artist.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={artist.profile_image}
                  alt={artist.name}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <div>
                  <p className="text-white font-bold text-sm">{artist.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(artist.art_category)}`}>
                    {artist.art_category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-white/80 text-xs">
                <span>{formatFollowers(artist.followers)}</span>
                <FiArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Premium badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-white text-xs font-bold">
              <FiStar size={9} fill="white" /> Premium
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
