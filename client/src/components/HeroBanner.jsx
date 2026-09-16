import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaInfoCircle, FaPlus, FaCheck, FaStar } from 'react-icons/fa';
import useFavorites from '../hooks/useFavorites';

export const HeroBanner = ({ algorithm, onOpenModal }) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!algorithm) return null;

  const isSaved = isFavorite(algorithm.slug);

  const getDifficultyClass = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'easy':
        return 'badge-easy';
      case 'hard':
        return 'badge-hard';
      default:
        return 'badge-medium';
    }
  };

  return (
    <div
      className="hero-banner"
      style={{ backgroundImage: `url(${algorithm.bannerUrl})` }}
    >
      <div className="hero-overlay" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="hero-badge-row">
          <span className="badge" style={{ background: '#e50914', color: '#fff' }}>
            ALGOFLIX ORIGINAL
          </span>
          <span className={`badge ${getDifficultyClass(algorithm.difficulty)}`}>
            {algorithm.difficulty}
          </span>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
            {algorithm.category}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#ffb800' }}>
            <FaStar /> {algorithm.rating || 4.9}
          </span>
        </div>

        <h1 className="hero-title">{algorithm.title}</h1>
        <p className="hero-summary">{algorithm.summary}</p>

        <div className="hero-complexity">
          <div className="hero-complexity-item">
            <span>Average Time:</span>
            <strong>{algorithm.timeComplexity?.average || 'O(n log n)'}</strong>
          </div>
          <div className="hero-complexity-item">
            <span>Space:</span>
            <strong>{algorithm.spaceComplexity || 'O(1)'}</strong>
          </div>
        </div>

        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={() => navigate(`/algorithms/${algorithm.slug}`)}
          >
            <FaPlay /> Visualize
          </button>

          <button
            className="btn-secondary"
            onClick={() => onOpenModal && onOpenModal(algorithm)}
          >
            <FaInfoCircle /> Details
          </button>

          <button
            className="btn-secondary"
            onClick={() => toggleFavorite(algorithm)}
            title={isSaved ? 'Remove from My List' : 'Add to My List'}
          >
            {isSaved ? <FaCheck style={{ color: '#46d369' }} /> : <FaPlus />}
            {isSaved ? 'In My List' : 'My List'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
