const mongoose = require('mongoose');

const tutorProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
  coursesTaught: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
  rating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('TutorProfile', tutorProfileSchema);

