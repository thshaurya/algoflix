/**
 * Maps an algorithm difficulty level to the corresponding CSS badge class.
 *
 * @param {string} diff - The difficulty level ('Easy', 'Medium', 'Hard')
 * @returns {string} The CSS class name for the badge
 */
export const getDifficultyClass = (diff) => {
  switch (diff?.toLowerCase()) {
    case 'easy':
      return 'badge-easy';
    case 'hard':
      return 'badge-hard';
    default:
      return 'badge-medium';
  }
};

/**
 * Truncates text to a specified maximum length with ellipsis.
 *
 * @param {string} text - The input string
 * @param {number} maxLength - Maximum characters before truncation
 * @returns {string} Truncated string
 */
export const truncateText = (text, maxLength = 120) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Formats big-O complexity notations for clean display.
 *
 * @param {string} complexity - e.g. "O(n log n)"
 * @returns {string} Formatted complexity
 */
export const formatComplexity = (complexity) => {
  if (!complexity) return 'O(1)';
  return complexity.trim();
};
