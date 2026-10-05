import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlay, FaPlus, FaCheck, FaStar } from 'react-icons/fa';
import useFavorites from '../hooks/useFavorites';
import { getDifficultyClass } from '../utils/helpers';

export const AlgorithmModal = ({ algorithm, onClose }) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (algorithm) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, algorithm]);

  const isSaved = algorithm ? isFavorite(algorithm.slug) : false;

  return (
    <AnimatePresence>
      {algorithm && (
        <motion.div
          className="modal-backdrop"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
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
                backgroundImage: `linear-gradient(180deg, transparent 30%, rgba(24, 24, 24, 0.95) 100%), url(${
                  algorithm.bannerUrl || algorithm.thumbnailUrl
                })`,
              }}
            >
              <div style={{ zIndex: 2 }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className={`badge ${getDifficultyClass(algorithm.difficulty)}`}>
                    {algorithm.difficulty}
                  </span>
                  <span className="badge" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff' }}>
                    {algorithm.category}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f7b731', fontSize: '0.82rem' }}>
                    <FaStar /> {algorithm.rating || 4.8}
                  </span>
                </div>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.1 }}>{algorithm.title}</h2>
              </div>
            </div>

            <div className="modal-body">
              <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <button
                  className="btn-primary"
                  onClick={() => {
                    onClose();
                    navigate(`/algorithms/${algorithm.slug}`);
                  }}
                >
                  <FaPlay /> Start Visualizer
                </button>

                <button
                  className="btn-secondary"
                  onClick={() => toggleFavorite(algorithm)}
                >
                  {isSaved ? <FaCheck style={{ color: '#46d369' }} /> : <FaPlus />}
                  {isSaved ? 'In My List' : 'Add to My List'}
                </button>
              </div>

              <p style={{ fontSize: '0.95rem', color: '#ccc', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                {algorithm.description || algorithm.summary}
              </p>

              <h4 style={{ fontSize: '0.8rem', color: '#737373', textTransform: 'uppercase', letterSpacing: '1.2px', marginBottom: '0.3rem' }}>
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
                  <div className="label">Space</div>
                  <div className="value">{algorithm.spaceComplexity || 'O(1)'}</div>
                </div>
              </div>

              {algorithm.tags && algorithm.tags.length > 0 && (
                <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {algorithm.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '0.78rem',
                        color: '#888',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlgorithmModal;
