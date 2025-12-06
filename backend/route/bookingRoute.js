const express = require('express');
const router = express.Router();
const bookingController = require('../controller/bookingController');
const auth = require('../middleware/auth');
const { allowRoles } = require('../middleware/roles');

// Booking (Student and Tutor)
router.post(
  '/create',
  auth,
  allowRoles('student', 'tutor'),
  bookingController.createBooking
);

// View their bookings (Student and Tutor)
router.get(
  '/my-bookings',
  auth,
  allowRoles('student', 'tutor'),
  bookingController.getStudentBookings
);

// Cancel booking (Student, Tutor and Admin)
router.delete(
  '/cancel/:id',
  auth,
  allowRoles('student', 'tutor', 'admin'),
  bookingController.cancelBooking
);

// View bookings for a session (Tutor and Admin)
router.get(
  '/session/:sessionId',
  auth,
  allowRoles('admin', 'tutor'),
  bookingController.getSessionBookings
);

module.exports = router;
