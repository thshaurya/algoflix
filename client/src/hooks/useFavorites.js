import { useState, useEffect } from 'react';

const STORAGE_KEY = 'algoflix_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse favorites from localStorage:', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage:', e);
    }
  }, [favorites]);

  const toggleFavorite = (algorithm) => {
    if (!algorithm || !algorithm.slug) return;

    setFavorites((prev) => {
      const exists = prev.some((item) => item.slug === algorithm.slug);
      if (exists) {
        return prev.filter((item) => item.slug !== algorithm.slug);
      } else {
        return [...prev, algorithm];
      }
    });
  };

  const isFavorite = (slug) => {
    if (!slug) return false;
    return favorites.some((item) => item.slug === slug);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    count: favorites.length,
  };
}

export default useFavorites;
