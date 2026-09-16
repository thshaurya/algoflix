import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaPlus, FaCheck, FaInfo } from 'react-icons/fa';
import useFavorites from '../hooks/useFavorites';

export const AlgorithmCard = ({ algorithm, onOpenModal }) => {
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
    <motion.div
      className="algo-card"
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={() => onOpenModal && onOpenModal(algorithm)}
    >
      <img
        src={algorithm.thumbnailUrl || algorithm.bannerUrl}
        alt={algorithm.title}
        loading="lazy"
      />

      <div className="algo-card-overlay">
        <h3 className="algo-card-title">{algorithm.title}</h3>

        <div className="algo-card-meta">
          <span className={`badge ${getDifficultyClass(algorithm.difficulty)}`}>
            {algorithm.difficulty}
          </span>

          <div className="card-actions" onClick={(e) => e.stopPropagation()}>
            <button
              className="card-btn"
              title="Visualize"
              onClick={() => navigate(`/algorithms/${algorithm.slug}`)}
            >
              <FaPlay size={10} />
            </button>

            <button
              className="card-btn"
              title={isSaved ? 'Remove from My List' : 'Add to My List'}
              onClick={() => toggleFavorite(algorithm)}
            >
              {isSaved ? <FaCheck size={10} style={{ color: '#46d369' }} /> : <FaPlus size={10} />}
            </button>

            <button
              className="card-btn"
              title="Details"
              onClick={() => onOpenModal && onOpenModal(algorithm)}
            >
              <FaInfo size={10} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlgorithmCard;
