import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlay, FaPlus, FaCheck, FaStar } from 'react-icons/fa';
import useFavorites from '../hooks/useFavorites';

export const AlgorithmModal = ({ algorithm, onClose }) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

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
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="modal-close-btn"
            aria-label="Close dialog"
            onClick={onClose}
          >
            <FaTimes />
          </button>

          <div
            className="modal-header-banner"
            style={{
              backgroundImage: `linear-gradient(180deg, transparent 0%, rgba(30, 30, 30, 0.9) 100%), url(${
                algorithm.bannerUrl || algorithm.thumbnailUrl
              })`,
            }}
          >
            <div style={{ zIndex: 2 }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                <span className={`badge ${getDifficultyClass(algorithm.difficulty)}`}>
                  {algorithm.difficulty}
                </span>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                  {algorithm.category}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffb800', fontSize: '0.85rem' }}>
                  <FaStar /> {algorithm.rating || 4.8}
                </span>
              </div>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 800 }}>{algorithm.title}</h2>
            </div>
          </div>

          <div className="modal-body">
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <button
                className="btn-primary"
                onClick={() => {
                  onClose();
                  navigate(`/algorithms/${algorithm.slug}`);
                }}
              >
                <FaPlay /> Start Interactive Visualizer
              </button>

              <button
                className="btn-secondary"
                onClick={() => toggleFavorite(algorithm)}
              >
                {isSaved ? <FaCheck style={{ color: '#46d369' }} /> : <FaPlus />}
                {isSaved ? 'In My List' : 'Add to My List'}
              </button>
            </div>

            <p style={{ fontSize: '1rem', color: '#ccc', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              {algorithm.description || algorithm.summary}
            </p>

            <h4 style={{ fontSize: '0.95rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Complexity Analysis
            </h4>

            <div className="complexity-grid">
              <div className="complexity-card">
                <div className="label">Best Time</div>
                <div className="value">{algorithm.timeComplexity?.best || 'O(n)'}</div>
              </div>
              <div className="complexity-card">
                <div className="label">Average Time</div>
                <div className="value">{algorithm.timeComplexity?.average || 'O(n log n)'}</div>
              </div>
              <div className="complexity-card">
                <div className="label">Worst Time</div>
                <div className="value">{algorithm.timeComplexity?.worst || 'O(n²)'}</div>
              </div>
              <div className="complexity-card">
                <div className="label">Space Complexity</div>
                <div className="value">{algorithm.spaceComplexity || 'O(1)'}</div>
              </div>
            </div>

            {algorithm.tags && algorithm.tags.length > 0 && (
              <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {algorithm.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      color: '#a3a3a3',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AlgorithmModal;
