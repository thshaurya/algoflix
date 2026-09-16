import React, { useState } from 'react';
import Visualizer from '../components/Visualizer';

export const VisualizerStudio = () => {
  const [selectedAlgo, setSelectedAlgo] = useState('bubble-sort');
  const [inputArrayStr, setInputArrayStr] = useState('45, 12, 85, 32, 89, 39, 69, 21, 56, 9');
  const [activeArray, setActiveArray] = useState([45, 12, 85, 32, 89, 39, 69, 21, 56, 9]);
  const [inputError, setInputError] = useState('');

  const handleApplyCustomArray = (e) => {
    e.preventDefault();
    try {
      const parsed = inputArrayStr
        .split(',')
        .map((num) => parseInt(num.trim(), 10))
        .filter((n) => !isNaN(n));

      if (parsed.length < 2) {
        setInputError('Please enter at least 2 numbers separated by commas.');
        return;
      }

      if (parsed.length > 20) {
        setInputError('Please enter no more than 20 numbers for optimal visualization.');
        return;
      }

      setInputError('');
      setActiveArray(parsed);
    } catch (err) {
      setInputError('Invalid array format. Use comma separated numbers like: 10, 40, 25, 70');
    }
  };

  return (
    <div className="container search-page">
      <div className="search-header-box">
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Interactive Visualizer Studio
        </h1>
        <p style={{ color: '#a3a3a3' }}>
          Choose an algorithm, customize your input array, and step through the execution process.
        </p>
      </div>

      {/* Control Bar */}
      <div
        style={{
          background: 'var(--bg-card)',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)',
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem' }}>
            Select Algorithm
          </label>
          <select
            value={selectedAlgo}
            onChange={(e) => setSelectedAlgo(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'var(--bg-surface)',
              color: 'white',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              fontSize: '0.95rem',
            }}
          >
            <option value="bubble-sort">Bubble Sort</option>
            <option value="quick-sort">Quick Sort</option>
            <option value="merge-sort">Merge Sort (Simulator)</option>
          </select>
        </div>

        <form onSubmit={handleApplyCustomArray} style={{ flex: '2 1 320px', display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem' }}>
              Custom Numbers (comma separated)
            </label>
            <input
              type="text"
              value={inputArrayStr}
              onChange={(e) => setInputArrayStr(e.target.value)}
              placeholder="e.g. 20, 5, 80, 45, 12, 60"
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'var(--bg-surface)',
                color: 'white',
                border: '1px solid var(--border-subtle)',
                borderRadius: '4px',
                fontSize: '0.95rem',
              }}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ height: '46px', padding: '0 1.2rem' }}>
            Apply Array
          </button>
        </form>
      </div>

      {inputError && (
        <p style={{ color: '#ff4d4d', marginBottom: '1rem', fontSize: '0.9rem' }}>
          ⚠️ {inputError}
        </p>
      )}

      {/* Visualizer */}
      <Visualizer key={`${selectedAlgo}-${activeArray.join(',')}`} initialArray={activeArray} algorithmSlug={selectedAlgo} />
    </div>
  );
};

export default VisualizerStudio;
