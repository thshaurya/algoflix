import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import AlgorithmRow from '../components/AlgorithmRow';
import AlgorithmModal from '../components/AlgorithmModal';
import algorithmService from '../services/algorithmService';

const HeroSkeleton = () => (
  <div className="hero-banner" style={{ background: '#111' }}>
    <div className="hero-content" style={{ maxWidth: 640 }}>
      <div className="loading-shimmer" style={{ width: 180, height: 22, marginBottom: 16, borderRadius: 4 }} />
      <div className="loading-shimmer" style={{ width: '75%', height: 52, marginBottom: 12 }} />
      <div className="loading-shimmer" style={{ width: '90%', height: 18, marginBottom: 8 }} />
      <div className="loading-shimmer" style={{ width: '70%', height: 18, marginBottom: 24 }} />
      <div style={{ display: 'flex', gap: '0.8rem' }}>
        <div className="loading-shimmer" style={{ width: 150, height: 44, borderRadius: 4 }} />
        <div className="loading-shimmer" style={{ width: 120, height: 44, borderRadius: 4 }} />
      </div>
    </div>
  </div>
);

const RowSkeleton = ({ title }) => (
  <div className="algo-row">
    <div className="row-header">
      <h2 className="row-title">{title}</h2>
    </div>
    <div style={{ display: 'flex', gap: '0.5rem', padding: '1rem 0 2rem', overflow: 'hidden' }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="loading-shimmer"
          style={{ flex: '0 0 260px', height: 146, borderRadius: 4 }}
        />
      ))}
    </div>
  </div>
);

export const Home = () => {
  const [featured, setFeatured] = useState(null);
  const [algorithms, setAlgorithms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlgo, setSelectedAlgo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [featuredData, allData] = await Promise.all([
          algorithmService.getFeatured().catch(() => null),
          algorithmService.getAll().catch(() => []),
        ]);

        setFeatured(featuredData || (allData.length > 0 ? allData[0] : null));
        setAlgorithms(allData);
      } catch (err) {
        console.error('Failed to load home page algorithms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <HeroSkeleton />
        <div style={{ marginTop: '-4rem', position: 'relative', zIndex: 20 }}>
          <RowSkeleton title="🔥 Trending DSA Masterpieces" />
          <RowSkeleton title="⚡ Sorting Algorithms" />
        </div>
      </div>
    );
  }

  // Filter algorithms into rows
  const sortingAlgos  = algorithms.filter((a) => a.category === 'Sorting');
  const searchingAlgos = algorithms.filter((a) => a.category === 'Searching');
  const graphAlgos    = algorithms.filter((a) => a.category === 'Graph Theory');

  return (
    <div>
      {/* Featured Billboard */}
      <HeroBanner algorithm={featured} onOpenModal={(algo) => setSelectedAlgo(algo)} />

      {/* Categorized Rows */}
      <div style={{ marginTop: '-4rem', position: 'relative', zIndex: 20 }}>
        <AlgorithmRow
          title="🔥 Trending DSA Masterpieces"
          algorithms={algorithms}
          onOpenModal={(algo) => setSelectedAlgo(algo)}
        />

        <AlgorithmRow
          title="⚡ Sorting Algorithms"
          algorithms={sortingAlgos}
          onOpenModal={(algo) => setSelectedAlgo(algo)}
        />

        <AlgorithmRow
          title="🔍 Searching & Traversal"
          algorithms={searchingAlgos}
          onOpenModal={(algo) => setSelectedAlgo(algo)}
        />

        <AlgorithmRow
          title="🌐 Graph Theory & Shortest Paths"
          algorithms={graphAlgos}
          onOpenModal={(algo) => setSelectedAlgo(algo)}
        />
      </div>

      {/* Modal Popup */}
      <AlgorithmModal
        algorithm={selectedAlgo}
        onClose={() => setSelectedAlgo(null)}
      />
    </div>
  );
};

export default Home;
