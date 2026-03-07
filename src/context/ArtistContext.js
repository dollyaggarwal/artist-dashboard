import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchArtists } from "../services/artistService";

const ArtistContext = createContext(null);
const STORAGE_KEY = "premiumArtists";

export function ArtistProvider({ children }) {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem("darkMode") === "true"; }
    catch { return false; }
  });

  // Fetch from API on mount
  useEffect(() => {
    async function loadArtists() {
      try {
        setLoading(true);
        const data = await fetchArtists();

        // Re-apply saved premium status from localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        const premiumIds = stored ? JSON.parse(stored) : [];

        const withPremium = data.map((a) =>
          premiumIds.includes(a.id) ? { ...a, isPremium: true } : a
        );

        setArtists(withPremium);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadArtists();
  }, []);

  // Persist premium status whenever artists change
  useEffect(() => {
    if (artists.length === 0) return;
    const premiumIds = artists.filter((a) => a.isPremium).map((a) => a.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(premiumIds));
  }, [artists]);

  // Persist dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const upgradeArtist = useCallback((artistId) => {
    setArtists((prev) =>
      prev.map((a) => (a.id === artistId ? { ...a, isPremium: true } : a))
    );
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const getArtistById = useCallback(
    (id) => artists.find((a) => a.id === Number(id)),
    [artists]
  );

  return (
    <ArtistContext.Provider
      value={{ artists, loading, error, upgradeArtist, darkMode, toggleDarkMode, getArtistById }}
    >
      {children}
    </ArtistContext.Provider>
  );
}

export function useArtists() {
  const ctx = useContext(ArtistContext);
  if (!ctx) throw new Error("useArtists must be used within ArtistProvider");
  return ctx;
}