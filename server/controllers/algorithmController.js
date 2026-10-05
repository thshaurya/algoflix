const Algorithm = require('../models/Algorithm');
const seedAlgorithms = require('../seed/seedData');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { getDBStatus } = require('../config/db');

// In-memory store for fallback mode when MongoDB is offline
let inMemoryAlgorithms = [...seedAlgorithms];

/**
 * @desc    Get all algorithms (with optional search, category, difficulty filtering, and pagination)
 * @route   GET /api/algorithms
 * @access  Public
 */
const getAlgorithms = async (req, res, next) => {
  try {
    const { category, difficulty, search, featured, page = '1', limit = '50' } = req.query;

    // Parse and validate pagination parameters
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
    const skip = (pageNum - 1) * limitNum;

    if (getDBStatus()) {
      const query = {};

      if (category && category !== 'All') {
        query.category = category;
      }

      if (difficulty && difficulty !== 'All') {
        query.difficulty = difficulty;
      }

      if (featured !== undefined) {
        query.featured = featured === 'true';
      }

      if (search) {
        const sanitizedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        query.$or = [
          { title: { $regex: sanitizedSearch, $options: 'i' } },
          { summary: { $regex: sanitizedSearch, $options: 'i' } },
          { tags: { $regex: sanitizedSearch, $options: 'i' } },
        ];
      }

      const [algorithms, total] = await Promise.all([
        Algorithm.find(query).sort({ rating: -1, createdAt: -1 }).skip(skip).limit(limitNum),
        Algorithm.countDocuments(query),
      ]);

      return res.status(200).json({
        success: true,
        message: 'Algorithms retrieved successfully',
        data: algorithms,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum),
        },
      });
    }

    // In-memory fallback
    let results = [...inMemoryAlgorithms];

    if (category && category !== 'All') {
      results = results.filter(
        (algo) => algo.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (difficulty && difficulty !== 'All') {
      results = results.filter(
        (algo) => algo.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }

    if (featured !== undefined) {
      const isFeatured = featured === 'true';
      results = results.filter((algo) => algo.featured === isFeatured);
    }

    if (search) {
      const s = search.toLowerCase();
      results = results.filter(
        (algo) =>
          algo.title.toLowerCase().includes(s) ||
          algo.summary.toLowerCase().includes(s) ||
          (algo.tags && algo.tags.some((t) => t.toLowerCase().includes(s)))
      );
    }

    const total = results.length;
    const paginated = results.slice(skip, skip + limitNum);

    return res.status(200).json({
      success: true,
      message: 'Algorithms retrieved successfully (In-Memory Mode)',
      data: paginated,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get the featured algorithm for the Hero Billboard
 * @route   GET /api/algorithms/featured
 * @access  Public
 */
const getFeaturedAlgorithm = async (req, res, next) => {
  try {
    if (getDBStatus()) {
      let featured = await Algorithm.findOne({ featured: true });
      if (!featured) {
        featured = await Algorithm.findOne().sort({ rating: -1 });
      }
      if (!featured) {
        return errorResponse(res, 'No featured algorithm found', 404);
      }
      return successResponse(res, featured, 'Featured algorithm retrieved');
    }

    // In-memory fallback
    let featured = inMemoryAlgorithms.find((a) => a.featured);
    if (!featured && inMemoryAlgorithms.length > 0) {
      featured = inMemoryAlgorithms[0];
    }

    if (!featured) {
      return errorResponse(res, 'No featured algorithm found', 404);
    }

    return successResponse(res, featured, 'Featured algorithm retrieved (In-Memory Mode)');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single algorithm by its unique slug
 * @route   GET /api/algorithms/:slug
 * @access  Public
 */
const getAlgorithmBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (getDBStatus()) {
      const algorithm = await Algorithm.findOne({ slug: slug.toLowerCase() });
      if (!algorithm) {
        return errorResponse(res, `Algorithm with slug '${slug}' not found`, 404);
      }
      return successResponse(res, algorithm, 'Algorithm retrieved successfully');
    }

    // In-memory fallback
    const algorithm = inMemoryAlgorithms.find(
      (a) => a.slug.toLowerCase() === slug.toLowerCase()
    );

    if (!algorithm) {
      return errorResponse(res, `Algorithm with slug '${slug}' not found`, 404);
    }

    return successResponse(res, algorithm, 'Algorithm retrieved successfully (In-Memory Mode)');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all unique algorithm categories with counts
 * @route   GET /api/algorithms/categories
 * @access  Public
 */
const getCategories = async (req, res, next) => {
  try {
    const defaultCategories = ['Sorting', 'Searching', 'Graph Theory', 'Dynamic Programming', 'Trees'];

    if (getDBStatus()) {
      const counts = await Algorithm.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
      ]);
      const categoryMap = counts.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {});

      const result = defaultCategories.map((name) => ({
        name,
        count: categoryMap[name] || 0,
      }));

      return successResponse(res, result, 'Categories retrieved');
    }

    // In-memory fallback
    const result = defaultCategories.map((name) => ({
      name,
      count: inMemoryAlgorithms.filter((a) => a.category === name).length,
    }));

    return successResponse(res, result, 'Categories retrieved (In-Memory Mode)');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new algorithm
 * @route   POST /api/algorithms
 * @access  Public
 */
const createAlgorithm = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      category,
      difficulty,
      summary,
      description,
      timeComplexity,
      spaceComplexity,
      code,
      visualizerType,
      defaultArray,
      tags,
      featured,
      bannerUrl,
      thumbnailUrl,
    } = req.body;

    const newAlgoData = {
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
      category,
      difficulty: difficulty || 'Medium',
      summary,
      description,
      timeComplexity: timeComplexity || { best: 'O(n)', average: 'O(n log n)', worst: 'O(n²)' },
      spaceComplexity: spaceComplexity || 'O(1)',
      code,
      visualizerType: visualizerType || 'sorting',
      defaultArray: defaultArray || [10, 20, 30, 40, 50],
      tags: tags || [],
      featured: !!featured,
      rating: 4.8,
      bannerUrl,
      thumbnailUrl,
    };

    if (getDBStatus()) {
      const created = await Algorithm.create(newAlgoData);
      return successResponse(res, created, 'Algorithm created successfully in MongoDB', 201);
    }

    // In-memory fallback
    inMemoryAlgorithms.push(newAlgoData);
    return successResponse(res, newAlgoData, 'Algorithm created successfully (In-Memory Mode)', 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAlgorithms,
  getFeaturedAlgorithm,
  getAlgorithmBySlug,
  getCategories,
  createAlgorithm,
};
