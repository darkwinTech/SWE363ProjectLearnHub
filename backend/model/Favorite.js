const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  favoriteTutors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  favoriteCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  }],
});

module.exports = mongoose.model('Favorite', favoriteSchema);

