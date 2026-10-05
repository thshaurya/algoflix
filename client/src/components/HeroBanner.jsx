import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaInfoCircle, FaPlus, FaCheck, FaStar } from 'react-icons/fa';
import useFavorites from '../hooks/useFavorites';
import { getDifficultyClass } from '../utils/helpers';

export const HeroBanner = ({ algorithm, onOpenModal }) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!algorithm) return null;

  const isSaved = isFavorite(algorithm.slug);

  return (
    <div
      className="hero-banner"
      style={{ backgroundImage: `url(${algorithm.bannerUrl})` }}
    >
      <div className="hero-overlay" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="hero-badge-row">
          <span className="badge" style={{ background: '#e50914', color: '#fff', fontSize: '0.68rem', letterSpacing: '1.5px' }}>
            ALGOFLIX ORIGINAL
          </span>
          <span className={`badge ${getDifficultyClass(algorithm.difficulty)}`}>
            {algorithm.difficulty}
          </span>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}>
            {algorithm.category}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: '#f7b731' }}>
            <FaStar /> {algorithm.rating || 4.9}
          </span>
        </div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
        >
          {algorithm.title}
        </motion.h1>

        <motion.p
          className="hero-summary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {algorithm.summary}
        </motion.p>

        <div className="hero-complexity">
          <div className="hero-complexity-item">
            <span>Average:</span>
            <strong>{algorithm.timeComplexity?.average || 'O(n log n)'}</strong>
          </div>
          <div className="hero-complexity-item">
            <span>Space:</span>
            <strong>{algorithm.spaceComplexity || 'O(1)'}</strong>
          </div>
        </div>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button
            className="btn-primary"
            onClick={() => navigate(`/algorithms/${algorithm.slug}`)}
          >
            <FaPlay /> Visualize Now
          </button>

          <button
            className="btn-secondary"
            onClick={() => onOpenModal && onOpenModal(algorithm)}
          >
            <FaInfoCircle /> More Info
          </button>

          <button
            className="btn-secondary"
            onClick={() => toggleFavorite(algorithm)}
            title={isSaved ? 'Remove from My List' : 'Add to My List'}
          >
            {isSaved ? <FaCheck style={{ color: '#46d369' }} /> : <FaPlus />}
            {isSaved ? 'In My List' : 'My List'}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
