const Booking = require('../model/Booking');
const mongoose = require('mongoose');

// Create a booking (student and tutor)
exports.createBooking = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const studentId = req.user.id;

    if (!['student', 'tutor'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Only students or tutors can book sessions' });
    }

    if (!sessionId) {
      return res.status(400).json({ message: 'sessionId is required' });
    }

    const booking = new Booking({ sessionId, studentId });
    await booking.save();

    return res.status(201).json({
      message: 'Booking created successfully',
      booking
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'You already booked this session'
      });
    }

    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get bookings for current student or tutor

exports.getStudentBookings = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    let studentId;
    try {
      studentId = new mongoose.Types.ObjectId(req.user.id);
    } catch {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    const bookings = await Booking.find({ studentId })
      .populate({ path: 'sessionId', select: 'name date', strictPopulate: false })
      .sort({ createdAt: -1 });

    if (!bookings.length) {
      return res.json({ bookings: [], message: 'No bookings found' });
    }

    return res.json({ bookings });
  } catch (err) {
    console.error('Error in getStudentBookings:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};


// Cancel a booking (student, tutor and admin)
exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (String(booking.studentId) !== String(userId) && userRole !== 'admin') {
      return res.status(403).json({ message: 'Not allowed' });
    }

    booking.status = 'cancelled';
    await booking.save();

    return res.json({
      message: 'Booking cancelled successfully',
      booking
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get bookings for a session (admin and tutor)
exports.getSessionBookings = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const bookings = await Booking.find({ sessionId })
      .populate('studentId')
      .sort({ createdAt: -1 });

    return res.json({ bookings });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
