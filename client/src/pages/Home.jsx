import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import AlgorithmRow from '../components/AlgorithmRow';
import AlgorithmModal from '../components/AlgorithmModal';
import algorithmService from '../services/algorithmService';

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
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#e50914', fontSize: '1.5rem', fontWeight: 700 }}>
          🍿 Loading AlgoFlix...
        </div>
      </div>
    );
  }

  // Filter algorithms into rows
  const sortingAlgos = algorithms.filter((a) => a.category === 'Sorting');
  const searchingAlgos = algorithms.filter((a) => a.category === 'Searching');
  const graphAlgos = algorithms.filter((a) => a.category === 'Graph Theory');
  const dpAlgos = algorithms.filter((a) => a.category === 'Dynamic Programming');

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

        <AlgorithmRow
          title="🧩 Dynamic Programming & Optimization"
          algorithms={dpAlgos}
          onOpenModal={(algo) => setSelectedAlgo(algo)}
        />
      </div>

      {/* Modal Popup */}
      {selectedAlgo && (
        <AlgorithmModal
          algorithm={selectedAlgo}
          onClose={() => setSelectedAlgo(null)}
        />
      )}
    </div>
  );
};

export default Home;
