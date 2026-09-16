import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaCheck, FaStar } from 'react-icons/fa';
import algorithmService from '../services/algorithmService';
import Visualizer from '../components/Visualizer';
import CodeViewer from '../components/CodeViewer';
import useFavorites from '../hooks/useFavorites';

export const AlgorithmDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [algorithm, setAlgorithm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlgo = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await algorithmService.getBySlug(slug);
        setAlgorithm(data);
      } catch (err) {
        console.error('Failed to load algorithm:', err);
        setError(err.message || 'Algorithm not found');
      } finally {
        setLoading(false);
      }
    };

    fetchAlgo();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#e50914', fontSize: '1.2rem', fontWeight: 600 }}>Loading algorithm...</p>
      </div>
    );
  }

  if (error || !algorithm) {
    return (
      <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 3rem)', textAlign: 'center' }}>
        <h2>Algorithm Not Found</h2>
        <p style={{ color: '#888', margin: '1rem 0' }}>{error || "The algorithm you're looking for does not exist."}</p>
        <button className="btn-primary" onClick={() => navigate('/')} style={{ margin: '0 auto' }}>
          <FaArrowLeft /> Back to Browse
        </button>
      </div>
    );
  }

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
    <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 1.5rem)', paddingBottom: '4rem' }}>
      <button
        onClick={() => navigate(-1)}
        className="v-btn"
        style={{ marginBottom: '1.5rem', background: 'transparent', border: 'none', color: '#a3a3a3' }}
      >
        <FaArrowLeft /> Back
      </button>

      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '0.8rem' }}>
            <span className={`badge ${getDifficultyClass(algorithm.difficulty)}`}>
              {algorithm.difficulty}
            </span>
            <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#fff' }}>
              {algorithm.category}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffb800', fontSize: '0.9rem' }}>
              <FaStar /> {algorithm.rating || 4.8}
            </span>
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800 }}>{algorithm.title}</h1>
          <p style={{ color: '#bbb', maxWidth: '800px', fontSize: '1.1rem', marginTop: '0.5rem', lineHeight: '1.6' }}>
            {algorithm.summary}
          </p>
        </div>

        <button className="btn-secondary" onClick={() => toggleFavorite(algorithm)}>
          {isSaved ? <FaCheck style={{ color: '#46d369' }} /> : <FaPlus />}
          {isSaved ? 'Saved in My List' : 'Add to My List'}
        </button>
      </div>

      {/* Interactive Visualizer Section */}
      <Visualizer
        initialArray={algorithm.defaultArray || [52, 28, 85, 19, 93, 44, 71, 35, 62, 10]}
        algorithmSlug={algorithm.slug}
      />

      {/* Complexity Breakdown */}
      <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '2rem 0 1rem 0' }}>
        Complexity Analysis
      </h3>
      <div className="complexity-grid">
        <div className="complexity-card">
          <div className="label">Best Time Complexity</div>
          <div className="value">{algorithm.timeComplexity?.best || 'O(n)'}</div>
        </div>
        <div className="complexity-card">
          <div className="label">Average Time Complexity</div>
          <div className="value">{algorithm.timeComplexity?.average || 'O(n log n)'}</div>
        </div>
        <div className="complexity-card">
          <div className="label">Worst Time Complexity</div>
          <div className="value">{algorithm.timeComplexity?.worst || 'O(n²)'}</div>
        </div>
        <div className="complexity-card">
          <div className="label">Space Complexity</div>
          <div className="value">{algorithm.spaceComplexity || 'O(1)'}</div>
        </div>
      </div>

      {/* Detailed Description */}
      <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '2.5rem 0 1rem 0' }}>
        Algorithmic Deep Dive
      </h3>
      <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.05rem', marginBottom: '2rem' }}>
        {algorithm.description}
      </p>

      {/* Code Implementations */}
      <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '2.5rem 0 0.5rem 0' }}>
        Multi-Language Source Code
      </h3>
      <CodeViewer code={algorithm.code || {}} />
    </div>
  );
};

export default AlgorithmDetail;
