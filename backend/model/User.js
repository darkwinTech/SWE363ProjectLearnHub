const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'tutor', 'admin'],
    required: true,
  },
  major: {
    type: String,
  },
  year: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);

