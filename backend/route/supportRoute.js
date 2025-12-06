const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { allowRoles } = require('../middleware/roles');
const convertingResponse = require('../middleware/convertingResponse');
const supportController = require('../controller/supportController');

// Student: Create support ticket
router.post('/', auth, allowRoles('student', 'tutor'), convertingResponse(supportController.createTicket));

// Student: Get my tickets
router.get('/my', auth, allowRoles('student', 'tutor'), convertingResponse(supportController.getMyTickets));

// Admin: Get all tickets
router.get('/', auth, allowRoles('admin'), convertingResponse(supportController.getAllTickets));

// Admin: Respond to ticket
router.put('/:id', auth, allowRoles('admin'), convertingResponse(supportController.respondTicket));

module.exports = router;
