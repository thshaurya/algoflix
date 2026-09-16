import api from './api';

export const algorithmService = {
  /**
   * Fetch all algorithms with optional filter parameters
   * @param {Object} params { category, difficulty, search, featured }
   */
  async getAll(params = {}) {
    const response = await api.get('/algorithms', { params });
    return response.data || [];
  },

  /**
   * Fetch featured algorithm for the hero showcase
   */
  async getFeatured() {
    const response = await api.get('/algorithms/featured');
    return response.data;
  },

  /**
   * Fetch single algorithm by slug
   * @param {string} slug
   */
  async getBySlug(slug) {
    const response = await api.get(`/algorithms/${slug}`);
    return response.data;
  },

  /**
   * Fetch categories with algorithm counts
   */
  async getCategories() {
    const response = await api.get('/algorithms/categories');
    return response.data || [];
  },

  /**
   * Create a new algorithm
   * @param {Object} data
   */
  async create(data) {
    const response = await api.post('/algorithms', data);
    return response.data;
  },
};

export default algorithmService;
