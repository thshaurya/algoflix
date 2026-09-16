import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import algorithmService from '../services/algorithmService';
import AlgorithmCard from '../components/AlgorithmCard';
import AlgorithmModal from '../components/AlgorithmModal';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [algorithms, setAlgorithms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlgo, setSelectedAlgo] = useState(null);

  const categories = ['All', 'Sorting', 'Searching', 'Graph Theory', 'Dynamic Programming'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  useEffect(() => {
    const fetchAlgorithms = async () => {
      try {
        setLoading(true);
        const params = {};
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (selectedDifficulty !== 'All') params.difficulty = selectedDifficulty;
        if (searchTerm.trim()) params.search = searchTerm.trim();

        const data = await algorithmService.getAll(params);
        setAlgorithms(data);
      } catch (err) {
        console.error('Failed to search algorithms:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchAlgorithms();
    }, 250);

    return () => clearTimeout(debounce);
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="container search-page">
      <div className="search-header-box">
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Explore Algorithm Catalog
        </h1>
        <p style={{ color: '#a3a3a3' }}>
          Search across complex data structures, graph traversals, and dynamic programming problems.
        </p>

        {/* Search Input */}
        <div className="search-input-wrapper">
          <FaSearch className="search-input-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by algorithm name, tag, or concept..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div style={{ marginBottom: '0.8rem', fontSize: '0.85rem', color: '#888' }}>
          Filter by Category:
        </div>
        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty Filters */}
        <div style={{ marginBottom: '0.8rem', fontSize: '0.85rem', color: '#888' }}>
          Filter by Difficulty:
        </div>
        <div className="filter-bar">
          {difficulties.map((diff) => (
            <button
              key={diff}
              className={`filter-pill ${selectedDifficulty === diff ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty(diff)}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div style={{ padding: '3rem 0', textAlign: 'center', color: '#888' }}>
          Searching algorithms...
        </div>
      ) : algorithms.length === 0 ? (
        <div style={{ padding: '4rem 0', textAlign: 'center', color: '#888' }}>
          <h3>No algorithms found matching your criteria.</h3>
          <p style={{ marginTop: '0.5rem' }}>Try refining your search keyword or clearing the filters.</p>
        </div>
      ) : (
        <div className="catalog-grid">
          {algorithms.map((algo) => (
            <AlgorithmCard
              key={algo._id || algo.slug}
              algorithm={algo}
              onOpenModal={(a) => setSelectedAlgo(a)}
            />
          ))}
        </div>
      )}

      {selectedAlgo && (
        <AlgorithmModal
          algorithm={selectedAlgo}
          onClose={() => setSelectedAlgo(null)}
        />
      )}
    </div>
  );
};

export default SearchPage;
