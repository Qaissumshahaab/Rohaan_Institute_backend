const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters'],
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
  },
  fees: {
    type: Number,
    required: [true, 'Fees are required'],
  },
  skillLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner',
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Web Development',
      'Graphic Design',
      'Digital Marketing',
      'MS Office',
      'Freelancing',
      'Programming',
      'Video Editing',
      'UI/UX Design',
      'E-Commerce',
    ],
  },
  thumbnail: {
    type: String,
    default: '',
  },
  outline: [
    {
      week: Number,
      topic: String,
      description: String,
    },
  ],
  benefits: [String],
  hasCertificate: {
    type: Boolean,
    default: true,
  },
  instructor: {
    name: String,
    bio: String,
    image: String,
  },
  faqs: [
    {
      question: String,
      answer: String,
    },
  ],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  enrolledCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-generate slug from title
courseSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Course', courseSchema);
