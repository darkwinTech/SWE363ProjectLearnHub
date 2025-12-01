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
  // Admin fields
  employeeId: {
    type: String,
    unique: true,
    sparse: true,
  },
  department: {
    type: String,
  },
  manager: {
    type: String,
  },
  // Student/Tutor fields
  studentId: {
    type: String,
    unique: true,
    sparse: true,
  },
  college: {
    type: String,
  },
  major: {
    type: String,
  },
  degree: {
    type: String,
  },
  program: {
    type: String,
  },
  year: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);