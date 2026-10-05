import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa';
import useFavorites from '../hooks/useFavorites';
import AlgorithmCard from '../components/AlgorithmCard';
import AlgorithmModal from '../components/AlgorithmModal';

export const MyListPage = () => {
  const { favorites } = useFavorites();
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="container search-page">
      <div className="search-header-box">
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <FaBookmark style={{ color: '#e50914' }} /> My List
        </h1>
        <p style={{ color: '#a3a3a3' }}>
          Your bookmarked algorithms for quick revision and deep-dive practice.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: '#888' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#ccc', marginBottom: '0.8rem' }}>
            Your list is currently empty.
          </h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Explore algorithms and click the '+' button on any algorithm card to bookmark it here.
          </p>
          <button className="btn-primary" onClick={() => navigate('/')} style={{ margin: '0 auto' }}>
            Explore Algorithms
          </button>
        </div>
      ) : (
        <div className="catalog-grid">
          {favorites.map((algo) => (
            <AlgorithmCard
              key={algo._id || algo.slug}
              algorithm={algo}
              onOpenModal={(a) => setSelectedAlgo(a)}
            />
          ))}
        </div>
      )}

      <AlgorithmModal
        algorithm={selectedAlgo}
        onClose={() => setSelectedAlgo(null)}
      />
    </div>
  );
};

export default MyListPage;
