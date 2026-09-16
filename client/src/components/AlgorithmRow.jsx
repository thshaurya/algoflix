import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AlgorithmCard from './AlgorithmCard';

export const AlgorithmRow = ({ title, algorithms = [], onOpenModal }) => {
  const rowRef = useRef(null);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!algorithms || algorithms.length === 0) return null;

  return (
    <div className="algo-row">
      <div className="row-header">
        <h2 className="row-title">{title}</h2>
      </div>

      <div className="row-carousel-container">
        <button
          className="row-arrow left"
          aria-label="Scroll left"
          onClick={() => handleScroll('left')}
        >
          <FaChevronLeft />
        </button>

        <div className="row-carousel" ref={rowRef}>
          {algorithms.map((algo) => (
            <AlgorithmCard
              key={algo._id || algo.slug}
              algorithm={algo}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>

        <button
          className="row-arrow right"
          aria-label="Scroll right"
          onClick={() => handleScroll('right')}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default AlgorithmRow;
