const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  whatsapp: {
    type: String,
    required: [true, 'WhatsApp number is required'],
  },
  email: {
    type: String,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  course: {
    type: String,
    required: [true, 'Course selection is required'],
  },
  timing: {
    type: String,
    required: [true, 'Preferred timing is required'],
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Admission = mongoose.model('Admission', admissionSchema);

// ─── Contact Message ────────────────────────────────────────────────────────
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

// ─── Gallery ─────────────────────────────────────────────────────────────────
const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  category: {
    type: String,
    enum: ['Classroom', 'Events', 'Workshops', 'Activities'],
    default: 'Classroom',
  },
  image: {
    type: String,
    required: [true, 'Image is required'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = { Admission, Contact, Gallery };
