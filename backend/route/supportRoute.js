const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const supportController = require('../controller/supportController');

// Student: Create
router.post('/', auth, supportController.createTicket);

// Student: My tickets
router.get('/my', auth, supportController.getMyTickets);

// Admin: All tickets
router.get('/', auth, (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  next();
}, supportController.getAllTickets);

// Admin: Respond
router.put('/:id', auth, (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  next();
}, supportController.respondTicket);

module.exports = router;
