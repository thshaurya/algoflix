const mongoose = require('mongoose');

const algorithmSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Algorithm title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Algorithm slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Sorting', 'Searching', 'Graph Theory', 'Dynamic Programming', 'Trees'],
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty level is required'],
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    summary: {
      type: String,
      required: [true, 'Short summary is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Detailed description is required'],
    },
    timeComplexity: {
      best: { type: String, default: 'O(n)' },
      average: { type: String, default: 'O(n log n)' },
      worst: { type: String, default: 'O(n²)' },
    },
    spaceComplexity: {
      type: String,
      default: 'O(1)',
    },
    code: {
      javascript: { type: String, required: true },
      python: { type: String, required: true },
      cpp: { type: String, required: true },
      java: { type: String, required: true },
    },
    visualizerType: {
      type: String,
      enum: ['sorting', 'searching', 'graph', 'dp'],
      default: 'sorting',
    },
    defaultArray: {
      type: [Number],
      default: [45, 12, 85, 32, 89, 39, 69, 21, 56, 9],
    },
    tags: [{ type: String, trim: true }],
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 1.0,
      max: 5.0,
    },
    bannerUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    },
    thumbnailUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    },
  },
  {
    timestamps: true,
  }
);

// Index for text search
algorithmSchema.index({ title: 'text', summary: 'text', tags: 'text' });

module.exports = mongoose.model('Algorithm', algorithmSchema);
