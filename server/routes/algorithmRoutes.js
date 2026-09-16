const express = require('express');
const router = express.Router();
const {
  getAlgorithms,
  getFeaturedAlgorithm,
  getAlgorithmBySlug,
  getCategories,
  createAlgorithm,
} = require('../controllers/algorithmController');

// Specific routes must precede parameterized :slug route
router.get('/featured', getFeaturedAlgorithm);
router.get('/categories', getCategories);
router.route('/').get(getAlgorithms).post(createAlgorithm);
router.get('/:slug', getAlgorithmBySlug);

module.exports = router;
