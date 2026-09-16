import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaRedo,
  FaRandom,
} from 'react-icons/fa';
import useAlgorithmVisualizer from '../hooks/useAlgorithmVisualizer';

export const Visualizer = ({
  initialArray = [52, 28, 85, 19, 93, 44, 71, 35, 62, 10],
  algorithmSlug = 'quick-sort',
}) => {
  const [customArray, setCustomArray] = useState(initialArray);
  const {
    array,
    comparing,
    swapping,
    sorted,
    currentStepIndex,
    totalSteps,
    isPlaying,
    speed,
    togglePlay,
    stepForward,
    stepBackward,
    reset,
    setSpeed,
  } = useAlgorithmVisualizer(customArray, algorithmSlug);

  const maxValue = Math.max(...array, 100);

  const handleRandomize = () => {
    const random = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 90) + 10
    );
    setCustomArray(random);
    reset(random);
  };

  const getBarStatusClass = (idx) => {
    if (swapping.includes(idx)) return 'swapping';
    if (comparing.includes(idx)) return 'comparing';
    if (sorted.includes(idx)) return 'sorted';
    return '';
  };

  return (
    <div className="visualizer-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Interactive Visualizer</h3>
          <p style={{ fontSize: '0.85rem', color: '#888' }}>
            Watch array transformations step-by-step with real-time state tracking.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 12, height: 12, background: '#eab308', borderRadius: 2 }} />
            Comparing
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 12, height: 12, background: '#e50914', borderRadius: 2 }} />
            Swapping
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 12, height: 12, background: '#10b981', borderRadius: 2 }} />
            Sorted
          </span>
        </div>
      </div>

      {/* Animation Stage */}
      <div className="visualizer-stage">
        {array.map((val, idx) => {
          const heightPercent = Math.max((val / maxValue) * 100, 15);
          return (
            <motion.div
              key={idx}
              layout
              className={`visualizer-bar ${getBarStatusClass(idx)}`}
              style={{ height: `${heightPercent}%` }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {val}
            </motion.div>
          );
        })}
      </div>

      {/* Control Bar */}
      <div className="visualizer-controls">
        <div className="control-group">
          <button
            className={`v-btn ${isPlaying ? 'active-play' : ''}`}
            onClick={togglePlay}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>

          <button
            className="v-btn"
            onClick={stepBackward}
            disabled={isPlaying || currentStepIndex === 0}
            title="Previous Step"
          >
            <FaStepBackward />
          </button>

          <button
            className="v-btn"
            onClick={stepForward}
            disabled={isPlaying || currentStepIndex >= totalSteps - 1}
            title="Next Step"
          >
            <FaStepForward />
          </button>

          <button
            className="v-btn"
            onClick={() => reset(customArray)}
            title="Reset to Initial State"
          >
            <FaRedo /> Reset
          </button>

          <button
            className="v-btn"
            onClick={handleRandomize}
            title="Generate Random Array"
          >
            <FaRandom /> Randomize
          </button>
        </div>

        <div className="control-group">
          <span style={{ fontSize: '0.85rem', color: '#a3a3a3' }}>
            Step: {totalSteps === 0 ? 0 : currentStepIndex + 1} / {totalSteps}
          </span>

          <label
            style={{
              fontSize: '0.85rem',
              color: '#a3a3a3',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginLeft: '1rem',
            }}
          >
            Speed:
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={1100 - speed}
              onChange={(e) => setSpeed(1100 - Number(e.target.value))}
              className="speed-slider"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
