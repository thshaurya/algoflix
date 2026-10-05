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

// ────────────────────────────────────────────────────────
// Sub-visualizers for different algorithm types
// ────────────────────────────────────────────────────────

const SortingVisualizer = ({ array, comparing, swapping, sorted, pivotIndex, partitionRange, mergeRange, splitPoint }) => {
  const maxValue = Math.max(...array);
  const minValue = Math.min(...array);
  const range = maxValue - minValue || 1;

  const getBarStatusClass = (idx) => {
    if (swapping.includes(idx)) return 'swapping';
    if (comparing.includes(idx)) return 'comparing';
    if (sorted.includes(idx)) return 'sorted';
    return '';
  };

  const getPointerLabel = (idx) => {
    const labels = [];
    if (pivotIndex === idx) labels.push('pivot');
    if (partitionRange && idx === partitionRange[0]) labels.push('left');
    if (partitionRange && idx === partitionRange[1]) labels.push('right');
    if (mergeRange && idx === splitPoint) labels.push('mid');
    return labels;
  };

  return (
    <div className="visualizer-stage">
      {array.map((val, idx) => {
        // Proportional height: normalize value to 15%-95% of container height
        const normalizedValue = (val - minValue) / range;
        const heightPercent = 15 + (normalizedValue * 80);
        const pointers = getPointerLabel(idx);
        const inPartition = partitionRange && idx >= partitionRange[0] && idx <= partitionRange[1];
        const inMerge = mergeRange && idx >= mergeRange[0] && idx <= mergeRange[1];

        return (
          <div key={idx} style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '24px' }}>
            {pointers.length > 0 && (
              <div style={{ fontSize: '0.7rem', color: '#e50914', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase' }}>
                {pointers.join('/')}
              </div>
            )}
            <motion.div
              layout
              className={`visualizer-bar ${getBarStatusClass(idx)}`}
              style={{
                height: `${heightPercent}%`,
                border: inPartition ? '2px solid rgba(229, 9, 20, 0.5)' : inMerge ? '2px solid rgba(16, 185, 129, 0.4)' : 'none',
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {val}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

const SearchingVisualizer = ({ array, comparing, low, high, mid, target, found, eliminated }) => {
  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#e5e5e5' }}>
          Target: <span style={{ color: '#e50914', fontSize: '1.3rem' }}>{target}</span>
        </span>
      </div>

      {/* Pointer indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
          <span style={{ color: '#3b82f6', fontWeight: 600 }}>↓ Low</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
          <span style={{ color: '#eab308', fontWeight: 600 }}>↓ Mid</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
          <span style={{ color: '#8b5cf6', fontWeight: 600 }}>↓ High</span>
        </div>
      </div>

      {/* Array cells */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {array.map((val, idx) => {
          const isLow = idx === low;
          const isHigh = idx === high;
          const isMid = idx === mid;
          const isEliminated = eliminated.includes(idx);
          const isFound = idx === found;
          const isComparing = comparing.includes(idx);

          return (
            <motion.div
              key={idx}
              layout
              style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: '6px',
                border: isFound
                  ? '3px solid #10b981'
                  : isMid
                  ? '3px solid #eab308'
                  : isComparing
                  ? '3px solid #e50914'
                  : '2px solid rgba(255,255,255,0.15)',
                background: isFound
                  ? '#10b981'
                  : isEliminated
                  ? 'rgba(100,100,100,0.3)'
                  : isMid
                  ? 'rgba(234, 179, 8, 0.2)'
                  : 'rgba(255,255,255,0.05)',
                color: isEliminated ? '#666' : '#e5e5e5',
                position: 'relative',
                opacity: isEliminated ? 0.4 : 1,
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            >
              {val}
              {isLow && (
                <div style={{ position: 'absolute', top: '-20px', fontSize: '0.75rem', color: '#3b82f6', fontWeight: 700 }}>
                  L
                </div>
              )}
              {isHigh && (
                <div style={{ position: 'absolute', top: '-20px', fontSize: '0.75rem', color: '#8b5cf6', fontWeight: 700 }}>
                  H
                </div>
              )}
              {isMid && (
                <div style={{ position: 'absolute', top: '-20px', fontSize: '0.75rem', color: '#eab308', fontWeight: 700 }}>
                  M
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const GraphVisualizer = ({ graphData, visited, current, queue, distances, visitedEdges, visitOrder }) => {
  if (!graphData) return <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No graph data available.</div>;

  const { nodes, edges } = graphData;

  const getNodeColor = (nodeId) => {
    if (nodeId === current) return '#e50914'; // Current node
    if (visited && visited.includes(nodeId)) return '#10b981'; // Visited
    if (queue && queue.includes(nodeId)) return '#eab308'; // In queue
    return 'rgba(255, 255, 255, 0.1)'; // Unvisited
  };

  const getNodeBorder = (nodeId) => {
    if (nodeId === current) return '3px solid #e50914';
    if (visited && visited.includes(nodeId)) return '2px solid #10b981';
    if (queue && queue.includes(nodeId)) return '2px solid #eab308';
    return '2px solid rgba(255, 255, 255, 0.2)';
  };

  const isEdgeVisited = (u, v) => {
    if (!visitedEdges) return false;
    return visitedEdges.some(
      ([a, b]) => (a === u && b === v) || (a === v && b === u)
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Graph canvas */}
      <svg viewBox="0 0 650 350" style={{ width: '100%', height: 'auto', maxWidth: '650px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', background: 'rgba(0,0,0,0.3)' }}>
        {/* Edges */}
        {edges.map(([u, v, weight], idx) => {
          const nodeU = nodes.find((n) => n.id === u);
          const nodeV = nodes.find((n) => n.id === v);
          if (!nodeU || !nodeV) return null;
          const isEdgeActive = isEdgeVisited(u, v);

          return (
            <g key={idx}>
              <line
                x1={nodeU.x}
                y1={nodeU.y}
                x2={nodeV.x}
                y2={nodeV.y}
                stroke={isEdgeActive ? '#10b981' : 'rgba(255,255,255,0.2)'}
                strokeWidth={isEdgeActive ? 3 : 2}
                opacity={isEdgeActive ? 0.9 : 0.5}
              />
              {weight !== undefined && (
                <text
                  x={(nodeU.x + nodeV.x) / 2}
                  y={(nodeU.y + nodeV.y) / 2 - 8}
                  fill="#e5e5e5"
                  fontSize="12"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {weight}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={24}
              fill={getNodeColor(node.id)}
              stroke={getNodeBorder(node.id).split(' ')[2]}
              strokeWidth={3}
            />
            <text
              x={node.x}
              y={node.y + 5}
              fill="#fff"
              fontSize="16"
              fontWeight="700"
              textAnchor="middle"
            >
              {node.id}
            </text>
            {distances && distances[node.id] !== undefined && distances[node.id] !== Infinity && (
              <text
                x={node.x}
                y={node.y + 42}
                fill="#eab308"
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
              >
                {distances[node.id]}
              </text>
            )}
          </g>
        ))}
      </svg>

      {/* Info panels */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontSize: '0.85rem' }}>
        {queue && queue.length > 0 && (
          <div style={{ flex: 1, padding: '0.75rem', background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: '6px' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#eab308' }}>Queue</div>
            <div style={{ color: '#e5e5e5' }}>[{queue.join(', ')}]</div>
          </div>
        )}

        {distances && Object.keys(distances).length > 0 && (
          <div style={{ flex: 1, padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '6px' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#10b981' }}>Distances</div>
            <div style={{ color: '#e5e5e5', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {Object.entries(distances)
                .filter(([, d]) => d !== Infinity)
                .map(([node, dist]) => (
                  <span key={node}>
                    {node}: {dist}
                  </span>
                ))}
            </div>
          </div>
        )}

        {visitOrder && visitOrder.length > 0 && (
          <div style={{ flex: 1, padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '6px' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#10b981' }}>Visit Order</div>
            <div style={{ color: '#e5e5e5' }}>{visitOrder.join(' → ')}</div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', fontSize: '0.8rem', justifyContent: 'center' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: 16, height: 16, background: 'rgba(255,255,255,0.1)', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }} />
          Unvisited
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: 16, height: 16, background: '#eab308', borderRadius: '50%' }} />
          In Queue
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: 16, height: 16, background: '#e50914', borderRadius: '50%' }} />
          Current
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: 16, height: 16, background: '#10b981', borderRadius: '50%' }} />
          Visited
        </span>
      </div>
    </div>
  );
};

const DpVisualizer = ({ array, comparing, swapping, sorted, dpTable, currentSum, maxSum, subarrayRange, maxRange, lookupIndices }) => {
  // Kadane's or Fibonacci
  const isKadane = currentSum !== undefined;

  if (isKadane) {
    return (
      <div style={{ padding: '1.5rem 0' }}>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          <div style={{ padding: '0.5rem 1rem', background: 'rgba(234, 179, 8, 0.15)', borderRadius: '6px', border: '1px solid rgba(234, 179, 8, 0.3)' }}>
            <span style={{ color: '#888' }}>Current Sum:</span> <span style={{ color: '#eab308', fontWeight: 700, fontSize: '1.1rem' }}>{currentSum}</span>
          </div>
          <div style={{ padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <span style={{ color: '#888' }}>Max Sum:</span> <span style={{ color: '#10b981', fontWeight: 700, fontSize: '1.1rem' }}>{maxSum}</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', flexWrap: 'wrap' }}>
          {array.map((val, idx) => {
            const inSubarray = subarrayRange && idx >= subarrayRange[0] && idx <= subarrayRange[1];
            const inMax = maxRange && idx >= maxRange[0] && idx <= maxRange[1];
            const isComparing = comparing.includes(idx);

            return (
              <motion.div
                key={idx}
                layout
                style={{
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: isComparing
                    ? '3px solid #e50914'
                    : inMax
                    ? '3px solid #10b981'
                    : '2px solid rgba(255,255,255,0.15)',
                  background: inMax
                    ? 'rgba(16, 185, 129, 0.25)'
                    : inSubarray
                    ? 'rgba(234, 179, 8, 0.15)'
                    : 'rgba(255,255,255,0.05)',
                  color: '#e5e5e5',
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              >
                {val}
              </motion.div>
            );
          })}
        </div>

        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.8rem', color: '#888' }}>
          {maxRange && `Max subarray: indices [${maxRange[0]}..${maxRange[1]}]`}
        </div>
      </div>
    );
  }

  // Fibonacci
  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
        {dpTable &&
          dpTable.map((entry, idx) => {
            const isLookup = lookupIndices && lookupIndices.includes(entry.index);
            const isNew = swapping && swapping.includes(entry.index);
            const isSorted = sorted && sorted.includes(entry.index);

            return (
              <motion.div
                key={idx}
                layout
                style={{
                  minWidth: '60px',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: isNew
                    ? '3px solid #10b981'
                    : isLookup
                    ? '3px solid #eab308'
                    : '2px solid rgba(255,255,255,0.15)',
                  background: isSorted
                    ? 'rgba(16, 185, 129, 0.2)'
                    : isNew
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'rgba(255,255,255,0.05)',
                  color: '#e5e5e5',
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              >
                <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '4px' }}>F({entry.index})</div>
                <div style={{ fontSize: '1.1rem', color: '#e50914' }}>{entry.value}</div>
              </motion.div>
            );
          })}
      </div>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: '#888' }}>
        Memoization cache: reuse computed values to avoid redundant recursion
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────
// Main Visualizer Component
// ────────────────────────────────────────────────────────

export const Visualizer = ({
  initialArray = [52, 28, 85, 19, 93, 44, 71, 35, 62, 10],
  algorithmSlug = 'quick-sort',
}) => {
  const [customArray, setCustomArray] = useState(initialArray);
  const {
    currentStep,
    array,
    comparing,
    swapping,
    sorted,
    description,
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

  const handleRandomize = () => {
    const random = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 90) + 10
    );
    setCustomArray(random);
    reset(random);
  };

  // Determine visualizer type
  const visualizerType = currentStep?.visualizerType || (
    ['bubble-sort', 'quick-sort', 'merge-sort'].includes(algorithmSlug)
      ? 'sorting'
      : ['binary-search'].includes(algorithmSlug)
      ? 'searching'
      : ['breadth-first-search', 'dijkstras-algorithm'].includes(algorithmSlug)
      ? 'graph'
      : ['fibonacci-dp', 'kadanes-algorithm'].includes(algorithmSlug)
      ? 'dp'
      : 'sorting'
  );

  return (
    <div className="visualizer-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Interactive Visualizer</h3>
          <p style={{ fontSize: '0.85rem', color: '#888' }}>
            Watch algorithm execution step-by-step with real-time state tracking and directional guidance.
          </p>
        </div>
      </div>

      {/* Step description card */}
      {description && (
        <div
          style={{
            padding: '1rem 1.25rem',
            background: 'rgba(229, 9, 20, 0.08)',
            border: '1px solid rgba(229, 9, 20, 0.2)',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            color: '#e5e5e5',
          }}
        >
          <div style={{ fontWeight: 600, color: '#e50914', marginBottom: '0.3rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Step {currentStepIndex + 1} / {totalSteps}
          </div>
          {description}
        </div>
      )}

      {/* Render appropriate visualizer */}
      {visualizerType === 'sorting' && (
        <SortingVisualizer
          array={array}
          comparing={comparing}
          swapping={swapping}
          sorted={sorted}
          pivotIndex={currentStep?.pivotIndex}
          partitionRange={currentStep?.partitionRange}
          mergeRange={currentStep?.mergeRange}
          splitPoint={currentStep?.splitPoint}
        />
      )}

      {visualizerType === 'searching' && (
        <SearchingVisualizer
          array={array}
          comparing={comparing}
          low={currentStep?.low}
          high={currentStep?.high}
          mid={currentStep?.mid}
          target={currentStep?.target}
          found={currentStep?.found}
          eliminated={currentStep?.eliminated || []}
        />
      )}

      {visualizerType === 'graph' && (
        <GraphVisualizer
          graphData={currentStep?.graphData}
          visited={currentStep?.visited}
          current={currentStep?.current}
          queue={currentStep?.queue}
          distances={currentStep?.distances}
          visitedEdges={currentStep?.visitedEdges}
          visitOrder={currentStep?.visitOrder}
        />
      )}

      {visualizerType === 'dp' && (
        <DpVisualizer
          array={array}
          comparing={comparing}
          swapping={swapping}
          sorted={sorted}
          dpTable={currentStep?.dpTable}
          currentSum={currentStep?.currentSum}
          maxSum={currentStep?.maxSum}
          subarrayRange={currentStep?.subarrayRange}
          maxRange={currentStep?.maxRange}
          lookupIndices={currentStep?.lookupIndices}
        />
      )}

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

          {visualizerType !== 'graph' && (
            <button
              className="v-btn"
              onClick={handleRandomize}
              title="Generate Random Array"
            >
              <FaRandom /> Randomize
            </button>
          )}
        </div>

        <div className="control-group">
          <label
            style={{
              fontSize: '0.85rem',
              color: '#a3a3a3',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
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
