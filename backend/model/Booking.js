const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    required: true,
    default: 'confirmed',
  },
}, { timestamps: true });


bookingSchema.index({ sessionId: 1, studentId: 1 }, { unique: true }); //Prevent duplicate bookings

module.exports = mongoose.model('Booking', bookingSchema);

