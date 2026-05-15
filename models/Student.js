const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    unique: true,
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  fatherName: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  email: {
    type: String,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  dateOfBirth: {
    type: Date,
  },
  profileImage: {
    type: String,
    default: '',
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Dropped'],
    default: 'Active',
  },
});

// Auto-generate student ID
studentSchema.pre('save', async function (next) {
  if (!this.studentId) {
    const count = await mongoose.model('Student').countDocuments();
    this.studentId = `RICS-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Student', studentSchema);
